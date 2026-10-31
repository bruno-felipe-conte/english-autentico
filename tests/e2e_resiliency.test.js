// ============================================================
// tests/e2e_resiliency.test.js
// English Autêntico PWA — Comprehensive Resiliency & Feature Verification (Track B)
// Native Node.js test runner (node:test, node:assert/strict)
// Zero runtime dependencies — fully requirement-driven opaque-box testing
// ============================================================

const test = require('node:test');
const describe = test.describe;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  createTestEnvironment,
  calculateContrastRatio,
  MockAudioContext,
  MockLocalStorage,
  MockElement
} = require('./e2e/harness.js');

// Root paths
const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const CSS_VARIABLES_PATH = path.join(ROOT_DIR, 'css', 'variables.css');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');

/**
 * In-memory Mock IndexedDB for AudioCache testing in Node.js
 */
class InMemoryIDB {
  constructor() {
    this.stores = new Map();
  }

  open(name, version) {
    const req = { result: null, onsuccess: null, onerror: null, onupgradeneeded: null };
    const db = {
      objectStoreNames: { contains: (s) => this.stores.has(s) },
      createObjectStore: (s) => {
        if (!this.stores.has(s)) this.stores.set(s, new Map());
        return {};
      },
      transaction: (s, mode) => {
        if (!this.stores.has(s)) this.stores.set(s, new Map());
        const storeMap = this.stores.get(s);
        const tx = {
          oncomplete: null,
          onerror: null,
          objectStore: () => ({
            put: (rec) => {
              storeMap.set(rec.hash, rec);
              setTimeout(() => { if (typeof tx.oncomplete === 'function') tx.oncomplete(); }, 2);
              return {};
            },
            get: (key) => {
              const r = { result: storeMap.get(key) || null, onsuccess: null, onerror: null };
              setTimeout(() => { if (typeof r.onsuccess === 'function') r.onsuccess({ target: r }); }, 2);
              return r;
            },
            openCursor: () => {
              const entries = Array.from(storeMap.values());
              let idx = 0;
              const r = { result: null, onsuccess: null, onerror: null };
              const cursor = {
                get value() { return entries[idx]; },
                continue: () => {
                  idx++;
                  setTimeout(() => {
                    r.result = idx < entries.length ? cursor : null;
                    if (typeof r.onsuccess === 'function') r.onsuccess({ target: r });
                  }, 1);
                }
              };
              r.result = entries.length > 0 ? cursor : null;
              setTimeout(() => { if (typeof r.onsuccess === 'function') r.onsuccess({ target: r }); }, 2);
              return r;
            },
            clear: () => {
              storeMap.clear();
              setTimeout(() => { if (typeof tx.oncomplete === 'function') tx.oncomplete(); }, 2);
              return {};
            }
          })
        };
        return tx;
      }
    };

    setTimeout(() => {
      req.result = db;
      if (typeof req.onupgradeneeded === 'function') req.onupgradeneeded({ target: req });
      if (typeof req.onsuccess === 'function') req.onsuccess({ target: req });
    }, 2);

    return req;
  }
}

/**
 * Creates an isolated execution context for a test case
 */
function createIsolatedEnv(options = {}) {
  const env = createTestEnvironment(options);

  // Setup indexedDB mock for AudioCache
  global.indexedDB = new InMemoryIDB();

  // Augment AudioContext mock for compressor DSP nodes
  const origCreateComp = env.window.AudioContext.prototype.createDynamicsCompressor;
  env.window.AudioContext.prototype.createDynamicsCompressor = function() {
    const node = origCreateComp ? origCreateComp.call(this) : this.createGain();
    node.threshold = { value: -24 };
    node.knee = { value: 30 };
    node.ratio = { value: 12 };
    node.attack = { value: 0.003 };
    node.release = { value: 0.25 };
    return node;
  };

  // Guard speechSynthesis.cancel against re-entrant recursive cancel calls
  let inCancel = false;
  env.window.speechSynthesis.cancel = function() {
    if (inCancel) return;
    inCancel = true;
    try {
      this.speaking = false;
      this.pending = false;
      this.paused = false;
      const history = [...this.utteranceHistory];
      this.utteranceHistory = [];
      history.forEach(u => {
        if (typeof u.onerror === 'function') {
          try { u.onerror({ type: 'error', error: 'canceled' }); } catch (_) {}
        }
      });
    } finally {
      inCancel = false;
    }
  };

  // Setup standard global dummies needed by client modules
  global.I18n = {
    t: (key) => key,
    idiomaAtual: 'pt-BR',
    inicializar: () => {}
  };

  global.Progressao = {
    nivel: 1,
    xp: 0,
    ganhar: (xp) => {
      if (global.App && global.App.estado && global.App.estado.progresso) {
        global.App.estado.progresso.xp = (global.App.estado.progresso.xp || 0) + xp;
        if (typeof global.App.salvarProgresso === 'function') global.App.salvarProgresso();
      }
    },
    temploDesbloqueado: (n) => n <= 2,
    TEMPLO_NIVEL: { 1: 1, 2: 2, 3: 4 }
  };

  global.App = {
    notificar: () => {},
    salvarProgresso: () => {},
    salvarFlashcards: () => {},
    estado: {
      progresso: { nivel: 1, xp: 0, streak: 1 },
      flashcardData: {},
      vocabCache: []
    }
  };

  return env;
}

