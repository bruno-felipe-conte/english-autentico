// scripts/inspect_flashcards_parity.mjs
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

      console.log('=== STEP 1: INSPECTION OF ITALIAN FLASHCARDS (PORT 8000) ===');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      // Dismiss onboarding / tour and navigate to flashcard
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('flashcard');
            if (typeof Flashcards !== 'undefined') Flashcards.init(1);
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const itShot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-flashcard-initial.png', Buffer.from(itShot1.data, 'base64'));
      console.log('Saved screenshots/it-flashcard-initial.png');

      const itData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-flashcard');
            const btns = Array.from(sec ? sec.querySelectorAll('button, select, input') : []).map(el => ({
              id: el.id,
              tag: el.tagName,
              className: el.className,
              text: el.innerText.trim().replace(/\\n/g, ' '),
              disabled: el.disabled,
              hasOnClick: !!el.onclick || el.hasAttribute('onclick'),
              onclickAttr: el.getAttribute('onclick')
            }));

            return {
              activeSection: App.estado?.secaoAtiva,
              temploAtual: Flashcards.temploAtual,
              totalCartas: Flashcards.cartas?.length,
              cartaIndex: Flashcards.indiceAtual,
              cartaAtual: Flashcards.cartaAtual,
              modoReverso: Flashcards.modoReverso,
              modoContexto: Flashcards.modoContexto,
              modoEscuta: Flashcards.modoEscuta,
              buttonsCount: btns.length,
              buttons: btns
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Flashcard Inspection Data:\n', JSON.stringify(itData?.result?.value, null, 2));

      // Flip card in Italian
      await send('Runtime.evaluate', { expression: `Flashcards.virar();` });
      await new Promise(r => setTimeout(r, 600));

      const itShotFlipped = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-flashcard-flipped.png', Buffer.from(itShotFlipped.data, 'base64'));
      console.log('Saved screenshots/it-flashcard-flipped.png');

      const itFlippedData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const actions = document.getElementById('card-actions');
            return {
              actionsVisible: actions?.style.display !== 'none',
              buttons: Array.from(actions?.querySelectorAll('button') || []).map(b => ({
                id: b.id,
                label: b.querySelector('.btn-label')?.innerText,
                interval: b.querySelector('.btn-intervalo')?.innerText
              }))
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Flipped Card Actions:\n', JSON.stringify(itFlippedData?.result?.value, null, 2));

      console.log('\n=== STEP 2: INSPECTION OF ENGLISH FLASHCARDS (PORT 8080) ===');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('flashcards');
            if (typeof Flashcards !== 'undefined') Flashcards.init(1);
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const enShot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-flashcard-initial.png', Buffer.from(enShot1.data, 'base64'));
      console.log('Saved screenshots/en-flashcard-initial.png');

      const enData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-flashcards') || document.getElementById('sec-flashcard');
            const btns = Array.from(sec ? sec.querySelectorAll('button, select, input') : []).map(el => ({
              id: el.id,
              tag: el.tagName,
              className: el.className,
              text: el.innerText.trim().replace(/\\n/g, ' '),
              disabled: el.disabled,
              hasOnClick: !!el.onclick || el.hasAttribute('onclick'),
              onclickAttr: el.getAttribute('onclick')
            }));

            return {
              activeSection: App.estado?.secaoAtiva,
              temploAtual: Flashcards.temploAtual,
              totalCartas: Flashcards.cartas?.length,
              cartaIndex: Flashcards.indiceAtual,
              cartaAtual: Flashcards.cartaAtual,
              modoReverso: Flashcards.modoReverso,
              modoContexto: Flashcards.modoContexto,
              modoEscuta: Flashcards.modoEscuta,
              buttonsCount: btns.length,
              buttons: btns
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Flashcard Inspection Data:\n', JSON.stringify(enData?.result?.value, null, 2));

      // Flip card in English
      await send('Runtime.evaluate', { expression: `Flashcards.virar();` });
      await new Promise(r => setTimeout(r, 600));

      const enShotFlipped = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-flashcard-flipped.png', Buffer.from(enShotFlipped.data, 'base64'));
      console.log('Saved screenshots/en-flashcard-flipped.png');

      const enFlippedData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const actions = document.getElementById('card-actions');
            return {
              actionsVisible: actions?.style.display !== 'none',
              buttons: Array.from(actions?.querySelectorAll('button') || []).map(b => ({
                id: b.id,
                label: b.querySelector('.btn-label')?.innerText,
                interval: b.querySelector('.btn-intervalo')?.innerText
              }))
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Flipped Card Actions:\n', JSON.stringify(enFlippedData?.result?.value, null, 2));

      process.exit(0);
    } catch (err) {
      console.error('Error during inspection:', err);
      process.exit(1);
    }
  };
}

main();
