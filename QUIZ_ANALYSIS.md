# Análise Técnica — Aba Quiz (quiz.js — 754 linhas)

## Perspectiva: Desenvolvedor Frontend Sênior especializado em PWAs Educacionais

---

## 🔴 PROBLEMAS TÉCNICOS (Issues Críticos)

### 1. **XSS via `innerHTML` — CRÍTICO**
**Linha 365–387:** `renderizarSeletor()` usa `btn.innerHTML` com dados vindos de `App.estado.templosData[i].nome` e strings de tradução do `I18n.t()`. Se qualquer nome de templo contiver `<script>` ou `<img onerror=...>`, o código injeta HTML arbitrário no DOM.

```js
btn.innerHTML = desbloqueado
  ? `🏛️ ${i}. ${nome}<br><small>${nivel}</small>`  // ← XSS aqui
  : `🔒 ${i}. ${nome}<br><small>${I18n.t('quiz_nivel_requerido')...}</small>`; // ← e aqui
```

**Risco:** Em contexto educacional (crianças/adolescentes), um atacante pode manipular dados de `localStorage` ou `quizzes.json` comprometido para executar código malicioso.

**Mitigação:** Usar `textContent` + `createElement`, ou sanitizar com DOMPurify.

---

### 2. **Bug de XP Duplicado no `sessionStorage` — CRÍTICO**
**Linha 24–35:** Ao restaurar sessão, `Object.assign(this, salvo)` restaura `xpTotal` e `pontuacao`. Quando o usuário completa o quiz, `mostrarResultado()` chama `Progressao.ganhar(this.xpTotal)`. Mas se o usuário recarregar a página ANTES de completar e a sessão for restaurada, o `xpTotal` já contém XP de respostas anteriores. Se o usuário responde novamente as mesmas perguntas (porque `perguntaAtual` foi restaurado no meio), o XP é concedido novamente.

**Cenário real:** Usuário responde 5 perguntas → ganha 100XP → fecha aba → reabre → restaura sessão na pergunta 6 → completa → ganha +100XP pelo mesmo conjunto. Total: 200XP por um quiz de 10 perguntas.

---

### 3. **Ausência total de Error Boundaries**
Não há nenhum mecanismo de tratamento de erros estrutural. Se qualquer uma dessas falhas ocorrer:
- `App.estado.quizData` undefined/null
- `App.estado.templosData[temploNum]` null
- `I18n.t()` retornando undefined
- `JSON.parse` falhando em dados corrompidos

...o aplicativo quebra silenciosamente ou lança exceção não tratada, deixando o usuário com tela branca sem feedback.

---

### 4. **State Management — Objeto mutável global sem reatividade**
`const Quiz = { ... }` é um singleton com estado mutável diretamente (`this.xpTotal = 0`, `this.perguntas = []`). Não há:
- Imutabilidade (estado pode ser corrompido por qualquer módulo)
- Observer pattern / reatividade
- Separação entre estado de UI e domínio
- Histórico de estado (impossível implementar "undo")

Qualquer módulo pode fazer `Quiz.xpTotal = 99999` e quebrar tudo.

---

### 5. **Sem Lazy Loading de dados do Quiz**
O `quizzes.json` (499 linhas, ~17KB) e `quiz_data.js` (89 linhas) são carregados integralmente no startup do app, mesmo que o usuário nunca acesse o quiz. Para um PWA educacional (foco mobile), isso consome banda e memória desnecessariamente.

---

### 6. **Sem Timer / Feedback de tempo**
Para um quiz educacional, o tempo é uma métrica pedagógica crucial. Não há:
- Tempo por pergunta
- Tempo total do quiz
- Visualização de tempo restante
- Penalidade/bônus por velocidade
- Dados de tempo registrados no histórico

---

### 7. **Sem Empty States**
Quando `this.perguntas.length === 0`, o código apenas chama `App.notificar()` mas:
- Não exibe nenhum feedback visual ao usuário na área do quiz
- Não sugere alternativas (ex: "Tente outro templo")
- Não registra o evento para analytics
- O container do quiz fica em estado indefinido

---

