"use client"

import { motion } from "framer-motion";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../components/completed-state";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

interface Props {
    meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [UpdateMeetingDialogOpen, setUpdateAgentDialogOpen] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Delete session?",
        "This will permanently remove the transcript and all associated analytics."
    );

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                router.push("/meetings");
            },
        }),
    );

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();
        if (!ok) return;
        await removeMeeting.mutateAsync({ id: meetingId });
    };

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: meetingId }));
            },
        }),
    );

    const handleCancelMeeting = async () => {
        await updateMeeting.mutateAsync({ id: meetingId, status: "cancelled" });
    }

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCancelled = data.status === "cancelled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";

    return (
        <div className="space-y-8 flex flex-col min-h-full">
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open={UpdateMeetingDialogOpen}
                onOpenChange={setUpdateAgentDialogOpen}
                initialValues={data}
            />
            
            {/* Serious Layout Header */}
            <div className="flex flex-col gap-6">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateAgentDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                             <h1 className="text-2xl font-semibold text-white tracking-tight">{data.name}</h1>
                             <Badge variant="outline" className="h-5 px-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-500 border-white/5">
                                {data.status}
                             </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                            <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {new Date(data.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><User className="size-3.5" /> {data.agent.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full">
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}
                {isCompleted && <CompletedState data={data} />}
                {isActive && <ActiveState meetingId={meetingId} />}
                {isUpcoming && (
                    <UpcomingState
                        meetingId={meetingId}
                        onCancelMeeting={handleCancelMeeting}
                        isCancelling={updateMeeting.isPending}
                    />
                )}
            </div>
        </div>
    );
};

export const MeetingIdViewLoading = () => <LoadingState title="Loading record..." description="Retrieving meeting details..." />
export const MeetingIdViewError = () => <ErrorState title='Request Aborted' description='Failed to retrieve meeting object.' />