"use client"

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import {
    CircleCheckIcon,
    CircleXIcon,
    ClockArrowUpIcon,
    ClockIcon,
    CornerRightDownIcon,
    Loader2Icon,
    ChevronRightIcon,
    CalendarIcon,
    UserIcon,
} from "lucide-react"
import Link from "next/link";

import { cn, formatDuration } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { MeetingGetMany } from "../../types"

const statusIconMap = {
    upcoming: ClockArrowUpIcon,
    active: Loader2Icon,
    completed: CircleCheckIcon,
    processing: Loader2Icon,
    cancelled: CircleXIcon,
};

const statusColorMap = {
    upcoming: "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    active: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]",
    processing: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20 shadow-[0_0_15px_rgba(113,113,122,0.1)]",
}

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
    {
        accessorKey: "name",
        header: () => <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Meeting Session</span>,
        cell: ({ row }) => (
            <div className="flex flex-col gap-y-2 group">
                <div className="flex items-center gap-x-2.5">
                    <span className="font-bold text-lg text-white group-hover:text-emerald-500 transition-colors capitalize tracking-tight">
                        {row.original.name}
                    </span>
                    <ChevronRightIcon className="size-4 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center gap-x-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05] group-hover:border-emerald-500/20 transition-colors">
                        <GeneratedAvatar
                            variant="botttsNeutral"
                            seed={row.original.agent.name}
                            className="size-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest leading-none">
                            {row.original.agent.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-x-2 text-zinc-500 font-bold group-hover:text-zinc-400 transition-colors">
                        <CalendarIcon className="size-3.5" />
                        <span className="text-[10px] uppercase tracking-widest leading-none">
                            {row.original.startedAt ? format(row.original.startedAt, "PPP") : "TBD"}
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    {
        accessorKey: "status",
        header: () => <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Stage</span>,
        cell: ({ row }) => {
            const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap];

            return (
                <div className="flex items-center">
                    <Badge
                        variant="outline"
                        className={cn(
                            "h-9 rounded-xl border px-5 font-black uppercase text-[10px] tracking-widest gap-2.5 flex items-center shadow-lg transition-all duration-300",
                            statusColorMap[row.original.status as keyof typeof statusColorMap]
                        )}
                    >
                        <Icon className={cn(
                            "size-3.5",
                            (row.original.status === "processing" || row.original.status === "active") && "animate-spin"
                        )} />
                        {row.original.status}
                    </Badge>
                </div>
            )
        },
    },
    {
        accessorKey: "duration",
        header: () => <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Length</span>,
        cell: ({ row }) => (
            <div className="flex items-center gap-4 group/item">
                <div className="size-10 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover/item:border-blue-500/30 group-hover/item:bg-blue-500/5 flex items-center justify-center transition-all duration-300">
                    <ClockIcon className="size-5 text-blue-400" />
                </div>
                <div className="flex flex-col gap-y-0.5">
                    <span className="text-base font-bold text-white tracking-tight">
                        {row.original.duration ? formatDuration(row.original.duration) : "0s"}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.15em] leading-none">Duration</span>
                </div>
            </div>
        )
    }
]