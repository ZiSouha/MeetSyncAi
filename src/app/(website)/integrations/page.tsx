"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
    Layers, 
    ArrowRight, 
    Zap, 
    Database, 
    MessageSquare, 
    Search, 
    CheckCircle2, 
    Cpu, 
    Code2, 
    Puzzle,
    Cloud,
    Slack,
    Github,
    Trello,
    Workflow
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function IntegrationsPage() {
    const categories = [
        {
            title: "CRM & Insights",
            tools: [
                { name: "Salesforce", status: "Native", desc: "Two-way sync for leads and opportunities.", color: "text-blue-400" },
                { name: "HubSpot", status: "Native", desc: "Auto-log meetings and update deals instantly.", color: "text-orange-400" },
                { name: "Pipedrive", status: "Beta", desc: "Create activities from meeting transcripts.", color: "text-emerald-400" }
            ]
        },
        {
            title: "Engineering & Dev",
            tools: [
                { name: "Linear", status: "Premium", desc: "Turn action items into Linear issues automatically.", color: "text-indigo-400" },
                { name: "GitHub", status: "Native", desc: "Trigger PR comments from technical discussions.", color: "text-white" },
                { name: "Jira", status: "Native", desc: "Create tickets and update epics from syncs.", color: "text-blue-500" }
            ]
        },
        {
            title: "Knowledge Hubs",
            tools: [
                { name: "Notion", status: "Premium", desc: "Export transcripts and decision logs to your wiki.", color: "text-zinc-200" },
                { name: "Slack", status: "Native", desc: "Post real-time summaries to specific channels.", color: "text-purple-400" },
                { name: "Obsidian", status: "Labs", desc: "Local-first markdown export for personal notes.", color: "text-purple-500" }
            ]
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-40 pb-32 relative z-10 selection:bg-primary/30">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Hero */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium tracking-wide text-zinc-400 mb-8"
                    >
                        <Puzzle className="size-3.5 text-primary" />
                        <span>Ecosystem</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
                    >
                        Integrations
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto"
                    >
                        MeetSync fits perfectly into your existing workflow. Sync meeting data wherever your team lives.
                    </motion.p>
                </div>

                {/* Sub-Nav / Search */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-12 md:mb-20 border-b border-white/5 pb-8 md:pb-10">
                    <div className="flex items-center gap-6 md:gap-8 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 no-scrollbar scroll-smooth">
                        {["All", "Analytics", "Communication", "Engineering", "Sales"].map((cat) => (
                            <button key={cat} className="text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors shrink-0">
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                        <Input 
                            placeholder="Find an integration..." 
                            className="h-12 pl-12 bg-white/[0.03] border-white/5 rounded-2xl focus-visible:ring-0 focus-visible:border-primary/50 transition-all text-sm font-medium" 
                        />
                    </div>
                </div>

                {/* Integration Grid */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-24"
                >
                    {categories.map((category, idx) => (
                        <div key={idx}>
                            <div className="flex items-center gap-4 mb-10">
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] font-mono">
                                    {category.title}
                                </h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {category.tools.map((tool, tIdx) => (
                                    <motion.div 
                                        key={tIdx} 
                                        variants={item}
                                        className="group p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-primary/40 hover:bg-zinc-900/60 transition-all duration-500 shadow-2xl relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="flex items-start justify-between mb-10 relative z-10">
                                            <div className="size-16 rounded-[1.5rem] bg-zinc-950 border border-white/10 flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                                <Cloud className={`size-8 ${tool.color}`} />
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                                {tool.status}
                                            </div>
                                        </div>
                                        
                                        <div className="relative z-10">
                                            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">{tool.name}</h4>
                                            <p className="text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-400 transition-colors">
                                                {tool.desc}
                                            </p>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Documentation</span>
                                            <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-primary group-hover:text-zinc-950 transition-all">
                                                <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* High-End CTA Section */}
                <div className="mt-40 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-16 rounded-[3.5rem] bg-zinc-900/50 border border-white/5 text-center relative overflow-hidden backdrop-blur-3xl"
                    >
                        <div className="max-w-3xl mx-auto relative z-10">
                            <Workflow className="size-12 text-primary mx-auto mb-10" />
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">CUSTOM PROTOCOLS?</h3>
                            <p className="text-lg text-zinc-500 mb-12 font-medium">
                                Build your own neural connectors using our advanced Webhook API. Or request a specific hub prioritization from our labs team.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                                <Link href="/contact" className="w-full sm:w-auto flex-1 sm:flex-none">
                                    <Button size="lg" className="h-16 w-full sm:px-10 rounded-[1.25rem] bg-primary text-zinc-950 hover:bg-primary/90 font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20">
                                        Request Integration
                                    </Button>
                                </Link>
                                <Link href="/docs" className="w-full sm:w-auto flex-1 sm:flex-none">
                                    <Button size="lg" variant="outline" className="h-16 w-full sm:px-10 rounded-[1.25rem] text-white border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-xs transition-all">
                                        Open Documentation
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
