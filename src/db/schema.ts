import { pgTable, text, timestamp, boolean, pgEnum, index, integer } from "drizzle-orm/pg-core";

import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";


export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});


export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});


export const agents = pgTable("agents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  instructions: text("instructions").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  index("agents_user_id_idx").on(table.userId),
]);

export const agentsRelations = relations(agents, ({ many }) => ({
  meetings: many(meetings),
}));

export const meetingStatus = pgEnum("meeting_status", [
  "upcoming",
  "active",
  "completed",
  "processing",
  "cancelled"
]);


export const meetings = pgTable("meetings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  agentId: text("agent_id")
    .notNull()
    .references(() => agents.id, { onDelete: "cascade" }),
  status: meetingStatus("status").notNull().default("upcoming"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  transcriptUrl: text("transcript_at"),
  recordingUrl: text("recording_url"),
  summary: text("summary"),
  sentimentScore: integer("sentiment_score").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  index("meetings_user_id_idx").on(table.userId),
  index("meetings_agent_id_idx").on(table.agentId),
]);

export const meetingsRelations = relations(meetings, ({ one }) => ({
  agent: one(agents, {
    fields: [meetings.agentId],
    references: [agents.id],
  }),
}));

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  message: text("message"),
  type: text("type").notNull(), // meeting_ready, transcript_available, etc.
  read: boolean("read").default(false).notNull(),
  resourceId: text("resource_id"), // Optional link to meeting/agent ID
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  index("notifications_user_id_idx").on(table.userId),
]);

export const integrations = pgTable("integrations", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(), // 'google_calendar', 'outlook'
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  index("integrations_user_id_idx").on(table.userId),
]);

export const calendarEvents = pgTable("calendar_events", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  integrationId: text("integration_id").references(() => integrations.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  meetLink: text("meet_link"),
  externalId: text("external_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  index("calendar_events_user_id_idx").on(table.userId),
  index("calendar_events_start_time_idx").on(table.startTime),
]);

export const billing = pgTable("billing", {
  userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  credits: integer("credits").notNull().default(0),
  plan: text("plan").notNull().default("free"), // 'free', 'pro', 'enterprise'
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const usageLogs = pgTable("usage_logs", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // + for purchase, - for usage
  description: text("description").notNull(),
  type: text("type").notNull(), // 'credit_purchase', 'meeting_usage', 'bonus'
  resourceId: text("resource_id"), // link to meetingId if usage
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("usage_logs_user_id_idx").on(table.userId),
]);
