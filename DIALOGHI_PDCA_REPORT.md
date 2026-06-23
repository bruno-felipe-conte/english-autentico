# 📋 RELATÓRIO PDCA — ABA DE DIÁLOGOS
## English Learning App Pro — Análise Completa com Melhoria Contínua

**Data:** Junho 2026  
**Ciclo:** PDCA (Plan-Do-Check-Act)  
**Escopo:** Aba de Diálogos — releitura completa, bugs, UX, pedagogia, código e produto  
**Metodologia:** Análise de código-fonte (524 linhas dialoghi.js, 1535 linhas dialogi.json, CSS) + Brainstorm multi-perspectiva

---

# ═══════════════════════════════════════════════════
# FASE 1 — PLAN (Planejar)
# ═══════════════════════════════════════════════════

## 1.1 ESTADO ATUAL — MAPEAMENTO COMPLETO

### O que a aba de Diálogos faz HOJE:

**Seletor (renderizarSeletor):**
- Grid de cards com ícone, título, nível, badge custom, checkmark de concluído
- Filtros: busca por texto, nível (A1-C1), origem (todos/custom/nativo)
- Botões: Adicionar (formulário manual) e IA Import
- Contadores por nível e por origem

**Modo Leitura (renderizarDialogo - modo 'leitura'):**
- Visualização em formato chat com bolhas (personagem esquerda, usuário direita)
- Cada turno mostra: nome do personagem, frase em inglês, botão áudio, IPA, tradução
- Botão "Praticar" no final para mudar para modo prática

**Modo Prática (renderizarDialogo - modo 'pratica'):**
- Revelação progressiva: mostra turno 0, depois 0-1, depois 0-2, etc.
- Turnos do personagem: mostram frase + tradução + botão "Continuar"
- Turnos do usuário: mostram 4 alternativas (múltipla escolha)
- Feedback: botão correto (verde), botão errado (verde na correta + vermelho na errada)
- Avança automaticamente após 1.2s (correto) ou 2.2s (errado)
- Resultado: emoji (🌟/👍/🔄), acertos/total, XP (se ≥60%), vocabulário-chave, botões voltar/repetir

**Criação/Edição (abrirFormularioCriar):**
- Formulário inline com: título, nível, ícone, contexto
- Turnos dinâmicos: adicionar fala do personagem ou resposta do usuário
- Validação: título obrigatório, mínimo 2 turnos
- Salvamento em localStorage (en_dialoghi_custom)

**Dados (dialogi.json):**
- ~1535 linhas, diálogos A1-B1
- Estrutura: id, titulo, icone, nivel, contexto, turni[], vocabulario_chave[], xp_recompensa
- Turnos: personaggio, frase, traducao, audio_ipa, alternativas[], resposta_correta

### Fluxo do aluno:
```
Seletor → Clica card → Modo Leitura (ler/ouvir) → Clica "Praticar" → 
Modo Prática (escolher respostas) → Resultado → Volta ao seletor
```

---

## 1.2 ANÁLISE MULTI-PERSPECTIVA — PROBLEMAS IDENTIFICADOS

### 🔵 PERSPECTIVA 1: UX/UI DESIGNER (Apps de Idiomas)

**PROBLEMAS:**

1. **Sem estados intermediários visuais** — O card do seletor mostra ✅ mas não mostra progresso parcial (ex: "3/5 turnos corretos"). O aluno não sabe se já praticou ou só leu.

2. **Modo Leitura é passivo demais** — Bolhas de chat estáticas sem interatividade. O aluno lê, ouve, e... nada. Sem anotar, sem marcar palavras difíceis, sem repetir trechos.

3. **Feedback de erro sem explicação** — Quando erra, mostra a correta em verde mas não explica POR QUÊ. "I want coffee. Give me one." está errado porque é rude? Porque não usa "can I have"? O aluno não aprende com o erro.

4. **Sem toggle de tradução** — A tradução está sempre visível no modo leitura. O aluno nunca é desafiado a entender sem tradução. No modo prática, a tradução do turno do personagem aparece, o que "entrega" a resposta.

