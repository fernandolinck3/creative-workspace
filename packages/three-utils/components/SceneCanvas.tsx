import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useDeviceCapability, type DeviceCapability } from "../hooks/useDeviceCapability";

export interface SceneCanvasProps extends Omit<CanvasProps, "children" | "dpr"> {
  children: ReactNode | ((capability: DeviceCapability) => ReactNode);
  /**
   * Rendered instead of the 3D scene when the user has `prefers-reduced-motion`
   * set, or when device capability is "low". Should be a lightweight static
   * visual (image, CSS gradient) with the same rough composition as the scene.
   */
  fallback: ReactNode;
  /** Rendered while the scene's assets are loading (Suspense boundary). */
  loading?: ReactNode;
  className?: string;
}

/**
 * Single required entry point for every 3D scene in this workspace.
 *
 * No scene should be mounted with a bare <Canvas> — SceneCanvas resolves,
 * in one place, the three cross-cutting concerns every scene needs:
 *   1. WebGL/reduced-motion fallback (returns `fallback` instead of Canvas)
 *   2. Device-capability-aware pixelRatio + frameloop
 *   3. A Suspense boundary for async assets (GLTF, textures)
 *
 * Usage:
 *   <SceneCanvas fallback={<StaticHeroImage />}>
 *     {(capability) => <ParticleField density={capability} />}
 *   </SceneCanvas>
 */
export function SceneCanvas({
  children,
  fallback,
  loading = null,
  className = "",
  camera,
  ...canvasProps
}: SceneCanvasProps) {
  const reducedMotion = useReducedMotion();
  const capability = useDeviceCapability();

  const supportsWebGL = typeof window !== "undefined" && (() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      return false;
    }
  })();

  if (reducedMotion || capability === "low" || !supportsWebGL) {
    return <div className={className}>{fallback}</div>;
  }

  // devicePixelRatio capped at 2 — no benefit rendering 3x on mobile,
  // per the "3D Responsive Strategy" guidance in 3d-website-architect skill.
  const dpr: [number, number] = capability === "medium" ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      className={className}
      dpr={dpr}
      camera={camera ?? { position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: capability === "high", alpha: true }}
      {...canvasProps}
    >
      <Suspense fallback={loading}>
        {typeof children === "function" ? children(capability) : children}
      </Suspense>
    </Canvas>
  );
}
