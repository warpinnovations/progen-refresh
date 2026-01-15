"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
import StarsCanvas from '@/components/Global/StarCanvas';
import FuturisticDivider from '@/components/Global/FuturisticLine';

// --- FONT DEFINITIONS ---
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

// --- SERVICES DATA WITH DETAILED BREAKDOWNS ---
const servicesData = [
    {
        id: 'strategy',
        name: 'Strategy Services',
        icon: '◈',
        color: '#96895F',
        services: [
            'Situational Analysis',
            'Consumer Research and Analysis',
            'Data Interpretation & Insighting',
            'Strategy Development',
            'Digital Consultation',
            'Promotion Mechanics Formulation',
            'Marketing Workshops',
            'Content Planning'
        ]
    },
    {
        id: 'creative',
        name: 'Creative Services',
        icon: '✧',
        color: '#96895F',
        services: [
            'Website Design',
            'Print Design',
            'Installation Design',
            'Graphic Design',
            'Artistic Renders',
            'Illustration',
            'Scriptwriting',
            'Ad Copywriting',
            'Social Copywriting',
            'Sound Design'
        ]
    },
    {
        id: 'branding',
        name: 'Branding Services',
        icon: '✦',
        color: '#96895F',
        services: [
            'Big Idea Formulation',
            'Mock-up and Design',
            'Target Market Identification',
            'Communications Planning',
            'Social Card Design'
        ]
    },
    {
        id: 'digital-marketing',
        name: 'Digital Marketing Services',
        icon: '◉',
        color: '#96895F',
        services: [
            'Search Engine Optimization',
            'Strategy Development',
            'Direct E-mail Marketing',
            'Content Tagging'
        ]
    },
    {
        id: 'media',
        name: 'Media Services',
        icon: '◇',
        color: '#96895F',
        services: [
            'Media Planning and Strategy',
            'Media Buying and Deployment',
            'Media Monitoring and Optimization',
            'Media Reporting'
        ]
    },
    {
        id: 'social-media',
        name: 'Social Media Services',
        icon: '◆',
        color: '#96895F',
        services: [
            'Social Media Scanning',
            'Social Media Strategy',
            'Social Media Design',
            'Digital Brand Analysis',
            'Social Media Planning and Conversation Curation',
            'Influencer Marketing',
            'Campaign Management'
        ]
    },
    {
        id: 'event-management',
        name: 'Event Management Services',
        icon: '◈',
        color: '#96895F',
        services: [
            'Broadcast Management',
            'On-site Event Management',
            'Event Marketing and Promotion',
            'Event Planning and Strategy',
            'Brand Activations',
            'Exhibition and Booth Design',
            'Supplier Networking'
        ]
    },
    {
        id: 'software',
        name: 'Software Solutions',
        icon: '✦',
        color: '#96895F',
        services: [
            'Custom Website Development',
            'Website Design and Re-design',
            'Software Solutions',
            'CMS Website Development',
            'Front End Custom Design',
            'Website Copywriting',
            'Digital Strategy',
            'Content Creation',
            'Conversion Optimization',
            'Search Engine Optimization',
            'AR/VR/MR Development',
            'App Development'
        ]
    }
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

// --- SERVICE DETAIL MODAL ---
const ServiceDetailModal = ({ service, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Card */}
                <div className="relative bg-black/90 border-2 border-[#96895F]/30 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                    {/* Animated border glow */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: 'linear-gradient(45deg, transparent, rgba(150, 137, 95, 0.2), transparent)',
                            backgroundSize: '200% 200%',
                        }}
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#96895F]/10 border border-[#96895F]/30 hover:bg-[#96895F]/20 transition-all duration-300 group z-10"
                    >
                        <svg
                            className="w-5 h-5 text-[#96895F] group-hover:rotate-90 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="mb-6 pr-12">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#96895F]/30 to-[#96895F]/10 border border-[#96895F]/40 flex items-center justify-center">
                                <span className="text-2xl text-[#96895F]">{service.icon}</span>
                            </div>
                            <h3 className={`${MoonlanderFont.className} text-2xl md:text-3xl font-black text-white uppercase`}>
                                {service.name}
                            </h3>
                        </div>
                        <div className="h-[2px] bg-gradient-to-r from-[#96895F] via-[#96895F]/50 to-transparent" />
                    </div>

                    {/* Services List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.services.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group flex items-start gap-3 p-3 rounded-lg bg-[#96895F]/5 border border-[#96895F]/10 hover:border-[#96895F]/30 hover:bg-[#96895F]/10 transition-all duration-300"
                            >
                                <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[#96895F] group-hover:scale-125 transition-transform duration-300" />
                                <span className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer ornament */}
                    <div className="mt-6 flex justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#96895F]/40" />
                            <div className="w-16 h-[1px] bg-gradient-to-r from-[#96895F]/40 to-transparent" />
                            <div className="w-2 h-2 rounded-full bg-[#96895F]/60" />
                            <div className="w-16 h-[1px] bg-gradient-to-l from-[#96895F]/40 to-transparent" />
                            <div className="w-2 h-2 rounded-full bg-[#96895F]/40" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- SERVICE CARD COMPONENT ---
