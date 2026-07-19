# QUALITY-GATES.md — Checklist de Qualidade Profissional

> Toda landing page deve passar por ESTE checklist antes de ser considerada pronta.
> Não é "nice to have" — é o padrão mínimo pra produção.

---

## Gate 0 — Pré-requisitos (antes de codar)

- [ ] `BRAND.md` preenchido em TODAS as seções (cores, tipografia, tom de voz, anti-padrões)
- [ ] `BRIEFING.md` com 3+ referências analisadas (o que funciona, o que evitar, aplicação)
- [ ] `design-tokens.json` preenchido com a paleta real do app
- [ ] Modo 1 (DISCOVERY) executado com 2-3 direções aprovadas
- [ ] Modo 2 (PLAN) executado com wireframe seção por seção aprovado

---

## Gate 1 — Anti-padrões visuais (NENHUM pode passar)

- [ ] ❌ Hero NÃO é centralizado + 3 cards com ícone Lucide
- [ ] ❌ NÃO usa gradiente roxo/azul (`from-indigo-500 to-purple-600`)
- [ ] ❌ NÃO tem blob 3D flutuante sem relação com a marca
- [ ] ❌ NÃO usa `border-radius: 8px` como padrão (Tailwind default = genérico)
- [ ] ❌ NÃO usa fundo branco puro (#ffffff) — sempre off-white ou textura
- [ ] ❌ NÃO usa Inter ou Roboto como única fonte (sem pairing com display font)
- [ ] ❌ NÃO tem ilustração abstrata de IA (robôs, cérebros, engrenagens genéricas)

---

## Gate 2 — Tipografia & Cor

- [ ] ✅ Display font carregada via Google Fonts (não system font genérica)
- [ ] ✅ Body font diferente da display font (pairing intencional)
- [ ] ✅ Headlines com `letter-spacing: -0.02em` (não default)
- [ ] ✅ Tamanhos fluidos com `clamp()` em headlines (não tamanhos fixos)
- [ ] ✅ Paleta de cores consistente em TODA a página (não mistura azul aqui, roxo ali)
- [ ] ✅ Sombras SEMPRE coloridas (usando cor primária com opacidade), NUNCA cinza
- [ ] ✅ Contraste mínimo 4.5:1 em body text, 3:1 em headlines

---

## Gate 3 — Layout & Estrutura

- [ ] ✅ Header fixo com backdrop-blur (não estático e sem graça)
- [ ] ✅ Hero ocupa 100vh no mobile e 90vh+ no desktop
- [ ] ✅ Primeira seção após hero tem fundo diferente (alternância visual)
- [ ] ✅ Cards com tratamento visual intencional (glass, outline, shadow colorida)
- [ ] ✅ Planos: 3 colunas, meio destacado com scale/glow, badge "Mais popular"
- [ ] ✅ CTA final tem fundo diferente do resto (gradiente, cor sólida, ou escuro)
- [ ] ✅ Footer minimalista (não um sitemap gigante)

---

## Gate 4 — Copy & Conteúdo

- [ ] ✅ Headline ESPECÍFICA — não genérica ("aumente suas vendas" ❌)
- [ ] ✅ Prova social com identidade real (nome + negócio + segmento), não "Cliente X"
- [ ] ✅ Números concretos em vez de adjetivos ("responde em 5 segundos" ✅ vs "rápido" ❌)
- [ ] ✅ FAQ com perguntas REAIS que clientes fariam, incluindo limitações
- [ ] ✅ Preço transparente, sem asteriscos escondidos
- [ ] ✅ Zero palavras proibidas (`design-tokens.json` → `antiPatterns.forbiddenCopy`)
- [ ] ✅ Cada seção tem 1 ideia clara. Se uma seção tem 3 ideias, são 3 seções.

---

## Gate 5 — Interação & Animação

- [ ] ✅ Scroll reveal: elementos aparecem com fade-up ao scrollar
- [ ] ✅ Hover em cards: translateY(-4px) + shadow aumenta
- [ ] ✅ Hover em CTAs: scale(1.02) + glow aumenta
- [ ] ✅ `prefers-reduced-motion: reduce` desliga TODAS as animações
- [ ] ✅ Animações são sutis (0.3-0.6s) e com easing customizado (cubic-bezier, não ease-in-out genérico)
- [ ] ✅ Nenhuma animação bloqueia o first paint ou o LCP

---

## Gate 6 — Responsivo

- [ ] ✅ Mobile-first: layout funciona em 375px de largura
- [ ] ✅ Grids colapsam para 1 coluna em mobile (não side-scroll)
- [ ] ✅ Fontes legíveis em mobile (mínimo 16px body)
- [ ] ✅ CTAs têm tamanho mínimo de toque (44x44px)
- [ ] ✅ Mockup de celular some ou reduz em mobile (não ocupa a tela toda)

---

## Gate 7 — Performance

- [ ] ✅ Total da página < 50KB (HTML + CSS inline)
- [ ] ✅ CSS inline ou crítica inline, resto async
- [ ] ✅ Google Fonts com `display=swap` (não bloqueia render)
- [ ] ✅ Zero JavaScript bloqueante no <head>
- [ ] ✅ Imagens com `loading="lazy"` e `decoding="async"`
- [ ] ✅ 3D (se houver): lazy-load com IntersectionObserver, fallback estático pra mobile
- [ ] ✅ Lighthouse: Performance > 90, Accessibility > 95, Best Practices > 90

---

## Gate 8 — Deploy & Tracking

- [ ] ✅ PostHog snippet no `<head>` (placeholder ou chave real)
- [ ] ✅ `data-track="nome_da_secao"` em cada `<section>`
- [ ] ✅ Metatags: title, description, og:image, og:title
- [ ] ✅ Favicon configurado
- [ ] ✅ Deploy funcionando (Netlify/Vercel ou arquivo estático)
- [ ] ✅ URL canônica configurada

---

## Gate 9 — Acessibilidade

- [ ] ✅ Estrutura de headings hierárquica (h1 → h2 → h3, sem pular)
- [ ] ✅ Links têm texto descritivo (não "clique aqui")
- [ ] ✅ Imagens têm `alt` text significativo
- [ ] ✅ Navegação por teclado funciona (Tab, Enter, Esc)
- [ ] ✅ Contraste de cores passa WCAG AA
- [ ] ✅ `prefers-reduced-motion` respeitado
- [ ] ✅ `prefers-color-scheme: dark` tem versão escura (se aplicável)

---

## Como usar

1. Copie este arquivo para `apps/<seu-app>/QUALITY.md`
2. Marque os checkboxes à medida que implementa
3. O creative-director (Modo 3 — BUILD) deve checar este arquivo a cada seção concluída
4. NADA é commitado sem passar pelo menos Gates 1-5
