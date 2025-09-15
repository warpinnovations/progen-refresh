"use client";

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import Image from 'next/image';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });

// --- YOUR EXISTING DATA - NO CHANGES MADE ---
const awarditems = [
    {
        id: 1,
        title: 'FINALIST',
        category: 'BEST EXPERIMENTAL CAMPAIGN',
        awardName: 'PR Awards 2025',
        awardimg: '/LandingPageAssets/awards/pr-awards-2025.png',
    },
    {
        id: 2,
        title: 'SILVER AWARD',
        category: 'EXCELLENCE IN URBAN GUERRILLA MARKETING',
        awardName: 'Anvil Awards',
        awardimg: '/LandingPageAssets/awards/anvil Awards Logo.png',
    },
    {
        id: 3,
        title: 'SILVER AWARD',
        category: 'EXCELLENCE IN ANNIVERSARY MARKETING',
        awardName: 'Asia CEO Awards',
        awardimg: '/LandingPageAssets/awards/Asia CEO Awards.PNG',
    },
    {
        id: 4,
        title: 'FINALIST',
        category: 'EXCELLENCE IN RELATIONSHIP MARKETING',
        awardName: 'Marketing Excellence Awards',
        awardimg: '/LandingPageAssets/awards/MEA Logo.png',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
};


const Awards = () => {
    const AWARDS_TO_DISPLAY = 4;
    const displayedAwards = awarditems.slice(0, AWARDS_TO_DISPLAY);

    return (
        <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/LandingPageAssets/awardsbg.png')] py-20 md:py-32 px-4 flex items-center">
            <div className='container mx-auto max-w-7xl'>
                <h1 className={`${MoonlanderFont.className} text-center font-black text-xl md:text-4xl text-prOrange mb-12 md:mb-16`}>
                    AWARDS
                </h1>

                {/* --- CHANGE: Grid now supports 4 columns on large screens for a tighter layout --- */}
                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {displayedAwards.map((award) => (
                        <motion.div key={award.id} variants={itemVariants}>
                            {/* --- PREMIUM CARD LAYOUT --- */}
                            {/* 1. Removed `aspect-[4/3]` to allow content to define height. */}
                            {/* 2. Added a subtle radial gradient on hover for a "shine" effect. */}
                            {/* 3. Added more interactive hover states for background, border, and text. */}
                            <div className="group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-center items-center text-center gap-6 transition-all duration-300 hover:border-white/20 hover:bg-black/60">

                                {/* Premium Shine Effect */}
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                {/* Logo */}
                                <Image
                                    src={award.awardimg}
                                    alt={`${award.awardName} Logo`} // Improved alt text
                                    width={250}
                                    height={250}
                                    className="h-32 w-auto md:h-36 transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />

                                {/* Text Content */}
                                {/* CHANGE: Added transition and slight upward movement on hover */}
                                <div className="text-white transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                                    <h2 className={`${MoonlanderFont.className} text-2xl md:text-3xl font-bold uppercase leading-tight`}>
                                        {award.title}
                                    </h2>
                                    <p className="mt-2 text-sm font-light opacity-90 max-w-xs">
                                        {award.category}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}

export default Awards;