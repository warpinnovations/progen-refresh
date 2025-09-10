"use client";
import React from "react";
import { useState, useEffect } from "react";
import PageTransition from "@/components/Global/PageTransition";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarsCanvas from "@/components/Global/StarCanvas";
import { Oxanium } from "next/font/google";
import { motion } from "framer-motion";
import localFont from "next/font/local";


const OxaniumFont = Oxanium({ weights: 100, subsets: ["latin"] });
const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });

const HeroSection = () => {
  const [activeText, setActiveText] = useState(0);
  const [play, setPlay] = useState(false);
  const heroText = { text: "BE LIMITLESS" };
  const glitchCharacterOptions =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?";
  const starshipsLogos = [
    "CORTX",
    "CRAETR",
    "JPEP",
    "NERV",
    "SPECTR",
    "WARP",
    "PROMISES",
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
      for (let i = 0; i < heroText.text.length + 15; i++) {
        textArray.push(generateGlitch(heroText.text.substring(0, i)));
      }
      textArray.push(heroText.text);
    }
    return textArray;
  };

  const [textArray] = useState(gen);
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

            {/* --- POSITIONING CHANGES ARE HERE --- */}
            {/* This container is now centered and vertically stacks the content */}
            <div className={`flex flex-col space-y-8 absolute inset-0 text-white text-center items-center justify-center p-4`}>

              {/* 1. "BE LIMITLESS" Headline - Unchanged but now centered by the parent div */}
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

              {/* 2. Sub-headline - Unchanged but now centered by the parent div */}
              <div className="w-auto md:w-1/2 z-10">
                <h1 className={`text-sm md:text-base ${OxaniumFont.className} font-semibold text-white text-center`}>
                  Prometheus is Western Visayas&apos;s leading full-service
                  marketing agency and public relations firm.
                </h1>
              </div>

              {/* 3. Starship Logos - Unchanged but now centered by the parent div */}
              <motion.div
                className="flex flex-row flex-wrap justify-center items-center gap-x-6 gap-y-4 pt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{ delay: 1 }}
              >
                {starshipsLogos.map((starship, index) => (
                  <motion.div
                    key={starship}
                    initial={{ opacity: 0, y: 100, scale: 0.001 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: index * 0.7,
                    }}
                    className="w-10 h-10 md:w-14 md:h-14 lg:w-24 lg:h-24 xl:w-32 xl:h-32 flex justify-center items-center text-center"
                  >
                    <img
                      src={`../../LandingPageAssets/starships/${starship}.png`}
                      alt={`Starship ${starship}`}
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