"use client";

import { Canvas } from "@react-three/fiber";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Scene3D from "./Scene3D";
import { Suspense, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
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
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <motion.div
            className="text-center lg:text-left space-y-8 w-full max-w-2xl mx-auto lg:ml-auto lg:mr-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100"
            >
              <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
                Future of Digital Innovation
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight h-[160px] sm:h-[180px] lg:h-[220px] flex flex-col justify-center lg:justify-start">
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
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
            className="h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] relative flex items-center justify-center lg:justify-start mx-auto lg:mx-0"
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
