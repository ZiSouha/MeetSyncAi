import JSONL from "jsonl-parse-stringify";
import { inngest } from "@/inngest/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { db } from "@/db";
import { agents, meetings, user, billing, usageLogs } from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";

const SUMMARIZER_SYSTEM = `
You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z
`.trim();

const SENTIMENT_SYSTEM = "You are an expert sentiment analyzer. You will be given a transcript of a meeting and you need to analyze the sentiment of the meeting. Return a single integer from -100 to 100, where -100 is extremely negative, 0 is neutral, and 100 is extremely positive. Do not return any other text.";

export const meetingsProcessing = inngest.createFunction(
  { id: "meetings/processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.fetch(event.data.transcriptUrl);

    const transcript = await step.run("parse-transcript", async () => {
      const text = await response.text();
      return JSONL.parse<StreamTranscriptItem>(text);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((user) => ({
            ...user,
          }))
        );

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((agents) =>
          agents.map((agent) => ({
            ...agent,
          }))
        );

      const speakers = [...userSpeakers, ...agentSpeakers];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown",
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    const summaryOutput = await step.run("generate-summary", async () => {
      const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return "Summary generation unavailable: GEMINI_API_KEY is not configured in environment variables.";
      }
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SUMMARIZER_SYSTEM,
        });
        const result = await model.generateContent(
          "Summarize the following transcript: " + JSON.stringify(transcriptWithSpeakers)
        );
        return result.response.text();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Gemini summarizer error:", message);
        return "Unable to generate summary: " + message;
      }
    });

    const sentimentScore = await step.run("analyze-sentiment", async () => {
      const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
      if (!apiKey) return 0;
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SENTIMENT_SYSTEM,
        });
        const result = await model.generateContent(
          "Analyze the sentiment of the following transcript: " + JSON.stringify(transcriptWithSpeakers)
        );
        const score = parseInt(result.response.text().trim(), 10);
        return isNaN(score) ? 0 : score;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Gemini sentiment error:", message);
        return 0;
      }
    });

    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: summaryOutput,
          sentimentScore: sentimentScore,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });

    await step.run("deduct-credits", async () => {
      const [meeting] = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, event.data.meetingId));

      if (!meeting) return;

      const COST = 10;

      await db.insert(usageLogs).values({
        userId: meeting.userId,
        amount: -COST,
        description: "AI Agent Processing",
        type: "meeting_usage",
        resourceId: meeting.id,
      });

      await db
        .update(billing)
        .set({ credits: sql`${billing.credits} - ${COST}` })
        .where(eq(billing.userId, meeting.userId));
    });
  }
);