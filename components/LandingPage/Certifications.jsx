/* eslint-disable @next/next/no-img-element */
"use client"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
const MoonlanderFont = localFont({src:'../../Fonts/Moonlander.ttf'});

function Certifications(){
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const isVisibleInAnimation = inView;

    const certificates = [
        {
            emblems:    ['./LandingPageAssets/certificates/cdp.png'],
            linkPhrase: 'Certified',
            titles:     ['Digital Marketer'],        
          },
          {
            emblems:    ['./LandingPageAssets/certificates/cdp.png','./LandingPageAssets/certificates/cdm.png'],
            linkPhrase: 'Certified in',
            titles:     ['Search Engine Optimization'],    
          },
          {
            emblems:    ['./LandingPageAssets/certificates/cdp.png','./LandingPageAssets/certificates/cdm.png'],
            linkPhrase: 'Certified in',
            titles:     ['Digital Marketing', 'App Marketing',],
          },
          {
            emblems:    ['./LandingPageAssets/certificates/meltwater.png'],
            linkPhrase: 'Partners with',
            titles:     ['Meltwater'],
          },
          {
            emblems:    ['./LandingPageAssets/certificates/google-analytics.png'],
            linkPhrase: 'Certified by',
            titles:     ['Google Analytics'],
          },
    ]

    const lenLastRow = certificates.length % 3;
    const lenTopRows = certificates.length - lenLastRow;
    return <section
    className='w-full flex flex-col justify-center md:py-40 my-20'
    >
        <motion.div className="container mx-auto px-4 text-center text-white" ref={ref}
            initial="hidden"
            animate={isVisibleInAnimation ? "visible":"hidden"}
            variants={{
                hidden:{opacity: 0, y:20},
                visible: {
                    opacity: 1,
                    y: "0%",
                    transition:{
                        duration:  .5,
                        ease: "easeInOut",
                        delayChildren: .15,
                        staggerChildren: .3
                    }
                }
            }}
        >
            <h1 className={`${MoonlanderFont.className} font-black justify-center text-xl md:text-4xl text-prOrange mb-10 md:mb-32 text-center`}>
                CERTIFICATIONS
            </h1>
            {/* 3-column rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-10">
                {certificates.slice(0, lenTopRows).map((cert, i) => (
                    <motion.div key={cert.emblems + cert.titles + i.toString()} className="flex flex-col items-center"
                        variants={{
                            hidden: {opacity: 0, y: 50},
                            visible: {opacity: 1, y:"0%", transition: {duration: 0.5, ease: "easeInOut"}},
                        }}
                    >
                        <div className="flex space-x-2 mb-4">
                            {cert.emblems.map((src, i) => (
                                <img key={src + i.toString()} src={src} alt="" className="h-32 w-auto" />
                            ))}
                        </div>
                
                        <p className="text-sm uppercase tracking-wider">{cert.linkPhrase}</p>
                
                        {cert.titles.map((line, i) => (
                            <p key={JSON.stringify(cert.titles) + line} className="mt-1 font-bold uppercase text-center">
                                {line}
                            </p>
                        ))}
                    </motion.div>
                ))}
            </div>
            {/* centered bottom rows regardless of item nums*/}
            <div className="flex flex-col md:flex-row items-center justify-center gap-x-52 gap-y-12 mt-16">
                {certificates.slice(lenTopRows).map((cert, i) => (
                    <motion.div key={JSON.stringify(cert.titles) + i.toString()} className="flex flex-col items-center"
                        variants={{
                            hidden: {opacity: 0, y: 50},
                            visible: {opacity: 1, y:"0%", transition: {duration: .3, ease: "easeInOut"}},
                        }}
                    >
                        <div className="flex space-x-2 mb-4">
                            {cert.emblems.map((src, i) => (
                                <img key={JSON.stringify(cert.emblems) + i.toString()} src={src} alt="" className="h-32 w-auto" />
                            ))}
                        </div>
                        <p className="text-sm uppercase tracking-wider">{cert.linkPhrase}</p>
                            {cert.titles.map((line, i) => (
                                <p key={JSON.stringify(cert.titles) + line + i.toString()} className="mt-1 font-bold uppercase text-center">
                                    {line}
                                </p>
                            ))}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
}

export default Certifications;