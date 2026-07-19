import type { HTMLAttributes, ReactNode } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Adds a subtle accent-colored glow shadow — use sparingly (1 per view). */
  glow?: boolean;
}

/**
 * Frosted-glass surface for cards floating over 3D scenes or gradients.
 * Uses backdrop-blur so content underneath (particles, gradients) stays
 * visible but legible text sits on top — a common need across all 3 apps'
 * hero sections.
 */
export function GlassCard({ children, glow = false, className = "", ...rest }: GlassCardProps) {
  return (
    <div
      className={`rounded-[1.25rem] border border-[var(--border-color)] bg-[var(--bg-surface)]/60
        backdrop-blur-xl p-6 ${glow ? "shadow-[0_0_48px_var(--accent-emissive)]" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
