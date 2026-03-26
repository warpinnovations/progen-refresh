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
    youtubeId: "emjtaMdLf5s", // Innovate
    isVertical: true,
    description: "Transform bold ideas into groundbreaking solutions with cutting-edge technology and creative excellence."
  },
  {
    supertitle: "COLLABORATE",
    youtubeId: "b4YDux88Iyk", // Collaborate
    isVertical: false,
    description: "Partner with us to create exceptional experiences that drive growth and exceed expectations."
  },
  {
    supertitle: "ELEVATE",
    youtubeId: "3-q0FsSEgkI", // Elevate
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
                </span>
                {/* <motion.svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  animate={isHovered ? { x: [0, 6, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg> */}
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