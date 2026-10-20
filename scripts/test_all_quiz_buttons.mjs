// scripts/test_all_quiz_buttons.mjs
import fs from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  ws.onopen = async () => {
    try {
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Network.enable');
      await send('Network.setCacheDisabled', { cacheDisabled: true });
      await send('Network.setBypassServiceWorker', { bypass: true });
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            App.navegar('quiz');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      console.log('Testing each button and interactive element on English Quiz...');

      const results = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            const log = [];
            const test = (name, fn) => {
              try {
                const res = fn();
                log.push({ name, pass: true, detail: res });
              } catch (e) {
                log.push({ name, pass: false, error: e.message, stack: e.stack });
              }
            };

            // 1. Temple Selector buttons
            test('Quiz Temple Selector renders and has clickable buttons', () => {
              const seletor = document.getElementById('quiz-templo-selector');
              const btns = seletor ? seletor.querySelectorAll('.quiz-templo-btn:not(.bloqueado)') : [];
              return { visible: seletor?.style.display !== 'none', clickableCount: btns.length };
            });

            // 2. Start Temple 1 Quiz
            test('Quiz.iniciar(1) starts Temple 1 Quiz', () => {
              Quiz.iniciar(1);
              const container = document.getElementById('quiz-container');
              const pergunta = document.getElementById('quiz-pergunta')?.innerText;
              const options = Array.from(document.querySelectorAll('#opcoes-grid .opcao-btn')).map(b => b.innerText);
              return {
                visible: container?.style.display !== 'none',
                perguntasCount: Quiz.perguntas.length,
                pergunta,
                optionsCount: options.length
              };
            });

            // 3. Audio pronunciation button check
            test('Quiz audio button (#btn-ouvir-quiz) and dataset', () => {
              const btn = document.getElementById('btn-ouvir-quiz');
              const pEl = document.getElementById('quiz-pergunta');
              const dsIt = pEl?.dataset.italiano;
              const dsEn = pEl?.dataset.ingles;
              const onclick = btn?.getAttribute('onclick');
              return {
                btnExists: !!btn,
                datasetItaliano: dsIt,
                datasetIngles: dsEn,
                onclickReadsItalianoOnly: onclick ? onclick.includes('dataset.italiano') && !onclick.includes('dataset.ingles') : false
              };
            });

            // 4. Option click -> check response
            test('Option click (checarResposta)', () => {
              const firstBtn = document.querySelector('#opcoes-grid .opcao-btn');
              const optText = firstBtn?.innerText;
              firstBtn.click();
              const explicacao = document.getElementById('explicacao-container');
              const isAnswered = Quiz.respondido;
              const score = Quiz.pontuacao;
              return {
                optText,
                isAnswered,
                score,
                explicacaoVisible: explicacao?.style.display !== 'none'
              };
            });

            // 5. Continue button -> proximaPergunta()
            test('Continue button (proximaPergunta)', () => {
              const idxBefore = Quiz.perguntaAtual;
              Quiz.proximaPergunta();
              const idxAfter = Quiz.perguntaAtual;
              return { idxBefore, idxAfter };
            });

            // 6. Fast finish remaining questions -> Result screen
            test('Complete all questions to reach Result screen', () => {
              while (Quiz.perguntaAtual < Quiz.perguntas.length) {
                const btn = document.querySelector('#opcoes-grid .opcao-btn');
                if (btn) btn.click();
                Quiz.proximaPergunta();
              }
              const resultado = document.getElementById('quiz-resultado');
              const scoreText = document.getElementById('resultado-score')?.innerText;
              const xpText = document.getElementById('resultado-xp')?.innerText;
              return {
                resultadoVisible: resultado?.style.display !== 'none',
                scoreText,
                xpText
              };
            });

            // 7. Return to Selector button (voltarSelector)
            test('Return button (voltarSelector)', () => {
              Quiz.voltarSelector();
              const seletor = document.getElementById('quiz-templo-selector');
              const resultado = document.getElementById('quiz-resultado');
              return {
                seletorVisible: seletor?.style.display !== 'none',
                resultadoHidden: resultado?.style.display === 'none'
              };
            });

            // 8. Start Mixed Quiz (iniciarMisto)
            test('Quiz.iniciarMisto()', () => {
              Quiz.iniciarMisto();
              const container = document.getElementById('quiz-container');
              const count = Quiz.perguntas.length;
              Quiz.voltarSelector();
              return {
                started: count > 0,
                perguntasCount: count
              };
            });

            // 9. Start Listening Quiz (iniciarListening)
            test('Quiz.iniciarListening(1)', () => {
              Quiz.iniciarListening(1);
              const container = document.getElementById('quiz-container');
              const count = Quiz.perguntas.length;
              const btnOuvir = document.getElementById('btn-ouvir-quiz');
              const btnOuvirVisible = btnOuvir?.style.display !== 'none';
              Quiz.voltarSelector();
              return {
                started: count > 0,
                perguntasCount: count,
                btnOuvirVisible
              };
            });

            // 10. Start Conjugation Quiz (iniciarConjugacao)
            test('Quiz.iniciarConjugacao("Present")', () => {
              Quiz.iniciarConjugacao('Present');
              const count = Quiz.perguntas.length;
              Quiz.voltarSelector();
              return {
                started: count > 0,
                perguntasCount: count
              };
            });

            // 11. Start Grammar Quiz (iniciarGramatica)
            test('Quiz.iniciarGramatica("A1")', () => {
              Quiz.iniciarGramatica('A1');
              const count = Quiz.perguntas.length;
              const tipoBadge = document.getElementById('quiz-tipo')?.innerText;
              Quiz.voltarSelector();
              return {
                started: count > 0,
                perguntasCount: count,
                tipoBadgeText: tipoBadge
              };
            });

            // 12. Temple Modal integration: App.quizTemplo(1)
            test('Temple screen integration: App.quizTemplo(1)', () => {
              App.navegar('temples');
              App.quizTemplo(1);
              const activeSection = App.estado.secaoAtiva;
              const quizVisible = document.getElementById('quiz-container')?.style.display !== 'none';
              const temploAtual = Quiz.temploAtual;
              return {
                activeSection,
                quizVisible,
                temploAtual
              };
            });

            return log;
          })()
        `,
        returnByValue: true
      });

      console.log('Test Results:\n', JSON.stringify(results?.result?.value, null, 2));
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  };
}

main();
