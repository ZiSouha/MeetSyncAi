import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code2, GitBranch, Bug, Terminal, Cpu, Workflow } from "lucide-react";

export default function EngineeringSolutionsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-xs font-medium text-orange-400 mb-8">
                            <Code2 className="size-3.5" />
                            <span>For Engineering Teams</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Ship code, <br />
                            <span className="text-orange-500 text-glow">not meeting notes.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed font-light mb-8 max-w-xl">
                            Turn architectural discussions and standups into Linear tickets, technical specs, and decision logs automatically.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/sign-up">
                                <Button size="lg" className="h-14 px-8 rounded-xl text-zinc-950 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/docs">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-white border-white/10 hover:bg-white/5">
                                    Read Docs
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full" />
                        <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl">
                            {/* Linear/Jira Mockup */}
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
                                    <Terminal className="size-3" />
                                    <span>generated_ticket.md</span>
                                </div>
                                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                                    <div className="text-orange-400 mb-2">### AB-123: Migration to Postgres</div>
                                    <div className="text-zinc-400 space-y-2">
                                        <p>- [x] Create migration script for users table</p>
                                        <p>- [ ] Update connection pool configuration</p>
                                        <p>- [ ] Verify data integrity on staging</p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs">High Priority</span>
                                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs">Backend</span>
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
                            icon: GitBranch,
                            title: "Sync to Issue Trackers",
                            desc: "Automatically create and update tickets in Linear, Jira, and GitHub Issues based on meeting outcomes."
                        },
                        {
                            icon: Bug,
                            title: "Bug Triage Automation",
                            desc: "Identify bug reports discussed in calls and file them with reproduction steps automatically."
                        },
                        {
                            icon: Workflow,
                            title: "Architecture Decisions",
                            desc: "Maintain a searchable history of all technical decisions (ADRs) made during syncs."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                            <feature.icon className="size-8 text-orange-500 mb-6" />
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
