/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CSSStars from '@/components/Global/CSSStars';
import { Oxanium, Rajdhani } from 'next/font/google';
import localFont from 'next/font/local';
import FuturisticDivider from "../Global/FuturisticLine";

const OxaniumFont = Oxanium({ weight: '700', subsets: ['latin'] });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });


// --- Black Hole Particle Animation Component ---
const BlackHoleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let isCleanedUp = false;

        const requestAnimFrame = (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) { return window.setTimeout(callback, 1000 / 60); }
        );
        const cancelAnimFrame = (
            window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function (id) { clearTimeout(id); }
        );

        function Particle(x, y, distance) {
            this.angle = Math.random() * 2 * Math.PI;
            this.radius = Math.random();
            this.opacity = (Math.random() * 5 + 2) / 10;
            this.distance = (1 / this.opacity) * distance;
            this.speed = this.distance * 0.00003;
            this.position = {
                x: x + this.distance * Math.cos(this.angle),
                y: y + this.distance * Math.sin(this.angle)
            };
            this.draw = function () {
                if (!ctx || isCleanedUp) return;
                ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            };
            this.update = function () {
                this.angle += this.speed;
                this.position = {
                    x: x + this.distance * Math.cos(this.angle),
                    y: y + this.distance * Math.sin(this.angle)
                };
                this.draw();
            };
        }

        function Emitter(x, y) {
            this.position = { x, y };
            this.radius = 30;
            this.count = 200;
            this.particles = [];
            for (var i = 0; i < this.count; i++) {
                this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
            }
        }
        Emitter.prototype = {
            draw: function () {
                if (!ctx || isCleanedUp) return;
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            },
            update: function () {
                for (var i = 0; i < this.count; i++) this.particles[i].update();
                this.draw();
            }
        };

        let emitter;
        const loop = () => {
            if (isCleanedUp) return;
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (emitter) emitter.update();
                animationFrameId = requestAnimFrame(loop);
            }
        };
        const handleResize = () => {
            if (canvas && !isCleanedUp) {
                canvas.width = window.innerWidth;
                canvas.height = Math.min(window.innerHeight, 700);
                emitter = new Emitter(canvas.width / 2, canvas.height / 2);
            }
        };
        handleResize();
        if (!animationFrameId && !isCleanedUp) loop();
        window.addEventListener('resize', handleResize);
        return () => {
            isCleanedUp = true;
            window.removeEventListener('resize', handleResize);
            if (animationFrameId) cancelAnimFrame(animationFrameId);
        };
    }, []);

    return <canvas id="particle" ref={canvasRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />;
};


