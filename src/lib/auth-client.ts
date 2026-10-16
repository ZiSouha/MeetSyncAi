import { createAuthClient } from "better-auth/react";

const getClientBaseURL = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://meetsync-eta.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getClientBaseURL()
});