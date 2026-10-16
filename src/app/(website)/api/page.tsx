"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Copy, Terminal, ChevronRight, Hash, Globe, Key, Webhook, Database, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const endpoints = [
    {
        id: "list-meetings",
        title: "List Meetings",
        method: "GET",
        path: "/v1/meetings",
        description: "Retrieve a paginated list of all meeting artifacts within your current workspace. Supports filtering by date and participant count.",
        params: [
            { name: "limit", type: "integer", desc: "Results per page (max 100)." },
            { name: "offset", type: "integer", desc: "Pagination offset." }
        ],
        curl: `curl -G https://api.meetsync.com/v1/meetings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d limit=10`,
        response: `{
  "object": "list",
  "data": [
    {
      "id": "mtg_7H8x...",
      "topic": "Strategy Sync",
      "created_at": 1713484800
    }
  ],
  "has_more": true
}`
    },
    {
        id: "get-meeting",
        title: "Get Meeting Details",
        method: "GET",
        path: "/v1/meetings/:id",
        description: "Fetch comprehensive intelligence for a specific meeting session, including the full transcript, AI summary, and sentiment analytics.",
        params: [
            { name: "id", type: "string", desc: "The unique meeting identifier." }
        ],
        curl: `curl https://api.meetsync.com/v1/meetings/mtg_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
        response: `{
  "id": "mtg_123",
  "topic": "Weekly Sync",
  "duration": 1800,
  "sentiment": 0.92,
  "summary": "Project rollout is on track..."
}`
    },
    {
        id: "create-webhook",
        title: "Register Webhook",
        method: "POST",
        path: "/v1/webhooks",
        description: "Enable real-time synchronization. Subscribe to events like 'meeting.completed' or 'transcript.ready' to bridge data to your internal systems.",
        params: [
            { name: "url", type: "string", desc: "Your endpoint URL." },
            { name: "events", type: "array", desc: "List of event types." }
        ],
        curl: `curl -X POST https://api.meetsync.com/v1/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d url="https://hooks.yourdomain.com"`,
        response: `{
  "id": "whk_9aJ2...",
  "status": "active",
  "secret": "whsec_..."
}`
    }
];

