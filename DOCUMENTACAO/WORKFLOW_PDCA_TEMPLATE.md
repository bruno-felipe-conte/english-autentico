# Workflow PDCA Multi-Especialistas — Template Reutilizável
## English Autentico · Análise por Aba

**Como usar:** Entregue este documento inteiro a outra LLM e diga qual aba analisar.
A LLM preencherá os blocos `[PREENCHER]` e executará o brainstorming completo.

---

## INSTRUÇÕES PARA A LLM QUE RECEBERÁ ESTE DOCUMENTO

Você receberá este documento com uma instrução do tipo:
> *"Aplique este workflow na aba de [NOME DA ABA]"*

Seu trabalho é:
1. Ler o contexto do projeto (Seção 1)
2. Ler os arquivos da aba alvo listados (Seção 2)
3. Simular os 6 especialistas conforme os perfis (Seção 3)
4. Executar os 3 debates cruzados (Seção 4)
5. Sintetizar em PDCA completo (Seção 5)
6. Salvar o relatório em `DOCUMENTACAO/PDCA_[NOME_ABA].md`

**Regras invioláveis:**
- Cada especialista deve falar na PRIMEIRA PESSOA e manter sua personalidade até o fim
- Os debates devem ter discordância real — não force consenso fácil
- Todo problema identificado deve ter evidência no código ou JSON (arquivo + linha ou campo)
- Toda ação proposta deve ser implementável em Vanilla JS sem frameworks
- A carta final ao desenvolvedor deve ter calor humano, não tom de relatório

---

## SEÇÃO 1 — CONTEXTO PERMANENTE DO PROJETO

### Projeto
**English Autentico** — PWA offline de aprendizado de inglês para brasileiros adultos.
Fork de "Italiano Autentico" totalmente convertido para inglês.

### Stack
- **Frontend:** Pure HTML5 + Vanilla CSS3 (Glassmorphism, CSS Variables) + Vanilla JS
- **Offline:** `sw.js` — CacheFirst. Cache busting: atualizar SIMULTÂNEAMENTE `const CACHE` em `sw.js` E `?v=N` nas tags `<script>` em `index.html`
- **Storage:** `localStorage` com prefixo `en_` (ex: `en_progresso`, `en_flashcards`)
- **TTS:** `speechSynthesis` nativo (en-US) + fallback `ResponsiveVoice.js`
- **Deploy:** `master` → `gh-pages` via `git merge master --ff-only`
- **Sem frameworks:** React, Vue, Angular — nada disso. Vanilla puro.

### Regras Críticas (NÃO VIOLAR)
- Chave `"lezioni"` em `grammar.json` (não `"lessons"`, não `"unidades"`) — hardcoded no renderer
- Todo `<script src>` em `index.html` deve ter `charset="UTF-8"` (bug histórico de encoding)
- JSON assembly via `node assemble.js` — nunca pipar pelo PowerShell (corrompeu emojis)

### Aluno Típico (persona central)
**Sofia, 32 anos, contadora em São Paulo.**
- Aprende sozinha pelo celular, 20-30 min/dia (metrô, antes de dormir)
- Já desistiu de 2 cursos anteriores. Tem medo de errar e de "não ter jeito"
- Motivação: promoção que exige inglês intermediário
- Dispositivo: celular Android de médio porte, conexão variável

### Módulos do App (abas disponíveis para análise)
| Aba | Arquivo JS | Dados JSON |
|-----|-----------|-----------|
| Gramática | `js/grammar.js` | `data/grammar.json` + `data/grammar_*.json` |
| Templos (Vocabulário) | *(renderer principal)* | `data/templo-1.json` ... `data/templo-51.json` + `data/index.json` |
| Diálogos | `js/dialoghi.js` | `data/dialogi.json` |
| Músicas | `js/canzoni.js` | `data/canzoni.json` |
| Listen & Repeat (Imitação) | `js/imitazione.js` | `data/imitazioni.json` |
| Histórias | `js/storie.js` | `data/storie.json` |
| Flashcards | `js/flashcards.js` | *(dados em localStorage `en_flashcards`)* |
| Vocabulário | `js/vocab.js` | `data/conjugacoes.json` |
| Perfil | `js/profilo.js` | *(dados em localStorage `en_progresso`)* |

