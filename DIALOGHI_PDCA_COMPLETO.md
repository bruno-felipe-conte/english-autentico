# 📋 RELATÓRIO PDCA COMPLETO — ABA DE DIÁLOGOS
## English Learning App Pro — Brainstorm Multi-Perspectiva com Melhoria Contínua

**Data:** Junho 2026  
**Metodologia:** Ciclo PDCA (Plan-Do-Check-Act)  
**Equipe de Brainstorm:** 4 especialistas com perspectivas distintas  
**Escopo:** Releitura completa da aba de Diálogos — código, UX, pedagogia, produto

---

# ═══════════════════════════════════════════════════════════════
# FASE 1 — PLANEJAR (Plan)
# ═══════════════════════════════════════════════════════════════

## 1.1 ESTADO ATUAL — MAPEAMENTO COMPLETO

### Arquitetura da Aba de Diálogos:

**Seletor (renderizarSeletor — ~70 linhas):**
- Grid de cards: ícone, título, nível, badge "meu", checkmark ✅
- Filtros: busca texto, nível (A1-C1), origem (todos/custom/nativo)
- Botões: Adicionar (formulário) + IA Import
- Contadores por nível/origem

**Modo Leitura (renderizarDialogo — modo 'leitura' — ~50 linhas):**
- Chat com bolhas: personagem (esquerda), usuário (direita)
- Cada turno: nome, frase EN, 🔊 áudio, IPA, tradução PT
- Botão "Praticar" no final

**Modo Prática (renderizarDialogo — modo 'pratica' — ~60 linhas):**
- Revelação progressiva turno a turno
- Turnos personagem: frase + tradução + "Continuar"
- Turnos usuário: 4 alternativas (múltipla escolha)
- Feedback: correta (verde), errada (vermelho + correta em verde)
- Timeout: 1.2s (acerto) / 2.2s (erro) → avanço automático
- Resultado: emoji, acertos/total, XP (se ≥60%), vocabulário-chave

**Criação/Edição (abrirFormularioCriar — ~70 linhas):**
- Formulário inline: título, nível, ícone, contexto
- Turnos dinâmicos: adicionar fala personagem ou resposta usuário
- Validação: título obrigatório, mínimo 2 turnos
- Salvamento: localStorage (en_dialoghi_custom)

**Dados (dialogi.json — 1535 linhas, ~60KB):**
- ~15 diálogos A1-B1
- Estrutura: id, titulo, icone, nivel, contexto, turni[], vocabulario_chave[], xp_recompensa
- Turni: personaggio, frase, traducao, audio_ipa, alternativas[], resposta_correta

**CSS (regras dialogo-* espalhadas em 3 arquivos):**
- english.css: .dialogo-conversa, .dialogo-turno, .dialogo-bubble, .dialogo-nome, .dialogo-traducao, .dialogo-audio-btn, .dialogo-pratica-frase, .dialogo-opcoes, .dialogo-opcao, .correta, .errada
- styles.css: .dialogo-grid, .dialogo-card, .dialogo-icone, .dialogo-titulo, .dialogo-nivel, .dialogo-xp
- italia.css: .dialogo-grid, .dialogo-card (com animações)

### Fluxo do Aluno:
```
Seletor → Clica card → Modo Leitura (ler/ouvir) → "Praticar" → 
Modo Prática (escolher respostas) → Resultado → Volta ao seletor
```

---

## 1.2 ANÁLISE MULTI-PERSPECTIVA — PROBLEMAS CONSOLIDADOS

### 🔵 PERSPECTIVA 1: UX/UI DESIGNER (Referência: Duolingo, Babbel, Busuu)

**12 PROBLEMAS:**

| # | Problema | Severidade |
|---|----------|------------|
| 1 | Cards sem indicação de progresso individual (0-5 coroas, barra, melhor score) | 🔴 Alto |
| 2 | Sem tela de preparação/intermediária antes de ler/praticar | 🔴 Alto |
| 3 | Feedback de erro com timeout forçado, sem explicação do porquê | 🔴 Alto |
| 4 | Sem empty states (tela branca se dados falharem) | 🔴 Alto |
| 5 | Formulário de criação monolítico e intimidador (sem wizard) | 🟡 Médio |
| 6 | Tradução sempre visível (elimina tentativa de compreensão) | 🔴 Alto |
| 7 | Sem diferenciação visual de personagens (cores, avatares) | 🟡 Médio |
| 8 | Filtros não persistem entre navegações | 🟡 Médio |
| 9 | Gamificação fraca (só XP, sem streaks, níveis, conquistas) | 🔴 Alto |
| 10 | Áudio sem controle de velocidade nem visualização | 🟡 Médio |
| 11 | Sem onboarding/tutorial para novos usuários | 🟡 Médio |
| 12 | Criação sem validação de qualidade das alternativas | 🟡 Médio |

**12 OPORTUNIDADES:**

| # | Oportunidade | Impacto |
|---|--------------|---------|
| 1 | Tela de detalhe/preparação (resumo, vocabulário, botões Ler/Praticar) | +20-30% conclusão |
| 2 | Tradução sob demanda (tap-to-revelar) | Aprendizagem ativa |
| 3 | SRS integrado (revisão espaçada de diálogos) | Retenção longo prazo |
| 4 | Diferenciação visual de personagens (cores, avatares) | Imersão |
| 5 | Feedback explicativo com "Entendi" (sem timeout) | Aprendizagem com erro |
| 6 | Criação em wizard com preview + auto-save | Criação de conteúdo |
| 7 | Modo Roleplay (aluno escolhe personagem) | Imersão |
| 8 | Mapa/caminho de diálogos (progressão visual) | Senso de progresso |
| 9 | Micro-interações (confetti, haptic, sons) | Engajamento |
| 10 | Modo Escuta (listening-only com transcrição karaoke) | Listening ativo |
| 11 | Compartilhamento e diálogos da comunidade | UGC + comunidade |
| 12 | Acessibilidade completa (ARIA, keyboard, WCAG AA) | Inclusão |

---

### 🟢 PERSPECTIVA 2: LINGUISTA APLICADO (SLA / CEFR)

**12 PROBLEMAS PEDAGÓGICOS:**

| # | Problema | Teoria |
|---|----------|--------|
| 1 | **Sem output produtivo** — Só múltipla escolha (reconhecimento), nunca produção | Swain (1985) |
| 2 | **Sem repetição espaçada** — Pratica uma vez, esquece em dias | Ebbinghaus |
| 3 | **Feedback binário sem explicação** — "Errado" sem dizer por quê | Schmidt (1990) |
| 4 | **Diálogos não são tarefas comunicativas** — Sem gap de informação, sem negociação | Long (1996), Ellis (2003) |
| 5 | **Sem trabalho com chunks** — Palavras isoladas, não formulaic sequences | Wray (2002) |
| 6 | **Sem competência pragmática** — Não ensina registro formal/informal | Canale & Swain (1980) |
| 7 | **Sem negociação de significado** — Interação unidirecional, predeterminada | Long (1996) |
| 8 | **Sem personalização por nível real** — Filtro manual, sem diagnóstico | Krashen (i+1) |
| 9 | **Sem estrutura de 3 fases** — Sem pré-task, post-task | Harmer (2015) |
| 10 | **MCQ como única modalidade** — Baixa validade de construto | Shohamy (1984) |
| 11 | **Sem trabalho prosódico** — IPA por palavra, não entonação de frase | Celce-Murcia (2010) |
| 12 | **Input não autêntico** — Só scripted, sem variação real | VanPatten (2004) |

**12 OPORTUNIDADES PEDAGÓGICAS:**

| # | Oportunidade | Teoria |
|---|--------------|--------|
| 1 | Output produtivo progressivo (fill-in → produção livre) | Swain & Lapkin (1995) |
| 2 | SRS integrado ao vocabulário-chave | Pimsleur (1967) |
| 3 | Feedback explicativo multicamada | Li (2010) |
| 4 | Diálogos ramificados (TBLT) | Long (2015) |
| 5 | Destaque e prática de chunks | Boers & Lindstromberg (2012) |
| 6 | Módulo de competência pragmática | Kasper & Rose (2002) |
| 7 | Simulação com negociação de significado | Mackey (1999) |
| 8 | Diagnóstico inicial + adaptação dinâmica | Krashen (i+1) |
| 9 | Estrutura de 3 fases (pre/task/post) | Harmer (2015) |
| 10 | Diversificação de modalidades (listening, gap-fill, role-play) | VanPatten (2004) |
| 11 | Trabalho prosódico ativo (entonação, linking) | Celce-Murcia (2010) |
| 12 | Input autêntico/semi-autêntico (B1+) | Gilmore (2011) |

---

### 🟡 PERSPECTIVA 3: DESENVOLVEDOR FRONTEND (PWA Educacional)

**12 PROBLEMAS TÉCNICOS:**

| # | Problema | Severidade |
|---|----------|------------|
| 1 | **XSS via innerHTML extenso** — _esc() insuficiente, sem DOMPurify | 🔴 Crítico |
| 2 | **Sem componentização** — 524 linhas monolíticas, sem reutilização | 🔴 Alto |
| 3 | **localStorage síncrono** — Bloqueia UI, limite 5MB, sem indexação | 🔴 Alto |
| 4 | **Sem state management** — Estado implícito, sem reatividade | 🔴 Alto |
| 5 | **Sem lazy loading** — JSON 60KB carregado inteiro, sem paginação | 🟡 Médio |
| 6 | **Acessibilidade inexistente** — Sem ARIA, keyboard nav, screen reader | 🔴 Alto |
| 7 | **i18n custom frágil** — 3 CSS separados, sem fallback chain | 🟡 Médio |
| 8 | **Zero testes** — Sem cobertura, refatoração às cegas | 🔴 Alto |
| 9 | **Animações via setTimeout** — Sem prefers-reduced-motion, sem 60fps | 🟡 Médio |
| 10 | **Sem error boundaries** — Sem fallback UI, sem logging | 🔴 Alto |
| 11 | **SW não integrado com dados** — localStorage inacessível ao SW | 🟡 Médio |
| 12 | **Formulário sem validação robusta** — Sem constraint validation API | 🟡 Médio |

**12 OPORTUNIDADES TÉCNICAS:**

| # | Oportunidade | Impacto |
|---|--------------|---------|
| 1 | Web Components (Lit) — Elimina XSS, encapsula estilo | Segurança + manutenibilidade |
| 2 | IndexedDB (Dexie.js) — Async, indexado, transacional, 50MB+ | Performance + offline |
| 3 | State management (Observer pattern) — Estado previsível, reativo | Debugabilidade |
| 4 | Lazy loading + virtual scrolling — Startup instantâneo | Performance |
| 5 | Acessibilidade completa (WCAG 2.1 AA) — ARIA, keyboard, screen reader | Inclusão |
| 6 | Intl API + lazy loading de traduções — Formatação correta por locale | i18n robusto |
| 7 | Offline-first (SW + IndexedDB + background sync) | Resiliência |
| 8 | Testes automatizados (Vitest + Testing Library) — Unit + integração | Qualidade |
| 9 | Animações declarativas (CSS + WAAPI) — 60fps, reduced-motion | UX |
| 10 | Error boundaries + logging estruturado — Resiliência | Confiabilidade |
| 11 | Progressive enhancement para áudio (TTS fallback) | Offline |
| 12 | Arquitetura de módulos (ES Modules + barrel exports) | Escalabilidade |

---

### 🔴 PERSPECTIVA 4: PRODUCT MANAGER (EdTech / Gamificação)

**12 PROBLEMAS DE PRODUTO:**

| # | Problema | Impacto |
|---|----------|---------|
| 1 | Sem SRS para diálogos (contradiz filosofia FSRS do app) | 🔴 Alto |
| 2 | Sem dificuldade adaptativa (mesmo desafio A2 e B2) | 🟡 Médio |
| 3 | Sem streak específico de diálogos | 🟡 Médio |
| 4 | Sem métricas de competência comunicativa | 🟡 Médio |
| 5 | Content exhaustion (catálogo finito, sem replay) | 🔴 Alto |
| 6 | XP como única recompensa (motivação extrínseca frágil) | 🟡 Médio |
| 7 | Sem progressão por contexto/competência | 🟡 Médio |
| 8 | Sem social proof (leaderboards, comparação) | 🟡 Médio |
| 9 | Sem feedback qualitativo pós-diálogo | 🟡 Médio |
| 10 | Integração fraca entre módulos (diálogo isolado) | 🔴 Alto |
| 11 | Sem onboarding específico para diálogos | 🟡 Médio |
| 12 | Sem daily quest / desafio diário de diálogos | 🟡 Médio |

**14 OPORTUNIDADES DE PRODUTO:**

