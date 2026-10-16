"use client";

import { Button } from "@/components/ui/button";
import { User, Settings, CreditCard, Globe, Lock, Bell, Shield } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"
import { IntegrationsView } from "@/modules/integrations/ui/views/integrations-view";
import { BillingView } from "@/modules/billing/ui/views/billing-view";

export const SettingsView = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeTab = searchParams.get("tab") || "profile";

    const setActiveTab = (tabId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tabId);
        router.push(`${pathname}?${params.toString()}`);
    }

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "workspace", label: "Workspace", icon: Settings },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "integrations", label: "Integrations", icon: Globe },
        { id: "security", label: "Security", icon: Lock },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                 <h1 className="text-2xl font-semibold text-white tracking-tight">Settings</h1>
                 <p className="text-sm text-zinc-500 mt-1">Configure your personal profile and workspace environment.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Horizontal Navigation on Mobile / Vertical on Desktop */}
                <div className="lg:w-64 flex-shrink-0">
                    <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-xs font-medium whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "bg-white/10 text-white"
                                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <tab.icon className={cn("size-4", activeTab === tab.id ? "text-primary" : "text-zinc-500")} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Settings Card */}
                <div className="flex-1 rounded-xl border border-white/5 bg-zinc-900/40 p-8 shadow-sm">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "profile" && (
                            <div className="max-w-2xl space-y-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                                        <div className="size-20 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-2xl font-bold text-zinc-600">
                                            JD
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">Profile picture</h3>
                                            <p className="text-xs text-zinc-500 mt-1">JPG, GIF or PNG. 1MB Max.</p>
                                            <div className="flex items-center gap-2 mt-4">
                                                <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold border-white/10 hover:bg-white/5">Upload new</Button>
                                                <Button size="sm" variant="ghost" className="h-8 text-[10px] font-bold text-rose-500 hover:text-rose-400 hover:bg-rose-500/5">Remove</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">Display Name</label>
                                        <input 
                                            type="text" 
                                            defaultValue="John Doe" 
                                            className="w-full h-9 bg-black border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" 
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-white">Email Address</label>
                                        <input 
                                            type="email" 
                                            defaultValue="john@example.com" 
                                            className="w-full h-9 bg-black border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" 
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                     <Button className="h-9 px-6 rounded-md bg-white text-zinc-950 font-bold hover:bg-zinc-200 text-xs">Save changes</Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "integrations" && (
                            <div className="space-y-6">
                                <IntegrationsView />
                            </div>
                        )}

                        {activeTab === "billing" && (
                             <div className="space-y-6">
                                <BillingView />
                            </div>
                        )}

                        {(activeTab === "workspace" || activeTab === "security") && (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Shield className="size-6 text-zinc-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Module restricted</h3>
                                    <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">Please contact your workspace administrator to access advanced permissions.</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