5. **Criação de diálogos é complexa demais** — Formulário com muitos campos, turnos dinâmicos com HTML inline, sem preview. Para um aluno, criar um diálogo é uma tarefa de desenvolvedor, não de aprendiz.

6. **Sem onboarding contextual** — O aluno não sabe a diferença entre "ler" e "praticar". Não sabe que pode ganhar XP. Não sabe que diálogos ajudam a falar.

7. **Grid de cards sem ordenação inteligente** — Mostra em ordem do JSON. Não prioriza diálogos não feitos, nem os que precisam de revisão, nem os do nível atual do aluno.

8. **Sem feedback de progresso por competência** — O aluno não sabe se é bom em "pedir direções" vs "fazer compras". Não há radar de habilidades comunicativas.

9. **Modo prática sem timer** — Não há senso de urgência. O aluno pode levar 30 segundos para escolher. Sem pressão temporal, não simula uma conversa real.

10. **Resultado final é superficial** — Mostra acertos/total e XP. Não mostra quais turnos errou, não mostra evolução histórica, não dá próximo passo.

**OPORTUNIDADES:**

1. **Toggle de tradução** — Botão "Hide PT" para forçar compreensão sem tradução
2. **Modo "Listen Only"** — Só áudio, sem texto, para treinar listening
3. **Anotações por turno** — Aluno pode marcar palavras, adicionar notas pessoais
4. **Repetição de trechos** — Botão "Repetir este turno" no modo leitura
5. **Preview do diálogo no seletor** — Hover mostra primeiras linhas
6. **Ordenação inteligente** — "Recomendado para você" primeiro
7. **Timer no modo prática** — 15s por resposta, barra visual decrescente
8. **Explicação de erros** — Tooltip "Por que esta resposta está errada?"
9. **Modo "Shadowing"** — Aluno ouve e repete em voz alta, com gravação
10. **Progresso visual por competência** — Radar chart: fluência, precisão, pronúncia, pragmática

---

### 🟢 PERSPECTIVA 2: LINGUISTA APLICADO (SLA / CEFR)

**PROBLEMAS:**

1. **Input sem compreensão forçada (Krashen i+1)** — O modo leitura mostra tudo (inglês + tradução + IPA). O aluno lê a tradução primeiro e "entende" sem processar o inglês. Input não é "compreensível com desafio", é "input com muleta".

2. **Sem output forçado (Swain's Output Hypothesis)** — O modo prática é múltipla escolha (reconhecimento). O aluno nunca PRODUZ linguagem. Reconhecer ≠ produzir. É como confundir "entender música" com "tocar instrumento".

3. **Sem negotiation of meaning (Long's Interaction Hypothesis)** — Em conversas reais, quando não entendemos, pedimos repetição, paráfrase, confirmação. O diálogo não tem mecanismos de "Não entendi, pode repetir?" ou "Pode falar mais devagar?".

4. **Sem noticing (Schmidt)** — O aluno não é direcionado a NOTAR estruturas gramaticais, chunks, ou padrões. Não há highlighting de chunks ("Can I have...", "Would you mind...", "I'd like to...").

5. **Sem trabalho com formulaic sequences** — Diálogos contêm chunks úteis ("Can I have a...", "That'll be...", "Have a great day!") mas nunca são isolados, praticados, ou reaproveitados. O aluno trata cada frase como unidade isolada, não como padrão reutilizável.

6. **Sem pragmática** — Não há diferença entre registro formal/informal. O aluno não aprende que "Hey! Give me coffee." ≠ "Can I have a coffee, please?" em termos de adequação social.

7. **Sem pré-teste** — O diálogo sempre começa do zero. O aluno que já sabe 80% do conteúdo percorre 80% de conteúdo conhecido. Desperdício de tempo e tédio.

8. **Sem pós-teste com produção** — Após "completar" o diálogo, o aluno nunca é testado em produção livre. Não há "agora responda sem opções" ou "agora grave sua versão".

9. **Sem reciclagem de vocabulário** — Palavras do vocabulario_chave são listadas no resultado mas nunca mais aparecem. Não há flashcards gerados a partir do diálogo, não há revisão espaçada das palavras do diálogo.

10. **Sem atenção a fonologia suprassegmental** — IPA é mostrado por palavra isolada, mas nunca se trabalha entonação de frases, linking, weak forms, rhythm. "Can I have a" em fala real é /kənɪvə/.

**OPORTUNIDADES:**

1. **Pré-teste diagnóstico** — Antes do diálogo, testa 3-4 turnos. Se acertar 80%, pula para modo prática direto.
2. **Chunks highlighting** — Destacar formulaic sequences no texto com cor diferente + explicação
3. **Modo "Fill the Gap"** — Modo intermediário: mostra frase com lacuna para digitar (não escolher)
4. **Modo "Free Response"** — Após múltipla escolha, modo sem opções: aluno digita/responde livremente
5. **Modo "Slow/Fast"** — Áudio em 0.75x e 1.25x para treinar compreensão em diferentes velocidades
6. **Flashcards automáticos** — Botão "Adicionar vocabulário deste diálogo aos flashcards"
7. **Explicação pragmática** — "Esta frase é formal. Em contexto informal, você diria: ..."
8. **Shadowing mode** — Ouve → repete → grava → compara
9. **Spaced repetition de diálogos** — Reapresentar diálogos em intervalos crescentes (FSRS)
10. **Role-play com variação** — Mesmo diálogo com personagens/contextos diferentes para praticar flexibilidade

---

### 🟡 PERSPECTIVA 3: DESENVOLVEDOR FRONTEND (PWA Educacional)

**PROBLEMAS:**

1. **innerHTML extenso (~200 linhas de HTML concatenado)** — Todo o HTML do seletor, formulário, modo leitura, modo prática é gerado via template literals em innerHTML. Impossível de manter, debugar, ou reutilizar. Sem syntax highlighting, sem autocomplete, sem linting.

2. **Sem componentização** — Cada "tela" (seletor, leitura, prática, resultado, formulário) é uma função que gera HTML inteiro. Não há componentes reutilizáveis (Bubble, Turno, Opcao, Card).

3. **XSS potencial** — _esc() é usado em alguns lugares mas não em todos. O texto do reconhecimento de voz (checarResposta) é inserido sem sanitização. O nome do personagem vai direto para innerHTML.

4. **Sem state management** — O estado está espalhado em propriedades do objeto Dialoghi (dialogoAtual, turnoAtual, modo, acertos). Não há reatividade — cada mudança de estado requer re-render completo da tela.

5. **localStorage sem limite** — Dialoghi custom cresce sem limite. Não há paginação, não há lazy loading, não há compressão. Com muitos diálogos custom, pode atingir o limite de 5MB.

6. **Sem error boundary** — Se qualquer função lança erro não capturado, a tela quebra sem feedback. O aluno vê tela branca.

7. **Sem lazy loading de dados** — dialogi.json (60KB) é carregado inteiro no init. Não há carregamento sob demanda por nível.

8. **Sem acessibilidade (ARIA)** — Nenhum atributo aria-label, role, ou keyboard navigation. Botões criados via innerHTML não têm tabindex. Screen readers não conseguem navegar.

9. **Sem testes** — Zero testes unitários ou de integração. Mudanças podem quebrar funcionalidades silenciosamente.

10. **i18n incompleto** — Muitos textos estão hardcoded em inglês ("You", "Character", "Personaggio"). O sistema de tradução não cobre todos os textos.

**OPORTUNIDADES:**

1. **Extrair templates HTML** — Mover HTML para <template> no index.html ou para funções de componente
2. **Implementar DialoghiState** — Objeto de estado centralizado com métodos de transição
3. **Sanitização consistente** — Usar DOMPurify ou sanitizar TODOS os innerHTML
4. **IndexedDB para dados grandes** — Mover dialogi.json para IndexedDB com lazy loading
5. **Error boundaries** — try/catch em cada render com fallback UI
6. **ARIA attributes** — role="dialog", aria-label, tabindex, keyboard nav
7. **Lazy loading por nível** — Carregar diálogos A1 só quando filtro A1 for selecionado
8. **Compressão localStorage** — Usar LZ-string para comprimir dados grandes
9. **Testes unitários** — Jest para funções puras (checarResposta, _esc, etc.)
10. **TypeScript** — Adicionar tipos para prevenir erros de runtime

---

### 🔴 PERSPECTIVA 4: PRODUCT MANAGER (EdTech / Gamificação)

**PROBLEMAS:**

1. **Sem repetição espaçada (SRS)** — O app usa FSRS para flashcards mas NÃO para diálogos. Aluno completa uma vez e nunca mais vê. Conhecimento evaporado em 1 semana (Ebbinghaus).

2. **Sem dificuldade adaptativa** — Mesmo desafio para A2 e B2. Tédio para avançados, frustração para iniciantes. Sem "flow state".

3. **Sem streak específico de diálogos** — Streak geral pode ser mantido só com flashcards. Sem incentivo direto para praticar conversação.

4. **Sem métricas de competência comunicativa** — Não mede fluência, pronúncia, tempo de resposta, naturalidade. Aluno não sabe se está melhorando como comunicador.

5. **Content exhaustion** — Catálogo finito. Aluno completa tudo em 1 semana e não tem motivo para virar. Vira "checklist", não "hábito".

6. **XP como única recompensa** — Motivação extrínseca frágil. Sem recompensas intrínsecas (progresso visível, maestria, autonomia).

7. **Sem progressão por contexto/competência** — Não há "sou bom em viagens, fraco em negócios". Sem senso de progresso direcionado.

8. **Sem social proof** — Sem leaderboards, sem comparação social, sem "X% dos alunos erram esta frase".

9. **Sem feedback qualitativo** — Após diálogo, só XP e nota. Não mostra "você hesitou 3s", "sua pronúncia de 'th' precisa melhorar".

10. **Integração fraca entre módulos** — Erro no diálogo não sugere flashcards, gramática, ou imitação. Módulos são silos.

**OPORTUNIDADES:**

1. **SRS para diálogos** — Reapresentar em 1d, 3d, 7d, 14d, 30d com FSRS existente
2. **3 modos distintos** — Read (XP baixo), Practice (XP médio), Conversation (XP alto, produção livre)
3. **Dialogue Streak** — "7 dias conversando" com chain visual
4. **Skill Tree comunicativo** — Radar: fluência, precisão, pronúncia, pragmática, compreensão
5. **Diálogos gerados por IA** — Conteúdo infinito sob demanda
6. **Cross-módulo** — Erro → flashcards, gramática, imitação automaticamente
7. **Templos temáticos para diálogos** — Cada cidade = contexto comunicativo, Boss Dialogue
8. **Dialogue Report Card** — Tempo de resposta, acerto por tipo, comparação histórica
9. **Dialogue Arcs** — Arcos narrativos de 5-7 diálogos com personagens recorrentes
10. **Daily Dialogue Quest** — Missão diária com 2X XP, desafios semanais

---

## 1.3 CONSOLIDAÇÃO — MATRIZ DE IMPACTO vs ESFORÇO

| # | Problema | Impacto | Esforço | Perspectivas |
|---|----------|---------|---------|--------------|
| 1 | Sem SRS para diálogos | 🔴 Alto | Médio | PM, Linguista |
| 2 | Sem output forçado (só reconhecimento) | 🔴 Alto | Alto | Linguista, UX |
| 3 | Sem feedback explicativo de erros | 🔴 Alto | Médio | UX, Linguista |
| 4 | Sem toggle de tradução | 🟡 Médio | Baixo | UX, Linguista |
| 5 | Sem dificuldade adaptativa | 🟡 Médio | Alto | PM, UX |
| 6 | Sem streak específico | 🟡 Médio | Baixo | PM |
| 7 | Sem métricas de competência | 🟡 Médio | Alto | PM, UX |
| 8 | Content exhaustion | 🔴 Alto | Alto | PM |
| 9 | innerHTML extenso (manutenibilidade) | 🟡 Médio | Alto | Dev |
| 10 | Sem acessibilidade (ARIA) | 🟡 Médio | Médio | Dev, UX |
| 11 | Sem componentização | 🟡 Médio | Alto | Dev |
| 12 | XSS potencial | 🔴 Alto | Baixo | Dev |
| 13 | Sem lazy loading de dados | 🟡 Médio | Médio | Dev |
| 14 | i18n incompleto | 🟡 Médio | Médio | Dev, UX |
| 15 | Sem pré-teste diagnóstico | 🟡 Médio | Médio | Linguista |
| 16 | Sem chunks highlighting | 🟡 Médio | Médio | Linguista |
| 17 | Sem flashcards automáticos do diálogo | 🟡 Médio | Baixo | Linguista, PM |
| 18 | Sem pragmática (formal/informal) | 🟡 Médio | Médio | Linguista |
| 19 | Sem onboarding contextual | 🟡 Médio | Baixo | UX, PM |
| 20 | Sem ordenação inteligente no seletor | 🟡 Médio | Baixo | UX |

---

# ═══════════════════════════════════════════════════
# FASE 2 — DO (Fazer)
# ═══════════════════════════════════════════════════

## 2.1 QUICK WINS (Implementar imediatamente — 1-2 sprints)

### QW-1: Toggle de Tradução
**O que:** Botão "Hide PT" / "Show PT" no modo leitura e prática  
**Por quê:** Força compreensão sem muleta. Krashen i+1.  
**Como:** Adicionar classe CSS `.traducao-oculta { display: none }` + toggle via JS  
**Esforço:** 2h

### QW-2: Flashcards Automáticos do Diálogo
**O que:** Botão "Add vocabulary to flashcards" no resultado  
**Por quê:** Reciclagem de vocabulário. Conecta diálogos → FSRS.  
**Como:** Iterar vocabulario_chave, criar cards FSRS, salvar em en_flashcards  
**Esforço:** 3h

### QW-3: Ordenação Inteligente no Seletor
**O que:** Mostrar diários não feitos primeiro, depois por nível do aluno  
**Por quê:** Aluno vê conteúdo relevante primeiro.  
**Como:** Ordenar: não-concluídos > concluídos, depois por nível ascendente  
**Esforço:** 1h

### QW-4: Onboarding Contextual
**O que:** Tooltip/banner na primeira visita: "Diálogos ajudam você a falar. Leia, pratique, e ganhe XP!"  
**Por quê:** Aluno sabe o valor da aba.  
**Como:** Verificar localStorage 'en_dialoghi_onboarding_done'  
**Esforço:** 2h

### QW-5: Sanitização XSS
**O que:** Aplicar _esc() em TODOS os innerHTML que inserem dados do usuário  
**Por quê:** Segurança.  
**Como:** Auditar todos os innerHTML em dialoghi.js, adicionar _esc()  
**Esforço:** 2h

### QW-6: Explicação de Erros (Tooltip)
**O que:** Adicionar campo "explicacao" aos distratores, mostrar no feedback  
**Por quê:** Aluno aprende com o erro.  
**Como:** Adicionar data-explicacao nos botões de alternativa, mostrar no feedback  
**Esforço:** 3h

### QW-7: i18n Completo
**O que:** Traduzir todos os textos hardcoded ("You", "Character", etc.)  
**Por quê:** Consistência linguística.  
**Como:** Adicionar chaves ao i18n.js, substituir hardcoded  
**Esforço:** 2h

---

## 2.2 MELHORIAS MÉDIAS (2-4 sprints)

### M-1: Pré-teste Diagnóstico
**O que:** Antes do diálogo, testar 3-4 turnos do usuário. Se acertar 80%, pular para prática.  
**Por quê:** Evita desperdício de tempo em conteúdo já dominado.  
**Como:** Selecionar aleatoriamente 3 turnos "You", mostrar como mini-quiz  
**Esforço:** 1 sprint

### M-2: Chunks Highlighting
**O que:** Destacar formulaic sequences no texto com cor diferente + tooltip explicativo  
**Por quê:** Noticing (Schmidt). Aluno aprende padrões reutilizáveis.  
**Como:** Adicionar campo "chunks" ao JSON, destacar com <mark> + CSS  
**Esforço:** 1 sprint

### M-3: Modo "Fill the Gap"
**O que:** Modo intermediário entre leitura e prática: mostra frase com lacuna para digitar  
**Por quê:** Output forçado parcial. Mais desafiador que múltipla escolha, menos assustador que produção livre.  
**Como:** Novo modo 'lacuna' com <input> para digitar a palavra faltante  
**Esforço:** 1 sprint

### M-4: Timer no Modo Prática
**O que:** Barra visual decrescente de 15s por resposta  
**Por quê:** Simula pressão temporal de conversa real.  
**Como:** CSS animation + setTimeout para auto-avançar se esgotar  
**Esforço:** 1 sprint

### M-5: Dialogue Streak
**O que:** Streak específico: "7 dias conversando" com chain visual  
**Por quê:** Incentivo direto para praticar diálogos diariamente.  
**Como:** Rastrear 'en_dialoghi_streak' no localStorage, mostrar no header  
**Esforço:** 1 sprint

### M-6: Lazy Loading de Dados
**O que:** Carregar diálogos por nível sob demanda, não tudo de uma vez  
**Por quê:** Performance. 60KB de JSON carregado mesmo que aluno só use A1.  
**Como:** Dividir dialogi.json em dialogi-A1.json, dialogi-A2.json, etc.  
**Esforço:** 1 sprint

### M-7: Acessibilidade (ARIA)
**O que:** Adicionar role, aria-label, tabindex, keyboard navigation  
**Por quê:** Screen readers, navegação por teclado, WCAG compliance.  
**Como:** Auditar todos os elementos interativos, adicionar atributos  
**Esforço:** 1 sprint

---

## 2.3 MELHORIAS GRANDES (1-2 meses)

### G-1: SRS para Diálogos (Dialogue Recall)
**O que:** Reapresentar diálogos em intervalos crescentes (1d, 3d, 7d, 14d, 30d) usando FSRS  
**Por quê:** Retenção de padrões conversacionais. Resolve content exhaustion.  
**Como:** Reutilizar motor FSRS existente. Agendar revisões. Na revisão, usar modo "reconstruir" com lacunas.  
**Esforço:** 2 sprints

### G-2: Modo "Conversation" (Produção Livre)
**O que:** Após múltipla escolha, modo sem opções: aluno digite/responda livremente  
**Por quê:** Output forçado real (Swain). Produção, não reconhecimento.  
**Como:** Novo modo 'conversa' com <textarea> + avaliação por similaridade de texto  
**Esforço:** 2 sprints

### G-3: Skill Tree de Competências Comunicativas
**O que:** Radar chart: fluência, precisão, pronúncia, pragmática, compreensão  
**Por quê:** Progresso visível por competência. Senso de maestria.  
**Como:** Rastrear métricas por diálogo, calcular scores, renderizar radar SVG  
**Esforço:** 2 sprints

### G-4: Cross-Módulo Integration
**O que:** Erro no diálogo → sugestão de flashcards, gramática, imitação automaticamente  
**Por quê:** Diálogo como hub diagnóstico. Ecossistema integrado.  
**Como:** Mapear erros para módulos, mostrar sugestões no resultado  
**Esforço:** 2 sprints

### G-5: Dialogue Arcs (Narrativa Progressiva)
**O que:** Arcos de 5-7 diálogos com personagens recorrentes e mini-história  
**Por quê:** Motivação intrínseca (curiosidade narrativa). Replay significativo.  
**Como:** Novo campo "arc_id" no JSON, ordenar por arco, mostrar progresso narrativo  
**Esforço:** 2 sprints

### G-6: Dificuldade Adaptativa
**O que:** Ajustar velocidade do áudio, complexidade dos distratores, tempo limite baseado em performance  
**Por quê:** Flow state. Nem entediado, nem frustrado.  
**Como:** Rastrear histórico de acertos, calcular nível efetivo, ajustar parâmetros  
**Esforço:** 2 sprints

### G-7: Componentização do dialoghi.js
**O que:** Extrair HTML para componentes reutilizáveis (Bubble, Turno, Opcao, Card)  
**Por quê:** Manutenibilidade. Debugável. Testável.  
**Como:** Criar funções de componente, migrar innerHTML para createElement/cloneNode  
**Esforço:** 2 sprints

### G-8: IndexedDB para Dados Grandes
**O que:** Mover diálogos custom e histórico para IndexedDB  
**Por quê:** localStorage tem limite de 5MB. IndexedDB tem 50MB+.  
**Como:** Usar Dexie.js ou wrapper nativo, migrar dados existentes  
**Esforço:** 1 sprint

---

# ═══════════════════════════════════════════════════
# FASE 3 — CHECK (Verificar)
# ═══════════════════════════════════════════════════

## 3.1 MÉTRICAS DE SUCESSO (KPIs)

### Métricas de Engajamento:
| Métrica | Atual (estimado) | Meta (3 meses) | Como medir |
|---------|-------------------|-----------------|------------|
| Diálogos completos/semana | ~3 | ~10 | Evento no localStorage |
| Tempo médio no diálogo | ~2min | ~5min | Timestamp início/fim |
| Taxa de conclusão (prática) | ~40% | ~70% | completos / abertos |
| Retorno ao diálogo (revisão) | 0% | ~30% | SRS reviews / total |

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
| Dialogue Streak médio | N/A | ~5 dias | localStorage |
| Content exhaustion rate | Alto | Baixo | diálogos disponíveis / concluídos |

## 3.2 VALIDAÇÃO CRUZADA DAS PROPOSTAS

### Propostas validadas por TODAS as 4 perspectivas:
1. ✅ **SRS para diálogos** — PM (retenção), Linguista (reciclagem), Dev (motor existe), UX (progresso visível)
2. ✅ **Toggle de tradução** — UX (desafio), Linguista (i+1), Dev (fácil), PM (engajamento)
3. ✅ **Flashcards automáticos** — Linguista (reciclagem), PM (cross-módulo), Dev (fácil), UX (valor percebido)
4. ✅ **Feedback explicativo de erros** — UX (aprendizagem), Linguista (noticing), PM (qualidade), Dev (fácil)

### Propostas com CONFLITO entre perspectivas:
- **Timer no modo prática**: UX quer (urgência), Linguista NÃO quer (ansiedade prejudica aquisição). **Resolução:** Timer opcional, desligado por padrão.
- **Modo Conversation (produção livre)**: Linguista quer (output), Dev não quer (complexidade alta). **Resolução:** Implementar versão simples primeiro (digitar, não falar).
- **Dificuldade adaptativa**: PM quer (flow), Dev não quer (complexidade). **Resolução:** Começar com versão simples (3 níveis fixos).

---

# ═══════════════════════════════════════════════════
# FASE 4 — ACT (Agir)
# ═══════════════════════════════════════════════════

## 4.1 ROADMAP DE IMPLEMENTAÇÃO

### SPRINT 1 (Semana 1-2) — Quick Wins
- [ ] QW-1: Toggle de tradução
- [ ] QW-2: Flashcards automáticos
- [ ] QW-3: Ordenação inteligente
- [ ] QW-5: Sanitização XSS
- [ ] QW-7: i18n completo

### SPRINT 2 (Semana 3-4) — Quick Wins + Início Médio
- [ ] QW-4: Onboarding contextual
- [ ] QW-6: Explicação de erros
- [ ] M-1: Pré-teste diagnóstico
- [ ] M-5: Dialogue Streak

### SPRINT 3 (Semana 5-6) — Melhorias Médias
- [ ] M-2: Chunks highlighting
- [ ] M-3: Modo "Fill the Gap"
- [ ] M-4: Timer no modo prática
- [ ] M-6: Lazy loading de dados

### SPRINT 4 (Semana 7-8) — Melhorias Médias + Início Grande
- [ ] M-7: Acessibilidade (ARIA)
- [ ] G-1: SRS para diálogos (início)
- [ ] G-7: Componentização (início)

### SPRINT 5-6 (Semana 9-12) — Melhorias Grandes
- [ ] G-1: SRS para diálogos (completo)
- [ ] G-2: Modo Conversation
- [ ] G-3: Skill Tree de competências
- [ ] G-4: Cross-módulo integration
- [ ] G-5: Dialogue Arcs
- [ ] G-6: Dificuldade adaptativa
- [ ] G-8: IndexedDB

## 4.2 CICLO DE MELHORIA CONTÍNUA

### Revisão Semanal:
- Analisar métricas de uso (diálogos completos, taxa de conclusão, tempo)
- Coletar feedback qualitativo (se possível)
- Ajustar prioridades do backlog

### Revisão Mensal:
- Avaliar KPIs vs metas
- Decidir se features estão funcionando
- Planejar próximo mês de melhorias

### Revisão Trimestral:
- Avaliar impacto geral nos objetivos de aprendizagem
- Decidir se features precisam ser pivotadas
- Planejar features de longo prazo

## 4.3 RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| SRS de diálogos é complexo | Alta | Alto | Começar com versão simples (intervalos fixos) |
| Produção livre é difícil de avaliar | Alta | Médio | Usar similaridade de texto, não IA |
| IndexedDB migração quebra dados | Média | Alto | Manter fallback para localStorage |
| Timer causa ansiedade | Média | Médio | Opcional, desligado por padrão |
| Componentização quebra tudo | Média | Alto | Refatorar incrementalmente, teste por teste |

---

# ═══════════════════════════════════════════════════
# RESUMO EXECUTIVO
# ═══════════════════════════════════════════════════

## Top 5 Problemas Mais Críticos:
1. **Sem SRS** — Diálogos são "feitos" uma vez e esquecidos. Conteúdo evaporado.
2. **Sem output forçado** — Só reconhecimento (múltipla escolha), nunca produção.
3. **Sem feedback explicativo** — Erra mas não aprende por quê.
4. **XSS potencial** — Dados do usuário sem sanitização.
5. **Content exhaustion** — Catálogo finito, sem replay significativo.

## Top 5 Quick Wins (fazer esta semana):
1. Toggle de tradução (2h)
2. Flashcards automáticos (3h)
3. Sanitização XSS (2h)
4. Ordenação inteligente (1h)
5. i18n completo (2h)

## Top 5 Melhorias de Maior Impacto:
1. SRS para diálogos (resolve content exhaustion + retenção)
2. Modo Conversation (output forçado real)
3. Cross-módulo integration (ecossistema)
4. Skill Tree de competências (progresso visível)
5. Dialogue Arcs (motivação intrínseca)

## Visão de Futuro:
A aba de Diálogos deve se tornar o **hub central de prática comunicativa** do app — onde o aluno não apenas lê e reconhece, mas **produz, interage, erra, aprende com o erro, revisa espaçadamente, e vê progresso real** em competências comunicativas. O diálogo deixa de ser "conteúdo estático" e se torna "simulador de conversação com melhoria contínua".

---

*Relatório gerado por análise multi-perspectiva: UX/UI Designer + Linguista Aplicado + Desenvolvedor Frontend + Product Manager*  
*Ciclo PDCA com melhoria contínua integrada*
