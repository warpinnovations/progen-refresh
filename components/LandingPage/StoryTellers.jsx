"use client";
import React, { useEffect, useState } from 'react';

function StoryTellers() {
    const storyTellers = [


        {
            name: "BENJAMIN AUSTIN PE",
            img: "/LandingPageAssets/storytellers/benj_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/benj_wacky.webp",
            role: "Creative Director"
        },

        {
            name: "GINO FANEGA",
            img: "/LandingPageAssets/storytellers/gino_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/gino_wacky.webp",
            role: "Executive Creative Director"
        },
        {
            name: "LCID FERNANDEZ",
            img: "/LandingPageAssets/storytellers/lcid_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/lcid_wacky.webp",
            role: "Chief Executive Officer"
        },

        {
            name: "BLESSED BEA PLONDAYA",
            img: "/LandingPageAssets/storytellers/bea_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/bea_wacky.webp",
            role: "Chief Operations Officer"
        },
        {
            name: "A FREDERICK SANSAIT",
            img: "/LandingPageAssets/storytellers/a_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/a_wacky.webp",
            role: "WARP - Chief Operations Officer"
        },
        {
            name: "Kevin Atutubo",
            img: "/LandingPageAssets/storytellers/kevin_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/kevin_wacky.webp",
            role: "WARP - Chief Technical Officer"
        },
        {
            name: "Alyanna Comprendio",
            img: "/LandingPageAssets/storytellers/aly_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/aly_wacky.webp",
            role: "Accounts Manager"
        },
        {
            name: "Esther Marie Sazon",
            img: "/LandingPageAssets/storytellers/esther_formal.webp",
            imgColored: "/LandingPageAssets/storytellers/esther_wacky.webp",
            role: "Copy Manager"
        },

    ];



    const handleClick = (index) => {
        if (index === 2) {
            setBatman(!batman); // Toggle the state of batman
        }
    };

    let longPressTimer;
    const [isLongPress, setIsLongPress] = useState(false);

    const handleLongPressStart = (event, index) => {
        event.preventDefault(); // Prevent the default context menu (e.g., "Save Image")
        setIsLongPress(false);
        longPressTimer = setTimeout(() => {
            setIsLongPress(true);
            setActiveIndex(index);
        }, 1000);
    };

    const handleLongPressEnd = () => {
        clearTimeout(longPressTimer); // Clear the timer if the press is released before the delay
    };

    const [activeIndex, setActiveIndex] = useState(3);
    const [batman, setBatman] = useState(false);

    useEffect(() => {

    }, [activeIndex, batman]);

    return (
        <div className='flex justify-center items-center'>

            <div className="flex w-[1020px] justify-center items-center space-y-3 space-x-3 md:space-x-5 mt-10 flex-row flex-wrap">
                {storyTellers.map((storyTeller, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer rounded-lg shadow-md transform transition-transform hover:scale-105 ${index === 0 ? 'mt-3 ml-3' : ''}`}
                        onClick={() => {
                            handleClick(index);
                            setActiveIndex(index); // Update the active index on click
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        onTouchStart={(event) => handleLongPressStart(event, index)}
                        onTouchEnd={handleLongPressEnd} // End long-press detection
                        onTouchCancel={handleLongPressEnd} // End long-press detection
                    >
                        {
                            batman ? (
                                <div className={`bg-[#141414] rounded-xl pt-3 w-32 h-72  md:w-44 md:h-96 overflow-hidden `}>

                                    {index === 2 ? (
                                        <img
                                            src={'/LandingPageAssets/storytellers/batman.webp'}
                                            alt={storyTeller.name}
                                            className={`w-full h-full object-cover transition-transform hover:scale-105`}
                                        />
                                    ) :
                                        (
                                            <img
                                                src={storyTeller.img}
                                                alt={storyTeller.name}
                                                className={`w-full h-full filter grayscale object-cover transition-transform hover:scale-105`}
                                            />
                                        )}
                                </div>
                            ) : (
                                <div className={`bg-[#141414] rounded-xl pt-3 w-32 h-72  md:w-44 md:h-96 overflow-hidden `}>

                                    {activeIndex === index ? (
                                        <div className='w-full h-full relative'>

                                            <div className='absolute z-50 bottom-10 left-0 right-0 flex flex-col text-xs md:text-sm h-auto py-3 px-1 md:px-0 w-full bg-black/50 text-white  justify-center items-center font-ox font-black'>
                                                <div>
                                                    {storyTeller.name.toLocaleUpperCase()}
                                                </div>


                                                <div className='text-prOrange'>

                                                    {storyTeller.role.toLocaleUpperCase()}
                                                    

                                                </div>
                                            </div>


                                            <img
                                                src={storyTeller.imgColored}
                                                alt={storyTeller.name}
                                                className={`w-full h-full object-cover transition-transform hover:scale-105`}
                                            />
                                        </div>

                                    ) :
                                        (
                                            <img
                                                src={storyTeller.img}
                                                alt={storyTeller.name}
                                                className={`w-full h-full filter grayscale object-cover transition-transform hover:scale-105`}
                                            />
                                        )}
                                </div>
                            )
                        }



                    </div>
                ))}
            </div>



        </div>
    );
}
export default StoryTellers;
