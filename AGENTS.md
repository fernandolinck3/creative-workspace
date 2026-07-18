# AGENTS.md — Creative Workspace (3 projetos, 1 monorepo)

## Sobre este workspace
Monorepo interativo para construção de 3 sites com forte identidade visual
(Three.js, GSAP, interações avançadas):

1. `apps/client-agency` — site institucional para cliente de marketing.
2. `apps/personal-agency` — vitrine pessoal para captar freelas.
3. `apps/chatbot-product` — landing de venda do produto de automação de
   chatbot para negócios locais.

Diferente do repositório de agentes autônomos de growth, aqui o modo de
trabalho é **interativo**: nada é commitado ou deployado sem revisão direta
sua a cada etapa.

## Pacotes compartilhados
- `packages/ui-kit` — design system base (tokens de cor/tipografia,
  componentes de layout). Cada app pode sobrescrever tokens específicos
  (ex: paleta do cliente em `client-agency`) sem duplicar componentes.
- `packages/three-utils` — cenas 3D e presets de GSAP reutilizáveis
  (partículas, blob, scroll-reveal, parallax). Construir/melhorar aqui
  primeiro sempre que um padrão novo for necessário em mais de um app.

## Convenções
- Stack: React + Vite, Tailwind, Three.js/React Three Fiber, GSAP.
- Cada app é um workspace npm/pnpm independente dentro de `apps/`.
- Nunca duplicar uma cena/animação entre apps — extrair para
  `packages/three-utils` na primeira reutilização.
- Performance e acessibilidade não são opcionais (ver skill
  `three-best-practices` e regras de `prefers-reduced-motion`).
- Commits: Conventional Commits, com escopo do app
  (`feat(personal-agency): hero com partículas`).

## Deploy
Cada app em `apps/` corresponde a um projeto separado no Netlify/Vercel,
com "root directory" apontando para a subpasta correspondente. Um repo,
três domínios.

## Fluxo de trabalho com o Creative Director Agent
1. Descreva a seção/página desejada.
2. Agente propõe abordagem em modo plano (sem tocar em código).
3. Você aprova/ajusta.
4. Agente implementa em modo build, consultando as skills relevantes.
5. Preview local, ajuste fino junto com você, só então commit.
