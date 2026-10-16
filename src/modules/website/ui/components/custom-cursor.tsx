"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.getAttribute("role") === "button"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[10000] hidden lg:block mix-blend-difference"
            animate={{
                x: position.x - 16,
                y: position.y - 16,
                scale: isHovering ? 2 : 1,
                backgroundColor: isHovering ? "rgba(var(--primary-rgb), 0.2)" : "transparent",
            }}
            transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
        />
    );
};
