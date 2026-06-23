# Checklist de Auditoria Completa — English Autentico PWA
**Para a LLM auditora:** Este documento é um checklist exaustivo de inspeção do projeto "English Autentico". Leia TODOS os arquivos referenciados antes de marcar qualquer item. Reporte cada achado com severidade (CRÍTICO / ALTO / MÉDIO / BAIXO), o arquivo exato, número de linha e o patch sugerido.

---

## CONTEXTO OBRIGATÓRIO (leia antes de começar)

- **Stack:** Vanilla JS + HTML5 + CSS3. Sem frameworks. PWA offline.
- **Armazenamento:** `localStorage` com prefixo `en_` (ex: `en_progresso`, `en_flashcards`).
- **Service Worker:** `sw.js` — estratégia CacheFirst. Cache busting requer atualizar DOIS lugares simultaneamente: `const CACHE` em `sw.js` E `?v=N` nas tags `<script>` em `index.html`.
- **TTS:** `speechSynthesis` nativo (en-US), fallback `ResponsiveVoice.js`.
- **Deploy:** `master` → `gh-pages` via `git merge master --ff-only`.
- **REGRA CRÍTICA DE JSON:** O array de lições em `data/grammar.json` DEVE usar a chave `"lezioni"` (legado italiano). Usar `"lessons"` ou `"unidades"` quebra o renderer em `js/grammar.js`.
- **REGRA CRÍTICA DE ENCODING:** Todo `<script src>` em `index.html` DEVE ter `charset="UTF-8"`. Omitir corrompeu emojis em versões anteriores.
- **NUNCA** usar pipes do PowerShell para gerar JSON. Usar sempre `node assemble.js`.

---

## MÓDULO 1 — ESTRUTURA DO PROJETO E ARQUIVOS

### 1.1 index.html
- [ ] Verificar se TODOS os `<script src="...">` possuem `charset="UTF-8"`.
- [ ] Verificar se os parâmetros `?v=N` nas tags de script/CSS estão sincronizados com `const CACHE` em `sw.js`.
- [ ] Verificar se existe `<meta charset="UTF-8">` no `<head>`.
- [ ] Verificar se o `<link rel="manifest">` aponta para um arquivo `manifest.json` existente.
- [ ] Verificar se o `<meta name="theme-color">` está presente para compatibilidade PWA.
- [ ] Verificar se todos os `<link rel="preload">` ou `<link rel="prefetch">` existentes são de arquivos realmente utilizados.
- [ ] Verificar se há tags duplicadas (IDs repetidos, meta tags duplicadas).
- [ ] Verificar se o viewport meta tag está correto: `content="width=device-width, initial-scale=1"`.
- [ ] Verificar se todos os arquivos referenciados em `<link>` e `<script>` existem fisicamente no repositório.
- [ ] Verificar se há `defer` ou `async` nas tags de script e se a ordem de carregamento é compatível com as dependências entre módulos.
- [ ] Verificar se o `<noscript>` apresenta mensagem útil para usuários sem JS.
- [ ] Verificar se há inline scripts — e se existirem, se são necessários ou podem ser movidos para arquivos externos.
- [ ] Verificar se os IDs das tabs HTML correspondem exatamente aos seletores usados em todos os arquivos JS.

### 1.2 sw.js (Service Worker)
- [ ] Verificar se a constante `CACHE` está no formato correto (ex: `'english-vXX'`) e se o número está sincronizado com `index.html`.
- [ ] Verificar se o evento `install` faz `event.waitUntil(caches.open(...).then(cache => cache.addAll([...])))` e se a lista de URLs inclui todos os assets críticos.
- [ ] Verificar se o evento `activate` apaga TODOS os caches com nomes diferentes do atual (sem deixar caches órfãos).
- [ ] Verificar se o evento `fetch` distingue entre requisições de dados (`/data/*.json`) e assets estáticos, aplicando estratégias diferentes (network-first vs cache-first).
- [ ] Verificar se o fallback para `caches.match(event.request)` está implementado quando a rede falha.
- [ ] Verificar se a mensagem `AGENDAR_LEMBRETE` (notificações push) usa `setTimeout` — se sim, documentar o risco de o SW ser morto pelo Chrome em idle e sugerir Background Sync API como alternativa.
- [ ] Verificar se o `self.skipWaiting()` e `clients.claim()` estão presentes e bem posicionados.
- [ ] Verificar se há `console.error` ou logs de debug esquecidos no SW de produção.
- [ ] Verificar se os arquivos de dados JSON grandes (`grammar.json`, `dialogi.json`, `storie.json`, `canzoni.json`) estão incluídos na lista de pré-cache ou se são carregados dinamicamente.

