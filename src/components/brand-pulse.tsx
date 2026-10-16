"use client";

import { MeetSyncLogo } from "@/modules/website/ui/components/meetsync-logo";
import { motion } from "framer-motion";

export const BrandPulse = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <MeetSyncLogo iconOnly size="lg" />
        </motion.div>
    );
};
