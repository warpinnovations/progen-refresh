"use client";
import React from "react";
import { useState, useEffect } from "react";
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
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }

        .animate-meteor-effect {
          animation: meteor-effect linear infinite;
        }
      `}</style>
    </>
  );
};

const HeroSection = () => {
  const [activeText, setActiveText] = useState(0);
  const heroText = "BE LIMITLESS";
  const glitchCharacterOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/";
  const starshipsLogos = [
    { filename: "MEA Logo.png", alt: "Marketing Awards" },
    { filename: "Anvil Awards Logo.png", alt: "Anvil Awards" },
    { filename: "Asia CEO Awards.PNG", alt: "Asia CEO Awards" },
  ];

  // Glitch Text Effect
  const textArray = React.useMemo(() => {
    const generateGlitch = (text) => {
      let glitchedText = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") { glitchedText += " "; continue; }
        if (Math.random() < 0.2) {
          const randomIndex = Math.floor(Math.random() * glitchCharacterOptions.length);
          glitchedText += glitchCharacterOptions[randomIndex];
        } else {
          glitchedText += text[i];
        }
      }
      return glitchedText;
    };
    const frames = [];
    const revealSteps = heroText.length;
    const flickerSteps = 20;
    for (let i = 0; i <= revealSteps; i++) {
      const partialText = heroText.substring(0, i);
      const randomJunk = Array.from({ length: revealSteps - i }, () => glitchCharacterOptions[Math.floor(Math.random() * glitchCharacterOptions.length)]).join("");
      frames.push(partialText + randomJunk);
    }
    for (let i = 0; i < flickerSteps; i++) { frames.push(generateGlitch(heroText)); }
    frames.push(heroText);
    return frames;
  }, [heroText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((current) => {
        if (current >= textArray.length - 1) {
          clearInterval(interval);
          return textArray.length - 1;
        }
        return current + 1;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [textArray]);

  return (
    <PageTransition>
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <LazyLoadImage
            alt="background image"
            src="/LandingPageAssets/astro-bg.webp"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Background Stars (WebGL) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <StarsCanvas />
        </div>

        {/* Overlay and Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />

          <div className="z-30 flex flex-col items-center justify-center p-4 space-y-6 md:space-y-8 text-center text-white">
            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`${MoonlanderFont.className} font-black text-4xl md:text-6xl lg:text-7xl`}
            >
              {textArray[activeText]?.substring(0, 3)}{" "}
              <span className="text-prOrange">{textArray[activeText]?.substring(3)}</span>
            </motion.h1>

            {/* Subtitle - Updated with Rajdhani */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              className={`hidden md:flex md:text-2xl lg:text-3xl ${RajdhaniFont.className} font-semibold text-white text-center w-auto md:w-3/4`}
              style={{
                letterSpacing: '0.04em',
                lineHeight: '1.5',
              }}
            >
              Prometheus is Western Visayas&apos;s leading full&nbsp;service marketing agency and public relations firm.
            </motion.h2>

            {/* Get Started Button - Updated with Rajdhani */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            >
              <Link href="/contact">
                <motion.button
                  className={`group relative px-8 py-3.5 md:px-12 md:py-4 ${RajdhaniFont.className} font-bold text-sm md:text-base uppercase tracking-[0.12em] overflow-hidden rounded-lg bg-transparent border border-[#96895f]/70 text-white shadow-[0_0_20px_rgba(150,137,95,0.15)] hover:shadow-[0_0_35px_rgba(150,137,95,0.35)] transition-all duration-300 ease-out backdrop-blur-sm`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated shine effect on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  {/* Glow background on hover */}
                  <span className="absolute inset-0 bg-[#96895f]/0 group-hover:bg-[#96895f]/10 transition-all duration-300 ease-out" />
                  
                  {/* Button text with icon */}
                  <span className="relative z-10 flex items-center gap-3 group-hover:text-[#EAE2B7] transition-colors duration-300">
                    Get Started
                    <svg 
                      className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  
                  {/* Outer glow */}
                  <span className="absolute -inset-1 rounded-lg bg-[#96895f]/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </motion.button>
              </Link>
            </motion.div>

            {/* AWARDS SECTION WITH METEORS */}
            <div className="relative w-full max-w-4xl pt-16 md:pt-20 pb-8">
              {/* Meteors */}
              <Meteors number={20} />

              {/* Awards - Simple fade-in without popup */}
              <motion.div
                className="grid items-start grid-cols-3 gap-x-6 md:gap-x-12 lg:gap-x-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              >
                {starshipsLogos.map((logo) => (
                  <motion.div
                    key={logo.filename}
                    whileHover={{
                      scale: 1.08,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      }
                    }}
                    className="z-10 flex flex-col items-center justify-start text-center group"
                  >
                    {/* Logo Container - ORIGINAL DESIGN */}
                    <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 p-4 md:p-5 lg:p-6 rounded-2xl border-2 border-[#96895f]/40 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-sm shadow-xl transition-all duration-300 ease-out group-hover:border-[#96895f] group-hover:shadow-[0_0_25px_rgba(150,137,95,0.35)] group-hover:bg-black/30">
                      {/* Subtle inner glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#96895f]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

                      {/* Corner accents */}
                      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#96895f]/60 rounded-tl-md" />
                      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#96895f]/60 rounded-tr-md" />
                      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#96895f]/60 rounded-bl-md" />
                      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#96895f]/60 rounded-br-md" />

                      <img
                        src={`/LandingPageAssets/awards/${logo.filename}`}
                        alt={logo.alt}
                        className="relative z-10 object-contain w-full h-full filter brightness-110 contrast-110"
                      />
                    </div>

                    {/* Label - Updated with Rajdhani */}
                    <div className="relative mt-4 px-2 w-full">
                      <p className={`text-xs md:text-sm lg:text-base ${RajdhaniFont.className} font-bold text-white uppercase transition-all duration-300 ease-out group-hover:text-[#96895f] leading-tight break-words`}
                         style={{
                           letterSpacing: '0.08em'
                         }}>
                        {logo.alt}
                      </p>
                      {/* Underline accent */}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#96895f] to-transparent group-hover:w-3/4 transition-all duration-300 ease-out" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HeroSection;