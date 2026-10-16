
import { db } from "@/db";
import { billing, usageLogs } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const billingRouter = createTRPCRouter({
    getBalance: protectedProcedure
        .query(async ({ ctx }) => {
            const [balance] = await db
                .select()
                .from(billing)
                .where(eq(billing.userId, ctx.auth.user.id));

            // Auto-create billing record if missing
            if (!balance) {
                const [newBalance] = await db
                    .insert(billing)
                    .values({
                        userId: ctx.auth.user.id,
                        credits: 100, // Welcome bonus
                        plan: "free"
                    })
                    .returning();

                await db.insert(usageLogs).values({
                    userId: ctx.auth.user.id,
                    amount: 100,
                    description: "Welcome Credits",
                    type: "bonus"
                });

                return newBalance;
            }

            return balance;
        }),

    getUsageHistory: protectedProcedure
        .input(z.object({ limit: z.number().default(10) }))
        .query(async ({ ctx, input }) => {
            return await db
                .select()
                .from(usageLogs)
                .where(eq(usageLogs.userId, ctx.auth.user.id))
                .orderBy(desc(usageLogs.createdAt))
                .limit(input.limit);
        }),

    purchaseCredits: protectedProcedure
        .input(z.object({ amount: z.number().min(10) }))
        .mutation(async ({ ctx, input }) => {
            // Mock payment processing success
            // In real app, this would verify Stripe session

            await db
                .insert(usageLogs)
                .values({
                    userId: ctx.auth.user.id,
                    amount: input.amount,
                    description: `Purchased ${input.amount} Credits`,
                    type: "credit_purchase"
                });

            // Update balance (Drizzle atomic update not easy directly without sql operator, fetching first for simplicity)
            const [current] = await db.select().from(billing).where(eq(billing.userId, ctx.auth.user.id));

            if (current) {
                await db.update(billing)
                    .set({ credits: current.credits + input.amount })
                    .where(eq(billing.userId, ctx.auth.user.id));
            } else {
                await db.insert(billing).values({
                    userId: ctx.auth.user.id,
                    credits: input.amount + 100, // + welcome
                });
            }

            return { success: true, newBalance: (current?.credits || 0) + input.amount };
        })
});
