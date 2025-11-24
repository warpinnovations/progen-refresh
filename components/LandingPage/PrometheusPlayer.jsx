"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from 'framer-motion';

// --- Data for the feature cards ---
const features = [
  {
    supertitle: "WORK",
    videoUrl: "/VideoAssets/Pond.gif",
    isVertical: true,
  },
  {
    supertitle: "WITH",
    videoId: "1brGtnb6pnhMCr28Os2VjngRk2N-1q0HX",
    isVertical: false,
  },
  {
    supertitle: "WITH US",
    videoUrl: "/VideoAssets/Lake.gif",
    isVertical: true,
  },
];

// --- NEW: Wavy Lines Component ---
const FloatingWaves = () => {
  const waves = [
    {
      d: "M -400 80 Q -200 40 0 80 T 400 80 T 800 80 T 1200 80 T 1600 80 T 2000 80",
      strokeWidth: 1,
      opacity: 0.3,
      dashArray: "200 300",
      dashOffset: 500,
      duration: 25,
      delay: 0,
    },
    // {
    //   d: "M -400 120 Q -200 160 0 120 T 400 120 T 800 120 T 1200 120 T 1600 120 T 2000 120",
    //   strokeWidth: 1.5,
    //   opacity: 0.5,
    //   dashArray: "5 15", // Dotted line effect
    //   dashOffset: 20,
    //   duration: 35,
    //   delay: 2,
    // },
    {
      d: "M -400 180 Q -200 150 0 180 T 400 180 T 800 180 T 1200 180 T 1600 180 T 2000 180",
      strokeWidth: 1,
      opacity: 0.4,
      dashArray: "300 200",
      dashOffset: 500,
      duration: 20,
      delay: 5,
    },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 1440 256" // Assuming a max height of 256 for the white area
    >
      <defs>
        <filter id="wave-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#wave-glow)">
        {waves.map((wave, i) => (
          <motion.path
            key={i}
            d={wave.d}
            fill="none"
            stroke="#96895F"
            strokeWidth={wave.strokeWidth}
            strokeLinecap="round"
            opacity={wave.opacity}
            strokeDasharray={wave.dashArray}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: wave.dashOffset }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: "linear",
              delay: wave.delay,
            }}
          />
        ))}
      </g>
    </svg>
  );
};


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

