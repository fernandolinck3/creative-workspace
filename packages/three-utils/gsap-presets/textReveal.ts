import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export interface TextRevealOptions {
  /** Split granularity — "words" reads better for headings, "chars" for short display text. */
  type?: "words" | "chars" | "lines";
  stagger?: number;
  duration?: number;
  y?: number;
  ease?: string;
  /** If provided, the reveal triggers on scroll instead of immediately on call. */
  scrollTrigger?: {
    trigger?: string | Element;
    start?: string;
  };
}

/**
 * Splits a heading/paragraph into words/chars/lines and staggers them in.
 * Used for the hero headlines across all 3 apps — the "impact" heading
 * treatment mentioned in ESCOPO_ESPACO_CRIATIVO.md.
 *
 * Returns the SplitText instance so the caller can call `.revert()` on
 * unmount (or rely on useGSAP's automatic context cleanup, which reverts
 * SplitText automatically per the gsap-plugins skill).
 */
export function textReveal(target: string | Element, options: TextRevealOptions = {}) {
  const { type = "words", stagger = 0.04, duration = 0.7, y = 24, ease = "power3.out", scrollTrigger } =
    options;

  const split = SplitText.create(target, { type: `${type}` as "words" | "chars" | "lines" });
  const units = type === "words" ? split.words : type === "chars" ? split.chars : split.lines;

  gsap.from(units, {
    opacity: 0,
    y,
    duration,
    ease,
    stagger,
    scrollTrigger: scrollTrigger
      ? { trigger: scrollTrigger.trigger ?? target, start: scrollTrigger.start ?? "top 85%" }
      : undefined,
  });

  return split;
}
