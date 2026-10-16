import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Heart, Presentation, TrendingUp } from "lucide-react";

export default function SolutionsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Solutions for <br />
                        <span className="text-primary text-glow">every team.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed font-light">
                        MeetSync adapts to your specific workflow. Choose your team to see how we can help you ship faster and work smarter.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Link href="/solutions/sales" className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-all" />
                        <div className="relative z-10">
                            <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <TrendingUp className="size-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Sales & Revenue</h2>
                            <p className="text-zinc-400 mb-8 max-w-sm">Automate CRM entry, capture objections, and close deals faster.</p>
                            <div className="flex items-center gap-2 text-emerald-400 font-medium group-hover:gap-4 transition-all">
                                Explore Sales Solutions <ArrowRight className="size-4" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/solutions/product" className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/30 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 blur-[80px] group-hover:bg-purple-500/10 transition-all" />
                        <div className="relative z-10">
                            <div className="size-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Presentation className="size-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Product Teams</h2>
                            <p className="text-zinc-400 mb-8 max-w-sm">Centralize user feedback and validate roadmap items with data.</p>
                            <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:gap-4 transition-all">
                                Explore Product Solutions <ArrowRight className="size-4" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/solutions/engineering" className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/30 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-orange-500/5 blur-[80px] group-hover:bg-orange-500/10 transition-all" />
                        <div className="relative z-10">
                            <div className="size-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Code2 className="size-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Engineering</h2>
                            <p className="text-zinc-400 mb-8 max-w-sm">Turn standups into tickets and maintain architectural decision logs.</p>
                            <div className="flex items-center gap-2 text-orange-400 font-medium group-hover:gap-4 transition-all">
                                Explore Engineering Solutions <ArrowRight className="size-4" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/solutions/customer-success" className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-pink-500/30 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-pink-500/5 blur-[80px] group-hover:bg-pink-500/10 transition-all" />
                        <div className="relative z-10">
                            <div className="size-14 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Heart className="size-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Customer Success</h2>
                            <p className="text-zinc-400 mb-8 max-w-sm">Reduce churn with proactive sentiment analysis and automated QBRs.</p>
                            <div className="flex items-center gap-2 text-pink-400 font-medium group-hover:gap-4 transition-all">
                                Explore CS Solutions <ArrowRight className="size-4" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
