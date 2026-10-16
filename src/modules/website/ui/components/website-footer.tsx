"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MeetSyncLogo } from "./meetsync-logo";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

export const WebsiteFooter = () => {
    const pathname = usePathname();

    const footerLinks = {
        product: [
            { name: "Features", href: "/features" },
            { name: "Integrations", href: "/integrations" },
            { name: "Security", href: "/security" },
            { name: "Changelog", href: "/changelog" },
            { name: "Pricing", href: "/pricing" },
        ],
        company: [
            { name: "About", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/contact" },
        ],
        resources: [
            { name: "Documentation", href: "/docs" },
            { name: "API Reference", href: "/api" },
            { name: "Community", href: "/community" },
            { name: "Help Center", href: "/help" },
        ],
        legal: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "DPA", href: "/dpa" },
        ]
    };

    return (
        <footer className="bg-transparent border-t border-white/5 pt-24 pb-12 relative z-20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-20">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="mb-6 inline-block">
                            <MeetSyncLogo size="sm" />
                        </Link>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-4 max-w-sm">
                            The intelligent layer for your meeting infrastructure. Secure, accurate, and autonomous.
                        </p>
                        
                        {/* Creator attribution badge */}
                        <div className="mb-6 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 max-w-sm">
                            <div className="text-[11px] font-medium uppercase tracking-wider text-primary mb-1">
                                Creator & Architect
                            </div>
                            <div className="text-sm font-semibold text-white">
                                Ziane Souhayl
                            </div>
                            <a 
                                href="mailto:zianesouhayl@gmail.com"
                                className="text-xs text-zinc-400 hover:text-primary transition-colors flex items-center gap-1.5 mt-1"
                            >
                                <FaEnvelope className="size-3 text-primary" />
                                zianesouhayl@gmail.com
                            </a>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                            <span className="text-xs font-medium text-emerald-500">All systems operational</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-zinc-100 font-semibold mb-6">Product</h4>
                        <ul className="space-y-3.5 text-sm">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className={cn(
                                            "transition-colors",
                                            pathname === link.href 
                                                ? "text-white font-medium" 
                                                : "text-zinc-500 hover:text-primary"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-zinc-100 font-semibold mb-6">Company</h4>
                        <ul className="space-y-3.5 text-sm">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className={cn(
                                            "transition-colors",
                                            pathname === link.href 
                                                ? "text-white font-medium" 
                                                : "text-zinc-500 hover:text-primary"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-zinc-100 font-semibold mb-6">Resources</h4>
                        <ul className="space-y-3.5 text-sm">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className={cn(
                                            "transition-colors",
                                            pathname === link.href 
                                                ? "text-white font-medium" 
                                                : "text-zinc-500 hover:text-primary"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-zinc-100 font-semibold mb-6">Legal</h4>
                        <ul className="space-y-3.5 text-sm">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className={cn(
                                            "transition-colors",
                                            pathname === link.href 
                                                ? "text-white font-medium" 
                                                : "text-zinc-500 hover:text-primary"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-500 text-xs">
                        © 2026 MeetSync AI. Created & developed by{" "}
                        <a 
                            href="https://github.com/ZiSouha" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary font-medium transition-colors underline decoration-white/20 underline-offset-4"
                        >
                            Ziane Souhayl
                        </a>
                        . All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <a 
                            href="https://github.com/ZiSouha" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="GitHub - Ziane Souhayl"
                            title="GitHub - Ziane Souhayl"
                            className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                        >
                            <FaGithub className="size-4" />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/ziane-souhayl" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="LinkedIn - Ziane Souhayl"
                            title="LinkedIn - Ziane Souhayl"
                            className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                        >
                            <FaLinkedin className="size-4" />
                        </a>
                        <a 
                            href="mailto:zianesouhayl@gmail.com" 
                            aria-label="Email - Ziane Souhayl"
                            title="Email: zianesouhayl@gmail.com"
                            className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                        >
                            <FaEnvelope className="size-4" />
                        </a>
                        <Link 
                            href="/dashboard"
                            aria-label="Twitter / X - Dashboard"
                            title="Twitter (Takes you to Dashboard)"
                            className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                        >
                            <FaTwitter className="size-3.5" />
                        </Link>
                        <Link 
                            href="/dashboard"
                            aria-label="Instagram - Dashboard"
                            title="Instagram (Takes you to Dashboard)"
                            className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                        >
                            <FaInstagram className="size-3.5" />
                        </Link>
                        <Link 
                            href="/dashboard"
                            aria-label="Facebook - Dashboard"
                            title="Facebook (Takes you to Dashboard)"
                            className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
                        >
                            <FaFacebook className="size-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
