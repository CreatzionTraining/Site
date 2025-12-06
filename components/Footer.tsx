"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Linkedin, Twitter, Github, Instagram, Send, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";


// Scroll to Top Button Component
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9998] w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center cursor-pointer transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
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
      { name: "AI", href: "#services" },
      { name: "3D", href: "#services" },
    ],
    resources: [
      { name: "Cases", href: "#cases" },
      { name: "Support", href: "#support" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/company/creatzion" },
    { name: "Twitter", Icon: Twitter, href: "https://twitter.com/creatzion" },
    { name: "GitHub", Icon: Github, href: "https://github.com/creatzion" },
    { name: "Instagram", Icon: Instagram, href: "https://www.instagram.com/creatzion" },
  ];

  return (
    <footer className="relative bg-white pt-12 pb-8 border-t border-slate-200">
      <div className="max-w-[90%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
                CREATZION
              </h3>
              <p className="text-slate-600 leading-relaxed max-w-md">
                Building the future with AI, 3D, and Cloud.
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2, transition: { duration: 0.2 } }}
                  className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  <social.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-slate-900 font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-slate-900 font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-slate-900 font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl mb-12 border border-blue-100 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.h4
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3"
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

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-sm">
            © {currentYear} Creatzion Technology. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#privacy" className="text-slate-500 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-slate-500 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="#cookies" className="text-slate-500 hover:text-blue-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </footer>
  );
}
