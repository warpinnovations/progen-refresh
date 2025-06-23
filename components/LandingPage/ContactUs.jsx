"use client"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import localFont from 'next/font/local';
const MoonlanderFont = localFont({src:'../../Fonts/Moonlander.ttf'});


function Contact() {

    return(
        <div
            className="w-full bg-top md:py-48 py-24
                bg-[url('/LandingPageAssets/galaxybg.webp')] 
                bg-cover bg-center flex flex-col items-center justify-center py-20">
            <h1 className={`${MoonlanderFont.className} font-black text-xl md:text-6xl text-prOrange w-5/6 md:w-4/5 text-center`}>
                LAUNCH YOUR BRAND INTO THE ORBIT WITH OUR STELLAR MARKETING
            </h1>
            <h1 className={`${MoonlanderFont.className} w-4/5 md:w-3/5 text-center text-sm md:text-4xl text-white text-center my-16`}>
                The power of marketing is strong with this one
            </h1>
            <a href="" className={`${MoonlanderFont.className} md:w-auto text-center md:mt-4 md:mb-24 px-8 py-8 md:px-16 md:py-8 inline-block border border-yellow-500 text-white font-semibold rounded hover:bg-yellow-500 text-xl md:text-4xl hover:text-[#1B1A1A] transition duration-300`}>
                CONTACT US
            </a>
        </div>
    );
}

export default Contact;