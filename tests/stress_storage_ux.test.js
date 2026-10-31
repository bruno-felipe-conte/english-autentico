// ============================================================
// tests/stress_storage_ux.test.js
// Adversarial Empirical Stress Suite: Storage Persistence, Quota & UX Keybindings
// Challenger 2 (Storage & UX Adversarial Challenger)
// ============================================================

const assert = require('node:assert/strict');
const test = require('node:test');

// Isolated in-memory storage mock
function createMockStorage() {
  const store = {};
  return {
    _store: store,
    getItem(k) {
      return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
    },
    setItem(k, v) {
      store[k] = String(v);
    },
    removeItem(k) {
      delete store[k];
    },
    clear() {
      for (const k of Object.keys(store)) delete store[k];
    },
    key(i) {
      return Object.keys(store)[i] || null;
    },
    get length() {
      return Object.keys(store).length;
    }
  };
}

function createMockElement(id) {
  const classes = new Set();
  return {
    id,
    style: {},
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
      toggle: (c, val) => { if (val) classes.add(c); else classes.delete(c); }
    },
    setAttribute: () => {},
    getAttribute: () => null,
    innerHTML: '',
    textContent: ''
  };
}

// Reset shared test harness
function resetEnvironment() {
  const storage = createMockStorage();
  global.localStorage = storage;
  global.window = global;
  global.alert = () => {};
  global.I18n = {
    t: (k) => {
      if (k === 'storage_limite_fc') return 'Limite de armazenamento! Executando limpeza automática...';
      if (k === 'storage_limite') return 'Limite de armazenamento atingido!';
      return k;
    }
  };
  global.SomFeedback = {
    init: () => {},
    virar: () => {},
    correto: () => {},
    errado: () => {}
  };
  global.Progressao = {
    nivel: 1,
    xp: 0,
    ganhar: () => {},
    temploConcluido: () => false,
    marcarTemploConcluido: () => {},
    verificarDesbloqueioTemplos: () => {}
  };
  global.App = {
    notificar: () => {},
    salvarProgresso: () => {},
    salvarFlashcards: () => {},
    atualizarStats: () => {},
    estado: {
      progresso: { nivel: 1, xp: 0, streak: 1 },
      flashcardData: {},
      vocabCache: []
    }
  };
  return storage;
}

// ============================================================
// 1. STORAGE QUOTA ADVERSARIAL STRESS TESTS
// ============================================================
test('💾 Quota Stress 1: Saving 500+ cards with bloated history prunes to max 3 entries on QuotaExceededError', () => {
  const storage = resetEnvironment();
  let alertMessage = null;
  global.alert = (msg) => { alertMessage = msg; };

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  // Populate 550 cards with 8 history records each
  AppState.estado.flashcardData = {};
  for (let i = 0; i < 550; i++) {
    AppState.estado.flashcardData[`card_${i}`] = {
      id: `card_${i}`,
      due: 1700000000000 + i * 1000,
      stability: 2.5,
      difficulty: 3.1,
      history: [
        { r: 1, t: 100 }, { r: 3, t: 200 }, { r: 3, t: 300 },
        { r: 4, t: 400 }, { r: 2, t: 500 }, { r: 3, t: 600 },
        { r: 4, t: 700 }, { r: 3, t: 800 }
      ]
    };
  }

  let quotaTriggerCount = 0;
  const originalSetItem = storage.setItem;
  storage.setItem = function(k, v) {
    if (k === 'en_flashcards' && quotaTriggerCount === 0) {
      quotaTriggerCount++;
      const quotaErr = new Error('QuotaExceededError: Dom storage limit exceeded');
      quotaErr.name = 'QuotaExceededError';
      throw quotaErr;
    }
    return originalSetItem.call(this, k, v);
  };

  // Execution must not throw
  assert.doesNotThrow(() => {
    AppState.salvarFlashcards();
  });

  assert.strictEqual(quotaTriggerCount, 1, 'QuotaExceededError must have been triggered once');
  assert.ok(alertMessage && alertMessage.includes('limpeza'), 'User must be notified of auto-cleanup');

  // Verify all 550 cards have history pruned to <= 3 items
  const savedData = JSON.parse(storage.getItem('en_flashcards'));
  assert.strictEqual(Object.keys(savedData).length, 550, 'All 550 cards retained after history compaction');
  for (let i = 0; i < 550; i++) {
    const card = savedData[`card_${i}`];
    assert.strictEqual(
      card.history.length,
      3,
      `Card card_${i} history length must be exactly 3, got ${card.history.length}`
    );
  }

  // Backup must also be updated with pruned data
  const backupData = JSON.parse(storage.getItem('en_flashcards_bak'));
  assert.strictEqual(backupData['card_0'].history.length, 3);
});

