// scripts/inspect_pronunciation_diff.mjs
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

      console.log('--- 1. INSPECTING ITALIAN IMITAZIONE (PORT 8000) ---');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            App.navegar('imitazione');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const itEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-imitazione');
            const btns = Array.from(sec.querySelectorAll('button')).map(b => ({
              text: b.textContent.trim(),
              cls: b.className,
              id: b.id,
              onclick: b.getAttribute('onclick')
            }));
            const card = sec.querySelector('.dojo-hero-card');
            return {
              title: sec.querySelector('.section-titulo')?.textContent.trim(),
              filterBarHTML: document.getElementById('imit-filtro-bar')?.outerHTML?.slice(0, 300),
              heroCardExists: !!card,
              buttons: btns,
              itemAtual: typeof Imitazione !== 'undefined' ? Imitazione.itemAtual : null,
              totalItems: typeof Imitazione !== 'undefined' ? Imitazione._listaAtual?.length : null
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Imitazione State:\n', JSON.stringify(itEval.result.value, null, 2));

      const itShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-imitazione-screen.png', Buffer.from(itShot.data, 'base64'));
      console.log('Saved screenshots/it-imitazione-screen.png');

      console.log('--- 2. INSPECTING ENGLISH PRONUNCIATION / OUVIR E REPETIR (PORT 8080) ---');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            App.navegar('pronunciation');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const enEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-pronunciation');
            const btns = Array.from(sec.querySelectorAll('button')).map(b => ({
              text: b.textContent.trim(),
              cls: b.className,
              id: b.id,
              onclick: b.getAttribute('onclick')
            }));
            const card = sec.querySelector('.dojo-hero-card');
            return {
              title: sec.querySelector('.section-titulo')?.textContent.trim(),
              filterBarHTML: document.getElementById('imit-filtro-bar')?.outerHTML?.slice(0, 300),
              heroCardExists: !!card,
              buttons: btns,
              itemAtual: typeof Pronunciation !== 'undefined' ? Pronunciation.itemAtual : null,
              totalItems: typeof Pronunciation !== 'undefined' ? Pronunciation._listaAtual?.length : null
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Pronunciation State:\n', JSON.stringify(enEval.result.value, null, 2));

      const enShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-pronunciation-screen.png', Buffer.from(enShot.data, 'base64'));
      console.log('Saved screenshots/en-pronunciation-screen.png');

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
