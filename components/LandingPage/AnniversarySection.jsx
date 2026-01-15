"use client";

import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';

import AnniversaryContact from './AnniversaryContact';
import StarsCanvas from '@/components/Global/StarCanvas';
import FuturisticDivider from '@/components/Global/FuturisticLine';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const stats = [
    { value: 1, label: 'Mission', icon: '◆', description: 'Unified vision' },
    { value: 10, label: 'Awards', icon: '✦', description: 'Industry recognition' },
    { value: 3, label: 'Island Groups', icon: '◈', description: 'Regional presence' },
    { value: 50, label: 'Troopers', icon: '◉', description: 'Expert team' },
    { value: 60, label: 'Brands', icon: '✧', description: 'Trusted partners' },
];

/**
 * AnimatedNumber Component - Enhanced
 */
function AnimatedNumber({ to, suffix = '' }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, {
                type: "spring",
                duration: 2.5,
                bounce: 0.2,
            });
            return controls.stop;
        }
    }, [inView, to, count]);

    useEffect(() => {
        const unsubscribe = rounded.on('change', (latest) => {
            setDisplayValue(latest);
        });
        return () => unsubscribe();
    }, [rounded]);

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue}{suffix}
        </span>
    );
}

/**
 * Enhanced Stat Card Component
 */
