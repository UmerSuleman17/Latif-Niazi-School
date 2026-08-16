'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, BookOpen, Users, ClipboardList, GraduationCap, FileText, Clock, MapPin, Phone, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const steps = [
  { icon: FileText, step: '01', title: 'Collect Form', desc: 'Collect the admission form from the school office during working hours (8am–2pm) or download below.' },
  { icon: ClipboardList, step: '02', title: 'Submit Documents', desc: 'Submit filled form with required documents: Birth Certificate, Previous Result, 4 passport photos.' },
  { icon: Users, step: '03', title: 'Assessment', desc: 'Students appear for a short written assessment to determine appropriate class placement.' },
  { icon: CheckCircle2, step: '04', title: 'Confirmation', desc: 'Successful candidates receive an offer letter. Pay the fee to confirm your seat.' },
];

const programs = [
  {
    level: 'Nursery & KG',
    age: 'Age 3–5',
    color: 'from-amber-400 to-amber-600',
    subjects: ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamic Studies', 'Drawing & Craft'],
  },
  {
    level: 'Primary (Cls 1–5)',
    age: 'Age 6–10',
    color: 'from-sky-400 to-sky-600',
    subjects: ['English', 'Urdu', 'Mathematics', 'Science', 'Social Studies', 'Islamic Studies', 'Computer'],
  },
  {
    level: 'Secondary (Cls 6–10)',
    age: 'Age 11–15',
    color: 'from-[#0a2244] to-[#1a3a6e]',
    subjects: ['English', 'Urdu', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer', 'Pakistan Studies', 'Islamiat'],
  },
  {
    level: 'Higher Secondary (XI–XII)',
    age: 'Age 16–18',
    color: 'from-[#DDA63A] to-amber-700',
    tracks: [
      { name: 'Pre-Medical', subjects: ['Biology', 'Chemistry', 'Physics', 'English', 'Urdu'] },
      { name: 'Pre-Engineering', subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Urdu'] },
      { name: 'Computer Science', subjects: ['Computer Science', 'Mathematics', 'Physics', 'English', 'Urdu'] },
    ],
  },
];

type FormData = { name: string; father: string; dob: string; level: string; phone: string; email: string; address: string };
type FormStep = 1 | 2 | 3;

export default function AdmissionsPage() {
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', father: '', dob: '', level: 'Nursery & KG', phone: '', email: '', address: '' });

  const handleChange = (field: keyof FormData, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (formStep < 3) setFormStep((formStep + 1) as FormStep);
    else { setSubmitted(true); }
  };

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a2244] text-sm bg-white";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a2244] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#DDA63A_0%,_transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#DDA63A]/40 text-[#DDA63A] text-xs tracking-widest font-semibold uppercase mb-6">
              Academic Year 2026–2027
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">Admissions Now Open</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Join the LNMHS family. Secure your child's place in one of Hyderabad's most trusted academic institutions.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20 w-full">

        {/* Admission Process */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0a2244]">How to Apply</h2>
            <div className="w-12 h-1 bg-[#DDA63A] rounded mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative"
              >
                <div className="w-12 h-12 bg-[#0a2244] rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-[#DDA63A]" />
                </div>
                <span className="text-4xl font-black text-gray-100 absolute top-4 right-5">{s.step}</span>
                <h3 className="font-bold text-[#0a2244] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Programs & Curriculum */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0a2244]">Academic Programs</h2>
            <div className="w-12 h-1 bg-[#DDA63A] rounded mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className={`bg-gradient-to-r ${prog.color} p-4 text-white flex justify-between items-center`}>
                  <div>
                    <h3 className="font-bold text-lg">{prog.level}</h3>
                    <p className="text-white/80 text-sm">{prog.age}</p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-white/60" />
                </div>
                <div className="p-5">
                  {prog.subjects ? (
                    <div className="flex flex-wrap gap-2">
                      {prog.subjects.map(sub => (
                        <span key={sub} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">{sub}</span>
                      ))}
                    </div>
                  ) : prog.tracks ? (
                    <div className="space-y-3">
                      {prog.tracks.map(track => (
                        <div key={track.name}>
                          <p className="text-xs font-bold text-[#0a2244] uppercase tracking-wide mb-1.5">{track.name}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {track.subjects.map(sub => (
                              <span key={sub} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">{sub}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Important Info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Clock, title: 'Office Hours', lines: ['Monday – Saturday', '8:00 AM – 2:00 PM', 'Closed on Sundays & Public Holidays'] },
            { icon: MapPin, title: 'School Address', lines: ['Latif Niazi Memorial HSS', 'Latifabad, Hyderabad', 'Sindh, Pakistan'] },
            { icon: Phone, title: 'Contact Us', lines: ['+92-22-XXXXXXX', 'admissions@lnmhs.edu.pk', 'Walk-ins welcome during office hours'] },
          ].map((info, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex gap-4">
              <div className="w-10 h-10 bg-[#0a2244] rounded-xl flex items-center justify-center shrink-0">
                <info.icon className="w-5 h-5 text-[#DDA63A]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0a2244] mb-2">{info.title}</h3>
                {info.lines.map(line => <p key={line} className="text-sm text-gray-500">{line}</p>)}
              </div>
            </div>
          ))}
        </section>

        {/* Online Inquiry Form */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#0a2244] px-6 py-5">
            <h2 className="text-white font-bold text-xl">Online Admission Inquiry</h2>
            <p className="text-white/60 text-sm mt-1">Fill in the form below and we'll contact you within 24 hours.</p>
          </div>

          <div className="p-6 md:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0a2244] mb-2">Inquiry Submitted!</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Thank you. Our admissions team will contact you within 24 hours on the provided number.</p>
                <button onClick={() => { setSubmitted(false); setFormStep(1); setFormData({ name: '', father: '', dob: '', level: 'Nursery & KG', phone: '', email: '', address: '' }); }}
                  className="text-[#0a2244] text-sm font-semibold underline underline-offset-2">Submit another inquiry</button>
              </motion.div>
            ) : (
              <>
                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="flex items-center gap-2 flex-1 last:flex-none">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${formStep >= n ? 'bg-[#0a2244] text-white' : 'bg-gray-100 text-gray-400'}`}>{n}</div>
                      {n < 3 && <div className={`flex-1 h-0.5 transition-colors ${formStep > n ? 'bg-[#0a2244]' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {formStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="font-semibold text-gray-800 mb-4">Student Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={labelCls}>Student's Full Name *</label><input className={inputCls} value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder="Enter full name" /></div>
                        <div><label className={labelCls}>Father's Name *</label><input className={inputCls} value={formData.father} onChange={e => handleChange('father', e.target.value)} placeholder="Father's full name" /></div>
                        <div><label className={labelCls}>Date of Birth *</label><input type="date" className={inputCls} value={formData.dob} onChange={e => handleChange('dob', e.target.value)} /></div>
                        <div>
                          <label className={labelCls}>Applying For *</label>
                          <select className={inputCls} value={formData.level} onChange={e => handleChange('level', e.target.value)}>
                            {['Nursery & KG', 'Primary (Class 1–5)', 'Secondary (Class 6–10)', 'Higher Secondary (Class XI–XII)'].map(l => <option key={l}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="font-semibold text-gray-800 mb-4">Parent / Guardian Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={labelCls}>Phone Number *</label><input className={inputCls} value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="e.g. 0300-1234567" /></div>
                        <div><label className={labelCls}>Email Address</label><input type="email" className={inputCls} value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="Optional" /></div>
                      </div>
                      <div><label className={labelCls}>Home Address</label><textarea className={`${inputCls} resize-none`} rows={3} value={formData.address} onChange={e => handleChange('address', e.target.value)} placeholder="Street, Area, City" /></div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                      <h3 className="font-semibold text-gray-800 mb-4">Review & Confirm</h3>
                      <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm">
                        {[
                          ['Student Name', formData.name],
                          ["Father's Name", formData.father],
                          ['Date of Birth', formData.dob],
                          ['Applying For', formData.level],
                          ['Phone', formData.phone],
                          ['Email', formData.email || '—'],
                          ['Address', formData.address || '—'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between items-start gap-4">
                            <span className="text-gray-500 shrink-0 w-32">{k}</span>
                            <span className="text-gray-900 font-medium text-right">{v}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400">By submitting, you agree to be contacted by LNMHS admissions team.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  {formStep > 1 ? (
                    <button onClick={() => setFormStep((formStep - 1) as FormStep)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                  ) : <div />}
                  <button
                    onClick={handleNext}
                    disabled={formStep === 1 && (!formData.name || !formData.father || !formData.dob)}
                    className="flex items-center gap-2 bg-[#0a2244] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0d2d5e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {formStep === 3 ? 'Submit Inquiry' : 'Continue'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
