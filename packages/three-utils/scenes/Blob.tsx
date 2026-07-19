import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

export interface BlobProps {
  color?: string;
  /** Radius of the base sphere before distortion. */
  radius?: number;
  /** Distortion strength — higher reads as more "liquid". */
  distort?: number;
  /** Distortion animation speed. */
  speed?: number;
}

/**
 * A soft, morphing sphere — used where FloatingGeometry's hard-edged
 * shapes would feel too sharp (e.g. chatbot-product's more approachable,
 * less "artistic" tone per ESCOPO_ESPACO_CRIATIVO.md section C).
 */
export function Blob({ color = "#25d366", radius = 1.6, distort = 0.45, speed = 1.8 }: BlobProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Very slow independent rotation — the material's own distortion
    // animation already reads as "alive", so rotation stays subtle.
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <Sphere ref={meshRef} args={[radius, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.1}
      />
    </Sphere>
  );
}
