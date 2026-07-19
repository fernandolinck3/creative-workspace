# ui-kit

Design system compartilhado entre os 3 apps: tokens (cor/tipografia/spacing)
e componentes de layout base. Cada app pode sobrescrever tokens específicos
sem duplicar componentes.

## Status

Implementado — tokens e componentes base prontos para uso pelos apps.

## Estrutura

```
tokens/
  colors.ts       # neutral scale fixa + Theme por app + applyTheme()
  typography.ts   # font pairing + type scale fluido (clamp())
  spacing.ts      # spacing scale, ritmo de seção, radius, shadow
  index.ts

components/
  Container.tsx   # centraliza conteúdo com max-width + padding fluido
  Section.tsx     # wrapper de seção com ritmo vertical consistente
  Button.tsx      # primary/secondary/ghost, min-h 44px (touch target)
  Badge.tsx       # pill label (accent/neutral)
  GlassCard.tsx   # superfície com backdrop-blur, usada sobre cenas 3D
  index.ts

tailwind-preset.js  # conecta os tokens (CSS vars) a classes Tailwind
index.ts             # barrel principal
```

## Como usar num app

1. No bootstrap do app (`main.tsx`), chame `applyTheme()` com o Theme certo:

```tsx
import { applyTheme, tajoiaTheme } from "@creative-workspace/ui-kit";

applyTheme(tajoiaTheme);
```

2. No `tailwind.config.js` do app:

```js
import uiKitPreset from "../../packages/ui-kit/tailwind-preset.js";

export default {
  presets: [uiKitPreset],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
};
```

3. Use os componentes normalmente — eles já leem as CSS vars do tema ativo:

```tsx
import { Section, Container, Button } from "@creative-workspace/ui-kit";
```

## Princípio central

Nenhum componente tem cor fixa. Tudo aponta para CSS custom properties
(`var(--accent-primary)`, etc.), escritas por `applyTheme()`. Trocar a
identidade visual de um app é uma linha de código, não uma reescrita de
componente.
