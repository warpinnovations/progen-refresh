"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Delaunay } from "d3-delaunay";
import StarsCanvas from "../Global/StarCanvas"; // Make sure this path is correct
import { Oxanium } from "next/font/google";
import localFont from 'next/font/local';
import FuturisticDivider from "../Global/FuturisticLine";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const oxanium = Oxanium({ subsets: ["latin"], weight: ["400", "700"] });

// --- Configuration ---
const TOTAL_BRANDS = 22; // Slightly reduced to give more breathing room
const MIN_DISTANCE = 20; // Increased to prevent orb and glow overlap
const MAX_CONNECTIONS_PER_NODE = 2;

// --- Theme Colors ---
const highlightColor = "#EAE2B7"; // A bright, glowing gold
const baseColor = "#A89773";      // A muted, elegant bronze

// --- Component Starts Here ---
const BrandsConstellationSection = () => {
  const [hoveredBrandId, setHoveredBrandId] = useState(null);

  const { brands, connections } = useMemo(() => {
    const brandImages = [
      "/LandingPageAssets/awards/MEA Logo.png",
      "/LandingPageAssets/awards/Asia CEO Awards.PNG",
      "/LandingPageAssets/awards/Anvil Awards Logo.png",
    ];
    // --- UPDATE: Removed the brand number from the name ---
    const brandsData = Array.from({ length: TOTAL_BRANDS }, () => ({
      name: "Brand",
      image: brandImages[Math.floor(Math.random() * brandImages.length)],
    }));

    const brandPoints = [];
    let attempts = 0;
    const maxAttempts = TOTAL_BRANDS * 200;

    for (let i = 0; i < TOTAL_BRANDS; i++) {
      let newPoint;
      let isOverlapping;
      do {
        isOverlapping = false;
        newPoint = { x: 5 + Math.random() * 90, y: 10 + Math.random() * 80 }; // More vertical space
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

    // Delaunay triangulation to find nearest neighbors for connections
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

    const uniqueSortedEdges = Array.from(new Map(edgesWithDistance.map((e) => [`${Math.min(e.u, e.v)}-${Math.max(e.u, e.v)}`, e])).values())
      .sort((a, b) => a.dist - b.dist);

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
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 12 } } };
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.5 + i * 0.05 },
        opacity: { duration: 0.1, delay: 0.5 + i * 0.05 },
      },
    }),
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-24 px-4 [background-image:radial-gradient(ellipse_at_center,rgba(150,135,90,0.1),transparent_60%)]">
      {/* --- ORBIT BACKGROUND: Large faint ring --- */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <svg width="90%" height="90%" viewBox="0 0 100 100" className="block" style={{ maxWidth: '900px', maxHeight: '900px' }}>
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="#EAE2B7"
            strokeWidth="0.7"
            opacity="0.13"
            strokeDasharray="2 2"
          />
        </svg>
      </div>
      {/* --- STAR GAZER BACKGROUND: covers entire section --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsCanvas />
      </div>
      <div className="absolute inset-0 z-1 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: "100%" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`${MoonlanderFont.className} font-black text-3xl md:text-5xl mb-16`}
        >
          <span className="text-[#f5f5f5]">Brands </span>
          <span className="text-prOrange">in Orbit</span>
        </motion.h1>
        <FuturisticDivider color="#EAE2B7" className="mb-16" />

        <motion.div
          className="relative w-full h-[70vh]"
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        >
          {/* --- RESTORED: SVG for constellation lines --- */}
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g>
              {connections.map(({ u: startId, v: endId }, i) => {
                const startBrand = brands.find((b) => b.id === startId);
                const endBrand = brands.find((b) => b.id === endId);
                if (!startBrand || !endBrand) return null;
                const isHighlighted = hoveredBrandId !== null && (startId === hoveredBrandId || endId === hoveredBrandId);
                const pathD = `M ${startBrand.pos.x} ${startBrand.pos.y} L ${endBrand.pos.x} ${endBrand.pos.y}`;
                return (
                  <motion.path
                    key={`line-${i}`}
                    d={pathD}
                    fill="transparent"
                    strokeWidth={isHighlighted ? 0.3 : 0.15}
                    variants={lineVariants}
                    custom={i}
                    stroke={isHighlighted ? highlightColor : `${baseColor}50`}
                    className="transition-all duration-300"
                    style={isHighlighted ? { filter: `drop-shadow(0 0 4px ${highlightColor}B0)` } : {}}
                  />
                );
              })}
            </g>
          </svg>
          {/* --- CONSTELLATION LIGHTS: Glowing dots at each brand node --- */}
          {brands.map((brand) => (
            <div
              key={`star-dot-${brand.id}`}
              className="absolute z-10 pointer-events-none"
              style={{
                top: `${brand.pos.y}%`,
                left: `${brand.pos.x}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="w-5 h-5 rounded-full bg-[#EAE2B7] opacity-70 blur-[2px] shadow-[0_0_16px_6px_#EAE2B7]"
                style={{
                  boxShadow: `0 0 18px 7px #EAE2B7AA, 0 0 2px 1px #fff8`,
                  opacity: hoveredBrandId === brand.id ? 1 : 0.7,
                  transition: 'opacity 0.2s',
                }}
              />
            </div>
          ))}

          {/* --- POLISHED: Brand Orbs to match reference image --- */}
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className="absolute group transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${brand.pos.y}%`, left: `${brand.pos.x}%` }}
              onHoverStart={() => setHoveredBrandId(brand.id)}
              onHoverEnd={() => setHoveredBrandId(null)}
            >
              <motion.div
                className="relative w-32 h-32 cursor-pointer flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* The dark orb container with the refined outer glow */}
                <div
                  className="w-full h-full rounded-full bg-black/50 transition-shadow duration-300 flex items-center justify-center"
                  style={{
                    boxShadow: hoveredBrandId === brand.id
                      ? `0 0 50px 10px ${highlightColor}30`
                      : `0 0 35px 5px #00000090`,
                  }}
                >
                  {/* The logo image, cleanly fitted with more padding */}
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full rounded-full object-contain p-4"
                  />
                </div>
                {/* The brand name, placed consistently below the orb */}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsConstellationSection;