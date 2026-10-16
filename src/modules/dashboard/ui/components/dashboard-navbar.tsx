"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeft, Search, Globe, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs";
import { NotificationsDropdown } from "@/modules/notifications/ui/components/notifications-dropdown";
import Link from "next/link";

const DashboardNavbar = () => {
    const { toggleSidebar, state } = useSidebar();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openSearch = () => {
        const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
        document.dispatchEvent(event);
    };

    return (
        <header className={cn(
            "h-16 flex items-center justify-between px-6 border-b border-white/5 transition-colors z-40 bg-zinc-950",
            isScrolled && "bg-zinc-950/80 backdrop-blur-md"
        )}>
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleSidebar}
                    title={state === "expanded" ? "Collapse sidebar (⌘B)" : "Expand sidebar (⌘B)"}
                    aria-label="Toggle sidebar"
                    className="p-2 hover:bg-white/5 rounded-md transition-colors text-zinc-400 hover:text-white"
                >
                    <PanelLeft className="size-4" />
                </button>
                <div className="h-4 w-px bg-white/10" />
                <DashboardBreadcrumbs />
            </div>

            <div className="flex items-center gap-3">
                {/* Direct link to public website */}
                <Link
                    href="/"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00C896]/10 hover:bg-[#00C896]/20 border border-[#00C896]/25 hover:border-[#00C896]/40 text-[#00C896] text-xs font-semibold transition-all shadow-[0_0_12px_rgba(0,200,150,0.1)] group"
                    title="Return to Public Website"
                >
                    <Globe className="size-3.5 text-[#00C896] group-hover:rotate-12 transition-transform" />
                    <span>Website</span>
                    <ArrowUpRight className="size-3 text-[#00C896]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <button 
                    onClick={openSearch}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-zinc-200 text-xs transition-colors hidden sm:flex cursor-pointer"
                >
                    <Search className="size-3.5" />
                    <span>Search anything</span>
                    <kbd className="text-[10px] text-zinc-500 bg-white/5 px-1.5 rounded border border-white/5 ml-2 font-mono">⌘K</kbd>
                </button>
                <NotificationsDropdown />
            </div>
        </header>
    )
}

export default DashboardNavbar;
