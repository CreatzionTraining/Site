"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Trail } from "@react-three/drei";
import * as THREE from "three";

function Electron({ radius = 2.6, speed = 4.5, ...props }: any) {
  const ref = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.set(Math.sin(t) * radius, Math.cos(t * 0.9) * radius * 0.25, Math.cos(t) * radius * 0.15);
    }
  });

  return (
    <group {...props}>
      <Trail local width={4} length={6} color="#00a8ff" attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial color={"#0069c7"} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

export default function Scene() {
  return (
    <>
      {/* <color attach="background" args={["#02020a"]} /> */}
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]} intensity={0.9} color="#7c9cff" />
      <pointLight position={[-6, -4, -6]} intensity={0.4} color="#8ddcff" />

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[0, 0.2, 0]}>
          <icosahedronGeometry args={[0.6, 2]} />
          <meshStandardMaterial color="#0082ef" metalness={0.6} roughness={0.15} />
        </mesh>
      </Float>

      <Electron />
      <Electron position={[0, 0, 0.5]} speed={5.4} />
      <Electron position={[0, 0, -0.5]} speed={6.0} />

      <mesh position={[3.8, -2.2, -5]} visible={false}>
        <torusGeometry args={[3, 0.18, 16, 100]} />
      </mesh>
    </>
  );
}
