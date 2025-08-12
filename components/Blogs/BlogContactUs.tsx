import React from 'react';
import Link from 'next/link';

const BlogContactUs = () => {
  return (
    <div className='bg-black rounded-lg p-6 shadow-lg border border-[#96875A] lg:ml-auto lg:mr-0'>
      <div className='text-white space-y-4'>
        <h3 className='text-xl font-semibold text-[#96875A] mb-4'>Get in Touch</h3>

        <p className='text-gray-300 leading-relaxed'>
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

        <p className='text-gray-300 leading-relaxed'>
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

        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2'>
          <div className='flex-1'>
            <p className='text-gray-300'>
              Reach us via email at:{' '}
              <a
                href='mailto:marketing@prometheus.ph'
                className='text-[#96875A] hover:text-[#B19B6A] hover:underline font-medium transition-colors duration-200'
              >
                marketing@prometheus.ph
              </a>
            </p>
          </div>

          <Link
            href='/contact'
            className='inline-flex items-center px-6 py-3 bg-[#96875A] hover:bg-[#B19B6A] text-black font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
          >
            Contact Us
            <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogContactUs;
