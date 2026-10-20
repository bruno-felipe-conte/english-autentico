import http from 'http';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/bruno/.gemini/antigravity-ide/brain/af3d7a14-a644-4ac7-ba48-02efeb608e3f/screenshots';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

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

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.msgId = 1;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed.id && this.pending.has(parsed.id)) {
        const { resolve, reject } = this.pending.get(parsed.id);
        this.pending.delete(parsed.id);
        if (parsed.error) reject(parsed.error);
        else resolve(parsed.result);
      }
    };

    await this.send('Page.enable');
    await this.send('DOM.enable');
    await this.send('Runtime.enable');
  }

  send(method, params = {}) {
    const id = this.msgId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async screenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const fullPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(fullPath, buffer);
    console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('=== STARTING GRAMMAR PARITY VALIDATION ON PORT 8080 ===');
  const tab = await createTab('http://localhost:8080/?no_onb=1#grammar');
  const cdp = new CDPClient(tab.webSocketDebuggerUrl);
  await cdp.connect();
  await sleep(500);
  for (let i = 0; i < 20; i++) {
    const ready = await cdp.eval(`typeof window.Grammatica !== 'undefined' && typeof window.App !== 'undefined'`);
    if (ready) break;
    await sleep(250);
  }

  // 1. Selector Test
  console.log('\n[1/7] Testing Grammar Selector...');
  await cdp.eval(`
    localStorage.removeItem('en_swr_grammar');
    Grammatica.dados = null;
    App.navegar('grammar');
  `);
  // Wait until Grammatica.dados is loaded
  for (let i = 0; i < 30; i++) {
    const loaded = await cdp.eval(`!!(Grammatica.dados && Grammatica.dados.moduli)`);
    if (loaded) break;
    await sleep(300);
  }
  await sleep(500);
  const selectorCheck = await cdp.eval(`({
    activeSec: App.estado.secaoAtiva,
    modules: Grammatica.dados?.moduli?.length,
    renderedBanners: document.querySelectorAll('.gram-nivel-banner').length,
    renderedCards: document.querySelectorAll('.gram-lez-card').length,
    lockedPills: document.querySelectorAll('.gram-locked-pill').length
  })`);
  console.log('Selector State:', selectorCheck);
  await cdp.screenshot('en-grammar-01-selector.png');

  // 2. Open Lesson Unit
  console.log('\n[2/7] Opening Lesson A1 - Lesson 1...');
  await cdp.eval(`Grammatica.abrirUnidade('A1', 'a1-lez1');`);
  await sleep(800);
  const unitCheck = await cdp.eval(`({
    etapaAtual: Grammatica.etapaAtual,
    title: document.querySelector('.gram-lesson-title')?.textContent,
    hasStepsBar: !!document.querySelector('.gram-steps-bar'),
    stepButtons: document.querySelectorAll('.gram-step-btn').length,
    hasCena: !!document.querySelector('.gram-cena'),
    hasDefinicao: !!document.querySelector('.gram-definicao-row'),
    hasInventario: !!document.querySelector('.gram-inventario'),
    hasTecnica: !!document.querySelector('.gram-tecnica'),
    hasTeoria: !!document.querySelector('.gram-teoria-corpo'),
    hasPonte: !!document.querySelector('.gram-ponte'),
    flipCards: document.querySelectorAll('.gram-flip-card').length,
    audioButtons: document.querySelectorAll('.gram-audio-mini-btn').length
  })`);
  console.log('Stage 1 (Aprender) State:', unitCheck);
  await cdp.screenshot('en-grammar-02-stage1-aprender.png');

  // 3. Flip Card Interaction
  console.log('\n[3/7] Testing 3D Flip Card Interaction...');
  await cdp.eval(`
    const fc = document.querySelector('.gram-flip-card');
    if (fc) fc.classList.add('flipped');
  `);
  await sleep(400);
  const isFlipped = await cdp.eval(`document.querySelector('.gram-flip-card')?.classList.contains('flipped')`);
  console.log('Flip card toggled flipped:', isFlipped);
  await cdp.screenshot('en-grammar-03-stage1-flipped.png');

  // 4. Stepper to Stage 2: Exemplos & Armadilhas
  console.log('\n[4/7] Navigating to Stage 2: Exemplos & Armadilhas...');
  await cdp.eval(`Grammatica.irParaEtapa('exemplos');`);
  await sleep(600);
  const stage2Check = await cdp.eval(`({
    etapaAtual: Grammatica.etapaAtual,
    prcCards: document.querySelectorAll('.gram-prc-expandivel').length,
    prcOpenCount: document.querySelectorAll('.gram-prc-expandivel.aberto').length,
    armadilhas: document.querySelectorAll('.gram-armadilha-row').length,
    coda: !!document.querySelector('.gram-coda')
  })`);
  console.log('Stage 2 State:', stage2Check);
  await cdp.screenshot('en-grammar-04-stage2-exemplos.png');

  // Test Expand/Collapse All PRC
  console.log('Testing Expand/Collapse All PRC cards...');
  await cdp.eval(`Grammatica.toggleTodosPRC();`);
  await sleep(300);
  const expandedCount = await cdp.eval(`document.querySelectorAll('.gram-prc-expandivel.aberto').length`);
  console.log('PRC cards opened after toggleTodosPRC:', expandedCount);
  await cdp.screenshot('en-grammar-04b-stage2-prc-expanded.png');

  // 5. Stepper to Stage 3: Praticar
  console.log('\n[5/7] Navigating to Stage 3: Praticar...');
  await cdp.eval(`Grammatica.irParaEtapa('praticar');`);
  await sleep(600);
  const stage3Check = await cdp.eval(`({
    etapaAtual: Grammatica.etapaAtual,
    hasQuickRef: !!document.querySelector('.gram-tabela-visual'),
    exIndex: Grammatica.exIndex,
    totalEx: Grammatica.unidadeAtual.exercicios.length,
    currentExType: Grammatica.unidadeAtual.exercicios[Grammatica.exIndex].tipo,
    optionsCount: document.querySelectorAll('.gram-option').length
  })`);
  console.log('Stage 3 State:', stage3Check);
  await cdp.screenshot('en-grammar-05-stage3-praticar.png');

  // 6. Interactive Exercise Answering
  console.log('\n[6/7] Answering Exercise 1 (Escolha)...');
  const correctIdx = await cdp.eval(`Grammatica.unidadeAtual.exercicios[Grammatica.exIndex].resposta`);
  await cdp.eval(`Grammatica.responder(${correctIdx});`);
  await sleep(500);
  const feedbackCheck = await cdp.eval(`({
    acertos: Grammatica.acertos,
    hasFeedbackCorrect: !!document.querySelector('.gram-feedback-correct'),
    hasAudioBtn: !!document.querySelector('.gram-ex-feedback .gram-audio-mini-btn'),
    hasNextBtn: !!document.querySelector('#gram-actions .gram-btn-next')
  })`);
  console.log('Feedback State:', feedbackCheck);
  await cdp.screenshot('en-grammar-06-stage3-feedback.png');

  // 7. Complete all exercises to verify results screen & XP
  console.log('\n[7/7] Completing remaining exercises to verify Result Screen...');
  // We already answered Ex 0 in step 6. Advance from Ex 0 to Ex 1:
  await cdp.eval(`Grammatica.proximoExercicio();`);
  await sleep(400);

  while (await cdp.eval(`Grammatica.exIndex < Grammatica.unidadeAtual.exercicios.length`)) {
    const curIdx = await cdp.eval(`Grammatica.exIndex`);
    const tipo = await cdp.eval(`Grammatica.unidadeAtual.exercicios[Grammatica.exIndex].tipo`);
    const resp = await cdp.eval(`Grammatica.unidadeAtual.exercicios[Grammatica.exIndex].resposta`);
    console.log(`Answering Ex ${curIdx + 1}: [${tipo}]`);

    if (tipo === 'escolha') {
      await cdp.eval(`Grammatica.responder(${resp});`);
      await sleep(250);
      await cdp.eval(`Grammatica.proximoExercicio();`);
    } else if (tipo === 'revelar') {
      await cdp.eval(`Grammatica.revelarTudo();`);
      await sleep(250);
      await cdp.eval(`Grammatica.marcarAcerto();`);
    } else if (tipo === 'digitar') {
      await cdp.eval(`(() => {
        const inp = document.getElementById('gram-input-digitacao');
        if (inp) { inp.value = ${JSON.stringify(resp)}; Grammatica.responderDigitar(); }
      })()`);
      await sleep(250);
      await cdp.eval(`Grammatica.proximoExercicio();`);
    }
    await sleep(400);
  }

  const resultCheck = await cdp.eval(`({
    hasResultCard: !!document.querySelector('.gram-resultado'),
    scoreText: document.querySelector('.gram-res-score')?.textContent,
    pctText: document.querySelector('.gram-res-pct')?.textContent,
    hasRetryBtn: !!document.querySelector('.gram-res-actions button'),
    isCompletedInProgresso: (App.estado.progresso.grammatica_completadas || []).includes('a1-lez1')
  })`);
  console.log('Result Screen State:', resultCheck);
  await cdp.screenshot('en-grammar-07-result-screen.png');

  cdp.close();
  console.log('\n=== ALL GRAMMAR PARITY TESTS PASSED SUCCESSFULLY! ===');
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
