"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineMail } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaTrophy, FaAward, FaBuilding, FaStar, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';


// --- Data for the Milestones Timeline ---
const milestonesData = [
  {
    year: '2018',
    title: 'WARP Technologies Founded',
    description: 'Started with three co-founders in a small office in Makati City.',
  },
  {
    year: '2019',
    title: 'First Major Client',
    description: 'Secured partnership with a leading telecom company for an IoT solution.',
  },
  {
    year: '2020',
    title: 'Team Expansion',
    description: 'Grew to a team of 10 and moved to our current office in BGC.',
  },
  {
    year: '2021',
    title: 'First International Client',
    description: 'Expanded our reach with projects in Singapore and the United States.',
  },
  {
    year: '2022',
    title: 'First Tech Patent',
    description: 'Secured patent for our innovative AR-based training platform.',
  },
  {
    year: '2023',
    title: 'Recognition & Growth',
    description: 'Named one of the Top 10 Most Innovative Companies in the Philippines.',
  },
];

// --- Data for the Awards & Recognition Section ---
const awardsData = [
  {
    icon: <FaTrophy />,
    title: 'Philippine Technology Excellence Award',
    description: 'For innovation in AR/VR solutions, 2022',
  },
  {
    icon: <FaAward />,
    title: 'ASEAN Business Innovation Award',
    description: 'Finalist for our HomeWARP IoT platform, 2021',
  },
  {
    icon: <FaBuilding />,
    title: 'Top 10 Most Innovative Companies',
    description: 'Philippine Business Magazine, 2023',
  },
  {
    icon: <FaStar />,
    title: 'Best Workplace in Tech',
    description: 'HR Asia Awards, 2022',
  },
  {
    icon: <FaLightbulb />,
    title: 'Innovation in Education Technology',
    description: 'EdTech Asia Summit, 2023',
  },
];

// --- THE RESTYLED MILESTONES SECTION ---
const MilestonesSection = () => {
  return (
    // REMOVED bg-white to let the page background show through
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Restyled "Our Impact" tag for a dark theme */}
        <span className="text-sm font-semibold text-[#B19B6A] bg-[#96875A]/20 rounded-full px-4 py-1">
          Our Impact
        </span>
        {/* Changed text colors to be light */}
        <h2 className="text-4xl font-bold text-white mt-4">Milestones & Achievements</h2>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
          Our journey has been marked by continuous growth, innovation, and recognition.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left Side: Timeline */}
        <div className="lg:col-span-3">
          {/* Restyled timeline border for dark theme */}
          <div className="relative border-l-2 border-[#96875A]/30 pl-8">
            {milestonesData.map((item, index) => (
              <motion.div
                key={index}
                className="mb-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Restyled timeline dot */}
                <div className="absolute -left-3.5 mt-1.5 w-6 h-6 bg-[#96875A] rounded-full border-4 border-gray-900"></div>
                <p className="text-sm font-semibold text-[#B19B6A]">{item.year}</p>
                <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                <p className="text-gray-300 mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Awards Card */}
        <div className="lg:col-span-2">
          {/* Restyled card to match the dark, blurred look of the contact section */}
          <motion.div
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-white text-left">Awards & Recognition</h3>
            <div className="mt-6 space-y-6">
              {awardsData.map((award, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Restyled icon background */}
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#96875A]/20 text-[#B19B6A] rounded-lg text-xl">
                    {award.icon}
                  </div>
                  <div className="ml-4 text-left">
                    <h4 className="font-bold text-white">{award.title}</h4>
                    <p className="text-sm text-gray-400">{award.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const AboutContactSection = () => {
  return (
    <>
      {/* The Milestones Section is now correctly styled for your page */}
      <MilestonesSection />

      {/* Your Existing Contact Section (no changes needed here) */}
      <div className='relative z-10 py-16 px-6'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-black/40 p-8 shadow-2xl backdrop-blur-md md:p-10'
        >
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-[#96875A]/20 to-transparent blur-3xl'></div>

          <div className='relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row'>
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
    </>
  );
};

export default AboutContactSection;