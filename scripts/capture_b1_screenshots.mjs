import http from 'http';
import fs from 'fs';

const ARTIFACT_DIR = '/home/bruno/.gemini/antigravity/brain/5cb0a274-0748-481b-84eb-9e6f8ee671a6';

function createTab(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://127.0.0.1:9222/json/new?${encodeURIComponent(url)}`, { method: 'PUT' }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const tab = await createTab('http://localhost:8080/?no_onb=1#grammar');
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const send = (m, p={}) => new Promise(res => {
    const myId = id++;
    const handler = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === myId) {
        ws.removeEventListener('message', handler);
        res(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: myId, method: m, params: p }));
  });

  await send('Page.enable');
  await send('Runtime.enable');

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Abrir b1-lez1
  await send('Runtime.evaluate', { 
    expression: `
      (async () => {
        localStorage.removeItem('en_swr_grammar');
        Grammatica.dados = null;
        await App.navegar('grammar');
        await Grammatica.carregar();
        Grammatica.abrirUnidade('B1', 'b1-lez1');
      })()
    `,
    awaitPromise: true
  });
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 1: Etapa 1 (Aprender a Regra)
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave5-b1-lez1-aprender.png', Buffer.from(shot1.data, 'base64'));

  // Ir para Etapa 2 (Exemplos & Armadilhas)
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('exemplos');` });
  await new Promise(r => setTimeout(r, 500));

  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave5-b1-lez1-exemplos.png', Buffer.from(shot2.data, 'base64'));

  // Ir para Etapa 3 (Praticar)
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('praticar');` });
  await new Promise(r => setTimeout(r, 500));

  const shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave5-b1-lez1-praticar.png', Buffer.from(shot3.data, 'base64'));

  // Abrir Lição B1.15 (Gerund vs Infinitive)
  await send('Runtime.evaluate', { expression: `Grammatica.abrirUnidade('B1', 'b1-lez15');` });
  await new Promise(r => setTimeout(r, 1000));

  const shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave5-b1-lez15-aprender.png', Buffer.from(shot4.data, 'base64'));

  console.log('Capturas de B1 salvas com sucesso!');
  ws.close();
  process.exit(0);
}

run().catch(console.error);
