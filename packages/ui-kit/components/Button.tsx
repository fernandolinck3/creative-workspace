import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:brightness-110 active:brightness-95",
  secondary:
    "bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface)]",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Base button. Touch target respects the 44x44px minimum from
 * 3d-website-architect skill at every size via min-h-[44px].
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = "primary", size = "md", className = "", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-[0.75rem] font-medium
        transition-all duration-200 ease-out disabled:opacity-40 disabled:pointer-events-none
        ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
