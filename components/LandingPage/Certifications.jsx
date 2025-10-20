/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
import StarsCanvas from '@/components/Global/StarCanvas';
import { Oxanium } from 'next/font/google';
import localFont from 'next/font/local';

const OxaniumFont = Oxanium({ weight: '700', subsets: ['latin'] });
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });


// --- Black Hole Particle Animation Component ---
const BlackHoleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const requestAnimFrame = (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );

        const cancelAnimFrame = (
            window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function (id) {
                clearTimeout(id);
            }
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
                if (!ctx) return;
                ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            }
            this.update = function () {
                this.angle += this.speed;
                this.position = {
                    x: x + this.distance * Math.cos(this.angle),
                    y: y + this.distance * Math.sin(this.angle)
                };
                this.draw();
            }
        }

        function Emitter(x, y) {
            this.position = { x: x, y: y };
            this.radius = 30;
            this.count = 3000;
            this.particles = [];

            for (var i = 0; i < this.count; i++) {
                this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
            }
        }

        Emitter.prototype = {
            draw: function () {
                if (!ctx) return;
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            },
            update: function () {
                for (var i = 0; i < this.count; i++) {
                    this.particles[i].update();
                }
                this.draw();
            }
        }

        let emitter;
        const loop = () => {
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (emitter) {
                    emitter.update();
                }
                animationFrameId = requestAnimFrame(loop);
            }
        }

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = Math.min(window.innerHeight, 700);
                emitter = new Emitter(canvas.width / 2, canvas.height / 2);
            }
        };

        handleResize();
        if (!animationFrameId) {
            loop();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimFrame(animationFrameId);
        };

    }, []);

    return <canvas id="particle" ref={canvasRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />;
};


