/**
 * Spacing, radius, and shadow tokens — packages/ui-kit
 */

/** Base spacing scale in rem (4px base unit). */
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

/**
 * Section vertical rhythm — fluid, matches the 128px → 80px → 48px
 * desktop → tablet → mobile guidance in 3d-website-architect skill.
 */
export const sectionPadding = {
  y: "clamp(3rem, 4vw + 1.5rem, 8rem)",
  x: "clamp(1.25rem, 4vw, 4rem)",
} as const;

export const radius = {
  sm: "0.375rem",
  md: "0.75rem",
  lg: "1.25rem",
  xl: "2rem",
  full: "9999px",
} as const;

/** Shadows tuned for dark UIs (all 3 apps default to dark backgrounds). */
export const shadow = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.4)",
  md: "0 4px 16px rgba(0, 0, 0, 0.35)",
  lg: "0 12px 40px rgba(0, 0, 0, 0.45)",
  /** Glow shadow using the accent color — pass a CSS var as the color. */
  glow: (color: string = "var(--accent-emissive)") => `0 0 48px ${color}`,
} as const;

/** Max content width for `Container` — keeps line length readable. */
export const containerMaxWidth = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  full: "100%",
} as const;
