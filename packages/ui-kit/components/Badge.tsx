import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  /** "accent" for brand-colored pill, "neutral" for a subtle tag. */
  tone?: "accent" | "neutral";
  className?: string;
}

/** Small pill label — plan names, "novo", status tags, category chips. */
export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  const toneClass =
    tone === "accent"
      ? "bg-[var(--accent-emissive)] text-[var(--accent-primary)]"
      : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-color)]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
