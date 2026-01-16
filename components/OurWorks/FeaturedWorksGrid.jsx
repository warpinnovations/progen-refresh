"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
import { worksData as allWorksData } from '@/app/contants';
import StarsCanvas from '@/components/Global/StarCanvas';
import FuturisticDivider from '@/components/Global/FuturisticLine';

// --- THEME-ALIGNED FONT IMPORTS ---
import localFont from 'next/font/local';
import { Oxanium, Rajdhani } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: '600', subsets: ['latin'] });
const RajdhaniFont = Rajdhani({ weight: '700', subsets: ['latin'] });

const videoSources = [
    '/ReelsAssets/Bootcamp 3 seconds.mp4',      // Project 01
    '/ReelsAssets/Damires 3 seconds.mp4',     // Project 02
    '/ReelsAssets/Home Credit 3 seconder.mp4',      // Project 03
    '/ReelsAssets/IAP 3 seconds.mp4',      // Project 04
    '/ReelsAssets/More Power 3 seconds.mp4',     // Project 05
    '/ReelsAssets/Nike 3 Seconds.mp4',      // Project 06
];


// --- MOBILE CARD COMPONENT ---
const MobileCard = ({ work, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = React.useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full max-w-md mx-auto"
        >
            <Link href="/works" className="block">
                <motion.div
                    className="group/card w-full h-[320px] sm:h-[360px] rounded-2xl overflow-hidden relative bg-slate-900 cursor-pointer"
                    style={{
                        border: isHovered ? '2px solid rgba(150, 137, 95, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isHovered
                            ? '0px 25px 50px -12px rgba(150, 137, 95, 0.5), 0 0 60px rgba(150, 137, 95, 0.3)'
                            : '0px 10px 20px -5px rgba(0, 0, 0, 0.5)',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    {/* Background Video */}
                    <video
                        ref={videoRef}
                        src={videoSources[work.originalIndex] || work.img}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                        style={{
                            opacity: isHovered ? 0.9 : 0.75,
                            transform: isHovered ? 'scale(1.1)' : 'scale(1.05)',
                        }}
                    />

                    {/* Gradient Overlays - Refined */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"></div>

                    {/* Golden glow overlay */}
                    {isHovered && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#96895F]/20 via-transparent to-[#96895F]/10 pointer-events-none" />
                    )}

                    {/* Content Container */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                        {/* Top Content - Project Titles */}
                        <div
                            className="relative z-10 transition-all duration-300 ease-out flex-shrink-0"
                            style={{ transform: isHovered ? 'translateY(-6px)' : 'translateY(0)' }}
                        >
                            <p
                                className={`text-xs uppercase font-semibold transition-all duration-300 ${OxaniumFont.className}`}
                                style={{
                                    color: isHovered ? '#D4AF37' : 'rgba(150, 137, 95, 0.7)',
                                    textShadow: isHovered ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none',
                                    letterSpacing: '0.15em',
                                }}
                            >
                                Project {String(work.originalIndex + 1).padStart(2, '0')}
                            </p>
                            <h3
                                className={`font-bold uppercase text-white mt-2.5 leading-tight ${RajdhaniFont.className}`}
                                style={{
                                    fontSize: work.title.length > 25 ? '1.25rem' : work.title.length > 18 ? '1.5rem' : '1.75rem',
                                    lineHeight: '1.2',
                                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                {work.title}
                            </h3>
                        </div>

                        {/* Bottom CTA - Refined */}
                        <div
                            className="relative z-10 transition-all duration-300 ease-out flex-shrink-0"
                            style={{ 
                                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                opacity: isHovered ? 1 : 0.7,
                            }}
                        >
                            <div
                                className="h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent mb-3 transition-all duration-400 ease-out"
                                style={{
                                    width: isHovered ? '100%' : '35%',
                                    opacity: isHovered ? 1 : 0.5,
                                    boxShadow: isHovered ? '0 0 8px rgba(212, 175, 55, 0.4)' : 'none',
                                }}
                            />

                            <div 
                                className={`flex items-center gap-x-2 text-sm transition-all duration-300 ease-out ${OxaniumFont.className}`}
                                style={{
                                    color: isHovered ? '#D4AF37' : 'rgba(150, 137, 95, 0.8)',
                                }}
                            >
                                <span className="font-bold tracking-wide">Explore Project</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 transition-transform duration-300"
                                    style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
                                >
                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Corner accents - Enhanced */}
                    {isHovered && (
                        <>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/25 to-transparent rounded-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent rounded-2xl pointer-events-none" />
                        </>
                    )}
                </motion.div>
            </Link>
        </motion.div>
    );
};

// --- ORBITAL CARD COMPONENT (DESKTOP) ---
const OrbitalCard = ({ work, index, totalCards, animationProgress, verticalOffset, radius, onHover, isHovered, isAnotherCardHovered }) => {
    const videoRef = React.useRef(null);
    
    const angle = (index / totalCards) * 360;
    const currentAngle = useTransform(animationProgress, (latest) => angle + latest);

    const x = useTransform(currentAngle, (a) => radius * Math.cos(a * (Math.PI / 180)));
    const z = useTransform(currentAngle, (a) => radius * Math.sin(a * (Math.PI / 180)));
    const rotateY = useTransform(x, [-radius, 0, radius], [45, 0, -45], { clamp: false });

    const baseScale = useTransform(z, [-radius, 0, radius], [0.75, 1, 0.75]);
    const baseOpacity = useTransform(z, [-radius, 0, radius], [0.5, 0.8, 1]);
    const baseZIndex = useTransform(z, [-radius, radius], [1, totalCards + 1]);

    const scale = useSpring(baseScale, { stiffness: 200, damping: 20 });
    const opacity = useSpring(baseOpacity, { stiffness: 200, damping: 20 });
    const zIndex = useSpring(baseZIndex, { stiffness: 300, damping: 25 });

    React.useEffect(() => {
        if (isHovered) {
            scale.set(1.2);
            zIndex.set(999);
            // Ensure video is playing when hovered
            if (videoRef.current) {
                videoRef.current.play().catch(() => {});
            }
        } else {
            scale.set(baseScale);
            zIndex.set(baseZIndex);
        }
    }, [isHovered, baseScale, baseZIndex, scale, zIndex]);

    React.useEffect(() => {
        if (isAnotherCardHovered && !isHovered) {
            // Only dim non-hovered cards
            opacity.set(0.25);
            // Pause video when another card is hovered
            if (videoRef.current) {
                videoRef.current.pause();
            }
        } else {
            opacity.set(baseOpacity);
            // Resume video playback
            if (videoRef.current) {
                videoRef.current.play().catch(() => {
                    // Ignore play errors (can happen if user hasn't interacted yet)
                });
            }
        }
    }, [isAnotherCardHovered, isHovered, baseOpacity, opacity]);

    return (
        <motion.div
            className="absolute will-change-transform"
            style={{
                x,
                y: verticalOffset,
                z,
                scale,
                opacity,
                zIndex,
                rotateY,
                top: '50%',
                left: '50%',
                marginTop: '-140px',  // Adjusted for larger cards
                marginLeft: '-245px', // Adjusted for larger cards
                transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            <Link href="/works" className="block w-[490px] h-[280px] cursor-pointer">
                <motion.div
                    className="group/card w-full h-full rounded-2xl overflow-hidden relative bg-slate-900 transform-gpu"
                    style={{
                        border: isHovered ? '2px solid rgba(212, 175, 55, 0.9)' : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isHovered
                            ? '0px 30px 60px -15px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.4)'
                            : '0px 10px 20px -5px rgba(0, 0, 0, 0.5)',
                        // Only apply blur and brightness reduction to non-hovered cards when another is hovered
                        filter: (isAnotherCardHovered && !isHovered) ? 'blur(2px) brightness(0.7)' : 'none',
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    {/* Background Video - Much More Visible */}
                    <video
                        ref={videoRef}
                        src={videoSources[work.originalIndex] || work.img}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out"
                        style={{
                            opacity: isHovered ? 0.9 : 0.75,
                            transform: isHovered ? 'scale(1.12)' : 'scale(1.06)',
                        }}
                    />

                    {/* Gradient Overlays - Much Lighter */}
                    <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none transition-all duration-300"
                        style={{
                            // Only reduce opacity for non-hovered cards when another is hovered
                            opacity: (isAnotherCardHovered && !isHovered) ? 0.4 : 1,
                        }}
                    ></div>
                    
                    {/* Additional dark overlay when another card is hovered (but not this one) */}
                    {isAnotherCardHovered && !isHovered && (
                        <div className="absolute inset-0 bg-black/50 pointer-events-none transition-opacity duration-300"></div>
                    )}

                    {/* Golden glow overlay - Enhanced */}
                    {isHovered && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10 pointer-events-none" />
                    )}

                    {/* Content Container */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                        {/* Top Content - Project Titles */}
                        <div
                            className="relative z-10 transition-all duration-300 ease-out flex-shrink-0"
                            style={{ 
                                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                                opacity: isHovered ? 1 : 0.8
                            }}
                        >
                            <p
                                className={`text-xs uppercase font-semibold transition-all duration-300 ${OxaniumFont.className}`}
                                style={{
                                    color: isHovered ? '#D4AF37' : 'rgba(150, 137, 95, 0.6)',
                                    textShadow: isHovered ? '0 0 12px rgba(212, 175, 55, 0.6)' : 'none',
                                    letterSpacing: '0.15em',
                                }}
                            >
                                Project {String(work.originalIndex + 1).padStart(2, '0')}
                            </p>
                            <h3
                                className={`font-bold uppercase text-white mt-2 leading-tight ${RajdhaniFont.className}`}
                                style={{
                                    fontSize: work.title.length > 25 ? '1.25rem' : work.title.length > 18 ? '1.5rem' : '1.75rem',
                                    lineHeight: '1.15',
                                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                {work.title}
                            </h3>
                        </div>

                        {/* Bottom CTA - Refined */}
                        <div
                            className="relative z-10 transition-all duration-300 ease-out flex-shrink-0"
                            style={{ 
                                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                                opacity: isHovered ? 1 : 0
                            }}
                        >
                            <div
                                className="h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent mb-3 transition-all duration-400 ease-out"
                                style={{
                                    width: isHovered ? '100%' : '35%',
                                    opacity: isHovered ? 1 : 0.4,
                                    boxShadow: isHovered ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none',
                                }}
                            />

                            <div
                                className={`flex items-center gap-x-2.5 text-sm transition-all duration-300 ease-out ${OxaniumFont.className}`}
                                style={{
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                                    color: '#D4AF37',
                                }}
                            >
                                <span className="font-bold tracking-wide">Explore Project</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 transition-transform duration-300"
                                    style={{ transform: isHovered ? 'translateX(5px)' : 'translateX(0)' }}
                                >
                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Corner accents - Enhanced */}
                    {isHovered && (
                        <>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/30 to-transparent rounded-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#D4AF37]/25 to-transparent rounded-2xl pointer-events-none" />
                        </>
                    )}
                </motion.div>
            </Link>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
const FeaturedWorksGrid = () => {
    const [hoveredCard, setHoveredCard] = React.useState(null);
    const [isMobile, setIsMobile] = React.useState(false);

    // Detect mobile viewport
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const indexedWorks = allWorksData.map((work, index) => ({ ...work, originalIndex: index }));
    const topRowWorks = indexedWorks.slice(0, 3);
    const bottomRowWorks = indexedWorks.slice(3, 6);

    const rotationProgressTop = useMotionValue(0);
    const rotationProgressBottom = useMotionValue(0);

    React.useEffect(() => {
        if (isMobile) return; // Don't run orbital animation on mobile

        let animationTop;
        let animationBottom;

        if (!hoveredCard) {
            animationTop = animate(rotationProgressTop, rotationProgressTop.get() + 360, {
                duration: 80,
                repeat: Infinity,
                repeatType: "loop",
                ease: 'linear'
            });
            animationBottom = animate(rotationProgressBottom, rotationProgressBottom.get() - 360, {
                duration: 80,
                repeat: Infinity,
                repeatType: "loop",
                ease: 'linear'
            });
        }

        return () => {
            if (animationTop) animationTop.stop();
            if (animationBottom) animationBottom.stop();
        };
    }, [hoveredCard, rotationProgressTop, rotationProgressBottom, isMobile]);

    return (
        <motion.section
            className='w-full flex flex-col justify-center py-16 sm:py-24 md:py-36 lg:py-48 relative overflow-hidden'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
        >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Header */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 text-center mb-12 md:mb-20">
                <h2 className={`font-black text-2xl sm:text-3xl md:text-5xl ${MoonlanderFont.className}`}>
                    <span className="text-[#f5f5f5]">Our </span>
                    <span className="text-prOrange">Featured Works</span>
                </h2>

                <FuturisticDivider color="#96895f" />

                {/* Bigger, polished description text */}
                <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/85 mt-6 max-w-4xl mx-auto ${RajdhaniFont.className}`}
                   style={{ 
                       letterSpacing: '0.06em',
                       lineHeight: '1.5',
                       fontWeight: '500'
                   }}>
                    {isMobile ? (
                        <>An interactive showcase of our creative and technical projects.</>
                    ) : (
                        <>An interactive showcase of our creative and technical projects in orbit.</>
                    )}
                </p>
            </div>

            {/* Conditional Rendering: Mobile Grid or Desktop Orbital */}
            {isMobile ? (
                // Mobile: Vertical scrolling grid
                <div className="relative z-20 w-full px-4 space-y-6 sm:space-y-8">
                    {indexedWorks.map((work, index) => (
                        <MobileCard key={work.originalIndex} work={work} index={index} />
                    ))}
                </div>
            ) : (
                // Desktop: Orbital animation with larger magnified cards
                <div className="relative z-20 w-full h-[75vh] min-h-[750px] flex items-center justify-center">
                    <div className="relative w-full h-full" style={{ perspective: '2000px' }}>
                        {topRowWorks.map((work, i) => (
                            <OrbitalCard
                                key={`top-${work.originalIndex}`}
                                work={work}
                                index={i}
                                totalCards={topRowWorks.length}
                                animationProgress={rotationProgressTop}
                                verticalOffset={-130}
                                radius={450}
                                onHover={(isHovering) => setHoveredCard(isHovering ? `top-${work.originalIndex}` : null)}
                                isHovered={hoveredCard === `top-${work.originalIndex}`}
                                isAnotherCardHovered={hoveredCard !== null && hoveredCard !== `top-${work.originalIndex}`}
                            />
                        ))}
                        {bottomRowWorks.map((work, i) => (
                            <OrbitalCard
                                key={`bottom-${work.originalIndex}`}
                                work={work}
                                index={i}
                                totalCards={bottomRowWorks.length}
                                animationProgress={rotationProgressBottom}
                                verticalOffset={130}
                                radius={450}
                                onHover={(isHovering) => setHoveredCard(isHovering ? `bottom-${work.originalIndex}` : null)}
                                isHovered={hoveredCard === `bottom-${work.originalIndex}`}
                                isAnotherCardHovered={hoveredCard !== null && hoveredCard !== `bottom-${work.originalIndex}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </motion.section>
    );
};

export default FeaturedWorksGrid;