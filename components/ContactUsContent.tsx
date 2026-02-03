"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Globe, 
  Briefcase,
  Building2,
  Users,
  Award,
  CheckCircle2,
  Clock,
  Shield,
  Zap
} from "lucide-react";

export default function ContactUsContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const projectTypes = [
    "Digital Transformation",
    "AI & Machine Learning Solutions",
    "Cloud Migration & Infrastructure",
    "Custom Software Development",
    "Enterprise Solutions",
    "Technology Consulting",
    "Strategic Partnership",
    "Other"
  ];

  const budgetRanges = [
    "Under $50K",
    "$50K - $100K",
    "$100K - $250K",
    "$250K - $500K",
    "$500K+",
    "To be discussed"
  ];

  const timelines = [
    "Immediate (1-3 months)",
    "Short-term (3-6 months)",
    "Medium-term (6-12 months)",
    "Long-term (12+ months)",
    "Flexible"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Prepare template parameters
    const templateParams = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      jobTitle: formData.get('jobTitle'),
      industry: formData.get('industry'),
      projectType: formData.get('projectType'),
      budget: formData.get('budget') || 'Not specified',
      timeline: formData.get('timeline') || 'Not specified',
      message: formData.get('message'),
      title: formData.get('projectType'),
      website_link: 'https://creatzion.com',
    };

    try {
      // Send auto-reply email to user
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // Send notification email to business
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // Generate unique reference number
      const refNum = `CRZ-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      setReferenceNumber(refNum);
      setIsSubmitted(true);
      form.reset();

      // Reset success message after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setReferenceNumber("");
      }, 10000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Simplified and Modern */}
      <section className="relative bg-gradient-to-br from-[#164b80] via-[#0A66C2] to-[#0077FF] text-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-6 py-2.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-6"
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Let's Create Something Amazing
                </span>
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Get in Touch
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                Have a project in mind? We'd love to hear about it. Share your vision and let's build something extraordinary together.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
                >
                  <Building2 className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Projects</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
                >
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm text-white/80">Clients</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
                >
                  <Globe className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-white/80">Countries</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
                >
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-white/80">Satisfaction</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Sidebar - Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                {/* Contact Cards */}
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#0077FF] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                        <p className="text-sm text-gray-600 mb-2">For business inquiries</p>
                        <a href="mailto:business@creatzion.com" className="text-[#0A66C2] font-medium hover:text-[#0077FF] transition-colors text-sm">
                          business@creatzion.com
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#0077FF] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                        <p className="text-sm text-gray-600 mb-2">Mon-Fri, 9am-6pm</p>
                        <a href="tel:+1234567890" className="text-[#0A66C2] font-medium hover:text-[#0077FF] transition-colors text-sm">
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#0077FF] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                        <p className="text-sm text-gray-600">
                          123 Innovation Drive<br />
                          Tech Park, Suite 500<br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Why Choose Us Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-[#164b80] to-[#0A66C2] rounded-2xl p-6 text-white mt-6"
                >
                  <Shield className="w-10 h-10 mb-4" />
                  <h3 className="font-bold text-lg mb-3">Why Partner With Us?</h3>
                  <ul className="space-y-2.5 text-sm text-white/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Industry-leading expertise in AI & Cloud</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>On-time, on-budget delivery guaranteed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>24/7 dedicated support team</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Start Your Project</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. We've received your inquiry.</p>
                    
                    {/* Reference Number Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-6 max-w-md mx-auto"
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-[#0A66C2]" />
                        <p className="text-sm font-semibold text-gray-700">Your Reference Number</p>
                      </div>
                      <p className="text-2xl font-bold text-[#0A66C2] font-mono tracking-wider mb-2">{referenceNumber}</p>
                      <p className="text-xs text-gray-600">Save this number for tracking your inquiry</p>
                    </motion.div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>Our team will respond within 24 hours</span>
                    </div>
                    
                    <p className="text-sm text-gray-500">Please check your email (including spam folder) for confirmation.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4"
                      >
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                      </motion.div>
                    )}
                    
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
                        Personal Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            required
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'firstName' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all`}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            required
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'lastName' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all`}
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'email' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all`}
                            placeholder="john.doe@company.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            required
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'phone' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all`}
                            placeholder="+1 (234) 567-8900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
                        Company Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="company"
                            type="text"
                            name="company"
                            required
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'company' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all`}
                            placeholder="Your Company Inc."
                          />
                        </div>
                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-900 mb-2">
                            Job Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="jobTitle"
                            type="text"
                            name="jobTitle"
                            required
                            onFocus={() => setFocusedField('jobTitle')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'jobTitle' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all`}
                            placeholder="CEO, CTO, VP Engineering"
                          />
                        </div>
                      </div>
                      <div className="mt-5">
                        <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 mb-2">
                          Industry <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="industry"
                          type="text"
                          name="industry"
                          required
                          onFocus={() => setFocusedField('industry')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                            focusedField === 'industry' 
                              ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                              : 'border-gray-200 hover:border-gray-300'
                          } outline-none transition-all`}
                          placeholder="e.g., Healthcare, Finance, Technology"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center text-sm font-bold">4</div>
                        Project Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <label htmlFor="projectType" className="block text-sm font-semibold text-gray-900 mb-2">
                            Project Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            required
                            onFocus={() => setFocusedField('projectType')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'projectType' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all bg-white cursor-pointer`}
                          >
                            <option value="">Select type</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
                            Budget Range
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            onFocus={() => setFocusedField('budget')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'budget' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all bg-white cursor-pointer`}
                          >
                            <option value="">Select range</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="timeline" className="block text-sm font-semibold text-gray-900 mb-2">
                            Timeline
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            onFocus={() => setFocusedField('timeline')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                              focusedField === 'timeline' 
                                ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                                : 'border-gray-200 hover:border-gray-300'
                            } outline-none transition-all bg-white cursor-pointer`}
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                        Tell Us About Your Project <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                          focusedField === 'message' 
                            ? 'border-[#0A66C2] ring-4 ring-[#0A66C2]/10' 
                            : 'border-gray-200 hover:border-gray-300'
                        } outline-none transition-all resize-none`}
                        placeholder="Share your project goals, challenges, and what you're looking to achieve. The more details you provide, the better we can help you..."
                      />
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#0A66C2] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          <strong className="text-gray-900">Your privacy matters.</strong> All information is kept strictly confidential and secure. Read our{" "}
                          <a href="/privacy" className="text-[#0A66C2] hover:text-[#0077FF] font-semibold underline">
                            Privacy Policy
                          </a>.
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-gradient-to-r from-[#0A66C2] to-[#0077FF] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-lg group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Your Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration Process Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How We Work Together</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our proven process ensures your project's success from start to finish
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Discovery", desc: "We analyze your needs and create a strategic roadmap", icon: "🎯" },
              { step: "2", title: "Design", desc: "Expert team brings your vision to life", icon: "✨" },
              { step: "3", title: "Development", desc: "Building with cutting-edge technology", icon: "🚀" },
              { step: "4", title: "Support", desc: "Ongoing optimization and growth", icon: "💎" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#0A66C2] transition-all group">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0A66C2] to-[#0077FF] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#0A66C2] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
