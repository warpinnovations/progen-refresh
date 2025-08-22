"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

import AnniversaryContact from './AnniversaryContact';
import StarsCanvas from "../Global/StarCanvas";

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const AnniversarySection = () => {
    return (
        <section className="relative pt-8 sm:pt-12 pb-24 overflow-hidden">

            <div className="absolute inset-0 z-0">
                <img
                    src="/LandingPageAssets/galaxybg.webp"
                    alt="Galaxy background"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
                <StarsCanvas hidden={true} />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`${MoonlanderFont.className} font-black text-4xl md:text-6xl text-[#96875A] mb-20 text-center tracking-wider`}
                >
                    {/* 6 Years of Service */}
                </motion.h1>

                {/* LAYOUT REWORK: Switched to Flexbox for better control (60/40 split) */}
                <div className="flex flex-col lg:flex-row items-center gap-x-10 gap-y-12">

                    {/* Left Column: BIGGER Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        // SUPERIOR FADE: Fades only the right side to blend with the contact card
                        className="[mask-image:radial-gradient(ellipse_at_center,white_50%,transparent_70%)]"
                    >
                        <Image
                            src="/6yearLogo.jpg"
                            alt="6 Year Anniversary Logo"
                            width={600}
                            height={600}
                            // BIGGER LOGO: Increased max-width for more impact
                            className="h-auto w-full max-w-2x2 mx-auto"
                        />
                    </motion.div>

                    {/* Right Column: Contact Component */}
                    <div className="w-full lg:w-2/5">
                        <AnniversaryContact />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnniversarySection;