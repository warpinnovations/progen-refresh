"use client";

import { AnimatePresence, motion } from 'framer-motion';
import localFont from 'next/font/local';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';

const MoonlanderFont = localFont({src:'../../Fonts/Moonlander.ttf'});

const awarditems = [
    {   
        id: 1,
        title: 'FINALIST',
        category: 'BEST EXPERIMENTAL CAMPAIGN',  
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/pr-awards-2025.png',
    },
    {
        id: 2, 
        title: 'SILVER AWARD',
        category: 'EXCELLENCE IN URBAN GUERRILLA MARKETING',
        planetimg: '/LandingPageAssets/planets/planet2.png',
        awardimg: '/LandingPageAssets/awards/medal.png',
    },
    {
        id: 3, 
        title: 'SILVER AWARD',
        category: 'EXCELLENCE IN ANNIVERSARY MARKETING',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/medal.png',
    },
    {
        id: 4, 
        title: 'FINALIST',
        category: 'EXCELLENCE IN RELATIONSHIP MARKETING',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/medal.png',
    },
    {
        id: 5, 
        title: 'SILVER ANVIL',
        category: 'PR TOOLS - SPECIAL EVENTS',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/anvil-awards.png',
    },
    {
        id: 6, 
        title: 'SILVER ANVIL',
        category: 'BEST PR-LED INTEGRATED CAMPAIGN',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/anvil-awards.png',
    },
    {
        id: 7, 
        title: 'FINALIST',
        category: 'EXCELLENCE IN PUBLIC SECTOR MARKETING',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/medal.png',
    },
    {
        id: 8, 
        title: 'MARKETING LEADER OF THE YEAR',
        category: 'LCID CRESCENT FERNANDEZ',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/medal.png',
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
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.1,
    }),
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.5 },
    },
};

const characterVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
    },
};

const Awards = () => {
    const [[currentIndex, direction], setIndex] = useState([0,0]);
    
    const paginate = useCallback((newDirection) => {
        setIndex([(currentIndex + newDirection + awarditems.length) % awarditems.length, newDirection]);
    }, [currentIndex]);

    useEffect(() => {
        const intervalId = setInterval(() => { 
            const nextDirection = direction === 0 ? 1 : direction;
            paginate(nextDirection); 
        }, 10000);
        return () => clearInterval(intervalId);
    }, [direction, paginate]);

    const currentAward = useMemo(() => awarditems[currentIndex], [currentIndex]);
    const isAnvilImage = useMemo(() => currentAward.awardimg.includes('anvil-awards'), [currentAward.awardimg]);

    if (!awarditems.length) {
        return null;
    }

    return (
        <main className="min-h-120vh md:min-h-90vh bg-cover bg-center bg-no-repeat bg-[url('/LandingPageAssets/awardsbg.png')] py-40">
            <div className='z-50'>
                <h1 className={`${MoonlanderFont.className} text-center font-black justify-center text-xl md:text-4xl text-prOrange md:mb-20`}>AWARDS</h1>
                <div className='relative w-full h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden md:pb-80'>
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-full w-12 items-center justify-center rounded-full text-opacity-10 hover:text-opacity-100 text-white text-2xl transition-all hover:bg-gradient-to-bl from-white/0 to-white/10"
                        aria-label="Previous slide"
                    >
                        ❮
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-full w-12 items-center justify-center rounded-full text-opacity-10 hover:text-opacity-100 text-white text-2xl transition-all hover:bg-gradient-to-br from-white/0 to-white/10"
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
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                            className="absolute w-full h-full"
                        >
                            <div className='w-full h-full flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8 lg:gap-12 px-6 max-w-7xl mx-auto'>
                                <div className='flex items-center justify-center gap-4 md:contents'>
                                    {/* awardimage */}
                                    <motion.div
                                        key={currentAward.awardimg}
                                        initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
                                        animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)'}}
                                        transition={{
                                            duration: 0.8,
                                            ease: 'easeInOut',
                                            delay: 0.3,
                                        }}
                                        className='md:order-1'
                                    >

                                        <Image
                                            src={currentAward.awardimg}
                                            alt={currentAward.title}
                                            height={300}
                                            width={300}
                                            priority={currentIndex < 2}
                                        />
                                    </motion.div>
                                    
                                    <div className='order-2 flex flex-col text-left md:order-3'>
                                        <motion.h3
                                            key={currentAward.title}
                                            className='text-xl text-white md:text-4xl lg:text-6xl font-thin tracking-widest uppercase'
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {currentAward.title === 'MARKETING LEADER OF THE YEAR' ? (
                                                <>
                                                    <div>
                                                        {currentAward.title.split(' ').slice(0, 2).join(' ').split('').map((char, index) => (
                                                            <motion.span
                                                                key={index}
                                                                variants={characterVariants}
                                                            >
                                                                {char === ' ' ? '\u00A0' : char}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2">
                                                        {currentAward.title.split(' ').slice(2).join(' ').split('').map((char, index) => (
                                                            <motion.span
                                                                key={index + 1000}
                                                                variants={characterVariants}
                                                            >
                                                                {char === ' ' ? '\u00A0' : char}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                currentAward.title.split('').map((char, index) => (
                                                    <motion.span
                                                        key={index}
                                                        variants={characterVariants}
                                                    >
                                                        {char === ' ' ? '\u00A0' : char}
                                                    </motion.span>
                                                ))
                                            )}
                                        </motion.h3>
                                        <motion.h4
                                            key={currentAward.category}
                                            initial={{ opacity: 0, y: 20 * direction}}
                                            animate={{ opacity: 1, y: 0}}
                                            exit={{ opacity: 0, y: 0}}
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeInOut',
                                                delay: 0.3,
                                            }}
                                            className='text-lg md:text-3xl lg:text-4xl text-[#DAAF5B] font-semibold'
                                        >
                                            {currentAward.category}
                                        </motion.h4>
                                    </div>
                                </div>

                                <div className='w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] md:order-2'>
                                    <Image  
                                        src={currentAward.planetimg}
                                        alt={currentAward.title}
                                        width={500}
                                        height={500}
                                        sizes='(max-width: 768px) 60vw, 40vw'
                                        className='drop-shadow-lg size-full object-contain'
                                        priority={currentIndex < 2}
                                    />    
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