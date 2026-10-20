import { promises as fs } from 'fs';
import path from 'path';

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
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 850,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('=== FULL VOCABULARY PARITY VALIDATION ===');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      // Wait for page and scripts to fully initialize
      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 300));
        const ready = await send('Runtime.evaluate', {
          expression: 'Boolean(window.Vocab && window.App && window.App.estado && window.App.estado.vocabCache && window.App.estado.vocabCache.length > 0)',
          returnByValue: true
        });
        if (ready?.result?.value) break;
      }

      // Setup page: bypass onboarding and open vocab
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            App.navegar('vocab');
            Vocab.popularCategorias();
            Vocab.renderizar();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 800));

      // Capture 1: Main Vocab overview
      console.log('1. Capturing Main Vocab Overview...');
      const shot1 = await send('Page.captureScreenshot', { format: 'png' });
      await fs.writeFile('screenshots/en-vocab-main.png', Buffer.from(shot1.data, 'base64'));

      // Check cache total words
      const countRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            return {
              cacheLength: (App.estado.vocabCache || []).length,
              displayedItems: document.querySelectorAll('.vocab-item').length,
              firstWord: document.querySelector('.vocab-item .vocab-it')?.textContent,
              firstPt: document.querySelector('.vocab-item .vocab-pt')?.textContent
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Word Cache Total:', countRes.result.value);

      // Test 2: Filter by Temple 1 & Study button
      console.log('2. Testing Temple filter & Estudar este filtro button...');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Vocab.filtrarTemplo('1');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 400));

      const studyBtnRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('#vocab-stats button');
            const style = btn ? window.getComputedStyle(btn) : null;
            return {
              hasBtn: !!btn,
              btnText: btn?.textContent,
              bgColor: style?.backgroundColor,
              itemsCount: document.querySelectorAll('.vocab-item').length
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Study Button details:', studyBtnRes.result.value);

      const shot2 = await send('Page.captureScreenshot', { format: 'png' });
      await fs.writeFile('screenshots/en-vocab-filtered-study.png', Buffer.from(shot2.data, 'base64'));

      // Test 3: Click study button -> verify navigation to flashcards
      console.log('3. Testing "Estudar este filtro" action...');
      await send('Runtime.evaluate', {
        expression: `Vocab.estudarFiltroAtual()`
      });
      await new Promise(r => setTimeout(r, 600));

      const flashcardsCheck = await send('Runtime.evaluate', {
        expression: `
          (() => {
            return {
              section: App.estado.secaoAtiva,
              cardVisible: document.getElementById('flashcard')?.style.display !== 'none',
              cardsInSession: (Flashcards.cartasDisponiveis || []).length,
              currentWord: document.getElementById('card-frente-palavra')?.textContent
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Flashcards session launched from Vocab filter:', flashcardsCheck.result.value);

      // Return to Vocab
      await send('Runtime.evaluate', {
        expression: `
          App.navegar('vocab');
          Vocab.limparFiltros();
        `
      });
      await new Promise(r => setTimeout(r, 500));

      // Test 4: Blur columns test
      console.log('4. Testing Blur PT & EN columns...');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Vocab.toggleBlur('pt');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 400));

      // Reveal first item
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const first = document.querySelector('.vocab-item');
            if (first) first.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 300));

      const shot3 = await send('Page.captureScreenshot', { format: 'png' });
      await fs.writeFile('screenshots/en-vocab-blur-test.png', Buffer.from(shot3.data, 'base64'));

      const blurStatus = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const list = document.getElementById('vocab-list');
            const first = document.querySelector('.vocab-item');
            return {
              hasBlurPtClass: list.classList.contains('blur-pt'),
              firstRevealed: first.classList.contains('revelada')
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Blur status:', blurStatus.result.value);

      // Disable blur
      await send('Runtime.evaluate', {
        expression: `Vocab.toggleBlur('pt')`
      });

      // Test 5: Custom word addition & deletion
      console.log('5. Testing Custom word insertion & delete button...');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const testWord = {
              id: 'custom_val_' + Date.now(),
              ingles: 'Resilience',
              portugues: 'Resiliência',
              categoria: 'mindset',
              templo_num: 1,
              _custom: true
            };
            App.estado.vocabCache.unshift(testWord);
            Vocab.filtroOrigem = 'custom';
            Vocab.renderizar();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 400));

      const shot4 = await send('Page.captureScreenshot', { format: 'png' });
      await fs.writeFile('screenshots/en-vocab-custom-item.png', Buffer.from(shot4.data, 'base64'));

      const customCheck = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const first = document.querySelector('.vocab-item');
            const delBtn = first?.querySelector('.ia-del-btn');
            const word = first?.querySelector('.vocab-it')?.textContent;
            return {
              word,
              hasDelBtn: !!delBtn,
              pillCustomActive: document.getElementById('vocab-pill-custom')?.style.background.includes('rgb(0, 62, 138)')
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Custom word verification:', customCheck.result.value);

      // Clean up custom word
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            App.estado.vocabCache = App.estado.vocabCache.filter(w => !w.id.startsWith('custom_val_'));
            Vocab.filtroOrigem = '';
            Vocab.renderizar();
          })()
        `
      });

      // Test 6: Word Families & Phonetics
      console.log('6. Testing Word Families & Phonetics...');
      const wordFamilyCheck = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const familyPlay = Vocab.wordFamilies('play');
            const familySpeak = Vocab.wordFamilies('speak');
            const fonPlay = Vocab._fonSimplificada('play');
            const fonNation = Vocab._fonSimplificada('nation');
            return { familyPlay, familySpeak, fonPlay, fonNation };
          })()
        `,
        returnByValue: true
      });
      console.log('Word families & phonetics:', wordFamilyCheck.result.value);

      console.log('=== VALIDATION COMPLETED SUCCESSFULLY ===');
      ws.close();
      process.exit(0);
    } catch (err) {
      console.error(err);
      ws.close();
      process.exit(1);
    }
  };
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