### 1.3 css/english.css e css/styles.css
- [ ] Verificar se as CSS custom properties (variáveis) estão todas definidas em `:root` e usadas consistentemente — nenhum valor hardcoded de cor que deveria ser variável.
- [ ] Verificar se os modais `#ia-import-modal`, `#quiz-modal` e outros têm `max-height` e `overflow-y: auto` para não vazar em telas pequenas (iOS Safari).
- [ ] Verificar se há regras CSS duplicadas ou conflitantes entre `english.css` e `styles.css`.
- [ ] Verificar se as animações/transições têm `prefers-reduced-motion` como fallback para acessibilidade.
- [ ] Verificar se a responsividade está correta em 320px, 375px, 414px, 768px e 1024px de largura.
- [ ] Verificar se o Glassmorphism (`backdrop-filter`) tem fallback para browsers que não suportam (Firefox sem flag).
- [ ] Verificar se botões e inputs têm área de toque mínima de 44×44px (padrão WCAG).
- [ ] Verificar se há `outline` visível para foco de teclado (acessibilidade).
- [ ] Verificar se o contraste de cores atende WCAG AA (mínimo 4.5:1 para texto normal).
- [ ] Verificar se há classes CSS referenciadas em JS que não existem no CSS (classes mortas).
- [ ] Verificar se há classes CSS definidas no CSS que nunca são aplicadas por nenhum JS ou HTML (regras mortas).
- [ ] Verificar se o heatmap (`js/heatmap.js`) tem estilos adequados para células de largura variável em mobile.

---

## MÓDULO 2 — CORE E ESTADO DA APLICAÇÃO

### 2.1 js/core.js
- [ ] Verificar se `App.init()` trata corretamente falhas de rede ao buscar os JSONs (`.catch()` em todos os `fetch()`).
- [ ] Verificar a ordem de inicialização: se `flashcardsData` é usado por outro módulo antes de ser carregado, há race condition.
- [ ] Verificar se `App.estado` tem um schema definido e se todas as propriedades têm valores padrão para evitar `undefined`.
- [ ] Verificar se a função `App.pronunciar(texto)` verifica `typeof speechSynthesis !== 'undefined'` antes de chamar (SSR / ambientes sem TTS).
- [ ] Verificar se `_getVozAmericana()` registra o evento `onvoiceschanged` corretamente para o Chrome (vozes assíncronas no primeiro carregamento).
- [ ] Verificar se `parseFloat(localStorage.getItem('en_audio_speed'))` retorna `NaN` quando o valor é `null` e se há fallback para `0.85`.
- [ ] Verificar se há proteção contra chamadas concorrentes de `App.pronunciar()` (cancelamento de utterance anterior antes de começar nova).
- [ ] Verificar se `SomFeedback.ativo` é verificado antes de toda chamada TTS.
- [ ] Verificar se o padrão singleton (`App`) é corretamente protegido contra múltiplas inicializações.
- [ ] Verificar se há `window.onerror` ou `window.addEventListener('unhandledrejection')` global para capturar erros não tratados.

### 2.2 js/i18n.js
- [ ] Verificar se TODAS as chaves de tradução presentes nos templates HTML têm correspondência em PT-BR e EN no objeto de strings.
- [ ] Verificar se há chaves duplicadas no objeto de traduções (a última vence silenciosamente).
- [ ] Verificar se o evento `i18n:changed` é disparado corretamente após troca de idioma.
- [ ] Verificar se TODOS os módulos que exibem texto localizado escutam `document.addEventListener('i18n:changed')` e re-renderizam.
- [ ] Verificar se `grammar.js` re-renderiza labels ao trocar idioma (bug histórico conhecido).
- [ ] Verificar se `flashcards.js`, `quiz.js`, `dialoghi.js` e `canzoni.js` também re-renderizam ao trocar idioma.
- [ ] Verificar se há textos em português hardcoded em arquivos JS que deveriam ser strings i18n.
- [ ] Verificar se o estado de idioma persiste no `localStorage` após reload da página.

