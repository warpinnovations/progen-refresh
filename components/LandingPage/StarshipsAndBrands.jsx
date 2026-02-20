"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Delaunay } from "d3-delaunay";
import CSSStars from "../Global/CSSStars";
import localFont from 'next/font/local';
import { Rajdhani } from 'next/font/google';
import FuturisticDivider from "../Global/FuturisticLine";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });

// --- Configuration ---
const TOTAL_BRANDS = 16;
const MIN_DISTANCE = 20;
const MAX_CONNECTIONS_PER_NODE = 2;

// --- Theme Colors ---
const highlightColor = "#EAE2B7";
const accentColor = "#D4AF37";
const baseColor = "#A89773";

// --- Brand Data ---
const BRAND_LOGOS = [
  { name: "Adidas", image: "/brandLogos/Adidas.png" },
  { name: "Daily Guardian", image: "/brandLogos/Daily Guardian.png" },
  { name: "Dinagyang Festival", image: "/brandLogos/Dinagyang Festival.png" },
  { name: "Home Credit", image: "/brandLogos/Home Credit.png" },
  { name: "IBC", image: "/brandLogos/IBC.png" },
  { name: "Imperial", image: "/brandLogos/Imperial.png" },
  { name: "101 Foods", image: "/brandLogos/101 Food.png" },
  { name: "Bread Basket", image: "/brandLogos/Bread Basket.png" },
  { name: "More Power", image: "/brandLogos/MorePower(white).png" },
  { name: "Asia Pacific", image: "/brandLogos/APMC.png" },
  { name: "Japan Foundation", image: "/brandLogos/Japan Foundation.png" },
  { name: "Damires", image: "/brandLogos/Damires Hills.PNG" },
  { name: "Nike", image: "/brandLogos/Nike.png" },
  { name: "Goozam", image: "/brandLogos/Goozam.png" },
  { name: "PCCI", image: "/brandLogos/PCCI.png" },
  { name: "Dinagyang Festivala", image: "/brandLogos/Dinagyang.png" },
];

