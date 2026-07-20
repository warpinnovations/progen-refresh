
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(600), { radius: 1.2 }));

    useFrame((_state, _delta) => {
      ref.current.rotation.y += 0.0003;
      ref.current.rotation.x += 0.0002;
    });
  

    return (
      <group ref={ref}>
        <Points positions={sphere} stride={3} frustumCulled {...props}>
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
  };
  
const StarsCanvas = () => {
  return (
    <div className="w-full h-full">
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
