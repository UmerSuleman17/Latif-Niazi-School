"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Shield, MessageCircle, Trophy, Heart } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Quality Education",
    description: "Focused learning designed to build strong academic foundations.",
  },
  {
    icon: Users,
    title: "Experienced Faculty",
    description: "A supportive teaching environment focused on student development.",
  },
  {
    icon: Shield,
    title: "Character Building",
    description: "Helping students develop discipline, responsibility, confidence, and respect.",
  },
  {
    icon: MessageCircle,
    title: "Confidence & Communication",
    description: "Encouraging students to express themselves and participate actively.",
  },
  {
    icon: Trophy,
    title: "Co-Curricular Activities",
    description: "Opportunities for students to explore interests beyond the classroom.",
  },
  {
    icon: Heart,
    title: "Supportive Environment",
    description: "A learning environment where students can grow academically and personally.",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function WhyChooseUs() {
  return (
    <section id="facilities" className="relative w-full py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase mb-4">
            WHY LATIF NIAZI MEMORIAL
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
            More Than Education. A Strong Foundation for Life.
          </h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto mt-6"></div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl border border-navy-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-gold-400/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-gold-500" />
              </div>
              <h4 className="text-xl font-bold text-navy-900 mt-4">
                {feature.title}
              </h4>
              <p className="text-navy-600 text-sm leading-relaxed mt-2">
                {feature.description}
              </p>
              <div className="w-8 h-0.5 bg-gold-400 mt-6 transition-all duration-300 group-hover:w-12"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
