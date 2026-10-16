"use client";

import { Button } from "@/components/ui/button";
import { BentoCard } from "../components/bento-card";
import { 
    BotIcon,
    ZapIcon,
    Target,
    ShieldCheck,
    Clock,
    Shield,
    Terminal,
    Layers,
    Code2,
    Presentation,
    TrendingUp,
    UserCheck,
    Sparkles,
    GitBranch,
    MessageSquareText,
    BarChart3,
    Play,
    Quote,
    Building,
    Users,
    LineChart,
    Search,
    Volume2,
    VolumeX
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FAQSection } from "../components/faq-section";

const HomeView = () => {
    const containerRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div
            ref={containerRef}
            className="selection:bg-primary/30 min-h-screen text-white font-sans antialiased overflow-x-hidden relative z-10"
            suppressHydrationWarning
        >



            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden z-10">
                {/* Subtle Grid Background - Removed overlapping grid to avoid moire patterns, kept radial mask if needed specifically for hero focus, but relying on global now for connection */}
                {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" /> */}

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Column - Content */}
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium tracking-wide text-zinc-400"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    Now Available — Enterprise Beta
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                                        AI-Powered Meeting Intelligence
                                    </h1>
                                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-xl">
                                        Transform every conversation into actionable insights with autonomous agents that understand context, capture decisions, and deliver precision summaries.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                                >
                                    <Link href="/sign-up">
                                        <Button size="lg" className="h-14 px-8 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-zinc-950 shadow-lg shadow-primary/20 transition-all">
                                            Start Free Trial
                                        </Button>
                                    </Link>
                                    <Link href="/pricing">
                                        <Button size="lg" variant="ghost" className="h-14 px-8 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.05] transition-all">
                                            View Pricing
                                        </Button>
                                    </Link>
                                </motion.div>

                                {/* Trust Indicators */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="flex items-center gap-8 pt-8 border-t border-white/5"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="size-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-zinc-500 font-medium">SOC 2 Certified</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="size-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-zinc-500 font-medium">GDPR Compliant</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="size-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-zinc-500 font-medium">99.9% Uptime</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column - Stats & Visual */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">10K+</div>
                                        <div className="text-sm text-zinc-500 font-medium">Meetings Analyzed</div>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">95%</div>
                                        <div className="text-sm text-zinc-500 font-medium">Accuracy Rate</div>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">2.5hrs</div>
                                        <div className="text-sm text-zinc-500 font-medium">Avg. Time Saved</div>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                                        <div className="text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">500+</div>
                                        <div className="text-sm text-zinc-500 font-medium">Enterprise Clients</div>
                                    </div>
                                </div>

                                {/* Floating AI Indicator */}
                                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                                            <div className="relative size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                <div className="size-3 bg-primary rounded-full shadow-[0_0_20px_rgba(22,163,74,0.8)]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-zinc-500 font-medium mb-1">AI Status</div>
                                            <div className="text-sm text-white font-semibold">Processing Live</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Video Demo Section */}
            <section className="py-20 bg-transparent border-b border-white/5 relative overflow-hidden z-10">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-300 text-xs font-medium mb-6">
                            <Play className="size-3 text-primary" />
                            <span>See it in action</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Experience the power of intelligence
                        </h2>
                    </div>

                    <div 
                        className="relative aspect-video rounded-3xl border border-white/10 bg-zinc-900/50 shadow-2xl overflow-hidden group cursor-pointer"
                        onClick={toggleMute}
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        >
                            <source src="/Realvideo.mp4" type="video/mp4" />
                        </video>
                        
                        {/* Shadow Overlays for depth */}
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                        {/* Browser Top Bar Mockup */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-900/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-2 z-20">
                            <div className="flex gap-1.5">
                                <div className="size-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                                <div className="size-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                                <div className="size-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
                            </div>
                            <div className="mx-auto px-4 py-0.5 rounded bg-black/40 text-[9px] text-zinc-500 font-mono tracking-tight">meetsync.app/demo/live</div>
                        </div>

                        {/* Audio Toggle Overlay */}
                        <div className="absolute top-14 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white font-medium text-xs">
                                {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                                {isMuted ? "Click to unmute" : "Audio Active"}
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
                                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Preview</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 md:py-24 bg-transparent border-t border-white/5 relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
                            Enterprise-grade infrastructure
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
                            A secure, scalable foundation built for organizations that refuse to compromise on data privacy or performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
                        {[
                            {
                                icon: Terminal,
                                title: "Real-time Protocol",
                                desc: "Sub-millisecond latency state management across all connected clients."
                            },
                            {
                                icon: ShieldCheck,
                                title: "SOC 2 Type II",
                                desc: "Full compliance with enterprise security standards and regular rigorous audits."
                            },
                            {
                                icon: Layers,
                                title: "Edge Caching",
                                desc: "Global distribution network ensuring instant access to meeting artifacts anywhere."
                            },
                            {
                                icon: ZapIcon,
                                title: "Websocket Stream",
                                desc: "Bi-directional durable connections for instant transcription and agent interaction."
                            },
                            {
                                icon: Shield,
                                title: "Granular RBAC",
                                desc: "Fine-grained role-based access control for teams, departments, and external guests."
                            },
                            {
                                icon: Clock,
                                title: "Retention Policies",
                                desc: "Automated data lifecycle management compliant with your legal requirements."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 border-r border-b border-white/10 bg-zinc-950 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                                <div className="mb-6 inline-flex p-3 rounded-lg bg-white/5 border border-white/5 text-zinc-400 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                                    <feature.icon className="size-5" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases / Personas Section */}
            <section className="py-20 md:py-24 bg-transparent relative overflow-hidden z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-medium mb-6">
                            <UserCheck className="size-3" />
                            <span>Use Cases</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Built for your entire organization
                        </h2>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            MeetSync creates a unified intelligence layer that adapts to the specific needs of every department.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Sales Persona */}
                        <div className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/20 hover:bg-zinc-900 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <BarChart3 className="size-6 text-emerald-400" />
                                </div>
                                <TrendingUp className="size-24 text-emerald-500/5 absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Revenue Teams</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Close deals faster by automatically capturing objection handling, competitor mentions, and pricing feedback.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    Auto-fill CRM fields in Salesforce/HubSpot
                                </li>
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    Real-time battlecards during calls
                                </li>
                            </ul>
                        </div>

                        {/* Product Persona */}
                        <div className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/20 hover:bg-zinc-900 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <Presentation className="size-6 text-purple-400" />
                                </div>
                                <Sparkles className="size-24 text-purple-500/5 absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Product Organizations</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Synthesize user feedback from hundreds of calls to identify feature requests and sentiment shifts instantly.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-purple-500 shrink-0" />
                                    Aggregate user sentiment trends
                                </li>
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-purple-500 shrink-0" />
                                    Validate roadmap priorities with data
                                </li>
                            </ul>
                        </div>

                        {/* Executive Leadership Persona */}
                        <div className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/20 hover:bg-zinc-900 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <Building className="size-6 text-blue-400" />
                                </div>
                                <LineChart className="size-24 text-blue-500/5 absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Executive Leadership</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Get high-level visibility into organizational velocity, meeting culture health, and key decision outcomes.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-blue-500 shrink-0" />
                                    Weekly automated digest summaries
                                </li>
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-blue-500 shrink-0" />
                                    Track organization-wide KPIs
                                </li>
                            </ul>
                        </div>

                        {/* Customer Success Persona */}
                        <div className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/20 hover:bg-zinc-900 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                    <Users className="size-6 text-orange-400" />
                                </div>
                                <MessageSquareText className="size-24 text-orange-500/5 absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Customer Success</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Proactively identify churn risks and upsell opportunities by analyzing customer interactions at scale.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-orange-500 shrink-0" />
                                    Automated follow-up drafting
                                </li>
                                <li className="flex items-start gap-3 text-sm text-zinc-300">
                                    <div className="mt-1 size-1.5 rounded-full bg-orange-500 shrink-0" />
                                    Churn risk alert system
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Integration Section */}
            <section className="py-20 md:py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
                                Seamless Integration Ecosystem
                            </h2>
                            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                                Connect MeetSync with your existing tool stack. Our bidirectional sync engine ensures your meeting data lives where you work—whether that's in your CRM, project management tool, or documentation hub.
                            </p>
                            <div className="flex flex-col gap-4">
                                {[
                                    { title: "CRM Sync", desc: "Auto-update Salesforce & HubSpot records" },
                                    { title: "Task Creation", desc: "Turn action items into Linear & Jira tickets" },
                                    { title: "Knowledge Base", desc: "Push summaries to Notion & Confluence" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <div className="mt-1 size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <div className="size-2 rounded-full bg-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium mb-1">{item.title}</h3>
                                            <p className="text-sm text-zinc-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-[100px] opacity-30" />
                            <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 shadow-2xl">
                                {/* Abstract UI visualization of a workflow */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                                <ZapIcon className="size-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">Post-Meeting Workflow</div>
                                                <div className="text-xs text-zinc-500">Active • Last run 2m ago</div>
                                            </div>
                                        </div>
                                        <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Running</div>
                                    </div>
                                    <div className="space-y-6">
                                        {[
                                            { icon: BotIcon, text: "Generate executive summary" },
                                            { icon: Target, text: "Extract action items" },
                                            { icon: ShieldCheck, text: "Verify compliance (PII check)" },
                                            { icon: Terminal, text: "Sync to Salesforce & Linear" }
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className={`size-8 rounded-full flex items-center justify-center border ${i === 3 ? 'border-primary text-primary bg-primary/10' : 'border-zinc-700 text-zinc-600 bg-zinc-900'}`}>
                                                    <step.icon className="size-4" />
                                                </div>
                                                <div className="h-px flex-1 bg-zinc-800" />
                                                <div className={`text-sm ${i === 3 ? 'text-white' : 'text-zinc-500'}`}>{step.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-24 bg-transparent border-t border-b border-white/5 relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-medium mb-6">
                            <Quote className="size-3" />
                            <span>Trusted by leaders</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Loved by modern teams
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "MeetSync has completely transformed how we document engineering decisions. It's like having a technical program manager in every meeting.",
                                author: "Sarah Chen",
                                role: "VP of Engineering",
                                company: "TechFlow",
                                metric: "Saved 40 hrs/mo per PM"
                            },
                            {
                                quote: "The ability to automatically sync sales objections to our product board has closed the feedback loop for us. A game changer.",
                                author: "Michael Ross",
                                role: "Head of Product",
                                company: "ScaleUp",
                                metric: "3x faster feedback cycle"
                            },
                            {
                                quote: "I can skip 50% of my meetings and still know exactly what happened. The summaries are frighteningly accurate.",
                                author: "Elena Rodriguez",
                                role: "Chief Revenue Officer",
                                company: "GlobalStream",
                                metric: "Recovered 15hrs/week"
                            }
                        ].map((testimonial, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/60 transition-colors">
                                <div className="flex text-primary mb-6">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="size-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-zinc-300 mb-8 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                    <div className="size-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-semibold text-white">
                                        {testimonial.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                                        <div className="text-xs text-zinc-500">{testimonial.role}, {testimonial.company}</div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-emerald-400">
                                    <TrendingUp className="size-3" />
                                    {testimonial.metric}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection />

            {/* Professional Final CTA */}
            <section className="py-20 md:py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/5 blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Ready to modernize your meeting infrastructure?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join the forward-thinking engineering and product teams that have already switched to MeetSync for their meeting intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/sign-up">
                                <Button size="lg" className="h-14 px-8 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 text-zinc-950 shadow-lg shadow-primary/25 min-w-[200px]">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/contact-sales">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-base font-semibold text-white border-white/10 hover:bg-white/5 min-w-[200px]">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                        <p className="mt-8 text-sm text-zinc-500">
                            No credit card required for trial • Enterprise-grade security • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 border-t border-white/5 relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="max-w-md">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                                    <svg className="size-5 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-white">
                                    MeetSync
                                </span>
                            </Link>
                            <p className="text-lg text-zinc-400 leading-relaxed mb-4">
                                The enterprise standard for intelligent meeting records. Built for teams that ship fast and demand precision.
                            </p>
                            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                                <span className="text-primary font-bold">Creator:</span>
                                <span>Ziane Souhayl</span>
                                <span className="text-zinc-600">•</span>
                                <a href="mailto:zianesouhayl@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
                                    zianesouhayl@gmail.com
                                </a>
                            </div>
                            <div className="flex gap-3">
                                {/* Twitter -> Redirects to Dashboard */}
                                <Link 
                                    href="/dashboard" 
                                    title="Twitter (Dashboard)"
                                    className="size-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                                >
                                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </Link>
                                {/* GitHub -> Ziane Souhayl */}
                                <a 
                                    href="https://github.com/ZiSouha" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title="GitHub - Ziane Souhayl"
                                    className="size-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                                >
                                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </a>
                                {/* LinkedIn -> Ziane Souhayl */}
                                <a 
                                    href="https://www.linkedin.com/in/ziane-souhayl" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title="LinkedIn - Ziane Souhayl"
                                    className="size-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                                >
                                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                                {/* Direct Email */}
                                <a 
                                    href="mailto:zianesouhayl@gmail.com" 
                                    title="Email Ziane Souhayl"
                                    className="size-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                                >
                                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h4 className="text-white text-xl font-semibold mb-6">Subscribe to our engineering changelog</h4>
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full sm:flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                                />
                                <Button size="lg" className="w-full sm:w-auto shrink-0 bg-primary text-zinc-950 hover:bg-primary/90 font-bold px-8 py-4 sm:py-0 rounded-xl sm:h-auto">
                                    Subscribe
                                </Button>
                            </div>
                            <p className="text-sm text-zinc-500 mt-6">
                                We ship new features every week. Unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomeView;
