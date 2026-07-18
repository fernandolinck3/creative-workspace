# BRIEFING.md — Landing Page TaJoia (chatbot-product)

> Contexto de marca completo em `BRAND.md` — leia junto com este briefing.

## O que é
Landing page pra um produto de automação de chatbot (ainda em construção)
voltado a negócios locais. Ainda não existe produto pronto pra demonstrar
— a página vende a proposta, não necessariamente uma demo funcional ainda.

## Tom exigido
Moderno e tecnológico, mas **nunca intimidador** pro dono de negócio local.
Ele não é técnico, não quer aprender ferramenta nova, só quer que o
problema (responder rápido no WhatsApp) suma. Ver `BRAND.md` pro tom de voz
completo.

## Referências de site (análise)

### https://monex.framer.ai/
Template Framer de fintech. Estrutura de conteúdo padrão (features →
benefícios → pricing em 3 tiers → depoimentos com nome/cargo real →
FAQ collapse). **Usar como referência de estrutura/conteúdo, não de
estética** — visualmente é o tipo de template genérico que estamos tentando
evitar.

### https://handhold.io/
Produto de IA agents pra demo/onboarding — o mais próximo do nosso caso de
uso (agente de IA conversando com o visitante). Pontos fortes a estudar:
- O hero tem um botão que **inicia uma demo real do próprio agente
  conversando** — não é ilustração, é o produto se provando ao vivo.
- Cada caso de uso (Q&A, Demo, Onboarding) é uma seção própria com 3
  sub-benefícios, não uma lista genérica de features.
- Estatísticas de resultado real logo no hero (ex: "60% reduction in bad
  fit calls") — prova concreta, não promessa vaga.
- Depoimentos sempre com nome, cargo e empresa reais.
- Overlay com gradiente sutil marcando cada seção de caso de uso.

**Aplicação pra TaJoia:** dá pra adaptar a ideia do "veja o agente em ação"
pro nosso contexto — ex: um preview de conversa de WhatsApp real
acontecendo na tela, terminando com o joinha aparecendo como confirmação.
Isso conecta diretamente com o símbolo da marca.

### https://www.pulze.io/
Ferramenta de workflow 3D (renderização/produção). Usa vídeos de produto em
loop (não Three.js interativo) pra mostrar cada ferramenta, contador de
estatísticas animado ("N+ countries", "N+ installations"), barra de
logos de clientes. Visualmente é limpo e escuro, mas o "3D" aqui é o
domínio do produto, não necessariamente a técnica usada no próprio site.

**Aplicação pra TaJoia:** o padrão de "vídeo/preview em loop mostrando o
produto por seção" é mais forte que texto genérico — podemos adaptar pra
mini-demonstrações da conversa de WhatsApp sendo respondida.

### https://patina.md/
O mais premium dos 4. Diferencial: em vez de ilustração abstrata, mostra a
**interface real do produto**, com dados de exemplo super específicos e
humanos (nomes de pessoas reais, "Prep me for what's next", mensagens de
iMessage simuladas). Pricing com 3 planos bem diferenciados. FAQ extenso e
honesto (inclusive explicando limitação técnica, tipo precisar manter o Mac
ligado).

**Aplicação pra TaJoia:** a lição central aqui não é visual, é de
princípio — **especificidade tátil vence abstração genérica**. Em vez de
"responda seus clientes automaticamente", mostrar uma conversa de WhatsApp
real e específica (com nome de cliente fictício, horário, mensagem
completa) sendo respondida na hora.

## O que os 4 sites têm em comum (padrão a seguir)
1. Nenhum deles abre com hero genérico + 3 cards de ícone.
2. Todos mostram o produto de forma tátil/específica, não abstrata.
3. Depoimentos sempre com identidade real (nome, cargo, empresa).
4. Prova numérica concreta cedo na página, não só no final.

## Diretriz específica: Three.js/GSAP
Nenhuma das 4 referências usa Three.js pesado — são mais vídeo/UI-realista.
**Isso é uma oportunidade, não uma limitação**: o elemento 3D/interativo que
vamos adicionar deve ser algo que reforce especificamente a marca TaJoia,
não decoração genérica. Ideia de partida a explorar com o creative-director
(discutir em Modo 1, não implementar direto):
- O joinha como elemento interativo central — reagindo ao scroll, ao mouse,
  ou aparecendo como confirmação de cada seção lida/completada.
- Preview de conversa de WhatsApp com efeito de "sendo digitado" +
  aparecimento do joinha de "visto" como microinteração de destaque.

## Anti-padrões proibidos (não fazer)
- Estilo SaaS genérico / "Tailwind + shadcn slop": hero centralizado, 3
  cards com ícone Lucide, gradiente roxo/azul, `border-radius: 8px` padrão.
- Ilustração 3D genérica tipo "blob flutuante" sem relação com a marca.
- Fonte Inter/Roboto como tipografia principal sem justificativa de
  pairing intencional.
- Copy em "SaaS corporativo" (ver lista proibida em `BRAND.md`).
- Depoimentos genéricos sem nome/cargo/empresa (mesmo que sejam de
  clientes piloto, usar identidade real).

## Fluxo de trabalho para este projeto
Seguir os 3 modos do `creative-director` (ver `.opencode/agent/
creative-director.md`): Discovery → Plano → Build, com aprovação explícita
antes de cada transição. Nada é implementado sem passar pelos 3 gates.
