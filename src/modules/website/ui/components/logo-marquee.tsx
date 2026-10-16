"use client";

import { motion } from "framer-motion";

const brands = [
    "STRIPE", "VERCEL", "OPENAI", "ANTHROPIC", "MISTRAL", "LINEAR", "GITHUB", "NOTION"
];

export const LogoMarquee = () => {
    return (
        <div className="py-32 bg-background border-y border-white/5 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-60 bg-linear-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-60 bg-linear-to-l from-background to-transparent z-10" />

            <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-16">
                Integrated with the industry's most reliable stacks
            </p>

            <motion.div
                className="flex whitespace-nowrap gap-32"
                animate={{ x: [0, -1200] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
                {[...brands, ...brands].map((brand, i) => (
                    <span
                        key={i}
                        className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-800 hover:text-primary transition-colors duration-700 cursor-default"
                    >
                        {brand}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
