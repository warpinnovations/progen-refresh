// components/LandingPage/FeaturedWorksGrid.js

"use client";

import React from 'react';
import Link from 'next/link';
import { worksData as allWorksData } from '@/app/contants';
import StarsCanvas from '@/components/Global/StarCanvas';

// Font Imports
import localFont from 'next/font/local';
import { Oxanium } from 'next/font/google';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: "400", subsets: ["latin"] });


const FeaturedWorksGrid = () => {
    const featuredWorks = allWorksData.slice(0, 4);

    return (
        <div className="w-full bg-black py-20 px-4 md:px-8 relative">
            {/* Starry background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
            </div>

            {/* Main content container */}
            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-[#96895f] text-center font-bold uppercase text-xl md:text-4xl mb-12">
                    Our Works
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredWorks.map((work, index) => (
                        <Link
                            key={index}
                            href={`/works/subpage?index=${index}`}
                            className="
                                group block rounded-3xl
                                transform-gpu transition-all duration-300 ease-in-out
                                hover:-translate-y-1 hover:shadow-2xl hover:shadow-prOrange/20
                            "
                        >
                            <div className="
                                relative aspect-video w-full overflow-hidden rounded-3xl
                                border border-white/10 transition-colors duration-300 ease-in-out
                                group-hover:border-white/25
                            ">
                                {/* Background Image */}
                                <img
                                    src={work.img}
                                    alt={work.title}
                                    className="
                                        absolute inset-0 h-full w-full object-cover 
                                        transition-transform duration-500 ease-in-out 
                                        group-hover:scale-105
                                    "
                                />

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                {/* Text Content */}
                                <div className="
                                    absolute bottom-0 left-0 w-full p-6 text-white
                                    transform-gpu transition-transform duration-300 ease-in-out
                                    translate-y-4 group-hover:translate-y-0
                                ">
                                    {/* --- REFINED TITLE STYLING --- */}
                                    <h2 className={`
                                        ${MoonlanderFont.className} 
                                        text-2xl md:text-3xl font-bold uppercase 
                                        leading-snug tracking-wider
                                    `}>
                                        {work.title}
                                    </h2>

                                    <div className={`
                                        mt-2 flex items-center gap-x-2 text-sm text-slate-300 
                                        opacity-0 transition-opacity duration-300 ease-in-out
                                        group-hover:opacity-100 ${OxaniumFont.className}
                                    `}>
                                        <span>View work</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedWorksGrid;