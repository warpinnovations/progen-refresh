/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import StarsCanvas from '@/components/Global/StarCanvas';
import { Oxanium } from 'next/font/google';
const OxaniumFont = Oxanium({ weight: '700', subsets: ['latin'] });


// --- NEW: Black Hole Particle Animation Component ---
const BlackHoleCanvas = () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
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
                emitter.update();
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


// --- Self-Contained OrbitalCard Component (No changes here) ---
const OrbitalCard = ({ cert, index, totalCards, animationProgress, onHoverStart, onHoverEnd }) => {
    const angle = (index / totalCards) * 360;
    const currentAngle = useTransform(animationProgress, (latest) => angle + latest);
    const radiusX = 550;
    const radiusY = 180;
    const x = useTransform(currentAngle, (a) => radiusX * Math.cos(a * (Math.PI / 180)));
    const y = useTransform(currentAngle, (a) => radiusY * Math.sin(a * (Math.PI / 180)));
    const scale = useTransform(y, [-radiusY, radiusY], [0.7, 1.1]);
    const zIndex = useTransform(y, [-radiusY, radiusY], [1, totalCards + 1]);

    return (
        <motion.div
            className="absolute flex items-center justify-center"
            style={{
                x, y, scale, zIndex,
                top: '50%', left: '50%', marginTop: '-160px', marginLeft: '-144px',
            }}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            <motion.div
                whileHover={{
                    scale: 1.15, y: -15, boxShadow: '0px 25px 50px -12px rgba(150, 137, 95, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="group/card relative flex flex-col items-center justify-start text-center w-72 h-80 p-8 bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 transform-gpu overflow-hidden ring-1 ring-white/10"
            >
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-glint" />
                <div className="flex justify-center items-center space-x-4 mb-4 h-24">
                    {cert.emblems.map((src, j) => (
                        <img key={`emblem-${index}-${j}`} src={src} alt={cert.alt || cert.titles[0]} className="max-h-full w-auto transition-all duration-500 filter grayscale group-hover/card:grayscale-0" />
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
        if (isPaused) return;
        const controls = animate(rotationProgress, 360, {
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
        });
        return controls.stop;
    }, [rotationProgress, isPaused]);

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

                {/* --- REPLACED: The Black Hole Canvas is now the centerpiece --- */}
                <div className="absolute z-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <BlackHoleCanvas />
                </div>

                <div className="relative w-full h-full flex items-center justify-center">
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
        </motion.section>
    );
}

export default Certifications;