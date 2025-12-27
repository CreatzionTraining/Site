"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth spring animation for the progress circle
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = window.scrollY > 100;
            
            // Check if near footer
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                // Hide button if footer is visible in viewport (with 100px buffer)
                const nearFooter = footerRect.top < windowHeight + 100;
                setIsNearFooter(nearFooter);
            }
            
            setIsVisible(scrolled && !isNearFooter && !isDrawerOpen);
        };

        // Listen for drawer toggle events
        const handleDrawerToggle = (event: CustomEvent) => {
            setIsDrawerOpen(event.detail.isHidden);
        };

        window.addEventListener("scroll", toggleVisibility);
        window.addEventListener('toggle-scroll-button', handleDrawerToggle as EventListener);
        toggleVisibility(); // Initial check
        
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            window.removeEventListener('toggle-scroll-button', handleDrawerToggle as EventListener);
        };
    }, [isNearFooter, isDrawerOpen]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-8 right-8 z-[9998]"
                    initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                >
                    <motion.div
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative group cursor-pointer"
                    >
                        {/* Background Blur Circle */}
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-full shadow-lg shadow-blue-500/20" />

                        {/* SVG Progress Ring */}
                        <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 100 100">
                            {/* Background Track */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#f1f5f9"
                                strokeWidth="6"
                            />
                            {/* Gradient Definitions */}
                            <defs>
                                <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2563eb" />   {/* mobile-blue-600 */}
                                    <stop offset="50%" stopColor="#4f46e5" />   {/* indigo-600 */}
                                    <stop offset="100%" stopColor="#06b6d4" />  {/* cyan-500 */}
                                </linearGradient>
                            </defs>
                            {/* Animated Progress Path */}
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#scrollGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                style={{ pathLength: scaleX }}
                            />
                        </svg>

                        {/* Center Arrow Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                className="text-slate-700 bg-white rounded-full p-2.5 shadow-sm group-hover:text-blue-600 group-hover:shadow-blue-200 transition-colors"
                            >
                                <ArrowUp className="w-5 h-5" strokeWidth={3} />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
