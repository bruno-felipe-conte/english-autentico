# Ciclo PDCA — Aba de Gramática · English Autentico
**Relatório de Brainstorming Multi-Especialistas**
*6 especialistas · 3 debates cruzados · 1 síntese consolidada*

---

## EQUIPE DE ESPECIALISTAS

| Persona | Papel |
|---------|-------|
| **Ana Paula** | Pedagoga SLA — 18 anos, abordagem comunicativa e método Natural |
| **Roberto** | LX Designer EdTech — ex-Duolingo/Babbel, UX mobile |
| **Fernanda** | Linguista PhD (USP) — design curricular EFL, auditora MEC |
| **Marcus** | Psicólogo Educacional — Carga Cognitiva (Sweller), SDT (Deci & Ryan) |
| **Sofia** | Aluna Real (persona) — 32 anos, contadora, 2 desistências anteriores |
| **Diego** | Game Designer — ex-Ubisoft, sistemas de progressão e gamificação |

---

---

# ◉ P L A N — DIAGNÓSTICO

## Diagnóstico Consolidado

O English Autentico tem fundações pedagógicas genuinamente sólidas — o formato PRC (Pergunta-Resposta-Conclusão), as armadilhas contextualizadas, a separação Estudo/Prática em abas e o TTS integrado demonstram cuidado real com a aprendizagem. O problema não é ausência de qualidade; é que a qualidade existente está sendo bloqueada por uma combinação de **débito técnico crítico**, **sobrecarga cognitiva estrutural**, **ausência de ciclo de aquisição completo** e um **sistema de progressão que recompensa o comportamento errado**.

### Raiz dos Problemas (por ordem de impacto)

1. **Bug crítico:** renderer lê `c.ingles` mas JSON armazena o campo como `"italiano"` — flip cards renderizam em **branco em 100% das lições**
2. **Sobrecarga cognitiva estrutural:** 28–32 unidades de informação exibidas simultaneamente na aba Estudo antes de qualquer interação (limite da memória de trabalho: 4–7 chunks)
3. **Ausência de ciclo de aquisição:** nenhum exercício exige produção ou uso comunicativo da estrutura aprendida — 90 lições, zero output significativo
4. **Sistema de XP incentiva conclusão rápida:** bônus de +60 concedido sem score mínimo — o aluno percebe que é mais eficiente terminar rápido do que acertar bem
5. **Armadilhas não cobrem os erros de transferência negativa documentados para brasileiros** (posição do adjetivo, advérbio de frequência, dupla negação)
6. **Ausência do Present Continuous no A1** — morfema de alta saliência comunicativa e aquisição precoce ausente do currículo
7. **Campo 'motivo' mistura regras, descrições e mnemônicos** sem critério pedagógico uniforme — desperdiça oportunidade de criar âncora de memória real
8. **Ausência de spaced repetition:** lições completadas desaparecem do workflow sem agendamento de revisão

### Hipótese Central

> Se corrigirmos o bug dos flip cards (campo `italiano → ingles`), segmentarmos a aba Estudo em no máximo 3 elementos por tela, introduzirmos um Momento de Uso contextualizado após os exercícios e vincularmos o bônus de conclusão a um score mínimo de 70%, o aluno adulto brasileiro conseguirá completar uma lição com sensação real de conquista, reterá a estrutura gramatical por mais de 24h e voltará na próxima sessão com autoeficácia crescente.

---

## Vozes dos Especialistas — Diagnóstico Individual

### 🎓 Ana Paula (Pedagoga SLA)

> *"O problema central não é falta de conteúdo — é que o conteúdo existe em modo de transmissão, não em modo de aquisição. Você tem 90 lições impecavelmente organizadas ensinando gramática para um aluno que nunca vai precisar explicar gramática, vai precisar FALAR inglês. Enquanto cada lição for uma sequência de 'leia a regra, marque a opção certa, receba o XP', estamos construindo alunos que sabem responder testes de gramática e travam na primeira frase real."*

**Principais achados:**
- Cada lição existe como uma **ilha sem referências cruzadas** entre tópicos — a SLA moderna exige aprendizado em espiral
- O campo `alerta` usa **cheerleading genérico** em vez de ancoragem cognitiva situacional ("O verbo To Be é o coração do inglês!" vs "Você vai usar isso amanhã na sua apresentação")
- As **armadilhas aparecem antes da consolidação** — exposição precoce à forma incorreta cria interferência negativa para iniciantes A1
- A **coda é repetição** do que já foi dito — deveria conectar ao próximo tópico e dar uma frase de uso real para hoje
- O **Present Perfect (B1)** recebe o mesmo espaço que lições triviais — o maior gatilho de desistência do brasileiro não tem scaffolding adequado