export default function ApiPage() {
    const [activeTab, setActiveTab] = useState<Record<string, 'req' | 'res'>>({
        "list-meetings": 'req',
        "get-meeting": 'req',
        "create-webhook": 'req'
    });

    return (
        <div className="min-h-screen pt-40 pb-32 relative z-10 selection:bg-primary/30">
            {/* Ambient Backlight */}
            <div className="absolute top-0 right-0 w-full max-w-[800px] h-full bg-primary/5 blur-[120px] pointer-events-none opacity-40" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-[1fr_450px] gap-20">
                    
                    {/* Documentation Column */}
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-20"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-8">
                                <Terminal className="size-3 text-primary" />
                                <span>Rest Protocol v1.4</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                                API Reference
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed font-light mb-10 max-w-2xl">
                                Deploy meeting intelligence programmatically. Our REST API provides programmatic access to your neural data lake, transcripts, and autonomous summaries.
                            </p>
                            <div className="flex items-center gap-6">
                                <Button className="h-12 px-8 rounded-xl bg-primary text-zinc-950 font-bold hover:bg-primary/90 shadow-xl shadow-primary/10">
                                    Manage API Keys
                                </Button>
                                <Button variant="outline" className="h-12 px-8 rounded-xl text-white border-white/10 hover:bg-white/5 font-semibold">
                                    Auth Guide
                                </Button>
                            </div>
                        </motion.div>

                        <div className="space-y-32">
                            {endpoints.map((ep) => (
                                <section key={ep.id} id={ep.id} className="scroll-mt-48">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={cn(
                                            "px-3 py-1 rounded-lg text-xs font-black font-mono",
                                            ep.method === "GET" ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400"
                                        )}>
                                            {ep.method}
                                        </div>
                                        <code className="text-xl font-bold text-white tracking-tight">{ep.path}</code>
                                    </div>
                                    
                                    <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">{ep.title}</h2>
                                    <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                                        {ep.description}
                                    </p>

                                    <div className="space-y-6">
                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-2">Parameters</div>
                                        <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
                                            {ep.params.map((param, pIdx) => (
                                                <div key={pIdx} className="p-5 flex items-start gap-12 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                                    <div className="min-w-[80px]">
                                                        <div className="text-sm font-bold text-white">{param.name}</div>
                                                        <div className="text-[10px] font-mono text-zinc-600 uppercase">{param.type}</div>
                                                    </div>
                                                    <div className="text-sm text-zinc-500 italic">
                                                        {param.desc}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* Code Pane Column */}
                    <div className="hidden lg:block relative">
                        <div className="sticky top-40 space-y-8">
                            {/* Visual Hint */}
                            <div className="p-8 rounded-[2rem] bg-zinc-950 border border-white/5 shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-3xl opacity-20 pointer-events-none" />
                                
                                {endpoints.map((ep) => (
                                    <div key={ep.id} className="mb-0 overflow-hidden">
                                        <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
                                            <div className="flex gap-1.5 ml-2">
                                                <div className="size-2.5 rounded-full bg-red-500/20" />
                                                <div className="size-2.5 rounded-full bg-amber-500/20" />
                                                <div className="size-2.5 rounded-full bg-emerald-500/20" />
                                            </div>
                                            <div className="flex-1 text-[10px] font-mono text-zinc-600 text-center tracking-widest">SHELL API v1</div>
                                            <div className="flex bg-white/5 rounded-lg p-1">
                                                <button 
                                                    onClick={() => setActiveTab(prev => ({ ...prev, [ep.id]: 'req' }))}
                                                    className={cn(
                                                        "px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all",
                                                        activeTab[ep.id] === 'req' ? "bg-zinc-800 text-white" : "text-zinc-600 hover:text-zinc-400"
                                                    )}
                                                >
                                                    Req
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab(prev => ({ ...prev, [ep.id]: 'res' }))}
                                                    className={cn(
                                                        "px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all",
                                                        activeTab[ep.id] === 'res' ? "bg-zinc-800 text-white" : "text-zinc-600 hover:text-zinc-400"
                                                    )}
                                                >
                                                    Res
                                                </button>
                                            </div>
                                        </div>

                                        <div className="relative font-mono text-[13px] leading-relaxed p-4 rounded-xl bg-black/40 border border-white/5 mb-8">
                                            <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 transition-all opacity-0 group-hover:opacity-100">
                                                <Copy className="size-3.5" />
                                            </button>
                                            <pre className={cn(
                                                "transition-opacity duration-300",
                                                activeTab[ep.id] === 'req' ? "opacity-100" : "hidden"
                                            )}>
                                                <code className="text-zinc-300">{ep.curl}</code>
                                            </pre>
                                            <pre className={cn(
                                                "transition-opacity duration-300",
                                                activeTab[ep.id] === 'res' ? "opacity-100 text-emerald-400" : "hidden"
                                            )}>
                                                <code>{ep.response}</code>
                                            </pre>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Metadata */}
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/docs/webhooks" className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                                    <Webhook className="size-5 text-zinc-600 group-hover:text-primary mb-3 transition-colors" />
                                    <div className="text-xs font-bold text-white mb-1">Webhooks</div>
                                    <div className="text-[10px] text-zinc-600">Event-driven sync</div>
                                </Link>
                                <Link href="/docs/api-keys" className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                                    <Key className="size-5 text-zinc-600 group-hover:text-primary mb-3 transition-colors" />
                                    <div className="text-xs font-bold text-white mb-1">Auth</div>
                                    <div className="text-[10px] text-zinc-600">Bearer Token v1.2</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
