"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#121214] border border-white/10 rounded-lg p-3 shadow-xl">
                <p className="text-zinc-400 text-xs mb-1">{label}</p>
                <p className="text-primary font-bold text-sm">
                    {payload[0].value} Meetings
                </p>
            </div>
        )
    }
    return null
}

export function UsageChart({ data }: { data: any[] }) {
    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
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
                        domain={[0, 'auto']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="count"
                        fill="#3b82f6"
                        className="fill-primary"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
