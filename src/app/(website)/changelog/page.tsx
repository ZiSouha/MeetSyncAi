"use client";

import { History, Sparkles, Bug, Wrench, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const updates = [
    {
        date: "April 18, 2026",
        version: "v2.4.0",
        title: "Multi-language Diarization v2 & Sentiment UI",
        description: "We've completely overhauled how MeetSync understands multi-lingual conversations. Now supporting 14 languages with seamless mid-sentence switching. Plus, a new real-time sentiment analysis UI on the dashboard.",
        category: "Feature",
        icon: Sparkles,
        color: "text-primary bg-primary/10 border-primary/20",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        date: "April 10, 2026",
        version: "v2.3.5",
        title: "Salesforce Sync Performance Improvements",
        description: "Optimized the batched API calls for Salesforce integration. Sync times have been reduced by 40% for large enterprise workspaces.",
        category: "Improvement",
        icon: Wrench,
        color: "text-blue-400 bg-blue-400/10 border-blue-400/20"
    },
    {
        date: "April 2, 2026",
        version: "v2.3.4",
        title: "Fixed missing action items in short meetings",
        description: "Resolved an edge case where meetings under 3 minutes would sometimes fail to generate action items if the speaker spoke too quickly.",
        category: "Bug Fix",
        icon: Bug,
        color: "text-rose-400 bg-rose-400/10 border-rose-400/20"
    }
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 size-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 size-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-semibold text-zinc-300 mb-8 shadow-2xl">
                        <History className="size-4 text-primary" />
                        <span>Product Updates</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                        Fresh features, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 text-glow">shipped daily.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
                        New updates and improvements to MeetSync. We ship fast to keep your meetings efficient.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {updates.map((update, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative pl-8 md:pl-0"
                        >
                            <div className="md:grid md:grid-cols-[1fr_3fr] gap-8">
                                {/* Date Column */}
                                <div className="hidden md:block mt-1">
                                    <div className="sticky top-32 text-right">
                                        <div className="text-zinc-500 font-medium">{update.date}</div>
                                        <div className="text-sm font-bold text-zinc-700 mt-1">{update.version}</div>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="relative border-l-2 border-white/5 pl-8 md:border-l-0 md:pl-0">
                                    <div className="absolute -left-[37px] top-0 md:hidden size-3 rounded-full bg-primary ring-4 ring-zinc-950" />
                                    
                                    <div className="md:hidden text-zinc-500 font-medium mb-3">{update.date}</div>
                                    
                                    <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/80 transition-all duration-500 group shadow-2xl backdrop-blur-sm">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${update.color}`}>
                                                <update.icon className="size-3.5" />
                                                {update.category}
                                            </div>
                                            <div className="md:hidden text-sm font-bold text-zinc-600">{update.version}</div>
                                        </div>

                                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{update.title}</h2>
                                        <p className="text-lg text-zinc-400 leading-relaxed mb-6 font-light">
                                            {update.description}
                                        </p>

                                        {update.image && (
                                            <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 relative group-hover:border-primary/20 transition-colors">
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10" />
                                                <img src={update.image} alt={update.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center pb-12"
                >
                    <a href="#" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-medium transition-colors">
                        View older updates <ArrowRight className="size-4" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
