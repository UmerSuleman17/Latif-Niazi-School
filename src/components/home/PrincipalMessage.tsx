'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PrincipalMessage() {
  return (
    <section className="py-20 md:py-28 bg-navy-50/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/staff/principal.png"
                alt="Principal"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="w-full h-2 bg-gradient-to-r from-gold-400 to-gold-300 mt-4 rounded-full" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-3"
          >
            <span className="text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase block mb-4">
              MESSAGE FROM THE PRINCIPAL
            </span>
            <h2 className="text-navy-900 text-3xl md:text-4xl font-bold mb-6">
              Preparing Students for a Changing World
            </h2>
            <div className="w-16 h-1 bg-gold-400 mb-8 rounded-full" />
            
            <div className="relative">
              <span className="absolute -top-10 -left-6 text-6xl text-gold-300/40 font-serif leading-none">
                &ldquo;
              </span>
              <p className="text-navy-700 text-lg leading-relaxed mb-6 relative z-10">
                At Latif Niazi Memorial Higher Secondary School, we believe that education extends far beyond the pages of a textbook. Our mission is to foster an environment where academic excellence goes hand-in-hand with moral and personal growth. We are dedicated to nurturing well-rounded individuals who are not only prepared for higher education but are also equipped with the character and resilience needed to thrive in a rapidly changing world.
              </p>
              <p className="text-navy-700 text-lg leading-relaxed mb-8 relative z-10">
                Through our comprehensive curriculum, dedicated teaching staff, and emphasis on core values, we strive to unlock the unique potential within every student, guiding them toward a bright and successful future.
              </p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-navy-900">Principal</h4>
              <p className="text-sm text-navy-600 mt-1">Latif Niazi Memorial Higher Secondary School</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
