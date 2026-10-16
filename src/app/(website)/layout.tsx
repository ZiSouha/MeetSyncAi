"use client";

import { WebsiteNavbar } from "@/modules/website/ui/components/website-navbar";
import { WebsiteFooter } from "@/modules/website/ui/components/website-footer";
import { SmoothScroll } from "@/modules/website/ui/components/smooth-scroll";
import { MarketingBackground } from "@/modules/website/ui/components/marketing-background";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

const LayoutContent = ({ children }: Props) => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div
            className="flex flex-col min-h-screen relative"
            suppressHydrationWarning
        >
            <MarketingBackground />
            <WebsiteNavbar />
            <main className="flex-grow">
                {children}
            </main>
            <WebsiteFooter />
        </div>
    );
};

const Layout = ({ children }: Props) => {
    return (
        <SmoothScroll>
            <LayoutContent>{children}</LayoutContent>
            {/* Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('/noise.svg')]" />
            </div>
        </SmoothScroll>
    );
};

export default Layout;