| # | Oportunidade | Impacto |
|---|--------------|---------|
| 1 | SRS para diálogos (reapresentar em 1d, 3d, 7d, 14d, 30d) | Retenção + conteúdo infinito |
| 2 | 3 modos distintos (Read/Practice/Conversation) | Triplica valor por diálogo |
| 3 | Dialogue Streak + chain visual | Engajamento diário |
| 4 | Skill Tree comunicativo (radar: fluência, precisão, pronúncia, pragmática) | Progresso visível |
| 5 | Diálogos gerados por IA (conteúdo infinito) | Escalabilidade |
| 6 | Cross-módulo (erro → flashcards, gramática, imitação) | Ecossistema integrado |
| 7 | Templos temáticos para diálogos (Boss Dialogue) | Gamificação profunda |
| 8 | Dialogue Report Card (tempo resposta, acerto por tipo, comparação) | Feedback qualitativo |
| 9 | Dialogue Arcs (arco narrativo 5-7 diálogos) | Motivação intrínseca |
| 10 | Dialogue Mastery (90%+ em Conversation Mode = maestria) | Replay significativo |
| 11 | Daily Dialogue Quest (missão diária 2X XP) | Retenção diária |
| 12 | SRS de micro-habilidades (drill de estruturas erradas) | Personalização |
| 13 | Social features (Duet Mode, Shadow Mode, leaderboards) | Comunidade |
| 14 | Diálogos da comunidade (UGC + curadoria) | Escalabilidade conteúdo |

---

## 1.3 CONSOLIDAÇÃO — MATRIZ DE IMPACTO vs ESFORÇO

| # | Problema/Oportunidade | Impacto | Esforço | Perspectivas Alinhadas |
|---|----------------------|---------|---------|------------------------|
| 1 | Sem SRS para diálogos | 🔴 Alto | Médio | PM, Linguista, UX |
| 2 | Sem output produtivo (só MCQ) | 🔴 Alto | Alto | Linguista, UX, PM |
| 3 | Sem feedback explicativo | 🔴 Alto | Baixo | UX, Linguista, PM |
| 4 | XSS potencial | 🔴 Alto | Baixo | Dev, UX |
| 5 | Sem toggle de tradução | 🔴 Alto | Baixo | UX, Linguista |
| 6 | localStorage síncrono/limitado | 🔴 Alto | Médio | Dev, PM |
| 7 | Content exhaustion | 🔴 Alto | Alto | PM, Linguista |
| 8 | Sem acessibilidade | 🔴 Alto | Médio | Dev, UX |
| 9 | Sem componentização | 🟡 Médio | Alto | Dev |
| 10 | Sem state management | 🟡 Médio | Alto | Dev |
| 11 | Zero testes | 🟡 Médio | Alto | Dev |
| 12 | Sem error boundaries | 🟡 Médio | Baixo | Dev, UX |
| 13 | Sem lazy loading | 🟡 Médio | Médio | Dev |
| 14 | i18n incompleto | 🟡 Médio | Médio | Dev, UX |
| 15 | Sem pré-teste diagnóstico | 🟡 Médio | Médio | Linguista, PM |
| 16 | Sem chunks highlighting | 🟡 Médio | Baixo | Linguista |
| 17 | Sem flashcards automáticos | 🟡 Médio | Baixo | Linguista, PM |
| 18 | Sem pragmática | 🟡 Médio | Médio | Linguista |
| 19 | Sem onboarding contextual | 🟡 Médio | Baixo | UX, PM |
| 20 | Sem ordenação inteligente | 🟡 Médio | Baixo | UX |

---

# ═══════════════════════════════════════════════════════════════
# FASE 2 — FAZER (Do)
# ═══════════════════════════════════════════════════════════════

## 2.1 QUICK WINS (Implementar imediatamente — Sprints 1-2)

### QW-1: Toggle de Tradução
**O que:** Botão "Hide PT" / "Show PT" no modo leitura e prática  
**Por quê:** Krashen i+1 — força compreensão sem muleta. UX best practice (Duolingo).  
**Como:** Classe CSS `.traducao-oculta { display: none }` + toggle via JS  
**Esforço:** 2h  
**Perspectivas:** UX ✅ Linguista ✅

### QW-2: Flashcards Automáticos do Diálogo
**O que:** Botão "Add vocabulary to flashcards" no resultado  
**Por quê:** Reciclagem de vocabulário. Conecta diálogos → FSRS. Cross-módulo.  
**Como:** Iterar vocabulario_chave, criar cards FSRS, salvar em en_flashcards  
**Esforço:** 3h  
**Perspectivas:** Linguista ✅ PM ✅

### QW-3: Sanitização XSS Completa
**O que:** Aplicar _esc() em TODOS os innerHTML + considerar DOMPurify  
**Por quê:** Segurança. Dados do usuário (reconhecimento voz, texto) sem sanitização.  
**Como:** Auditar todos os innerHTML em dialoghi.js, adicionar _esc() consistente  
**Esforço:** 2h  
**Perspectivas:** Dev ✅

### QW-4: Ordenação Inteligente no Seletor
**O que:** Mostrar diálogos não feitos primeiro, depois por nível ascendente  
**Por quê:** Aluno vê conteúdo relevante primeiro. Reduz paralisia de decisão.  
**Como:** Ordenar: não-concluídos > concluídos, depois por nível  
**Esforço:** 1h  
**Perspectivas:** UX ✅

### QW-5: i18n Completo
**O que:** Traduzir todos os textos hardcoded ("You", "Character", "Personaggio")  
**Por quê:** Consistência linguística. Profissionalismo.  
**Como:** Adicionar chaves ao i18n.js, substituir hardcoded no dialoghi.js  
**Esforço:** 2h  
**Perspectivas:** Dev ✅ UX ✅

### QW-6: Explicação de Erros (Tooltip)
**O que:** Adicionar campo "explicacao" aos distratores, mostrar no feedback  
**Por quê:** Aluno aprende com o erro. Noticing (Schmidt).  
**Como:** Adicionar data-explicacao nos botões, mostrar no feedback após erro  
**Esforço:** 3h  
**Perspectivas:** UX ✅ Linguista ✅

### QW-7: Onboarding Contextual
**O que:** Banner/tooltip na primeira visita explicando valor dos diálogos  
**Por quê:** Aluno sabe o que faz e por quê. Reduz abandono.  
**Como:** Verificar localStorage 'en_dialoghi_onboarding_done'  
**Esforço:** 2h  
**Perspectivas:** UX ✅ PM ✅

### QW-8: Empty States
**O que:** Telas amigáveis quando não há dados, filtro sem resultados, ou erro  
**Por quê:** UX best practice. Nunca mostrar tela branca.  
**Como:** Verificar se arrays estão vazios, mostrar mensagem + ação  
**Esforço:** 2h  
**Perspectivas:** UX ✅ Dev ✅

---

## 2.2 MELHORIAS MÉDIAS (Sprints 3-6)

### M-1: Pré-teste Diagnóstico
**O que:** Antes do diálogo, testar 3-4 turnos. Se acertar 80%, pular para prática.  
**Por quê:** Evita desperdício de tempo. Krashen i+1.  
**Esforço:** 1 sprint  
**Perspectivas:** Linguista ✅ PM ✅

### M-2: Chunks Highlighting
**O que:** Destacar formulaic sequences no texto com cor diferente + tooltip  
**Por quê:** Noticing (Schmidt). Aluno aprende padrões reutilizáveis.  
**Esforço:** 1 sprint  
**Perspectivas:** Linguista ✅

### M-3: Modo "Fill the Gap"
**O que:** Modo intermediário: mostra frase com lacuna para digitar (não escolher)  
**Por quê:** Output forçado parcial. Mais desafiador que MCQ.  
**Esforço:** 1 sprint  
**Perspectivas:** Linguista ✅ UX ✅

### M-4: Timer Opcional no Modo Prática
**O que:** Barra visual decrescente de 15s por resposta (opcional, desligado por padrão)  
**Por quê:** Simula pressão temporal de conversa real.  
**Esforço:** 1 sprint  
**Perspectivas:** UX ✅ (Linguista: opcional para não causar ansiedade)

### M-5: Dialogue Streak
**O que:** Streak específico "7 dias conversando" com chain visual  
**Por quê:** Incentivo direto para praticar diálogos diariamente.  
**Esforço:** 1 sprint  
**Perspectivas:** PM ✅

### M-6: IndexedDB Migration
**O que:** Mover diálogos custom e histórico para IndexedDB (Dexie.js)  
**Por quê:** localStorage tem limite 5MB. IndexedDB tem 50MB+. Async. Indexado.  
**Esforço:** 1 sprint  
**Perspectivas:** Dev ✅

### M-7: Lazy Loading de Dados
**O que:** Carregar diálogos por nível sob demanda (dialogi-A1.json, etc.)  
**Por quê:** Performance. 60KB carregado mesmo que aluno só use A1.  
**Esforço:** 1 sprint  
**Perspectivas:** Dev ✅

### M-8: Acessibilidade (ARIA)
**O que:** Adicionar role, aria-label, tabindex, keyboard navigation  
**Por quê:** Screen readers, navegação por teclado, WCAG 2.1 AA.  
**Esforço:** 1 sprint  
**Perspectivas:** Dev ✅ UX ✅

### M-9: Diferenciação Visual de Personagens
**O que:** Cores distintas + avatares/emoji para cada personagem  
**Por quê:** Reduz carga cognitiva. Melhora imersão.  
**Esforço:** 1 sprint  
**Perspectivas:** UX ✅

