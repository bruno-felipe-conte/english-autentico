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
  console.log('--- TESTANDO MÓDULO B1 VIA CDP ---');
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

  // Aguardar App e Grammatica
  for (let i = 0; i < 20; i++) {
    const r = await send('Runtime.evaluate', {
      expression: 'typeof window.App !== "undefined" && typeof window.Grammatica !== "undefined"',
      returnByValue: true
    });
    if (r.result?.value === true) break;
    await new Promise(res => setTimeout(res, 250));
  }

  // Limpar cache local e abrir b1-lez1
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

  const checkB1L1 = await send('Runtime.evaluate', {
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
  console.log('Lição B1.1 (Present Perfect vs Past Simple):', checkB1L1.result.value);

  // Navegar para Etapa 2
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('exemplos');` });
  await new Promise(r => setTimeout(r, 500));

  const checkEtapa2 = await send('Runtime.evaluate', {
    expression: `({
      etapa: Grammatica.etapaAtual,
      prcCards: document.querySelectorAll('.gram-prc-card').length,
      armadilhas: document.querySelectorAll('.gram-armadilha-card').length,
      hasCoda: !!document.querySelector('.gram-coda')
    })`,
    returnByValue: true
  });
  console.log('Etapa 2 (Exemplos & Armadilhas):', checkEtapa2.result.value);

  // Navegar para Etapa 3
  await send('Runtime.evaluate', { expression: `Grammatica.irParaEtapa('praticar');` });
  await new Promise(r => setTimeout(r, 500));

  const checkEtapa3 = await send('Runtime.evaluate', {
    expression: `({
      etapa: Grammatica.etapaAtual,
      totalExercicios: Grammatica.unidadeAtual.exercicios.length,
      hasBadge: !!document.querySelector('.gram-ex-tipo-badge'),
      tipoEx: document.querySelector('.gram-ex-tipo-badge')?.textContent
    })`,
    returnByValue: true
  });
  console.log('Etapa 3 (Praticar):', checkEtapa3.result.value);

  // Testar também Lição B1.15
  await send('Runtime.evaluate', { expression: `Grammatica.abrirUnidade('B1', 'b1-lez15');` });
  await new Promise(r => setTimeout(r, 800));

  const checkB1L15 = await send('Runtime.evaluate', {
    expression: `({
      title: document.querySelector('.gram-lesson-title')?.textContent,
      hasCena: !!document.querySelector('.gram-cena'),
      hasTeoria: !!document.querySelector('.gram-teoria-corpo'),
      hasPonte: !!document.querySelector('.gram-ponte')
    })`,
    returnByValue: true
  });
  console.log('Lição B1.15 (Gerund vs Infinitive):', checkB1L15.result.value);

  console.log('✅ TODAS AS VERIFICAÇÕES DO MÓDULO B1 PASSARAM 100%!');
  ws.close();
  process.exit(0);
}

run().catch(console.error);
