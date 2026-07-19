import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

export type GeometryKind = "icosahedron" | "torus" | "octahedron";

export interface FloatingGeometryProps {
  kind?: GeometryKind;
  color?: string;
  /** Overall scale of the mesh. */
  scale?: number;
  /** How much the material distorts over time (0 = static shape). */
  distort?: number;
  /** Base rotation speed in radians/sec on the Y axis. */
  rotationSpeed?: number;
}

/**
 * A single abstract shape (icosahedron/torus/octahedron) with a slow
 * organic distortion + float — the "signature" hero shape used across
 * personal-agency and client-agency heroes per ESCOPO_ESPACO_CRIATIVO.md.
 */
export function FloatingGeometry({
  kind = "icosahedron",
  color = "#6366f1",
  scale = 1.4,
  distort = 0.3,
  rotationSpeed = 0.15,
}: FloatingGeometryProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * rotationSpeed;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.4;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={scale}>
        {kind === "icosahedron" && <icosahedronGeometry args={[1, 1]} />}
        {kind === "torus" && <torusGeometry args={[1, 0.4, 32, 100]} />}
        {kind === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.6}
          distort={distort}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}
