import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";
import { MeetingStatus } from "../types";
import { streamVideo } from "@/lib/stream-video";
import { generateAvatarUri } from "@/lib/avatar";



export const meetingsRouter = createTRPCRouter({
    generateToken: protectedProcedure.mutation(async ({ ctx }) => {
        try {
            await streamVideo.upsertUsers([
                {
                    id: ctx.auth.user.id,
                    name: ctx.auth.user.name,
                    role: "admin",
                    image:
                        ctx.auth.user.image ??
                        generateAvatarUri({ seed: ctx.auth.user.name, variant: "initials" }),
                },
            ]);

            const expirationTime = Math.floor(Date.now() / 1000) + 3600;
            const issuedAt = Math.floor(Date.now() / 1000) - 60;

            return streamVideo.generateUserToken({
                user_id: ctx.auth.user.id,
                exp: expirationTime,
                validity_in_seconds: issuedAt,
            });
        } catch (err: any) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Stream Video is not configured. Please add your Stream API keys to .env (get them free at https://getstream.io/dashboard/)."
            });
        }
    }),

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [removedMeeting] = await db
                .delete(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id),
                    )
                )
                .returning();
            if (!removedMeeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found"
                });
            }

            return removedMeeting;
        }),



    update: protectedProcedure
        .input(meetingsUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const [updatedMeeting] = await db
                .update(meetings)
                .set(input)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id),
                    )
                )
                .returning();
            if (!updatedMeeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found"
                });
            }

            return updatedMeeting;
        }),


    create: protectedProcedure
        .input(meetingsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db
                .insert(meetings)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            // TODO: Create Stream Call, Upsert Stream Users
            const call = streamVideo.video.call("default", createdMeeting.id);
            await call.create({
                data: {
                    created_by_id: ctx.auth.user.id,
                    custom: {
                        meetingId: createdMeeting.id,
                        meetingName: createdMeeting.name
                    },
                    settings_override: {
                        transcription: {
                            language: "en",
                            mode: "auto-on",
                            closed_caption_mode: "auto-on",
                        },
                        recording: {
                            mode: "auto-on",
                            quality: "1080p",
                        },
                    },
                },
            });

            const [existingAgent] = await db
                .select()
                .from(agents)
                .where(eq(agents.id, createdMeeting.agentId));

            if (!existingAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found"
                })
            }

            await streamVideo.upsertUsers([
                {
                    id: existingAgent.id,
                    name: existingAgent.name,
                    role: "user",
                    image: generateAvatarUri({
                        seed: existingAgent.name,
                        variant: "botttsNeutral",
                    }),
                },
            ]);
            return createdMeeting;
        }),
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const [existingMeeting] = await db
                .select({
                    ...getTableColumns(meetings),
                    agent: agents,
                    duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),
                })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id),
                    )
                );

            if (!existingMeeting) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" })
            }
            return existingMeeting;
        }),
    // TODO: Change `getMany` to use `protectedProcedure`
    getMany: protectedProcedure
        .input(z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z
                .number()
                .min(MIN_PAGE_SIZE)
                .max(MAX_PAGE_SIZE)
                .default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish(),
            agentId: z.string().nullish(),
            status: z
                .enum([
                    MeetingStatus.Upcoming,
                    MeetingStatus.Active,
                    MeetingStatus.Completed,
                    MeetingStatus.Processing,
                    MeetingStatus.Cancelled,
                ])
                .nullish(),
        })
        )
        .query(async ({ ctx, input }) => {
            const { search, page, pageSize, status, agentId } = input;
            const data = await db
                .select({
                    ...getTableColumns(meetings),
                    agent: agents,
                    duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),
                })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined,
                        status ? eq(meetings.status, status) : undefined,
                        agentId ? eq(meetings.agentId, agentId) : undefined,
                    )
                )
                .orderBy(desc(meetings.createdAt), desc(meetings.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize)

            const [total] = await db
                .select({ count: count() })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined,
                        status ? eq(meetings.status, status) : undefined,
                        agentId ? eq(meetings.agentId, agentId) : undefined,
                    )
                );

            const totalPages = Math.ceil(total.count / pageSize);

            return {
                items: data,
                total: total.count,
                totalPages
            }
        }),

    joinAgent: protectedProcedure
        .input(z.object({ meetingId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const [existingMeeting] = await db
                .select()
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id, input.meetingId),
                        eq(meetings.userId, ctx.auth.user.id),
                    )
                );

            if (!existingMeeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Meeting not found"
                });
            }

            const [existingAgent] = await db
                .select()
                .from(agents)
                .where(eq(agents.id, existingMeeting.agentId));

            if (!existingAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found"
                });
            }

            // Update meeting status to active if it's not already
            if (existingMeeting.status === "upcoming") {
                await db
                    .update(meetings)
                    .set({
                        status: "active",
                        startedAt: new Date(),
                    })
                    .where(eq(meetings.id, existingMeeting.id));
            }

            const call = streamVideo.video.call("default", existingMeeting.id);
            const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || "";
            
            try {
                // Only try to connect OpenAI if it's actually an OpenAI key (starts with sk-)
                if (apiKey.startsWith("sk-")) {
                    const realtimeClient = await streamVideo.video.connectOpenAi({
                        call,
                        openAiApiKey: apiKey,
                        agentUserId: existingAgent.id,
                    });

                    realtimeClient.updateSession({
                        instructions: existingAgent.instructions,
                    });
                } else if (apiKey.startsWith("AIza")) {
                    console.log("Gemini key detected. Joining as a silent participant for now.");
                    // For now, we just ensure the agent is a member of the call
                    // In a future update, we can add Gemini-specific voice/text logic here
                    await call.updateCallMembers({
                        update_members: [{ user_id: existingAgent.id, role: "user" }]
                    });
                } else {
                    console.warn("No valid AI key detected (OpenAI or Gemini).");
                }

                return { success: true };
            } catch (error) {
                console.error("Failed to connect AI agent to the meeting:", error);
                
                if (error instanceof Error) {
                    console.error("Error message:", error.message);
                    console.error("Error stack:", error.stack);
                }

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to connect AI agent to the meeting. Please check your API keys."
                });
            }
        }),
});