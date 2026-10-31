// ============================================================
// tests/stress_audio_fsrs.test.js
// EMPIRICAL ADVERSARIAL STRESS TEST SUITE: Audio/TTS & FSRS-5
// Author: Challenger 1 (Empirical Challenger)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');

// ────────────────────────────────────────────────────────────
// ENVIRONMENT SETUP & ISOLATION HARNESS
// ────────────────────────────────────────────────────────────

function setupAdversarialEnv() {
  const listeners = {};
  const docListeners = {};
  const storage = new Map();

  // Mock Audio Graph Tracking
  class MockNode {
    constructor(type = 'node') {
      this.type = type;
      this.connectedTo = [];
      this.disconnected = false;
      this.disconnectCount = 0;
    }
    connect(dest) {
      this.connectedTo.push(dest);
      return dest;
    }
    disconnect() {
      this.disconnected = true;
      this.disconnectCount++;
      this.connectedTo = [];
    }
  }

  class MockGainNode extends MockNode {
    constructor() {
      super('gain');
      this.gain = {
        value: 1,
        setValueAtTime: (v) => { this.gain.value = v; },
        exponentialRampToValueAtTime: () => {}
      };
    }
  }

  class MockBiquadFilterNode extends MockNode {
    constructor() {
      super('filter');
      this.type = 'lowpass';
      this.frequency = {
        value: 1000,
        setValueAtTime: (v) => { this.frequency.value = v; },
        exponentialRampToValueAtTime: () => {}
      };
      this.Q = { value: 1 };
    }
  }

  class MockCompressorNode extends MockNode {
    constructor() {
      super('compressor');
      this.threshold = { value: 0 };
      this.knee = { value: 0 };
      this.ratio = { value: 0 };
      this.attack = { value: 0 };
      this.release = { value: 0 };
    }
  }

  class MockBufferSourceNode extends MockNode {
    constructor() {
      super('bufferSource');
      this.started = false;
      this.stopped = false;
      this._eventListeners = {};
    }
    addEventListener(evt, fn) {
      this._eventListeners[evt] = this._eventListeners[evt] || [];
      this._eventListeners[evt].push(fn);
    }
    start() { this.started = true; }
    stop() {
      this.stopped = true;
      if (this._eventListeners['ended']) {
        this._eventListeners['ended'].forEach(cb => cb());
      }
    }
  }

  class MockOscillatorNode extends MockNode {
    constructor() {
      super('oscillator');
      this.frequency = { value: 440 };
      this.type = 'sine';
      this.started = false;
      this.stopped = false;
      this._eventListeners = {};
    }
    addEventListener(evt, fn, opts) {
      this._eventListeners[evt] = this._eventListeners[evt] || [];
      this._eventListeners[evt].push(fn);
    }
    start() { this.started = true; }
    stop() {
      this.stopped = true;
      if (this._eventListeners['ended']) {
        this._eventListeners['ended'].forEach(cb => cb());
      }
    }
  }

  class MockMediaElementSourceNode extends MockNode {
    constructor(element) {
      super('mediaElementSource');
      this.element = element;
    }
  }

  class MockAudioContext {
    static instanceCount = 0;
    static totalAllocations = 0;
    constructor() {
      MockAudioContext.instanceCount++;
      MockAudioContext.totalAllocations++;
      this.state = 'running';
      this.currentTime = 0;
      this.sampleRate = 44100;
      this.destination = new MockNode('destination');
      this.resumeCallCount = 0;
    }
    createGain() { return new MockGainNode(); }
    createBiquadFilter() { return new MockBiquadFilterNode(); }
    createDynamicsCompressor() { return new MockCompressorNode(); }
    createBufferSource() { return new MockBufferSourceNode(); }
    createOscillator() { return new MockOscillatorNode(); }
    createMediaElementSource(el) {
      if (el._alreadyConnected) {
        throw new Error('InvalidStateError: HTMLMediaElement already connected to an AudioSourceNode');
      }
      el._alreadyConnected = true;
      return new MockMediaElementSourceNode(el);
    }
    createBuffer(channels, length, rate) {
      return {
        numberOfChannels: channels,
        length,
        sampleRate: rate,
        getChannelData: () => new Float32Array(length)
      };
    }
    async resume() {
      this.resumeCallCount++;
      this.state = 'running';
      return Promise.resolve();
    }
    close() {
      this.state = 'closed';
      MockAudioContext.instanceCount = Math.max(0, MockAudioContext.instanceCount - 1);
      return Promise.resolve();
    }
  }

  class MockAudioElement {
    constructor(url = '') {
      this.src = url;
      this._cachedUrl = url;
      this._eventListeners = {};
      this.paused = true;
      this.currentTime = 0;
    }
    addEventListener(evt, fn, opts) {
      this._eventListeners[evt] = this._eventListeners[evt] || [];
      this._eventListeners[evt].push(fn);
    }
    pause() {
      this.paused = true;
      if (this._eventListeners['pause']) {
        this._eventListeners['pause'].forEach(cb => cb());
      }
    }
    play() {
      this.paused = false;
      return Promise.resolve();
    }
    triggerEnded() {
      this.paused = true;
      if (this._eventListeners['ended']) {
        this._eventListeners['ended'].forEach(cb => cb());
      }
    }
    triggerError() {
      if (this._eventListeners['error']) {
        this._eventListeners['error'].forEach(cb => cb(new Error('Simulated Audio Playback Error')));
      }
    }
  }

  const revokedUrls = [];
  const mockUrl = {
    createObjectURL: (blob) => `blob:http://localhost/${Math.random().toString(36).slice(2)}`,
    revokeObjectURL: (url) => { revokedUrls.push(url); }
  };

  const mockSpeechSynthesis = {
    voices: [
      { name: 'US English Female', lang: 'en-US', default: true },
      { name: 'British English Male', lang: 'en-GB', default: false }
    ],
    getVoices() { return this.voices; },
    speak: () => {},
    cancel: () => {},
    addEventListener: (evt, fn) => {
      listeners[evt] = listeners[evt] || [];
      listeners[evt].push(fn);
    }
  };

  global.window = global;
  global.AudioContext = MockAudioContext;
  global.webkitAudioContext = MockAudioContext;
  global.Audio = MockAudioElement;
  global.URL = mockUrl;
  global.speechSynthesis = mockSpeechSynthesis;
  global.document = {
    hidden: false,
    getElementById: (id) => ({
      id,
      innerHTML: '',
      textContent: '',
      style: {},
      setAttribute: () => {},
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      querySelectorAll: () => []
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: (evt, fn) => {
      docListeners[evt] = docListeners[evt] || [];
      docListeners[evt].push(fn);
    }
  };
  global.localStorage = {
    getItem: (k) => storage.has(k) ? storage.get(k) : null,
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: (k) => storage.delete(k),
    clear: () => storage.clear()
  };
  global.I18n = { t: (k) => k };
  global.App = {
    notificar: () => {},
    estado: { templosData: {}, vocabCache: [] }
  };
  global.Progressao = { temploDesbloqueado: () => true };

  // Clean module cache for isolation
  delete require.cache[require.resolve('../js/audio.js')];
  delete require.cache[require.resolve('../js/audio_cache.js')];
  delete require.cache[require.resolve('../js/stories/paginator.js')];
  delete require.cache[require.resolve('../js/voice_engine.js')];
  delete require.cache[require.resolve('../js/app/tts.js')];
  delete require.cache[require.resolve('../js/flashcards.js')];
  delete require.cache[require.resolve('../js/quiz.js')];

  const SomFeedback = require('../js/audio.js');
  SomFeedback.ativo = true;
  global.SomFeedback = SomFeedback;

  return {
    MockAudioContext,
    MockAudioElement,
    revokedUrls,
    storage,
    listeners,
    docListeners,
    SomFeedback
  };
}

// ────────────────────────────────────────────────────────────
// SUITE 1: FSRS-5 ADVERSARIAL MATHEMATICAL IMMUNITY
// ────────────────────────────────────────────────────────────

test('💥 FSRS Math: Retrievability under extreme, non-finite and boundary values', () => {
  setupAdversarialEnv();
  require('../js/flashcards.js');
  const FSRS = global.FSRS;

  const extremeStabilities = [0, -0.0001, -100, -Infinity, NaN, undefined, null, Infinity, 1e-15, 1e9, 1e18];
  const extremeTimes = [0, -0.001, -500, -Infinity, NaN, undefined, null, Infinity, 1e-15, 1e9];

  for (const s of extremeStabilities) {
    for (const t of extremeTimes) {
      const r = FSRS.retrievability(t, s);
      assert.strictEqual(Number.isFinite(r), true, `retrievability(t=${t}, s=${s}) must be strictly finite, got ${r}`);
      assert.ok(r >= 0 && r <= 1, `retrievability(t=${t}, s=${s}) must be bounded in [0, 1], got ${r}`);
    }
  }
});

test('💥 FSRS Math: nextInterval strictly produces positive finite days for any input', () => {
  setupAdversarialEnv();
  require('../js/flashcards.js');
  const FSRS = global.FSRS;

  const degenerateStabilities = [
    0, -1, -9999, -Infinity, NaN, undefined, null, Infinity, 1e-12, 1e9, 'invalid', {}, []
  ];

  for (const s of degenerateStabilities) {
    const interval = FSRS.nextInterval(s);
    assert.strictEqual(Number.isFinite(interval), true, `nextInterval(${s}) must be finite, got ${interval}`);
    assert.strictEqual(Number.isInteger(interval), true, `nextInterval(${s}) must be integer, got ${interval}`);
    assert.ok(interval >= 1, `nextInterval(${s}) must be >= 1 day, got ${interval}`);
  }
});

test('💥 FSRS Math: Fuzzing initStability and initDifficulty with adversarial ratings', () => {
  setupAdversarialEnv();
  require('../js/flashcards.js');
  const FSRS = global.FSRS;

  const fuzzyRatings = [
    0, -1, -99, 5, 10, 999, NaN, undefined, null, Infinity, -Infinity,
    '3', 'easy', 'again', { rating: 3 }, [4], false, true, 2.718
  ];

  for (const r of fuzzyRatings) {
    const s = FSRS.initStability(r);
    assert.strictEqual(Number.isFinite(s), true, `initStability(${r}) must be finite, got ${s}`);
    assert.ok(s >= 0.1, `initStability(${r}) must be >= 0.1, got ${s}`);

    const d = FSRS.initDifficulty(r);
    assert.strictEqual(Number.isFinite(d), true, `initDifficulty(${r}) must be finite, got ${d}`);
    assert.ok(d >= 1 && d <= 10, `initDifficulty(${r}) must be in [1, 10], got ${d}`);
  }
});

test('💥 FSRS Math: nextRecallStability and nextForgetStability survival under extreme inputs', () => {
  setupAdversarialEnv();
  require('../js/flashcards.js');
  const FSRS = global.FSRS;

  const testVectors = [
    { d: NaN, s: NaN, r: NaN, rating: NaN },
    { d: -5, s: -10, r: -0.5, rating: 0 },
    { d: 15, s: 0, r: 2.5, rating: 5 },
    { d: Infinity, s: Infinity, r: Infinity, rating: Infinity },
    { d: undefined, s: undefined, r: undefined, rating: undefined },
    { d: 5, s: 1e9, r: 0.9, rating: 3 },
    { d: 1, s: 1e-6, r: 0.1, rating: 2 }
  ];

  for (const vec of testVectors) {
    const recallS = FSRS.nextRecallStability(vec.d, vec.s, vec.r, vec.rating);
    assert.strictEqual(Number.isFinite(recallS), true, `nextRecallStability failed finite check on ${JSON.stringify(vec)}`);
    assert.ok(recallS > 0, `nextRecallStability must be > 0, got ${recallS}`);

    const forgetS = FSRS.nextForgetStability(vec.d, vec.s, vec.r);
    assert.strictEqual(Number.isFinite(forgetS), true, `nextForgetStability failed finite check on ${JSON.stringify(vec)}`);
    assert.ok(forgetS >= 0.1, `nextForgetStability must be >= 0.1, got ${forgetS}`);
  }
});

// ────────────────────────────────────────────────────────────
// SUITE 2: 1,000 RAPID SUCCESSIVE REVIEWS (LOOP STRESS & DRIFT)
// ────────────────────────────────────────────────────────────

test('🔄 FSRS Loop: 1,000 continuous "Again" ratings (forgotten card survival & lapses)', () => {
  setupAdversarialEnv();
  require('../js/flashcards.js');
  const FSRS = global.FSRS;

  // Case 1: Start from new card (first review initializes from new, lapses increment on subsequent)
  let card = {
    id: 'adversarial-card-1',
    state: 'new',
    lapses: 0,
    reps: 0
  };

  for (let i = 1; i <= 1000; i++) {
    card = FSRS.review(card, 1);
    assert.strictEqual(Number.isFinite(card.stability), true, `Iter ${i}: stability must be finite`);
    assert.ok(card.stability >= 0.1, `Iter ${i}: stability must be >= 0.1, got ${card.stability}`);
    assert.strictEqual(Number.isFinite(card.difficulty), true, `Iter ${i}: difficulty must be finite`);
    assert.ok(card.difficulty >= 1 && card.difficulty <= 10, `Iter ${i}: difficulty must be in [1, 10]`);
    assert.strictEqual(card.reps, i, `Iter ${i}: reps must match iteration count`);
    assert.strictEqual(card.interval, 1, `Iter ${i}: rating=1 interval must remain 1 day`);
    assert.ok(card.history.length <= 5, `Iter ${i}: history must strictly be <= 5, got ${card.history.length}`);
  }

  assert.strictEqual(card.history.length, 5, 'Final history length must be exactly 5 after 1000 reviews');
  assert.strictEqual(card.lapses, 999, 'Lapses must equal 999 (first review was new card init, next 999 were lapses)');

  // Case 2: Start from existing review card with lapses=0
  let reviewCard = {
    id: 'adversarial-review-card',
    state: 'review',
    stability: 3.5,
    difficulty: 5.0,
    lapses: 0,
    reps: 5
  };
  reviewCard = FSRS.review(reviewCard, 1);
  assert.strictEqual(reviewCard.lapses, 1, 'Review card with rating=1 must increment lapses on first review');
  assert.strictEqual(reviewCard.state, 'learning');
});

test('🔄 FSRS Loop: 1,000 continuous "Good" ratings (runaway growth and precision)', () => {
  setupAdversarialEnv();
  require('../js/flashcards.js');
  const FSRS = global.FSRS;

  let card = {
    id: 'adversarial-card-2',
    state: 'new',
    lapses: 0,
    reps: 0
  };

  for (let i = 1; i <= 1000; i++) {
    card = FSRS.review(card, 3);
    assert.strictEqual(Number.isFinite(card.stability), true, `Iter ${i}: stability must be finite`);
    assert.strictEqual(Number.isFinite(card.difficulty), true, `Iter ${i}: difficulty must be finite`);
    assert.ok(card.difficulty >= 1 && card.difficulty <= 10, `Iter ${i}: difficulty must be in [1, 10]`);
    assert.strictEqual(Number.isFinite(card.interval), true, `Iter ${i}: interval must be finite`);
    assert.ok(card.interval >= 1, `Iter ${i}: interval must be >= 1`);
    assert.ok(card.history.length <= 5, `Iter ${i}: history must strictly be <= 5, got ${card.history.length}`);
  }

  assert.strictEqual(card.history.length, 5, 'Final history length must be exactly 5');
  assert.strictEqual(card.lapses, 0, 'No lapses for continuous Good reviews');
  assert.strictEqual(card.reps, 1000, 'Reps must equal 1000');
});

test('🔄 FSRS Loop: 1,000 randomized fuzz rating reviews (chaos harness)', () => {
  setupAdversarialEnv();
  require('../js/flashcards.js');
  const FSRS = global.FSRS;

  let card = {
    id: 'fuzz-card',
    state: 'new',
    lapses: 0,
    reps: 0
  };

  const pool = [1, 2, 3, 4, 0, 5, -1, NaN, undefined, '3', null];

  for (let i = 1; i <= 1000; i++) {
    const rating = pool[Math.floor(Math.random() * pool.length)];
    assert.doesNotThrow(() => {
      card = FSRS.review(card, rating);
    }, `FSRS.review must not throw on rating=${rating}`);

    assert.strictEqual(Number.isFinite(card.stability), true);
    assert.strictEqual(Number.isFinite(card.difficulty), true);
    assert.strictEqual(Number.isFinite(card.interval), true);
    assert.ok(card.history.length <= 5, `History must never exceed 5 items, got ${card.history.length}`);
  }
});

// ────────────────────────────────────────────────────────────
// SUITE 3: TIMEZONE STREAK ADVERSARIAL TEST (UTC-3 AT 23:59 vs 00:01)
// ────────────────────────────────────────────────────────────

test('🕒 Timezone: Western timezone (UTC-3) streak shifts across UTC midnight', () => {
  const env = setupAdversarialEnv();
  const Quiz = require('../js/quiz.js');

  // UTC-3 offset is +180 minutes in JavaScript Date.prototype.getTimezoneOffset
  const origGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  const origNow = Date.now;

  try {
    Date.prototype.getTimezoneOffset = () => 180; // Brazil UTC-3

    // Day 1: 2026-10-30 at 23:59:00 UTC-3
    // In UTC, this is 2026-10-31 02:59:00
    const day1LocalTime = new Date('2026-10-31T02:59:00Z').getTime();
    Date.now = () => day1LocalTime;

    // First quiz completed on Day 1 at 23:59 local
    Quiz._atualizarStreak();
    assert.strictEqual(env.storage.get('en_quiz_streak'), '1');
    assert.strictEqual(env.storage.get('en_quiz_streak_date'), '2026-10-30');

    // Day 2: 2026-10-31 at 00:01:00 UTC-3 (2 minutes later)
    // In UTC, this is 2026-10-31 03:01:00
    const day2LocalTime = new Date('2026-10-31T03:01:00Z').getTime();
    Date.now = () => day2LocalTime;

    // Streak inquiry before quiz
    const activeStreak = Quiz._getQuizStreak();
    assert.strictEqual(activeStreak, 1, 'Streak must stay alive at 00:01 on consecutive day');

    // Quiz completed on Day 2 at 00:01 local
    Quiz._atualizarStreak();
    assert.strictEqual(env.storage.get('en_quiz_streak'), '2', 'Streak must increment to 2 across local midnight');
    assert.strictEqual(env.storage.get('en_quiz_streak_date'), '2026-10-31');

    // Same Day Repeated Study: 2026-10-31 at 22:30:00 UTC-3
    const day2Evening = new Date('2026-11-01T01:30:00Z').getTime();
    Date.now = () => day2Evening;
    Quiz._atualizarStreak();
    assert.strictEqual(env.storage.get('en_quiz_streak'), '2', 'Streak must NOT double-increment on same local day');

    // Day 4: 2026-11-02 at 10:00:00 UTC-3 (skipped Day 3 / 2026-11-01)
    const day4Morning = new Date('2026-11-02T13:00:00Z').getTime();
    Date.now = () => day4Morning;
    const brokenStreak = Quiz._getQuizStreak();
    assert.strictEqual(brokenStreak, 0, 'Broken streak must report 0');
    Quiz._atualizarStreak();
    assert.strictEqual(env.storage.get('en_quiz_streak'), '1', 'Skipped day resets streak to 1');
  } finally {
    Date.prototype.getTimezoneOffset = origGetTimezoneOffset;
    Date.now = origNow;
  }
});

// ────────────────────────────────────────────────────────────
// SUITE 4: AUDIO LIFECYCLE & 100 RAPID PAGE TURNS (SINGLETON TEST)
// ────────────────────────────────────────────────────────────

test('🔊 Audio Lifecycle: 100 rapid page turns in StoriesPaginator retain singleton AudioContext', () => {
  const env = setupAdversarialEnv();
  const SomFeedback = require('../js/audio.js');
  const StoriesPaginator = require('../js/stories/paginator.js');

  SomFeedback.init();
  const initialAllocations = env.MockAudioContext.totalAllocations;

  // Trigger 100 rapid page turn sounds
  for (let i = 0; i < 100; i++) {
    StoriesPaginator._playPageTurnSound();
  }

  // Verify singleton constraint: AudioContext allocations increased by at most 1 across 100 page turns
  const deltaAllocations = env.MockAudioContext.totalAllocations - initialAllocations;
  assert.ok(
    deltaAllocations <= 1,
    `AudioContext must be a shared singleton! Expected delta <= 1 instance, created delta=${deltaAllocations}`
  );

  // Muted behavior: Disable sound and flip 50 more times
  SomFeedback.ativo = false;
  const allocationsBeforeMute = env.MockAudioContext.totalAllocations;
  for (let i = 0; i < 50; i++) {
    StoriesPaginator._playPageTurnSound();
  }
  assert.strictEqual(
    env.MockAudioContext.totalAllocations,
    allocationsBeforeMute,
    'Muted SomFeedback must not allocate any AudioContext'
  );
});

// ────────────────────────────────────────────────────────────
// SUITE 5: WEB AUDIO DSP NODE CLEANUP (ENDED, PAUSE, ERROR)
// ────────────────────────────────────────────────────────────

test('🎛️ DSP Lifecycle: VoiceEngine disconnects mastering nodes on ended, pause, and error', () => {
  const env = setupAdversarialEnv();
  const VoiceEngine = require('../js/voice_engine.js');

  // Case A: Audio finishes naturally ('ended')
  const audioEl1 = new env.MockAudioElement('http://localhost/test1.mp3');
  const chain1 = VoiceEngine.applyMasteringAudioElement(audioEl1);
  assert.ok(chain1, 'DSP chain must be attached');
  assert.strictEqual(chain1.source.disconnected, false);
  assert.strictEqual(chain1.highpass.disconnected, false);
  assert.strictEqual(chain1.compressor.disconnected, false);

  audioEl1.triggerEnded();
  assert.strictEqual(chain1.source.disconnected, true, 'source node must disconnect on ended');
  assert.strictEqual(chain1.highpass.disconnected, true, 'highpass node must disconnect on ended');
  assert.strictEqual(chain1.compressor.disconnected, true, 'compressor node must disconnect on ended');
  assert.strictEqual(audioEl1._dspChainActive, null, '_dspChainActive must be nullified');

  // Case B: User pauses audio ('pause')
  const audioEl2 = new env.MockAudioElement('http://localhost/test2.mp3');
  const chain2 = VoiceEngine.applyMasteringAudioElement(audioEl2);
  audioEl2.pause();
  assert.strictEqual(chain2.source.disconnected, true, 'source node must disconnect on pause');
  assert.strictEqual(chain2.highpass.disconnected, true, 'highpass node must disconnect on pause');
  assert.strictEqual(chain2.compressor.disconnected, true, 'compressor node must disconnect on pause');

  // Case C: Audio playback error ('error')
  const audioEl3 = new env.MockAudioElement('http://localhost/test3.mp3');
  const chain3 = VoiceEngine.applyMasteringAudioElement(audioEl3);
  audioEl3.triggerError();
  assert.strictEqual(chain3.source.disconnected, true, 'source node must disconnect on error');
  assert.strictEqual(chain3.highpass.disconnected, true, 'highpass node must disconnect on error');
  assert.strictEqual(chain3.compressor.disconnected, true, 'compressor node must disconnect on error');

  // Case D: Idempotency protection against InvalidStateError
  const audioEl4 = new env.MockAudioElement('http://localhost/test4.mp3');
  const chain4a = VoiceEngine.applyMasteringAudioElement(audioEl4);
  const chain4b = VoiceEngine.applyMasteringAudioElement(audioEl4);
  assert.strictEqual(chain4a, chain4b, 'Duplicate applyMastering call must reuse active chain without recreating node');
});

// ────────────────────────────────────────────────────────────
// SUITE 6: APPTTS CONCURRENT TRIGGERS & URL.REVOKEOBJECTURL
// ────────────────────────────────────────────────────────────

test('🎙️ AppTTS: Rapid consecutive calls revoke previous Blob URLs without leak', async () => {
  const env = setupAdversarialEnv();
  const AudioCache = require('../js/audio_cache.js');
  const VoiceEngine = require('../js/voice_engine.js');
  global.AudioCache = AudioCache;
  global.VoiceEngine = VoiceEngine;
  global.SomFeedback.ativo = true;
  const AppTTS = require('../js/app/tts.js');

  const blobUrl1 = 'blob:http://localhost/uuid-audio-1';
  const blobUrl2 = 'blob:http://localhost/uuid-audio-2';
  const blobUrl3 = 'blob:http://localhost/uuid-audio-3';

  let currentCall = 0;
  AudioCache.getAudio = async (text) => {
    currentCall++;
    const url = currentCall === 1 ? blobUrl1 : currentCall === 2 ? blobUrl2 : blobUrl3;
    return { url, size: 4096, type: 'audio/mp3', arrayBuffer: () => new ArrayBuffer(4096) };
  };

  // Trigger speech 1
  await AppTTS.speak('First rapid sentence');
  assert.ok(AppTTS._activeAudio, 'Speech 1 active');
  assert.strictEqual(AppTTS._activeAudio._cachedUrl, blobUrl1);

  // Trigger speech 2 immediately before speech 1 ends
  await AppTTS.speak('Second rapid sentence');
  assert.ok(env.revokedUrls.includes(blobUrl1), 'blobUrl1 must be revoked when interrupted by speech 2');
  assert.strictEqual(AppTTS._activeAudio._cachedUrl, blobUrl2);

  // Trigger speech 3
  await AppTTS.speak('Third rapid sentence');
  assert.ok(env.revokedUrls.includes(blobUrl2), 'blobUrl2 must be revoked when interrupted by speech 3');

  // Normal completion of speech 3
  AppTTS._activeAudio.triggerEnded();
  assert.ok(env.revokedUrls.includes(blobUrl3), 'blobUrl3 must be revoked upon playback completion');
  assert.strictEqual(AppTTS._activeAudio, null, 'Active audio must be cleaned up');
});

// ────────────────────────────────────────────────────────────
// SUITE 7: SOMFEEDBACK RESUMPTION UNDER SUSPENDED CONTEXT BURST
// ────────────────────────────────────────────────────────────

test('⚡ SomFeedback: 50 bursts under suspended AudioContext safely resume and cleanup', () => {
  const env = setupAdversarialEnv();
  const SomFeedback = require('../js/audio.js');

  SomFeedback.init();
  const ctx = SomFeedback._ctx();
  ctx.state = 'suspended'; // simulate browser autoplay policy suspension

  // Fire 50 rapid feedback sounds
  for (let i = 0; i < 50; i++) {
    assert.doesNotThrow(() => {
      SomFeedback.correto();
      SomFeedback.errado();
      SomFeedback.virar();
    });
  }

  assert.ok(ctx.resumeCallCount > 0, 'AudioContext.resume() must be invoked on playback under suspended state');
});

// ────────────────────────────────────────────────────────────
// SUITE 8: AUDIOCACHE COMPATIBILITY ALIASES & DELEGATION
// ────────────────────────────────────────────────────────────

test('📦 AudioCache: Aliases (obter, estatisticas, limpar) delegate accurately', async () => {
  setupAdversarialEnv();
  const AudioCache = require('../js/audio_cache.js');

  assert.strictEqual(typeof AudioCache.obter, 'function');
  assert.strictEqual(typeof AudioCache.estatisticas, 'function');
  assert.strictEqual(typeof AudioCache.limpar, 'function');

  // Verify delegation of obter to getAudio
  let calledWith = null;
  AudioCache.getAudio = async (text, voiceId) => {
    calledWith = { text, voiceId };
    return { url: 'blob:test', size: 1024, type: 'audio/mp3', arrayBuffer: () => new ArrayBuffer(1024) };
  };

  const res = await AudioCache.obter('sample word', 'en-US');
  assert.deepStrictEqual(calledWith, { text: 'sample word', voiceId: 'en-US' });
  assert.strictEqual(res.size, 1024);
  assert.strictEqual(typeof res.arrayBuffer, 'function');

  // Verify clearCache via limpar and estatisticas
  await AudioCache.limpar();
  const stats = await AudioCache.estatisticas();
  assert.strictEqual(stats.count, 0);
  assert.strictEqual(stats.bytes, 0);
});
