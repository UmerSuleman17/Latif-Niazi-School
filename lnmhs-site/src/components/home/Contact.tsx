'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm tracking-[0.2em] font-semibold uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="text-navy-900 text-3xl md:text-4xl font-bold">
            We Would Love to Hear From You
          </h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Info Cards */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-1">Address</h3>
                <p className="text-navy-600">
                  Banglow#2, Block-D Near PSO Pump unit#11, Latifabad, Hyderabad, Sindh, Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-1">Phone</h3>
                <p className="text-navy-600">
                  0333-2734649 | 0340-3234429
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-1">Email</h3>
                <p className="text-navy-600">
                  info@latifniazischool.com (placeholder)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-500 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-1">School Hours</h3>
                <p className="text-navy-600">
                  Monday - Saturday: 8:00 AM - 2:00 PM
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-navy-100 rounded-xl h-48 flex flex-col items-center justify-center text-navy-500">
              <MapPin className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm font-medium">Google Maps will be integrated here</span>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Send us a Message</h3>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1" htmlFor="name">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1" htmlFor="phone">
                  Phone
                </label>
                <input 
                  type="tel" 
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition"
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-navy-900 text-white py-4 rounded-lg font-semibold hover:bg-navy-800 transition-colors mt-4"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
