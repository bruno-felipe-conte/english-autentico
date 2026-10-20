// scripts/inspect_vocab_live.mjs
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
    try {
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('=== 1. INSPECTING ITALIAN VOCABOLARIO (PORT 8000) ===');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            App.navegar('vocabolario');
            if (typeof Vocab !== 'undefined') {
              Vocab.popularCategorias();
              Vocab.renderizar();
            }
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const itEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-vocabolario');
            const items = sec.querySelectorAll('.vocab-item');
            const pills = Array.from(sec.querySelectorAll('#vocab-origem-pills button')).map(b => b.textContent.trim());
            const row2Btns = Array.from(sec.querySelectorAll('.vocab-filtros-row2 button')).map(b => b.textContent.trim());
            const firstItem = items[0]?.textContent?.trim()?.replace(/\\s+/g, ' ');
            return {
              title: sec.querySelector('.section-titulo')?.textContent.trim(),
              searchPh: sec.querySelector('#vocab-busca')?.placeholder,
              totalItemsRendered: items.length,
              pills,
              row2Btns,
              firstItem,
              vocabCacheLength: App.estado?.vocabCache?.length
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Vocabolario State:\n', JSON.stringify(itEval.result.value, null, 2));

      const itShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-vocab-screen.png', Buffer.from(itShot.data, 'base64'));
      console.log('Saved screenshots/it-vocab-screen.png');

      console.log('=== 2. INSPECTING ENGLISH VOCABULARY (PORT 8080) ===');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            App.navegar('vocab');
            if (typeof Vocab !== 'undefined') {
              Vocab.popularCategorias();
              Vocab.renderizar();
            }
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const enEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-vocab');
            const items = sec.querySelectorAll('.vocab-item');
            const pills = Array.from(sec.querySelectorAll('#vocab-origem-pills button')).map(b => b.textContent.trim());
            const row2Btns = Array.from(sec.querySelectorAll('.vocab-filtros-row2 button')).map(b => b.textContent.trim());
            const firstItem = items[0]?.textContent?.trim()?.replace(/\\s+/g, ' ');
            return {
              title: sec.querySelector('.section-titulo')?.textContent.trim(),
              searchPh: sec.querySelector('#vocab-busca')?.placeholder,
              totalItemsRendered: items.length,
              pills,
              row2Btns,
              firstItem,
              vocabCacheLength: App.estado?.vocabCache?.length
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Vocabulary State:\n', JSON.stringify(enEval.result.value, null, 2));

      const enShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-vocab-screen.png', Buffer.from(enShot.data, 'base64'));
      console.log('Saved screenshots/en-vocab-screen.png');

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
