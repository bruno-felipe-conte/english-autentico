// scripts/capture_dialogues_showcase.mjs
import fs from 'fs';
import path from 'path';

const outDir = '/home/bruno/.gemini/antigravity/brain/5ecf61d0-e30e-4466-a765-65fad982a75f/screenshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to:', target.webSocketDebuggerUrl);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

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

    // ──────────────────────────────────────────────
    // 1. CAPTURE ITALIAN APP (Port 8000)
    // ──────────────────────────────────────────────
    console.log('--- ITALIAN APP (PORT 8000) ---');
    await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
    await new Promise(r => setTimeout(r, 2000));
    await send('Runtime.evaluate', {
      expression: `
        if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
        const onb = document.getElementById('onboarding-modal');
        if (onb) onb.remove();
        App.navegar('dialoghi');
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const itSel = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'it-dialogues-selector.png'), Buffer.from(itSel.data, 'base64'));
    console.log('Saved it-dialogues-selector.png');

    // Italian Reading
    await send('Runtime.evaluate', { expression: `Dialoghi.abrirDialogo('dial_001', 'leitura')` });
    await new Promise(r => setTimeout(r, 800));
    const itRead = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'it-dialogues-reading.png'), Buffer.from(itRead.data, 'base64'));
    console.log('Saved it-dialogues-reading.png');

    // Italian Practice
    await send('Runtime.evaluate', { expression: `Dialoghi.abrirDialogo('dial_001', 'pratica')` });
    await new Promise(r => setTimeout(r, 600));
    // advance to Tu turn
    await send('Runtime.evaluate', { expression: `Dialoghi.avancarTurno()` });
    await new Promise(r => setTimeout(r, 600));
    const itPrac = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'it-dialogues-practice.png'), Buffer.from(itPrac.data, 'base64'));
    console.log('Saved it-dialogues-practice.png');

    // ──────────────────────────────────────────────
    // 2. CAPTURE ENGLISH APP (Port 8080)
    // ──────────────────────────────────────────────
    console.log('--- ENGLISH APP (PORT 8080) ---');
    await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
    await new Promise(r => setTimeout(r, 2000));
    await send('Runtime.evaluate', {
      expression: `
        if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
        const onb = document.getElementById('onboarding-modal');
        if (onb) onb.remove();
        App.navegar('dialogues');
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const enSel = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'en-dialogues-selector.png'), Buffer.from(enSel.data, 'base64'));
    console.log('Saved en-dialogues-selector.png');

    // English Reading
    console.log('Navigating to English Dialogue 1 (Reading)...');
    await send('Runtime.evaluate', {
      expression: `Dialogues.abrirDialogo('dial_001', 'leitura')`,
      awaitPromise: true
    });
    await new Promise(r => setTimeout(r, 1000));
    const enRead = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'en-dialogues-reading.png'), Buffer.from(enRead.data, 'base64'));
    console.log('Saved en-dialogues-reading.png');

    // English Practice
    console.log('Navigating to English Dialogue 1 (Practice)...');
    await send('Runtime.evaluate', {
      expression: `Dialogues.abrirDialogo('dial_001', 'pratica')`,
      awaitPromise: true
    });
    await new Promise(r => setTimeout(r, 600));
    // Advance to You turn
    await send('Runtime.evaluate', { expression: `Dialogues.avancarTurno()` });
    await new Promise(r => setTimeout(r, 600));
    const enPrac = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'en-dialogues-practice.png'), Buffer.from(enPrac.data, 'base64'));
    console.log('Saved en-dialogues-practice.png');

    // English Results
    console.log('Fast-forwarding to results...');
    await send('Runtime.evaluate', {
      expression: `
        Dialogues.turnoAtual = Dialogues.dialogoAtual.turni.length;
        Dialogues.acertos = 4;
        Dialogues.mostrarResultado();
      `
    });
    await new Promise(r => setTimeout(r, 800));
    const enRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'en-dialogues-result.png'), Buffer.from(enRes.data, 'base64'));
    console.log('Saved en-dialogues-result.png');

    // English Flashcards from Dialogue
    console.log('Exporting vocabulary to flashcards...');
    await send('Runtime.evaluate', { expression: `Dialogues._criarFlashcardsDialogo()` });
    await new Promise(r => setTimeout(r, 1000));
    const enFc = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'en-flashcard-from-dialogue.png'), Buffer.from(enFc.data, 'base64'));
    console.log('Saved en-flashcard-from-dialogue.png');

    // English Custom Dialogue Form
    console.log('Opening custom dialogue form...');
    await send('Runtime.evaluate', {
      expression: `
        App.navegar('dialogues');
        Dialogues.abrirFormularioCriar();
      `
    });
    await new Promise(r => setTimeout(r, 800));
    const enCustomForm = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'en-custom-dialogue.png'), Buffer.from(enCustomForm.data, 'base64'));
    console.log('Saved en-custom-dialogue.png');

    console.log('All screenshots saved in:', outDir);
    process.exit(0);
  };
}

main().catch(console.error);
