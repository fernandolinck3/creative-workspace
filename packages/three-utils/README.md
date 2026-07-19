# three-utils

Cenas 3D e presets de GSAP reutilizáveis entre os 3 apps.

Regra: qualquer padrão usado em mais de 1 app deve morar aqui, não
duplicado dentro de cada app (ver AGENTS.md).

## Status

Implementado — hooks, `SceneCanvas`, 4 cenas e 3 presets de GSAP prontos
para uso pelos apps.

## Estrutura

```
hooks/
  useReducedMotion.ts     # observa prefers-reduced-motion ao vivo
  useDeviceCapability.ts  # classifica o device em high/medium/low
  index.ts

components/
  SceneCanvas.tsx  # wrapper único de <Canvas> — fallback, capability, Suspense
  index.ts

scenes/
  ParticleField.tsx    # nuvem de pontos que reage sutilmente ao ponteiro
  FloatingGeometry.tsx # forma abstrata (icosaedro/toro/octaedro) com distorção
  Blob.tsx             # esfera orgânica morfando — tom mais "aprovável"
  PhoneScene.tsx        # mockup de celular com DOM real projetado (Html transform)
  index.ts

gsap-presets/
  scrollReveal.ts  # fade + rise em lote via ScrollTrigger.batch
  parallax.ts      # translação Y scrubada ao scroll
  textReveal.ts     # split de texto (SplitText) com stagger
  index.ts
```

## Regra de ouro: nunca use `<Canvas>` direto

Toda cena deve ser montada dentro de `<SceneCanvas>`, nunca de um
`<Canvas>` do R3F puro. É o `SceneCanvas` que resolve, num lugar só:

1. Fallback estático quando `prefers-reduced-motion` está ativo, o device
   é classificado como `low`, ou não há suporte a WebGL.
2. `dpr` e `antialias` ajustados por capability (nunca 3x em mobile).
3. Um `<Suspense>` para assets assíncronos (texturas, GLTF).

```tsx
import { SceneCanvas, ParticleField } from "@creative-workspace/three-utils";

<SceneCanvas fallback={<StaticHeroImage />}>
  {(capability) => <ParticleField density={capability} />}
</SceneCanvas>
```

## PhoneScene — a cena mais cara do workspace

Usa `<Html transform occlude>` do drei para projetar DOM real (ex: a UI de
chat do WhatsApp já animada em CSS/JS) dentro do espaço 3D, em vez de
"assar" a conversa como textura — texto fica nítido em qualquer zoom e a
mesma animação JS existente continua funcionando sem reescrever nada.

Combina `Html occlude` + `Float`, o que é pesado em device fraco — por
isso é a cena que mais depende do fallback do `SceneCanvas` (no
`capability === "low"`, renderize um screenshot estático da composição, não
o mockup CSS antigo).

```tsx
import { SceneCanvas, PhoneScene } from "@creative-workspace/three-utils";
import { ChatPreview } from "../components/ChatPreview"; // UI existente do chatbot-product

<SceneCanvas fallback={<PhoneScreenshotFallback />}>
  <PhoneScene>
    <ChatPreview />
  </PhoneScene>
</SceneCanvas>
```

## GSAP presets

Todos assumem que quem chama já está dentro de um `useGSAP(..., { scope })`
— eles não fazem seu próprio cleanup de contexto, o `scope` do chamador
cuida disso (ver skill `gsap-react`).

```tsx
useGSAP(() => {
  scrollReveal(".feature-card");
  parallax(".hero-bg", { distance: -160 });
  textReveal(".hero-heading", { type: "words" });
}, { scope: containerRef });
```
