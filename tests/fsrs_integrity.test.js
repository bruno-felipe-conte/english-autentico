// ============================================================
// tests/fsrs_integrity.test.js
// Automated verification for FSRS-5 Integrity & Spaced Repetition
// Features: F1 (Quiz SRS Unit Mismatch), F7 (Timezone Streak Sync), F8 (FSRS NaN Poisoning Guard)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');

// Setup globals before loading modules
global.window = global;
global.document = {
  getElementById: (id) => ({
    id,
    innerHTML: '',
    textContent: '',
    style: {},
    dataset: {},
    offsetWidth: 100,
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    },
    querySelectorAll: () => [],
    querySelector: () => null,
    setAttribute: () => {},
    getAttribute: () => null,
    appendChild: () => {}
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};

const storageMap = new Map();
global.localStorage = {
  getItem: (k) => storageMap.has(k) ? storageMap.get(k) : null,
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

global.I18n = { t: (k) => k };
global.SomFeedback = { correto: () => {}, errado: () => {} };
global.App = {
  estado: {
    templosData: { 1: { nome: 'London', nivel: 'A1', palavras: [] } },
    vocabCache: []
  },
  notificar: () => {},
  ehFavorito: () => false
};
global.Progressao = {
  temploDesbloqueado: () => true,
  ganhar: () => {}
};

// Load flashcards.js to get real FSRS engine
delete require.cache[require.resolve('../js/flashcards.js')];
require('../js/flashcards.js');
const FSRS = global.FSRS;

test('🛡️ F8: FSRS mathematical methods are immune to NaN and undefined inputs', () => {
  assert.ok(FSRS, 'FSRS engine must exist');

  // Retrievability with degenerate values
  assert.strictEqual(FSRS.retrievability(0, 10), 1.0);
  assert.strictEqual(FSRS.retrievability(5, NaN), 1.0);
  assert.strictEqual(FSRS.retrievability(5, undefined), 1.0);
  assert.strictEqual(FSRS.retrievability(5, -1), 1.0);
  assert.strictEqual(FSRS.retrievability(NaN, 5), 1.0);
  assert.strictEqual(FSRS.retrievability(-2, 5), 1.0);

  // nextInterval with degenerate values
  assert.strictEqual(Number.isFinite(FSRS.nextInterval(NaN)), true);
  assert.ok(FSRS.nextInterval(NaN) >= 1);
  assert.strictEqual(Number.isFinite(FSRS.nextInterval(undefined)), true);
  assert.ok(FSRS.nextInterval(undefined) >= 1);
  assert.strictEqual(Number.isFinite(FSRS.nextInterval(-10)), true);
  assert.ok(FSRS.nextInterval(-10) >= 1);

  // initStability and initDifficulty bounds
  for (const rating of [1, 2, 3, 4, NaN, undefined, -1, 5]) {
    const s = FSRS.initStability(rating);
    assert.strictEqual(Number.isFinite(s), true, `initStability(${rating}) must be finite`);
    assert.ok(s >= 0.1, `initStability(${rating}) must be >= 0.1`);

    const d = FSRS.initDifficulty(rating);
    assert.strictEqual(Number.isFinite(d), true, `initDifficulty(${rating}) must be finite`);
    assert.ok(d >= 1 && d <= 10, `initDifficulty(${rating}) must be within [1, 10]`);
  }

  // nextDifficulty with corrupt d
  for (const badD of [NaN, undefined, -5, 25]) {
    const nextD = FSRS.nextDifficulty(badD, 3);
    assert.strictEqual(Number.isFinite(nextD), true);
    assert.ok(nextD >= 1 && nextD <= 10, `nextDifficulty with bad d=${badD} must be in [1, 10]`);
  }

  // nextRecallStability with corrupt inputs
  const recovS = FSRS.nextRecallStability(NaN, NaN, NaN, 3);
  assert.strictEqual(Number.isFinite(recovS), true);
  assert.ok(recovS >= 0.1);

  // nextForgetStability with corrupt inputs
  const forgS = FSRS.nextForgetStability(NaN, NaN, NaN);
  assert.strictEqual(Number.isFinite(forgS), true);
  assert.ok(forgS >= 0.1);
});

test('🛡️ F8: FSRS.review() prevents NaN cascade and prunes history to max 5 items', () => {
  // Degenerate card with missing/NaN values
  const corruptedCard = {
    stability: NaN,
    difficulty: undefined,
    lapses: null,
    reps: 'invalid',
    state: 'review',
    lastReview: NaN,
    history: [
      { timestamp: 1 },
      { timestamp: 2 },
      { timestamp: 3 },
      { timestamp: 4 },
      { timestamp: 5 },
      { timestamp: 6 },
      { timestamp: 7 }
    ]
  };

  const reviewed = FSRS.review(corruptedCard, 3); // Rating 3 = Good

  assert.strictEqual(Number.isFinite(reviewed.stability), true, 'Stability must be finite number');
  assert.ok(reviewed.stability > 0, 'Stability must be > 0');
  assert.strictEqual(Number.isFinite(reviewed.difficulty), true, 'Difficulty must be finite number');
  assert.ok(reviewed.difficulty >= 1 && reviewed.difficulty <= 10, 'Difficulty must be in [1, 10]');
  assert.strictEqual(Number.isFinite(reviewed.nextReview), true, 'nextReview must be finite timestamp');
  assert.ok(reviewed.nextReview > Date.now(), 'nextReview must be scheduled in the future');
  assert.strictEqual(Number.isFinite(reviewed.retrievability), true, 'retrievability must be finite');

  // Verify history pruning
  assert.strictEqual(Array.isArray(reviewed.history), true);
  assert.strictEqual(reviewed.history.length, 5, 'History must be pruned to max 5 items');
  // Check the last record is the new one
  assert.strictEqual(reviewed.history[4].rating, 3);

  // JSON serialization test (JSON.stringify converts NaN to null, which must not happen)
  const jsonStr = JSON.stringify(reviewed);
  const parsed = JSON.parse(jsonStr);
  assert.notStrictEqual(parsed.stability, null);
  assert.notStrictEqual(parsed.difficulty, null);
  assert.notStrictEqual(parsed.nextReview, null);

  // previewIntervals test with corrupted card
  const intervals = FSRS.previewIntervals(corruptedCard);
  assert.strictEqual(intervals.length, 4);
  intervals.forEach((interval, idx) => {
    assert.strictEqual(Number.isFinite(interval), true, `Interval ${idx + 1} must be finite`);
    assert.ok(interval >= 1, `Interval ${idx + 1} must be >= 1 day`);
  });
});

test('🧠 F1: Quiz SRS converts FSRS nextInterval from days to milliseconds', () => {
  storageMap.clear();

  // Load Quiz module
  delete require.cache[require.resolve('../js/quiz.js')];
  const Quiz = require('../js/quiz.js');

  // Real FSRS is on window
  global.window.FSRS = FSRS;

  const mockQuestion = {
    id: 'q_unit_test',
    pergunta: 'What is the past of run?',
    opcoes: ['ran', 'runned', 'running'],
    resposta_correta: 'ran',
    explicacao: 'Ran is the past tense of run.'
  };

  Quiz.perguntas = [mockQuestion];
  Quiz.perguntaAtual = 0;
  Quiz.respondido = false;

  const beforeTime = Date.now();
  // Wrong answer triggers SRS error queuing
  Quiz.checarResposta('runned');

  const filaErros = JSON.parse(storageMap.get('en_quiz_erros') || '[]');
  assert.strictEqual(filaErros.length, 1);
  const erroSalvo = filaErros[0];

  assert.strictEqual(erroSalvo.id, 'q_unit_test');
  assert.strictEqual(Number.isFinite(erroSalvo.proximaRevisao), true);

  // In FSRS, rating 1 (Again) produces stability ~0.4, nextInterval returns 1 (day).
  // 1 day = 86,400,000 milliseconds.
  // Before fix, it was scheduled 1ms later: Date.now() + 1.
  // With fix, it must be scheduled ~24h later: Date.now() + 86400000.
  const diffMs = erroSalvo.proximaRevisao - beforeTime;
  assert.ok(
    diffMs >= 86400000 - 5000 && diffMs <= 86400000 + 5000,
    `proximaRevisao should be scheduled ~24h in the future, got diffMs=${diffMs}`
  );
});

test('🕒 F7: Timezone Streak Sync handles UTC-3 study between 21:00 and 23:59 without false resets', () => {
  storageMap.clear();

  // Load Quiz module
  delete require.cache[require.resolve('../js/quiz.js')];
  const Quiz = require('../js/quiz.js');

  // Simulate local time: Oct 30, 2026 at 22:30 in UTC-3
  // In UTC-3, getTimezoneOffset() returns +180 minutes.
  const origDate = global.Date;
  const origTimezoneOffset = Date.prototype.getTimezoneOffset;

  try {
    // Mock timezone offset to UTC-3 (180 minutes)
    Date.prototype.getTimezoneOffset = function() { return 180; };

    // At 22:30 in UTC-3 (01:30 next day in UTC):
    // Local date: "2026-10-30", UTC date: "2026-10-31"
    const offsetMs = 180 * 60000;
    const localNow = new Date('2026-10-30T22:30:00-03:00').getTime();

    // Set Date.now to localNow
    const origDateNow = Date.now;
    Date.now = () => localNow;

    // First study session on 2026-10-30
    Quiz._atualizarStreak();
    assert.strictEqual(storageMap.get('en_quiz_streak'), '1');
    assert.strictEqual(storageMap.get('en_quiz_streak_date'), '2026-10-30');

    // Next day study session on 2026-10-31 at 22:45 in UTC-3
    const nextDayLocalNow = new Date('2026-10-31T22:45:00-03:00').getTime();
    Date.now = () => nextDayLocalNow;

    Quiz._atualizarStreak();
    assert.strictEqual(storageMap.get('en_quiz_streak'), '2', 'Streak should increment to 2');
    assert.strictEqual(storageMap.get('en_quiz_streak_date'), '2026-10-31');

    // Check _getQuizStreak()
    const activeStreak = Quiz._getQuizStreak();
    assert.strictEqual(activeStreak, 2, 'Active streak should be 2');

    Date.now = origDateNow;
  } finally {
    Date.prototype.getTimezoneOffset = origTimezoneOffset;
  }
});
