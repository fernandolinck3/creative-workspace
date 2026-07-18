# ESCOPO — Espaço Criativo (Workspace Interativo)

## Resumo simples (leia isso primeiro)

Você tem **3 sites** pra construir, todos com visual elaborado (Three.js/GSAP
— partículas, animações no scroll, etc.):

1. **Site de um cliente** — agência de marketing que você está construindo
   para um cliente.
2. **Seu site pessoal** — pra você conseguir novos projetos freelance. É seu
   portfólio vivo.
3. **Site de produto** — pra vender o chatbot de automação (o agente
   `whatsapp-sdr` que já desenhamos) para donos de negócio local.

**Por que juntar tudo numa pasta só (monorepo):** os 3 sites vão reusar os
mesmos tipos de efeito visual (cena de partículas, texto que aparece no
scroll, etc.). Construir cada peça uma vez numa pasta compartilhada evita
refazer a mesma coisa 3 vezes — só muda o conteúdo e as cores de cada site.

**Por que isso é diferente do ecossistema de agentes autônomos (os 5
agentes de growth que rodam sozinhos via n8n/cron):** aqui você trabalha
**junto** com o agente, em tempo real. Você pede uma seção, o agente propõe
uma ideia antes de fazer qualquer coisa, você aprova ou pede pra mudar, só
depois ele escreve o código. Nada é publicado sem você revisar antes. Por
isso existe um agente novo, o `creative-director`, feito pra esse modo mais
devagar e colaborativo.

**O que já está pronto vs. o que falta:** as pastas, o agente e as skills de
Three.js/GSAP já estão montados (é só a "casa" pronta, ainda vazia). Falta
você decidir: o brandbook do cliente (site A), quais projetos mostrar no seu
portfólio (site B), e o preço/planos do produto de chatbot (site C).

---

## O que é isso (detalhado)
Diferente do ecossistema de agentes autônomos (que roda sozinho via n8n/cron),
este é um **espaço de trabalho interativo**: você e o OpenCode trabalhando
juntos, em tempo real, pra construir sites/páginas com Three.js, GSAP e
interações avançadas — 3 projetos, 1 workspace, componentes compartilhados.

## Os 3 projetos

### A. Agência de Marketing (Cliente)
- **Objetivo:** site institucional para um cliente de marketing digital.
- **Público:** leads do cliente (empresas buscando serviço de marketing).
- **O que falta definir com o cliente:** brandbook, tom de voz, cases/portfólio
  para mostrar, oferta principal (o que ele vende).
- **Estrutura provável:** hero de impacto (3D/GSAP), serviços, cases/prova
  social, sobre o time, contato/captura de lead.

### B. Agência Pessoal (Você — para conseguir freelas)
- **Objetivo:** vitrine pessoal pra atrair clientes de freelance —
  especificamente projetos que valorizem exatamente essa stack (Three.js/GSAP/
  interações avançadas). O próprio site é a prova de capacidade técnica.
- **Público:** empresas/agências procurando um freelancer/parceiro técnico
  para sites "diferentes".
