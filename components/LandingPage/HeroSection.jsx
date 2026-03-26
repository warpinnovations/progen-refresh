"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import PageTransition from "@/components/Global/PageTransition";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarsCanvas from "@/components/Global/StarCanvas";
import { Oxanium, Rajdhani } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
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

// Award Modal Component
const AwardModal = ({ win, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const recognitionStyle =
    win.recognition === "Gold" || win.recognition === "Winner"
      ? { bg: "bg-[#96895f]/20", text: "text-[#D4AF37]", border: "border-[#96895f]/50", shadow: "shadow-[0_0_10px_rgba(212,175,55,0.3)]" }
      : win.recognition === "Silver"
      ? { bg: "bg-white/8", text: "text-white/70", border: "border-white/25", shadow: "" }
      : { bg: "bg-white/4", text: "text-white/45", border: "border-white/12", shadow: "" };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,15,0.97), rgba(22,20,14,0.95))",
          border: "1px solid rgba(150,137,95,0.25)",
          boxShadow: "0 30px 80px -10px rgba(0,0,0,0.8), inset 0 0 60px rgba(150,137,95,0.03)",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-[#96895f]/15">
          {win.logo && (
            <img src={`/LandingPageAssets/awards/${win.logo}`} alt={win.awardBody} className="h-8 w-8 object-contain opacity-80" />
          )}
          <div className="flex-1 min-w-0">
            <p className={`${OxaniumFont.className} text-[#96895f] text-[9px] uppercase tracking-[0.2em] font-bold`}>
              {win.awardBody}
            </p>
            <p className={`${RajdhaniFont.className} text-white/85 text-sm font-bold leading-snug`}>
              {win.category}
            </p>
          </div>
          <div className={`${RajdhaniFont.className} shrink-0 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg border ${recognitionStyle.bg} ${recognitionStyle.text} ${recognitionStyle.border} ${recognitionStyle.shadow}`}>
            {win.recognition}
          </div>
        </div>

        {/* About the Award */}
        <div className="px-5 py-4">
          <p className={`${OxaniumFont.className} text-[#96895f] text-[9px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-2`}>
            <span className="w-3 h-[1px] bg-[#96895f]/50" />
            About the Award
          </p>
          <p className={`${RajdhaniFont.className} text-white/65 text-sm leading-relaxed`} style={{ letterSpacing: "0.03em" }}>
            {win.aboutAward}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200"
          aria-label="Close"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
          <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[#96895f]/25 rounded-tr-lg" />
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none">
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[#96895f]/25 rounded-bl-lg" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [activeText, setActiveText] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedWin, setSelectedWin] = useState(null);
  const hoverTimerRef = useRef(null);
  
  const heroText = "BE LIMITLESS";
  const glitchCharacterOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/";

  const awards = [
    {
      filename: "MEA Logo.png",
      alt: "Marketing Excellence Awards",
      achievement: "MEA",
      year: "",
      category: "Marketing Excellence",
      description: "Breakthrough digital, experiential and on-the-ground campaigns",
      awardBody: "Marketing Excellence Awards",
      subtitle: "by Marketing-Interactive · Asia-Pacific",
      wins: [
        { year: "2025", category: "Excellence in Location-Based Marketing", recognition: "Finalist", aboutAward: "The Marketing Excellence Awards recognizes campaigns that creatively leverage location-based strategies to deliver precision marketing, creating relevant audience experiences rooted in place and context." },
        { year: "2025", category: "Excellence in Customer Engagement", recognition: "Finalist", aboutAward: "This recognition honors campaigns that demonstrate outstanding ability to build meaningful, lasting connections with customers through innovative and measurable engagement strategies." },
        { year: "2025", category: "Excellence in Marketing to a Specific Audience", recognition: "Finalist", aboutAward: "This award category celebrates campaigns that demonstrate exceptional audience intelligence and targeting, delivering precisely crafted messages that achieve high impact with a defined demographic." },
        { year: "2024", category: "Excellence in Anniversary Marketing", recognition: "Silver", aboutAward: "The Marketing Excellence Awards (MEA) is a highly-regarded program that honors outstanding brand-building initiatives and effective marketing campaigns. It honors campaigns that utilize a corporate anniversary to create positive market resonance and expand competitive standing." },
        { year: "2024", category: "Excellence in Urban Guerrilla Marketing", recognition: "Silver", aboutAward: "This Marketing Excellence Award recognizes the most creative, bold, and high-impact non-traditional marketing campaigns. This category celebrates campaigns that leverage a business's anniversary to generate positive public attention and significantly boost market growth." },
        { year: "2023", category: "Marketing Leader of the Year", recognition: "Bronze", aboutAward: "The Marketing Leader of the Year award is given to a brand-side marketing leader for achieving significant impact and showing outstanding leadership. The award recognizes excellence across core areas of marketing competency, including creative strategy, forward-thinking execution, and effective team motivation." },
        { year: "2023", category: "Excellence in Public Sector Marketing", recognition: "Finalist", aboutAward: "This Marketing Excellence Award honors outstanding campaigns executed for government agencies or public institutions, recognizing effective communication strategies that serve and engage the public." },
      ],
    },
    {
      filename: "Anvil Awards Logo.png",
      alt: "Anvil Awards",
      achievement: "Anvil",
      year: "2025–2026",
      category: "Public Relations Excellence",
      description: "Awarded for strategic communication and measurable impact",
      awardBody: "Anvil Awards",
      subtitle: "by PRSP · Only Provincial Agency Honored",
      wins: [
        { year: "2026", category: "PR Tools: Special Events and Exhibits", recognition: "Silver", aboutAward: "This category of the Anvil Awards recognizes the most outstanding event activations and exhibit designs that effectively achieve public relations goals and strengthen stakeholder relationships." },
        { year: "2026", category: "PR-Led Integrated Campaign", recognition: "Finalist", aboutAward: "This Anvil Award category honors comprehensive campaigns that seamlessly integrate multiple PR disciplines into a single, cohesive strategy achieving significant public relations results." },
        { year: "2025", category: "Best PR-Led Integrated Campaign", recognition: "Silver", aboutAward: "The Anvil Awards represents the highest national honor for excellence in strategic communications and public relations in the Philippines. This particular category recognizes the best comprehensive campaign that was driven by a strong PR-led strategy." },
        { year: "2025", category: "PR Tools: Special Events and Exhibits", recognition: "Silver", aboutAward: "This Anvil Award category specifically recognizes the most effective and creative event activation through the use of innovative platforms and interactive elements that capture audience engagement in order to achieve campaign goals." },
      ],
    },
    {
      filename: "Asia CEO Awards.PNG",
      alt: "Asia CEO Awards",
      achievement: "Asia CEO",
      year: "",
      category: "Leadership & Innovation",
      description: "Southeast Asia's premier recognition for visionary business leadership",
      awardBody: "Asia CEO Awards",
      subtitle: "Largest Business Awards in Southeast Asia",
      wins: [
        { year: "2025", category: "Young Leader of the Year", recognition: "Winner", aboutAward: "This recognition is one of the most prestigious honors from one of Southeast Asia's largest business award-giving bodies. It celebrates leaders who are creating significant national impact through innovation and dedicated community empowerment initiatives." },
        { year: "2025", category: "SME Company of the Year", recognition: "Winner", aboutAward: "The SME Company of the Year celebrates organizations that demonstrate exceptional growth trajectory and maintain high operational excellence. The award also places a strong emphasis on the company's positive social impact within its operating region." },
        { year: "2024", category: "Young Leader of the Year", recognition: "Winner", aboutAward: "This award acknowledges individuals who are actively shaping the future landscape of Philippine business and driving significant change. Atty. Lcid Crescent Fernandez was honored for his exemplary and boundary-pushing leadership in the regional business community." },
        { year: "2024", category: "SME Company of the Year", recognition: "Winner", aboutAward: "The Asia CEO Awards recognizes small and medium enterprises (SMEs) that exhibit remarkable growth, competitiveness, and commitment to social impact. Prometheus was honored for its impressive and rapid transformation from a local startup into a multi-division agency." },
      ],
    },
    {
      filename: "/AwardsExhibitAssets/Logos/Pr Awards 2025/PR_Awards.png",
      alt: "PR Awards Singapore",
      achievement: "PR Awards",
      year: "",
      category: "Experiential PR",
      description: "Regional recognition for outstanding PR campaigns across Asia-Pacific",
      awardBody: "PR Awards Singapore",
      subtitle: "by Marketing Interactive · Singapore",
      wins: [
        { year: "2025", category: "Best Experiential PR Campaign", recognition: "Finalist", aboutAward: "The PR Awards is a highly respected regional recognition program held in Singapore that celebrates excellence in public relations. It specifically recognizes outstanding PR campaigns that have demonstrated innovative strategy and impressive results across the Asia-Pacific, South Asia, and Oceania regions. Prometheus secured a finalist spot in this competition." },
      ],
    },
  ];

  // Auto-cycle — pauses while any card is hovered
  useEffect(() => {
    if (hoveredIndex !== null) return;
    const timer = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % awards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [awards.length, hoveredIndex]);

  // Hover handlers — small delay prevents panel flickering when cursor moves card→panel
  const handleCardMouseEnter = (index) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredIndex(index);
  };
  const handleCardMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setHoveredIndex(null), 180);
  };
  const handlePanelMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };
  const handlePanelMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setHoveredIndex(null), 180);
  };

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
               Prometheus is the premier, full-service public relations firm and marketing agency in Western Visayas, amplifying powerful stories to build brands and create high-impact customer experiences.
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
              
              {/* Section Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Subtle meteors — same component used in hero */}
                <Meteors number={6} />

                {/* Ambient radial glow — shifts subtly with active card */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
                  style={{
                    background: `radial-gradient(ellipse 700px 500px at center,
                      rgba(150,137,95,0.10) 0%,
                      transparent 65%)`,
                    transform: `translateX(${(highlightedIndex - 1) * 40}px)`,
                  }}
                />

                {/* Two soft pulsing rings — echo the Certifications section style */}
                {[0, 1].map(i => (
                  <motion.div
                    key={`award-ring-${i}`}
                    className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                    style={{
                      width: `${320 + i * 180}px`,
                      height: `${320 + i * 180}px`,
                      marginLeft: `-${160 + i * 90}px`,
                      marginTop: `-${160 + i * 90}px`,
                      border: `1px solid rgba(150,137,95,${0.12 - i * 0.04})`,
                    }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 4 + i * 1.5, delay: i * 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}

                {/* Subtle top/bottom vignette */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)" }}
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
                      10
                      {/* Glowing Number Effect */}
                      <span 
                        className="absolute inset-0 text-white blur-xl opacity-50"
                        style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
                      >
                        10
                      </span>
                    </span>
                    <span 
                      className="text-[#96895f] relative inline-block"
                      style={{ animation: 'scale-pulse 2s ease-in-out infinite' }}
                    >
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
                        
                        // Positioning — numeric offsets fed directly into framer-motion
                        const isMd = typeof window !== 'undefined' && window.innerWidth >= 768;
                        const sideX = isMd ? 380 : 200;
                        const farY = isMd ? 208 : 160;

                        let xOffset = 0;
                        let yOffset = 0;
                        let zIndex = 10;
                        let scale = 0.7;
                        let opacity = 0.3;
                        let blur = 'blur(3px)';
                        let rotateY = 0;

                        let isAdjacent = false;
                        let isFar = false;

                        if (isActive) {
                          zIndex = 30;
                          scale = isMd ? 1.12 : 0.95;
                          opacity = 1;
                          blur = 'blur(0px)';
                          // Shift left when this card is hovered to make room for the detail panel
                          xOffset = hoveredIndex === index ? (isMd ? -175 : -110) : 0;
                        } else if ((highlightedIndex === 0 && isRight) || (highlightedIndex === 2 && isLeft) || (highlightedIndex === 1 && (isLeft || isRight))) {
                          // Adjacent card — clickable to switch
                          isAdjacent = true;
                          const goLeft = (highlightedIndex === 0 && isCenter) || (highlightedIndex === 2 && isCenter) || (highlightedIndex === 1 && isLeft);
                          xOffset = goLeft ? -sideX : sideX;
                          rotateY = goLeft ? 20 : -20;
                          zIndex = 20;
                          scale = 0.82;
                          opacity = 0.55;
                          blur = 'blur(0px)';
                        } else {
                          // Far card — pushed below, completely passive
                          isFar = true;
                          yOffset = farY;
                          zIndex = 10;
                          scale = 0.6;
                          opacity = 0.12;
                          blur = 'blur(6px)';
                        }

                        return (
                          <motion.div
                            key={award.filename}
                            className={`absolute w-full max-w-xs md:max-w-md ${isFar ? 'pointer-events-none' : 'cursor-pointer'}`}
                            style={{ zIndex, transformStyle: 'preserve-3d' }}
                            initial={{ opacity: 0, scale: 0.3, y: 200, rotateX: 90 }}
                            animate={{
                              opacity,
                              scale,
                              x: xOffset,
                              y: yOffset,
                              rotateY,
                              rotateX: 0,
                              filter: blur,
                            }}
                            transition={{
                              // Default — governs the entrance animation (opacity, scale, y, rotateY…)
                              default: {
                                delay: 0.8 + (index * 0.15),
                                duration: 1.2,
                                type: "spring",
                                stiffness: 60,
                                damping: 15,
                              },
                              // x — no delay, responsive spring so hover shift feels immediate
                              x: {
                                type: "spring",
                                stiffness: 380,
                                damping: 38,
                                mass: 0.7,
                              },
                            }}
                            onClick={isAdjacent ? () => setHighlightedIndex(index) : undefined}
                            onMouseEnter={isActive ? () => handleCardMouseEnter(index) : undefined}
                            onMouseLeave={isActive ? handleCardMouseLeave : undefined}
                          >
                            <div className="transition-all duration-700 ease-out">
                              {/* Enhanced Hexagonal Card Container */}
                              <div className="relative">
                                <div className="relative mx-auto w-full max-w-[220px] md:max-w-[400px]">

                                  {/* Outer halo pulse — active only */}
                                  {isActive && (
                                    <motion.div
                                      className="absolute -inset-3 md:-inset-5 rounded-[2rem] md:rounded-[2.5rem] pointer-events-none"
                                      animate={{
                                        boxShadow: [
                                          '0 0 60px rgba(150,137,95,0.25)',
                                          '0 0 120px rgba(150,137,95,0.5)',
                                          '0 0 60px rgba(150,137,95,0.25)',
                                        ]
                                      }}
                                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                  )}

                                  {/* Main Card with Enhanced Effects */}
                                  <div
                                    className={`
                                      relative p-4 md:p-10 rounded-2xl md:rounded-3xl
                                      backdrop-blur-2xl border-2
                                      transition-all duration-700
                                      ${isActive
                                        ? 'bg-gradient-to-br from-black/90 via-black/80 to-black/70 border-[#96895f] shadow-[0_0_160px_rgba(150,137,95,0.7),0_0_80px_rgba(150,137,95,0.45),0_0_40px_rgba(150,137,95,0.25),inset_0_0_60px_rgba(150,137,95,0.12)]'
                                        : 'bg-black/40 border-[#96895f]/20 shadow-[0_0_20px_rgba(0,0,0,0.4)]'
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
                                        className="relative w-20 h-20 md:w-44 md:h-44 flex items-center justify-center"
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
                                          src={award.filename.startsWith('/') ? award.filename : `/LandingPageAssets/awards/${award.filename}`}
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

                      {/* ── Detail Panel ── */}
                      <AnimatePresence mode="wait">
                        {hoveredIndex !== null && (
                          <motion.div
                            key={`detail-panel-${hoveredIndex}`}
                            className="absolute hidden md:block w-full max-w-[320px]"
                            style={{
                              left: 'calc(50% + 52px)',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              zIndex: 40,
                            }}
                            initial={{ opacity: 0, x: 80, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 80, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            onMouseEnter={handlePanelMouseEnter}
                            onMouseLeave={handlePanelMouseLeave}
                          >
                            {/* Outer ambient glow */}
                            <div className="absolute -inset-4 rounded-[2rem] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(150,137,95,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }} />

                            <div className="relative rounded-3xl overflow-hidden backdrop-blur-3xl border border-[#96895f]/70 bg-gradient-to-br from-black/95 via-[#96895f]/4 to-black/92 shadow-[0_0_120px_rgba(150,137,95,0.45),0_0_60px_rgba(150,137,95,0.2),inset_0_0_80px_rgba(150,137,95,0.06)]">

                              {/* Animated border shimmer */}
                              <motion.div
                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                style={{ border: '1px solid rgba(150,137,95,0.5)' }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                              />

                              {/* Top-left corner fill */}
                              <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none overflow-hidden rounded-tl-3xl">
                                <div style={{ background: 'linear-gradient(135deg, rgba(150,137,95,0.12) 0%, transparent 55%)' }} className="absolute inset-0" />
                                <div className="absolute top-3.5 left-3.5 w-7 h-7 border-t-2 border-l-2 border-[#96895f]" />
                              </div>
                              {/* Bottom-right corner fill */}
                              <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none overflow-hidden rounded-br-3xl">
                                <div style={{ background: 'linear-gradient(315deg, rgba(150,137,95,0.12) 0%, transparent 55%)' }} className="absolute inset-0" />
                                <div className="absolute bottom-3.5 right-3.5 w-7 h-7 border-b-2 border-r-2 border-[#96895f]" />
                              </div>

                              {/* Scan line */}
                              <motion.div
                                className="absolute inset-0 pointer-events-none overflow-hidden"
                                animate={{ opacity: [0, 0.25, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                              >
                                <motion.div
                                  className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#96895f] to-transparent"
                                  animate={{ y: [-4, 600] }}
                                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                  style={{ filter: 'blur(1.5px)' }}
                                />
                              </motion.div>

                              <div className="relative p-5">

                                {/* Header row */}
                                <div className="flex items-start justify-between gap-3 mb-4">
                                  <div>
                                    <p className={`${RajdhaniFont.className} text-[#96895f]/60 text-[10px] uppercase tracking-[0.22em] font-bold mb-1`}>
                                      {awards[hoveredIndex].subtitle}
                                    </p>
                                    <h4 className={`${RajdhaniFont.className} text-white text-base font-black uppercase tracking-wide leading-tight`}>
                                      {awards[hoveredIndex].awardBody}
                                    </h4>
                                  </div>

                                </div>

                                {/* Animated separator */}
                                <motion.div
                                  className="w-full h-px mb-4"
                                  style={{ background: 'linear-gradient(to right, rgba(150,137,95,0.9), rgba(150,137,95,0.3), transparent)' }}
                                  animate={{ opacity: [0.6, 1, 0.6] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Wins list */}
                                <div className="space-y-2">
                                  {awards[hoveredIndex].wins.map((win, i) => (
                                    <motion.div
                                      key={i}
                                      className="relative flex items-center gap-2.5 p-2.5 rounded-xl border border-[#96895f]/15 bg-white/[0.03] cursor-pointer hover:border-[#96895f]/40 hover:bg-white/[0.06] transition-colors duration-200"
                                      initial={{ opacity: 0, x: 25 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 + i * 0.08, duration: 0.32, ease: 'easeOut' }}
                                      onClick={() => setSelectedWin({ ...win, awardBody: awards[hoveredIndex].awardBody, logo: awards[hoveredIndex].filename })}
                                    >
                                      {/* Year block */}
                                      <div className="shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-[#96895f]/12 border border-[#96895f]/35">
                                        <span className={`${RajdhaniFont.className} text-[#96895f]/55 text-[9px] font-bold leading-none`}>20</span>
                                        <span className={`${MoonlanderFont.className} text-[#96895f] text-base font-black leading-none`}>{win.year.slice(2)}</span>
                                      </div>

                                      {/* Text */}
                                      <div className="flex-1 min-w-0">
                                        {win.body && (
                                          <p className={`${RajdhaniFont.className} text-[#96895f]/60 text-[9px] uppercase tracking-widest leading-none mb-0.5`}>
                                            {win.body}
                                          </p>
                                        )}
                                        <p className={`${RajdhaniFont.className} text-white/90 text-xs font-bold leading-snug tracking-wide`}>
                                          {win.category}
                                        </p>
                                      </div>

                                      {/* Recognition badge */}
                                      <div className={`${RajdhaniFont.className} shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-lg border ${
                                        win.recognition === 'Gold' || win.recognition === 'Winner'
                                          ? 'bg-[#96895f]/20 text-[#96895f] border-[#96895f]/50 shadow-[0_0_10px_rgba(150,137,95,0.3)]'
                                          : win.recognition === 'Silver'
                                          ? 'bg-white/6 text-white/65 border-white/22'
                                          : 'bg-white/3 text-white/40 border-white/10'
                                      }`}>
                                        {win.recognition}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
      {/* Award Modal */}
      <AnimatePresence>
        {selectedWin && (
          <AwardModal win={selectedWin} onClose={() => setSelectedWin(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default HeroSection;