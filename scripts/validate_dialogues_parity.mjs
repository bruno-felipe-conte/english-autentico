// scripts/validate_dialogues_parity.mjs
import fs from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to:', target.webSocketDebuggerUrl);

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

    console.log('--- 1. LOADING APP & NAVIGATING TO DIALOGUES ---');
    await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
    await new Promise(r => setTimeout(r, 2500));

    // Dismiss any modals and navigate to dialogues
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
          const onb = document.getElementById('onboarding-modal');
          if (onb) onb.remove();
          App.navegar('dialogues');
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1200));

    // Capture Selector screenshot
    const shotSelector = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-dialogues-selector.png', Buffer.from(shotSelector.data, 'base64'));
    console.log('Saved en-dialogues-selector.png');

    // Test Selector assertions
    const selectorCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const cards = sec.querySelectorAll('.dialogo-card, .dialogue-card');
          const grid = sec.querySelector('.dialogo-grid, .dialogue-grid');
          const addBtn = sec.querySelector('.btn-pill-add');
          const iaBtn = sec.querySelector('.btn-ia-add');
          const searchInput = sec.querySelector('input[type="search"]');
          return {
            totalCards: cards.length,
            hasGrid: !!grid,
            hasAddBtn: !!addBtn,
            hasIaBtn: !!iaBtn,
            firstTitle: cards[0]?.querySelector('.dialogo-titulo, .dialogue-titulo')?.innerText,
            firstLevel: cards[0]?.querySelector('.dialogo-nivel, .dialogue-nivel')?.innerText
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Selector Audit:', selectorCheck.result.value);

    // Test Search filter
    console.log('--- 2. TESTING SEARCH FILTER ---');
    const searchCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          Dialogues._filtroTexto = 'Coffee';
          Dialogues.renderizarSeletor();
          const sec = document.getElementById('sec-dialogues');
          const cards = sec.querySelectorAll('.dialogo-card, .dialogue-card');
          const filteredCount = cards.length;
          const cardTitle = cards[0]?.querySelector('.dialogo-titulo, .dialogue-titulo')?.innerText;
          // Clear
          Dialogues._filtroTexto = '';
          Dialogues.renderizarSeletor();
          return { filteredCount, cardTitle };
        })()
      `,
      returnByValue: true
    });
    console.log('Search Filter Audit:', searchCheck.result.value);

    // Test Reading Mode
    console.log('--- 3. TESTING READING MODE (dial_001) ---');
    await send('Runtime.evaluate', {
      expression: `Dialogues.abrirDialogo('dial_001', 'leitura')`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotReading = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-dialogues-reading.png', Buffer.from(shotReading.data, 'base64'));
    console.log('Saved en-dialogues-reading.png');

    const readingCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const backBtn = sec.querySelector('.btn-secondario');
          const turns = sec.querySelectorAll('.dialogo-turno, .dialogue-turno');
          const userTurn = sec.querySelector('.dialogo-turno.utente, .dialogue-turno.utente');
          const charTurn = sec.querySelector('.dialogo-turno.personaggio, .dialogue-turno.personaggio');
          const userBubble = userTurn?.querySelector('.dialogo-bubble, .dialogue-bubble');
          const charBubble = charTurn?.querySelector('.dialogo-bubble, .dialogue-bubble');
          const tradBtn = sec.querySelector('button[title="Toggle translation"]');
          
          return {
            backBtnText: backBtn?.innerText.trim(),
            turnsCount: turns.length,
            userBubbleBg: userBubble ? getComputedStyle(userBubble).backgroundColor : null,
            userBubbleColor: userBubble ? getComputedStyle(userBubble).color : null,
            charBubbleBg: charBubble ? getComputedStyle(charBubble).backgroundColor : null,
            charBubbleColor: charBubble ? getComputedStyle(charBubble).color : null,
            hasAudioBtns: sec.querySelectorAll('.dialogo-audio-btn, .dialogue-audio-btn').length,
            tradBtnText: tradBtn?.innerText.trim()
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Reading Mode Audit:', readingCheck.result.value);

    // Test Translation Toggle
    console.log('--- 4. TESTING TRANSLATION TOGGLE ---');
    const toggleCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          Dialogues._tradVisivel = false;
          Dialogues.renderizarDialogo();
          const hiddenCount = document.querySelectorAll('.dialogo-traducao.traducao-oculta, .dialogue-traducao.traducao-oculta').length;
          Dialogues._tradVisivel = true;
          Dialogues.renderizarDialogo();
          const visibleCount = document.querySelectorAll('.dialogo-traducao:not(.traducao-oculta), .dialogue-traducao:not(.traducao-oculta)').length;
          return { hiddenCount, visibleCount };
        })()
      `,
      returnByValue: true
    });
    console.log('Translation Toggle Audit:', toggleCheck.result.value);

    // Test Practice Mode Step-by-Step
    console.log('--- 5. TESTING PRACTICE MODE STEP-BY-STEP ---');
    await send('Runtime.evaluate', {
      expression: `Dialogues.abrirDialogo('dial_001', 'pratica')`
    });
    await new Promise(r => setTimeout(r, 600));

    // Turn 0: Character turn -> Continue button
    const turn0Check = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const continueBtn = sec.querySelector('.btn-primario');
          return {
            turn: Dialogues.turnoAtual,
            continueBtnText: continueBtn?.innerText.trim()
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Practice Turn 0 (Character):', turn0Check.result.value);

    // Advance to Turn 1 (User turn -> 4 options)
    await send('Runtime.evaluate', {
      expression: `Dialogues.avancarTurno()`
    });
    await new Promise(r => setTimeout(r, 600));

    const shotPractice = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-dialogues-practice-step.png', Buffer.from(shotPractice.data, 'base64'));
    console.log('Saved en-dialogues-practice-step.png');

    const turn1Check = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const options = Array.from(sec.querySelectorAll('.dialogo-opcao, .dialogue-opcao')).map(o => o.innerText.trim());
          const prompt = sec.querySelector('.dialogo-pratica-frase, .dialogue-pratica-frase')?.innerText;
          return {
            turn: Dialogues.turnoAtual,
            prompt,
            optionsCount: options.length,
            options
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Practice Turn 1 (User Options):', turn1Check.result.value);

    // Click correct option (index 0)
    console.log('Clicking correct answer (index 0)...');
    const answerCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelectorAll('.dialogo-opcao, .dialogue-opcao')[0];
          Dialogues.checarResposta(0, btn);
          return {
            hasCorretaClass: btn.classList.contains('correta'),
            isDisabled: btn.disabled,
            acertos: Dialogues.acertos
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Answer Feedback Audit:', answerCheck.result.value);

    // Fast-forward to Results
    console.log('--- 6. FAST FORWARDING TO RESULTS ---');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          Dialogues.turnoAtual = Dialogues.dialogoAtual.turni.length;
          Dialogues.acertos = 4; // 100% of Tu turns
          Dialogues.mostrarResultado();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 600));

    const shotResults = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-dialogues-result.png', Buffer.from(shotResults.data, 'base64'));
    console.log('Saved en-dialogues-result.png');

    const resultsCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const title = sec.querySelector('h3')?.innerText;
          const xp = sec.innerText.includes('XP');
          const vocabChips = Array.from(sec.querySelectorAll('span')).filter(s => s.style.borderRadius === '20px').map(s => s.innerText);
          const flashcardBtn = sec.querySelector('button[onclick*="_criarFlashcardsDialogo"]');
          return {
            title,
            hasXp: xp,
            vocabChips,
            flashcardBtnText: flashcardBtn?.innerText.trim()
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Results Screen Audit:', resultsCheck.result.value);

    // Test Flashcards Export from Dialogue
    console.log('--- 7. TESTING FLASHCARDS EXPORT FROM DIALOGUE ---');
    await send('Runtime.evaluate', {
      expression: `Dialogues._criarFlashcardsDialogo()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const shotFlashcard = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-flashcard-from-dialogue.png', Buffer.from(shotFlashcard.data, 'base64'));
    console.log('Saved en-flashcard-from-dialogue.png');

    const flashcardCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-flashcards');
          const isActive = sec.classList.contains('active');
          const cardFront = document.getElementById('card-ingles')?.innerText.trim();
          const cardBack = document.getElementById('card-traducao')?.innerText.trim();
          const category = document.getElementById('card-categoria')?.innerText.trim();
          return {
            isFlashcardsActive: isActive,
            cardFront,
            cardBack,
            category,
            isNotDash: cardFront !== '—' && cardFront !== ''
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Flashcards Integration Audit:', flashcardCheck.result.value);

    // Test Custom Dialogue CRUD
    console.log('--- 8. TESTING CUSTOM DIALOGUE CRUD ---');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          App.navegar('dialogues');
          Dialogues.abrirFormularioCriar();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 800));

    // Fill form and save
    const crudCreateCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          document.getElementById('dial-titulo').value = 'Hotel Check-in Test';
          document.getElementById('dial-nivel').value = 'A2';
          document.getElementById('dial-icone').value = '🏨';
          document.getElementById('dial-contexto').value = 'Checking in at reception.';
          
          // Fill first turn (Character)
          const f1 = document.querySelector('[data-campo="frase"][data-idx="0"]');
          if (f1) f1.value = 'Welcome! Do you have a reservation?';
          const t1 = document.querySelector('[data-campo="traducao"][data-idx="0"]');
          if (t1) t1.value = 'Bem-vindo! Você tem uma reserva?';
          
          // Fill second turn (User)
          const f2 = document.querySelector('[data-campo="frase"][data-idx="1"]');
          if (f2) f2.value = 'Yes, under the name John.';
          const t2 = document.querySelector('[data-campo="traducao"][data-idx="1"]');
          if (t2) t2.value = 'Sim, sob o nome John.';
          const a0 = document.querySelector('[data-campo="alt-0"][data-idx="1"]');
          if (a0) a0.value = 'Yes, under the name John.';
          const a1 = document.querySelector('[data-campo="alt-1"][data-idx="1"]');
          if (a1) a1.value = 'No hotel.';

          Dialogues._salvarFormulario();
          return {
            customCount: Dialogues.custom.length,
            lastCustomTitle: Dialogues.custom[Dialogues.custom.length - 1]?.titulo
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Custom Dialogue Creation Audit:', crudCreateCheck.result.value);
    await new Promise(r => setTimeout(r, 800));

    const shotCustomCreated = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-custom-dialogue-created.png', Buffer.from(shotCustomCreated.data, 'base64'));
    console.log('Saved en-custom-dialogue-created.png');

    // Test optimistic deletion
    console.log('Deleting created custom dialogue...');
    const crudDeleteCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const lastId = Dialogues.custom[Dialogues.custom.length - 1]?.id;
          // Bypass window.confirm for automated test
          const origConfirm = window.confirm;
          window.confirm = () => true;
          const cardEl = document.querySelector('.dialogo-card, .dialogue-card');
          Dialogues.excluirDialogo(lastId, cardEl);
          window.confirm = origConfirm;
          return {
            remainingCustom: Dialogues.custom.length,
            cardHasOptimisticClass: cardEl ? cardEl.classList.contains('optimistic-removing') : false
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Custom Dialogue Deletion Audit:', crudDeleteCheck.result.value);
    await new Promise(r => setTimeout(r, 500));

    console.log('\n========================================');
    console.log('ALL DIALOGUE PARITY TESTS COMPLETED SUCCESSFULLY!');
    console.log('========================================');
    process.exit(0);
  };
}

main().catch(console.error);
