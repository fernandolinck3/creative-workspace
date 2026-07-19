import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Points } from "three";
import type { DeviceCapability } from "../hooks/useDeviceCapability";

export interface ParticleFieldProps {
  /** Scales particle count — pass the value from SceneCanvas's render-prop. */
  density?: DeviceCapability;
  /** Hex or CSS color string for the particles. Defaults to the accent CSS var via prop, since materials can't read CSS vars directly. */
  color?: string;
  /** How strongly particles drift toward the pointer. 0 disables the effect. */
  pointerInfluence?: number;
}

const COUNT_BY_DENSITY: Record<DeviceCapability, number> = {
  high: 2400,
  medium: 1000,
  low: 400, // only reached if SceneCanvas's fallback threshold changes; kept as a safe floor
};

/**
 * A drifting field of points, gently attracted toward the pointer.
 * Positions are precomputed once (useMemo) and mutated via refs inside
 * useFrame — per r3f-best-practices, never setState in useFrame.
 */
export function ParticleField({
  density = "high",
  color = "#ffffff",
  pointerInfluence = 0.4,
}: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);
  const count = COUNT_BY_DENSITY[density];
  const { viewport } = useThree();

  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 1.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return [pos, pos.slice()];
  }, [count, viewport.width, viewport.height]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const geomPositions = points.geometry.attributes.position;
    const array = geomPositions.array as Float32Array;
    const { x: pointerX, y: pointerY } = state.pointer; // normalized -1..1
    const targetX = (pointerX * viewport.width) / 2;
    const targetY = (pointerY * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = basePositions[ix];
      const by = basePositions[ix + 1];

      // Gentle continuous drift (sine offset per-particle) + pointer pull.
      const drift = Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.15;

      const dx = pointerInfluence > 0 ? (targetX - bx) * pointerInfluence * 0.02 : 0;
      const dy = pointerInfluence > 0 ? (targetY - by) * pointerInfluence * 0.02 : 0;

      array[ix] = bx + dx;
      array[ix + 1] = by + drift + dy;
    }

    geomPositions.needsUpdate = true;
    points.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}