**Pontos fortes identificados por Ana Paula:**
- Formato PRC tem potencial real de scaffolding — quando bem executado, cria tensão cognitiva genuína
- Armadilha `its vs it's` é pedagogia de alto valor — diferencial que cursos tradicionais ignoram
- Resposta curta afirmativa ("Yes, I am" — nunca "Yes, I'm") é conteúdo de altíssimo valor comunicativo

---

### 🎨 Roberto (LX Designer EdTech)

> *"O conteúdo pedagógico aqui é sólido — a sequência NMA, as armadilhas, os exemplos PRC são trabalho de quem entende aprendizado de idiomas. Mas eu não entregaria esse app para um aluno hoje porque tem um bug que quebra o coração da experiência: os flip cards de estudo estão todos em branco porque o JSON usa 'italiano' e o renderer pede 'ingles'. Esse campo precisa ser corrigido antes de qualquer refinamento de UX."*

**Bug confirmado por Roberto (linha a linha):**
```
data/grammar_a1_1.json linha 10:  "italiano": "I am"
js/grammar.js linha 860:          <div class="gfc-en">${c.ingles}</div>
                                  → c.ingles === undefined → card em BRANCO
```

**Principais achados:**
- **Alerta motivacional enterrado** dentro da aba Estudo — invisível para quem vai direto à Prática (a maioria dos adultos impacientes)
- **Módulos bloqueados expostos** como pills clicáveis com senha admin — gera frustração e associa o app a bloqueio
- **Rastreio de dificuldade** (`en_gram_erros` + `obterTopicosDificeis()`) **existe no código mas não tem UI** — dado valioso desperdiçado
- Aba Estudo pode ter **8–12 telas de scroll** antes do botão "Iniciar Prática" — adultos com pouco tempo abandonam antes do exercício
- XP inconsistente: revelar = +5, escolha/digitar = +8 — diferença não comunicada e sem justificativa percebida

**Custo de toques até o primeiro exercício:** 4 interações (vs. 2 no Duolingo)

**Pontos fortes identificados por Roberto:**
- Tabela de referência colapsável disponível durante exercícios — decisão de UX madura que reduz carga cognitiva
- Feedback imediato colorido com explicação pedagógica inline — superior a apps que mostram só certo/errado
- Animação de transição entre exercícios com fade+translateY — 4 linhas de CSS que entregam sensação de fluidez

---

### 🔬 Fernanda (Linguista PhD)

> *"Este currículo tem uma base sólida, mas falha exatamente onde precisa acertar: é um app para brasileiros, mas as armadilhas não conhecem os erros do brasileiro, os exemplos não falam com o adulto brasileiro, e o A1 termina sem Present Continuous — o morfema que qualquer pesquisa de aquisição listaria entre os três primeiros a ensinar."*

**Principais achados (baseados em pesquisa de SLA):**
- A sequência segue **lógica estrutural-tradicional de Lado (1957)**, não a ordem natural de aquisição de Krashen/Ellis/Dulay & Burt (1974)
- **Present Continuous ausente no A1** — morfema adquirido precocemente em L2 inglês, com altíssima saliência comunicativa
- Armadilhas cobrem erros morfológicos gerais mas **omitem as 3 transferências negativas mais documentadas PT-BR → EN:**
  1. Posição do adjetivo: `"car red"` → `"red car"`
  2. Advérbio de frequência antes do sujeito: `"Always I go"` → `"I always go"`
  3. Dupla negação coloquial: `"I don't know nothing"` → `"I don't know anything"`
- Campo `"motivo"` é restatement da regra, não mnemônico — `"Sempre usa am"` vs `"I+AM são inseparáveis — como 'Eu' nunca muda, I+am nunca mudam entre si"`
- **Lacunas curriculares A1 vs. CEFR:** números/horas, There is/There are, adjetivos em posição pré-nominal, imperativos
- Exemplos PRC de baixa saliência para adulto brasileiro: `"Look at those birds!"` `"She is a teacher"` vs situações de trabalho/viagem/digital

**Pontos fortes identificados por Fernanda:**
- Contrações desde a lição 1 (You're, He's) — correto fonologicamente, o input nativo usa contrações majoritariamente
- Armadilha `amn't` — previne erro de hiperregularização raro em materiais didáticos
- Caso genitivo com `parents'` no A1 — frequentemente omitido por ser "avançado demais"

---

### 🧠 Marcus (Psicólogo Educacional)

> *"Pela teoria, o blur-reveal deveria ser fricção desnecessária. Mas a Sofia queria o reveal. Isso me ensinou que existe fricção que motiva e fricção que frustra — e a distinção está no controle que o aluno tem sobre ela."*

**Análise de Carga Cognitiva (Sweller):**

