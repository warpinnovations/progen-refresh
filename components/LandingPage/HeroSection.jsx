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
        <div className="absolute inset-0 z-0">
          <LazyLoadImage
            alt="background image"
            src="/LandingPageAssets/astro-bg.webp"
            className="object-cover w-full h-full"
          />
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
              className={`hidden md:flex md:text-2xl lg:text-3xl ${RajdhaniFont.className} font-semibold text-white text-center w-auto md:w-3/4`}
              style={{ letterSpacing: '0.04em', lineHeight: '1.5' }}
            >
              Prometheus is Western Visayas&apos;s leading full&nbsp;service marketing agency and public relations firm.
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

            {/* REIMAGINED AWARDS SECTION - SPOTLIGHT REVEAL */}
            <div className="relative w-full pt-16 md:pt-24 pb-8">
              {/* Animated Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Meteors number={6} />
                
                {/* Rotating Spotlight Beams */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-full origin-top"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(150,137,95,0.4), transparent)',
                        transform: `rotate(${i * 120}deg)`,
                        animation: `rotate-beam ${20 + i * 5}s linear infinite`,
                        animationDelay: `${i * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Section Header */}
              <motion.div 
                className="relative z-10 text-center mb-16 md:mb-20 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className={`${RajdhaniFont.className} text-[#96895f] uppercase tracking-[0.25em] text-xs md:text-sm font-bold flex items-center gap-3`}>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#96895f] to-[#96895f]" />
                    AWARD-WINNING EXCELLENCE
                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent via-[#96895f] to-[#96895f]" />
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <h3 className={`${MoonlanderFont.className} text-6xl md:text-8xl lg:text-9xl font-black mb-4`}>
                    <span className="text-white">30</span>
                    <span className="text-[#96895f]">+</span>
                  </h3>
                  <p className={`${RajdhaniFont.className} text-white/80 text-lg md:text-2xl font-semibold tracking-wide`}>
                    Industry Awards & Recognition Since 2020
                  </p>
                </motion.div>
              </motion.div>

              {/* MAIN FEATURE: Hexagonal Spotlight Layout */}
              <div className="relative z-10 max-w-7xl mx-auto px-4">
                
                {/* Award Display Area - Perspective Stage */}
                <div className="relative" style={{ perspective: '1500px' }}>
                  
                  {/* Center Spotlight Stage */}
                  <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
                    
                    {/* Radial Stage Lighting */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div 
                        className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full transition-all duration-1000"
                        style={{
                          background: `radial-gradient(circle, rgba(150,137,95,0.15) 0%, transparent 70%)`,
                          transform: `scale(${highlightedIndex === 0 ? 1.1 : highlightedIndex === 1 ? 1 : 0.9})`
                        }}
                      />
                    </div>

                    {/* Award Cards in Circular Formation */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {awards.map((award, index) => {
                        const isActive = highlightedIndex === index;
                        const isLeft = index === 0;
                        const isCenter = index === 1;
                        const isRight = index === 2;
                        
                        // Calculate positions for circular layout
                        let positionClasses = '';
                        let zIndex = 10;
                        let scale = 0.75;
                        let opacity = 0.4;
                        let blur = 'blur(2px)';
                        
                        if (isActive) {
                          positionClasses = 'translate-x-0 translate-y-0';
                          zIndex = 30;
                          scale = 1.1;
                          opacity = 1;
                          blur = 'blur(0px)';
                        } else if ((highlightedIndex === 0 && isRight) || (highlightedIndex === 2 && isLeft) || (highlightedIndex === 1 && (isLeft || isRight))) {
                          // Adjacent cards
                          if ((highlightedIndex === 0 && isCenter) || (highlightedIndex === 2 && isCenter) || (highlightedIndex === 1 && isLeft)) {
                            positionClasses = 'md:-translate-x-64 lg:-translate-x-80 translate-y-0';
                          } else {
                            positionClasses = 'md:translate-x-64 lg:translate-x-80 translate-y-0';
                          }
                          zIndex = 20;
                          scale = 0.85;
                          opacity = 0.6;
                          blur = 'blur(1px)';
                        } else {
                          // Far card
                          positionClasses = 'translate-y-32 md:translate-y-40';
                          zIndex = 10;
                          scale = 0.7;
                          opacity = 0.3;
                          blur = 'blur(3px)';
                        }
                        
                        return (
                          <motion.div
                            key={award.filename}
                            className="absolute w-full max-w-sm md:max-w-md transition-all duration-1000 ease-out"
                            style={{
                              zIndex,
                              transform: `scale(${scale})`,
                              opacity,
                              filter: blur,
                            }}
                            initial={{ opacity: 0, scale: 0.5, y: 100 }}
                            animate={{ 
                              opacity,
                              scale,
                              y: 0
                            }}
                            transition={{ 
                              delay: 0.8 + (index * 0.2),
                              duration: 1,
                              type: "spring",
                              stiffness: 80
                            }}
                          >
                            <div className={positionClasses + " transition-transform duration-1000 ease-out"}>
                              {/* Hexagonal Card Container */}
                              <div className="relative">
                                {/* Hexagon Background Shape */}
                                <div className="relative mx-auto" style={{ width: '100%', maxWidth: '400px' }}>
                                  
                                  {/* Main Card */}
                                  <div
                                    className={`
                                      relative p-8 md:p-10 rounded-3xl
                                      backdrop-blur-2xl border-2
                                      transition-all duration-700
                                      ${isActive 
                                        ? 'bg-gradient-to-br from-black/80 via-black/70 to-black/60 border-[#96895f] shadow-[0_0_80px_rgba(150,137,95,0.4)]' 
                                        : 'bg-black/50 border-[#96895f]/20 shadow-[0_0_20px_rgba(0,0,0,0.3)]'
                                      }
                                    `}
                                  >
                                    
                                    {/* Glowing Corner Accents */}
                                    {isActive && (
                                      <>
                                        <div className="absolute top-0 left-0 w-20 h-20">
                                          <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#96895f] rounded-tl-2xl" />
                                          <div className="absolute top-1 left-1 w-2 h-2 bg-[#96895f] rounded-full animate-pulse" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-20 h-20">
                                          <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#96895f] rounded-br-2xl" />
                                          <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#96895f] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                                        </div>
                                      </>
                                    )}

                                    {/* Award Logo with Orbital Ring */}
                                    <div className="relative flex items-center justify-center mb-8">
                                      
                                      {/* Orbital Ring Effect on Active */}
                                      {isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <div 
                                            className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-[#96895f]/30"
                                            style={{
                                              animation: 'rotate-ring 20s linear infinite'
                                            }}
                                          >
                                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#96895f] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(150,137,95,0.8)]" />
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Logo */}
                                      <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
                                        <img
                                          src={`/LandingPageAssets/awards/${award.filename}`}
                                          alt={award.alt}
                                          className={`w-full h-full object-contain transition-all duration-700 ${
                                            isActive 
                                              ? 'grayscale-0 brightness-110' 
                                              : 'grayscale brightness-75'
                                          }`}
                                          style={{
                                            filter: isActive ? 'drop-shadow(0 0 30px rgba(150,137,95,0.5))' : 'none',
                                          }}
                                        />
                                      </div>
                                    </div>

                                    {/* Award Details */}
                                    <div className="space-y-4 text-center">
                                      
                                      {/* Award Title */}
                                      <h4 className={`${RajdhaniFont.className} text-white text-2xl md:text-3xl font-bold uppercase tracking-wider transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                        {award.alt}
                                      </h4>

                                      {/* Achievement Badge */}
                                      <div className="flex justify-center">
                                        <div className={`
                                          inline-flex items-center gap-3 px-6 py-3 rounded-full border-2
                                          transition-all duration-500
                                          ${isActive 
                                            ? 'bg-[#96895f]/20 border-[#96895f] shadow-[0_0_20px_rgba(150,137,95,0.3)]' 
                                            : 'bg-[#96895f]/10 border-[#96895f]/30'
                                          }
                                        `}>
                                          <div className="relative">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#96895f]" />
                                            {isActive && (
                                              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#96895f] animate-ping" />
                                            )}
                                          </div>
                                          <span className={`${RajdhaniFont.className} text-[#96895f] text-sm md:text-base font-bold uppercase tracking-wider`}>
                                            {award.achievement}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Year & Category - Only visible when active */}
                                      <div 
                                        className="space-y-2 transition-all duration-500 overflow-hidden"
                                        style={{
                                          maxHeight: isActive ? '200px' : '0',
                                          opacity: isActive ? 1 : 0
                                        }}
                                      >
                                        <p className={`${OxaniumFont.className} text-white/90 text-base font-semibold`}>
                                          {award.year}
                                        </p>
                                        <p className={`${RajdhaniFont.className} text-[#96895f] text-sm uppercase tracking-widest font-bold`}>
                                          {award.category}
                                        </p>
                                        
                                        {/* Description */}
                                        <div className="pt-4 mt-4 border-t border-[#96895f]/30">
                                          <p className={`${OxaniumFont.className} text-white/70 text-sm leading-relaxed`}>
                                            {award.description}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    {isActive && (
                                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#96895f] to-transparent rounded-full shadow-[0_0_15px_rgba(150,137,95,0.6)]" />
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

                  {/* Navigation Dots - Redesigned */}
                  <div className="flex justify-center gap-6 mt-12">
                    {awards.map((award, index) => (
                      <button
                        key={index}
                        onClick={() => setHighlightedIndex(index)}
                        className="relative group"
                        aria-label={`View ${award.alt}`}
                      >
                        <div className="relative flex flex-col items-center gap-2">
                          {/* Dot */}
                          <div
                            className={`
                              w-3 h-3 rounded-full transition-all duration-500
                              ${highlightedIndex === index 
                                ? 'bg-[#96895f] shadow-[0_0_20px_rgba(150,137,95,0.8)] scale-125' 
                                : 'bg-white/30 hover:bg-white/50 scale-100'
                              }
                            `}
                          />
                          
                          {/* Label - Always visible */}
                          <span className={`
                            ${RajdhaniFont.className} text-xs uppercase tracking-wider font-bold
                            transition-all duration-300
                            ${highlightedIndex === index 
                              ? 'text-[#96895f] opacity-100' 
                              : 'text-white/50 opacity-70'
                            }
                          `}>
                            {award.achievement}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="text-center mt-16">
                    <Link href="/portfolio">
                      <button className={`group ${RajdhaniFont.className} text-white/80 hover:text-[#96895f] text-sm md:text-base uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-3 mx-auto px-8 py-4 rounded-xl border-2 border-[#96895f]/30 hover:border-[#96895f] hover:bg-[#96895f]/5 hover:shadow-[0_0_30px_rgba(150,137,95,0.2)]`}>
                        View Our Award-Winning Work
                        <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* CSS Animations */}
              <style jsx>{`
                @keyframes rotate-beam {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes rotate-ring {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
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