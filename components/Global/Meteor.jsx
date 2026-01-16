import React from "react";
import clsx from "clsx";

export const Meteors = ({ number }) => {
    const meteors = new Array(number || 20).fill(true);
    return (
        <>
            {meteors.map((el, idx) => (
                <span
                    key={"meteor" + idx}
                    className={clsx(
                        "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
                        "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
                    )}
                    style={{
                        // --- 1. REMOVE THIS LINE ---
                        // top: 0, 

                        // --- 2. UPDATE THIS LINE TO USE PERCENTAGES ---
                        left: Math.floor(Math.random() * 200 - 100) + "%",

                        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
                        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
                    }}
                ></span>
            ))}
        </>
    );
};