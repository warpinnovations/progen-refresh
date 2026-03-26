"use client";

import React, { useState } from "react";
import Starships from "./Starships";
import { motion, AnimatePresence } from "framer-motion";
import StarshipComponent from "./StarshipComponent";
import CSSStars from "@/components/Global/CSSStars";
import FuturisticDivider from "@/components/Global/FuturisticLine";
import localFont from "next/font/local";
import { Rajdhani, Oxanium } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });

const starshipTitle = [
  "cortx",
  "craetr",
  "JPEP",
  "nerv",
  "spectr",
  "warp",
  "promises",
];

const starshipDescription = [
  "Data-driven strategies and science-backed campaign plans come to life here.",
  "Hand-crafted graphic visuals and copywriting for unique, creative engagements.",
  "Prometheus' official photography affiliate.",
  "Data-gathering, market information tabulation and interpretation, and precision monitoring for more informed decision-making processes.",
  "Complete production services through multiple media.",
  "Web development, SEO, and software solutions purposed for stability and efficiency online and offline.",
  "Production services specializing in artistic, narrative commemorations of intimacy through various platforms.",
];

const StarShipSection = () => {
  const [activeShip, setActiveShip] = useState(5);

  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Star Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(150, 137, 95, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl`}
          >
            <span className="text-[#f5f5f5]">Our </span>
            <span className="text-prOrange">Starships</span>
          </h2>
        </motion.div>

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
          className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-2 max-w-3xl mx-auto`}
          style={{
            letterSpacing: "0.06em",
            lineHeight: "1.5",
            fontWeight: "500",
          }}
        >
          Meet the specialized divisions powering our creative engine
        </motion.p>
      </div>

      {/* Starship Selector Icons */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-12 md:mb-16">
        <Starships setActiveShip={setActiveShip} activeShip={activeShip} />
      </div>

      {/* Active Starship Display */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          className="relative rounded-2xl border overflow-hidden"
          style={{
            borderColor: "rgba(150, 137, 95, 0.15)",
            background:
              "linear-gradient(135deg, rgba(15, 15, 15, 0.9), rgba(20, 18, 14, 0.85))",
            boxShadow:
              "0 20px 60px -15px rgba(0, 0, 0, 0.6), inset 0 0 80px rgba(150, 137, 95, 0.03)",
          }}
          layout
        >
          <div className="flex flex-col md:flex-row items-center">
            {/* Left: Starship Image with Rotating Logo */}
            <div className="relative flex-1 flex justify-center items-center py-8 md:py-12">
              <div className="relative h-64 sm:h-80 md:h-96 w-full flex justify-center items-center">
                {/* Rotating circle logo */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <motion.img
                    className="w-56 sm:w-72 md:w-80 opacity-60"
                    src="/AboutAssets/circle_logo.webp"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Gold glow behind active ship */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle 120px at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
                  }}
                />

                {/* Pulsing ring around ship */}
                <motion.div
                  className="absolute rounded-full border border-[#96895F]/15 pointer-events-none"
                  style={{ width: 220, height: 220 }}
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.15, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Starship Component */}
                <StarshipComponent
                  index={activeShip}
                  setActiveShip={setActiveShip}
                />
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block w-[1px] h-64 bg-gradient-to-b from-transparent via-[#96895F]/20 to-transparent" />

            {/* Horizontal divider on mobile */}
            <div className="md:hidden w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#96895F]/20 to-transparent" />

            {/* Right: Ship Info */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 text-center md:text-left">
              {/* Active ship label */}
              <div
                className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-4 flex items-center gap-2 justify-center md:justify-start`}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                  animate={{
                    boxShadow: [
                      "0 0 6px rgba(212, 175, 55, 0.6)",
                      "0 0 12px rgba(212, 175, 55, 1)",
                      "0 0 6px rgba(212, 175, 55, 0.6)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Active Division</span>
              </div>

              {/* Ship Title */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeShip}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className={`${MoonlanderFont.className} text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4`}
                  style={{
                    textShadow: "0 0 30px rgba(150, 137, 95, 0.15)",
                  }}
                >
                  {starshipTitle[activeShip]}
                </motion.h3>
              </AnimatePresence>

              {/* Gold divider */}
              <motion.div
                className="h-[2px] w-20 bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent mb-5 mx-auto md:mx-0"
                key={`div-${activeShip}`}
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* Ship Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeShip}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className={`${RajdhaniFont.className} text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed`}
                  style={{
                    letterSpacing: "0.04em",
                    lineHeight: "1.7",
                  }}
                >
                  {starshipDescription[activeShip]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#96895F]/25 rounded-tr-lg" />
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#96895F]/25 rounded-bl-lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StarShipSection;
