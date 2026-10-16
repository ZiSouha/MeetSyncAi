import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, ShieldCheck, Zap, Headphones, Gauge, Globe2, Fingerprint, Lock } from "lucide-react";

export default function EnterprisePage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400 mb-8">
                            <Building2 className="size-3.5 text-primary" />
                            <span>Enterprise Scale</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Powering the next <br />
                            <span className="text-primary text-glow">generation of work.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed font-light mb-8 max-w-xl">
                            Deploy MeetSync securely across your entire organization with dedicated support, advanced controls, and custom agreements.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact-sales">
                                <Button size="lg" className="h-14 px-8 rounded-xl text-zinc-950 font-bold bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                    Contact Sales
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-white border-white/10 hover:bg-white/5">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
                        <div className="relative p-8 rounded-3xl bg-zinc-950/50 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-3xl font-bold text-white mb-1">99.99%</div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Uptime SLA</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Dedicated Support</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-3xl font-bold text-white mb-1">Unltd</div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Meeting History</div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-3xl font-bold text-white mb-1">SOC 2</div>
                                    <div className="text-xs text-zinc-500 uppercase tracking-wide">Type II Certified</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Advanced Security",
                            desc: "SSO (Okta/SAML), audit logs, and domain capture for full control over your data."
                        },
                        {
                            icon: Headphones,
                            title: "White-glove Onboarding",
                            desc: "Dedicated success manager to help you implement MeetSync across your teams effectively."
                        },
                        {
                            icon: Gauge,
                            title: "Custom Limits",
                            desc: "Higher rate limits, longer retention policies, and custom AI model fine-tuning."
                        },
                        {
                            icon: Fingerprint,
                            title: "Role-Based Access",
                            desc: "Granular permission controls for admins, managers, and individual contributors."
                        },
                        {
                            icon: Globe2,
                            title: "Data Residency",
                            desc: "Choose where your data is stored (US, EU, or APAC) to meet compliance needs."
                        },
                        {
                            icon: Lock,
                            title: "Private Cloud",
                            desc: "Option for single-tenant deployment or VPC peering for maximum isolation."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                            <div className="size-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                <feature.icon className="size-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="text-center py-20 border-t border-white/5">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for scale.</h2>
                    <p className="text-zinc-400 mb-10 max-w-2xl mx-auto">
                        Talk to our team to find the right plan for your enterprise.
                    </p>
                    <Link href="/contact-sales">
                        <Button size="lg" className="h-14 px-10 rounded-xl text-base font-semibold bg-white text-zinc-950 hover:bg-zinc-200">
                            Get in touch
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
