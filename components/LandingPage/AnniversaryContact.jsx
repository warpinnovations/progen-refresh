"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AnniversaryContact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className='rounded-lg p-10 border border-[#96875A]/50 h-full flex flex-col justify-center backdrop-blur-md shadow-[inset_0_0_15px_0_rgba(150,135,90,0.15)]'
        >
            <div className='text-white flex flex-col'>
                {/* Main Content Area */}
                <div className="space-y-5">
                    <h3 className='text-3xl font-semibold text-[#96875A]'>
                        Ready for Your Next Mission?
                    </h3>

                    <p className='text-gray-300 leading-relaxed text-lg'>
                        Inspired by our journey? Let&apos;s engineer your brand&apos;s success together. We combine meticulously crafted strategy with creative innovation to achieve stellar results.
                    </p>
                </div>

                <hr className="my-8 border-t border-[#96875A]/20" />

                {/* Call to Action Area - NOW FULLY RESPONSIVE */}
                <div className='flex flex-wrap justify-between items-center gap-x-6'>

                    {/* Vertically stacked text on the left */}
                    <div className='flex flex-col'>
                        <p className='text-gray-400 text-sm'>
                            Reach us at:
                        </p>
                        <a
                            href='mailto:marketing@prometheus.ph'
                            className='text-[#96875A] hover:text-[#B19B6A] hover:underline transition-colors'
                        >
                            marketing@prometheus.ph
                        </a>
                    </div>

                    {/* Button on the right, now wraps on mobile */}
                    <Link
                        href='/contact'
                        // THE FIX: ml-auto is removed, parent has flex-wrap, and a responsive margin is added.
                        className='mt-4 md:mt-0 flex items-center justify-center bg-[#96875A] text-black font-mono font-bold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#8a7c54] hover:scale-105 shadow-lg'
                    >
                        Contact Us
                        <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' viewBox='o 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default AnniversaryContact;