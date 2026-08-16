'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, shouldReduceMotion ? 500 : 2200);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950 overflow-hidden"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="relative flex flex-col items-center justify-center w-full max-w-lg px-6">
            
            {/* Logo container with SVG Ring */}
            <div className="relative flex items-center justify-center mb-10">
              {/* SVG Ring */}
              <motion.svg
                className="absolute w-[180px] h-[180px] text-gold-400/40"
                viewBox="0 0 180 180"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -90 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 270 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
              >
                <motion.circle
                  cx="90"
                  cy="90"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="503"
                  initial={shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: 503 }}
                  animate={shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: 0 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                />
              </motion.svg>

              {/* Logo */}
              <motion.div
                className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden bg-white z-10"
                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src="/images/logo/logo.jpeg"
                  alt="LNMHS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Typography */}
            <motion.h1
              className="text-white text-center text-sm md:text-base uppercase font-semibold tracking-[0.15em] mb-3"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Latif Niazi Memorial Higher Secondary School
            </motion.h1>

            <motion.p
              className="text-gold-400 text-xs tracking-wider mb-8 font-medium"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              ESTABLISHED 1977
            </motion.p>

            {/* Progress Line */}
            <div className="w-full max-w-xs md:max-w-sm h-[2px] bg-gold-400/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold-400"
                initial={shouldReduceMotion ? { width: '100%' } : { width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.9 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
