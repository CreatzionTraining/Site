"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Target,
    Users,
    Award,
    User,
    ArrowRight,
    Globe
} from "lucide-react";

export default function ContactSection() {
    const [userType, setUserType] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
            {/* Hero Section - Ultra Modern */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#164b80] via-[#0A66C2] to-[#0077FF] text-white">
                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                {/* Floating Gradient Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 30, 0],
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            y: [0, 40, 0],
                            x: [0, -30, 0],
                            scale: [1, 1.3, 1],
                            rotate: [0, -90, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Text Content */}
                        <div className="text-center lg:text-left space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8"
                            >
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
                                >
                                    <Briefcase className="w-5 h-5 text-cyan-300" />
                                    <span className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                        IT Solutions & Digital Services
                                    </span>
                                </motion.div>

                                {/* Main Heading */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-4"
                                >
                                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
                                        <span className="block text-white">Let's Build Your</span>
                                        <span className="block text-cyan-200 mt-2">Digital Future</span>
                                    </h1>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg sm:text-xl lg:text-2xl text-blue-50/95 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                                >
                                    Transform your business with cutting-edge software solutions, cloud infrastructure, and innovative IT services tailored to your needs.
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Right Side - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden lg:flex items-center justify-center"
                        >
                            <div className="relative">
                                <Image
                                    src="/contact_illustration.png"
                                    alt="Contact Us"
                                    width={600}
                                    height={600}
                                    className="w-full max-w-lg"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Section - User Type Selection */}
            <section className="py-20 lg:py-32 relative bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            Get in touch
                        </h2>
                    </motion.div>

                    <div className="space-y-8">
                        {/* Business Owner Option */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setUserType('business')}
                            className="w-full relative group text-left"
                            style={{
                                background: 'linear-gradient(135deg, rgba(233, 213, 255, 0.4) 0%, rgba(216, 180, 254, 0.3) 100%)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(216, 180, 254, 0.3)',
                                borderRadius: '24px',
                                padding: '32px',
                                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.15), 0 2px 8px rgba(168, 85, 247, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', boxShadow: '0 4px 16px rgba(168, 85, 247, 0.4), 0 2px 4px rgba(168, 85, 247, 0.2)' }}>
                                    <Briefcase className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a business owner or decision maker.</h3>
                                    <p className="text-base text-gray-700">I need IT solutions, software development, or digital transformation services for my business.</p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-purple-600 group-hover:translate-x-2 transition-transform flex-shrink-0 mt-2" />
                            </div>
                        </motion.button>

                        {/* IT Professional Option */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setUserType('professional')}
                            className="w-full relative group text-left"
                            style={{
                                background: 'linear-gradient(135deg, rgba(186, 230, 253, 0.4) 0%, rgba(147, 197, 253, 0.3) 100%)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(147, 197, 253, 0.3)',
                                borderRadius: '24px',
                                padding: '32px',
                                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)' }}>
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm an IT professional or developer.</h3>
                                    <p className="text-base text-gray-700">I'd like to explore career opportunities, partnerships, or technical collaborations.</p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform flex-shrink-0 mt-2" />
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Contact Information Below */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <Mail className="w-8 h-8 mx-auto mb-3 text-[#0A66C2]" />
                        <h4 className="font-bold text-gray-900 mb-2">Email Us</h4>
                        <a href="mailto:business@creatzion.com" className="text-[#0A66C2] hover:text-[#0077FF] font-medium text-sm">business@creatzion.com</a>
                    </div>

                    <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <Phone className="w-8 h-8 mx-auto mb-3 text-[#0A66C2]" />
                        <h4 className="font-bold text-gray-900 mb-2">Call Us</h4>
                        <a href="tel:+1234567890" className="text-[#0A66C2] hover:text-[#0077FF] font-medium text-sm">+1 (234) 567-890</a>
                    </div>

                    <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <MapPin className="w-8 h-8 mx-auto mb-3 text-[#0A66C2]" />
                        <h4 className="font-bold text-gray-900 mb-2">Visit Us</h4>
                        <p className="text-gray-600 text-sm">123 Innovation Drive<br />San Francisco, CA</p>
                    </div>
                </motion.div>
            </section>

            {/* Trust Indicators Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "500+", label: "IT Projects Delivered", icon: Target, color: "from-blue-500 to-cyan-500" },
                            { number: "200+", label: "Active Clients", icon: Users, color: "from-purple-500 to-pink-500" },
                            { number: "50+", label: "Technologies Mastered", icon: Globe, color: "from-green-500 to-emerald-500" },
                            { number: "98%", label: "Client Satisfaction", icon: Award, color: "from-orange-500 to-red-500" }
                        ].map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