### 8. **Sem testes automatizados**
Zero cobertura de testes. Um sistema com 754 linhas, 6 modos de quiz diferentes, lógica de combo, XP multiplicador, e geração dinâmica de perguntas não tem nenhum teste unitário ou de integração. Impossível refatorar com segurança.

---

### 9. **Sem ARIA / Acessibilidade**
Nenhum atributo ARIA em nenhum elemento interativo:
- Botões de opção não têm `role="radio"` ou `aria-checked`
- Barra de progresso não tem `role="progressbar"` com `aria-valuenow`
- Feedback de resposta correta/errada não é anunciado por leitores de tela
- Não há navegação por teclado (Tab/Enter) gerenciada
- `focus` não é gerenciado após mudanças de pergunta

**Impacto:** PWA educacional que não atende WCAG 2.1 é inacessível e pode violar leis de acessibilidade.

---

### 10. **i18n incompleto e frágil**
- Textos hardcoded em português: `I18n.t('quiz_perfeito')`, `I18n.t('quiz_muito_bom')` — mas e se a chave não existir? Retorna `undefined` ou a própria chave.
- Sem fallback chain (ex: `pt-BR` → `pt` → `en`)
- Sem detecção automática de idioma do navegador
- Formatação de datas hardcoded (sem `Intl.DateTimeFormat`)
- Gênero gramatical não considerado em traduções (ex: "conquistas" vs "conquistado")

---

### 11. **Sem Componentização**
Todo o código é um único objeto monolítico de 754 linhas. Não há:
- Componentes reutilizáveis (botão de opção, barra de progresso, card de resultado)
- Separação de responsabilidades (renderização vs lógica vs dados)
- Template system
- Possibilidade de reutilizar o quiz em outro contexto

---

### 12. **Bug de `indiceAtual` indefinido após `iniciarMisto()`**
**Linha 74–106:** `iniciarMisto()` não define `this._indiceAtual = 0` no início, mas outros métodos definem. Se o usuário inicia um quiz misto após ter feito outro, `_indiceAtual` mantém o valor anterior, causando comportamento incorreto no listener `i18n:changed` (linha 753).

---

### 13. **Duplicação de lógica de inicialização de UI**
Os métodos `iniciar()`, `iniciarMisto()`, `iniciarMorfologia()`, `iniciarConjugacao()`, `iniciarListening()`, `iniciarGramatica()` todos repetem o mesmo bloco de `getElementById` + `style.display` (linhas 63–68, 98–103, 500–505, 568–573, 640–642, 688–690). Isso é um code smell grave (duplicação ×6).

---

### 14. **`Math.random()` para IDs em `_gerarGramatica()`**
**Linha 706:** `id: \`gram_${Math.random().toString(36).substr(2, 9)}\`` gera IDs não-determinísticos. Em contexto de debugging ou deduplicação de histórico, isso causa problemas. Deveria usar um contador incremental ou UUID v4.

---

### 15. **Sem offline-first para dados do Quiz**
Os dados de `quizzes.json` e `quiz_data.js` não são cacheados pelo Service Worker. Se o usuário perder conexão após carregar o app, o quiz pode falhar se os dados não estiverem em cache.

---

## 🟢 OPORTUNIDADES DE MELHORIA

### 1. **Implementar Sanitização de Dados com DOMPurify**
Substituir todos os `innerHTML` por `textContent` ou usar DOMPurify como camada de proteção. Criar uma função utilitária `safeHTML(str)` centralizada.

---

### 2. **Adotar uma Máquina de Estados (State Machine)**
Implementar XState ou uma FSM simples para o quiz:
```
IDLE → LOADING → QUESTION → ANSWERED → EXPLANATION → NEXT → RESULT
```
Isso elimina bugs de transição (ex: clicar em "próximo" durante animação) e torna o fluxo testável.

---

### 3. **Implementar Lazy Loading dinâmico**
```js
async loadQuizData(temploNum) {
  const module = await import(`./data/quiz_templo_${temploNum}.js`);
  return module.default;
}
```
Carregar dados do quiz apenas quando o usuário seleciona um templo.

---

### 4. **Adicionar Error Boundary global e por módulo**
```js
window.addEventListener('error', (e) => {
  if (e.message.includes('Quiz')) {
    document.getElementById('quiz-error').classList.add('visible');
    // Fallback para quiz estático
  }
});
```

---

### 5. **Implementar Timer com `requestAnimationFrame`**
Adicionar cronômetro por pergunta e total, com dados salvos no histórico para análise pedagógica posterior.

---

### 6. **Criar Empty States informativos**
Quando não há perguntas suficientes:
- Exibir ilustração amigável
- Sugerir templos alternativos
- Oferecer "modo livre" com palavras disponíveis
- Botão "Solicitar mais conteúdo"

---

### 7. **Adicionar testes com Jest/Vitest**
- Testes unitários para `_embaralhar()`, `checarResposta()`, lógica de combo
- Testes de integração para fluxo completo do quiz
- Testes de regressão para o bug de XP duplicado
- Mock de `App.estado`, `sessionStorage`, `I18n`

---

### 8. **Implementar ARIA completa**
```html
<div role="radiogroup" aria-labelledby="quiz-pergunta">
  <button role="radio" aria-checked="false" aria-label="Opção: ...">
  </button>
</div>
<div role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="10">
```
+ `aria-live="polite"` para feedback de resposta.

---

### 9. **Melhorar i18n com fallback e interpolação segura**
```js
I18n.t(key, fallback = 'pt-BR', params = {}) {
  const dict = this.dicts[fallback] || this.dicts['en'];
  let str = dict[key] || this.dicts['en'][key] || key;
  Object.entries(params).forEach(([k, v]) => {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  });
  return str;
}
```

---

### 10. **Componentizar em Web Components ou framework**
Separar em:
- `<quiz-selector>` — seleção de templo
- `<quiz-question>` — pergunta + opções
- `<quiz-progress>` — barra de progresso
- `<quiz-result>` — tela de resultado
- `<quiz-combo>` — badge de combo

---

### 11. **Implementar Analytics educacional**
Registrar:
- Tempo por pergunta
- Padrões de erro (quais distratores são mais escolhidos)
- Curva de dificuldade
- Heatmap de sessões

---

### 12. **Adicionar suporte a Service Worker para quiz offline**
Cachear `quizzes.json` e `quiz_data.js` com estratégia Cache-First, permitindo que o quiz funcione 100% offline.

---

### 13. **Implementar debounce em `checarResposta()`**
**Linha 206:** Embora `this.respondido` previna duplo-clique, não há debounce. Em dispositivos touch, dois toques rápidos podem disparar o handler antes do primeiro `this.respondido = true` ser atribuído (em teoria, mas JS é single-threaded... ainda assim, melhor prevenir).

---

### 14. **Adicionar animações de transição**
Feedback visual ao trocar pergunta (fade/slide), animação de celebração ao acertar, shake ao errar. Melhora significativamente a experiência educacional.

---

### 15. **Implementar sistema de dicas/ajuda**
O campo `dica` existe nos dados (`quiz_data.js`) mas nunca é utilizado na UI. Implementar sistema de "pista" que reduz XP mas ajuda o aluno.

---

## 📊 RESUMO DE PRIORIDAÇÃO

| Prioridade | Problema | Esforço | Impacto |
|-----------|----------|---------|---------|
| P0 | XSS em innerHTML | Baixo | Crítico |
| P0 | Bug XP duplicado | Baixo | Crítico |
| P1 | Error boundaries | Médio | Alto |
| P1 | Acessibilidade (ARIA) | Médio | Alto |
| P1 | Testes automatizados | Alto | Alto |
| P2 | State management | Alto | Médio |
| P2 | Lazy loading | Baixo | Médio |
| P2 | Componentização | Alto | Médio |
| P3 | Timer | Baixo | Médio |
| P3 | Empty states | Baixo | Baixo |
| P3 | i18n robusto | Médio | Médio |

---

## 📁 ARQUIVOS ANALISADOS

- `C:\Users\bruno\Documents\english-learning-app-pro\js\quiz.js` (754 linhas)
- `C:\Users\bruno\Documents\english-learning-app-pro\js\quiz_data.js` (89 linhas)
- `C:\Users\bruno\Documents\english-learning-app-pro\data\quizzes.json` (499 linhas)
