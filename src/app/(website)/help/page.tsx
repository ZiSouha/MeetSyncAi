"use client";

import { LifeBuoy, Search, Book, PlayCircle, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
    { title: "Getting Started", icon: PlayCircle, articles: 12 },
    { title: "Account & Billing", icon: ShieldCheck, articles: 8 },
    { title: "Integrations (CRM)", icon: Book, articles: 24 },
];

export default function HelpPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                
                {/* Search Hero */}
                <div className="text-center max-w-3xl mx-auto mb-20 relative z-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="size-20 rounded-[2rem] bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20"
                    >
                        <LifeBuoy className="size-10 text-zinc-950" />
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-extrabold text-white mb-8 tracking-tight"
                    >
                        How can we help?
                    </motion.h1>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative max-w-2xl mx-auto group"
                    >
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search for answers..." 
                            className="w-full h-16 bg-zinc-900/80 border border-white/10 rounded-2xl pl-16 pr-6 text-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary backdrop-blur-xl shadow-2xl transition-all"
                        />
                    </motion.div>
                </div>

                {/* Categories */}
                <div className="grid md:grid-cols-3 gap-6 mb-24">
                    {categories.map((cat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer group"
                        >
                            <cat.icon className="size-8 text-primary mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                            <p className="text-zinc-500 font-medium">{cat.articles} articles</p>
                        </motion.div>
                    ))}
                </div>

                {/* Popular Articles */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto border border-white/10 rounded-[2rem] bg-zinc-900/30 backdrop-blur-md overflow-hidden"
                >
                    <div className="p-8 border-b border-white/10 bg-white/[0.02]">
                        <h2 className="text-2xl font-bold text-white">Popular Articles</h2>
                    </div>
                    <div>
                        {[
                            "How to connect Salesforce to MeetSync",
                            "Understanding admin role permissions",
                            "Troubleshooting Zoom bot entry issues",
                            "Configuring custom vocabulary for transcriptions"
                        ].map((article, i) => (
                            <a key={i} href="#" className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 hover:bg-white/5 transition-colors group">
                                <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">{article}</span>
                                <ChevronRight className="size-5 text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </a>
                        ))}
                    </div>
                    <div className="p-6 text-center bg-white/[0.01]">
                        <a href="#" className="text-primary font-medium text-sm hover:text-white transition-colors flex items-center justify-center gap-2">
                            View all articles <ArrowRight className="size-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
