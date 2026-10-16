"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Key, Database, ShieldCheck, Zap, Bot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const SecurityView = () => {
    return (
        <div className="flex flex-col h-full bg-transparent p-6 md:p-12 max-w-7xl mx-auto w-full gap-16 font-sans">
            {/* Header Section */}
            <section className="relative space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium tracking-wide text-zinc-400"
                >
                    <ShieldCheck className="size-3.5 text-primary" />
                    Military-Grade Encryption Active
                </motion.div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Security <span className="text-primary italic">Vault</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl">
                            Isolating meeting data within a <span className="text-white font-medium">zero-knowledge architecture</span>. RSA-4096 protocols established.
                        </p>
                    </motion.div>

                    <Link href="/security/logs" className="hidden md:block">
                        <Button size="lg" variant="ghost" className="h-14 px-8 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.05] transition-all">
                            Audit Access Logs
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Security Interface */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Protocol Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:col-span-2 rounded-[3.5rem] bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-700"
                >
                    <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="flex items-center gap-4 mb-14">
                        <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <Lock className="size-7" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Active Protocols</h2>
                            <p className="text-sm text-zinc-500 font-medium">Shielding your data assets.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "End-to-End Encryption", desc: "Data is encrypted at the hardware level before leaving your device.", active: true },
                            { title: "SAML SSO Auth", desc: "Enterprise-grade identity management across your entire organization.", active: true },
                            { title: "SOC2 Compliance", desc: "Adhering to strict data management and privacy standards.", active: true },
                            { title: "Zero-Knowledge Storage", desc: "We never store original session keys. Your data is yours alone.", active: true },
                        ].map((protocol, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-zinc-950/40 border border-white/5 space-y-4 hover:border-primary/20 transition-all">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-white tracking-tight">{protocol.title}</h4>
                                    <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                </div>
                                <p className="text-sm text-zinc-500 leading-relaxed font-medium">{protocol.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Threat Monitor Sidebar */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="rounded-[3rem] bg-zinc-950/40 border border-white/5 p-10 relative overflow-hidden flex flex-col items-center text-center group"
                    >
                        <div className="size-24 rounded-[3rem] bg-zinc-900 border border-white/5 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-zinc-950 transition-all duration-700 relative">
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Eye className="size-10 relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Live Threat Monitor</h3>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-10">Real-time analysis of access patterns and neural query anomalies.</p>
                        <Button className="w-full h-12 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all">
                            Refresh Shield
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="rounded-[3rem] bg-white/[0.02] border border-white/5 p-10 space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                                <Key className="size-5" />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Master Key Status</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-white tracking-tight">Vault-A14</span>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-lg font-bold uppercase text-[9px] tracking-widest">Synchronized</Badge>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

import Link from "next/link"
