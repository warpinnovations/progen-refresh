"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const prKhaki = '#96895F';

const AnniversaryContact = () => {
    return (
        <motion.div
            className="w-full flex justify-center items-center py-24 md:py-32 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">

                {/* Outer Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `radial-gradient(circle at center, ${prKhaki}15 0%, transparent 70%)`,
                        filter: 'blur(40px)',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Layer 1: The Back Ring (Full) */}
                <div
                    aria-hidden
                    className="absolute w-[185%] h-[60%] rounded-full z-0"
                    style={{
                        background: `
                            radial-gradient(ellipse at center,
                                transparent 40%,
                                ${prKhaki}50 44%,
                                ${prKhaki}35 48%,
                                ${prKhaki}25 52%,
                                transparent 60%
                            ),
                            repeating-radial-gradient(ellipse at center,
                                rgba(255,255,255,0.04) 42%,
                                rgba(255,255,255,0.04) 43.5%,
                                rgba(0,0,0,0.05) 45%,
                                rgba(0,0,0,0.05) 46%
                            )
                        `,
                        filter: 'blur(0.9px)',
                        transform: 'rotateX(74deg) rotateZ(-12deg)'
                    }}
                />

                {/* Layer 2: Planet's Shadow cast onto the back ring */}
                <div
                    aria-hidden
                    className="absolute w-[100%] h-[100%] rounded-full z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_52%)]"
                    style={{ transform: 'translateY(1%)' }}
                />

                {/* Layer 3: The Planet - FIXED TO BE PERFECTLY CIRCULAR */}
                <div
                    className="absolute rounded-full bg-black overflow-hidden shadow-2xl shadow-black/50 z-20 border border-[#96895F]/20"
                    style={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1 / 1'
                    }}
                >
                    {/* surface gradient tint with gold accent */}
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(ellipse farthest-corner at 30% 30%, ${prKhaki}15 0%, rgba(0,0,0,0) 60%),
                                             radial-gradient(circle at 60% 70%, ${prKhaki}08 0%, rgba(0,0,0,0) 55%)`
                        }} />
                    {/* limb darkening */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_140px_50px_rgba(0,0,0,0.9)]" />

                    {/* Subtle surface texture */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, ${prKhaki}10 1px, transparent 2px, transparent 40px)`
                        }}
                    />
                </div>

                {/* Layer 3.5: Occluder to prevent ring visibility through planet - FIXED */}
                <div
                    className="absolute rounded-full z-35 bg-black"
                    style={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1 / 1'
                    }}
                />

                {/* Layer 4: The Front Ring (Masked) */}
                <div
                    aria-hidden
                    className="absolute w-[185%] h-[60%] rounded-full z-30"
                    style={{
                        background: `
                            radial-gradient(ellipse at center,
                                transparent 40%,
                                ${prKhaki}60 44%,
                                ${prKhaki}45 48%,
                                ${prKhaki}30 52%,
                                transparent 60%
                            ),
                            repeating-radial-gradient(ellipse at center,
                                rgba(255,255,255,0.05) 42%,
                                rgba(255,255,255,0.05) 43.5%,
                                rgba(0,0,0,0.06) 45%,
                                rgba(0,0,0,0.06) 46%
                            )
                        `,
                        filter: 'blur(0.8px)',
                        transform: 'rotateX(74deg) rotateZ(-12deg)',
                        maskImage: 'radial-gradient(circle at center, transparent 0 51%, white 52% 100%), linear-gradient(to top, white 52%, transparent 52%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, transparent 0 51%, white 52% 100%), linear-gradient(to top, white 52%, transparent 52%)'
                    }}
                />

                {/* Layer 5: The Content */}
                <div className="relative z-40 w-full h-full flex items-center justify-center text-center p-4">
                    <div className="max-w-[280px] sm:max-w-[320px] md:max-w-[360px] px-4">
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className="text-[#f5f5f5]">Ready</span>
                            <br />
                            <span className="text-[#96895F]">Your</span>
                            <br />
                            <span className="text-[#96895F]">Mission!</span>
                        </motion.h2>

                        {/* Accent line */}
                        <motion.div
                            className="h-[2px] w-16 mx-auto mb-4 bg-gradient-to-r from-transparent via-[#96895F] to-transparent"
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: 64, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />

                        <motion.p
                            className="text-xs sm:text-sm text-white/70 leading-relaxed mx-auto mb-6 font-semibold"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            Let&apos;s engineer your brand&apos;s success across the digital universe.
                        </motion.p>

                        <motion.div
                            className="flex flex-col gap-2.5 justify-center items-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            {/* Primary CTA */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative group w-full"
                            >
                                <Link
                                    href='/contact'
                                    className="relative inline-flex items-center justify-center w-full rounded-lg px-6 py-3 text-base font-bold text-black transition-all duration-300 overflow-hidden"
                                    style={{
                                        backgroundColor: prKhaki,
                                        boxShadow: `0 0 25px -5px ${prKhaki}70`
                                    }}
                                >
                                    {/* Shine effect on hover */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="relative">Contact Us</span>
                                    <motion.span
                                        className='relative ml-2 text-lg'
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </motion.div>

                            {/* Secondary CTA */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative group w-full"
                            >
                                <Link
                                    href='/works'
                                    className="relative inline-flex items-center justify-center w-full rounded-lg border-2 px-6 py-3 text-base font-bold transition-all duration-300 overflow-hidden"
                                    style={{
                                        borderColor: prKhaki,
                                        color: prKhaki,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {/* Fill effect on hover */}
                                    <span
                                        className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0"
                                        style={{ backgroundColor: `${prKhaki}15` }}
                                    />
                                    <span className="relative">View Our Works</span>
                                    <motion.span
                                        className='relative ml-2 text-lg'
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnniversaryContact;