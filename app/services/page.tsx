"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lenis from "lenis";
import { ArrowRight, Cpu, Cloud, Hammer, Box, ShieldCheck, Link as LinkIcon, Database, Wifi } from "lucide-react";

import {
    SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiGo, SiRust, SiTensorflow,
    SiAmazonwebservices, SiGooglecloud, SiKubernetes,
    SiDocker, SiTerraform, SiPostgresql, SiMongodb, SiRedis,
    SiApachekafka, SiApachespark, SiSolidity, SiThreedotjs
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

// The Data Structure driving the Page
const SERVICES = [
    {
        tag: "01 / AI",
        title: "AI & Machine Learning",
        bgText: "INTELLIGENCE",
        desc: "We build production-grade AI systems from the ground up. From custom LLM fine-tuning and retrieval-augmented generation to real-time computer vision and NLP engines.",
        features: ["LLMs & RAG", "Computer Vision", "NLP Engines", "MLOps", "Predictive Analytics"],
        image: "/ART.png",
    },
    {
        tag: "02 / CLOUD",
        title: "Cloud Architecture",
        bgText: "SCALABILITY",
        desc: "We architect multi-cloud and hybrid strategies across AWS, Azure, and GCP — designed for resilience, zero-downtime Kubernetes deployments, and enterprise security.",
        features: ["AWS & Azure & GCP", "Kubernetes", "Infrastructure as Code", "Serverless", "CI/CD Pipelines"],
        image: "/cloudaiobj.png",
    },
    {
        tag: "03 / SECURITY",
        title: "Cybersecurity",
        bgText: "RESILIENCE",
        desc: "Enterprise-grade security solutions. We conduct penetration testing, threat modeling, and deploy zero-trust architectures to secure your digital estate end-to-end.",
        features: ["VAPT", "Zero Trust", "Threat Detection", "SOC2 Automation", "SIEM Config"],
        image: "/SECURITY.png",
    },
    {
        tag: "04 / DATA",
        title: "Data Engineering",
        bgText: "INSIGHTS",
        desc: "Turn raw data into real revenue. We build real-time streaming pipelines, data lakes, and BI dashboards that make enterprise decision-making faster and clearer.",
        features: ["Real-time Streaming", "Data Warehousing", "ETL/ELT Logic", "BI Dashboards", "Big Data"],
        image: "/DATA.png",
    },
    {
        tag: "05 / PRODUCT",
        title: "Product Engineering",
        bgText: "INNOVATION",
        desc: "From zero to production — we engineer complete digital products including scalable SaaS platforms, robust web applications, and intuitive mobile products.",
        features: ["React & Next.js", "Node & Python", "GraphQL APIs", "Mobile DevOps", "System Architecture"],
        image: "/PRODUCTAI.png",
    },
    {
        tag: "06 / 3D & AR",
        title: "3D & Immersive Web",
        bgText: "EXPERIENCE",
        desc: "We create browser-based 3D experiences that push the boundaries. From product configurators to WebXR environments built natively into the DOM.",
        features: ["WebGL & Three.js", "React Three Fiber", "WebXR Ecosystem", "Custom Shaders", "Scroll 3D"],
        image: "/SER.png",
    },
    {
        tag: "07 / WEB3",
        title: "Blockchain & Web3",
        bgText: "DECENTRALIZED",
        desc: "Production-ready blockchain solutions. We engineer gas-optimized smart contracts, secure DeFi protocols, and highly scalable interoperable infrastructure.",
        features: ["Smart Contracts", "DeFi Protocols", "Cross-chain Bridges", "Solidity & Rust", "DAO Tooling"],
        image: "/blockchain.png",
    },
    {
        tag: "08 / IOT",
        title: "IoT Systems",
        bgText: "CONNECTED",
        desc: "Bridging hardware and cloud. We build embedded firmware, edge computing platforms, and real-time device management architectures.",
        features: ["Edge Computing", "Device Firmware", "Over-The-Air (OTA)", "MQTT Architecture", "Azure/AWS IoT"],
        image: "/iot.png",
    },
    {
        tag: "09 / CONSULT",
        title: "IT Consulting",
        bgText: "STRATEGY",
        desc: "Strategic roadmaps defining your future. Digital transformation audits, legacy modernisation, agile coaching, and CTO-as-a-Service partnerships.",
        features: ["CTO-as-a-Service", "Tech Due Diligence", "Agile Coaching", "Platform Evaluation", "Security Audits"],
        image: "/consult.png",
    }
];

const CATEGORIES = [
    { title: "Artificial Intelligence", icon: Cpu, desc: "LLMs, Computer Vision & Custom Models" },
    { title: "Cloud Solutions", icon: Cloud, desc: "AWS, Azure & Cloud Native Architecture" },
    { title: "Product Dev", icon: Hammer, desc: "Full-Cycle MVP to Enterprise Delivery" },
    { title: "3D & Immersive", icon: Box, desc: "WebGL, Three.js & Spatial Computing" },
    { title: "Cybersecurity", icon: ShieldCheck, desc: "Pen Testing & Zero-Trust DevOps" },
    { title: "Blockchain", icon: LinkIcon, desc: "Smart Contracts & Web3 Infrastructure" },
    { title: "Data Engineering", icon: Database, desc: "Pipelines, Warehousing & Analytics" },
    { title: "IoT Ecosystems", icon: Wifi, desc: "Hardware-to-Cloud Interconnectivity" }
];

const INDUSTRIES = [
    "FinTech", "HealthTech", "E-Commerce",
    "SaaS", "Manufacturing", "Education",
    "Logistics", "Real Estate", "Enterprise"
];

const PROCESS_STEPS = [
    "Discovery", "Architecture", "Design",
    "Development", "Testing", "Deployment"
];

const TECH_STACK = [
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#339939" },
    { name: "Python", Icon: SiPython, color: "#3776AB" },
    { name: "Go", Icon: SiGo, color: "#00ADD8" },
    { name: "Rust", Icon: SiRust, color: "#000000" },
    { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
    { name: "AWS", Icon: SiAmazonwebservices, color: "#232F3E" },
    { name: "Azure", Icon: VscAzure, color: "#0089D6" },
    { name: "GCP", Icon: SiGooglecloud, color: "#4285F4" },
    { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "Terraform", Icon: SiTerraform, color: "#844FBA" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    { name: "Redis", Icon: SiRedis, color: "#FF4438" },
    { name: "Kafka", Icon: SiApachekafka, color: "#231F20" },
    { name: "Spark", Icon: SiApachespark, color: "#E25A1C" },
    { name: "Solidity", Icon: SiSolidity, color: "#363636" },
    { name: "Three.js", Icon: SiThreedotjs, color: "#000000" }
];

// Single Service Section Component mapped into the Page View
function ServiceSection({ service, index }: { service: any; index: number }) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Parallax & Fade Effects
    const yBgText = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const yImage = useTransform(scrollYProgress, [0, 1], [80, -80]);

    const opacityContent = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
    const xLeft = useTransform(scrollYProgress, [0.2, 0.4], [-50, 0]);
    const xRight = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

    return (
        <section ref={ref} className="relative py-12 lg:py-16 flex items-center justify-center overflow-hidden bg-background border-b border-slate-100 last:border-b-0">
            {/* HUGE BACKGROUND TEXT (Parallaxed) */}
            <motion.div
                style={{ y: yBgText }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <h2 className="text-[10rem] sm:text-[14rem] lg:text-[20rem] font-black text-slate-100/50 leading-none whitespace-nowrap tracking-tighter select-none">
                    {service.bgText}
                </h2>
            </motion.div>

            {/* CONTENT GRID */}
            <div className="max-w-[90%] lg:max-w-[1000px] xl:max-w-[1200px] w-full mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] items-center gap-12 lg:gap-8 relative z-10">

                {/* LEFT CONTENT (Title & Description) */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
                >
                    <span className="inline-block py-2 px-5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-widest shadow-sm">
                        {service.tag}
                    </span>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                        {service.title}
                    </h3>
                    <p className="text-lg text-slate-600 font-light leading-relaxed max-w-sm">
                        {service.desc}
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group mt-4">
                        Discuss this service
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* MIDDLE CONTENT (3D Generated Asset / Hero Image) */}
                <motion.div
                    style={{ y: yImage }}
                    className="order-1 lg:order-2 flex justify-center relative h-[300px] sm:h-[400px] lg:h-[450px] w-full"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative w-full h-full drop-shadow-2xl"
                    >
                        {/* We use object-contain so our cool images fit beautifully in the center */}
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain"
                            priority={index < 2}
                        />
                    </motion.div>
                </motion.div>

                {/* RIGHT CONTENT (Tags / Capability List) */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="order-3 lg:order-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-8 lg:pt-10"
                >
                    <div className="flex flex-col items-center lg:items-end gap-2">
                        <div className="h-[2px] w-12 bg-blue-600"></div>
                        <h4 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Key Capabilities</h4>
                    </div>

                    <ul className="space-y-4 w-full max-w-[280px]">
                        {service.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-center gap-4 text-slate-700 font-medium bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                                <span className="text-left w-full">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

            </div>
        </section>
    );
}

export default function ServicesPage() {

    useEffect(() => {
        // Initialize buttery smooth scrolling
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    const HEADER_VARIANTS: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <main className="min-h-screen relative bg-background flex flex-col selection:bg-blue-600/20 selection:text-blue-900 overflow-x-hidden">
            <Navbar />

            {/* Title Header Section */}
            <section className="relative pt-40 pb-20 px-6 md:px-12 flex-shrink-0 bg-white border-b border-slate-100">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto w-full relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="flex flex-col items-center justify-center gap-6 max-w-4xl mx-auto"
                    >
                        <motion.span variants={HEADER_VARIANTS} className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-widest shadow-sm">
                            OUR EXPERTISE
                        </motion.span>
                        <motion.h1 variants={HEADER_VARIANTS} className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 leading-[1.0] tracking-tighter">
                            Engineering <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">The Future.</span>
                        </motion.h1>
                        <motion.p variants={HEADER_VARIANTS} className="text-xl sm:text-2xl text-slate-500 font-light leading-relaxed mt-4 max-w-2xl">
                            We architect, design, and deliver premium digital solutions to transform ambitious enterprises.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Ticker Strip */}
            <div className="relative border-b border-slate-200 py-4 overflow-hidden bg-white flex z-10 flex-shrink-0 shadow-sm">
                <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap min-w-full">
                    {[...SERVICES, ...SERVICES].map((s, i) => (
                        <span key={i} className="mx-8 text-slate-400 text-[13px] uppercase tracking-[0.2em] font-bold flex items-center gap-8">
                            {s.title}
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        </span>
                    ))}
                </div>
            </div>

            {/* Loop through all services mapping out the new stunning layout */}
            <div className="w-full flex flex-col relative z-20 bg-background">
                {SERVICES.map((service, idx) => (
                    <ServiceSection key={idx} service={service} index={idx} />
                ))}
            </div>

            {/* Categories Grid (Core Domains) */}
            <section className="py-24 px-6 md:px-12 relative z-10 mx-auto flex-shrink-0 w-full bg-white border-b border-slate-100">
                <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto w-full">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    >
                        <motion.div variants={HEADER_VARIANTS} className="text-center mb-16">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-widest shadow-sm mb-4">
                                CORE DOMAINS
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Focus Areas</h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Discover the cross-functional domains where our engineering teams deliver unparalleled excellence.</p>
                        </motion.div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {CATEGORIES.map((cat, i) => {
                                const IconComp = cat.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        variants={HEADER_VARIANTS}
                                        whileHover={{ y: -5 }}
                                        className="relative bg-white border border-slate-200 p-8 rounded-2xl flex flex-col items-start transition-all duration-300 group cursor-pointer shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-blue-600/30 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 relative z-10 text-slate-700">
                                            <IconComp className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{cat.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium relative z-10">{cat.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tech Stack Grid */}
            <section className="py-24 px-6 md:px-12 relative z-10 flex-shrink-0 w-full bg-background border-b border-slate-100">
                <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto w-full">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
                    >
                        <motion.div variants={HEADER_VARIANTS} className="text-center mb-16">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-widest shadow-sm mb-4">
                                TECHNOLOGIES
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Powered By</h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Enterprise-grade technologies we use to build secure, scalable, and resilient systems.</p>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                            {TECH_STACK.map((tech, i) => {
                                const IconComp = tech.Icon;
                                return (
                                    <motion.div
                                        key={i}
                                        variants={HEADER_VARIANTS}
                                        whileHover={{ scale: 1.05, borderColor: tech.color, backgroundColor: "#ffffff", color: tech.color }}
                                        className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold tracking-wide transition-all cursor-default shadow-sm hover:shadow-md flex items-center justify-center gap-3"
                                    >
                                        <IconComp style={{ color: tech.color }} className="w-5 h-5" />
                                        {tech.name}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-white border-b border-slate-200 overflow-hidden relative flex-shrink-0 w-full">
                <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    >
                        <motion.div variants={HEADER_VARIANTS} className="text-center md:text-left mb-16">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-widest shadow-sm mb-4">
                                METHODOLOGY
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Our Proven Process</h2>
                        </motion.div>

                        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 overflow-x-auto pb-8 scrollbar-hide">
                            {PROCESS_STEPS.map((step, i) => (
                                <motion.div key={i} variants={HEADER_VARIANTS} className="relative min-w-[150px] flex-shrink-0 group pt-10 px-4">
                                    <div className="absolute top-0 left-0 text-[100px] font-black text-slate-100 leading-none -z-10 group-hover:text-blue-50 transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="w-12 h-1 bg-blue-600/30 mb-6 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500 rounded-full" />
                                    <h3 className="text-xl font-bold text-slate-900 tracking-wide">{step}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Industries Section */}
            <section className="py-24 px-6 md:px-12 relative z-10 flex-shrink-0 w-full bg-background border-b border-slate-100">
                <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto w-full">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    >
                        <motion.div variants={HEADER_VARIANTS} className="text-center md:text-left mb-16">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-widest shadow-sm mb-4">
                                SECTORS
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Industries We Serve</h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                            {INDUSTRIES.map((ind, i) => (
                                <motion.div
                                    key={i}
                                    variants={HEADER_VARIANTS}
                                    className="group flex items-center justify-between border-b border-slate-200 pb-4 cursor-pointer"
                                >
                                    <span className="text-2xl font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{ind}</span>
                                    <span className="text-blue-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold">
                                        <ArrowRight />
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Shared CTA mapped to rest of site vibe */}
            <section className="py-32 relative overflow-hidden bg-slate-900 flex-shrink-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight"
                    >
                        Ready to start your journey?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Partner with Creatzion to reinvent your enterprise. Leverage cutting-edge technology to create solutions that matter.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                            Transform Your Business
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </main>
    );
}
