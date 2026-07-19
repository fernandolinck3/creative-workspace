import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html, Float, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

export interface PhoneSceneProps {
  /** The real DOM/React content projected onto the phone screen (e.g. the WhatsApp chat UI already built for chatbot-product). */
  children: ReactNode;
  /** Screen width/height in CSS px — tune alongside distanceFactor until the content reads at the right size. */
  screenSize?: { width: number; height: number };
  /** Converts CSS px to 3D units for the projected DOM. Smaller = content appears larger. */
  distanceFactor?: number;
  bodyColor?: string;
  /** Slight standing rotation so the phone reads as a product shot, not a flat front view. */
  rotation?: [number, number, number];
}

/**
 * Phone mockup with a *real* DOM element projected onto its screen via
 * drei's <Html transform occlude>, instead of baking the chat UI into a
 * texture. This keeps text crisp at any zoom and reuses the exact chat
 * component already animated in CSS/JS (see apps/chatbot-product), rather
 * than reimplementing it as a 3D-native scene.
 *
 * Must be rendered inside <SceneCanvas>, never a bare <Canvas> — this
 * scene is the most expensive one in the workspace (Html occlude + Float
 * together), so SceneCanvas's low-capability fallback matters most here.
 */
export function PhoneScene({
  children,
  screenSize = { width: 300, height: 630 },
  distanceFactor = 1.35,
  bodyColor = "#1a1d1d",
  rotation = [0.05, -0.35, 0],
}: PhoneSceneProps) {
  const phoneRef = useRef<Group>(null);

  // Tiny idle drift on top of Float's own motion, kept very subtle —
  // a phone shouldn't swing like an abstract shape (rigidity reads as
  // "real object" here, unlike ParticleField/Blob).
  useFrame((state) => {
    if (!phoneRef.current) return;
    phoneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={phoneRef} rotation={rotation}>
          {/* Body — outer rounded frame. */}
          <RoundedBox args={[1.8, 3.7, 0.18]} radius={0.14} smoothness={6}>
            <meshStandardMaterial color={bodyColor} roughness={0.35} metalness={0.6} />
          </RoundedBox>

          {/* Screen backing — prevents seeing through to the body behind the DOM layer. */}
          <mesh position={[0, 0, 0.095]}>
            <planeGeometry args={[1.62, 3.4]} />
            <meshBasicMaterial color="#000000" />
          </mesh>

          {/* Real DOM content projected onto the screen position. occlude
              makes Three.js depth-test it against the rest of the scene
              instead of always rendering on top. */}
          <Html
            transform
            occlude
            position={[0, 0, 0.096]}
            distanceFactor={distanceFactor}
            style={{ width: `${screenSize.width}px`, height: `${screenSize.height}px` }}
          >
            {children}
          </Html>
        </group>
      </Float>

      {/*
        Contact shadow lives OUTSIDE the <Float> group intentionally: it
        anchors the phone to the ground plane. If nested inside Float it
        would float/rotate along with the phone, which reads as wrong —
        a dropped shadow should stay fixed while only the object above it
        moves.
      */}
      <ContactShadows position={[0, -2, 0]} opacity={0.45} scale={6} blur={2.4} far={3} />
    </>
  );
}
