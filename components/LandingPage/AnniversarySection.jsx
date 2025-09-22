"use client";

import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';

import AnniversaryContact from './AnniversaryContact';
import StarsCanvas from '@/components/Global/StarCanvas';
import { Meteors } from "@/components/Global/Meteor";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const stats = [
    { value: 1, label: 'Mission' },
    { value: 10, label: 'Awards' },
    { value: 3, label: 'Island Groups' },
    { value: 50, label: 'Troopers' },
    { value: 60, label: 'Brands' },
];

/**
 * AnimatedNumber Component - No changes needed, it's perfect.
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
        <section className="relative bg-black text-white py-28 sm:py-40 overflow-hidden [background-image:radial-gradient(ellipse_at_center,rgba(150,135,90,0.1),transparent_60%)]">
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <motion.h1
                    className={`${MoonlanderFont.className} text-4xl md:text-6xl font-bold tracking-tight uppercase text-[#A89773] [text-shadow:0_0_15px_rgba(168,151,115,0.3)]`}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    We&apos;re Only Getting Started.
                </motion.h1>

                {/* --- REFINED STATS CONTAINER --- */}
                <motion.div
                    className="mt-24 flex flex-wrap justify-center items-center gap-y-12 lg:gap-x-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {stats.map((stat, index) => (
                        <React.Fragment key={index}>
                            {/* --- THE NEW "GLASS" STAT POD --- */}
                            <motion.div
                                className="relative group flex flex-col items-center justify-center 
                                    w-48 h-48 p-4
                                    bg-slate-900/40 backdrop-blur-md
                                    border border-slate-800 rounded-2xl
                                    transform-gpu transition-all duration-300 ease-in-out
                                    hover:-translate-y-2 hover:border-prOrange/50
                                    hover:shadow-2xl hover:shadow-prOrange/10
                                "
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                {/* Meteor background */}
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <Meteors number={3} />
                                </div>
                                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                    <div className="font-sans text-6xl md:text-7xl font-semibold tracking-tight text-[#A89773] [text-shadow:0_0_20px_rgba(168,151,115,0.4)]">
                                        <AnimatedNumber to={stat.value} />
                                    </div>
                                    <p className="mt-2 text-sm md:text-base leading-6 text-slate-400">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>

                            {/* --- ELEGANT SEPARATOR LINE (for large screens) --- */}
                            {index < stats.length - 1 && (
                                <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-28 flex justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <AnniversaryContact />
                </motion.div>
            </div>
        </section>
    );
};

export default AnniversarySection;