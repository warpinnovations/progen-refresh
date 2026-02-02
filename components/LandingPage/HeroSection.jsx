"use client";
import React, { useState, useEffect, useMemo } from "react";
import PageTransition from "@/components/Global/PageTransition";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarsCanvas from "@/components/Global/StarCanvas";
import { Oxanium, Rajdhani } from "next/font/google";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import Link from "next/link";

const OxaniumFont = Oxanium({
  weight: "400",
  subsets: ["latin"],
});
const RajdhaniFont = Rajdhani({
  weight: "600",
  subsets: ["latin"],
});
const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });

// Optimized Meteor Component
const Meteors = ({ number = 20 }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const meteorConfigs = Array.from({ length: number }, (_, idx) => ({
      id: idx,
      left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
      animationDelay: `${Math.random() * (number * 0.1) + idx * 0.05}s`,
      animationDuration: `${Math.floor(Math.random() * 4 + 2)}s`,
    }));
    setMeteors(meteorConfigs);
  }, [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}

      <style jsx>{`
        @keyframes meteor-effect {
          0% { transform: rotate(215deg) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
        }
        .animate-meteor-effect { animation: meteor-effect linear infinite; }
      `}</style>
    </>
  );
};

const HeroSection = () => {
  const [activeText, setActiveText] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const heroText = "BE LIMITLESS";
  const glitchCharacterOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/";

  const awards = [
    { 
      filename: "MEA Logo.png", 
      alt: "Marketing Awards",
      achievement: "15+ Wins",
      year: "2020-2024",
      category: "Digital Excellence",
      description: "Recognized for breakthrough digital campaigns across multiple categories"
    },
    { 
      filename: "Anvil Awards Logo.png", 
      alt: "Anvil Awards",
      achievement: "Gold Winner",
      year: "2023-2024",
      category: "PR Excellence",
      description: "Awarded for strategic communication and measurable impact"
    },
    { 
      filename: "Asia CEO Awards.PNG", 
      alt: "Asia CEO Awards",
      achievement: "Regional Champion",
      year: "2024",
      category: "Leadership & Innovation",
      description: "Southeast Asia's premier recognition for visionary business leadership"
    },
  ];

  // Auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % awards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [awards.length]);

  // Glitch Text Effect logic
  const textArray = useMemo(() => {
    const generateGlitch = (text) => {
      let glitchedText = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") { glitchedText += " "; continue; }
        if (Math.random() < 0.2) {
          glitchedText += glitchCharacterOptions[Math.floor(Math.random() * glitchCharacterOptions.length)];
        } else {
          glitchedText += text[i];
        }
      }
      return glitchedText;
    };
    const frames = [];
    const revealSteps = heroText.length;
    for (let i = 0; i <= revealSteps; i++) {
      const partialText = heroText.substring(0, i);
      const randomJunk = Array.from({ length: revealSteps - i }, () => glitchCharacterOptions[Math.floor(Math.random() * glitchCharacterOptions.length)]).join("");
      frames.push(partialText + randomJunk);
    }
    for (let i = 0; i < 20; i++) { frames.push(generateGlitch(heroText)); }
    frames.push(heroText);
    return frames;
  }, [heroText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((current) => (current < textArray.length - 1 ? current + 1 : current));
    }, 90);
    return () => clearInterval(interval);
  }, [textArray]);

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full transform -translate-y-24 md:-translate-y-32 lg:-translate-y-100">
            <LazyLoadImage
              alt="background image"
              src="/LandingPageAssets/astro-bg.webp"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Gradient overlay to blend image edges with black background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black from-5% via-black/60 via-40% to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <StarsCanvas />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-start w-full min-h-screen pt-32 md:pt-40 pb-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />

          <div className="z-30 flex flex-col items-center justify-start w-full max-w-7xl mx-auto px-4 space-y-8 md:space-y-12 text-center text-white">
            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${MoonlanderFont.className} font-black text-4xl md:text-6xl lg:text-7xl`}
            >
              {textArray[activeText]?.substring(0, 3)}{" "}
              <span className="text-prOrange">{textArray[activeText]?.substring(3)}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex text-lg md:text-2xl lg:text-3xl ${RajdhaniFont.className} font-semibold text-white text-center w-full md:w-3/4 px-4 md:px-0`}
              style={{ letterSpacing: '0.04em', lineHeight: '1.5' }}
            >
              We are the Premier, Award-Winning, Full Service Marketing Agency and Public Relations Firm in Western Visayas.
            </motion.h2>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/contact">
                <motion.button
                  className={`group relative px-8 py-3.5 md:px-12 md:py-4 ${RajdhaniFont.className} font-bold text-sm md:text-base uppercase tracking-[0.12em] overflow-hidden rounded-lg bg-transparent border border-[#96895f]/70 text-white shadow-[0_0_20px_rgba(150,137,95,0.15)] hover:shadow-[0_0_35px_rgba(150,137,95,0.35)] transition-all duration-300 ease-out backdrop-blur-sm`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="relative z-10 flex items-center gap-3">
                    Get Started
                    <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* ========================================
                ENHANCED AWARDS SECTION - MORE ZAZZ
                ======================================== */}
            <div className="relative w-full pt-16 md:pt-24 pb-8">
              
              {/* ENHANCED Animated Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* More Meteors */}
                <Meteors number={15} />
                
                {/* Enhanced Rotating Spotlight Beams */}
                <div className="absolute inset-0 opacity-25">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 origin-top"
                      style={{
                        width: '3px',
                        height: '100%',
                        background: `linear-gradient(to bottom, 
                          rgba(150,137,95,${0.7 - i * 0.08}), 
                          rgba(150,137,95,${0.4 - i * 0.05}) 50%,
                          transparent)`,
                        transform: `rotate(${i * 60}deg)`,
                        animation: `rotate-beam ${12 + i * 2.5}s linear infinite`,
                        animationDelay: `${i * 1.2}s`,
                        filter: 'blur(1.5px)'
                      }}
                    />
                  ))}
                </div>

                {/* Pulsing Radial Waves */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`wave-${i}`}
                      className="absolute rounded-full border-2 border-[#96895f]"
                      style={{
                        width: '200px',
                        height: '200px',
                        opacity: 0,
                        animation: `radial-pulse ${3.5 + i * 0.8}s ease-out infinite`,
                        animationDelay: `${i * 0.9}s`
                      }}
                    />
                  ))}
                </div>

                {/* Orbiting Energy Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`orbit-${i}`}
                      className="absolute rounded-full border border-[#96895f]/20"
                      style={{
                        width: `${400 + i * 150}px`,
                        height: `${400 + i * 150}px`,
                        animation: `orbit-ring ${20 + i * 10}s linear infinite`,
                        animationDelay: `${i * 3}s`,
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${60 + i * 10}deg)`
                      }}
                    >
                      {/* Energy Dot on Ring */}
                      <div 
                        className="absolute top-0 left-1/2 w-2 h-2 bg-[#96895f] rounded-full -translate-x-1/2"
                        style={{
                          boxShadow: '0 0 15px rgba(150,137,95,0.8), 0 0 30px rgba(150,137,95,0.4)',
                          animation: 'pulse-dot 2s ease-in-out infinite'
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Floating Energy Particles */}
                {[...Array(30)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute rounded-full bg-[#96895f]"
                    style={{
                      width: `${Math.random() * 3 + 1}px`,
                      height: `${Math.random() * 3 + 1}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.6 + 0.2,
                      animation: `float-particle ${6 + Math.random() * 12}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 5}s`,
                      filter: 'blur(0.5px)'
                    }}
                  />
                ))}

                {/* Spotlight Focus Glow - Dynamic */}
                <div 
                  className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
                  style={{
                    background: `radial-gradient(ellipse 800px 600px at center, 
                      rgba(150,137,95,0.12) 0%, 
                      transparent 60%)`,
                    transform: `scale(${1 + highlightedIndex * 0.05})`,
                    opacity: 0.8
                  }}
                />
              </div>

              {/* Section Header - Enhanced Animation */}
              <motion.div 
                className="relative z-10 text-center mb-16 md:mb-20 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-col items-center gap-4 mb-8">
                  {/* Animated Top Accent */}
                  <div className={`${RajdhaniFont.className} text-[#96895f] uppercase tracking-[0.25em] text-xs md:text-sm font-bold flex items-center gap-3`}>
                    <motion.div 
                      className="h-[2px] bg-gradient-to-r from-transparent via-[#96895f] to-[#96895f]"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                    <motion.span
                      initial={{ opacity: 0, letterSpacing: '0.5em' }}
                      animate={{ opacity: 1, letterSpacing: '0.25em' }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      AWARD-WINNING EXCELLENCE
                    </motion.span>
                    <motion.div 
                      className="h-[2px] bg-gradient-to-l from-transparent via-[#96895f] to-[#96895f]"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </div>
                </div>

                {/* Animated Number Counter */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ 
                    delay: 0.8, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <h3 className={`${MoonlanderFont.className} text-6xl md:text-8xl lg:text-9xl font-black mb-4 relative`}>
                    <span className="text-white relative inline-block">
                      30
                      {/* Glowing Number Effect */}
                      <span 
                        className="absolute inset-0 text-white blur-xl opacity-50"
                        style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
                      >
                        30
                      </span>
                    </span>
                    <span 
                      className="text-[#96895f] relative inline-block"
                      style={{ animation: 'scale-pulse 2s ease-in-out infinite' }}
                    >
                      +
                      <span 
                        className="absolute inset-0 text-[#96895f] blur-lg opacity-60"
                      >
                        +
                      </span>
                    </span>
                  </h3>
                  <p className={`${RajdhaniFont.className} text-white/80 text-lg md:text-2xl font-semibold tracking-wide`}>
                    Industry Awards & Recognition Since 2020
                  </p>
                </motion.div>
              </motion.div>

              {/* MAIN FEATURE: Enhanced Hexagonal Spotlight Layout */}
              <div className="relative z-10 max-w-7xl mx-auto px-4">
                
                {/* Award Display Area */}
                <div className="relative" style={{ perspective: '2000px' }}>
                  
                  {/* Enhanced Center Spotlight Stage */}
                  <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
                    
                    {/* Dynamic Radial Stage Lighting */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div 
                        className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          background: `radial-gradient(circle, rgba(150,137,95,0.2) 0%, transparent 70%)`,
                          filter: 'blur(40px)'
                        }}
                      />
                    </div>

                    {/* Award Cards in Enhanced Circular Formation */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {awards.map((award, index) => {
                        const isActive = highlightedIndex === index;
                        const isLeft = index === 0;
                        const isCenter = index === 1;
                        const isRight = index === 2;
                        
                        // Enhanced positioning logic
                        let positionClasses = '';
                        let zIndex = 10;
                        let scale = 0.7;
                        let opacity = 0.3;
                        let blur = 'blur(3px)';
                        let rotateY = 0;
                        
                        if (isActive) {
                          positionClasses = 'translate-x-0 translate-y-0';
                          zIndex = 30;
                          scale = window.innerWidth < 768 ? 0.95 : 1.15;
                          opacity = 1;
                          blur = 'blur(0px)';
                          rotateY = 0;
                        } else if ((highlightedIndex === 0 && isRight) || (highlightedIndex === 2 && isLeft) || (highlightedIndex === 1 && (isLeft || isRight))) {
                          // Adjacent cards - More dramatic positioning
                          if ((highlightedIndex === 0 && isCenter) || (highlightedIndex === 2 && isCenter) || (highlightedIndex === 1 && isLeft)) {
                            positionClasses = 'md:-translate-x-72 lg:-translate-x-96 translate-y-0';
                            rotateY = 25;
                          } else {
                            positionClasses = 'md:translate-x-72 lg:translate-x-96 translate-y-0';
                            rotateY = -25;
                          }
                          zIndex = 20;
                          scale = 0.8;
                          opacity = 0.5;
                          blur = 'blur(1.5px)';
                        } else {
                          // Far card - Push back more
                          positionClasses = 'translate-y-40 md:translate-y-52';
                          zIndex = 10;
                          scale = 0.65;
                          opacity = 0.2;
                          blur = 'blur(4px)';
                          rotateY = 0;
                        }
                        
                        return (
                          <motion.div
                            key={award.filename}
                            className="absolute w-full max-w-xs md:max-w-md"
                            style={{
                              zIndex,
                              transformStyle: 'preserve-3d'
                            }}
                            initial={{ opacity: 0, scale: 0.3, y: 200, rotateX: 90 }}
                            animate={{ 
                              opacity,
                              scale,
                              y: 0,
                              rotateY,
                              rotateX: 0,
                              filter: blur,
                            }}
                            transition={{ 
                              delay: 0.8 + (index * 0.15),
                              duration: 1.2,
                              type: "spring",
                              stiffness: 60,
                              damping: 15
                            }}
                          >
                            <div 
                              className="transition-all duration-1000 ease-out"
                              style={{ transform: positionClasses.includes('translate') ? positionClasses.split(' ').map(c => {
                                if (c.includes('translate-x')) return `translateX(${c.includes('-') ? '-' : ''}${c.match(/\d+/)[0] * 4}px)`;
                                if (c.includes('translate-y')) return `translateY(${c.match(/\d+/)[0] * 4}px)`;
                                return '';
                              }).join(' ') : undefined }}
                            >
                              {/* Enhanced Hexagonal Card Container */}
                              <div className="relative">
                                <div className="relative mx-auto w-full max-w-[220px] md:max-w-[400px]">
                                  
                                  {/* Main Card with Enhanced Effects */}
                                  <div
                                    className={`
                                      relative p-4 md:p-10 rounded-2xl md:rounded-3xl
                                      backdrop-blur-2xl border-2
                                      transition-all duration-700
                                      ${isActive 
                                        ? 'bg-gradient-to-br from-black/85 via-black/75 to-black/65 border-[#96895f] shadow-[0_0_100px_rgba(150,137,95,0.5),0_0_50px_rgba(150,137,95,0.3),inset_0_0_50px_rgba(150,137,95,0.1)]' 
                                        : 'bg-black/40 border-[#96895f]/15 shadow-[0_0_15px_rgba(0,0,0,0.3)]'
                                      }
                                    `}
                                  >
                                    
                                    {/* Enhanced Glowing Corner Accents */}
                                    {isActive && (
                                      <>
                                        {/* Top Left */}
                                        <div className="absolute top-0 left-0 w-24 h-24">
                                          <motion.div 
                                            className="absolute top-3 left-3 w-14 h-14 border-t-2 border-l-2 border-[#96895f] rounded-tl-2xl"
                                            animate={{
                                              borderColor: ['rgba(150,137,95,1)', 'rgba(150,137,95,0.5)', 'rgba(150,137,95,1)']
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                          />
                                          <motion.div 
                                            className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#96895f] rounded-full"
                                            animate={{
                                              scale: [1, 1.5, 1],
                                              opacity: [1, 0.5, 1],
                                              boxShadow: [
                                                '0 0 10px rgba(150,137,95,0.8)',
                                                '0 0 20px rgba(150,137,95,1)',
                                                '0 0 10px rgba(150,137,95,0.8)'
                                              ]
                                            }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                          />
                                        </div>
                                        
                                        {/* Bottom Right */}
                                        <div className="absolute bottom-0 right-0 w-24 h-24">
                                          <motion.div 
                                            className="absolute bottom-3 right-3 w-14 h-14 border-b-2 border-r-2 border-[#96895f] rounded-br-2xl"
                                            animate={{
                                              borderColor: ['rgba(150,137,95,0.5)', 'rgba(150,137,95,1)', 'rgba(150,137,95,0.5)']
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                          />
                                          <motion.div 
                                            className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#96895f] rounded-full"
                                            animate={{
                                              scale: [1, 1.5, 1],
                                              opacity: [1, 0.5, 1],
                                              boxShadow: [
                                                '0 0 10px rgba(150,137,95,0.8)',
                                                '0 0 20px rgba(150,137,95,1)',
                                                '0 0 10px rgba(150,137,95,0.8)'
                                              ]
                                            }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                                          />
                                        </div>

                                        {/* Scan Line Effect */}
                                        <motion.div
                                          className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: [0, 0.3, 0] }}
                                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        >
                                          <motion.div
                                            className="w-full h-1 bg-gradient-to-r from-transparent via-[#96895f] to-transparent"
                                            animate={{ y: [0, 400] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            style={{ filter: 'blur(2px)' }}
                                          />
                                        </motion.div>
                                      </>
                                    )}

                                    {/* Award Logo with Enhanced Orbital Ring */}
                                    <div className="relative flex items-center justify-center mb-6 md:mb-8">
                                      
                                      {/* Multi-layered Orbital Ring Effect */}
                                      {isActive && (
                                        <>
                                          {/* Outer Ring */}
                                          <motion.div 
                                            className="absolute inset-0 flex items-center justify-center"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                          >
                                            <div className="w-26 h-26 md:w-60 md:h-60 rounded-full border-2 border-[#96895f]/20">
                                              <motion.div 
                                                className="absolute top-0 left-1/2 w-3 h-3 bg-[#96895f] rounded-full -translate-x-1/2 -translate-y-1/2"
                                                animate={{
                                                  boxShadow: [
                                                    '0 0 15px rgba(150,137,95,0.8)',
                                                    '0 0 30px rgba(150,137,95,1)',
                                                    '0 0 15px rgba(150,137,95,0.8)'
                                                  ]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                              />
                                            </div>
                                          </motion.div>

                                          {/* Inner Ring - Counter Rotation */}
                                          <motion.div 
                                            className="absolute inset-0 flex items-center justify-center"
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                          >
                                            <div className="w-22 h-22 md:w-52 md:h-52 rounded-full border border-[#96895f]/30">
                                              <motion.div 
                                                className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#96895f]/80 rounded-full -translate-x-1/2 translate-y-1/2"
                                                animate={{
                                                  boxShadow: [
                                                    '0 0 10px rgba(150,137,95,0.6)',
                                                    '0 0 20px rgba(150,137,95,0.9)',
                                                    '0 0 10px rgba(150,137,95,0.6)'
                                                  ]
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                              />
                                            </div>
                                          </motion.div>

                                          {/* Pulsing Energy Ring */}
                                          <motion.div
                                            className="absolute inset-0 flex items-center justify-center"
                                            animate={{
                                              scale: [1, 1.1, 1],
                                              opacity: [0.3, 0.6, 0.3]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                          >
                                            <div className="w-24 h-24 md:w-56 md:h-56 rounded-full border border-[#96895f]/40 shadow-[0_0_30px_rgba(150,137,95,0.4)]" />
                                          </motion.div>
                                        </>
                                      )}
                                      
                                      {/* Logo with Enhanced Animation */}
                                      <motion.div 
                                        className="relative w-20 h-20 md:w-48 md:h-48 flex items-center justify-center"
                                        animate={isActive ? {
                                          scale: [1, 1.05, 1],
                                          rotateY: [0, 5, 0, -5, 0]
                                        } : {}}
                                        transition={{ 
                                          duration: 4,
                                          repeat: Infinity,
                                          ease: "easeInOut"
                                        }}
                                      >
                                        <img
                                          src={`/LandingPageAssets/awards/${award.filename}`}
                                          alt={award.alt}
                                          className={`w-full h-full object-contain transition-all duration-700 ${
                                            isActive 
                                              ? 'grayscale-0 brightness-110' 
                                              : 'grayscale brightness-75'
                                          }`}
                                          style={{
                                            filter: isActive 
                                              ? 'drop-shadow(0 0 40px rgba(150,137,95,0.6)) drop-shadow(0 0 20px rgba(150,137,95,0.4))' 
                                              : 'none',
                                          }}
                                        />
                                      </motion.div>
                                    </div>

                                    {/* Award Details with Enhanced Typography */}
                                    <div className="space-y-3 md:space-y-4 text-center">
                                      
                                      {/* Award Title */}
                                      <motion.h4 
                                        className={`${RajdhaniFont.className} text-white text-lg md:text-3xl font-bold uppercase tracking-wider`}
                                        animate={isActive ? {
                                          opacity: [1, 0.9, 1],
                                        } : { opacity: 0.7 }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      >
                                        {award.alt}
                                      </motion.h4>

                                      {/* Achievement Badge - Enhanced */}
                                      <div className="flex justify-center">
                                        <motion.div 
                                          className={`
                                            inline-flex items-center gap-2 px-4 py-2 md:gap-3 md:px-6 md:py-3 rounded-full border-2
                                            transition-all duration-500
                                            ${isActive 
                                              ? 'bg-[#96895f]/20 border-[#96895f] shadow-[0_0_25px_rgba(150,137,95,0.4),inset_0_0_20px_rgba(150,137,95,0.1)]' 
                                              : 'bg-[#96895f]/10 border-[#96895f]/30'
                                            }
                                          `}
                                          animate={isActive ? {
                                            boxShadow: [
                                              '0 0 25px rgba(150,137,95,0.4)',
                                              '0 0 40px rgba(150,137,95,0.6)',
                                              '0 0 25px rgba(150,137,95,0.4)'
                                            ]
                                          } : {}}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        >
                                          <div className="relative">
                                            <motion.div 
                                              className="w-2.5 h-2.5 rounded-full bg-[#96895f]"
                                              animate={isActive ? {
                                                scale: [1, 1.3, 1],
                                                opacity: [1, 0.7, 1]
                                              } : {}}
                                              transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            {isActive && (
                                              <motion.div 
                                                className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#96895f]"
                                                animate={{
                                                  scale: [1, 2, 1],
                                                  opacity: [0.6, 0, 0.6]
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                              />
                                            )}
                                          </div>
                                          <span className={`${RajdhaniFont.className} text-[#96895f] text-xs md:text-base font-bold uppercase tracking-wider`}>
                                            {award.achievement}
                                          </span>
                                        </motion.div>
                                      </div>

                                      {/* Details Section - Enhanced Reveal */}
                                      <motion.div 
                                        className="space-y-2 overflow-hidden"
                                        initial={{ maxHeight: 0, opacity: 0 }}
                                        animate={{
                                          maxHeight: isActive ? 200 : 0,
                                          opacity: isActive ? 1 : 0
                                        }}
                                        transition={{ 
                                          duration: 0.6,
                                          ease: "easeInOut"
                                        }}
                                      >
                                        <motion.p 
                                          className={`${OxaniumFont.className} text-white/90 text-sm md:text-base font-semibold`}
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                          transition={{ delay: 0.2 }}
                                        >
                                          {award.year}
                                        </motion.p>
                                        
                                        <motion.p 
                                          className={`${RajdhaniFont.className} text-[#96895f] text-xs md:text-sm uppercase tracking-widest font-bold`}
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                          transition={{ delay: 0.3 }}
                                        >
                                          {award.category}
                                        </motion.p>
                                        
                                        {/* Description with Border */}
                                        <motion.div 
                                          className="pt-3 mt-3 md:pt-4 md:mt-4 border-t border-[#96895f]/30"
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                          transition={{ delay: 0.4 }}
                                        >
                                          <p className={`${OxaniumFont.className} text-white/70 text-xs md:text-sm leading-relaxed`}>
                                            {award.description}
                                          </p>
                                        </motion.div>
                                      </motion.div>
                                    </div>

                                    {/* Enhanced Bottom Accent Line */}
                                    {isActive && (
                                      <motion.div 
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#96895f] to-transparent rounded-full"
                                        animate={{
                                          boxShadow: [
                                            '0 0 15px rgba(150,137,95,0.6)',
                                            '0 0 30px rgba(150,137,95,0.9)',
                                            '0 0 15px rgba(150,137,95,0.6)'
                                          ],
                                          opacity: [0.8, 1, 0.8]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enhanced Navigation Dots */}
                  <div className="flex justify-center gap-6 mt-12">
                    {awards.map((award, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setHighlightedIndex(index)}
                        className="relative group"
                        aria-label={`View ${award.alt}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="relative flex flex-col items-center gap-2">
                          {/* Enhanced Dot with Glow */}
                          <div className="relative">
                            <motion.div
                              className={`
                                w-3 h-3 rounded-full transition-all duration-500
                                ${highlightedIndex === index 
                                  ? 'bg-[#96895f] scale-125' 
                                  : 'bg-white/30 hover:bg-white/50 scale-100'
                                }
                              `}
                              animate={highlightedIndex === index ? {
                                boxShadow: [
                                  '0 0 20px rgba(150,137,95,0.8)',
                                  '0 0 30px rgba(150,137,95,1)',
                                  '0 0 20px rgba(150,137,95,0.8)'
                                ]
                              } : {}}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            
                            {/* Ring Pulse on Active */}
                            {highlightedIndex === index && (
                              <motion.div
                                className="absolute inset-0 w-3 h-3 rounded-full border-2 border-[#96895f]"
                                animate={{
                                  scale: [1, 2, 1],
                                  opacity: [0.8, 0, 0.8]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                          
                          {/* Enhanced Label */}
                          <motion.span 
                            className={`
                              ${RajdhaniFont.className} text-xs uppercase tracking-wider font-bold
                              transition-all duration-300
                              ${highlightedIndex === index 
                                ? 'text-[#96895f] opacity-100' 
                                : 'text-white/50 opacity-70 group-hover:opacity-90'
                              }
                            `}
                            animate={highlightedIndex === index ? {
                              textShadow: [
                                '0 0 10px rgba(150,137,95,0.5)',
                                '0 0 20px rgba(150,137,95,0.8)',
                                '0 0 10px rgba(150,137,95,0.5)'
                              ]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {award.achievement}
                          </motion.span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Enhanced CTA - ACTIVE */}
                  <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <a href="#work">
                      <motion.button 
                        className={`group ${RajdhaniFont.className} text-white/80 hover:text-[#96895f] text-sm md:text-base uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-3 mx-auto px-8 py-4 rounded-xl border-2 border-[#96895f]/30 hover:border-[#96895f] hover:bg-[#96895f]/5 relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 0 40px rgba(150,137,95,0.3)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Button Glow Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#96895f]/10 to-transparent"
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        <span className="relative z-10">View Our Award-Winning Work</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced CSS Animations */}
              <style jsx>{`
                @keyframes rotate-beam {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                
                @keyframes orbit-ring {
                  from { transform: rotateX(60deg) rotateZ(0deg); }
                  to { transform: rotateX(60deg) rotateZ(360deg); }
                }
                
                @keyframes radial-pulse {
                  0% { transform: scale(0.5); opacity: 0; }
                  50% { opacity: 0.4; }
                  100% { transform: scale(2); opacity: 0; }
                }
                
                @keyframes float-particle {
                  0%, 100% { transform: translate(0, 0); }
                  25% { transform: translate(20px, -30px); }
                  50% { transform: translate(-15px, -60px); }
                  75% { transform: translate(-25px, -30px); }
                }
                
                @keyframes glow-pulse {
                  0%, 100% { opacity: 0.5; }
                  50% { opacity: 0.8; }
                }
                
                @keyframes scale-pulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.1); }
                }
                
                @keyframes pulse-dot {
                  0%, 100% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.2); opacity: 0.8; }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HeroSection;