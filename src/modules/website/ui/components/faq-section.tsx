"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="border-b border-white/5 py-8 cursor-pointer group"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center justify-between gap-8">
                <h4 className={cn(
                    "text-2xl font-semibold transition-all duration-500",
                    isOpen ? "text-primary text-glow" : "text-zinc-400 group-hover:text-white"
                )}>
                    {question}
                </h4>
                <div className={cn(
                    "size-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500",
                    isOpen ? "rotate-45 bg-primary border-primary text-zinc-950" : "group-hover:border-white/30"
                )}>
                    <Plus className="size-6" />
                </div>
            </div>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <p className="text-zinc-500 font-medium leading-relaxed pt-6 text-lg max-w-2xl">
                        {answer}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export const FAQSection = () => {
    const faqs = [
        {
            question: "How does the neural engine work?",
            answer: "Our proprietary neural engine processes audio in parallel clusters, identifying speaker intent and context with sub-millisecond latency for maximum precision."
        },
        {
            question: "Is my meeting data encrypted?",
            answer: "Every byte of data is encrypted using AES-256 and stored in isolated vaults. We never use your private data to train public models."
        },
        {
            question: "Can I use custom agents?",
            answer: "Enterprise users can deploy specialized agents trained on their own documentation to provide deep-context summaries and action items."
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            {/* Subtle Gradient Spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                            Your questions,<br />
                            <span className="text-primary text-glow">answered.</span>
                        </h2>
                        <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                            Everything you need to know about the next generation of meeting intelligence.
                        </p>
                    </div>
                    <div className="lg:w-2/3">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} {...faq} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
