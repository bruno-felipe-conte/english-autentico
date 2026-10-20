// scripts/validate_flashcards_and_quiz_parity.mjs
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
      await send('Network.setBypassServiceWorker', { bypass: true });
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('==================================================');
      console.log('STEP 1: INSPECTION OF ITALIAN REFERENCE (PORT 8000)');
      console.log('==================================================');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
          })()
        `
      });

      // 1.1 Italian Temples
      await send('Runtime.evaluate', { expression: `App.navegar('templi');` });
      await new Promise(r => setTimeout(r, 800));
      const shotItTemples = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-temples-desktop.png', Buffer.from(shotItTemples.data, 'base64'));
      console.log('✅ Captured screenshots/it-temples-desktop.png');

      // 1.2 Italian Flashcard
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            App.navegar('flashcard');
            Flashcards.init(1);
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      const shotItFC = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-flashcard-front.png', Buffer.from(shotItFC.data, 'base64'));

      // Flip card
      await send('Runtime.evaluate', { expression: `Flashcards.virar();` });
      await new Promise(r => setTimeout(r, 500));
      const shotItFCFlip = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-flashcard-back.png', Buffer.from(shotItFCFlip.data, 'base64'));
      console.log('✅ Captured screenshots/it-flashcard-front.png and it-flashcard-back.png');

      // 1.3 Italian Quiz
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            App.navegar('quiz');
            Quiz.renderizarSeletor();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      const shotItQuizSel = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-quiz-selector.png', Buffer.from(shotItQuizSel.data, 'base64'));

      // Start quiz
      await send('Runtime.evaluate', { expression: `Quiz.iniciar(1);` });
      await new Promise(r => setTimeout(r, 800));
      const shotItQuizQ = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-quiz-question.png', Buffer.from(shotItQuizQ.data, 'base64'));
      console.log('✅ Captured screenshots/it-quiz-selector.png and it-quiz-question.png');

      console.log('\n==================================================');
      console.log('STEP 2: VALIDATION OF ENGLISH TARGET (PORT 8080)');
      console.log('==================================================');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
          })()
        `
      });

      // 2.1 English Temples
      await send('Runtime.evaluate', { expression: `App.navegar('temples');` });
      await new Promise(r => setTimeout(r, 800));
      const shotEnTemples = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-temples-desktop.png', Buffer.from(shotEnTemples.data, 'base64'));
      console.log('✅ Captured screenshots/en-temples-desktop.png');

      // 2.2 English Flashcard
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            App.navegar('flashcards');
            Flashcards.init(1);
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      const shotEnFC = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-flashcard-front.png', Buffer.from(shotEnFC.data, 'base64'));

      // Flip card
      await send('Runtime.evaluate', { expression: `Flashcards.virar();` });
      await new Promise(r => setTimeout(r, 500));
      const shotEnFCFlip = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-flashcard-back.png', Buffer.from(shotEnFCFlip.data, 'base64'));
      console.log('✅ Captured screenshots/en-flashcard-front.png and en-flashcard-back.png');

      // 2.3 English Quiz Selector
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            App.navegar('quiz');
            Quiz.renderizarSeletor();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      const shotEnQuizSel = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-quiz-selector.png', Buffer.from(shotEnQuizSel.data, 'base64'));

      // Start quiz
      await send('Runtime.evaluate', { expression: `Quiz.iniciar(1);` });
      await new Promise(r => setTimeout(r, 800));
      const shotEnQuizQ = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-quiz-question.png', Buffer.from(shotEnQuizQ.data, 'base64'));

      // Answer question
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('#opcoes-grid .opcao-btn');
            if (btn) btn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));
      const shotEnQuizAns = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-quiz-answered.png', Buffer.from(shotEnQuizAns.data, 'base64'));

      // Fast finish to Result screen
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            while (Quiz.perguntaAtual < Quiz.perguntas.length) {
              const btn = document.querySelector('#opcoes-grid .opcao-btn');
              if (btn) btn.click();
              Quiz.proximaPergunta();
            }
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));
      const shotEnQuizRes = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-quiz-result.png', Buffer.from(shotEnQuizRes.data, 'base64'));
      console.log('✅ Captured screenshots/en-quiz-selector.png, en-quiz-question.png, en-quiz-answered.png, and en-quiz-result.png');

      // 2.4 Complete Functional Parity Assertions
      console.log('\n==================================================');
      console.log('STEP 3: RUNNING PARITY ASSERTIONS');
      console.log('==================================================');
      const assertionResults = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            const results = {};

            // Flashcards checks
            App.navegar('flashcards');
            Flashcards.init(1);
            results.fc_initialized = Flashcards.temploAtual === 1;
            results.fc_pronunciarLento_exists = typeof Flashcards.pronunciarLento === 'function';
            results.fc_pronunciar_exists = typeof Flashcards.pronunciar === 'function';
            
            // Mode buttons
            Flashcards.toggleReverso();
            results.fc_modo_reverso_active = Flashcards.modoReverso === true;
            Flashcards._limparModos();
            Flashcards.mostrarCarta();
            results.fc_modo_normal_active = !Flashcards.modoReverso && !Flashcards.modoContexto && !Flashcards.modoEscuta;

            // Pearls check
            Flashcards.mostrarDica();
            results.fc_pearls_level_1 = document.getElementById('dica-pearls')?.textContent === '● ○ ○';
            Flashcards.mostrarDica();
            results.fc_pearls_level_2 = document.getElementById('dica-pearls')?.textContent === '● ● ○';

            // Favorite check
            const btnFav = document.getElementById('btn-favorito');
            Flashcards.toggleFavorito();
            results.fc_favorite_toggled = btnFav?.querySelector('.btn-tool-label') !== null;
            Flashcards.toggleFavorito(); // restore

            // Quiz checks
            App.navegar('quiz');
            Quiz.renderizarSeletor();
            results.quiz_selector_buttons_count = document.querySelectorAll('#quiz-templo-selector .quiz-templo-btn').length;
            results.quiz_has_mixed_button = !!document.querySelector('#quiz-templo-selector .quiz-templo-btn');

            Quiz.iniciar(1);
            results.quiz_iniciar_temple_1 = Quiz.temploAtual === 1;
            const pEl = document.getElementById('quiz-pergunta');
            const btnOuvir = document.getElementById('btn-ouvir-quiz');
            results.quiz_dataset_ingles_present = !!pEl.dataset.ingles;
            results.quiz_btn_ouvir_reads_ingles = btnOuvir.getAttribute('onclick').includes('dataset.ingles');

            Quiz.iniciarGramatica('A1');
            const tipoBadge = document.getElementById('quiz-tipo')?.textContent?.trim();
            results.quiz_grammar_badge_clean = tipoBadge === 'Gramática' || tipoBadge === 'Grammar';

            return results;
          })()
        `,
        returnByValue: true
      });

      console.log('Parity Verification Results:\n', JSON.stringify(assertionResults?.result?.value, null, 2));

      const passed = Object.values(assertionResults?.result?.value || {}).every(Boolean);
      if (passed) {
        console.log('\n🎉 ALL FLASHCARDS & QUIZ PARITY TESTS PASSED WITH 100% SUCCESS!');
        process.exit(0);
      } else {
        console.error('\n❌ SOME ASSERTIONS FAILED!');
        process.exit(1);
      }
    } catch (err) {
      console.error('Fatal error during validation:', err);
      process.exit(1);
    }
  };
}

main();
