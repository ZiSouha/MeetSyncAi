import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleCheckIcon, ArrowRightIcon } from "lucide-react";

export const CallEnded = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full relative overflow-hidden bg-[#0A0A0B]">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 flex flex-col items-center justify-center gap-y-8 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-[3rem] p-16 shadow-2xl max-w-lg w-full mx-4 text-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
                    <div className="size-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative z-10">
                        <CircleCheckIcon className="size-10 text-emerald-500" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-4xl font-black font-heading text-white tracking-tight">Session Ended</h2>
                    <p className="text-zinc-400 font-medium text-lg max-w-[280px] mx-auto leading-relaxed">
                        Your meeting intelligence is now being processed.
                    </p>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 w-full">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Estimated Time</p>
                    <p className="text-sm font-bold text-white tracking-tight">~ 2-5 minutes</p>
                </div>

                <Button asChild className="w-full h-14 rounded-2xl bg-white text-black font-black hover:bg-zinc-200 hover:scale-105 transition-all text-base shadow-xl shadow-white/5">
                    <Link href="/meetings" className="flex items-center justify-center gap-2">
                        View Meetings
                        <ArrowRightIcon className="size-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}