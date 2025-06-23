"use client"
import React from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import localFont from 'next/font/local';
const MoonlanderFont = localFont({src:'../../Fonts/Moonlander.ttf'});

const services = [
    'Branding',
    'Strategy',
    'Digital Marketing',
    'Creative',
    'Event Management',
    'Media',
    'Social Media',
    'Software Solutions',
    'Wedding Studio',
];


function OurServices(){

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.7,
    });

    const isVisibleInAnimation = inView;

    return <div
    className='w-full flex flex-col justify-center md:py-40 mb-8'

    >
       <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 justify-center items-center text-center z-10 mb-20 "
        >
            <motion.div className="w-full flex justify-center md:justify-end lg:justify-center lg:pr-10"
            initial={{ opacity: 0, scale: 0.0001, y: 300 }}
            animate={{
                opacity: isVisibleInAnimation ? 1 : 0,
                y: isVisibleInAnimation ? 0 : 20,
                scale: isVisibleInAnimation ? 1 : 0,
                transition: {duration: 1},
            }}
            exit={{ opacity: 0, y: -20 }}
            >
                <div className="flex flex-row md:flex-col mb-5 md:mb-20 gap-2 md:gap-4 w-fit justify-center md:justify-start mt-10">
                    <h1 className={`${MoonlanderFont.className} flex font-black justify-center text-md md:text-5xl lg:w-1/3 text-[#f5f5f5] md:justify-start `}>
                        OUR
                    </h1>
                    <h1 className={`${MoonlanderFont.className} flex font-black justify-center text-md md:text-5xl lg:w-1/3 text-prOrange md:justify-start `}>
                        SERVICES
                    </h1>
                </div>
            </motion.div>
           <div className={`${MoonlanderFont.className} text-md md:text-4xl text-white flex flex-col gap-2 `}>
                {services.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`flex relative md:p-5 justify-center md:justify-start`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={{
                            hidden: {opacity: 0, x: "30%"},
                            visible: {opacity: 1, x:"0%", transition: {type: "spring"}},
                        }}
                    >
                        <p className="text-center md:text-left ">{item}</p>
                    </motion.div>
                ))}
           </div>
       </div>
   </div>
}

export default OurServices;