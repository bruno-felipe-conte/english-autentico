# Ciclo PDCA — Aba de Templos · English Autentico
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
A análise profunda da aba **Templos (Vocabulário)** revelou discrepâncias significativas entre as diretrizes de design, as especificações pedagógicas e a implementação técnica no código (`js/core.js`, `js/progression.js`, `js/quiz.js` e dados JSON). 

O problema mais grave do ponto de vista do desenvolvimento é o **carregamento síncrono e bloqueante de 51 arquivos JSON no boot da aplicação** (`js/core.js:279-296`). Ao tentar carregar todo o dicionário em paralelo via `Promise.all` em conexões instáveis, o PWA impõe um atraso injustificado na inicialização (bloqueando a UI) para alimentar dados que o usuário só usará individualmente.

No nível de consistência do conteúdo, identificamos um choque grosseiro entre o tema geográfico das lições e a UI renderizada. Os arquivos JSON (`data/templo-*.json`) e o arquivo `data/index.json` definem templos baseados em cidades americanas (Nova York, Los Angeles, Chicago, Nashville), em perfeita harmonia com o motor de TTS configurado em inglês americano (`js/core.js:255`). No entanto, o arquivo `js/core.js` possui um array estático (`TEMPLO_CIDADES`) com nomes de **cidades britânicas** que substitui os dados reais na renderização dos cards. Isso faz com que o Templo 1 (Greetings) mostre "London" no card, mas abra um modal cuja descrição cita "New York e a cidade que nunca dorme" (`js/core.js:207`).

Adicionalmente, o **Templo 51 (Oxford)** foi completamente esquecido na renderização do grid da UI (`js/core.js:609` limitando a renderização a 50 templos), mas é exibido como um conteúdo permanentemente bloqueado ("Requer Nível 51") no menu de Quizzes, gerando confusão pedagógica e visual. O bypass explícito com o código "2012" exposto em um elemento `<details>` diretamente na tela de bloqueio sabota a jornada instrucional do aluno.

### Hipótese Central
"Se removermos a lista estática substituta de cidades no frontend (respeitando os dados reais de cada JSON), implementarmos lazy loading sob demanda para as palavras de cada templo, adicionarmos as descrições em falta (do Templo 11 ao 51), liberarmos o Templo 51 de forma justa no nível de progresso e removermos a senha de bypass exposta, o aplicativo carregará instantaneamente, eliminará a confusão geográfica/dialetal de Sofia, restabelecerá a autoeficácia e garantirá a integridade do modelo pedagógico."

### Raízes dos Problemas (por impacto)
1. **Boot Bloqueante (Performance):** A chamada paralela de 51 fetches no boot consome banda móvel desnecessária e atrasa o carregamento da tela inicial.
2. **Conflito de Cidades (Consistência):** O array `TEMPLO_CIDADES` em `js/core.js` sabota o currículo ao misturar vocabulário/pronúncia americana com bandeiras e nomes de cidades do Reino Unido na UI.
3. **Descrições Vazias (UX/Pedagogia):** A falta de descrições no array `TEMPLO_DESC` para os templos 11 a 51 exibe uma tela estéril e sem contexto de uso para o aluno.
4. **Templo 51 Ocultado (Currículo):** Um loop indexado até 50 em vez de 51 isola a última lição acadêmica do painel do estudante.
5. **Backdoor Exposto (Motivação):** A senha `2012` no modal destrói o filtro de esforço e convida o aluno a pular etapas de estudo.
6. **Desbloqueio em Cascata Desordenado (Carga Cognitiva):** Ao alcançar o Nível 2, a regra atual desbloqueia 14 templos simultaneamente (A2), sobrecarregando o painel de opções do aluno sem sugerir uma trilha ordenada.

### Pontos Fortes a Preservar
- O motor de repetição espaçada **FSRS-4.5** em `js/flashcards.js` é tecnicamente brilhante e moderno.
- A estrutura de dados dos JSONs é limpa, padronizada e enriquecida com transcrições fonéticas IPA para cada palavra.
- A mecânica de Quizzes variados (Morfologia, Escuta, Tradução) oferece uma excelente cobertura de fixação de vocabulário.

---

