'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdmissionsCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-navy-gradient-soft">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-30 pointer-events-none" />

      {/* Decorative text */}
      <div className="absolute top-0 right-10 md:right-20 text-[200px] font-extrabold text-navy-800/30 select-none pointer-events-none leading-none">
        48+
      </div>

      {/* Decorative gold dots */}
      <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-gold-400/20" />
      <div className="absolute bottom-20 left-[20%] w-3 h-3 rounded-full bg-gold-400/20" />
      <div className="absolute top-40 right-[15%] w-2.5 h-2.5 rounded-full bg-gold-400/20" />
      <div className="absolute bottom-32 right-[25%] w-2 h-2 rounded-full bg-gold-400/20" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-white text-3xl md:text-5xl font-bold">
            Give Your Child a Stronger Start.
          </h2>
          
          <div className="w-16 h-1 bg-gold-400 mx-auto my-6" />
          
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Admissions are open. Discover a learning environment built around education, confidence, and character.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/admissions"
              className="bg-cta-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-cta-red-dark transition-colors"
            >
              Apply for Admission
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact the School
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
