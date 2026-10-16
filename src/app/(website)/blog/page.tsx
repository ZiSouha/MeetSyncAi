"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Clock, User, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/modules/website/ui/components/blog-content";

export default function BlogPage() {
    const featuredPost = BLOG_POSTS[0];
    const remainingPosts = BLOG_POSTS.slice(1);

    return (
        <div className="min-h-screen pt-40 pb-32 relative z-10 selection:bg-primary/30">
            {/* Background Backlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-8"
                    >
                        <Bookmark className="size-3 text-primary" />
                        <span>Intelligence Hub</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
                    >
                        Latest Transmission
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 font-light leading-relaxed"
                    >
                        Product nodes, infrastructure deep dives, and thoughts on the convergence of AI and human collaboration.
                    </motion.p>
                </div>

                {/* Featured Post */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-32"
                >
                    <Link href={`/blog/${featuredPost.slug}`} className="group block relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900/30 backdrop-blur-3xl hover:border-primary/30 transition-all duration-500">
                        <div className="flex flex-col md:grid md:grid-cols-2">
                            <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden">
                                <img 
                                    src={featuredPost.image} 
                                    alt={featuredPost.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                                <div className="absolute top-8 left-8 bg-zinc-950/80 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                                    {featuredPost.category}
                                </div>
                            </div>
                            <div className="p-8 md:p-16 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-xs font-bold text-primary mb-6 uppercase tracking-widest">
                                    <span>{featuredPost.date}</span>
                                    <span className="size-1 rounded-full bg-zinc-800" />
                                    <span>{featuredPost.readTime}</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 group-hover:text-primary transition-colors tracking-tight leading-[1.1]">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-medium">
                                    {featuredPost.description}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full border border-white/10 overflow-hidden bg-zinc-800">
                                        <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold text-white">{featuredPost.author.name}</div>
                                        <div className="text-zinc-600 text-xs tracking-tight">{featuredPost.author.role}</div>
                                    </div>
                                    <div className="ml-auto p-4 rounded-full bg-white/5 text-white group-hover:bg-primary group-hover:text-zinc-950 transition-all">
                                        <ArrowRight className="size-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {remainingPosts.map((post, i) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-zinc-900/20 border border-white/5 rounded-[2rem] p-4 hover:border-primary/20 hover:bg-zinc-900/40 transition-all duration-500">
                                <div className="aspect-[16/10] rounded-2xl bg-zinc-900 border border-white/5 mb-8 overflow-hidden relative">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-xl px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="px-2 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-zinc-600 mb-4 uppercase tracking-widest">
                                        <span>{post.date}</span>
                                        <span className="size-1 rounded-full bg-zinc-800" />
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1">
                                        {post.description}
                                    </p>
                                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-zinc-800 border border-white/5 overflow-hidden">
                                                <img src={post.author.avatar} alt={post.author.name} />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-400 capitalize">{post.author.name}</span>
                                        </div>
                                        <ArrowRight className="size-4 text-zinc-600 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
