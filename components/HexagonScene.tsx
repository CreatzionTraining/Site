"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const Hexagon = ({ position, color, ...props }: any) => {
  const ref = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Gentle undulation
      ref.current.position.y = position[1] + Math.sin(t + position[0] * 0.5) * 0.2;
      // Color pulsing on hover
      if (hovered) {
        ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1.2, 0.1));
      } else {
        ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
      }
    }
  });

  return (
    <Instance
      ref={ref}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      color={hovered ? "#ffffff" : color}
      {...props}
    />
  );
};

export default function HexagonScene() {
  const count = 30; // Number of hexagons

  // Generate hexagonal grid positions
  const data = useMemo(() => {
    const positions = [];
    const colors = [];
    const colorPalette = ["#0056b3", "#0ea5e9", "#1e293b"]; // Brand colors

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      positions.push([x, y, z]);
      colors.push(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    }
    return { positions, colors };
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Instances range={count}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 6]} /> {/* Hexagon shape */}
          <meshStandardMaterial roughness={0.3} metalness={0.8} />

          {data.positions.map((pos, i) => (
            <Hexagon
              key={i}
              position={pos}
              color={data.colors[i]}
              rotation={[Math.PI / 2, 0, 0]} // Face forward
            />
          ))}
        </Instances>
      </Float>

      {/* Central "Logo" Hexagon */}
      <Float speed={4} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.5, 6]} />
          <meshPhysicalMaterial
            color="#0056b3"
            transmission={0.6}
            thickness={1}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        {/* Inner C shape suggestion (Torus segment) */}
        <mesh position={[0, 0, 1.3]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.8, 0.1, 16, 3]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Float>
    </>
  );
}