// --- Component ---
const BrandsConstellationSection = () => {
  const [hoveredBrandId, setHoveredBrandId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { brands, connections } = useMemo(() => {
    // Use all brand logos
    const brandsData = Array.from({ length: TOTAL_BRANDS }, (_, i) => ({
      name: BRAND_LOGOS[i % BRAND_LOGOS.length].name,
      image: BRAND_LOGOS[i % BRAND_LOGOS.length].image,
    }));

    const brandPoints = [];
    let attempts = 0;
    const maxAttempts = TOTAL_BRANDS * 200;

    for (let i = 0; i < TOTAL_BRANDS; i++) {
      let newPoint;
      let isOverlapping;
      do {
        isOverlapping = false;
        newPoint = { x: 5 + Math.random() * 90, y: 10 + Math.random() * 80 };
        for (const existingPoint of brandPoints) {
          const dist = Math.hypot(
            existingPoint.pos.x - newPoint.x,
            existingPoint.pos.y - newPoint.y
          );
          if (dist < MIN_DISTANCE) {
            isOverlapping = true;
            break;
          }
        }
        attempts++;
        if (attempts > maxAttempts) {
          console.error(`Could not place brand ${i + 1}.`);
          break;
        }
      } while (isOverlapping && attempts <= maxAttempts);

      if (attempts <= maxAttempts) {
        brandPoints.push({
          id: i,
          name: brandsData[i].name,
          image: brandsData[i].image,
          pos: newPoint,
        });
      }
    }

    if (brandPoints.length < 2) return { brands: brandPoints, connections: [] };

    // Delaunay triangulation
    const delaunayPoints = brandPoints.map((p) => [p.pos.x, p.pos.y]);
    const delaunay = Delaunay.from(delaunayPoints);
    const triangleEdges = [];
    for (let i = 0; i < delaunay.triangles.length; i += 3) {
      triangleEdges.push([delaunay.triangles[i], delaunay.triangles[i + 1]]);
      triangleEdges.push([delaunay.triangles[i + 1], delaunay.triangles[i + 2]]);
      triangleEdges.push([delaunay.triangles[i + 2], delaunay.triangles[i]]);
    }
    const edgesWithDistance = triangleEdges
      .map(([i, j]) => {
        if (i === undefined || j === undefined) return null;
        const p1 = brandPoints[i];
        const p2 = brandPoints[j];
        if (!p1 || !p2) return null;
        const dist = Math.hypot(p1.pos.x - p2.pos.x, p1.pos.y - p2.pos.y);
        return { u: p1.id, v: p2.id, dist };
      })
      .filter(Boolean);

    const uniqueSortedEdges = Array.from(
      new Map(
        edgesWithDistance.map((e) => [
          `${Math.min(e.u, e.v)}-${Math.max(e.u, e.v)}`,
          e,
        ])
      ).values()
    ).sort((a, b) => a.dist - b.dist);

    const finalConnections = [];
    const connectionCount = new Array(TOTAL_BRANDS).fill(0);
    for (const edge of uniqueSortedEdges) {
      if (
        connectionCount[edge.u] < MAX_CONNECTIONS_PER_NODE &&
        connectionCount[edge.v] < MAX_CONNECTIONS_PER_NODE
      ) {
        finalConnections.push(edge);
        connectionCount[edge.u]++;
        connectionCount[edge.v]++;
      }
    }
    return { brands: brandPoints, connections: finalConnections };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.8, ease: "easeInOut", delay: 0.4 + i * 0.03 },
        opacity: { duration: 0.2, delay: 0.4 + i * 0.03 },
      },
    }),
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-12 sm:py-16 md:py-20 lg:py-28 px-4">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,rgba(168,151,115,0.06)_40%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,226,183,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
      </div>

      {/* Animated Orbit Rings - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <svg
            width="88%"
            height="88%"
            viewBox="0 0 100 100"
            className="block"
            style={{
              maxWidth: '950px',
              maxHeight: '950px',
            }}
          >
            {/* Outer orbit ring */}
            <motion.circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke={highlightColor}
              strokeWidth="0.5"
              opacity="0.15"
              strokeDasharray="3 3"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />
            {/* Middle orbit ring */}
            <motion.circle
              cx="50" cy="50" r="38"
              fill="none"
              stroke={accentColor}
              strokeWidth="0.45"
              opacity="0.12"
              strokeDasharray="2 4"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />
            {/* Inner orbit ring */}
            <motion.circle
              cx="50" cy="50" r="30"
              fill="none"
              stroke={baseColor}
              strokeWidth="0.4"
              opacity="0.1"
              strokeDasharray="1.5 2.5"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />
          </svg>
        </div>
      )}

      {/* Star Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStars />
      </div>
      <div className="absolute inset-0 z-1 bg-black/30"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl`}>
            <span className="text-[#f5f5f5]">Trusted by </span>
            <span className="text-prOrange">Industry Leaders</span>
          </h2>

          <FuturisticDivider color="#EAE2B7" />

          <p className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/85 mt-4 sm:mt-6 max-w-4xl mx-auto px-4`}
             style={{ 
               letterSpacing: '0.06em',
               lineHeight: '1.5',
               fontWeight: '500'
             }}>
            Collaborating with 16+ premium brands to create extraordinary experiences
          </p>
        </motion.div>

        {/* Constellation Visualization - Desktop Only / Carousel - Mobile */}
        {!isMobile ? (
          <motion.div
            className="relative w-full h-[75vh]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Connection Lines */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={highlightColor} stopOpacity="0.3" />
                  <stop offset="50%" stopColor={accentColor} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={highlightColor} stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g>
                {connections.map(({ u: startId, v: endId }, i) => {
                  const startBrand = brands.find((b) => b.id === startId);
                  const endBrand = brands.find((b) => b.id === endId);
                  if (!startBrand || !endBrand) return null;
                  const isHighlighted =
                    hoveredBrandId !== null &&
                    (startId === hoveredBrandId || endId === hoveredBrandId);
                  const pathD = `M ${startBrand.pos.x} ${startBrand.pos.y} L ${endBrand.pos.x} ${endBrand.pos.y}`;
                  return (
                    <motion.path
                      key={`line-${i}`}
                      d={pathD}
                      fill="transparent"
                      strokeWidth={isHighlighted ? 0.4 : 0.18}
                      variants={lineVariants}
                      custom={i}
                      stroke={isHighlighted ? "url(#lineGradient)" : `${baseColor}40`}
                      className="transition-all duration-300"
                      filter={isHighlighted ? "url(#glow)" : undefined}
                      style={
                        isHighlighted
                          ? {
                              filter: `drop-shadow(0 0 6px ${highlightColor}90)`,
                            }
                          : {}
                      }
                    />
                  );
                })}
              </g>
            </svg>

            {/* Glowing Node Dots */}
            {brands.map((brand) => {
              const isHovered = hoveredBrandId === brand.id;
              return (
                <motion.div
                  key={`star-dot-${brand.id}`}
                  className="absolute z-10 pointer-events-none"
                  style={{
                    top: `${brand.pos.y}%`,
                    left: `${brand.pos.x}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.3, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-[#EAE2B7] to-[#D4AF37]"
                    style={{
                      boxShadow: isHovered
                        ? `0 0 28px 12px ${highlightColor}DD, 0 0 50px 20px ${accentColor}80`
                        : `0 0 22px 9px ${highlightColor}AA, 0 0 3px 1px #fff9`,
                      opacity: isHovered ? 1 : 0.8,
                      transition: 'all 0.3s ease',
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Brand Orbs */}
            {brands.map((brand) => {
              const isHovered = hoveredBrandId === brand.id;
              return (
                <motion.div
                  key={brand.id}
                  variants={itemVariants}
                  className="absolute group transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: `${brand.pos.y}%`, left: `${brand.pos.x}%` }}
                  onMouseEnter={() => setHoveredBrandId(brand.id)}
                  onMouseLeave={() => setHoveredBrandId(null)}
                >
                  <motion.div
                    className="relative cursor-pointer flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36"
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {/* Outer glow ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${highlightColor}20 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0,
                      }}
                      animate={{
                        scale: isHovered ? [1, 1.4, 1] : 1,
                        opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isHovered ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Main orb container */}
                    <div
                      className="relative w-full h-full rounded-full bg-gradient-to-br from-black/70 via-black/50 to-black/70 transition-all duration-300 flex items-center justify-center overflow-hidden"
                      style={{
                        border: isHovered
                          ? `2px solid ${highlightColor}`
                          : `1.5px solid ${baseColor}40`,
                        boxShadow: isHovered
                          ? `0 0 50px 15px ${highlightColor}40, 
                             0 0 80px 30px ${accentColor}20,
                             inset 0 0 30px 8px ${highlightColor}10`
                          : `0 0 35px 8px rgba(0,0,0,0.8),
                             inset 0 0 20px 5px rgba(234,226,183,0.05)`,
                      }}
                    >
                      {/* Inner gradient overlay */}
                      <div
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${highlightColor}15, transparent 60%)`,
                        }}
                      />

                      {/* Logo Image */}
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="relative z-10 w-full h-full object-contain transition-all duration-300 p-4 md:p-5"
                        style={{
                          filter: isHovered
                            ? 'brightness(1.15) contrast(1.1) drop-shadow(0 0 8px rgba(234,226,183,0.4))'
                            : 'brightness(0.95) contrast(1.05)',
                        }}
                      />

                      {/* Shimmer effect on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `linear-gradient(120deg, transparent 0%, ${highlightColor}30 50%, transparent 100%)`,
                          }}
                          initial={{ x: '-100%', opacity: 0 }}
                          animate={{ x: '100%', opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Brand name tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-3 whitespace-nowrap pointer-events-none"
                        >
                          <div
                            className={`${RajdhaniFont.className} px-3 py-1.5 rounded-full bg-black/90 border backdrop-blur-sm text-sm`}
                            style={{
                              borderColor: highlightColor,
                              boxShadow: `0 0 15px ${highlightColor}40, 0 4px 15px rgba(0,0,0,0.5)`,
                              color: highlightColor,
                              letterSpacing: '0.06em',
                            }}
                          >
                            {brand.name}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Mobile Carousel - Enhanced */
          <div className="relative w-full py-12">
            {/* Decorative elements */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${accentColor}15 0%, transparent 60%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Top decorative line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent, ${highlightColor}60, ${accentColor}80, ${highlightColor}60, transparent)`,
                maxWidth: '80%',
                width: '80%',
              }}
            />

            {/* Bottom decorative line */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}80, ${highlightColor}60, ${accentColor}80, transparent)`,
                maxWidth: '80%',
                width: '80%',
              }}
            />

            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-5"
                animate={{
                  x: [0, -(110 + 20) * BRAND_LOGOS.length], // 110px width + 20px gap
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: BRAND_LOGOS.length * 3.5,
                    ease: "linear",
                  },
                }}
                style={{ width: 'fit-content' }}
              >
                {/* Render logos 2 times for seamless loop */}
                {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, index) => (
                  <div
                    key={`carousel-${index}`}
                    className="flex-shrink-0 w-[110px] h-[110px] rounded-2xl relative overflow-hidden"
                  >
                    {/* Border */}
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${highlightColor}40, ${accentColor}40, ${highlightColor}40)`,
                      }}
                    />

                    {/* Main card container */}
                    <div
                      className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-black/90 via-black/70 to-black/90 flex items-center justify-center p-5"
                      style={{
                        boxShadow: `0 0 30px 8px rgba(0,0,0,0.9), inset 0 0 20px 4px rgba(234,226,183,0.08)`,
                      }}
                    >
                      {/* Corner accents - static */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg opacity-60" style={{ borderColor: accentColor }} />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 rounded-br-lg opacity-60" style={{ borderColor: accentColor }} />

                      {/* Logo */}
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="relative z-10 w-full h-full object-contain"
                        style={{ filter: 'brightness(1) contrast(1.1)' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Enhanced gradient fade edges with glow */}
              <div
                className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(to right, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)`,
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(to left, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)`,
                }}
              />

              {/* Side glow accents - static */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-24 rounded-r-full opacity-50"
                style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}60, transparent)` }}
              />
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-24 rounded-l-full opacity-50"
                style={{ background: `linear-gradient(to bottom, transparent, ${highlightColor}60, transparent)` }}
              />
            </div>

          </div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`${RajdhaniFont.className} mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-center`}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-prOrange mb-1"
            >
              16+
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
              transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
              className="text-3xl md:text-4xl font-bold text-prOrange mb-1"
            >
              100+
            </motion.div>
            <div className="text-sm md:text-base text-[#A89773]" style={{ letterSpacing: '0.06em' }}>
              Projects Delivered
            </div>
          </div>
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-prOrange mb-1"
            >
              5+
            </motion.div>
            <div className="text-sm md:text-base text-[#A89773]" style={{ letterSpacing: '0.06em' }}>
              Years Experience
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsConstellationSection;