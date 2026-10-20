import http from 'http';
import fs from 'fs';

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

  // Wait for App and Grammatica to be ready
  let ready = false;
  for (let i = 0; i < 20; i++) {
    const r = await send('Runtime.evaluate', {
      expression: 'typeof window.App !== "undefined" && typeof window.Grammatica !== "undefined"',
      returnByValue: true
    });
    if (r.result?.value === true) {
      ready = true;
      break;
    }
    await new Promise(res => setTimeout(res, 300));
  }
  console.log('App & Grammatica ready:', ready);

  await send('Runtime.evaluate', { 
    expression: `
      (async () => {
        localStorage.removeItem('en_swr_grammar');
        Grammatica.dados = null;
        await App.navegar('grammar');
        await Grammatica.carregar();
        Grammatica.abrirUnidade('A1', 'a1-lez1');
      })()
    `,
    awaitPromise: true
  });
  await new Promise(r => setTimeout(r, 1200));

  const check = await send('Runtime.evaluate', {
    expression: `({
      title: document.querySelector('.gram-lesson-title')?.textContent,
      hasCena: !!document.querySelector('.gram-cena'),
      hasDefinicao: !!document.querySelector('.gram-definicao-row'),
      hasInventario: !!document.querySelector('.gram-inventario'),
      hasTecnica: !!document.querySelector('.gram-tecnica'),
      hasTeoria: !!document.querySelector('.gram-teoria-corpo'),
      hasPonte: !!document.querySelector('.gram-ponte'),
      cardsCount: document.querySelectorAll('.gram-flip-card').length,
      audioBtns: document.querySelectorAll('.gram-audio-mini-btn').length
    })`,
    returnByValue: true
  });
  console.log('Wave 1 Lesson Check:', check.result.value);

  // Set desktop viewport
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Capture top of Stage 1 (Cena + Definicao + Inventario)
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/bruno/.gemini/antigravity-ide/brain/af3d7a14-a644-4ac7-ba48-02efeb608e3f/screenshots/en-grammar-wave1-aprender-top.png', Buffer.from(shot1.data, 'base64'));

  // Scroll to Teoria
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.gram-teoria-corpo');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/bruno/.gemini/antigravity-ide/brain/af3d7a14-a644-4ac7-ba48-02efeb608e3f/screenshots/en-grammar-wave1-aprender-teoria.png', Buffer.from(shot2.data, 'base64'));

  // Scroll to Ponte
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.gram-ponte');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/bruno/.gemini/antigravity-ide/brain/af3d7a14-a644-4ac7-ba48-02efeb608e3f/screenshots/en-grammar-wave1-aprender-ponte.png', Buffer.from(shot3.data, 'base64'));

  // Navigate to Stage 2: Exemplos & Armadilhas
  await send('Runtime.evaluate', {
    expression: `
      Grammatica.irParaEtapa('exemplos');
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/bruno/.gemini/antigravity-ide/brain/af3d7a14-a644-4ac7-ba48-02efeb608e3f/screenshots/en-grammar-wave1-exemplos-armadilhas.png', Buffer.from(shot4.data, 'base64'));

  console.log('All 4 showcase screenshots saved successfully!');
  ws.close();
  process.exit(0);
}

run().catch(console.error);
