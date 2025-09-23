"use client";

import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';

import AnniversaryContact from './AnniversaryContact'; // Assumed to be the planet component
import StarsCanvas from '@/components/Global/StarCanvas';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const prKhaki = '#A89773';

// --- MODIFIED: Restored all five original stats ---
const stats = [
    { value: 1, label: 'Mission' },
    { value: 10, label: 'Awards' },
    { value: 3, label: 'Island Groups' },
    { value: 50, label: 'Troopers' },
    { value: 60, label: 'Brands' },
];

/**
 * AnimatedNumber Component - No changes needed.
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

const AnniversarySection = () => {
    return (
        <section className="relative bg-black text-white py-28 sm:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.85) 100%)" }} />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/30"></div>

            {/* Main Content Grid */}
            <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20 items-center">

                    {/* --- LEFT COLUMN: Title & All Stats --- */}
                    <motion.div
                        className="flex flex-col items-center lg:items-start"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className={`${MoonlanderFont.className} font-black text-4xl md:text-5xl tracking-tight uppercase text-center lg:text-left`}>
                            <span className="text-[#f5f5f5]">We&apos;re Only</span>
                            <br />
                            <span style={{ color: prKhaki }}>Getting Started</span>
                        </h1>

                        {/* Stats Container - Now displays all stats in a clean, wrapping grid */}
                        <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-6 w-full max-w-xl">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="
                                        flex flex-col items-center justify-center
                                        w-48 h-48 p-6 rounded-3xl
                                        bg-[#11151c] transition-colors duration-300
                                    "
                                >
                                    <div
                                        className={`${MoonlanderFont.className} text-7xl font-black tracking-tight`}
                                        style={{ color: prKhaki }}
                                    >
                                        <AnimatedNumber to={stat.value} />
                                    </div>
                                    <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white/60">
                                        {stat.label}
                                    </p>
                                    <div className="w-10 h-px mt-3" style={{ background: prKhaki, opacity: 0.5 }} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- RIGHT COLUMN: Planet CTA --- */}
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