Antes de escrever qualquer código para a feature ou mudança descrita em $ARGUMENTS, execute obrigatoriamente o protocolo de Verificação de Ciclo Completo abaixo. Não pule etapas. Não escreva nenhuma linha de código antes de responder todas as perguntas.

---

## PROTOCOLO: VERIFICAÇÃO DE CICLO COMPLETO

O objetivo é evitar "write-only thinking" — código que parece correto no ponto de escrita mas quebra nas fronteiras de tempo, módulo, estado e ciclo.

Para cada dado escrito, função adicionada ou estado modificado pela mudança proposta, responda:

---

### 🔁 FRONTEIRA DE LEITURA
**"Quem lê o que esse código escreve?"**
- Se salva em localStorage: qual módulo lê essa chave? Com qual formato esperado?
- Se grava em estado (`this.X = Y`): quais funções leem `this.X`? Em qual contexto?
- Se cria novos IDs: há código que faz `find/filter` por esse ID? O formato bate?

→ Liste cada ponto de leitura e confirme que o schema de escrita é compatível com o schema de leitura.

---

### ⏱️ FRONTEIRA DE TEMPO
**"Quando esse código vai rodar mais de uma vez?"**
- Existe um event listener (i18n:changed, resize, visibilitychange) que chama essa função?
- Existe um setTimeout/setInterval que pode disparar após estado mudar?
- O usuário pode navegar para fora e voltar (re-render da seção)?
- Se a função tem side-effects (XP, streak, histórico, localStorage write): ela é idempotente? Se não for, está guardada por uma flag?

→ Identifique todos os caminhos de re-entrada e confirme que side-effects não se acumulam.

---

### 🔀 FRONTEIRA DE ESTADO
**"A ordem das operações está correta?"**
- Se lê e depois modifica o mesmo array/objeto: a leitura captura o valor antes ou depois da modificação?
- Se remove um item e depois conta quantos restam: a contagem está antes ou depois do remove?
- Se depende de estado inicializado por outro método: esse método já rodou quando este é chamado?

→ Trace a sequência de mutações linha a linha e confirme que nenhuma operação invalida dados que outra operação ainda precisa ler.

---

### 🧩 FRONTEIRA DE MÓDULO
**"O dado atravessa alguma fronteira entre módulos?"**
- Se módulo A escreve e módulo B lê: os field names são idênticos? (ex: `italiano` vs `word` vs `ingles`)
- Se cria objetos que serão consumidos por uma UI existente: a UI espera quais campos? Todos estão presentes?
- Se usa null-check em um lugar mas não em outro: há cenário onde o elemento DOM não existe?

→ Leia o código do consumidor antes de definir o schema do produtor. Nunca assuma — verifique.

---

### 🔄 FRONTEIRA DE CICLO
**"O que acontece quando o usuário completa o loop?"**
- Quando acerta: o estado de erro/pendência é removido?
- Quando erra: o estado correto é salvo para revisão futura?
- Quando revisita (segunda, terceira vez): o estado anterior foi limpo ou acumula?
- Quando sai no meio: o estado parcial é recuperável ou corrompe o próximo início?

→ Simule mentalmente: usuário faz a ação → sai → volta → faz de novo. O sistema está correto nas 3 tentativas?

---

### ✅ FORMATO DE RESPOSTA OBRIGATÓRIO

Antes do código, apresente uma tabela com uma linha por fronteira:

| Fronteira | Risco identificado | Decisão tomada |
|-----------|-------------------|----------------|
| Leitura   | ... | ... |
| Tempo     | ... | ... |
| Estado    | ... | ... |
| Módulo    | ... | ... |
| Ciclo     | ... | ... |

Se alguma fronteira tiver risco "nenhum", explique brevemente por quê (não deixe vazio — vazio significa que não foi verificado).

Só então escreva o código.
