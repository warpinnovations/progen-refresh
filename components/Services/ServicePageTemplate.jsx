"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import localFont from "next/font/local";
import { Rajdhani, Oxanium } from "next/font/google";
import CSSStars from "@/components/Global/CSSStars";
import FuturisticDivider from "@/components/Global/FuturisticLine";
import NavbarGroup from "@/components/Global/NavbarGroup";
import Footer from "@/components/Global/Footer";
import ThreeColumnFooter from "@/components/Global/LargeBreakpointFooter";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });
const OxaniumFont = Oxanium({ weight: "500", subsets: ["latin"] });

const GOLD = "#96895F";

function ServiceCard({ name, description, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-5 rounded-xl border border-[#96895F]/20 bg-white/[0.02] hover:border-[#96895F]/50 hover:bg-[#96895F]/5 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#96895F] group-hover:scale-125 transition-transform duration-300" />
        <div>
          <h3
            className={`${OxaniumFont.className} text-base md:text-lg font-bold text-white group-hover:text-[#96895F] transition-colors duration-300 mb-1`}
            style={{ letterSpacing: "0.04em" }}
          >
            {name}
          </h3>
          <p className={`${RajdhaniFont.className} text-sm md:text-base text-white/60 leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ContactButton({ label }) {
  return (
    <Link href="/contact">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={`${RajdhaniFont.className} relative px-8 py-3.5 rounded-full border-2 border-[#96895F]/60 bg-[#96895F]/10 hover:bg-[#96895F]/25 text-[#96895F] hover:text-white text-base md:text-lg font-semibold uppercase tracking-widest transition-all duration-300 group overflow-hidden`}
      >
        <span className="relative z-10 flex items-center gap-2">
          Contact Us
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#96895F]/0 via-[#96895F]/20 to-[#96895F]/0"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.button>
    </Link>
  );
}

export default function ServicePageTemplate({
  title,
  subtitle,
  tagline,
  cta,
  sectionSubtitle,
  services,
  closingTitle,
  closingText,
}) {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sec2Ref, sec2InView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [sec3Ref, sec3InView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <NavbarGroup />

      {/* ── SECTION 1: HERO ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20 md:pb-28 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(150,137,95,0.09) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Link
              href="/"
              className={`${RajdhaniFont.className} flex items-center gap-2 text-[#96895F]/70 hover:text-[#96895F] transition-colors duration-300 text-sm uppercase tracking-widest`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${MoonlanderFont.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4`}
          >
            <span className="text-white">{title} </span>
            <span className="text-[#96895F]">{subtitle}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <FuturisticDivider color={GOLD} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl text-white/70 mt-6 max-w-3xl mx-auto leading-relaxed`}
            style={{ letterSpacing: "0.04em" }}
          >
            {tagline}
          </motion.p>

          {/* CTA label + button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <p className={`${MoonlanderFont.className} text-white/90 text-sm sm:text-base uppercase tracking-widest`}>
              {cta}
            </p>
            <ContactButton />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: HOW WE HELP ── */}
      <section ref={sec2Ref} className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#96895F]/[0.03] to-black" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className={`${MoonlanderFont.className} text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white mb-3`}>
              How We Help Our <span className="text-[#96895F]">Clients</span>
            </h2>
            <FuturisticDivider color={GOLD} />
            {sectionSubtitle && (
              <p className={`${RajdhaniFont.className} text-white/60 mt-5 text-base md:text-lg max-w-2xl mx-auto`}>
                {sectionSubtitle}
              </p>
            )}
          </motion.div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {services.map((s, i) => (
              <ServiceCard key={i} name={s.name} description={s.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CLOSING / PROJECTS ── */}
      <section ref={sec3Ref} className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(150,137,95,0.07) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className={`${MoonlanderFont.className} text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white mb-3`}
          >
            {closingTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#96895F]">{closingTitle.split(" ").slice(-1)}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={sec3InView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <FuturisticDivider color={GOLD} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={`${RajdhaniFont.className} text-white/60 mt-5 mb-12 text-base md:text-lg max-w-2xl mx-auto`}
          >
            {closingText}
          </motion.p>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <p className={`${MoonlanderFont.className} text-white/90 text-sm sm:text-base uppercase tracking-widest`}>
              {cta}
            </p>
            <ContactButton />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="hidden lg:block">
        <ThreeColumnFooter />
      </div>
      <div className="block lg:hidden">
        <Footer />
      </div>
    </main>
  );
}
