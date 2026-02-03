"use client";

import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutScene3D from "@/components/AboutScene3D";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Brain, Rocket, Shield, Users, Globe, Zap, Target, Lightbulb } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

// Sample Data
const coreValues = [
    {
        title: "Innovation First",
        desc: "We don't just follow trends; we set them using cutting-edge technologies.",
        icon: Rocket,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Global Vision",
        desc: "Connecting businesses worldwide with scalable, boundary-defying solutions.",
        icon: Globe,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        title: "Elite Expertise",
        desc: "A team of world-class engineers dedicated to solving the most complex problems.",
        icon: Brain,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        title: "Client-Centric",
        desc: "Your success is our obsession. We build partnerships, not just software.",
        icon: Users,
        color: "text-sky-600",
        bg: "bg-sky-50",
    },
];

const teamMembers = [
    {
        name: "Alex Sterling",
        role: "CEO & Founder",
        color: "bg-blue-600",
        icon: Target
    },
    {
        name: "Sarah Chen",
        role: "Chief Technology Officer",
        color: "bg-indigo-600",
        icon: Lightbulb
    },
    {
        name: "Marcus Thorne",
        role: "Head of Design",
        color: "bg-purple-600",
        icon: Zap
    },
    {
        name: "Elena Rodriguez",
        role: "Lead Architect",
        color: "bg-sky-600",
        icon: Shield
    }
];

export default function AboutPage() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <main className="min-h-screen bg-background text-slate-900 overflow-x-hidden">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white/50">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* Animated Background Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-70 blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent opacity-70 blur-3xl pointer-events-none" />

                <div className="container relative z-10 px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold tracking-wide uppercase"
                        >
                            Who We Are
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Architect</span> <br />
                            The Impossible.
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            Creatzion Technology is a forward-thinking digital powerhouse. We merge art, science, and technology to redefine what's possible in the digital realm.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-4"
                        >
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-blue-600 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                                Our Vision
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* 3D Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="h-[500px] w-full lg:h-[700px] relative flex items-center justify-center"
                    >
                        {/* Enhanced Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                        <div className="absolute w-[80%] h-[80%] border border-blue-500/20 rounded-full animate-pulse opacity-20 pointer-events-none" />

                        <Canvas camera={{ position: [0, 0, 8], fov: 30 }} className="z-10">
                            <Suspense fallback={null}>
                                <AboutScene3D />
                            </Suspense>
                        </Canvas>
                    </motion.div>
                </div>
            </section>

            {/* --- OUR STORY SECTION --- */}
            <section className="py-24 relative bg-white overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                <div className="container px-6 mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-slate-900">
                                Pioneering the <span className="text-indigo-600">Digital Frontier</span>
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                <p>
                                    At Creatzion, we believe that technology is more than just code—it's the brush with which we paint the future. Founded by a collective of elite engineers and visionary designers, we set out to bridge the gap between complex functionality and breathtaking aesthetics.
                                </p>
                                <p>
                                    Our journey began with a simple question: <span className="font-semibold text-slate-800">"What if software felt as natural as thought?"</span> Today, we answer that question by building intuitive, AI-driven ecosystems that empower businesses to scale effortlessly.
                                </p>
                                <p>
                                    From developing proprietary neural networks to crafting immersive 3D web experiences, our methodology is rooted in "First Principles" thinking. We deconstruct problems to their core and rebuild them with cleaner, faster, and more intelligent solutions.
                                </p>
                            </div>

                            <div className="mt-8 flex gap-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-blue-600">20+</h4>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Awards Won</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-indigo-600">500+</h4>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Global Clients</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 mix-blend-overlay z-10" />
                                <Image
                                    src="/meeting_room.png"
                                    alt="Our Strategic Planning"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10" />
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- CORE VALUES SECTION --- */}
            <section className="py-24 relative bg-slate-50/50">
                <div className="container px-6 mx-auto">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6">Driven By <span className="text-blue-600">Excellence</span></h2>
                        <p className="text-lg text-slate-600">
                            Our core values define who we are and how we operate. We believe in pushing boundaries while maintaining the highest standards of integrity.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {coreValues.map((value, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Tilt
                                    className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 h-full"
                                    perspective={1000}
                                    scale={1.03}
                                >
                                    <div className={`w-14 h-14 ${value.bg} ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                                        <value.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900">{value.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{value.desc}</p>
                                </Tilt>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]" />
                </div>

                <div className="container px-6 mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divider-y md:divider-y-0 md:divider-x divider-slate-700">
                        {[
                            { label: "Years Exp.", value: "15+" },
                            { label: "Projects Done", value: "250+" },
                            { label: "Team Members", value: "40+" },
                            { label: "Client Satisfaction", value: "99%" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="space-y-2"
                            >
                                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 uppercase tracking-widest text-sm font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TEAM SECTION --- */}
            <section className="py-24">
                <div className="container px-6 mx-auto">
                    <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-bold mb-4">Meet The <span className="text-indigo-600">Visionaries</span></h2>
                            <p className="text-lg text-slate-600">
                                The brilliant minds behind Creatzion Technology. We are a diverse team of thinkers, makers, and doers.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative mb-4 shadow-md group-hover:shadow-2xl transition-all duration-300">
                                    <div className={`absolute inset-0 ${member.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                        {/* Placeholder Avatar Concept */}
                                        <member.icon size={64} className="opacity-50 group-hover:scale-110 transition-transform duration-500 text-slate-400" />
                                    </div>
                                    {/* Glass Card Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <p className="font-bold text-slate-900">{member.name}</p>
                                        <p className="text-xs text-blue-600 font-semibold uppercase">{member.role}</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