---

## MÓDULO 3 — GRAMÁTICA

### 3.1 data/grammar.json (e chunks: grammar_a1_1.json … grammar_c1_2.json)
- [ ] Verificar se TODOS os módulos usam a chave `"lezioni"` (não `"lessons"` nem `"unidades"`).
- [ ] Verificar se TODOS os cards de exemplo usam a chave `"italiano"` (não `"english"` nem `"target"`).
- [ ] Verificar se o campo `"versao"` está presente e atualizado.
- [ ] Verificar se todos os `"id"` de lição são únicos globalmente no arquivo.
- [ ] Verificar se todos os exercícios do tipo `"escolha"` têm exatamente 4 opções (`"opcoes": [...]` com length 4).
- [ ] Verificar se todos os exercícios de `"escolha"` têm `"resposta"` como índice numérico (0–3) válido dentro do array `"opcoes"`.
- [ ] Verificar se todos os exercícios do tipo `"digitar"` têm os campos `"pergunta"`, `"resposta"`, `"dica"` e `"explicacao"` preenchidos.
- [ ] Verificar se há lições sem `"exercicios"` (array vazio ou ausente) — o renderer deveria exibir mensagem adequada.
- [ ] Verificar se há lições sem `"observacao_cards"` — o renderer deveria não quebrar.
- [ ] Verificar se o campo `"alerta"` (texto motivacional) está presente em todas as lições.
- [ ] Verificar se há emojis nos campos de texto e se estão em UTF-8 válido (não mojibake).
- [ ] Verificar se os arquivos de chunk (`grammar_a1_1.json` etc.) foram corretamente mesclados em `grammar.json` sem perder lições ou duplicar.
- [ ] Verificar se `grammar_full.json` e `grammar.json` estão sincronizados ou se um é redundante.
- [ ] Verificar se `grammar_test.json` é arquivo de teste e não deveria estar em produção.
- [ ] Verificar se os arquivos de exercícios avulsos (`a2_exercises_batch1.json`, `grammar_b2_new_exercises.json` etc.) foram incorporados ao `grammar.json` principal ou são redundantes.
- [ ] Contar o total de lições por nível (A1, A2, B1, B2, C1, C2) e verificar se somam ~90 conforme especificado.
- [ ] Verificar se as lições seguem a progressão NMA (7 passos pedagógicos) — se há campo que indica o passo atual.

### 3.2 js/grammar.js
- [ ] Verificar se o parser tem fallback defensivo: `modulo.lezioni || modulo.unidades || []` para evitar crash em JSON malformado.
- [ ] Verificar se o conteúdo de `grammar.json` é sanitizado antes de ser inserido via `innerHTML` (risco XSS).
- [ ] Verificar se a função `_escAttr` ou equivalente está sendo chamada em todos os locais onde conteúdo de JSON é injetado no DOM.
- [ ] Verificar se o listener `document.addEventListener('i18n:changed')` é registrado UMA única vez (não duplica a cada troca de tab).
- [ ] Verificar se a navegação entre lições (botões Anterior/Próxima) calcula os índices corretamente sem out-of-bounds.
- [ ] Verificar se o estado de progresso (`en_progresso`) é salvo corretamente após conclusão de cada lição.
- [ ] Verificar se a aba "Prática" (exercícios) e a aba "Estudo" (cards) são renderizadas como tabs separadas conforme refatoração recente.
- [ ] Verificar se clicar em "Verificar Resposta" em exercícios do tipo `"digitar"` normaliza a resposta do usuário (trim, lowercase, sem acentos) antes de comparar.
- [ ] Verificar se exercícios do tipo `"escolha"` bloqueiam nova seleção após o usuário já ter respondido.
- [ ] Verificar se o progresso de módulo (ex: "3/10 lições") é calculado e exibido corretamente.
- [ ] Verificar se a função de TTS nos cards de gramática usa corretamente `App.pronunciar()` com o texto do campo `"italiano"`.
- [ ] Verificar se há botão de TTS para o campo `"traducao"` (português) usando a voz pt-BR adequada.

---

## MÓDULO 4 — VOCABULÁRIO (TEMPLOS)

