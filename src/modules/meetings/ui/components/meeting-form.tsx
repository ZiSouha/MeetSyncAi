"use client"

import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommandSelect } from "@/components/ui/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { meetingsInsertSchema } from "../../schemas";
import { toast } from "sonner";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { Loader2, Plus } from "lucide-react";

interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: MeetingFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
    const [agentSearch, setAgentSearch] = useState("");

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        })
    )

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                onSuccess?.(data.id);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        })
    );

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        })
    );

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentId: initialValues?.agentId ?? "",
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValues.id });
        } else {
            createMeeting.mutate(values)
        }
    }

    return (
        <div className="space-y-6">
            <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                        <div className="size-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-600">
                            {form.watch("name")?.[0] || "?"}
                        </div>
                        <div>
                             <h3 className="text-xs font-semibold text-white">Capture Session</h3>
                             <p className="text-[10px] text-zinc-500">Define the session metadata.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Session Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Project Alpha Sync" className="h-9 bg-black border-white/10 text-xs rounded-md" />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-[10px]" />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            name="agentId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between ml-1">
                                        <FormLabel className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Processing Agent</FormLabel>
                                        <button
                                            type="button"
                                            className="text-[9px] font-bold text-primary hover:text-primary/80 flex items-center gap-1"
                                            onClick={() => setOpenNewAgentDialog(true)}
                                        >
                                            <Plus className="size-2.5" />
                                            New Agent
                                        </button>
                                    </div>
                                    <FormControl>
                                        <CommandSelect
                                            options={(agents.data?.items ?? []).map((agent) => ({
                                                id: agent.id,
                                                value: agent.id,
                                                children: (
                                                    <div className="flex items-center gap-x-2">
                                                        <GeneratedAvatar seed={agent.name} variant="botttsNeutral" className="size-4 grayscale" />
                                                        <span className="text-xs">{agent.name}</span>
                                                    </div>
                                                )
                                            }))}
                                            onSelect={field.onChange}
                                            onSearch={setAgentSearch}
                                            value={field.value}
                                            placeholder="Select processing node..."
                                        />
                                    </FormControl>
                                    <FormMessage className="text-rose-500 text-[10px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        {onCancel && (
                            <Button
                                variant="outline"
                                disabled={isPending}
                                type="button"
                                onClick={() => onCancel()}
                                className="flex-1 h-9 rounded-md border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white"
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="flex-1 h-9 rounded-md bg-white text-zinc-950 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all text-[10px]"
                        >
                            {isPending ? <Loader2 className="size-3 animate-spin mr-2" /> : null}
                            {isEdit ? "Update Session" : "Start Session"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}