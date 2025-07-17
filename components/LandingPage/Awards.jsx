"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
import Image from 'next/image';
import { useState, useEffect} from 'react';

const MoonlanderFont = localFont({src:'../../Fonts/Moonlander.ttf'});

const awarditems = [
    {   
        id: 1,
        title: 'award1', 
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '',
        description: 'test'  
    },
    {
        id: 2,
        title: 'award2', 
        planetimg: '/LandingPageAssets/planets/planet2.png',
        awardimg: '',
        description: 'test2'
    },
];

const Awards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % awarditems.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const planetVariants = {
        // The state when the slide is not active
        hidden: { 
            opacity: 80, 
            y: 50, // Start 50px below
            scale: 0.7 
        },
        // The state when the slide IS active
        visible: {
            opacity: 1,
            y: 0, // Animate to its final y position
            scale: 1,
            transition: {
            type: "spring",
            stiffness: 50,
            damping: 10,
            delay: 1 // Delay it slightly after the slide arrives
        }
    }};

    return (
        <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/LandingPageAssets/awardsbg.png')]">
            <div className='z-50'>
                <h1 className={`${MoonlanderFont.className} text-center font-black justify-center text-md md:text-4xl text-prOrange mb-20`}>AWARDS</h1>
                <div className='relative w-full max-w-full mx-auto overflow-hidden rounded-lg '>
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {awarditems.map((items, index) => (
                            <div key={index} className="relative w-full flex-shrink-0">
                                <motion.div
                                    className='flex justify-center'
                                    variants={planetVariants}
                                    initial="hidden"
                                    animate={currentIndex === index ? "visible" : "hidden"}
                                    exit= {{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                    
                                >
                                    <Image src={items.planetimg} alt={items.title} className="" height={300} width={300}></Image>
                                </motion.div>
                                <div  className="flex flex-col items-center justify-center text-center text-white p-4 bg-yellow-200">
                                    <h3>{items.title}</h3>
                                    <p>{items.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Awards;