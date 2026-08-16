'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.png"
          alt="LNMHS Campus"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Navy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 to-navy-900/60" />
        {/* Pattern overlay for subtle texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-32 md:mt-16">
        <motion.div
          className="max-w-4xl flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-gold-400/50 text-gold-400 text-xs tracking-widest font-semibold uppercase bg-navy-900/40 backdrop-blur-sm">
              Established 1977
            </span>
          </motion.div>

          {/* Urdu Motto */}
          <motion.p
            variants={itemVariants}
            className="text-gold-300/80 text-xl md:text-2xl font-urdu mb-4 tracking-wide"
            dir="rtl"
          >
            علم بڑی دولت ہے
          </motion.p>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            <span className="block">Building Confidence.</span>
            <span className="block text-white/90">Shaping Futures.</span>
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.p variants={itemVariants} className="text-white/70 max-w-2xl text-base md:text-lg lg:text-xl mb-10 leading-relaxed font-light">
            Empowering students with quality education, moral values, and academic excellence for a brighter tomorrow at Latif Niazi Memorial Higher Secondary School.
          </motion.p>

          {/* Gold accent line */}
          <motion.div variants={itemVariants} className="w-20 h-0.5 bg-gold-400 mb-10 rounded-full" />

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/admissions" className="w-full sm:w-auto">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="w-full sm:w-auto bg-cta-red hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg shadow-cta-red/20"
              >
                Admissions Open
              </motion.button>
            </Link>
            <Link href="#about" className="w-full sm:w-auto">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="w-full sm:w-auto bg-navy-800/80 hover:bg-navy-700 text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg border border-navy-500/30 backdrop-blur-sm"
              >
                Explore Our School
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
        className="relative sm:absolute mt-12 sm:mt-0 bottom-auto sm:bottom-16 lg:bottom-24 sm:right-8 lg:right-16 bg-navy-800/90 backdrop-blur-md border border-gold-400/30 p-5 rounded-2xl shadow-2xl flex flex-col items-center justify-center z-20"
      >
        <span className="text-gold-400 font-bold text-4xl mb-1">48+</span>
        <span className="text-sm text-white/80 font-medium">Years of Excellence</span>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/60 w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
