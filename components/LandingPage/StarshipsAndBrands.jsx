"use client";
import React from "react";
import { motion } from "framer-motion";
import CSSStars from "../Global/CSSStars";
import localFont from 'next/font/local';
import { Rajdhani } from 'next/font/google';
import FuturisticDivider from "../Global/FuturisticLine";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });

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

const BrandLogo = ({ brand, index, padding }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: 0.35, delay: (index % 10) * 0.025 }}
    className={`w-full h-full flex items-center justify-center rounded-lg ${padding}`}
    style={{ background: 'rgba(255,255,255,0.02)' }}
  >
    <img
      src={brand.image}
      alt={brand.name}
      loading="lazy"
      className="w-full h-full object-contain"
      style={{ filter: 'brightness(0.85) contrast(1)', opacity: 0.85 }}
    />
  </motion.div>
);

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

        {/* Brand Grid — 3-tier size hierarchy */}
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {BRAND_LOGOS.map((brand, index) => {
            const isLarge = index < 5;
            const isMedium = index >= 5 && index < 15;
            const cellSize = isLarge
              ? 'w-[calc(33%-6px)] sm:w-[calc(20%-7px)] md:w-[calc(18%-7px)] lg:w-[calc(16%-7px)]'
              : isMedium
              ? 'w-[calc(25%-6px)] sm:w-[calc(16.667%-7px)] md:w-[calc(14%-7px)] lg:w-[calc(12%-7px)]'
              : 'w-[calc(20%-6px)] sm:w-[calc(12.5%-7px)] md:w-[calc(10%-7px)] lg:w-[calc(8.5%-7px)]';
            const padding = isLarge ? 'p-1 sm:p-2' : isMedium ? 'p-2 sm:p-3' : 'p-3 sm:p-4';
            return (
            <div
              key={`${brand.name}-${index}`}
              className={`aspect-square relative overflow-visible flex-none ${cellSize}`}
            >
              <BrandLogo brand={brand} index={index} padding={padding} />
            </div>
            );
          })}
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
