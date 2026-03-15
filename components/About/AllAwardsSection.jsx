/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awarditems } from "@/components/AwardsExhibit/AwardItems";
import FuturisticDivider from "@/components/Global/FuturisticLine";
import localFont from "next/font/local";
import { Oxanium, Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const OxaniumFont = Oxanium({ weight: "600", subsets: ["latin"] });
const RajdhaniFont = Rajdhani({ weight: "700", subsets: ["latin"] });

// Recognition level mapped by award item id
const RECOGNITION = {
  qhtlfmzra: { label: "Circle of Excellence", color: "#D4AF37", bg: "rgba(212,175,55,0.12)", border: "rgba(212,175,55,0.4)" },
  wjksntpqc: { label: "Winner", color: "#D4AF37", bg: "rgba(212,175,55,0.12)", border: "rgba(212,175,55,0.4)" },
  bzlfqmrha: { label: "Finalist", color: "rgba(255,255,255,0.65)", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.2)" },
  xtrcnvjsm: { label: "Anvil", color: "#C8C8C8", bg: "rgba(200,200,200,0.1)", border: "rgba(200,200,200,0.3)" },
  lkmhqztpr: { label: "Anvil", color: "#C8C8C8", bg: "rgba(200,200,200,0.1)", border: "rgba(200,200,200,0.3)" },
  sdnqjhlwf: { label: "Circle of Excellence", color: "#D4AF37", bg: "rgba(212,175,55,0.12)", border: "rgba(212,175,55,0.4)" },
  gftrxcmkp: { label: "Winner", color: "#D4AF37", bg: "rgba(212,175,55,0.12)", border: "rgba(212,175,55,0.4)" },
  vjhlswqmn: { label: "Gold", color: "#D4AF37", bg: "rgba(212,175,55,0.15)", border: "rgba(212,175,55,0.5)" },
  cpzkmrhtl: { label: "MEA", color: "#C8C8C8", bg: "rgba(200,200,200,0.1)", border: "rgba(200,200,200,0.3)" },
  fzqmrklpw: { label: "Finalist", color: "rgba(255,255,255,0.65)", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.2)" },
};

// Derive award body short name and year from title
const parseTitle = (title) => {
  const parts = title.split(" ");
  const year = parts[parts.length - 1];
  const body = title.replace(` ${year}`, "").trim();
  return { body, year };
};

// Modal component for full award detail
const AwardDetailModal = ({ item, onClose }) => {
  const rec = RECOGNITION[item.id] || RECOGNITION.bzlfqmrha;
  const { body, year } = parseTitle(item.title);
  const campaignLines = Array.isArray(item.campaign) ? item.campaign : [item.campaign];

  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    const navbar = document.getElementById("main-navbar");
    if (navbar) navbar.style.display = "none";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      if (navbar) navbar.style.display = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal wrapper — relative so close button can anchor to it */}
      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ scale: 0.88, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — anchored to wrapper, always visible above scroll */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-black/80 border border-white/25 text-white/70 hover:text-white hover:border-white/60 hover:bg-black transition-colors"
          style={{ boxShadow: "0 0 20px rgba(0,0,0,0.6)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable panel */}
        <div
          className={`w-full max-h-[90vh] overflow-y-auto rounded-3xl ${RajdhaniFont.className}`}
          style={{
            background: "linear-gradient(135deg, rgba(12,9,3,0.98), rgba(20,16,6,0.96))",
            border: `1px solid ${rec.border}`,
            boxShadow: `0 0 80px rgba(150,137,95,0.25), 0 0 40px rgba(150,137,95,0.1)`,
          }}
        >
        {/* Hero image */}
        <div className="relative h-64 rounded-t-3xl overflow-hidden">
          <img src={item.media.mainImage} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          {/* Recognition badge over image */}
          <div className="absolute top-4 left-4">
            <span
              className={`${OxaniumFont.className} text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full`}
              style={{ background: rec.bg, border: `1px solid ${rec.border}`, color: rec.color }}
            >
              {rec.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 md:p-10 space-y-6">
          {/* Title block */}
          <div>
            <p className={`${OxaniumFont.className} text-[#96895f] text-xs uppercase tracking-[0.25em] mb-1`}>{body} · {year}</p>
            <h3 className={`${RajdhaniFont.className} text-white font-bold text-2xl md:text-3xl leading-tight`} style={{ letterSpacing: "0.04em" }}>
              {typeof item.category === "string" && item.category.startsWith("http") ? item.title : item.category}
            </h3>
          </div>

          {/* Description */}
          <p className={`${RajdhaniFont.className} text-white/70 text-base sm:text-lg leading-relaxed`} style={{ letterSpacing: "0.03em" }}>
            {item.description}
          </p>

          <div className="h-px bg-gradient-to-r from-[#96895f]/40 via-[#96895f]/20 to-transparent" />

          {/* About the award body */}
          <div>
            <p className={`${OxaniumFont.className} text-[#96895f] text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-3`}>About the Award</p>
            <p className={`${RajdhaniFont.className} text-white/60 text-base sm:text-lg leading-relaxed`} style={{ letterSpacing: "0.03em" }}>
              {item.award_body}
            </p>
          </div>

          {/* Campaign detail */}
          {item.campaign && (
            <div>
              <p className={`${OxaniumFont.className} text-[#96895f] text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-3`}>The Win</p>
              {campaignLines.map((line, i) => (
                <p key={i} className={`${RajdhaniFont.className} text-white/60 text-base sm:text-lg leading-relaxed mb-2`} style={{ letterSpacing: "0.03em" }}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
        </div>{/* end scrollable panel */}
      </motion.div>{/* end wrapper */}
    </motion.div>
  );
};

// Individual award card
const AwardCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const rec = RECOGNITION[item.id] || RECOGNITION.bzlfqmrha;
  const { body, year } = parseTitle(item.title);
  const displayCategory = typeof item.category === "string" && item.category.startsWith("http")
    ? item.title
    : item.category;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="cursor-pointer"
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className={`relative flex flex-col rounded-2xl overflow-hidden h-full ${RajdhaniFont.className}`}
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(16,12,4,0.95), rgba(24,19,7,0.92))"
              : "linear-gradient(135deg, rgba(10,8,2,0.92), rgba(16,13,4,0.88))",
            border: isHovered
              ? `1px solid rgba(150,137,95,0.6)`
              : `1px solid rgba(150,137,95,0.2)`,
            boxShadow: isHovered
              ? "0 0 40px rgba(150,137,95,0.2), 0 12px 40px rgba(0,0,0,0.5)"
              : "0 0 0 rgba(150,137,95,0), 0 4px 20px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Award image */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={item.media.mainImage}
              alt={item.title}
              className="w-full h-full object-cover object-top transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Recognition badge */}
            <div className="absolute top-3 left-3">
              <span
                className={`${OxaniumFont.className} text-[9px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-full`}
                style={{ background: rec.bg, border: `1px solid ${rec.border}`, color: rec.color }}
              >
                {rec.label}
              </span>
            </div>

            {/* Year pill */}
            <div className="absolute top-3 right-3">
              <span
                className={`${OxaniumFont.className} text-[9px] uppercase tracking-[0.15em] text-white/70 px-2.5 py-1 rounded-full`}
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                {year}
              </span>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col flex-1 p-5">
            <p
              className={`${OxaniumFont.className} text-[#96895f] text-[9px] uppercase tracking-[0.22em] mb-2`}
              style={{ opacity: 0.85 }}
            >
              {body}
            </p>
            <h4
              className="text-[#EAE2B7] font-bold text-sm leading-snug mb-3"
              style={{ letterSpacing: "0.04em", textShadow: isHovered ? "0 0 20px rgba(234,226,183,0.2)" : "none" }}
            >
              {displayCategory}
            </h4>

            <div
              className="h-px mt-auto mb-3 transition-all duration-300"
              style={{
                background: "linear-gradient(to right, rgba(150,137,95,0.5), transparent)",
                width: isHovered ? "85%" : "50%",
              }}
            />

            {/* View detail hint */}
            <div
              className={`${OxaniumFont.className} flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] transition-all duration-300`}
              style={{ color: isHovered ? "#96895f" : "rgba(150,137,95,0.4)", opacity: isHovered ? 1 : 0.6 }}
            >
              <span>View Details</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Inner border glow on hover */}
          <div
            className="absolute inset-[1px] rounded-2xl pointer-events-none transition-all duration-300"
            style={{ border: isHovered ? "1px solid rgba(150,137,95,0.2)" : "1px solid transparent" }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <AwardDetailModal item={item} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Main section component
const AllAwardsSection = () => {
  return (
    <section className="relative w-full py-20 sm:py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(150,137,95,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-20">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className={`${OxaniumFont.className} text-[#96895f] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-3 mb-5`}
          >
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-[#96895f] to-[#96895f]"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span>Industry Recognition</span>
            <motion.div
              className="h-[1px] bg-gradient-to-l from-transparent via-[#96895f] to-[#96895f]"
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${MoonlanderFont.className} font-black text-3xl sm:text-4xl md:text-5xl`}
          >
            <span className="text-[#f5f5f5]">Our </span>
            <span className="text-prOrange relative">
              Awards
              <motion.span
                className="absolute inset-0 text-prOrange blur-lg opacity-35"
                animate={{ opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Awards
              </motion.span>
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FuturisticDivider color="#96895F" className="mt-6" />
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className={`${RajdhaniFont.className} flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8 text-sm`}
          >
            {[
              { value: "10+", label: "Award Wins" },
              { value: "3", label: "Award Bodies" },
              { value: "2023–2025", label: "Consistent Recognition" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className={`${OxaniumFont.className} text-prOrange text-2xl font-bold`} style={{ letterSpacing: "0.04em" }}>{value}</span>
                <span className={`${OxaniumFont.className} text-[#96895f]/70 text-xs uppercase tracking-widest`}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {awarditems.map((item, index) => (
            <AwardCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${OxaniumFont.className} text-center text-white/30 text-[10px] uppercase tracking-[0.2em] mt-12`}
        >
          Click any award to view the full story
        </motion.p>
      </div>
    </section>
  );
};

export default AllAwardsSection;
