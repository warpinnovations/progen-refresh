"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
import { worksData as allWorksData } from '@/app/contants';
import StarsCanvas from '@/components/Global/StarCanvas';

// --- THEME-ALIGNED FONT IMPORTS ---
import localFont from 'next/font/local';
import { Oxanium } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: '600', subsets: ['latin'] });

// --- ORBITAL CARD COMPONENT WITH OPTIMIZED SPOTLIGHT ---
const OrbitalCard = ({ work, index, totalCards, animationProgress, verticalOffset, radius, onHover, isHovered, isAnotherCardHovered }) => {
    const angle = (index / totalCards) * 360;
    const currentAngle = useTransform(animationProgress, (latest) => angle + latest);

    // Positional transforms
    const x = useTransform(currentAngle, (a) => radius * Math.cos(a * (Math.PI / 180)));
    const z = useTransform(currentAngle, (a) => radius * Math.sin(a * (Math.PI / 180)));
    const rotateY = useTransform(x, [-radius, 0, radius], [45, 0, -45], { clamp: false });

    // Base values derived from position
    const baseScale = useTransform(z, [-radius, 0, radius], [0.75, 1, 0.75]);
    const baseOpacity = useTransform(z, [-radius, 0, radius], [0.5, 0.8, 1]);
    const baseZIndex = useTransform(z, [-radius, radius], [1, totalCards + 1]);

    // Optimized hover state - only override when hovered, otherwise use base transforms
    const scale = useSpring(baseScale, { stiffness: 200, damping: 20 });
    const opacity = useSpring(baseOpacity, { stiffness: 200, damping: 20 });
    const zIndex = useSpring(baseZIndex, { stiffness: 300, damping: 25 });

    // Update spring targets when hover state changes
    React.useEffect(() => {
        if (isHovered) {
            scale.set(1.15);
            zIndex.set(999);
        } else {
            scale.set(baseScale);
            zIndex.set(baseZIndex);
        }
    }, [isHovered, baseScale, baseZIndex, scale, zIndex]);

    React.useEffect(() => {
        if (isAnotherCardHovered) {
            opacity.set(0.35);
        } else {
            opacity.set(baseOpacity);
        }
    }, [isAnotherCardHovered, baseOpacity, opacity]);

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
                marginTop: '-118px',
                marginLeft: '-210px',
                transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            <Link href={`/works/subpage?index=${work.originalIndex}`} className="block w-[420px] h-[236px]">
                <motion.div
                    className="group/card w-full h-full rounded-2xl overflow-hidden relative bg-slate-900 transform-gpu"
                    style={{
                        border: isHovered ? '1px solid rgba(150, 137, 95, 0.7)' : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isHovered
                            ? '0px 20px 40px -10px rgba(150, 137, 95, 0.4), 0 0 40px rgba(150, 137, 95, 0.2)'
                            : '0px 10px 20px -5px rgba(0, 0, 0, 0.5)',
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    {/* Background Image */}
                    <img
                        src={work.img}
                        alt={work.title}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out"
                        style={{
                            opacity: isHovered ? 0.6 : 0.25,
                            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        }}
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none"></div>

                    {/* Golden glow overlay - only render on hover */}
                    {isHovered && (
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-[#96895F]/20 via-transparent to-[#96895F]/10 pointer-events-none"
                        />
                    )}

                    {/* Content Container */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                        {/* Top Content */}
                        <div
                            className="relative z-10 transition-transform duration-200 ease-out flex-shrink-0"
                            style={{ transform: isHovered ? 'translateY(-4px)' : 'translateY(0)' }}
                        >
                            <p
                                className={`text-xs uppercase tracking-widest transition-all duration-200 ${OxaniumFont.className}`}
                                style={{
                                    color: isHovered ? '#96895F' : 'rgba(150, 137, 95, 0.8)',
                                    textShadow: isHovered ? '0 0 12px rgba(150, 137, 95, 0.6)' : 'none',
                                }}
                            >
                                Project 0{work.originalIndex + 1}
                            </p>
                            <h3
                                className={`font-bold uppercase text-white mt-2 leading-tight ${MoonlanderFont.className}`}
                                style={{
                                    fontSize: work.title.length > 25 ? '1.5rem' : work.title.length > 18 ? '1.75rem' : '1.875rem',
                                    lineHeight: work.title.length > 18 ? '1.2' : '1.25',
                                }}
                            >
                                {work.title}
                            </h3>
                        </div>

                        {/* Bottom CTA */}
                        <div
                            className="relative z-10 transition-transform duration-200 ease-out flex-shrink-0"
                            style={{ transform: isHovered ? 'translateY(-4px)' : 'translateY(0)' }}
                        >
                            <div
                                className="h-[2px] bg-gradient-to-r from-[#96895F] to-transparent mb-3 transition-all duration-300 ease-out"
                                style={{
                                    width: isHovered ? '100%' : '35%',
                                    opacity: isHovered ? 1 : 0.5,
                                }}
                            />

                            <div
                                className="flex items-center gap-x-2 text-sm text-slate-300 transition-all duration-200 ease-out"
                                style={{
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                                }}
                            >
                                <span className="font-semibold">View Project</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Corner accents - only on hover */}
                    {isHovered && (
                        <>
                            <div
                                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#96895F]/30 to-transparent rounded-2xl pointer-events-none"
                            />
                            <div
                                className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#96895F]/20 to-transparent rounded-2xl pointer-events-none"
                            />
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

    const indexedWorks = allWorksData.map((work, index) => ({ ...work, originalIndex: index }));
    const topRowWorks = indexedWorks.slice(0, 3);
    const bottomRowWorks = indexedWorks.slice(3, 6);

    const rotationProgressTop = useMotionValue(0);
    const rotationProgressBottom = useMotionValue(0);

    React.useEffect(() => {
        let animationTop;
        let animationBottom;

        if (!hoveredCard) {
            // Start animations when not hovering
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
            // Clean up animations
            if (animationTop) animationTop.stop();
            if (animationBottom) animationBottom.stop();
        };
    }, [hoveredCard, rotationProgressTop, rotationProgressBottom]);

    return (
        <motion.section
            className='w-full flex flex-col justify-center py-36 md:py-48 relative overflow-hidden'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
        >
            {/* Background - Your Original StarsCanvas */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Header */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 text-center mb-20">
                <h2 className={`font-black text-3xl md:text-5xl ${MoonlanderFont.className}`}>
                    <span className="text-[#f5f5f5]">Our </span>
                    <span className="text-prOrange">Featured Works</span>
                </h2>
                <p className={`text-lg md:text-xl text-white/70 mt-4 max-w-2xl mx-auto ${MoonlanderFont.className}`}>
                    An interactive showcase of our creative and technical projects in orbit.
                </p>
            </div>

            {/* Orbital Cards */}
            <div className="relative z-20 w-full h-[70vh] min-h-[700px] flex items-center justify-center">
                <div className="relative w-full h-full" style={{ perspective: '1800px' }}>
                    {topRowWorks.map((work, i) => (
                        <OrbitalCard
                            key={`top-${work.originalIndex}`}
                            work={work} index={i} totalCards={topRowWorks.length}
                            animationProgress={rotationProgressTop}
                            verticalOffset={-120}
                            radius={420}
                            onHover={(isHovering) => setHoveredCard(isHovering ? `top-${work.originalIndex}` : null)}
                            isHovered={hoveredCard === `top-${work.originalIndex}`}
                            isAnotherCardHovered={hoveredCard !== null && hoveredCard !== `top-${work.originalIndex}`}
                        />
                    ))}
                    {bottomRowWorks.map((work, i) => (
                        <OrbitalCard
                            key={`bottom-${work.originalIndex}`}
                            work={work} index={i} totalCards={bottomRowWorks.length}
                            animationProgress={rotationProgressBottom}
                            verticalOffset={120}
                            radius={420}
                            onHover={(isHovering) => setHoveredCard(isHovering ? `bottom-${work.originalIndex}` : null)}
                            isHovered={hoveredCard === `bottom-${work.originalIndex}`}
                            isAnotherCardHovered={hoveredCard !== null && hoveredCard !== `bottom-${work.originalIndex}`}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FeaturedWorksGrid;