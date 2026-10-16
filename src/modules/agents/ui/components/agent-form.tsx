"use client"

import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { agentsInsertSchema } from "../../schemas";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        })
    );

    const updateAgent = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }));
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        })
    );

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending || updateAgent.isPending

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            updateAgent.mutate({ ...values, id: initialValues.id });
        } else {
            createAgent.mutate(values)
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                    <div className="size-16 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                        <GeneratedAvatar
                            seed={form.watch("name") || "seed"}
                            variant="botttsNeutral"
                            className="size-10"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">Agent Identity</h3>
                        <p className="text-xs text-zinc-500 mt-1">Configure your specialized assistant.</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Display Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Strategic Advisor"
                                        className="h-9 bg-black border-white/10 text-white text-xs rounded-md focus-visible:ring-primary/20"
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-500 font-bold text-[10px]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="instructions"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Behavioral Logic</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Instructions for the AI assistant..."
                                        className="min-h-[160px] bg-black border-white/10 text-white text-xs rounded-md p-4 transition-all resize-none leading-relaxed"
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-500 font-bold text-[10px]" />
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
                        {isEdit ? "Update Agent" : "Create Agent"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}