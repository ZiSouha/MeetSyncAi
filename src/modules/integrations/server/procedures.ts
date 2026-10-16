
import { db } from "@/db";
import { integrations, calendarEvents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, gte, asc } from "drizzle-orm";
import { z } from "zod";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations/callback`;

export const integrationsRouter = createTRPCRouter({
    getAuthUrl: protectedProcedure
        .query(() => {
            const params = new URLSearchParams({
                client_id: GOOGLE_CLIENT_ID,
                redirect_uri: REDIRECT_URI,
                response_type: "code",
                scope: "https://www.googleapis.com/auth/calendar.readonly",
                access_type: "offline",
                prompt: "consent",
            });
            return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        }),

    connect: protectedProcedure
        .input(z.object({ code: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // Exchange code for tokens
            const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    code: input.code,
                    client_id: GOOGLE_CLIENT_ID,
                    client_secret: GOOGLE_CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                    grant_type: "authorization_code",
                }),
            });

            const tokens = await tokenResponse.json();

            if (!tokenResponse.ok) {
                console.error("Google Token Error", tokens);
                throw new TRPCError({ code: "BAD_REQUEST", message: "Failed to connect to Google" });
            }

            // Save integration
            const [integration] = await db
                .insert(integrations)
                .values({
                    userId: ctx.auth.user.id,
                    provider: "google_calendar",
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token, // Only returned on first consent or forced prompt
                    expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
                })
                .returning();

            // Trigger initial sync (could be bg job, but we'll await for simplicity here or fire & forget)
            // await syncCalendar(integration.id, tokens.access_token);

            return integration;
        }),

    disconnect: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await db.delete(integrations).where(and(eq(integrations.id, input.id), eq(integrations.userId, ctx.auth.user.id)));
            return { success: true };
        }),

    list: protectedProcedure
        .query(async ({ ctx }) => {
            return await db.select().from(integrations).where(eq(integrations.userId, ctx.auth.user.id));
        }),

    getUpcomingEvents: protectedProcedure
        .query(async ({ ctx }) => {
            const now = new Date();
            // Simple logic: get events starting in the future
            return await db
                .select()
                .from(calendarEvents)
                .where(
                    and(
                        eq(calendarEvents.userId, ctx.auth.user.id),
                        gte(calendarEvents.startTime, now)
                    )
                )
                .orderBy(asc(calendarEvents.startTime))
                .limit(5);
        }),

    sync: protectedProcedure
        .input(z.object({ integrationId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [integration] = await db
                .select()
                .from(integrations)
                .where(and(eq(integrations.id, input.integrationId), eq(integrations.userId, ctx.auth.user.id)));

            if (!integration || !integration.accessToken) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Integration not found" });
            }

            // Fetch from Google
            const eventsResponse = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=" + new Date().toISOString() + "&maxResults=10&singleEvents=true&orderBy=startTime", {
                headers: { Authorization: `Bearer ${integration.accessToken}` }
            });

            if (!eventsResponse.ok) {
                // TODO: Handle refresh token logic if 401
                throw new TRPCError({ code: "BAD_REQUEST", message: "Failed to fetch events" });
            }

            const data = await eventsResponse.json();

            // Save events
            if (data.items) {
                for (const event of data.items) {
                    if (!event.start?.dateTime) continue; // Skip all-day events for now if needed

                    const start = new Date(event.start.dateTime);
                    const end = new Date(event.end.dateTime);

                    // Upsert logic (simplistic: delete existing by externalId? or just insert ignores)
                    // Let's check existence
                    const [existing] = await db.select().from(calendarEvents).where(and(eq(calendarEvents.externalId, event.id), eq(calendarEvents.integrationId, integration.id)));

                    if (existing) {
                        await db.update(calendarEvents).set({
                            title: event.summary || "Untitled",
                            startTime: start,
                            endTime: end,
                            meetLink: event.htmlLink
                        }).where(eq(calendarEvents.id, existing.id));
                    } else {
                        await db.insert(calendarEvents).values({
                            userId: ctx.auth.user.id,
                            integrationId: integration.id,
                            externalId: event.id,
                            title: event.summary || "Untitled",
                            startTime: start,
                            endTime: end,
                            meetLink: event.htmlLink
                        });
                    }
                }
            }

            return { success: true, count: data.items?.length };
        })

});
