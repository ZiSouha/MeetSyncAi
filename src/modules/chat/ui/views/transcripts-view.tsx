"use client"

import { motion } from "framer-motion"
import { FileText, Search, Sparkles, Clock, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const TranscriptsView = () => {
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
                    <FileText className="size-3.5 text-primary" />
                    Textual Intelligence Indexing Active
                </motion.div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Neural <span className="text-primary italic">Transcripts</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl">
                            The raw conversational substrate of your organization, <span className="text-white font-medium">fully searchable and indexed</span>. Semantic search enabled.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search & Filter Area */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col md:flex-row items-center gap-4 p-1 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
            >
                <div className="flex-1 w-full relative group/search">
                    <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within/search:text-primary transition-colors" />
                    <Input
                        placeholder="Search across all dialogues..."
                        className="h-12 w-full pl-12 bg-transparent border-none text-white focus-visible:ring-0 placeholder:text-zinc-600"
                    />
                </div>
                <div className="h-8 w-px bg-white/10 hidden md:block" />
                <Button variant="ghost" className="h-10 rounded-xl px-4 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 uppercase tracking-widest gap-2">
                    <Filter className="size-4" />
                    Filter Matrix
                </Button>
            </motion.div>

            {/* Results Grid */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-1 gap-6"
            >
                {[
                    { title: "Quarterly Alignment", date: "2h ago", preview: "The primary objective for Q3 is to scale the neural infrastructure to support 10k concurrent..." },
                    { title: "Product Roadmap Sync", date: "Yesterday", preview: "We need to ensure that the security protocols match the SAML 2.0 requirements before the..." },
                    { title: "Design Systems Workshop", date: "2 days ago", preview: "The glassmorphic elements should maintain a background blur of at least 20px to ensure..." },
                ].map((item, i) => (
                    <div key={i} className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 cursor-pointer">
                        <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{item.title}</p>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.date}</span>
                            </div>
                            <p className="text-zinc-500 line-clamp-1 font-medium italic">"{item.preview}"</p>
                        </div>
                        <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:bg-primary group-hover:text-zinc-950 group-hover:scale-110 transition-all duration-500 shrink-0">
                            <ChevronRight className="size-6" />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