| Elemento | Unidades de Info |
|----------|-----------------|
| 7 observacao_cards | ~14 chunks |
| Tabela (3 col × 5 lin) | 15 células |
| 2 exemplos PRC (4 campos cada) | 8 chunks |
| 2 armadilhas + explicações | 6 chunks |
| Coda | 1 chunk |
| **TOTAL** | **~28–32 chunks** |

Limite da memória de trabalho: **4–7 chunks** (Miller, 1956; Cowan, 2001)

**Análise Motivacional (SDT — Deci & Ryan):**
- **Autonomia:** ✅ navegação livre entre abas; ❌ exercícios sequenciais obrigatórios sem possibilidade de pular
- **Competência:** ❌ coda usa `"Pratique e isso vai ficar natural"` — vaga, sem critério de sucesso concreto
- **Conexão:** ❌ zero ancoragem cultural brasileira nos exemplos

**Problema da proporção XP (efeito undermining de Deci 1999):**
- Bônus de conclusão (+60) = 7,5× um acerto (+8)
- Incentivo percebido: **terminar rápido > aprender bem**

**Pontos fortes identificados por Marcus:**
- Formato PRC simula dinâmica de professor — substitui parcialmente a ausência de tutor para autodidatas
- Armadilhas criam momento de reconhecimento ("ah, era assim que eu errava") — reduz vergonha e aumenta retenção
- Feedback colorido imediato — para quem tem medo de errar, saber o porquê na hora é terapêutico

---

### 📱 Sofia (Aluna Real — Persona)

> *"Eu diria na reunião: o app ensina certo, mas não celebra junto comigo — e pra quem já desistiu duas vezes, a sensação de conquista importa mais do que a perfeição do conteúdo. Conserta o blur-reveal, faz o XP aparecer na tela de verdade, e para de chamar o inglês de 'italiano' nos dados."*

**Experiência relatada por Sofia:**
- Abriu a Lição 1 no metrô, às 22h, depois do trabalho
- Rolou a tela, sentiu que entendeu — chegou nos exercícios e errou
- O flip card não revelou nada (bug `italiano/ingles`) — ela não percebeu o bug, atribuiu a si mesma
- O XP sumiu "em silêncio" — sem animação, sem celebração — decepcionante
- O blur-reveal na instrução de exercício confundiu: não sabia que devia tocar nas palavras individualmente
- O triângulo da coda (`I → AM | He/She/It → IS | We/You/They → ARE`) ficou na cabeça — é o tipo de coisa que ela escreveu no papel

**O que Sofia pede explicitamente:**
- XP visível na tela no momento exato do acerto
- Instrução mais clara no blur-reveal
- Menos texto para rolar antes do primeiro exercício
- Que o app **celebre com ela**, não apenas registre que ela terminou

**Pontos fortes identificados por Sofia:**
- Separação Estudo/Prática com botão "Iniciar Prática" — não se sente jogada nos exercícios sem preparo
- Feedback colorido com explicação — "diferente dos outros apps que só mostram X vermelho"
- Triângulo da coda da Lição 1 — ficou na memória

---

### 🎮 Diego (Game Designer)

> *"O maior erro deste sistema não é técnico — é filosófico. Você construiu um repositório de conhecimento com uma camada fina de gamificação por cima, quando deveria ter construído um jogo com conhecimento como conteúdo. XP sem threshold visível não é recompensa — é ruído."*

**Análise do Core Loop:**
```
Atual:   Estuda cards → Faz exercícios → Vê score → Clica "Próximo"
         [sem tensão] [sem risco]      [sem emoção] [motivação zero]

Ideal:   Ação → Feedback → Recompensa visível → Motivação clara para amanhã
```

**Problemas de game design identificados:**
- **XP sem threshold:** o número cresce mas não conversa com nenhum barra de nível visível
- **Bônus sem stake:** aluno com 0% e aluno com 100% recebem o mesmo +60 XP de conclusão
- **Streak ausente:** zero custo percebido de pular um dia — e dias viram semanas
- **Resultado fraco:** 100% de acerto vs 40% → diferença é apenas um emoji
- **Bloqueio por senha admin:** remove agência do jogador — remoção de autonomia é o mecanismo mais desmotivador em game design
- **Identidade de jogador ausente:** sem nome visível, sem título, sem conquistas — aluno não tem "skin no jogo"
- **Boss Battle ausente:** completar 30 lições de A1 termina igual à lição 1 — narrativamente vazio

**Pontos fortes identificados por Diego:**
- `obterTopicosDificeis()` já implementado — fundação de revisão inteligente inexplorada
- Três tipos de exercício com feedback diferenciado — variedade cognitiva real
- Schema JSON rico por lição — suporta evolução sem reestruturação de dados

---

## Debates Cruzados

### ⚔️ Ana Paula × Diego — Pedagogia vs. Gamificação

**Concordam:** Score mínimo para bônus de conclusão é necessário. Momento de resultado precisa ser emocionalmente rico.

