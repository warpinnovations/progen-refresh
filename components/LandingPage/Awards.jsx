"use client";

import { AnimatePresence, motion } from 'framer-motion';
import localFont from 'next/font/local';
import { Oxanium, Rajdhani } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';

const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const OxaniumFont = Oxanium({ weight: '600', subsets: ['latin'] });
const RajdhaniFont = Rajdhani({ weight: '700', subsets: ['latin'] });

const awarditems = [
    {
        id: 1,
        year: '2025',
        body: 'Asia CEO Awards',
        title: 'Young Leader of the Year',
        recognition: 'Circle of Excellence',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/Asia CEO Awards.PNG',
        aboutAward: 'This recognition is one of the most prestigious honors from one of Southeast Asia\'s largest business award-giving bodies. It celebrates leaders who are creating significant national impact through innovation and dedicated community empowerment initiatives.',
        aboutBody: 'Asia CEO Awards is the largest business awards event in the Philippines and considered the largest event of its kind in Southeast Asia. Its purpose is to promote the Philippines as the premier business destination for global enterprises.',
        campaignLabel: 'ABOUT THE AWARDEE',
        aboutCampaign: 'Prometheus CEO, Atty. Lcid Crescent Fernandez, was one of the awardees of the Circle of Excellence. He was recognized for building regional innovation programs in marketing and technology. His work in establishing civic partnerships has successfully uplifted various industries across Iloilo and the entire Western Visayas region. His success stems from developing first-of-its-kind solutions like the AI-powered ERP, The Prominent, for Local Government Units, and the Prometheus Mothership Initiative, a self-sustaining ecosystem providing mentorship and shared services that successfully launched new ventures. These systems-driven innovations proved that world-class entrepreneurship and technology can lead on the national stage from a regional base, securing his selection for this honor.',
    },
    {
        id: 2,
        year: '2025',
        body: 'Asia CEO Awards',
        title: 'SME Company of the Year',
        recognition: 'Circle of Excellence',
        planetimg: '/LandingPageAssets/planets/planet2.png',
        awardimg: '/LandingPageAssets/awards/Asia CEO Awards.PNG',
        aboutAward: 'The SME Company of the Year celebrates organizations that demonstrate exceptional growth trajectory and maintain high operational excellence. The award also places a strong emphasis on the company\'s positive social impact within its operating region. It signifies a small-to-medium enterprise that is a leader in its field.',
        aboutBody: 'Asia CEO Awards is the largest business awards event in the Philippines and is considered the largest event of its kind in Southeast Asia, reflecting its broad regional coverage and influence. Its purpose is to promote the Philippines as the premier business destination for global enterprises.',
        campaignLabel: 'ABOUT THE CAMPAIGN',
        aboutCampaign: 'Prometheus earned this recognition for its expansion across multiple divisions, specifically in marketing, software development, and specialized smart-city solutions. Key projects cited included The Prominent, alongside other impactful regional tourism and vital civic campaigns designed to advance the local economy. This achievement recognized the unique status of Prometheus as the only full-service marketing and public relations firm in the Visayas-Mindanao region capable of delivering seamless, 360-degree, end-to-end services and exponentially outperforming client targets through data-backed strategies and innovative solutions. This success is built upon the Prometheus Mothership Initiative, a self-sustaining ecosystem providing mentorship and shared services that successfully launched new ventures like WARP Technologies, 101 Food, and FMC Law, proving that high-impact entrepreneurship can thrive outside Metro Manila.',
    },
    {
        id: 3,
        year: '2025',
        body: 'PR Awards Singapore',
        title: 'Best Experiential PR Campaign',
        recognition: 'Finalist',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/pr-awards-2025.png',
        aboutAward: 'The PR Awards is a highly respected regional recognition program held in Singapore that celebrates excellence in public relations. It specifically recognizes outstanding PR campaigns that have demonstrated innovative strategy and impressive results across the Asia-Pacific, South Asia, and Oceania regions. Prometheus secured a finalist spot in this competition.',
        aboutBody: 'The PR Awards is organized by Marketing-Interactive, a leading media outlet for the advertising, marketing, and media industries in Southeast Asia, South Asia and Oceania. This position grants the awards platform a vast regional scope and significant influence over the PR and marketing landscape across Asia.',
        campaignLabel: 'ABOUT THE CAMPAIGN',
        aboutCampaign: 'Prometheus was the only agency not based in a major city honored for its partnership with Home Credit and EMCOR in delivering the successful "Unlock New Adventures", a 2-wheeler campaign across Visayas and Mindanao. This creative initiative was recognized for its fusion of cultural preservation, effective digital storytelling, and powerful regional brand building. The campaign\'s success was driven by its deep understanding of the local economy, addressing the significant barrier of motorcycle financing for Filipinos and positioning ownership not just as mobility but as economic empowerment. Prometheus achieved the finalist spot by crafting an immersive experiential event that generated 14.4 million impressions and facilitated ₱13.8 million in financing in just three months, demonstrating exceptional real-world impact and outstanding results against regional competitors.',
    },
    {
        id: 4,
        year: '2025',
        body: '60th Anvil Awards',
        title: 'Best PR-Led Integrated Campaign',
        recognition: 'Silver',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/anvil-awards.png',
        aboutAward: 'The Anvil Awards represents the highest national honor for excellence in strategic communications and public relations in the Philippines. This particular category recognizes the best comprehensive campaign that was driven by a strong PR-led strategy. Prometheus was recognized for demonstrating outstanding unified execution.',
        aboutBody: 'The Anvil Awards are presented by the Public Relations Society of the Philippines (PRSP), the country\'s premier organization for PR professionals. As the leading institution, the PRSP sets the standard for excellence in public relations across the entire nation.',
        campaignLabel: 'ABOUT THE CAMPAIGN',
        aboutCampaign: 'The award was received for Prometheus\'s integrated campaign for Daily Guardian\'s 22nd Anniversary, titled "Ilonggo Stories that Continue with You." The execution combined community engagement, a cohesive media strategy, events, and creative digital content into a single, unified execution that achieved impact on a national scale. The campaign was distinguished for its innovative and community-centric storytelling that redefined the relationship between a news organization and its audience. By strategically transforming the city into a living, breathing museum using interactive historical markers and a complementary digital experience, the campaign successfully re-established the client\'s role as the top local news source, resulting in significant growth in digital readership and community engagement. Prometheus breaks ground as the only provincial agency honored in the 60th Anvil Awards.',
    },
    {
        id: 5,
        year: '2025',
        body: '60th Anvil Awards',
        title: 'PR Tools: Special Events',
        recognition: 'Silver',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/anvil-awards.png',
        aboutAward: 'This Anvil Award category specifically recognizes the most effective and creative event activation through the use of innovative platforms and interactive elements that capture audience engagement in order to achieve campaign goals. The citation is given to PR tools, such as special events, that successfully elevate public engagement, enhance visibility, and strengthen stakeholder relationships. Prometheus was cited for its high-impact event execution.',
        aboutBody: 'The Anvil Awards are granted by the Public Relations Society of the Philippines (PRSP) to recognize and celebrate excellence in public relations practice.',
        campaignLabel: 'ABOUT THE CAMPAIGN',
        aboutCampaign: 'Prometheus earned this distinction for its Special Events execution conducted for Daily Guardian\'s 22nd Anniversary celebration. The events delivered high-impact, memorable experiences that successfully strengthened public trust, encouraged community participation, and boosted stakeholder visibility. The agency was recognized for its ingenuity in executing the "Ilonggo Stories that Continue with You" campaign, which successfully integrated traditional and digital executions to reaffirm the Daily Guardian\'s role as Iloilo\'s top local news source. This win highlights Prometheus\' status as the only full-service marketing and public relations firm in Western Visayas capable of executing a national award-winning campaign. It transformed the city into a living, breathing museum using interactive historical markers, driving 26.4 million social media impressions and an over 59% increase in website visits. To date, Prometheus stands as the sole provincial agency recognized at the 60th Anvil Awards.',
    },
    {
        id: 6,
        year: '2024',
        body: 'Asia CEO Awards',
        title: 'Young Leader of the Year',
        recognition: 'Circle of Excellence',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/Asia CEO Awards.PNG',
        aboutAward: 'This award acknowledges individuals who are actively shaping the future landscape of Philippine business and driving significant change. Atty. Lcid Crescent Fernandez was honored for his exemplary and boundary-pushing leadership in the regional business community.',
        aboutBody: 'The Asia CEO Awards is a premier organization that honors exceptional leaders and organizations within the dynamic Philippine business sector, establishing its standing as a nationally focused body with strong influence across the country.',
        campaignLabel: 'ABOUT THE AWARDEE',
        aboutCampaign: 'Atty. Fernandez was recognized for his pivotal role and Prometheus\'s broader involvement in two key areas: the development and mentorship of young creative leaders and the expansion of countryside-based innovation initiatives. His recognition highlighted Prometheus as the only full-service marketing and public relations firm in Western Visayas and an award-winning agency from the Visayas-Mindanao region to achieve such distinction. This was earned through his unique, growth-focused model, the Prometheus Academy, a dedicated training platform building cross-functional leaders, and the development of the Prominent government ERP software. These initiatives effectively proved that world-class, innovation-led growth could originate from Iloilo, securing his selection as a Young Leader of the Year.',
    },
    {
        id: 7,
        year: '2024',
        body: 'Asia CEO Awards',
        title: 'SME Company of the Year',
        recognition: 'Circle of Excellence',
        planetimg: '/LandingPageAssets/planets/planet2.png',
        awardimg: '/LandingPageAssets/awards/Asia CEO Awards.PNG',
        aboutAward: 'The Asia CEO Awards recognizes small and medium enterprises (SMEs) that exhibit remarkable growth, competitiveness, and commitment to social impact. Prometheus was honored for its impressive and rapid transformation from a local startup into a multi-division agency.',
        aboutBody: 'The Asia CEO Awards is dedicated to recognizing excellence across various facets of the Philippine economy and business community, serving as the largest business awards event in the Philippines and one of the largest in Southeast Asia.',
        campaignLabel: 'ABOUT THE CAMPAIGN',
        aboutCampaign: 'The recognition highlighted the success of Prometheus in advancing regional competitiveness through digital campaigns, pioneering smart-city solutions, and strategic media partnerships. This achievement singled out Prometheus for its trajectory from a small bedroom startup to a leading multi-division firm. This growth was fueled by its unique position as the only full-service marketing and public relations firm in Western Visayas and an award-winning agency from the Visayas-Mindanao region. Its win was attributed to building operational excellence, which includes a successful strategy of diversifying capabilities through business units like WARP Technologies, 101 Food, and Promises by Prometheus, alongside the development of cutting-edge solutions like the smart-city ERP, The Prominent.',
    },
    {
        id: 8,
        year: '2024',
        body: 'Marketing Excellence Awards',
        title: 'Excellence in Anniversary Marketing',
        recognition: 'Award',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/MEA Logo.png',
        aboutAward: 'The Marketing Excellence Awards (MEA) is a highly-regarded program that honors outstanding brand-building initiatives and effective marketing campaigns. It honors campaigns that utilize a corporate anniversary to create positive market resonance and expand competitive standing.',
        aboutBody: 'The Marketing Excellence Awards is organized and presented by Marketing-Interactive, a leading authority on advertising, marketing, and media intelligence across the Asia-Pacific region.',
        campaignLabel: 'ABOUT THE CAMPAIGN',
        aboutCampaign: 'Prometheus received this award for the campaign executed for the Daily Guardian. The initiative was recognized for its multi-platform narrative that showcased the organization\'s growth story, celebrated its dynamic team culture, and highlighted key innovation milestones. The campaign successfully addressed the challenge of declining traditional news consumption by bridging physical historical markers with a digital strategy, resulting in over 26.4 million Facebook impressions and 311,000 website visits for the client. This blend of heritage and modern strategy proved highly effective and secured the award for Prometheus, the only agency outside of Metro Manila to be shortlisted and win.',
    },
    {
        id: 9,
        year: '2024',
        body: 'Marketing Excellence Awards',
        title: 'Excellence in Urban Guerrilla Marketing',
        recognition: 'Silver',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/MEA Logo.png',
        aboutAward: 'This Marketing Excellence Award recognizes the most creative, bold, and high-impact non-traditional marketing campaigns. This category celebrates campaigns that leverage a business\'s anniversary to generate positive public attention and significantly boost market growth.',
        aboutBody: 'The Marketing Excellence Awards (MEA) is a regional initiative organized by Marketing-Interactive to honor the best marketing campaigns in the Asia-Pacific.',
        campaignLabel: 'ABOUT THE CAMPAIGN',
        aboutCampaign: 'Prometheus was cited for its culture-shifting, on-ground activation that utilized unconventional and high-impact creative methods. The campaign, titled "Ilonggo Stories that Continue with You," was the recognized initiative for Daily Guardian\'s anniversary, which successfully amplified brand presence and public interaction. This victory was attributed to the campaign\'s use of historical markers placed at actual news sites around Iloilo City, turning the urban environment into a living, interactive archive, and driving 22.4 million viewers to the stories. By strategically embedding these markers along pedestrian and bicycle networks and linking them to a microsite via QR codes, Prometheus pioneered a method that redefined how a local news brand could interact with its audience and community.',
    },
    {
        id: 10,
        year: '2023',
        body: 'Marketing Excellence Awards',
        title: 'Marketing Leader of the Year',
        recognition: 'Finalist',
        planetimg: '/LandingPageAssets/planets/moon.png',
        awardimg: '/LandingPageAssets/awards/MEA Logo.png',
        aboutAward: 'The Marketing Leader of the Year award is given to a brand-side marketing leader for achieving significant impact and showing outstanding leadership. The award recognizes excellence across core areas of marketing competency, including creative strategy, forward-thinking execution, and effective team motivation.',
        aboutBody: 'The Marketing Excellence Awards (MEA) are a regional initiative organized by Marketing-Interactive to honor the best marketing campaigns in the Asia-Pacific. This program is recognized across the region for its standards and rigorous evaluation of marketing achievements.',
        campaignLabel: 'ABOUT THE AWARDEE',
        aboutCampaign: 'Atty. Lcid Crescent Fernandez was named as one of the finalists for this prestigious regional award. The distinction honors his leadership in driving marketing innovation and results, which resulted in significant growth for his ventures. His recognition highlights his success in developing strategy and motivating teams to achieve significant results and high performance. His work notably revitalized the media organization, Daily Guardian, through platform decentralization and content diversification. This innovation pushed Daily Guardian\'s online growth by over 2,000% and website usage by 10,000%, cementing its relevance and establishing it as a leader in the Western Visayas media landscape. Atty. Fernandez\'s bold leadership, particularly in steering Prometheus as the only full-service marketing and public relations firm in Region VI to national prominence, secured his place among the nation\'s top marketing leaders.',
    },
];

