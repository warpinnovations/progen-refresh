"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import StarsCanvas from "../Global/StarCanvas";
const MoonlanderFont = { className: 'font-bold' };
const OxaniumFont = { className: 'font-semibold' };

// --- Data for the feature cards ---
const features = [
  {
    supertitle: "WORK",
    videoUrl: "/VideoAssets/Pond.gif",
    isVertical: true,
  },
  {
    supertitle: "WITH",
    iframeSrc: "https://drive.google.com/file/d/1brGtnb6pnhMCr28Os2VjngRk2N-1q0HX/preview",
    isVertical: false,
  },
  {
    supertitle: "US",
    videoUrl: "/VideoAssets/Lake.gif",
    isVertical: true,
  },
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

// Individual Card Component with enhanced effects
const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e) => {
    if (!isHovered) return; // Only calculate on hover
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = (mouseXPos / width - 0.5);
    const yPct = (mouseYPos / height - 0.5);
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative
        ${feature.isVertical ? 'aspect-[3/4]' : 'md:col-span-2 aspect-[16/9]'}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Outer glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#96895F]/40 via-[#96895F]/20 to-transparent blur-xl"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Main card container */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#96895F]/30 bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-md shadow-2xl shadow-black/60 group-hover:border-[#96895F]/60 group-hover:shadow-[#96895F]/30 transition-all duration-500">

          {/* Background Media */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {feature.iframeSrc ? (
              <iframe
                src={feature.iframeSrc}
                width="100%"
                height="100%"
                allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture"
                className="absolute inset-0 h-full w-full object-cover pointer-events-auto"
                allowFullScreen
                frameBorder="0"
                scrolling="no"
              />
            ) : (
              <motion.img
                src={feature.videoUrl}
                alt={`${feature.supertitle} background`}
                className="w-full h-full object-cover"
                style={{
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            )}

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-500" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#96895F]/20 via-transparent to-[#96895F]/10"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Shimmer effect - only on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  'linear-gradient(90deg, transparent 0%, rgba(150, 137, 95, 0.15) 50%, transparent 100%)',
                  'linear-gradient(90deg, transparent 0%, rgba(150, 137, 95, 0.15) 50%, transparent 100%)'
                ],
                backgroundPosition: ['-200%', '200%']
              }}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              style={{ backgroundSize: '200% 100%' }}
            />
          )}

          {/* Inner glow border */}
          <div className="absolute inset-[1px] rounded-3xl border border-[#96895F]/20 group-hover:border-[#96895F]/40 transition-all duration-500 pointer-events-none" />

          {/* Floating particles effect - only on hover */}
          {isHovered && (
            <>
              <motion.div
                className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#96895F]/60"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-16 right-16 w-1.5 h-1.5 rounded-full bg-[#96895F]/40"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </>
          )}

          {/* Content */}
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none">
            <motion.div
              className="space-y-4"
              animate={{
                y: isHovered ? -8 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Supertitle with glow */}
              <div className="relative inline-block">
                <motion.p
                  className={`text-lg md:text-xl font-bold tracking-[0.3em] uppercase text-[#96895F] mb-3 ${OxaniumFont.className}`}
                  animate={{
                    textShadow: isHovered
                      ? '0 0 20px rgba(150, 137, 95, 0.8)'
                      : '0 0 8px rgba(150, 137, 95, 0.4)'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.supertitle}
                </motion.p>
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-[#96895F] via-[#96895F]/60 to-transparent"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isHovered ? '100%' : '50%',
                    opacity: 1
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Hover reveal description */}
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                  height: isHovered ? 'auto' : 0
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="text-[#EAE2B7]/90 text-sm md:text-base leading-relaxed max-w-md">
                  Discover how we can collaborate to bring your vision to life with creativity and precision.
                </p>
              </motion.div>

              {/* Animated CTA */}
              <motion.div
                className="flex items-center gap-3 text-[#96895F]"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -10
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className={`text-xs md:text-sm font-semibold tracking-wider uppercase ${OxaniumFont.className}`}>
                  Explore More
                </span>
                <motion.svg
                  className="w-5 h-5"
                  animate={isHovered ? { x: [0, 6, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner accent glow */}
          {isHovered && (
            <>
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#96895F]/30 to-transparent rounded-3xl pointer-events-none"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Bottom left accent */}
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#96895F]/20 to-transparent rounded-3xl pointer-events-none"
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PrometheusFeatures = () => {
  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center py-20 md:py-36 bg-black">
      {/* Enhanced Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <StarsCanvas />
        <div className="absolute inset-0 bg-black/60" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#96895F]/12 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#96895F]/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.18, 0.12, 0.18],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 w-full max-w-7xl px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8" style={{ perspective: '1500px' }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PrometheusFeatures;