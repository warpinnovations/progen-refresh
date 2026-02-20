"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import localFont from 'next/font/local';
import { Rajdhani } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });

// --- Data for the feature cards ---
const features = [
  {
    supertitle: "INNOVATE",
    youtubeId: "fX7OCwRET1c", // Video 1 - Left
    isVertical: true,
    description: "Transform bold ideas into groundbreaking solutions with cutting-edge technology and creative excellence."
  },
  {
    supertitle: "COLLABORATE",
    youtubeId: "KIqfen6WYNY", // PR Reel 2025 - Center
    isVertical: false,
    description: "Partner with us to create exceptional experiences that drive growth and exceed expectations."
  },
  {
    supertitle: "ELEVATE",
    youtubeId: "SRrM1GniTFM", // Video 2 - Right
    isVertical: true,
    description: "Amplify your brand's impact through strategic innovation and flawless execution that sets you apart."
  },
];

// --- Enhanced Animated Grid Pattern ---
const AnimatedGridPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(150, 137, 95, 0.15)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0"/>
            <stop offset="50%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#gridFade)"/>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridMask)"/>
      </svg>
    </div>
  );
};

// --- Floating Particles ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#96895F]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
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

// Individual Card Component - Enhanced with YouTube embed support
const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Only load iframe when card is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

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
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${
        // Mobile: all cards are horizontal aspect ratio
        // Desktop: vertical cards stay 3/4, horizontal card is 2 cols wide
        !feature.isVertical 
          ? 'aspect-[16/9] md:col-span-2 md:aspect-[16/9]' 
          : 'aspect-[16/9] md:aspect-[3/4]'
      }`}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Enhanced glow effect */}
        <motion.div
          className="absolute -inset-2 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#96895F]/50 via-[#96895F]/30 to-transparent blur-2xl"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.02 : 0.98,
          }}
          transition={{ duration: 0.5 }}
        />

        <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-[#96895F]/30 bg-gradient-to-br from-slate-900/95 to-slate-800/90 backdrop-blur-md shadow-2xl shadow-black/60 group-hover:border-[#96895F]/70 group-hover:shadow-[#96895F]/40 transition-all duration-500">
          {/* Video Embed Container */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="relative w-full h-full bg-black">
              {/* Placeholder shown until iframe loads */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-[#96895F] text-sm font-semibold animate-pulse">Loading...</div>
              </div>

              {/* YouTube iframe - only rendered when in viewport */}
              {isVisible && (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${feature.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${feature.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&color=white&start=0`}
                  className="absolute"
                  style={{
                    width: isMobile ? '100%' : (feature.isVertical ? 'auto' : '100%'),
                    height: isMobile ? 'auto' : (feature.isVertical ? '100%' : 'auto'),
                    minWidth: isMobile ? '100%' : (feature.isVertical ? '56.25%' : '100%'),
                    minHeight: isMobile ? '56.25%' : (feature.isVertical ? '100%' : '56.25%'),
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1.08})`,
                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-500 pointer-events-none" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#96895F]/20 via-transparent to-[#96895F]/10 pointer-events-none"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Shimmer effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: ['linear-gradient(90deg, transparent 0%, rgba(150, 137, 95, 0.2) 50%, transparent 100%)'],
                backgroundPosition: ['-200%', '200%']
              }}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              style={{ backgroundSize: '200% 100%' }}
            />
          )}

          {/* Enhanced inner border */}
          <div className="absolute inset-[1px] rounded-2xl md:rounded-3xl border border-[#96895F]/20 group-hover:border-[#96895F]/50 transition-all duration-500 pointer-events-none" />

          {/* Content overlay for all cards */}
          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-end z-10 pointer-events-none">
            <motion.div
              className="space-y-2 sm:space-y-3 md:space-y-4"
              animate={{ y: isHovered ? -8 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative inline-block">
                <motion.p
                  className={`text-base sm:text-lg md:text-xl font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase text-[#96895F] mb-2 md:mb-3 ${MoonlanderFont.className}`}
                  animate={{
                    textShadow: isHovered ? '0 0 20px rgba(150, 137, 95, 0.8)' : '0 0 8px rgba(150, 137, 95, 0.4)'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {feature.supertitle}
                </motion.p>
                <motion.div
                  className="h-[1.5px] md:h-[2px] bg-gradient-to-r from-[#96895F] via-[#96895F]/60 to-transparent"
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
                <p className={`text-[#EAE2B7]/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-md ${RajdhaniFont.className}`}
                   style={{ letterSpacing: '0.04em' }}>
                  {feature.description}
                </p>
              </motion.div>

              <motion.div
                className={`flex items-center gap-2 md:gap-3 text-[#96895F] ${RajdhaniFont.className}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase"
                      style={{ letterSpacing: '0.08em' }}>
                  Explore More
                </span>
                <motion.svg
                  className="w-4 h-4 md:w-5 md:h-5"
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

          {/* Corner glow effects */}
          {isHovered && (
            <>
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-bl from-[#96895F]/40 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-[#96895F]/30 to-transparent rounded-2xl md:rounded-3xl pointer-events-none"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
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
      {/* Enhanced White Banner Section */}
      <div className="relative w-full min-h-[16rem] md:h-80 overflow-hidden bg-gradient-to-b from-white via-white to-[#F5F5F5]">
        {/* Animated background elements */}
        <AnimatedGridPattern />
        <FloatingParticles />
        
        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#96895F]/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-80 h-80 bg-[#96895F]/4 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Top Wave Transition */}
        <svg className="absolute top-0 w-full h-20 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
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
            d="M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,47.5C840,45,960,50,1080,52.5C1200,55,1320,55,1380,55L1440,55L1440,0L0,0Z"
            animate={{
              d: [
                "M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,47.5C840,45,960,50,1080,52.5C1200,55,1320,55,1380,55L1440,55L1440,0L0,0Z",
                "M0,45L60,47.5C120,50,240,55,360,57.5C480,60,600,60,720,57.5C840,55,960,50,1080,50C1200,50,1320,55,1380,57.5L1440,60L1440,0L0,0Z",
                "M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,47.5C840,45,960,50,1080,52.5C1200,55,1320,55,1380,55L1440,55L1440,0L0,0Z"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            fill="none"
            stroke="#96895F"
            strokeWidth="2"
            opacity="0.6"
            filter="url(#glow-top)"
            d="M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,47.5C840,45,960,50,1080,52.5C1200,55,1320,55,1380,55L1440,55"
            animate={{
              d: [
                "M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,47.5C840,45,960,50,1080,52.5C1200,55,1320,55,1380,55L1440,55",
                "M0,45L60,47.5C120,50,240,55,360,57.5C480,60,600,60,720,57.5C840,55,960,50,1080,50C1200,50,1320,55,1380,57.5L1440,60",
                "M0,40L60,45C120,50,240,60,360,60C480,60,600,50,720,47.5C840,45,960,50,1080,52.5C1200,55,1320,55,1380,55L1440,55"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Main Content - Fixed for Mobile */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-16 z-10 py-8">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-0">
            {/* Left Badge - Hidden on mobile */}
            <motion.div
              className="hidden lg:block flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative group">
                <motion.div
                  className="absolute -inset-2 bg-[#96895F]/20 rounded-2xl blur-xl"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative bg-white/90 backdrop-blur-sm border-2 border-[#96895F]/40 rounded-2xl px-6 py-4 overflow-hidden shadow-lg">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#96895F]/10 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Corner decorations */}
                  <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#96895F] rounded-tl-lg" />
                  <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#96895F] rounded-tr-lg" />
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#96895F] rounded-bl-lg" />
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#96895F] rounded-br-lg" />

                  <div className="relative flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="relative"
                    >
                      <svg className="w-5 h-5 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                        <path d="M2,12L12,17L22,12" />
                      </svg>
                      <div className="absolute inset-0 blur-md bg-[#96895F]/30 rounded-full" />
                    </motion.div>

                    <div className="flex flex-col">
                      <span className={`text-[#96895F] text-sm font-black tracking-widest uppercase ${MoonlanderFont.className}`}>
                        Ignite Ideas
                      </span>
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-[#96895F] to-transparent mt-1"
                        animate={{ width: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Center - Main Logo - Now flex-shrink-0 to prevent squashing */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="absolute -inset-3 bg-[#96895F]/15 rounded-3xl blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative bg-white/95 backdrop-blur-sm border-2 border-[#96895F]/50 rounded-3xl px-8 py-5 md:px-14 md:py-8 shadow-2xl">
                {/* Corner decorations */}
                <div className="absolute top-1.5 left-1.5 w-4 h-4 md:w-5 md:h-5 border-t-2 border-l-2 border-[#96895F] rounded-tl-xl" />
                <div className="absolute top-1.5 right-1.5 w-4 h-4 md:w-5 md:h-5 border-t-2 border-r-2 border-[#96895F] rounded-tr-xl" />
                <div className="absolute bottom-1.5 left-1.5 w-4 h-4 md:w-5 md:h-5 border-b-2 border-l-2 border-[#96895F] rounded-bl-xl" />
                <div className="absolute bottom-1.5 right-1.5 w-4 h-4 md:w-5 md:h-5 border-b-2 border-r-2 border-[#96895F] rounded-br-xl" />

                {/* Pulsing corner dots */}
                {[0, 0.5, 1, 1.5].map((delay, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-[#96895F] ${
                      i === 0 ? '-top-1 -left-1' :
                      i === 1 ? '-top-1 -right-1' :
                      i === 2 ? '-bottom-1 -left-1' :
                      '-bottom-1 -right-1'
                    }`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay }}
                  />
                ))}

                <div className="relative flex items-center gap-3 md:gap-4">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-5 h-5 md:w-8 md:h-8 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                      <path d="M2,12L12,17L22,12" />
                    </svg>
                  </motion.div>

                  <h3 className={`text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-wider ${MoonlanderFont.className} whitespace-nowrap`}>
                    <span className="bg-gradient-to-r from-[#96895F] via-[#B8A76F] to-[#96895F] bg-clip-text text-transparent">
                      PROMETHEUS
                    </span>
                  </h3>

                  <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-5 h-5 md:w-8 md:h-8 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                      <path d="M2,12L12,17L22,12" />
                    </svg>
                  </motion.div>
                </div>

                <motion.p
                  className={`text-center text-[#96895F]/80 text-[10px] md:text-sm tracking-[0.3em] mt-2 font-bold uppercase ${RajdhaniFont.className}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ letterSpacing: '0.08em' }}
                >
                  Be Limitless
                </motion.p>
              </div>
            </motion.div>

            {/* Right Badge - Hidden on mobile */}
            <motion.div
              className="hidden lg:block flex-shrink-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative group">
                <motion.div
                  className="absolute -inset-2 bg-[#96895F]/20 rounded-2xl blur-xl"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="relative bg-white/90 backdrop-blur-sm border-2 border-[#96895F]/40 rounded-2xl px-6 py-4 overflow-hidden shadow-lg">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#96895F]/10 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                  />

                  {/* Corner decorations */}
                  <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#96895F] rounded-tl-lg" />
                  <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#96895F] rounded-tr-lg" />
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#96895F] rounded-bl-lg" />
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#96895F] rounded-br-lg" />

                  <div className="relative flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className={`text-[#96895F] text-sm font-black tracking-widest uppercase ${MoonlanderFont.className}`}>
                        Amplify Impact
                      </span>
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-[#96895F] to-transparent mt-1"
                        animate={{ width: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                    </div>

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="relative"
                    >
                      <svg className="w-5 h-5 text-[#96895F]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2L2,7L12,12L22,7M12,22L2,17L12,12L22,17" opacity="0.5" />
                        <path d="M2,12L12,17L22,12" />
                      </svg>
                      <div className="absolute inset-0 blur-md bg-[#96895F]/30 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave Transition */}
        <svg className="absolute bottom-0 w-full h-20 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
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
            d="M0,50L60,55C120,60,240,70,360,70C480,70,600,60,720,57.5C840,55,960,60,1080,62.5C1200,65,1320,65,1380,65L1440,65L1440,100L0,100Z"
            animate={{
              d: [
                "M0,50L60,55C120,60,240,70,360,70C480,70,600,60,720,57.5C840,55,960,60,1080,62.5C1200,65,1320,65,1380,65L1440,65L1440,100L0,100Z",
                "M0,55L60,57.5C120,60,240,65,360,67.5C480,70,600,70,720,67.5C840,65,960,60,1080,60C1200,60,1320,65,1380,67.5L1440,70L1440,100L0,100Z",
                "M0,50L60,55C120,60,240,70,360,70C480,70,600,60,720,57.5C840,55,960,60,1080,62.5C1200,65,1320,65,1380,65L1440,65L1440,100L0,100Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            fill="none"
            stroke="#96895F"
            strokeWidth="3"
            opacity="0.7"
            filter="url(#glow-bottom)"
            d="M0,50L60,55C120,60,240,70,360,70C480,70,600,60,720,57.5C840,55,960,60,1080,62.5C1200,65,1320,65,1380,65L1440,65"
            animate={{
              d: [
                "M0,50L60,55C120,60,240,70,360,70C480,70,600,60,720,57.5C840,55,960,60,1080,62.5C1200,65,1320,65,1380,65L1440,65",
                "M0,55L60,57.5C120,60,240,65,360,67.5C480,70,600,70,720,67.5C840,65,960,60,1080,60C1200,60,1320,65,1380,67.5L1440,70",
                "M0,50L60,55C120,60,240,70,360,70C480,70,600,60,720,57.5C840,55,960,60,1080,62.5C1200,65,1320,65,1380,65L1440,65"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Main Content Section */}
      <div className="relative flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-36 bg-black">
        <motion.div
          className="relative z-20 w-full max-w-7xl px-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8" style={{ perspective: '1500px' }}>
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