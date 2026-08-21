'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-navy-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-visible"
          >
            {/* Gold decorative element behind image */}
            <div className="absolute w-24 h-24 bg-gold-400/20 -bottom-4 -right-4 rounded-lg -z-10" />
            
            <div className="relative rounded-lg shadow-xl overflow-hidden aspect-[4/3] bg-gray-100">
              <Image 
                src="/images/students/classroom.png" 
                alt="Students in a classroom at LNMHS" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase mb-3">
              About Our School
            </p>
            <h2 className="text-navy-900 text-3xl md:text-4xl font-bold leading-tight mb-4">
              A Legacy of Learning Since 1977
            </h2>
            
            <div className="w-16 h-1 bg-gold-400 my-6 rounded-full" />
            
            <div className="flex flex-col gap-4 text-gray-700 text-lg">
              <p>
                Latif Niazi Memorial Higher Secondary School has been a beacon of academic excellence for over four decades. Founded on the principles of dedication, integrity, and holistic development, we have shaped the minds of generations.
              </p>
              <p>
                We believe that education goes beyond textbooks. Our experienced faculty is committed to providing a nurturing environment where students are encouraged to think critically, innovate, and excel both academically and personally, preparing them for the challenges of tomorrow.
              </p>
            </div>

            <div className="mt-8">
              <Link 
                href="/about" 
                className="inline-flex items-center text-navy-700 hover:text-gold-500 font-semibold group transition-colors duration-300"
              >
                Learn More About Us
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
