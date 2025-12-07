"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { 
  Shield, Lock, FileText, Users, Globe, ChevronRight, 
  CheckCircle, Mail, Building2, Scale, AlertCircle,
  Info, X, Send, Check, Gavel, Book, AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";

interface TermsOfServiceContentProps {
  onClose?: () => void;
}

export default function TermsOfServiceContent({ onClose }: TermsOfServiceContentProps) {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Automatically detect which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const tableOfContents = [
    { id: "acceptance", title: "Acceptance of Terms", icon: CheckCircle },
    { id: "use", title: "Use of Services", icon: Users },
    { id: "account", title: "User Accounts", icon: Lock },
    { id: "intellectual", title: "Intellectual Property", icon: FileText },
    { id: "termination", title: "Termination", icon: AlertTriangle },
    { id: "liability", title: "Limitation of Liability", icon: Scale },
    { id: "governing", title: "Governing Law", icon: Gavel },
    { id: "contact", title: "Contact Us", icon: Mail }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="md:sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/logo.png"
                alt="Creatzion Logo"
                width={40}
                height={40}
                className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-[60px] md:h-[60px]"
              />
              <div className="text-sm sm:text-base md:text-xl font-bold text-gray-900">Terms of Service</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#164b80] to-[#0A66C2] text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Book className="w-4 h-4" />
              <span className="text-sm font-medium">Terms of Service</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Creatzion Terms of Service
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
              Please read these Terms of Service carefully before using our website or services. 
              By accessing or using any part of the site, you agree to be bound by these terms.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/80">Last Updated: December 6, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/80">Effective Date: December 6, 2025</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 sm:mb-4 px-1">
                On This Page
              </h2>
              {/* Mobile: Horizontal Scroll */}
              <nav className="lg:hidden flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
              {/* Desktop: Vertical List */}
              <nav className="hidden lg:block space-y-1">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-left">{item.title}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions - Desktop only */}
              <div className="hidden lg:block mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 px-4">
                  Quick Actions
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all group"
                  >
                    <Mail className="w-4 h-4 group-hover:text-blue-700 transition-colors" />
                    <span className="text-left">Contact Support</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 space-y-8 sm:space-y-12 md:space-y-16">
            
            {/* Acceptance Section */}
            <section id="acceptance" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Acceptance of Terms</h2>
                
                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    By accessing or using the Creatzion Technology Solutions website and services, you agree to be bound by these Terms of Service 
                    and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-lg mb-8">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Agreement</h3>
                        <p className="text-gray-700">
                          Your use of our services constitutes your agreement to these terms. We reserve the right to update or modify these terms at any time without prior notice.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <Image
                      src="/hero_security.png"
                      alt="Terms of Service"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Use of Services Section */}
            <section id="use" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Use of Services</h2>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Prohibited Activities</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Violate any applicable laws or regulations</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Infringe upon the rights of others</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Distribute viruses or malicious code</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Intellectual Property Section */}
            <section id="intellectual" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  The content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of Creatzion and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </motion.div>
            </section>

             {/* Limitation of Liability Section */}
             <section id="liability" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  In no event shall Creatzion, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                </p>
              </motion.div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#164b80] to-[#0A66C2] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Contact Us</h2>
                <p className="text-xs sm:text-sm md:text-base text-white/90 mb-4 sm:mb-6 leading-relaxed">
                  If you have any questions about these Terms, please contact us.
                </p>
                <div className="flex justify-center">
                  <motion.button
                    onClick={() => setShowContactModal(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-[#164b80] font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center gap-3 text-lg"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Support
                  </motion.button>
                </div>
              </motion.div>
            </section>

          </main>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed z-[10001] top-4 md:top-auto md:bottom-8 md:right-8 left-4 right-4 md:left-auto md:w-[500px] max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] overflow-hidden bg-white rounded-2xl shadow-2xl"
            >
              <div className="bg-gradient-to-r from-[#164b80] via-[#0A66C2] to-[#0082ef] text-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">Contact Support</h3>
                    <p className="text-white/90 text-sm">We'll respond within 48 hours</p>
                  </div>
                  <button onClick={() => setShowContactModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setShowContactModal(false);
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 5000);
                  }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Full Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
                    <input type="email" required className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Message</label>
                    <textarea required rows={4} className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500 resize-none" placeholder="How can we help?" />
                  </div>
                  <button type="submit" className="w-full px-4 py-2.5 bg-[#164b80] text-white font-bold rounded-lg hover:bg-[#0A66C2] transition-all">Send Message</button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed z-[10002] bottom-8 right-8 bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Message Sent!</h4>
              <p className="text-sm text-gray-600">We'll get back to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
