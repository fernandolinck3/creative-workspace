import type { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  /** id used for anchor links / nav scroll targets. */
  id?: string;
  className?: string;
  /** Set false to remove the default vertical padding (e.g. full-bleed hero). */
  padded?: boolean;
  /** Reads --bg-primary by default; pass "surface" for a raised panel look. */
  background?: "primary" | "surface" | "transparent";
}

const BACKGROUND_CLASS: Record<NonNullable<SectionProps["background"]>, string> = {
  primary: "bg-[var(--bg-primary)]",
  surface: "bg-[var(--bg-surface)]",
  transparent: "bg-transparent",
};

/**
 * Wraps a page section with consistent vertical rhythm (fluid padding, see
 * tokens/spacing.ts `sectionPadding`) and the correct themed background.
 * Sections should not declare their own py-* utility classes.
 */
export function Section({
  children,
  id,
  className = "",
  padded = true,
  background = "primary",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${BACKGROUND_CLASS[background]} ${
        padded ? "py-[clamp(3rem,4vw+1.5rem,8rem)]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
