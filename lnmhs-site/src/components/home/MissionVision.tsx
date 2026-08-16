'use client';

import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export default function MissionVision() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    }
  };

  return (
    <section className="relative w-full py-20 md:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Mission Card */}
          <motion.div 
            variants={cardVariant}
            className="group bg-navy-900 text-white p-10 md:p-12 rounded-xl border-t-4 border-gold-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 bg-white/5 inline-flex p-4 rounded-full group-hover:bg-gold-400/10 transition-colors">
              <Target className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            <div className="w-12 h-0.5 bg-gold-400 my-5 rounded-full" />
            <p className="text-white/80 text-base leading-relaxed">
              To provide quality education in a supportive environment that encourages curiosity, confidence, discipline, and personal growth.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            variants={cardVariant}
            className="group bg-navy-900 text-white p-10 md:p-12 rounded-xl border-t-4 border-gold-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-6 bg-white/5 inline-flex p-4 rounded-full group-hover:bg-gold-400/10 transition-colors">
              <Eye className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            <div className="w-12 h-0.5 bg-gold-400 my-5 rounded-full" />
            <p className="text-white/80 text-base leading-relaxed">
              To nurture capable, responsible, and confident individuals who are prepared to contribute positively to society and build a successful future.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
