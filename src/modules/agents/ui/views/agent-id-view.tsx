"use client"

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

import { SentimentChart } from "@/modules/analytics/ui/components/sentiment-chart";
import { UsageChart } from "@/modules/analytics/ui/components/usage-chart";

interface Props {
    agentId: string;
};

export const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [UpdateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
    const { data: analytics } = useSuspenseQuery(trpc.analytics.getAgentAnalytics.queryOptions({ agentId }));

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                // TODO: Invalidate free tier usage
                router.push("/agents");
            },
            onError: (error) => {
                toast.error(error.message)
            },
        }),
    );

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        `The following action will remove ${data.meetingCount} associated meetings`
    );

    const handleRemoveAgent = async () => {
        const ok = await confirmRemove();
        if (!ok) return;
        await removeAgent.mutateAsync({ id: agentId });
    }

    return (
        <>
            <RemoveConfirmation />
            <UpdateAgentDialog
                open={UpdateAgentDialogOpen}
                onOpenChange={setUpdateAgentDialogOpen}
                initialValues={data}
            />
            <div className="flex flex-col h-full bg-transparent p-6 md:p-12 max-w-7xl mx-auto w-full gap-16 font-sans">
                {/* Header Section - Home Page Template Style */}
                <section className="relative space-y-8 w-full">
                    <AgentIdViewHeader
                        agentId={agentId}
                        agentName={data.name}
                        onEdit={() => setUpdateAgentDialogOpen(true)}
                        onRemove={handleRemoveAgent}
                    />

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-start gap-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium tracking-wide text-zinc-400">
                                <VideoIcon className="size-3.5 text-primary" />
                                {data.meetingCount} Sessions Recorded
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                                <span className="text-primary italic">Neural</span> {data.name}
                            </h1>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content Card - Bento Style */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group rounded-[3rem] bg-white/[0.02] border border-white/5 p-8 md:p-16 overflow-hidden flex flex-col md:flex-row gap-16 md:gap-24 hover:bg-white/[0.04] transition-all duration-700"
                >
                    <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    {/* Left Column - Identity */}
                    <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="relative mb-10">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative size-40 rounded-[2.5rem] bg-zinc-950/50 border border-white/10 flex items-center justify-center shadow-2xl p-6 backdrop-blur-md">
                                <GeneratedAvatar
                                    variant="botttsNeutral"
                                    seed={data.name}
                                    className="size-full"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 size-10 rounded-2xl bg-primary flex items-center justify-center border-4 border-[#0A0A0B] shadow-lg">
                                <div className="size-3 bg-zinc-950 rounded-full animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-6 w-full">
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-sm font-semibold text-white">Active & Calibrated</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { label: "Matrix Efficiency", value: "98.4%", desc: "Retrieval Accuracy" },
                                    { label: "Processing Latency", value: "1.2s", desc: "Response Rate" },
                                ].map((metric, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{metric.label}</p>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-white tracking-tight">{metric.value}</span>
                                            <span className="text-[10px] text-zinc-600 font-medium">{metric.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Intelligence & Analytics */}
                    <div className="md:flex-1 space-y-12">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-zinc-500">
                                <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Sparkles className="size-4 text-primary" />
                                </div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Behavioral Instructions</h3>
                            </div>
                            <div className="relative rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-10 backdrop-blur-sm group-hover:border-white/10 transition-colors">
                                <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed whitespace-pre-wrap">
                                    {data.instructions}
                                </p>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white tracking-tight">Performance Analytics</h3>
                                <Badge variant="outline" className="text-zinc-500 border-white/10">Last 30 Days</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Total Minutes */}
                                <div className="p-8 rounded-[2rem] bg-zinc-950/40 border border-white/5 flex flex-col justify-between h-48 group/stat relative overflow-hidden">
                                    <div className="absolute top-0 right-0 size-32 bg-indigo-500/10 rounded-full blur-[60px]" />
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest z-10">Total Runtime</p>
                                    <div className="z-10">
                                        <span className="text-5xl font-bold text-white tracking-tighter group-hover/stat:text-indigo-400 transition-colors">
                                            {analytics.totalMinutes}
                                        </span>
                                        <span className="text-sm text-zinc-500 font-medium ml-2">minutes</span>
                                    </div>
                                </div>

                                {/* Total Meetings */}
                                <div className="p-8 rounded-[2rem] bg-zinc-950/40 border border-white/5 flex flex-col justify-between h-48 group/stat relative overflow-hidden">
                                    <div className="absolute top-0 right-0 size-32 bg-primary/10 rounded-full blur-[60px]" />
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest z-10">Conversations</p>
                                    <div className="z-10">
                                        <span className="text-5xl font-bold text-white tracking-tighter group-hover/stat:text-primary transition-colors">
                                            {analytics.totalMeetings}
                                        </span>
                                        <span className="text-sm text-zinc-500 font-medium ml-2">sessions</span>
                                    </div>
                                </div>

                                {/* Sentiment Chart */}
                                <div className="col-span-1 md:col-span-2 p-8 rounded-[2.5rem] bg-zinc-950/40 border border-white/5 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sentiment Trend</p>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600">
                                            <span className="type-[monotone] size-2 bg-emerald-500/50 rounded-full" /> Positive Output
                                        </div>
                                    </div>
                                    <SentimentChart data={analytics.sentimentTrend} />
                                </div>

                                {/* Usage Chart */}
                                <div className="col-span-1 md:col-span-2 p-8 rounded-[2.5rem] bg-zinc-950/40 border border-white/5 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Usage Frequency</p>
                                    </div>
                                    <UsageChart data={analytics.usageTrend} />
                                </div>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </>
    )
};

export const AgentIdLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a few seconds" />
    )
}

export const AgentIdError = () => {
    return (
        <ErrorState
            title='Error Loading Agents'
            description='Something went wrong'
        />
    )
}