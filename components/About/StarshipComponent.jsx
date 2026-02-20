"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const starshipIcons = [
  "/LandingPageAssets/starshipsAnimated/CORTX.webp",
  "/LandingPageAssets/starshipsAnimated/craetr.webp",
  "/LandingPageAssets/starshipsAnimated/JPEP.webp",
  "/LandingPageAssets/starshipsAnimated/nerv.webp",
  "/LandingPageAssets/starshipsAnimated/spectr.webp",
  "/LandingPageAssets/starshipsAnimated/warp.webp",
  "/LandingPageAssets/starshipsAnimated/promises.webp",
];

function StarshipComponent({ index, setActiveShip }) {
  const [prevIndex, setPrevIndex] = useState(index);
  const [currentImageIndex, setCurrentImageIndex] = useState(index);

  useEffect(() => {
    if (index !== currentImageIndex) {
      setPrevIndex(currentImageIndex);
      setCurrentImageIndex(index);
    }
  }, [index, currentImageIndex]);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <motion.img
        key={`out-${prevIndex}`}
        className="absolute max-h-[80%] object-contain"
        initial={{ scale: 1 }}
        animate={{ scale: 0.001 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src={starshipIcons[prevIndex]}
        alt=""
      />
      <motion.img
        key={`in-${currentImageIndex}`}
        className="max-h-[80%] object-contain cursor-pointer"
        initial={{ scale: 0.001 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
          delay: 0.5,
        }}
        onClick={() => setActiveShip(index)}
        src={starshipIcons[currentImageIndex]}
        alt=""
      />
    </div>
  );
}

export default StarshipComponent;
