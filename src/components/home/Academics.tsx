"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, BookOpen, FlaskConical, GraduationCap } from "lucide-react";

const tabs = [
  {
    id: "nursery",
    icon: Baby,
    title: "Nursery & KG",
    age: "Age 3–5",
    color: "from-amber-400 to-amber-500",
    description: "Building early confidence, curiosity, and foundational learning through play-based activities.",
    subjects: ["English", "Urdu", "Mathematics", "General Knowledge", "Islamic Studies", "Drawing & Craft", "Nazra Quran"],
    highlights: ["Experienced early-childhood teachers", "Safe & nurturing classrooms", "Parent-teacher communication"],
  },
  {
    id: "primary",
    icon: BookOpen,
    title: "Primary (Cls 1–5)",
    age: "Age 6–10",
    color: "from-sky-400 to-sky-600",
    description: "Developing essential academic, social, and critical thinking skills across core subjects.",
    subjects: ["English", "Urdu", "Mathematics", "Science", "Social Studies", "Islamic Studies", "Computer Basics"],
    highlights: ["Regular assessments & feedback", "Activity-based learning", "Library access"],
  },
  {
    id: "secondary",
    icon: FlaskConical,
    title: "Secondary (Cls 6–10)",
    age: "Age 11–15",
    color: "from-navy-600 to-navy-800",
    description: "Strengthening knowledge, critical thinking, and independent learning to prepare for matriculation.",
    subjects: ["English", "Urdu", "Mathematics", "Physics", "Chemistry", "Biology", "Computer", "Pakistan Studies", "Islamiat"],
    highlights: ["Board exam preparation", "Lab facilities", "Career counseling sessions"],
  },
  {
    id: "higher",
    icon: GraduationCap,
    title: "Higher Secondary (XI–XII)",
    age: "Age 16–18",
    color: "from-gold-500 to-gold-700",
    description: "Preparing students for higher education and professional careers through specialized subject tracks.",
    tracks: [
      { name: "Pre-Medical", icon: "🔬", subjects: ["Biology", "Chemistry", "Physics", "English", "Urdu"] },
      { name: "Pre-Engineering", icon: "⚙️", subjects: ["Mathematics", "Physics", "Chemistry", "English", "Urdu"] },
      { name: "Computer Science", icon: "💻", subjects: ["Computer Science", "Mathematics", "Physics", "English", "Urdu"] },
    ],
    highlights: ["University admission guidance", "Past paper practice", "Experienced HSC faculty"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Academics() {
  const [activeTab, setActiveTab] = useState("nursery");
  const active = tabs.find(t => t.id === activeTab)!;

  return (
    <section id="academics" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-navy-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-sm font-semibold tracking-[0.2em] text-gold-400 uppercase mb-4">
            ACADEMIC PROGRAMS
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
            Learning for Every Stage
          </h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto mt-6"></div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-navy-900 text-white border-navy-900 shadow-md"
                  : "bg-white text-navy-700 border-navy-200 hover:border-navy-400 hover:bg-navy-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.title}</span>
              <span className="sm:hidden">{tab.age}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${active.color} p-6 md:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <active.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{active.title}</h3>
                  <p className="text-white/80 text-sm">{active.age}</p>
                </div>
              </div>
              <p className="text-white/80 text-sm max-w-sm leading-relaxed">{active.description}</p>
            </div>

            <div className="p-6 md:p-8">
              {/* Subjects Grid or Tracks */}
              {'subjects' in active && active.subjects && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">Core Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {active.subjects.map(sub => (
                      <span key={sub} className="px-3 py-1.5 bg-navy-50 text-navy-800 text-sm font-medium rounded-full border border-navy-100">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {'tracks' in active && active.tracks && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-4">Subject Tracks</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {active.tracks.map(track => (
                      <div key={track.name} className="bg-navy-50 rounded-xl p-4 border border-navy-100">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{track.icon}</span>
                          <h5 className="font-bold text-navy-900 text-sm">{track.name}</h5>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {track.subjects.map(sub => (
                            <span key={sub} className="text-xs px-2 py-0.5 bg-white text-navy-700 rounded-full border border-navy-200">{sub}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">Program Highlights</h4>
                <div className="flex flex-wrap gap-4">
                  {active.highlights.map(h => (
                    <div key={h} className="flex items-center gap-2 text-sm text-navy-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick overview cards below */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              variants={itemVariants}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-navy-900 bg-navy-900"
                  : "border-navy-100 bg-white hover:border-navy-300 hover:shadow-md"
              }`}
            >
              <div className={`h-1 w-full rounded-full bg-gradient-to-r ${tab.color} mb-3`}></div>
              <tab.icon className={`w-5 h-5 mb-2 ${activeTab === tab.id ? "text-gold-400" : "text-navy-600"}`} />
              <h4 className={`text-sm font-bold leading-tight ${activeTab === tab.id ? "text-white" : "text-navy-900"}`}>{tab.title}</h4>
              <p className={`text-xs mt-0.5 ${activeTab === tab.id ? "text-white/60" : "text-navy-500"}`}>{tab.age}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
