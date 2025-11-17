"use client";
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
import StarsCanvas from '@/components/Global/StarCanvas';
import FuturisticDivider from '@/components/Global/FuturisticLine';

// --- FONT DEFINITIONS ---
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

// --- DATA ---
const services = [
    { name: 'Branding', icon: '✦', description: 'Crafting unique identities' },
    { name: 'Strategy', icon: '◈', description: 'Data-driven solutions' },
    { name: 'Digital Marketing', icon: '◆', description: 'Amplifying your reach' },
    { name: 'Creative', icon: '✧', description: 'Unleashing imagination' },
    { name: 'Event Management', icon: '◉', description: 'Memorable experiences' },
    { name: 'Media', icon: '◇', description: 'Powerful storytelling' },
    { name: 'Social Media', icon: '◈', description: 'Engaging communities' },
    { name: 'Software Solutions', icon: '◆', description: 'Tech innovation' },
    { name: 'Wedding Studio', icon: '✦', description: 'Capturing forever' },
];

// --- CIRCULAR TEXT COMPONENT ---
const CircularText = ({ text, radiusX, radiusY, duration, textColor = 'text-prOrange/70', direction = 1 }) => {
    const characters = text.split('');
    const centerX = radiusX;
    const centerY = radiusY;
    return (
        <div className="relative" style={{ width: radiusX * 2, height: radiusY * 2 }}>
            <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: 360 * direction }}
                transition={{ repeat: Infinity, repeatType: "loop", ease: "linear", duration: duration }}
            >
                {characters.map((char, index) => {
                    const angle = (index / characters.length) * 2 * Math.PI;
                    const x = centerX + radiusX * Math.cos(angle) - 0.5 * 16;
                    const y = centerY + radiusY * Math.sin(angle) - 0.5 * 24;
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

// --- SERVICE CARD COMPONENT ---
const ServiceCard = ({ service, index }) => {
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
                // --- FIX APPLIED HERE ---
                // Added `h-full` to make all cards in the same grid row have an equal height.
                className="relative h-full p-6 md:p-8 rounded-2xl border border-[#96895F]/20 bg-black/40 backdrop-blur-sm overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Animated border glow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        background: 'linear-gradient(45deg, transparent, rgba(150, 137, 95, 0.3), transparent)',
                        backgroundSize: '200% 200%',
                    }}
                    animate={isHovered ? {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Inner border */}
                <div className="absolute inset-[1px] rounded-2xl bg-black/60 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                        className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#96895F]/20 to-[#96895F]/5 border border-[#96895F]/30 flex items-center justify-center"
                        animate={isHovered ? {
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                        } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-2xl md:text-3xl text-[#96895F]">{service.icon}</span>
                    </motion.div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className={`${MoonlanderFont.className} text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#96895F] transition-colors duration-300`}>
                            {service.name}
                        </h3>

                        {/* Animated underline */}
                        <motion.div
                            className="h-[2px] bg-gradient-to-r from-[#96895F] to-transparent mb-3"
                            initial={{ width: '0%' }}
                            animate={{ width: isHovered ? '100%' : '30%' }}
                            transition={{ duration: 0.4 }}
                        />

                        <motion.p
                            className="text-sm md:text-base text-white/60"
                            animate={{ opacity: isHovered ? 1 : 0.6 }}
                            transition={{ duration: 0.3 }}
                        >
                            {service.description}
                        </motion.p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                        className="flex-shrink-0 w-8 h-8 rounded-full border border-[#96895F]/30 flex items-center justify-center"
                        animate={isHovered ? {
                            x: [0, 5, 0],
                            borderColor: 'rgba(150, 137, 95, 0.6)',
                        } : {
                            borderColor: 'rgba(150, 137, 95, 0.3)',
                        }}
                        transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
                    >
                        <svg
                            className="w-4 h-4 text-[#96895F]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.div>
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

// --- MAIN COMPONENT ---
function OurServices() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const [radii, setRadii] = useState({ primary: 450, secondary: 550 });
    const [animationKey, setAnimationKey] = useState(0);

    // --- RESPONSIVE RADII LOGIC ---
    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 768) {
                setRadii({ primary: 280, secondary: 350 });
            } else if (window.innerWidth < 1024) {
                setRadii({ primary: 380, secondary: 460 });
            } else {
                setRadii({ primary: 450, secondary: 550 });
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

    return (
        <section
            ref={ref}
            className='w-full flex justify-center items-center py-20 md:py-32 relative overflow-hidden'
        >
            {/* --- BACKGROUND ELEMENTS --- */}
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

            {/* --- CIRCULAR TEXT ANIMATION (BACKGROUND) --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-20">
                <motion.div
                    className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2"
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-30 w-full max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex flex-col items-center gap-2">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`${MoonlanderFont.className} font-black text-4xl md:text-6xl`}
                        >
                            <span className="text-[#f5f5f5]">OUR </span>
                            <span className="text-[#96895F]">SERVICES</span>
                        </motion.h1>
                    </div>

                    {/* Futuristic Divider */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <FuturisticDivider color="#96895F" />
                    </motion.div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurServices;