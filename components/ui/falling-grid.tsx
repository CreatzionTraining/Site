"use client";

import { motion } from "framer-motion";

export const FallingGrid = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Grid Pattern with Mask to fade bottom */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)"
                }}
            >
                <motion.div
                    className="w-full h-[200%] absolute top-[-100%] left-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px"
                    }}
                    animate={{
                        y: ["0%", "50%"]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </div>
    );
};