**Discordam profundamente:** Diego quer tensão, risco e possibilidade de perder progresso. Ana Paula rejeita: para o adulto com histórico de fracasso em idiomas, risco percebido eleva ansiedade de língua estrangeira (Horwitz et al., 1986) e **para a aquisição**.

**Proposta Conjunta — "Momento de Uso":**
> Após os exercícios, antes dos botões de ação, exibir uma situação real de 2-3 linhas (mensagem de WhatsApp fictícia, legenda de série, email de trabalho) onde a estrutura da lição aparece em contexto autêntico, com UMA pergunta de compreensão. Sem cronômetro, sem vidas, sem punição. Score mínimo de Diego determina se o aluno vê a versão básica ou estendida. Uso real de Ana Paula e engajamento pós-resultado de Diego aparecem no mesmo momento.

---

### ⚔️ Marcus × Sofia — Teoria vs. Experiência Vivida

**Confirmação da teoria:** Sofia descreveu exatamente a sobrecarga de elementos prevista por Miller (1956) — "rolou a tela, sentiu que entendeu" é a ilusão de fluência causada por processamento superficial.

**Surpresa:** A teoria previa que o blur-reveal seria fricção desnecessária. Sofia **queria** o reveal — a descoberta progressiva foi prazerosa quando funcionou. Isso valida a distinção de Bjork (1994): fricção sob controle do aluno = desejável; fricção causada por bug = destruidora.

**Insight crítico de Marcus:** Quando o flip card não revelou nada (bug), Sofia não pensou "tem um bug". Ela continuou e errou o exercício. O atrito acumulado formou **narrativa de incompetência pessoal**. Cada bug técnico alimenta o "eu não tenho jeito" — a prioridade de correção técnica é **proteção psicológica**, não apenas UX.

**Proposta Conjunta:** Segmentar aba Estudo em passos de máximo 3 elementos por tela + blur-reveal funcionando corretamente + micro-celebração de XP visível no momento exato do acerto (não acumulado em silêncio).

---

### ⚔️ Fernanda × Roberto — Rigor Linguístico vs. Fluidez de UX

**Concordam:** Bug `italiano/ingles` é prioridade zero. Conteúdo pedagógico base (PRC, armadilhas, exemplos) é sólido.

**Discordam:** Roberto quer reduzir fricção e aumentar fluidez — menos conteúdo antes do primeiro exercício. Fernanda avisa: "O Duolingo faz exatamente isso e produz alunos que terminam o curso sem sustentar 90 segundos de conversa. Fluência de experiência não é fluência linguística."

**Insight de Fernanda ao ler Roberto:** O campo `alerta` é o único espaço onde a voz do app fala com o adulto antes de qualquer instrução formal. Roberto o lê como onboarding de UX. Fernanda o reconhece como **âncora de ativação de conhecimento prévio** (schema activation) — o preditor mais forte de retenção em adultos na pesquisa em SLA.

**Proposta Conjunta — Reformular o "alerta":**
> Dois tempos: (1) frase-âncora que conecta o tópico a uma situação real que o adulto já viveu em português; (2) pergunta de ativação curta que o aluno responde mentalmente antes de ver qualquer regra. Roberto garante que caiba em duas linhas no mobile. Fernanda garante que a âncora respeite a ordem de aquisição.

---

---

# ◉ D O — AÇÕES

## Ações Imediatas (até 1 semana — sem refatoração de código)

### ① Bug Crítico: Flip Cards em Branco
**Arquivo:** `js/grammar.js` linha 860
```js
// ANTES (todos os cards renderizam em branco):
<div class="gfc-en">${c.ingles}</div>

// DEPOIS (correção imediata — 30 minutos de trabalho):
<div class="gfc-en">${c.italiano || c.ingles}</div>
```
> Alternativa limpa a médio prazo: renomear `"italiano"` para `"forma"` em todos os JSONs e atualizar o renderer definitivamente.

---

### ② Score Mínimo para Bônus de Conclusão
**Arquivo:** `js/grammar.js` — método `_htmlResultado()` (linha ~600)
```js
// ANTES — bônus incondicional:
const bonus = 60;
if (!jaFeita) { App.ganharXP(bonus); }

// DEPOIS — bônus condicional:
const SCORE_MINIMO = 70;
if (!jaFeita && pct >= SCORE_MINIMO) {
  App.ganharXP(60);
  App.notificar('🎉 Lição conquistada!', 'sucesso');
} else if (!jaFeita) {
  App.notificar('Complete com 70%+ para ganhar o bônus de XP!', 'aviso');
  // Registra tentativa mas não concede bônus
}
```

---

### ③ Mover o Alerta para Fora das Abas
**Arquivo:** `js/grammar.js` — método `_htmlUnidade()`

