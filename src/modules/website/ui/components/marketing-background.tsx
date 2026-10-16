"use client";

export const MarketingBackground = () => {
    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            suppressHydrationWarning
        >
            {/* Deep Radial Base - breaks the flat blackness */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#18181b_0%,_#000000_100%)]" />

            {/* Grid Overlay - slightly more visible*/}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Primary Top Glow - Green/Emerald */}
            <div className="absolute -top-[10%] left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[4000ms]" />

            {/* Secondary Bottom Glow - Blue/Indigo for depth*/}
            <div className="absolute -bottom-[10%] right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />

            {/* Center subtle ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/05 blur-[100px] rounded-full pointer-events-none" />
        </div>
    );
};