test('💾 Quota Stress 2: 500+ cards where history is already compact prunes oldest 20 inactive cards by due timestamp', () => {
  const storage = resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  // Populate 500 cards, history already compact (1 entry each), ascending due timestamps
  AppState.estado.flashcardData = {};
  for (let i = 0; i < 500; i++) {
    AppState.estado.flashcardData[`c_${i}`] = {
      id: `c_${i}`,
      due: 1000 + i * 10, // c_0 is oldest due, c_499 is newest
      history: [{ r: 3, t: 100 }]
    };
  }

  let quotaAttempts = 0;
  const originalSetItem = storage.setItem;
  storage.setItem = function(k, v) {
    if (k === 'en_flashcards' && quotaAttempts === 0) {
      quotaAttempts++;
      const quotaErr = new Error('QuotaExceededError');
      quotaErr.name = 'QuotaExceededError';
      throw quotaErr;
    }
    return originalSetItem.call(this, k, v);
  };

  assert.doesNotThrow(() => {
    AppState.salvarFlashcards();
  });

  assert.strictEqual(quotaAttempts, 1, 'QuotaExceededError triggered on initial write');

  // Verify 20 oldest cards were pruned (500 -> 480)
  const remainingKeys = Object.keys(AppState.estado.flashcardData);
  assert.strictEqual(remainingKeys.length, 480, 'Must prune 20 oldest cards (500 - 20 = 480)');
  assert.strictEqual(AppState.estado.flashcardData['c_0'], undefined, 'Oldest card c_0 must be pruned');
  assert.strictEqual(AppState.estado.flashcardData['c_19'], undefined, 'Oldest card c_19 must be pruned');
  assert.ok(AppState.estado.flashcardData['c_20'] !== undefined, 'Card c_20 and beyond must be preserved');

  const saved = JSON.parse(storage.getItem('en_flashcards'));
  assert.strictEqual(Object.keys(saved).length, 480);
});

test('💾 Quota Stress 3: Continuous quota error never throws unhandled exception to caller', () => {
  const storage = resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  storage.setItem = function(k, v) {
    if (k === 'en_flashcards') {
      const quotaErr = new Error('NS_ERROR_DOM_QUOTA_REACHED');
      quotaErr.name = 'NS_ERROR_DOM_QUOTA_REACHED';
      throw quotaErr;
    }
  };

  AppState.estado.flashcardData = { 'card_x': { id: 'card_x', history: [] } };

  assert.doesNotThrow(() => {
    AppState.salvarFlashcards();
  });
});

test('💾 Quota Stress 4: QuotaExceededError during salvarProgresso alerts user and does not crash', () => {
  const storage = resetEnvironment();
  let alertCalled = false;
  global.alert = (msg) => { alertCalled = true; };
  global.I18n = { t: (k) => k === 'storage_limite' ? 'Limite de progresso atingido' : k };

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  storage.setItem = function(k, v) {
    if (k === 'en_progress') {
      const quotaErr = new Error('QuotaExceededError');
      quotaErr.name = 'QuotaExceededError';
      throw quotaErr;
    }
  };

  AppState.estado.progresso = { nivel: 5, xp: 5000 };

  assert.doesNotThrow(() => {
    AppState.salvarProgresso();
  });
  assert.strictEqual(alertCalled, true, 'User must receive quota alert on progress save failure');
});

// ============================================================
// 2. CORRUPTION RECOVERY ADVERSARIAL STRESS TESTS
// ============================================================
test('🛡️ Corruption Stress 1: Truncated JSON in en_flashcards restores from _bak and quarantines bad string', () => {
  const storage = resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  const validCards = {
    'word_1': { id: 'word_1', stability: 4.2, reps: 5, history: [{ r: 3 }] },
    'word_2': { id: 'word_2', stability: 1.8, reps: 2, history: [{ r: 1 }] }
  };
  storage.setItem('en_flashcards_bak', JSON.stringify(validCards));

  // Truncated JSON chunk (abrupt app kill mid-write)
  const truncatedBadData = '{"word_1":{"id":"word_1","stability":4.2,"reps":5,"history":[{"r":3}],"word_2":{"id":"wor';
  storage.setItem('en_flashcards', truncatedBadData);

  const restored = AppState.carregarFlashcards();

  assert.deepStrictEqual(restored, validCards, 'Must restore complete valid cards from backup');
  assert.strictEqual(storage.getItem('en_corrupt_flashcards'), truncatedBadData, 'Corrupted data quarantined');
  assert.strictEqual(
    storage.getItem('en_flashcards'),
    JSON.stringify(validCards),
    'Primary storage key healed with backup data'
  );
});

