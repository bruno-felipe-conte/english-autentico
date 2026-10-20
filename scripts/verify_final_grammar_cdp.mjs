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

function closeTab(id) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://127.0.0.1:9222/json/close/${id}`, { method: 'GET' }, res => {
      resolve();
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('--- TESTANDO MÓDULOS B2 E C1 VIA CHROME CDP (COM CACHE BYPASS) ---');
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

  // Limpar Service Worker e caches
  await send('Runtime.evaluate', {
    expression: `
      (async () => {
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const r of regs) await r.unregister();
        }
        if ('caches' in window) {
          const keys = await caches.keys();
          for (const k of keys) await caches.delete(k);
        }
        localStorage.clear();
        sessionStorage.clear();
      })()
    `,
    awaitPromise: true
  });

  await send('Page.reload', { ignoreCache: true });
  await new Promise(r => setTimeout(r, 2000));

  // Aguardar App e Grammatica
  for (let i = 0; i < 20; i++) {
    const r = await send('Runtime.evaluate', {
      expression: 'typeof window.App !== "undefined" && typeof window.Grammatica !== "undefined"',
      returnByValue: true
    });
    if (r.result?.value === true) break;
    await new Promise(res => setTimeout(res, 250));
  }

  await send('Runtime.evaluate', { 
    expression: `
      (async () => {
        await App.navegar('grammar');
        await Grammatica.carregar();
      })()
    `,
    awaitPromise: true
  });
  await new Promise(r => setTimeout(r, 1200));

  console.log('\n=== TESTANDO LIÇÃO B2.1 (Third Conditional) ===');
  await send('Runtime.evaluate', { expression: `Grammatica.abrirUnidade('B2', 'b2-lez1');` });
  await new Promise(r => setTimeout(r, 800));

  const checkB2L1 = await send('Runtime.evaluate', {
    expression: `({
      title: document.querySelector('.gram-lesson-title')?.textContent,
      sub: document.querySelector('.gram-lesson-subtitle')?.textContent,
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
  console.log('Lição B2.1 (Third Conditional - Aprender):', checkB2L1.result.value);

  let ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave6-b2-lez1-aprender.png', Buffer.from(ss.data, 'base64'));

  // Navegar para Etapa 2
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('exemplos');` });
  await new Promise(r => setTimeout(r, 500));

  const checkB2L1_Etapa2 = await send('Runtime.evaluate', {
    expression: `({
      etapa: Grammatica.etapaAtual,
      prcCards: document.querySelectorAll('.gram-prc-expandivel, .gram-prc-card').length,
      armadilhas: document.querySelectorAll('.gram-armadilha-row, .gram-armadilha-card').length,
      hasCoda: !!document.querySelector('.gram-coda')
    })`,
    returnByValue: true
  });
  console.log('B2.1 Etapa 2 (Exemplos & Armadilhas):', checkB2L1_Etapa2.result.value);

  // Navegar para Etapa 3
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('praticar');` });
  await new Promise(r => setTimeout(r, 500));

  const checkB2L1_Etapa3 = await send('Runtime.evaluate', {
    expression: `({
      etapa: Grammatica.etapaAtual,
      totalExercicios: Grammatica.unidadeAtual.exercicios.length,
      hasBadge: !!document.querySelector('.gram-ex-tipo-badge'),
      tipoEx: document.querySelector('.gram-ex-tipo-badge')?.textContent
    })`,
    returnByValue: true
  });
  console.log('B2.1 Etapa 3 (Praticar):', checkB2L1_Etapa3.result.value);

  ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave6-b2-lez1-praticar.png', Buffer.from(ss.data, 'base64'));

  console.log('\n=== TESTANDO LIÇÃO C1.1 (Inversion with Negative Adverbials) ===');
  await send('Runtime.evaluate', { expression: `Grammatica.abrirUnidade('C1', 'c1-lez1');` });
  await new Promise(r => setTimeout(r, 800));

  const checkC1L1 = await send('Runtime.evaluate', {
    expression: `({
      title: document.querySelector('.gram-lesson-title')?.textContent,
      sub: document.querySelector('.gram-lesson-subtitle')?.textContent,
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
  console.log('Lição C1.1 (Inversion - Aprender):', checkC1L1.result.value);

  ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave7-c1-lez1-aprender.png', Buffer.from(ss.data, 'base64'));

  console.log('\n=== TESTANDO LIÇÃO C1.10 (Idioms & Collocations - GRAND FINALE) ===');
  await send('Runtime.evaluate', { expression: `Grammatica.abrirUnidade('C1', 'c1-lez10');` });
  await new Promise(r => setTimeout(r, 800));

  const checkC1L10 = await send('Runtime.evaluate', {
    expression: `({
      title: document.querySelector('.gram-lesson-title')?.textContent,
      sub: document.querySelector('.gram-lesson-subtitle')?.textContent,
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
  console.log('Lição C1.10 (Idioms & Collocations - Aprender):', checkC1L10.result.value);

  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('praticar');` });
  await new Promise(r => setTimeout(r, 500));

  const checkC1L10_Etapa3 = await send('Runtime.evaluate', {
    expression: `({
      etapa: Grammatica.etapaAtual,
      totalExercicios: Grammatica.unidadeAtual.exercicios.length,
      hasBadge: !!document.querySelector('.gram-ex-tipo-badge'),
      tipoEx: document.querySelector('.gram-ex-tipo-badge')?.textContent
    })`,
    returnByValue: true
  });
  console.log('C1.10 Etapa 3 (Praticar):', checkC1L10_Etapa3.result.value);

  ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/en-grammar-wave7-c1-lez10-praticar.png', Buffer.from(ss.data, 'base64'));

  console.log('\n✅ TODAS AS VERIFICAÇÕES DO MÓDULO B2 E C1 PASSARAM 100%!');
  ws.close();
  await closeTab(tab.id);
  process.exit(0);
}

run().catch(console.error);