### 4.1 data/templo-*.json (51 arquivos)
- [ ] Verificar se TODOS os 51 arquivos `templo-1.json` até `templo-51.json` existem e são JSON válido (sem trailing commas, aspas corretas).
- [ ] Verificar se cada templo tem os campos obrigatórios: `"id"`, `"titulo"`, `"tema"`, `"palavras"` (ou equivalente).
- [ ] Verificar se `data/index.json` lista corretamente todos os 51 templos com IDs e títulos corretos.
- [ ] Verificar se há emojis nos títulos/temas e se estão codificados corretamente.
- [ ] Verificar se os campos de palavra têm: `"en"` (inglês), `"pt"` (português), `"exemplo"` (frase de exemplo) e `"audio"` (se aplicável).
- [ ] Verificar se há palavras duplicadas dentro de um mesmo templo.
- [ ] Verificar se há palavras com o campo `"en"` vazio ou nulo.

### 4.2 Renderer de Templos (js referente)
- [ ] Verificar se o carregamento de `templo-*.json` é feito sob demanda (lazy loading) ou se todos os 51 são pré-carregados (impacto de performance).
- [ ] Verificar se erros de fetch de um templo individual não quebram a listagem completa.
- [ ] Verificar se o progresso por templo (`en_progresso`) registra palavras vistas e marcadas como aprendidas.
- [ ] Verificar se a função de TTS pronuncia corretamente as palavras em inglês americano.

---

## MÓDULO 5 — FLASHCARDS E SRS

### 5.1 js/flashcards.js
- [ ] Verificar se o algoritmo SRS incrementa os intervalos corretamente: 1d → 3d → 7d → 14d → 30d para respostas "Fácil/Bom".
- [ ] Verificar se respostas "Difícil/Errado" resetam o intervalo para 1d.
- [ ] Verificar se `Date.now()` é usado para comparação de datas e se há proteção contra bug de timezone (usuário em UTC-5 estuda à meia-noite, "amanhã" pode ser o mesmo dia em UTC).
- [ ] Verificar se o estado dos flashcards (`en_flashcards`) é carregado corretamente no boot sem misturar dados de sessões anteriores.
- [ ] Verificar se event listeners de botões (Fácil, Bom, Difícil) não se duplicam ao alternar entre tabs.
- [ ] Verificar se a fila de cartões para revisão hoje é calculada corretamente e não inclui cartões futuros.
- [ ] Verificar se novos cartões são adicionados à fila com limite diário razoável (evitar overwhelm de cartões novos).
- [ ] Verificar se o cartão exibe o campo `"italiano"` (inglês) na frente e `"traducao"` (português) no verso.
- [ ] Verificar se o botão de TTS no flashcard funciona corretamente.
- [ ] Verificar se há tratamento quando `App.estado.flashcardData` é undefined ou vazio (usuário nunca estudou).

### 5.2 data/grammar.json (campos exercicios usados como flashcards)
- [ ] Verificar se há campo de dificuldade por cartão persistido no `localStorage`.
- [ ] Verificar se as estatísticas de SRS (total revisados hoje, acertos, erros) são exibidas na interface.

---

## MÓDULO 6 — DIÁLOGOS

### 6.1 data/dialogi.json
- [ ] Verificar se é JSON válido (parse sem erros).
- [ ] Verificar se cada diálogo tem: `"id"`, `"titulo"`, `"cenas"` (ou equivalente).
- [ ] Verificar se cada cena/linha tem: `"personagem"`, `"fala"`, `"traducao"`.
- [ ] Verificar se há emojis ou caracteres especiais corrompidos (mojibake).
- [ ] Verificar se os blanks (`___`) nos exercícios fill-in-the-blank correspondem às respostas esperadas no JSON.

### 6.2 js/dialoghi.js
- [ ] Verificar se o carregamento do `dialogi.json` tem `try/catch` e exibe mensagem ao usuário em caso de falha.
- [ ] Verificar se event listeners de botões de diálogo não se acumulam ao trocar de tab.
- [ ] Verificar se o TTS é chamado com o texto correto da fala do personagem.
- [ ] Verificar se a verificação de resposta do fill-in-the-blank é case-insensitive e ignora espaços extras.
- [ ] Verificar se o progresso por diálogo é salvo no `localStorage`.

---

## MÓDULO 7 — MÚSICAS (CANZONI)

