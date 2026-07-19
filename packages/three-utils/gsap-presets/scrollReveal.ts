import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealOptions {
  /** Vertical offset (px) elements start from, animating to 0. */
  y?: number;
  /** Stagger delay (seconds) between each matched element. */
  stagger?: number;
  duration?: number;
  ease?: string;
  /** ScrollTrigger start position. */
  start?: string;
  /** Set true only while developing to see trigger markers. */
  markers?: boolean;
}

/**
 * Fade + rise reveal for a group of elements as they enter the viewport.
 * Intended for use inside useGSAP with a `scope` — see gsap-presets/README
 * usage note. Pass a selector (scoped) or an array/NodeList of elements.
 *
 * Returns the ScrollTrigger.batch() instances so callers can kill() them
 * manually if not using useGSAP's automatic cleanup.
 */
export function scrollReveal(
  targets: string | Element[] | NodeListOf<Element>,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 40,
    stagger = 0.12,
    duration = 0.9,
    ease = "power3.out",
    start = "top 85%",
    markers = false,
  } = options;

  gsap.set(targets, { opacity: 0, y });

  return ScrollTrigger.batch(targets, {
    start,
    markers,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        overwrite: true,
      }),
    onLeaveBack: (batch) =>
      gsap.to(batch, {
        opacity: 0,
        y,
        duration: duration * 0.6,
        ease: "power2.in",
        overwrite: true,
      }),
  });
}
