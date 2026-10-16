"use client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CalendarIcon, CheckIcon, Loader2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

export const IntegrationsView = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const { data: integrations, isLoading } = useQuery(trpc.integrations.list.queryOptions());
    const { data: authUrl } = useQuery(trpc.integrations.getAuthUrl.queryOptions());

    const googleIntegration = integrations?.find(i => i.provider === "google_calendar");

    const disconnect = useMutation({
        ...trpc.integrations.disconnect.mutationOptions(),
        onSuccess: () => {
            toast.success("Disconnected from Google Calendar");
            queryClient.invalidateQueries({ queryKey: trpc.integrations.list.queryKey() });
        }
    });

    const isSyncing = useMutation({
        ...trpc.integrations.sync.mutationOptions(),
        onSuccess: (data: any) => {
            toast.success(`Synced ${data.count} events!`);
        }
    });

    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white tracking-tight">External Connections</h3>
                <p className="text-xs text-zinc-500">Enable automated data syncing across your workflow tools.</p>
            </div>

            <div className="grid gap-4">
                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row justify-between gap-6 sm:items-center group hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-5">
                        <div className="size-12 rounded-lg bg-white border border-white/10 flex items-center justify-center p-2.5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png" className="w-full h-full object-contain" alt="Google Calendar" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white tracking-tight">Google Calendar</h4>
                            <p className="text-xs text-zinc-500 mt-0.5">Automated session import and schedule monitoring.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {isLoading ? (
                            <Loader2 className="animate-spin size-4 text-zinc-500" />
                        ) : googleIntegration ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10">
                                    <CheckIcon className="size-3" />
                                    Active
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 border-white/10 hover:bg-white/5 text-[10px] font-bold"
                                    onClick={() => isSyncing.mutate({ integrationId: googleIntegration.id })}
                                    disabled={isSyncing.isPending}
                                >
                                    {isSyncing.isPending ? <Loader2 className="animate-spin size-3 mr-2" /> : "Sync"}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 text-[10px] font-bold text-zinc-600 hover:text-rose-500 hover:bg-rose-500/5 transition-colors"
                                    onClick={() => disconnect.mutate({ id: googleIntegration.id })}
                                >
                                    Disconnect
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                className="h-9 px-4 rounded-md bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold"
                                onClick={() => authUrl && window.location.assign(authUrl)}
                                disabled={!authUrl}
                            >
                                Connect Provider
                                <ExternalLink className="size-3 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
                
                {/* Placeholder for future integrations to show 'Serious' potential */}
                <div className="p-6 rounded-xl border border-white/5 bg-zinc-900/10 flex flex-col sm:flex-row justify-between gap-6 sm:items-center opacity-40 grayscale">
                    <div className="flex items-center gap-5">
                        <div className="size-12 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center p-2.5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" className="w-full h-full object-contain" alt="Slack" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white tracking-tight">Slack Connect</h4>
                            <p className="text-xs text-zinc-500 mt-0.5">Neural briefing delivery directly to your team channels.</p>
                        </div>
                    </div>
                    <Button size="sm" disabled variant="outline" className="h-8 border-white/10 text-[10px] font-bold">Coming soon</Button>
                </div>
            </div>
        </div>
    )
}
