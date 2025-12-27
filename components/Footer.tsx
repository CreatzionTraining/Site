"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, Instagram, Send, ChevronDown, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import ScrollToTop from "./ScrollToTop";

// Newsletter Form Component
function NewsletterForm() {
  const [isFlying, setIsFlying] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFlying(true);

    setTimeout(() => {
      setIsFlying(false);
      setEmail("");
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              suppressHydrationWarning
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all shadow-sm"
            />
          </div>
          <motion.button
            type="submit"
            onClick={createRipple}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 bg-white text-[#164b80] font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-2xl overflow-hidden group"
          >
            {/* Ripple effects */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute rounded-full bg-blue-200 animate-ping opacity-75"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: '20px',
                  height: '20px',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}

            <span className="relative z-10 flex items-center gap-2">
              Subscribe
              <AnimatePresence mode="wait">
                {!isFlying ? (
                  <motion.div
                    key="send"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: 100, rotate: 45, transition: { duration: 0.5 } }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                  >
                    <div className="w-4 h-4 border-2 border-[#164b80] border-t-transparent rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>

            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        </div>
      </form>

      {/* Success Popup Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 md:top-auto md:bottom-8 md:left-auto md:right-8 md:translate-x-0 z-[9999] bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 max-w-sm w-[calc(100%-2rem)] md:w-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path d="M20 6L9 17l-5-5" />
              </motion.svg>
            </motion.div>
            <div className="flex-1">
              <h4 className="text-gray-900 font-bold text-sm">Successfully Subscribed!</h4>
              <p className="text-gray-600 text-xs mt-0.5">Thank you for subscribing to our newsletter.</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Footer Section with Mobile Dropdown
function FooterSection({
  title,
  links,
  delay
}: {
  title: string;
  links: { name: string; href: string }[];
  delay: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Mobile: Clickable header with dropdown */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer md:cursor-default mb-4"
      >
        <h4 className="text-white font-semibold text-sm">{title}</h4>
        <ChevronDown
          className={`w-4 h-4 text-white/60 md:hidden transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </div>

      {/* Desktop: Always visible, Mobile: Dropdown */}
      <AnimatePresence initial={false}>
        <motion.ul
          initial={false}
          animate={{
            height: !isMobile || isOpen ? "auto" : 0,
            opacity: !isMobile || isOpen ? 1 : 0
          }}
          className="space-y-2.5 overflow-hidden md:!h-auto md:!opacity-100"
        >
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform transition-transform"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </motion.div>
  );
}

interface FooterProps { }

export default function Footer({ }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ]
    },
    services: {
      title: "Services",
      links: [
        { name: "AI Solutions", href: "#services" },
        { name: "3D Design", href: "#services" },
        { name: "Cloud Services", href: "#services" },
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Case Studies", href: "#cases" },
        { name: "Documentation", href: "#docs" },
        { name: "Support", href: "#support" },
      ]
    }
  };

  const socialLinks = [
    { name: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/company/creatzion" },
    { name: "Twitter", Icon: Twitter, href: "https://twitter.com/creatzion" },
    { name: "GitHub", Icon: Github, href: "https://github.com/creatzion" },
    { name: "Instagram", Icon: Instagram, href: "https://www.instagram.com/creatzion" },
  ];

  return (
    <footer className="relative bg-[#164b80] text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8 pb-8 border-b border-white/10">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Logo Image */}
                <div className="mb-4">
                  <Image
                    src="/logo3 (1).png"
                    alt="Creatzion Technology"
                    width={180}
                    height={50}
                    className="h-12 w-auto"
                  />
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  Building the future with AI, 3D innovation, and cloud solutions.
                </p>

                {/* Social Links */}
                <div className="flex gap-2.5">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-[#0A66C2] hover:border-[#0077FF] transition-all duration-300"
                      aria-label={social.name}
                    >
                      <social.Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            <FooterSection
              title={footerSections.company.title}
              links={footerSections.company.links}
              delay={0.1}
            />

            <FooterSection
              title={footerSections.services.title}
              links={footerSections.services.links}
              delay={0.2}
            />

            <FooterSection
              title={footerSections.resources.title}
              links={footerSections.resources.links}
              delay={0.3}
            />
          </div>

          {/* Stay Updated Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 pb-8 border-b border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-lg font-bold mb-1 text-white">Stay Updated</h3>
                <p className="text-white/70 text-sm">
                  Get the latest insights and updates delivered to your inbox.
                </p>
              </div>
              <div className="md:flex md:justify-end">
                <NewsletterForm />
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                © {currentYear} Creatzion. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-[#0077FF] transition-colors duration-300 px-3 py-1 cursor-pointer"
                >
                  Privacy Policy
                </Link>
                <span className="text-white/40">•</span>
                <Link href="/terms" className="text-white/60 hover:text-[#0077FF] transition-colors duration-300 px-3 py-1">
                  Terms of Service
                </Link>
                <span className="text-white/40">•</span>
                <Link href="/cookies" className="text-white/60 hover:text-[#0077FF] transition-colors duration-300 px-3 py-1">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </footer>
  );
}
