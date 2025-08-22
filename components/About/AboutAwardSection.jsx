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
            // THE CHANGE: The container is now fully transparent, inheriting the parent background.
            className='relative h-full'
        >
            {/* The content itself now has the padding */}
            <div className='relative z-10 flex h-full flex-col p-8'>
                <h3 className='text-3xl font-semibold text-[#96875A]'>
                    Trusted by Leading Brands
                </h3>
                <p className='mt-4 text-gray-300 leading-relaxed text-lg'>
                    We’ve collaborated with industry leaders who value results. Their trust reflects our commitment to delivering strategies that stand out.
                </p>

                <div className='my-6 flex-grow flex items-center'>
                    <Image
                        src="/LandingPageAssets/brands2.webp"
                        alt="A collage of logos from brands Prometheus has partnered with"
                        width={800}
                        height={400}
                        className="w-full h-auto object-contain"
                    />
                </div>

                <div className='mt-auto'>
                    <div className="flex justify-center mt-6">
                        <Link
                            href='/contact'
                            className='inline-flex items-center rounded-lg bg-[#96875A] px-6 py-3 text-lg font-bold font-mono text-black shadow-lg shadow-[#96875A]/30 transition-all duration-300 hover:bg-[#8a7c54] hover:scale-105'
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