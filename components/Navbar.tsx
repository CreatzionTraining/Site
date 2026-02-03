"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CookieConsent from "./CookieConsent";



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for styling
      setScrolled(currentScrollY > 20);

      // Navbar visibility logic:
      // - Always show at the very top (< 100px)
      // - Hide when scrolling down past 100px
      // - Show when scrolling up (anywhere on the page)
      if (currentScrollY < 100) {
        // At the top - always show
        setShowNavbar(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = ["Home", "Services", "Work", "About", "Contact"];

  return (
    <>
      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Absolute Logo - Top Left */}


      {/* Mobile Menu Button - Top Right */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/60 md:hidden pointer-events-auto text-[#0056b3]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Desktop Navigation - Slides in/out based on scroll */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: showNavbar ? 0 : -100,
          opacity: showNavbar ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed top-6 left-0 right-0 z-40 hidden md:flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <motion.div
            animate={{
              width: "auto",
              padding: "0.6rem 1.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(16px)",
              boxShadow: scrolled
                ? "0 10px 30px -10px rgba(0, 51, 102, 0.2)"
                : "0 4px 20px -5px rgba(0, 51, 102, 0.05)",
            }}
            className="rounded-full border border-[#0077FF] flex items-center justify-center transition-all duration-500 ease-out"
          >
            <ul className="flex items-center gap-8" role="menubar">
              {navItems.map((item, index) => (
                <motion.li
                  role="none"
                  key={item}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    mass: 0.8
                  }}
                >
                  <Link
                    href={item === "Contact" ? "/contact" : item === "Work" ? "/careers" : `#${item.toLowerCase()}`}
                    className="relative group block px-1 py-1"
                    role="menuitem"
                  >
                    <span className="relative z-10 text-sm font-medium text-slate-600 group-hover:text-[#0056b3] transition-colors duration-300">
                      {item}
                    </span>
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#007bff] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.nav >

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {
          mobileMenuOpen && (
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={item === "Contact" ? "/contact" : item === "Work" ? "/careers" : `#${item.toLowerCase()}`}
                      className="text-2xl font-bold text-[#0a192f] hover:text-[#0056b3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
}
