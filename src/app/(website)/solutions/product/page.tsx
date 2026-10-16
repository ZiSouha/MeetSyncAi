import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Presentation, Lightbulb, Map, PieChart, FlaskConical, Rocket } from "lucide-react";

export default function ProductSolutionsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs font-medium text-purple-400 mb-8">
                            <Presentation className="size-3.5" />
                            <span>For Product Teams</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Build what <br />
                            <span className="text-purple-500 text-glow">users actually want.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed font-light mb-8 max-w-xl">
                            Centralize feedback from sales calls, support tickets, and user interviews to make data-driven roadmap decisions.
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
                        <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full" />
                        <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl">
                            {/* Roadmap/Insight Mockup */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="size-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                        <Lightbulb className="size-6" />
                                    </div>
                                    <div className="text-white font-semibold">Top Requested Features</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="text-sm text-white">Dark Mode</div>
                                        <div className="text-xs text-zinc-500">142 mentions</div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="text-sm text-white">API Rate Limit Increase</div>
                                        <div className="text-xs text-zinc-500">89 mentions</div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="text-sm text-white">Custom Reporting</div>
                                        <div className="text-xs text-zinc-500">56 mentions</div>
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
                            icon: Map,
                            title: "Roadmap Validation",
                            desc: "Connect feedback directly to roadmap items to prioritize features with the highest impact."
                        },
                        {
                            icon: PieChart,
                            title: "Sentiment Analysis",
                            desc: "Track how user sentiment changes over time for specific features or product areas."
                        },
                        {
                            icon: Rocket,
                            title: "Launch Velocity",
                            desc: "Identify friction points in new releases instantly by monitoring support and sales conversations."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                            <feature.icon className="size-8 text-purple-500 mb-6" />
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
