# Ciclo PDCA — Aba de Diálogos · English Autentico
**Relatório de Brainstorming Multi-Especialistas**
*6 especialistas · 3 debates cruzados · 1 síntese consolidada*
*Data: 2026-06-22*

---

## EQUIPE DE ESPECIALISTAS

| Especialista | Função / Papel | Foco Principal |
| :--- | :--- | :--- |
| **Ana Paula** | Pedagoga SLA | Progressão de aquisição, retenção, produção real vs. reconhecimento. |
| **Roberto Nascimento** | LX Designer EdTech | Experiência de uso, redução de fricção, consistência visual, mobile-first. |
| **Fernanda Carvalho** | Linguista PhD | Rigor terminológico, dialetos (US vs. UK), consistência com Quadro Europeu (CEFR). |
| **Marcus Oliveira** | Psicólogo Educacional | Carga cognitiva, filtro afetivo, autoeficácia, motivação intrínseca. |
| **Sofia Mendes** | Aluna Real (Persona) | Experiência vivida no celular, clareza, sentimentos e frustrações reais. |
| **Diego Ferreira** | Game Designer | Loops de engajamento, senso de progresso, mecânicas e recompensas lúdicas. |

---

# ◉ P L A N — DIAGNÓSTICO

### Diagnóstico Consolidado
A análise profunda da aba **Diálogos** revelou diversas falhas de consistência linguística, lacunas de UX/LX pedagógica e problemas técnicos no código (`js/dialoghi.js` e dados em `data/dialogi.json`). 