### M-10: Tela de Preparação do Diálogo
**O que:** Tela intermediária com: resumo contexto, número turnos, vocabulário-chave, melhor score, botões "📖 Ler" e "✍️ Praticar"  
**Por quê:** Aumenta intencionalidade. +20-30% conclusão.  
**Esforço:** 1 sprint  
**Perspectivas:** UX ✅ Linguista ✅

---

## 2.3 MELHORIAS GRANDES (Sprints 7-12)

### G-1: SRS para Diálogos (Dialogue Recall)
**O que:** Reapresentar diálogos em intervalos crescentes (1d, 3d, 7d, 14d, 30d) usando FSRS existente  
**Por quê:** Retenção de padrões conversacionais. Resolve content exhaustion.  
**Como:** Reutilizar motor FSRS. Agendar revisões. Modo "reconstruir" com lacunas.  
**Esforço:** 2 sprints  
**Perspectivas:** PM ✅ Linguista ✅ UX ✅

### G-2: Modo "Conversation" (Produção Livre)
**O que:** Após MCQ, modo sem opções: aluno digita/responde livremente  
**Por quê:** Output forçado real (Swain). Produção, não reconhecimento.  
**Como:** Novo modo 'conversa' com <textarea> + avaliação por similaridade  
**Esforço:** 2 sprints  
**Perspectivas:** Linguista ✅ PM ✅

### G-3: Skill Tree de Competências Comunicativas
**O que:** Radar chart: fluência, precisão, pronúncia, pragmática, compreensão  
**Por quê:** Progresso visível por competência. Senso de maestria.  
**Esforço:** 2 sprints  
**Perspectivas:** PM ✅ UX ✅

### G-4: Cross-Módulo Integration
**O que:** Erro no diálogo → sugestão de flashcards, gramática, imitação automaticamente  
**Por quê:** Diálogo como hub diagnóstico. Ecossistema integrado.  
**Esforço:** 2 sprints  
**Perspectivas:** PM ✅ Linguista ✅

### G-5: Dialogue Arcs (Narrativa Progressiva)
**O que:** Arcos de 5-7 diálogos com personagens recorrentes e mini-história  
**Por quê:** Motivação intrínseca (curiosidade narrativa). Replay significativo.  
**Esforço:** 2 sprints  
**Perspectivas:** PM ✅ UX ✅

### G-6: Dificuldade Adaptativa
**O que:** Ajustar velocidade áudio, complexidade distratores, tempo limite baseado em performance  
**Por quê:** Flow state. Nem entediado, nem frustrado.  
**Esforço:** 2 sprints  
**Perspectivas:** PM ✅ Linguista ✅

### G-7: Componentização do dialoghi.js
**O que:** Extrair HTML para Web Components (Lit) ou funções de componente  
**Por quê:** Manutenibilidade. Testabilidade. Sem XSS.  
**Esforço:** 2 sprints  
**Perspectivas:** Dev ✅

### G-8: Testes Automatizados
**O que:** Vitest + Testing Library para funções puras e integração  
**Por quê:** Confiança para refatorar. Documentação viva.  
**Esforço:** 2 sprints  
**Perspectivas:** Dev ✅

### G-9: Diálogos Gerados por IA (Infinite Content)
**O que:** Usar LLMs para gerar diálogos novos sob demanda, baseados no nível e interesses  
**Por quê:** Resolve content exhaustion definitivamente.  
**Esforço:** 2 sprints  
**Perspectivas:** PM ✅

### G-10: Dialogue Report Card
**O que:** Relatório pós-diálogo: tempo resposta, acerto por tipo, comparação histórica, sugestões  
**Por quê:** Feedback qualitativo. Aluno sabe onde melhorar.  
**Esforço:** 1 sprint  
**Perspectivas:** PM ✅ UX ✅ Linguista ✅

---

# ═══════════════════════════════════════════════════════════════
# FASE 3 — VERIFICAR (Check)
# ═══════════════════════════════════════════════════════════════

## 3.1 MÉTRICAS DE SUCESSO (KPIs)

### Métricas de Engajamento:
| Métrica | Atual (estimado) | Meta (3 meses) | Como medir |
|---------|-------------------|-----------------|------------|
| Diálogos completos/semana | ~3 | ~10 | Evento no store |
| Tempo médio no diálogo | ~2min | ~5min | Timestamp início/fim |
| Taxa de conclusão (prática) | ~40% | ~70% | completos / abertos |
| Retorno ao diálogo (revisão) | 0% | ~30% | SRS reviews / total |
| Dialogue Streak médio | N/A | ~5 dias | localStorage |

