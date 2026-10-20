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
  console.log('--- INICIANDO VALIDAÇÃO VISUAL DA ONDA 3 VIA CDP (PORTA 9222) ---');
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

  // Aguardar carregamento do App
  let ready = false;
  for (let i = 0; i < 25; i++) {
    const r = await send('Runtime.evaluate', {
      expression: 'typeof window.App !== "undefined" && typeof window.Grammatica !== "undefined"',
      returnByValue: true
    });
    if (r.result?.value === true) { ready = true; break; }
    await new Promise(res => setTimeout(res, 300));
  }
  console.log('App e Grammatica carregados:', ready);

  // Recarregar dados limpos e abrir Lição 17 (There is vs There are)
  await send('Runtime.evaluate', { 
    expression: `
      (async () => {
        localStorage.removeItem('en_swr_grammar');
        Grammatica.dados = null;
        await App.navegar('grammar');
        await Grammatica.carregar();
        Grammatica.abrirUnidade('A1', 'a1-lez17');
      })()
    `,
    awaitPromise: true
  });
  await new Promise(r => setTimeout(r, 1200));

  // Verificar presença de todas as camadas na Lição 17
  const checkL17 = await send('Runtime.evaluate', {
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
  console.log('Verificação Lição A1.17 (There is / are):', checkL17.result.value);

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Screenshot 1: Lição 17 - Etapa 1 Topo (Cena + Definição + Inventário)
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/en-grammar-wave3-lez17-aprender.png`, Buffer.from(shot1.data, 'base64'));
  fs.writeFileSync('screenshots/en-grammar-wave3-lez17-aprender.png', Buffer.from(shot1.data, 'base64'));

  // Avançar para Etapa 2 (Exemplos & Armadilhas)
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('exemplos');` });
  await new Promise(r => setTimeout(r, 600));

  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/en-grammar-wave3-lez17-exemplos.png`, Buffer.from(shot2.data, 'base64'));
  fs.writeFileSync('screenshots/en-grammar-wave3-lez17-exemplos.png', Buffer.from(shot2.data, 'base64'));

  // Avançar para Etapa 3 (Praticar)
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('praticar');` });
  await new Promise(r => setTimeout(r, 600));

  const shot3 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/en-grammar-wave3-lez17-praticar.png`, Buffer.from(shot3.data, 'base64'));
  fs.writeFileSync('screenshots/en-grammar-wave3-lez17-praticar.png', Buffer.from(shot3.data, 'base64'));

  // Agora carregar a Lição 30 (Adjectives & Word Order) - Conclusão do Módulo A1
  await send('Runtime.evaluate', { expression: `Grammatica.abrirUnidade('A1', 'a1-lez30');` });
  await new Promise(r => setTimeout(r, 1000));

  const checkL30 = await send('Runtime.evaluate', {
    expression: `({
      title: document.querySelector('.gram-lesson-title')?.textContent,
      hasCena: !!document.querySelector('.gram-cena'),
      hasDefinicao: !!document.querySelector('.gram-definicao-row'),
      hasInventario: !!document.querySelector('.gram-inventario'),
      hasTecnica: !!document.querySelector('.gram-tecnica'),
      hasTeoria: !!document.querySelector('.gram-teoria-corpo'),
      hasPonte: !!document.querySelector('.gram-ponte'),
      cardsCount: document.querySelectorAll('.gram-flip-card').length
    })`,
    returnByValue: true
  });
  console.log('Verificação Lição A1.30 (Adjectives & Word Order):', checkL30.result.value);

  const shot4 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/en-grammar-wave3-lez30-adjectives.png`, Buffer.from(shot4.data, 'base64'));
  fs.writeFileSync('screenshots/en-grammar-wave3-lez30-adjectives.png', Buffer.from(shot4.data, 'base64'));

  console.log('✅ TODAS AS 4 CAPTURAS DA ONDA 3 GERADAS COM SUCESSO!');
  ws.close();
  process.exit(0);
}

run().catch(console.error);
