// ============================================================
// tests/security.test.js — Testes automatizados de segurança e resiliência
// ============================================================
const assert = require('assert');
const test = require('node:test');

// Mock browser globals for testing
global.window = global;
global.document = {
  getElementById: () => null,
  createElement: () => ({ setAttribute: () => {}, click: () => {} }),
  body: { appendChild: () => {}, removeChild: () => {} }
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};
try {
  Object.defineProperty(global.navigator, 'clipboard', {
    value: {
      writeText: async (text) => {
        global._clipboardContent = text;
        return true;
      }
    },
    configurable: true,
    writable: true
  });
} catch (_) {}
global.URL = {
  createObjectURL: () => 'blob:mock-url',
  revokeObjectURL: () => {}
};

const Sanitize = require('../js/sanitize.js');
const ErrorBoundary = require('../js/error-boundary.js');

test('🛡️ Sanitize.escapeHtml neutraliza vetores de XSS', () => {
  const payloadScript = "<script>alert('XSS')</script>";
  const escapedScript = Sanitize.escapeHtml(payloadScript);
  assert.strictEqual(escapedScript.includes('<script>'), false);
  assert.strictEqual(escapedScript, "&lt;script&gt;alert(&#039;XSS&#039;)&lt;/script&gt;");

  const payloadImg = '<img src="x" onerror="evil()"/>';
  const escapedImg = Sanitize.escapeHtml(payloadImg);
  assert.strictEqual(escapedImg.includes('<img'), false);
  assert.strictEqual(escapedImg.includes('"'), false);
  assert.strictEqual(escapedImg, "&lt;img src=&quot;x&quot; onerror=&quot;evil()&quot;/&gt;");

  // Tipos não-string retornam string vazia com segurança
  assert.strictEqual(Sanitize.escapeHtml(null), '');
  assert.strictEqual(Sanitize.escapeHtml(undefined), '');
  assert.strictEqual(Sanitize.escapeHtml(123), '');
});

test('🛡️ Sanitize.escapeJsString e safeOnClick previnem injeção de atributo', () => {
  const maliciousInput = "John'); maliciousFunc(); //";
  const safeAttr = Sanitize.safeOnClick('App.speak', maliciousInput);
  assert.strictEqual(safeAttr.includes("John\\'); maliciousFunc(); //"), true);
  assert.strictEqual(safeAttr.startsWith('onclick="App.speak('), true);
});

test('📋 ErrorBoundary.exportarLogs gera relatório JSON e copia para clipboard', () => {
  ErrorBoundary.init('mock-container');
  ErrorBoundary._handleError(new Error('Falha de teste simulada'), 'test-runner.js', 42);

  const exportado = ErrorBoundary.exportarLogs();
  assert.ok(exportado, 'Deve retornar string JSON');
  const parsed = JSON.parse(exportado);
  assert.strictEqual(parsed.app, 'English Autêntico');
  assert.ok(typeof parsed.userAgent === 'string' && parsed.userAgent.length > 0);
  assert.ok(parsed.totalErros >= 1);
  assert.strictEqual(parsed.erros[parsed.erros.length - 1].message, 'Falha de teste simulada');
  assert.strictEqual(global._clipboardContent, exportado);
});

test('🔄 Algoritmo de Retry com Backoff Exponencial trata 429 e 5xx', async () => {
  async function mockFetchComRetry(url, options = {}, maxTentativas = 3, backoffInicial = 50) {
    let tentativa = 0;
    let atraso = backoffInicial;
    while (tentativa < maxTentativas) {
      try {
        const res = await options.fetchFn(url);
        if ((res.status === 429 || res.status >= 500) && tentativa < maxTentativas - 1) {
          tentativa++;
          await new Promise(r => setTimeout(r, atraso));
          atraso = atraso * 2;
          continue;
        }
        return res;
      } catch (err) {
        tentativa++;
        if (tentativa >= maxTentativas) throw err;
        await new Promise(r => setTimeout(r, atraso));
        atraso = atraso * 2;
      }
    }
  }

  // Caso 1: Sucesso imediato
  let chamadas1 = 0;
  const res1 = await mockFetchComRetry('https://api.test', {
    fetchFn: async () => {
      chamadas1++;
      return { ok: true, status: 200, json: async () => ({ data: 'ok' }) };
    }
  });
  assert.strictEqual(res1.status, 200);
  assert.strictEqual(chamadas1, 1);

  // Caso 2: Falha com 429 (Rate Limit) na 1ª tentativa e sucesso na 2ª tentativa
  let chamadas2 = 0;
  const res2 = await mockFetchComRetry('https://api.test', {
    fetchFn: async () => {
      chamadas2++;
      if (chamadas2 === 1) return { ok: false, status: 429 };
      return { ok: true, status: 200 };
    }
  });
  assert.strictEqual(res2.status, 200);
  assert.strictEqual(chamadas2, 2);

  // Caso 3: Erro 503 persistente esgota tentativas
  let chamadas3 = 0;
  const res3 = await mockFetchComRetry('https://api.test', {
    fetchFn: async () => {
      chamadas3++;
      return { ok: false, status: 503 };
    }
  });
  assert.strictEqual(res3.status, 503);
  assert.strictEqual(chamadas3, 3);
});
