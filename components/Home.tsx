"use client";

import { Canvas } from "@react-three/fiber";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Box,
  Cloud,
  Database,
  Smartphone,
  Shield,
  Zap,
  Target,
  ShieldCheck,
  Globe,
  Building2,
  Rocket,
  Lightbulb,
  Cpu,
  Star
} from "lucide-react";
import Scene3D from "./Scene3D";
import { Suspense, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";

// Services data
const services = [
  {
    title: "AI & Machine Learning",
    icon: Bot,
    desc: "Intelligent automation and predictive analytics powered by cutting-edge neural networks.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "3D Web Experiences",
    icon: Box,
    desc: "Immersive interactive 3D interfaces built with WebGL and React Three Fiber.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "group-hover:border-indigo-500/50"
  },
  {
    title: "Cloud Architecture",
    icon: Cloud,
    desc: "Scalable, secure cloud infrastructure on AWS, Azure, and GCP with automated deployment.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "group-hover:border-sky-500/50"
  },
  {
    title: "Blockchain Solutions",
    icon: Database,
    desc: "Decentralized applications and smart contracts for the future of digital transactions.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "group-hover:border-violet-500/50"
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    desc: "Native and cross-platform mobile applications with seamless UX for iOS and Android.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "group-hover:border-cyan-500/50"
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    desc: "Enterprise-grade security solutions with penetration testing and threat detection.",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "group-hover:border-slate-500/50"
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Hero Section Component
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hero Logo with Unique Transition */}
      <motion.div
        initial={{ y: -100, rotateX: -90, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.5
        }}
        className="absolute top-6 left-6 z-20 pointer-events-auto perspective-[1000px]"
      >
        <Link href="/" className="relative w-48 sm:w-64 h-12 sm:h-20 block transform-style-3d hover:scale-105 transition-transform duration-300">
          <Image
            src="/Logo.png"
            alt="Creatzion Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
      </motion.div>

      <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <motion.div
            className="text-center lg:text-left space-y-3 w-full max-w-2xl mx-auto lg:ml-auto lg:mr-0"
          >
            {/* Badge removed */}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight h-[130px] sm:h-[150px] lg:h-[160px] flex flex-col justify-center lg:justify-start">
              <motion.span custom={1} variants={textVariants} initial="hidden" animate="visible" className="block">
                Building
              </motion.span>
              <motion.span custom={2} variants={textVariants} initial="hidden" animate="visible" className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 pb-2">
                <TypeAnimation
                  sequence={[
                    "The Future",
                    2000,
                    "Innovation",
                    2000,
                    "Excellence",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                />
              </motion.span>
            </h1>

            {/* Added new paragraph */}
            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Transforming businesses with cutting-edge AI, immersive 3D experiences,
              and next-generation cloud solutions that drive real growth.
            </motion.p>

            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#contact" className="group relative px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              <Link href="#work" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 hover:-translate-y-1">
                Explore Our Work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="pt-8 flex items-center justify-center lg:justify-start gap-12 border-t border-slate-100"
            >
              <div>
                <p className="text-3xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500 font-medium">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">98%</p>
                <p className="text-sm text-slate-500 font-medium">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">24/7</p>
                <p className="text-sm text-slate-500 font-medium">Expert Support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Scene column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] relative flex items-center justify-center lg:justify-end mx-auto lg:mr-0 lg:ml-auto"
          >
            {/* Simplified 3D scene rendering */}
            <div className="relative z-10 h-full w-full">
              <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
                <Suspense fallback={null}>
                  <Scene3D />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section Component
function ServicesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="services" className="py-24 relative bg-background" ref={ref}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase mb-4">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Solutions That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transform</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We deliver comprehensive technology services designed to accelerate your digital evolution and drive measurable business results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Tilt
                className={`group relative p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden h-full ${service.border}`}
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glarePosition="all"
                scale={1.02}
                transitionSpeed={1500}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className={`relative z-10 w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                <p className="relative z-10 text-slate-600 mb-6 leading-relaxed">
                  {service.desc}
                </p>

                <div className="relative z-10 flex items-center text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  <span>Explore More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Optimized performance for seamless user experiences",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: Target,
      title: "Precision Driven",
      desc: "Data-backed decisions for measurable outcomes",
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      desc: "Bank-grade encryption and compliance standards",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: Globe,
      title: "Global Scale",
      desc: "Infrastructure that grows with your ambitions",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-slate-50/50" ref={ref}>
      <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase mb-4">
              Why Choose Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Innovation Meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Excellence</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 font-light">
              We combine cutting-edge technology with deep industry expertise to deliver
              solutions that don't just meet expectations—they redefine them.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg shadow-lg hover:bg-slate-800 transition-colors"
            >
              Learn Our Story
            </motion.button>
          </motion.div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-12 relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#004f9e]/5 via-[#0082ef]/5 to-[#00a8ff]/5"></div>

      <div className="max-w-[90%] 2xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card p-10 lg:p-14 rounded-3xl border border-white/50 shadow-2xl shadow-blue-900/5 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-5 py-2.5 rounded-full glass mb-6"
          >
            <span className="text-[#0056b3] font-bold text-sm tracking-wide uppercase">Let's Build Together</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a192f] mb-6 leading-tight"
          >
            Ready to Transform Your{" "}
            <span className="gradient-text">Vision?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg lg:text-xl text-[#4a5568] mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Partner with us to create extraordinary digital experiences that drive
            real business results and exceed expectations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium px-10 py-4 rounded-xl text-slate-900 font-bold text-lg flex items-center justify-center gap-3 group shadow-lg shadow-blue-500/10"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass px-10 py-4 rounded-xl text-[#0056b3] font-bold text-lg border border-[#0082ef]/20 hover:border-[#00a8ff]/40 transition-all duration-300"
            >
              View Portfolio
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 pt-10 border-t border-gray-200/60"
          >
            <p className="text-[#6c757d] text-xs font-semibold uppercase tracking-wider mb-6">Trusted by industry leaders worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                { Icon: Building2, label: "Enterprise" },
                { Icon: Rocket, label: "Startups" },
                { Icon: Lightbulb, label: "Innovation" },
                { Icon: Cpu, label: "Tech" },
                { Icon: Star, label: "Quality" }
              ].map(({ Icon, label }, i) => (
                <motion.div
                  key={i}
                  className="text-[#0056b3] flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05, opacity: 1, color: "#007bff" }}
                  transition={{ type: "spring", stiffness: 400 }}
                  title={label}
                >
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Hero Component that combines all sections
export default function Hero() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CTASection />
    </>
  );
}