## VOZES INDIVIDUAIS DOS ESPECIALISTAS

### 👩‍🏫 ANA PAULA (Pedagoga SLA)
> "Como profissional de SLA, meu coração dói ao ver a aba de Templos hoje. O aplicativo finge ter uma trilha pedagógica baseada em níveis (`Progressao.TEMPLO_NIVEL`), mas a sabota em dois pontos críticos. Primeiro, expor um campo de entrada de código para 'burlar' o bloqueio de nível com um botão explícito no card (`js/core.js:768`) é um convite ao autoengano. Sofia, cansada e buscando atalhos, vai digitar `2012` e desbloquear tudo, ativando seu filtro afetivo de ansiedade com 1.000 palavras novas que ela não tem base para absorver.
>
> Segundo, o teste pedagógico em `DOCUMENTACAO/TESTING.md` especifica claramente que o Templo II deveria estar bloqueado até que o Templo I seja concluído. Mas no código real de `js/progression.js:192`, o desbloqueio baseia-se unicamente em atingir o nível geral do PWA. Isso faz com que, ao chegar no nível 2, o aluno seja bombardeado com catorze templos desbloqueados de uma vez só! Sem bloqueios sequenciais, o aprendizado vira uma salada ruidosa. E para piorar, o Templo 51 (Oxford) contém o vocabulário acadêmico avançado ('peer-reviewed', 'hypothesis') que fecharia com chave de ouro a trilha CEFR, mas ele foi apagado da UI principal por desatenção no loop de render!"

### 🎨 ROBERTO NASCIMENTO (LX Designer EdTech)
> "Olha, a primeira regra do design de mobile learning é: não faça o usuário esperar. Executar 51 requests assíncronos em paralelo no startup (`js/core.js:279`) é pedir para a tela travar em redes 3G instáveis do metrô paulista. Se a internet falhar ou cair no meio, o cache quebra e o aluno vê cards em branco. Temos que carregar apenas o índice básico no boot (que diz quais templos existem, seus títulos, ícones e progresso geral) e deixar o fetch de palavras detalhadas apenas para quando o aluno clicar no card! Isso é lazy loading básico, galera.
>
> Visualmente, a experiência é frustrante. Eu vejo um card bonito que diz 'London'. Clico animado e abro um modal de 'Greetings' que me diz 'New York is where everything begins... The city that never sleeps...' O que é isso? Onde eu estou? A incoerência mata a sensação de produto premium. E quando eu passo do Templo 10, os cards abrem vazios, sem qualquer parágrafo de introdução! A tela fica fria, sem alma, sem os ganchos visuais e narrativos que fazem o aluno querer se conectar com aquela cultura."

### 🔬 FERNANDA CARVALHO (Linguista PhD)
> "Esta inconsistência dialetal e de metadados é inaceitável em um projeto desse nível. Pedagogicamente, o app está configurado com `speechSynthesis` configurado explicitamente para voz americana (`en-US` via `_getVozAmericana()`). O vocabulário ensina termos tipicamente americanos, como 'subway' (Templo 1) e 'apartment' (Templo 2), enquanto a UI rotula as lições como 'London' e 'Manchester'. Se estamos exibindo cidades do Reino Unido, deveríamos ensinar 'underground/tube' e 'flat'. Como o currículo é de inglês americano, a UI DEVE refletir as cidades americanas reais do JSON ('New York', 'Los Angeles'). O código está substituindo arbitrariamente a verdade dos dados JSONs pelo array estático `TEMPLO_CIDADES`.
>
> Além disso, no Templo 51, vemos chaves obsoletas do projeto original de italiano, como `"italiano": "abstract"`. Embora o código faça bypass usando `palavra.word || palavra.italiano`, manter a chave depreciada `"italiano"` em um banco de dados de inglês confunde qualquer auditor ou desenvolvedor que precise manter o sistema."

