"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Cookie } from "lucide-react";

// Cookie Consent Component
function CookieConsentBanner() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasAccepted = sessionStorage.getItem("cookieConsent");
    if (!hasAccepted) {
      setTimeout(() => {
        setShowConsent(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const handleReject = () => {
    sessionStorage.setItem("cookieConsent", "rejected");
    setShowConsent(false);
  };

  const handleCustomize = () => {
    sessionStorage.setItem("cookieConsent", "customized");
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-slate-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                    By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCustomize}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all whitespace-nowrap"
                >
                  Customize
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReject}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all whitespace-nowrap"
                >
                  Reject All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap"
                >
                  Accept All
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
      <CookieConsentBanner />

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

      {/* Desktop Navigation - Slides in/out based on scroll */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: showNavbar ? 0 : -100,
          opacity: showNavbar ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-40 hidden md:flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <motion.div
            animate={{
              width: "auto",
              padding: scrolled ? "0.6rem 1.5rem" : "0.75rem 2rem",
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(16px)",
              boxShadow: scrolled
                ? "0 10px 30px -10px rgba(0, 51, 102, 0.2)"
                : "0 4px 20px -5px rgba(0, 51, 102, 0.05)",
            }}
            className="rounded-full border border-[#0077FF] flex items-center justify-center transition-all duration-500 ease-out"
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