```js
// ANTES: alerta dentro da aba Estudo (invisível para quem vai direto à Prática)
// DEPOIS: antes do bloco de abas, visível para todos
if (u.alerta) {
  html += `<div class="gram-alerta-global">
    <span>💬</span>
    <p>${u.alerta}</p>
  </div>`;
}
// CSS: .gram-alerta-global { margin: 0 0 1rem; padding: 1rem;
//       background: #fff8e1; border-left: 4px solid #f59e0b; }
```

---

### ④ Instrução Clara no Blur-Reveal
**Arquivo:** `js/grammar.js` — método `_htmlExercicioRevelar()`
```
ANTES: texto genérico
DEPOIS: "👆 Toque em cada palavra para revelar a resposta uma a uma."
+ adicionar CSS @keyframes pulse na primeira palavra desfocada (indicador visual para mobile)
```

---

### ⑤ Reformular Campo "motivo" como Âncora Mnemônica (JSON puro)
**Arquivo:** `data/grammar_a1_1.json` e demais

| Card | Antes | Depois |
|------|-------|--------|
| I am | "Sempre usa 'am'" | "I+AM são inseparáveis — como 'Eu' nunca muda, I+am nunca mudam entre si" |
| You are | "Usa 'are' no singular e plural" | "YOU é democrático — trata um e muitos igual, sempre ARE" |
| He/She/It is | "Sempre usa 'is'" | "Toda 3ª pessoa carrega IS como um sobrenome — He IS, She IS, It IS" |

---

### ⑥ Adicionar 3 Novas Armadilhas PT-BR → EN nas Lições A1 (JSON puro)
```json
// Em lições de adjetivos (futuras) ou Present Simple:
{
  "errado": "I have a car red.",
  "certo": "I have a red car.",
  "explicacao": "Em inglês o adjetivo SEMPRE vem ANTES do substantivo — o oposto do português."
},
{
  "errado": "Always I study at night.",
  "certo": "I always study at night.",
  "explicacao": "Advérbios de frequência ficam ENTRE o sujeito e o verbo principal em inglês."
},
{
  "errado": "I don't know nothing.",
  "certo": "I don't know anything.",
  "explicacao": "Inglês não aceita dupla negação — use any- em frases negativas, nunca no-/nothing."
}
```

---

## Ações de Médio Prazo (1–4 semanas)

### ⑦ Implementar o "Momento de Uso" Pós-Exercício

**Novo campo JSON nas lições:**
```json
"momento_uso": {
  "contexto": "Mensagem recebida: 'Hi! I am João, I am from São Paulo. Are you from Brazil too?'",
  "pergunta": "Qual forma do To Be João usou para se apresentar?",
  "resposta": "'I am' — primeira pessoa do singular."
}
```
Renderizar no `_htmlResultado()` quando `pct >= 70`, antes dos botões de ação.

---

### ⑧ Adicionar Timestamp às Lições Completadas + Badge de Revisão

```js
// ANTES:
grammatica_completadas = ["a1-lez1", "a1-lez2"]

// DEPOIS:
grammatica_completadas = [
  { id: "a1-lez1", completadaEm: 1719014400000, melhorScore: 83 },
  { id: "a1-lez2", completadaEm: 1719100800000, melhorScore: 67 }
]
```
No seletor: lições completadas há mais de 7 dias com `melhorScore < 80` recebem badge "Revisar 🔁" em vez do checkmark ✅.

---

### ⑨ Surfar os Tópicos Difíceis do Aluno no Seletor

```js
// Em _htmlSeletor(), antes do loop de módulos:
const dificeis = this.obterTopicosDificeis(3); // método já existe!
if (dificeis.length) {
  html += `<div class="gram-revisao-card">
    <h3>📌 Revisar agora</h3>
    ${dificeis.map(t => `<button onclick="Grammatica.abrirUnidade('${t.moduloId}','${t.id}')">${t.titulo}</button>`).join('')}
  </div>`;
}
```

---

### ⑩ Micro-Animação de XP no Momento do Acerto

```js
// Em responder() e marcarAcerto(), após App.ganharXP():
function _animarXP(valor) {
  const el = document.createElement('div');
  el.className = 'gram-xp-toast';
  el.textContent = `+${valor} XP`;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(-40px)';
  });
  setTimeout(() => el.remove(), 1500);
}
// CSS: .gram-xp-toast { position:fixed; bottom:80px; right:1rem;
//       color:#f59e0b; font-weight:700; font-size:1.2rem;
//       transition: opacity 1.5s, transform 1.5s; opacity:0; }
```

---

### ⑪ Streak Diário Visível no Seletor

