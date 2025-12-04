"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";

// Floating particle system
function DataParticle({ position, color, speed }: any) {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.01;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <Trail width={2} length={8} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Trail>
  );
}

// Main tech sphere with distortion
function TechCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 100, 100]}>
        <MeshDistortMaterial
          color="#2563eb"
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Inner glow sphere */}
      <Sphere args={[1.3, 64, 64]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.2} />
      </Sphere>
      
      {/* Outer wireframe */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.1} />
      </Sphere>
    </Float>
  );
}

export default function TechScene() {
  // Generate random particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      color: Math.random() > 0.5 ? "#3b82f6" : "#60a5fa",
      speed: 0.5 + Math.random() * 1.5,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#3b82f6" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <TechCore />
      
      {particles.map((particle, i) => (
        <DataParticle key={i} {...particle} />
      ))}
      
      {/* Rotating rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
    </>
  );
}
