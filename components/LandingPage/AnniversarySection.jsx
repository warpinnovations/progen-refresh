"use client";

import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';

import AnniversaryContact from './AnniversaryContact';
import StarsCanvas from '@/components/Global/StarCanvas';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const prKhaki = '#96895F';

const stats = [
    { value: 1, label: 'Mission', icon: '◆' },
    { value: 10, label: 'Awards', icon: '✦' },
    { value: 3, label: 'Island Groups', icon: '◈' },
    { value: 50, label: 'Troopers', icon: '◉' },
    { value: 60, label: 'Brands', icon: '✧' },
];

/**
 * AnimatedNumber Component
 */
function AnimatedNumber({ to }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

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

    return <motion.h2 ref={ref}>{rounded}</motion.h2>;
}

/**
 * Stat Card Component
 */
const StatCard = ({ stat, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            {/* Card Container */}
            <motion.div
                className="relative w-40 h-40 md:w-44 md:h-44 p-6 rounded-2xl bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm border-2 border-[#96895F]/30 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Animated border glow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, transparent, rgba(150, 137, 95, 0.4), transparent)',
                        backgroundSize: '200% 200%',
                    }}
                    animate={isHovered ? {
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Inner border */}
                <div className="absolute inset-[2px] rounded-2xl bg-black/70 backdrop-blur-sm" />

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#96895F]/60 rounded-tl-md" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#96895F]/60 rounded-tr-md" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#96895F]/60 rounded-bl-md" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#96895F]/60 rounded-br-md" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    {/* Icon */}
                    <motion.div
                        className="text-3xl mb-2 text-[#96895F]/80"
                        animate={isHovered ? {
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {stat.icon}
                    </motion.div>

                    {/* Number */}
                    <div
                        className={`${MoonlanderFont.className} text-5xl md:text-6xl font-black tracking-tight text-[#96895F] group-hover:text-[#B8A76F] transition-colors duration-300`}
                    >
                        <AnimatedNumber to={stat.value} />
                    </div>

                    {/* Divider */}
                    <motion.div
                        className="w-12 h-[1.5px] my-2 bg-gradient-to-r from-transparent via-[#96895F] to-transparent"
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? '100%' : '50%' }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Label */}
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70 text-center leading-tight group-hover:text-white/90 transition-colors duration-300">
                        {stat.label}
                    </p>
                </div>

                {/* Hover particles */}
                {isHovered && (
                    <>
                        <motion.div
                            className="absolute top-4 right-4 w-1 h-1 rounded-full bg-[#96895F]/60"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-[#96895F]/40"
                            animate={{
                                y: [0, 20, 0],
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

const AnniversarySection = () => {
    return (
        <section className="relative bg-black text-white py-28 sm:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.85) 100%)" }} />

                {/* Animated background glow */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#96895F]/8 rounded-full blur-[150px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.08, 0.12, 0.08],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#96895F]/6 rounded-full blur-[120px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.06, 0.1, 0.06],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/30"></div>

            {/* Main Content Grid */}
            <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20 items-center">

                    {/* LEFT COLUMN: Title & Stats */}
                    <motion.div
                        className="flex flex-col items-center lg:items-start"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Title */}
                        <div className="text-center lg:text-left mb-4">
                            <motion.h1
                                className={`${MoonlanderFont.className} font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-[#f5f5f5]">We&apos;re Only</span>
                                <br />
                                <span className="text-[#96895F]">Getting Started</span>
                            </motion.h1>

                            {/* Subtitle accent line */}
                            <motion.div
                                className="mt-4 mx-auto lg:mx-0 h-1 bg-gradient-to-r from-[#96895F] via-[#B8A76F] to-transparent rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: '60%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                            />
                        </div>

                        {/* Stats Grid - Compact and modern */}
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-2xl">
                            {stats.map((stat, index) => (
                                <StatCard key={index} stat={stat} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Planet CTA */}
                    <motion.div
                        className="flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <AnniversaryContact />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AnniversarySection;