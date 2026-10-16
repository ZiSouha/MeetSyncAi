"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
    delay?: number;
}

export const BentoCard = ({ icon: Icon, title, description, className, delay = 0 }: BentoCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "group relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] p-10 flex flex-col justify-between transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10",
                className
            )}
        >
            {/* Soft Glow */}
            <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-[60px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div>
                <div className="mb-10 inline-flex size-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-zinc-950 group-hover:scale-110">
                    <Icon className="size-6" />
                </div>
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-500">{title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium group-hover:text-zinc-400 transition-colors duration-500">{description}</p>
            </div>

            <div className="mt-8 flex items-center text-primary text-xs font-bold uppercase tracking-[0.2em] opacity-0 translate-y-2 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
                Learn More
                <svg className="ml-2 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m4-4H3" />
                </svg>
            </div>
        </motion.div>
    );
};
