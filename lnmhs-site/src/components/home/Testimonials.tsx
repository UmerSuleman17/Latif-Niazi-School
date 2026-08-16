'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const testimonials = [
  {
    quote: "Add an authentic parent/student testimonial here. This placeholder should be replaced with a real review from a parent, student, or community member.",
    name: "Parent / Student Name",
    role: "Parent",
  },
  {
    quote: "Add an authentic parent/student testimonial here. This placeholder should be replaced with a real review from a parent, student, or community member.",
    name: "Parent / Student Name",
    role: "Alumni",
  },
  {
    quote: "Add an authentic parent/student testimonial here. This placeholder should be replaced with a real review from a parent, student, or community member.",
    name: "Parent / Student Name",
    role: "Student",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase">
              TESTIMONIALS
            </span>
            <h2 className="text-navy-900 text-3xl md:text-4xl font-bold mt-4 mb-6">
              What Our Community Says
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white p-8 rounded-xl shadow-md border border-navy-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative"
            >
              <div className="mb-6">
                <span className="text-5xl text-gold-300 font-serif leading-none absolute top-4 left-6 opacity-40">
                  &ldquo;
                </span>
                <p className="text-navy-700 italic relative z-10 pt-4 text-sm leading-relaxed flex-grow">
                  "{item.quote}"
                </p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-navy-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center text-navy-400 shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-navy-500 mt-0.5">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
