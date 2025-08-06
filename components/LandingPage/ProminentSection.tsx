"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

// Import the SVG icon components
import IconInsights from './icons/IconInsights';
import IconIntegration from './icons/IconIntegration';
import IconDashboards from './icons/IconDashboards';

const animatedWords = ['Transform', 'Simplify', 'Optimize', 'Enhance'];

const features = [
  {
    title: 'Instant Data Insights',
    description: 'Make informed decisions with our up-to-the-minute analytics, keeping your business agile and competitive.',
    icon: IconInsights, 
  },
  {
    title: 'Seamless Integration',
    description: 'Effortlessly integrate with existing systems, ensuring smooth data flow and operational continuity.',
    icon: IconIntegration,
  },
  {
    title: 'Customizable Dashboards',
    description: 'Personalize dashboards to display relevant data and metrics tailored to your business needs.',
    icon: IconDashboards,
  },
];

const ProminentSection = () => {
  const [wordIndex, setWordIndex] = useState(0);       // Index of the animated word currently shown
  const [ghostIndex, setGhostIndex] = useState(0);     // Slightly delayed index for invisible "ghost" text (stabilizes layout)

  const controls = useAnimation();                     // Framer Motion animation controller for triggering animations
  const sectionRef = useRef(null);                     // Ref for scroll-based visibility detection
  const inView = useInView(sectionRef, { once: true, amount: 0.3 }); // True when section is 30% visible
  const [isPageVisible, setIsPageVisible] = useState(true); // Tracks if tab is active
  const timerRef = useRef<NodeJS.Timeout | null>(null);      // Ref to the interval timer for word switching

  // Trigger slide-in animations when section scrolls into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Update visibility state based on browser tab focus
  useEffect(() => {
    const handleVisibilityChange = () => setIsPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  
  // Main loop for switching words
  useEffect(() => {
    if (isPageVisible) {
      const cycleWords = () => {
        setWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length); // Next word
      };
      timerRef.current = setInterval(cycleWords, 3000); // 3 second interval
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Cleanup timer on tab hide/unmount
      }
    };
  }, [isPageVisible]);
  
  // Delays the update of the ghost element, fixing the overlap of animated word and static text.
  useEffect(() => {
    const ghostTimer = setTimeout(() => {
      setGhostIndex(wordIndex);
    }, 100); // 100ms
    return () => clearTimeout(ghostTimer);
  }, [wordIndex]);

  const leftColumnVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };

  const rightColumnVariants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };

  return (
    <section className="bg-black text-white w-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={sectionRef} className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">

          {/* Left Column */}
          <motion.div
            variants={leftColumnVariants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:pt-4 lg:pr-8"
          >
            <div className="lg:max-w-lg flex flex-col items-center lg:items-start">

              {/* Animated words and static "Your Business" */}
              <motion.div 
                layout 
                className="flex items-center justify-center lg:justify-start font-semibold tracking-wider uppercase text-gray-300 text-center lg:text-left h-7"
              >
                <div className="relative">
                  {/* Invisible ghost word stabilizes layout height, updates 100ms after wordIndex */}
                  <span className="opacity-0">{animatedWords[ghostIndex]}</span>

                  {/* Animated word */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={animatedWords[wordIndex]} // Forces exit/enter animation on word change
                      initial={{ opacity: 0, y: 20 }}  // Slide up from below
                      animate={{ opacity: 1, y: 0 }}   // Fade/slide in
                      exit={{ opacity: 0, y: -20 }}    // Fade/slide out upward
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute left-0 top-0 text-[#ff9e00]"
                    >
                      {animatedWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span> Your Business</span> {/* Static text */}
              </motion.div>

              {/* Logo */}
              <h1 className="mt-1">
                <Image 
                  src="/LandingPageAssets/prominent-logo.png"
                  alt="The Prominent"
                  width={3703}
                  height={1019}
                  className="w-[280px] sm:w-[300px] h-auto"
                  priority
                />
                <span className="sr-only">The Prominent</span>
              </h1>

              {/* Feature List */}
              <ul className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none text-left">
                {features.map((feature) => {
                    const IconComponent = feature.icon; 
                    return (
                        <li key={feature.title} className="relative pl-9">
                            <div className="absolute top-1 left-0 flex h-6 w-6 items-center justify-center text-white">
                                <IconComponent className="h-full w-full" />
                            </div>
                            <p className="inline">
                            <strong className="font-semibold text-[#ff9e00]">{feature.title}.</strong> {feature.description}
                            </p>
                        </li>
                    );
                })}
              </ul>

              {/* CTA Button */}
              <div className="mt-10 flex justify-center lg:justify-start">
                 <a
                  href="https://theprominent.ph/"
                  className="inline-block text-center text-white font-bold rounded-lg h-14 min-w-[160px] px-8 text-lg leading-[56px] bg-gradient-to-r from-purple-500 to-purple-700 transition duration-300 ease-in-out hover:from-purple-700 hover:to-purple-900 hover:scale-105"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Dashboard Image) */}
          <motion.div
            variants={rightColumnVariants}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-[48rem] max-w-none rounded-3xl shadow-[-40px_0_80px_-30px_rgba(241,100,243,1),0_0_50px_-20px_rgba(241,100,243,0.4)] sm:w-[57rem] md:-ml-4 lg:w-[48rem] lg:-ml-0 xl:w-[57rem] p-4 sm:p-6 bg-black border border-white/10"
          >
              <Image
                src="/LandingPageAssets/prominent-dashboard.png"
                alt="A screenshot of The Prominent's feature-rich product dashboard."
                width={1500}
                height={1022}
                className="w-full h-auto rounded-xl"
                priority
              />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProminentSection;