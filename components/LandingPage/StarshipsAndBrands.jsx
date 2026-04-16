/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import CSSStars from "../Global/CSSStars";
import localFont from 'next/font/local';
import { Rajdhani } from 'next/font/google';
import FuturisticDivider from "../Global/FuturisticLine";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });

// Row-based layout matching reference — each row fills full width, height set per tier
const BRAND_ROWS = [
  // Row 1 — 5 hero logos (largest)
  [
    { name: "More Power",                 image: "/brandLogos/MorePower(white).png" },
    { name: "Asia Pacific Medical Center",image: "/brandLogos/APMC.png" },
    { name: "Adidas",                     image: "/brandLogos/Adidas.png" },
    { name: "Home Credit",                image: "/brandLogos/Home Credit.png" },
    { name: "Monde Nissin",               image: "/brandLogos/Monde Nissin.png" },
  ],
  // Row 2 — 7 logos
  [
    { name: "DSWD",                       image: "/brandLogos/DSWD.png" },
    { name: "DOST",                       image: "/brandLogos/DOST.png" },
    { name: "Japan Foundation",           image: "/brandLogos/Japan Foundation.png" },
    { name: "Imperial Appliance Plaza",   image: "/addedbrands/IAP_WHITE_DROP_SHADOW.png" },
    { name: "Bootcamp | Adidas",          image: "/addedbrands/Logo_with_label.png" },
    { name: "Honda",                      image: "/brandLogos/Honda.png" },
    { name: "Ford",                       image: "/brandLogos/Ford.png" },
  ],
  // Row 3 — 6 logos
  [
    { name: "Haier",                      image: "/brandLogos/Haier.png" },
    { name: "Häfele",                     image: "/brandLogos/Hafele.png" },
    { name: "Nike Iloilo",                image: "/brandLogos/Nike.png" },
    { name: "Isuzu",                      image: "/brandLogos/Isuzu Logo - White.png" },
    { name: "OWNDAYS",                    image: "/brandLogos/Owndays.png" },
    { name: "Daily Guardian",             image: "/brandLogos/Daily Guardian.png" },
  ],
  // Row 4 — 7 logos
  [
    { name: "Pueblo de Panay",            image: "/addedbrands/Pueblo de Panay logo.png" },
    { name: "Coffee Brewthorhood",        image: "/brandLogos/Coffee Brewthorhood.png" },
    { name: "Premier Family Business",    image: "/addedbrands/Premiere.png" },
    { name: "Dinagyang Festival",         image: "/brandLogos/Dinagyang Festival.png" },
    { name: "Iloilo Business Club",       image: "/brandLogos/IBC.png" },
    { name: "Courtyard by Marriott",      image: "/brandLogos/Courtyard.png" },
    { name: "Metro Pacific Iloilo Water", image: "/brandLogos/Metro Pacific Iloilo Water.png" },
  ],
  // Row 5 — 6 logos
  [
    { name: "Freshood",                   image: "/addedbrands/Freshood_Logo_Primary.png" },
    { name: "Bread Basket",               image: "/brandLogos/Bread Basket.png" },
    { name: "Iloilo Grand Hotel",         image: "/addedbrands/IGH Logo.jpeg" },
    { name: "Damires Hills",              image: "/brandLogos/Damires Hills.PNG" },
    { name: "AC Energy",                  image: "/addedbrands/AC Energy Logo.png" },
    { name: "Fiesta One Ayala",           image: "/addedbrands/Fiesta One ayala.png" },
  ],
  // Row 6 — 13 logos
  [
    { name: "One UPV",                    image: "/addedbrands/One UPV logo.png" },
    { name: "101 Food",                   image: "/brandLogos/101 Food.png" },
    { name: "Sue's Cake Gallery",         image: "/addedbrands/Sue_s Logo PNG.png" },
    { name: "Nifty Fifty",                image: "/addedbrands/Nifty fifty logo.jpg" },
    { name: "BeOzzy",                     image: "/addedbrands/BeOzzy-MainLogo_H-Tagline-RGB-White.png" },
    { name: "PCCI",                       image: "/brandLogos/PCCI.png" },
    { name: "Datasoftlogic",              image: "/addedbrands/DATASOFTLOGIC_LOGO.png" },
    { name: "E.Curate",                   image: "/addedbrands/E.Curate Logo_stacked white.png" },
    { name: "LiDU",                       image: "/addedbrands/Lidu.png" },
    { name: "Superhouse Solutions",       image: "/addedbrands/Superhouse Solutions - Stacked.png" },
    { name: "DOT",                        image: "/brandLogos/DOT Watermark.png" },
    { name: "PMC",                        image: "/brandLogos/PMC Logo.png" },
    { name: "WVMC",                       image: "/brandLogos/WVMC.png" },
  ],
  // Row 7 — 12 logos (smallest)
  [
    { name: "Hotel Veronica",             image: "/addedbrands/Hotel Veronica logo.jpg" },
    { name: "IloEsports",                 image: "/addedbrands/IloEsports Logo.png" },
    { name: "GOOZAM",                     image: "/brandLogos/Goozam.png" },
    { name: "Iloilo United Royals",       image: "/addedbrands/Iloilo united royals.jpg" },
    { name: "FIR Multi-Purpose",          image: "/addedbrands/FIR.jpg" },
    { name: "Kwadra TBI",                 image: "/addedbrands/KTBI_KWADRA FULL COLOR VERTICAL.png" },
    { name: "VSG Group",                  image: "/addedbrands/VSG Logo_Stacked.png" },
    { name: "PSG",                        image: "/addedbrands/PSG-LOGO.png" },
    { name: "Iloilo Coffee Festival",     image: "/addedbrands/ICFLOGO_Stacked_Kayumanggi.png" },
    { name: "Estancia",                   image: "/brandLogos/estancia.PNG" },
    { name: "Baja",                       image: "/brandLogos/baja.webp" },
    { name: "Trimotors",                  image: "/brandLogos/trimotors.png" },
  ],
];