const recognitionColor = (recognition) => {
    if (recognition === 'Silver') return { color: '#C0C0C0', glow: 'rgba(192,192,192,0.4)' };
    if (recognition === 'Finalist') return { color: '#D4AF37', glow: 'rgba(212,175,55,0.4)' };
    return { color: '#D4AF37', glow: 'rgba(212,175,55,0.4)' };
};

// ========== MODAL ==========
const AwardModal = ({ award, onClose }) => {
    const rc = recognitionColor(award.recognition);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    // Prevent scroll on body
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            {/* Panel */}
            <motion.div
                className="relative w-full max-h-[90vh] overflow-y-auto rounded-2xl z-10"
                style={{
                    maxWidth: '900px',
                    background: 'linear-gradient(135deg, rgba(12,12,12,0.98), rgba(20,18,12,0.96))',
                    border: `1.5px solid ${rc.color}40`,
                    boxShadow: `0 30px 80px -10px rgba(0,0,0,0.9), 0 0 60px ${rc.glow}`,
                }}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top gold line */}
                <div className="absolute top-0 left-8 right-8 h-[1.5px] rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${rc.color}, transparent)` }}
                />

                {/* Corner accents */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t border-r rounded-tr-lg pointer-events-none"
                    style={{ borderColor: `${rc.color}50` }} />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l rounded-bl-lg pointer-events-none"
                    style={{ borderColor: `${rc.color}30` }} />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="p-10 sm:p-14">
                    {/* Header */}
                    <div className="flex items-start gap-5 mb-7">
                        <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center">
                            <Image
                                src={award.awardimg}
                                alt={award.body}
                                width={96}
                                height={96}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`${OxaniumFont.className} text-xs uppercase tracking-[0.25em] mb-1`}
                                style={{ color: rc.color }}>
                                {award.body} · {award.year}
                            </div>
                            <h2 className={`${MoonlanderFont.className} text-white text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mb-2`}>
                                {award.title}
                            </h2>
                            <span
                                className={`${OxaniumFont.className} inline-block text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full`}
                                style={{
                                    background: `${rc.color}18`,
                                    border: `1px solid ${rc.color}50`,
                                    color: rc.color,
                                }}
                            >
                                {award.recognition}
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] mb-6" style={{ background: `linear-gradient(90deg, ${rc.color}40, transparent)` }} />

                    {/* About the Award only */}
                    <div className={`${OxaniumFont.className} text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold mb-3 flex items-center gap-2`}
                        style={{ color: rc.color }}>
                        <div className="w-1 h-1 rounded-full" style={{ background: rc.color }} />
                        About the Award
                    </div>
                    <p className={`${RajdhaniFont.className} text-white/70 text-lg sm:text-xl leading-relaxed`}
                        style={{ letterSpacing: '0.03em' }}>
                        {award.aboutAward}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ========== SLIDE VARIANTS ==========