```js
// Em _htmlSeletor():
const streak = this._calcularStreak(); // novo método
html += `<div class="gram-streak">🔥 ${streak} ${streak === 1 ? 'dia' : 'dias'} seguidos</div>`;

_calcularStreak() {
  const dados = JSON.parse(localStorage.getItem('en_gram_streak') || '{"dias":0,"ultimo":""}');
  const hoje = new Date().toISOString().slice(0,10);
  if (dados.ultimo === hoje) return dados.dias;
  const ontem = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  if (dados.ultimo === ontem) {
    dados.dias++; dados.ultimo = hoje;
  } else {
    dados.dias = 1; dados.ultimo = hoje;
  }
  localStorage.setItem('en_gram_streak', JSON.stringify(dados));
  return dados.dias;
}
```

---

## Ações Estruturais (1–3 meses)

### ⑫ Criar Lição de Present Continuous no A1
**Arquivo novo:** `data/grammar_a1_present_continuous.json`
- IDs: `a1-lez21` (Afirmativa: am/is/are + -ing) e `a1-lez22` (Negativa/Pergunta + diferença com Present Simple)
- Âncoras: situações de videochamada, mensagem de texto — "What are you doing?" / "I am studying."
- Armadilha obrigatória: `"I am go to work"` → `"I am going to work"` (base em vez de -ing)

### ⑬ Segmentar Aba Estudo em Passos Paginados (máx. 3 elementos/tela)
```
Passo 1/4 — Alerta + até 3 flip cards         [botão: Continuar →]
Passo 2/4 — Flip cards restantes + Tabela     [botão: Continuar →]
Passo 3/4 — Exemplos PRC                      [botão: Continuar →]
Passo 4/4 — Armadilhas + Coda + [Iniciar Prática]
```
Não altera o JSON — apenas o renderer `_htmlFases()`.

### ⑭ Criar Lições A1 Ausentes vs. CEFR
Por prioridade de impacto comunicativo:
1. **There is / There are** — existência e localização (maior impacto imediato)
2. **Adjetivos — posição pré-nominal** — cobre a transferência negativa mais documentada
3. **Imperativos** — essential para viagem e trabalho
4. **Números, horas, datas** — completam o A1 real do CEFR

### ⑮ Desbloqueio por Mérito (substituir senha admin)
- Módulo A2 desbloqueado automaticamente quando: `A1 completado com score médio >= 70%`
- Senha admin mantida como bypass de emergência via **toque longo** (700ms) no banner do módulo bloqueado
- Animação de desbloqueio + "+100 XP bônus" ao desbloquear por mérito

---

---

# ◉ C H E C K — MÉTRICAS

## Métricas Principais

| Métrica | Como medir | Meta |
|---------|-----------|------|
| Taxa de conclusão com score ≥ 70% | % lições com bônus XP ganho / total tentativas | ≥ 65% |
| Taxa de retorno em 48h | Timestamp conclusão vs. próxima abertura do módulo | ≥ 50% |
| Interação com flip cards | Eventos `gram_card_flip` por sessão após correção do bug | Média ≥ 4 cards/visita |
| Score médio por lição | `melhorScore` na estrutura de completadas | A1 ≥ 75%; alerta se < 60% |
| Abandono na aba Estudo | Abertura de lição sem chegar ao primeiro exercício | < 30% |

## Sinais de Alerta

- Score médio A1 abaixo de **55%** → dificuldade dos exercícios acima do scaffolding disponível
- Taxa de "Acertei" no revelar acima de **95%** → possível gaming do sistema
- Mais de **40%** das sessões terminam sem completar todos os exercícios → fadiga antes do fim da lição
- **Zero** cliques em flip cards após correção do bug → problema de UX visual nos cards (não apenas bug)
- Taxa de revisão (lição aberta 2ª vez) abaixo de **10%** → badge de "Revisar" não está motivando

## Método de Coleta (sem backend)

```js
// Criar em localStorage:
gram_analytics = {
  sessoes: [],
  cards_clicados: { "a1-lez1": 5, "a1-lez2": 3 },
  abandono: { "a1-lez3": { exIndex: 2, timestamp: 1719200000 } }
}
// Para análise: console.log(JSON.parse(localStorage.getItem('gram_analytics')))
// Para compartilhar: botão admin que gera JSON.stringify() copiável
```

---

---

# ◉ A C T — PADRONIZAÇÃO E PRÓXIMO CICLO

## Se Funcionar (score médio ≥ 75% e retorno 48h ≥ 50% em 30 dias)

1. **Documentar o schema** com campo renomeado `"italiano"` → `"forma"` como padrão obrigatório
2. **Criar template de lição JSON** com todos os campos obrigatórios e instruções editoriais inline
3. **Padronizar o campo `alerta`** como estrutura de dois tempos: âncora situacional + pergunta de ativação
4. **Regra editorial:** toda nova armadilha deve cobrir erro de transferência PT-BR → EN documentado, nunca apenas erro morfossintático genérico

