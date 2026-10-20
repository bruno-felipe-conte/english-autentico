// scripts/inspect_dialogues_parity.mjs
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // 1. INSPECT ITALIAN (Reference)
    console.log('--- INSPECTING ITALIAN APP (Port 8000) ---');
    await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
    await new Promise(r => setTimeout(r, 2000));

    await send('Runtime.evaluate', {
      expression: `
        (() => {
          if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
          const onb = document.getElementById('onboarding-modal');
          if (onb) onb.remove();
          App.navegar('dialoghi');
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1000));

    const itSelectorShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('it-dialogues-selector.png', Buffer.from(itSelectorShot.data, 'base64'));

    const itSelectorInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialoghi');
          const buttons = Array.from(sec?.querySelectorAll('button') || []).map(b => ({ text: b.innerText.trim(), onclick: b.getAttribute('onclick') }));
          const cards = Array.from(sec?.querySelectorAll('.dialogo-card, .card-dialogo') || []).map(c => ({
            title: c.querySelector('.dialogo-titulo')?.innerText,
            level: c.querySelector('.dialogo-nivel')?.innerText,
            onclick: c.getAttribute('onclick')
          }));
          return { buttons, totalCards: cards.length, sampleCards: cards.slice(0, 3) };
        })()
      `,
      returnByValue: true
    });
    console.log('IT Selector:', JSON.stringify(itSelectorInfo?.result?.value, null, 2));

    // Open Italian Dialogue 1 in Reading mode
    console.log('Opening Italian Dialogue 1 (Reading)...');
    await send('Runtime.evaluate', {
      expression: `Dialoghi.abrirDialogo('dial_001', 'leitura')`
    });
    await new Promise(r => setTimeout(r, 600));

    const itReadingShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('it-dialogues-reading.png', Buffer.from(itReadingShot.data, 'base64'));

    const itReadingInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialoghi');
          const turns = Array.from(sec?.querySelectorAll('.dialogo-turno') || []).map(t => ({
            class: t.className,
            name: t.querySelector('.dialogo-nome')?.innerText,
            bubble: t.querySelector('.dialogo-bubble div:nth-child(2)')?.innerText,
            hasAudio: !!t.querySelector('.dialogo-audio-btn'),
            translation: t.querySelector('.dialogo-traducao')?.innerText
          }));
          const buttons = Array.from(sec?.querySelectorAll('button') || []).map(b => b.innerText.trim());
          return { buttons, turnsCount: turns.length, sampleTurns: turns.slice(0, 3) };
        })()
      `,
      returnByValue: true
    });
    console.log('IT Reading View:', JSON.stringify(itReadingInfo?.result?.value, null, 2));

    // Switch Italian to Practice mode
    console.log('Opening Italian Dialogue 1 (Practice)...');
    await send('Runtime.evaluate', {
      expression: `Dialoghi.abrirDialogo('dial_001', 'pratica')`
    });
    await new Promise(r => setTimeout(r, 600));

    const itPracticeShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('it-dialogues-practice.png', Buffer.from(itPracticeShot.data, 'base64'));

    const itPracticeInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialoghi');
          const options = Array.from(sec?.querySelectorAll('.dialogo-opcao') || []).map(b => b.innerText.trim());
          const prompt = sec?.querySelector('.dialogo-pratica-frase')?.innerText;
          return { prompt, options, buttons: Array.from(sec?.querySelectorAll('button') || []).map(b => b.innerText.trim()) };
        })()
      `,
      returnByValue: true
    });
    console.log('IT Practice View:', JSON.stringify(itPracticeInfo?.result?.value, null, 2));


    // 2. INSPECT ENGLISH (Target)
    console.log('\n--- INSPECTING ENGLISH APP (Port 8080) ---');
    await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
    await new Promise(r => setTimeout(r, 2000));

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
    await new Promise(r => setTimeout(r, 1000));

    const enSelectorShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-dialogues-selector.png', Buffer.from(enSelectorShot.data, 'base64'));

    const enSelectorInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const buttons = Array.from(sec?.querySelectorAll('button') || []).map(b => ({ text: b.innerText.trim(), onclick: b.getAttribute('onclick') }));
          const cards = Array.from(sec?.querySelectorAll('.dialogue-card, .dialogo-card') || []).map(c => ({
            class: c.className,
            title: c.querySelector('.dialogue-titulo, .dialogo-titulo')?.innerText,
            level: c.querySelector('.dialogue-nivel, .dialogo-nivel')?.innerText,
            onclick: c.getAttribute('onclick'),
            computedBorder: getComputedStyle(c).borderColor,
            computedBackground: getComputedStyle(c).backgroundColor
          }));
          return { buttons, totalCards: cards.length, sampleCards: cards.slice(0, 3) };
        })()
      `,
      returnByValue: true
    });
    console.log('EN Selector:', JSON.stringify(enSelectorInfo?.result?.value, null, 2));

    // Open English Dialogue 1 in Reading mode
    console.log('Opening English Dialogue 1 (Reading)...');
    await send('Runtime.evaluate', {
      expression: `Dialogues.abrirDialogo('dial_001', 'leitura')`
    });
    await new Promise(r => setTimeout(r, 600));

    const enReadingShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-dialogues-reading.png', Buffer.from(enReadingShot.data, 'base64'));

    const enReadingInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const turns = Array.from(sec?.querySelectorAll('.dialogue-turno, .dialogo-turno') || []).map(t => ({
            class: t.className,
            name: t.querySelector('.dialogue-nome, .dialogo-nome')?.innerText,
            bubbleText: t.querySelector('.dialogue-bubble, .dialogo-bubble')?.innerText,
            computedBubbleBg: t.querySelector('.dialogue-bubble, .dialogo-bubble') ? getComputedStyle(t.querySelector('.dialogue-bubble, .dialogo-bubble')).backgroundColor : 'none',
            computedBubbleColor: t.querySelector('.dialogue-bubble, .dialogo-bubble') ? getComputedStyle(t.querySelector('.dialogue-bubble, .dialogo-bubble')).color : 'none',
            hasAudioBtn: !!t.querySelector('.dialogue-audio-btn, .dialogo-audio-btn')
          }));
          const buttons = Array.from(sec?.querySelectorAll('button') || []).map(b => b.innerText.trim());
          return { buttons, turnsCount: turns.length, sampleTurns: turns.slice(0, 3) };
        })()
      `,
      returnByValue: true
    });
    console.log('EN Reading View:', JSON.stringify(enReadingInfo?.result?.value, null, 2));

    // Switch English to Practice mode
    console.log('Opening English Dialogue 1 (Practice)...');
    await send('Runtime.evaluate', {
      expression: `Dialogues.abrirDialogo('dial_001', 'pratica')`
    });
    await new Promise(r => setTimeout(r, 600));

    const enPracticeShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-dialogues-practice.png', Buffer.from(enPracticeShot.data, 'base64'));

    const enPracticeInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('sec-dialogues');
          const options = Array.from(sec?.querySelectorAll('.dialogue-opcao, .dialogo-opcao') || []).map(b => ({
            text: b.innerText.trim(),
            computedBg: getComputedStyle(b).backgroundColor,
            computedBorder: getComputedStyle(b).borderColor
          }));
          const prompt = sec?.querySelector('.dialogue-pratica-frase, .dialogo-pratica-frase')?.innerText;
          return { prompt, options, buttons: Array.from(sec?.querySelectorAll('button') || []).map(b => b.innerText.trim()) };
        })()
      `,
      returnByValue: true
    });
    console.log('EN Practice View:', JSON.stringify(enPracticeInfo?.result?.value, null, 2));

    process.exit(0);
  };
}

main().catch(console.error);
