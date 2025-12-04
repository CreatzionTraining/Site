"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Bot,
  Box,
  Cloud,
  Database,
  Smartphone,
  Shield,
  ArrowRight,
  Code2,
  Cpu,
  Globe
} from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

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

export default function Services() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="services" className="py-24 relative bg-white" ref={ref}>
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
