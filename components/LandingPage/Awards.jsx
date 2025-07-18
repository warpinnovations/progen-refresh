"use client";

import { AnimatePresence, easeIn, easeInOut, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
import Image from 'next/image';
import { useState, useEffect, useRef, useLayoutEffect} from 'react';

const MoonlanderFont = localFont({src:'../../Fonts/Moonlander.ttf'});

const awarditems = [
    {   
        id: 1,
        title: 'FINALIST1',
        category: 'MARKETING EXCELLENCE AWARDS',  
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/planets/medal.png',
    },
    {
        id: 2, 
        title: 'FINALIST2',
        category: 'MARKETING EXCELLENCE AWARDS',
        planetimg: '/LandingPageAssets/planets/planet2.png',
        awardimg: '/LandingPageAssets/planets/medal.png',
    },
    {
        id: 3, 
        title: 'FINALIST3',
        category: 'MARKETING EXCELLENCE AWARDS',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/planets/medal.png',
    },
];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.1,
    }),
    center: {
        zIndex: 1,
        x: 100,
        opacity: 1,
        scale: 1.5,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.1,
    }),
};

const Awards = () => {
    const [[currentIndex, direction], setIndex] = useState([0,0]);
    
    const paginate = (newDirection) => {
        setIndex([ (currentIndex + newDirection + awarditems.length) % awarditems.length, newDirection]);
    };

    useEffect(() => {
        const intervalId = setInterval(() => { 
            const nextDirection = direction === 0 ? 1 : direction;
            paginate(nextDirection); 
        }, 10000);
        return () => clearInterval(intervalId);
    
    }, [currentIndex, direction]);
    if (!awarditems) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 1.3 },
        },
    };

    const characterVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: { 
                duration: 1.5, ease: "easeInOut",
                },
            },
        };

    return (
        <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/LandingPageAssets/awardsbg.png')]">
            <div className='z-50'>
                <h1 className={`${MoonlanderFont.className} text-center font-black justify-center text-md md:text-4xl text-prOrange mb-20`}>AWARDS</h1>
                <div className='relative w-full h-[500px] flex items-center justify-center overflow-hidden '>
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-full w-12 items-center justify-center rounded-full text-opacity-50 text-white text-2xl backdrop-blur-sm transition-all hover:bg-gradient-to-bl from-white/0 to-white/10 "
                        aria-label="Previous slide"
                    >
                        ❮
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-full w-12 items-center justify-center rounded-full text-opacity-50 text-white text-2xl backdrop-blur-sm transition-all hover:bg-gradient-to-br from-white/0 to-white/10"
                        aria-label="Next slide"
                    >
                        ❯
                    </button>


                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                duration: 1, ease: "easeInOut", delay: 0.5
                            }}
                        >
                            <div className='relative flex flex-col z-10 md:flex-row items-center pl-[130px]'>
                                <motion.div
                                    key={awarditems[currentIndex].awardimg}
                                    initial={{ opacity: 0, y: 20 * direction}}
                                    animate={{ opacity: 1, y: 0}}
                                    transition={{
                                        duration: 0.9,
                                        ease: 'easeInOut',
                                        delay: 1,
                                    }}
                                >
                                    <Image
                                        src={awarditems[currentIndex].awardimg}
                                        alt={awarditems[currentIndex].title}
                                        height={100}
                                        width={100}
                                        className='absolute drop-shadow-lg top-[70px] left-0'
                                    />
                                </motion.div>
                                <motion.div
                                    className="absolute left-[91px] top-[120px] z-10 w-[130px] h-[2px] bg-[#DAAF5B] rounded-full rotate-45 origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, ease: "easeInOut", delay: 2.5 }}
                                    />
                                
                                <Image
                                    src={awarditems[currentIndex].planetimg}
                                    alt={awarditems[currentIndex].title}
                                    height={300}
                                    width={300}
                                    className='drop-shadow-lg p-0 m-0'
                                />    
                        
                                <div className='text-white text-center md:text-left w-full md:w-80'>
                                    <motion.h3
                                        key={awarditems[currentIndex].title}
                                        className='text-4xl font-thin tracking-widest uppercase mb-4 h-16 flex items-center justify-center md:justify-start'
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {awarditems[currentIndex].title.split('').map((char, index) => (
                                            <motion.span
                                                key={index}
                                                variants={characterVariants}
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </motion.span>
                                        ))}
                                    </motion.h3>
                                    <motion.h4
                                        key={awarditems[currentIndex].category}
                                        initial={{ opacity: 0, y: 20 * direction}}
                                        animate={{ opacity: 1, y: 0}}
                                        exit={{ opacity: 0, y: 0}}
                                        transition={{
                                            duration: 0.8,
                                            ease: 'easeInOut',
                                            delay: 1.5,
                                        }}
                                        className='text-3xl text-[#DAAF5B] font-semibold'
                                    >
                                        {awarditems[currentIndex].category}
                                    </motion.h4>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}

export default Awards;