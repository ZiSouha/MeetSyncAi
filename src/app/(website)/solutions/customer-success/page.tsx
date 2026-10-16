import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, Heart, Users, Smile, Headphones, Activity } from "lucide-react";

export default function CustomerSuccessSolutionsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-xs font-medium text-pink-400 mb-8">
                            <Heart className="size-3.5" />
                            <span>For Customer Success</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Turn conversations <br />
                            <span className="text-pink-500 text-glow">into loyalty.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed font-light mb-8 max-w-xl">
                            Proactively identify churn risks, capture feature requests, and deliver world-class support with AI-assisted insights.
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
                        <div className="absolute inset-0 bg-pink-500/20 blur-[100px] rounded-full" />
                        <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                            <Users className="size-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Acme Corp QBR</div>
                                            <div className="text-xs text-zinc-500">Recorded today</div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Healthy</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm text-zinc-300 font-medium">✨ Key Insights Detected</div>
                                    <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20 text-sm text-pink-200">
                                        User expressed interest in <span className="font-bold underline">Enterprise Plan</span> upgrade.
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-sm text-zinc-400">
                                        Mentioned frustration with current reporting module speed.
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
                            icon: Activity,
                            title: "Churn Prediction",
                            desc: "AI analyzes sentiment and keywords to flag accounts at risk before it's too late."
                        },
                        {
                            icon: Headphones,
                            title: "Automated Onboarding",
                            desc: "Generate personalized follow-up emails and resources based on what was discussed."
                        },
                        {
                            icon: Smile,
                            title: "Voice of Customer",
                            desc: "Aggregate feedback across thousands of calls to champion user needs to product teams."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                            <feature.icon className="size-8 text-pink-500 mb-6" />
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
