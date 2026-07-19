/**
 * Typography tokens — packages/ui-kit
 *
 * A fluid type scale (clamp()) means we don't need separate mobile/desktop
 * font-size overrides scattered across apps — one value that scales with
 * the viewport. Font families are CSS variables too, so an app can swap
 * its pairing (e.g. client-agency picking up a client's brand font)
 * without touching component code.
 */

/** Default font pairing. Apps may override via CSS vars if brand requires it. */
export const fontFamily = {
  display: "var(--font-display, 'Clash Display', 'Inter', system-ui, sans-serif)",
  body: "var(--font-body, 'Inter', system-ui, sans-serif)",
  mono: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
} as const;

/**
 * Fluid type scale — each step scales smoothly between a mobile min and a
 * desktop max using clamp(min, preferred, max). Values in rem.
 */
export const fontSize = {
  xs: "clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)",
  sm: "clamp(0.875rem, 0.84rem + 0.2vw, 0.9375rem)",
  base: "clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)",
  lg: "clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)",
  xl: "clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)",
  "2xl": "clamp(1.5rem, 1.3rem + 0.9vw, 1.875rem)",
  "3xl": "clamp(1.875rem, 1.55rem + 1.5vw, 2.5rem)",
  "4xl": "clamp(2.25rem, 1.75rem + 2.3vw, 3.5rem)",
  "5xl": "clamp(2.75rem, 2rem + 3.5vw, 4.75rem)",
  /** Hero display size — the "impact" size mentioned in ESCOPO for the 3 heroes. */
  display: "clamp(3rem, 2rem + 5vw, 6rem)",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.05,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const letterSpacing = {
  tight: "-0.02em",
  normal: "0",
  wide: "0.04em",
} as const;

export type FontSizeKey = keyof typeof fontSize;
