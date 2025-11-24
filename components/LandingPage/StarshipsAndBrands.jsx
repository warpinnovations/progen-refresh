"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StarshipLanding from "@/components/LandingPage/StarshipLanding";
import StarsCanvas from "../Global/StarCanvas";
import { useInView } from "react-intersection-observer";
import UnderlineWord from "@/components/LandingPage/UnderLineWord";
import { Oxanium } from "next/font/google";
import localFont from "next/font/local";
const OxaniumFont = Oxanium({ weights: 100, subsets: ["latin"] });
const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });

const StarshipsAndBrands = () => {
  const starshipsLogos = [
    "CORTX",
    "CRAETR",
    "JPEP",
    "NERV",
    "SPECTR",
    "WARP",
    "PROMISES",
  ];
  const [activeShip, setActiveShip] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 1,
  });
  const isVisibleInAnimation = inView;
  const customEase = [0.25, 1, 0.5, 1];
  const isMobile = window.innerWidth <= 500;
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 z-0 h-auto">
        <img
          src="/LandingPageAssets/galaxybg.webp"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
      </div>

      <div className="text-center z-10 mt-40">
        <h1
          className={`${MoonlanderFont.className} font-black text-xl md:text-6xl text-prOrange`}
        >
          STARSHIPS
        </h1>

        <motion.h1
          className={`${MoonlanderFont.className} font-black text-xl md:text-2xl text-white mt-10`}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {starshipsLogos[activeShip]}
        </motion.h1>
        <div className="mb-20">
          <StarshipLanding size={"44"} />
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <StarsCanvas hidden={true} />
      </div>
      <div
        className={`mb-52 mt-24 px-5 md:px-0 z-10 w-auto flex flex-col items-center text-center justify-center text-md sm:text-xl md:text-4xl lg:text-5xl text-white ${MoonlanderFont.className}`}
      >
        <div className="relative w-auto mt-24">
          <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 300 }}
            animate={{
              opacity: isVisibleInAnimation ? 1 : 0,
              y: isVisibleInAnimation ? 0 : 1,
            }}
            transition={{
              duration: 3, // Animation duration in seconds
              ease: customEase, // Custom easing function
              delay: isMobile ? 2.3 : 1,
            }}
          >
            WE ARE THE
          </motion.span>
          <motion.div
            ref={ref}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: isVisibleInAnimation ? [0, 1, 0] : 0,
            }}
            transition={{ duration: 2, delay: isMobile ? 1.5 : 0 }}
            className={`${isVisibleInAnimation ? "bg-prOrange" : ""
              } h-8 md:h-10 lg:h-12 absolute inset-0`}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <div className="relative w-full">
          <motion.span
            ref={ref}
            initial={{ opacity: 0, x: -100, y: 300 }}
            animate={{
              opacity: isVisibleInAnimation ? 1 : 0,
              y: isVisibleInAnimation ? 0 : 1,
            }}
            transition={{
              duration: 3, // Animation duration in seconds
              ease: customEase, // Custom easing function
              delay: isMobile ? 3.5 : 2,
            }}
          >
            MARKETING FLEET
          </motion.span>
          <motion.div
            ref={ref}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: isVisibleInAnimation ? [0, 1, 0] : 0,
            }}
            transition={{ duration: 2, delay: isMobile ? 2.5 : 1 }}
            className={`${isVisibleInAnimation ? "bg-prOrange" : ""
              } h-8 md:h-10 lg:h-12 absolute inset-0`}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>

      <div className="w-3/5 text-center z-10">
        <h1
          className={`text-sm md:text-4xl text-white text-center ${MoonlanderFont.className}`}
        >
          To build powerful &nbsp;
          <UnderlineWord word={"connections"} delay={0.5} />
          &nbsp; through &nbsp;
          <UnderlineWord word={"creativity"} delay={1} />
          &nbsp; and &nbsp;
          <UnderlineWord word={"innovation"} delay={1.5} />
          &nbsp; across the widest variety of mediums and platforms.
        </h1>
      </div>

      <div className="text-center z-10 mt-60">
        <h1
          className={`${MoonlanderFont.className} font-black text-md md:text-4xl text-prOrange`}
        >
          BRANDS WE&apos;VE WORKED WITH
        </h1>

        <div className="mt-10 flex justify-center items-center">
          <img
            src={"/LandingPageAssets/brands2.webp"}
            className="w-[90%]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default StarshipsAndBrands;
