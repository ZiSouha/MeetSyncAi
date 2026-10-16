"use client";

import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#10b98115_0%,transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-semibold text-zinc-300 mb-6"
                    >
                        <MessageSquare className="size-4 text-primary" />
                        <span>Get in Touch</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
                    >
                        Let's start a <span className="text-primary text-glow">conversation.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 font-light"
                    >
                        Whether you need a custom enterprise plan or just want to say hi, our team is always ready to help.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 md:p-10 rounded-[2rem] bg-zinc-900/40 border border-white/10 backdrop-blur-xl shadow-2xl relative"
                    >
                        <form className="space-y-6 relative z-10 text-left">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">First Name</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Last Name</label>
                                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Work Email</label>
                                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="john@company.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">How can we help?</label>
                                <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Tell us about your team's needs..."></textarea>
                            </div>
                            <Button className="w-full h-14 rounded-xl font-bold bg-white text-zinc-950 hover:bg-zinc-200 transition-all group flex items-center justify-center gap-2 text-lg">
                                Send Message <Send className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Founder Direct Card */}
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-white/[0.02] to-white/[0.01] border border-primary/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden">
                            <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
                                <Mail className="size-5 text-primary" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Direct Founder Contact</span>
                            <h3 className="text-2xl font-bold text-white mt-1 mb-2">Ziane Souhayl</h3>
                            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                                Want to discuss partnership, custom integrations, or have direct technical feedback? Connect directly with the creator.
                            </p>
                            <a 
                                href="mailto:zianesouhayl@gmail.com" 
                                className="text-base font-semibold text-primary hover:text-white transition-colors flex items-center gap-2 mb-4"
                            >
                                zianesouhayl@gmail.com <ArrowRight className="size-4" />
                            </a>
                            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                                <a 
                                    href="https://github.com/ZiSouha" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-2 border border-white/5"
                                >
                                    <FaGithub className="size-3.5" /> GitHub Profile
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/ziane-souhayl" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-2 border border-white/5"
                                >
                                    <FaLinkedin className="size-3.5" /> LinkedIn
                                </a>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                            <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                                <MessageSquare className="size-5 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Platform Support</h3>
                            <p className="text-zinc-400 mb-6">Our support team monitors incoming issues 24/7.</p>
                            <a href="mailto:zianesouhayl@gmail.com" className="text-lg font-medium text-blue-400 hover:text-white transition-colors flex items-center gap-2">
                                zianesouhayl@gmail.com <ArrowRight className="size-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
