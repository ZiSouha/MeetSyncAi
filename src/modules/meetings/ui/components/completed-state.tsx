"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Markdown from "react-markdown"
import { motion } from "framer-motion"

import { MeetingGetOne } from "../../types";
import {
    FileText,
    BookOpen,
    Video,
    MessageSquare,
    Calendar,
    Clock,
    User,
    ChevronRight,
    Download,
} from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
    data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
    return (
        <div className="space-y-12">
            <Tabs defaultValue="summary" className="w-full">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-1 overflow-x-auto scrollbar-none">
                    <TabsList className="bg-transparent h-12 p-0 gap-8 justify-start">
                        {[
                            { value: "summary", icon: BookOpen, label: "Analysis" },
                            { value: "transcript", icon: FileText, label: "Transcript" },
                            { value: "recording", icon: Video, label: "Recording" },
                            { value: "chat", icon: MessageSquare, label: "Chat" },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="h-12 rounded-none px-0 border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-primary text-zinc-500 font-semibold text-sm transition-all shadow-none"
                            >
                                <tab.icon className="size-4 mr-2" />
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value="recording" className="mt-0 outline-none">
                    <div className="rounded-xl border border-white/5 bg-zinc-900/50 overflow-hidden aspect-video relative shadow-2xl">
                        <video
                            src={data.recordingUrl!}
                            className="w-full h-full object-cover"
                            controls
                        />
                    </div>
                </TabsContent>

                <TabsContent value="summary" className="mt-0 outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Summary Content */}
                        <div className="lg:col-span-2 rounded-xl bg-zinc-900/40 border border-white/5 p-10 space-y-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold text-white tracking-tight">Meeting Summary</h2>
                                    <Badge variant="secondary" className="h-5 px-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/10">Processed</Badge>
                                </div>
                                <div className="prose prose-invert prose-sm max-w-none prose-p:text-zinc-400 prose-p:leading-relaxed prose-strong:text-white">
                                    <Markdown
                                        components={{
                                            h1: (props) => <h1 className="text-xl font-bold mt-8 mb-4 text-white" {...props} />,
                                            h2: (props) => <h2 className="text-lg font-bold mt-6 mb-3 text-white" {...props} />,
                                            p: (props) => <p className="mb-4 text-zinc-400 leading-relaxed" {...props} />,
                                            li: (props) => <li className="text-zinc-400 my-1" {...props} />,
                                        }}
                                    >
                                        {data.summary}
                                    </Markdown>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Context */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-xl border border-white/5 bg-zinc-900/40 space-y-6">
                                <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest border-b border-white/5 pb-4">Key Insights</h3>
                                
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Sentiment</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`size-2 rounded-full ${
                                                (data.sentimentScore ?? 0) > 20 ? "bg-emerald-500" : 
                                                (data.sentimentScore ?? 0) < -20 ? "bg-rose-500" : "bg-amber-500"
                                            }`} />
                                            <span className="text-xs font-semibold text-white">
                                                {(data.sentimentScore ?? 0) > 20 ? "Mostly Positive" : 
                                                 (data.sentimentScore ?? 0) < -20 ? "Mostly Negative" : "Neutral"}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1.5 pt-4">
                                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Sentiment Score</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full transition-all ${
                                                        (data.sentimentScore ?? 0) > 20 ? "bg-emerald-500" : 
                                                        (data.sentimentScore ?? 0) < -20 ? "bg-rose-500" : "bg-amber-500"
                                                    }`}
                                                    style={{ width: `${Math.abs(data.sentimentScore ?? 0)}%` }} 
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-400">{data.sentimentScore ?? 0}%</span>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button className="w-full h-10 rounded-md bg-white text-zinc-950 font-bold hover:bg-zinc-200 text-xs">
                                            Export Action Items
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl border border-white/5 bg-zinc-900/40 space-y-4">
                                <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Participants</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: "John Doe", role: "Organizer" },
                                        { name: "Sarah Chen", role: "Lead Engineer" },
                                        { name: data.agent.name, role: "AI Assistant" }
                                    ].map((p, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="size-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-600">
                                                {p.name[0]}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-zinc-200 leading-none">{p.name}</span>
                                                <span className="text-[9px] text-zinc-600 font-medium">{p.role}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="transcript" className="mt-0 outline-none">
                    <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-10 min-h-[500px]">
                        <div className="flex items-center justify-between border-b border-white/5 pb-8 mb-10">
                            <div>
                                <h3 className="text-sm font-semibold text-white">Full Transcript</h3>
                                <p className="text-xs text-zinc-500 mt-0.5">Automated transcription synced with recording.</p>
                            </div>
                            <Button variant="outline" size="sm" className="h-8 border-white/10 text-[10px] font-bold">
                                <Download className="size-3 mr-2" />
                                Download .VTT
                            </Button>
                        </div>

                        <div className="space-y-8 max-w-3xl">
                             {[
                                { speaker: "John Doe", time: "00:02", text: "Alright everyone, thanks for joining. Today we need to lock in the roadmap for the sync engine integration. I want to start with the latency benchmarks." },
                                { speaker: "Sarah Chen", time: "00:45", text: "Regarding latency, we've managed to optimize the state synchronization down to 80ms. It's stable across regional clusters, but we're still seeing some jitter in the stream processing." },
                                { speaker: "AI Assistant", time: "01:12", text: "Noted. I'll highlight the 80ms benchmark in the technical summary. Should I prioritize the jitter logs for the next sprint?" },
                                { speaker: "John Doe", time: "02:05", text: "Yes, definitely. Sarah, please coordinate with the QA team on that audit." }
                            ].map((msg, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-16 shrink-0 pt-1 text-right">
                                        <span className="text-[10px] font-bold text-zinc-700 tabular-nums">{msg.time}</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-bold text-primary/80 uppercase tracking-wide">{msg.speaker}</span>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                                            {msg.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="chat" className="mt-0 outline-none">
                    <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-20 flex flex-col items-center justify-center text-center">
                        <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                            <MessageSquare className="size-8 text-zinc-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Meeting Chat</h3>
                        <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2 leading-relaxed">
                            Interrogate the meeting record. Ask for takeaways, specific mentions, or key technical decisions.
                        </p>
                        <Button className="mt-8 h-10 px-8 rounded-md bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all text-xs">
                            Start Conversation
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}