import { useEffect, useState } from "react";

export type DeviceCapability = "high" | "medium" | "low";

interface CapabilityHeuristics {
  cores: number;
  memory: number | null;
  isMobile: boolean;
  dpr: number;
}

function classify({ cores, memory, isMobile, dpr }: CapabilityHeuristics): DeviceCapability {
  // Mobile + low core count is the clearest signal of a weak device —
  // matches the "3D Responsive Strategy" table in the 3d-website-architect
  // skill (mobile → CSS/static fallback, tablet → reduced, desktop → full).
  if (isMobile && cores <= 4) return "low";
  if (memory !== null && memory <= 4) return "low";
  if (isMobile || cores <= 6) return "medium";
  if (dpr > 2.5) return "medium"; // very high-res displays cost more to render at full quality
  return "high";
}

/**
 * One-shot (computed once on mount, capability doesn't change mid-session)
 * classification of the device into "high" | "medium" | "low", used by
 * SceneCanvas and individual scenes to scale particle counts, disable
 * post-processing, or fall back to a static image entirely.
 *
 * Heuristics: navigator.hardwareConcurrency, navigator.deviceMemory
 * (Chromium-only, so treated as optional), a mobile UA/pointer check, and
 * devicePixelRatio — see Step 11 of the 3d-website-architect skill.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>("high");

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;

    const cores = navigator.hardwareConcurrency ?? 4;
    // deviceMemory is non-standard (Chromium only); absent elsewhere.
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null;
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const dpr = window.devicePixelRatio || 1;

    setCapability(classify({ cores, memory, isMobile, dpr }));
  }, []);

  return capability;
}
