"use client";

import { Button } from "@/components/ui/button";
import { Rocket, Heart, Zap, Globe, ArrowRight, Code2, Presentation, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const positions = [
    { title: "Senior Machine Learning Engineer", team: "Engineering", location: "Remote (US/EU)", type: "Full-time" },
    { title: "Product Designer (UX)", team: "Design", location: "New York / Remote", type: "Full-time" },
    { title: "Founding Account Executive", team: "Sales", location: "San Francisco", type: "Full-time" },
    { title: "Staff Backend Engineer (Rust)", team: "Engineering", location: "Remote", type: "Full-time" }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] left-[-10%] size-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Hero section */}
                <div className="text-center max-w-3xl mx-auto mb-32">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-semibold text-zinc-300 mb-8 shadow-xl"
                    >
                        <Rocket className="size-4 text-primary" />
                        <span>Join the Mission</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]"
                    >
                        Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">invisible intelligence</span> layer.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 leading-relaxed font-light"
                    >
                        We are a distributed team of researchers, engineers, and designers working to make meetings a source of truth, not a source of frustration.
                    </motion.p>
                </div>

                {/* Culture Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 mb-32"
                >
                    {[
                        { icon: Heart, title: "Customer Obsessed", desc: "We build for the end-user. Everything starts and ends with making their workflow magical." },
                        { icon: Zap, title: "Ship Fast, Learn Faster", desc: "No red tape. We deploy to production daily and iterate based on real telemetry." },
                        { icon: Globe, title: "Work from Anywhere", desc: "Async-first culture. We care about brilliant output, not what time zone you're in." }
                    ].map((value, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group">
                            <div className="size-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                                <value.icon className="size-6 text-zinc-400 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-zinc-500 font-light leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Roles Section */}
                <div className="max-w-4xl mx-auto" id="roles">
                    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Open Positions</h2>
                            <p className="text-zinc-400">Join us in shaping the future of work.</p>
                        </div>
                        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Hiring
                        </div>
                    </div>

                    <div className="space-y-4">
                        {positions.map((pos) => (
                                <Link key={pos.title} href="/contact" className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-primary/30 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer shadow-lg">
                                    <div className="mb-6 md:mb-0">
                                        <div className="text-xs font-bold tracking-wider text-primary mb-2 uppercase">{pos.team}</div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{pos.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                                            <span>{pos.location}</span>
                                            <span className="size-1 rounded-full bg-zinc-700" />
                                            <span>{pos.type}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                                        <span className="text-sm font-medium text-zinc-300">Apply</span>
                                        <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10">
                                            <ArrowRight className="size-4 text-white group-hover:text-primary" />
                                        </div>
                                    </div>
                                </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
