import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const StarshipContactModule = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='bg-black/50 rounded-lg p-6 md:p-8 shadow-lg border border-[#96875A]/50 backdrop-blur-sm'
    >
      <div className='text-white space-y-6'>
        <div className='flex items-center space-x-4'>
          <div className='w-2 h-8 bg-[#96875A] rounded-full'></div>
          <h3 className='text-2xl font-bold text-[#96875A] tracking-wider font-ox'>
            ESTABLISH COMMUNICATION
          </h3>
        </div>

        <p className='text-gray-300 leading-relaxed font-sans'>
          Explore the fleet of successful campaigns at the{' '}
          <a
            href='https://www.prometheus.ph/works'
            className='text-[#96875A] hover:text-[#B19B6A] font-medium transition-colors duration-200 underline underline-offset-4'
          >
            Prometheus Mission Hub
          </a>
          . Each operation is powered by a bespoke strategy, engineered for stellar results.
        </p>

        <p className='text-gray-300 leading-relaxed font-sans'>
          Maintain contact with Prometheus Command by following our official channels on{' '}
          <a
            href='https://www.facebook.com/PrometheusPr'
            className='text-[#96875A] hover:text-[#B19B6A] font-medium transition-colors duration-200'
            target='_blank'
            rel='noopener noreferrer'
          >
            Facebook
          </a>{' '}
          and{' '}
          <a
            href='https://www.linkedin.com/company/prometheusph/'
            className='text-[#96875A] hover:text-[#B19B6A] font-medium transition-colors duration-200'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
          .
        </p>
        
        <div className='border-t border-[#96875A]/30 pt-6'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm uppercase tracking-widest'>Direct Transmission:</p>
              <a
                href='mailto:marketing@prometheus.ph'
                className='text-lg text-[#96875A] hover:text-[#B19B6A] font-medium transition-colors duration-200'
              >
                marketing@prometheus.ph
              </a>
            </div>

            <Link href='/contact'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='inline-flex items-center px-8 py-3 bg-[#96875A] hover:bg-[#B19B6A] text-black font-bold text-lg rounded-md transition-all duration-200 shadow-lg shadow-[#96875A]/20'
              >
                <span>OPEN COMMS</span>
                <svg
                  className='ml-3 w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5-5 5M6 7l5 5-5 5' />
                </svg>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StarshipContactModule;