test('🛡️ Corruption Stress 2: Binary gibberish and control characters in en_progress restores from _bak and quarantines', () => {
  const storage = resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  const validProgress = {
    nivel: 4,
    xp: 1250,
    streak: 15,
    meta_diaria: 100,
    templos_desbloqueados: [1, 2, 3]
  };
  storage.setItem('en_progress_bak', JSON.stringify(validProgress));

  // Binary bytes & null characters
  const binaryGibberish = '\x00\xFF\xFE\x01\x89\xDE\xAD\xBE\xEF<MALFORMED_BLOB_BYTE_STREAM>';
  storage.setItem('en_progress', binaryGibberish);

  const restored = AppState.carregarProgresso();

  assert.strictEqual(restored.nivel, 4);
  assert.strictEqual(restored.xp, 1250);
  assert.strictEqual(restored.streak, 15);
  assert.strictEqual(storage.getItem('en_corrupt_progress'), binaryGibberish, 'Binary gibberish quarantined');
  assert.strictEqual(JSON.parse(storage.getItem('en_progress')).nivel, 4, 'Primary key healed');
});

test('🛡️ Corruption Stress 3: Missing primary key with valid _bak restores state seamlessly', () => {
  const storage = resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  const backupCards = { 'rescued': { id: 'rescued', due: 9999 } };
  storage.setItem('en_flashcards_bak', JSON.stringify(backupCards));
  storage.removeItem('en_flashcards');

  const loaded = AppState.carregarFlashcards();

  assert.deepStrictEqual(loaded, backupCards, 'Restores cards from backup when primary key is missing');
  assert.strictEqual(storage.getItem('en_flashcards'), JSON.stringify(backupCards), 'Re-saves primary key');
});

test('🛡️ Corruption Stress 4 (Empirical Bug Hunt): Literal string "null" in en_flashcards returns null instead of recovering from _bak', () => {
  const storage = resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  const validCards = { 'word_1': { id: 'word_1', reps: 3 } };
  storage.setItem('en_flashcards_bak', JSON.stringify(validCards));
  storage.setItem('en_flashcards', 'null'); // literal string "null"

  const result = AppState.carregarFlashcards();

  // Resiliency verification: JSON.parse("null") returns null without throwing SyntaxError.
  // carregarFlashcards() validates that the result is a non-null object map,
  // rejects literal "null", and successfully restores the valid state from backup!
  assert.deepStrictEqual(
    result,
    validCards,
    'carregarFlashcards() successfully recovers valid state from backup when storage contains literal "null"'
  );
});

// ============================================================
// 3. MULTI-TAB SYNCHRONIZATION ADVERSARIAL STRESS TESTS
// ============================================================
test('🔄 Multi-Tab Stress 1: 100 rapid concurrent storage events update in-memory state and dispatch all notifications', () => {
  resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  const receivedNotifications = [];
  const unsubscribe = AppState.subscribe((key, data) => {
    receivedNotifications.push({ key, data });
  });

  // Burst of 100 alternating storage events
  for (let i = 1; i <= 100; i++) {
    if (i % 2 === 0) {
      AppState._handleStorageEvent({
        key: 'en_progress',
        newValue: JSON.stringify({ nivel: i, xp: i * 50, streak: Math.floor(i / 10) })
      });
    } else {
      AppState._handleStorageEvent({
        key: 'en_flashcards',
        newValue: JSON.stringify({ [`c_${i}`]: { id: `c_${i}`, reps: i } })
      });
    }
  }

  assert.strictEqual(receivedNotifications.length, 100, 'All 100 notifications must be dispatched');
  assert.strictEqual(AppState.estado.progresso.nivel, 100, 'Latest progress state must match iteration 100');
  assert.strictEqual(AppState.estado.progresso.xp, 5000);
  assert.strictEqual(AppState.estado.flashcardData['c_99'].reps, 99, 'Latest flashcard state must match iteration 99');

  unsubscribe();
});

test('🔄 Multi-Tab Stress 2: External key deletion (newValue === null) does not wipe in-memory state', () => {
  resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  AppState.estado.progresso = { nivel: 7, xp: 9500 };
  AppState.estado.flashcardData = { 'c_saved': { id: 'c_saved' } };

  // Tab B calls localStorage.removeItem('en_progress')
  AppState._handleStorageEvent({
    key: 'en_progress',
    newValue: null
  });
  AppState._handleStorageEvent({
    key: 'en_flashcards',
    newValue: null
  });

  assert.strictEqual(AppState.estado.progresso.nivel, 7, 'In-memory progress must survive external deletion');
  assert.ok(AppState.estado.flashcardData['c_saved'], 'In-memory cards must survive external deletion');
});

