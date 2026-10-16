"use client";

import { FileText, Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-zinc-400 mb-8 backdrop-blur-md">
                        <Scale className="size-4 text-primary" />
                        <span>Legal Document</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-zinc-500 text-lg">Last modified: April 18, 2026</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-invert prose-lg prose-zinc max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-primary prose-a:no-underline hover:prose-a:underline bg-zinc-900/40 border border-white/10 p-8 md:p-16 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
                >
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the MeetSync platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                    </p>

                    <h2>2. Enterprise Service Description</h2>
                    <p>
                        MeetSync provides professional AI meeting assistants, transcription, and workflow automation. Our SLA guarantees 99.9% uptime for Enterprise tiers. 
                    </p>

                    <h2>3. Data & Intellectual Property</h2>
                    <p>
                        You retain full ownership of all data, recordings, and transcripts processed through our platform. MeetSync does <strong>not</strong> use your proprietary meeting data to train foundational AI models without explicit enterprise agreements.
                    </p>

                    <h2>4. Termination</h2>
                    <p>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
