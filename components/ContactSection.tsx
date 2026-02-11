"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setIsSubmitted(false), 4000);
        }, 1500);
    };

    return (
        <section className="relative bg-white py-24 lg:py-32">

            {/* Subtle brand-colored background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#007bff]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0056b3]/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <div className="inline-block mb-4">
                        <span className="text-sm font-semibold text-[#007bff] uppercase tracking-wider">Contact Us</span>
                        <div className="h-0.5 w-12 bg-[#007bff] mt-2" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Get in touch
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">

                        <div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-[#0056b3]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Email</h3>
                                    <a href="mailto:hello@creatzion.com" className="text-gray-600 hover:text-[#007bff] transition-colors">
                                        hello@creatzion.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-[#0056b3]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Phone</h3>
                                    <a href="tel:+15551234567" className="text-gray-600 hover:text-[#007bff] transition-colors">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-[#0056b3]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Office</h3>
                                    <p className="text-gray-600">
                                        123 Market Street<br />
                                        San Francisco, CA 94103
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Office hours</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>Monday – Friday: 9am – 6pm</p>
                                <p>Saturday: 10am – 4pm</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 lg:p-10">
                            {isSubmitted ? (
                                <div className="py-12 text-center">
                                    <div className="w-16 h-16 bg-[#007bff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-8 h-8 text-[#007bff]" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message sent</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thanks for reaching out. We'll get back to you soon.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-sm font-semibold text-[#007bff] hover:text-[#0056b3] transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Phone <span className="text-gray-400 font-normal">(optional)</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:border-transparent resize-none transition-all"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-8 py-3.5 bg-[#007bff] hover:bg-[#0056b3] text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                                        >
                                            {isSubmitting ? "Sending..." : "Send message"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}