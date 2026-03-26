"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Oxanium } from "next/font/google";

const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });

const starshipIcons = [
  "/LandingPageAssets/starshipsAnimated/CORTX.webp",
  "/LandingPageAssets/starshipsAnimated/craetr.webp",
  "/LandingPageAssets/starshipsAnimated/JPEP.webp",
  "/LandingPageAssets/starshipsAnimated/nerv.webp",
  "/LandingPageAssets/starshipsAnimated/spectr.webp",
  "/LandingPageAssets/starshipsAnimated/warp.webp",
  "/LandingPageAssets/starshipsAnimated/promises.webp",
];

const starshipNames = [
  "Cortx",
  "Craetr",
  "JPEP",
  "Nerv",
  "Spectr",
  "Warp",
  "Promises",
];

function Starships({ setActiveShip, activeShip }) {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
      {starshipIcons.map((icon, index) => {
        const isActive = activeShip === index;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => setActiveShip(index)}
          >
            {/* Ship Icon Container */}
            <motion.div
              className="relative rounded-xl overflow-hidden"
              style={{
                border: isActive
                  ? "2px solid rgba(212, 175, 55, 0.7)"
                  : "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: isActive
                  ? "0 0 25px rgba(150, 137, 95, 0.4), 0 0 60px rgba(150, 137, 95, 0.1)"
                  : "0 4px 15px rgba(0, 0, 0, 0.3)",
                background: isActive
                  ? "linear-gradient(135deg, rgba(150, 137, 95, 0.12), rgba(20, 20, 20, 0.9))"
                  : "rgba(15, 15, 15, 0.6)",
              }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain p-2"
                alt={starshipNames[index]}
                src={icon}
                style={{
                  filter: isActive ? "brightness(1.2)" : "brightness(0.6) grayscale(0.5)",
                  transition: "filter 0.4s ease",
                }}
              />

              {/* Active glow overlay */}
              {isActive && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
                  }}
                />
              )}

              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-400 pointer-events-none"
                style={{
                  width: isActive ? "70%" : "0%",
                  opacity: isActive ? 1 : 0,
                  boxShadow: isActive
                    ? "0 0 8px rgba(212,175,55,0.5)"
                    : "none",
                }}
              />
            </motion.div>

            {/* Ship Name Label */}
            <span
              className={`${OxaniumFont.className} text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-300`}
              style={{
                color: isActive ? "#D4AF37" : "rgba(255, 255, 255, 0.3)",
                textShadow: isActive
                  ? "0 0 10px rgba(212, 175, 55, 0.4)"
                  : "none",
              }}
            >
              {starshipNames[index]}
            </span>

            {/* Active dot indicator */}
            <div
              className="w-1 h-1 rounded-full transition-all duration-300"
              style={{
                background: isActive ? "#D4AF37" : "transparent",
                boxShadow: isActive
                  ? "0 0 6px rgba(212, 175, 55, 0.8)"
                  : "none",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default Starships;
