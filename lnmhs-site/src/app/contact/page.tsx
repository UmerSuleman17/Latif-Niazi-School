'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const contactDetails = [
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+92-22-XXXXXXX', '+92-300-XXXXXXX'],
    sub: 'Monday to Saturday, 8am – 2pm',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@lnmhs.edu.pk', 'admissions@lnmhs.edu.pk'],
    sub: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Address',
    lines: ['Latif Niazi Memorial Higher Secondary School', 'Latifabad, Hyderabad, Sindh, Pakistan'],
    sub: 'Near Latifabad Unit 6',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon – Sat: 8:00 AM – 2:00 PM'],
    sub: 'Closed on Sundays & Public Holidays',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a2244] text-sm bg-white transition-shadow";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a2244] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#DDA63A_0%,_transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#DDA63A]/40 text-[#DDA63A] text-xs tracking-widest font-semibold uppercase mb-6">
              Get In Touch
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">Contact Us</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Have a question about admissions, academics, or school life? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-16 w-full">

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactDetails.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="w-11 h-11 bg-[#0a2244] rounded-xl flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-[#DDA63A]" />
              </div>
              <h3 className="font-bold text-[#0a2244] mb-2">{c.title}</h3>
              {c.lines.map(line => <p key={line} className="text-sm text-gray-700">{line}</p>)}
              <p className="text-xs text-gray-400 mt-2">{c.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Map + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Embed */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#0a2244] px-6 py-4">
              <h2 className="text-white font-bold">Find Us</h2>
              <p className="text-white/60 text-sm">Latifabad, Hyderabad, Sindh</p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <iframe
                title="LNMHS Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115432.39703936252!2d68.27539!3d25.3960!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c775e1d4e3df1%3A0x4d37c2b23c0a5aaa!2sLatifabad%2C%20Hyderabad%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#0a2244] px-6 py-4">
              <h2 className="text-white font-bold">Send a Message</h2>
              <p className="text-white/60 text-sm">We'll get back to you within 24 hours</p>
            </div>

            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a2244] mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Thank you for reaching out. Our team will respond to you soon.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="text-[#0a2244] text-sm font-semibold underline underline-offset-2">Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Name *</label>
                      <input required className={inputCls} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone</label>
                      <input className={inputCls} value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="Phone number" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                    <input type="email" className={inputCls} value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject *</label>
                    <select required className={inputCls} value={form.subject} onChange={e => handleChange('subject', e.target.value)}>
                      <option value="">Select a subject</option>
                      <option>Admission Inquiry</option>
                      <option>Fee Structure</option>
                      <option>Academic Information</option>
                      <option>Facilities & Campus</option>
                      <option>General Question</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message *</label>
                    <textarea required className={`${inputCls} resize-none`} rows={4} value={form.message} onChange={e => handleChange('message', e.target.value)} placeholder="How can we help you?" />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#0a2244] text-white py-3 rounded-xl font-semibold hover:bg-[#0d2d5e] transition-colors text-sm"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
