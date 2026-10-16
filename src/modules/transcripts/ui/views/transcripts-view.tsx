"use client"

import { FileText, Search, Clock, ChevronRight, Filter, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export const TranscriptsView = () => {
    const transcripts = [
        { title: "Quarterly Alignment", date: "2h ago", preview: "The primary objective for Q3 is to scale the production infrastructure to support 10k concurrent sessions across all regions.", length: "42m" },
        { title: "Product Roadmap Sync", date: "Yesterday", preview: "We need to ensure that the security protocols match the SAML 2.0 requirements before the enterprise rollout scheduled for next month.", length: "15m" },
        { title: "Design Systems Workshop", date: "2 days ago", preview: "The interface elements should maintain a background contrast of at least 4.5:1 to ensure accessibility compliance...", length: "1h 12m" },
    ];

    return (
        <div className="space-y-8 flex flex-col min-h-full">
            {/* Serious Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Transcripts</h1>
                    <p className="text-sm text-zinc-500 mt-1">Searchable archive of all conversational records and summaries.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 border-white/10 hover:bg-white/5 text-xs font-bold text-zinc-400">Export All</Button>
                </div>
            </div>

            {/* Filter Hub */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/40 p-1.5 rounded-lg border border-white/5">
                <div className="flex-1 w-full relative">
                    <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                    <Input 
                        placeholder="Search transcripts by keyword..." 
                        className="h-8 pl-9 bg-transparent border-none text-xs focus-visible:ring-0" 
                    />
                </div>
                <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors gap-2">
                    <Filter className="size-3" />
                    Advanced Filters
                </Button>
            </div>

            {/* Transcription List */}
            <div className="flex-1 rounded-xl border border-white/5 bg-zinc-900/40 overflow-hidden min-h-[400px] divide-y divide-white/5">
                {transcripts.map((item, i) => (
                    <div key={i} className="group p-6 hover:bg-white/[0.01] transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-500">
                                    <AlignLeft className="size-4" />
                                </div>
                                <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                <Badge variant="outline" className="h-5 px-1.5 text-[9px] font-bold text-zinc-600 border-white/5">{item.length}</Badge>
                            </div>
                            <p className="text-xs text-zinc-500 line-clamp-1 italic font-medium">"{item.preview}"</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{item.date}</span>
                            <div className="size-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-primary group-hover:text-zinc-950 transition-all">
                                <ChevronRight className="size-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="py-6 border-t border-white/5 flex justify-center">
                 <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-white">Load Archive History</Button>
            </div>
        </div>
    )
}
