"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, Trophy, Zap, Code2, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function CommunityPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden text-center">
            {/* Background */}
            <div className="absolute top-0 right-[20%] size-[600px] bg-[#5865F2]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="size-24 rounded-3xl bg-[#5865F2]/20 border border-[#5865F2]/30 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(88,101,242,0.3)]"
                >
                    <MessageCircle className="size-12 text-[#5865F2]" />
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
                >
                    Join the <span className="text-[#5865F2]">MeetSync Squad</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light"
                >
                    Connect with thousands of product managers, engineers, and founders shifting the way the world builds technology.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-10"
                >
                    <Link href="/dashboard">
                        <Button className="h-14 px-8 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] transition-all hover:-translate-y-1">
                            Join Community (Dashboard)
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="outline" className="h-14 px-8 rounded-xl border-white/10 text-white hover:bg-white/5 font-bold text-lg">
                            Follow on Twitter
                        </Button>
                    </Link>
                    <a href="https://github.com/ZiSouha" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="h-14 px-8 rounded-xl border-white/10 text-white hover:bg-white/5 font-bold text-lg gap-2">
                            <FaGithub className="size-5" /> GitHub
                        </Button>
                    </a>
                    <a href="https://www.linkedin.com/in/ziane-souhayl" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="h-14 px-8 rounded-xl border-white/10 text-white hover:bg-white/5 font-bold text-lg gap-2">
                            <FaLinkedin className="size-5" /> LinkedIn
                        </Button>
                    </a>
                </motion.div>

                <p className="text-sm text-zinc-500 mb-20">
                    Project founded and crafted by{" "}
                    <strong className="text-white">Ziane Souhayl</strong>{" "}
                    (<a href="mailto:zianesouhayl@gmail.com" className="text-primary hover:underline">zianesouhayl@gmail.com</a>)
                </p>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-6 text-left border-t border-white/10 pt-20">
                    {[
                        { icon: Zap, title: "Early Access", desc: "Get access to alpha features and help shape our product roadmap." },
                        { icon: Code2, title: "API Support", desc: "Direct access to our engineering team for custom integration support." },
                        { icon: Trophy, title: "Swag & Perks", desc: "Top contributors earn exclusive MeetSync merch and lifetime discounts." }
                    ].map((perk, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10"
                        >
                            <perk.icon className="size-8 text-white mb-6" />
                            <h3 className="text-xl font-bold text-white mb-3">{perk.title}</h3>
                            <p className="text-zinc-400">{perk.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
