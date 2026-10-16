"use client"

import {
    Video,
    Bot,
    Zap,
    Clock,
    Plus,
    TrendingUp,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    MoreHorizontal
} from "lucide-react"
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { UpcomingMeetings } from "@/modules/integrations/ui/components/upcoming-meetings"

export const DashboardView = () => {
    const trpc = useTRPC();

    const { data: meetingsData } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ pageSize: 5 }));
    const { data: agentsData } = useSuspenseQuery(trpc.agents.getMany.queryOptions({ pageSize: 1 }));
    const { data: analytics } = useSuspenseQuery(trpc.analytics.getWorkspaceAnalytics.queryOptions({ days: 7 }));

    const stats = [
        { label: "Total sessions", value: meetingsData?.total?.toString() || "0", trend: "+12%", up: true },
        { label: "AI summaries", value: meetingsData?.items?.filter(m => m.status === 'completed').length.toString() || "0", trend: "+8%", up: true },
        { label: "Active agents", value: agentsData?.total?.toString() || "0", trend: "0%", up: true },
        { label: "Hours saved", value: analytics?.hoursSaved || "0.0", trend: "+15%", up: true },
    ];

    return (
        <div className="space-y-10">
            {/* Context Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Overview</h1>
                    <p className="text-sm text-zinc-500 mt-1">Manage your meetings and AI processing activity.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-9 px-4 rounded-md border-white/5 bg-white/5 hover:bg-white/10 text-xs font-medium">Export raw data</Button>
                    <Link href="/meetings">
                        <Button className="h-9 px-4 rounded-md bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold">
                            <Plus className="size-3.5 mr-2" />
                            New session
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="p-5 rounded-xl border border-white/5 bg-zinc-900/50 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-500">{stat.label}</span>
                            <div className={cn(
                                "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded",
                                stat.up ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
                            )}>
                                {stat.trend}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Session Table */}
                <div className="lg:col-span-2 rounded-xl border border-white/5 bg-zinc-900/50 overflow-hidden">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
                        <h3 className="text-sm font-semibold text-white">Recent sessions</h3>
                        <Link href="/meetings" className="text-xs text-zinc-500 hover:text-white transition-colors">View all</Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {meetingsData?.items?.slice(0, 5).map((meeting) => (
                            <Link key={meeting.id} href={`/meetings/${meeting.id}`} className="block group">
                                <div className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                                            <Video className="size-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors tracking-tight">{meeting.name}</p>
                                            <p className="text-xs text-zinc-500 mt-0.5">{new Date(meeting.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {meeting.sentimentScore !== null && (
                                            <div className="hidden sm:flex flex-col items-end gap-1">
                                                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-emerald-500/60" 
                                                        style={{ width: `${meeting.sentimentScore}%` }} 
                                                    />
                                                </div>
                                                <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-tighter">Positivity</span>
                                            </div>
                                        )}
                                        <Badge className="bg-white/5 border-white/10 text-zinc-400 text-[10px] uppercase font-bold px-2 py-0 h-6">
                                            {meeting.status}
                                        </Badge>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Vertical Sidebar Components */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Upcoming</h3>
                        </div>
                        <UpcomingMeetings />
                    </div>

                    <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-6 space-y-6">
                         <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Utilization</h3>
                            <span className="text-[10px] font-bold text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">Auto-scale</span>
                        </div>
                        <div className="h-24 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analytics?.usageTrend || []}>
                                    <defs>
                                        <linearGradient id="colorUsageSimple" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#10b981"
                                        fill="url(#colorUsageSimple)"
                                        strokeWidth={2}
                                        isAnimationActive={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-[11px] text-zinc-500 font-medium">Monthly usage limit</span>
                            <span className="text-[11px] text-zinc-300 font-bold">14% used</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
