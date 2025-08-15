'use client';
import React from 'react';
import StarsCanvas from '../Global/StarCanvas';
import StoryTellers from './StoryTellers';
import { Oxanium } from 'next/font/google';
import localFont from 'next/font/local';
import CardSection from '@/components/LandingPage/ProminentCardSection';
import ProminentSection from './ProminentSection';
const OxaniumFont = Oxanium({ weights: 100, subsets: ['latin'] });
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

const StarshipCaptains = () => {
  return (
    <div className='flex flex-col items-center justify-center relative'>
      <div className='absolute inset-0 z-0 h-auto'>
        <div className='h-screen w-full relative'>
          <img
            src='/LandingPageAssets/milkyway.webp'
            className='h-full w-full object-cover'
            alt=''
          />
          <div className='absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black opacity-90' />
        </div>
      </div>

      <div className='absolute inset-0 z-0 h-auto'>
        <img src='/LandingPageAssets/galaxybg.webp' className='h-full w-full object-cover' />
        <div className='absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black opacity-90' />
      </div>

      <div className='w-3/5 mb-52 mt-52 z-10'>
        <h1 className={`text-xl md:text-4xl ${OxaniumFont.className} text-white text-center`}>
          To forever chase excellence with curiosity as our guide.
        </h1>
      </div>

      <div className='w-full text-center z-10'>
        <h1 className={`${MoonlanderFont.className} font-black text-xl md:text-5xl text-prOrange`}>
          MEET OUR STARSHIP CAPTAINS
        </h1>

        <StoryTellers />
      </div>

      {/* <div className='w-3/5 text-center z-10 mt-40 mb-10'>
        <h1 className={`${MoonlanderFont.className} font-black text-xl md:text-4xl text-prOrange`}>
          CERTIFICATION AND AWARDS
        </h1>
      </div>
      <div className='flex flex-col gap-5 items-center z-10'>
        <div className='relative flex flex-col justify-center items-center text-center space-y-10 md:space-y-0 md:flex-row md:space-x-20 mt-10 mb-20'>
          <div className='flex flex-row flex-wrap items-center justify-center'>
            <img
              src='/LandingPageAssets/certificates/certificate-05.webp'
              className='h-32 md:h-44 mx-3 my-3 border-2 border-customOrange rounded-lg'
              alt=''
              style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            />
            <img
              src='/LandingPageAssets/certificates/certificate-02.webp'
              className='h-32 md:h-44 mx-3 my-3 border-2 border-customOrange rounded-lg'
              alt=''
              style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            />
            <img
              src='/LandingPageAssets/certificates/certificate-01.webp'
              className='h-32 md:h-44 mx-3 my-3  border-2 border-customOrange rounded-lg'
              alt=''
              style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            />

            <img
              src='/LandingPageAssets/certificates/certificate-03.webp'
              className='h-32 md:h-44 mx-3 my-3  border-2 border-customOrange rounded-lg'
              alt=''
              style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            />
            <img
              src='/LandingPageAssets/certificates/certificate-04.webp'
              className='h-32 md:h-44 mx-3 my-3  border-2 border-customOrange rounded-lg'
              alt=''
              style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            />
            <img
              src='/LandingPageAssets/certificates/certificate-06.webp'
              className='h-32 md:h-44 mx-3 my-3  border-2 border-customOrange rounded-lg'
              alt=''
              style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            />
          </div>
        </div>
        <div>
          <ProminentSection/>
        </div>
        
      </div> */}
    </div>
  );
};

export default StarshipCaptains;