- **O que falta definir:** portfólio (mesmo que sejam projetos conceituais no
  início), pricing/pacotes de serviço, seu posicionamento (ex: "sites que
  parecem Awwwards, não templates").
- **Estrutura provável:** hero autoral e ousado (aqui você pode exagerar na
  criatividade — é sua vitrine), seleção de trabalhos, processo de trabalho,
  contato.

### C. Produto de Automação de Chatbot (Negócios Locais)
- **Objetivo:** transformar o `whatsapp-sdr` agent que já desenhamos em um
  produto vendável para pequenos/médios negócios locais (salões, clínicas,
  restaurantes, etc. — negócios que vivem de agendamento/atendimento).
- **Público:** donos de negócio local, pouco técnicos, que querem parar de
  perder lead por demorar pra responder WhatsApp.
- **O que falta definir:** pricing (mensalidade? setup fee?), demo
  interativa (deixa a pessoa "conversar" com um chatbot de exemplo direto na
  página), cases de negócios locais reais (mesmo que sejam os primeiros
  clientes piloto).
- **Estrutura provável:** hero direto ao ponto (menos "artístico" que os
  outros dois — público local é mais pragmático), demonstração ao vivo,
  planos/preços, FAQ, CTA de contratação.

## Estrutura do Workspace (monorepo)

```
creative-workspace/
├── AGENTS.md                      # contexto geral do workspace
├── packages/
│   ├── ui-kit/                    # design system compartilhado
│   │   ├── components/            # botões, cards, layout base
│   │   └── tokens/                # cores, tipografia, spacing
│   └── three-utils/                # biblioteca de cenas/interações reutilizáveis
│       ├── scenes/                # partículas, blob, globo, geometria flutuante
│       ├── gsap-presets/          # scroll-reveal, parallax, text-reveal prontos
│       └── hooks/                 # detecção de device, prefers-reduced-motion
├── apps/
│   ├── client-agency/             # Projeto A
│   ├── personal-agency/           # Projeto B
│   └── chatbot-product/           # Projeto C
└── .opencode/
    ├── agent/
    │   ├── creative-director.md   # agente PRIMARY — quem você conversa direto
    │   ├── landing-page-builder.md
    │   └── creative-interactions.md
    └── skill/                     # gsap-*, three-*, 3d-website-architect (já instaladas)
```

### Por que empacotar `ui-kit` e `three-utils` separados
Os 3 sites vão precisar das mesmas peças (ex: cena de partículas reagindo ao
scroll, botão com hover 3D, texto com reveal via GSAP). Construir isso uma
vez como pacote compartilhado significa que o 2º e 3º projeto ficam muito
mais rápidos que o 1º — você paga o custo de exploração criativa uma vez só.

## O agente "Creative Director" (novo — modo interativo)
Diferente dos subagentes anteriores (que rodam autonomamente via trigger),
este é um agente **primary**: você fala com ele diretamente, ele não
executa nada sem sua aprovação a cada etapa. Serve como seu parceiro de
brainstorm + implementação em tempo real.

Fluxo sugerido de trabalho com ele:
1. **Modo plano:** descreva a seção que quer (ex: "hero com partículas que
   reagem ao mouse pro projeto B"). O agente propõe abordagem antes de
   codar — sem tocar em arquivo nenhum ainda.
2. Você aprova ou ajusta a direção.
3. **Modo build:** agente implementa, usando as skills de Three.js/GSAP já
   instaladas como referência técnica.
4. Preview local → ajustes finos junto com você → só then commit.

## Deploy
Cada app em `apps/` é configurado como projeto independente no
Netlify/Vercel, apontando pro "root directory" correspondente dentro do
monorepo. Ou seja: 1 repositório no GitHub, 3 domínios/deploys diferentes.

| App | Domínio sugerido (exemplo) |
|---|---|
| client-agency | domínio do cliente |
| personal-agency | seu domínio pessoal |
| chatbot-product | domínio do produto |

## Ordem de execução recomendada
Mesmo estruturando os 3 juntos desde já, a ordem de **construção real**
importa pra não travar em decisão de design 3x ao mesmo tempo:

1. **`packages/ui-kit` e `packages/three-utils`** — construir o essencial
   (2-3 padrões de cena/animação) ANTES de qualquer app específico.
2. **`personal-agency`** — é onde você tem mais liberdade criativa e menos
   dependência de terceiros (sem esperar brief de cliente). Também vira o
   portfólio que usa pra vender o resto.
3. **`chatbot-product`** — reusa boa parte do `ui-kit`, foco maior em
   conversão/demo do que em efeito visual puro.
4. **`client-agency`** — por último, porque depende de informação externa
   (brandbook do cliente) que ainda falta coletar.

## Checklist do que falta coletar antes de começar
- [ ] Brandbook/identidade do cliente (Projeto A)
- [ ] 3-5 peças de portfólio ou projetos conceituais pra vitrine pessoal
      (Projeto B)
- [ ] Pricing/planos do produto de chatbot (Projeto C)
- [ ] Domínios definidos para os 3 (mesmo que só reservados por enquanto)
