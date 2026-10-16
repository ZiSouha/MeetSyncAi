import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Code, Globe, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400 mb-8">
                        <Globe className="size-3.5 text-primary" />
                        <span>Our Mission</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Making the world's <br />
                        <span className="text-primary text-glow">meetings meaningful.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed font-light">
                        We believe that bad meetings are the biggest barrier to progress. We're building the intelligence layer to fix them.
                    </p>
                </div>

                {/* Founder Spotlight */}
                <div className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 size-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
                        <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="size-32 rounded-3xl bg-zinc-800 border-2 border-primary/30 flex items-center justify-center text-4xl font-extrabold text-white mb-6 shadow-2xl shadow-primary/20 bg-gradient-to-br from-zinc-800 to-zinc-900">
                                ZS
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                                Founder & Lead Architect
                            </span>
                            <h2 className="text-3xl font-bold text-white mb-2">Ziane Souhayl</h2>
                            <p className="text-sm text-zinc-400 mb-6">Creator of MeetSync AI</p>

                            <div className="flex items-center gap-3">
                                <a 
                                    href="https://github.com/ZiSouha" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title="GitHub"
                                    className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
                                >
                                    <FaGithub className="size-4" />
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/ziane-souhayl" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title="LinkedIn"
                                    className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
                                >
                                    <FaLinkedin className="size-4" />
                                </a>
                                <a 
                                    href="mailto:zianesouhayl@gmail.com" 
                                    title="Email: zianesouhayl@gmail.com"
                                    className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
                                >
                                    <FaEnvelope className="size-4" />
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-4 text-zinc-300 leading-relaxed font-light text-lg">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                "The modern meeting shouldn't be a memory test."
                            </h3>
                            <p>
                                MeetSync AI was built by <strong className="text-white font-medium">Ziane Souhayl</strong> with a singular mission: eliminate the friction, forgotten action items, and manual note-taking that slows high-performing teams down.
                            </p>
                            <p className="text-zinc-400 text-base">
                                Combining real-time audio streams, intelligent speaker diarization, and next-generation AI agents, MeetSync empowers builders, product managers, and executives to focus entirely on conversation while autonomous agents handle the synthesis.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-3">
                                <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10">Next.js 15 & React 19</span>
                                <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10">Stream Video & WebRTC</span>
                                <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10">Inngest Agent Kit</span>
                                <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10">Google Gemini & OpenAI</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team / Culture Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <div className="aspect-square md:aspect-video rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden relative group">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Team collaboration"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Built for Builders</h3>
                            <p className="text-zinc-300 max-w-md">Engineered from ground up with uncompromising standards for developer productivity and meeting efficiency.</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
                            <Code className="size-8 text-white mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Technical Excellence</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                Built by Ziane Souhayl to solve hard technical problems in audio processing, diarization, and LLM context management so you don't have to.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
                            <Users className="size-8 text-white mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Customer Obsessed</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                We ship new features daily based on feedback from our community. Your workflow defines our roadmap.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5 mb-24">
                    {[
                        { label: "Meetings Analyzed", value: "10M+" },
                        { label: "Time Saved", value: "2M hrs" },
                        { label: "Countries", value: "140+" },
                        { label: "Team Size", value: "45" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Join the revolution</h2>
                    <p className="text-zinc-400 mb-8">We are hiring across Engineering, Product, and Design.</p>
                    <Link href="/careers#roles">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 gap-2">
                            View Open Roles <ArrowRight className="size-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