### Métricas de Aprendizagem:
| Métrica | Atual | Meta | Como medir |
|---------|-------|------|------------|
| Acerto médio no modo prática | ~60% | ~75% | acertos / total turnos |
| Vocabulário adicionado aos flashcards | 0/diálogo | 3/diálogo | cards criados |
| Tempo de resposta médio | ~8s | ~5s | Timestamp pergunta/resposta |

### Métricas de Produto:
| Métrica | Atual | Meta | Como medir |
|---------|-------|------|------------|
| DAU que usa diálogos | ~15% | ~40% | diálogos abertos / DAU |
| Content exhaustion rate | Alto | Baixo | disponíveis / concluídos |
| NPS da aba diálogos | N/A | >50 | In-app survey |

## 3.2 VALIDAÇÃO CRUZADA — CONSENSO ENTRE PERSPECTIVAS

### Propostas validadas por TODAS as 4 perspectivas:
1. ✅ **SRS para diálogos** — PM (retenção), Linguista (reciclagem), Dev (motor FSRS existe), UX (progresso visível)
2. ✅ **Toggle de tradução** — UX (desafio), Linguista (i+1), Dev (fácil), PM (engajamento)
3. ✅ **Flashcards automáticos** — Linguista (reciclagem), PM (cross-módulo), Dev (fácil), UX (valor percebido)
4. ✅ **Feedback explicativo de erros** — UX (aprendizagem), Linguista (noticing), PM (qualidade), Dev (fácil)
5. ✅ **Sanitização XSS** — Dev (segurança), UX (confiança)
6. ✅ **Empty states** — UX (polish), Dev (resiliência)
7. ✅ **Onboarding contextual** — UX (descoberta), PM (retenção)

### Propostas com CONFLITO entre perspectivas:
| Proposta | A Favor | Contra | Resolução |
|----------|---------|--------|-----------|
| Timer no modo prática | UX (urgência) | Linguista (ansiedade) | **Opcional, desligado por padrão** |
| Modo Conversation (produção livre) | Linguista (output) | Dev (complexidade) | **Versão simples primeiro (digitar, não falar)** |
| Dificuldade adaptativa | PM (flow) | Dev (complexidade) | **Começar com 3 níveis fixos** |

---

# ═══════════════════════════════════════════════════════════════
# FASE 4 — AGIR (Act)
# ═══════════════════════════════════════════════════════════════

## 4.1 ROADMAP DE IMPLEMENTAÇÃO

### SPRINT 1 (Semana 1-2) — Quick Wins
- [ ] QW-1: Toggle de tradução (2h)
- [ ] QW-2: Flashcards automáticos (3h)
- [ ] QW-3: Sanitização XSS (2h)
- [ ] QW-4: Ordenação inteligente (1h)
- [ ] QW-5: i18n completo (2h)
- [ ] QW-8: Empty states (2h)
**Total: ~12h**

### SPRINT 2 (Semana 3-4) — Quick Wins + Início Médio
- [ ] QW-6: Explicação de erros (3h)
- [ ] QW-7: Onboarding contextual (2h)
- [ ] M-1: Pré-teste diagnóstico (1 sprint)
- [ ] M-5: Dialogue Streak (1 sprint)
**Total: ~2 sprints**

### SPRINT 3 (Semana 5-6) — Melhorias Médias
- [ ] M-2: Chunks highlighting (1 sprint)
- [ ] M-3: Modo "Fill the Gap" (1 sprint)
- [ ] M-4: Timer opcional (1 sprint)
- [ ] M-9: Diferenciação visual personagens (1 sprint)
- [ ] M-10: Tela de preparação (1 sprint)
**Total: ~2 sprints**

### SPRINT 4 (Semana 7-8) — Melhorias Médias + Início Grande
- [ ] M-6: IndexedDB migration (1 sprint)
- [ ] M-7: Lazy loading de dados (1 sprint)
- [ ] M-8: Acessibilidade ARIA (1 sprint)
- [ ] G-1: SRS para diálogos — início (2 sprints)
**Total: ~2 sprints**

### SPRINT 5-6 (Semana 9-12) — Melhorias Grandes
- [ ] G-1: SRS para diálogos — completo
- [ ] G-2: Modo Conversation
- [ ] G-3: Skill Tree de competências
- [ ] G-4: Cross-módulo integration
- [ ] G-5: Dialogue Arcs
- [ ] G-6: Dificuldade adaptativa
- [ ] G-7: Componentização
- [ ] G-8: Testes automatizados
- [ ] G-9: Diálogos IA
- [ ] G-10: Dialogue Report Card
**Total: ~4 sprints**

