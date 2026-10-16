import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, BarChart3, Users, Zap, Search, Target } from "lucide-react";

export default function SalesSolutionsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-8">
                            <TrendingUp className="size-3.5" />
                            <span>For Revenue Teams</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Close deals <br />
                            <span className="text-emerald-500 text-glow">faster than ever.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed font-light mb-8 max-w-xl">
                            Automate CRM entry, capture objection handling data, and get real-time battlecards during your calls.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/sign-up">
                                <Button size="lg" className="h-14 px-8 rounded-xl text-zinc-950 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/demo">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-white border-white/10 hover:bg-white/5">
                                    Watch Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
                        <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl">
                            {/* CRM Mockup */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">SF</div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Salesforce Sync</div>
                                            <div className="text-xs text-zinc-500">Auto-updated 1m ago</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-emerald-400 font-medium">Success</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-xs text-zinc-500 mb-1">Opportunity Amount</div>
                                        <div className="text-lg font-mono text-white">$125,000.00</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-xs text-zinc-500 mb-1">Next Step</div>
                                        <div className="text-sm text-white">Send contract & security review docs</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-xs text-zinc-500 mb-1">Competitor Mentioned</div>
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs text-white">Competitor A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        {
                            icon: Zap,
                            title: "Instant CRM Sync",
                            desc: "Stop spending hours on manual data entry. We populate Salesforce & HubSpot fields automatically."
                        },
                        {
                            icon: Search,
                            title: "Deal Intelligence",
                            desc: "Analyze calls to identify winning patterns and coaching opportunities for your team."
                        },
                        {
                            icon: Target,
                            title: "Objection Handling",
                            desc: "Real-time AI assistant suggests best answers when competitors or pricing objections come up."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                            <feature.icon className="size-8 text-emerald-500 mb-6" />
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
