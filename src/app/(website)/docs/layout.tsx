"use client"

import { DOCS_SECTIONS } from "@/modules/website/ui/components/docs-content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen pt-40 pb-20 relative z-10 selection:bg-primary/30">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-[280px_1fr] gap-16">
                    {/* Sidebar */}
                    <aside className="hidden lg:block space-y-10 sticky top-40 h-fit">
                        <div className="relative mb-10">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
                            <Input 
                                placeholder="Search docs..." 
                                className="h-10 pl-10 bg-white/[0.03] border-white/5 rounded-xl text-xs" 
                            />
                        </div>

                        {DOCS_SECTIONS.map((section) => (
                            <div key={section.title}>
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 ml-3">{section.title}</div>
                                <div className="space-y-1">
                                    {section.items.map((item) => {
                                        const href = `/docs/${item.slug}`;
                                        const isActive = pathname === href;
                                        return (
                                            <Link 
                                                key={item.slug} 
                                                href={href}
                                                className={cn(
                                                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
                                                    isActive 
                                                        ? "bg-primary/10 text-primary border border-primary/20" 
                                                        : "text-zinc-500 hover:text-white hover:bg-white/[0.03] border border-transparent"
                                                )}
                                            >
                                                <item.icon className={cn("size-4", isActive ? "text-primary" : "text-zinc-700 group-hover:text-zinc-400")} />
                                                <span className="text-sm font-semibold tracking-tight">{item.title}</span>
                                                {isActive && <div className="ml-auto size-1 bg-primary rounded-full shadow-[0_0_8px_rgba(22,163,74,1)]" />}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Content */}
                    <div className="max-w-3xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
