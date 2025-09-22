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

// --- ORBITAL CARD COMPONENT ---
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
    const zIndex = useTransform(z, [-radius, radius], [1, totalCards + 1]);

    // --- FIX: Use useSpring for robust, smooth transitions ---
    // This hook smoothly animates to the target value, whether it's a static number or another MotionValue.
    // This avoids the TypeError by letting Framer Motion manage the value type changes.
    const scale = useSpring(isHovered ? 1.1 : baseScale, { stiffness: 400, damping: 30 });
    const opacity = useSpring(isAnotherCardHovered ? 0.4 : baseOpacity, { stiffness: 400, damping: 30 });

    return (
        <motion.div
            className="absolute"
            style={{
                x, y: verticalOffset, z, scale, opacity, zIndex, rotateY,
                top: '50%', left: '50%',
                marginTop: '-118px', marginLeft: '-210px',
                transformStyle: "preserve-3d",
            }}
            onHoverStart={() => onHover(true)}
            onHoverEnd={() => onHover(false)}
        >
            <Link href={`/works/subpage?index=${work.originalIndex}`} className="block w-[420px] h-[236px]">
                <motion.div
                    whileHover={{ y: -10, boxShadow: '0px 20px 40px -10px rgba(150, 137, 95, 0.2)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="
                        group/card w-full h-full rounded-2xl overflow-hidden
                        border border-white/10 bg-slate-900 transform-gpu p-6
                        flex flex-col justify-between
                    "
                >
                    <img
                        src={work.img} alt={work.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-25 transition-all duration-500 ease-in-out group-hover/card:opacity-60 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="relative z-10">
                        <p className={`text-xs uppercase tracking-widest text-prOrange ${OxaniumFont.className}`}>
                            Project 0{work.originalIndex + 1}
                        </p>
                        <h3 className={`text-3xl font-bold uppercase text-white mt-2 leading-tight ${MoonlanderFont.className}`}>
                            {work.title}
                        </h3>
                    </div>

                    <div className="relative z-10">
                        <div className={`
                            flex items-center gap-x-2 text-sm text-slate-300
                            opacity-0 transition-all duration-300 ease-in-out
                            translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0
                        `}>
                            <span>View Project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover/card:translate-x-1">
                                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};


// --- MAIN, POLISHED COMPONENT ---
const FeaturedWorksGrid = () => {
    const [hoveredCard, setHoveredCard] = React.useState(null);

    const indexedWorks = allWorksData.map((work, index) => ({ ...work, originalIndex: index }));
    const topRowWorks = indexedWorks.slice(0, 4);
    const bottomRowWorks = indexedWorks.slice(4, 8);

    const rotationProgressTop = useMotionValue(0);
    const rotationProgressBottom = useMotionValue(0);

    // --- FIX: Simplified and more robust animation control ---
    React.useEffect(() => {
        const startAnimation = () => {
            animate(rotationProgressTop, 360, { duration: 80, repeat: Infinity, ease: 'linear' });
            animate(rotationProgressBottom, -360, { duration: 80, repeat: Infinity, ease: 'linear' });
        };

        const stopAnimation = () => {
            rotationProgressTop.stop();
            rotationProgressBottom.stop();
        };

        if (hoveredCard) {
            stopAnimation();
        } else {
            startAnimation();
        }

        // Cleanup animations on component unmount
        return () => {
            stopAnimation();
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
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                <div className="absolute inset-0 bg-black/70"></div>
            </div>
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 text-center mb-20">
                <h2 className={`text-5xl md:text-6xl font-bold text-white ${MoonlanderFont.className}`}>
                    Our <span className="text-prOrange">Featured Works</span>
                </h2>
                <p className={`text-lg text-white/70 mt-4 max-w-2xl mx-auto ${OxaniumFont.className}`}>
                    An interactive showcase of our creative and technical projects in orbit.
                </p>
            </div>
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