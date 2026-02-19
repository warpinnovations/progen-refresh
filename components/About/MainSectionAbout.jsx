"use client";

import React from "react";
import CardComponentSection from "@/components/About/CardComponentSection";
import StarShipsSection from "@/components/About/StarShipSection";
import StarshipCaptainsSection from "@/components/About/StarshipCaptainsSection";
import Footer from "@/components/Global/Footer";
import ThreeColumnFooter from "@/components/Global/LargeBreakpointFooter";
import NavbarGroup from "@/components/Global/NavbarGroup";
import CSSStars from "@/components/Global/CSSStars";
import FuturisticDivider from "@/components/Global/FuturisticLine";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { Oxanium, Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });
const RajdhaniFont = Rajdhani({ weight: "700", subsets: ["latin"] });

const MainSectionAbout = () => {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <NavbarGroup />

      {/* ========== HERO SECTION ========== */}
      <section className="relative flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        {/* Star Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Subtle gold radial glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(150, 137, 95, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Floating gold particles */}
        {[
          { w: 2, h: 2, l: 10, t: 20, o: 0.2, dur: 7, del: 0, dx: 5 },
          { w: 1, h: 1, l: 25, t: 55, o: 0.3, dur: 9, del: 1, dx: -8 },
          { w: 3, h: 3, l: 40, t: 30, o: 0.15, dur: 11, del: 2, dx: 10 },
          { w: 2, h: 2, l: 60, t: 70, o: 0.25, dur: 8, del: 0.5, dx: -5 },
          { w: 1, h: 1, l: 75, t: 15, o: 0.2, dur: 13, del: 3, dx: 7 },
          { w: 2, h: 2, l: 85, t: 45, o: 0.3, dur: 6, del: 1.5, dx: -10 },
          { w: 3, h: 3, l: 15, t: 80, o: 0.15, dur: 10, del: 2.5, dx: 8 },
          { w: 1, h: 1, l: 50, t: 10, o: 0.2, dur: 12, del: 0.8, dx: -6 },
          { w: 2, h: 2, l: 90, t: 60, o: 0.25, dur: 7, del: 3.5, dx: 9 },
          { w: 1, h: 1, l: 35, t: 90, o: 0.3, dur: 9, del: 1.2, dx: -7 },
          { w: 2, h: 2, l: 65, t: 40, o: 0.2, dur: 11, del: 2.2, dx: 6 },
          { w: 3, h: 3, l: 5, t: 50, o: 0.15, dur: 8, del: 0.3, dx: -9 },
          { w: 1, h: 1, l: 80, t: 25, o: 0.25, dur: 13, del: 4, dx: 10 },
          { w: 2, h: 2, l: 45, t: 65, o: 0.2, dur: 6, del: 1.8, dx: -5 },
          { w: 1, h: 1, l: 20, t: 35, o: 0.3, dur: 10, del: 2.8, dx: 7 },
        ].map((p, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-[#D4AF37] pointer-events-none"
            style={{ width: p.w, height: p.h, left: `${p.l}%`, top: `${p.t}%`, opacity: p.o }}
            animate={{ y: [0, -30, 0], x: [0, p.dx, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          {/* Label */}
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
              <span>Who We Are</span>
              <motion.div
                className="h-[1px] bg-gradient-to-l from-transparent via-[#96895f] to-[#96895f]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${MoonlanderFont.className} font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl`}
          >
            <span className="text-[#f5f5f5]">About </span>
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

          {/* Futuristic Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FuturisticDivider color="#96895F" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-2 max-w-3xl mx-auto`}
            style={{
              letterSpacing: "0.06em",
              lineHeight: "1.5",
              fontWeight: "500",
            }}
          >
            The premier award-winning marketing agency and PR firm in Western
            Visayas
          </motion.p>
        </div>
      </section>

      {/* ========== STARSHIP CAPTAINS SECTION (2nd) ========== */}
      <StarshipCaptainsSection />

      {/* ========== COMPANY INFO SECTION ========== */}
      <CardComponentSection />

      {/* ========== STARSHIPS SECTION (Last) ========== */}
      <StarShipsSection />

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

export default MainSectionAbout;