### 7.1 data/canzoni.json
- [ ] Verificar se é JSON válido.
- [ ] Verificar se cada música tem: `"id"`, `"titulo"`, `"artista"`, `"letra"` com marcadores de blank.
- [ ] Verificar se os blanks da letra (`___`) correspondem às respostas no campo `"respostas"` ou equivalente.
- [ ] Verificar se há músicas com campo `"audio_url"` e se as URLs são válidas ou se são assets locais.

### 7.2 js/canzoni.js
- [ ] Verificar se o módulo não quebra quando não há arquivo de áudio disponível.
- [ ] Verificar se o player de áudio tem controles de play/pause/rewind acessíveis.
- [ ] Verificar se a verificação de resposta é robusta (case-insensitive, sem pontuação).
- [ ] Verificar se event listeners se acumulam ao trocar de aba (memory leak).

---

## MÓDULO 8 — LISTEN & REPEAT / IMITAÇÃO

### 8.1 js/imitazione.js
- [ ] Verificar se o módulo usa a API `SpeechRecognition` ou `webkitSpeechRecognition` e tem fallback quando não suportado.
- [ ] Verificar se há tratamento de erro quando o microfone não está disponível (`NotAllowedError`, `NotFoundError`).
- [ ] Verificar se a comparação entre o texto falado e o esperado é feita com normalização adequada.
- [ ] Verificar se o botão de gravar não fica travado em estado "gravando" após erro.
- [ ] Verificar se o evento de i18n re-renderiza corretamente os textos da UI de imitação.
- [ ] Verificar se o bug histórico de exceção no módulo (citado no commit `bda7645`) foi realmente corrigido.
- [ ] Verificar se frases de instrução estão traduzidas para português (conforme mencionado no commit mais recente).

### 8.2 data/imitazioni.json
- [ ] Verificar se é JSON válido.
- [ ] Verificar se cada item tem `"frase"` (texto a imitar) e `"traducao"`.
- [ ] Verificar se há frases com caracteres especiais corrompidos.

---

## MÓDULO 9 — STORIE (HISTÓRIAS)

### 9.1 data/storie.json
- [ ] Verificar se é JSON válido (arquivo potencialmente grande — verificar encoding).
- [ ] Verificar se existe `data/storie.json.bak` — se é backup desatualizado que pode ser removido.
- [ ] Verificar se cada história tem: `"id"`, `"titulo"`, `"nivel"`, `"texto"`, `"questoes"`.
- [ ] Verificar se as questões têm `"tipo"`, `"pergunta"`, `"opcoes"`, `"resposta"`.
- [ ] Verificar se as histórias filosóficas (arquivos em `scripts/new_fil_*.json`) foram incorporadas ao `storie.json` principal ou são pendentes de merge.

### 9.2 js/storie.js
- [ ] Verificar se o carregamento tem tratamento de erro.
- [ ] Verificar se a paginação/navegação entre histórias funciona sem out-of-bounds.
- [ ] Verificar se o progresso por história é salvo no `localStorage`.

---

## MÓDULO 10 — QUIZ

### 10.1 data/quizzes.json e js/quiz_data.js
- [ ] Verificar se `quizzes.json` e `quiz_data.js` não são redundantes (dados duplicados).
- [ ] Verificar se todas as questões têm 4 opções e a resposta correta definida.
- [ ] Verificar se os quizzes cobrem todos os níveis (A1–C2).

### 10.2 js/quiz.js
- [ ] Verificar se event listeners de botões de opção não se duplicam entre sessões de quiz.
- [ ] Verificar se o timer (se houver) é limpo corretamente ao navegar para outra aba (`clearInterval`/`clearTimeout`).
- [ ] Verificar se o resultado final do quiz é salvo no `localStorage` para histórico.
- [ ] Verificar se o quiz não permite avançar sem selecionar uma resposta.

---

## MÓDULO 11 — PERFIL E PROGRESSO

### 11.1 js/profilo.js
- [ ] Verificar se `Profilo.importarDados(json)` tem `try/catch` abrangente que captura JSON malformado, campos ausentes e tipos errados.
- [ ] Verificar se após importação com dados corrompidos o app continua funcionando (não corrompe o estado em memória).
- [ ] Verificar se `Profilo.exportarDados()` exporta TODAS as chaves `en_*` do localStorage e nenhuma chave de outro domínio.
- [ ] Verificar se `Profilo.resetProgresso()` apaga EXATAMENTE todas as chaves com prefixo `en_` e não deixa chaves órfãs.
- [ ] Verificar se após o reset o app reinicia em estado limpo sem necessidade de recarregar a página.
- [ ] Verificar se o slider de velocidade de áudio (`en_audio_speed`) salva o valor corretamente e o aplica imediatamente no TTS.
- [ ] Verificar se a tela de perfil exibe estatísticas corretas: dias de streak, total de palavras aprendidas, lições concluídas.