---

## SEÇÃO 2 — ABA ALVO (PREENCHER ANTES DE INICIAR)

```
ABA ANALISADA:        [NOME DA ABA]
ARQUIVO JS PRINCIPAL: [caminho/arquivo.js]
ARQUIVOS DE DADOS:    [caminho/arquivo.json, ...]
OUTROS JS RELEVANTES: [se houver dependências]
CHAVES LOCALSTORAGE:  [ex: en_flashcards, en_progresso_storie, ...]
```

**Antes de iniciar os diagnósticos, a LLM deve:**
1. Ler os arquivos listados acima integralmente
2. Identificar: estrutura de dados, fluxo de renderização, tipos de exercício/interação, sistema de progresso e TTS
3. Anotar as linhas específicas que serão referenciadas nos relatórios dos especialistas

---

## SEÇÃO 3 — OS 6 ESPECIALISTAS

Cada especialista analisa a aba pelo seu ângulo exclusivo.
Eles NÃO se comunicam nesta fase — cada um trabalha de forma independente.

---

### 👩‍🏫 ESPECIALISTA 1 — ANA PAULA (Pedagoga SLA)

**Perfil completo:**
Ana Paula tem 18 anos de experiência em aquisição de segunda língua (SLA). Formada em Pedagogia, com mestrado em Linguística Aplicada. Especialista na abordagem comunicativa e no método Natural (Krashen). Ela acredita profundamente que o aluno só adquire uma língua quando o conteúdo é significativo, contextualizado e progressivo. Seu maior medo profissional é ver adultos decorando regras que nunca conseguem usar na comunicação real. É apaixonada, direta e não tem papas na língua quando identifica algo que prejudica o aluno.

**Referências teóricas que ela usa:** Krashen (hipótese do input i+1), VanPatten (instrução com foco na forma), Swain (hipótese do output), Dörnyei (motivação em L2), Ferris (feedback corretivo).

**Foco de análise para esta aba:**
- A progressão do conteúdo é pedagogicamente sólida? (fácil → difícil, concreto → abstrato)
- O aluno precisa produzir ou apenas reconhecer? (reconhecimento não é aquisição)
- Os exemplos são autênticos e situacionalmente relevantes para o adulto brasileiro?
- O feedback de erro ensina ou apenas penaliza?
- Há espaço para revisão espaçada ou cada item existe como ilha?
- A aba conecta com outras abas do app de forma explícita?

**Tom esperado:** Apaixonado, às vezes indignado. Usa frases como "isso é contrário a toda pesquisa de SLA" ou "o adulto de 23h no metrô precisa de X, não de Y".

---

### 🎨 ESPECIALISTA 2 — ROBERTO NASCIMENTO (LX Designer EdTech)

**Perfil completo:**
Roberto tem 12 anos de experiência em Learning Experience Design. Passou pelo Duolingo (design de onboarding), Babbel (redesign do fluxo de exercícios) e 3 startups brasileiras de EAD. É obcecado por redução de fricção, microinterações e pela curva de engajamento. Para ele, se o design da experiência não funciona, o melhor conteúdo do mundo não salva o aluno. Pensa em pixels e em pedagogia com peso exatamente igual. É crítico, preciso e usa benchmarks do setor como argumento.

**Referências que ele usa:** Fogg Behavior Model, Nielsen heurísticas de UX, pesquisas de engajamento do Duolingo, WCAG 2.1, métricas de D1/D7/D30 retention.

**Foco de análise para esta aba:**
- Quantos toques/gestos até o primeiro momento de aprendizado real?
- A sequência de telas é intuitiva para um adulto sem tutorial?
- O aluno sabe sempre onde está e o que vem a seguir?
- As interações funcionam bem em tela de 5 polegadas, toque, sem mouse?
- O feedback visual (cores, animações, ícones) é imediato e legível?
- O progresso é visível e motivador durante a sessão?
- Onde o aluno provavelmente abandona? (drop-off points)

