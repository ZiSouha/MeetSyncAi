"use client"

import { motion } from "framer-motion"
import { Plus, Video, Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/modules/agents/ui/components/data-pagination";
import { NewMeetingDialog } from "../components/new-meeting-dialog"
import { StatusFilter } from "../components/status-filter"
import { AgentIdFilter } from "../components/agent-id-filter"

export const MeetingsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="space-y-8 min-h-full flex flex-col">
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

            {/* Header Section - Modern SaaS Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Meetings</h1>
                    <p className="text-sm text-zinc-500 mt-1">Archive of all processed sessions and neural transcripts.</p>
                </div>
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="h-9 px-4 rounded-md bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold"
                >
                    <Plus className="size-3.5 mr-1.5" />
                    Record session
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-zinc-900/40 p-1.5 rounded-lg border border-white/5">
                <div className="relative flex-1 w-full">
                    <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Search for a meeting..."
                        value={filters.search}
                        onChange={(e) => setFilters({ search: e.target.value })}
                        className="h-8 w-full bg-transparent border-none rounded-md text-xs placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 pl-9"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <StatusFilter />
                    <AgentIdFilter />
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 rounded-xl border border-white/5 bg-zinc-900/50 overflow-hidden min-h-[400px]">
                {data.items.length > 0 ? (
                    <DataTable
                        data={data.items}
                        columns={columns}
                        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center p-20">
                        <EmptyState
                            title="No records found"
                            description="Start your first session to begin capturing meeting intelligence."
                        />
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pb-8">
                <p className="text-xs text-zinc-500 font-medium">Showing {data.items.length} of {data.total} records</p>
                <DataPagination
                    page={filters.page}
                    totalPages={data.totalPages}
                    onPageChange={(page) => setFilters({ page })}
                />
            </div>
        </div>
    )
}

export const MeetingsViewLoading = () => <LoadingState title="Allocating session matrix..." description="Retrieving sessions from database..." />
export const MeetingsViewError = () => <ErrorState title='Decryption Error' description='Archive stream interrupted.' />