import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";

import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";
import { TopLoader } from "@/components/top-loader";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "MeetSync AI - Intelligent Meeting Infrastructure by Ziane Souhayl",
  description: "Join meetings with autonomous AI agents, get real-time transcripts, and AI-powered summaries. Architected and developed by Ziane Souhayl.",
  authors: [{ name: "Ziane Souhayl", url: "https://github.com/ZiSouha" }],
  creator: "Ziane Souhayl",
  publisher: "Ziane Souhayl",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allHeaders = await headers();
  const cookieHeader = allHeaders.get("cookie") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <TRPCReactProvider cookies={cookieHeader}>
            <Suspense>
              <TopLoader />
            </Suspense>
            <Toaster />
            {children}
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
