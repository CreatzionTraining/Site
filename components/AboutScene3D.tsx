"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Float, Sparkles, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

// Preload the model for smoother loading
useGLTF.preload("/cyborg.glb");

function CyborgModel() {
    const { scene } = useGLTF("/cyborg.glb");
    const modelRef = useRef<THREE.Group>(null);

    // Auto-rotate the model slightly
    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
        }
    });

    return (
        <group ref={modelRef} position={[0, 0.1, 0]}>
            <Center>
                <primitive
                    object={scene}
                    scale={2.2}
                    rotation={[0, Math.PI, 0]}
                />
            </Center>
        </group>
    );
}

// --- OPTIMIZED PARTICLES ---
function DataCloud() {
    const count = 300;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 2; // Further out to surround the larger model
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const cloudRef = useRef<THREE.Points>(null);
    useFrame((state) => {
        if (cloudRef.current) {
            cloudRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={cloudRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#0066FF"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default function AboutScene3D() {
    return (
        <>
            {/* Interactive Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
            />

            {/* Premium Lighting Setup */}
            <ambientLight intensity={0.5} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={5}
                color="#0077FF"
            />
            <spotLight
                position={[-10, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={3}
                color="#00EAFF"
            />

            {/* Environment for shiny reflections */}
            <Environment preset="city" />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <CyborgModel />
            </Float>

            {/* Cosmetic Particles */}
            <DataCloud />
            <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#00EAFF" />
        </>
    );
}
