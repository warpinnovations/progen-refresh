"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CSSStars from "@/components/Global/CSSStars";
import localFont from "next/font/local";
import { Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });

const companyInfo = [
  {
    title: "Company Overview",
    icon: "◈",
    content:
      "Prometheus is the premier full-service public relations firm and marketing agency in Western Visayas, specializing in creating and amplifying powerful stories that build and grow brands. Our team is dedicated to helping clients optimize their communications, create high-impact customer experiences, and reach wider audiences.",
  },
  {
    title: "History",
    icon: "✧",
    content:
      "Prometheus is founded on the comprehensive science of marketing, drawing from multiple disciplines and converging into a singular, focused goal: to effectively promote and elevate your brand. Through our multidisciplinary approach, we leverage diverse marketing strategies and insights to craft compelling narratives that resonate with your audience, driving meaningful connections and sustainable brand growth.",
  },
];

const InfoCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full p-6 sm:p-8 md:p-10 rounded-2xl border-2 overflow-hidden backdrop-blur-sm"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(20,20,20,0.95), rgba(30,28,22,0.9))"
            : "linear-gradient(135deg, rgba(15,15,15,0.9), rgba(20,20,20,0.85))",
          borderColor: isHovered
            ? "rgba(150, 137, 95, 0.5)"
            : "rgba(150, 137, 95, 0.12)",
          boxShadow: isHovered
            ? "0 25px 60px -15px rgba(150, 137, 95, 0.3), inset 0 0 60px rgba(150, 137, 95, 0.03)"
            : "0 8px 30px -5px rgba(0, 0, 0, 0.5)",
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent, rgba(150, 137, 95, 0.15), transparent)",
            backgroundSize: "200% 200%",
          }}
          animate={
            isHovered
              ? { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }
              : {}
          }
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Inner dark layer */}
        <div className="absolute inset-[2px] rounded-2xl bg-black/40 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon + Title */}
          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <motion.div
              className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center"
              style={{
                borderColor: isHovered
                  ? "rgba(150, 137, 95, 0.5)"
                  : "rgba(150, 137, 95, 0.2)",
                background: isHovered
                  ? "linear-gradient(135deg, rgba(150, 137, 95, 0.15), rgba(150, 137, 95, 0.05))"
                  : "linear-gradient(135deg, rgba(150, 137, 95, 0.08), rgba(150, 137, 95, 0.02))",
              }}
              animate={
                isHovered
                  ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xl sm:text-2xl"
                style={{ color: "#96895F" }}
              >
                {item.icon}
              </span>
            </motion.div>

            <div>
              <h3
                className={`${MoonlanderFont.className} text-xl sm:text-2xl md:text-3xl font-black text-white uppercase leading-tight transition-all duration-300`}
                style={{
                  color: isHovered ? "#96895F" : "#ffffff",
                  textShadow: isHovered
                    ? "0 0 20px rgba(150, 137, 95, 0.3)"
                    : "none",
                }}
              >
                {item.title}
              </h3>
              {/* Animated underline */}
              <motion.div
                className="h-[2px] mt-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #96895F, transparent)",
                }}
                initial={{ width: "30%" }}
                animate={{ width: isHovered ? "100%" : "30%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Body Text */}
          <p
            className={`${RajdhaniFont.className} text-white/75 text-sm sm:text-base md:text-lg leading-relaxed`}
            style={{
              letterSpacing: "0.03em",
              lineHeight: "1.7",
            }}
          >
            {item.content}
          </p>
        </div>

        {/* Corner accents on hover */}
        {isHovered && (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#96895F]/50 rounded-tr-xl" />
              <div
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#96895F] rounded-full"
                style={{
                  boxShadow: "0 0 8px rgba(150, 137, 95, 0.8)",
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#96895F]/50 rounded-bl-xl" />
              <div
                className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#96895F] rounded-full"
                style={{
                  boxShadow: "0 0 8px rgba(150, 137, 95, 0.8)",
                }}
              />
            </div>
          </>
        )}

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#96895F] to-transparent transition-all duration-500 pointer-events-none"
          style={{
            width: isHovered ? "70%" : "0%",
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered
              ? "0 0 15px rgba(150,137,95,0.5)"
              : "none",
          }}
        />

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                background: "#96895F",
                top: "15%",
                right: "10%",
                opacity: 0.5,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-1 h-1 rounded-full pointer-events-none"
              style={{
                background: "#96895F",
                bottom: "20%",
                left: "15%",
                opacity: 0.3,
              }}
              animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const CardComponentSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Star Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(150, 137, 95, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
          {companyInfo.map((item, index) => (
            <InfoCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardComponentSection;
