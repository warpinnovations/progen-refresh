/* eslint-disable @next/next/no-img-element */
"use client"
import localFont from 'next/font/local';
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

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
            titles: ['Digital Marketing', 'App Marketing',],
        },
        {
            emblems: ['./LandingPageAssets/certificates/meltwater.png'],
            linkPhrase: 'Partners with',
            titles: ['Meltwater'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/google-analytics-02.webp'],
            linkPhrase: 'Certified by',
            titles: ['Google Analytics'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/cisco.png'],
            linkPhrase: 'Certified by',
            titles: ['Cisco'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/google-analytics-03.png'],
            linkPhrase: 'Certified by',
            titles: ['Google Analytics'],
        },
        {
            emblems: ['./LandingPageAssets/certificates/google-ads.png'],
            linkPhrase: 'Certified by',
            titles: ['Google Ads'],
        },
    ];

    return (
        // 1. Reduced vertical padding and margin for a more compact section
        <section className='w-full flex flex-col justify-center py-6 my-2 md:py-10'>
            {/* 2. Reduced bottom margin on the title */}
            <h1 className={`${MoonlanderFont.className} font-black justify-center text-xl md:text-4xl text-prOrange mb-6 md:mb-8 text-center`}>
                CERTIFICATIONS
            </h1>

            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <div className="flex w-max animate-marquee">

                    {/* First set of certifications */}
                    <div className="flex items-stretch">
                        {certificates.map((cert, i) => (
                            // 3. Reduced item width and horizontal margin
                            <div key={`cert-a-${i}`} className="flex flex-col items-center justify-start text-center mx-6 flex-shrink-0 w-48 text-white">
                                {/* 4. Reduced image container height */}
                                <div className="flex justify-center items-center space-x-2 mb-3 h-20">
                                    {cert.emblems.map((src, j) => (
                                        <img key={`emblem-a-${i}-${j}`} src={src} alt={cert.titles[0]} className="max-h-full w-auto" />
                                    ))}
                                </div>
                                <p className="text-xs uppercase tracking-wider opacity-80">{cert.linkPhrase}</p>
                                {cert.titles.map((line, k) => (
                                    <p key={`title-a-${i}-${k}`} className="mt-1 text-sm font-bold uppercase">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Second, duplicated set */}
                    <div className="flex items-stretch" aria-hidden="true">
                        {certificates.map((cert, i) => (
                            // 3. Reduced item width and horizontal margin
                            <div key={`cert-b-${i}`} className="flex flex-col items-center justify-start text-center mx-6 flex-shrink-0 w-48 text-white">
                                {/* 4. Reduced image container height */}
                                <div className="flex justify-center items-center space-x-2 mb-3 h-20">
                                    {cert.emblems.map((src, j) => (
                                        <img key={`emblem-b-${i}-${j}`} src={src} alt={cert.titles[0]} className="max-h-full w-auto" />
                                    ))}
                                </div>
                                <p className="text-xs uppercase tracking-wider opacity-80">{cert.linkPhrase}</p>
                                {cert.titles.map((line, k) => (
                                    <p key={`title-b-${i}-${k}`} className="mt-1 text-sm font-bold uppercase">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Certifications;