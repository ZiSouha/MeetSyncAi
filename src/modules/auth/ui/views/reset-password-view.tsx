"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useState, Suspense } from 'react'
import { OctagonAlertIcon, Loader2, Lock, CheckCircle2 } from 'lucide-react'
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
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"
import { MeetSyncLogo } from '@/modules/website/ui/components/meetsync-logo'

const formSchema = z.object({
  password: z.string().min(8, { message: "Min 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPasswordContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!token) {
        setError("Invalid or expired reset token");
        return;
    }

    setError(null);
    setPending(true)

    const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
    });

    setPending(false);
    if (error) {
        setError(error.message || "Failed to reset password");
    } else {
        setSuccess(true);
    }
  }

  if (!token) {
      return (
        <div className="text-center">
            <h1 className="text-xl font-bold text-white mb-4">Invalid Link</h1>
            <p className="text-zinc-500 mb-8">This reset link is invalid or has expired.</p>
            <Link href="/forgot-password">
                <Button variant="outline" className="rounded-xl border-white/10 text-white">
                    Request New Link
                </Button>
            </Link>
        </div>
      )
  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center p-4 relative z-10'>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[400px] bg-primary/5 rounded-full blur-[120px] opacity-40" />
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

        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            New Password
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Please enter your new secure password.
          </p>
        </div>

        {success ? (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900/50 border border-white/5 rounded-[2rem] p-8 text-center"
            >
                <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Protocol Updated</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                    Your password has been successfully reset. You can now access your workspace.
                </p>
                <Link href="/sign-in" className="w-full">
                    <Button className="w-full h-12 rounded-xl bg-primary text-zinc-950 font-bold hover:bg-primary/90">
                        Sign In Now
                    </Button>
                </Link>
            </motion.div>
        ) : (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider ml-1">New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="h-12 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
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
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider ml-1">Confirm Secret</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="h-12 bg-zinc-900/50 border-white/5 rounded-xl focus-visible:ring-0 focus-visible:border-white/20 transition-all text-white placeholder:text-zinc-800 text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              {!!error && (
                <Alert className="bg-red-500/5 border-red-500/10 rounded-xl py-3 animate-in fade-in slide-in-from-top-1">
                  <OctagonAlertIcon className="size-4 text-red-500" />
                  <AlertTitle className="text-xs font-semibold text-red-500/90 ml-3">{error}</AlertTitle>
                </Alert>
              )}

              <Button 
                disabled={pending} 
                type="submit" 
                className="w-full h-12 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-all duration-300 shadow-2xl shadow-white/5 active:scale-[0.98] text-sm mt-4"
              >
                {pending ? (
                   <div className="flex items-center gap-2">
                      <Loader2 className="size-3.5 animate-spin" />
                      Updating...
                   </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Lock className="size-4" />
                        Reset Password
                    </div>
                )}
              </Button>
            </form>
          </Form>
        )}
      </motion.div>
    </div>
  )
}

export const ResetPasswordView = () => (
    <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center">
             <Loader2 className="size-8 animate-spin text-primary" />
        </div>
    }>
        <ResetPasswordContent />
    </Suspense>
);
