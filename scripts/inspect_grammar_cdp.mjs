import http from 'http';
import fs from 'fs';
import path from 'path';
const ARTIFACT_DIR = 'C:/Users/bruno/.gemini/antigravity-ide/brain/af3d7a14-a644-4ac7-ba48-02efeb608e3f/screenshots';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

function cdpRequest(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:9222/json/${endpoint}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
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
  console.log('--- 1. Inspecting Italian Grammar (Port 8000) ---');
  const tabIt = await createTab('http://localhost:8000/?no_onb=1#grammar');
  const clientIt = new CDPClient(tabIt.webSocketDebuggerUrl);
  await clientIt.connect();
  await sleep(1500);

  // Selector
  await clientIt.eval(`App.navegar('grammar');`);
  await sleep(800);
  await clientIt.screenshot('it-grammar-01-selector.png');

  // Open unit A1 - lez 1
  await clientIt.eval(`Grammatica.abrirUnidade('A1', 'a1-lez1');`);
  await sleep(600);
  await clientIt.screenshot('it-grammar-02-stage1-aprender.png');

  // Flip a card in stage 1
  await clientIt.eval(`
    const card = document.querySelector('.gram-flip-card');
    if (card) card.classList.toggle('flipped');
  `);
  await sleep(400);
  await clientIt.screenshot('it-grammar-03-stage1-flipped.png');

  // Go to stage 2: Exemplos & Armadilhas
  await clientIt.eval(`Grammatica.irParaEtapa('exemplos');`);
  await sleep(600);
  await clientIt.screenshot('it-grammar-04-stage2-exemplos.png');

  // Go to stage 3: Praticar
  await clientIt.eval(`Grammatica.irParaEtapa('praticar');`);
  await sleep(600);
  await clientIt.screenshot('it-grammar-05-stage3-praticar.png');

  // Answer first exercise
  const exType = await clientIt.eval(`Grammatica.unidadeAtual.exercicios[Grammatica.exIndex].tipo`);
  console.log('Italian exercise 1 type:', exType);
  if (exType === 'escolha') {
    await clientIt.eval(`Grammatica.responder(Grammatica.unidadeAtual.exercicios[Grammatica.exIndex].resposta);`);
  } else if (exType === 'revelar') {
    await clientIt.eval(`Grammatica.revelarTudo();`);
  }
  await sleep(500);
  await clientIt.screenshot('it-grammar-06-stage3-feedback.png');

  clientIt.close();

  console.log('\n--- 2. Inspecting English Grammar (Port 8080) ---');
  const tabEn = await createTab('http://localhost:8080/?no_onb=1#grammar');
  const clientEn = new CDPClient(tabEn.webSocketDebuggerUrl);
  await clientEn.connect();
  await sleep(1500);

  await clientEn.eval(`App.navegar('grammar');`);
  await sleep(800);
  await clientEn.screenshot('en-grammar-01-selector.png');

  await clientEn.eval(`Grammatica.abrirUnidade('A1', 'a1-lez1');`);
  await sleep(600);
  await clientEn.screenshot('en-grammar-02-lesson-current.png');

  // Check what methods are missing in English
  const diffCheck = await clientEn.eval(`({
    hasIrParaEtapa: typeof Grammatica.irParaEtapa === 'function',
    etapaAtual: Grammatica.etapaAtual,
    abaAtiva: Grammatica.abaAtiva,
    hasToggleTodosPRC: typeof Grammatica.toggleTodosPRC === 'function',
    hasResponderDigitar: typeof Grammatica.responderDigitar === 'function',
    hasRevelarTudo: typeof Grammatica.revelarTudo === 'function',
    hasStepsBar: !!document.querySelector('.gram-steps-bar'),
    hasTabs: !!document.querySelector('.gram-lesson-tabs'),
    unitTitle: document.querySelector('.gram-lesson-title')?.textContent
  })`);
  console.log('English Grammar State Check:', diffCheck);

  clientEn.close();
  console.log('\nFinished inspection successfully!');
}

main().catch(console.error);