### 🧠 MARCUS OLIVEIRA (Psicólogo Educacional)
> "Do ponto de vista da carga cognitiva (Sweller, 1988), a interface atual gera uma sobrecarga desnecessária na memória de trabalho. No momento em que o aluno atinge o nível 2, a avalanche de 14 novos templos liberados de uma vez atua como um fator estressor. O aluno perde o senso de autoeficácia e entra em paralisia de escolha (choice overload).
>
> A ausência das descrições do Templo 11 ao 50 enfraquece o 'gancho de relevância' necessário para a aprendizagem de adultos. O adulto precisa saber *por que* está aprendendo aquele bloco de palavras. A falta de contexto desmotiva o estudante a entrar no templo. Precisamos espalhar pequenos textos motivacionais e instrutivos nessas descrições pendentes para ativar o filtro afetivo de forma positiva."

### 📱 SOFIA MENDES (Aluna Real — Persona)
> "Eu... eu achei que meu celular estava quebrado. Às vezes, quando abro o aplicativo na estação da Sé, ele fica pensando um tempão antes de mostrar a tela inicial. Teve um dia que eu cliquei no card escrito 'London' e, quando o balão abriu, ele estava falando sobre Nova York! Eu fiquei sem saber se o áudio que eu ia escutar era britânico ou americano, porque o meu objetivo é viajar para os EUA a trabalho.
>
> Outra coisa: eu estava toda feliz porque passei de nível, mas de repente apareceram mais de 10 templos novos desbloqueados ao mesmo tempo. Eu me senti muito burra porque não sabia por qual começar. Clicava nos templos mais avançados para ver o que eram, e a janelinha vinha quase em branco, sem explicação nenhuma, só com botões. Fiquei com medo de errar e fechei o aplicativo. E aquela caixa de 'Código de Acesso' me tenta toda hora. Dá vontade de digitar a senha que está ali e liberar tudo, mas no fundo sei que não vou aprender nada desse jeito..."

### 🎮 DIEGO FERREIRA (Game Designer)
> "Nosso core loop está incompleto e sem fricção lúdica. O jogador ganha XP, sobe de nível e as coisas simplesmente abrem de forma passiva. Não há senso de conquista! Além disso, a senha de bypass exposta no modal do templo bloqueado (`2012`) é como deixar o código de trapaça (cheat code) impresso na capa do jogo. Isso tira totalmente a graça da progressão.
>
> O Templo 51 ('Oxford University') é como um easter egg que quebrou. Ele está oculto na tela de seleção principal porque a grid só varre até 50 cards, mas no quiz ele aparece como um chefe secreto imbatível que requer 'Nível 51' (um nível que não existe de forma realista na curva de XP). Precisamos trazer o Templo 51 para a grid de forma visível, com regras de desbloqueio que valorizem o progresso real, como concluir os templos anteriores ou passar no quiz de proficiência."

---

# ◉ OS 3 DEBATES CRUZADOS

### DEBATE 1 — ANA PAULA × DIEGO
*Pedagogia vs. Gamificação*

- **Ana Paula:** "Diego, sua obsessão por loops lúdicos e celebrações não pode justificar o bombardeio de XP. O aluno precisa entender as palavras no contexto de uso real. O modelo atual é passivo e foca apenas no reconhecimento visual nos Quizzes."
- **Diego:** "Concordo que o loop atual de 'Estudo -> Quiz' é chato, Ana. Mas se o jogo for árido demais, o aluno abandona no segundo dia. Se a gente não comemorar o domínio de um templo com uma celebração forte (por exemplo, um badge ou um modal de Templo Masterizado), o aluno não sente progresso."
- **Insight Comum:** Ambos concordam que a progressão por nível bruto é fraca. O ideal seria que o progresso lúdico estivesse atrelado ao domínio pedagógico das palavras (usando a métrica do FSRS), e não apenas a ganhar XP fazendo qualquer atividade aleatória.
- **Proposta Conjunta:** Implementar um "Boss Quiz" de domínio do Templo. Para liberar oficialmente o próximo nível de Templos (ou para marcar o templo como 'Masterizado' de forma gloriosa com badge visível), o usuário deve fazer um quiz com pontuação mínima de 80% e ter pelo menos 50% das palavras de cada templo ativas no FSRS (stability > 7 dias).

---

### DEBATE 2 — MARCUS × SOFIA
*Teoria Cognitiva vs. Experiência Vivida*

