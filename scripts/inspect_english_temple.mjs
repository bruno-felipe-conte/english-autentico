// scripts/inspect_english_temple.mjs
import fs from 'fs';

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
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log('Navigating to English App: http://localhost:8080/?no_onb=1 ...');
  await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
  await new Promise(r => setTimeout(r, 2500));

  await send('Runtime.evaluate', {
    expression: `
      if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
      if (typeof Tour !== 'undefined') Tour.fechar?.();
      const onb = document.getElementById('onboarding-modal');
      if (onb) onb.remove();
    `
  });
  await new Promise(r => setTimeout(r, 500));

  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('en-temples-desktop.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved en-temples-desktop.png');

  const inspection = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sec = document.getElementById('sec-temples');
        const header = document.querySelector('.app-header') || document.querySelector('header');
        
        const getInteractive = (root, scope) => {
          if (!root) return [];
          const elements = Array.from(root.querySelectorAll('button, a, [onclick], .temple-card, .templo-card, input, select'));
          return elements.map(el => ({
            scope,
            tag: el.tagName,
            id: el.id,
            className: el.className,
            text: el.innerText.trim().replace(/\\n/g, ' | ').substring(0, 60),
            hasOnClick: !!el.onclick || el.hasAttribute('onclick'),
            onclickAttr: el.getAttribute('onclick') || null
          }));
        };

        return {
          currentSection: App.estado?.secaoAtiva,
          secTemplesFound: !!sec,
          headerElements: getInteractive(header, 'header'),
          secTemplesElements: getInteractive(sec, 'sec-temples'),
          templeCardsCount: sec ? sec.querySelectorAll('.templo-card, .temple-card').length : 0,
          unlockedCardsCount: sec ? sec.querySelectorAll('.templo-card:not(.bloqueado), .temple-card:not(.bloqueado)').length : 0,
          hasContinuarCard: !!sec?.querySelector('.card-continuar'),
          hasMetaPrazo: !!sec?.querySelector('.card-meta-prazo'),
          hasParolaGiorno: !!sec?.querySelector('.card-parola-dia, #parola-del-giorno, #word-of-the-day'),
          hasHeatmap: !!sec?.querySelector('#heatmap')
        };
      })()
    `,
    returnByValue: true
  });

  console.log('English App Inspection:', JSON.stringify(inspection?.result?.value, null, 2));

  // Test clicking on Temple 1 in English
  console.log('Clicking on Temple 1 in English...');
  const clickT1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const t1 = document.querySelector('.temple-card') || document.querySelector('.templo-card');
        if (t1) {
          t1.click();
          return { clicked: true, className: t1.className, text: t1.innerText.substring(0, 50) };
        }
        return { clicked: false };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Temple 1 Result in English:', clickT1?.result?.value);
  await new Promise(r => setTimeout(r, 1000));

  const afterClickT1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          activeSection: App.estado?.secaoAtiva,
          url: window.location.href,
          templeModalActive: (document.getElementById('temple-modal') || document.getElementById('templo-modal'))?.classList.contains('ativo'),
          modalBody: (document.getElementById('temple-modal-body') || document.getElementById('templo-modal-body'))?.innerHTML?.substring(0, 200)
        };
      })()
    `,
    returnByValue: true
  });
  console.log('State after clicking Temple 1 in English:', afterClickT1?.result?.value);

  // Return to temples
  await send('Runtime.evaluate', { expression: `App.navegar('temples')` });
  await new Promise(r => setTimeout(r, 800));

  // Click on Temple 2 (Locked) in English
  console.log('Clicking on Temple 2 in English...');
  const clickT2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = document.querySelectorAll('.temple-card, .templo-card');
        const t2 = cards[1];
        if (t2) {
          t2.click();
          return { clicked: true, className: t2.className, text: t2.innerText.substring(0, 50) };
        }
        return { clicked: false };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Temple 2 Result in English:', clickT2?.result?.value);
  await new Promise(r => setTimeout(r, 1000));

  const afterClickT2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          templeModalActive: (document.getElementById('temple-modal') || document.getElementById('templo-modal'))?.classList.contains('ativo'),
          modalContent: (document.getElementById('temple-modal-body') || document.getElementById('templo-modal-body'))?.innerText
        };
      })()
    `,
    returnByValue: true
  });
  console.log('State after clicking Temple 2 in English (Modal opened):', afterClickT2?.result?.value);

  const shotModal = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('en-temple-modal-locked.png', Buffer.from(shotModal.data, 'base64'));
  console.log('Saved en-temple-modal-locked.png');

  // Open Unlocked Temple 1 Modal in English
  console.log('Opening Temple 1 modal in English...');
  await send('Runtime.evaluate', {
    expression: `App.abrirModalTemplo(1);`
  });
  await new Promise(r => setTimeout(r, 800));

  const afterUnlockedModal = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          templeModalActive: (document.getElementById('temple-modal') || document.getElementById('templo-modal'))?.classList.contains('ativo'),
          modalContent: (document.getElementById('temple-modal-body') || document.getElementById('templo-modal-body'))?.innerText,
          modalButtons: Array.from((document.getElementById('temple-modal-body') || document.getElementById('templo-modal-body'))?.querySelectorAll('button') || []).map(b => ({
            text: b.innerText,
            onclick: b.getAttribute('onclick')
          }))
        };
      })()
    `,
    returnByValue: true
  });
  console.log('State of Unlocked Temple 1 Modal in English:', afterUnlockedModal?.result?.value);

  const shotModalUnlocked = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('en-temple-modal-unlocked.png', Buffer.from(shotModalUnlocked.data, 'base64'));
  console.log('Saved en-temple-modal-unlocked.png');

  process.exit(0);
};
