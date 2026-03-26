"use client";

import React, { useState } from "react";
import ContactForm from "./ContactForm";
import Footer from "../Global/Footer";
import ThreeColumnFooter from "../Global/LargeBreakpointFooter";
import NavbarGroup from "@/components/Global/NavbarGroup";
import CSSStars from "@/components/Global/CSSStars";
import FuturisticDivider from "@/components/Global/FuturisticLine";
import { motion, AnimatePresence } from "framer-motion";
import localFont from "next/font/local";
import { Oxanium, Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });
const RajdhaniFont = Rajdhani({ weight: "700", subsets: ["latin"] });

const jobOpenings = [
  {
    title: "Video Editor",
    type: "Full-time",
    location: "Iloilo City",
    description: "Edit and produce high-quality video content for social media and digital campaigns using Adobe Premiere Pro, DaVinci Resolve, After Effects, and similar tools. Agency experience preferred.",
  },
  {
    title: "Videographer",
    type: "Full-time",
    location: "Iloilo City",
    description: "Capture compelling footage for brand campaigns and events. Must have basic knowledge in operating a camera, composition and framing, and video-editing tools. Relative fitness and stamina required.",
  },
  {
    title: "Graphic Designer",
    type: "Full-time",
    location: "Iloilo City",
    description: "Conceptualize and design visuals from scratch using Photoshop, Illustrator, and Canva. Must be able to interpret creative briefs accurately, work with minimal supervision, and have a strong design portfolio.",
  },
  {
    title: "Copywriter",
    type: "Full-time",
    location: "Iloilo City",
    description: "Write clear, compelling, and error-free content across platforms. Must have strong technical and creative writing skills, and the ability to interpret creative direction and collaborate closely with other teams.",
  },
];

const JobCard = ({ job, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="w-full"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group"
      >
        <div
          className="w-full flex items-center justify-between px-5 sm:px-7 py-5 rounded-xl transition-all duration-300"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, rgba(150,137,95,0.12) 0%, rgba(0,0,0,0.4) 100%)"
              : "rgba(255,255,255,0.03)",
            border: isOpen
              ? "1px solid rgba(212, 175, 55, 0.4)"
              : "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <h3
              className={`${RajdhaniFont.className} text-white font-bold text-lg sm:text-xl uppercase tracking-wide`}
              style={{ letterSpacing: "0.07em" }}
            >
              {job.title}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`${OxaniumFont.className} text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full`}
                style={{
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  letterSpacing: "0.15em",
                }}
              >
                {job.type}
              </span>
              <span
                className={`${OxaniumFont.className} text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full`}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  letterSpacing: "0.12em",
                }}
              >
                {job.location}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <div
            className="shrink-0 ml-4 transition-transform duration-300"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: isOpen ? "#D4AF37" : "rgba(255,255,255,0.3)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-5 sm:px-7 py-5 rounded-b-xl"
              style={{
                background: "rgba(150,137,95,0.04)",
                borderLeft: "1px solid rgba(212,175,55,0.2)",
                borderRight: "1px solid rgba(212,175,55,0.2)",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <p
                className={`${OxaniumFont.className} text-white/65 text-sm leading-relaxed mb-5`}
              >
                {job.description}
              </p>
              <a
                href={`mailto:careers@prometheusph.com?subject=Application: ${job.title}`}
                className={`${OxaniumFont.className} inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-lg transition-all duration-300`}
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(150,137,95,0.1) 100%)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "#D4AF37",
                  letterSpacing: "0.15em",
                }}
              >
                Apply Now
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MainSectionContact = () => {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <NavbarGroup />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(150, 137, 95, 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div
              className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-3`}
            >
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-[#96895f] to-[#96895f]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <span>Get In Touch</span>
              <motion.div
                className="h-[1px] bg-gradient-to-l from-transparent via-[#96895f] to-[#96895f]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${MoonlanderFont.className} font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl`}
          >
            <span className="text-[#f5f5f5]">Contact </span>
            <span className="text-prOrange relative">
              Us
              <motion.span
                className="absolute inset-0 text-prOrange blur-lg opacity-40"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Us
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FuturisticDivider color="#96895F" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-2 max-w-3xl mx-auto`}
            style={{ letterSpacing: "0.06em", lineHeight: "1.5", fontWeight: "500" }}
          >
            Kick your brand into hyperdrive with the best minds and tools at
            your disposal
          </motion.p>
        </div>
      </section>

      {/* ========== CONTACT FORM SECTION ========== */}
      <ContactForm />

      {/* ========== JOB OPENINGS SECTION ========== */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(150, 137, 95, 0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-3 mb-4`}
            >
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#96895f]" />
              <span>Now Hiring</span>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#96895f]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`${MoonlanderFont.className} font-black text-3xl sm:text-4xl md:text-5xl`}
            >
              <span className="text-[#f5f5f5]">Job </span>
              <span className="text-prOrange">Openings</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FuturisticDivider color="#96895F" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl text-white/70 mt-2 max-w-2xl mx-auto`}
              style={{ letterSpacing: "0.06em", lineHeight: "1.5", fontWeight: "500" }}
            >
              Join the crew building the region&apos;s boldest brands
            </motion.p>
          </div>

          {/* Job Listings */}
          <div className="flex flex-col gap-3">
            {jobOpenings.map((job, index) => (
              <JobCard key={index} job={job} index={index} />
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`${OxaniumFont.className} text-center text-white/35 text-xs mt-10 tracking-wide`}
          >
            Don&apos;t see a fit? Send your portfolio to{" "}
            <a
              href="mailto:careers@prometheusph.com"
              className="text-[#96895f] hover:text-[#D4AF37] transition-colors duration-300 underline underline-offset-2"
            >
              careers@prometheusph.com
            </a>
          </motion.p>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative z-10">
        <div className="md:hidden">
          <Footer />
        </div>
        <div className="hidden md:block">
          <ThreeColumnFooter />
        </div>
      </footer>
    </main>
  );
};

export default MainSectionContact;
