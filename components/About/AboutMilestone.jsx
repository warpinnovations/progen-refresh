import React from 'react';
import { FaTrophy, FaAward, FaBuilding, FaStar, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

// --- Data for the Milestones Timeline ---
const milestonesData = [
    {
        year: '2018',
        title: 'WARP Technologies Founded',
        description: 'Started with three co-founders in a small office in Makati City.',
    },
    {
        year: '2019',
        title: 'First Major Client',
        description: 'Secured partnership with a leading telecom company for an IoT solution.',
    },
    {
        year: '2020',
        title: 'Team Expansion',
        description: 'Grew to a team of 10 and moved to our current office in BGC.',
    },
    {
        year: '2021',
        title: 'First International Client',
        description: 'Expanded our reach with projects in Singapore and the United States.',
    },
    {
        year: '2022',
        title: 'First Tech Patent',
        description: 'Secured patent for our innovative AR-based training platform.',
    },
    {
        year: '2023',
        title: 'Recognition & Growth',
        description: 'Named one of the Top 10 Most Innovative Companies in the Philippines.',
    },
];

// --- Data for the Awards & Recognition Section ---
const awardsData = [
    {
        icon: <FaTrophy />,
        title: 'Philippine Technology Excellence Award',
        description: 'For innovation in AR/VR solutions, 2022',
    },
    {
        icon: <FaAward />,
        title: 'ASEAN Business Innovation Award',
        description: 'Finalist for our HomeWARP IoT platform, 2021',
    },
    {
        icon: <FaBuilding />,
        title: 'Top 10 Most Innovative Companies',
        description: 'Philippine Business Magazine, 2023',
    },
    {
        icon: <FaStar />,
        title: 'Best Workplace in Tech',
        description: 'HR Asia Awards, 2022',
    },
    {
        icon: <FaLightbulb />,
        title: 'Innovation in Education Technology',
        description: 'EdTech Asia Summit, 2023',
    },
];

const MilestonesSection = () => {
    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <span className="text-sm font-semibold text-gray-500 bg-orange-100 rounded-full px-4 py-1">
                    Our Impact
                </span>
                <h2 className="text-4xl font-bold text-gray-800 mt-4">Milestones & Achievements</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Our journey has been marked by continuous growth, innovation, and recognition.
                </p>
            </div>

            <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Left Side: Timeline */}
                <div className="lg:col-span-3">
                    <div className="relative border-l-2 border-orange-200 pl-8">
                        {milestonesData.map((item, index) => (
                            <motion.div
                                key={index}
                                className="mb-10"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="absolute -left-3.5 mt-1.5 w-6 h-6 bg-orange-400 rounded-full border-4 border-white"></div>
                                <p className="text-sm font-semibold text-orange-500">{item.year}</p>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">{item.title}</h3>
                                <p className="text-gray-600 mt-1">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Awards Card */}
                <div className="lg:col-span-2">
                    <motion.div
                        className="bg-gray-50 rounded-2xl p-8 h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-800 text-left">Awards & Recognition</h3>
                        <div className="mt-6 space-y-6">
                            {awardsData.map((award, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-500 rounded-lg text-xl">
                                        {award.icon}
                                    </div>
                                    <div className="ml-4 text-left">
                                        <h4 className="font-bold text-gray-800">{award.title}</h4>
                                        <p className="text-sm text-gray-600">{award.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};