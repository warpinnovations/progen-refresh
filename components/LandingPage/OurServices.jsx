"use client";
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import { Rajdhani, Oxanium } from 'next/font/google';
import CSSStars from '@/components/Global/CSSStars';
import FuturisticDivider from '@/components/Global/FuturisticLine';

// --- FONT DEFINITIONS ---
const MoonlanderFont = localFont({ src: '../../Fonts/Moonlander.ttf' });
const RajdhaniFont = Rajdhani({ weight: '600', subsets: ['latin'] });
const OxaniumFont = Oxanium({ weight: '600', subsets: ['latin'] });

// --- SERVICES DATA WITH DETAILED BREAKDOWNS ---
const servicesData = [
    {
        id: 'strategy',
        href: '/services/strategy-services',
        name: 'Strategy Services',
        icon: '◈',
        color: '#96895F',
        tagline: 'Data-driven decisions to improve audience understanding, strengthen campaigns, and support long-term business growth.',
        services: [
            { name: 'Consumer Research', description: 'We gather and analyze consumer data to support audience understanding, campaign planning, and decision-making.' },
            { name: 'Insighting', description: 'We dive deeper to understand consumer behavior, category trends, and cultural insights, helping brands develop more relevant, unique, and effective campaigns.' },
            { name: 'Strategy Development', description: 'We build tailored marketing and communication strategies aligned with brand goals, audience needs, and market opportunities.' },
            { name: 'Social Listening', description: 'We monitor online conversations and audience sentiment before, during, and after running campaigns to stay informed, responsive, and clear on their real impacts.' },
            { name: 'Digital Marketing Workshops', description: 'We conduct Digital Marketing 101 workshops designed to equip teams with practical knowledge on digital platforms, trends, and campaign fundamentals.' },
        ]
    },
    {
        id: 'branding-creative',
        href: '/services/branding-creative-services',
        name: 'Branding & Creative Services',
        icon: '✦',
        color: '#96895F',
        tagline: 'Clear, impactful brand identities and compelling creative experiences that strengthen positioning, elevate communication, and connect with audiences across platforms.',
        services: [
            { name: 'Brand Development', description: 'We shape brand identities through strategic design and messaging that help organizations stand out and connect with their audiences—whether launching a new brand or refreshing an existing one.' },
            { name: 'Campaign Ideation', description: 'We develop strong creative concepts and brand narratives that serve as the foundation for campaigns, positioning, and communication.' },
            { name: 'Graphic Design', description: 'We develop visual materials that communicate your brand clearly across campaigns, presentations, digital platforms, and print assets.' },
            { name: 'Video Production', description: 'We develop storyboards and scripts that provide clear creative direction and support cohesive storytelling across video and campaign materials.' },
            { name: 'Motion Graphics', description: 'We produce animated videos and visual elements that simplify messages, increase engagement, and enhance digital storytelling.' },
            { name: 'Photography Services', description: 'We capture high-quality photos for campaigns, events, products, corporate materials, and brand communications.' },
            { name: 'Copywriting Services', description: 'We create ad copy, social media captions, and campaign messaging designed to strengthen brand communication and audience engagement.' },
        ]
    },
    {
        id: 'digital-marketing',
        href: '/services/digital-marketing',
        name: 'Digital Marketing Services',
        icon: '◉',
        color: '#96895F',
        tagline: 'Results-driven digital marketing services designed to improve visibility, strengthen engagement, and support sustainable brand growth.',
        services: [
            { name: 'Search Engine Optimization (SEO)', description: 'We optimize website structure, content, and keywords to improve search visibility and help brands rank higher on search engines.' },
            { name: 'Digital Strategy Development', description: 'We create data-informed digital marketing strategies aligned with business goals, audience behavior, and campaign objectives.' },
            { name: 'E-mail Direct Marketing', description: 'We design and execute targeted email campaigns that nurture leads, strengthen customer relationships, and drive conversions.' },
            { name: 'Content Tagging and Optimization', description: 'We implement proper content tagging and structuring to improve discoverability, organization, and performance across digital platforms.' },
            { name: 'Website Development', description: 'We create responsive and user-focused websites designed to strengthen brand presence and improve customer experience online.' },
        ]
    },
    {
        id: 'media',
        href: '/services/media-services',
        name: 'Media Services',
        icon: '◇',
        color: '#96895F',
        tagline: 'Strategic media services designed to help brands reach the right audiences, maximize campaign performance, and ensure efficient use of media investments.',
        services: [
            { name: 'Media Planning and Strategy', description: 'We develop data-driven media strategies that identify the right channels, timing, and audience segments to maximize campaign reach and effectiveness.' },
            { name: 'Media Buying and Deployment', description: 'We execute strategic media placements across traditional and digital platforms to ensure optimal visibility and audience targeting.' },
            { name: 'Media Monitoring and Optimization', description: 'We continuously track campaign performance and make real-time adjustments to improve reach, engagement, and efficiency.' },
            { name: 'Media Reporting and Analysis', description: 'We provide detailed performance reports that measure campaign impact, audience reach, and overall media effectiveness to guide future strategies.' },
        ]
    },
    {
        id: 'social-media',
        href: '/services/social-media-services',
        name: 'Social Media Services',
        icon: '◆',
        color: '#96895F',
        tagline: 'Strategic social media services that strengthen brand presence, grow audience engagement, and drive meaningful conversations across digital platforms.',
        services: [
            { name: 'KPI Monitoring & Social Listening', description: 'We track key performance indicators and monitor online conversations to understand audience sentiment and measure campaign effectiveness.' },
            { name: 'Social Media Strategy', description: 'We create data-driven strategies that define content direction, platform focus, and engagement goals aligned with brand objectives.' },
            { name: 'Digital Brand Analysis', description: 'We evaluate brand performance across social platforms to identify strengths, gaps, and opportunities for improvement.' },
            { name: 'Content Planning', description: 'We plan content calendars and curate meaningful conversations that encourage engagement and build community interaction.' },
            { name: 'Influencer and KOL Marketing', description: 'We manage influencer and KOL partnerships that amplify brand messaging and extend reach to targeted audiences.' },
            { name: 'Campaign Management', description: 'We oversee end-to-end social media campaigns, ensuring consistent execution, engagement, and performance tracking across platforms.' },
        ]
    },
    {
        id: 'event-management',
        href: '/services/event-management',
        name: 'Event Management',
        icon: '◈',
        color: '#96895F',
        tagline: 'End-to-end event management solutions that deliver seamless, high-impact events and experiences that strengthen audience engagement.',
        services: [
            { name: 'Strategic Planning', description: 'We develop event concepts, timelines, and program structures that align with your brand and business objectives.' },
            { name: 'Program Management', description: 'We oversee scripting, technical direction, and broadcast coordination to keep every event running smoothly.' },
            { name: 'Guest Management', description: 'We manage registration, attendee communication, and guest flow to create a seamless event experience.' },
            { name: 'Brand Activation', description: 'We create interactive event components that strengthen customer engagement and elevate campaign visibility.' },
            { name: 'On-Site Coordination', description: 'We supervise staging, setup, and real-time operations to ensure smooth execution on event day.' },
            { name: 'Talent Coordination', description: 'We handle coordination with suppliers, performers, and manage influencer/celebrity partnerships to keep every moving part aligned.' },
        ]
    },
    {
        id: 'software',
        href: '/services/software-solutions',
        name: 'Software Solutions',
        icon: '✦',
        color: '#96895F',
        tagline: 'Custom software solutions designed to build high-performing digital platforms, enhance user experience, and support business growth.',
        services: [
            { name: 'Custom Website Development', description: 'We build tailored websites designed to meet specific business needs, ensuring functionality, performance, and scalability.' },
            { name: 'Website Design and Re-Design', description: 'We create and refresh website designs to improve user experience, visual appeal, and overall brand consistency.' },
            { name: 'CMS Website Development', description: 'We develop CMS websites that allow easy updates, flexibility, and efficient content control.' },
            { name: 'Front-End Custom Design', description: 'We design responsive and interactive front-end interfaces that enhance usability and deliver seamless user experiences across devices.' },
            { name: 'Website Copywriting', description: 'We craft clear, persuasive website content that communicates brand value and supports user engagement and conversion goals.' },
            { name: 'Conversion Optimization', description: 'We optimize website structure and user journeys to improve engagement, lead generation, and overall conversion performance.' },
            { name: 'Search Engine Optimization (SEO)', description: 'We implement SEO best practices to improve search visibility, increase organic traffic, and strengthen online presence.' },
            { name: 'AR/VR/MR Development', description: 'We develop immersive augmented, virtual, and mixed reality experiences that enhance engagement and create innovative brand interactions.' },
            { name: 'App Development', description: 'We build mobile and web applications that support business operations, improve accessibility, and enhance customer engagement.' },
        ]
    },
];

