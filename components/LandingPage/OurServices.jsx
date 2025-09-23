"use client";
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
import StarsCanvas from '@/components/Global/StarCanvas';

// --- FONT DEFINITIONS ---
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

// --- DATA ---
const services = [
    'Branding',
    'Strategy',
    'Digital Marketing',
    'Creative',
    'Event Management',
    'Media',
    'Social Media',
    'Software Solutions',
    'Wedding Studio',
];

// --- CONFIGURATION ---
// Note: Aspect ratio and gap factor are no longer needed for the new layout.

// --- CIRCULAR TEXT COMPONENT (Now supports ellipse) ---
const CircularText = ({ text, radiusX, radiusY, duration, textColor = 'text-prOrange/70', direction = 1 }) => {
    const characters = text.split('');
    const centerX = radiusX;
    const centerY = radiusY;
    return (
        <div className="relative" style={{ width: radiusX * 2, height: radiusY * 2 }}>
            <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: 360 * direction }}
                transition={{ loop: Infinity, ease: "linear", duration: duration }}
            >
                {characters.map((char, index) => {
                    const angle = (index / characters.length) * 2 * Math.PI;
                    const x = centerX + radiusX * Math.cos(angle) - 0.5 * 16; // 16px = 1em approx
                    const y = centerY + radiusY * Math.sin(angle) - 0.5 * 24; // 24px = 1.5em approx
                    return (
                        <motion.span
                            key={index}
                            className={`absolute ${MoonlanderFont.className} text-lg md:text-xl ${textColor}`}
                            style={{
                                left: x,
                                top: y,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {char}
                        </motion.span>
                    );
                })}
            </motion.div>
        </div>
    );
};


// --- MAIN COMPONENT ---
function OurServices() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const [radii, setRadii] = useState({ primary: 450, secondary: 550 }); // MODIFIED: Radii are now static and secondary is larger
    const [animationKey, setAnimationKey] = useState(0);

    // --- RESPONSIVE RADII LOGIC ---
    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 768) {
                setRadii({ primary: 280, secondary: 350 }); // MODIFIED: Adjusted for mobile
            } else if (window.innerWidth < 1024) {
                setRadii({ primary: 380, secondary: 460 }); // MODIFIED: Adjusted for tablet
            } else {
                setRadii({ primary: 450, secondary: 550 }); // MODIFIED: Adjusted for desktop
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // --- FIX FOR ANIMATION PAUSING ON TAB OUT ---
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setAnimationKey(prevKey => prevKey + 1);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);


    // --- ANIMATION VARIANTS (Unchanged) ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.8 + i * 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.8 },
        }),
    };


    return (
        <section
            ref={ref}
            className='w-full flex justify-center items-center py-40 md:py-56 relative overflow-hidden min-h-screen'
        >
            {/* --- BACKGROUND ELEMENTS (Unchanged) --- */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.85) 100%)" }} />
                <motion.div
                    className="absolute inset-0 z-0"
                    animate={{
                        background: [
                            "radial-gradient(ellipse at 50% 50%, rgba(150, 137, 95, 0.08) 0%, rgba(150, 137, 95, 0) 70%)",
                            "radial-gradient(ellipse at 50% 50%, rgba(150, 137, 95, 0.12) 0%, rgba(150, 137, 95, 0) 70%)",
                            "radial-gradient(ellipse at 50% 50%, rgba(150, 137, 95, 0.08) 0%, rgba(150, 137, 95, 0) 70%)",
                        ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/30"></div>

            {/* --- MAIN CONTENT --- */}
            <motion.div
                className="relative z-20 flex flex-col justify-center items-center"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {/* --- CIRCULAR TEXT ANIMATION (BACKGROUND) --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    {/* MODIFIED: Secondary (Outer) Ellipse, moved right */}
                    <motion.div
                        className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 opacity-30"
                    >
                        <CircularText
                            key={animationKey + '_secondary'}
                            text=" / STRATEGY / BRANDING / CREATIVE / MARKETING / MEDIA / SOCIAL MEDIA / SOFTWARE / EVENTS"
                            radiusX={radii.secondary}
                            radiusY={Math.round(radii.secondary * 0.65)}
                            duration={30}
                            textColor="text-prOrange/60"
                            direction={-1}
                        />
                    </motion.div>
                    {/* MODIFIED: Primary (Inner) Ellipse */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
                        <CircularText
                            key={animationKey + '_primary'}
                            text=" / HOW CAN WE ASSIST YOU / HOW CAN WE ASSIST YOU / HOW CAN WE ASSIST YOU"
                            radiusX={radii.primary}
                            radiusY={Math.round(radii.primary * 0.65)}
                            duration={20}
                            direction={1}
                        />
                    </div>
                </div>

                {/* --- FOREGROUND CONTENT (Unchanged) --- */}
                <div className="relative z-30 flex flex-col items-center gap-10 md:gap-14">
                    <div className="flex flex-col items-center">
                        <div className="relative overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={inView ? { y: 0 } : { y: "100%" }}
                                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className={`${MoonlanderFont.className} font-black text-3xl md:text-5xl text-[#f5f5f5]`}
                            >
                                OUR
                            </motion.h1>
                        </div>
                        <div className="relative overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={inView ? { y: 0 } : { y: "100%" }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className={`${MoonlanderFont.className} font-black text-3xl md:text-5xl text-prOrange`}
                            >
                                SERVICES
                            </motion.h1>
                        </div>
                    </div>

                    <div className={`${MoonlanderFont.className} text-center flex flex-col gap-1 md:gap-2`}>
                        {services.map((service, index) => (
                            <motion.h2
                                key={index}
                                custom={index}
                                variants={itemVariants}
                                className="text-xl md:text-2xl lg:text-3xl text-white/90 hover:text-prOrange transition-colors duration-300 cursor-pointer mb-4 md:mb-6"
                            >
                                {service}
                            </motion.h2>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default OurServices;