const StatCard = ({ stat, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 0.7, 
                delay: index * 0.1, 
                ease: [0.22, 1, 0.36, 1],
                scale: { type: "spring", stiffness: 200 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            {/* Outer glow on hover */}
            <motion.div
                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(circle, rgba(150, 137, 95, 0.15) 0%, transparent 70%)',
                }}
            />

            {/* Card Container */}
            <motion.div
                className="relative p-6 md:p-7 rounded-2xl overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))',
                    border: isHovered ? '2px solid rgba(150, 137, 95, 0.5)' : '2px solid rgba(150, 137, 95, 0.2)',
                    boxShadow: isHovered 
                        ? '0 20px 60px -10px rgba(150, 137, 95, 0.3), inset 0 1px 0 rgba(150, 137, 95, 0.2)'
                        : '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Animated gradient overlay */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                        background: 'linear-gradient(135deg, rgba(150, 137, 95, 0.1), transparent 50%)',
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* Shimmer effect */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(150, 137, 95, 0.3) 50%, transparent 100%)',
                        }}
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                )}

                {/* Corner accents - Enhanced */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#96895F]/50 rounded-tl-lg transition-all duration-300 group-hover:border-[#B8A76F] group-hover:w-6 group-hover:h-6" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#96895F]/50 rounded-tr-lg transition-all duration-300 group-hover:border-[#B8A76F] group-hover:w-6 group-hover:h-6" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#96895F]/50 rounded-bl-lg transition-all duration-300 group-hover:border-[#B8A76F] group-hover:w-6 group-hover:h-6" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#96895F]/50 rounded-br-lg transition-all duration-300 group-hover:border-[#B8A76F] group-hover:w-6 group-hover:h-6" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[180px] md:min-h-[200px]">
                    {/* Icon with pulse animation */}
                    <motion.div
                        className="relative mb-4"
                        animate={isHovered ? {
                            rotate: [0, 10, -10, 0],
                        } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#96895F]/20 blur-xl"
                            animate={isHovered ? {
                                scale: [1, 1.4, 1],
                                opacity: [0.2, 0.4, 0.2],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="relative text-4xl md:text-5xl text-[#96895F] group-hover:text-[#B8A76F] transition-colors duration-300">
                            {stat.icon}
                        </span>
                    </motion.div>

                    {/* Number - Larger and bolder */}
                    <div
                        className={`${MoonlanderFont.className} text-6xl md:text-7xl font-black tracking-tighter mb-3`}
                        style={{
                            color: isHovered ? '#B8A76F' : '#96895F',
                            textShadow: isHovered 
                                ? '0 0 30px rgba(150, 137, 95, 0.5), 0 0 60px rgba(150, 137, 95, 0.2)' 
                                : '0 4px 20px rgba(0, 0, 0, 0.5)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <AnimatedNumber to={stat.value} suffix={stat.value === 60 ? '+' : ''} />
                    </div>

                    {/* Divider - Animated */}
                    <motion.div
                        className="relative w-full max-w-[100px] h-[2px] mb-3 overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#96895F] to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: isHovered ? '100%' : '0%' }}
                            transition={{ duration: isHovered ? 1 : 0.5, repeat: isHovered ? Infinity : 0 }}
                        />
                    </motion.div>

                    {/* Label - Enhanced typography */}
                    <p className={`${MoonlanderFont.className} text-sm md:text-base font-bold uppercase tracking-wider text-white/90 text-center mb-1 group-hover:text-white transition-colors duration-300`}>
                        {stat.label}
                    </p>

                    {/* Description - New addition */}
                    <motion.p
                        className="text-xs text-white/50 text-center group-hover:text-white/70 transition-colors duration-300"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                            opacity: isHovered ? 1 : 0, 
                            height: isHovered ? 'auto' : 0 
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {stat.description}
                    </motion.p>
                </div>

                {/* Floating particles - More dynamic */}
                {isHovered && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-[#96895F]"
                                style={{
                                    top: `${20 + i * 20}%`,
                                    right: `${10 + i * 5}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{ 
                                    duration: 2 + i * 0.5, 
                                    repeat: Infinity,
                                    delay: i * 0.3
                                }}
                            />
                        ))}
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

/**
 * Main Anniversary Section - Modernized
 */
const AnniversarySection = () => {
    return (
        <section className="relative bg-black text-white py-24 sm:py-32 md:py-40 overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                
                {/* Radial gradient overlays */}
                <div className="absolute inset-0" style={{ 
                    background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(150, 137, 95, 0.08) 0%, transparent 70%)" 
                }} />
                <div className="absolute inset-0" style={{ 
                    background: "radial-gradient(circle at 80% 20%, rgba(150, 137, 95, 0.06) 0%, transparent 50%)" 
                }} />
                <div className="absolute inset-0" style={{ 
                    background: "radial-gradient(circle at 20% 80%, rgba(150, 137, 95, 0.06) 0%, transparent 50%)" 
                }} />

                {/* Animated orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-[#96895F]/10 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.08, 0.15, 0.08],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#B8A76F]/8 rounded-full blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.06, 0.12, 0.06],
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(150, 137, 95, 0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(150, 137, 95, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>
            
            {/* Dark overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

            {/* Main Content */}
            <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 items-center">

                    {/* LEFT COLUMN: Title & Stats */}
                    <motion.div
                        className="flex flex-col items-center lg:items-start"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Title Section - Enhanced */}
                        <div className="text-center lg:text-left mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mb-4"
                            >
                                <h2 className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl tracking-tight uppercase leading-tight`}>
                                    <span className="text-[#f5f5f5]">We&apos;re Only</span>
                                    <br />
                                    <motion.span 
                                        className="text-prOrange inline-block"
                                        style={{
                                            textShadow: '0 0 40px rgba(150, 137, 95, 0.3)',
                                        }}
                                    >
                                        Getting Started
                                    </motion.span>
                                </h2>
                            </motion.div>

                            {/* Futuristic Divider */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex justify-center lg:justify-start"
                            >
                                <FuturisticDivider color="#96895F" />
                            </motion.div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className={`${MoonlanderFont.className} text-base sm:text-lg md:text-xl text-white/70 mt-6 max-w-xl mx-auto lg:mx-0`}
                            >
                                A journey of innovation, creativity, and excellence across the islands
                            </motion.p>
                        </div>

                        {/* Stats Grid - Optimized layout */}
                        <div className="w-full">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                                {stats.slice(0, 3).map((stat, index) => (
                                    <StatCard key={index} stat={stat} index={index} />
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5 max-w-[calc(66.666%-0.625rem)] lg:max-w-none">
                                {stats.slice(3).map((stat, index) => (
                                    <StatCard key={index + 3} stat={stat} index={index + 3} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Contact/CTA */}
                    <motion.div
                        className="flex justify-center items-center lg:justify-end"
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ 
                            duration: 1, 
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.3 
                        }}
                    >
                        <div className="relative">
                            {/* Glow effect behind contact component */}
                            <motion.div
                                className="absolute inset-0 bg-[#96895F]/20 rounded-full blur-[100px] -z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.3, 0.2],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <AnniversaryContact />
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#96895F]/30 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
            />
        </section>
    );
};

export default AnniversarySection;