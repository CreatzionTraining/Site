"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Home";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Mail, Send } from "lucide-react";

import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [showContactButton, setShowContactButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowContactButton(true);
      } else {
        setShowContactButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    inquiryType: "",
    message: "",
    privacyConsent: false,
  });

  const inquiryTypes = ["General Inquiry", "Sales", "Support", "Partnership", "Careers"];

  const toggleDrawer = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    // Dispatch event to handle scroll button visibility - hide when drawer is open
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('toggle-scroll-button', {
        detail: { isHidden: newState }
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Simulate success/close
    setTimeout(() => {
      setIsOpen(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('toggle-scroll-button', {
          detail: { isHidden: false }
        }));
      }
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        inquiryType: "",
        message: "",
        privacyConsent: false,
      });
      alert("Thank you! We've received your inquiry.");
    }, 1000);
  };

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
      <Footer />

      {/* Contact Drawer UI */}
      <>
        {/* Trigger Button - Fixed to Right Side */}
        <motion.button
          onClick={toggleDrawer}
          className="fixed top-1/2 right-0 z-[9990] -translate-y-1/2 bg-blue-600 text-white shadow-lg shadow-blue-900/20 rounded-l-xl py-8 pl-3.5 pr-4 flex items-center gap-3 cursor-pointer group transition-all duration-300"
          initial={{ x: "100%" }}
          animate={{ x: (showContactButton && !isOpen) ? "0%" : "100%" }}
          whileHover={{ x: -4 }}
        >
          <div className="flex flex-col items-center gap-3">
            <Mail className="w-5 h-5 rotate-90" />
            <span className="writing-mode-vertical text-sm font-semibold tracking-wide uppercase whitespace-nowrap">
              Contact Us
            </span>
          </div>
        </motion.button>


        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 z-[9991] bg-slate-900/20 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Drawer Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[9992] h-full w-full sm:w-[500px] md:w-[600px] bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
                  <p className="text-sm text-slate-500 mt-1">We'd love to hear from you. Tell us about your project.</p>
                </div>
                <button
                  onClick={toggleDrawer}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Contact Number *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Inquiry Type *</label>
                      <div className="relative">
                        <select
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all appearance-none bg-white font-sans text-slate-600"
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        >
                          <option value="" disabled>Select type</option>
                          {inquiryTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 pt-2">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="privacyConsent"
                        required
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-blue-600 checked:bg-blue-600 focus:ring-2 focus:ring-blue-500/20"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                      />
                      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <label htmlFor="privacyConsent" className="text-xs text-slate-500 leading-tight cursor-pointer">
                      I agree to the processing of my personal data as described in the <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.
                    </label>
                  </div>
                </form>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={toggleDrawer}
                  className="px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all flex items-center gap-2"
                >
                  <span>Submit Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
      </>
    </main>
  );
}