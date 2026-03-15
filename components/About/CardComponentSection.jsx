"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CSSStars from "@/components/Global/CSSStars";
import localFont from "next/font/local";
import { Rajdhani } from "next/font/google";

const MoonlanderFont = localFont({ src: "../../Fonts/Moonlander.ttf" });
const RajdhaniFont = Rajdhani({ weight: "600", subsets: ["latin"] });

const CardComponentSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 60% 50%, rgba(150,137,95,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* ── LEFT: Text Content ── */}
          <div className="flex-1 lg:max-w-[46%]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                className={`${MoonlanderFont.className} font-black text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] mb-6`}
              >
                Built on{" "}
                <span className="text-prOrange relative">
                  Purpose.
                  <motion.span
                    className="absolute inset-0 text-prOrange blur-md opacity-35"
                    animate={{ opacity: [0.25, 0.45, 0.25] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Purpose.
                  </motion.span>
                </span>
              </h2>

              <p
                className={`${RajdhaniFont.className} text-white/75 text-base sm:text-lg md:text-xl mb-10`}
                style={{ letterSpacing: "0.03em", lineHeight: "1.75" }}
              >
                Prometheus is the premier, full-service public relations firm
                and marketing agency in Western Visayas, amplifying powerful
                stories to build brands and create high-impact customer
                experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 pl-5"
              style={{ borderColor: "rgba(150,137,95,0.45)" }}
            >
              <p
                className={`${RajdhaniFont.className} text-[10px] uppercase tracking-[0.25em] mb-2`}
                style={{ color: "rgba(150,137,95,0.65)" }}
              >
                Our Story
              </p>
              <p
                className={`${RajdhaniFont.className} text-white/60 text-sm sm:text-base`}
                style={{ letterSpacing: "0.03em", lineHeight: "1.8" }}
              >
                Prometheus started out as a small creative team operating from a
                bedroom, funded by loans and promises. In the years since, we
                have made our mark leveraging marketing science and
                multidisciplinary strategies — crafting compelling narratives
                that effectively promote and elevate brands.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: large left + two stacked right ── */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4" style={{ height: "380px" }}>

              {/* Large photo — left, spans full height */}
              <motion.div
                className="col-span-2 relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(150,137,95,0.20)" }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/AboutAssets/Gala-1.JPG"
                  alt="Prometheus gala"
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(0.87) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>

              {/* Right column — two stacked */}
              <div className="col-span-1 flex flex-col gap-3 sm:gap-4">
                <motion.div
                  className="flex-1 relative rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(150,137,95,0.20)" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="/AboutAssets/Elcid-PR.jpg"
                    alt="Prometheus PR event"
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(0.87) contrast(1.05)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>

                <motion.div
                  className="flex-1 relative rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(150,137,95,0.20)" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="/AboutAssets/PROMINENT MAASIN-42.jpg"
                    alt="Prometheus event"
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(0.87) contrast(1.05)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CardComponentSection;
