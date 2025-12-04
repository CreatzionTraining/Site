"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, OrbitControls } from "@react-three/drei";

function Globe() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 150; i++) {
      const phi = Math.acos(-1 + (2 * i) / 150);
      const theta = Math.sqrt(150 * Math.PI) * phi;
      p.push(new THREE.Vector3().setFromSphericalCoords(2.2, phi, theta));
    }
    return p;
  }, []);

  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 0.8) {
          l.push(points[i], points[j]);
        }
      }
    }
    return l;
  }, [points]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core Sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#001e3c" transparent opacity={0.8} />
      </Sphere>

      {/* Points */}
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#00a8ff" />
        </mesh>
      ))}

      {/* Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length}
            array={new Float32Array(lines.flatMap(v => [v.x, v.y, v.z]))}
            itemSize={3}
            args={[new Float32Array(lines.flatMap(v => [v.x, v.y, v.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0056b3" transparent opacity={0.3} />
      </lineSegments>

      {/* Atmosphere Glow */}
      <mesh scale={[2.4, 2.4, 2.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#0082ef" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Globe />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}
