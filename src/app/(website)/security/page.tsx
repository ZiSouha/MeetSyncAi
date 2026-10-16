import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Lock, FileKey, Server, Eye, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400 mb-8">
                        <Shield className="size-3.5 text-primary" />
                        <span>Trust & Compliance</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Changes you can <br />
                        <span className="text-primary text-glow">verify.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed font-light">
                        Security is the foundation of our platform. We exceed industry standards to ensure your conversations remain private and protected.
                    </p>
                </div>

                {/* Main Compliance Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <div className="p-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[80px] group-hover:bg-primary/10 transition-colors" />
                        <div className="relative z-10">
                            <div className="size-16 rounded-2xl bg-zinc-800/50 border border-white/10 flex items-center justify-center mb-8">
                                <Shield className="size-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">SOC 2 Type II Certified</h3>
                            <p className="text-zinc-400 leading-relaxed mb-8">
                                We undergo rigorous annual audits by independent third-party firms to verify our security controls, availability, and confidentiality protocols.
                            </p>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                Request Report
                            </Button>
                        </div>
                    </div>
                    <div className="p-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
                        <div className="relative z-10">
                            <div className="size-16 rounded-2xl bg-zinc-800/50 border border-white/10 flex items-center justify-center mb-8">
                                <Lock className="size-8 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">GDPR & CCPA Ready</h3>
                            <p className="text-zinc-400 leading-relaxed mb-8">
                                Our data processing infrastructure is built with privacy-first principles, ensuring full compliance with European and Californian data protection regulations.
                            </p>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                View Data Policy
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Security Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-24">
                    {[
                        {
                            icon: FileKey,
                            title: "AES-256 Encryption",
                            desc: "All data is encrypted at rest using AES-256 and in transit via TLS 1.3 standards."
                        },
                        {
                            icon: Server,
                            title: "Isolated Infrastructure",
                            desc: "Customer data is logically separated in our multi-tenant database environment."
                        },
                        {
                            icon: Eye,
                            title: "Zero Data Training",
                            desc: "We strictly do not use your private meeting data to train our public AI models."
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                            <item.icon className="size-8 text-zinc-500 mb-6" />
                            <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                            <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Sub-processors List */}
                <div className="border border-white/10 rounded-3xl overflow-hidden bg-zinc-900/50">
                    <div className="p-8 border-b border-white/10">
                        <h3 className="text-xl font-semibold text-white">Trust Center</h3>
                    </div>
                    <div className="p-8">
                        <ul className="space-y-4">
                            {[
                                "Regular penetration testing by top-tier security firms",
                                "Vulnerability disclosure program (Bug Bounty)",
                                "Mandatory 2FA/MFA for all employee access",
                                "Background checks for all engineering staff",
                                "Automated static code analysis and dependency scanning"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-zinc-400">
                                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
