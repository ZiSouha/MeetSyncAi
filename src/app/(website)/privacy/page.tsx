import { Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400 mb-8">
                        <Shield className="size-3.5 text-primary" />
                        <span>Privacy Policy</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Your data, <span className="text-primary">delivered with integrity.</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">Last updated: April 18, 2026</p>
                </div>

                <div className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Data Ownership</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            At MeetSync, we believe you own your meeting data. We do not sell your data to third parties, and we do not use your recordings or transcripts to train our models without your explicit, opt-in consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Collection of Information</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We collect information necessary to provide and improve our services, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                            <li>Account information (Name, Email, Workspace details)</li>
                            <li>Meeting artifacts (Audio recordings, generated transcripts)</li>
                            <li>Integration metadata (connected Jira/Slack/CRM credentials)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Data is encrypted at rest (AES-256) and in transit (TLS 1.3). We conduct regular penetration tests and maintain SOC 2 Type II compliance to ensure your information remains protected against unauthorized access.
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Questions about privacy?</h3>
                        <p className="text-zinc-400 mb-6">Our dedicated privacy team is ready to help you understand how we handle your data.</p>
                        <a href="mailto:privacy@meetsync.com" className="text-primary hover:underline font-medium">privacy@meetsync.com</a>
                    </section>
                </div>
            </div>
        </div>
    );
}
