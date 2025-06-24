"use client"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import localFont from 'next/font/local';
const MoonlanderFont = localFont({src:'../../Fonts/Moonlander.ttf'});


function Contact() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.7,
    });

    const isVisibleInAnimation = inView;

    return(
        <div
            className="z-0 relative w-full bg-top md:py-48 py-24
                bg-[url('/LandingPageAssets/galaxybg.webp')] 
                bg-cover bg-center flex flex-col items-center justify-center py-20">
            <div className='absolute  z-1 inset-0  bg-gradient-to-b from-black/80 to-transparent'/>
            <div className='flex flex-col items-center text-center z-20 content-center'>
                <motion.div
                    className='w-full md:w-4/5'
                    ref={ref}
                    initial={{ opacity:0 }}
                    animate={{
                        opacity: isVisibleInAnimation? 1 : 0,
                        transition: {
                            duration: 0.5,
                            delay: 0
                        }
                    }}
                >
                    <h1 className={`${MoonlanderFont.className} font-black text-xl md:text-6xl text-prOrange`}>
                        LAUNCH YOUR BRAND INTO THE ORBIT WITH OUR STELLAR MARKETING
                    </h1>
                </motion.div>                
                <motion.div
                    className='w-4/5 md:w-3/5 '
                    ref={ref}
                    initial={{ opacity:0 }}
                    animate={{
                        opacity: isVisibleInAnimation? 1 : 0,
                        transition: {
                            duration: 0.5,
                            delay: 0.5
                        }
                    }}
                >
                    <h1 className={`${MoonlanderFont.className} text-sm md:text-4xl text-white my-16`}>
                        The power of marketing is strong with this one
                    </h1>
                </motion.div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0}}
                    animate={{
                        opacity: isVisibleInAnimation ? 1 : 0,
                        transition: {
                            duration: 0.5,
                            delay: 1
                        },
                    }}
                >
                    <a href="" className={`${MoonlanderFont.className} md:w-auto md:mt-4 md:mb-24 px-8 py-8 md:px-16 md:py-8 inline-block border border-yellow-500 text-white font-semibold rounded hover:bg-yellow-500 text-xl md:text-4xl hover:text-[#1B1A1A] transition duration-300`}>
                        CONTACT US
                    </a>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;