
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, count } from "drizzle-orm";
import { z } from "zod";

export const notificationsRouter = createTRPCRouter({
    getMany: protectedProcedure
        .input(z.object({
            limit: z.number().min(1).max(50).default(10),
            cursor: z.string().nullish(), // for infinite query if needed later, simplistic for now
        }))
        .query(async ({ ctx, input }) => {
            const { limit } = input;

            const data = await db
                .select()
                .from(notifications)
                .where(eq(notifications.userId, ctx.auth.user.id))
                .orderBy(desc(notifications.createdAt))
                .limit(limit);

            return data;
        }),

    getUnreadCount: protectedProcedure
        .query(async ({ ctx }) => {
            const [result] = await db
                .select({ count: count() })
                .from(notifications)
                .where(
                    and(
                        eq(notifications.userId, ctx.auth.user.id),
                        eq(notifications.read, false)
                    )
                );
            return result.count;
        }),

    markAsRead: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [updated] = await db
                .update(notifications)
                .set({ read: true })
                .where(
                    and(
                        eq(notifications.id, input.id),
                        eq(notifications.userId, ctx.auth.user.id)
                    )
                )
                .returning();

            if (!updated) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Notification not found" });
            }
            return updated;
        }),

    markAllAsRead: protectedProcedure
        .mutation(async ({ ctx }) => {
            await db
                .update(notifications)
                .set({ read: true })
                .where(eq(notifications.userId, ctx.auth.user.id));
            return { success: true };
        }),
});
