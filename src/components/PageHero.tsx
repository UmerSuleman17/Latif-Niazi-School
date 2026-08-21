'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Breadcrumb {
  label: string
  href: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  eyebrow: string
  breadcrumbs: Breadcrumb[]
}

export default function PageHero({ title, subtitle, eyebrow, breadcrumbs }: PageHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="relative overflow-hidden py-32 md:py-40 bg-navy-gradient">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-30 pointer-events-none" />

      {/* Subtle decorative gold elements */}
      <div className="absolute top-20 left-[15%] w-3 h-3 rounded-full bg-gold-400/20" />
      <div className="absolute bottom-20 right-[15%] w-4 h-4 rounded-full bg-gold-400/20" />
      <div className="absolute top-40 right-[25%] w-16 h-px bg-gold-400/20 transform rotate-45" />

      <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumbs */}
          <motion.nav variants={itemVariants} className="flex items-center justify-center gap-2 mb-8 text-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <div key={crumb.href} className="flex items-center gap-2">
                  <Link 
                    href={crumb.href}
                    className={`transition-colors hover:text-white ${isLast ? 'text-white font-medium' : 'text-white/60'}`}
                  >
                    {crumb.label}
                  </Link>
                  {!isLast && (
                    <span className="text-white/40">/</span>
                  )}
                </div>
              )
            })}
          </motion.nav>

          {/* Eyebrow */}
          <motion.span variants={itemVariants} className="block text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase mb-4">
            {eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h1 variants={itemVariants} className="text-white text-4xl md:text-5xl font-bold">
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-white/70 text-lg mt-4 max-w-2xl mx-auto">
            {subtitle}
          </motion.p>

          {/* Gold line */}
          <motion.div variants={itemVariants} className="w-16 h-1 bg-gold-400 mx-auto mt-6" />
        </motion.div>
      </div>
    </section>
  )
}