const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.1 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0, scale: 0.1 }),
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.5 } },
};

const characterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
};

// ========== MAIN AWARDS COMPONENT ==========
const Awards = () => {
    const [[currentIndex, direction], setIndex] = useState([0, 0]);
    const [selectedAward, setSelectedAward] = useState(null);

    const paginate = useCallback((newDirection) => {
        setIndex([(currentIndex + newDirection + awarditems.length) % awarditems.length, newDirection]);
    }, [currentIndex]);

    useEffect(() => {
        if (selectedAward) return; // pause auto-rotate when modal is open
        const intervalId = setInterval(() => {
            paginate(direction === 0 ? 1 : direction);
        }, 10000);
        return () => clearInterval(intervalId);
    }, [direction, paginate, selectedAward]);

    const currentAward = useMemo(() => awarditems[currentIndex], [currentIndex]);
    const rc = recognitionColor(currentAward.recognition);

    if (!awarditems.length) return null;

    return (
        <>
            <main className="min-h-120vh md:min-h-90vh bg-cover bg-center bg-no-repeat bg-[url('/LandingPageAssets/awardsbg.png')] py-40">
                <div className="z-50">
                    <h1 className={`${MoonlanderFont.className} text-center font-black justify-center text-xl md:text-4xl text-prOrange md:mb-12`}>
                        AWARDS
                    </h1>

                    {/* Counter */}
                    <div className={`${OxaniumFont.className} text-center text-[10px] uppercase tracking-[0.25em] mb-8 md:mb-16`}
                        style={{ color: 'rgba(150,137,95,0.6)' }}>
                        {currentIndex + 1} / {awarditems.length}
                    </div>

                    <div className="relative w-full h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden md:pb-80">
                        {/* Prev */}
                        <button
                            onClick={() => paginate(-1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-full w-12 items-center justify-center text-white/30 hover:text-white/80 text-2xl transition-all hover:bg-gradient-to-bl from-white/0 to-white/10"
                            aria-label="Previous"
                        >❮</button>

                        {/* Next */}
                        <button
                            onClick={() => paginate(1)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-full w-12 items-center justify-center text-white/30 hover:text-white/80 text-2xl transition-all hover:bg-gradient-to-br from-white/0 to-white/10"
                            aria-label="Next"
                        >❯</button>

                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                                className="absolute w-full h-full"
                            >
                                <div className="w-full h-full flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8 lg:gap-12 px-6 max-w-7xl mx-auto">
                                    <div className="flex items-center justify-center gap-4 md:contents">
                                        {/* Award logo */}
                                        <motion.div
                                            key={currentAward.awardimg}
                                            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
                                            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                                            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
                                            className="md:order-1"
                                        >
                                            <Image
                                                src={currentAward.awardimg}
                                                alt={currentAward.title}
                                                height={300}
                                                width={300}
                                                priority={currentIndex < 2}
                                            />
                                        </motion.div>

                                        {/* Text + CTA */}
                                        <div className="order-2 flex flex-col text-left md:order-3 gap-3 cursor-pointer" onClick={() => setSelectedAward(currentAward)}>
                                            {/* Body + Year */}
                                            <motion.p
                                                key={`body-${currentIndex}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className={`${OxaniumFont.className} text-xs uppercase tracking-[0.2em]`}
                                                style={{ color: rc.color }}
                                            >
                                                {currentAward.body} · {currentAward.year}
                                            </motion.p>

                                            {/* Recognition badge */}
                                            <motion.span
                                                key={`rec-${currentIndex}`}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.25 }}
                                                className={`${OxaniumFont.className} inline-block text-[10px] uppercase tracking-[0.18em] px-3 py-1 rounded-full w-fit`}
                                                style={{
                                                    background: `${rc.color}18`,
                                                    border: `1px solid ${rc.color}50`,
                                                    color: rc.color,
                                                }}
                                            >
                                                {currentAward.recognition}
                                            </motion.span>

                                            {/* Title */}
                                            <motion.h3
                                                key={currentAward.title}
                                                className="text-xl text-white md:text-4xl lg:text-6xl font-thin tracking-widest uppercase"
                                                variants={containerVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                {currentAward.title.split('').map((char, i) => (
                                                    <motion.span key={i} variants={characterVariants}>
                                                        {char === ' ' ? '\u00A0' : char}
                                                    </motion.span>
                                                ))}
                                            </motion.h3>

                                            {/* View Details button */}
                                            <motion.button
                                                key={`btn-${currentIndex}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.5 }}
                                                onClick={() => setSelectedAward(currentAward)}
                                                className={`${OxaniumFont.className} mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold w-fit px-5 py-2.5 rounded-xl transition-all duration-300`}
                                                style={{
                                                    background: `${rc.color}15`,
                                                    border: `1.5px solid ${rc.color}50`,
                                                    color: rc.color,
                                                    boxShadow: `0 0 20px ${rc.glow}20`,
                                                }}
                                                whileHover={{ boxShadow: `0 0 30px ${rc.glow}`, scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                View Details
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Planet */}
                                    <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] md:order-2">
                                        <Image
                                            src={currentAward.planetimg}
                                            alt={currentAward.title}
                                            width={500}
                                            height={500}
                                            sizes="(max-width: 768px) 60vw, 40vw"
                                            className="drop-shadow-lg size-full object-contain"
                                            priority={currentIndex < 2}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {awarditems.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex([i, i > currentIndex ? 1 : -1])}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: i === currentIndex ? 20 : 6,
                                    height: 6,
                                    background: i === currentIndex ? '#D4AF37' : 'rgba(150,137,95,0.35)',
                                }}
                                aria-label={`Go to award ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {selectedAward && (
                    <AwardModal award={selectedAward} onClose={() => setSelectedAward(null)} />
                )}
            </AnimatePresence>
        </>
    );
};

export default Awards;
