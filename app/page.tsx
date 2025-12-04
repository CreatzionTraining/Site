"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Zap,
  Target,
  ShieldCheck,
  Globe,
  Building2,
  Rocket,
  Lightbulb,
  Cpu,
  Star,
  ArrowRight
} from "lucide-react";

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
              className="btn-premium px-10 py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3 group shadow-lg shadow-blue-500/10"
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

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />

      <Services />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}