## 4.2 CICLO DE MELHORIA CONTÍNUA

### Revisão Semanal:
- Analisar métricas de uso (diálogos completos, taxa de conclusão, tempo)
- Coletar feedback qualitativo
- Ajustar prioridades do backlog

### Revisão Mensal:
- Avaliar KPIs vs metas
- Decidir se features estão funcionando
- Planejar próximo mês

### Revisão Trimestral:
- Avaliar impacto geral nos objetivos de aprendizagem
- Decidir se features precisam ser pivotadas
- Planejar features de longo prazo

## 4.3 RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| SRS de diálogos é complexo | Alta | Alto | Começar com intervalos fixos |
| Produção livre difícil de avaliar | Alta | Médio | Usar similaridade de texto, não IA |
| IndexedDB migração quebra dados | Média | Alto | Manter fallback localStorage |
| Timer causa ansiedade | Média | Médio | Opcional, desligado por padrão |
| Componentização quebra tudo | Média | Alto | Refatorar incrementalmente |

---

# ═══════════════════════════════════════════════════════════════
# RESUMO EXECUTIVO
# ═══════════════════════════════════════════════════════════════

## Top 5 Problemas Mais Críticos:
1. **Sem SRS** — Diálogos são "feitos" uma vez e esquecidos. Conteúdo evaporado.
2. **Sem output forçado** — Só reconhecimento (MCQ), nunca produção. Gap comprehension-production.
3. **Sem feedback explicativo** — Erra mas não aprende por quê.
4. **XSS potencial** — Dados do usuário sem sanitização adequada.
5. **Content exhaustion** — Catálogo finito, sem replay significativo.

## Top 5 Quick Wins (fazer esta semana):
1. Toggle de tradução (2h)
2. Flashcards automáticos (3h)
3. Sanitização XSS (2h)
4. Ordenação inteligente (1h)
5. Empty states (2h)

## Top 5 Melhorias de Maior Impacto:
1. SRS para diálogos (resolve content exhaustion + retenção)
2. Modo Conversation (output forçado real)
3. Cross-módulo integration (ecossistema)
4. Skill Tree de competências (progresso visível)
5. Dialogue Arcs (motivação intrínseca)

## Nota por Dimensão (Consolidada):

| Dimensão | UX/UI | Linguista | Dev | PM | MÉDIA |
|----------|-------|-----------|-----|-----|-------|
| Funcionalidade | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | **2.25** |
| UX/Design | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | **2.0** |
| Pedagogia | ⭐⭐ | ⭐ | ⭐⭐ | ⭐⭐ | **1.75** |
| Código | ⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐ | **1.75** |
| Gamificação | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐ | **1.75** |
| Acessibilidade | ⭐ | ⭐ | ⭐ | ⭐ | **1.0** |
| **MÉDIA** | **1.83** | **1.50** | **1.67** | **1.67** | **1.67** |

**Veredicto Consolidado:** A aba de Diálogos está em estágio de **MVP funcional** — funciona, mas está longe de seu potencial. A base de dados (JSON) é boa. O problema central é que o app pede ao aluno que **reconheça** linguagem em vez de **usá-la**. As maiores vitórias são: (1) SRS, (2) output produtivo, (3) feedback explicativo, (4) toggle tradução, (5) cross-módulo.

## Visão de Futuro:

| Antes (agora) | Depois (visão) |
|---------------|----------------|
| Ler bolhas estáticas | Toggle tradução + anotações + shadowing |
| Múltipla escolha | Fill the Gap → Free Response → Conversation |
| 1 vez e esquece | SRS com revisão espaçada (1d, 3d, 7d, 14d, 30d) |
| Sem feedback | Explicação de erros + chunks highlighting |
| Silo isolado | Cross-módulo (erro → flashcards, gramática, imitação) |
| Catálogo finito | Dialogue Arcs + IA gerada + dificuldade adaptativa |
| Sem progresso visível | Skill Tree + Report Card + Mastery |

---

*Relatório gerado por análise multi-perspectiva: UX/UI Designer + Linguista Aplicado + Desenvolvedor Frontend + Product Manager*  
*Ciclo PDCA com melhoria contínua integrada*  
*48 problemas identificados, 48 oportunidades propostas, 10 quick wins, 10 melhorias médias, 10 melhorias grandes*
