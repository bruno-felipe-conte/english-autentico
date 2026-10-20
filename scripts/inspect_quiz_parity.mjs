// scripts/inspect_quiz_parity.mjs
import fs from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to Chrome CDP target:', target.webSocketDebuggerUrl);

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
      if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots', { recursive: true });
      }

      await send('Page.enable');
      await send('Runtime.enable');
      await send('Network.enable');
      await send('Network.setCacheDisabled', { cacheDisabled: true });
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('=== STEP 1: INSPECTION OF ITALIAN QUIZ (PORT 8000) ===');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      // Dismiss onboarding and navigate to Quiz
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('quiz');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const itShotSelector = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-quiz-selector.png', Buffer.from(itShotSelector.data, 'base64'));
      console.log('Saved screenshots/it-quiz-selector.png');

      const itSelectorData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-quiz');
            const btns = Array.from(sec ? sec.querySelectorAll('button') : []).map(b => ({
              className: b.className,
              text: b.innerText.trim().replace(/\\n/g, ' | '),
              disabled: b.disabled,
              visible: b.offsetParent !== null
            }));

            return {
              activeSection: App.estado?.secaoAtiva,
              quizDataCount: App.estado?.quizData?.length,
              templeButtonsCount: btns.length,
              buttons: btns.slice(0, 10)
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Quiz Selector Data:\n', JSON.stringify(itSelectorData?.result?.value, null, 2));

      // Start Quiz for Temple 1 in Italian
      await send('Runtime.evaluate', { expression: `Quiz.iniciar(1);` });
      await new Promise(r => setTimeout(r, 800));

      const itShotQuestion = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-quiz-question.png', Buffer.from(itShotQuestion.data, 'base64'));
      console.log('Saved screenshots/it-quiz-question.png');

      const itQuestionData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const container = document.getElementById('quiz-container');
            const pergunta = document.getElementById('quiz-pergunta')?.innerText;
            const tipo = document.getElementById('quiz-tipo')?.innerText;
            const progress = document.getElementById('quiz-num-pergunta')?.innerText;
            const btns = Array.from(document.querySelectorAll('#opcoes-grid .opcao-btn')).map(b => b.innerText);
            return {
              visible: container?.style.display !== 'none',
              pergunta,
              tipo,
              progress,
              optionsCount: btns.length,
              options: btns
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Quiz Question Data:\n', JSON.stringify(itQuestionData?.result?.value, null, 2));

      // Click first option in Italian
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const firstBtn = document.querySelector('#opcoes-grid .opcao-btn');
            if (firstBtn) firstBtn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      const itShotAnswered = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-quiz-answered.png', Buffer.from(itShotAnswered.data, 'base64'));
      console.log('Saved screenshots/it-quiz-answered.png');

      const itAnswerData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const explicacao = document.getElementById('explicacao-container');
            const text = document.getElementById('quiz-explicacao')?.innerText;
            const continueBtn = explicacao?.querySelector('button')?.innerText;
            return {
              explicacaoVisible: explicacao?.style.display !== 'none',
              text,
              continueBtn
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Quiz Answered Data:\n', JSON.stringify(itAnswerData?.result?.value, null, 2));

      console.log('\n=== STEP 2: INSPECTION OF ENGLISH QUIZ (PORT 8080) ===');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('quiz');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const enShotSelector = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-quiz-selector.png', Buffer.from(enShotSelector.data, 'base64'));
      console.log('Saved screenshots/en-quiz-selector.png');

      const enSelectorData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-quiz');
            const btns = Array.from(sec ? sec.querySelectorAll('button') : []).map(b => ({
              className: b.className,
              text: b.innerText.trim().replace(/\\n/g, ' | '),
              disabled: b.disabled,
              visible: b.offsetParent !== null
            }));

            return {
              activeSection: App.estado?.secaoAtiva,
              quizDataCount: App.estado?.quizData?.length,
              templeButtonsCount: btns.length,
              buttons: btns.slice(0, 10)
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Quiz Selector Data:\n', JSON.stringify(enSelectorData?.result?.value, null, 2));

      // Start Quiz for Temple 1 in English
      await send('Runtime.evaluate', { expression: `Quiz.iniciar(1);` });
      await new Promise(r => setTimeout(r, 800));

      const enShotQuestion = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-quiz-question.png', Buffer.from(enShotQuestion.data, 'base64'));
      console.log('Saved screenshots/en-quiz-question.png');

      const enQuestionData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const container = document.getElementById('quiz-container');
            const pergunta = document.getElementById('quiz-pergunta')?.innerText;
            const tipo = document.getElementById('quiz-tipo')?.innerText;
            const progress = document.getElementById('quiz-num-pergunta')?.innerText;
            const btns = Array.from(document.querySelectorAll('#opcoes-grid .opcao-btn')).map(b => b.innerText);
            const btnOuvir = document.getElementById('btn-ouvir-quiz');
            return {
              visible: container?.style.display !== 'none',
              pergunta,
              tipo,
              progress,
              optionsCount: btns.length,
              options: btns,
              btnOuvirOnclick: btnOuvir?.getAttribute('onclick'),
              perguntaDataset: Object.assign({}, document.getElementById('quiz-pergunta')?.dataset)
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Quiz Question Data:\n', JSON.stringify(enQuestionData?.result?.value, null, 2));

      // Click first option in English
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const firstBtn = document.querySelector('#opcoes-grid .opcao-btn');
            if (firstBtn) firstBtn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      const enShotAnswered = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-quiz-answered.png', Buffer.from(enShotAnswered.data, 'base64'));
      console.log('Saved screenshots/en-quiz-answered.png');

      const enAnswerData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const explicacao = document.getElementById('explicacao-container');
            const text = document.getElementById('quiz-explicacao')?.innerText;
            const continueBtn = explicacao?.querySelector('button')?.innerText;
            return {
              explicacaoVisible: explicacao?.style.display !== 'none',
              text,
              continueBtn
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Quiz Answered Data:\n', JSON.stringify(enAnswerData?.result?.value, null, 2));

      process.exit(0);
    } catch (err) {
      console.error('Error during quiz inspection:', err);
      process.exit(1);
    }
  };
}

main();
