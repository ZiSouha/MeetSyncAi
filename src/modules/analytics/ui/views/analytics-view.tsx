"use client"

import { TrendingUp, PieChart as PieChartIcon, Activity, Clock, Zap, ArrowUpRight, BarChart3, Download } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, Tooltip, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const chartData = [
    { time: 'Mon', value: 40, duration: 120 },
    { time: 'Tue', value: 35, duration: 90 },
    { time: 'Wed', value: 55, duration: 180 },
    { time: 'Thu', value: 45, duration: 150 },
    { time: 'Fri', value: 70, duration: 240 },
    { time: 'Sat', value: 65, duration: 200 },
    { time: 'Sun', value: 85, duration: 300 },
];

const categoryData = [
    { name: 'Strategy', value: 400, color: '#10b981' },
    { name: 'Technical', value: 300, color: '#3b82f6' },
    { name: 'Product', value: 300, color: '#8b5cf6' },
    { name: 'Sales', value: 200, color: '#f59e0b' },
];

export const AnalyticsView = () => {
    const trpc = useTRPC();
    const { data: meetingsData } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ pageSize: 1 }));
    
    const totalMeetings = meetingsData?.total || 0;
    const hoursProcessed = (totalMeetings * 0.75).toFixed(1);

    return (
        <div className="space-y-8 flex flex-col min-h-full">
            {/* Serious Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Analytics</h1>
                    <p className="text-sm text-zinc-500 mt-1">Operational performance metrics and workspace utilization data.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 px-4 rounded-md border-white/5 bg-white/5 hover:bg-white/10 text-xs font-medium">
                        <Download className="size-3.5 mr-2" />
                        Download Report
                    </Button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Hours processed", value: `${hoursProcessed}h`, trend: "+12.5%", up: true, icon: Clock },
                    { label: "Context density", value: "98.2%", trend: "+1.2%", up: true, icon: Zap },
                    { label: "Action conversion", value: "74%", trend: "+5.4%", up: true, icon: TrendingUp },
                    { label: "Active nodes", value: "12", trend: "0%", up: true, icon: Activity },
                ].map((stat, i) => (
                    <div key={i} className="p-5 rounded-xl border border-white/5 bg-zinc-900/40 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                            <stat.icon className="size-3.5 text-zinc-700" />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                            <span className={`text-[10px] font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Usage Trend Area */}
                <div className="lg:col-span-2 p-8 rounded-xl border border-white/5 bg-zinc-900/40 space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Engagement Volume</h3>
                            <p className="text-xs text-zinc-500 mt-1">Total minutes processed per day across all agents.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="h-6 border-white/5 bg-white/5 text-[10px] uppercase font-bold text-zinc-500">Last 7 days</Badge>
                        </div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorUsageBlue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="time" 
                                    stroke="#27272a" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    dy={10}
                                />
                                <YAxis 
                                    stroke="#27272a" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#09090b',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="duration"
                                    stroke="#3b82f6"
                                    fill="url(#colorUsageBlue)"
                                    strokeWidth={2}
                                    isAnimationActive={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Secondary Cards Column */}
                <div className="space-y-6">
                    <div className="p-8 rounded-xl border border-white/5 bg-zinc-900/40 space-y-8 h-full flex flex-col">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Distribution</h3>
                            <BarChart3 className="size-4 text-zinc-700" />
                        </div>
                        
                        <div className="flex-1 min-h-[160px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={75}
                                        paddingAngle={4}
                                        dataKey="value"
                                        isAnimationActive={false}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#09090b',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            fontSize: '10px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-auto">
                            {categoryData.map((item, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.name}</span>
                                    </div>
                                    <p className="text-xs font-bold text-white ml-3.5">24.2%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
