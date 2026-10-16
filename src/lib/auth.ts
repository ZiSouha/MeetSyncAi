import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema"

const isOAuthValid = (id?: string, secret?: string) => {
    return Boolean(
        id && 
        secret && 
        !id.includes("your_") && 
        !secret.includes("your_") && 
        id !== "undefined" && 
        secret !== "undefined"
    );
};

const getBaseURL = () => {
    const url = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
    if (url) {
        return url.startsWith("http") ? url : `https://${url}`;
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
};

const getAuthSecret = () => {
    const secret = process.env.BETTER_AUTH_SECRET;
    if (!secret && process.env.NODE_ENV === "production") {
        throw new Error("BETTER_AUTH_SECRET environment variable is required in production.");
    }
    return secret || "dev-only-secret-key-for-local-testing-only-32-chars";
};

export const auth = betterAuth({
    baseURL: getBaseURL(),
    secret: getAuthSecret(),
    trustedOrigins: [
        "https://meetsync-eta.vercel.app",
        ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
        ...(process.env.VERCEL_PROJECT_PRODUCTION_URL ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`] : []),
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003",
        "http://127.0.0.1:3004",
        "http://127.0.0.1:3005",
        ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
        ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
        ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",") : []),
    ],
    socialProviders: {
        ...(isOAuthValid(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET) ? {
            github: { 
                clientId: process.env.GITHUB_CLIENT_ID!, 
                clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
            },
        } : {}),
        ...(isOAuthValid(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET) ? {
            google: { 
                clientId: process.env.GOOGLE_CLIENT_ID!, 
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
            },
        } : {}),
    },
    emailAndPassword: { 
        enabled: true, 
    }, 
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema: {
            ...schema,
        }
    }),
});

