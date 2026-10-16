"use client"

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow, isAfter, isBefore, subMinutes } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon, Loader2, VideoIcon, ExternalLinkIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UpcomingMeetings = () => {
    const trpc = useTRPC();
    const { data: events, isLoading } = useQuery({
        ...trpc.integrations.getUpcomingEvents.queryOptions(),
        refetchInterval: 60000 // Refresh every minute
    });

    if (isLoading) return null;

    // Find the next meeting
    const nextEvent = events && events.length > 0 ? events[0] : null;

    if (!nextEvent) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="rounded-[3rem] bg-white/[0.04] border border-white/10 p-10 relative overflow-hidden group shadow-2xl hover:bg-white/[0.06] transition-all duration-700 h-full min-h-[300px] flex flex-col justify-center items-center text-center"
                data-testid="no-upcoming-meetings-state"
            >
                <CalendarIcon className="size-12 text-zinc-700 mb-4" />
                <p className="text-zinc-500 font-medium">No upcoming meetings sync'd.</p>
                <p className="text-xs text-zinc-600 mt-2">Connect Google Calendar in Settings.</p>
            </motion.div>
        )
    }

    const startTime = new Date(nextEvent.startTime);
    const now = new Date();

    // Check if meeting is "joinable" (e.g. within last 10 mins or next 15 mins)
    const isJoinable = isAfter(now, subMinutes(startTime, 10)) && isBefore(now, new Date(nextEvent.endTime));

    // Determine status color
    const isImminent = isBefore(startTime, new Date(now.getTime() + 15 * 60000)) && isAfter(startTime, now);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-white/10 p-10 relative overflow-hidden group shadow-2xl hover:bg-white/[0.06] transition-all duration-700 min-h-[300px] flex flex-col justify-between"
            data-testid="upcoming-meeting-card"
        >
            <div className="absolute top-0 right-0 size-48 bg-indigo-500/20 rounded-full blur-[80px] opacity-100 animate-pulse duration-[5s]" />

            <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-indigo-400">
                    <CalendarIcon className="size-6" />
                </div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">{isJoinable ? "Happening Now" : "Up Next"}</span>
            </div>

            <div className="relative z-10 my-6">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight line-clamp-2" title={nextEvent.title} data-testid="upcoming-meeting-title">
                    {nextEvent.title}
                </h3>
                <p className="text-lg text-indigo-300 font-medium" data-testid="upcoming-meeting-countdown">
                    {formatDistanceToNow(startTime, { addSuffix: true })}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                    <Clock className="size-4" />
                    <span data-testid="upcoming-meeting-time">{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(nextEvent.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            <div className="relative z-10">
                {isJoinable && nextEvent.meetLink ? (
                    <Button
                        size="lg"
                        className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 animate-pulse"
                        onClick={() => window.open(nextEvent.meetLink!, '_blank')}
                        data-testid="join-meeting-button"
                    >
                        <VideoIcon className="mr-2 size-5" />
                        Join Meeting Now
                    </Button>
                ) : (
                    <div className="space-y-3">
                        {nextEvent.meetLink && (
                            <Button
                                variant="outline"
                                className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium rounded-xl"
                                onClick={() => window.open(nextEvent.meetLink!, '_blank')}
                                data-testid="open-meeting-link-button"
                            >
                                <ExternalLinkIcon className="mr-2 size-4" />
                                Open Link
                            </Button>
                        )}
                        <p className="text-[10px] text-center text-zinc-600 uppercase tracking-widest">
                            Sync'd via Google Calendar
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

function ClockIcon(props: any) {
    return (
        <Clock {...props} />
    )
}
