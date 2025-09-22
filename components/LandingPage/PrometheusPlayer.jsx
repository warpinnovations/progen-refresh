"use client";

import React from "react";
import { motion } from 'framer-motion';
import StarsCanvas from '@/components/Global/StarCanvas';

// --- THEME-ALIGNED FONT IMPORTS ---
import localFont from 'next/font/local';
import { Oxanium } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });

// --- REVISED Data for the feature cards ---
const features = [
  {
    supertitle: "WORK",
    title: "WARP",
    // Replace with your actual 10-second loop montage video for the left card
    videoUrl: "/LandingPageAssets/videos/montage-left.mp4",
    isVertical: true,
  },
  {
    supertitle: "WITH",
    title: "Prominent Suite",
    // Replace with your actual reel video for the middle card
    videoUrl: "/LandingPageAssets/videos/main-reel.mp4",
    isVertical: false,
  },
  {
    supertitle: "US",
    title: "CRAETR",
    // Replace with your actual 10-second loop montage video for the right card
    videoUrl: "/LandingPageAssets/videos/montage-right.mp4",
    isVertical: true,
  },
];

// Animation variants for the section and cards
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const PrometheusFeatures = () => {
  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center py-20 md:py-36">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <StarsCanvas />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
        className="relative z-20 w-full max-w-7xl px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* --- REVISED GRID LAYOUT --- 
          - On mobile, it's a single column stack.
          - On desktop (md), we use a 4-column grid to create the desired layout.
            - Left Card: Spans 1 column.
            - Middle Card: Spans 2 columns (making it horizontal).
            - Right Card: Spans 1 column.
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 [perspective:1000px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`group relative rounded-2xl border border-white/10 bg-slate-900/50 transform-gpu 
                ${feature.isVertical ? 'aspect-[3/4]' : 'md:col-span-2 md:aspect-video aspect-[16/9]'}
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main hoverable container */}
              <motion.div
                className="w-full h-full"
                variants={{
                  hover: {
                    scale: 1.05,
                    rotateX: 10,
                    // Apply Y-axis rotation only to the vertical side cards
                    rotateY: feature.isVertical ? (index === 0 ? 5 : -5) : 0
                  }
                }}
              >
                {/* Performant Bronze Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(150, 137, 95, 0.3), transparent 70%)',
                    opacity: 0,
                  }}
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                {/* --- EMBEDDED VIDEO --- */}
                <video
                  src={feature.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-2xl"></div>

                <div
                  className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white pointer-events-none"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <p className={`text-sm tracking-widest text-prOrange ${OxaniumFont.className}`}>
                    {feature.supertitle}
                  </p>
                  <h3 className={`text-3xl lg:text-4xl font-bold uppercase mt-2 text-slate-100 leading-tight ${MoonlanderFont.className}`}>
                    {feature.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PrometheusFeatures;