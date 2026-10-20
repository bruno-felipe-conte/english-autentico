// scripts/inspect_italian_temple.mjs
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

  console.log('Navigating to Italian App: http://localhost:8000/?no_onb=1 ...');
  await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
  await new Promise(r => setTimeout(r, 2500));

  // Dismiss any modal/tour if present
  await send('Runtime.evaluate', {
    expression: `
      if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
      if (typeof Tour !== 'undefined') Tour.fechar?.();
      const onb = document.getElementById('onboarding-modal');
      if (onb) onb.remove();
    `
  });
  await new Promise(r => setTimeout(r, 500));

  // Capture screenshot of Italian Temples view
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('it-temples-desktop.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved it-temples-desktop.png');

  // Inspect the interactive elements inside #sec-templi and header
  const inspection = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sec = document.getElementById('sec-templi');
        const header = document.querySelector('.app-header') || document.querySelector('header');
        
        // Find all buttons, links, cards with onclick in sec-templi
        const getInteractive = (root, scope) => {
          if (!root) return [];
          const elements = Array.from(root.querySelectorAll('button, a, [onclick], .templo-card, .temple-card, input, select'));
          return elements.map(el => ({
            scope,
            tag: el.tagName,
            id: el.id,
            className: el.className,
            text: el.innerText.trim().replace(/\\n/g, ' | ').substring(0, 60),
            hasOnClick: !!el.onclick || el.hasAttribute('onclick'),
            onclickAttr: el.getAttribute('onclick') || null,
            dataset: Object.assign({}, el.dataset)
          }));
        };

        return {
          currentSection: App.estado?.secaoAtiva,
          headerElements: getInteractive(header, 'header'),
          secTempliElements: getInteractive(sec, 'sec-templi'),
          templeCardsCount: sec ? sec.querySelectorAll('.templo-card, .temple-card').length : 0,
          unlockedCardsCount: sec ? sec.querySelectorAll('.templo-card:not(.bloqueado), .temple-card:not(.bloqueado)').length : 0,
          hasContinuarCard: !!sec?.querySelector('.card-continuar'),
          hasMetaPrazo: !!sec?.querySelector('.card-meta-prazo'),
          hasParolaGiorno: !!sec?.querySelector('.card-parola-dia, #parola-del-giorno'),
          hasHeatmap: !!sec?.querySelector('#heatmap')
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Italian App Inspection:', JSON.stringify(inspection?.result?.value, null, 2));

  // Test clicking on Temple 1
  console.log('Clicking on Temple 1...');
  const clickT1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const t1 = document.querySelector('.templo-card') || document.querySelector('.temple-card');
        if (t1) {
          t1.click();
          return { clicked: true, className: t1.className, text: t1.innerText.substring(0, 50) };
        }
        return { clicked: false };
      })()
    `,
    returnByValue: true
  });
  console.log('Click Temple 1 Result:', clickT1?.result?.value);
  await new Promise(r => setTimeout(r, 1000));

  const afterClickT1 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          activeSection: App.estado?.secaoAtiva,
          url: window.location.href,
          templeModalActive: document.getElementById('templo-modal')?.classList.contains('ativo'),
          modalBody: document.getElementById('templo-modal-body')?.innerHTML?.substring(0, 200)
        };
      })()
    `,
    returnByValue: true
  });
  console.log('State after clicking Temple 1:', afterClickT1?.result?.value);

  // Return to templi
  await send('Runtime.evaluate', { expression: `App.navegar('templi')` });
  await new Promise(r => setTimeout(r, 800));

  // Test clicking on a LOCKED Temple (Temple 2)
  console.log('Clicking on Temple 2 (Locked)...');
  const clickT2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = document.querySelectorAll('.templo-card, .temple-card');
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
  console.log('Click Temple 2 Result:', clickT2?.result?.value);
  await new Promise(r => setTimeout(r, 1000));

  const afterClickT2 = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          templeModalActive: document.getElementById('templo-modal')?.classList.contains('ativo'),
          modalContent: document.getElementById('templo-modal-body')?.innerText
        };
      })()
    `,
    returnByValue: true
  });
  console.log('State after clicking Temple 2 (Modal opened):', afterClickT2?.result?.value);

  const shotModal = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('it-temple-modal-locked.png', Buffer.from(shotModal.data, 'base64'));
  console.log('Saved it-temple-modal-locked.png');

  // Close modal
  await send('Runtime.evaluate', { expression: `App.fecharModalTemplo()` });
  await new Promise(r => setTimeout(r, 500));

  // Unlock Temple 2 to see unlocked modal
  console.log('Unlocking Temple 2 in memory and opening its modal...');
  await send('Runtime.evaluate', {
    expression: `
      App.abrirModalTemplo(1);
    `
  });
  await new Promise(r => setTimeout(r, 800));

  const afterUnlockedModal = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          templeModalActive: document.getElementById('templo-modal')?.classList.contains('ativo'),
          modalContent: document.getElementById('templo-modal-body')?.innerText
        };
      })()
    `,
    returnByValue: true
  });
  console.log('State of Unlocked Temple 1 Modal:', afterUnlockedModal?.result?.value);

  const shotModalUnlocked = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('it-temple-modal-unlocked.png', Buffer.from(shotModalUnlocked.data, 'base64'));
  console.log('Saved it-temple-modal-unlocked.png');

  process.exit(0);
};
