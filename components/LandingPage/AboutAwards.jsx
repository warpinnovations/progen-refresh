"use client";

import { AnimatePresence, motion } from 'framer-motion';
import localFont from 'next/font/local';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import StarsCanvas from '../Global/StarCanvas';
import AboutAwardSection from '../About/AboutAwardSection';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const awarditems = [
    { id: 8, title: 'MARKETING LEADER OF THE YEAR', category: 'LCID CRESCENT FERNANDEZ', awardimg: '/LandingPageAssets/awards/medal.png' },
    { id: 1, title: 'FINALIST', category: 'BEST EXPERIMENTAL CAMPAIGN', awardimg: '/LandingPageAssets/awards/pr-awards-2025.png' },
    { id: 2, title: 'SILVER AWARD', category: 'EXCELLENCE IN URBAN GUERRILLA MARKETING', awardimg: '/LandingPageAssets/awards/medal.png' },
    { id: 5, title: 'SILVER ANVIL', category: 'PR TOOLS - SPECIAL EVENTS', awardimg: '/LandingPageAssets/awards/anvil-awards.png' },
];

const slideVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const AboutAwards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % awarditems.length);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000);
        return () => clearInterval(intervalId);
    }, [nextSlide]);

    const currentAward = useMemo(() => awarditems[currentIndex], [currentIndex]);

    return (
        // THE CHANGE IS HERE: Reduced vertical padding
        // from "pt-8 pb-16 sm:pb-24" to "pt-0 pb-12"
        <section className="relative text-white pt-0 pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/LandingPageAssets/galaxybg.webp"
                    alt="Galaxy background"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
                <StarsCanvas hidden={true} />
            </div>

            <div className="relative z-10 mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

                    {/* Left Column: Awards Carousel */}
                    <div className="text-center lg:text-left">
                        <h2 className={`${MoonlanderFont.className} text-4xl md:text-5xl text-[#96875A] mb-4`}>
                            Our Accolades
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                            We pride ourselves on delivering campaigns that not only meet but exceed expectations, earning recognition from the industry&apos;s most prestigious bodies.
                        </p>

                        <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden rounded-lg bg-[#0D0D1A]/80 p-8 border border-[#96875A]/20">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={currentIndex}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="w-full h-full flex flex-col items-center justify-center text-center"
                                >
                                    <div className="w-24 h-24 mb-6">
                                        <Image
                                            src={currentAward.awardimg}
                                            alt={currentAward.title}
                                            height={150}
                                            width={150}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <h3 className="text-xl md:text-2xl text-white font-bold tracking-wider uppercase">
                                        {currentAward.title}
                                    </h3>
                                    <p className="text-md md:text-lg text-[#96875A] font-semibold mt-1">
                                        {currentAward.category}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: AboutAwardSection - Give it more space */}
                    <div className="w-full">
                        <AboutAwardSection />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutAwards;