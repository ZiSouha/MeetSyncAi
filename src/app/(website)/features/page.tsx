"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
    Zap, 
    Shield, 
    Cpu, 
    Globe, 
    ZapIcon, 
    Layers, 
    FastForward, 
    Workflow, 
    Search,
    BrainCircuit,
    Bot,
    ArrowRight,
    CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-zinc-400 mb-8"
                    >
                        <Zap className="size-3.5 text-primary" />
                        <span>Platform Capabilities</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]"
                    >
                        Intelligence that <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 text-glow">works for you.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 leading-relaxed font-light"
                    >
                        MeetSync transforms every spoken word into a strategic organizational asset. Automate the mundane, focus on the extraordinary.
                    </motion.p>
                </div>

                {/* Core Pillar Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {[
                        {
                            title: "Autonomous Agents",
                            desc: "AI agents that join your calls, understand context in real-time, and participate naturally in the discussion.",
                            icon: Bot,
                            color: "text-blue-400",
                            bg: "bg-blue-400/10",
                            border: "border-blue-400/20"
                        },
                        {
                            title: "Sentiment Intelligence",
                            desc: "Identify shifts in meeting dynamics with live sentiment analysis and engagement tracking.",
                            icon: BrainCircuit,
                            color: "text-amber-400",
                            bg: "bg-amber-400/10",
                            border: "border-amber-400/20"
                        },
                        {
                            title: "Military-Grade Security",
                            desc: "SOC 2 Type II compliant infrastructure with end-to-end encryption and granular access controls.",
                            icon: Shield,
                            color: "text-emerald-400",
                            bg: "bg-emerald-400/10",
                            border: "border-emerald-400/20"
                        }
                    ].map((feature, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className={`size-16 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                <feature.icon className={`size-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed font-light">{feature.desc}</p>
                            
                            {/* Decorative background flare */}
                            <div className={`absolute -bottom-10 -right-10 size-32 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000 ${feature.bg}`} />
                        </motion.div>
                    ))}
                </div>

                {/* Organizational Velocity Section - Upgraded */}
                <div className="grid lg:grid-cols-2 gap-16 items-center py-32 border-t border-white/5 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                            Workflow integration
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-[1.2]">
                            Built for <span className="text-primary italic font-serif">organizational velocity</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Instant Ticketing", desc: "Automated Jira/Linear ticket creation from identified action items." },
                                { title: "CRM Harmonization", desc: "Bidirectional sync with Salesforce and HubSpot records." },
                                { title: "Semantic Search", desc: "Global search across all meeting history with natural language." },
                                { title: "Decision Tracking", desc: "Centralized record of all key stakeholder decisions." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="mt-1 flex-shrink-0 size-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                                        <CheckCircle2 className="size-3.5 text-zinc-500 group-hover:text-zinc-950 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                                        <p className="text-zinc-500 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Simulated UI Feature */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group lg:ml-10"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative rounded-[2rem] border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-3 shadow-2xl overflow-hidden shadow-primary/5">
                            <div className="h-8 bg-zinc-800/50 rounded-t-2xl flex items-center px-4 gap-1.5 border-b border-white/5">
                                <div className="size-2.5 rounded-full bg-zinc-600/50" />
                                <div className="size-2.5 rounded-full bg-zinc-600/50" />
                                <div className="size-2.5 rounded-full bg-zinc-600/50" />
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                            <Workflow className="size-5 text-primary" />
                                        </div>
                                        <div className="text-sm font-bold text-white tracking-tight text-glow">Auto-Flow Active</div>
                                    </div>
                                    <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">LIVE</div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 animate-pulse">
                                        <div className="h-2 w-1/3 bg-white/10 rounded mb-2" />
                                        <div className="h-2 w-2/3 bg-white/5 rounded" />
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="size-5 rounded-md bg-blue-500/20 flex items-center justify-center">
                                                <Layers className="size-3 text-blue-400" />
                                            </div>
                                            <div className="text-[10px] font-bold text-zinc-400">JIRA INTEGRATION</div>
                                        </div>
                                        <div className="text-xs text-white font-medium">Ticket #MEET-42 created: "Fix navbar hover gap"</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Bot className="size-4 text-primary" />
                                            <div className="text-[10px] font-bold text-primary">AGENT ACTION</div>
                                        </div>
                                        <div className="text-xs text-zinc-300 italic">"Sent summary to #product-updates Slack channel"</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Final CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,255,100,0.05)_0%,transparent_100%)]" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to work smarter?</h2>
                        <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">Join the high-growth engineering teams already using MeetSync to scale their organizational intelligence.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/sign-up">
                                <Button size="lg" className="h-14 px-10 rounded-2xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all hover:scale-105 shadow-xl shadow-white/5">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="ghost" className="h-14 px-10 rounded-2xl border border-white/10 text-white hover:bg-white/5 font-bold transition-all">
                                    Book a Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