## Plano B (score < 60% ou abandono > 40% após 30 dias)

1. Accelerar a segmentação da aba Estudo de "ação estrutural" para "ação imediata"
2. Reduzir exercícios de 6 para 4 por lição + 1 exercício de produção guiada obrigatório (ordenação de palavras)
3. Se abandono concentrado em B1+: dividir lição de Present Perfect em 2 (Forma + Uso vs. Past Simple)

## Próximo Ciclo PDCA (60–90 dias)

1. Validar "Momento de Uso" com 5+ alunos beta — coletar feedback qualitativo sobre contextos situacionais
2. Avaliar dados de analytics e decidir sobre segmentação da aba Estudo
3. Planejar expansão curricular A1 com template padronizado
4. Avaliar streak diário — se D7 retention < 40%, priorizar como P1

---

---

# 📅 ROADMAP 30 · 60 · 90

## Dia 30 (Sprint Urgente)

- [ ] **Corrigir bug crítico** `c.italiano || c.ingles` no renderer — 30 minutos
- [ ] **Mover alerta** para fora das abas — 1-2h
- [ ] **Score mínimo 70%** para bônus de conclusão em `_htmlResultado()` — 1h
- [ ] **Instrução clara** no blur-reveal + pulsação visual na primeira palavra — 1h
- [ ] **Reformular campos "motivo"** lições A1-lez1 a A1-lez5 como âncoras mnemônicas (edição JSON) — 4-6h
- [ ] **Adicionar 3 armadilhas PT-BR** nas lições A1 relevantes — 3-4h

**Custo total estimado: 1 dia de trabalho**

## Dia 60 (Sprint de Qualidade)

- [ ] Implementar campo `"momento_uso"` nas 10 primeiras lições A1 + renderizar no resultado
- [ ] Adicionar `timestamp` e `melhorScore` à estrutura de `grammatica_completadas`
- [ ] Badge visual "Revisar 🔁" para lições > 7 dias com score < 80% no seletor
- [ ] Reformular campos `"motivo"` de todas as lições A1 e A2
- [ ] Reformular campos `"alerta"` de todas as lições A1 (gancho de dois tempos)
- [ ] Implementar `gram_analytics` no localStorage (cliques em cards + abandono)

## Dia 90 (Sprint Estrutural)

- [ ] Criar lição Present Continuous no A1 (grammar_a1_present_continuous.json)
- [ ] Implementar segmentação da aba Estudo em 4 passos paginados
- [ ] Criar lição There is / There are no A1
- [ ] Implementar streak diário visível no seletor
- [ ] Analisar dados de analytics dos 60 dias anteriores
- [ ] Renomear campo `"italiano"` → `"forma"` definitivamente em todos os JSONs (script em lote)

---

---

# ⚖️ DECISÕES CONTROVERSAS

### Tensão vs. Segurança

| | Posição |
|-|---------|
| **Diego** | Sem risco, sem tensão, sem engajamento — score mínimo obrigatório, streak com penalidade, boss battle |
| **Ana Paula** | Adulto com histórico de fracasso tem filtro afetivo alto — risco eleva ansiedade de língua estrangeira e para aquisição |
| **Decisão** | **Fricção lúdica CONTROLADA pelo aluno, sem penalidade de perda de progresso.** Score mínimo para bônus (não para avançar). Boss Battle como Desafio Opcional. Streak visível, mas quebra não cancela nada. |
| **Base** | Literatura sobre ansiedade de LE (Horwitz et al., 1986) + dado de que 70%+ dos adultos brasileiros já desistiram de ao menos um curso de inglês |

### UX vs. Pedagogia

| | Posição |
|-|---------|
| **Roberto** | Reduzir custo de toques e conteúdo antes do primeiro exercício — Duolingo como benchmark |
| **Fernanda** | Duolingo produz alunos que terminam o curso sem sustentar conversa de 90s — fluência de experiência ≠ fluência linguística |
| **Decisão** | **Segmentar aba Estudo em passos paginados, respeitando a ordem pedagógica existente.** A sequência dos blocos não muda; muda apenas que são apresentados em passos com confirmação, não em scroll contínuo. |

### Bloqueio de Módulos

| | Posição |
|-|---------|
| **Diego** | Senha admin hardcoded remove agência do jogador — autonomia é pilar da motivação intrínseca |
| **Ana Paula** | Pré-requisito pedagógico é sequenciamento legítimo, não paternalismo |
| **Decisão** | **Manter pré-requisitos, substituir senha admin por desbloqueio por mérito** (A1 com score médio ≥ 70% desbloqueia A2 automaticamente). Senha admin mantida como bypass via toque longo — invisível para o aluno. |

---

---

# 💌 CARTA AO DESENVOLVEDOR

