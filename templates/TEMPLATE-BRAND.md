# TEMPLATE-BRAND.md — Especificação Completa de Marca

> Copie este arquivo para `apps/<seu-app>/BRAND.md` e preencha TODAS as seções.
> Quanto mais completo, melhor o resultado do agente. Campos vagos = output genérico.

---

## Identidade

```yaml
nome: ""                   # Nome da marca/produto
url: ""                    # Domínio (se existir)
tagline: ""                # Frase de assinatura (máx 8 palavras)
categoria: ""              # SaaS, e-commerce, serviço local, portfólio, etc.
```

## Origem do nome (se aplicável)

Explique o significado, etimologia, jogo de palavras, ou insight por trás do nome.
Isso alimenta decisões visuais e copy. Ex: "TaJoia = 'tá joia' + IA = confiança informal".

## Símbolo / Ícone central

Descreva o símbolo visual da marca. Pode ser logo, ícone, mascote, gesto, cor distintiva.
Ex: "joinha 👍 — dupla função: aprovação + visto do WhatsApp".

## Personalidade da marca

Descreva como a marca se comporta se fosse uma pessoa. Use adjetivos e antônimos.

| A marca É | A marca NÃO É |
|-----------|---------------|
| Confiável mas informal | Corporativa / enterprise |
| Direta e simples | Técnica / complexa |
| Presente / atenciosa | Ausente / robótica |
| (adicione 2-3 pares) | |

## Tom de voz

```yaml
idioma: "pt-BR"            # ou en, es, etc.
formalidade: "informal"    # formal | informal | técnico | lúdico
público: ""                # Com quem você fala? Ex: "dono de salão, não de TI"
exemplo_bom: ""            # Uma frase que captura o tom
exemplo_proibido: ""       # O que NUNCA diria. Ex: "solução omnichannel disruptiva"
```

### Vocabulário proibido

Liste palavras e expressões BANIDAS da copy. Ex:
- "sinergia", "disruptivo", "omnichannel", "next-gen", "bleeding edge"
- Qualquer jargão de SaaS corporativo
- Palavras em inglês desnecessárias

### Vocabulário desejado

Palavras que capturam o tom. Ex:
- "tá joia", "responde", "cuida", "funciona", "de boa"

## Proposta de valor central

3-4 pilares do que a marca entrega. Cada pilar = 1 emoção + 1 resultado concreto.

1. **Segurança** — o cliente não precisa checar o WhatsApp toda hora
2. **Alguém ajudando** — não é só um bot, é um funcionário extra
3. **Visibilidade** — toda conversa registrada, funil visível
4. **Confirmação** — cada interação tem feedback visual de "resolvido"

## Direção visual

### Paleta de cores

```yaml
primaria: "#hex"           # Cor dominante (CTAs, links, destaque)
primaria_clara: "#hex"     # Variação mais clara
secundaria: "#hex"         # Cor de apoio (badges, ícones secundários)
fundo: "#hex"              # Background principal
fundo_alternativo: "#hex"  # Background de seções alternadas
texto: "#hex"              # Cor de texto principal
texto_secundario: "#hex"   # Texto menos enfático

# Modo escuro (se aplicável)
dark_fundo: "#hex"
dark_texto: "#hex"
```

### Tipografia

```yaml
heading: ""                # Nome da fonte pra headlines (Google Fonts ou system)
body: ""                   # Nome da fonte pro corpo (Google Fonts ou system)
mono: ""                   # Opcional, pra código/dados
```

### Referências visuais (imagens)

```yaml
logo: "assets/logo.png"           # Caminho pro arquivo de logo
favicon: "assets/favicon.png"     # Opcional
moodboard: "assets/moodboard.png" # Opcional — referência de estilo visual
```

## Público-alvo

```yaml
quem: ""                   # Descrição em 1 frase
dor_principal: ""          # O problema que resolve
momento_de_compra: ""      # Quando buscam a solução
nivel_tecnico: "baixo"     # baixo | médio | alto
```

## Oferta / Produto

```yaml
o_que_e: ""                # Descrição em 1-2 frases
preco_base: ""             # Preço de entrada
modelo: ""                 # mensal | anual | único | freemium
trial: ""                  # Ex: "7 dias grátis, sem cartão"
garantia: ""               # Ex: "7 dias ou seu dinheiro de volta"
```

## Concorrentes / Posicionamento

Liste 2-3 concorrentes diretos e o que diferencia esta marca.
Ex: "Concorrente X = genérico e caro. Nós = específico pra negócio local, preço justo."

## SEO / Keywords

```yaml
keywords_primarias: []     # 3-5 termos principais
keywords_secundarias: []   # 5-10 termos de cauda longa
```

## Notas adicionais

Qualquer outra informação relevante que não se encaixou acima.
Restrições legais, compliance, certificações, prêmios, etc.
