"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Heart, Lightbulb, TrendingUp, Globe, Award, Briefcase } from "lucide-react";

export default function Careers() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const values = [
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives to drive innovation."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about technology and committed to making a meaningful impact."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We encourage creative thinking and embrace new ideas to solve complex challenges."
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "We invest in our people's development and provide opportunities to advance their careers."
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Work with teams across the world and expand your professional network."
    },
    {
      icon: Award,
      title: "Recognition & Rewards",
      description: "Your contributions are valued and rewarded with competitive compensation."
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and comprehensive wellness programs."
    },
    {
      icon: Lightbulb,
      title: "Learning & Development",
      description: "Continuous learning opportunities and professional development programs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FB] to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0077FF]/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#0056b3] to-[#0077FF] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Work at the Heart of Change
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join a team that's shaping the future of technology. Everything that makes you who you are is welcome here.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link href="/careers/jobs">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0, 119, 255, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-[#0056b3] to-[#0077FF] text-white px-10 py-5 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
                >
                  Search Open Roles
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Culture Section with Images */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B1320]">
              Our Culture & Environment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A place where innovation meets collaboration, and every voice matters
            </p>
          </motion.div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0056b3]/80 to-transparent z-10" />
              <Image
                src="/team-collaboration.jpg"
                alt="Team Collaboration"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-3xl font-bold mb-2">Collaborative Workspace</h3>
                <p className="text-lg opacity-90">Where great ideas come to life</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0077FF]/80 to-transparent z-10" />
              <Image
                src="/work-culture.jpg"
                alt="Work Culture"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-3xl font-bold mb-2">Innovation Hub</h3>
                <p className="text-lg opacity-90">Empowering creativity and growth</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F7F9FB]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B1320]">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 20px 40px -10px rgba(0, 119, 255, 0.2)" }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0056b3] to-[#0077FF] rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#0B1320]">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-[#F7F9FB]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B1320]">
              Why Join Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We invest in our people because they are our greatest asset
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex gap-6 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0056b3] to-[#0077FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[#0B1320]">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Success Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B1320]">
                You Belong Here
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Creatzion, we celebrate diversity and create an inclusive environment where everyone can thrive. 
                Your unique perspective and experiences are what make our team stronger.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#0077FF] rounded-full mt-2" />
                  <p className="text-gray-700">Inclusive and supportive work environment</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#0077FF] rounded-full mt-2" />
                  <p className="text-gray-700">Opportunities for career advancement and skill development</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#0077FF] rounded-full mt-2" />
                  <p className="text-gray-700">Collaborative culture that values every contribution</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/team-success.jpg"
                alt="Team Success"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0056b3] to-[#0077FF] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              We Are Everywhere
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join a global team making an impact worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { number: "500+", label: "Team Members Worldwide" },
              { number: "50+", label: "Countries with Presence" },
              { number: "1000+", label: "Projects Delivered" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-4">{stat.number}</div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0B1320]">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Explore our open positions and find your perfect role
            </p>
            <Link href="/careers/jobs">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0, 119, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-[#0056b3] to-[#0077FF] text-white px-12 py-6 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
              >
                View All Opportunities
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