### 11.2 js/heatmap.js
- [ ] Verificar se o heatmap de atividade semanal usa os dados corretos do `localStorage`.
- [ ] Verificar se o heatmap renderiza corretamente em mobile (células visíveis, não coladas).
- [ ] Verificar se há tratamento para quando não há dados históricos (primeiro uso).

### 11.3 js/progression.js e js/conquistas.js
- [ ] Verificar se os marcos de conquista (badges) são desbloqueados nos eventos corretos.
- [ ] Verificar se as conquistas persistem no `localStorage` e não são perdidas após reload.
- [ ] Verificar se há conquistas definidas mas nunca desbloqueáveis (condições impossíveis).
- [ ] Verificar se a exibição de notificação de conquista (toast/modal) não se acumula ao desbloquear várias ao mesmo tempo.

---

## MÓDULO 12 — IA IMPORT

### 12.1 js/ia-import.js
- [ ] Verificar se `_obterPalavrasDificeis()` tem guarda para `App.estado.flashcardData` vazio/undefined (usuário que nunca estudou — bug crítico conhecido).
- [ ] Verificar se `App.estado.vocabCache` está sincronizado com `en_vocab_custom` antes de qualquer chamada da IA.
- [ ] Verificar se o modal `#ia-import-modal` fecha corretamente ao cancelar ou após importação.
- [ ] Verificar se o botão de submit do modal é desabilitado durante processamento para evitar duplo clique.
- [ ] Verificar se o conteúdo importado via IA é validado antes de ser salvo (campos obrigatórios presentes).

---

## MÓDULO 13 — VOCABULÁRIO AVANÇADO

### 13.1 js/vocab.js e data/conjugacoes.json
- [ ] Verificar se `conjugacoes.json` é JSON válido.
- [ ] Verificar se as conjugações estão em inglês (não italiano ou português) conforme conversão do fork.
- [ ] Verificar se a busca de vocabulário (`js/vocab.js`) funciona com termos que têm acentos ou caracteres especiais.
- [ ] Verificar se o vocabulário customizado (`en_vocab_custom`) é indexado corretamente e não perde entradas após reload.

---

## MÓDULO 14 — ONBOARDING E TOUR

### 14.1 js/onboarding.js e js/tour.js
- [ ] Verificar se o onboarding é exibido apenas na primeira visita (controlado por chave `localStorage`).
- [ ] Verificar se o tour guiado destaca elementos que realmente existem no DOM atual.
- [ ] Verificar se o tour pode ser pulado/fechado facilmente e o estado "tour visto" é salvo.
- [ ] Verificar se o tour funciona corretamente em mobile (tooltips não saem da tela).

---

## MÓDULO 15 — NOTIFICAÇÕES

### 15.1 js/notificacoes.js
- [ ] Verificar se a solicitação de permissão de notificação é feita apenas após interação do usuário (requisito dos browsers modernos).
- [ ] Verificar se há fallback quando `Notification` não é suportado.
- [ ] Verificar se as notificações agendadas via SW (`AGENDAR_LEMBRETE`) usam `setTimeout` ou Background Sync API.
- [ ] Verificar se as notificações de lembrete são canceladas quando o usuário desativa as notificações no perfil.

---

## MÓDULO 16 — ÁUDIO EXTERNO

### 16.1 js/audio.js e js/audio-store.js
- [ ] Verificar se `audio-store.js` armazena áudios customizados e se o armazenamento tem limite de tamanho.
- [ ] Verificar se áudios externos são carregados com `<audio>` ou via `AudioContext` e se há tratamento de erro de loading.
- [ ] Verificar se arquivos de áudio de teste (`believer_test.mp3`) são excluídos de produção.
- [ ] Verificar se o controle de velocidade de reprodução de áudio (não TTS) funciona corretamente.

---

## MÓDULO 17 — SCRIPTS DE DADOS E FERRAMENTAS

