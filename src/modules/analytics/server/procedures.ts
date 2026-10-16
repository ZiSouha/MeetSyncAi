
import { db } from "@/db";
import { meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq, sql, desc, gte } from "drizzle-orm";
import { z } from "zod";
import { subDays, format } from "date-fns";

export const analyticsRouter = createTRPCRouter({
    getAgentAnalytics: protectedProcedure
        .input(z.object({ agentId: z.string(), days: z.number().default(30) }))
        .query(async ({ ctx, input }) => {
            const startDate = subDays(new Date(), input.days);

            const data = await db
                .select({
                    createdAt: meetings.createdAt,
                    startedAt: meetings.startedAt,
                    endedAt: meetings.endedAt,
                    sentimentScore: meetings.sentimentScore,
                })
                .from(meetings)
                .where(
                    and(
                        eq(meetings.agentId, input.agentId),
                        eq(meetings.userId, ctx.auth.user.id),
                        gte(meetings.createdAt, startDate)
                    )
                )
                .orderBy(desc(meetings.createdAt));

            let totalMinutes = 0;
            const sentimentMap = new Map<string, { total: number, count: number }>();
            const usageMap = new Map<string, number>();

            // Initialize last 7 days with 0
            for (let i = 0; i < input.days; i++) {
                const day = format(subDays(new Date(), i), 'yyyy-MM-dd');
                usageMap.set(day, 0);
                sentimentMap.set(day, { total: 0, count: 0 }); // Default neutral
            }

            data.forEach(meeting => {
                const dateKey = format(meeting.createdAt, 'yyyy-MM-dd');

                // Duration
                if (meeting.startedAt && meeting.endedAt) {
                    const durationMs = meeting.endedAt.getTime() - meeting.startedAt.getTime();
                    totalMinutes += durationMs / 1000 / 60;
                }

                // Usage
                const currentUsage = usageMap.get(dateKey) || 0;
                usageMap.set(dateKey, currentUsage + 1);

                // Sentiment
                if (meeting.sentimentScore !== null) {
                    const current = sentimentMap.get(dateKey) || { total: 0, count: 0 };
                    sentimentMap.set(dateKey, { total: current.total + meeting.sentimentScore, count: current.count + 1 });
                }
            });

            const sentimentTrend = Array.from(sentimentMap.entries())
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([date, val]) => ({
                    date: format(new Date(date), 'MMM dd'),
                    score: val.count > 0 ? val.total / val.count : 0
                }));

            const usageTrend = Array.from(usageMap.entries())
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([date, count]) => ({
                    date: format(new Date(date), 'MMM dd'),
                    count
                }));

            return {
                totalMinutes: Math.round(totalMinutes),
                sentimentTrend,
                usageTrend,
                totalMeetings: data.length
            };
        }),

    getWorkspaceAnalytics: protectedProcedure
        .input(z.object({ days: z.number().default(7) }))
        .query(async ({ ctx, input }) => {
            const startDate = subDays(new Date(), input.days);

            const data = await db
                .select({
                    createdAt: meetings.createdAt,
                    startedAt: meetings.startedAt,
                    endedAt: meetings.endedAt,
                    sentimentScore: meetings.sentimentScore,
                })
                .from(meetings)
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        gte(meetings.createdAt, startDate)
                    )
                );

            let totalMinutes = 0;
            const usageMap = new Map<string, number>();
            const sentimentMap = new Map<string, { total: number, count: number }>();

            // Initialize last X days
            for (let i = 0; i < input.days; i++) {
                const day = format(subDays(new Date(), i), 'yyyy-MM-dd');
                usageMap.set(day, 0);
                sentimentMap.set(day, { total: 0, count: 0 });
            }

            data.forEach(m => {
                const dateKey = format(m.createdAt, 'yyyy-MM-dd');

                if (m.startedAt && m.endedAt) {
                    totalMinutes += (m.endedAt.getTime() - m.startedAt.getTime()) / 1000 / 60;
                }

                // Usage
                usageMap.set(dateKey, (usageMap.get(dateKey) || 0) + 1);

                // Sentiment
                if (m.sentimentScore !== null) {
                    const current = sentimentMap.get(dateKey) || { total: 0, count: 0 };
                    sentimentMap.set(dateKey, { total: current.total + m.sentimentScore, count: current.count + 1 });
                }
            });

            // Calculate trends
            const usageTrend = Array.from(usageMap.entries())
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([date, count]) => ({
                    date: format(new Date(date), 'MMM dd'),
                    count
                }));

            const sentimentTrend = Array.from(sentimentMap.entries())
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([date, val]) => ({
                    date: format(new Date(date), 'MMM dd'),
                    score: val.count > 0 ? Math.round(val.total / val.count) : 50 // Default neutral
                }));

            // Historical Data
            const historicalData = await db
                .select({
                    startedAt: meetings.startedAt,
                    endedAt: meetings.endedAt,
                })
                .from(meetings)
                .where(eq(meetings.userId, ctx.auth.user.id));

            let historicalMinutes = 0;
            historicalData.forEach(m => {
                if (m.startedAt && m.endedAt) {
                    historicalMinutes += (m.endedAt.getTime() - m.startedAt.getTime()) / 1000 / 60;
                }
            });

            return {
                recentMinutes: Math.round(totalMinutes),
                historicalHours: (historicalMinutes / 60).toFixed(1),
                hoursSaved: (historicalMinutes / 60 * 1.5).toFixed(1),
                recentMeetingsCount: data.length,
                usageTrend,
                sentimentTrend
            };
        })
});
