"use client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CreditCard, Zap, Loader2, ArrowRight, History, ShieldCheck } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export const BillingView = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const { data: balance, isLoading: isLoadingBalance } = useQuery(trpc.billing.getBalance.queryOptions());
    const { data: history } = useQuery(trpc.billing.getUsageHistory.queryOptions({ limit: 10 }));

    const purchase = useMutation({
        ...trpc.billing.purchaseCredits.mutationOptions(),
        onSuccess: (data: any) => {
            toast.success(`Successfully purchased credits!`);
            queryClient.invalidateQueries({ queryKey: trpc.billing.getBalance.queryKey() });
            queryClient.invalidateQueries({ queryKey: trpc.billing.getUsageHistory.queryKey() });
        }
    });

    const handlePurchase = (amount: number) => {
        purchase.mutate({ amount });
    }

    if (isLoadingBalance) return <div className="flex justify-center items-center h-full py-20"><Loader2 className="animate-spin text-zinc-700 size-6" /></div>;

    return (
        <div className="space-y-8 flex flex-col min-h-full">
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white tracking-tight">Billing & Subscriptions</h3>
                <p className="text-xs text-zinc-500">Manage your credit balance and view usage history.</p>
            </div>

            {/* Credit Balance Card - Serious SaaS Style */}
            <div className="p-8 rounded-xl border border-white/5 bg-zinc-900/40 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="size-12 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-500">
                            <Zap className="size-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Available Balance</p>
                            <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                                {balance?.credits || 0} <span className="text-zinc-600 font-medium text-lg">Credits</span>
                            </h3>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        className="h-9 px-6 rounded-md bg-white text-zinc-950 font-bold hover:bg-zinc-200 text-xs shadow-none"
                        onClick={() => handlePurchase(100)}
                        disabled={purchase.isPending}
                    >
                        {purchase.isPending ? <Loader2 className="animate-spin size-3.5 mr-2" /> : <CreditCard className="size-3.5 mr-2" />}
                        Add 100 Credits
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Subscription */}
                <div className="p-8 rounded-xl border border-white/5 bg-zinc-900/40 flex flex-col justify-between gap-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4 text-zinc-700" />
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Workspace Plan</h4>
                        </div>
                        <div className="flex items-baseline gap-2">
                             <h3 className="text-lg font-bold text-white capitalize">{balance?.plan} Tier</h3>
                             <Badge variant="outline" className="h-5 px-1.5 text-[9px] font-bold text-zinc-500 border-white/10">Active</Badge>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed font-medium">Your current plan provides base access to AI meeting analysis and transcript archival features.</p>
                    </div>
                    
                    {balance?.plan === 'free' && (
                        <Button variant="outline" className="h-9 w-full border-white/10 hover:bg-white/5 hover:text-white text-[10px] font-bold uppercase tracking-widest justify-between transition-all group">
                            Upgrade to Pro <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    )}
                </div>

                {/* History List */}
                <div className="p-8 rounded-xl border border-white/5 bg-zinc-900/40 flex flex-col space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2">
                            <History className="size-4 text-zinc-700" />
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Usage History</h4>
                        </div>
                    </div>
                    <ScrollArea className="h-[200px] pr-4">
                        <div className="space-y-3">
                            {history?.map((log) => (
                                <div key={log.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors rounded px-2 group">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">{log.description}</p>
                                        <p className="text-[10px] text-zinc-600 font-medium">{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}</p>
                                    </div>
                                    <span className={`text-xs font-bold tabular-nums ${log.amount > 0 ? "text-emerald-500" : "text-zinc-500"}`}>
                                        {log.amount > 0 ? "+" : ""}{log.amount}
                                    </span>
                                </div>
                            ))}
                            {(!history || history.length === 0) && (
                                <div className="h-full flex flex-col items-center justify-center py-10 opacity-30">
                                     <History className="size-8 mb-3" />
                                     <p className="text-[10px] font-bold uppercase tracking-widest">No activity</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
