"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon, VideoIcon, FilterIcon } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { useState } from "react"
import { MeetingSearchFilter } from "./meetings-search-filter"
import { StatusFilter } from "./status-filter"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DEFAULT_PAGE } from "@/constants"

export const MeetingsListHeader = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId;

    const onClearFilters = () => {
        setFilters({
            status: null,
            agentId: "",
            search: "",
            page: DEFAULT_PAGE,
        })
    }

    return (
        <>
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-8 px-6 md:px-10 flex flex-col gap-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="size-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <VideoIcon className="size-3.5 text-blue-500" />
                            </div>
                            <span className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.2em] shadow-blue-500/10">Workspace</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-heading mb-2">
                            Meetings
                        </h1>
                        <p className="text-zinc-400 text-lg font-light leading-relaxed">
                            Review recordings, transcripts, and AI-generated insights.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="h-12 rounded-xl px-6 bg-primary text-zinc-950 font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105 hover:bg-primary shrink-0"
                    >
                        <PlusIcon className="size-5 mr-2" />
                        Host Meeting
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-1 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                    <div className="flex-1 w-full sm:max-w-md">
                        <MeetingSearchFilter />
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden sm:block" />
                    <ScrollArea className="max-w-full w-full">
                        <div className="flex items-center gap-x-2">
                            <StatusFilter />
                            <AgentIdFilter />
                            {isAnyFilterModified && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClearFilters}
                                    className="h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <XCircleIcon className="size-4 mr-2" />
                                    Clear
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