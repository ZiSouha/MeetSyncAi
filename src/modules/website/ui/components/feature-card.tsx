"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/5 active:scale-95 duration-500"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Ambient Background Glow */}
            <div className="absolute -right-4 -top-4 size-24 bg-primary/5 rounded-full blur-2xl transition-all group-hover:bg-primary/10 group-hover:scale-150 duration-700" />

            <div className="relative z-10">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-primary/30">
                    <Icon className="size-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-outfit">{title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm font-medium">{description}</p>
            </div>

            {/* Micro-interaction arrow */}
            <div className="mt-6 flex items-center text-primary font-bold text-xs uppercase tracking-widest opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                Learn more
                <svg className="ml-2 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </motion.div>
    );
};