const ServiceCard = ({ service, index, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            className="relative group h-full cursor-pointer"
        >
            {/* Card Container */}
            <motion.div
                className="relative h-full p-6 md:p-7 rounded-2xl border-2 bg-black/50 backdrop-blur-sm overflow-hidden flex flex-col"
                style={{
                    borderColor: isHovered ? `${service.color}80` : `${service.color}20`,
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Animated border glow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, transparent, ${service.color}30, transparent)`,
                        backgroundSize: '200% 200%',
                    }}
                    animate={isHovered ? {
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Inner glow effect */}
                <div className="absolute inset-[2px] rounded-2xl bg-black/60 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between gap-4 flex-1">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Icon */}
                        <motion.div
                            className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br border-2 flex items-center justify-center"
                            style={{
                                borderColor: isHovered ? `${service.color}60` : `${service.color}30`,
                                background: isHovered
                                    ? `linear-gradient(135deg, ${service.color}20, ${service.color}10)`
                                    : `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                            }}
                            animate={isHovered ? {
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                            } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-2xl md:text-3xl" style={{ color: service.color }}>
                                {service.icon}
                            </span>
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                            <h3
                                className={`${MoonlanderFont.className} text-xl md:text-2xl font-black text-white uppercase leading-tight transition-all duration-300`}
                                style={{
                                    color: isHovered ? service.color : '#ffffff',
                                    textShadow: isHovered ? `0 0 20px ${service.color}40` : 'none',
                                }}
                            >
                                {service.name}
                            </h3>

                            {/* Animated underline */}
                            <motion.div
                                className="h-[2px] mt-2 rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, ${service.color}, transparent)`,
                                }}
                                initial={{ width: '30%' }}
                                animate={{ width: isHovered ? '100%' : '30%' }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Service count */}
                            <motion.p
                                className="text-xs md:text-sm mt-2 text-white/50"
                                animate={{ opacity: isHovered ? 1 : 0.5 }}
                            >
                                {service.services.length} services available
                            </motion.p>
                        </div>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                        className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center"
                        style={{
                            borderColor: isHovered ? `${service.color}60` : `${service.color}20`,
                            background: isHovered ? `${service.color}15` : 'transparent',
                        }}
                        animate={isHovered ? {
                            x: [0, 5, 0],
                        } : {}}
                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    >
                        <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            style={{ color: service.color }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.div>
                </div>

                {/* Decorative corner accents */}
                {isHovered && (
                    <>
                        <motion.div
                            className="absolute top-0 right-0 w-20 h-20 rounded-2xl pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at top right, ${service.color}15, transparent)`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-16 h-16 rounded-2xl pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at bottom left, ${service.color}10, transparent)`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </>
                )}

                {/* Floating particles */}
                {isHovered && (
                    <>
                        <motion.div
                            className="absolute w-1.5 h-1.5 rounded-full"
                            style={{ background: service.color, top: '15%', right: '10%', opacity: 0.6 }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute w-1 h-1 rounded-full"
                            style={{ background: service.color, bottom: '20%', left: '15%', opacity: 0.4 }}
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
    const [selectedService, setSelectedService] = useState(null);
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
                        text=" / HERE'S WHAT WE OFFER / HERE'S WHAT WE OFFER / HERE'S WHAT WE OFFER"
                        radiusX={radii.primary}
                        radiusY={Math.round(radii.primary * 0.65)}
                        duration={20}
                        direction={1}
                    />
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-30 w-full max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2"
                    >
                        <h2 className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl`}>
                            <span className="text-[#f5f5f5]">HERE&apos;S WHAT</span>
                            <span className="text-prOrange">WE OFFER</span>
                        </h2>
                    </motion.div>

                    {/* Futuristic Divider */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <FuturisticDivider color="#96895F" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className={`${MoonlanderFont.className} text-base sm:text-lg md:text-xl text-white/70 mt-4 max-w-3xl mx-auto`}
                    >
                        Click on any service to explore our comprehensive offerings
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            onClick={() => setSelectedService(service)}
                        />
                    ))}
                </div>
            </div>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <ServiceDetailModal
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

export default OurServices;