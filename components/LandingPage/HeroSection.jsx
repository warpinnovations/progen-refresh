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

  const logoContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.8,
      },
    },
  };

  const logoWarpVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 1, 1],
      scale: [0.4, 0.8, 1.1],
      filter: ["blur(15px)", "blur(5px)", "blur(0px)"],
      y: [100, 0, 0],
      transition: {
        duration: 0.8,
        ease: "easeOut",
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
      {/* The main container remains relative */}
      <div className="relative">
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

        {/* --- NEW: Image Blending Gradient --- */}
        {/* This div sits on top of the image and creates the fade-to-black effect */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-5 pointer-events-none"
        />

        <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
          <StarsCanvas />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

          <div
            className={`flex flex-col space-y-8 absolute inset-0 text-white text-center items-center justify-center p-4 z-20 pointer-events-auto`}
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

            <div className="w-auto md:w-1/2">
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
    </PageTransition>
  );
};

export default HeroSection;