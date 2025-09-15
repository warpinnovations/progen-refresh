/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'; // Imported React for Fragments
import StarsCanvas from '@/components/Global/StarCanvas';

function Certifications() {
    const certificates = [
        {
            emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'],
            linkPhrase: 'Certified',
            titles: ['Digital Marketer'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'],
            linkPhrase: 'Certified in',
            titles: ['Search Engine Optimization'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/cdp.png', './LandingPageAssets/certificates/cdm.png'],
            linkPhrase: 'Certified in',
            titles: ['Digital Marketing', 'App Marketing'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/meltwater.png'],
            linkPhrase: 'Partners with',
            titles: ['Meltwater'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/google-analytics-02.webp'],
            alt: 'Google Analytics',
            titles: [''],
        },
        {
            emblems: ['./LandingPageAssets/certificates/cisco.png'],
            alt: 'Cisco Certified',
            titles: [''],
        },
        {
            emblems: ['./LandingPageAssets/certificates/google-analytics-03.png'],
            alt: 'Google Analytics IQ',
            titles: [''],
        },
        {
            emblems: ['./LandingPageAssets/certificates/google-ads.png'],
            alt: 'Google Ads Certified',
            titles: [''],
        },
    ];

    const duplicatedCertificates = [...certificates, ...certificates];

    return (
        <section className='w-full flex flex-col justify-center py-20 md:py-28 relative overflow-hidden'>
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <StarsCanvas />
            </div>
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black via-transparent to-black"></div>

            <div className="relative z-10 w-full">
                <div className="group flex items-center w-max animate-marquee hover:[animation-play-state:paused]">
                    {duplicatedCertificates.map((cert, i) => (
                        // Use a React Fragment to group the card and its separator
                        <React.Fragment key={`cert-wrapper-${i}`}>
                            {/* --- THE UPGRADED PREMIUM CARD --- */}
                            <div
                                className="
                                    group/card relative flex flex-col items-center justify-start text-center 
                                    mx-8 flex-shrink-0 w-64 p-6 
                                    bg-black/20 backdrop-blur-sm
                                    border border-slate-800 rounded-2xl 
                                    shadow-lg shadow-black/30
                                    transform-gpu transition-all duration-300 ease-in-out
                                    hover:scale-105 hover:-translate-y-1 hover:border-prOrange
                                    hover:shadow-2xl hover:shadow-prOrange/20
                                "
                            >
                                {/* Logo container */}
                                <div className="flex justify-center items-center space-x-4 mb-4 h-24">
                                    {cert.emblems.map((src, j) => (
                                        <img
                                            key={`emblem-${i}-${j}`}
                                            src={src}
                                            alt={cert.alt || cert.titles[0]}
                                            className="
                                                max-h-full w-auto transition-all duration-300 
                                                filter grayscale group-hover/card:grayscale-0
                                            "
                                        />
                                    ))}
                                </div>

                                {/* --- FIXED TEXT CONTAINER --- */}
                                <div className="flex flex-col justify-center items-center min-h-[4.5rem]">
                                    {/* Always render the linkPhrase if it exists */}
                                    {cert.linkPhrase && (
                                        <p className="text-sm uppercase tracking-wider text-slate-400">{cert.linkPhrase}</p>
                                    )}

                                    {/* Render titles from the titles array if they're not empty */}
                                    {cert.titles && cert.titles[0] && cert.titles.map((line, k) => (
                                        <p key={`title-${i}-${k}`} className={`font-semibold uppercase text-slate-100 ${cert.linkPhrase ? 'mt-1 text-base' : 'text-lg'}`}>
                                            {line}
                                        </p>
                                    ))}

                                    {/* Render the alt text as a title ONLY IF the titles array is empty */}
                                    {(!cert.titles || !cert.titles[0]) && cert.alt && (
                                        <p className="font-semibold uppercase text-slate-100 text-lg">
                                            {cert.alt}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* --- GLOWING SEPARATOR LINE --- */}
                            <div className="flex-shrink-0 w-px h-40 bg-gradient-to-b from-transparent via-slate-700 to-transparent group-hover:via-prOrange/50 transition-colors duration-300"></div>

                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Certifications;