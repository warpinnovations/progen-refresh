"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const prKhaki = '#A89773';

const AnniversaryContact = () => {
    return (
        <motion.div
            className="w-full flex justify-center items-center py-24 md:py-32 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <div className="relative w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[620px] lg:h-[620px] flex items-center justify-center">

                {/* Layer 1: The Back Ring (Full) */}
                <div
                    aria-hidden
                    className="absolute w-[185%] h-[60%] rounded-full z-0"
                    style={{
                        background: `
                            radial-gradient(ellipse at center,
                                transparent 40%,
                                rgba(168,151,115,0.32) 44%,
                                rgba(168,151,115,0.22) 48%,
                                rgba(168,151,115,0.16) 52%,
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

                {/* Layer 3: The Planet */}
                <div className="absolute inset-0 rounded-full bg-black overflow-hidden shadow-2xl shadow-black/50 z-20">
                    {/* surface gradient tint */}
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(ellipse farthest-corner at 30% 30%, rgba(42,56,84,0.16) 0%, rgba(0,0,0,0) 60%),
                                             radial-gradient(circle at 60% 70%, rgba(168,151,115,0.10) 0%, rgba(0,0,0,0) 55%)`
                        }} />
                    {/* limb darkening */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_140px_50px_rgba(0,0,0,0.9)]" />
                </div>

                {/* Layer 3.5: Occluder to prevent ring visibility through planet */}
                <div className="absolute inset-0 rounded-full z-35 bg-black" />

                {/* Layer 4: The Front Ring (Masked) */}
                <div
                    aria-hidden
                    className="absolute w-[185%] h-[60%] rounded-full z-30"
                    style={{
                        background: `
                            radial-gradient(ellipse at center,
                                transparent 40%,
                                rgba(168,151,115,0.38) 44%,
                                rgba(168,151,115,0.28) 48%,
                                rgba(168,151,115,0.20) 52%,
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
                <div className="relative z-40 w-full h-full flex items-center justify-center text-center">
                    <div className="max-w-xs sm:max-w-sm md:max-w-md">
                        <motion.h2
                            className={`text-4xl sm:text-5xl md:text-6xl font-black ${MoonlanderFont.className} mb-14 leading-tight`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className="text-[#f5f5f5]">Ready<br /></span>
                            <span style={{ color: prKhaki }}>Your<br />Mission!</span>
                        </motion.h2>

                        {/* [MODIFIED] Applied MoonlanderFont and increased bottom margin */}
                        <motion.p
                            className={`text-base sm:text-lg text-white/80 leading-relaxed mx-auto mb-8 ${MoonlanderFont.className}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            Let&apos;s engineer your brand&apos;s success across the digital universe.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                <Link href='/contact' className='inline-flex items-center rounded-2xl px-8 py-4 text-base sm:text-lg font-bold text-black transition-all duration-300'
                                    style={{ backgroundColor: prKhaki, boxShadow: `0 0 30px -5px ${prKhaki}60` }}>
                                    Contact Us <span className='ml-3 text-xl'>&rarr;</span>
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                                <Link href='/works' className='inline-flex items-center rounded-2xl border-2 px-8 py-4 text-base sm:text-lg font-bold transition-all duration-300 hover:bg-white/5'
                                    style={{ borderColor: prKhaki, color: prKhaki }}>
                                    View Our Works <span className='ml-3 text-xl'>&rarr;</span>
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