import { z } from "zod";


export const meetingsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    agentId: z.string().min(1, { message: "Agent are required" }),
})

export const meetingsUpdateSchema = meetingsInsertSchema.partial().extend({
    id: z.string().min(1, { message: "Id is required" }),
    status: z.enum(["upcoming", "active", "completed", "processing", "cancelled"]).optional(),
})

