"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutAwardsContact = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            // Reduced padding to give more space to the image
            className='relative h-full p-4 md:p-6 lg:p-8'
        >
            <div className='relative z-10 flex h-full flex-col text-center items-center'>
                {/* 1. The text is now centered and has a max-width to keep lines readable */}
                <div className='max-w-4xl mb-6'>
                    <h3 className='text-3xl lg:text-4xl font-semibold text-[#96875A]'>
                        Trusted by Leading Brands
                    </h3>
                    <p className='mt-4 text-gray-300 leading-relaxed text-lg'>
                        We&apos;ve collaborated with industry leaders who value results. Their trust reflects our commitment to delivering strategies that stand out.
                    </p>
                </div>

                {/* 2. The image container now takes up most of the available space */}
                <div className='w-full flex-grow flex items-center justify-center mb-6'>
                    <Image
                        src="/LandingPageAssets/brands2.webp"
                        alt="A collage of logos from brands Prometheus has partnered with"
                        // 3. Increased the base resolution significantly for better quality
                        width={1600}
                        height={800}
                        // 4. Added back a reasonable max-width to maintain layout balance
                        className="w-full h-auto object-contain max-w-5xl"
                    />
                </div>

                {/* The button stays at the bottom */}
                <div className='mt-auto'>
                    <div className="flex justify-center">
                        <Link
                            href='/contact'
                            className='inline-flex items-center rounded-lg bg-gradient-to-r from-[#96875A] to-[#B19B6A] px-8 py-4 text-lg font-bold text-black shadow-lg shadow-[#96875A]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl'
                        >
                            <span>Partner with us</span>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutAwardsContact;