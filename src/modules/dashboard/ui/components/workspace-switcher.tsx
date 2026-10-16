"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Globe, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { MeetSyncLogo } from "@/modules/website/ui/components/meetsync-logo"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function WorkspaceSwitcher() {
    const [activeWorkspace] = React.useState({
        name: "Personal Workspace",
        plan: "Free Tier",
    })

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            tooltip={activeWorkspace.name}
                            className="h-12 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center data-[state=open]:bg-white/5 data-[state=open]:text-white rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-200 group"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#00C896]/10 border border-[#00C896]/20 shadow-[0_0_12px_rgba(0,200,150,0.15)] group-hover:scale-105 transition-transform shrink-0">
                                <MeetSyncLogo size="sm" iconOnly showContainer={false} />
                            </div>
                            <div className="grid flex-1 text-left leading-tight ml-2 group-data-[collapsible=icon]:hidden">
                                <span className="truncate font-bold text-[13px] text-white tracking-tight group-hover:text-[#00C896] transition-colors">
                                    {activeWorkspace.name}
                                </span>
                                <span className="truncate text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
                                    {activeWorkspace.plan}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-3.5 text-zinc-500 group-hover:text-white transition-colors group-data-[collapsible=icon]:hidden" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border-white/10 p-2 shadow-2xl z-50"
                        align="start"
                        side="bottom"
                        sideOffset={8}
                    >
                        <DropdownMenuLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 py-2">
                            Switch Workspace
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="gap-3 p-2.5 rounded-xl focus:bg-white/5 cursor-pointer group">
                            <div className="flex size-7 items-center justify-center rounded-lg border border-[#00C896]/30 bg-[#00C896]/10 text-[#00C896] group-hover:border-[#00C896]/60 transition-all">
                                <MeetSyncLogo size="sm" iconOnly showContainer={false} />
                            </div>
                            <span className="font-bold text-white text-xs">{activeWorkspace.name}</span>
                            <DropdownMenuShortcut className="text-[10px] font-mono border border-white/10 rounded px-1.5 py-0.5 ml-auto">⌘1</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <div className="h-px bg-white/5 my-1" />
                        <DropdownMenuItem className="gap-3 p-2.5 rounded-xl focus:bg-white/5 cursor-pointer group text-zinc-400 hover:text-white transition-colors">
                            <div className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-white/20 transition-all">
                                <Plus className="size-3.5" />
                            </div>
                            <div className="font-medium text-xs">Create Workspace</div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5 my-1" />
                        <DropdownMenuItem asChild className="gap-3 p-2.5 rounded-xl focus:bg-white/5 cursor-pointer text-zinc-300 hover:text-white transition-colors">
                            <Link href="/" className="flex items-center gap-2.5 w-full">
                                <div className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-[#00C896]/30 transition-all">
                                    <Globe className="size-3.5 text-[#00C896]" />
                                </div>
                                <div className="font-medium text-xs">Back to Public Website</div>
                                <ArrowUpRight className="size-3 text-zinc-500 ml-auto" />
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
