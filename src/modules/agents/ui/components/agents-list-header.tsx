"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon, BotIcon, FilterIcon } from "lucide-react"
import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { NewAgentDialog } from "./new-agent-dialog"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { AgentSearchFilter } from "./agents-search-filter"
import { DEFAULT_PAGE } from "@/constants"

export const AgentsListHeader = () => {
    const [filters, setFilters] = useAgentsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE,
        });
    }
    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-8 px-6 md:px-10 flex flex-col gap-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="size-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                <BotIcon className="size-3.5 text-emerald-500" />
                            </div>
                            <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-[0.2em] shadow-emerald-500/10">Neural Hub</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-heading mb-2">
                            AI Agents
                        </h1>
                        <p className="text-zinc-400 text-lg font-light leading-relaxed">
                            Configure your specialized neural network and meeting assistants.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="h-12 rounded-xl px-6 bg-primary text-zinc-950 font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105 hover:bg-primary shrink-0"
                    >
                        <PlusIcon className="size-5 mr-2" />
                        Create Agent
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-1 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                    <div className="flex-1 w-full sm:max-w-md">
                        <AgentSearchFilter />
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden sm:block" />
                    <ScrollArea className="max-w-full w-full">
                        <div className="flex items-center gap-x-2">
                            {isAnyFilterModified && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClearFilters}
                                    className="h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <XCircleIcon className="size-4 mr-2" />
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}