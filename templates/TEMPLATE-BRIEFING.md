# TEMPLATE-BRIEFING.md — Briefing de Landing Page

> Copie para `apps/<seu-app>/BRIEFING.md`. Preencha ANTES de qualquer design.
> Este documento é o input principal do creative-director (Modo 1 — DISCOVERY).

---

## Objetivo da página

```yaml
tipo: ""                   # landing page | site institucional | portfólio | one-page | etc.
objetivo_primario: ""      # Converter? Capturar lead? Vender? Demonstrar?
acao_desejada: ""          # O que o visitante deve fazer? Ex: "Clicar em Testar Grátis"
```

## Estado do produto

```yaml
status: ""                 # pronto | em beta | em construção | conceito
tem_demo: false            # Existe demo funcional pra mostrar?
tem_clientes: false        # Já tem casos reais ou é pré-lançamento?
```

---

## Referências de site

> Liste 3-5 URLs de sites que servem como referência. Para CADA uma, analise:

### Referência 1: [URL]

```yaml
tipo: ""                   # concorrente | inspiração-geral | inspiração-específica
categoria: ""              # SaaS | fintech | agência | produto | portfólio | etc.
```

**O que funciona bem (copiar com adaptação):**
- (ex: "demo do produto no hero, em vez de ilustração")
- (ex: "estatística real logo no hero: '60% reduction'")
- (ex: "depoimentos com foto, nome, cargo e empresa reais")

**O que NÃO funciona (evitar):**
- (ex: "visual genérico de template SaaS")
- (ex: "hero com ilustração abstrata que não mostra o produto")
- (ex: "pricing com asteriscos e letra miúda")

**Aplicação pro nosso projeto:**
Como adaptar o que funciona bem pro nosso contexto específico.

### Referência 2: [URL]
(mesma estrutura)

### Referência 3: [URL]
(mesma estrutura)

---

## O que os sites de referência têm em comum

Liste 3-5 padrões que se repetem nas boas referências. Isso vira regra de design.

1. (ex: "Nenhum abre com hero genérico + 3 cards de ícone")
2. (ex: "Todos mostram o produto de forma tátil/específica, não abstrata")
3. (ex: "Depoimentos sempre com identidade real")

---

## Direção criativa

### Tom da página

Complementa o BRAND.md. Aqui é específico da landing page, não da marca inteira.

```yaml
emocao_principal: ""       # confiança | urgência | curiosidade | tranquilidade | desejo
velocidade: ""             # "rápido e direto" ou "imersivo e contemplativo"
densidade: ""              # "enxuto, uma ideia por seção" ou "rico em detalhes"
```

### Elemento visual diferencial

O que torna esta página ÚNICA visualmente? Não pode ser "bem diagramada" — isso é baseline.
Ex: "joinha interativo que reage ao scroll como confirmação visual"
Ex: "mockup de conversa de WhatsApp real simulada no hero"

### Three.js / 3D (se aplicável)

```yaml
usar_3d: false             # Precisa de elemento 3D?
qual: ""                   # Se sim, qual? "partículas", "globo", "geometria abstrata", "modelo 3D"
proposito: ""              # Decoração? Demonstração do produto? Assinatura da marca?
fallback_mobile: ""        # O que aparece em mobile sem WebGL? "imagem estática" | "CSS animation" | "nada"
```

### Animações GSAP (se aplicável)

```yaml
scroll_reveal: true        # Elementos aparecem no scroll?
parallax: false            # Efeito parallax?
text_reveal: false         # Texto aparece com animação letra-por-letra?
```

---

## Estrutura de seções

Liste as seções NA ORDEM em que devem aparecer. Pra cada uma, descreva conteúdo e objetivo.

| # | Seção | Objetivo | Conteúdo |
|---|-------|----------|----------|
| 1 | Hero | Impacto + demo do produto | Conversa WhatsApp real animada |
| 2 | Como funciona | Reduzir atrito | 3 passos, 2 minutos |
| 3 | Prova social | Credibilidade | 3 depoimentos com nome/negócio real |
| 4 | Para quem é | Segmentação | 3 colunas com caso de uso por segmento |
| 5 | Planos | Converter | 3 tiers, meio destacado |
| 6 | FAQ | Tirar dúvidas | Accordion, tom informal |
| 7 | CTA final | Fechar | Fundo teal, joinha gigante |
| 8 | Footer | Navegação | Logo + links + copyright |

---

## Anti-padrões PROIBIDOS

Checklist do que NUNCA fazer. O creative-director filtra contra esta lista no Modo 1.

### Visuais proibidos
- [ ] Hero centralizado + 3 cards com ícone Lucide — "AI slop" clássico
- [ ] Gradiente roxo/azul genérico (`from-indigo-500 to-purple-600`)
- [ ] Blob 3D flutuante sem relação com a marca
- [ ] Border-radius 8px em tudo (padrão Tailwind — nunca é intencional)
- [ ] Fonte Inter/Roboto sem pairing intencional com display font
- [ ] Background branco puro (#ffffff) — sempre off-white ou com textura

### Copy proibida
- [ ] "Solução omnichannel", "sinergia", "disruptivo", "next-gen"
- [ ] "Revolucione seu...", "Transforme seu...", "Potencialize seu..."
- [ ] Promessas vagas: "aumente suas vendas", "melhore seu atendimento"
- [ ] Depoimentos genéricos sem nome/empresa/cargo real

### Estrutura proibida
- [ ] Hero → 3 cards → CTA → Footer (template mínimo)
- [ ] FAQ escondido no final sem accordion funcional
- [ ] Pricing com asteriscos escondidos
- [ ] Formulário de contato sem motivo claro

---

## O que já existe (reaproveitável)

Liste o que já está pronto e NÃO precisa ser recriado:

```yaml
logo: "assets/logo-reference.png"
brand_spec: "apps/<app>/BRAND.md"
componentes_ui-kit: ["GlassCard", "Button", "Badge", "Section", "Container"]
cenas_three-utils: ["PhoneScene", "ParticleField", "Blob", "FloatingGeometry"]
presets_gsap: ["scrollReveal", "parallax", "textReveal"]
```