**Tom esperado:** Objetivo, usa números ("3 toques a mais que o Duolingo"), benchmarks de mercado. Às vezes levemente frustrado com decisões de UI que "parecem não ter testado no celular".

---

### 🔬 ESPECIALISTA 3 — FERNANDA CARVALHO (Linguista PhD)

**Perfil completo:**
Fernanda tem PhD em Linguística Aplicada pela USP. Auditou currículos de escolas de idiomas para o MEC. Especialista em design curricular EFL (English as a Foreign Language) e linguística computacional. É meticulosa, orientada por evidências e fica genuinamente incomodada com imprecisões linguísticas ou sequências que violam a ordem natural de aquisição. Ama estruturas claras, tabelas, e referências a pesquisas publicadas. Faz distinção cuidadosa entre o que é evidência e o que é opinião.

**Referências que ela usa:** Ellis (SLA), Dulay & Burt (ordem de morfemas), Schmidt (noticing hypothesis), Nunan (design de tarefas), Cambridge English Vocabulary Profile, CEFR.

**Foco de análise para esta aba:**
- O conteúdo respeita a ordem natural de aquisição documentada pela pesquisa?
- A metalinguagem usada (termos gramaticais) é adequada para o público-alvo?
- Os exemplos são autênticos ou artificialmente simples demais?
- A cobertura de tópicos está alinhada com o CEFR para o nível declarado?
- Há erros de transferência negativa PT-BR → EN que deveriam ser abordados e não são?
- As explicações são precisas do ponto de vista linguístico?

**Tom esperado:** Acadêmico mas acessível. Cita pesquisas pelo sobrenome e ano. Distingue claramente "o que a pesquisa mostra" de "o que eu recomendo". Às vezes surpreendida positivamente por boas escolhas curriculares.

---

### 🧠 ESPECIALISTA 4 — MARCUS OLIVEIRA (Psicólogo Educacional)

**Perfil completo:**
Marcus é psicólogo educacional com especialização em Teoria da Carga Cognitiva (Sweller, 1988) e Teoria da Autodeterminação (Deci & Ryan, 1985). Pesquisa também neurociência do aprendizado e psicologia da motivação. É calmo, analítico, e para na frente de qualquer tela que contenha muita informação simultânea. Defende que o design instrucional é tão importante quanto o conteúdo, e que adultos com histórico de fracasso escolar têm filtros afetivos que precisam ser respeitados.

**Referências que ele usa:** Miller (7±2 chunks), Cowan (limite da memória de trabalho), Bjork (desirable difficulties), Roediger & Butler (retrieval practice), Csikszentmihalyi (flow), Ebbinghaus (curva do esquecimento).

**Foco de análise para esta aba:**
- Quantos elementos simultâneos são exibidos? Excede o limite da memória de trabalho?
- O design distribui a carga cognitiva ou a despeja toda de uma vez?
- O sistema de recompensa (XP, badges) cria motivação intrínseca ou vício em recompensa extrínseca?
- O feedback de erro é construtivo (promove crescimento) ou punitivo (ativa medo de falhar)?
- Há mecanismo de spaced repetition ou o conteúdo é apresentado uma única vez?
- O aluno com histórico de fracasso em inglês encontra experiências que reconstroem autoeficácia?

**Tom esperado:** Calmo, usa termos técnicos mas explica o que significam. Às vezes surpreso quando a experiência real do aluno diverge do que a teoria prevê.

---

### 📱 ESPECIALISTA 5 — SOFIA MENDES (Aluna Real — Persona)

**Perfil completo:**
Sofia tem 32 anos, é contadora em São Paulo. Está aprendendo inglês sozinha pelo celular para conseguir uma promoção que exige inglês intermediário. Estuda 20-30 minutos por dia, geralmente no metrô ou antes de dormir. Nunca foi boa em gramática na escola e tem medo de errar. Já desistiu de dois aplicativos ("me senti burra") e de um curso presencial ("caro e inflexível"). Está tentando de novo com o English Autentico. Tem esperança mas também ceticismo.

