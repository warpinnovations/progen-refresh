"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CSSStars from "../Global/CSSStars";
import localFont from 'next/font/local';
import { Rajdhani } from 'next/font/google';
import FuturisticDivider from "../Global/FuturisticLine";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });

const highlightColor = "#EAE2B7";
const accentColor = "#D4AF37";

const BRAND_LOGOS = [
  // brandLogos directory
  { name: "More Power",                image: "/brandLogos/MorePower(white).png" },
  { name: "Asia Pacific Medical Center",image: "/brandLogos/APMC.png" },
  { name: "Adidas",                    image: "/brandLogos/Adidas.png" },
  { name: "Home Credit",               image: "/brandLogos/Home Credit.png" },
  { name: "Monde Nissin",              image: "/brandLogos/Monde Nissin.png" },
  { name: "Haier",                     image: "/brandLogos/Haier.png" },
  { name: "DSWD",                      image: "/brandLogos/DSWD.png" },
  { name: "Imperial Appliance Plaza",  image: "/addedbrands/IAP_WHITE_DROP_SHADOW.png" },
  { name: "Daily Guardian",            image: "/brandLogos/Daily Guardian.png" },
  { name: "Dinagyang Festival",        image: "/brandLogos/Dinagyang Festival.png" },
  { name: "Bread Basket",              image: "/brandLogos/Bread Basket.png" },
  { name: "Damires Hills",             image: "/brandLogos/Damires Hills.PNG" },
  { name: "Nike",                      image: "/brandLogos/Nike.png" },
  { name: "Honda",                     image: "/brandLogos/Honda.png" },
  { name: "Ford",                      image: "/brandLogos/Ford.png" },
  { name: "Japan Foundation",          image: "/brandLogos/Japan Foundation.png" },
  { name: "Metro Pacific Iloilo Water",image: "/brandLogos/Metro Pacific Iloilo Water.png" },
  { name: "Courtyard by Marriott",     image: "/brandLogos/Courtyard.png" },
  { name: "Coffee Brewthorhood",       image: "/brandLogos/Coffee Brewthorhood.png" },
  { name: "Isuzu",                     image: "/brandLogos/Isuzu Logo - White.png" },
  { name: "101 Food",                  image: "/brandLogos/101 Food.png" },
  { name: "PCCI",                      image: "/brandLogos/PCCI.png" },
  { name: "IBC",                       image: "/brandLogos/IBC.png" },
  { name: "DOST",                      image: "/brandLogos/DOST.png" },
  { name: "Azalan",                    image: "/brandLogos/Azalan.png" },
  { name: "GOOZAM",                    image: "/brandLogos/Goozam.png" },
  { name: "Pueblo de Panay",           image: "/addedbrands/Pueblo de Panay logo.png" },
  // addedbrands directory
  { name: "AC Energy",                 image: "/addedbrands/AC Energy Logo.png" },
  { name: "BeOzzy",                    image: "/addedbrands/BeOzzy-MainLogo_H-Tagline-RGB-White.png" },
  { name: "Datasoftlogic",             image: "/addedbrands/DATASOFTLOGIC_LOGO.png" },
  { name: "E.Curate",                  image: "/addedbrands/E.Curate Logo_stacked white.png" },
  { name: "Fiesta One Ayala",          image: "/addedbrands/Fiesta One ayala.png" },
  { name: "FIR Multi-Purpose Cooperative", image: "/addedbrands/FIR.jpg" },
  { name: "Freshood",                  image: "/addedbrands/Freshood_Logo_Primary.png" },
  { name: "Hotel Veronica",            image: "/addedbrands/Hotel Veronica logo.jpg" },
  { name: "Iloilo Coffee Festival",    image: "/addedbrands/ICFLOGO_Stacked_Kayumanggi.png" },
  { name: "Iloilo Grand Hotel",        image: "/addedbrands/IGH Logo.jpeg" },
  { name: "IloEsports",                image: "/addedbrands/IloEsports Logo.png" },
  { name: "Iloilo United Royals",      image: "/addedbrands/Iloilo united royals.jpg" },
  { name: "Kwadra TBI",                image: "/addedbrands/KTBI_KWADRA FULL COLOR VERTICAL.png" },
  { name: "LiDU",                      image: "/addedbrands/Lidu.png" },
  { name: "Bootcamp",                  image: "/addedbrands/Logo_with_label.png" },
  { name: "Nifty Fifty",               image: "/addedbrands/Nifty fifty logo.jpg" },
  { name: "One UPV",                   image: "/addedbrands/One UPV logo.png" },
  { name: "Premier Family Business Consulting", image: "/addedbrands/Premiere.png" },
  { name: "PSG",                       image: "/addedbrands/PSG-LOGO.png" },
  { name: "Sue's Cake Gallery",        image: "/addedbrands/Sue_s Logo PNG.png" },
  { name: "Superhouse Solutions",      image: "/addedbrands/Superhouse Solutions - Stacked.png" },
  { name: "VSG Group",                 image: "/addedbrands/VSG Logo_Stacked.png" },
];

const BrandLogo = ({ brand, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const showPopup = isHovered || isActive;

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.35, delay: (index % 10) * 0.025 }}
        whileTap={{ scale: 0.93 }}
        className="w-full h-full flex items-center justify-center p-4 sm:p-5 rounded-lg cursor-pointer transition-all duration-300"
        style={{
          border: showPopup ? `1.5px solid ${accentColor}80` : '1.5px solid rgba(255,255,255,0.06)',
          boxShadow: showPopup ? `0 0 20px 3px ${accentColor}25` : 'none',
          background: showPopup ? `rgba(212, 175, 55, 0.06)` : 'rgba(255,255,255,0.02)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
        onClick={() => setIsActive(prev => !prev)}
      >
        <img
          src={brand.image}
          alt={brand.name}
          loading="lazy"
          className="w-full h-full object-contain transition-all duration-300"
          style={{
            filter: showPopup
              ? `brightness(1.2) contrast(1.05) drop-shadow(0 0 8px ${accentColor}50)`
              : 'brightness(0.85) contrast(1)',
            transform: showPopup ? 'scale(1.07)' : 'scale(1)',
          }}
        />
      </motion.div>

      {/* Name popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.88 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+6px)] z-50 pointer-events-none"
          >
            <div
              className={`${RajdhaniFont.className} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap`}
              style={{
                background: 'rgba(0,0,0,0.92)',
                border: `1px solid ${accentColor}90`,
                color: highlightColor,
                boxShadow: `0 0 14px ${accentColor}35, 0 4px 16px rgba(0,0,0,0.7)`,
                letterSpacing: '0.09em',
              }}
            >
              {brand.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

        {/* Brand Grid — flex-wrap so last row centers */}
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {BRAND_LOGOS.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="aspect-square relative overflow-visible flex-none w-[calc(25%-6px)] sm:w-[calc(20%-7px)] md:w-[calc(16.667%-7px)] lg:w-[calc(12.5%-7px)] xl:w-[calc(10%-9px)]"
            >
              <BrandLogo brand={brand} index={index} />
            </div>
          ))}
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
              {BRAND_LOGOS.length}+
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
