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

// Row-based layout — each row fills full width, height set per tier
// NOTE: Add /brandLogos/Hafele.png to enable the Häfele slot in row 3
const BRAND_ROWS = [
  // Row 1 — 5 hero logos
  [
    { name: "More Power",                 image: "/brandLogos/MorePower(white).png" },
    { name: "Asia Pacific Medical Center",image: "/brandLogos/APMC.png" },
    { name: "Adidas",                     image: "/brandLogos/Adidas.png" },
    { name: "Home Credit",                image: "/brandLogos/Home Credit.png" },
    { name: "Monde Nissin",               image: "/brandLogos/Monde Nissin.png" },
  ],
  // Row 2 — 8 logos
  [
    { name: "DSWD",                       image: "/brandLogos/DSWD.png" },
    { name: "Japan Foundation",           image: "/brandLogos/Japan Foundation.png" },
    { name: "Imperial Appliance Plaza",   image: "/addedbrands/IAP_WHITE_DROP_SHADOW.png" },
    { name: "Bootcamp | Adidas",          image: "/addedbrands/Logo_with_label.png" },
    { name: "Honda",                      image: "/brandLogos/Honda.png" },
    { name: "Ford",                       image: "/brandLogos/Ford.png" },
    { name: "Haier",                      image: "/brandLogos/Haier.png" },
    { name: "Isuzu",                      image: "/brandLogos/Isuzu Logo - White.png" },
  ],
  // Row 3 — 6 logos (add Häfele file to unlock slot)
  [
    { name: "Häfele",                     image: "/brandLogos/Hafele.png" },
    { name: "Nike",                       image: "/brandLogos/Nike.png" },
    { name: "Daily Guardian",             image: "/brandLogos/Daily Guardian.png" },
    { name: "Dinagyang Festival",         image: "/brandLogos/Dinagyang Festival.png" },
    { name: "Courtyard by Marriott",      image: "/brandLogos/Courtyard.png" },
    { name: "Metro Pacific Iloilo Water", image: "/brandLogos/Metro Pacific Iloilo Water.png" },
  ],
  // Row 4 — 9 logos
  [
    { name: "Pueblo de Panay",            image: "/addedbrands/Pueblo de Panay logo.png" },
    { name: "Coffee Brewthorhood",        image: "/brandLogos/Coffee Brewthorhood.png" },
    { name: "Premier Family Business",    image: "/addedbrands/Premiere.png" },
    { name: "Freshood",                   image: "/addedbrands/Freshood_Logo_Primary.png" },
    { name: "Bread Basket",               image: "/brandLogos/Bread Basket.png" },
    { name: "Iloilo Grand Hotel",         image: "/addedbrands/IGH Logo.jpeg" },
    { name: "Damires Hills",              image: "/brandLogos/Damires Hills.PNG" },
    { name: "AC Energy",                  image: "/addedbrands/AC Energy Logo.png" },
    { name: "Fiesta One Ayala",           image: "/addedbrands/Fiesta One ayala.png" },
  ],
  // Row 5 — 9 logos
  [
    { name: "One UPV",                    image: "/addedbrands/One UPV logo.png" },
    { name: "101 Food",                   image: "/brandLogos/101 Food.png" },
    { name: "Sue's Cake Gallery",         image: "/addedbrands/Sue_s Logo PNG.png" },
    { name: "Nifty Fifty",                image: "/addedbrands/Nifty fifty logo.jpg" },
    { name: "BeOzzy",                     image: "/addedbrands/BeOzzy-MainLogo_H-Tagline-RGB-White.png" },
    { name: "PCCI",                       image: "/brandLogos/PCCI.png" },
    { name: "IBC",                        image: "/brandLogos/IBC.png" },
    { name: "Datasoftlogic",              image: "/addedbrands/DATASOFTLOGIC_LOGO.png" },
    { name: "DOST",                       image: "/brandLogos/DOST.png" },
  ],
  // Row 6 — 12 extra-small logos
  [
    { name: "Hotel Veronica",             image: "/addedbrands/Hotel Veronica logo.jpg" },
    { name: "IloEsports",                 image: "/addedbrands/IloEsports Logo.png" },
    { name: "GOOZAM",                     image: "/brandLogos/Goozam.png" },
    { name: "E.Curate",                   image: "/addedbrands/E.Curate Logo_stacked white.png" },
    { name: "LiDU",                       image: "/addedbrands/Lidu.png" },
    { name: "Superhouse Solutions",       image: "/addedbrands/Superhouse Solutions - Stacked.png" },
    { name: "Iloilo United Royals",       image: "/addedbrands/Iloilo united royals.jpg" },
    { name: "FIR Multi-Purpose",          image: "/addedbrands/FIR.jpg" },
    { name: "Kwadra TBI",                 image: "/addedbrands/KTBI_KWADRA FULL COLOR VERTICAL.png" },
    { name: "VSG Group",                  image: "/addedbrands/VSG Logo_Stacked.png" },
    { name: "PSG",                        image: "/addedbrands/PSG-LOGO.png" },
    { name: "Iloilo Coffee Festival",     image: "/addedbrands/ICFLOGO_Stacked_Kayumanggi.png" },
  ],
];

// Logo height per row index — larger on top, smaller on bottom
const ROW_HEIGHT = ["80px", "60px", "60px", "44px", "44px", "34px"];


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

        {/* Brand Grid — rows fill full width, logo height shrinks per row */}
        <div className="w-full flex flex-col gap-2 sm:gap-3">
          {BRAND_ROWS.map((row, rowIdx) => {
            const logoH = ROW_HEIGHT[rowIdx] || "34px";
            const cellW = `${100 / row.length}%`;
            const pad = rowIdx <= 1 ? "px-3 py-3 sm:px-4 sm:py-4" : rowIdx <= 2 ? "px-2 py-3 sm:px-3" : "px-1.5 py-2 sm:px-2";
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
                    <img
                      src={brand.image}
                      alt={brand.name}
                      loading="lazy"
                      style={{ height: logoH, width: 'auto', maxWidth: '90%', opacity: 0.85, filter: 'brightness(0.9) contrast(1)', objectFit: 'contain' }}
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
            <span className="text-sm sm:text-base tracking-[0.18em] uppercase"
              style={{ color: 'rgba(150,137,95,0.65)' }}>
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
