"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AnniversaryContact = () => {
    return (
        // --- REDESIGNED CARD CONTAINER ---
        // It's wider, uses a more subtle blur and border, and aligns text to the left.
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className='w-full max-w-3xl rounded-2xl p-8 md:p-10 border border-[#96875A]/20 bg-black/20 backdrop-blur-lg text-left'
        >
            <div className='flex flex-col text-white'>

                {/* Main Content Area */}
                <div className="space-y-4">
                    <h3 className='text-2xl md:text-3xl font-semibold text-[#96875A]'>
                        Ready for Your Next Mission?
                    </h3>
                    <p className='text-gray-300 leading-relaxed max-w-2xl'>
                        Let&apos;s engineer your brand&apos;s success together. We combine meticulously crafted strategy with creative innovation to achieve stellar results.
                    </p>
                </div>

                {/* A more subtle separator line */}
                <hr className="my-6 border-t border-[#96875A]/25" />

                {/* --- NEW VERTICAL CTA LAYOUT --- */}
                {/* This section now stacks the elements for a cleaner look */}
                <div className='flex flex-col items-start gap-y-5'>

                    {/* --- REDESIGNED BUTTON --- */}
                    {/* The button is now flat, more subtle, and matches the image perfectly. */}
                    <Link
                        href='/contact'
                        className='inline-flex items-center rounded-md bg-[#A89773] px-6 py-3 text-base font-semibold text-black transition-colors hover:bg-[#B19B6A]'
                    >
                        Contact Us
                        <span className='ml-2 font-light'>&gt;</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default AnniversaryContact;