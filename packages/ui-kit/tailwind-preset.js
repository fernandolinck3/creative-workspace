/**
 * Tailwind preset — packages/ui-kit
 *
 * Each app's tailwind.config.js should do:
 *
 *   import uiKitPreset from "../../packages/ui-kit/tailwind-preset.js";
 *   export default { presets: [uiKitPreset], content: [...] };
 *
 * This maps our CSS-variable tokens (set via applyTheme() in tokens/colors.ts)
 * into Tailwind utility classes like `bg-surface`, `text-accent`, `font-display`,
 * so apps can use either `bg-[var(--bg-primary)]` (explicit) or `bg-primary`
 * (via this preset) — both resolve to the same themed value at runtime.
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        surface: "var(--bg-surface)",
        accent: {
          DEFAULT: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          emissive: "var(--accent-emissive)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        line: "var(--border-color)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        display: "clamp(3rem, 2rem + 5vw, 6rem)",
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 48px var(--accent-emissive)",
      },
      spacing: {
        "section-y": "clamp(3rem, 4vw + 1.5rem, 8rem)",
        "section-x": "clamp(1.25rem, 4vw, 4rem)",
      },
    },
  },
};
