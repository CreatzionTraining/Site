"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Linkedin, Twitter, Github, Instagram, Send, ChevronDown } from "lucide-react";
import ScrollToTop from "./ScrollToTop";
import { useState, useEffect, useCallback } from "react";

// Custom Hook for Media Query
const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);
    setTargetReached(media.matches);

    return () => media.removeListener(updateTarget);
  }, [width, updateTarget]);

  return targetReached;
};

// Reusable Footer Section Component
function FooterSection({
  title,
  links,
  className,
  delay
}: {
  title: string,
  links: { name: string, href: string }[],
  className?: string,
  delay: number
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(768);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div
        onClick={() => isMobile && setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer md:cursor-default group select-none"
      >
        <h4 className="text-slate-900 font-bold text-lg mb-4 md:mb-6 tracking-wide">{title}</h4>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 md:hidden transition-transform duration-300 mb-4 md:mb-6 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <motion.ul
            className="space-y-4 overflow-hidden"
            initial={isMobile ? { height: 0, opacity: 0 } : { opacity: 1 }}
            animate={isMobile ? { height: "auto", opacity: 1 } : { opacity: 1 }}
            exit={isMobile ? { height: 0, opacity: 0 } : { opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {links.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-300 inline-flex items-center group/link"
                >
                  <span className="group-hover:translate-x-1 group-hover/link:translate-x-1 transition-transform duration-300">{link.name}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}



// Newsletter Form Component with Paper Plane Animation
function NewsletterForm() {
  const [isFlying, setIsFlying] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFlying(true);

    // Reset after animation
    setTimeout(() => {
      setIsFlying(false);
      setEmail("");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-xl mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full sm:flex-1 px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-lg shadow-blue-100/50"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Subscribe
            <AnimatePresence>
              {!isFlying && (
                <motion.div
                  initial={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{
                    opacity: 0,
                    x: 500,
                    rotate: 45,
                    transition: { duration: 0.6, ease: "easeIn" }
                  }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </span>

          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {isFlying && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mt-4 text-green-600 font-semibold"
          >
            ✓ Subscribed successfully!
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
    services: [
      { name: "AI Solutions", href: "#services" },
      { name: "3D Design", href: "#services" },
      { name: "Cloud Services", href: "#services" },
    ],
    resources: [
      { name: "Case Studies", href: "#cases" },
      { name: "Support", href: "#support" },
      { name: "Documentation", href: "#docs" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/company/creatzion" },
    { name: "Twitter", Icon: Twitter, href: "https://twitter.com/creatzion" },
    { name: "GitHub", Icon: Github, href: "https://github.com/creatzion" },
    { name: "Instagram", Icon: Instagram, href: "https://www.instagram.com/creatzion" },
  ];

  return (
    <footer className="relative bg-background pt-20 pb-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section - At the Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative bg-white/60 backdrop-blur-xl border border-slate-100 p-10 rounded-3xl mb-16 overflow-hidden shadow-sm"
        >

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.h4
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Stay Updated
            </motion.h4>
            <p className="text-slate-600 mb-8 text-lg">
              Get the latest tech insights delivered to your inbox.
            </p>

            {/* Newsletter Form */}
            <NewsletterForm />
          </div>
        </motion.div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight ml-2">
                CREATZION
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                Building the future with AI, 3D, and Cloud.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 group"
                  >
                    <social.Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <FooterSection
            title="Company"
            links={footerLinks.company}
            className="lg:col-span-2 border-b md:border-none border-slate-100 pb-3 md:pb-0"
            delay={0.1}
          />

          {/* Services Links */}
          <FooterSection
            title="Services"
            links={footerLinks.services}
            className="lg:col-span-3 border-b md:border-none border-slate-100 pb-3 md:pb-0"
            delay={0.2}
          />

          {/* Resources Links */}
          <FooterSection
            title="Resources"
            links={footerLinks.resources}
            className="lg:col-span-3 border-b md:border-none border-slate-100 pb-3 md:pb-0"
            delay={0.3}
          />
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-sm">
            © {currentYear} Creatzion Technology. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#privacy" className="text-slate-500 hover:text-blue-600 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-slate-500 hover:text-blue-600 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#cookies" className="text-slate-500 hover:text-blue-600 transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </footer>
  );
}
