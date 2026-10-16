"use client";

import { ShieldAlert, Lock, Server } from "lucide-react";
import { motion } from "framer-motion";

export default function DPAPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center"
                >
                    <div className="size-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-8">
                        <ShieldAlert className="size-10 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Data Processing Addendum
                    </h1>
                    <p className="text-zinc-500 text-lg">Strict compliance for enterprise operations.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <Lock className="size-8 text-white mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">GDPR Compliant</h3>
                        <p className="text-zinc-400">Full compliance with EU data protection regulations and standard contractual clauses.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                        <Server className="size-8 text-white mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Region Isolation</h3>
                        <p className="text-zinc-400">Data residency options available for US-East and EU-Central cloud instances.</p>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg prose-zinc max-w-none bg-zinc-900/40 border border-white/10 p-8 md:p-16 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
                >
                    <p className="lead text-xl text-zinc-300">
                        This Data Processing Addendum ("DPA") forms part of the Master Subscription Agreement ("Agreement") between MeetSync and the Customer.
                    </p>
                    <h3>1. Processing of Customer Personal Data</h3>
                    <p>MeetSync shall process Customer Personal Data only on behalf of and in accordance with Customer's documented instructions for the processing purposes set out in the Agreement.</p>
                    
                    <h3>2. Subprocessing</h3>
                    <p>Customer provides a general authorization for MeetSync to engage subprocessors to process Customer Personal Data. A list of current sub-processors is available upon request.</p>

                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl mt-12 text-center">
                        <p className="text-blue-400 font-medium m-0">To request an executed copy of this DPA, please contact legal@meetsync.com.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
