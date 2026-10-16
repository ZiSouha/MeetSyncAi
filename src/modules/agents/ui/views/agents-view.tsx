"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Plus, Bot, Search, XCircle, MoreVertical, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { useQueryState, parseAsBoolean } from "nuqs"

import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { NewAgentDialog } from "../components/new-agent-dialog"
import { DEFAULT_PAGE } from "@/constants"

export const AgentsView = () => {
    const router = useRouter()
    const [filters, setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    const [isDialogOpen, setIsDialogOpen] = useQueryState("new", parseAsBoolean.withDefault(false));

    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE,
        });
    }

    return (
        <div className="space-y-8 flex flex-col min-h-full">
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

            {/* Serious Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">AI Agents</h1>
                    <p className="text-sm text-zinc-500 mt-1">Manage specialized agents for automated meeting intelligence.</p>
                </div>
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="h-9 px-4 rounded-md bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold"
                >
                    <Plus className="size-3.5 mr-1.5" />
                    Create local agent
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/40 p-1.5 rounded-lg border border-white/5">
                <div className="relative flex-1 w-full">
                    <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Filter agents by name or ID..."
                        value={filters.search}
                        onChange={(e) => setFilters({ search: e.target.value })}
                        className="h-8 w-full bg-transparent border-none rounded-md text-xs placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 pl-9"
                    />
                </div>
                {filters.search && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClearFilters}
                        className="h-8 w-8 rounded-md hover:bg-white/5 text-zinc-500"
                    >
                        <XCircle className="size-4" />
                    </Button>
                )}
            </div>

            {/* Agents Table */}
            <div className="flex-1 rounded-xl border border-white/5 bg-zinc-900/40 overflow-hidden min-h-[400px]">
                {data.items.length > 0 ? (
                    <DataTable
                        data={data.items}
                        columns={columns}
                        onRowClick={(row) => router.push(`/agents/${row.id}`)}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center p-20 text-center">
                        <div className="max-w-xs space-y-4">
                            <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                                <Bot className="size-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">No agents deployed</h3>
                                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Agents process your meeting audio and generate structured summaries and action items.</p>
                            </div>
                            <Button size="sm" onClick={() => setIsDialogOpen(true)} variant="outline" className="h-8 border-white/10 hover:bg-white/5 font-bold">Start Deployment</Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Simple Pagination */}
            <div className="flex items-center justify-between py-6">
                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Total Systems: {data.total}</p>
                <DataPagination
                    page={filters.page}
                    totalPages={data.totalPages}
                    onPageChange={(page) => setFilters({ page })}
                />
            </div>
        </div>
    );
};

export const AgentsViewLoading = () => <LoadingState title="Syncing agent database..." description="Please wait while we log into the matrix..." />
export const AgentsViewError = () => <ErrorState title='Connection Failure' description='Could not reach neural orchestration node.' />