"use client";

import React, { useState, useRef } from "react";
import { worksData, workData } from "@/app/contants";
import Link from "next/link";
import Footer from "@/components/Global/Footer";
import ThreeColumnFooter from "@/components/Global/LargeBreakpointFooter";
import CSSStars from "@/components/Global/CSSStars";
import FuturisticDivider from "@/components/Global/FuturisticLine";
import { motion, useMotionValue, useTransform } from "framer-motion";
import localFont from "next/font/local";
import { Oxanium, Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });
const RajdhaniFont = Rajdhani({ weight: "700", subsets: ["latin"] });

const videoSources = [
  "/ReelsAssets/Bootcamp 3 seconds.mp4",
  "/ReelsAssets/Damires 3 seconds.mp4",
  "/ReelsAssets/Home Credit 3 seconder.mp4",
  "/ReelsAssets/IAP 3 seconds.mp4",
  "/ReelsAssets/More Power 3 seconds.mp4",
  "/ReelsAssets/Nike 3 Seconds.mp4",
];

// --- 3D TILT WORK CARD ---
const WorkCard = ({ work, detail, index, isFeatured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const hasVideo = index < videoSources.length;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={isFeatured ? "sm:col-span-2 sm:row-span-2" : ""}
      style={{ perspective: "1200px" }}
    >
      <Link href={`/works/subpage?index=${index}`} className="block h-full">
        <motion.div
          ref={cardRef}
          className="group relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 cursor-pointer"
          style={{
            aspectRatio: isFeatured ? "auto" : "4/3",
            minHeight: isFeatured ? "100%" : undefined,
            border: isHovered
              ? "2px solid rgba(212, 175, 55, 0.8)"
              : "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: isHovered
              ? "0px 30px 80px -15px rgba(150, 137, 95, 0.5), 0 0 100px rgba(150, 137, 95, 0.15), inset 0 0 60px rgba(150, 137, 95, 0.05)"
              : "0px 8px 30px -5px rgba(0, 0, 0, 0.6)",
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background: Video or Image */}
          {hasVideo ? (
            <video
              ref={videoRef}
              src={videoSources[index]}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                transform: isHovered ? "scale(1.12)" : "scale(1.03)",
                opacity: isHovered ? 0.9 : 0.65,
              }}
            />
          ) : (
            <img
              src={work.img}
              alt={work.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                transform: isHovered ? "scale(1.12)" : "scale(1.03)",
                opacity: isHovered ? 0.9 : 0.65,
              }}
            />
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Golden glow overlay on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-600"
            style={{
              background:
                "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, transparent 40%, rgba(150, 137, 95, 0.08) 100%)",
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Animated scan line on hover */}
          {isHovered && (
            <motion.div
              className="absolute left-0 right-0 h-[1px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)",
                filter: "blur(0.5px)",
              }}
              initial={{ top: "0%" }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Content Container */}
          <div
            className={`absolute inset-0 flex flex-col justify-between pointer-events-none ${
              isFeatured ? "p-5 sm:p-7 md:p-8" : "p-4 sm:p-5 md:p-6"
            }`}
          >
            {/* Top: Project Number + Badge */}
            <div
              className="relative z-10 flex items-start justify-between transition-all duration-300 ease-out"
              style={{
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              <p
                className={`text-[10px] sm:text-xs uppercase font-semibold transition-all duration-300 ${OxaniumFont.className}`}
                style={{
                  color: isHovered ? "#D4AF37" : "rgba(150, 137, 95, 0.6)",
                  textShadow: isHovered
                    ? "0 0 12px rgba(212, 175, 55, 0.6)"
                    : "none",
                  letterSpacing: "0.15em",
                }}
              >
                Project {String(index + 1).padStart(2, "0")}
              </p>

              {/* Video/Image indicator */}
              {hasVideo && (
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] uppercase tracking-wider transition-all duration-300 ${OxaniumFont.className}`}
                  style={{
                    background: isHovered
                      ? "rgba(212, 175, 55, 0.2)"
                      : "rgba(255, 255, 255, 0.08)",
                    border: `1px solid ${isHovered ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                    color: isHovered ? "#D4AF37" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{
                      background: isHovered ? "#D4AF37" : "rgba(255,255,255,0.5)",
                      boxShadow: isHovered ? "0 0 6px rgba(212, 175, 55, 0.8)" : "none",
                    }}
                  />
                  Reel
                </div>
              )}
            </div>

            {/* Bottom: Title, Description, CTA */}
            <div className="relative z-10 space-y-2">
              {/* Title */}
              <h3
                className={`font-bold uppercase text-white leading-tight transition-all duration-300 ${RajdhaniFont.className}`}
                style={{
                  fontSize: isFeatured
                    ? "1.5rem"
                    : work.title.length > 30
                      ? "0.875rem"
                      : work.title.length > 20
                        ? "1rem"
                        : "1.125rem",
                  lineHeight: "1.2",
                  textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)",
                  letterSpacing: "0.06em",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {work.title}
              </h3>

              {/* Description - reveals on hover */}
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: isHovered ? "100px" : "0px",
                  opacity: isHovered ? 1 : 0,
                }}
              >
                <p
                  className={`text-white/75 text-xs sm:text-sm leading-relaxed ${RajdhaniFont.className}`}
                  style={{
                    letterSpacing: "0.03em",
                    fontWeight: "500",
                  }}
                >
                  {detail?.description || ""}
                </p>
              </div>

              {/* Gold gradient line + CTA */}
              <div
                className="transition-all duration-400 ease-out"
                style={{
                  transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                <div
                  className="h-[1.5px] bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent mb-2 transition-all duration-500 ease-out"
                  style={{
                    width: isHovered ? "100%" : "30%",
                    opacity: isHovered ? 1 : 0.3,
                    boxShadow: isHovered
                      ? "0 0 10px rgba(212, 175, 55, 0.5)"
                      : "none",
                  }}
                />
                <div
                  className={`flex items-center gap-x-2 text-[10px] sm:text-xs transition-all duration-300 ease-out ${OxaniumFont.className}`}
                  style={{
                    color: isHovered ? "#D4AF37" : "rgba(150, 137, 95, 0.6)",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  <span className="font-bold tracking-wider">View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300"
                    style={{
                      transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Corner accents on hover */}
          {isHovered && (
            <>
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-xl" />
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
                  style={{ boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)" }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
                <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-xl" />
                <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
                  style={{ boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)" }}
                />
              </div>
            </>
          )}

          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-500 pointer-events-none"
            style={{
              width: isHovered ? "80%" : "0%",
              opacity: isHovered ? 1 : 0,
              boxShadow: isHovered
                ? "0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3)"
                : "none",
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const MainSectionWork = () => {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        {/* Star Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Subtle gold radial glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(150, 137, 95, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Floating gold particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-[#D4AF37]"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div
              className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-3`}
            >
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-[#96895f] to-[#96895f]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <span>Portfolio</span>
              <motion.div
                className="h-[1px] bg-gradient-to-l from-transparent via-[#96895f] to-[#96895f]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${MoonlanderFont.className} font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl`}
          >
            <span className="text-[#f5f5f5]">Our </span>
            <span className="text-prOrange relative">
              Works
              <motion.span
                className="absolute inset-0 text-prOrange blur-lg opacity-40"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Works
              </motion.span>
            </span>
          </motion.h1>

          {/* Futuristic Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FuturisticDivider color="#96895F" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-2 max-w-3xl mx-auto`}
            style={{
              letterSpacing: "0.06em",
              lineHeight: "1.5",
              fontWeight: "500",
            }}
          >
            Explore our portfolio of award-winning campaigns and creative
            projects
          </motion.p>
        </div>
      </section>

      {/* ========== WORKS GRID SECTION ========== */}
      <section className="relative py-8 sm:py-12 md:py-16">
        {/* Star Background continues */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(150, 137, 95, 0.04) 0%, transparent 70%)",
          }}
        />

        {/* Grid - Bento style: first card is featured (2x2 on desktop) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4 sm:gap-5 md:gap-6">
            {worksData.map((work, index) => (
              <WorkCard
                key={index}
                work={work}
                detail={workData[index]}
                index={index}
                isFeatured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-black" />
        </div>
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className={`${RajdhaniFont.className} text-white/60 text-base sm:text-lg md:text-xl mb-6`}
            style={{ letterSpacing: "0.06em", fontWeight: "500" }}
          >
            Ready to create something extraordinary?
          </p>
          <Link href="/contact">
            <motion.button
              className={`group relative px-8 py-3.5 md:px-12 md:py-4 ${RajdhaniFont.className} font-bold text-sm md:text-base uppercase tracking-[0.12em] overflow-hidden rounded-lg bg-transparent border border-[#96895f]/70 text-white shadow-[0_0_20px_rgba(150,137,95,0.15)] hover:shadow-[0_0_35px_rgba(150,137,95,0.35)] transition-all duration-300 ease-out backdrop-blur-sm`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="relative z-10 flex items-center gap-3">
                Get In Touch
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative z-10">
        <div className="md:hidden">
          <Footer />
        </div>
        <div className="hidden md:block">
          <ThreeColumnFooter />
        </div>
      </footer>
    </main>
  );
};

export default MainSectionWork;
