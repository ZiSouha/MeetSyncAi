"use client";

import {
    Bot,
    Video,
    LayoutDashboard,
    Settings,
    Users,
    History,
    PieChart,
    Search,
    Globe,
    ArrowUpRight,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./dashboard-user-button";
import { useEffect, useState } from "react";
import { WorkspaceSwitcher } from "./workspace-switcher";
import Cookies from "js-cookie";

export const DashboardSidebar = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [, setPlan] = useState<string>("Free");

    useEffect(() => {
        setMounted(true);
        const savedPlan = Cookies.get("meetsync_plan") || "Free";
        setPlan(savedPlan);
    }, []);

    const navGroups = [
        {
            label: "Product",
            items: [
                { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
                { icon: Video, label: "Meetings", href: "/meetings" },
                { icon: Bot, label: "AI Agents", href: "/agents" },
            ]
        },
        {
            label: "Analytics",
            items: [
                { icon: History, label: "Transcripts", href: "/transcripts" },
                { icon: PieChart, label: "Analytics", href: "/analytics" },
            ]
        },
        {
            label: "Workspace",
            items: [
                { icon: Users, label: "Team", href: "/team" },
                { icon: Settings, label: "Settings", href: "/settings" },
            ]
        }
    ];

    const openSearch = () => {
        const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
        document.dispatchEvent(event);
    };

    return (
        <Sidebar className="border-r border-white/5 bg-zinc-950" collapsible="icon">
            <SidebarHeader className="h-16 flex items-center px-4 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:justify-center border-b border-white/5">
                <WorkspaceSwitcher />
            </SidebarHeader>

            <SidebarContent className="px-3 group-data-[collapsible=icon]:px-1.5 pt-4 group-data-[collapsible=icon]:pt-3">
                <div className="mb-3 px-1 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                    <button
                        onClick={openSearch}
                        type="button"
                        title="Quick search (⌘K)"
                        className="w-full h-8 group-data-[collapsible=icon]:size-8 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-md px-2.5 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                        <Search className="size-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate group-data-[collapsible=icon]:hidden">Quick search</span>
                        <kbd className="ml-auto text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 font-mono group-data-[collapsible=icon]:hidden">⌘K</kbd>
                    </button>
                </div>

                {navGroups.map((group) => (
                    <SidebarGroup key={group.label} className="mt-1 group-data-[collapsible=icon]:p-0">
                        <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                            {group.label}
                        </div>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-0.5 group-data-[collapsible=icon]:items-center">
                                {group.items.map((item) => {
                                    const isActive = mounted && pathname === item.href;
                                    return (
                                        <SidebarMenuItem key={item.label}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.label}
                                                className={cn(
                                                    "h-8 rounded-md transition-colors group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0",
                                                    isActive 
                                                        ? "bg-white/10 text-white font-medium shadow-sm" 
                                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                                                )}
                                                isActive={isActive}
                                            >
                                                <Link href={item.href} className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
                                                    <item.icon className={cn("size-4 shrink-0", isActive ? "text-[#00C896]" : "text-zinc-400")} />
                                                    <span className="text-xs group-data-[collapsible=icon]:hidden truncate">{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}

                {/* Back to Public Website Link in Sidebar */}
                <SidebarGroup className="mt-auto pt-3 border-t border-white/5 group-data-[collapsible=icon]:p-0">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-0.5 group-data-[collapsible=icon]:items-center">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Visit Public Website"
                                    className="h-8 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
                                >
                                    <Link href="/" className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
                                        <Globe className="size-4 text-[#00C896] shrink-0" />
                                        <span className="text-xs group-data-[collapsible=icon]:hidden truncate">Public Website</span>
                                        <ArrowUpRight className="size-3 text-zinc-500 ml-auto group-data-[collapsible=icon]:hidden" />
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-white/5 p-3 group-data-[collapsible=icon]:p-1.5 space-y-2">
                <div className="px-2.5 py-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between text-[11px] group-data-[collapsible=icon]:hidden">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Created by</span>
                        <span className="text-zinc-200 font-medium">Ziane Souhayl</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <a 
                            href="https://github.com/ZiSouha" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title="GitHub - Ziane Souhayl"
                            className="size-6 rounded-md hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        >
                            <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/ziane-souhayl" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title="LinkedIn - Ziane Souhayl"
                            className="size-6 rounded-md hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        >
                            <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                    </div>
                </div>
                <DashboardUserButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};