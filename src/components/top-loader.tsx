"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const TopLoader = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[9999] origin-left shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                />
            )}
        </AnimatePresence>
    );
};
