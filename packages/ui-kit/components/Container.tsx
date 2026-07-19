import type { ReactNode } from "react";

type ContainerWidth = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps {
  children: ReactNode;
  /** Max-width breakpoint. Defaults to "lg" (64rem). */
  width?: ContainerWidth;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const WIDTH_CLASS: Record<ContainerWidth, string> = {
  sm: "max-w-[40rem]",
  md: "max-w-[48rem]",
  lg: "max-w-[64rem]",
  xl: "max-w-[80rem]",
  full: "max-w-full",
};

/**
 * Centers content horizontally with a max-width and fluid side padding.
 * Every section in every app should nest its content inside a Container
 * rather than re-declaring max-width/padding ad hoc.
 */
export function Container({ children, width = "lg", className = "", as = "div" }: ContainerProps) {
  const Tag = as as any;
  return (
    <Tag
      className={`mx-auto w-full px-[clamp(1.25rem,4vw,4rem)] ${WIDTH_CLASS[width]} ${className}`}
    >
      {children}
    </Tag>
  );
}
