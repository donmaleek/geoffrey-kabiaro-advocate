'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  emissiveColor: string;
  hasAntenna?: boolean;
}

function Building({ position, height, width, depth, emissiveColor, hasAntenna }: BuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const windowRows = Math.floor(height * 3);
  const windowCols = Math.floor(width * 4);

  return (
    <group position={position}>
      {/* Main structure */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#0d2035"
          emissive={emissiveColor}
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Glowing windows layer */}
      <mesh position={[0, height / 2, depth / 2 + 0.01]}>
        <planeGeometry args={[width * 0.85, height * 0.85]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Rooftop glow */}
      <pointLight
        position={[0, height + 0.5, 0]}
        color={emissiveColor}
        intensity={0.3}
        distance={3}
      />

      {/* Antenna */}
      {hasAntenna && (
        <mesh position={[0, height + 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 6]} />
          <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
        </mesh>
      )}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial
        color="#040a10"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

function Stars() {
  const starPositions = useMemo(() => {
    const positions = new Float32Array(600);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 40 + 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.12} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export function NairobiSkyline() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  const buildings = useMemo<BuildingProps[]>(() => {
    const seed = [
      // Iconic tall buildings (KICC-inspired center cluster)
      { position: [0, 0, 0] as [number, number, number], height: 8, width: 1.2, depth: 1.2, emissiveColor: '#FFD700', hasAntenna: true },
      { position: [2, 0, 0] as [number, number, number], height: 6, width: 1, depth: 1, emissiveColor: '#4488ff', hasAntenna: false },
      { position: [-2, 0, 0] as [number, number, number], height: 5.5, width: 1, depth: 1.2, emissiveColor: '#FFD700', hasAntenna: false },
      { position: [0.5, 0, 2] as [number, number, number], height: 5, width: 1.1, depth: 1.1, emissiveColor: '#44aaff', hasAntenna: true },
      { position: [-1.5, 0, 1.5] as [number, number, number], height: 4.5, width: 0.9, depth: 0.9, emissiveColor: '#FFD700', hasAntenna: false },

      // Mid-range buildings
      { position: [4, 0, 1] as [number, number, number], height: 4, width: 1.3, depth: 1, emissiveColor: '#3366ff', hasAntenna: false },
      { position: [-4, 0, 0.5] as [number, number, number], height: 4.2, width: 1.1, depth: 1.3, emissiveColor: '#FFD700', hasAntenna: false },
      { position: [3, 0, -2] as [number, number, number], height: 3.8, width: 1, depth: 1.2, emissiveColor: '#44aaff', hasAntenna: true },
      { position: [-3.5, 0, -1.5] as [number, number, number], height: 3.5, width: 1.2, depth: 1, emissiveColor: '#FFD700', hasAntenna: false },
      { position: [1, 0, -3] as [number, number, number], height: 4.5, width: 0.8, depth: 0.8, emissiveColor: '#3366ff', hasAntenna: false },

      // Background buildings
      { position: [6, 0, 3] as [number, number, number], height: 2.5, width: 1.5, depth: 1.2, emissiveColor: '#FFD700', hasAntenna: false },
      { position: [-6, 0, 2] as [number, number, number], height: 3, width: 1.3, depth: 1.5, emissiveColor: '#4488ff', hasAntenna: false },
      { position: [5, 0, -4] as [number, number, number], height: 2.8, width: 1.4, depth: 1, emissiveColor: '#FFD700', hasAntenna: false },
      { position: [-5, 0, -3] as [number, number, number], height: 2.5, width: 1.2, depth: 1.4, emissiveColor: '#44aaff', hasAntenna: false },
      { position: [7, 0, -1] as [number, number, number], height: 2, width: 1.6, depth: 1.3, emissiveColor: '#FFD700', hasAntenna: false },
      { position: [-7, 0, -0.5] as [number, number, number], height: 2.2, width: 1.4, depth: 1.6, emissiveColor: '#3366ff', hasAntenna: false },
    ];
    return seed;
  }, []);

  return (
    <group ref={groupRef}>
      <Ground />
      <Stars />

      {/* Ambient city glow */}
      <pointLight position={[0, 2, 0]} color="#FFD700" intensity={0.4} distance={20} />
      <pointLight position={[5, 3, 5]} color="#4488ff" intensity={0.2} distance={15} />
      <pointLight position={[-5, 3, -5]} color="#FFD700" intensity={0.2} distance={15} />

      {/* Fog-like ground glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.05}
          transparent
          opacity={0.15}
        />
      </mesh>

      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}
    </group>
  );
}
