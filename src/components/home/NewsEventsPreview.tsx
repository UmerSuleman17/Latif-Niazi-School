"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, AlertCircle } from 'lucide-react';
import { newsItems, upcomingEvents, getCategoryColor } from '@/data/news';

export default function NewsEventsPreview() {
  const featuredNews = newsItems.find(item => item.featured) || newsItems[0];
  const latestNews = newsItems.filter(item => item.id !== featuredNews.id).slice(0, 3);
  const events = upcomingEvents.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-navy-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div className="max-w-2xl">
            <motion.span variants={itemVariants} className="text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase block mb-3">
              Stay Connected
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-navy-900 text-3xl md:text-4xl font-bold mb-4">
              What's Happening at School?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-navy-600 text-base">
              Stay updated with the latest announcements, achievements, and events happening across our campus.
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="mt-6 md:mt-0 hidden md:block">
            <Link 
              href="/news" 
              className="inline-flex items-center text-navy-700 hover:text-gold-500 font-medium transition-colors group"
            >
              View All News 
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Main Layout: News */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Left: Featured News */}
          <motion.div variants={itemVariants} className="group relative">
            <Link href={`/news/${featuredNews.slug}`} className="block h-full">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5">
                <Image
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(featuredNews.category)}`}>
                    {featuredNews.category}
                  </span>
                  <span className="text-navy-500 text-sm font-medium">
                    {new Date(featuredNews.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-3 group-hover:text-sky-600 transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-navy-600 mb-4 line-clamp-2">
                  {featuredNews.excerpt}
                </p>
                <span className="inline-flex items-center text-navy-800 font-semibold group-hover:text-gold-500 transition-colors">
                  Read More <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Right: Latest Updates */}
          <motion.div variants={itemVariants} className="flex flex-col h-full bg-white rounded-xl border border-navy-100 shadow-sm p-2">
            <div className="divide-y divide-navy-100 flex-grow">
              {latestNews.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/news/${item.slug}`}
                  className="flex items-start gap-4 p-4 hover:bg-navy-50/50 transition-colors group"
                >
                  <div className="relative w-24 h-24 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sky-600 text-xs font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-navy-400 text-xs whitespace-nowrap ml-2">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-navy-900 line-clamp-2 group-hover:text-gold-600 transition-colors mb-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="shrink-0 self-center hidden sm:block">
                    <ArrowRight className="w-5 h-5 text-navy-300 group-hover:text-gold-500 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="p-4 border-t border-navy-100 text-center md:hidden">
              <Link 
                href="/news" 
                className="inline-flex items-center text-navy-700 hover:text-gold-500 font-medium transition-colors"
              >
                View All News 
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Important Announcement Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-navy-900 rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cta-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cta-red"></span>
              </span>
              <span className="text-cta-red font-bold text-xs tracking-wider whitespace-nowrap">
                IMPORTANT NOTICE
              </span>
            </div>
            <p className="text-white/90 text-sm md:text-base font-medium">
              Admissions for Academic Year 2026-2027 are now open. Apply before September 30th.
            </p>
          </div>
          <Link 
            href="/admissions" 
            className="shrink-0 bg-white text-navy-900 hover:bg-gold-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto text-center"
          >
            View Notice →
          </Link>
        </motion.div>

        {/* Upcoming Events Subsection */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mt-16 md:mt-24"
        >
          <div className="mb-8">
            <motion.span variants={itemVariants} className="text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase block mb-2">
              Mark Your Calendar
            </motion.span>
            <motion.h3 variants={itemVariants} className="text-navy-900 text-2xl md:text-3xl font-bold">
              Upcoming Events
            </motion.h3>
          </div>

          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory hide-scrollbar">
            {events.map((event) => (
              <motion.div 
                key={event.id}
                variants={itemVariants}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-auto bg-white rounded-xl border border-navy-100 shadow-sm p-6 hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-navy-900 text-center p-3 rounded-lg shrink-0 min-w-[70px]">
                    <div className="text-2xl font-bold text-gold-400 leading-none mb-1">{event.day}</div>
                    <div className="text-xs text-white uppercase tracking-wider font-medium">{event.month}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                      {event.title}
                    </h4>
                  </div>
                </div>
                
                <p className="text-sm text-navy-600 mb-6 flex-grow line-clamp-3">
                  {event.description}
                </p>
                
                <div className="flex flex-col gap-2 mb-6">
                  {event.time && (
                    <div className="flex items-center text-xs text-navy-500 font-medium">
                      <Clock className="w-4 h-4 mr-2 text-gold-500" />
                      {event.time}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-xs text-navy-500 font-medium">
                      <MapPin className="w-4 h-4 mr-2 text-gold-500" />
                      {event.location}
                    </div>
                  )}
                </div>
                
                <Link 
                  href={`/events/${event.slug}`}
                  className="inline-flex items-center text-sm font-bold text-navy-800 hover:text-gold-500 transition-colors mt-auto"
                >
                  View Details <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <h4 className="text-lg md:text-xl font-semibold text-navy-900 mb-2">Want to stay updated?</h4>
          <p className="text-navy-600 mb-6">Follow the school for the latest announcements, updates, and news.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#social-media" 
              className="px-6 py-3 rounded-lg border-2 border-navy-900 text-navy-900 font-bold hover:bg-navy-900 hover:text-white transition-colors w-full sm:w-auto text-center"
            >
              Follow Us
            </Link>
            <Link 
              href="/news" 
              className="px-6 py-3 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-700 transition-colors w-full sm:w-auto text-center"
            >
              View All Updates →
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