// --- CIRCULAR TEXT COMPONENT ---
const CircularText = ({ text, radiusX, radiusY, duration, textColor = 'rgba(150,137,95,0.5)', direction = 1 }) => {
    const pathId = `circlePath-${radiusX}-${direction}`;
    const w = radiusX * 2;
    const h = radiusY * 2;
    return (
        <div className="relative" style={{ width: w, height: h }}>
            <svg width={w} height={h} className="absolute inset-0" style={{ animation: `spin-text ${duration}s linear infinite ${direction < 0 ? 'reverse' : ''}` }}>
                <defs>
                    <path id={pathId} d={`M ${radiusX},${radiusY} m -${radiusX},0 a ${radiusX},${radiusY} 0 1,1 ${w},0 a ${radiusX},${radiusY} 0 1,1 -${w},0`} fill="none" />
                </defs>
                <text fill={textColor} className={`${MoonlanderFont.className}`} style={{ fontSize: '18px' }}>
                    <textPath href={`#${pathId}`}>{text}</textPath>
                </text>
            </svg>
            <style jsx>{`
                @keyframes spin-text {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

// --- SERVICE CARD COMPONENT ---
const ServiceCard = ({ service, index, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            className="relative group h-full cursor-pointer"
        >
            <motion.div
                className="relative h-full p-5 sm:p-6 md:p-7 rounded-2xl border-2 bg-black/50 backdrop-blur-sm overflow-hidden flex flex-col"
                style={{ borderColor: isHovered ? `${service.color}80` : `${service.color}20` }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Animated border glow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, transparent, ${service.color}30, transparent)`,
                        backgroundSize: '200% 200%',
                    }}
                    animate={isHovered ? { backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Inner glow */}
                <div className="absolute inset-[2px] rounded-2xl bg-black/60 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between gap-3 md:gap-4 flex-1">
                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        {/* Icon */}
                        <motion.div
                            className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br border-2 flex items-center justify-center"
                            style={{
                                borderColor: isHovered ? `${service.color}60` : `${service.color}30`,
                                background: isHovered
                                    ? `linear-gradient(135deg, ${service.color}20, ${service.color}10)`
                                    : `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                            }}
                            animate={isHovered ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-xl sm:text-2xl md:text-3xl" style={{ color: service.color }}>
                                {service.icon}
                            </span>
                        </motion.div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <h3
                                className={`${MoonlanderFont.className} text-lg sm:text-xl md:text-2xl font-black text-white uppercase leading-tight transition-all duration-300`}
                                style={{
                                    color: isHovered ? service.color : '#ffffff',
                                    textShadow: isHovered ? `0 0 20px ${service.color}40` : 'none',
                                }}
                            >
                                {service.name}
                            </h3>
                            <motion.div
                                className="h-[2px] mt-2 rounded-full"
                                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                                initial={{ width: '30%' }}
                                animate={{ width: isHovered ? '100%' : '30%' }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center"
                        style={{
                            borderColor: isHovered ? `${service.color}60` : `${service.color}20`,
                            background: isHovered ? `${service.color}15` : 'transparent',
                        }}
                        animate={isHovered ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.div>
                </div>

                {/* Decorative corner accents */}
                {isHovered && (
                    <>
                        <motion.div
                            className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl pointer-events-none"
                            style={{ background: `radial-gradient(circle at top right, ${service.color}15, transparent)` }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl pointer-events-none"
                            style={{ background: `radial-gradient(circle at bottom left, ${service.color}10, transparent)` }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                        />
                    </>
                )}

                {/* Floating particles */}
                {isHovered && (
                    <>
                        <motion.div
                            className="absolute w-1.5 h-1.5 rounded-full"
                            style={{ background: service.color, top: '15%', right: '10%', opacity: 0.6 }}
                            animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute w-1 h-1 rounded-full"
                            style={{ background: service.color, bottom: '20%', left: '15%', opacity: 0.4 }}
                            animate={{ y: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
function OurServices() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const router = useRouter();
    const [radii, setRadii] = useState({ primary: 450, secondary: 550 });
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 768) {
                setRadii({ primary: 280, secondary: 350 });
            } else if (window.innerWidth < 1024) {
                setRadii({ primary: 380, secondary: 460 });
            } else {
                setRadii({ primary: 450, secondary: 550 });
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setAnimationKey(prev => prev + 1);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return (
        <section
            ref={ref}
            className='w-full flex justify-center items-center py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden'
        >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <CSSStars />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.85) 100%)" }} />
                <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(150, 137, 95, 0.08) 0%, rgba(150, 137, 95, 0) 70%)" }} />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/30" />

            {/* Circular text ornament */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-20 pointer-events-none">
                <motion.div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2">
                    <CircularText
                        key={animationKey + '_secondary'}
                        text=" / STRATEGY / BRANDING & CREATIVE / MARKETING / MEDIA / SOCIAL MEDIA / SOFTWARE / EVENTS"
                        radiusX={radii.secondary}
                        radiusY={Math.round(radii.secondary * 0.65)}
                        duration={30}
                        textColor="rgba(150,137,95,0.6)"
                        direction={-1}
                    />
                </motion.div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CircularText
                        key={animationKey + '_primary'}
                        text=" / HERE'S WHAT WE OFFER / HERE'S WHAT WE OFFER / HERE'S WHAT WE OFFER"
                        radiusX={radii.primary}
                        radiusY={Math.round(radii.primary * 0.65)}
                        duration={20}
                        direction={1}
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-30 w-full max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2"
                    >
                        <h2 className={`${MoonlanderFont.className} font-black text-2xl sm:text-3xl md:text-5xl`}>
                            <span className="text-[#f5f5f5]">THE PROMETHEUS </span>
                            <span className="text-prOrange">EXPERIENCE</span>
                            <span className="text-[#f5f5f5]"> BEGINS HERE</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <FuturisticDivider color="#96895F" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className={`${RajdhaniFont.className} text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/85 mt-4 md:mt-6 max-w-4xl mx-auto`}
                        style={{ letterSpacing: '0.06em', lineHeight: '1.5', fontWeight: '500' }}
                    >
                        Explore our comprehensive range of services
                    </motion.p>
                </div>

                {/* Services grid */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            className="w-full lg:w-[calc(33.333%-14px)] xl:w-[calc(33.333%-16px)]"
                        >
                            <ServiceCard
                                service={service}
                                index={index}
                                onClick={() => router.push(service.href)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurServices;
