// scripts/inspect_grammar_diff.mjs
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onopen = async () => {
    try {
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('--- 1. INSPECTING ITALIAN GRAMMAR (PORT 8000) ---');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1#grammatica' });
      await new Promise(r => setTimeout(r, 2000));

      const itInspect = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            App.navegar('grammatica');
            await Grammatica.carregar();
            await Grammatica.renderizarSeletor();

            const selectorButtons = Array.from(document.querySelectorAll('#grammatica-container button')).map(b => ({
              text: b.textContent.trim(),
              cls: b.className,
              onclick: b.getAttribute('onclick')
            }));

            // Abre unidade 1
            Grammatica.abrirUnidade(1, 1);
            const unitHtml = document.getElementById('grammatica-container')?.innerHTML;
            const unitButtons = Array.from(document.querySelectorAll('#grammatica-container button')).map(b => ({
              text: b.textContent.trim().slice(0, 40),
              cls: b.className,
              onclick: b.getAttribute('onclick')
            }));

            return {
              moduliCount: Grammatica.dados?.moduli?.length,
              currentEtapa: Grammatica.etapaAtual,
              selectorButtonsCount: selectorButtons.length,
              unitButtons
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Grammar inspection:', JSON.stringify(itInspect.result.value, null, 2));

      const ssItUnit = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, 'it-grammar-unit.png'), Buffer.from(ssItUnit.data, 'base64'));
      console.log('Saved it-grammar-unit.png');

      // Test Etapa 2 (Exemplos) in Italian
      await send('Runtime.evaluate', {
        expression: `Grammatica.irParaEtapa('exemplos');`
      });
      await new Promise(r => setTimeout(r, 600));
      const ssItEx = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, 'it-grammar-exemplos.png'), Buffer.from(ssItEx.data, 'base64'));

      // Test Etapa 3 (Praticar) in Italian
      await send('Runtime.evaluate', {
        expression: `Grammatica.irParaEtapa('praticar');`
      });
      await new Promise(r => setTimeout(r, 600));
      const ssItPrat = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, 'it-grammar-praticar.png'), Buffer.from(ssItPrat.data, 'base64'));

      console.log('\n--- 2. INSPECTING ENGLISH GRAMMAR (PORT 8080) ---');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1#grammar' });
      await new Promise(r => setTimeout(r, 2000));

      const enInspect = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            App.navegar('grammar');
            await Grammatica.carregar();
            await Grammatica.renderizarSeletor();

            const selectorButtons = Array.from(document.querySelectorAll('#grammatica-container button, #grammar-container button')).map(b => ({
              text: b.textContent.trim(),
              cls: b.className,
              onclick: b.getAttribute('onclick')
            }));

            // Tenta abrir unidade 1
            if (typeof Grammatica.abrirUnidade === 'function') {
              Grammatica.abrirUnidade(1, 1);
            }
            const unitButtons = Array.from(document.querySelectorAll('#grammatica-container button, #grammar-container button')).map(b => ({
              text: b.textContent.trim().slice(0, 40),
              cls: b.className,
              onclick: b.getAttribute('onclick')
            }));

            return {
              moduliCount: Grammatica.dados?.moduli?.length,
              abaAtiva: Grammatica.abaAtiva,
              etapaAtual: Grammatica.etapaAtual,
              selectorButtonsCount: selectorButtons.length,
              unitButtons
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Grammar inspection:', JSON.stringify(enInspect.result.value, null, 2));

      const ssEnUnit = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, 'en-grammar-unit.png'), Buffer.from(ssEnUnit.data, 'base64'));
      console.log('Saved en-grammar-unit.png');

      ws.close();
      process.exit(0);
    } catch (e) {
      console.error('Inspection error:', e);
      ws.close();
      process.exit(1);
    }
  };
}

main().catch(console.error);