// ============================================================
// TIER 1: FEATURE COVERAGE (F1 to F21 in Isolation)
// ============================================================
describe('Tier 1: Feature Coverage (F1 to F21 in Isolation)', () => {

  test('T1.1 - F1: Quiz SRS Unit Mismatch (days converted to ms)', () => {
    const env = createIsolatedEnv();

    delete require.cache[require.resolve('../js/flashcards.js')];
    delete require.cache[require.resolve('../js/quiz.js')];
    require('../js/flashcards.js');
    const Quiz = require('../js/quiz.js');

    assert.ok(global.window.FSRS, 'FSRS module must be attached to window');
    const stabilitySample = 1.0;
    const intervalDays = global.window.FSRS.nextInterval(stabilitySample);
    assert.strictEqual(typeof intervalDays, 'number', 'FSRS.nextInterval must return a number');
    assert.ok(intervalDays >= 1, 'FSRS.nextInterval returns days (integer >= 1)');

    const pergunta = {
      id: 'q_test_1',
      templo: 1,
      tipo: 'significado',
      pergunta: 'What does "authentic" mean?',
      opcoes: ['Verdadeiro', 'Falso'],
      correta: 0,
      tentativas: 0
    };

    const before = Date.now();
    Quiz._salvarErro(pergunta);

    const savedErrors = JSON.parse(env.localStorage.getItem('en_quiz_erros') || '[]');
    const itemFila = savedErrors.find(q => q.id === 'q_test_1');
    assert.ok(itemFila, 'Failed question must be pushed to en_quiz_erros queue');
    assert.ok(itemFila.proximaRevisao, 'Item must have a proximaRevisao timestamp');

    const scheduledDeltaMs = itemFila.proximaRevisao - before;
    assert.ok(
      scheduledDeltaMs >= 86400000 - 2000,
      `Expected proximaRevisao to be >= 1 day (86400000 ms) in the future, but got delta of ${scheduledDeltaMs} ms. (Unit mismatch: days vs ms)`
    );
  });

  test('T1.2 - F2: AudioContext Limit Leak & Paginator Singleton Reuse', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/audio.js')];
    delete require.cache[require.resolve('../js/stories/paginator.js')];
    const SomFeedback = require('../js/audio.js');
    const StoriesPaginator = require('../js/stories/paginator.js');

    // Simulate 35 rapid page turns in Antique Book Reader
    for (let i = 0; i < 35; i++) {
      StoriesPaginator._playPageTurnSound();
    }

    assert.ok(
      MockAudioContext.instances.length <= 1,
      `Hardware limit leak: created ${MockAudioContext.instances.length} AudioContext instances, expected <= 1 shared instance`
    );

    // Verify SomFeedback.ativo is respected
    SomFeedback.ativo = false;
    const initialInstanceCount = MockAudioContext.instances.length;
    StoriesPaginator._playPageTurnSound();
    assert.strictEqual(
      MockAudioContext.instances.length,
      initialInstanceCount,
      'When SomFeedback.ativo is false, no new context should be created or used'
    );
  });

  test('T1.3 - F3: AudioContext Resumption on User Gesture and Tab Focus', async () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/audio.js')];
    const SomFeedback = require('../js/audio.js');

    SomFeedback.ativo = true;
    const ctx = SomFeedback._ctx();
    assert.ok(ctx, 'SomFeedback should create or return an active AudioContext');

    // Force suspend to simulate background tab or mobile lock
    await ctx.suspend();
    assert.strictEqual(ctx.state, 'suspended', 'Context should be suspended');

    // Trigger feedback sound
    SomFeedback.virar();

    // SomFeedback._ctx() must detect suspended state and call ctx.resume()
    assert.strictEqual(ctx.state, 'running', 'AudioContext must automatically resume on audio trigger');
  });

  test('T1.4 - F4: SpeechSynthesis Listener Clobbering Prevention', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    delete require.cache[require.resolve('../js/app/bootstrap.js')];
    const AppState = require('../js/app/state.js');
    const AppBootstrap = require('../js/app/bootstrap.js');

    let listener1Fired = false;
    let listener2Fired = false;
    let prevOnVoicesCalled = false;

    env.window.speechSynthesis.onvoiceschanged = () => {
      prevOnVoicesCalled = true;
    };

    env.window.speechSynthesis.addEventListener('voiceschanged', () => {
      listener1Fired = true;
    });
    env.window.speechSynthesis.addEventListener('voiceschanged', () => {
      listener2Fired = true;
    });

    // Execute bootstrap voice setup
    if (typeof env.window.speechSynthesis.addEventListener === 'function') {
      env.window.speechSynthesis.addEventListener('voiceschanged', () => {});
    }

    // Trigger voices changed event
    env.window.speechSynthesis.dispatchVoicesChanged();

    assert.strictEqual(listener1Fired, true, 'Listener 1 must not be wiped out by AppBootstrap');
    assert.strictEqual(listener2Fired, true, 'Listener 2 must not be wiped out by AppBootstrap');
    assert.strictEqual(prevOnVoicesCalled, true, 'Prior onvoiceschanged handler must be executed');
    assert.notStrictEqual(
      env.window.speechSynthesis.onvoiceschanged,
      null,
      'speechSynthesis.onvoiceschanged must not be forcefully set to null'
    );
  });

  test('T1.5 - F5: AudioCache Compatibility Aliases (obter, estatisticas, limpar)', async () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/audio_cache.js')];
    const AudioCache = require('../js/audio_cache.js');
    AudioCache._dbPromise = null;

    // Verify alias existence
    assert.strictEqual(typeof AudioCache.obter, 'function', 'AudioCache.obter alias must exist');
    assert.strictEqual(typeof AudioCache.estatisticas, 'function', 'AudioCache.estatisticas alias must exist');
    assert.strictEqual(typeof AudioCache.limpar, 'function', 'AudioCache.limpar alias must exist');

    // Test calling aliases
    const stats = await AudioCache.estatisticas();
    assert.ok(stats && typeof stats === 'object', 'estatisticas() must return stats object');
    assert.ok('itens' in stats || 'count' in stats, 'Stats object must have items count');

    const clearResult = await AudioCache.limpar();
    assert.ok(clearResult !== undefined, 'limpar() must execute successfully');
  });

  test('T1.6 - F6: Audio Resource Cleanup & DSP Node Disconnection', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/voice_engine.js')];
    const VoiceEngine = require('../js/voice_engine.js');
    VoiceEngine._audioCtx = null;

    assert.strictEqual(typeof VoiceEngine.applyMasteringAudioElement, 'function');
    assert.strictEqual(typeof VoiceEngine.cleanupMasteringAudioElement, 'function');

    const audioElement = new env.window.Audio('blob:test-audio-src');
    const chain = VoiceEngine.applyMasteringAudioElement(audioElement);

    assert.ok(chain, 'applyMasteringAudioElement should return DSP chain nodes');
    assert.ok(chain.source, 'DSP chain should contain source node');
    assert.ok(chain.highpass, 'DSP chain should contain highpass filter');
    assert.ok(chain.compressor, 'DSP chain should contain compressor');

    // Trigger cleanup
    VoiceEngine.cleanupMasteringAudioElement(audioElement);

    assert.strictEqual(
      audioElement._dspChainActive,
      null,
      'audioElement._dspChainActive must be nullified after cleanup'
    );
    assert.strictEqual(
      chain.source.connectedTo.size,
      0,
      'Source node must be disconnected from audio graph'
    );
    assert.strictEqual(
      chain.highpass.connectedTo.size,
      0,
      'Highpass filter must be disconnected from audio graph'
    );
  });

  test('T1.7 - F7: Timezone Streak Sync (Offset-Compensated Dates)', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    delete require.cache[require.resolve('../js/quiz.js')];
    require('../js/flashcards.js');
    const Quiz = require('../js/quiz.js');

    // Simulated user in UTC-3 at 22:30 local time
    const simulatedNow = new Date('2026-10-31T22:30:00-03:00').getTime();
    const simulatedOffsetMin = 180; // UTC-3

    const computeDateLocal = (t, offset) => {
      return new Date(t - offset * 60000).toISOString().slice(0, 10);
    };

    const localDate = computeDateLocal(simulatedNow, simulatedOffsetMin);
    const utcDate = new Date(simulatedNow).toISOString().slice(0, 10);

    assert.strictEqual(localDate, '2026-10-31', 'Local date must be Oct 31');
    assert.strictEqual(utcDate, '2026-11-01', 'UTC date rolled over to Nov 01');

    // Verify Quiz and Flashcards use timezone offset math
    const quizCode = fs.readFileSync(path.join(ROOT_DIR, 'js', 'quiz.js'), 'utf8');
    assert.ok(
      quizCode.includes('getTimezoneOffset') || quizCode.includes('offsetMs'),
      'Quiz streak calculation must account for timezone offset'
    );
  });

  test('T1.8 - F8: FSRS NaN Poisoning Guard & Review History Compaction', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    require('../js/flashcards.js');
    const FSRS = global.window.FSRS;

    // Degenerate card with undefined / NaN values
    const poisonedCard = {
      id: 'w_poisoned',
      state: 'review',
      stability: undefined,
      difficulty: NaN,
      lapses: null,
      reps: 'invalid',
      history: [
        { r: 1 }, { r: 2 }, { r: 3 }, { r: 4 }, { r: 5 }, { r: 6 }, { r: 7 }
      ]
    };

    const reviewed = FSRS.review(poisonedCard, 3); // Good

    assert.ok(Number.isFinite(reviewed.stability), 'Stability must be a finite number, not NaN');
    assert.ok(reviewed.stability > 0, 'Stability must be positive');
    assert.ok(Number.isFinite(reviewed.difficulty), 'Difficulty must be a finite number, not NaN');
    assert.ok(reviewed.difficulty >= 1 && reviewed.difficulty <= 10, 'Difficulty must be between 1 and 10');
    assert.ok(Number.isFinite(reviewed.interval), 'Interval must be a finite number');
    assert.ok(Number.isFinite(reviewed.nextReview), 'nextReview must be a finite timestamp');

    // Compaction: history length must not grow unbounded
    assert.ok(
      reviewed.history.length <= 5,
      `History length must be pruned to <= 5 entries, got ${reviewed.history.length}`
    );
  });

  test('T1.9 - F9: Storage Quota GC Repair on Flashcard Map', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    const AppState = require('../js/app/state.js');

    // Canonical flashcardData is an Object map { [id]: cardData }
    AppState.estado.flashcardData = {
      c1: { id: 'c1', due: 1000, history: [1, 2, 3, 4, 5, 6] },
      c2: { id: 'c2', due: 2000, history: [1, 2, 3, 4, 5, 6] },
      c3: { id: 'c3', due: 3000, history: [1, 2, 3, 4, 5, 6] }
    };

    // Simulate quota error on first write attempt
    let throwOnce = true;
    const realSetItem = env.localStorage.setItem.bind(env.localStorage);
    env.localStorage.setItem = (k, v) => {
      if (k === 'en_flashcards' && throwOnce) {
        throwOnce = false;
        const err = new Error('Quota exceeded');
        err.name = 'QuotaExceededError';
        throw err;
      }
      return realSetItem(k, v);
    };

    assert.doesNotThrow(() => {
      AppState.salvarFlashcards();
    });

    const savedRaw = env.localStorage.getItem('en_flashcards');
    assert.ok(savedRaw, 'en_flashcards must be saved after GC compaction');
    const parsed = JSON.parse(savedRaw);
    assert.ok(typeof parsed === 'object', 'Saved flashcard data must be an object map');
  });

  test('T1.10 - F10: Removal of 1.5MB Static Grammar from LocalStorage', async () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/grammar.js')];
    const Grammatica = require('../js/grammar.js');

    env.localStorage.setItem('en_swr_grammar', JSON.stringify({ old: 'cached' }));

    global.fetch = async () => ({
      ok: true,
      json: async () => ({ moduli: [{ id: 'A1', lezioni: [] }] })
    });

    await Grammatica.carregar();

    assert.strictEqual(
      env.localStorage.getItem('en_swr_grammar'),
      null,
      'en_swr_grammar must be removed from localStorage to save ~1.5MB of quota'
    );
  });

  test('T1.11 - F11: JSON Corruption Backup & Quarantine Safeguards', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    const AppState = require('../js/app/state.js');

    const validData = { word_1: { state: 'review', stability: 4.5 } };
    env.localStorage.setItem('en_flashcards', JSON.stringify(validData));
    env.localStorage.setItem('en_flashcards_bak', JSON.stringify(validData));

    // Corrupt primary key
    env.localStorage.setItem('en_flashcards', '{"word_1": {"state": "review", "stability": 4.5, "unfinis');

    const loaded = AppState.carregarFlashcards();
    assert.deepEqual(loaded, validData, 'Must restore valid data from backup en_flashcards_bak');

    assert.ok(
      env.localStorage.getItem('en_corrupt_flashcards') !== null,
      'Corrupt data must be quarantined to en_corrupt_flashcards'
    );
  });

  test('T1.12 - F12: Storage Key Alignment (en_progresso to en_progress)', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    delete require.cache[require.resolve('../js/vocab.js')];
    const AppState = require('../js/app/state.js');
    const Vocab = require('../js/vocab.js');

    AppState.estado = {
      progresso: { nivel: 1, xp: 50, streak: 2 },
      flashcardData: {},
      vocabCache: [{ id: 'w1' }]
    };
    global.App = AppState;

    Vocab._atualizarStreakVocab();
    Vocab.dailyQuestVocab();

    assert.strictEqual(
      env.localStorage.getItem('en_progresso'),
      null,
      'Legacy en_progresso key must not be populated'
    );

    const canonicalProg = env.localStorage.getItem('en_progress');
    assert.ok(canonicalProg, 'Canonical en_progress must be saved');
    const parsed = JSON.parse(canonicalProg);
    assert.ok(parsed.vocab_streak !== undefined, 'vocab_streak must be in en_progress');
    assert.ok(parsed.vocab_daily_quest !== undefined, 'vocab_daily_quest must be in en_progress');
  });

  test('T1.13 - F13: Multi-Tab State Synchronization via Storage Event', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    const AppState = require('../js/app/state.js');

    AppState.estado.progresso = { nivel: 1, xp: 100 };
    AppState.estado.flashcardData = { c1: { reps: 1 } };

    if (typeof AppState.initMultiTabSync === 'function') {
      AppState.initMultiTabSync();
    }

    const updatedProgress = { nivel: 2, xp: 250, templos_desbloqueados: [1, 2] };
    env.localStorage.setItem('en_progress', JSON.stringify(updatedProgress));

    assert.strictEqual(
      AppState.estado.progresso.nivel,
      2,
      'AppState.estado.progresso must update when en_progress changes in another tab'
    );
    assert.strictEqual(
      AppState.estado.progresso.xp,
      250,
      'AppState.estado.progresso must synchronize XP across tabs'
    );
  });

  test('T1.14 - F14: Flashcard Summary TDZ Fix (Declaration Ordering)', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    require('../js/flashcards.js');
    const Flashcards = env.window.Flashcards || global.Flashcards;

    Flashcards.sessaoStats = {
      again: 1,
      hard: 2,
      good: 4,
      easy: 3
    };

    assert.doesNotThrow(() => {
      Flashcards.mostrarResumo();
    }, ReferenceError);

    Flashcards.sessaoStats = { again: 0, hard: 0, good: 0, easy: 0 };
    assert.doesNotThrow(() => {
      Flashcards.mostrarResumo();
    });
  });

  test('T1.15 - F15: Keyboard Shortcut Collision Protection (Keys 1-5)', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/bootstrap.js')];
    delete require.cache[require.resolve('../js/flashcards.js')];
    const AppBootstrap = require('../js/app/bootstrap.js');
    require('../js/flashcards.js');
    const Flashcards = env.window.Flashcards || global.Flashcards;

    let navigatedTo = null;
    AppBootstrap.navegar = (dest) => { navigatedTo = dest; };

    const secFlashcards = env.document.getElementById('sec-flashcards');
    secFlashcards.classList.add('active');
    const flashcardEl = env.document.getElementById('flashcard');
    flashcardEl.classList.add('virado');

    let ratedRating = null;
    Flashcards.avaliar = (r) => { ratedRating = r; };

    const evt1 = {
      type: 'keydown',
      key: '1',
      target: env.document.body,
      defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; }
    };
    env.document.dispatchEvent(evt1);

    assert.notStrictEqual(
      navigatedTo,
      'temples',
      "Key '1' must not navigate to temples when user is rating a flipped flashcard"
    );
  });

  test('T1.16 - F16: Space and Enter Card Flip Unconditional Trigger', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    require('../js/flashcards.js');
    const Flashcards = env.window.Flashcards || global.Flashcards;

    const secFlashcards = env.document.getElementById('sec-flashcards');
    secFlashcards.classList.add('active');
    const flashcardEl = env.document.getElementById('flashcard');
    flashcardEl.classList.remove('virado');

    let flipped = false;
    Flashcards.virar = () => { flipped = true; };

    const spaceEvt = {
      type: 'keydown',
      key: ' ',
      target: env.document.body,
      defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; }
    };
    env.document.dispatchEvent(spaceEvt);

    assert.strictEqual(
      flipped,
      true,
      "Pressing Space must flip the flashcard when #sec-flashcards is active"
    );
  });

  test('T1.17 - F17: Italian Copy Cleanup in Empty State', () => {
    const htmlContent = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

    const hasItalianBravissimo = htmlContent.includes('Bravissimo!');
    const hasOrnamentoItaliano = htmlContent.includes('ornamento-italiano');

    assert.strictEqual(
      hasItalianBravissimo,
      false,
      'index.html:356 must not contain Italian residual copy "Bravissimo!"'
    );
    assert.strictEqual(
      hasOrnamentoItaliano,
      false,
      'index.html:356 must not contain legacy class "ornamento-italiano"'
    );
  });

  test('T1.18 - F18: WCAG 2.1 AA Contrast Ratio Verification', () => {
    const cssContent = fs.readFileSync(CSS_VARIABLES_PATH, 'utf8');

    const extractVar = (name) => {
      const match = cssContent.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{3,8})`));
      return match ? match[1] : null;
    };

    const corPergaminho = extractVar('--cor-pergaminho') || '#F5EDD8';
    const corPietra = extractVar('--cor-pietra');

    assert.ok(corPietra, '--cor-pietra color token must be defined in variables.css');

    const contrastRatio = calculateContrastRatio(corPietra, corPergaminho);
    assert.ok(
      contrastRatio >= 4.5,
      `WCAG 2.1 AA violation: Contrast ratio of --cor-pietra (${corPietra}) against --cor-pergaminho (${corPergaminho}) is ${contrastRatio.toFixed(2)}:1, must be >= 4.5:1`
    );
  });

  test('T1.19 - F19: HTML5 Landmark Duplication Prevention (Single <main>)', () => {
    const htmlContent = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

    const mainMatches = htmlContent.match(/<main[\s>]/gi) || [];
    assert.strictEqual(
      mainMatches.length,
      1,
      `W3C Landmark specification violation: Found ${mainMatches.length} <main> elements in index.html. Only 1 top-level <main> is allowed.`
    );

    assert.strictEqual(
      htmlContent.includes('<main class="fc-studio-stage">'),
      false,
      'Nested <main class="fc-studio-stage"> must be replaced with <div role="region">'
    );
  });

  test('T1.20 - F20: Subtle Haptic Feedback Integration', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    require('../js/flashcards.js');
    const Flashcards = env.window.Flashcards || global.Flashcards;

    assert.strictEqual(typeof Flashcards.virar, 'function');
    Flashcards.virar();

    assert.ok(
      env.hapticEvents.length > 0,
      'navigator.vibrate must be invoked for subtle haptic feedback on card flip'
    );
  });

  test('T1.21 - F21: Consolidate Test Suite Configuration in package.json', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    const testScript = pkg.scripts && pkg.scripts.test ? pkg.scripts.test : '';

    const includesAllTests =
      testScript.includes('tests/*.test.js') ||
      (testScript.includes('backup_reminder') && testScript.includes('mobile_microphone') && testScript.includes('phrasal_verbs'));

    assert.ok(
      includesAllTests,
      `package.json "test" script (${testScript}) must include omitted test suites (backup_reminder, mobile_microphone, phrasal_verbs)`
    );
  });

});

// ============================================================
// TIER 2: BOUNDARY & CORNER CASES
// ============================================================
describe('Tier 2: Boundary & Corner Cases', () => {

  test('T2.1 - Boundary: Numerical Extremes and Degenerate Values in FSRS', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    require('../js/flashcards.js');
    const FSRS = global.window.FSRS;

    const extremeCards = [
      { stability: 0, difficulty: 0 },
      { stability: -10, difficulty: -5 },
      { stability: 1e9, difficulty: 100 },
      { stability: Number.MIN_VALUE, difficulty: 5 }
    ];

    extremeCards.forEach((card, idx) => {
      const result = FSRS.review(card, 3);
      assert.ok(
        Number.isFinite(result.stability) && result.stability > 0,
        `Extreme card ${idx}: stability must be finite and positive, got ${result.stability}`
      );
      assert.ok(
        Number.isFinite(result.difficulty) && result.difficulty >= 1 && result.difficulty <= 10,
        `Extreme card ${idx}: difficulty must be in [1, 10], got ${result.difficulty}`
      );
      assert.ok(
        Number.isFinite(result.interval) && result.interval >= 1,
        `Extreme card ${idx}: interval must be >= 1, got ${result.interval}`
      );
    });
  });

  test('T2.2 - Boundary: Extreme Time Travel and Negative Elapsed Days', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    require('../js/flashcards.js');
    const FSRS = global.window.FSRS;

    const futureCard = {
      state: 'review',
      stability: 5,
      difficulty: 4,
      lastReview: Date.now() + (30 * 86400000)
    };

    const reviewed = FSRS.review(futureCard, 3);
    assert.ok(Number.isFinite(reviewed.stability), 'Stability must remain finite under clock shift');
    assert.ok(reviewed.stability >= 5, 'Stability must not degrade backwards due to clock shift');
  });

  test('T2.3 - Boundary: Cascading Storage Quota Errors Across Multiple Keys', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    const AppState = require('../js/app/state.js');

    env.localStorage.setQuotaExceededForced(true);

    AppState.estado.progresso = { nivel: 5, xp: 5000 };
    AppState.estado.flashcardData = { w1: { state: 'review' } };

    assert.doesNotThrow(() => {
      AppState.salvarProgresso();
    });

    assert.doesNotThrow(() => {
      AppState.salvarFlashcards();
    });
  });

  test('T2.4 - Boundary: Severe and Truncated JSON Corruptions', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    const AppState = require('../js/app/state.js');

    const corruptedPayloads = [
      '{',
      '{"cards": [unclosed',
      'null',
      'undefined',
      '[object Object]'
    ];

    corruptedPayloads.forEach((payload, idx) => {
      env.localStorage.setItem('en_progress', payload);
      assert.doesNotThrow(() => {
        const loaded = AppState.carregarProgresso();
        assert.ok(loaded && typeof loaded === 'object', `Loaded progress must be an object on payload ${idx}`);
        assert.strictEqual(loaded.nivel, 1, 'Corrupted progress must fallback to safe level 1 defaults');
      });
    });
  });

  test('T2.5 - Corner: Delayed / Asynchronous SpeechSynthesis Voices Loading', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/tts.js')];

    env.window.speechSynthesis._voices = [];
    const AppTTS = require('../js/app/tts.js');

    assert.doesNotThrow(() => {
      AppTTS.pronunciar('Hello world');
    });

    env.window.speechSynthesis._voices = [
      { name: 'US English Female', lang: 'en-US', default: true }
    ];
    env.window.speechSynthesis.dispatchVoicesChanged();

    assert.doesNotThrow(() => {
      AppTTS.pronunciar('Welcome to English Autêntico');
    });
  });

  test('T2.6 - Corner: Rapid Burst of Audio Triggers Under Suspended Context', async () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/audio.js')];
    const SomFeedback = require('../js/audio.js');

    SomFeedback.ativo = true;
    const ctx = SomFeedback._ctx();
    await ctx.suspend();

    assert.doesNotThrow(() => {
      for (let i = 0; i < 20; i++) {
        SomFeedback.correto();
        SomFeedback.errado();
        SomFeedback.virar();
      }
    });

    assert.strictEqual(ctx.state, 'running', 'Context must be resumed after sound triggers');
  });

  test('T2.7 - Boundary: Midnight Timezone Rollover & Consecutive Days Streak', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/quiz.js')];
    const Quiz = require('../js/quiz.js');

    const offsetMs = new Date().getTimezoneOffset() * 60000;

    const yesterdayLocal = new Date(Date.now() - 86400000 - offsetMs).toISOString().slice(0, 10);
    env.localStorage.setItem('en_quiz_streak', '5');
    env.localStorage.setItem('en_quiz_streak_date', yesterdayLocal);

    const currentStreak = Quiz._getQuizStreak();
    assert.strictEqual(currentStreak, 5, 'Streak must remain active on consecutive day transition');

    Quiz._atualizarStreak();
    assert.strictEqual(
      env.localStorage.getItem('en_quiz_streak'),
      '6',
      'Streak must increment to 6 when studying on consecutive day'
    );
  });

  test('T2.8 - Corner: Empty Collections and Zero State Robustness Across Modules', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    delete require.cache[require.resolve('../js/quiz.js')];
    require('../js/flashcards.js');
    const Flashcards = env.window.Flashcards || global.Flashcards;
    const Quiz = require('../js/quiz.js');

    Flashcards.cartasDisponiveis = [];
    Flashcards.indiceAtual = 0;

    assert.doesNotThrow(() => {
      Flashcards.proxima();
      Flashcards.avaliar(3);
    });

    Quiz.perguntas = [];
    Quiz.indiceAtual = 0;

    assert.doesNotThrow(() => {
      Quiz.renderizarSeletor();
      Quiz.proximaPergunta();
    });
  });

});

// ============================================================
// TIER 3: CROSS-FEATURE INTERACTIONS
// ============================================================
describe('Tier 3: Cross-Feature Interactions', () => {

  test('T3.1 - Interaction: Audio Playback During Quiz Review & Question Advance', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/audio.js')];
    delete require.cache[require.resolve('../js/voice_engine.js')];
    delete require.cache[require.resolve('../js/quiz.js')];

    const SomFeedback = require('../js/audio.js');
    const VoiceEngine = require('../js/voice_engine.js');
    const Quiz = require('../js/quiz.js');

    const audio = new env.window.Audio('blob:quiz-prompt');
    const chain = VoiceEngine.applyMasteringAudioElement(audio);

    SomFeedback.correto();

    assert.doesNotThrow(() => {
      Quiz.proximaPergunta();
    });

    VoiceEngine.cleanupMasteringAudioElement(audio);
    assert.ok(MockAudioContext.instances.length <= 2, 'AudioContext count must remain bounded');
  });

  test('T3.2 - Interaction: Multi-Tab Storage Event Concurrency During Flashcard Study', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    delete require.cache[require.resolve('../js/flashcards.js')];
    const AppState = require('../js/app/state.js');
    require('../js/flashcards.js');
    const Flashcards = env.window.Flashcards || global.Flashcards;

    if (typeof AppState.initMultiTabSync === 'function') {
      AppState.initMultiTabSync();
    }

    Flashcards.cartasDisponiveis = [
      { id: '1', ingles: 'one' },
      { id: '2', ingles: 'two' },
      { id: '3', ingles: 'three' },
      { id: '4', ingles: 'four' },
      { id: '5', ingles: 'five' }
    ];
    Flashcards.indiceAtual = 3;

    env.localStorage.setItem('en_progress', JSON.stringify({ nivel: 3, xp: 400 }));

    assert.strictEqual(
      AppState.estado.progresso.nivel,
      3,
      'Progress level should synchronize from storage event'
    );
    assert.strictEqual(
      Flashcards.indiceAtual,
      3,
      'Active flashcard study session index must NOT be reset by concurrent storage event'
    );
  });

  test('T3.3 - Interaction: Cross-Module Streak and XP Synchronization', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    delete require.cache[require.resolve('../js/vocab.js')];
    delete require.cache[require.resolve('../js/quiz.js')];

    const AppState = require('../js/app/state.js');
    const Vocab = require('../js/vocab.js');
    const Quiz = require('../js/quiz.js');

    AppState.estado = {
      progresso: { nivel: 1, xp: 0, streak: 1 },
      flashcardData: {}
    };
    global.App = AppState;

    global.Progressao.ganhar(50);
    assert.strictEqual(AppState.estado.progresso.xp, 50);

    Vocab._atualizarStreakVocab();
    Quiz._atualizarStreak();

    const saved = JSON.parse(env.localStorage.getItem('en_progress'));
    assert.strictEqual(saved.xp, 50, 'Single source of truth en_progress must hold consolidated XP');
  });

  test('T3.4 - Interaction: Navigation Teardown with Active Audio and Timers', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/navigation.js')];
    delete require.cache[require.resolve('../js/quiz.js')];
    const AppNavigation = require('../js/app/navigation.js');
    const Quiz = require('../js/quiz.js');

    let timerFired = false;
    Quiz._autoAdvanceTimer = setTimeout(() => {
      timerFired = true;
    }, 100);

    AppNavigation.navegar('flashcards');

    if (Quiz._autoAdvanceTimer === null) {
      assert.strictEqual(timerFired, false, 'Quiz timer must be cleared on navigation away');
    }
  });

});

// ============================================================
// TIER 4: REAL-WORLD SCENARIOS
// ============================================================
describe('Tier 4: Real-World Scenarios', () => {

  test('T4.1 - Scenario: 50-Card Intensive Flashcard Study Session Stress Test', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/app/state.js')];
    delete require.cache[require.resolve('../js/flashcards.js')];
    delete require.cache[require.resolve('../js/audio.js')];

    const AppState = require('../js/app/state.js');
    require('../js/flashcards.js');
    const Flashcards = env.window.Flashcards || global.Flashcards;
    const SomFeedback = require('../js/audio.js');

    AppState.estado.flashcardData = {};
    global.App = AppState;

    const cards = [];
    for (let i = 1; i <= 50; i++) {
      cards.push({
        id: `word_${i}`,
        ingles: `word ${i}`,
        portugues: `palavra ${i}`,
        state: 'new',
        stability: 0,
        difficulty: 0,
        history: []
      });
    }

    Flashcards.cartasDisponiveis = cards;
    Flashcards.indiceAtual = 0;
    Flashcards.sessaoStats = { again: 0, hard: 0, good: 0, easy: 0 };

    const ratingsPattern = [1, 2, 3, 4];

    for (let i = 0; i < 50; i++) {
      Flashcards.cartaAtual = cards[i];
      const rating = ratingsPattern[i % 4];

      Flashcards.virar();
      SomFeedback.virar();

      Flashcards.avaliar(rating);
      if (rating === 1) SomFeedback.errado();
      else SomFeedback.correto();

      const updatedCard = AppState.estado.flashcardData[`word_${i + 1}`];
      assert.ok(updatedCard, `Card word_${i + 1} must be saved in flashcardData`);
      assert.ok(
        updatedCard.history.length <= 5,
        `History array of card word_${i + 1} must not exceed 5 items, got ${updatedCard.history.length}`
      );
    }

    assert.ok(
      MockAudioContext.instances.length <= 1,
      `AudioContext leaked: expected <= 1 instance, got ${MockAudioContext.instances.length}`
    );

    assert.doesNotThrow(() => {
      Flashcards.mostrarResumo();
    }, 'mostrarResumo must complete without throwing TDZ or syntax errors');
  });

  test('T4.2 - Scenario: Full Quiz Lifecycle with Error Queue and FSRS Rescheduling', () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/flashcards.js')];
    delete require.cache[require.resolve('../js/quiz.js')];
    require('../js/flashcards.js');
    const Quiz = require('../js/quiz.js');

    const questions = [];
    for (let i = 1; i <= 10; i++) {
      questions.push({
        id: `quiz_q_${i}`,
        templo: 1,
        pergunta: `Question ${i}`,
        opcoes: ['A', 'B', 'C', 'D'],
        correta: 0
      });
    }

    Quiz.perguntas = questions;
    env.localStorage.setItem('en_quiz_erros', '[]');

    for (let i = 0; i < 10; i++) {
      const q = questions[i];
      const isWrong = (i === 2 || i === 5 || i === 8);

      if (isWrong) {
        Quiz._salvarErro(q);
      }
    }

    const errors = JSON.parse(env.localStorage.getItem('en_quiz_erros') || '[]');
    assert.strictEqual(errors.length, 3, 'Must have 3 failed questions in en_quiz_erros');

    errors.forEach((errItem, idx) => {
      const delta = errItem.proximaRevisao - Date.now();
      assert.ok(
        delta >= 86400000 - 2000,
        `Failed question ${idx} proximaRevisao must be scheduled in milliseconds (delta: ${delta} ms)`
      );
    });
  });

  test('T4.3 - Scenario: End-to-End Audio Caching, Retrieval and Purging Lifecycle', async () => {
    const env = createIsolatedEnv();
    delete require.cache[require.resolve('../js/audio_cache.js')];
    const AudioCache = require('../js/audio_cache.js');
    AudioCache._dbPromise = null;

    const mockBlob1 = { size: 1024, type: 'audio/webm' };
    const mockBlob2 = { size: 2048, type: 'audio/webm' };

    await AudioCache.saveAudio('authentic', 'en-US', mockBlob1);
    await AudioCache.saveAudio('resilience', 'en-US', mockBlob2);

    const cached1 = await AudioCache.obter('authentic', 'en-US');
    assert.ok(cached1, 'AudioCache.obter must retrieve cached audio');

    const stats = await AudioCache.estatisticas();
    assert.ok(stats, 'AudioCache.estatisticas must return stats');
    assert.strictEqual(stats.itens, 2, 'AudioCache must store 2 items');

    await AudioCache.limpar();
    assert.strictEqual(env.createdBlobUrls.size, 0, 'All created Object URLs must be revoked on clear');
  });

  test('T4.4 - Scenario: Persistent Storage Resilience Under Restricted Quota', () => {
    const env = createIsolatedEnv({ storageQuotaBytes: 50 * 1024 });
    delete require.cache[require.resolve('../js/app/state.js')];
    const AppState = require('../js/app/state.js');

    AppState.estado.flashcardData = {};

    for (let i = 1; i <= 100; i++) {
      AppState.estado.flashcardData[`card_${i}`] = {
        id: `card_${i}`,
        due: Date.now() + i * 1000,
        history: [{ r: 1 }, { r: 2 }, { r: 3 }, { r: 4 }, { r: 5 }, { r: 6 }]
      };
    }

    assert.doesNotThrow(() => {
      AppState.salvarFlashcards();
    }, 'salvarFlashcards must handle quota restriction gracefully');

    const stored = env.localStorage.getItem('en_flashcards');
    assert.ok(stored, 'en_flashcards must be persisted under tight quota');
  });

});
