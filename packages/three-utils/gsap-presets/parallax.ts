import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxOptions {
  /** Distance (px) the target travels over the scroll range. Negative = moves up. */
  distance?: number;
  /** Element defining the scroll range. Defaults to the target itself. */
  trigger?: string | Element;
  /** Seconds for the animation to "catch up" to scroll position; true = instant. */
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

/**
 * Scroll-scrubbed vertical translation — the standard parallax layer used
 * for hero background scenes/images drifting slower or faster than
 * foreground content.
 *
 * Uses scrub (not toggleActions) intentionally: parallax should track
 * scroll position continuously, not just play once on enter.
 */
export function parallax(target: string | Element, options: ParallaxOptions = {}) {
  const { distance = -120, trigger, scrub = 0.6, start = "top bottom", end = "bottom top" } = options;

  return gsap.to(target, {
    y: distance,
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? target,
      start,
      end,
      scrub,
    },
  });
}