// Individual Card Component
const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e) => {
    if (!isHovered) return;
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
      className={`group relative ${feature.isVertical ? 'aspect-[3/4]' : 'md:col-span-2 aspect-[16/9]'}`}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <motion.div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#96895F]/40 via-[#96895F]/20 to-transparent blur-xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#96895F]/30 bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-md shadow-2xl shadow-black/60 group-hover:border-[#96895F]/60 group-hover:shadow-[#96895F]/30 transition-all duration-500">
          <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ pointerEvents: feature.videoId ? 'auto' : 'none' }}>
            {feature.videoId ? (
              <div className="relative w-full h-full" style={{ pointerEvents: 'auto' }}>
                <iframe
                  src={`https://drive.google.com/file/d/${feature.videoId}/preview`}
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                  style={{ border: 'none', pointerEvents: 'auto' }}
                />
              </div>
            ) : (
              <motion.img
                src={feature.videoUrl}
                alt={feature.supertitle}
                className="w-full h-full object-cover"
                style={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {!feature.videoId && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-500" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#96895F]/20 via-transparent to-[#96895F]/10"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </>
            )}
          </div>

          {isHovered && !feature.videoId && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: ['linear-gradient(90deg, transparent 0%, rgba(150, 137, 95, 0.15) 50%, transparent 100%)'],
                backgroundPosition: ['-200%', '200%']
              }}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              style={{ backgroundSize: '200% 100%' }}
            />
          )}

          <div className="absolute inset-[1px] rounded-3xl border border-[#96895F]/20 group-hover:border-[#96895F]/40 transition-all duration-500 pointer-events-none" />

          {!feature.videoId && (
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10 pointer-events-none">
              <motion.div
                className="space-y-4"
                animate={{ y: isHovered ? -8 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative inline-block">
                  <motion.p
                    className="text-lg md:text-xl font-bold tracking-[0.3em] uppercase text-[#96895F] mb-3"
                    animate={{
                      textShadow: isHovered ? '0 0 20px rgba(150, 137, 95, 0.8)' : '0 0 8px rgba(150, 137, 95, 0.4)'
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {feature.supertitle}
                  </motion.p>
                  <motion.div
                    className="h-[2px] bg-gradient-to-r from-[#96895F] via-[#96895F]/60 to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: isHovered ? '100%' : '50%', opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

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

                <motion.div
                  className="flex items-center gap-3 text-[#96895F]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-xs md:text-sm font-semibold tracking-wider uppercase">
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
          )}

          {isHovered && !feature.videoId && (
            <>
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#96895F]/30 to-transparent rounded-3xl pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#96895F]/20 to-transparent rounded-3xl pointer-events-none"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
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
    <div className="w-full relative overflow-hidden bg-black">
      {/* Wave Transition with Enhanced Content */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-white" />

        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-[#96895F]/8 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 bg-[#96895F]/6 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Top Wave */}
        <svg className="absolute top-0 w-full h-1/3" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <defs>
            <filter id="glow-top">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            fill="#000000"
            d="M0,80L60,90C120,100,240,120,360,120C480,120,600,100,720,95C840,90,960,100,1080,105C1200,110,1320,110,1380,110L1440,110L1440,0L0,0Z"
            animate={{
              d: [
                "M0,80L60,90C120,100,240,120,360,120C480,120,600,100,720,95C840,90,960,100,1080,105C1200,110,1320,110,1380,110L1440,110L1440,0L0,0Z",
                "M0,90L60,95C120,100,240,110,360,115C480,120,600,120,720,115C840,110,960,100,1080,100C1200,100,1320,110,1380,115L1440,120L1440,0L0,0Z",
                "M0,80L60,90C120,100,240,120,360,120C480,120,600,100,720,95C840,90,960,100,1080,105C1200,110,1320,110,1380,110L1440,110L1440,0L0,0Z"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            fill="none"
            stroke="#96895F"
            strokeWidth="2"
            opacity="0.7"
            filter="url(#glow-top)"
            d="M0,80L60,90C120,100,240,120,360,120C480,120,600,100,720,95C840,90,960,100,1080,105C1200,110,1320,110,1380,110L1440,110"
            animate={{
              d: [
                "M0,80L60,90C120,100,240,120,360,120C480,120,600,100,720,95C840,90,960,100,1080,105C1200,110,1320,110,1380,110L1440,110",
                "M0,90L60,95C120,100,240,110,360,115C480,120,600,120,720,115C840,110,960,100,1080,100C1200,100,1320,110,1380,115L1440,120",
                "M0,80L60,90C120,100,240,120,360,120C480,120,600,100,720,95C840,90,960,100,1080,105C1200,110,1320,110,1380,110L1440,110"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* --- REPLACED with new FloatingWaves component --- */}
        <FloatingWaves />

        {/* Prometheus UI boxes */}
        <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16 lg:px-24 z-10 pointer-events-none">
          {/* Left box - Enhanced Futuristic Tagline */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-[#96895F]/10 rounded-xl blur-lg"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#96895F]/30 rounded-xl px-6 py-3 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#96895F]/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#96895F] rounded-tl-md" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#96895F] rounded-tr-md" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#96895F] rounded-bl-md" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#96895F] rounded-br-md" />

                <motion.div
                  className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />

                <div className="relative flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <svg className="w-4 h-4 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                      <path d="M2,12L12,17L22,12" />
                    </svg>
                    <div className="absolute inset-0 blur-sm bg-[#96895F]/30 rounded-full" />
                  </motion.div>

                  <div className="flex flex-col">
                    <span className="text-[#96895F] text-sm font-black tracking-wider uppercase">
                      Ignite Ideas
                    </span>
                    <div className="h-px bg-gradient-to-r from-[#96895F] to-transparent w-full mt-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center - Main Prometheus Label */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#96895F]/10 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#96895F]/30 rounded-2xl px-8 py-4 md:px-12 md:py-6">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#96895F] rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#96895F] rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#96895F] rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#96895F] rounded-br-lg" />

              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#96895F]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#96895F]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />

              <div className="relative flex items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                    <path d="M2,12L12,17L22,12" />
                  </svg>
                </motion.div>

                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-wider">
                  <span className="bg-gradient-to-r from-[#96895F] via-[#B8A76F] to-[#96895F] bg-clip-text text-transparent">
                    PROMETHEUS
                  </span>
                </h3>

                <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                    <path d="M2,12L12,17L22,12" />
                  </svg>
                </motion.div>
              </div>

              <motion.p
                className="text-center text-[#96895F]/70 text-xs md:text-sm tracking-widest mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                BE LIMITLESS
              </motion.p>
            </div>
          </motion.div>

          {/* Right box - Enhanced Futuristic Tagline */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-[#96895F]/10 rounded-xl blur-lg"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#96895F]/30 rounded-xl px-6 py-3 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#96895F]/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                />

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#96895F] rounded-tl-md" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#96895F] rounded-tr-md" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#96895F] rounded-bl-md" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#96895F] rounded-br-md" />

                <motion.div
                  className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#96895F]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />

                <div className="relative flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-[#96895F] text-sm font-black tracking-wider uppercase">
                      Amplify Impact
                    </span>
                    <div className="h-px bg-gradient-to-r from-[#96895F] to-transparent w-full mt-0.5" />
                  </div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <svg className="w-4 h-4 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                      <path d="M2,12L12,17L22,12" />
                    </svg>
                    <div className="absolute inset-0 blur-sm bg-[#96895F]/30 rounded-full" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <svg className="absolute bottom-0 w-full h-1/2" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <defs>
            <filter id="glow-bottom">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            fill="#000000"
            d="M0,100L60,110C120,120,240,140,360,140C480,140,600,120,720,115C840,110,960,120,1080,125C1200,130,1320,130,1380,130L1440,130L1440,200L0,200Z"
            animate={{
              d: [
                "M0,100L60,110C120,120,240,140,360,140C480,140,600,120,720,115C840,110,960,120,1080,125C1200,130,1320,130,1380,130L1440,130L1440,200L0,200Z",
                "M0,110L60,115C120,120,240,130,360,135C480,140,600,140,720,135C840,130,960,120,1080,120C1200,120,1320,130,1380,135L1440,140L1440,200L0,200Z",
                "M0,100L60,110C120,120,240,140,360,140C480,140,600,120,720,115C840,110,960,120,1080,125C1200,130,1320,130,1380,130L1440,130L1440,200L0,200Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            fill="none"
            stroke="#96895F"
            strokeWidth="3"
            opacity="0.8"
            filter="url(#glow-bottom)"
            d="M0,100L60,110C120,120,240,140,360,140C480,140,600,120,720,115C840,110,960,120,1080,125C1200,130,1320,130,1380,130L1440,130"
            animate={{
              d: [
                "M0,100L60,110C120,120,240,140,360,140C480,140,600,120,720,115C840,110,960,120,1080,125C1200,130,1320,130,1380,130L1440,130",
                "M0,110L60,115C120,120,240,130,360,135C480,140,600,140,720,135C840,130,960,120,1080,120C1200,120,1320,130,1380,135L1440,140",
                "M0,100L60,110C120,120,240,140,360,140C480,140,600,120,720,115C840,110,960,120,1080,125C1200,130,1320,130,1380,130L1440,130"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Main Content Section */}
      <div className="relative flex items-center justify-center py-20 md:py-36 bg-black">
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
    </div>
  );
};

export default PrometheusFeatures;