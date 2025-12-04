"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = ["Home", "Services", "Work", "About", "Contact"];

  return (
    <>
      {/* Absolute Logo - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 left-6 z-50 pointer-events-auto"
      >
        <Link href="/" className="relative w-48 sm:w-64 h-12 sm:h-20 block">
          <Image
            src="/Logo.png"
            alt="Creatzion Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
      </motion.div>

      {/* Mobile Menu Button - Top Right */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/60 md:hidden pointer-events-auto text-[#0056b3]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-0 right-0 z-40 hidden md:flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <motion.div
            animate={{
              width: "auto",
              padding: scrolled ? "0.6rem 1.5rem" : "0.75rem 2rem",
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(16px)",
              boxShadow: scrolled
                ? "0 10px 30px -10px rgba(0, 51, 102, 0.15)"
                : "0 4px 20px -5px rgba(0, 51, 102, 0.05)",
              y: scrolled ? 0 : 0,
            }}
            className="rounded-full border border-white/60 flex items-center justify-center transition-all duration-500 ease-out"
          >
            <ul className="flex items-center gap-8" role="menubar">
              {navItems.map((item) => (
                <li role="none" key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="relative group block px-1 py-1"
                    role="menuitem"
                  >
                    <span className="relative z-10 text-sm font-medium text-slate-600 group-hover:text-[#0056b3] transition-colors duration-300">
                      {item}
                    </span>
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#007bff] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-6 items-center">
              {navItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-2xl font-bold text-[#0a192f] hover:text-[#0056b3]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
