"use client";
import React from "react";
import { useState, useEffect } from "react";
import PageTransition from "@/components/Global/PageTransition";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarsCanvas from "@/components/Global/StarCanvas";
import { Meteors } from "@/components/Global/Meteor"
import { Oxanium } from "next/font/google";
import { motion } from "framer-motion";
import localFont from "next/font/local";

const OxaniumFont = Oxanium({
  weight: "400",
  subsets: ["latin"],
});
const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });

const HeroSection = () => {
  const [activeText, setActiveText] = useState(0);
  const heroText = "BE LIMITLESS";
  const glitchCharacterOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/";
  const starshipsLogos = [
    { filename: "MEA Logo.png", alt: "Marketing  Awards" },
    { filename: "Anvil Awards Logo.png", alt: "Anvil Awards" },
    { filename: "Asia CEO Awards.PNG", alt: "Asia CEO Awards" },
  ];

  // --- Glitch Text Effect Logic (No Changes) ---
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

  // --- Animation Variants (No Changes) ---
  const logoContainerVariants = {
    hidden: {},
    visible: { transition: { delayChildren: 1.5, staggerChildren: 0.8 } },
  };
  const logoWarpVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 1],
      scale: [0.4, 0.8, 1],
      filter: ["blur(15px)", "blur(5px)", "blur(0px)"],
      y: [100, 0, 0],
      transition: { duration: 0.8, ease: "easeOut", times: [0, 0.4, 1] },
    },
  };
  const logoHover = {
    scale: 1.08,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  };

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

          <div className="z-30 flex flex-col items-center justify-center p-4 space-y-10 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`${MoonlanderFont.className} font-black text-4xl md:text-6xl lg:text-7xl`}
            >
              {textArray[activeText]?.substring(0, 3)}{" "}
              <span className="text-prOrange">{textArray[activeText]?.substring(3)}</span>
            </motion.h1>

            <h1 className={`hidden md:flex md:text-2xl ${OxaniumFont.className} font-semibold text-white text-center w-auto md:w-3/4`}>
              Prometheus is Western Visayas&apos;s leading full&nbsp;service marketing agency and public relations firm.
            </h1>

            {/* AWARDS SECTION WITH METEORS */}
            <div className="relative w-full max-w-4xl pt-20 pb-8">
              {/* Meteors render here, contained by the relative parent */}
              <Meteors number={30} />

              <motion.div
                className="grid items-start grid-cols-3 gap-x-6 md:gap-x-12 lg:gap-x-16 px-4"
                variants={logoContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {starshipsLogos.map((logo) => (
                  <motion.div
                    key={logo.filename}
                    variants={logoWarpVariants}
                    whileHover={logoHover}
                    className="z-10 flex flex-col items-center justify-start text-center group"
                  >
                    {/* Logo Container with Clean Outlined Border */}
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

                    {/* Clean Enhanced Label */}
                    <div className="relative mt-4 px-2 w-full">
                      <p className={`text-xs md:text-sm lg:text-base ${OxaniumFont.className} font-bold text-white tracking-wider uppercase transition-all duration-300 ease-out group-hover:text-[#96895f] leading-tight break-words`}>
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