- **Marcus:** "Sofia, a teoria de Sweller previa exatamente o que você sentiu. Ao ver 14 opções de uma vez no nível 2, sua memória de trabalho entrou em pane. A interface deveria limitar visualmente a exibição das opções."
- **Sofia:** "Sim! Eu só queria saber qual era a ordem lógica. Se o app me dissesse 'Recomendado: Templo 11', eu não teria me sentido tão perdida. E sobre as descrições vazias, elas me deixavam sem rumo. Eu preciso saber se o templo de 'Shopping' é para comprar comida ou roupas antes de começar."
- **Insight Comum:** A teoria e a prática confirmam que a liberdade irrestrita é inimiga da consistência cognitiva em estudantes iniciantes. Limitar as escolhas ou dar caminhos recomendados reconstrói a sensação de autoeficácia.
- **Proposta Conjunta:** Adicionar uma tag visual de "Recomendado" ou "Próximo Passo" no grid de Templos com base no progresso das palavras dominadas (ou seja, sugerir o próximo templo sequencial mesmo que múltiplos templos estejam desbloqueados). Preencher todas as descrições em falta (11 ao 51) focando em ganchos práticos de uso real na vida de um adulto (ex: reuniões, viagens, compras).

---

### DEBATE 3 — FERNANDA × ROBERTO
*Rigor Linguístico vs. Fluidez de UX*

- **Fernanda:** "Roberto, exibir 'London' no card e ensinar inglês americano com pronúncia de Nova York é um crime linguístico. Temos que remover a substituição estática das cidades imediatamente e carregar os dados geográficos reais do JSON."
- **Roberto:** "Eu entendo seu lado acadêmico, Fernanda, mas carregar todos os JSONs no boot para ler as cidades dos arquivos individuais mata o tempo de resposta da página (UX). Se removermos o array estático do core.js, a grid vai ficar em branco enquanto faz o fetch de 51 arquivos!"
- **Insight Comum:** A fidelidade do dado (US cities) é prioritária, mas a velocidade da interface é sagrada. A solução ideal não é carregar 51 arquivos individuais no boot, mas sim utilizar o arquivo `data/index.json` (que é muito pequeno e serve como catálogo) carregando-o de forma centralizada e instantânea no startup, desativando a lista estática e obsoleta do `core.js`.
- **Proposta Conjunta:** Consolidar e atualizar o arquivo `data/index.json` para que ele contenha as cidades reais e corretas (americanas) de todos os 51 templos, além de seus níveis correspondentes. No boot, o aplicativo carrega apenas o `data/index.json` (1 request) para desenhar a grid de templos perfeitamente. O arquivo individual `templo-N.json` só será lido quando o usuário abrir o modal ou iniciar o flashcard correspondente.

---

# ◉ PLAN — DIAGNÓSTICO CONSOLIDADO & METAS

### Hipótese de Trabalho
Se implementarmos a renderização baseada no arquivo leve `data/index.json` (eliminando o boot bloqueante de 51 fetches e o array de cidades britânicas substitutas em `js/core.js`), exibirmos o Templo 51 corrigindo o loop do grid, preenchermos as descrições pedagógicas em falta do Templo 11 ao 51 e ocultarmos o backdoor de bypass visual, nós reduziremos o tempo de carregamento da interface em até 80%, daremos integridade geográfica e cultural ao currículo do inglês americano, e daremos clareza de rumo ao aluno de acordo com o CEFR.

---

# ◉ DO — AÇÕES CONCRETAS

## 1. AÇÕES IMEDIATAS (Até 1 semana)

