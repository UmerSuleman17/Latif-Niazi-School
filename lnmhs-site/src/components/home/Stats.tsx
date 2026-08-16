'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatProps {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  start: number;
}

const stats: StatProps[] = [
  { target: 1977, label: 'Established', prefix: '', suffix: '', start: 1900 },
  { target: 48, label: 'Years of Excellence', prefix: '', suffix: '+', start: 0 },
  { target: 1000, label: 'Students', prefix: '', suffix: '+', start: 0 },
  { target: 40, label: 'Experienced Faculty', prefix: '', suffix: '+', start: 0 },
];

const Counter = ({ target, start, suffix = '', prefix = '' }: StatProps) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 2000; // 2 seconds
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Easing out function for smoother finish
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * (target - start) + start);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(step);
    }
  }, [isInView, target, start]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default function Stats() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="bg-white py-16 md:py-20 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={item} className="flex flex-col items-center">
              <div className="w-12 h-1 bg-gold-400 mb-4 rounded-full" />
              <div className="text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
                <Counter {...stat} />
              </div>
              <p className="text-sm text-navy-600 uppercase tracking-wider mt-3 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
