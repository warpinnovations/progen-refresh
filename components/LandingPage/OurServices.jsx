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
        threshold: .3,
    });

    const isVisibleInAnimation = inView;

    return <div
    className='w-full flex flex-col justify-center md:py-40 mb-8 bg-cover bg-no-repeat bg-center'
    style={{backgroundImage: "url('/LandingPageAssets/servicesbg.png')"}}
    >
       <motion.div
        ref={ref}
        className="relative grid grid-cols-1 md:grid-cols-2 justify-center items-center text-center z-10 mb-20 "
        initial="hidden"
        animate={isVisibleInAnimation ? "visible":"hidden"}
        variants={{
            hidden:{opacity: 0, y:20},
            visible: {
                opacity: 1,
                y: "0%",
                transition:{
                    duration: 0.6,
                    ease: "easeInOut",
                    delayChildren: .15,
                    staggerChildren: 0.15
                }
            }
        }}
        >
            <motion.div className="w-full flex justify-center md:justify-end lg:justify-center lg:pr-10">
                <div className="flex flex-row md:flex-col mb-10 md:mb-20 gap-2 md:gap-4 w-fit justify-center md:justify-start mt-10">
                    <h1 className={`${MoonlanderFont.className} flex font-black justify-center text-md md:text-5xl lg:w-1/3 text-[#f5f5f5] md:justify-start `}>
                        OUR
                    </h1>
                    <h1 className={`${MoonlanderFont.className} flex font-black justify-center text-md md:text-5xl lg:w-1/3 text-prOrange md:justify-start `}>
                        SERVICES
                    </h1>
                </div>
            </motion.div>
           <div className={`${MoonlanderFont.className} text-md md:text-2xl lg:text-4xl text-white flex flex-col lg:gap-2`}>
                {services.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`relative flex md:p-3 justify-center md:justify-start md:ml-5 mb-5 md:mb-0`}
                        variants={{
                            hidden: {opacity: 0, x: "-30%"},
                            visible: {opacity: 1, x:"0%", transition: {type: "spring", stiffness: 120, damping: 20 }},
                        }}
                    >
                        <p className="text-center md:text-left ">{item}</p>
                    </motion.div>
                ))}
           </div>
       </motion.div>
   </div>
}

export default OurServices;