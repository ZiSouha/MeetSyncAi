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
  email: z.string().email({ message: "Please enter a valid work email" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export const SignInView = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true)

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          setPending(false)
          router.push("/dashboard")
        },
        onError: ({ error }) => {
          setPending(false)
          setError(error.message)
        },
      }
    );
  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center p-4 relative z-10'>
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="flex justify-center mb-10">
           <Link href="/">
              <MeetSyncLogo iconOnly size="lg" />
           </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Sign in to MeetSync
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Welcome back. Please enter your email and password.
          </p>
        </div>

        <div className="space-y-6">
          {!!error && (
            <Alert className="bg-red-500/10 border-red-500/20 rounded-xl py-3 animate-in fade-in slide-in-from-top-1 text-left">
              <OctagonAlertIcon className="size-4 text-red-400 shrink-0" />
              <AlertTitle className="text-xs font-medium text-red-300 ml-2 leading-relaxed">{error}</AlertTitle>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider ml-1">Work Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="name@company.com"
                        className="h-11 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                      <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Password</FormLabel>
                      <Link href="/forgot-password" className="text-[9px] text-zinc-600 hover:text-white transition-colors tracking-tight font-medium uppercase font-mono">
                        Reset
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="h-11 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-medium" />
                  </FormItem>
                )}
              />

              <Button 
                disabled={pending} 
                type="submit" 
                className="w-full h-11 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-all duration-300 shadow-2xl shadow-white/5 active:scale-[0.98] text-sm"
              >
                {pending ? (
                   <div className="flex items-center gap-2">
                      <Loader2 className="size-3.5 animate-spin" />
                      Wait...
                   </div>
                ) : "Sign in"}
              </Button>

              <div className="pt-6 text-center">
                <p className="text-xs text-zinc-500">
                  New to the platform?{" "}
                  <Link href="/sign-up" className="text-white font-semibold hover:text-primary transition-colors underline-offset-4 decoration-white/20 decoration-1 hover:decoration-primary">
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>

      {/* Subtle Footer */}
      <div className="absolute bottom-6 text-[9px] font-medium text-zinc-700 uppercase tracking-[0.2em] flex items-center gap-4">
         <span className="cursor-default">Privacy</span>
         <div className="size-0.5 rounded-full bg-zinc-800" />
         <span className="cursor-default">Terms</span>
         <div className="size-0.5 rounded-full bg-zinc-800" />
         <span className="cursor-default">Security</span>
      </div>
    </div>
  )
}

export default SignInView