// --- Mobile Certificate Card Component ---
const MobileCertCard = ({ cert, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isActive = cert.isHighlighted || isHovered;

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex-shrink-0 w-[280px] sm:w-[300px]"
        >
            <div
                className={`relative flex flex-col items-center justify-start text-center w-full h-[320px] sm:h-[340px] p-6 bg-transparent backdrop-blur-sm rounded-3xl overflow-hidden ${RajdhaniFont.className}`}
                style={{
                    border: cert.isHighlighted
                        ? '2px solid rgba(212, 175, 55, 0.85)'
                        : (isHovered ? '2px solid rgba(150, 137, 95, 1)' : '1px solid rgba(150, 137, 95, 0.5)'),
                    boxShadow: cert.isHighlighted
                        ? '0 0 60px rgba(212, 175, 55, 0.4), 0 0 30px rgba(212, 175, 55, 0.2)'
                        : (isHovered
                            ? '0px 20px 40px -10px rgba(150, 137, 95, 0.4), 0 0 60px rgba(150, 137, 95, 0.2)'
                            : '0 0 20px rgba(150, 137, 95, 0.1)'),
                    background: cert.isHighlighted ? 'linear-gradient(135deg, rgba(20,16,6,0.9), rgba(28,22,8,0.85))' : 'transparent',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                }}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
            >
                {isActive && !cert.isHighlighted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#96895F]/15 via-transparent to-[#96895F]/10 pointer-events-none" />
                )}
                <div className="absolute inset-[1px] rounded-3xl pointer-events-none transition-all duration-300"
                    style={{ border: isActive ? '1px solid rgba(150, 137, 95, 0.3)' : '1px solid rgba(150, 137, 95, 0.1)' }} />

                {cert.isHighlighted && (
                    <>
                        <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-xl pointer-events-none" />
                        <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-xl pointer-events-none" />
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
                                style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.4)' }}>
                                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                                    animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                                <span className={`${OxaniumFont.className} text-[#D4AF37] text-[8px] uppercase tracking-[0.2em] font-bold`}>Official Partner</span>
                            </div>
                        </div>
                    </>
                )}

                <div className={`flex justify-center items-center space-x-4 mb-6 h-20 relative z-10 ${cert.isHighlighted ? 'mt-6' : ''}`}>
                    {cert.emblems.map((src, j) => (
                        <img key={`emblem-mobile-${index}-${j}`} src={src} alt={cert.alt || cert.titles[0]}
                            className="max-h-full w-auto transition-all duration-300"
                            style={{ filter: isActive ? 'grayscale(0) brightness(1.1)' : 'grayscale(1) brightness(0.8)' }} />
                    ))}
                </div>

                <div className="flex flex-col justify-center items-center min-h-[4rem] space-y-2 relative z-10">
                    {cert.linkPhrase && (
                        <p className="text-sm uppercase font-semibold mb-1 drop-shadow-lg"
                            style={{
                                color: cert.isHighlighted ? '#D4AF37' : (isHovered ? '#96895F' : 'rgba(150, 137, 95, 0.8)'),
                                textShadow: isActive ? '0 0 15px rgba(150, 137, 95, 0.7)' : 'none',
                                transition: 'all 0.3s ease', letterSpacing: '0.08em',
                            }}>
                            {cert.linkPhrase}
                        </p>
                    )}
                    {cert.titles && cert.titles[0] && cert.titles.map((line, k) => (
                        <p key={`title-mobile-${index}-${k}`}
                            className={`font-bold uppercase text-[#EAE2B7] text-base leading-tight drop-shadow-lg ${cert.linkPhrase ? 'mt-1' : ''}`}
                            style={{ textShadow: isActive ? '0 0 20px rgba(234, 226, 183, 0.4)' : 'none', transition: 'text-shadow 0.3s ease', letterSpacing: '0.06em' }}>
                            {line}
                        </p>
                    ))}
                    {(!cert.titles || !cert.titles[0]) && cert.alt && (
                        <p className="font-bold uppercase text-[#EAE2B7] text-base leading-tight drop-shadow-lg"
                            style={{ textShadow: isActive ? '0 0 20px rgba(234, 226, 183, 0.4)' : 'none', transition: 'text-shadow 0.3s ease', letterSpacing: '0.06em' }}>
                            {cert.alt}
                        </p>
                    )}
                    <div className="h-0.5 bg-gradient-to-r from-[#96895F] to-transparent mt-4 transition-all duration-300 ease-out"
                        style={{ width: isActive ? '80%' : '40%', opacity: isActive ? 1 : 0.5 }} />
                    {cert.description && (
                        <p className={`text-xs text-white/70 leading-relaxed mt-2 max-w-[200px] ${RajdhaniFont.className}`}
                            style={{ letterSpacing: '0.04em' }}>{cert.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs uppercase font-semibold mt-2"
                        style={{ color: cert.isHighlighted ? 'rgba(212, 175, 55, 0.9)' : 'rgba(150, 137, 95, 0.9)', opacity: 0.8, letterSpacing: '0.08em' }}>
                        <span>{cert.isHighlighted ? 'Official Partner' : 'Verified'}</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


// --- Static Orbital Card (desktop, non-highlighted) — fixed position on ellipse ---
const OrbitalCard = ({ cert, index, totalCards, radiusX = 390, radiusY = 280 }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Start at -90° so first card is at the top, evenly spaced around full circle
    const angleRad = (-90 + (index / totalCards) * 360) * (Math.PI / 180);

    const fixedX = radiusX * Math.cos(angleRad);
    const fixedY = radiusY * Math.sin(angleRad);

    // Z-index only for visual layering (bottom cards appear in front)
    const zIndex = Math.round(30 + fixedY / 10);

    // Card half-dimensions for centering (w-56 = 224px, h-64 = 256px)
    const halfW = 112;
    const halfH = 128;

    // Each card floats at a slightly different speed for an organic feel
    const floatDuration = 3.2 + (index * 0.35);

    return (
        // Layer 1: position wrapper — entrance animation (opacity + scale)
        <motion.div
            className="absolute will-change-transform"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
                x: fixedX,
                y: fixedY,
                zIndex,
                top: '50%',
                left: '50%',
                marginTop: `-${halfH}px`,
                marginLeft: `-${halfW}px`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Layer 2: float wrapper — continuous vertical bob */}
            <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
            >
            <motion.div
                className={`group/card relative flex flex-col items-center justify-start text-center w-56 h-64 p-6 backdrop-blur-sm rounded-2xl transform-gpu overflow-hidden ${RajdhaniFont.className}`}
                whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
                style={{
                    border: isHovered ? '2px solid rgba(150, 137, 95, 1)' : '1px solid rgba(150, 137, 95, 0.4)',
                    boxShadow: isHovered
                        ? '0px 20px 40px -10px rgba(150, 137, 95, 0.4), 0 0 60px rgba(150, 137, 95, 0.2)'
                        : '0 0 12px rgba(150, 137, 95, 0.07)',
                    background: isHovered ? 'rgba(14,11,4,0.85)' : 'rgba(8,6,2,0.6)',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                }}
            >
                {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#96895F]/15 via-transparent to-[#96895F]/10 pointer-events-none" />
                )}
                <div className="absolute inset-[1px] rounded-2xl pointer-events-none transition-all duration-300"
                    style={{ border: isHovered ? '1px solid rgba(150, 137, 95, 0.3)' : '1px solid rgba(150, 137, 95, 0.08)' }} />

                {/* Logo */}
                <div className="flex justify-center items-center space-x-3 mb-3 h-16 relative z-10">
                    {cert.emblems.map((src, j) => (
                        <img key={`emblem-${index}-${j}`} src={src} alt={cert.alt || cert.titles[0]}
                            className="max-h-full w-auto transition-all duration-300"
                            style={{ filter: isHovered ? 'grayscale(0) brightness(1.1)' : 'grayscale(1) brightness(0.6)' }} />
                    ))}
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center items-center space-y-1.5 relative z-10">
                    {cert.linkPhrase && (
                        <p className="text-xs uppercase font-semibold drop-shadow-lg transition-all duration-300"
                            style={{ color: isHovered ? '#96895F' : 'rgba(150, 137, 95, 0.7)', letterSpacing: '0.08em' }}>
                            {cert.linkPhrase}
                        </p>
                    )}
                    {cert.titles && cert.titles[0] && cert.titles.map((line, k) => (
                        <p key={`title-${index}-${k}`}
                            className={`font-bold uppercase text-[#EAE2B7] text-sm leading-tight drop-shadow-lg`}
                            style={{ textShadow: isHovered ? '0 0 20px rgba(234, 226, 183, 0.4)' : 'none', letterSpacing: '0.06em', opacity: isHovered ? 1 : 0.75 }}>
                            {line}
                        </p>
                    ))}
                    {(!cert.titles || !cert.titles[0]) && cert.alt && (
                        <p className="font-bold uppercase text-[#EAE2B7] text-sm leading-tight drop-shadow-lg"
                            style={{ textShadow: isHovered ? '0 0 20px rgba(234, 226, 183, 0.4)' : 'none', letterSpacing: '0.06em', opacity: isHovered ? 1 : 0.75 }}>
                            {cert.alt}
                        </p>
                    )}
                    <div className="h-0.5 bg-gradient-to-r from-[#96895F] to-transparent mt-3 transition-all duration-300 ease-out"
                        style={{ width: isHovered ? '80%' : '40%', opacity: isHovered ? 1 : 0.4 }} />
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold mt-1.5 transition-all duration-300"
                        style={{ color: 'rgba(150, 137, 95, 0.9)', opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(8px)', letterSpacing: '0.08em' }}>
                        <span>Verified Credential</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </motion.div>
            </motion.div>
        </motion.div>
    );
};


// --- Meltwater Center Featured Card ---
const FeaturedCenterCard = ({ cert }) => {
    return (
        // Plain div handles absolute centering (motion.div overrides CSS transform, breaking translate)
        <div className="absolute z-50" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute -inset-6 rounded-[2.5rem] pointer-events-none"
                animate={{ boxShadow: ['0 0 80px rgba(212,175,55,0.3)', '0 0 140px rgba(212,175,55,0.55)', '0 0 80px rgba(212,175,55,0.3)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div
                className={`relative flex flex-col items-center justify-center text-center w-72 h-80 p-8 backdrop-blur-2xl rounded-3xl overflow-hidden ${RajdhaniFont.className}`}
                style={{
                    background: 'linear-gradient(135deg, rgba(22,17,7,0.98), rgba(32,26,9,0.95))',
                    border: '2px solid rgba(212, 175, 55, 0.85)',
                    boxShadow: '0 0 120px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.25), inset 0 0 60px rgba(212, 175, 55, 0.07)',
                }}
            >
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#D4AF37]/15 to-transparent rounded-3xl pointer-events-none" />
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/55 rounded-tl-xl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/55 rounded-br-xl pointer-events-none" />

                {/* Animated border pulse */}
                <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ border: '1px solid rgba(212,175,55,0.4)' }} />

                {/* Scan line */}
                <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
                    animate={{ opacity: [0, 0.2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
                    <motion.div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                        animate={{ y: [-4, 330] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        style={{ filter: 'blur(1px)' }} />
                </motion.div>

                {/* Official Partner badge */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                        style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.45)' }}>
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <span className={`${OxaniumFont.className} text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-bold`}>
                            Official Partner
                        </span>
                    </div>
                </div>

                {/* Logo */}
                <div className="flex justify-center items-center h-24 mb-3 relative z-10 mt-6">
                    {cert.emblems.map((src, j) => (
                        <img key={j} src={src} alt="Meltwater" className="max-h-full w-auto"
                            style={{ filter: 'grayscale(0) brightness(1.2) drop-shadow(0 0 18px rgba(212,175,55,0.5))' }} />
                    ))}
                </div>

                {/* Text */}
                <div className="relative z-10 space-y-1">
                    <p className="text-base uppercase font-semibold"
                        style={{ color: '#D4AF37', letterSpacing: '0.08em', textShadow: '0 0 15px rgba(212,175,55,0.5)' }}>
                        {cert.linkPhrase}
                    </p>
                    <p className="font-bold uppercase text-[#EAE2B7] text-xl leading-tight"
                        style={{ letterSpacing: '0.06em', textShadow: '0 0 20px rgba(234,226,183,0.3)' }}>
                        {cert.titles?.[0]}
                    </p>
                    <div className="h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#96895F] to-transparent"
                        style={{ width: '80%', margin: '10px auto 0' }} />
                    {cert.description && (
                        <p className={`${RajdhaniFont.className} text-xs leading-relaxed mt-2 max-w-[200px] mx-auto`}
                            style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
                            {cert.description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
        </div>
    );
};


// --- Main Certifications Component ---
function Certifications() {
    const certificates = [
        { emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'], linkPhrase: 'Certified', titles: ['Digital Marketer'] },
        { emblems: ['./LandingPageAssets/certificates/google-ads.png'], alt: 'Google Ads Certified', titles: [''] },
        { emblems: ['./LandingPageAssets/certificates/meltwater.png'], linkPhrase: 'Official Partner', titles: ['Meltwater'], description: 'Real-time media monitoring & social intelligence across global channels.', isHighlighted: true },
        { emblems: ['./LandingPageAssets/certificates/cisco.png'], alt: 'Cisco Certified', titles: [''] },
        { emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'], linkPhrase: 'Certified in', titles: ['Search Engine Optimization'] },
        { emblems: ['./LandingPageAssets/certificates/google-analytics-03.png'], alt: 'Google Analytics IQ', titles: [''] },
        { emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'], linkPhrase: 'Certified in', titles: ['Digital Marketing', 'App Marketing'] },
        { emblems: ['./LandingPageAssets/certificates/google-analytics-02.webp'], alt: 'Google Analytics', titles: [''] },
    ];

    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ w: 1440, h: 800 });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setContainerSize({ w: width, h: height });
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const featured = certificates.find(c => c.isHighlighted);
    const others = certificates.filter(c => !c.isHighlighted);

    // Orbital geometry — used by both SVG layer and OrbitalCard
    const RADIUS_X = 390;
    const RADIUS_Y = 280;
    const cx = containerSize.w / 2;
    const cy = containerSize.h / 2;

    return (
        <motion.section
            className='w-full flex flex-col justify-center py-16 sm:py-24 md:py-36 lg:py-48 relative overflow-hidden'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <CSSStars />
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.85) 100%)"
                }} />
                {/* Ambient glow centered on the orbital system */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(150,137,95,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)' }} />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/25" />

            {/* Header */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 text-center mb-12 md:mb-24">
                <h2 className={`font-black text-2xl sm:text-3xl md:text-5xl ${MoonlanderFont.className}`}>
                    <span className="text-[#f5f5f5]">Our </span>
                    <span className="text-prOrange">Credentials</span>
                </h2>
                <FuturisticDivider color="#96895F" className="mt-6 md:mt-8" />
            </div>

            {isMobile ? (
                // Mobile: Horizontal scrolling carousel
                <div className="relative z-20 w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
                    <div className="overflow-x-auto overflow-y-hidden scrollbar-hide px-4 pb-4">
                        <div className="flex gap-4 sm:gap-6" style={{ width: 'max-content' }}>
                            {certificates.map((cert, i) => (
                                <MobileCertCard key={`cert-mobile-${i}`} cert={cert} index={i} />
                            ))}
                        </div>
                    </div>
                    <div className="relative z-20 flex justify-center mt-6 gap-2">
                        <motion.div className="flex items-center gap-2 text-[#96895F]/70 text-xs uppercase tracking-wider"
                            animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                            <span className={RajdhaniFont.className}>Swipe to explore</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            ) : (
                // Desktop: Static circular layout — others orbit around centered Meltwater
                <div className="relative z-20 w-full h-[85vh] min-h-[800px] flex items-center justify-center">
                    {/* Black hole ambient background */}
                    <div className="absolute z-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <BlackHoleCanvas />
                    </div>

                    {/* Cards + SVG container — measured for accurate SVG lines */}
                    <div ref={containerRef} className="relative w-full h-full">

                        {/* SVG layer: connection lines + orbital ring path */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none z-10"
                            viewBox={`0 0 ${containerSize.w} ${containerSize.h}`}
                            preserveAspectRatio="none"
                        >
                            <defs>
                                {others.map((_, i) => {
                                    const angleRad = (-90 + (i / others.length) * 360) * (Math.PI / 180);
                                    const x = cx + RADIUS_X * Math.cos(angleRad);
                                    const y = cy + RADIUS_Y * Math.sin(angleRad);
                                    return (
                                        <linearGradient key={`lg-${i}`} id={`lineGrad-${i}`}
                                            x1={cx} y1={cy} x2={x} y2={y} gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.55" />
                                            <stop offset="60%" stopColor="#96895F" stopOpacity="0.18" />
                                            <stop offset="100%" stopColor="#96895F" stopOpacity="0.04" />
                                        </linearGradient>
                                    );
                                })}
                                <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="80%" stopColor="transparent" />
                                    <stop offset="100%" stopColor="rgba(150,137,95,0.15)" />
                                </radialGradient>
                            </defs>

                            {/* Orbital ring ellipse */}
                            <ellipse
                                cx={cx} cy={cy}
                                rx={RADIUS_X} ry={RADIUS_Y}
                                fill="none"
                                stroke="rgba(150,137,95,0.14)"
                                strokeWidth="1"
                                strokeDasharray="6 18"
                            />

                            {/* Connection lines from center to each card */}
                            {others.map((_, i) => {
                                const angleRad = (-90 + (i / others.length) * 360) * (Math.PI / 180);
                                const x = cx + RADIUS_X * Math.cos(angleRad);
                                const y = cy + RADIUS_Y * Math.sin(angleRad);
                                return (
                                    <line key={`line-${i}`}
                                        x1={cx} y1={cy} x2={x} y2={y}
                                        stroke={`url(#lineGrad-${i})`}
                                        strokeWidth="1"
                                        strokeDasharray="3 12"
                                        opacity="0.75"
                                    />
                                );
                            })}

                            {/* Center dot on connection lines */}
                            <circle cx={cx} cy={cy} r="4" fill="rgba(212,175,55,0.4)" />
                            <circle cx={cx} cy={cy} r="8" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
                        </svg>

                        {/* Pulsing rings emanating from Meltwater center */}
                        {[0, 1, 2].map(i => (
                            <motion.div key={`ring-${i}`}
                                className="absolute rounded-full pointer-events-none z-20"
                                style={{
                                    top: '50%', left: '50%',
                                    width: `${180 + i * 90}px`,
                                    height: `${180 + i * 90}px`,
                                    marginLeft: `-${90 + i * 45}px`,
                                    marginTop: `-${90 + i * 45}px`,
                                    border: `1px solid rgba(212,175,55,${0.3 - i * 0.07})`,
                                }}
                                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.05, 0.5] }}
                                transition={{ duration: 3.5, delay: i * 1.1, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        ))}

                        {/* Orbital cards (non-highlighted) */}
                        {others.map((cert, i) => (
                            <OrbitalCard
                                key={`cert-${i}`}
                                cert={cert}
                                index={i}
                                totalCards={others.length}
                                radiusX={RADIUS_X}
                                radiusY={RADIUS_Y}
                            />
                        ))}

                        {/* Meltwater — always at center, always highlighted */}
                        <FeaturedCenterCard cert={featured} />
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 200%; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); opacity: 0.6; }
                    50% { transform: translateY(-15px); opacity: 1; }
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </motion.section>
    );
}

export default Certifications;