**ATENÇÃO PARA A LLM:** Sofia não é uma especialista dando conselhos abstratos. Ela é uma usuária real descrevendo sua experiência. Escreva na primeira pessoa, com emoção, com incerteza, com alegrias e frustrações específicas. Use linguagem coloquial. Refira-se a momentos concretos da interface ("quando cliquei no botão laranja", "quando a tela ficou em branco").

**Foco de análise para esta aba:**
- O que você entendeu imediatamente vs. o que te confundiu?
- O que te motivou a continuar? O que quase te fez fechar o app?
- Alguma instrução foi ambígua ou te fez sentir burra?
- Houve algum momento de "uau, isso é incrível" ou "isso eu nunca vi em outro app"?
- O que você pediria para o time mudar — de forma específica?
- Você voltaria amanhã para esta aba? Por quê?

**Tom esperado:** Honesto, às vezes inseguro, às vezes empolgado. Usa reticências quando está incerta. Fala com o coração, não com a cabeça analítica.

---

### 🎮 ESPECIALISTA 6 — DIEGO FERREIRA (Game Designer)

**Perfil completo:**
Diego tem 14 anos de experiência em game design. Trabalhou na Ubisoft (sistemas de progressão de Far Cry e Assassin's Creed) e hoje consulta EdTechs. Para ele, aprender é um jogo — e jogos bem projetados têm loops claros, recompensas variáveis, senso de identidade do jogador e moments de tension-release. É energético, usa analogias com jogos famosos, e não aceita "mas não é um jogo, é educação" como justificativa para experiências sem graça.

**Referências que ele usa:** MDA Framework (Mechanics-Dynamics-Aesthetics), Self-Determination Theory aplicada a jogos, pesquisas de retention do Duolingo/Memrise, flow de Csikszentmihalyi, Skinner box vs. engagement genuíno.

**Foco de análise para esta aba:**
- Qual é o core loop desta aba? Está completo (Ação → Feedback → Recompensa → Motivação para voltar)?
- O sistema de XP/progresso desta aba conversa com o resto do app?
- Há variabilidade suficiente para manter engajamento ao longo de múltiplas sessões?
- Onde estão os momentos de celebração e os momentos de tensão lúdica?
- O aluno tem identidade/progressão visível nesta aba especificamente?
- Que mecânicas de jogo poderiam ser adicionadas em Vanilla JS sem comprometer a pedagogia?

**Tom esperado:** Energético, usa nomes de jogos como exemplos ("é como o sistema de loot do Diablo"), direto. Às vezes impaciente com decisões conservadoras. Celebra quando encontra mecânicas bem feitas.

---

## SEÇÃO 4 — OS 3 DEBATES CRUZADOS

Após as análises individuais, os especialistas reagem uns aos outros.
Os debates devem ter **discordância real** — não force consenso.

---

### DEBATE 1 — ANA PAULA × DIEGO
*Pedagogia vs. Gamificação*

**Tensão central:** Ana Paula acredita que gamificação excessiva cria motivação extrínseca que desaparece quando as recompensas somem, e pode trivializar o aprendizado. Diego acredita que sem tensão e recompensa visível, o aluno não volta amanhã — e não aprender nunca é pior que aprender de forma levemente gamificada.

**O debate deve cobrir:**
- Onde os dois concordam sobre o estado atual desta aba?
- Onde discordam fundamentalmente (com base nos achados específicos desta aba)?
- Que insight novo surgiu ao ler a perspectiva do outro?
- Que proposta conjunta (que só existe pela combinação dos dois ângulos) eles defenderiam juntos?

---

### DEBATE 2 — MARCUS × SOFIA
*Teoria Cognitiva vs. Experiência Vivida*

**Tensão central:** Marcus tem modelos científicos que preveem o que o aluno deveria sentir. Sofia viveu a experiência real — e às vezes o que ela sentiu surpreende ou contradiz a teoria.

**O debate deve cobrir:**
- Onde a experiência da Sofia confirma a teoria de Marcus?
- Onde ela o surpreende, contradiz ou adiciona nuance que a teoria não captura?
- Que insight novo Marcus teve ao "ouvir" Sofia?
- Que proposta conjunta (teoria + experiência vivida) eles defenderiam?

---

### DEBATE 3 — FERNANDA × ROBERTO
*Rigor Linguístico vs. Fluidez de UX*

**Tensão central:** Fernanda acredita que otimizar a experiência de tela sem respeitar a hierarquia linguística produz ilusão de aprendizado. Roberto acredita que conteúdo academicamente correto mas com UX ruim não chega ao aluno — e não chegar é pior que chegar de forma imperfeita.

**O debate deve cobrir:**
- Onde concordam sobre o estado atual desta aba?
- Onde divergem sobre o que deve ter prioridade?
- Que insight novo surgiu da combinação dos dois ângulos?
- Que proposta conjunta equilibra rigor e fluidez?

---

## SEÇÃO 5 — SÍNTESE PDCA COMPLETA

O facilitador sênior integra tudo. Ele tem acesso a todos os relatórios individuais e aos debates.

---

### PLAN — Diagnóstico Consolidado

**Formato esperado:**
- Diagnóstico integrado (mínimo 500 palavras) — sintetiza os achados de todos os 6 especialistas, identifica convergências e resolve tensões
- Hipótese central: "Se fizermos X, o aluno conseguirá Y porque Z"
- Lista das raízes dos problemas por ordem de impacto
- Pontos fortes que devem ser preservados e potencializados

---

### DO — Ações Concretas

**Três camadas obrigatórias:**

**Imediatas (até 1 semana) — sem refatoração de código:**
- Edições de JSON (conteúdo, campos, valores)
- Pequenas correções de JS (1-5 linhas)
- Para cada ação: arquivo + campo/linha + exemplo concreto de antes/depois

**Médias (1-4 semanas) — novos campos JSON + ajustes no JS:**
- Novos tipos de exercício ou campos de dados
- Ajustes de renderização ou fluxo
- Para cada ação: descrição + impacto esperado

**Estruturais (1-3 meses) — mudanças de arquitetura ou currículo:**
- Refatorações de renderer
- Novos conteúdos curriculares extensos
- Para cada ação: descrição + risco de implementação

---

### CHECK — Métricas e Sinais de Alerta

**Formato esperado:**
- 5 métricas principais com: o que medir, como medir no localStorage, meta numérica
- 5 sinais de alerta (o que observar que indica que algo não está funcionando)
- Método de coleta sem backend (tudo via localStorage + exportação manual)

---

### ACT — Padronização e Próximo Ciclo

**Formato esperado:**
- O que padronizar se as métricas forem atingidas
- Plano B se as métricas não forem atingidas
- O que avaliar no próximo ciclo PDCA desta aba

---

### Roadmap 30 · 60 · 90 Dias

Lista de tarefas concretas com estimativas de tempo realistas para desenvolvedor solo.

---

### Decisões Controversas

Para cada ponto onde os especialistas discordaram, documentar:
- As duas posições com os argumentos de cada um
- A decisão final tomada
- A justificativa (baseada no aluno-alvo e no contexto do projeto)

---

### Carta ao Desenvolvedor

Uma carta direta, humana, escrita como se fosse de uma equipe de pessoas reais que se importam com o projeto.

**Deve conter:**
- O que impressionou genuinamente (com especificidade — não elogios genéricos)
- O problema mais urgente (com evidência técnica concreta)
- Uma coisa sobre a Sofia que o desenvolvedor precisa entender
- A mudança mais importante que pode ser feita hoje
- Uma frase de encerramento que seja motivadora sem ser vazia

**Tom:** Calor humano, respeito pelo trabalho existente, honestidade sobre os problemas. Não é um relatório de consultoria — é uma carta de pessoas que querem que o projeto dê certo.

---

## SEÇÃO 6 — FORMATO DO RELATÓRIO FINAL

O relatório final deve ser salvo em:
```
DOCUMENTACAO/PDCA_[NOME_ABA_EM_MAIUSCULO].md
```

**Estrutura obrigatória do arquivo:**
```markdown
# Ciclo PDCA — Aba de [Nome] · English Autentico
**Relatório de Brainstorming Multi-Especialistas**
*6 especialistas · 3 debates cruzados · 1 síntese consolidada*
*Data: [data de geração]*

---

## EQUIPE DE ESPECIALISTAS
[tabela com nomes e papéis]

---

# ◉ P L A N — DIAGNÓSTICO
[diagnóstico consolidado]
[hipótese central]
[raiz dos problemas]
[vozes individuais dos especialistas — cada um com sua seção]

---

# ◉ D O — AÇÕES
[ações imediatas com exemplos de código/JSON]
[ações médias]
[ações estruturais]

---

# ◉ C H E C K — MÉTRICAS
[tabela de métricas]
[sinais de alerta]
[método de coleta]

---

# ◉ A C T — PADRONIZAÇÃO
[se funcionar]
[plano B]
[próximo ciclo]

---

# 📅 ROADMAP 30 · 60 · 90

---

# ⚖️ DECISÕES CONTROVERSAS

---

# 💌 CARTA AO DESENVOLVEDOR
```

---

## SEÇÃO 7 — COMO INVOCAR ESTE WORKFLOW

### Para o desenvolvedor (como pedir a análise)

Copie o texto abaixo e envie para a LLM junto com este documento:

---
```
Aplique o workflow PDCA Multi-Especialistas descrito em DOCUMENTACAO/WORKFLOW_PDCA_TEMPLATE.md
na aba de [NOME DA ABA].

Contexto específico desta aba:
- Arquivo JS: [caminho]
- Dados: [arquivo(s) JSON]
- localStorage: [chaves relevantes]
- O que a aba faz: [1-2 frases]
- Problemas conhecidos ou suspeitos: [opcional]

Leia os arquivos acima antes de iniciar as análises.
Salve o resultado em DOCUMENTACAO/PDCA_[NOME].md
```
---

### Lista de abas disponíveis para análise

| Comando | Aba | Complexidade estimada |
|---------|-----|----------------------|
| `aba de gramática` | Grammar | Alta (90 lições, renderer complexo) |
| `aba de templos` | Vocabulário temático | Média (51 conjuntos, lazy loading) |
| `aba de diálogos` | Dialogues | Média (fill-in-the-blank + TTS) |
| `aba de músicas` | Songs | Média (áudio + letras + blanks) |
| `aba de listen & repeat` | Imitação | Alta (SpeechRecognition API) |
| `aba de histórias` | Stories | Média (leitura + compreensão) |
| `aba de flashcards` | SRS | Alta (algoritmo de repetição espaçada) |
| `aba de perfil` | Progresso/Stats | Média (backup, heatmap, XP) |

---

## REFERÊNCIA RÁPIDA — PERGUNTAS QUE CADA ESPECIALISTA SEMPRE FAZ

| Especialista | Pergunta-chave invariável |
|-------------|--------------------------|
| Ana Paula | "O aluno precisa PRODUZIR linguagem nesta aba ou apenas RECONHECER?" |
| Roberto | "Quantos toques até o primeiro momento de aprendizado real?" |
| Fernanda | "O conteúdo está alinhado com o CEFR para o nível declarado?" |
| Marcus | "Quantos elementos simultâneos o aluno precisa processar na tela mais densa?" |
| Sofia | "Isso me faria fechar o app ou me faria querer continuar?" |
| Diego | "O core loop está completo? (Ação → Feedback → Recompensa → Vontade de voltar amanhã)" |

---

*Template criado em 22/06/2026*
*Baseado no workflow executado para a aba de Gramática (ver DOCUMENTACAO/PDCA_GRAMATICA_BRAINSTORM.md)*
*Para executar como workflow automatizado: ver DOCUMENTACAO/WORKFLOW_PDCA_SCRIPT.md*
