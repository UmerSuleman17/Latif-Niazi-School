'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const highlights = [
  {
    image: '/images/social/add.jpeg',
    category: 'Admissions',
    title: 'Admissions Campaign',
    date: 'February 2024',
  },
  {
    image: '/images/social/news.jpeg',
    category: 'Announcements',
    title: 'School Announcements',
    date: 'January 2024',
  },
  {
    image: '/images/social/eid.jpeg',
    category: 'Celebrations',
    title: 'Eid Celebrations',
    date: 'June 2024',
  },
  {
    image: '/images/social/whatsapp.jpeg',
    category: 'Education',
    title: 'Islamic Education',
    date: 'Ongoing',
  },
  {
    image: '/images/events/school-event.png',
    category: 'Events',
    title: 'Annual Events',
    date: 'December 2023',
  },
  {
    image: '/images/students/activities.png',
    category: 'Activities',
    title: 'Student Activities',
    date: 'Weekly',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Highlights() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase">
              SCHOOL HIGHLIGHTS
            </span>
            <h2 className="text-navy-900 text-3xl md:text-4xl font-bold mt-4 mb-6">
              Life at Latif Niazi Memorial
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-navy-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-sky-blue uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs text-navy-400">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold-500 transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
