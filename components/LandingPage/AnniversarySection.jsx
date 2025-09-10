"use client";

import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';

import AnniversaryContact from './AnniversaryContact';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const stats = [
    { value: 1, label: 'Mission' },
    { value: 10, label: 'Awards' },
    { value: 3, label: 'Island Groups' },
    { value: 50, label: 'Troopers' },
    { value: 60, label: 'Brands' },
];

/**
 * Animated Number Component
 * It uses the `useInView` hook to trigger the animation only when the component
 * is visible on the user's screen.
 */
function AnimatedNumber({ to }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    // This ref will be attached to the h2 element to track its visibility.
    const ref = useRef(null);

    // This hook is the magic. `inView` is true only when `ref` is on screen.
    const inView = useInView(ref, { once: true, margin: "-100px" });

    // This effect runs the animation, but ONLY when `inView` becomes true.
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

                <motion.div
                    className="mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="font-sans text-5xl md:text-7xl font-semibold tracking-tight text-[#A89773] [text-shadow:0_0_20px_rgba(168,151,115,0.4)]">
                                <AnimatedNumber to={stat.value} />
                            </div>

                            <p className="mt-3 text-sm md:text-base leading-6 opacity-70">
                                {stat.label}
                            </p>
                        </motion.div>
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