"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const hasAccepted = sessionStorage.getItem("cookieConsent");
        if (!hasAccepted) {
            setTimeout(() => {
                setShowConsent(true);
            }, 10000);
        }
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem("cookieConsent", "accepted");
        setShowConsent(false);
    };

    const handleReject = () => {
        sessionStorage.setItem("cookieConsent", "rejected");
        setShowConsent(false);
    };

    return (
        <AnimatePresence>
            {showConsent && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-slate-200 shadow-2xl"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <Image src="/cookie.png" alt="Cookie" width={48} height={48} className="object-contain" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        We value your privacy
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                                        By clicking "Accept All", you consent to our use of cookies.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleReject}
                                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all whitespace-nowrap"
                                >
                                    Reject All
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAccept}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap"
                                >
                                    Accept All
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
