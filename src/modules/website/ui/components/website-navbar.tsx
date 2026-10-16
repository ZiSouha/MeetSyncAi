"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MeetSyncLogo } from "./meetsync-logo";

import { authClient } from "@/lib/auth-client";

export const WebsiteNavbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        {
            name: "Product",
            dropdown: [
                { name: "Features", href: "/#features" },
                { name: "Integrations", href: "/integrations" },
                { name: "Security", href: "/security" },
                { name: "Enterprise", href: "/enterprise" },
            ]
        },
        {
            name: "Solutions",
            dropdown: [
                { name: "Sales Teams", href: "/solutions/sales" },
                { name: "Customer Success", href: "/solutions/customer-success" },
                { name: "Product Teams", href: "/solutions/product" },
                { name: "Engineering", href: "/solutions/engineering" },
            ]
        },
        {
            name: "Resources",
            dropdown: [
                { name: "Documentation", href: "/docs" },
                { name: "API Reference", href: "/api" },
                { name: "Blog", href: "/blog" },
                { name: "Case Studies", href: "/case-studies" },
            ]
        },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b",
                isScrolled
                    ? "bg-[#0A0A0B]/60 backdrop-blur-md border-white/5 py-4 supports-[backdrop-filter]:bg-[#0A0A0B]/40"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6">
                <nav className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="relative z-10">
                        <MeetSyncLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div
                        className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-md"
                        suppressHydrationWarning
                    >
                        {navItems.map((item) => (
                            item.dropdown ? (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => setActiveDropdown(item.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className={cn(
                                        "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all rounded-full",
                                        activeDropdown === item.name || pathname.startsWith(item.href || 'X')
                                            ? "text-white bg-white/10"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}>
                                        {item.name}
                                        <ChevronDown className={cn(
                                            "size-3.5 transition-transform duration-300",
                                            activeDropdown === item.name && "rotate-180"
                                        )} />
                                    </button>

                                    <AnimatePresence>
                                        {activeDropdown === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 z-50"
                                            >
                                                <div className="rounded-2xl bg-[#0A0A0B]/95 backdrop-blur-3xl border border-white/10 p-2 shadow-2xl ring-1 ring-black/50">
                                                    <div className="space-y-1">
                                                        {item.dropdown.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                                                            >
                                                                <div className="size-1.5 rounded-full bg-zinc-700 group-hover:bg-primary transition-colors" />
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href!}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium transition-all rounded-full",
                                        pathname === item.href
                                            ? "text-white bg-white/10"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        {!mounted || isPending ? (
                            <div className="h-10 w-32 bg-white/5 rounded-full animate-pulse" />
                        ) : session ? (
                            <Link href="/dashboard">
                                <Button className="h-10 px-6 rounded-full text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/sign-in" data-testid="navbar-signin-link">
                                    <span className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                                        Sign In
                                    </span>
                                </Link>
                                <Link href="/sign-up">
                                    <Button className="h-10 px-6 rounded-full text-sm font-semibold bg-primary hover:bg-primary/90 text-zinc-950 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden relative flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 text-zinc-400 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={cn(
                            "w-6 h-0.5 bg-current rounded-full transition-all duration-300",
                            isMobileMenuOpen && "rotate-45 translate-y-2 absolute"
                        )} />
                        <span className={cn(
                            "w-6 h-0.5 bg-current rounded-full transition-all duration-300",
                            isMobileMenuOpen && "opacity-0"
                        )} />
                        <span className={cn(
                            "w-6 h-0.5 bg-current rounded-full transition-all duration-300",
                            isMobileMenuOpen && "-rotate-45 -translate-y-2 absolute"
                        )} />
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mounted && isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100dvh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden fixed inset-0 top-[70px] bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 overflow-y-auto z-40 pb-20"
                    >
                        <div className="container mx-auto px-6 py-8 space-y-6">
                            {navItems.map((item) => (
                                <div key={item.name} className="space-y-4">
                                    {item.dropdown ? (
                                        <>
                                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-2">{item.name}</div>
                                            <div className="grid gap-2">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="block px-4 py-3 text-lg font-medium text-zinc-300 active:text-white active:bg-white/10 rounded-xl transition-all border border-transparent active:border-white/10"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-2 text-2xl font-semibold text-white"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            <div className="pt-8 border-t border-white/10 space-y-4">
                                {!session ? (
                                    <>
                                        <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="outline" className="w-full h-14 rounded-2xl text-base font-semibold border-white/10 text-white hover:bg-white/5">
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full h-14 rounded-2xl text-base font-semibold bg-primary text-zinc-950 shadow-xl shadow-primary/20">
                                                Get Started
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full h-14 rounded-2xl text-base font-semibold bg-white text-zinc-950">
                                            Dashboard
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
