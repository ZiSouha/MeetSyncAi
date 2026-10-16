import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Quote } from "lucide-react";

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400 mb-8">
                        <Quote className="size-3.5 text-primary" />
                        <span>Customer Stories</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Trusted by the ambitious.
                    </h1>
                    <p className="text-xl text-zinc-400">
                        See how high-growth companies use MeetSync to move faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { company: "TechFlow", logo: "TF", title: "Saving 40 hours/week per PM", color: "bg-blue-500" },
                        { company: "ScaleUp", logo: "SU", title: "Accelerating sales ramp time by 3x", color: "bg-emerald-500" },
                        { company: "GlobalStream", logo: "GS", title: "100% compliance in regulated markets", color: "bg-purple-500" },
                        { company: "NextGen", logo: "NG", title: "Automating 500+ Jira tickets monthly", color: "bg-orange-500" },
                    ].map((caseStudy, i) => (
                        <Link key={i} href="#" className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 hover:bg-zinc-900 transition-all">
                            <div className="flex items-start justify-between mb-12">
                                <div className={`size-12 rounded-xl ${caseStudy.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                                    {caseStudy.logo}
                                </div>
                                <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400">
                                    Enterprise
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                {caseStudy.title}
                            </h3>
                            <p className="text-zinc-400">
                                Read the full story of how {caseStudy.company} transformed their meeting culture.
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
