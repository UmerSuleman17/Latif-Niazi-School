"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const images = [
  { src: "/images/campus/exterior.png", alt: "Campus Exterior", label: "Campus", caption: "Our main campus building — a landmark in Latifabad, Hyderabad.", span: "md:col-span-2 md:row-span-2", height: "h-64 md:h-auto min-h-[250px] md:min-h-[524px]" },
  { src: "/images/students/classroom.png", alt: "Classroom", label: "Classroom", caption: "Modern classrooms designed for focused and interactive learning.", span: "md:col-span-1 md:row-span-1", height: "h-64 md:h-[250px]" },
  { src: "/images/campus/library.png", alt: "Library", label: "Library", caption: "An extensive library collection for students of all levels.", span: "md:col-span-1 md:row-span-1", height: "h-64 md:h-[250px]" },
  { src: "/images/school/building.png", alt: "School Building", label: "Architecture", caption: "Spacious halls and corridors with a welcoming environment.", span: "md:col-span-1 md:row-span-1", height: "h-64 md:h-[250px]" },
  { src: "/images/students/activities.png", alt: "Student Activities", label: "Activities", caption: "Students engage in co-curricular activities to develop holistically.", span: "md:col-span-1 md:row-span-1", height: "h-64 md:h-[250px]" },
  { src: "/images/events/school-event.png", alt: "School Event", label: "Events", caption: "Regular school events celebrate culture, achievement, and community.", span: "md:col-span-1 md:row-span-1", height: "h-64 md:h-[250px]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function Campus() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx(i => (i === null || i === 0) ? images.length - 1 : i - 1);
  const next = () => setLightboxIdx(i => (i === null) ? 0 : (i + 1) % images.length);

  return (
    <>
      <section className="relative w-full py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase mb-4">
              OUR CAMPUS
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
              A Place to Learn, Grow &amp; Belong
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-6"></div>
            <p className="text-navy-600 text-sm mt-4">Click any photo to explore in full view</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[250px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-xl group bg-navy-50 cursor-pointer ${img.span} ${img.height}`}
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-semibold uppercase tracking-wider rounded">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIdx].src}
                alt={images[lightboxIdx].alt}
                fill
                sizes="(max-width: 768px) 100vw, 75vw"
                className="object-contain rounded-xl"
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full">
                {images[lightboxIdx].caption}
              </span>
              <p className="text-white/40 text-xs mt-2">{lightboxIdx + 1} / {images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
