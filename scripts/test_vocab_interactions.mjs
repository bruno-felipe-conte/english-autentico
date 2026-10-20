// scripts/test_vocab_interactions.mjs
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

      console.log('--- Testing English Vocab Interactions ---');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            App.navegar('vocab');
            Vocab.popularCategorias();
            Vocab.renderizar();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      // Test 1: Temple filter
      console.log('1. Testing Temple filter...');
      const templeRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Vocab.filtrarTemplo('1');
            const items = document.querySelectorAll('.vocab-item');
            const stats = document.getElementById('vocab-stats')?.textContent;
            return { itemsCount: items.length, stats };
          })()
        `,
        returnByValue: true
      });
      console.log('Temple filter result:', templeRes.result.value);

      // Test 2: Category filter
      console.log('2. Testing Category filter...');
      const catRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const catSel = document.getElementById('vocab-categoria-filtro');
            const firstCat = catSel.options[1]?.value;
            if (firstCat) Vocab.filtrarCategoria(firstCat);
            const items = document.querySelectorAll('.vocab-item');
            const stats = document.getElementById('vocab-stats')?.textContent;
            return { firstCat, itemsCount: items.length, stats };
          })()
        `,
        returnByValue: true
      });
      console.log('Category filter result:', catRes.result.value);

      // Test 3: Search filter
      console.log('3. Testing Search filter...');
      const searchRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Vocab.limparFiltros();
            Vocab.buscar('hello');
            const items = document.querySelectorAll('.vocab-item');
            const firstWord = items[0]?.querySelector('.vocab-it')?.textContent;
            return { itemsCount: items.length, firstWord };
          })()
        `,
        returnByValue: true
      });
      console.log('Search filter result:', searchRes.result.value);

      // Test 4: Study filtered words button
      console.log('4. Testing "Estudar este filtro" button presence and click...');
      const studyBtnRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btnEstudar = document.querySelector('#vocab-stats button');
            const btnText = btnEstudar ? btnEstudar.textContent.trim() : null;
            const btnBg = btnEstudar ? window.getComputedStyle(btnEstudar).backgroundColor : null;
            return { hasBtn: !!btnEstudar, btnText, btnBg };
          })()
        `,
        returnByValue: true
      });
      console.log('Study filter button result:', studyBtnRes.result.value);

      // Test 5: Blur column toggle
      console.log('5. Testing Blur PT and EN toggles...');
      const blurRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Vocab.limparFiltros();
            Vocab.toggleBlur('pt');
            const isBlurPt = document.getElementById('vocab-list').classList.contains('blur-pt');
            Vocab.toggleBlur('it');
            const isBlurIt = document.getElementById('vocab-list').classList.contains('blur-it');
            Vocab.toggleBlur('it'); // turn off
            return { isBlurPt, isBlurIt };
          })()
        `,
        returnByValue: true
      });
      console.log('Blur toggle result:', blurRes.result.value);

      // Test 6: Custom word addition & deletion
      console.log('6. Testing custom word add & delete...');
      const customRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const testWord = {
              id: 'custom_test_vocab_' + Date.now(),
              ingles: 'Serendipity',
              portugues: 'Acaso afortunado',
              categoria: 'advanced',
              templo_num: 1,
              _custom: true
            };
            App.estado.vocabCache.unshift(testWord);
            Vocab.renderizar();
            const firstItem = document.querySelector('.vocab-item');
            const hasDeleteBtn = !!firstItem.querySelector('.ia-del-btn');
            // Clean up test word
            App.estado.vocabCache = App.estado.vocabCache.filter(w => w.id !== testWord.id);
            Vocab.renderizar();
            return { hasDeleteBtn };
          })()
        `,
        returnByValue: true
      });
      console.log('Custom word result:', customRes.result.value);

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
