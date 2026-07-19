import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` OS setting, live (updates if
 * they change it mid-session, e.g. via OS accessibility settings).
 *
 * Every scene/animation in three-utils must check this and either skip
 * motion entirely or drastically reduce it — this is a hard requirement
 * per AGENTS.md ("Performance e acessibilidade não são opcionais").
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);

    // Safari <14 fallback uses addListener/removeListener.
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    }
    mql.addListener(handleChange);
    return () => mql.removeListener(handleChange);
  }, []);

  return reduced;
}
