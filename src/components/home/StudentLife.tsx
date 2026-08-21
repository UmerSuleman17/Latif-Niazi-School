'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const activities = [
  {
    image: '/images/students/sports.png',
    title: 'Sports & Athletics',
    description: 'Cricket, football, and indoor sports for physical development.',
  },
  {
    image: '/images/students/competition.png',
    title: 'Competitions',
    description: 'Academic and co-curricular competitions to nurture talent.',
  },
  {
    image: '/images/students/activities.png',
    title: 'Creative Activities',
    description: 'Art, debate, and creative expression opportunities.',
  },
  {
    image: '/images/events/school-event.png',
    title: 'Cultural Events',
    description: 'Annual events and celebrations that build community.',
  },
  {
    image: '/images/campus/library.png',
    title: 'Reading & Research',
    description: 'Library access and reading programs for all students.',
  },
  {
    image: '/images/staff/teachers.png',
    title: 'Mentorship',
    description: 'Guidance from experienced teachers beyond academics.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function StudentLife() {
  return (
    <section id="student-life" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-white to-navy-50/30 overflow-hidden">
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
              STUDENT LIFE
            </span>
            <h2 className="text-navy-900 text-3xl md:text-4xl font-bold mt-4 mb-6">
              Learning Doesn't Stop at the Classroom
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Activity Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group rounded-xl overflow-hidden h-[300px]"
            >
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent transition-colors duration-500 group-hover:from-navy-900/80" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-gold-400/20 text-gold-400 border border-gold-400/30 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                  Activity
                </span>
                <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
