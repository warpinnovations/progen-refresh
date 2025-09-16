/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import StarsCanvas from '@/components/Global/StarCanvas';
import { Oxanium } from 'next/font/google';
const OxaniumFont = Oxanium({ weight: '700', subsets: ['latin'] });

// --- Self-Contained OrbitalCard Component (No changes here) ---
const OrbitalCard = ({ cert, index, totalCards, animationProgress }) => {
    const angle = (index / totalCards) * 360;
    const currentAngle = useTransform(animationProgress, (latest) => angle + latest);

    const radiusX = 500;
    const radiusY = 160;

    const x = useTransform(currentAngle, (a) => radiusX * Math.cos(a * (Math.PI / 180)));
    const y = useTransform(currentAngle, (a) => radiusY * Math.sin(a * (Math.PI / 180)));

    const scale = useTransform(y, [-radiusY, radiusY], [0.7, 1.1]);
    const zIndex = useTransform(y, [-radiusY, radiusY], [1, totalCards + 1]);

    return (
        <motion.div
            className="absolute flex items-center justify-center"
            style={{
                x,
                y,
                scale,
                zIndex, // This zIndex is crucial for keeping cards above the black hole
                top: '50%',
                left: '50%',
                marginTop: '-160px',
                marginLeft: '-144px',
            }}
        >
            <motion.div
                whileHover={{
                    scale: 1.15,
                    y: -15,
                    boxShadow: '0px 25px 50px -12px rgba(150, 137, 95, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="
                    group/card relative flex flex-col items-center justify-start text-center 
                    w-72 h-80 p-8
                    bg-slate-900/50 backdrop-blur-lg
                    border border-slate-800 rounded-2xl 
                    shadow-2xl shadow-black/50
                    transform-gpu overflow-hidden
                    ring-1 ring-white/10
                "
            >
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-glint" />
                <div className="flex justify-center items-center space-x-4 mb-4 h-24">
                    {cert.emblems.map((src, j) => (
                        <img
                            key={`emblem-${index}-${j}`}
                            src={src}
                            alt={cert.alt || cert.titles[0]}
                            className="max-h-full w-auto transition-all duration-500 filter grayscale group-hover/card:grayscale-0"
                        />
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center min-h-[4.5rem]">
                    {cert.linkPhrase && <p className="text-sm uppercase tracking-wider text-slate-400">{cert.linkPhrase}</p>}
                    {cert.titles && cert.titles[0] && cert.titles.map((line, k) => (
                        <p key={`title-${index}-${k}`} className={`font-semibold uppercase text-slate-100 ${cert.linkPhrase ? 'mt-1 text-base' : 'text-lg'}`}>{line}</p>
                    ))}
                    {(!cert.titles || !cert.titles[0]) && cert.alt && <p className="font-semibold uppercase text-slate-100 text-lg">{cert.alt}</p>}
                </div>
            </motion.div>
        </motion.div>
    );
};


// --- Main Certifications Component ---
function Certifications() {
    const certificates = [
        // Your certificates array...
        { emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'], linkPhrase: 'Certified', titles: ['Digital Marketer'], },
        { emblems: ['./LandingPageAssets/certificates/google-ads.png'], alt: 'Google Ads Certified', titles: [''], },
        { emblems: ['./LandingPageAssets/certificates/meltwater.png'], linkPhrase: 'Partners with', titles: ['Meltwater'], },
        { emblems: ['./LandingPageAssets/certificates/cisco.png'], alt: 'Cisco Certified', titles: [''], },
        { emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'], linkPhrase: 'Certified in', titles: ['Search Engine Optimization'], },
        { emblems: ['./LandingPageAssets/certificates/google-analytics-03.png'], alt: 'Google Analytics IQ', titles: [''], },
        { emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'], linkPhrase: 'Certified in', titles: ['Digital Marketing', 'App Marketing'], },
        { emblems: ['./LandingPageAssets/certificates/google-analytics-02.webp'], alt: 'Google Analytics', titles: [''], },
    ];

    const rotationProgress = useMotionValue(0);

    useEffect(() => {
        const controls = animate(rotationProgress, 360, {
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
        });
        return controls.stop;
    }, [rotationProgress]);

    return (
        <motion.section
            className='w-full flex flex-col justify-center py-36 md:py-48 relative overflow-hidden'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                {/* Blending gradient overlay for smooth transition */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.85) 100%)"
                }} />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/30"></div>

            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 text-center mb-24">
                <h2 className={`text-5xl md:text-6xl font-bold text-slate-100 ${OxaniumFont.className}`}>
                    Our <span className="text-[#96895f]">Credentials</span> in Orbit
                </h2>
                <p className={`text-lg text-white mt-4 max-w-2xl mx-auto ${OxaniumFont.className}`}>An interactive showcase of our proven expertise across the digital universe.</p>
            </div>

            <div className="relative z-20 w-full h-[75vh] min-h-[700px] flex items-center justify-center">

                {/* --- NEW: The Layered Black Hole --- */}
                <motion.div
                    className="absolute z-0 flex items-center justify-center" // z-0 ensures it's behind the cards
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                >
                    {/* Layer 1: The Outer Gravitational Warp */}
                    <motion.div
                        className="absolute w-[450px] h-[450px] bg-gradient-radial from-black/50 to-transparent rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Layer 2: The Glowing Accretion Disk */}
                    <motion.div
                        className="absolute w-80 h-80 border-4 border-prOrange/80 rounded-full"
                        style={{ boxShadow: '0 0 30px 5px rgba(150, 137, 95, 0.4)' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Layer 3: The Event Horizon (Singularity) */}
                    <div className="absolute w-40 h-40 bg-black rounded-full" />
                </motion.div>

                <div className="relative w-full h-full flex items-center justify-center">
                    {certificates.map((cert, i) => (
                        <OrbitalCard
                            key={`cert-${i}`}
                            cert={cert}
                            index={i}
                            totalCards={certificates.length}
                            animationProgress={rotationProgress}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default Certifications;