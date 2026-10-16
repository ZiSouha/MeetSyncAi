import React from "react";

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    content: React.ReactNode;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "scaling-real-time-transcription",
        title: "Scaling real-time transcription to 1M+ concurrent streams",
        description: "A deep dive into our switch to Rust, implementing custom WebSocket handling, and optimizing for edge latency across the global neural mesh.",
        date: "January 24, 2026",
        category: "Engineering",
        readTime: "12 min read",
        image: "/images/blog/scaling.png",
        author: {
            name: "Ziane Souhayl",
            role: "Founder & Lead Architect",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ziane"
        },
        content: (
            <div className="space-y-8">
                <p className="text-xl leading-relaxed text-zinc-300">
                    The challenge of transcribing meetings in real-time isn't just about language models. At the scale of 1 million concurrent users, it becomes a massive networking and low-latency processing problem.
                </p>
                <h2 className="text-3xl font-bold text-white">The Rust Transition</h2>
                <p>
                    Previously, our transcription gateway was built with Node.js. While highly performant for many use cases, we hit a wall with garbage collection pauses and memory overhead at extreme throughput. Moving to Rust allowed us to achieve consistent sub-10ms processing times and reduced our compute costs by 40%.
                </p>
                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 italic text-primary font-medium">
                    "By leveraging Rust's zero-cost abstractions, we were able to process 3x the traffic on the same hardware footprints."
                </div>
                <h2 className="text-3xl font-bold text-white">Edge-First Architecture</h2>
                <p>
                    Distance is the enemy of real-time. We deployed our neural transcription nodes to 24 edge locations globally, ensuring that the 'hot path' of audio data never travels more than 500 miles from the speaker's machine.
                </p>
            </div>
        )
    },
    {
        slug: "introducing-neural-agents",
        title: "Introducing Neural Agents: The next evolution of meeting intelligence",
        description: "Why we are moving beyond simple summaries to proactive, context-aware agents that don't just watch meetings, but actively facilitate them.",
        date: "January 18, 2026",
        category: "Product",
        readTime: "8 min read",
        image: "/images/blog/neural.png",
        author: {
            name: "Ziane Souhayl",
            role: "Founder & Creator",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Souhayl"
        },
        content: (
            <div className="space-y-8">
                <p className="text-xl leading-relaxed text-zinc-300">
                    Most meeting recorders are passive observers. They sit in the corner, record what was said, and email you a summary 10 minutes later. That's not enough for the modern enterprise.
                </p>
                <h2 className="text-3xl font-bold text-white">Proactive Participation</h2>
                <p>
                    Neural Agents are designed to understand the intent of the conversation in real-time. If a team member mentions a blocker in a project mentioned in Linear, the agent will automatically surfaces the relevant ticket context in the chat panel.
                </p>
                <h2 className="text-3xl font-bold text-white">Contextual Memory</h2>
                <p>
                    Our agents don't start from zero every call. They recall the decisions made in previous syncs, the specific terminology your team uses, and the unspoken hierarchies of your organization.
                </p>
            </div>
        )
    },
    {
        slug: "privacy-by-design-in-ai",
        title: "Privacy by Design: Securing the future of confidential calls",
        description: "How we implemented a local-first encryption model that ensures even we can't listen to your recordings without your permission.",
        date: "January 12, 2026",
        category: "Security",
        readTime: "10 min read",
        image: "/images/blog/privacy.png",
        author: {
            name: "Marcus Thorne",
            role: "Security Principal",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
        },
        content: (
            <div className="space-y-8">
                <p className="text-xl leading-relaxed text-zinc-300">
                    AI intelligence should never come at the cost of corporate privacy. At MeetSync, we treat your meeting data as a sacred trust.
                </p>
                <h2 className="text-3xl font-bold text-white">Zero-Knowledge Indexing</h2>
                <p>
                    We've developed a custom indexing protocol that allows our LLMs to search and summarize fragments of data without the full decrypted transcript ever touching a persistent database disk.
                </p>
                <h2 className="text-3xl font-bold text-white">Local-First Encryption</h2>
                <p>
                    Every meeting is encrypted at the source using keys that your organization controls. We manage the infrastructure, but you own the locks.
                </p>
            </div>
        )
    },
    {
        slug: "the-future-of-teamwork",
        title: "The Future of Teamwork: Beyond the screen barriers",
        description: "Exploring how spatial intelligence and AI-driven facilitation will redefine what it means to 'be in a room' together.",
        date: "January 05, 2026",
        category: "Culture",
        readTime: "15 min read",
        image: "/images/blog/teamwork.png",
        author: {
            name: "Elena G.",
            role: "Chief People Officer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
        },
        content: (
            <div className="space-y-8">
                <p className="text-xl leading-relaxed text-zinc-300">
                    The video call was just step one. The next phase of remote collaboration is removing the screen as a barrier to deep connection.
                </p>
                <h2 className="text-3xl font-bold text-white">Spatial Intelligence</h2>
                <p>
                    Our upcoming integration with spatial audio and AR allows distributed teams to feel the presence of their peers, using directional audio and collaborative 'holographic' whiteboards.
                </p>
                <h2 className="text-3xl font-bold text-white">Human-First AI</h2>
                <p>
                    AI tech should fade into the background. It shouldn't be a tool you 'use', but a presence that facilitates smoother human-to-human interaction.
                </p>
            </div>
        )
    }
];
