"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Sparkles, Send, Bot, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ChatView = () => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'bot',
            content: "Hello! I have indexed all your recent meetings. You can ask me about strategy shifts, specific action items, or common themes across your sessions."
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const simulateResponse = (userText: string) => {
        setIsTyping(true);

        // Simple heuristic response logic for "Wow" factor simulation
        setTimeout(() => {
            let response = "I've analyzed your meeting clusters. ";
            if (userText.toLowerCase().includes("strategy")) {
                response += "The consensus across the last 3 strategy meetings is that the 'Neural Protocol' should be the primary focus for Q1, aiming for a 40% reduction in processing overhead.";
            } else if (userText.toLowerCase().includes("action") || userText.toLowerCase().includes("task")) {
                response += "You have 12 pending action items across 5 meetings. Most critical: Sarah needs to finalize the SOC 2 audit mapping by next Friday.";
            } else {
                response += "Based on your query, the key theme identified is 'Scalability Efficiency'. Most participants are aligned on moving to regional compute clusters.";
            }

            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now().toString(), role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = inputValue;
        setInputValue("");

        simulateResponse(currentInput);
    };

    return (
        <div className="flex flex-col h-full bg-transparent p-6 md:p-12 max-w-7xl mx-auto w-full gap-16 font-sans">
            {/* Header Section */}
            <section className="relative space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium tracking-wide text-zinc-400"
                >
                    <Sparkles className="size-3.5 text-primary" />
                    Neural Context Engine Active
                </motion.div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Chat <span className="text-primary italic">Context</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl">
                            Query your entire meeting history through a unified <span className="text-white font-medium">intelligence interface</span>. Context awareness enabled.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Chat Interface - Bento Style */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-1 min-h-[600px] rounded-[3rem] bg-white/[0.02] border border-white/5 p-4 flex flex-col relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-none">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex items-start gap-6 max-w-4xl",
                                msg.role === 'user' ? "flex-row-reverse ml-auto" : ""
                            )}
                        >
                            <div className={cn(
                                "size-10 rounded-xl flex items-center justify-center shrink-0 border",
                                msg.role === 'bot'
                                    ? "bg-primary/10 border-primary/20 text-primary"
                                    : "bg-white/5 border-white/10 text-zinc-400"
                            )}>
                                {msg.role === 'bot' ? <Bot className="size-5" /> : <div className="text-[10px] font-bold">YOU</div>}
                            </div>
                            <div className="space-y-4 max-w-2xl">
                                <div className={cn(
                                    "p-6 rounded-3xl leading-relaxed text-lg",
                                    msg.role === 'bot'
                                        ? "rounded-tl-none bg-white/[0.03] border border-white/5 text-zinc-200"
                                        : "rounded-tr-none bg-primary text-zinc-950 font-bold"
                                )}>
                                    {msg.content}
                                </div>
                                {msg.role === 'bot' && i === 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        <Badge
                                            onClick={() => { setInputValue("What were the key strategy shifts?"); }}
                                            variant="outline"
                                            className="rounded-lg border-white/5 bg-white/5 text-zinc-500 hover:text-white cursor-pointer transition-colors px-3 py-1"
                                        >
                                            "What were the key strategy shifts?"
                                        </Badge>
                                        <Badge
                                            onClick={() => { setInputValue("Summarize action items"); }}
                                            variant="outline"
                                            className="rounded-lg border-white/5 bg-white/5 text-zinc-500 hover:text-white cursor-pointer transition-colors px-3 py-1"
                                        >
                                            "Summarize action items"
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex items-center gap-4 text-zinc-500 italic text-sm pl-16">
                            <Zap className="size-4 animate-pulse text-primary" />
                            Neural engine is synthesizing response...
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-8 border-t border-white/5 bg-zinc-900/10">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="relative group/input"
                    >
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Query the neural network..."
                            className="h-16 rounded-2xl bg-zinc-950/80 border-white/10 pl-8 pr-20 text-lg focus:border-primary/50 transition-all placeholder:text-zinc-700 shadow-2xl"
                        />
                        <Button
                            onClick={handleSend}
                            size="icon"
                            className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-xl bg-primary text-zinc-950 hover:bg-primary/90 transition-all shadow-lg shadow-primary/40 hover:scale-105 active:scale-95"
                        >
                            <Send className="size-5" />
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