// Logo height per row — tapers from large to small, Row 3 taller for big text logos
const ROW_HEIGHT = ["120px", "84px", "90px", "66px", "60px", "48px", "38px"];


// Flatten all brands into one array for the mobile marquee
const ALL_BRANDS = BRAND_ROWS.flat();
const HALF = Math.ceil(ALL_BRANDS.length / 2);
const MARQUEE_ROW1 = ALL_BRANDS.slice(0, HALF);
const MARQUEE_ROW2 = ALL_BRANDS.slice(HALF);

const MarqueeRow = ({ brands, direction = "left", speed = 35 }) => {
  // Duplicate for seamless loop
  const items = [...brands, ...brands];
  const anim = direction === "left"
    ? { x: ["0%", "-50%"] }
    : { x: ["-50%", "0%"] };
  return (
    <div className="w-full overflow-hidden py-2">
      <motion.div
        className="flex items-center gap-5"
        animate={anim}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {items.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex items-center justify-center flex-shrink-0 px-4"
            style={{ height: "56px" }}
          >
            <img
              src={brand.image}
              alt={brand.name}
              loading="lazy"
              style={{ height: "48px", width: "auto", maxWidth: "120px", opacity: 0.95, objectFit: "contain" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const BrandsSection = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-black py-16 sm:py-20 md:py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl`}>
            <span className="text-[#f5f5f5]">Trusted by </span>
            <span className="text-prOrange">Industry Leaders</span>
          </h2>
          <FuturisticDivider color="#EAE2B7" />
        </motion.div>

        {/* ── MOBILE: auto-scroll marquee (2 rows) ── */}
        <div className="md:hidden w-full flex flex-col gap-1">
          {/* Fade edges */}
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-12 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, black, transparent)" }} />
            <div className="absolute right-0 top-0 h-full w-12 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, black, transparent)" }} />
            <MarqueeRow brands={MARQUEE_ROW1} direction="left" speed={40} />
            <MarqueeRow brands={MARQUEE_ROW2} direction="right" speed={38} />
          </div>

          {/* "and more…" */}
          <div className={`${RajdhaniFont.className} w-full flex items-center justify-center gap-3 mt-3`}>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#96895F]/40 to-transparent" />
            <span className="text-sm tracking-[0.18em] uppercase" style={{ color: 'rgba(150,137,95,0.65)' }}>
              and many more…
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#96895F]/40 to-transparent" />
          </div>
        </div>

        {/* ── DESKTOP: row-based grid (unchanged) ── */}
        <div className="hidden md:flex w-full flex-col gap-2 sm:gap-3">
          {BRAND_ROWS.map((row, rowIdx) => {
            const logoH = ROW_HEIGHT[rowIdx] || "34px";
            const cellW = `${100 / row.length}%`;
            const pad = rowIdx <= 1 ? "px-3 py-3 sm:px-4 sm:py-4" : rowIdx === 2 ? "px-2 py-2 sm:px-3" : rowIdx <= 4 ? "px-2 py-2 sm:px-3" : "px-1.5 py-2 sm:px-2";
            return (
              <motion.div
                key={rowIdx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: rowIdx * 0.07 }}
                className="w-full flex items-center"
              >
                {row.map((brand) => (
                  <div
                    key={brand.name}
                    className={`flex items-center justify-center ${pad}`}
                    style={{ width: cellW, flexShrink: 0 }}
                  >
                    <motion.img
                      src={brand.image}
                      alt={brand.name}
                      loading="lazy"
                      whileHover={{ opacity: 1, scale: 1.08, filter: "brightness(1.25) drop-shadow(0 0 8px rgba(212,175,55,0.45))" }}
                      transition={{ duration: 0.2 }}
                      style={{ height: logoH, width: 'auto', maxWidth: '95%', opacity: 0.88, objectFit: 'contain', objectPosition: 'center', cursor: 'default' }}
                    />
                  </div>
                ))}
              </motion.div>
            );
          })}

          {/* "and more…" trailing line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`${RajdhaniFont.className} w-full flex items-center justify-center gap-3 mt-2`}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#96895F]/40 to-transparent" />
            <span className="text-sm sm:text-base tracking-[0.18em] uppercase" style={{ color: 'rgba(150,137,95,0.65)' }}>
              and many more…
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#96895F]/40 to-transparent" />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${RajdhaniFont.className} mt-14 md:mt-20 flex flex-wrap justify-center gap-10 md:gap-16 text-center`}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-prOrange mb-1"
            >
              60+
            </motion.div>
            <div className="text-sm md:text-base text-[#A89773]" style={{ letterSpacing: '0.06em' }}>
              Brand Partners
            </div>
          </div>
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-prOrange mb-1"
            >
              100+
            </motion.div>
            <div className="text-sm md:text-base text-[#A89773]" style={{ letterSpacing: '0.06em' }}>
              Projects Delivered
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsSection;
