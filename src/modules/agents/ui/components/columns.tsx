"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentsGetMany } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerRightDownIcon, VideoIcon, ChevronRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const columns: ColumnDef<AgentsGetMany[number]>[] = [
    {
        accessorKey: "name",
        header: () => <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Agent Identity</span>,
        cell: ({ row }) => (
            <div className="flex items-center gap-x-4 group">
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <GeneratedAvatar
                        variant="botttsNeutral"
                        seed={row.original.name}
                        className="size-12 rounded-2xl border border-white/[0.05] bg-zinc-900 group-hover:border-emerald-500/50 transition-all duration-500 shadow-xl relative z-10"
                    />
                    <div className="absolute -bottom-1 -right-1 size-5 bg-emerald-500 rounded-full border-2 border-[#0A0A0B] flex items-center justify-center z-20 shadow-lg">
                        <div className="size-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-0.5">
                    <span className="font-bold text-lg text-white group-hover:text-emerald-500 transition-colors capitalize tracking-tight">
                        {row.original.name}
                    </span>
                    <div className="flex items-center gap-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active Neural Link</span>
                        <ChevronRightIcon className="size-3 text-emerald-500" />
                    </div>
                </div>
            </div>
        )
    },
    {
        accessorKey: "instructions",
        header: () => <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Neural Instructions</span>,
        cell: ({ row }) => (
            <div className="flex items-start gap-x-3 max-w-[450px]">
                <CornerRightDownIcon className="size-4 text-emerald-500/30 mt-1 shrink-0" />
                <span className="text-sm text-zinc-400 leading-relaxed line-clamp-2 font-medium">
                    {row.original.instructions}
                </span>
            </div>
        )
    },
    {
        accessorKey: "meetingCount",
        header: () => <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Processed Data</span>,
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <Badge
                    variant="outline"
                    className="h-9 rounded-xl border-white/[0.05] bg-white/[0.03] text-white font-black px-4 gap-2.5 flex items-center shadow-lg group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5 transition-all duration-500"
                >
                    <VideoIcon className="size-4 text-emerald-500" />
                    <span className="text-sm tracking-tight">{row.original.meetingCount}</span>
                </Badge>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{row.original.meetingCount === 1 ? "Session" : "Sessions"}</span>
            </div>
        )
    }
]
