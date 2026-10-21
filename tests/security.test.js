// ============================================================
// tests/security.test.js — Testes automatizados de segurança e resiliência
// ============================================================
const assert = require('assert');
const test = require('node:test');

// Mock browser globals for testing
global.window = global;
global.window.addEventListener = () => {};
global.document = {
  getElementById: () => null,
  createElement: () => ({ setAttribute: () => {}, click: () => {} }),
  body: { appendChild: () => {}, removeChild: () => {} },
  addEventListener: () => {}
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

test('🔊 Grammatica._extrairFraseInglesExercicio e VoiceEngine.normalizeForSpeech isolam áudio em inglês', () => {
  const Grammatica = require('../js/grammar.js');
  const VoiceEngine = require('../js/voice_engine.js');

  // Caso do usuário: Frase com instrução em português e sentença em inglês
  const exUsuario = {
    tipo: 'escolha',
    pergunta: 'Complete a frase de apresentação: Hello, I ___ Michael and this is my friend Lucas.',
    opcoes: ['is', 'are', 'am', 'be'],
    resposta: 2
  };

  const extraida = Grammatica._extrairFraseInglesExercicio(exUsuario);
  assert.strictEqual(extraida, 'Hello, I am Michael and this is my friend Lucas.');
  assert.strictEqual(extraida.includes('Complete'), false);
  assert.strictEqual(extraida.includes('apresentação'), false);

  const btnHtml = Grammatica._botaoOuvirExercicio(exUsuario);
  assert.strictEqual(btnHtml.includes("App.pronunciar('Hello, I am Michael and this is my friend Lucas.')"), true);
  assert.strictEqual(btnHtml.includes('Complete'), false);

  // Normalização de fala no VoiceEngine
  const rawFala = 'Complete a frase de apresentação: Hello, I am Michael and this is my friend Lucas.';
  const normalizada = VoiceEngine.normalizeForSpeech(rawFala);
  assert.strictEqual(normalizada, 'Hello, I am Michael and this is my friend Lucas.');
  assert.strictEqual(normalizada.includes('Complete'), false);

  // Remoção de anotações e traduções entre parênteses
  const comParenteses = 'Julia is in her office. (= Julia está no escritório dela agora.)';
  const norm2 = VoiceEngine.normalizeForSpeech(comParenteses);
  assert.strictEqual(norm2, 'Julia is in her office.');
});

test('🧠 Quiz SRS utiliza FSRS.review(rating=1) e reseta barra de tempo', () => {
  global.I18n = { t: (k) => k };
  global.SomFeedback = { correto: () => {}, errado: () => {} };
  // Mock FSRS se não carregado globalmente
  global.window.FSRS = {
    review(card, rating) {
      assert.strictEqual(rating, 1, 'Rating de erro no Quiz deve ser 1 (Again)');
      return {
        stability: 0.4,
        difficulty: 7.2,
        lapses: (card.lapses || 0) + 1,
        reps: (card.reps || 0) + 1,
        state: 'learning'
      };
    },
    nextInterval(stability) {
      return 60000; // 1 minuto
    }
  };

  const timerElement = {
    style: { display: '', transition: '', width: '' },
    dataset: {},
    offsetWidth: 100
  };

  const oldGetElementById = global.document.getElementById;
  global.document.getElementById = (id) => {
    if (id === 'quiz-timer-bar') return timerElement;
    if (id === 'opcoes-grid') return { querySelectorAll: () => [] };
    if (id === 'explicacao-container') return { style: {} };
    if (id === 'quiz-explicacao') return { textContent: '' };
    return null;
  };

  // Carrega Quiz
  delete require.cache[require.resolve('../js/quiz.js')];
  const Quiz = require('../js/quiz.js');

  const pMock = {
    id: 'q_test_1',
    pergunta: 'What is the past of go?',
    opcoes: ['went', 'gone', 'goed'],
    resposta_correta: 'went',
    explicacao: 'Went is the past simple of go.'
  };

  Quiz.perguntas = [pMock];
  Quiz.perguntaAtual = 0;
  Quiz.respondido = false;

  // Executa erro: resposta incorreta
  Quiz.checarResposta('goed');

  // Verifica que erro foi salvo via FSRS em localStorage
  const filaErros = JSON.parse(global.localStorage.getItem('en_quiz_erros') || '[]');
  assert.strictEqual(filaErros.length, 1);
  assert.strictEqual(filaErros[0].id, 'q_test_1');
  assert.strictEqual(filaErros[0].stability, 0.4);
  assert.strictEqual(filaErros[0].difficulty, 7.2);

  // Verifica que a barra de timer foi acionada com transição de delay
  assert.strictEqual(timerElement.style.width, '0%');
  assert.ok(timerElement.style.transition.includes('linear'));

  // Avança para a próxima pergunta e verifica que a transição reseta imediatamente
  Quiz.proximaPergunta();
  assert.strictEqual(timerElement.style.transition, 'none');
  assert.strictEqual(timerElement.style.width, '100%');

  // Restaura getElementById
  global.document.getElementById = oldGetElementById;
});

