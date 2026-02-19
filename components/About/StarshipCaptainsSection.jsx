"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CSSStars from "@/components/Global/CSSStars";
import FuturisticDivider from "@/components/Global/FuturisticLine";
import localFont from "next/font/local";
import { Rajdhani, Oxanium } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });

const storyTellers = [
  {
    name: "Gino Fanega",
    img: "/LandingPageAssets/storytellers/gino_formal.webp",
    imgColored: "/LandingPageAssets/storytellers/gino_wacky.webp",
    role: "Executive Creative Director",
  },
  {
    name: "Lcid Fernandez",
    img: "/LandingPageAssets/storytellers/lcid_formal.webp",
    imgColored: "/LandingPageAssets/storytellers/lcid_wacky.webp",
    role: "Chief Executive Officer",
  },
  {
    name: "Blessed Bea Plondaya",
    img: "/LandingPageAssets/storytellers/bea_formal.webp",
    imgColored: "/LandingPageAssets/storytellers/bea_wacky.webp",
    role: "Chief Operations Officer",
  },
  {
    name: "Kevin Atutubo",
    img: "/LandingPageAssets/storytellers/kevin_formal.webp",
    imgColored: "/LandingPageAssets/storytellers/kevin_wacky.webp",
    role: "WARP - Chief Technical Officer",
  },
  {
    name: "Alyanna Comprendio",
    img: "/LandingPageAssets/storytellers/aly_formal.webp",
    imgColored: "/LandingPageAssets/storytellers/aly_wacky.webp",
    role: "Accounts Manager",
  },
  {
    name: "Esther Marie Sazon",
    img: "/LandingPageAssets/storytellers/esther_formal.webp",
    imgColored: "/LandingPageAssets/storytellers/esther_wacky.webp",
    role: "Copy Manager",
  },
];

// --- CAPTAIN CARD ---
const CaptainCard = ({ person, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="cursor-pointer"
      onClick={() => setActiveIndex(index)}
      onMouseEnter={() => setActiveIndex(index)}
    >
      <motion.div
        className="relative w-full rounded-xl overflow-hidden"
        style={{
          aspectRatio: "3/4",
          border: isActive
            ? "2px solid rgba(212, 175, 55, 0.7)"
            : "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: isActive
            ? "0px 20px 50px -10px rgba(150, 137, 95, 0.4), 0 0 60px rgba(150, 137, 95, 0.1)"
            : "0px 8px 25px -5px rgba(0, 0, 0, 0.5)",
        }}
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <img
          src={isActive ? person.imgColored : person.img}
          alt={person.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            filter: isActive ? "grayscale(0)" : "grayscale(1)",
            transform: isActive ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

        {/* Golden glow on active */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%, rgba(150, 137, 95, 0.08) 100%)",
            opacity: isActive ? 1 : 0,
          }}
        />

        {/* Info overlay - always visible at bottom on active */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transition-all duration-400"
          style={{
            transform: isActive ? "translateY(0)" : "translateY(8px)",
            opacity: isActive ? 1 : 0.4,
          }}
        >
          {/* Gold line */}
          <div
            className="h-[1.5px] bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent mb-2 transition-all duration-500"
            style={{
              width: isActive ? "100%" : "0%",
              opacity: isActive ? 1 : 0,
            }}
          />

          <h4
            className={`${RajdhaniFont.className} text-white text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight`}
            style={{
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            {person.name.toUpperCase()}
          </h4>
          <p
            className={`${OxaniumFont.className} text-[10px] sm:text-xs mt-0.5 transition-colors duration-300`}
            style={{
              color: isActive ? "#D4AF37" : "rgba(150, 137, 95, 0.6)",
              letterSpacing: "0.08em",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            {person.role.toUpperCase()}
          </p>
        </div>

        {/* Corner accents on active */}
        {isActive && (
          <>
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-lg" />
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none">
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-lg" />
            </div>
          </>
        )}

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-500 pointer-events-none"
          style={{
            width: isActive ? "70%" : "0%",
            opacity: isActive ? 1 : 0,
            boxShadow: isActive
              ? "0 0 12px rgba(212,175,55,0.5)"
              : "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// --- MAIN SECTION ---
const StarshipCaptainsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Milky way background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/LandingPageAssets/milkyway.webp"
          className="w-full h-full object-cover opacity-20"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(150, 137, 95, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Quote */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto px-4 text-center mb-16 sm:mb-20 md:mb-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div
          className={`${RajdhaniFont.className} text-white/70 text-lg sm:text-xl md:text-2xl lg:text-3xl italic`}
          style={{
            letterSpacing: "0.04em",
            lineHeight: "1.6",
            fontWeight: "500",
          }}
        >
          <span className="text-[#D4AF37] text-3xl md:text-4xl">&ldquo;</span>
          To forever chase excellence with curiosity as our guide.
          <span className="text-[#D4AF37] text-3xl md:text-4xl">&rdquo;</span>
        </div>
      </motion.div>

      {/* Section Header */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl`}
          >
            <span className="text-[#f5f5f5]">Meet Our </span>
            <span className="text-prOrange">Starship Captains</span>
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
          The visionaries and leaders driving Prometheus forward
        </motion.p>
      </div>

      {/* Team Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
          {storyTellers.map((person, index) => (
            <CaptainCard
              key={index}
              person={person}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarshipCaptainsSection;
