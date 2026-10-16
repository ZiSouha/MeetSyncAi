import { BLOG_POSTS } from "@/modules/website/ui/components/blog-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Twitter, Linkedin, Link2 } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-32 relative z-10 selection:bg-primary/30 antialiased">
            {/* Immersive Hero Header */}
            <div className="relative h-[70vh] w-full min-h-[500px] overflow-hidden">
                <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/20" />
                
                {/* Meta Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <div className="container mx-auto max-w-4xl">
                        <Link 
                            href="/blog" 
                            className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-10 group"
                        >
                            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Transmission
                        </Link>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                {post.category}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-10 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-10">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full border-2 border-primary/30 overflow-hidden shadow-2xl">
                                    <img src={post.author.avatar} alt={post.author.name} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{post.author.name}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase font-black tracking-tight">{post.author.role}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Calendar className="size-4 text-zinc-700" />
                                    <span className="text-sm font-medium">{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Clock className="size-4 text-zinc-700" />
                                    <span className="text-sm font-medium">{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reading Context */}
            <div className="container mx-auto px-6 max-w-4xl mt-20">
                <div className="grid lg:grid-cols-[1fr_80px] gap-20">
                    {/* Main Body */}
                    <div className="space-y-12 text-zinc-400 text-xl leading-[1.6] font-light">
                        {post.content}
                    </div>

                    {/* Social Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-40 space-y-4">
                            <Link 
                                href="/dashboard" 
                                title="Twitter (Dashboard)"
                                className="size-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-primary/50 transition-all hover:scale-110"
                            >
                                <Twitter className="size-5" />
                            </Link>
                            <a 
                                href="https://www.linkedin.com/in/ziane-souhayl" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                title="LinkedIn - Ziane Souhayl"
                                className="size-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-primary/50 transition-all hover:scale-110"
                            >
                                <Linkedin className="size-5" />
                            </a>
                            <a 
                                href="https://github.com/ZiSouha" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                title="GitHub - Ziane Souhayl"
                                className="size-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-primary/50 transition-all hover:scale-110"
                            >
                                <Link2 className="size-5" />
                            </a>
                        </div>
                    </aside>
                </div>

                {/* Footer Signature */}
                <div className="mt-32 pt-12 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                            Article by <span className="text-white">Ziane Souhayl</span> • MeetSync AI
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-zinc-400">Connect:</span>
                            <div className="flex gap-2">
                                <Link href="/dashboard" title="Twitter" className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                    <Twitter className="size-3 text-zinc-400" />
                                </Link>
                                <a href="https://www.linkedin.com/in/ziane-souhayl" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                    <Linkedin className="size-3 text-zinc-400" />
                                </a>
                                <a href="https://github.com/ZiSouha" target="_blank" rel="noopener noreferrer" title="GitHub" className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                    <Link2 className="size-3 text-zinc-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