### 17.1 Scripts Python raiz (gerar_*.py, fix_*.py, etc.)
- [ ] Verificar se NENHUM desses scripts usa `print(...) | Out-File` do PowerShell para gerar JSON (regra crítica).
- [ ] Verificar se esses scripts têm `encoding='utf-8'` em todos os `open()` de escrita.
- [ ] Verificar se há scripts Python desnecessários em produção que deveriam estar em `.gitignore`.
- [ ] Verificar se `_eixos456.js` e `add_song.js` (arquivos não rastreados no git) têm propósito definido ou devem ser removidos/adicionados ao `.gitignore`.
- [ ] Verificar se `gerar_matriz_completa.js` foi usado e se o output foi incorporado ao projeto.

### 17.2 scripts/ (Node.js)
- [ ] Verificar se `scripts/validate_grammar.js` foi executado recentemente e se o JSON atual passa na validação.
- [ ] Verificar se `scripts/translate-grammar-full.js` e `scripts/translate-db.js` são scripts de uso único ou devem ser mantidos.
- [ ] Verificar se `scripts/apply_stories.js` e `scripts/merge_*.js` foram executados e os dados integrados.
- [ ] Verificar se os `scripts/new_fil_*.json` (histórias filosóficas) foram integrados ao `data/storie.json`.

---

## MÓDULO 18 — SEGURANÇA

- [ ] Verificar se há uso de `eval()` ou `new Function()` em qualquer arquivo JS — se encontrado, substituir.
- [ ] Verificar se todo conteúdo de JSON externo inserido via `innerHTML` passa por sanitização (proteção XSS).
- [ ] Verificar se há dados sensíveis (tokens, chaves de API) hardcoded em qualquer arquivo JS ou HTML.
- [ ] Verificar se o Content Security Policy (CSP) está definido via meta tag ou header.
- [ ] Verificar se o `manifest.json` não tem permissões excessivas.
- [ ] Verificar se as URLs de `ResponsiveVoice.js` (CDN externo) são carregadas via HTTPS.
- [ ] Verificar se há uso de `document.write()` — se sim, substituir.
- [ ] Verificar se `localStorage` armazena algum dado sensível do usuário que deveria ser criptografado.

---

## MÓDULO 19 — PERFORMANCE

- [ ] Verificar o tamanho de `data/grammar.json` — se muito grande (>1MB), considerar lazy loading por módulo.
- [ ] Verificar se há imagens não otimizadas (formatos JPEG/PNG quando WebP seria melhor).
- [ ] Verificar se há arquivos CSS/JS não minificados sendo servidos em produção.
- [ ] Verificar se o Lighthouse score de PWA, Performance, Acessibilidade e SEO é verificável.
- [ ] Verificar se os 51 arquivos `templo-*.json` são carregados todos de uma vez ou sob demanda.
- [ ] Verificar se há operações de `localStorage` dentro de loops frequentes (impacto de performance).
- [ ] Verificar se `innerHTML` em loops grandes usa fragment ou string concatenação eficiente.

---

## MÓDULO 20 — ACESSIBILIDADE (A11Y)

- [ ] Verificar se todos os botões de ação têm `aria-label` descritivo quando não têm texto visível.
- [ ] Verificar se as tabs da navegação principal usam roles ARIA corretos (`role="tablist"`, `role="tab"`, `role="tabpanel"`).
- [ ] Verificar se modais usam `role="dialog"`, `aria-modal="true"` e trap de foco (Tab não sai do modal).
- [ ] Verificar se alertas de feedback (certo/errado) são anunciados por screen readers (`aria-live="polite"` ou `role="alert"`).
- [ ] Verificar se a ordem de foco (Tab) é lógica e segue a ordem visual.
- [ ] Verificar se há texto alternativo (`alt`) em todas as imagens.
- [ ] Verificar se campos de input têm `<label>` associado ou `aria-label`.

---

## MÓDULO 21 — GIT E DEPLOY

- [ ] Verificar se há arquivos sensíveis ou desnecessários não listados em `.gitignore` (arquivos `_eixos456.js`, `believer_test.mp3`, `gerar_*.py`, etc.).
- [ ] Verificar se `playwright-report/` e `test-results/` estão no `.gitignore`.
- [ ] Verificar se a branch `gh-pages` está atualizada com o último commit de `master`.
- [ ] Verificar se o `manifest.json` (PWA) existe e tem `name`, `short_name`, `icons`, `start_url`, `display: "standalone"`.
- [ ] Verificar se os ícones do PWA existem nos tamanhos 192x192 e 512x512.
- [ ] Verificar se há arquivo `robots.txt` e `sitemap.xml` na raiz (relevante para SEO do GitHub Pages).

