"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic'; // Import next/dynamic
import { loadSlim } from "@tsparticles/slim"; // We still need this for the engine

// Dynamically import the Particles component with SSR turned off
const Particles = dynamic(() => import('@tsparticles/react'), {
    ssr: false,
});

const AnniversaryContact = () => {
    // This function initializes the tsparticles engine
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    // The eye-catching "Floating Embers" configuration from before
    const particleOptions = {
        background: {
            color: { value: 'transparent' },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'bubble',
                },
            },
            modes: {
                bubble: {
                    distance: 250,
                    duration: 2,
                    opacity: 0.8,
                    size: 15,
                    color: "#eae2b7",
                },
            },
        },
        particles: {
            color: {
                value: ['#A89773', '#EAE2B7'],
            },
            links: { enable: false },
            collisions: { enable: false },
            move: {
                direction: 'top',
                enable: true,
                outModes: { default: 'out' },
                random: true,
                speed: { min: 0.5, max: 1.5 },
                straight: false,
            },
            number: {
                density: { enable: true, area: 800 },
                value: 60,
            },
            opacity: {
                value: { min: 0.1, max: 0.6 },
                animation: { enable: true, speed: 1, sync: false },
            },
            shape: { type: 'circle' },
            size: {
                value: { min: 1, max: 4 },
                animation: { enable: true, speed: 2, sync: false },
            },
        },
        detectRetina: true,
    };

    return (
        <motion.div
            className="relative" // Parent needs to be relative
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#A89773]/50 via-transparent to-[#EAE2B7]/50 p-[2px]">

                {/* The Particles component is now loaded client-side only */}
                <Particles
                    id="tsparticles-contact"
                    init={particlesInit}
                    options={particleOptions}
                    className="absolute inset-0 z-0" // Positioned behind the content
                />

                {/* The content card needs a relative position and higher z-index to appear on top */}
                <div className="relative z-10 rounded-[15px] bg-[#111116] p-8 text-left">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A89773] to-[#EAE2B7]">
                        Ready for Your Next Mission?
                    </h2>
                    <p className='mt-4 text-gray-300 leading-relaxed max-w-2xl'>
                        Let&apos;s engineer your brand&apos;s success together. We combine meticulously crafted strategy
                        with creative innovation to achieve stellar results.
                    </p>
                    <motion.div
                        className="mt-8"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                        <Link
                            href='/contact'
                            className='inline-flex items-center rounded-lg bg-gradient-to-br from-[#A89773] to-[#EAE2B7] px-6 py-3 text-base font-bold text-[#302B1A] shadow-lg shadow-[#A89773]/10 transition-shadow hover:shadow-xl hover:shadow-[#EAE2B7]/20'
                        >
                            Contact Us
                            <span className='ml-2 font-light opacity-80'>&gt;</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnniversaryContact;