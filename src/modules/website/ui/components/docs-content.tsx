import { Book, Compass, Cpu, Database, Layout, Terminal, Video, Zap } from "lucide-react";
import React from "react";

export const DOCS_SECTIONS = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", slug: "introduction", icon: Book },
            { title: "Quickstart Guide", slug: "quickstart", icon: Zap },
            { title: "Installation", slug: "installation", icon: Terminal },
        ]
    },
    {
        title: "Core Concepts",
        items: [
            { title: "Workspaces", slug: "workspaces", icon: Layout },
            { title: "Meeting Bots", slug: "meeting-bots", icon: Cpu },
            { title: "Transcripts", slug: "transcripts", icon: Book },
            { title: "Analytics", slug: "analytics", icon: Database },
        ]
    }
];

export const DOCS_CONTENT: Record<string, { title: string; content: React.ReactNode }> = {
    introduction: {
        title: "Introduction",
        content: (
            <div className="space-y-6">
                <p>Welcome to MeetSync. Our platform is designed to help you capture, analyze, and act on your meeting data using state-of-the-art AI.</p>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                    <h4 className="text-primary font-bold mb-2">Our Goal</h4>
                    <p className="text-sm text-zinc-400">To make meetings a source of truth, not a source of frustration. We provide the intelligence layer for every conversation.</p>
                </div>
            </div>
        )
    },
    quickstart: {
        title: "Quickstart Guide",
        content: (
            <div className="space-y-6">
                <p>Follow these steps to record your first meeting in under 5 minutes.</p>
                <div className="space-y-4">
                    {[
                        "Create an account and sign in.",
                        "Integrate your Google or Outlook Calendar.",
                        "Select a meeting and click 'Deploy Agent'.",
                        "View your summary in the Intelligence Hub after the call."
                    ].map((step, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="size-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-zinc-950">{i + 1}</div>
                            <p className="text-sm text-zinc-300">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    installation: {
        title: "Installation",
        content: (
            <div className="space-y-6">
                <p>MeetSync is a cloud-based platform. There is no heavy desktop software to install.</p>
                <h3 className="text-xl font-bold text-white">Browser Extension</h3>
                <p>For the best experience in Google Meet and Zoom Web, we recommend our Chrome Extension.</p>
                <div className="p-4 rounded-xl bg-zinc-900 font-mono text-xs text-primary border border-white/5">
                    $ npm install @meetsync/cli -g
                </div>
            </div>
        )
    },
    workspaces: {
        title: "Workspaces",
        content: (
            <div className="space-y-6">
                <p>Workspaces are your team's command center. You can manage members, integrations, and compliance settings here.</p>
                <h3 className="text-xl font-bold text-white">Isolation</h3>
                <p>Each workspace is logically isolated. Data from Workspace A never bleeds into Workspace B.</p>
            </div>
        )
    },
    "meeting-bots": {
        title: "Meeting Bots",
        content: (
            <div className="space-y-6">
                <p>Our bots are autonomous agents that join your calls as participants. They are nearly invisible and incredibly smart.</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="font-bold text-white mb-2">Passive Mode</h4>
                        <p className="text-xs text-zinc-500">Only records and transcribes. No interaction.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <h4 className="font-bold text-primary mb-2">Active Mode</h4>
                        <p className="text-xs text-zinc-500">Can answer questions during the call.</p>
                    </div>
                </div>
            </div>
        )
    },
    transcripts: {
        title: "Transcripts",
        content: (
            <div className="space-y-6">
                <p>Every word spoken is captured with 99.2% accuracy. We support over 40 languages and automatic speaker diarization.</p>
                <div className="p-4 rounded-[1.5rem] bg-zinc-900 border border-white/5 italic text-zinc-500 text-sm">
                    "MeetSync has identified Sarah as the speaker for the last 4 minutes regarding the budget reallocation."
                </div>
            </div>
        )
    },
    analytics: {
        title: "Analytics",
        content: (
            <div className="space-y-6">
                <p>Turn conversation data into metrics. Track meeting ROI, sentiment drift, and talk-to-listen ratios across your team.</p>
                <ul className="list-disc pl-5 text-zinc-400 space-y-2">
                    <li>Sentiment Trends over 30 days.</li>
                    <li>Keyword density and focus topics.</li>
                    <li>Department-level engagement metrics.</li>
                </ul>
            </div>
        )
    }
};
