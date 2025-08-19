// ./components/About/AboutContactSection.js

"use client"; // <--- ADD THIS LINE AT THE VERY TOP

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineMail } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutContactSection = () => {
  return (
    <div className='relative z-10 py-16 px-6'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-black/40 p-8 shadow-2xl backdrop-blur-md md:p-10'
      >
        {/* Decorative background glow */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-[#96875A]/20 to-transparent blur-3xl'></div>

        <div className='relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row'>
          {/* Left Side: Text and Social Links */}
          <div className='text-center text-white md:text-left'>
            <h2 className='text-3xl font-bold text-[#96875A] md:text-4xl'>
              Ready to Ignite Your Brand?
            </h2>
            <p className='mt-2 text-gray-300 leading-relaxed'>
              Discover the campaigns of{' '}
              <a
                href='https://www.prometheus.ph/works'
                className='text-[#96875A] hover:text-[#B19B6A] hover:underline font-medium transition-colors duration-200'
              >
                Prometheus
              </a>{' '}
              where every execution is fueled by a meticulously crafted strategy tailored for each
              client.
            </p>

            <p className='mt-2 text-gray-300 leading-relaxed'>
              To learn more about Prometheus, follow our official pages on{' '}
              <a
                href='https://www.facebook.com/PrometheusPr'
                className='text-[#96875A] hover:text-[#B19B6A] hover:underline font-medium transition-colors duration-200'
                target='_blank'
                rel='noopener noreferrer'
              >
                Facebook
              </a>{' '}
              and{' '}
              <a
                href='https://www.linkedin.com/company/prometheusph/'
                className='text-[#96875A] hover:text-[#B19B6A] hover:underline font-medium transition-colors duration-200'
                target='_blank'
                rel='noopener noreferrer'
              >
                LinkedIn
              </a>
              .
            </p>

            <div className='mt-4'>
              <p className='text-gray-300 leading-relaxed'>
                Reach us via email at:{' '}
                <a
                  href='mailto:marketing@prometheus.ph'
                  className='text-[#96875A] hover:text-[#B19B6A] hover:underline font-medium transition-colors duration-200'
                >
                  marketing@prometheus.ph
                </a>
              </p>
            </div>
            <div className='mt-6 flex items-center justify-center gap-5 md:justify-start'>
              <a href='mailto:marketing@prometheus.ph' aria-label='Email' className='group'>
                <HiOutlineMail className='h-6 w-6 text-gray-400 transition-colors group-hover:text-[#B19B6A]' />
              </a>
              <a
                href='https://www.facebook.com/PrometheusPr'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
                className='group'
              >
                <FaFacebookF className='h-6 w-6 text-gray-400 transition-colors group-hover:text-[#B19B6A]' />
              </a>
              <a
                href='https://www.linkedin.com/company/prometheusph/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
                className='group'
              >
                <FaLinkedinIn className='h-6 w-6 text-gray-400 transition-colors group-hover:text-[#B19B6A]' />
              </a>
            </div>
          </div>

          {/* Right Side: The Main CTA Button */}
          <div className='flex-shrink-0'>
            <Link
              href='/contact'
              className='inline-flex items-center rounded-lg bg-gradient-to-r from-[#96875A] to-[#B19B6A] px-8 py-4 text-lg font-bold text-black shadow-lg shadow-[#96875A]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl'
            >
              <span>Contact Us</span>
              <HiOutlineArrowRight className='ml-3 h-6 w-6' />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutContactSection;