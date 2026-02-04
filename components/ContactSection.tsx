"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FallingGrid } from "@/components/ui/falling-grid";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 200, damping: 15 }
    }
};

export default function ContactUsContent() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulation
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <section
            className="relative w-full min-h-screen flex items-center justify-center py-20 lg:py-32 px-6 overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/contact-bg.png')" }}
        >
            {/* Gradient Overlay & Wave */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-blue-400/20 via-cyan-300/10 to-transparent mix-blend-overlay" />
            </motion.div>

            {/* Falling Grid with gentle fade in */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="absolute inset-0 overflow-hidden pointer-events-none"
            >
                <FallingGrid />
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* --- Left Column: Text Content --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="flex flex-col gap-8 lg:gap-10 lg:-mt-20"
                >
                    {/* Header Group */}
                    <div className="space-y-6">
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm w-fit"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs font-bold tracking-wide text-slate-700 uppercase">Available for new projects</span>
                        </motion.div>

                        <motion.h1
                            variants={slideInLeft}
                            className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]"
                        >
                            Let's build the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative inline-block">
                                future
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span> together.
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium"
                        >
                            We partner with visionary companies to design and engineer digital products that define categories.
                        </motion.p>
                    </div>

                    {/* Contact Info Cards */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        <motion.div
                            variants={scaleIn}
                            className="group p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                        >
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email us</h3>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">hello@creatzion.com</p>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="group p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                        >
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Our Studio</h3>
                            <p className="text-sm font-semibold text-slate-900">San Francisco, CA</p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* --- Right Column: Form Card --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={slideInRight}
                    className="relative"
                >
                    {/* Card Container */}
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50">
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="min-h-[460px] flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <ArrowRight className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900">Message Sent!</h3>
                                <p className="text-lg text-slate-500">We'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <motion.div variants={fadeInUp} className="space-y-2 mb-2">
                                    <h3 className="text-3xl font-bold text-slate-900">Let's talk</h3>
                                    <p className="text-slate-600">
                                        Tell us about your project and we'll help you grow your business from scratch.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    <motion.div variants={fadeInUp} className="group">
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">First & Last name</label>
                                        <input
                                            name="name"
                                            value={formData.name} onChange={handleChange}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div variants={fadeInUp} className="group">
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email} onChange={handleChange}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div variants={fadeInUp} className="group">
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone number</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone} onChange={handleChange}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </motion.div>
                                    <motion.div variants={fadeInUp} className="group">
                                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Write your message</label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            value={formData.message} onChange={handleChange}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm resize-none"
                                            placeholder="Tell us about the project..."
                                            required
                                        />
                                    </motion.div>
                                </motion.div>

                                <motion.button
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.02, boxShadow: "0 20px 30px -10px rgba(37, 99, 235, 0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-4 w-full bg-slate-900 hover:bg-blue-700 text-white font-bold text-lg py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-blue-600/30 active:scale-[0.99]"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                                </motion.button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>

        </section>
    );
}