"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Globe2, Cpu, Sparkles } from "lucide-react";


export default function AboutPage() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax values - subtle float effects triggered by scroll
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Slight rotations for floating images to mimic the reference
    const rotate1 = useTransform(scrollYProgress, [0, 1], [-1, 3]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -2]);

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <main ref={containerRef} className="bg-[#FAFAFA] text-[#111111] overflow-hidden selection:bg-[#0077FF]/20 selection:text-[#0A66C2] font-sans relative">
            <Navbar />

            {/* Architectural Background Lines & Annotations */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.12] mix-blend-multiply">
                <svg className="absolute top-[10%] left-[-5%] w-[45vw] h-[45vw] max-w-[500px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
                    <circle cx="50" cy="50" r="40" strokeDasharray="1 1.5" />
                    <circle cx="50" cy="50" r="25" />
                    <path d="M50 0 L50 100 M0 50 L100 50" strokeDasharray="4 4" />
                </svg>

                <svg className="absolute top-[35%] right-[5%] w-[35vw] h-[35vw] max-w-[400px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
                    <circle cx="80" cy="80" r="15" />
                    <line x1="75" y1="85" x2="60" y2="100" />
                    <line x1="10" y1="10" x2="90" y2="90" strokeDasharray="2 4" />
                </svg>

                <svg className="absolute bottom-[-10%] left-[10%] w-[55vw] h-[55vw] max-w-[700px]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.1">
                    <circle cx="50" cy="50" r="45" />
                    <circle cx="50" cy="50" r="30" />
                    <circle cx="50" cy="50" r="15" />
                    <line x1="50" y1="50" x2="0" y2="0" strokeDasharray="1 2" />
                </svg>

                <div className="absolute top-[28%] left-[20%] text-[10px] md:text-sm tracking-[0.2em] font-mono text-[#0B1320] transform -rotate-45">850.00</div>
                <div className="absolute top-[18%] right-[15%] text-[10px] md:text-sm tracking-[0.2em] font-mono text-[#0B1320]">1350.CRTZ</div>
            </div>

            {/* --- HERO SECTION ---  */}
            <section className="relative w-full pt-48 pb-10 px-4 md:px-12 lg:px-20 z-10 flex flex-col justify-start">

                {/* The Huge Text Line 1 */}
                <div className="w-full text-left relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className={`text-[25vw] sm:text-[20vw] md:text-[18vw] leading-[0.75] font-bold tracking-tight text-slate-900`}
                    >
                        Solve
                    </motion.h1>
                </div>

                {/* The Huge Text Line 2 */}
                <div className="w-full text-right relative z-10 mt-[-2vw] md:mt-[-4vw]">
                    <motion.h1
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`text-[26vw] sm:text-[22vw] md:text-[20vw] leading-[0.75] font-bold tracking-tight text-slate-900`}
                    >
                        Serve
                    </motion.h1>
                </div>

                {/* Extra Large Introduction Content - Now left aligned */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="relative z-10 font-light text-left pl-4 md:pl-20 mt-20 md:mt-24 max-w-4xl"
                >
                    <p className="text-xl sm:text-2xl md:text-[28px] text-[#555] leading-[1.6] md:leading-[1.7] select-none text-balance">
                        Creatzion focuses on living close to innovation; collapsing the boundary between visionary ideas and robust digital execution.
                        We architect cloud-native platforms and AI systems that redefine global enterprise capabilities.
                    </p>
                </motion.div>
            </section>



            {/* --- SECTION 2: THE TYPOGRAPHY BLOCK --- */}
            <section className="relative py-24 md:py-32 z-10 px-4 md:px-12 lg:px-20 overflow-hidden">
                <div className="max-w-[70rem] mx-auto flex flex-col items-center justify-center text-center">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="w-full flex flex-col gap-2 md:gap-4 items-center"
                    >
                        <motion.h2 variants={fadeInUp} className="text-[5.5vw] md:text-[4.5vw] lg:text-[5vw] font-bold tracking-tight text-slate-900 leading-[0.9]">
                            This elegant <span className="font-semibold italic font-serif">approach</span>
                        </motion.h2>

                        <motion.h2 variants={fadeInUp} className="text-[5.5vw] md:text-[4.5vw] lg:text-[5vw] font-bold tracking-tight text-slate-900 leading-[0.9] flex items-center justify-center flex-wrap gap-4 md:gap-8">
                            blends
                            {/* Inline floating image block - Made LARGER per request */}
                            <motion.div
                                style={{ y: y3 }}
                                className="relative w-[50vw] h-[35vw] md:w-[35vw] md:h-[22vw] max-w-[450px] max-h-[300px] z-30 shadow-2xl mx-2 md:mx-4 -rotate-3 overflow-hidden group mt-8 md:mt-12 bg-slate-100"
                            >
                                {/* Shine effect for this image too */}
                                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-shine pointer-events-none"></div>

                                <Image src="/creatzion_editorial_inline_1772296855403.png" fill alt="Botanical Contrast" className="object-cover hover:scale-[1.05] transition-all duration-[2s]" />
                            </motion.div>
                            logic
                        </motion.h2>

                        <motion.h2 variants={fadeInUp} className="text-[5.5vw] md:text-[4.5vw] lg:text-[5vw] font-bold tracking-tight text-slate-900 leading-[0.9]">
                            into the <span className="text-[#0A66C2]">digital</span> unknown.
                        </motion.h2>

                        <motion.h2 variants={fadeInUp} className="text-[7.5vw] md:text-[6vw] lg:text-[6.5vw] font-bold tracking-tight text-slate-900 leading-[0.9] mt-6 md:mt-10 opacity-70">
                            Creatzion thrives on new challenges.
                        </motion.h2>
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 3: EDITORIAL STATS & CTA --- */}
            <section className="relative pt-10 pb-40 z-10 px-4 md:px-12 lg:px-20">
                {/* Subtle horizontal line */}
                <div className="w-full max-w-[90rem] mx-auto h-[1px] bg-[#0B1320]/15 mb-24 md:mb-36"></div>

                <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">
                    <div className="w-full lg:w-[55%]">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 mb-8"
                        >
                            The People
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-2xl text-slate-500 font-light leading-[1.8] max-w-2xl"
                        >
                            We don’t rely on rigid hierarchies or siloed departments. Instead, we operate as a unified, elite collective of engineers, designers, and visionaries. Our culture empowers every individual to lead, innovate, and contribute directly to the breathtaking solutions we deliver for our clients.
                        </motion.p>

                        <div className="mt-20 flex flex-wrap gap-16 md:gap-24">
                            <div className="flex flex-col">
                                <span className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-4">300%</span>
                                <span className="text-sm md:text-base uppercase tracking-[0.2em] text-[#0A66C2] font-semibold">Avg. Client ROI</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-4">5+</span>
                                <span className="text-sm md:text-base uppercase tracking-[0.2em] text-[#0A66C2] font-semibold">Active Platforms</span>
                            </div>
                        </div>

                        {/* New Content Block to fill the empty space */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-32 md:mt-48 max-w-xl"
                        >
                            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-6">Our Engineering Philosophy</h4>
                            <p className="text-xl text-slate-500 font-light leading-relaxed mb-6">
                                We believe that true enterprise innovation requires removing friction between design and deep technical execution. While other agencies pass work between silos, our core engine merges them.
                            </p>
                            <p className="text-xl text-slate-500 font-light leading-relaxed">
                                Every platform we build benefits from a singular, unified vision, resulting in products that are not only breathtakingly beautiful but architecturally sound at scale.
                            </p>
                            <Link href="/work" className="inline-flex items-center gap-2 mt-8 text-[#0A66C2] font-semibold tracking-widest uppercase text-sm hover:opacity-70 transition-opacity">
                                Explore Our Work <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-[45%] relative flex flex-col lg:items-end pb-10">
                        <div className="text-left w-full max-w-sm ml-auto mb-16 mt-0">
                            <p className="text-xl md:text-[22px] text-slate-500 font-light italic mb-8 leading-relaxed">
                                "Gravity is a mindset. Great companies get weighed down. We exist to lift that weight."
                            </p>
                            <div className="flex items-center gap-10">
                                <div className="w-12 h-[3px] bg-[#4A86E8]"></div>
                                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-200">1350.CRTZ</span>
                            </div>
                        </div>

                        {/* Minimalist Tech Concept Image with Parallax Effects */}
                        <motion.div
                            style={{ y: y2, rotate: rotate2 }}
                            className="relative w-full max-w-[32rem] aspect-[3/4] drop-shadow-2xl z-20 mt-20 md:mt-32 lg:mt-56"
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src="/creatzion_editorial_tech_concept.png"
                                    alt="Floating Conceptual Technology"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-[2s] grayscale-[20%] hover:grayscale-0"
                                    unoptimized
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Massive Enhanced Footer / CTA Area */}
                <div className="max-w-[90rem] mx-auto mt-20 md:mt-32 relative z-30">
                    <div className="w-full h-[1px] bg-[#0B1320]/10 mb-20 md:mb-32"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 px-4 md:px-0">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-[30%] text-center lg:text-left"
                        >
                            <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6">Start A Project</h4>
                            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">Collaborate with our elite unit of engineers and designers to build solutions that will completely dominate your market sector.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="shrink-0 flex justify-center w-full lg:w-[40%]"
                        >
                            <Link href="/contact" className="group relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-[#0B1320]/20 flex items-center justify-center overflow-hidden hover:border-[#0A66C2] shadow-sm hover:shadow-2xl hover:shadow-[#0077FF]/20 transition-all duration-700 bg-white">
                                <span className="absolute inset-0 bg-[#0A66C2] translate-y-[101%] rounded-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                                <span className="relative z-10 text-sm md:text-xl font-bold uppercase tracking-[0.25em] text-[#0B1320] group-hover:text-white transition-colors duration-500 flex flex-col items-center gap-2 md:gap-4">
                                    Contact Us
                                    <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-[30%] text-center lg:text-right"
                        >
                            <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6">Careers Hub</h4>
                            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">We are always rigorously hunting for ambitious global talent. Join us and architect digital products that redefine the future.</p>
                        </motion.div>
                    </div>
                </div>

            </section>

            <Footer />
        </main>
    );
}
