"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Contact", href: "#contact" },
    ],
    services: [
      { name: "AI Solutions", href: "#services" },
      { name: "3D Development", href: "#services" },
      { name: "Cloud Services", href: "#services" },
      { name: "Consulting", href: "#services" },
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Case Studies", href: "#cases" },
      { name: "Whitepapers", href: "#papers" },
      { name: "Support", href: "#support" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", Icon: Linkedin, href: "#" },
    { name: "Twitter", Icon: Twitter, href: "#" },
    { name: "GitHub", Icon: Github, href: "#" },
    { name: "Instagram", Icon: Instagram, href: "#" },
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">CREATZION</h3>
              <p className="text-slate-600 leading-relaxed max-w-md">
                Building the future of technology with innovative AI solutions,
                immersive 3D experiences, and next-generation cloud infrastructure.
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
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
          className="bg-slate-50 p-8 rounded-2xl mb-12 border border-slate-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Stay Updated
              </h4>
              <p className="text-slate-600">
                Get the latest insights on technology and innovation.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                suppressHydrationWarning
                className="bg-white px-6 py-3 rounded-xl text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all flex-1 md:w-80 border border-slate-200"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 hover:bg-slate-800 px-8 py-3 rounded-xl text-white font-bold whitespace-nowrap transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
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
    </footer>
  );
}
