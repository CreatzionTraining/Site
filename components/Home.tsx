"use client";

import { Canvas } from "@react-three/fiber";
import { motion, Variants, AnimatePresence } from "framer-motion";
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
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Scene3D from "./Scene3D";
import NewsSection from "./NewsSection";
import { Suspense, useRef, useState, useEffect } from "react";
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
      <div
        className="absolute top-6 left-6 z-20 pointer-events-auto perspective-[1000px]"
      >
        <Link href="/" className="flex items-center gap-0 sm:gap-1 transform-style-3d hover:scale-105 transition-transform duration-300 group">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="relative z-20"
          >
            <Image
              src="/creatzion_c_logo.png"
              alt="Creatzion C Logo"
              width={80}
              height={80}
              className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ x: -40, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.7
            }}
            className="relative z-10"
          >
            <Image
              src="/creatzion_text_logo.png"
              alt="Creatzion Technology"
              width={240}
              height={60}
              className="h-10 sm:h-16 w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>
      </div>

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




          </motion.div>

          {/* 3D Scene column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] relative flex items-center justify-center lg:justify-end mx-auto lg:mr-0 lg:ml-auto flex-shrink-0"
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



// CTA Section Component
function CTASection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const slides = [
    {
      id: 0,
      image: "/office_team.png",
      tag: "Innovation Outcomes",
      title: "Grow your business at the speed of light.",
      titleHighlight: "speed of light.",
      desc: "It's your time to shine. Partner with us to create extraordinary digital experiences that drive real results.",
      stat: "300%",
      statLabel: "Avg. ROI"
    },
    {
      id: 1,
      image: "/meeting_room.png",
      tag: "Strategic Leadership",
      title: "Define your future with data-driven strategy.",
      titleHighlight: "data-driven strategy.",
      desc: "Unlock potential with insights that matter. We help you navigate complex markets with precision and confidence.",
      stat: "50%",
      statLabel: "Efficiency Boost"
    },
    {
      id: 2,
      image: "/tech_space.png",
      tag: "Engineering Excellence",
      title: "Build scalable systems for tomorrow.",
      titleHighlight: "systems for tomorrow.",
      desc: "Robust architectures that stand the test of time. From cloud to edge, we engineer solutions that perform.",
      stat: "99.9%",
      statLabel: "Uptime"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section className="relative w-full bg-slate-50 overflow-hidden" ref={ref}>
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        {/* Image Side */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={current.image}
                alt={current.tag}
                fill
                className="object-cover"
                priority
              />
              {/* Premium overlay to integrate with theme */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent mix-blend-multiply pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-10 sm:p-16 lg:p-24 bg-white relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 flex items-center gap-4"
              >
                <div className="h-[2px] w-12 bg-blue-600"></div>
                <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">
                  {current.tag}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-10 leading-[1.1] tracking-tight"
              >
                {current.title.split(current.titleHighlight)[0]}
                <span className="text-blue-600">{current.titleHighlight}</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 mb-12 leading-relaxed font-light max-w-lg"
              >
                {current.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-8"
              >
                <button className="group relative pr-16 text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                  Get Your Free Roadmap
                  <motion.span
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 group-hover:bg-blue-700 transition-all duration-300 group-hover:right-[-10px]"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </button>

                <div className="h-10 w-[1px] bg-slate-200"></div>

                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-600">{current.stat}</span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{current.statLabel}</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Bottom Right Corner */}
          <div className="absolute bottom-8 right-8 flex gap-3 z-20">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-slate-200 text-slate-700 flex items-center justify-center hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:text-white transition-colors duration-300" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />

              {/* Animated ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-100 group-hover:scale-110 opacity-100 group-hover:opacity-0 transition-all duration-500" />
            </motion.button>
          </div>
        </div>
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
      <CTASection />
      <NewsSection />
    </>
  );
}
