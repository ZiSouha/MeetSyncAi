import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book, Code2, Rss, Layers, ArrowRight, FileText, Video, GraduationCap, Github } from "lucide-react";

export default function ResourcesPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400 mb-8">
                        <Book className="size-3.5 text-primary" />
                        <span>Knowledge Base</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Learn, build, and <br />
                        <span className="text-primary text-glow">grow with MeetSync.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed font-light">
                        Everything you need to master our platform. From quick start guides to deep API references.
                    </p>
                </div>

                {/* Main Resources Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    {/* Documentation Card */}
                    <Link href="/docs" className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
                        <div className="relative z-10">
                            <div className="size-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <FileText className="size-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Documentation</h2>
                            <p className="text-zinc-400 mb-8 max-w-md">Comprehensive guides for users and admins. Learn how to set up workspaces, manage permissions, and configure integrations.</p>
                            <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-4 transition-all">
                                Read the Docs <ArrowRight className="size-4" />
                            </div>
                        </div>
                    </Link>

                    {/* API Reference Card */}
                    <Link href="/api" className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/30 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-orange-500/5 blur-[80px] group-hover:bg-orange-500/10 transition-colors" />
                        <div className="relative z-10">
                            <div className="size-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Code2 className="size-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">API Reference</h2>
                            <p className="text-zinc-400 mb-8 max-w-md">Build custom integrations with our REST API. Access meeting data, webhooks, and real-time events programmatically.</p>
                            <div className="flex items-center gap-2 text-orange-400 font-medium group-hover:gap-4 transition-all">
                                View API Docs <ArrowRight className="size-4" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Secondary Resources */}
                <div className="grid md:grid-cols-3 gap-6 mb-24">
                    <Link href="/blog" className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                        <Rss className="size-8 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-semibold text-white mb-3">Blog</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">Latest product updates, engineering deep dives, and industry insights.</p>
                        <span className="text-sm font-medium text-emerald-500 group-hover:underline">Read latest posts</span>
                    </Link>

                    <Link href="/case-studies" className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                        <Layers className="size-8 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-semibold text-white mb-3">Case Studies</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">See how modern engineering teams at TechFlow and ScaleUp use MeetSync.</p>
                        <span className="text-sm font-medium text-purple-500 group-hover:underline">View customer stories</span>
                    </Link>

                    <Link href="/academy" className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                        <GraduationCap className="size-8 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-semibold text-white mb-3">MeetSync Academy</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">Video tutorials and certification courses to become a meeting intelligence pro.</p>
                        <span className="text-sm font-medium text-yellow-500 group-hover:underline">Start learning</span>
                    </Link>
                </div>

                {/* Developer Community CTA */}
                <div className="rounded-3xl border border-white/10 bg-zinc-900/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-40 bg-white/5 blur-[100px] pointer-events-none" />
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-12 md:p-20">
                            <div className="flex items-center gap-3 mb-6">
                                <Github className="size-6 text-white" />
                                <span className="text-white font-semibold">Open Source Community</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the conversation.</h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed max-w-md">
                                Contributing to our SDKs or have a feature request? Join thousands of developers on our GitHub and Discord.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://github.com/ZiSouha" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" variant="outline" className="text-white border-white/10 hover:bg-white/5 gap-2">
                                        <Github className="size-4" />
                                        Star on GitHub
                                    </Button>
                                </a>
                                <Link href="/dashboard">
                                    <Button size="lg" variant="ghost" className="text-zinc-400 hover:text-white">
                                        Community Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {/* Abstract Code/Community Visual */}
                        <div className="relative h-full min-h-[300px] bg-black/40 border-l border-white/5 p-8 font-mono text-sm hidden md:block">
                            <div className="space-y-2 text-zinc-500">
                                <div className="flex gap-2">
                                    <span className="text-purple-400">import</span>
                                    <span className="text-white">MeetSync</span>
                                    <span className="text-purple-400">from</span>
                                    <span className="text-green-400">'@meetsync/sdk'</span>;
                                </div>
                                <div className="h-4" />
                                <div>
                                    <span className="text-purple-400">const</span> client = <span className="text-yellow-400">new</span> MeetSync(API_KEY);
                                </div>
                                <div className="h-4" />
                                <div className="text-zinc-600">{"// Listen to real-time transcription events"}</div>
                                <div>
                                    client.socket.<span className="text-blue-400">on</span>(<span className="text-green-400">'transcript'</span>, (data) ={">"} {"{"}
                                </div>
                                <div className="pl-4">
                                    console.<span className="text-yellow-400">log</span>(<span className="text-green-400">`New segment: ${"{"}data.text{"}"}`</span>);
                                </div>
                                <div>{"}"});</div>
                            </div>
                            <div className="absolute bottom-8 right-8 text-xs text-zinc-600">
                                sdk-v2.4.0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
