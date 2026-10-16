"use client"

import { z } from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { OctagonAlertIcon, Loader2 } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import { MeetSyncLogo } from '@/modules/website/ui/components/meetsync-logo'

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please use a valid work email" }),
  password: z.string().min(8, { message: "Min 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Required" }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "No match",
    path: ["confirmPassword"],
  });

export const SignUpView = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true)

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard"
      },
      {
        onSuccess: () => {
          setPending(false)
          router.push("/dashboard")
        },
        onError: ({ error }) => {
          setPending(false)
          if (error.status === 422 || error.message?.toLowerCase().includes("exist")) {
            setError("An account with this email already exists. Please sign in instead.");
          } else {
            setError(error.message || "An unexpected error occurred. Please try again.");
          }
        },
      }
    );
  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center p-4 relative z-10'>
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-primary/5 rounded-full blur-[140px] opacity-40" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="flex justify-center mb-8">
            <Link href="/">
              <MeetSyncLogo iconOnly size="lg" />
            </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Create account
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Join the modern workspace for intelligence. Enter your details below.
          </p>
        </div>

        <div className="space-y-6">
          {!!error && (
            <Alert className="bg-red-500/10 border-red-500/20 rounded-xl py-3 animate-in fade-in slide-in-from-top-1 text-left">
              <OctagonAlertIcon className="size-4 text-red-400 shrink-0" />
              <AlertTitle className="text-xs font-medium text-red-300 ml-2 leading-relaxed">
                {error}
                {error.includes("sign in instead") && (
                  <Link href="/sign-in" className="underline font-bold text-white hover:text-primary ml-1.5 transition-colors">
                    Sign in here &rarr;
                  </Link>
                )}
              </AlertTitle>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider ml-1">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Sarah Chen"
                        className="h-11 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider ml-1">Work Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="sarah@corp.com"
                        className="h-11 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider ml-1">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="h-11 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider ml-1">Confirm</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="h-11 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                disabled={pending} 
                type="submit" 
                className="w-full h-11 rounded-xl bg-primary text-zinc-950 font-bold hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/10 active:scale-[0.98] mt-4 text-sm"
              >
                {pending ? (
                   <div className="flex items-center gap-2">
                      <Loader2 className="size-3.5 animate-spin" />
                      Wait...
                   </div>
                ) : "Create account"}
              </Button>

              <div className="pt-6 text-center text-xs text-zinc-500">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-white font-semibold hover:text-primary transition-colors underline-offset-4 decoration-white/20 decoration-1 hover:decoration-primary">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>

      {/* Subtle Footer */}
      <div className="absolute bottom-6 px-6 text-center max-w-lg leading-relaxed text-[9px] font-medium text-zinc-700 uppercase tracking-[0.2em]">
         Agree to <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</a> and <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy</a>.
      </div>
    </div>
  )
}

export default SignUpView
