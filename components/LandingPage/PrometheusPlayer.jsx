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
    title: "Start",
    // This should point to public/VideoAssets/Pond.gif
    videoUrl: "/VideoAssets/Pond.gif",
    isVertical: true,
  },
  {
    supertitle: "WITH",
    title: "Your Business",
    iframeSrc: "https://drive.google.com/file/d/1brGtnb6pnhMCr28Os2VjngRk2N-1q0HX/preview",
    isVertical: false,
  },
  {
    supertitle: "US",
    title: "with Us",
    // This should point to public/VideoAssets/Lake.gif
    videoUrl: "/VideoAssets/Lake.gif",
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 [perspective:1000px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`group relative rounded-3xl border border-prOrange/20 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm transform-gpu shadow-2xl shadow-black/50
                ${feature.isVertical ? 'aspect-[3/4]' : 'md:col-span-2 aspect-[16/9]'}
                hover:border-prOrange/40 hover:shadow-prOrange/20 hover:shadow-2xl transition-all duration-500
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="w-full h-full"
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(150, 137, 95, 0.4), transparent 60%)',
                    opacity: 0,
                  }}
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                <div className="absolute inset-1 rounded-3xl bg-gradient-to-br from-prOrange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* --- CONDITIONAL RENDERING LOGIC --- */}
                {feature.iframeSrc ? (
                  <iframe
                    src={feature.iframeSrc}
                    width="100%"
                    height="100%"
                    allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture"
                    className="absolute inset-0 h-full w-full object-cover rounded-3xl pointer-events-auto"
                    allowFullScreen
                    frameBorder="0"
                    scrolling="no"
                  />
                ) : (
                  // --- *** THE FIX IS HERE *** ---
                  // Replaced <video> tag with <img> tag to correctly display GIFs
                  <img
                    src={feature.videoUrl}
                    alt={`${feature.supertitle} ${feature.title} animated background`}
                    className="absolute inset-0 h-full w-full object-cover rounded-3xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-3xl pointer-events-none"></div>

                <div className="absolute inset-0 rounded-3xl border border-prOrange/10 group-hover:border-prOrange/30 transition-all duration-500 pointer-events-none" />

                <div
                  className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end pointer-events-none group-hover:opacity-0 transition-all duration-500"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className="space-y-3">
                    <p className={`text-lg md:text-xl font-bold tracking-widest uppercase text-prOrange/80 mb-2 ${OxaniumFont.className} drop-shadow-lg`}>
                      {feature.supertitle}
                    </p>
                    <h3 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-[#EAE2B7] leading-tight ${OxaniumFont.className} drop-shadow-2xl`}>
                      {feature.title}
                    </h3>
                  </div>

                  <div className="w-16 h-0.5 bg-gradient-to-r from-prOrange to-transparent mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
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