*(Escrita pelo Facilitador, sintetizando as vozes de toda a equipe)*

---

Olá,

Você construiu algo que merece respeito. Não estou dizendo isso para abrir uma conversa difícil com elogio fácil — estou dizendo porque, depois de ler tudo que foi produzido sobre o seu app, a conclusão unânime do time é que o problema aqui não é falta de talento nem de cuidado. É exatamente o oposto: você construiu tanto, com tanto detalhe, que o produto acumulou dívidas que agora precisam ser pagas antes de crescer.

Vou te contar o que mais nos impressionou primeiro. O formato PRC (Pergunta-Resposta-Conclusão) nos exemplos é genuinamente bom — é scaffolding cognitivo de qualidade, do tipo que você não vê em materiais brasileiros de inglês com facilidade. As armadilhas com explicação de causa são um diferencial real: enquanto outros apps só mostram X vermelho, o seu explica por que o erro acontece. A arquitetura de abas Estudo/Prática com transição animada mostra que você pensou na experiência antes de pensar nas funcionalidades. Isso importa.

Agora a parte difícil, e preciso que você leia isso com calma.

**Existe um bug em produção que destrói a Fase 2 do seu método.** Todos os flip cards da aba Estudo estão renderizando em branco. O renderer lê `c.ingles` na linha 860 do grammar.js, mas todos os seus JSONs armazenam o conteúdo em inglês como `c.italiano` — resquício do projeto de italiano que nunca foi renomeado. O aluno abre o app, vê os cards com tradução em português, clica e não vê nada. Ele não sabe que é um bug. Ele pensa que é o app funcionando assim. E continua. E quando erra nos exercícios, não conecta ao conteúdo que não absorveu — conecta à crença de que não tem jeito para inglês.

Essa correção leva 30 minutos. Uma linha de código: `c.italiano || c.ingles`. É a mudança mais importante que você pode fazer hoje.

O segundo problema que quero que você entenda é sobre a Sofia. Ela é fictícia, mas representa milhões de brasileiros reais: 32 anos, já desistiu duas vezes, abre o app às 23h depois de um dia exaustivo, com 20 minutos antes de dormir. Ela não precisa que o app seja fácil demais. Ela precisa que o app seja honesto com ela. Cada bug que ela encontra, cada instrução que não fica clara, cada XP que some em silêncio sem celebração — tudo isso alimenta uma narrativa que ela já tem pronta: "eu não tenho jeito para isso". O seu app tem a oportunidade de ser a primeira experiência que não reforça essa narrativa.

A instrução do blur-reveal precisa ser mais clara em mobile. O XP precisa aparecer na tela com animação no momento exato do acerto, não acumulado em silêncio. O alerta motivacional precisa estar visível antes das abas, não escondido dentro da aba Estudo onde quem vai direto para Prática nunca o vê. Nenhuma dessas mudanças exige refatoração grande. Todas podem ser feitas em um fim de semana. Cada uma delas é uma declaração para a Sofia: *eu sei que você está cansada, eu pensei em você.*

O terceiro ponto é sobre o sistema de XP. Hoje, o bônus de conclusão (+60) é sete a dez vezes maior que cada acerto individual. Isso cria um incentivo perverso que você provavelmente não quis criar: o aluno percebe que o mais racional é terminar rápido, não aprender bem. Adicionar um score mínimo de 70% para ganhar o bônus não pune o aluno — diz a ele que a recompensa grande é para quem realmente estudou, não para quem clicou mais rápido.

Por último: o campo `"italiano"` no JSON é um símbolo. Não de negligência — de velocidade. Você estava construindo, migrando, adaptando, e esse campo sobreviveu porque havia coisas mais urgentes. Mas ele ainda está lá, em todos os arquivos, como um lembrete de que o produto ainda não terminou de se encontrar. Renomear esse campo não é faxina técnica — é um ato de identidade. É o momento em que o app para de ser um curso de italiano adaptado e passa a ser, oficialmente, o **English Autentico**.

Você tem um produto que pode mudar a vida de adultos brasileiros que nunca tiveram acesso a um bom ensino de inglês. Não por falta de capacidade — por falta de oportunidade, de dinheiro, de tempo. Você está construindo a oportunidade deles.

O plano começa pequeno e concreto. Não precisa de frameworks, não precisa de servidor, não precisa de equipe. Precisa de você, do seu editor de texto, e de **trinta minutos para a primeira mudança**.

Com respeito e torcida,

**O time de especialistas**
*(Ana Paula · Roberto · Fernanda · Marcus · Sofia · Diego)*

---
*Documento gerado por brainstorm multi-agente em 22/06/2026*
*Baseado em análise direta dos arquivos: `js/grammar.js`, `data/grammar_a1_1.json`, `data/grammar_b1_1.json` e demais arquivos do módulo de gramática*