test('🔄 Multi-Tab Stress 3: External corrupted JSON event does not crash or corrupt existing state', () => {
  resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  AppState.estado.progresso = { nivel: 3, xp: 400 };

  assert.doesNotThrow(() => {
    AppState._handleStorageEvent({
      key: 'en_progress',
      newValue: '{"incomplete_chunk": {'
    });
  });

  assert.strictEqual(AppState.estado.progresso.nivel, 3, 'In-memory progress remains uncorrupted');
});

test('🔄 Multi-Tab Stress 4: Theme and sound events trigger side-effects and notify subscribers', () => {
  resetEnvironment();

  delete require.cache[require.resolve('../js/app/state.js')];
  const AppState = require('../js/app/state.js');

  let themeClass = '';
  global.document = {
    body: {
      classList: {
        toggle: (cls, active) => {
          themeClass = active ? cls : '';
        }
      }
    }
  };

  let soundInited = false;
  global.SomFeedback = {
    init: () => { soundInited = true; }
  };

  AppState._handleStorageEvent({ key: 'en_tema', newValue: 'dark' });
  assert.strictEqual(themeClass, 'dark-mode');

  AppState._handleStorageEvent({ key: 'en_som', newValue: 'true' });
  assert.strictEqual(soundInited, true);
});

// ============================================================
// 4. KEYBINDINGS & UX ERGONOMICS ADVERSARIAL STRESS TESTS
// ============================================================
test('⌨️ Keybinding Stress 1: Numeric keys 1-5 never navigate sections when in active flashcard study session', async () => {
  resetEnvironment();

  delete require.cache[require.resolve('../js/app/bootstrap.js')];
  const AppBootstrap = require('../js/app/bootstrap.js');

  let navigatedTo = null;
  AppBootstrap.navegar = (sec) => { navigatedTo = sec; };
  AppBootstrap.carregarDados = async () => {};
  AppBootstrap.estado = { flashcardData: {}, progresso: {} };

  const docListeners = {};
  global.document = {
    addEventListener(evt, fn) {
      if (!docListeners[evt]) docListeners[evt] = [];
      docListeners[evt].push(fn);
    },
    querySelector(sel) {
      if (sel.includes('#sec-flashcards.active')) return { id: 'sec-flashcards' };
      return null;
    },
    getElementById(id) {
      if (id === 'sec-flashcards') return { classList: { contains: (c) => c === 'active' } };
      return null;
    }
  };
  global.window = {
    addEventListener: () => {},
    location: { hash: '' }
  };

  await AppBootstrap.init();
  const keydown = docListeners['keydown'][0];

  // Rapid burst of navigation keys 1-5 without Alt modifier
  ['1', '2', '3', '4', '5'].forEach(k => {
    navigatedTo = null;
    keydown({
      key: k,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      target: { tagName: 'DIV' },
      preventDefault: () => {}
    });
    assert.strictEqual(
      navigatedTo,
      null,
      `Key ${k} must NOT navigate sections during active flashcard session`
    );
  });

  // Intentional Alt+1 navigation must be allowed
  keydown({
    key: '1',
    altKey: true,
    ctrlKey: false,
    metaKey: false,
    target: { tagName: 'DIV' },
    preventDefault: () => {}
  });
  assert.strictEqual(navigatedTo, 'temples', 'Alt+1 must permit intentional section navigation');
});

test('⌨️ Keybinding Stress 2: Numeric keys 1-5 never navigate sections when in active quiz study session', async () => {
  resetEnvironment();

  delete require.cache[require.resolve('../js/app/bootstrap.js')];
  const AppBootstrap = require('../js/app/bootstrap.js');

  let navigatedTo = null;
  AppBootstrap.navegar = (sec) => { navigatedTo = sec; };
  AppBootstrap.carregarDados = async () => {};
  AppBootstrap.estado = { flashcardData: {}, progresso: {} };

  const docListeners = {};
  global.document = {
    addEventListener(evt, fn) {
      if (!docListeners[evt]) docListeners[evt] = [];
      docListeners[evt].push(fn);
    },
    querySelector(sel) {
      if (sel.includes('#sec-quiz.active')) return { id: 'sec-quiz' };
      return null;
    },
    getElementById() { return null; }
  };
  global.window = { addEventListener: () => {}, location: { hash: '' } };

  await AppBootstrap.init();
  const keydown = docListeners['keydown'][0];

  ['1', '2', '3', '4', '5'].forEach(k => {
    navigatedTo = null;
    keydown({
      key: k,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      target: { tagName: 'DIV' },
      preventDefault: () => {}
    });
    assert.strictEqual(navigatedTo, null, `Key ${k} must NOT navigate during active quiz session`);
  });
});

