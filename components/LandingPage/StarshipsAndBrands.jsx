"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Delaunay } from "d3-delaunay";
import StarsCanvas from "../Global/StarCanvas";
import { Oxanium } from "next/font/google";
import localFont from 'next/font/local';
import FuturisticDivider from "../Global/FuturisticLine";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const oxanium = Oxanium({ subsets: ["latin"], weight: ["400", "700"] });

// --- Configuration ---
const TOTAL_BRANDS = 22;
const TOTAL_BRANDS_MOBILE = 14; // Reduced for mobile
const MIN_DISTANCE = 20;
const MAX_CONNECTIONS_PER_NODE = 2;

// --- Theme Colors ---
const highlightColor = "#EAE2B7";
const baseColor = "#A89773";

// --- Component Starts Here ---
const BrandsConstellationSection = () => {
  const [hoveredBrandId, setHoveredBrandId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { brands, connections } = useMemo(() => {
    const brandImages = [
      "/LandingPageAssets/awards/MEA Logo.png",
      "/LandingPageAssets/awards/Asia CEO Awards.PNG",
      "/LandingPageAssets/awards/Anvil Awards Logo.png",
    ];
    
    const totalBrands = isMobile ? TOTAL_BRANDS_MOBILE : TOTAL_BRANDS;
    
    const brandsData = Array.from({ length: totalBrands }, () => ({
      name: "Brand",
      image: brandImages[Math.floor(Math.random() * brandImages.length)],
    }));

    const brandPoints = [];
    let attempts = 0;
    const maxAttempts = totalBrands * 200;

    for (let i = 0; i < totalBrands; i++) {
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
    const connectionCount = new Array(totalBrands).fill(0);
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
  }, [isMobile]);

  // Animation variants
  const containerVariants = { 
    hidden: {}, 
    visible: { 
      transition: { 
        staggerChildren: isMobile ? 0.06 : 0.08 
      } 
    } 
  };
  
  const itemVariants = { 
    hidden: { opacity: 0, scale: 0 }, 
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 12 
      } 
    } 
  };
  
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-16 sm:py-20 md:py-24 px-4 [background-image:radial-gradient(ellipse_at_center,rgba(150,135,90,0.1),transparent_60%)]">
      {/* Orbit Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <svg 
          width={isMobile ? "95%" : "90%"} 
          height={isMobile ? "95%" : "90%"} 
          viewBox="0 0 100 100" 
          className="block" 
          style={{ 
            maxWidth: isMobile ? '600px' : '900px', 
            maxHeight: isMobile ? '600px' : '900px' 
          }}
        >
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="#EAE2B7"
            strokeWidth={isMobile ? "0.5" : "0.7"}
            opacity="0.13"
            strokeDasharray="2 2"
          />
        </svg>
      </div>
      
      {/* Star Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsCanvas />
      </div>
      <div className="absolute inset-0 z-1 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl mb-8 md:mb-12 text-center`}
        >
          <span className="text-[#f5f5f5]">Brands </span>
          <span className="text-prOrange">in Orbit</span>
        </motion.h1>
        <FuturisticDivider color="#EAE2B7" className="mb-8 md:mb-16" />

        <motion.div
          className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh]"
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Connection Lines */}
          <svg 
            className="absolute top-0 left-0 w-full h-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
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
                    strokeWidth={isHighlighted ? (isMobile ? 0.25 : 0.3) : (isMobile ? 0.12 : 0.15)}
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
          
          {/* Glowing Dots */}
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
                className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4 md:w-5 md:h-5'} rounded-full bg-[#EAE2B7] opacity-70 blur-[2px]`}
                style={{
                  boxShadow: `0 0 ${isMobile ? '14px 5px' : '18px 7px'} #EAE2B7AA, 0 0 2px 1px #fff8`,
                  opacity: hoveredBrandId === brand.id ? 1 : 0.7,
                  transition: 'opacity 0.2s',
                }}
              />
            </div>
          ))}

          {/* Brand Orbs */}
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className="absolute group transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${brand.pos.y}%`, left: `${brand.pos.x}%` }}
              onMouseEnter={() => setHoveredBrandId(brand.id)}
              onMouseLeave={() => setHoveredBrandId(null)}
              onTouchStart={() => setHoveredBrandId(brand.id)}
              onTouchEnd={() => setTimeout(() => setHoveredBrandId(null), 800)}
            >
              <motion.div
                className={`relative cursor-pointer flex flex-col items-center justify-center ${
                  isMobile ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-28 h-28 md:w-32 md:h-32'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Orb Container */}
                <div
                  className="w-full h-full rounded-full bg-black/50 transition-shadow duration-300 flex items-center justify-center"
                  style={{
                    boxShadow: hoveredBrandId === brand.id
                      ? `0 0 ${isMobile ? '40px 8px' : '50px 10px'} ${highlightColor}30`
                      : `0 0 ${isMobile ? '28px 4px' : '35px 5px'} #00000090`,
                  }}
                >
                  {/* Logo Image */}
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className={`w-full h-full rounded-full object-contain ${
                      isMobile ? 'p-3' : 'p-3.5 md:p-4'
                    }`}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsConstellationSection;