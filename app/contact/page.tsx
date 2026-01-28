"use client";

import Navbar from "@/components/Navbar";
import ContactUsContent from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactUsContent />
      <Footer />
    </main>
  );
}
