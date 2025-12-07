"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { 
  Shield, Lock, Eye, FileText, Users, Globe, ChevronRight, 
  CheckCircle, Mail, Building2, Scale, ArrowLeft, AlertCircle,
  Download, ExternalLink, Info, X, Send, Check
} from "lucide-react";
import { useState, useEffect } from "react";

interface PrivacyPolicyContentProps {
  onClose: () => void;
}

export default function PrivacyPolicyContent({ onClose }: PrivacyPolicyContentProps) {
  const [activeSection, setActiveSection] = useState("about");
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
    { id: "about", title: "About Our Privacy Notice", icon: Info },
    { id: "collection", title: "Information We Collect", icon: FileText },
    { id: "usage", title: "How We Use Your Information", icon: Eye },
    { id: "disclosure", title: "Information Disclosure", icon: Users },
    { id: "security", title: "Data Security", icon: Lock },
    { id: "rights", title: "Your Privacy Rights", icon: Scale },
    { id: "international", title: "International Transfers", icon: Globe },
    { id: "retention", title: "Data Retention", icon: FileText },
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
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
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
              <div className="text-sm sm:text-base md:text-xl font-bold text-gray-900">Privacy Notice</div>
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
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Privacy Notice</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Creatzion Website Privacy Notice
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
              Creatzion and its affiliated companies are firmly committed to protecting your privacy. 
              Learn what we do with the personal information we collect.
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
          
          {/* Sidebar Navigation - Horizontal scroll on mobile, sidebar on desktop */}
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
              <div className="hidden lg:block mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    Contact DPO
                  </button>
                  <button
                    onClick={() => scrollToSection('rights')}
                    className="w-full flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 font-medium"
                  >
                    <Scale className="w-4 h-4" />
                    Exercise Rights
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 space-y-8 sm:space-y-12 md:space-y-16">
            
            {/* About Section */}
            <section id="about" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">About Our Privacy Notice</h2>
                
                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    This Privacy Notice describes how Creatzion Technology Solutions and its affiliated companies 
                    ("Creatzion," "we," "our," or "us") collect, use, disclose, transfer, and store your personal 
                    information when you visit our websites or use our services.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-lg mb-8">
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Our Commitment</h3>
                        <p className="text-gray-700">
                          We will not sell your personal information to anyone outside the Creatzion group of companies. 
                          Your trust is paramount to us, and we maintain the highest standards of data protection and privacy.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <Image
                      src="/privacy policy.png"
                      alt="Privacy Policy"
                      fill
                      className="object-contain p-8"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Scope of This Notice</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    This Privacy Notice applies to all personal information collected through our websites, 
                    applications, and services. It explains your rights and how you can exercise them.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Collection Section */}
            <section id="collection" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  We may collect the following personal information relating to you:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Identity & Contact Information</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>First and last name, email address</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Physical address, telephone number</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Professional title, employer, department</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>LinkedIn account details</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Technical Information</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>IP address and geolocation data</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Browser type, version, and settings</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Device information and operating system</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Cookies and similar tracking technologies</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-green-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Usage & Behavioral Data</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Pages visited and time spent on site</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Click patterns and navigation paths</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Search queries and content interactions</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Marketing preferences and communication history</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-orange-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Anonymous Information</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>Aggregated data relating to website visitors</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>Click stream data and analytics</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>Trend analysis and statistics</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Third-Party Information</h3>
                      <p className="text-gray-700 text-sm">
                        If you provide us with personal information of third parties (such as emergency contacts or 
                        administrative assistants), you agree to notify them and obtain their consent where appropriate.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Usage Section */}
            <section id="usage" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  To the extent permitted by applicable law, we use your personal information for various purposes:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Service Delivery",
                      desc: "Provide you with the products, services, and information that you have requested, including providing copies of white papers, investor kits, and processing orders.",
                      icon: CheckCircle,
                      color: "blue"
                    },
                    {
                      title: "Relationship Management",
                      desc: "Manage and maintain our relationship with you, including responding to inquiries, questions or comments and providing customer support.",
                      icon: Users,
                      color: "purple"
                    },
                    {
                      title: "Event Participation",
                      desc: "Allow you to participate in events organized or promoted by us and/or our business partners.",
                      icon: Users,
                      color: "green"
                    },
                    {
                      title: "Communications",
                      desc: "Communicate important notices to you, such as information about changes to this Privacy Notice, our websites, and service updates.",
                      icon: Mail,
                      color: "orange"
                    },
                    {
                      title: "Analytics & Improvement",
                      desc: "Carry out analytics and market research to enable us to plan, develop and improve our websites, products, services and marketing activities.",
                      icon: Eye,
                      color: "cyan"
                    },
                    {
                      title: "Marketing Communications",
                      desc: "Inform you of our new products, services and events that we think you will find valuable by sending promotional messages via email, SMS, phone, post and/or other similar communications means.",
                      icon: Mail,
                      color: "pink"
                    },
                    {
                      title: "Personalization",
                      desc: "Create a profile about you to help us personalize our communications to you, including ensuring that you receive relevant marketing communications.",
                      icon: Users,
                      color: "indigo"
                    },
                    {
                      title: "Legal Protection",
                      desc: "Prevent and detect unlawful behavior, and protect or enforce our legal rights, for example defending us in case of legal disputes.",
                      icon: Scale,
                      color: "red"
                    }
                  ].map((purpose, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className={`w-10 h-10 bg-${purpose.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <purpose.icon className={`w-5 h-5 text-${purpose.color}-700`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{purpose.title}</h3>
                        <p className="text-sm text-gray-600">{purpose.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> If you would prefer not to receive promotional communications, simply follow 
                    the unsubscribe instructions on the promotional communications that you receive.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Disclosure Section */}
            <section id="disclosure" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">To Whom We Give Your Personal Information</h2>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  We may need to disclose your personal information to third parties in the following instances:
                </p>

                {/* Image */}
                <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
                  <Image
                    src="/security.png"
                    alt="Information Security"
                    fill
                    className="object-contain p-8"
                  />
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Other Creatzion Group Companies",
                      desc: "Creatzion is a global company and your personal information may be shared with or accessed by other companies within the Creatzion group who will use your personal information for the purposes and in a manner set out in this Privacy Notice."
                    },
                    {
                      title: "Service Providers",
                      desc: "We will disclose your personal information to companies that provide services to us, such as companies that assist us in operating our websites and vendors that assist us with marketing campaigns. The service providers are required to keep your personal information confidential and are not permitted to use your personal information for any other purpose than to carry out the services they are performing for us."
                    },
                    {
                      title: "Third Parties to Meet Applicable Legal Requirements",
                      desc: "We may need to disclose your personal information to a third party if it is necessary to comply with a legal obligation or the decision of a judicial authority, a public authority or a government body, or if disclosure is necessary for national security, law enforcement or other public interest."
                    },
                    {
                      title: "Business Partners",
                      desc: "We will disclose your personal information to our business partners if it is necessary for providing products and services to you, such as for certain software and related services."
                    },
                    {
                      title: "Third Parties in Connection with a Business Sale",
                      desc: "If we make a sale or transfer of assets, or are otherwise involved in a merger or business/asset transfer, we may transfer your personal information to one or more third parties as part of that transaction."
                    },
                    {
                      title: "Other Third Parties with Your Consent",
                      desc: "We may also share your personal information with other third parties when you separately consent to such sharing."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-white border border-gray-200 rounded-xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Security Section */}
            <section id="security" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    "🔐 End-to-end encryption for data transmission",
                    "🏢 Secure data centers with 24/7 monitoring",
                    "🔍 Regular security audits and penetration testing",
                    "👥 Employee training on data protection practices",
                    "🛡️ Multi-factor authentication and access controls",
                    "⚡ Incident response and breach notification procedures"
                  ].map((measure, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-sm">{measure}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> However, no method of transmission over the internet is 100% secure. 
                    While we strive to use commercially acceptable means to protect your personal information, we cannot 
                    guarantee its absolute security.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Rights Section */}
            <section id="rights" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      right: "Access",
                      desc: "Request access to your personal information and learn whether your personal information is processed by us.",
                      action: "Submit a Subject Access Request (SAR)"
                    },
                    {
                      right: "Correction",
                      desc: "Request the correction of any inaccurate or incomplete personal information.",
                      action: "Contact our Data Protection Officer"
                    },
                    {
                      right: "Deletion",
                      desc: "Request the erasure of your personal information under certain circumstances.",
                      action: "Submit a deletion request"
                    },
                    {
                      right: "Objection",
                      desc: "Object to our processing of your personal information for certain purposes.",
                      action: "Opt-out via communication preferences"
                    },
                    {
                      right: "Portability",
                      desc: "Under certain circumstances, demand data portability to transfer your data to another service.",
                      action: "Submit a portability request"
                    },
                    {
                      right: "Withdrawal",
                      desc: "Withdraw consent you have given for processing your personal information.",
                      action: "Update your preferences or contact us"
                    }
                  ].map((right, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Scale className="w-5 h-5 text-blue-700" />
                        <h3 className="text-lg font-bold text-gray-900">{right.right}</h3>
                      </div>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">{right.desc}</p>
                      <p className="text-xs text-blue-700 font-semibold">{right.action}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-sm text-gray-700">
                    To exercise your rights to the extent allowed under applicable law, please email{' '}
                    <a href="mailto:SAR@creatzion.com" className="text-blue-700 font-semibold hover:underline">
                      SAR@creatzion.com
                    </a>
                  </p>
                </div>
              </motion.div>
            </section>

            {/* International Transfers */}
            <section id="international" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">International Data Transfers</h2>
                
                <p className="text-gray-700 leading-relaxed mb-8">
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Notice.
                </p>

                {/* Image */}
                <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100">
                  <Image
                    src="/globe.png"
                    alt="Global Data Transfers"
                    fill
                    className="object-contain p-8"
                  />
                </div>

                <div className="space-y-3">
                  {[
                    "Standard Contractual Clauses (SCCs) approved by regulatory authorities",
                    "Adequacy decisions recognizing equivalent data protection standards",
                    "Binding Corporate Rules (BCRs) for intra-group transfers",
                    "Privacy Shield frameworks where applicable",
                    "Explicit consent for transfers when required by law"
                  ].map((safeguard, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{safeguard}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Retention */}
            <section id="retention" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Retention</h2>
                
                <p className="text-gray-700 leading-relaxed">
                  Your personal information will be retained only for so long as reasonably necessary for the purposes 
                  set out in this Privacy Notice in accordance with applicable laws, including for the purposes of 
                  satisfying any legal, regulatory, accounting or reporting requirements.
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
                  Any questions, concerns or complaints about our processing operations and our commitment to this 
                  Privacy Notice should be addressed to Creatzion's Data Protection Officer.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Email</h3>
                    </div>
                    <p className="text-sm text-white/80 mb-2">Data Protection Officer:</p>
                    <a href="mailto:DataProtectionOfficer@creatzion.com" className="text-white font-semibold hover:underline">
                      DataProtectionOfficer@creatzion.com
                    </a>
                    <p className="text-sm text-white/80 mt-4 mb-2">Subject Access Requests:</p>
                    <a href="mailto:SAR@creatzion.com" className="text-white font-semibold hover:underline">
                      SAR@creatzion.com
                    </a>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Postal Address</h3>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Creatzion Technology Solutions<br />
                      Attention: Data Protection Officer<br />
                      Privacy Office, Headquarters<br />
                      [Your Address Here]
                    </p>
                  </motion.div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-6">
                  <p className="text-sm text-white/90">
                    In addition to contacting us, in certain countries you have the right to lodge a complaint with 
                    your local data protection authority if you so choose.
                  </p>
                </div>

                {/* Contact DPO Button */}
                <div className="flex justify-center">
                  <motion.button
                    onClick={() => setShowContactModal(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-[#164b80] font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center gap-3 text-lg"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Data Protection Officer
                  </motion.button>
                </div>
              </motion.div>
            </section>

            {/* Updates */}
            <section className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Notice</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may change and update this Privacy Notice from time to time. Any changes to our Privacy Notice 
                  will be posted on this page. We encourage you to review this Privacy Notice periodically to stay 
                  informed about how we are protecting your information.
                </p>
              </motion.div>
            </section>

          </main>
        </div>
      </div>

      {/* Contact DPO Modal */}
      <AnimatePresence>
        {showContactModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm"
            />
            
            {/* Modal Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed z-[10001] top-4 md:top-auto md:bottom-8 md:right-8 left-4 right-4 md:left-auto md:w-[500px] max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] overflow-hidden bg-white rounded-2xl shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#164b80] via-[#0A66C2] to-[#0082ef] text-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">Contact DPO</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      We'll respond within 48 hours
                    </p>
                  </div>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)] md:max-h-[calc(100vh-16rem)]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Contact form submitted:', contactForm);
                    setShowContactModal(false);
                    setShowSuccessMessage(true);
                    setContactForm({ name: "", email: "", subject: "", message: "" });
                    // Auto-hide success message after 5 seconds
                    setTimeout(() => setShowSuccessMessage(false), 5000);
                  }}
                  className="space-y-4"
                >
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400 text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400 text-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 bg-white text-sm"
                    >
                      <option value="">Select a subject</option>
                      <option value="data-access">Data Access Request</option>
                      <option value="data-deletion">Data Deletion Request</option>
                      <option value="data-correction">Data Correction Request</option>
                      <option value="privacy-concern">Privacy Concern</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="complaint">Lodge a Complaint</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-800 placeholder-gray-400 text-sm"
                      placeholder="Describe your inquiry or concern..."
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-blue-900">Privacy Guarantee:</strong> Your information will be handled in accordance with our Privacy Policy.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#164b80] via-[#0A66C2] to-[#0082ef] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Message Popup */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed z-[10002] top-4 md:top-auto md:bottom-8 right-4 md:right-8 left-4 md:left-auto md:w-[400px] bg-white rounded-2xl shadow-2xl border-2 border-green-200 overflow-hidden"
          >
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg">Message Sent Successfully!</h4>
                  <p className="text-white/90 text-sm">We'll respond within 48 hours</p>
                </div>
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-all flex-shrink-0"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Success Body */}
            <div className="p-5">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Thank you for contacting our Data Protection Officer. Your inquiry has been received and our team will review it carefully.
              </p>
             
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-gradient-to-r from-green-500 to-emerald-600"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
