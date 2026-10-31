// ============================================================
// tests/storage_m3.test.js — Storage Quota, Persistence & Multi-Tab Sync (M3)
// ============================================================
const assert = require('assert');
const test = require('node:test');

// Mock browser globals
global.window = global;
global._eventListeners = {};
global.window.addEventListener = (evt, fn) => {
  if (!global._eventListeners[evt]) global._eventListeners[evt] = [];
  global._eventListeners[evt].push(fn);
};
global.document = {
  getElementById: (id) => {
    if (id === 'stat-energy') return { textContent: '' };
    return null;
  },
  body: {
    classList: {
      toggle: (cls, val) => {
        global._bodyTheme = val ? cls : '';
      }
    }
  },
  addEventListener: () => {}
};
global.localStorage = {
  _store: {},
  getItem(k) { return Object.prototype.hasOwnProperty.call(this._store, k) ? this._store[k] : null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; },
  key(i) { return Object.keys(this._store)[i] || null; },
  get length() { return Object.keys(this._store).length; }
};
global.alert = (msg) => { global._lastAlert = msg; };
global.I18n = {
  t(k) {
    if (k === 'storage_limite_fc') return 'Limite de armazenamento! Executando limpeza automática...';
    if (k === 'storage_limite') return 'Limite de armazenamento atingido!';
    return k;
  }
};

const AppState = require('../js/app/state.js');
const Vocab = require('../js/vocab.js');

test.beforeEach(() => {
  global.localStorage.clear();
  global._lastAlert = null;
  global._bodyTheme = '';
  global.I18n = {
    t(k) {
      if (k === 'storage_limite_fc') return 'Limite de armazenamento! Executando limpeza automática...';
      if (k === 'storage_limite') return 'Limite de armazenamento atingido!';
      return k;
    }
  };
});

// ============================================================
// F9: Storage Quota GC Repair
// ============================================================
test('💾 F9.1: QuotaExceededError prunes flashcard history arrays to max 3 entries on object map', () => {
  // Prepara cards com histórico excessivo (> 3)
  AppState.estado.flashcardData = {
    'c1': {
      id: 'c1',
      due: Date.now() + 10000,
      history: [
        { r: 1 }, { r: 2 }, { r: 3 }, { r: 4 }, { r: 5 }, { r: 6 }
      ]
    },
    'c2': {
      id: 'c2',
      due: Date.now() + 20000,
      history: [
        { r: 1 }, { r: 2 }, { r: 3 }, { r: 4 }
      ]
    }
  };

  let quotaAttempts = 0;
  const originalSetItem = global.localStorage.setItem;
  global.localStorage.setItem = function(k, v) {
    if (k === 'en_flashcards' && quotaAttempts === 0) {
      quotaAttempts++;
      const err = new Error('QuotaExceededError');
      err.name = 'QuotaExceededError';
      throw err;
    }
    return originalSetItem.call(this, k, v);
  };

  try {
    AppState.salvarFlashcards();

    assert.ok(quotaAttempts >= 1, 'Deve ter disparado QuotaExceededError');
    assert.strictEqual(AppState.estado.flashcardData['c1'].history.length, 3, 'c1 history deve ter sido podado para 3');
    assert.strictEqual(AppState.estado.flashcardData['c2'].history.length, 3, 'c2 history deve ter sido podado para 3');
    assert.ok(global._lastAlert && (global._lastAlert.includes('limpeza') || global._lastAlert === 'storage_limite_fc'), 'Deve alertar o usuário');

    // Verifica que foi salvo com sucesso
    const saved = JSON.parse(global.localStorage.getItem('en_flashcards'));
    assert.strictEqual(saved['c1'].history.length, 3);
  } finally {
    global.localStorage.setItem = originalSetItem;
  }
});

test('💾 F9.2: QuotaExceededError prunes oldest inactive cards if history pruning is insufficient', () => {
  AppState.estado.flashcardData = {};
  for (let i = 1; i <= 10; i++) {
    AppState.estado.flashcardData[`word_${i}`] = {
      id: `word_${i}`,
      due: 1000 + i * 100, // word_1 é a mais antiga
      history: [{ r: 3 }] // history já compacto <= 3
    };
  }

  let quotaAttempts = 0;
  const originalSetItem = global.localStorage.setItem;
  global.localStorage.setItem = function(k, v) {
    if (k === 'en_flashcards' && quotaAttempts < 2) {
      quotaAttempts++;
      const err = new Error('QuotaExceededError');
      err.name = 'QuotaExceededError';
      throw err;
    }
    return originalSetItem.call(this, k, v);
  };

  try {
    AppState.salvarFlashcards();

    const keysRemaining = Object.keys(AppState.estado.flashcardData);
    assert.ok(keysRemaining.length < 10, 'Deve ter podado cartas inativas');
    assert.strictEqual(AppState.estado.flashcardData['word_1'], undefined, 'word_1 mais antiga deve ter sido podada');
  } finally {
    global.localStorage.setItem = originalSetItem;
  }
});

