"use client";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import dynamic from "next/dynamic";
import React from "react";

const useDeviceNoSSR = dynamic(
  () => import("../../app/hooks/useDeviceDetect"),
  { ssr: false }
);

const Stars = React.memo(() => {
  const ref = useRef();
  const { isMobile } = useDeviceNoSSR();

  // Memoize sphere positions so they are not recalculated on every render
  const sphere = useState(() =>
    random.inSphere(new Float32Array(isMobile ? 700 : 1200), { radius: 1.2 })
  )[0];

  useFrame((state, delta) => {
    // Simple, continuous rotation for performance
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
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
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;