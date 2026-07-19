/**
 * Color tokens — packages/ui-kit
 *
 * Design principle (see AGENTS.md): components never hardcode a hex color.
 * Everything reads from CSS custom properties on :root, so each app in
 * `apps/*` can swap its whole visual identity with one `applyTheme()` call
 * instead of overriding component code.
 *
 * A fixed neutral scale is shared by every app (backgrounds/borders/text
 * that don't need to change per-brand). The `accent` + `surface` slots are
 * what each app overrides via its own Theme object.
 */

/** Shared neutral scale — same across all 3 apps. */
export const neutral = {
  0: "#0a0a0b",
  50: "#111113",
  100: "#18181b",
  200: "#232326",
  300: "#333338",
  400: "#4d4d55",
  500: "#71717a",
  600: "#a1a1aa",
  700: "#d4d4d8",
  800: "#e4e4e7",
  900: "#f4f4f5",
  1000: "#ffffff",
} as const;

export type NeutralKey = keyof typeof neutral;

/**
 * A Theme is the set of CSS variables one app needs to define its
 * identity. Every component in ui-kit reads exclusively from these vars
 * (e.g. `bg-[var(--accent-primary)]`), never from raw hex values.
 */
export interface Theme {
  /** Page background. */
  bgPrimary: string;
  /** Slightly raised surface (cards, panels). */
  bgSurface: string;
  /** Main brand color — CTAs, active states, highlights. */
  accentPrimary: string;
  /** Secondary brand color — gradients, hover states. */
  accentSecondary: string;
  /** Low-opacity accent used for glows/emissive 3D lighting. */
  accentEmissive: string;
  /** Primary text color. */
  textPrimary: string;
  /** Muted/secondary text color. */
  textMuted: string;
  /** Border/divider color. */
  border: string;
}

/** Default/neutral theme — used as a fallback and in ui-kit previews. */
export const baseTheme: Theme = {
  bgPrimary: neutral[0],
  bgSurface: neutral[100],
  accentPrimary: "#6366f1",
  accentSecondary: "#a855f7",
  accentEmissive: "rgba(99, 102, 241, 0.35)",
  textPrimary: neutral[1000],
  textMuted: neutral[600],
  border: neutral[300],
};

/**
 * personal-agency — mais liberdade criativa, tom "Awwwards": preto quase
 * puro com um accent quente/elétrico.
 */
export const personalAgencyTheme: Theme = {
  bgPrimary: "#050505",
  bgSurface: "#101012",
  accentPrimary: "#ff5a3c",
  accentSecondary: "#ffb14e",
  accentEmissive: "rgba(255, 90, 60, 0.35)",
  textPrimary: neutral[1000],
  textMuted: neutral[600],
  border: "#232326",
};

/**
 * chatbot-product (TaJoia) — tom de voz mais direto, verde de WhatsApp
 * como accent primário (referência ao produto), fundo mais claro/neutro
 * para parecer confiável a um público não-técnico.
 */
export const tajoiaTheme: Theme = {
  bgPrimary: "#0c0f0d",
  bgSurface: "#141917",
  accentPrimary: "#25d366",
  accentSecondary: "#128c7e",
  accentEmissive: "rgba(37, 211, 102, 0.35)",
  textPrimary: neutral[1000],
  textMuted: neutral[600],
  border: "#1f2622",
};

/**
 * client-agency — placeholder até o brandbook do cliente chegar
 * (ver checklist em ESCOPO_ESPACO_CRIATIVO.md). Mantido neutro de
 * propósito para não influenciar a decisão de marca do cliente.
 */
export const clientAgencyTheme: Theme = baseTheme;

const CSS_VAR_MAP: Record<keyof Theme, string> = {
  bgPrimary: "--bg-primary",
  bgSurface: "--bg-surface",
  accentPrimary: "--accent-primary",
  accentSecondary: "--accent-secondary",
  accentEmissive: "--accent-emissive",
  textPrimary: "--text-primary",
  textMuted: "--text-muted",
  border: "--border-color",
};

/**
 * Writes a Theme onto :root as CSS custom properties. Call once at app
 * bootstrap (e.g. in main.tsx) — every ui-kit component and three-utils
 * scene reads these vars, so this single call re-skins the whole app.
 */
export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  for (const key of Object.keys(CSS_VAR_MAP) as (keyof Theme)[]) {
    root.style.setProperty(CSS_VAR_MAP[key], theme[key]);
  }
}

export { CSS_VAR_MAP };
