/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Oxanium } from 'next/font/google';
const OxaniumFont = Oxanium({ weight: '400', subsets: ['latin'] });

export default function OrbitalCard({ cert, index, totalCards, animationProgress }) {
    const angle = (index / totalCards) * 360;

    const currentAngle = useTransform(animationProgress, (latest) => angle + latest);

    // --- INCREASED RADII FOR A BIGGER ORBIT ---
    const radiusX = 450;
    const radiusY = 150;

    const x = useTransform(currentAngle, (a) => radiusX * Math.cos(a * (Math.PI / 180)));
    const y = useTransform(currentAngle, (a) => radiusY * Math.sin(a * (Math.PI / 180)));

    const scale = useTransform(y, [-radiusY, radiusY], [0.65, 1.1]);
    const zIndex = useTransform(y, [-radiusY, radiusY], [1, totalCards + 1]);

    return (
        <motion.div
            className="absolute flex items-center justify-center"
            style={{ x, y, scale, zIndex, top: '50%', left: '50%', marginTop: '-160px', marginLeft: '-144px' }} // Centering offset
        >
            {/* --- PREMIUM HOVER AND CARD STYLING --- */}
            <motion.div
                whileHover={{
                    scale: 1.15,
                    y: -15,
                    boxShadow: '0px 25px 50px -12px rgba(255, 107, 0, 0.25)', // prOrange glow
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`
                    group/card relative flex flex-col items-center justify-start text-center 
                    w-72 h-80 p-8  /* Bigger card size */
                    bg-slate-900/50 backdrop-blur-lg /* Deeper blur */
                    border border-slate-700 rounded-2xl 
                    shadow-2xl shadow-black/50
                    transform-gpu overflow-hidden /* Contains the glint */
                    ${OxaniumFont.className}
                `}
            >
                {/* --- The Glint Effect Div --- */}
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
                    {cert.linkPhrase && <p className={`text-sm uppercase tracking-wider text-slate-400 ${OxaniumFont.className}`}>{cert.linkPhrase}</p>}
                    {cert.titles && cert.titles[0] && cert.titles.map((line, k) => (
                        <p key={`title-${index}-${k}`} className={`font-semibold uppercase text-[#96895f] ${cert.linkPhrase ? 'mt-1 text-base' : 'text-lg'} ${OxaniumFont.className}`}>{line}</p>
                    ))}
                    {(!cert.titles || !cert.titles[0]) && cert.alt && <p className={`font-semibold uppercase text-[#96895f] text-lg ${OxaniumFont.className}`}>{cert.alt}</p>}
                </div>
            </motion.div>
        </motion.div>
    );
};