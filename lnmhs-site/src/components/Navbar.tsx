"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Academics", href: "#academics" },
  { name: "Facilities", href: "#facilities" },
  { name: "Student Life", href: "#student-life" },
  { name: "News & Events", href: "/news" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 z-50">
            <a href="/" className="flex items-center gap-3">
              <div className="relative w-[50px] h-[50px]">
                <Image
                  src="/images/logo/logo.jpeg"
                  alt="LNMHS Logo"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span
                className={`font-bold text-xl hidden sm:block transition-colors duration-300 ${
                  isScrolled || isOpen ? "text-navy-900" : "text-white"
                }`}
              >
                LNMHS
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-semibold text-sm transition-colors duration-300 hover:text-gold-500 ${
                  isScrolled ? "text-navy-900" : "text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/admissions"
              className="bg-cta-red text-white px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl shrink-0"
            >
              Admissions Open
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled || isOpen ? "text-navy-900" : "text-white"
              } focus:outline-none transition-colors duration-300`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-0 left-0 w-full bg-white shadow-xl pt-24 pb-8 px-4 flex flex-col items-center gap-4"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="text-navy-900 font-semibold text-lg hover:text-gold-500 transition-colors w-full text-center py-2"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="/admissions"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="bg-cta-red text-white px-8 py-3 rounded-full font-semibold mt-4 shadow-lg hover:opacity-90 w-full max-w-[250px] text-center"
            >
              Admissions Open
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
