"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { gsap } from "gsap";
import { a } from "@react-spring/three";

export function Shapes() {
  const devicePixelRatio =
    typeof window !== "undefined" ? window.devicePixelRatio : 1;

  return (
    <div className="flex h-full w-full items-center justify-center aspect-square mx-auto max-w-[28rem] md:mx-0 md:max-w-none md:translate-x-[-1.5rem]">
      <Canvas
        className="z-5 w-full"
        gl={{ antialias: true }}
        dpr={devicePixelRatio}
        camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 2000 }}
      >
        {/* Guaranteed visibility */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />

        {/* Suspense is optional with useGLTF because drei caches, but it's fine */}
        <Rocket />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

// Optional: prefetch so it starts loading earlier

function Rocket(props) {
  // IMPORTANT: file must be in /public so this path works
  const { scene } = useGLTF("/test-v2.glb");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsSmallScreen(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // You will almost certainly need to scale CAD exports
  useFrame((state) => {
    scene.rotation.y = state.clock.getElapsedTime() * 0.1;
    scene.rotation.x = 1.1;
  });

  return (
    <primitive
      object={scene}
      scale={isSmallScreen ? 60.0 : 50.0}
      position={[0, isSmallScreen ? -0.9 : -1.0, 0]}
      {...props}
    />
  );
}
