import { Button } from "@/components/ui/button";
import { Check, Loader2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PricingPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for individuals starting with meeting intelligence.",
            features: [
                "3 meetings per month",
                "Standard Transcription",
                "Basic AI Summaries",
                "7-day history retention",
                "Email support"
            ],
            cta: !!session ? "Current Plan" : "Get Started Free",
            popular: false,
            href: !!session ? "/dashboard" : "/sign-up"
        },
        {
            name: "Pro",
            price: "$19",
            description: "Advanced intelligence for professionals and small teams.",
            features: [
                "Unlimited meetings",
                "HD Transcription",
                "Custom AI Agents",
                "Unlimited history",
                "Priority support",
                "CRM Integrations"
            ],
            cta: !!session ? "Upgrade to Pro" : "Try Pro Free (14 Days)",
            popular: true,
            href: !!session ? "/dashboard?upgrade=pro" : "/sign-up?plan=pro"
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Security, control, and dedicated support for organizations.",
            features: [
                "SSO (SAML/Okta)",
                "Custom AI Models",
                "Dedicated Success Manager",
                "SLA Guarantees",
                "Audit Logs",
                "Private Cloud Deployment"
            ],
            cta: "Contact Sales",
            popular: false,
            href: "/contact-sales"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-400 mb-8">
                        <Zap className="size-3.5 text-primary" />
                        <span>Simple Pricing</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Intelligence <br />
                        <span className="text-primary text-glow">that pays for itself.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed font-light">
                        Choose the plan that fits your workflow. Start for free, upgrade as you scale.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-24 items-start">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative p-8 rounded-3xl border flex flex-col h-full bg-zinc-900/50 backdrop-blur-md transition-transform hover:-translate-y-2 duration-300 ${plan.popular ? 'border-primary/50 bg-zinc-900/80 shadow-[0_0_40px_-10px_rgba(34,197,94,0.2)]' : 'border-white/10'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-zinc-950 font-bold text-xs rounded-full uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-zinc-400 text-sm h-10">{plan.description}</p>
                            </div>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                                {plan.price !== "Custom" && <span className="text-zinc-500 font-medium">/month</span>}
                            </div>

                            <Link href={plan.href} className="mb-8">
                                <Button className={`w-full h-12 rounded-xl text-base font-semibold ${plan.popular ? 'bg-primary text-zinc-950 hover:bg-primary/90' : 'bg-white text-zinc-950 hover:bg-zinc-200'}`}>
                                    {plan.cta}
                                </Button>
                            </Link>

                            <div className="space-y-4 flex-grow">
                                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">What's included</p>
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <Check className="size-5 text-primary shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ or Trust Section */}
                <div className="grid md:grid-cols-2 gap-8 items-center bg-transparent border-t border-white/5 pt-20">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Frequently asked questions</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You'll keep access until the end of your billing period." },
                                { q: "Is my data secure?", a: "Absolutely. We are SOC 2 Type II compliant and data is encrypted at rest and in transit." },
                                { q: "Do you offer non-profit discounts?", a: "Yes! Contact our sales team with proof of your 501(c)(3) status for 50% off." }
                            ].map((faq, i) => (
                                <div key={i}>
                                    <h4 className="text-white font-medium mb-2">{faq.q}</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 relative overflow-hidden text-center">
                        <ShieldCheck className="size-12 text-primary mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Enterprise Ready</h3>
                        <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                            Need custom contracts, diligent security reviews, or volume discounts?
                        </p>
                        <Link href="/contact-sales">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                Talk to Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