test('⌨️ Keybinding Stress 3: Rapid Space/Enter bursts flip unflipped card once and do not trigger duplicate flip while flipped', () => {
  resetEnvironment();

  const cardElement = createMockElement('flashcard');
  const domMap = {
    'flashcard': cardElement,
    'sec-flashcards': { classList: { contains: () => true } },
    'card-actions': createMockElement('card-actions'),
    'flashcard-vazio': createMockElement('flashcard-vazio'),
    'flashcard-resumo': createMockElement('flashcard-resumo')
  };

  const docListeners = {};
  global.document = {
    getElementById(id) {
      return domMap[id] || null;
    },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener(evt, fn) {
      if (!docListeners[evt]) docListeners[evt] = [];
      docListeners[evt].push(fn);
    }
  };

  delete require.cache[require.resolve('../js/flashcards.js')];
  const Flashcards = require('../js/flashcards.js');

  let flipCalls = 0;
  const originalVirar = Flashcards.virar;
  Flashcards.virar = function() {
    flipCalls++;
    cardElement.classList.add('virado');
    return originalVirar.apply(this, arguments);
  };

  Flashcards.cartaAtual = { id: 'c_test', ingles: 'hello', portugues: 'olá' };
  Flashcards.virada = false;

  const keydown = docListeners['keydown'][docListeners['keydown'].length - 1];

  // Burst of 10 rapid Space and Enter key events
  for (let i = 0; i < 10; i++) {
    keydown({
      key: i % 2 === 0 ? ' ' : 'Enter',
      target: { tagName: 'DIV' },
      preventDefault: () => {}
    });
  }

  assert.strictEqual(flipCalls, 1, 'Card must be flipped exactly once despite 10 rapid Space/Enter events');
  assert.ok(cardElement.classList.contains('virado'), 'Card must have .virado class');
});

test('⌨️ Keybinding Stress 4: Rating evaluation lock (_bloqueioAvaliacao) absorbs rapid rating key bursts', () => {
  resetEnvironment();

  const cardElement = createMockElement('flashcard');
  cardElement.classList.add('virado');
  const domMap = {
    'flashcard': cardElement,
    'sec-flashcards': { classList: { contains: () => true } },
    'card-actions': createMockElement('card-actions'),
    'flashcard-vazio': createMockElement('flashcard-vazio'),
    'flashcard-resumo': createMockElement('flashcard-resumo')
  };

  const docListeners = {};
  global.document = {
    getElementById(id) {
      return domMap[id] || null;
    },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener(evt, fn) {
      if (!docListeners[evt]) docListeners[evt] = [];
      docListeners[evt].push(fn);
    }
  };

  delete require.cache[require.resolve('../js/flashcards.js')];
  const Flashcards = require('../js/flashcards.js');

  let ratingCalls = 0;
  const originalAvaliar = Flashcards.avaliar;
  Flashcards.avaliar = function(rating) {
    ratingCalls++;
    this._bloqueioAvaliacao = true;
    return originalAvaliar.apply(this, arguments);
  };

  Flashcards.cartaAtual = { id: 'test_card', stability: 2.0, difficulty: 3.0, history: [] };
  Flashcards.cartasDisponiveis = [Flashcards.cartaAtual, { id: 'next_card', stability: 2.0, difficulty: 3.0, history: [] }];
  Flashcards.indiceAtual = 0;
  Flashcards.virada = true;
  Flashcards._bloqueioAvaliacao = false;

  const keydown = docListeners['keydown'][docListeners['keydown'].length - 1];

  // Fire first rating keypress
  keydown({
    key: '3',
    target: { tagName: 'DIV' },
    preventDefault: () => {}
  });

  assert.strictEqual(ratingCalls, 1, 'First rating keypress must evaluate');
  assert.strictEqual(Flashcards._bloqueioAvaliacao, true, '_bloqueioAvaliacao must be locked');

  // Burst of 10 subsequent rating presses ('1', '2', '3', '4') while lock is engaged
  for (let i = 0; i < 10; i++) {
    keydown({
      key: String((i % 4) + 1),
      target: { tagName: 'DIV' },
      preventDefault: () => {}
    });
  }

  assert.strictEqual(
    ratingCalls,
    1,
    'Subsequent keypresses in burst must be ignored while _bloqueioAvaliacao is active'
  );
});