test('💾 F9.3: QuotaExceededError maintains compatibility with legacy array format', () => {
  AppState.estado.flashcardData = {
    cards: new Array(30).fill({}).map((_, i) => ({ id: `card_${i}`, deck: 't1' }))
  };

  let quotaTriggered = false;
  const originalSetItem = global.localStorage.setItem;
  global.localStorage.setItem = function(k, v) {
    if (k === 'en_flashcards' && !quotaTriggered) {
      quotaTriggered = true;
      const err = new Error('QuotaExceededError');
      err.name = 'QuotaExceededError';
      throw err;
    }
    return originalSetItem.call(this, k, v);
  };

  try {
    AppState.salvarFlashcards();
    assert.strictEqual(AppState.estado.flashcardData.cards.length, 10, '30 - 20 = 10 cards restantes');
    assert.ok(quotaTriggered);
  } finally {
    global.localStorage.setItem = originalSetItem;
  }
});

// ============================================================
// F10: Remove Grammar from LocalStorage
// ============================================================
test('🧹 F10: Grammatica.carregar removes 1.5MB en_swr_grammar and keeps data in memory', async () => {
  // Simula lixo pré-existente de 1.5MB no localStorage
  global.localStorage.setItem('en_swr_grammar', JSON.stringify({ old: true }));

  // Mock fetch para data/grammar.json
  const mockGrammar = {
    moduli: [
      { id: 'a1', nome: 'Iniciante', lezioni: [] }
    ]
  };
  global.fetch = async (url) => {
    if (url === 'data/grammar.json') {
      return {
        ok: true,
        json: async () => mockGrammar
      };
    }
    return { ok: false };
  };

  delete require.cache[require.resolve('../js/grammar.js')];
  const Grammatica = require('../js/grammar.js');
  Grammatica.dados = null;

  await Grammatica.carregar();

  // 1. Chave deve ser removida do localStorage
  assert.strictEqual(global.localStorage.getItem('en_swr_grammar'), null, 'en_swr_grammar deve ser purgado');
  // 2. Dados devem estar em memória
  assert.strictEqual(Grammatica.dados.moduli.length, 1);
  assert.strictEqual(Grammatica.dados.moduli[0].id, 'a1');
});

// ============================================================
// F11: JSON Corruption Backup & Quarantine
// ============================================================
test('🛡️ F11.1: Flashcards write-ahead backup creates en_flashcards_bak', () => {
  AppState.estado.flashcardData = { 'hello': { id: 'hello', stability: 2.5 } };
  AppState.salvarFlashcards();

  const primary = global.localStorage.getItem('en_flashcards');
  const backup = global.localStorage.getItem('en_flashcards_bak');
  assert.ok(primary !== null);
  assert.ok(backup !== null);
  assert.strictEqual(primary, backup);
});

test('🛡️ F11.2: Corrupted en_flashcards restores from backup and quarantines corrupted raw data', () => {
  const goodData = { 'valid': { id: 'valid', reps: 5 } };
  global.localStorage.setItem('en_flashcards_bak', JSON.stringify(goodData));
  // Injeta corrupção catastrófica (JSON truncado ou corrompido)
  global.localStorage.setItem('en_flashcards', '{"valid": { id: "valid", reps: 5');

  const loaded = AppState.carregarFlashcards();

  // 1. Restaurou dados corretos
  assert.deepStrictEqual(loaded, goodData);
  // 2. Quarentenou string corrompida
  assert.ok(global.localStorage.getItem('en_corrupt_flashcards') !== null);
  assert.strictEqual(global.localStorage.getItem('en_corrupt_flashcards'), '{"valid": { id: "valid", reps: 5');
  // 3. Chave primária foi corrigida
  assert.strictEqual(global.localStorage.getItem('en_flashcards'), JSON.stringify(goodData));
});

test('🛡️ F11.3: Progress write-ahead backup creates en_progress_bak', () => {
  AppState.estado.progresso = { nivel: 2, xp: 250, streak: 3 };
  AppState.salvarProgresso();

  const primary = global.localStorage.getItem('en_progress');
  const backup = global.localStorage.getItem('en_progress_bak');
  assert.ok(primary !== null);
  assert.ok(backup !== null);
  assert.strictEqual(primary, backup);
});

test('🛡️ F11.4: Corrupted en_progress restores from backup and quarantines corrupted raw data', () => {
  const goodProgress = { nivel: 3, xp: 800, streak: 12, templos_desbloqueados: [1, 2, 3] };
  global.localStorage.setItem('en_progress_bak', JSON.stringify(goodProgress));
  global.localStorage.setItem('en_progress', 'CORRUPT_NOT_JSON_{{');

  const loaded = AppState.carregarProgresso();

  // 1. Restaurou dados corretos
  assert.strictEqual(loaded.nivel, 3);
  assert.strictEqual(loaded.streak, 12);
  // 2. Quarentenou dado corrompido
  assert.strictEqual(global.localStorage.getItem('en_corrupt_progress'), 'CORRUPT_NOT_JSON_{{');
  // 3. Chave primária corrigida
  const repaired = JSON.parse(global.localStorage.getItem('en_progress'));
  assert.strictEqual(repaired.nivel, 3);
});

