"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { worksData } from '@/app/contants';
import CSSStars from '@/components/Global/CSSStars';
import FuturisticDivider from '@/components/Global/FuturisticLine';

import localFont from 'next/font/local';
import { Oxanium, Rajdhani } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: '600', subsets: ['latin'] });
const RajdhaniFont = Rajdhani({ weight: '700', subsets: ['latin'] });


// --- DESKTOP GRID CARD ---
const GridCard = ({ work, index, hoveredCard, setHoveredCard }) => {
    const isHovered = hoveredCard === work.originalIndex;
    const isAnyHovered = hoveredCard !== null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
        >
            <Link href={`/works/subpage?index=${work.originalIndex}`} className="block">
                <motion.div
                    className="relative w-full overflow-hidden rounded-2xl bg-black cursor-pointer"
                    onMouseEnter={() => setHoveredCard(work.originalIndex)}
                    onMouseLeave={() => setHoveredCard(null)}
                    animate={{
                        opacity: isAnyHovered && !isHovered ? 0.45 : 1,
                        scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                        aspectRatio: '16/9',
                        border: isHovered ? '1.5px solid rgba(212,175,55,0.7)' : '1px solid rgba(255,255,255,0.08)',
                        boxShadow: isHovered
                            ? '0 20px 60px -10px rgba(212,175,55,0.35), 0 0 40px rgba(212,175,55,0.15)'
                            : '0 4px 24px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Image */}
                    <Image
                        src={work.img}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out"
                        style={{ transform: isHovered ? 'scale(1.07)' : 'scale(1.0)' }}
                    />

                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Hover gold tint */}
                    {isHovered && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/12 via-transparent to-transparent pointer-events-none" />
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        {/* Top: index label */}
                        <p className={`${OxaniumFont.className} text-[10px] uppercase tracking-[0.2em] transition-colors duration-300`}
                            style={{ color: isHovered ? '#D4AF37' : 'rgba(150,137,95,0.55)' }}>
                            Project {String(work.originalIndex + 1).padStart(2, '0')}
                        </p>

                        {/* Bottom: title + CTA */}
                        <div>
                            {/* Gold divider line */}
                            <div
                                className="h-[1.5px] bg-gradient-to-r from-[#D4AF37] to-transparent mb-3 transition-all duration-400"
                                style={{ width: isHovered ? '60%' : '28%', opacity: isHovered ? 1 : 0.45 }}
                            />
                            <h3
                                className={`${RajdhaniFont.className} font-bold uppercase text-white leading-tight mb-2`}
                                style={{
                                    fontSize: work.title.length > 25 ? '1rem' : work.title.length > 18 ? '1.15rem' : '1.3rem',
                                    letterSpacing: '0.06em',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                                }}
                            >
                                {work.title}
                            </h3>

                            <div
                                className={`${OxaniumFont.className} flex items-center gap-2 text-xs font-bold tracking-wide transition-all duration-300`}
                                style={{
                                    color: '#D4AF37',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                                }}
                            >
                                <span>Explore</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"
                                    style={{ transform: isHovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s' }}>
                                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Corner accent on hover */}
                    {isHovered && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-2xl pointer-events-none" />
                    )}
                </motion.div>
            </Link>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
const FeaturedWorksGrid = () => {
    const [hoveredCard, setHoveredCard] = React.useState(null);

    const indexedWorks = worksData.slice(0, 6).map((work, index) => ({ ...work, originalIndex: index }));

    return (
        <motion.section
            className='w-full flex flex-col justify-center py-16 sm:py-20 md:py-24 relative overflow-hidden'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
        >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <CSSStars />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Header */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 text-center mb-10 md:mb-14">
                <h2 className={`font-black text-2xl sm:text-3xl md:text-5xl ${MoonlanderFont.className}`}>
                    <span className="text-[#f5f5f5]">Our </span>
                    <span className="text-prOrange">Featured Works</span>
                </h2>
                <FuturisticDivider color="#96895f" />
            </div>

            {/* Grid — mobile: 1 col, sm: 2 col, lg: 3 col */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {indexedWorks.map((work, index) => (
                        <GridCard
                            key={work.originalIndex}
                            work={work}
                            index={index}
                            hoveredCard={hoveredCard}
                            setHoveredCard={setHoveredCard}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FeaturedWorksGrid;