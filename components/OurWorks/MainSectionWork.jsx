"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
const WorkCard = ({ work, detail, index, dataIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const subpageIndex = dataIndex ?? index;
  const hasVideo = subpageIndex < videoSources.length;

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
    <Link href={`/works/subpage?index=${subpageIndex}`} className="block h-full">
      <motion.div
        ref={cardRef}
        className="group relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 cursor-pointer"
        style={{
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
            src={videoSources[subpageIndex]}
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
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
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

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 md:p-8 pointer-events-none">
          {/* Top: Project Number + Reel badge */}
          <div
            className="relative z-10 flex items-start justify-between transition-all duration-300 ease-out"
            style={{ transform: isHovered ? "translateY(-4px)" : "translateY(0)" }}
          >
            <p
              className={`text-[10px] sm:text-xs uppercase font-semibold transition-all duration-300 ${OxaniumFont.className}`}
              style={{
                color: isHovered ? "#D4AF37" : "rgba(150, 137, 95, 0.6)",
                textShadow: isHovered ? "0 0 12px rgba(212, 175, 55, 0.6)" : "none",
                letterSpacing: "0.15em",
              }}
            >
              Project {String(subpageIndex + 1).padStart(2, "0")}
            </p>

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

          {/* Bottom: Title + Description + CTA */}
          <div className="relative z-10 space-y-2">
            <h3
              className={`font-bold uppercase text-white leading-tight transition-all duration-300 ${RajdhaniFont.className}`}
              style={{
                fontSize:
                  work.title.length > 30
                    ? "0.875rem"
                    : work.title.length > 20
                    ? "1rem"
                    : "1.25rem",
                lineHeight: "1.2",
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)",
                letterSpacing: "0.06em",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {work.title}
            </h3>

            <div
              className="overflow-hidden transition-all duration-500 ease-out"
              style={{ maxHeight: isHovered ? "100px" : "0px", opacity: isHovered ? 1 : 0 }}
            >
              <p
                className={`text-white/75 text-xs sm:text-sm leading-relaxed ${RajdhaniFont.className}`}
                style={{ letterSpacing: "0.03em", fontWeight: "500" }}
              >
                {detail?.description || ""}
              </p>
            </div>

            <div
              className="transition-all duration-300 ease-out"
              style={{ transform: isHovered ? "translateY(-2px)" : "translateY(0)" }}
            >
              <div
                className="h-[1.5px] bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent mb-2 transition-all duration-500 ease-out"
                style={{
                  width: isHovered ? "100%" : "30%",
                  opacity: isHovered ? 1 : 0.3,
                  boxShadow: isHovered ? "0 0 10px rgba(212, 175, 55, 0.5)" : "none",
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
                  style={{ transform: isHovered ? "translateX(4px)" : "translateX(0)" }}
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
              <div
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
                style={{ boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)" }}
              />
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
              <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-xl" />
              <div
                className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
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
  );
};

// --- SIDE PREVIEW (carousel non-center cards) ---
const SidePreview = ({ work, dataIndex }) => {
  const hasVideo = dataIndex < videoSources.length;
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-900"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
      {hasVideo ? (
        <video
          src={videoSources[dataIndex]}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5, transform: "scale(1.03)" }}
        />
      ) : (
        <img
          src={work.img}
          alt={work.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5, transform: "scale(1.03)" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
        <p className={`text-[10px] uppercase tracking-[0.15em] ${OxaniumFont.className}`}
          style={{ color: "rgba(150,137,95,0.5)" }}>
          Project {String(dataIndex + 1).padStart(2, "0")}
        </p>
        <h3 className={`font-bold uppercase text-white/60 leading-tight ${RajdhaniFont.className}`}
          style={{ fontSize: work.title.length > 25 ? "0.875rem" : "1rem", letterSpacing: "0.06em" }}>
          {work.title}
        </h3>
      </div>
    </div>
  );
};

// --- WORKS CAROUSEL ---
const INTERVAL = 6000;

const WorksCarousel = ({ works }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const total = works.length;
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  const resetProgress = useCallback(() => {
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    setProgress(0);
    startTimeRef.current = performance.now();
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((i) => (i - 1 + total) % total);
    resetProgress();
  }, [total, resetProgress]);

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % total);
    resetProgress();
  }, [total, resetProgress]);

  useEffect(() => {
    if (paused) {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      return;
    }
    startTimeRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent((i) => (i + 1) % total);
        setProgress(0);
        startTimeRef.current = performance.now();
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => { if (progressRef.current) cancelAnimationFrame(progressRef.current); };
  }, [paused, current, total]);

  const centerWork = works[current];
  const prevWork = works[prev];
  const nextWork = works[next];

  const CARD_W = "clamp(300px, 27vw, 430px)";
  const CARD_H = "460px";
  const ease = [0.25, 0.46, 0.45, 0.94];

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Arrow Left ── */}
      <button
        onClick={goPrev}
        aria-label="Previous"
        className="absolute z-30 group"
        style={{ left: "clamp(8px, 2vw, 32px)", top: `calc(${CARD_H} / 2)`, transform: "translateY(-50%)" }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center border border-[#96895f]/40 bg-black/60 backdrop-blur-sm transition-all duration-300 group-hover:border-[#D4AF37]/80 group-hover:bg-[#D4AF37]/12 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 3.5L5.5 9L11 14.5" stroke="rgba(150,137,95,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:stroke-[#D4AF37] transition-all duration-300" />
          </svg>
        </div>
      </button>

      {/* ── 3 Cards in a row ── */}
      <div
        className="w-full flex items-center justify-center gap-4 xl:gap-6 px-20 xl:px-28"
        style={{ perspective: "1600px" }}
      >
        {/* Left card — tilted inward */}
        <motion.div
          key={`prev-${prev}`}
          animate={{ rotateY: 16, scale: 0.88, opacity: 0.6 }}
          transition={{ duration: 0.5, ease }}
          className="flex-shrink-0 pointer-events-none"
          style={{ width: CARD_W, height: CARD_H, transformStyle: "preserve-3d" }}
        >
          <SidePreview work={prevWork} dataIndex={prevWork.originalIndex} />
        </motion.div>

        {/* Center card — flat & full */}
        <motion.div
          key={`center-${current}`}
          animate={{ rotateY: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          className="flex-shrink-0 relative"
          style={{ width: CARD_W, height: CARD_H, perspective: "1200px", zIndex: 10 }}
        >
          {/* Gold glow halo */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
            boxShadow: "0 0 60px 8px rgba(150,137,95,0.15)",
            zIndex: -1,
          }} />
          <WorkCard
            work={centerWork}
            detail={workData[centerWork.originalIndex]}
            index={centerWork.originalIndex}
            dataIndex={centerWork.originalIndex}
          />
        </motion.div>

        {/* Right card — tilted inward */}
        <motion.div
          key={`next-${next}`}
          animate={{ rotateY: -16, scale: 0.88, opacity: 0.6 }}
          transition={{ duration: 0.5, ease }}
          className="flex-shrink-0 pointer-events-none"
          style={{ width: CARD_W, height: CARD_H, transformStyle: "preserve-3d" }}
        >
          <SidePreview work={nextWork} dataIndex={nextWork.originalIndex} />
        </motion.div>
      </div>

      {/* ── Arrow Right ── */}
      <button
        onClick={goNext}
        aria-label="Next"
        className="absolute z-30 group"
        style={{ right: "clamp(8px, 2vw, 32px)", top: `calc(${CARD_H} / 2)`, transform: "translateY(-50%)" }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center border border-[#96895f]/40 bg-black/60 backdrop-blur-sm transition-all duration-300 group-hover:border-[#D4AF37]/80 group-hover:bg-[#D4AF37]/12 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 3.5L12.5 9L7 14.5" stroke="rgba(150,137,95,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:stroke-[#D4AF37] transition-all duration-300" />
          </svg>
        </div>
      </button>

      {/* ── Info panel ── */}
      <div className="w-full mt-8 flex flex-col items-center" style={{ maxWidth: "560px" }}>
        {/* Progress bar */}
        <div className="w-full h-[2px] rounded-full overflow-hidden mb-5" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #96895F, #D4AF37)",
              boxShadow: "0 0 8px rgba(212,175,55,0.45)",
              transition: "none",
              borderRadius: "9999px",
            }}
          />
        </div>

        {/* Animated title + counter */}
        <motion.div
          key={`info-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center w-full"
        >
          <h3
            className={`text-xl md:text-2xl lg:text-3xl font-bold uppercase text-white leading-tight ${RajdhaniFont.className}`}
            style={{ letterSpacing: "0.08em", textShadow: "0 0 24px rgba(212,175,55,0.15)" }}
          >
            {centerWork.title}
          </h3>
          {workData[centerWork.originalIndex]?.description && (
            <p
              className={`text-white/40 text-xs mt-2 leading-relaxed ${OxaniumFont.className}`}
              style={{ letterSpacing: "0.04em" }}
            >
              {workData[centerWork.originalIndex].description.length > 90
                ? workData[centerWork.originalIndex].description.slice(0, 90) + "…"
                : workData[centerWork.originalIndex].description}
            </p>
          )}
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-5">
          {works.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); resetProgress(); }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? "24px" : "7px",
                height: "7px",
                borderRadius: "4px",
                background: i === current ? "linear-gradient(90deg,#D4AF37,#96895F)" : "rgba(255,255,255,0.2)",
                boxShadow: i === current ? "0 0 8px rgba(212,175,55,0.5)" : "none",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const MainSectionWork = () => {
  const allWorks = worksData.slice(6).map((work, i) => ({ ...work, originalIndex: i + 6 }));
  const carouselRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      carouselRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-40 pb-2 sm:pb-4 md:pb-6 overflow-hidden">
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
        {[
          { w: 2, h: 2, l: 10, t: 20, o: 0.2, dur: 7, del: 0, dx: 5 },
          { w: 1, h: 1, l: 25, t: 55, o: 0.3, dur: 9, del: 1, dx: -8 },
          { w: 3, h: 3, l: 40, t: 30, o: 0.15, dur: 11, del: 2, dx: 10 },
          { w: 2, h: 2, l: 60, t: 70, o: 0.25, dur: 8, del: 0.5, dx: -5 },
          { w: 1, h: 1, l: 75, t: 15, o: 0.2, dur: 13, del: 3, dx: 7 },
          { w: 2, h: 2, l: 85, t: 45, o: 0.3, dur: 6, del: 1.5, dx: -10 },
          { w: 3, h: 3, l: 15, t: 80, o: 0.15, dur: 10, del: 2.5, dx: 8 },
          { w: 1, h: 1, l: 50, t: 10, o: 0.2, dur: 12, del: 0.8, dx: -6 },
          { w: 2, h: 2, l: 90, t: 60, o: 0.25, dur: 7, del: 3.5, dx: 9 },
          { w: 1, h: 1, l: 35, t: 90, o: 0.3, dur: 9, del: 1.2, dx: -7 },
        ].map((p, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-[#D4AF37] pointer-events-none"
            style={{ width: p.w, height: p.h, left: `${p.l}%`, top: `${p.t}%`, opacity: p.o }}
            animate={{ y: [0, -30, 0], x: [0, p.dx, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FuturisticDivider color="#96895F" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-2 max-w-3xl mx-auto`}
            style={{ letterSpacing: "0.06em", lineHeight: "1.5", fontWeight: "500" }}
          >
            Explore our portfolio of award-winning campaigns and creative projects
          </motion.p>
        </div>
      </section>

      {/* ========== WORKS CAROUSEL ========== */}
      <section ref={carouselRef} className="relative py-6 sm:py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CSSStars />
          <div className="absolute inset-0 bg-black/55" />
          {/* Strong center glow */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(150,137,95,0.09) 0%, transparent 65%)" }} />
          {/* Edge vignette */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6">
          {/* Desktop carousel */}
          <div className="hidden lg:block">
            <WorksCarousel works={allWorks} />
          </div>

          {/* Mobile: 2-col grid */}
          <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {allWorks.map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="h-[170px] sm:h-[210px]"
                style={{ perspective: "1200px" }}
              >
                <WorkCard
                  work={work}
                  detail={workData[work.originalIndex]}
                  index={work.originalIndex}
                  dataIndex={work.originalIndex}
                />
              </motion.div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
