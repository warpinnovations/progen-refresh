'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import backgroundImage from '../../public/awards-background.png';
import interstellarLogo from '../../public/interstellar-logo.png';

export default function InterstellarPage() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (starsRef.current) {
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const brightness = Math.random() * 0.7 + 0.05;
        const shadow = Math.random() * 3 + 0.1;
        star.className = 'star';
        star.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              background: rgba(255, 255, 255, ${brightness});
              border-radius: 50%;
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              animation: twinkle ${Math.random() * 3 + 2}s infinite;
              animation-delay: ${Math.random() * 3}s;
              box-shadow: 0 0 ${shadow}px rgba(255, 255, 255, ${brightness});
              `;
        starsRef.current.appendChild(star);
      }
    }
  }, []);

  return (
    <div
      className='relative min-h-screen w-full text-gray-100 overflow-hidden flex items-center justify-center opacity-100 transition-opacity duration-700'
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div ref={starsRef} className='absolute inset-0 pointer-events-none z-10' />

      <div className='absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.15)_0%,transparent_50%)]' />
      <div className='w-full flex justify-center animate-fadeIn'>
        <Image
          src={interstellarLogo}
          alt='Loading...'
          width={350}
          height={350}
          className='animate-pulse-scale'
          priority
        />
      </div>
    </div>
  );
}
