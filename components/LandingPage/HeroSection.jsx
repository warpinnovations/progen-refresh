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
      scale: [0.4, 0.8, 1.1],
      filter: ["blur(15px)", "blur(5px)", "blur(0px)"],
      y: [100, 0, 0],
      transition: { duration: 0.8, ease: "easeOut", times: [0, 0.4, 1] },
    },
  };
  const logoHover = { scale: 1.1, transition: { type: "spring", stiffness: 300 } };

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
            <div className="relative w-full max-w-4xl pt-16 overflow-hidden">
              {/* Meteors render here, contained by the relative parent */}
              <Meteors number={30} />

              <motion.div
                className="grid items-start grid-cols-3 gap-x-8 md:gap-x-16"
                variants={logoContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {starshipsLogos.map((logo) => (
                  <motion.div
                    key={logo.filename}
                    variants={logoWarpVariants}
                    whileHover={logoHover}
                    className="z-10 flex flex-col items-center justify-start text-center"
                  >
                    <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32">
                      <img
                        src={`/LandingPageAssets/awards/${logo.filename}`}
                        alt={logo.alt}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <p className={`mt-4 text-sm md:text-base lg:text-lg ${OxaniumFont.className} font-bold`}>
                      {logo.alt}
                    </p>
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