// --- Enhanced OrbitalCard Component ---
const OrbitalCard = ({ cert, index, totalCards, animationProgress, onHoverStart, onHoverEnd }) => {
    const [isHovered, setIsHovered] = useState(false);

    const angle = (index / totalCards) * 360;
    const currentAngle = useTransform(animationProgress, (latest) => angle + latest);

    const radiusX = 550;
    const radiusY = 180;

    const x = useTransform(currentAngle, (a) => radiusX * Math.cos(a * (Math.PI / 180)));
    const y = useTransform(currentAngle, (a) => radiusY * Math.sin(a * (Math.PI / 180)));

    const baseScale = useTransform(y, [-radiusY, radiusY], [0.7, 1.1]);
    const baseZIndex = useTransform(y, [-radiusY, radiusY], [1, totalCards + 1]);
    const rotateY = useTransform(x, [-radiusX, 0, radiusX], [45, 0, -45]);

    // Smooth spring animations
    const scale = useSpring(baseScale, { stiffness: 200, damping: 20 });
    const zIndex = useSpring(baseZIndex, { stiffness: 300, damping: 25 });

    useEffect(() => {
        if (isHovered) {
            scale.set(1.2);
            zIndex.set(999);
        } else {
            scale.set(baseScale);
            zIndex.set(baseZIndex);
        }
    }, [isHovered, baseScale, baseZIndex, scale, zIndex]);

    const handleHoverStart = () => {
        setIsHovered(true);
        onHoverStart();
    };

    const handleHoverEnd = () => {
        setIsHovered(false);
        onHoverEnd();
    };

    return (
        <motion.div
            className="absolute flex items-center justify-center will-change-transform"
            style={{
                x, y, scale, zIndex,
                rotateY: isHovered ? 0 : rotateY,
                top: '50%', left: '50%',
                marginTop: '-160px',
                marginLeft: '-144px',
                transformStyle: 'preserve-3d',
            }}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            <div
                className={`group/card relative flex flex-col items-center justify-start text-center w-72 h-80 p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/70 backdrop-blur-lg rounded-3xl shadow-2xl transform-gpu overflow-hidden ${OxaniumFont.className}`}
                style={{
                    border: isHovered ? '1px solid rgba(150, 137, 95, 0.7)' : '1px solid rgba(150, 137, 95, 0.2)',
                    boxShadow: isHovered
                        ? '0px 30px 60px -15px rgba(150, 137, 95, 0.5), 0 0 80px rgba(150, 137, 95, 0.3), inset 0 0 40px rgba(150, 137, 95, 0.05)'
                        : '0px 15px 35px -10px rgba(0, 0, 0, 0.6)',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
            >
                {/* Animated gradient background on hover */}
                {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#96895F]/15 via-transparent to-[#96895F]/10 pointer-events-none" />
                )}

                {/* Shimmer effect */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />

                {/* Inner glow border */}
                <div
                    className="absolute inset-[1px] rounded-3xl pointer-events-none transition-all duration-400"
                    style={{
                        border: isHovered ? '1px solid rgba(150, 137, 95, 0.3)' : '1px solid rgba(150, 137, 95, 0.1)',
                    }}
                />

                {/* Corner accents */}
                {isHovered && (
                    <>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#96895F]/25 to-transparent rounded-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#96895F]/20 to-transparent rounded-3xl pointer-events-none" />
                    </>
                )}

                {/* Floating particles on hover */}
                {isHovered && (
                    <>
                        <motion.div
                            className="absolute w-1.5 h-1.5 rounded-full bg-[#96895F]/60"
                            style={{ top: '20%', right: '15%' }}
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-1 h-1 rounded-full bg-[#96895F]/40"
                            style={{ top: '30%', left: '10%' }}
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                    </>
                )}

                {/* Content */}
                <motion.div
                    className="flex justify-center items-center space-x-4 mb-6 h-24 relative z-10"
                    animate={{
                        y: isHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    {cert.emblems.map((src, j) => (
                        <motion.img
                            key={`emblem-${index}-${j}`}
                            src={src}
                            alt={cert.alt || cert.titles[0]}
                            className="max-h-full w-auto transition-all duration-500"
                            style={{
                                filter: isHovered ? 'grayscale(0) brightness(1.1)' : 'grayscale(1) brightness(0.8)',
                            }}
                            animate={isHovered ? {
                                scale: [1, 1.05, 1],
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}
                </motion.div>

                <motion.div
                    className="flex flex-col justify-center items-center min-h-[4.5rem] space-y-2 relative z-10"
                    animate={{
                        y: isHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    {cert.linkPhrase && (
                        <motion.p
                            className="text-base md:text-lg uppercase tracking-wider font-semibold mb-1 drop-shadow-lg"
                            style={{
                                color: isHovered ? '#96895F' : 'rgba(150, 137, 95, 0.8)',
                                textShadow: isHovered ? '0 0 15px rgba(150, 137, 95, 0.7)' : 'none',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {cert.linkPhrase}
                        </motion.p>
                    )}

                    {cert.titles && cert.titles[0] && cert.titles.map((line, k) => (
                        <p
                            key={`title-${index}-${k}`}
                            className={`font-bold uppercase text-[#EAE2B7] text-lg md:text-xl leading-tight drop-shadow-lg ${cert.linkPhrase ? 'mt-1' : ''}`}
                            style={{
                                textShadow: isHovered ? '0 0 20px rgba(234, 226, 183, 0.4)' : 'none',
                                transition: 'text-shadow 0.3s ease',
                            }}
                        >
                            {line}
                        </p>
                    ))}

                    {(!cert.titles || !cert.titles[0]) && cert.alt && (
                        <p
                            className="font-bold uppercase text-[#EAE2B7] text-lg md:text-xl leading-tight drop-shadow-lg"
                            style={{
                                textShadow: isHovered ? '0 0 20px rgba(234, 226, 183, 0.4)' : 'none',
                                transition: 'text-shadow 0.3s ease',
                            }}
                        >
                            {cert.alt}
                        </p>
                    )}

                    {/* Animated divider line */}
                    <div
                        className="h-0.5 bg-gradient-to-r from-[#96895F] to-transparent mt-4 transition-all duration-400 ease-out"
                        style={{
                            width: isHovered ? '80%' : '40%',
                            opacity: isHovered ? 1 : 0.5,
                        }}
                    />

                    {/* Hover reveal badge */}
                    <motion.div
                        className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#96895F]/90 font-semibold mt-2"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 10,
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span>Verified Credential</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};


// --- Main Certifications Component ---
function Certifications() {
    const certificates = [
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
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let controls;
        if (!isPaused) {
            controls = animate(rotationProgress, rotationProgress.get() + 360, {
                duration: 35,
                repeat: Infinity,
                repeatType: "loop",
                ease: 'linear',
            });
        }
        return () => {
            if (controls) controls.stop();
        };
    }, [rotationProgress, isPaused]);

    return (
        <motion.section
            className='w-full flex flex-col justify-center py-36 md:py-48 relative overflow-hidden'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.85) 100%)"
                }} />

                {/* Subtle animated gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#96895F]/10 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#96895F]/8 rounded-full blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.15, 0.1, 0.15],
                    }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/30"></div>

            {/* Header */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 text-center mb-24">
                <h2 className={`font-black text-3xl md:text-5xl ${MoonlanderFont.className}`}>
                    <span className="text-[#f5f5f5]">Our </span>
                    <span className="text-prOrange">Credentials</span>
                    <span className="text-[#f5f5f5]"> in Orbit</span>
                </h2>
                <p className={`text-lg md:text-xl text-white/70 mt-6 max-w-2xl mx-auto ${MoonlanderFont.className}`}>
                    An interactive showcase of our proven expertise across the digital universe.
                </p>
            </div>

            {/* Orbital Cards */}
            <div className="relative z-20 w-full h-[75vh] min-h-[700px] flex items-center justify-center">
                <div className="absolute z-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <BlackHoleCanvas />
                </div>

                <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
                    {certificates.map((cert, i) => (
                        <OrbitalCard
                            key={`cert-${i}`}
                            cert={cert}
                            index={i}
                            totalCards={certificates.length}
                            animationProgress={rotationProgress}
                            onHoverStart={() => setIsPaused(true)}
                            onHoverEnd={() => setIsPaused(false)}
                        />
                    ))}
                </div>
            </div>

            {/* Add shimmer keyframe animation */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 200%; }
                }
            `}</style>
        </motion.section>
    );
}

export default Certifications;