// ============================================================
// F12: Storage Key Alignment
// ============================================================
test('🔑 F12.1: Vocab streak, achievements, and quest write to en_progress (never en_progresso)', () => {
  global.App = {
    estado: {
      progresso: { nivel: 1, xp: 50 },
      flashcardData: {},
      vocabCache: [{ id: 'w1' }, { id: 'w2' }]
    },
    salvarProgresso() {
      global.localStorage.setItem('en_progress', JSON.stringify(this.estado.progresso));
    },
    notificar() {}
  };

  // Testa streak
  Vocab._atualizarStreakVocab();
  assert.strictEqual(global.localStorage.getItem('en_progresso'), null, 'en_progresso jamais deve ser escrito');
  assert.ok(global.localStorage.getItem('en_progress') !== null);
  const prog1 = JSON.parse(global.localStorage.getItem('en_progress'));
  assert.strictEqual(prog1.vocab_streak, 1);

  // Testa conquistas
  Vocab._verificarConquistasVocab(3);
  assert.strictEqual(global.localStorage.getItem('en_progresso'), null);
  const prog2 = JSON.parse(global.localStorage.getItem('en_progress'));
  assert.ok(prog2.vocab_conquistas.includes('streak3'));

  // Testa daily quest
  Vocab.dailyQuestVocab();
  assert.strictEqual(global.localStorage.getItem('en_progresso'), null);
  const prog3 = JSON.parse(global.localStorage.getItem('en_progress'));
  assert.strictEqual(prog3.vocab_daily_quest.tipo, 'vocab');
});

test('🔑 F12.2: _migrateLegacyStorage merges en_progresso into en_progress and removes en_progresso', () => {
  global.localStorage.setItem('en_progresso', JSON.stringify({
    vocab_streak: 5,
    vocab_conquistas: ['streak3'],
    vocab_daily_quest: { data: '2026-10-31' }
  }));
  global.localStorage.setItem('en_progress', JSON.stringify({
    nivel: 2,
    xp: 300
  }));

  AppState._migrateLegacyStorage();

  assert.strictEqual(global.localStorage.getItem('en_progresso'), null, 'en_progresso deve ser removido após migração');
  const merged = JSON.parse(global.localStorage.getItem('en_progress'));
  assert.strictEqual(merged.nivel, 2);
  assert.strictEqual(merged.vocab_streak, 5);
  assert.deepStrictEqual(merged.vocab_conquistas, ['streak3']);
});

// ============================================================
// F13: Multi-Tab State Sync
// ============================================================
test('🔄 F13.1: storage event on en_progress reconciles in-memory state and notifies subscribers', () => {
  AppState.estado.progresso = { nivel: 1, xp: 50 };
  let notifiedKey = null;
  let notifiedData = null;

  const unsubscribe = AppState.subscribe((key, data) => {
    notifiedKey = key;
    notifiedData = data;
  });

  const remoteProgress = { nivel: 2, xp: 500, streak: 4 };
  AppState._handleStorageEvent({
    key: 'en_progress',
    newValue: JSON.stringify(remoteProgress)
  });

  assert.strictEqual(AppState.estado.progresso.nivel, 2);
  assert.strictEqual(AppState.estado.progresso.xp, 500);
  assert.strictEqual(notifiedKey, 'en_progress');
  assert.deepStrictEqual(notifiedData, remoteProgress);

  unsubscribe();
});

test('🔄 F13.2: storage event on en_flashcards reconciles in-memory state and notifies subscribers', () => {
  AppState.estado.flashcardData = { 'old': { id: 'old' } };
  let notifiedKey = null;

  AppState.subscribe((key) => {
    notifiedKey = key;
  });

  const remoteCards = { 'apple': { id: 'apple', reps: 3 } };
  AppState._handleStorageEvent({
    key: 'en_flashcards',
    newValue: JSON.stringify(remoteCards)
  });

  assert.deepStrictEqual(AppState.estado.flashcardData, remoteCards);
  assert.strictEqual(notifiedKey, 'en_flashcards');
});

test('🔄 F13.3: storage event with null newValue or invalid JSON does not corrupt in-memory state', () => {
  AppState.estado.progresso = { nivel: 5, xp: 2000 };

  // Caso 1: Deleção em outra aba (newValue === null) não deve limpar estado em memória
  AppState._handleStorageEvent({
    key: 'en_progress',
    newValue: null
  });
  assert.strictEqual(AppState.estado.progresso.nivel, 5);

  // Caso 2: JSON inválido não quebra nem altera estado
  AppState._handleStorageEvent({
    key: 'en_progress',
    newValue: '{ invalid_syntax'
  });
  assert.strictEqual(AppState.estado.progresso.nivel, 5);
});
