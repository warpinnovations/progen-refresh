
import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Sphere } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { MathUtils, Vector3, TextureLoader } from "three";
import * as THREE from "three"
import texturePlanet from "../../public/LandingPageAssets/texture.webp"
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
// import {useDeviceDetect} from "../../app/hooks/useDeviceDetect"
 


const useDeviceNoSSR = dynamic(() => import("../../app/hooks/useDeviceDetect"), {ssr: false})

const RotatingPlanet = () => {
  const texture = useLoader(THREE.TextureLoader, texturePlanet);
  const sphereRef = useRef();

  useFrame(() => {
    sphereRef.current.rotation.y += 0.001; // Rotate the planet
  });

  return (
    <mesh ref={sphereRef} scale={[0.5, 0.5, 0.5]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={"gray"} map={texture} />
    </mesh>
  );
};

const Stars = (props) => {
    const ref = useRef();
    // Reference to the OrbitControls instance

    const { mouse } = useThree();
    // Initial rotation angles
    const initialRotation = new Vector3(0, 0, Math.PI / 4);
    const [rotation, setRotation] = useState(initialRotation);
  
    const [sphere] = useState(() => random.inSphere(new Float32Array(1500), { radius: 1.2 }));
  
    const targetStarsRotation = new Vector3(0, 0, 0); // Initial rotation
    const dampingFactor = 0.05; // Adjust this value for smoother or slower movement
    const maxRotation = Math.PI / 4; // Adjust this value to set the maximum rotation
  
    useFrame((state, delta) => {
      // Calculate new stars rotation based on mouse movement
      targetStarsRotation.x = MathUtils.clamp((mouse.y - 0.5) * 2, -maxRotation, maxRotation);
      targetStarsRotation.y = MathUtils.clamp((mouse.x - 0.5) * 2, -maxRotation, maxRotation);
  
      // Damping effect for smoother movement
      rotation.x = MathUtils.lerp(rotation.x, targetStarsRotation.x, dampingFactor);
      rotation.y = MathUtils.lerp(rotation.y, targetStarsRotation.y, dampingFactor);
  
      rotation.x += 0.001
      rotation.y += 0.001

      ref.current.rotation.y += 0.0005; 
      ref.current.rotation.x += 0.0005; 

      //ref.current.rotation.set(rotation.x, rotation.y, rotation.z); // Apply rotation
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
  
const StarsCanvas = ( {hidden} ) => {
  const controlsRef = useRef();
  const { isMobile } = useDeviceNoSSR()

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ambientLight />
          {
            !hidden ?? <RotatingPlanet />
          }
         
          <Stars />
          {!isMobile && ( // Conditionally render OrbitControls based on the device type
            <OrbitControls
              enablePan={true}
              enableZoom={false}
              enableRotate={true}
              mouseButtons={{
                LEFT: 0, // Disable rotation
                MIDDLE: 2, // Enable zoom
                RIGHT: 0, // Disable panning
              }}
            />
          )}
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
