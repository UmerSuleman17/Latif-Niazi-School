"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import MissionVision from "@/components/home/MissionVision";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Academics from "@/components/home/Academics";
import Campus from "@/components/home/Campus";
import StudentLife from "@/components/home/StudentLife";
import Highlights from "@/components/home/Highlights";
import NewsEventsPreview from "@/components/home/NewsEventsPreview";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import Testimonials from "@/components/home/Testimonials";
import AdmissionsCTA from "@/components/home/AdmissionsCTA";
import Contact from "@/components/home/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
      >
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <About />
          <MissionVision />
          <WhyChooseUs />
          <Academics />
          <Campus />
          <StudentLife />
          <Highlights />
          <NewsEventsPreview />
          <PrincipalMessage />
          <Testimonials />
          <AdmissionsCTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