---

## MÓDULO 22 — TESTES

### 22.1 tests/song.spec.js (Playwright)
- [ ] Verificar se o teste cobre o fluxo completo da aba de músicas.
- [ ] Verificar se os testes estão passando (`npx playwright test`).
- [ ] Verificar se há testes para os módulos mais críticos (grammar, flashcards, profile).
- [ ] Verificar se os arquivos `scripts/test_render.js` e `scripts/test_html_unidade.js` são testes unitários funcionais.
- [ ] Verificar se `scripts/check_clicks.js` detecta problemas reais de event binding.

---

## MÓDULO 23 — DOCUMENTAÇÃO

- [ ] Verificar se `DOCUMENTACAO/HANDOFF_LLM.md` está atualizado com as últimas mudanças (tabs de estudo/prática, correções de i18n).
- [ ] Verificar se `DOCUMENTACAO/QA_AUDIT_INSTRUCTIONS.md` cobre os bugs recentes dos commits.
- [ ] Verificar se `DOCUMENTACAO/TESTING.md` tem instruções de como rodar os testes localmente.
- [ ] Verificar se `DOCUMENTACAO/LLM_FEATURE_SYNC.md` e `DOCUMENTACAO/LLM_AUDIO_AND_LANGUAGE_SYNC.md` descrevem o estado atual das features.
- [ ] Verificar se o arquivo `info.txt` contém informações úteis ou é descartável.

---

## MÓDULO 24 — VERIFICAÇÕES CRUZADAS

- [ ] **Consistência de IDs:** Todos os IDs definidos em `data/index.json` têm arquivo `templo-N.json` correspondente.
- [ ] **Chaves localStorage:** Listar todas as chaves `en_*` usadas nos arquivos JS e verificar se nenhuma foi renomeada parcialmente (ex: `en_flashcards` vs `en_flashcard`).
- [ ] **Event listeners globais:** Listar todos os `document.addEventListener(...)` e verificar se são removidos com `removeEventListener` quando o módulo é destruído.
- [ ] **Referências a `italiano`:** Buscar todos os usos da string `"italiano"` nos arquivos JS e confirmar que todos são acessos ao campo legado do JSON (não texto em italiano).
- [ ] **Referências residuais ao italiano:** Buscar strings como `"Italiano Autentico"`, `"it-IT"`, `"it_"` nos arquivos JS/HTML/CSS e verificar se são resíduos do fork.
- [ ] **console.log de debug:** Buscar todos os `console.log(` nos arquivos JS de produção e remover os desnecessários.
- [ ] **TODO/FIXME:** Buscar todos os comentários `TODO`, `FIXME`, `HACK`, `XXX` e listar para triagem.
- [ ] **Variáveis globais poluindo window:** Verificar se os módulos expõem variáveis desnecessariamente no escopo global.

---

## FORMATO DO RELATÓRIO DE SAÍDA

Para cada item com problema encontrado, reportar:

```
### [SEVERIDADE] Módulo X.Y — Título do Problema

**Arquivo:** `js/exemplo.js` linha 123
**Problema:** Descrição clara do bug ou risco.
**Reprodução:** Passos para reproduzir (se aplicável).
**Patch sugerido:**
```js
// ANTES
codigo_ruim();

// DEPOIS
codigo_correto();
```
**Impacto:** O que quebra/falha se não for corrigido.
```

**Severidades:**
- `CRÍTICO` — Quebra funcionalidade core ou causa perda de dados.
- `ALTO` — Bug confirmado que afeta UX de forma significativa.
- `MÉDIO` — Edge case raro ou degradação de performance.
- `BAIXO` — Linting, código morto, documentação, melhoria.

---

## AÇÃO FINAL REQUERIDA

Após concluir a auditoria:
1. Gerar lista ranqueada por severidade.
2. Aplicar patches para todos os itens CRÍTICO e ALTO diretamente nos arquivos.
3. Criar um commit com mensagem `fix(audit): corrige N problemas críticos encontrados na auditoria`.
4. Reportar os itens MÉDIO e BAIXO como recomendações sem aplicar automaticamente.
