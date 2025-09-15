"use client";
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
import { Oxanium } from 'next/font/google';

// --- FONT DEFINITIONS ---
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: '400', subsets: ['latin'] });

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

function OurServices() {
    // --- SAFE CLIENT-SIDE CHECK FOR MOBILE ---
    // This prevents the "window is not defined" error during server-side rendering
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 500);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2, // Lowered threshold to trigger animation sooner
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Stagger the animation of direct children (the quote and the services grid)
                staggerChildren: 0.4,
            }
        }
    };

    const quoteVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut",
            }
        }
    };

    const servicesGridVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                delayChildren: isMobile ? 0.5 : 0.2,
                staggerChildren: 0.15
            }
        }
    };

    return (
        <div
            ref={ref}
            className='w-full flex flex-col justify-center items-center gap-16 md:gap-24 py-24 md:py-40 bg-cover bg-no-repeat bg-center'
            style={{ backgroundImage: "url('/LandingPageAssets/servicesbg.png')" }}
        >
            <motion.div
                className="w-full flex flex-col justify-center items-center gap-16 md:gap-24"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {/* --- NEW QUOTE SECTION --- */}
                <motion.div
                    className='w-4/5 md:w-3/5 z-10'
                    variants={quoteVariants}
                >
                    <h1 className={`text-xl md:text-4xl ${OxaniumFont.className} text-white text-center`}>
                        To forever chase excellence with curiosity as our guide.
                    </h1>
                </motion.div>

                {/* --- EXISTING "OUR SERVICES" SECTION --- */}
                <motion.div
                    className="relative grid grid-cols-1 md:grid-cols-2 justify-center items-center text-center z-10 w-full"
                    variants={servicesGridVariants}
                >
                    <div className="w-full flex justify-center pr-0 md:pr-5 md:justify-end lg:justify-center lg:pr-10">
                        <div className="flex flex-row md:flex-col mb-10 md:mb-0 gap-2 md:gap-4 w-fit justify-center md:justify-start">
                            <h1 className={`${MoonlanderFont.className} flex font-black justify-center text-md md:text-4xl lg:w-1/3 text-[#f5f5f5] md:justify-start lg:text-5xl`}>
                                OUR
                            </h1>
                            <h1 className={`${MoonlanderFont.className} flex font-black justify-center text-md md:text-4xl lg:w-1/3 text-prOrange md:justify-start lg:text-5xl`}>
                                SERVICES
                            </h1>
                        </div>
                    </div>
                    <div className={`${MoonlanderFont.className} text-md md:text-2xl lg:text-4xl text-white flex flex-col lg:gap-2`}>
                        {services.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex md:p-3 justify-center md:justify-start md:ml-5 mb-5 md:mb-0 transition-all duration-200 hover:text-prOrange hover:scale-105 hover:drop-shadow-[0_0_8px_#96895f]`}
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: "0%", transition: { type: "tween", duration: 0.3, ease: "easeInOut" } },
                                }}
                            >
                                <p className="text-center md:text-left ">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default OurServices;