"use client";
import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import dynamic from "next/dynamic";
import React from "react";

const useDeviceNoSSR = dynamic(
  () => import("../../app/hooks/useDeviceDetect"),
  { ssr: false }
);

const Stars = React.memo(({ isVisible }) => {
  const ref = useRef();
  const { isMobile } = useDeviceNoSSR();

  // Memoize sphere positions so they are not recalculated on every render
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(isMobile ? 500 : 800), { radius: 1.2 }),
    [isMobile]
  );

  useFrame((state, delta) => {
    if (ref.current && isVisible) {
      const cappedDelta = Math.min(delta, 0.1);
      ref.current.rotation.x -= cappedDelta / 10;
      ref.current.rotation.y -= cappedDelta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
});

Stars.displayName = "Stars";

const StarsCanvas = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only render when at least 20% of the component is visible
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '100px' // Start rendering slightly before it comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 z-[-1]">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance"
          }}
          performance={{ min: 0.5 }} // Allow frame rate to drop if needed
        >
          <Suspense fallback={null}>
            <Stars isVisible={isVisible} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default StarsCanvas;