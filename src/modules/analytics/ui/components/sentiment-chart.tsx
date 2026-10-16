"use client"

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { useTheme } from "next-themes"

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#121214] border border-white/10 rounded-lg p-3 shadow-xl">
                <p className="text-zinc-400 text-xs mb-1">{label}</p>
                <p className="text-emerald-500 font-bold text-sm">
                    {payload[0].value} Score
                </p>
            </div>
        )
    }
    return null
}

export function SentimentChart({ data }: { data: any[] }) {
    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#52525b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                    />
                    <YAxis
                        hide
                        domain={['-100', '100']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
