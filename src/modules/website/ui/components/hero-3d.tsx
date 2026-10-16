"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Float,
    MeshDistortMaterial,
    Sphere,
    PerspectiveCamera,
    Environment,
    ContactShadows,
    PresentationControls
} from "@react-three/drei";
import * as THREE from "three";

const AnimatedShape = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.1;
        meshRef.current.rotation.y = t * 0.15;
        meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    });

    return (
        <PresentationControls
            global
            snap
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={meshRef} args={[1.5, 128, 128]}>
                    <MeshDistortMaterial
                        color="#ffffff"
                        speed={2}
                        distort={0.3}
                        radius={1}
                        transmission={1}
                        thickness={1}
                        roughness={0}
                        envMapIntensity={2}
                    />
                </Sphere>
            </Float>
        </PresentationControls>
    );
};

const ParticleField = () => {
    const count = 3000;
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        const color = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 15;

            color[i * 3] = 0.5 + Math.random() * 0.5;
            color[i * 3 + 1] = 0.5 + Math.random() * 0.5;
            color[i * 3 + 2] = 1;
        }
        return { p, color };
    }, []);

    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[points.p, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[points.color, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const Hero3D = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/20 to-transparent dark:from-primary/10">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <AnimatedShape />
                <ParticleField />

                <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={0.25}
                    scale={15}
                    blur={3}
                    far={5}
                />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
};