O problema pedagógico mais imediato reside no **feedback silencioso após um erro no Modo Prática** (`js/dialoghi.js:450-457`). Quando o aluno seleciona uma alternativa errada, o aplicativo apenas exibe os botões com as classes de cores (vermelho/verde) e impõe um travamento intencional de 2.5 segundos em silêncio absoluto. Isso desperdiça o valioso "momento de atenção focada" (Schmidt's Noticing Hypothesis), onde o aluno deveria receber o input auditivo correto para comparar com sua hipótese inicial errada.

No nível de consistência do conteúdo, há uma **mistura confusa de nomes do usuário final nas falas** e na própria lógica de contagem de progresso. Enquanto os diálogos 1, 2 e 3 rotulam o usuário como `"You"`, os diálogos do 4 ao 8 utilizam o termo italiano/português `"Tu"`. Na lógica de contagem de acertos (`js/dialoghi.js:461`), há um filtro estrito de igualdade de strings (`t.personaggio === 'Tu' || t.personaggio === 'You' || t.personaggio === 'User'`) que é sensível a maiúsculas/minúsculas e não remove espaços em branco adicionais. Se um diálogo customizado usar `"you"` ou `"user "` com espaço, a lógica falha silenciosamente, corrompendo a pontuação final de acertos do aluno.

Adicionalmente, embora a aba permita a inserção de transcrições fonéticas **IPA** (`audio_ipa`) tanto nos dados do JSON quanto no formulário de criação, o renderizador chat (`js/dialoghi.js:353-360`) **ignora completamente esse campo**, omitindo o suporte visual de pronúncia. Por fim, **não há gravação de progresso individual de diálogos concluídos** no `localStorage` (não há chave equivalente à `en_storie_lidas` para histórias), deixando o painel seletor limpo de qualquer marcação de progresso (ex: checkmarks), sabotando a gamificação e forçando Sofia a adivinhar quais diálogos já realizou.

### Hipótese Central
"Se implementarmos o registro de diálogos concluídos no localStorage para exibir checkmarks no seletor, padronizarmos a exibição do nome do usuário em português ('Você') ou inglês ('You') na UI de forma automática através de chaves i18n, corrigirmos a lógica de comparação de strings de contagem para ser case-insensitive, habilitarmos a pronúncia do áudio correto ao errar no Modo Prática e exibirmos as transcrições IPA quando disponíveis, nós eliminaremos as inconsistências dialetais herdadas, daremos senso de progressão contínua a Sofia e potencializaremos a correção fonológica no momento exato do erro."

### Raízes dos Problemas (por impacto)
1. **Ausência de Histórico de Conclusão (UX/Gamificação):** Sem salvar os diálogos concluídos em localStorage, a grid do seletor não possui indicadores de sucesso. O aluno perde o loop de engajamento dinâmico.
2. **Punição com Silêncio no Erro (Pedagogia/SLA):** Travar a tela por 2.5 segundos sem pronunciar a resposta correta no erro impede a retenção corretiva imediata.
3. **Inconsistência de "Tu" vs "You" na UI (Linguística):** Exibir "Tu" para o aluno brasileiro em diálogos em inglês é confuso e amador, denunciando a falta de refatoração completa do fork italiano.
4. **Filtro Frágil na Lógica de Acertos (Técnico/Código):** O filtro case-sensitive rígido em `mostrarResultado` pode invalidar pontuações de diálogos customizados ou JSONs que fujam da capitalização exata.
5. **Transcrições IPA Ocultas (Linguística):** O campo `audio_ipa` na base de dados é inútil hoje, pois o renderer o ignora completamente na renderização do balão de fala.
6. **Falta de Audio Replay no Histórico (UX):** No Modo Prática, após avançar o turno, o botão de áudio some, impedindo que o aluno revise a pronúncia dos balões anteriores.
7. **XSS e Quebra de Atributos HTML no Form (Segurança/Técnico):** Injetar variáveis sem escapar aspas ou tags em `abrirFormularioCriar` permite que caracteres comuns (como aspas duplas) quebrem os campos `value=""` do formulário de edição.

---

## VOZES INDIVIDUAIS DOS ESPECIALISTAS

### 👩‍🏫 ANA PAULA (Pedagoga SLA)
> "Como pedagoga, o Modo Prática do aplicativo me agrada muito na teoria porque exige output do aluno (Swain, 1985) em vez de apenas reconhecimento passivo. Mas o tratamento do erro é inaceitável! No momento em que Sofia clica na resposta errada, a tela fica travada em silêncio absoluto por 2.5 segundos. Em SLA, sabemos que o erro é a melhor oportunidade para o cérebro reformular hipóteses sobre a língua (noticing the gap). Se ela errou, ela DEVE ouvir imediatamente a frase correta para que seu ouvido registre a pronúncia nativa e contraste com a sua escolha errada. Manter o silêncio apenas frustra a estudante e a pune sem ensinar.
>
> Além disso, por que removemos os botões de áudio (`🔊`) do histórico de conversação no Modo Prática? Se o aluno avança para o turno 3, ele deveria poder tocar novamente no áudio do turno 1 para reforçar a escuta. O aprendizado de línguas não é uma linha reta que desaparece; exige contato e revisão constante das frases inteiras no contexto do diálogo."

### 🎨 ROBERTO NASCIMENTO (LX Designer EdTech)
> "Eu olho para o formulário de criação de diálogos (`js/dialoghi.js:108-179`) e vejo sérios problemas de usabilidade móvel. Não há nenhuma sanitização nas caixas de texto. Se o usuário digitar uma aspa simples ou dupla no título do diálogo ou na frase de um turno, o formulário vai simplesmente quebrar aspas do HTML do modal de edição na próxima vez que for aberto. Precisamos adicionar um método de escape básico no core de diálogos.
>
> Em termos de fluxo, a transição entre o Modo Leitura e Modo Prática é confusa. O aplicativo exibe uma lista inteira de turnos no Modo Leitura. O aluno lê tudo de uma vez. Quando clica em 'Praticar', a tela é limpa e ele começa do zero. Seria muito mais elegante e fluido se o aluno pudesse iniciar o Modo Prática de forma progressiva. E quando o diálogo termina, a tela de resultados é estéril. Não há badges, celebrações, apenas texto plano e um bloco de 'Vocabulário Chave' que parece jogado na tela sem tratamento visual premium."

### 🔬 FERNANDA CARVALHO (Linguista PhD)
> "Esta base de dados herdada de italiano possui resíduos grosseiros. Encontrar `"personaggio": "Tu"` em mais da metade dos diálogos em `data/dialogi.json` é um desalinhamento. Sofia está estudando inglês; ela deve ler `"You"` (inglês) ou `"Você"` (português) nos balões de fala, e não `"Tu"`, que soa como português arcaico ou um erro de tradução do italiano. O renderer precisa normalizar isso dinamicamente na UI com base no idioma selecionado.
>
> Outra coisa: por que coletamos dados fonéticos com tanto rigor se não os exibimos? As transcrições IPA (`audio_ipa`) são de extrema valia para a autonomia fonológica do aluno adulto. Em vez de esconder o campo, deveríamos exibi-lo logo abaixo das frases em inglês com um estilo sutil e entre barras, auxiliando alunos visuais a entenderem a diferença entre grafia e fonologia do inglês."

### 🧠 MARCUS OLIVEIRA (Psicólogo Educacional)
> "Do ponto de vista da psicologia educacional e da Teoria da Carga Cognitiva, o design do Modo Prática é adequado ao ocultar as falas futuras, diminuindo a carga intrínseca sobre a memória de trabalho de Sofia. Porém, a punição por erro de 2.5 segundos de travamento silencioso aumenta a ansiedade do estudante. Sofia, que já tem um histórico de desistência e medo de errar, sente-se impotente e frustrada durante essa pausa muda. O erro deve ser uma experiência de suporte (scaffolding), não de estagnação.
>
> Também noto que, sem checkmarks visuais no seletor de diálogos, o senso de progresso do aluno é seriamente comprometido. O cérebro precisa de micro-recompensas visuais de conclusão (efeito Zeigarnik) para se motivar a abrir o aplicativo amanhã. Sem checkmarks, a grid parece uma pilha infinita e cansativa de tarefas não organizadas."

### 📱 SOFIA MENDES (Aluna Real — Persona)
> "Eu gosto muito de praticar com os diálogos! Sinto que estou em uma situação real, como no café ou no aeroporto, e me ajuda a pensar rápido nas respostas. Mas é horrível quando eu erro uma resposta... a tela fica vermelha, trava por alguns segundos e nada acontece. Eu fico encarando o celular sem saber por que aquela frase estava errada. Eu queria poder ouvir a frase certa para tentar repetir baixinho no metrô.
>
> E no painel de seleção, eu nunca sei quais eu já terminei! Eu tenho que ficar clicando um por um para lembrar se já fiz os exercícios daquele diálogo ou não. Às vezes acabo repetindo o mesmo diálogo duas vezes e deixo outros de lado por engano. E uma coisa que me confundiu: por que no diálogo do hotel meu balão de fala está escrito 'Tu'? Em São Paulo nós não usamos muito 'tu' no dia a dia, e como estou estudando inglês, ver 'Tu' ali me pareceu meio estranho... achei que era algum erro do aplicativo."

### 🎮 DIEGO FERREIRA (Game Designer)
> "A aba de Diálogos hoje falha no loop mais básico de engajamento do jogador. O core loop é: Selecionar -> Praticar -> Receber Feedback -> Ganhar Recompensa -> Ver Progresso -> Voltar Amanhã. A última etapa está quebrada. Não há gravação de estado de vitória! O aluno ganha XP, o XP sobe, mas na grid de diálogos nada muda. Não há o prazer visual de 'marcar como concluído' com um checkmark brilhante ou coroa dourada.
>
> Para consertar o loop, precisamos salvar o ID do diálogo em um array de conquistas locais (ex: `en_dialoghi_concluidos`) e renderizar uma marca de masterização no card. Isso ativa o instinto de colecionador e dá um senso de conclusão que engaja o aluno a bater a meta de masterizar 100% dos diálogos do nível!"

---

# ◉ OS 3 DEBATES CRUZADOS

### DEBATE 1 — ANA PAULA × DIEGO
*Pedagogia vs. Gamificação*

- **Ana Paula:** "Diego, você quer enfeitar a tela com checkmarks e animações, mas isso é motivação extrínseca barata. O que realmente importa é a qualidade do feedback corretivo! Manter a tela travada sem áudio ao errar impede a real progressão linguística do estudante."
- **Diego:** "Eu concordo 100% que o feedback de áudio ao errar é crucial para o jogo fluir, Ana! Mas o checkmark no menu de seleção não é 'barato', é design de progresso. Sem metas visuais claras de conclusão, o usuário desiste por falta de rumo. As comemorações e os checkmarks dão dopamina e mantêm o aluno na trilha pedagógica que você desenhou."
- **Insight Comum:** Ambos admitem que a interface deve fornecer tanto o feedback instrucional perfeito (escutar a pronúncia correta no erro) quanto o feedback de vitória de longo prazo (gravar a conclusão em localStorage e marcar a grid).
- **Proposta Conjunta:** Implementar a pronúncia da alternativa correta imediatamente no erro no Modo Prática e, ao concluir o diálogo com score mínimo de 60%, gravar o ID do diálogo e exibir um badge visual dinâmico de conclusão (ex: checkmark verde) no card correspondente do seletor.

---

### DEBATE 2 — MARCUS × SOFIA
*Teoria Cognitiva vs. Experiência Vivida*

- **Marcus:** "Sofia, a ansiedade de travamento que você sente é o resultado de uma sobrecarga no filtro afetivo. Quando o aplicativo bloqueia a tela em silêncio, sua memória de trabalho tenta processar o erro sem qualquer auxílio visual ou auditivo corretivo, gerando sentimentos de incapacidade."
- **Sofia:** "É isso mesmo! Eu me sinto muito pressionada e boba nesses segundos de silêncio. Se o app falasse a frase correta, pelo menos meu foco iria para a pronúncia e eu esqueceria o erro. E sobre os checkmarks, se eu visse o painel com vários 'concluídos' marcados em verde, me daria muito mais orgulho de continuar estudando."
- **Insight Comum:** O design de resiliência e autoeficácia exige que o erro seja convertido em um momento amigável de aprendizado auditivo guiado, e que a persistência visual do progresso valide o esforço diário do aluno.
- **Proposta Conjunta:** Reduzir o tempo de travamento no erro para 2.0 segundos (ou manter 2.2s mas preenchido com a pronúncia imediata do TTS para a alternativa correta) e introduzir a gravação e renderização visível de progresso no seletor de diálogos.

---

### DEBATE 3 — FERNANDA × ROBERTO
*Rigor Linguístico vs. Fluidez de UX*

- **Fernanda:** "Roberto, deixar termos como 'Tu' em diálogos de inglês americano e ignorar as transcrições fonéticas IPA é um desleixo linguístico. Precisamos limpar esses dados do JSON ou normalizar no renderer, e mostrar o IPA para que o aluno aprenda a pronúncia correta das palavras difíceis."
- **Roberto:** "Eu entendo, Fernanda, mas se colocarmos o IPA em destaque com letras grandes, vamos poluir a interface e criar poluição visual na tela pequena do celular. O IPA deve ser discreto, renderizado de forma sutil sob a frase para não sobrecarregar visualmente. E sobre o 'Tu', concordo plenamente: o renderer deve substituir isso dinamicamente por 'Você' ou 'You' dependendo do idioma, sem quebrar o HTML."
- **Insight Comum:** A correção linguística e a limpeza dos vestígios do fork italiano são essenciais para a qualidade do app, mas devem ser introduzidos na interface de forma harmônica e responsiva, respeitando as aspas e o fluxo de dados.
- **Proposta Conjunta:** Adicionar uma função de escape global nos formulários e renderizadores da aba, exibir a transcrição IPA discreta em fonte mono cinza abaixo da frase quando o campo `audio_ipa` estiver populado, e normalizar dinamicamente a exibição do nome do usuário de "Tu" para "Você" (se o app estiver em PT) ou "You" (se em EN).

---

# ◉ PLAN — DIAGNÓSTICO CONSOLIDADO & METAS

### Hipótese de Trabalho
Se normalizarmos o nome do usuário de "Tu" para "Você/You" na UI através do i18n, salvarmos os IDs dos diálogos concluídos no localStorage para renderizar um checkmark na listagem, ativarmos a pronúncia da frase correta pelo TTS no caso de erro no Modo Prática, exibirmos discretamente a transcrição fonológica IPA nos balões de diálogo e sanitizarmos as variáveis nas caixas do formulário de criação com um helper de escape de strings, nós restabeleceremos a autoeficácia e o senso de progresso de Sofia, garantiremos rigor técnico/linguístico ao produto e blindaremos o formulário contra falhas de renderização causadas por aspas.

---

# ◉ D O — AÇÕES CONCRETAS

## 1. AÇÕES IMEDIATAS (Até 1 semana)

### Correção A: Normalizar o Nome do Usuário na UI (Adeus ao "Tu")
* **Local:** [js/dialoghi.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/dialoghi.js#L355) e [js/dialoghi.js#L391](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/dialoghi.js#L391)
* **Ação:** Em vez de renderizar `t.personaggio` diretamente, se o personagem for do usuário (checado com `isUtente`), renderizar a string traduzida através de uma chave i18n para "Você" ou "You".
* **Antes (Leitura):**
  ```javascript
  <div class="dialogo-nome">${t.personaggio}</div>
  ```
* **Depois (Leitura e Prática):**
  ```javascript
  <div class="dialogo-nome">${isUtente ? (I18n.t('dial_user_name') || 'You') : t.personaggio}</div>
  ```
* **Adicionar em [js/i18n.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/i18n.js):**
  ```javascript
  'dial_user_name': { pt: 'Você', en: 'You' },
  ```

### Correção B: Correção da Lógica de Contagem de Turnos do Usuário (Case-Insensitive)
* **Local:** [js/dialoghi.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/dialoghi.js#L461)
* **Antes:**
  ```javascript
  const totalTu = d.turni.filter(t => t.personaggio === 'Tu' || t.personaggio === 'You' || t.personaggio === 'User').length;
  ```
* **Depois (Robusto e Case-Insensitive):**
  ```javascript
  const totalTu = d.turni.filter(t => {
    const nome = (t.personaggio || '').trim().toLowerCase();
    return nome === 'tu' || nome === 'you' || nome === 'user';
  }).length;
  ```

### Correção C: Implementação do Auxílio Fonético IPA nos Balões
* **Local:** [js/dialoghi.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/dialoghi.js#L356) e [js/dialoghi.js#L392]
* **Ação:** Verificar se o campo `t.audio_ipa` existe e está populado nos turnos e, se sim, renderizá-lo logo abaixo da frase em inglês.
* **Depois (HTML adicionado no balão):**
  ```javascript
  ${t.audio_ipa ? `<div class="dialogo-ipa" style="font-size:0.76rem;color:#8a7a60;font-family:monospace;margin-top:0.2rem;background:rgba(0,0,0,0.03);padding:0.1rem 0.3rem;border-radius:4px;display:inline-block">/ ${t.audio_ipa} /</div>` : ''}
  ```

---

## 2. AÇÕES MÉDIAS (1 a 4 semanas)

### Ajuste A: Pronúncia Corretiva Automatizada no Erro do Modo Prática
* **Local:** [js/dialoghi.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/dialoghi.js#L450-L457)
* **Ação:** No bloco `else` do método `checarResposta`, acionar o TTS para pronunciar a resposta correta e dar feedback auditivo imediato para Sofia.
* **Antes:**
  ```javascript
  } else {
    btn.classList.add('errada');
    container.children[turno.resposta_correta].classList.add('correta');
    setTimeout(() => {
      this.avancarTurno();
    }, 2500);
  }
  ```
* **Depois:**
  ```javascript
  } else {
    btn.classList.add('errada');
    container.children[turno.resposta_correta].classList.add('correta');
    // Pronuncia a resposta correta para aprendizado por áudio
    App.pronunciar(turno.alternativas[turno.resposta_correta]);
    setTimeout(() => {
      this.avancarTurno();
    }, 2200); // reduzido levemente para manter fluidez
  }
  ```

### Ajuste B: Replay de Áudio no Histórico do Modo Prática
* **Local:** [js/dialoghi.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/dialoghi.js#L374-L384)
* **Ação:** Adicionar o botão de áudio `🔊` também nas bolhas de histórico de prática para permitir a revisão de escuta durante a sessão ativa.
* **Depois (Histórico da Prática):**
  ```javascript
  <div class="dialogo-turno ${cssClass}">
    <div class="dialogo-bubble">
      <div class="dialogo-nome">${isUtente ? (I18n.t('dial_user_name') || 'You') : t.personaggio}</div>
      <div>${t.frase} <button class="dialogo-audio-btn" onclick="App.pronunciar('${t.frase.replace(/'/g, "\\'")}')">🔊</button></div>
    </div>
  </div>
  ```

### Ajuste C: Criação do Helper de Escape contra Injeção Visual no Formulário
* **Local:** [js/dialoghi.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/dialoghi.js#L492) (fim do objeto) e chamadas em `abrirFormularioCriar`.
* **Ação:** Inserir o método `_esc` para higienizar strings antes de usá-las em atributos como `value="${...}"` no formulário do criador de diálogos.
* **Código do Helper:**
  ```javascript
  _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  ```

---

## 3. AÇÕES ESTRUTURAIS (1 a 3 meses)

### Arquitetura: Gravação de Diálogos Concluídos & Renderização de Checkmarks
* **Ação:**
  1. Carregar a lista de concluídos no startup do módulo (`Dialoghi.carregar()`):
     `this.concluidos = JSON.parse(localStorage.getItem('en_dialoghi_concluidos') || '[]');`
  2. Ao concluir com score mínimo (60%), gravar no array local e salvar em `localStorage` (`en_dialoghi_concluidos`).
  3. No seletor `renderizarSeletor()`, adicionar o checkmark `✅` no card dos diálogos concluídos.
* **Impacto:** Conclui o loop lúdico, dando senso de vitória a Sofia.

---

# ◉ CHECK — MÉTRICAS & ALERTA

### Painel de Controle de Métricas

| Métrica | O que mede | Chave LocalStorage / Indicador | Meta Numérica |
| :--- | :--- | :--- | :--- |
| **Taxa de Retenção Diária** | Se a gamificação ativada por checkmarks traz Sofia de volta amanhã | `en_progresso.ofensiva` | Manutenção do streak > 5 dias |
| **Erros na Contagem de Pontuação** | Ocorrências de erros de NaN ou contagem zerada de acertos | Logs de erros no console ou report manual | Zero erros de contagem |
| **Uso da Pronúncia do Histórico** | Engajamento no botão de áudio de balões anteriores | Cliques no botão de histórico | > 30% dos usuários usam |
| **Taxa de Diálogos Masterizados** | Quantidade de diálogos concluídos com score de vitória | Tamanho do array `en_dialoghi_concluidos` | > 3 diálogos concluídos/user |
| **Sanidade do Formulário** | Falhas na renderização de diálogos criados com aspas | Zero erros de sintaxe ou tela em branco no form | 100% de sucesso de renderização |

### Sinais de Alerta
1. Diálogos customizados salvos pelo formulário não incrementando a XP do usuário devido a bugs na contagem do total de turnos.
2. Console reportando erros de token inesperado ao abrir o formulário de edição de um diálogo cujo título contém aspas.
3. Usuários relatando que não conseguem ver checkmarks nos cards mesmo após passarem de fase com 100% de acertos.
4. Lentidão ou travamentos no TTS ao tentar pronunciar as frases de erro muito rapidamente no Modo Prática.
5. Inconsistência linguística persistente onde a voz sintetiza inglês americano, mas o balão de fala exibe nomes de cidades ou gírias britânicas.

---

# ◉ ACT — PADRONIZAÇÃO

### Fluxo de Padronização (Sucesso)
Se a gravação de diálogos concluídos em localStorage atingir os objetivos de engajamento e as métricas de retenção subirem, padronizar o mesmo sistema de checkmarks e gravação de histórico de conquistas nas abas de **Listen & Repeat** (Imitação) e **Canzoni** (Músicas), utilizando chaves específicas e sincronizadas.

### Plano B (Falha)
Se a gravação direta no localStorage em múltiplas chaves individuais começar a sobrecarregar o espaço disponível (limite de 5MB do navegador), unificar os arrays de progresso (`en_dialoghi_concluidos`, `en_storie_lidas`, etc.) em um único objeto de estado consolidado (`en_progresso_completo`) e rodar um script de limpeza periódica de chaves legadas.

### Próximo Ciclo
No próximo ciclo PDCA, avaliar a possibilidade de integrar a SpeechRecognition API (da aba de Imitação) diretamente nos balões de diálogos do Modo Prática, permitindo que Sofia responda falando ao microfone em vez de apenas clicar na alternativa correta no celular.

---

# 📅 ROADMAP 30 · 60 · 90

### Primeiros 30 Dias: Limpeza, Consistência e Áudio
- [ ] Aplicar a normalização case-insensitive na contagem dos turnos em `js/dialoghi.js`.
- [ ] Alterar o renderizador de nome de usuário para usar `'dial_user_name'` (Você / You) dinamicamente.
- [ ] Habilitar o áudio automático ao errar no Modo Prática com a pronúncia correta.
- [ ] Adicionar os botões de reprodução de áudio `🔊` nas bolhas de histórico de conversação do Modo Prática.
- [ ] Injetar o código IPA (`audio_ipa`) nos balões de diálogo.

### De 30 a 60 Dias: Segurança e Progresso do Seletor
- [ ] Implementar o helper de escape `_esc` no arquivo `js/dialoghi.js` e higienizar os campos do formulário.
- [ ] Implementar a persistência de diálogos concluídos em localStorage com a chave `en_dialoghi_concluidos`.
- [ ] Adicionar o checkmark verde de masterização visual na grid de seleção.

### De 60 a 90 Dias: Gamificação de Maestria e Níveis
- [ ] Criar conquistas de insígnias (Badges) específicas para a aba (ex: "Conversador Iniciante" ao concluir 5 diálogos).
- [ ] Desenvolver filtros avançados de busca por palavras-chave na aba de vocabulário integrado.

---

# ⚖️ DECISÕES CONTROVERSAS

### 1. Pronunciar a frase correta ou manter o silêncio de penalização?
* **Posição A (Ana Paula):** "Devemos pronunciar a frase correta imediatamente para que o cérebro contraste a hipótese errada com o som adequado."
* **Posição B (Diego Ferreira):** "Isso tira a tensão do jogo. Se ele errou, o som deveria ser um buzzer de erro e silêncio para ele se esforçar mais na próxima."
* **Decisão Final:** Adotaremos a posição de Ana Paula. Pedagogia linguística em PWA móvel deve focar na reformulação positiva. O TTS pronunciará a alternativa correta no erro, mas a cor vermelha e o travamento de 2.2 segundos manterão a sinalização visual de que a escolha foi incorreta.

### 2. Substituir todas as chaves "personaggio" no JSON por "personagem"?
* **Posição A (Fernanda Carvalho):** "Manter a palavra italiana 'personaggio' no banco de dados de inglês cria confusão. Deveríamos refatorar tudo."
* **Posição B (Equipe Técnica):** "Refatorar a chave no JSON exigiria reescrever o formulário de criação, a busca avançada e os conversores IA. O custo é alto demais para um campo de backend interno."
* **Decisão Final:** Manter `"personaggio"` no JSON, mas mapear sua exibição no frontend para que o usuário final veja sempre `"Você"` ou o nome correto do personagem de forma limpa.

---

# 💌 CARTA AO DESENVOLVEDOR

Caro colega de desenvolvimento,

Parabéns pela excelente arquitetura de fluxo sequencial na reprodução de turnos do Modo Prática! A animação de `fadeIn` e a revelação em cascata dos balões trazem uma sensação muito polida de chat em tempo real, lembrando ferramentas premium do mercado de EdTech.

Contudo, a aba de Diálogos está sofrendo com algumas "dívidas de herança" do fork italiano que sabotam a experiência de nossa aluna Sofia. O travamento silencioso por 2.5 segundos após um erro é um momento de frustração estéril que atua contra o aprendizado. Pronunciar a resposta certa nesse instante vai transformar a falha em um aprendizado de escuta instantâneo.

Além disso, ver o balão rotulado com o termo italiano "Tu" tira a sensação de que este é um aplicativo profissional focado em inglês americano. Corrigir isso via i18n é rápido e traz um ganho estético enorme. E, por favor, vamos dar a Sofia a recompensa que ela merece: registrar as vitórias dela no localStorage e colocar aquele checkmark verde nos cards que ela já domina! Ela precisa ver que está avançando para continuar estudando todos os dias no metrô de São Paulo.

Obrigado pelo seu compromisso com a excelência! O código está muito limpo e estruturado. Ajustar esses pequenos detalhes vai elevar o aplicativo a outro nível de mercado.

Abraços,
*Equipe de Especialistas do English Autentico*
