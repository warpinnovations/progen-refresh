"use client";
import React from "react";
import { useState, useEffect } from "react";
import PageTransition from "@/components/Global/PageTransition";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarsCanvas from "@/components/Global/StarCanvas";
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
  const [play, setPlay] = useState(false);
  const heroText = { text: "BE LIMITLESS" };
  const glitchCharacterOptions =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?";
  const starshipsLogos = [
    {
      filename: "MEA Logo.png",
      alt: "Marketing Excellence Awards Logo",
    },
    {
      filename: "Anvil Awards Logo.png",
      alt: "Anvil Awards Logo",
    },
    {
      filename: "Asia CEO Awards.PNG",
      alt: "Asia CEO Awards Logo",
    },
  ];

  const click = () => {
    if (activeText === textArray.length - 1) {
      setActiveText(0);
    }
    setPlay(true);
  };

  useEffect(() => {
    let interval = null;
    if (play && activeText < textArray.length - 1) {
      interval = setInterval(() => {
        setActiveText(activeText + 1);
      }, 90);
    } else if (!play) {
      click();
    }
    return () => clearInterval(interval);
  }, [play, activeText]);

  const generateGlitch = (text) => {
    let glitchedText = "";
    for (let i = 0; i < text.length; i++) {
      const originalChar = text[i];
      if (Math.random() < 0.5) {
        const randomIndex = Math.floor(
          Math.random() * glitchCharacterOptions.length
        );
        glitchedText += glitchCharacterOptions[randomIndex];
      } else {
        glitchedText += originalChar;
      }
    }
    return glitchedText;
  };

  const gen = () => {
    let textArray = [];
    if (heroText.text) {
      for (let i = 0; i < heroText.length + 15; i++) {
        textArray.push(generateGlitch(heroText.text.substring(0, i)));
      }
      textArray.push(heroText.text);
    }
    return textArray;
  };

  const [textArray] = useState(gen);

  // --- NEW "WARP DRIVE" ANIMATION VARIANTS ---

  const logoContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        // A delay before the first logo starts its animation
        delayChildren: 1.5,
        // Each subsequent logo will start 0.4s after the previous one
        staggerChildren: 0.8,
      },
    },
  };

  const logoWarpVariants = {
    hidden: {
      opacity: 0,

    },
    visible: {
      opacity: [0, 1, 1], // Fade in, then stay visible
      scale: [0.4, 0.8, 1.1], // Start small, grow to an intermediate size, then land at the final size
      filter: ["blur(15px)", "blur(5px)", "blur(0px)"], // Start very blurry, become less blurry, then sharp
      y: [100, 0, 0], // Start below the center, warp to the center, then stay for the dash

      transition: {
        duration: 0.8, // Total duration for the entire sequence for one icon
        ease: "easeOut",
        // 'times' maps each keyframe to a point in the duration.
        // [0, 0.4, 1] means:
        // - The first keyframe is at the start (0%)
        // - The second keyframe (Phase 1 complete) is at 40% of the duration
        // - The final keyframe (Phase 2 complete) is at the end (100%)
        times: [0, 0.4, 1],
      },
    },
  };

  const logoHover = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300 },
  };


  return (
    <PageTransition>
      <div className="">
        <div className="relative flex justify-center items-center">
          <div className="md:h-screen w-full md:w-full h-auto">
            <LazyLoadImage
              loading="lazy"
              alt={"background image"}
              src="/LandingPageAssets/astro-bg.webp"
              effect="blurry"
              className="w-full h-full md:w-screen md:h-screen object-cover"
              placeholderSrc="/LandingPageAssets/astro-bg.webp"
            />
          </div>

          <div className="absolute inset-0 flex justify-center items-center z-10">
            <StarsCanvas />
          </div>

          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div
              className={`flex flex-col space-y-8 absolute inset-0 text-white text-center items-center justify-center p-4`}
            >
              <div className="flex flex-row">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  className={`${MoonlanderFont.className} font-black text-4xl md:text-6xl lg:text-7xl text-white`}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h1 className="text-white">
                    {textArray[activeText].substring(0, 3)}{" "}
                    <span className="text-prOrange">
                      {textArray[activeText].substring(3)}
                    </span>
                  </h1>
                </motion.h1>
              </div>

              <div className="w-auto md:w-1/2 z-10">
                <h1
                  className={`text-sm md:text-base ${OxaniumFont.className} font-semibold text-white text-center`}
                >
                  Prometheus is Western Visayas&apos;s leading full-service
                  marketing agency and public relations firm.
                </h1>
              </div>

              <motion.div
                className="flex flex-row flex-wrap justify-center items-center gap-x-6 gap-y-4 pt-10"
                variants={logoContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {starshipsLogos.map((logo) => (
                  <motion.div
                    key={logo.filename}
                    variants={logoWarpVariants}
                    whileHover={logoHover}
                    className="w-10 h-10 md:w-14 md:h-14 lg:w-24 lg:h-24 xl:w-32 xl:h-32 flex justify-center items-center text-center"
                  >
                    <img
                      src={`/LandingPageAssets/awards/${logo.filename}`}
                      alt={logo.alt}
                      className="object-contain w-full h-full"
                    />
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