### Correção A: Exibição do Templo 51 (Oxford) no Grid
* **Local:** [js/core.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/core.js#L609)
* **Antes:**
  ```javascript
  for (let i = 1; i <= 50; i++) {
  ```
* **Depois:**
  ```javascript
  for (let i = 1; i <= 51; i++) {
  ```

### Correção B: Mapeamento de Nível do Templo 51 em Progressao
* **Local:** [js/progression.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/progression.js#L98-L113) e [js/core.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/core.js#L183-L198)
* **Ação:** Adicionar o Templo 51 ao mapeamento de desbloqueio associado ao nível 22 (o último nível mapeado na tabela `NIVEL_XP`).
* **Antes:**
  ```javascript
  // No entry for 51 in Progressao.TEMPLO_NIVEL or App.TEMPLO_NIVEL_MINIMO
  ```
* **Depois (em ambos os arquivos):**
  ```javascript
  // Adicionar chave 51 mapeada para nível 22
  51:22
  ```

### Correção C: Correção da exibição do "Unlock Code" (Backdoor pedagógico)
* **Local:** [js/core.js](file:///C:/Users/bruno/Documents/english-learning-app-pro/js/core.js#L767-L776)
* **Ação:** Ocultar o elemento `<details>` com o botão de bypass visual para evitar que a usuária pule a progressão acadêmica de forma acidental. O método `App.pedirSenhaTemplo` pode continuar acessível no console do desenvolvedor para auditoria se necessário, mas não exposto na tela final de Sofia.
* **Antes:**
  ```javascript
  `
    <details class="tm-unlock-area">
      <summary>${I18n.t('tm_access_code')}</summary>
      <div class="tm-unlock-form">
        <input id="tm-code-input" type="password" placeholder="${I18n.t('tm_code_placeholder')}" class="tm-code-input"
          onkeydown="if(event.key==='Enter')App.tentarDesbloquear(${i})">
        <button onclick="App.tentarDesbloquear(${i})" class="tm-btn-unlock">${I18n.t('tm_unlock')}</button>
      </div>
    </details>
  `
  ```
* **Depois:**
  ```javascript
  // Remove-se a seção visual do details do HTML do modal de bloqueio
  `<div class="tm-lock-help">${I18n.t('templo_requer_ajuda') || 'Estude para alcançar este nível!'}</div>`
  ```

---

## 2. AÇÕES MÉDIAS (1 a 4 semanas)

### Ajuste A: Carga de Cidades americana correta (Desativar `TEMPLO_CIDADES` em favor dos dados do JSON)
* **Ação:** Alterar `renderizarTemplos` e `abrirModalTemplo` para exibir o nome da cidade original cadastrada na base de dados (`data.cidade`) em vez de substituir pelo array estático do arquivo JS (`this.TEMPLO_CIDADES[i]`).
* **Impacto:** Elimina o conflito geográfico (exemplo: o card de Nova York deixará de exibir "London" e exibirá "New York" de forma consistente com a descrição).

### Ajuste B: Redação e inserção das descrições pedagógicas em falta (T11 ao T51)
* **Ação:** Como os arquivos JSON não possuem campos de descrição e `js/core.js` centraliza o array `TEMPLO_DESC`, expandir o array `TEMPLO_DESC` de 10 para 51 entradas, escrevendo introduções envolventes e voltadas a cenários reais em inglês.
* **Exemplos de Conteúdos a Inserir:**
  * **T11 (Philadelphia - Shopping):** *"Philadelphia is history and commerce. Master the language of trade: retail shops, payments, discounts, and negotiating sizes. Get ready to shop with confidence."*
  * **T18 (Oxford - Academic/Work):** *"Oxford is the pinnacle of academic pursuit. Acquire the vocabulary of research, articles, methodologies, and scholarly debates. Elevate your formal English to the next level."*

### Ajuste C: Indicação Visual de Templo Recomendado ("Próximo Passo")
* **Ação:** Inserir um indicador dinâmico ("Recomendado") no primeiro templo desbloqueado que possua progresso de masterização inferior a 80%.
* **Impacto:** Resolve o problema de paralisia de escolha vivido por Sofia no nível 2 ao ver 14 templos abertos ao mesmo tempo.

---

## 3. AÇÕES ESTRUTURAIS (1 a 3 meses)

### Arquitetura: Lazy Loading de Templos com base no `index.json`
* **Ação:**
  1. Reescrever o método `carregarDados()` em `js/core.js` para realizar apenas 1 fetch inicial no arquivo `data/index.json` (que armazena a versão resumida de todos os templos).
  2. Implementar a renderização dos cards na grid e nas telas de seleção de Quiz usando os dados de `data/index.json`.
  3. Mudar o carregamento assíncrono dos arquivos detalhados `data/templo-N.json` para ser sob demanda. O arquivo do templo correspondente será carregado via `fetch` apenas no momento em que o aluno clicar para abrir o modal de detalhes do templo (`App.abrirModalTemplo`), iniciar o Quiz (`Quiz.iniciar`) ou carregar a arena de flashcards (`Flashcards.init`).
* **Risco de Implementação:** Baixo a Médio. Exige sincronização com o array global de cache de pesquisa `App.estado.vocabCache` (o motor de busca de vocabulário global precisará carregar os templos desbloqueados em segundo plano ou ler de um índice pré-gerado).

---

# ◉ CHECK — MÉTRICAS & ALERTA

### Painel de Controle de Métricas

| Métrica | O que mede | Chave LocalStorage / Indicador | Meta Numérica |
| :--- | :--- | :--- | :--- |
| **Tempo de Boot** | Duração do startup até a renderização do grid | `console.time('boot')` | < 300ms (em redes 3G simuladas) |
| **Erros de Carregamento** | Falhas na carga de templos devido a quedas de rede | Contador de catches em fetch de templo | 0 erros persistentes |
| **Engajamento Acadêmico** | Taxa de conclusão do Templo 51 | `en_progresso.templos_concluidos` inclui 51 | > 15% dos usuários ativos |
| **Autoeficácia de Foco** | Usuários que seguem o fluxo sequencial recomendado | Templos concluídos em sequência (1, 2, 3...) | > 70% dos estudantes |
| **Adesão ao Progresso** | Tentativas de burlar usando backdoor do código de acesso | Log de uso de bypass (clicks no console) | Próximo a 0% |

### Sinais de Alerta
1. Atraso no boot superior a 2 segundos na primeira inicialização móvel do aplicativo.
2. Reclamações de alunos da Persona Sofia relatando perda de orientação sobre qual templo estudar ao passar do nível 1 para o nível 2.
3. cards renderizando a cidade de forma desalinhada com a descrição interna do modal (mismatch geográfico persistente).
4. O Templo 51 gerando erro no console de `undefined` ou `NaN` ao tentar carregar seus dados no módulo de Quizzes.
5. Inconsistência de pronúncia (ex: aluno ouve a pronúncia americana de uma palavra, mas a UI indica uma cidade de sotaque britânico estrito).

---

# ◉ ACT — PADRONIZAÇÃO

### Fluxo de Padronização (Sucesso)
Se as métricas de tempo de boot caírem abaixo de 300ms e a taxa de consistência de dados subir para 100%, adotar o modelo de carregamento sob demanda baseado em arquivo catálogo de índice (`index.json`) para todos os demais módulos do PWA que possuam bancos de dados segmentados (como as Histórias e as Músicas).

### Plano B (Falha)
Se a busca global de vocabulário quebrar devido ao lazy loading dos arquivos de templos ainda não abertos pelo usuário, criar um arquivo consolidado leve de vocabulário apenas com chaves de busca (`id`, `word`, `translation`, `templo_num`) chamado `data/vocab_index.json` (aprox. 40KB) e carregá-lo no boot. Assim, a busca funciona globalmente sem precisar ler os 51 JSONs de lições completas de uma vez.

### Próximo Ciclo
No próximo ciclo PDCA, avaliar a eficácia do algoritmo de repetição espaçada FSRS-4.5 integrado ao progresso dos Templos, garantindo que o intervalo de revisão das palavras dominadas impeça a sobreposição excessiva de cards acumulados no painel de "Revisão Geral".

---

# 📅 ROADMAP 30 · 60 · 90

### Primeiros 30 Dias: Consistência & Estabilidade
- [x] Corrigir o loop do grid para incluir o Templo 51 (Oxford) de 1 a 51.
- [x] Cadastrar o Templo 51 no mapeamento de níveis em `Progressao.TEMPLO_NIVEL` e `App.TEMPLO_NIVEL_MINIMO`.
- [x] Remover o override do array estático `TEMPLO_CIDADES` em `js/core.js` para passar a renderizar as cidades americanas legítimas dos dados JSON.
- [x] Escrever e integrar no array `TEMPLO_DESC` as descrições dos templos 11 a 51.
- [x] Ocultar a caixa de bypass com senha visual do modal de bloqueio.

### De 30 a 60 Dias: Otimização de Performance
- [ ] Implementar a carga isolada do catálogo do aplicativo baseada em `data/index.json`.
- [ ] Modificar o motor de dados para realizar lazy loading dos arquivos `templo-*.json` em tempo de execução ao clicar no card ou carregar os exercícios.
- [ ] Criar a tag visual de recomendação de trilha instrucional para auxiliar a orientação do usuário.

### De 60 a 90 Dias: Recursos de Engajamento e Gamificação
- [ ] Desenvolver o "Quiz de Proficiência do Templo" (Boss Fight) para coroar o encerramento de um templo concluído.
- [ ] Injetar animações CSS baseadas na biblioteca de transições nativas para celebrar quando o usuário atingir 100% de masterização em um templo.

---

# ⚖️ DECISÕES CONTROVERSAS

### 1. Manter ou Traduzir a Chave `"italiano"` nos Arquivos JSON?
* **Posição A (Fernanda Carvalho):** "Devemos rodar um script python e substituir todas as chaves `"italiano"` por `"word"` ou `"ingles"`. Manter o nome do idioma antigo do fork é amador e induz a erros de manutenção."
* **Posição B (Desenvolvedor Técnico):** "Mudar a chave `"italiano"` quebrará a compatibilidade com múltiplos módulos estruturais herdados (como o motor de flashcards e a busca avançada). O esforço de refatoração geral é muito alto e arriscado para uma alteração meramente estética no JSON."
* **Decisão Final:** Manter as chaves `"italiano"` nos arquivos JSON em curto prazo devido à alta acoplabilidade técnica, documentando esse fato explicitamente no cabeçalho do projeto e nos guias de onboarding de novos desenvolvedores como uma 'dívida técnica de compatibilidade'.

### 2. A Senha de Bypass do Desenvolvedor (`2012`)
* **Posição A (Diego Ferreira):** "A caixa de entrada de código deve ser excluída. Ela estraga a graça do jogo e o senso de progresso acadêmico."
* **Posição B (Roberto Nascimento):** "Os testadores de QA precisam de uma forma ágil de desbloquear os templos avançados no celular de testes sem precisar jogar por meses até o nível 20."
* **Decisão Final:** Retirar o formulário do código de acesso da UI voltada para o usuário final (Sofia), mas manter a escuta da função `App.pedirSenhaTemplo(num)` no escopo global para que o testador de QA possa executá-la digitando o comando diretamente no console do navegador (DevTools) quando estiver testando no ambiente local.

---

# 💌 CARTA AO DESENVOLVEDOR

Caro colega de desenvolvimento,

Primeiramente, parabéns pelo trabalho duro! O PWA do *English Autentico* possui uma base técnica incrivelmente sólida. A integração do algoritmo moderno de repetição espaçada **FSRS-4.5** na aba de flashcards está no estado da arte de EdTechs mundiais, e a organização do vocabulário em 51 templos temáticos é uma ideia com um potencial de engajamento fantástico.

No entanto, há algumas pontas soltas na aba de Templos que estão sabotando o seu esforço pedagógico e a experiência da nossa aluna típica, a Sofia (contadora, 32 anos, estudando exausta no metrô).

O bug do carregamento simultâneo de 51 JSONs no boot é um gargalo invisível que faz o aplicativo parecer lento em conexões reais de telefonia celular. Além disso, a substituição estática das cidades americanas por nomes britânicos na interface gera um choque de dados confuso: o card principal diz 'London', mas ao entrar o aluno lê que está estudando em 'New York'.

Nossa recomendação mais urgente é realizar duas correções muito simples na próxima meia hora:
1. Altere a linha 609 de `js/core.js` para varrer a grid até o templo **51**, resgatando o templo de Oxford da invisibilidade.
2. Desative a linha que substitui as cidades pelo array estático `TEMPLO_CIDADES` em `js/core.js`, permitindo que os cards exibam as cidades corretas do JSON.

A Sofia agradece profundamente a atenção a esses detalhes. Eles transformam um aplicativo promissor em um produto com qualidade premium de mercado.

Força no código e conte conosco!

*Equipe de Especialistas do English Autentico*
