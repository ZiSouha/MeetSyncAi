import { DOCS_CONTENT } from "@/modules/website/ui/components/docs-content";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = DOCS_CONTENT[slug];

    if (!content) {
        notFound();
    }

    return (
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 uppercase tracking-widest mb-8">
                <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                <ChevronRight className="size-3" />
                <span className="text-zinc-400">{content.title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">{content.title}</h1>
            
            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                {content.content}
            </div>

            <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-zinc-600">Updated 2 days ago</p>
                <Link href="/contact" className="text-xs font-bold text-primary hover:underline">Was this helpful?</Link>
            </div>
        </article>
    );
}
