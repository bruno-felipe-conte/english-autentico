const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');

// Setup minimal browser-like environment in Node
class MockAudioNode {
  constructor(name = 'node') {
    this.name = name;
    this.connectedTo = [];
    this.disconnected = false;
  }
  connect(target) {
    this.connectedTo.push(target);
    return target;
  }
  disconnect() {
    this.disconnected = true;
    this.connectedTo = [];
  }
}

class MockGainNode extends MockAudioNode {
  constructor() {
    super('gain');
    this.gain = {
      setValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {}
    };
  }
}

class MockBiquadFilterNode extends MockAudioNode {
  constructor() {
    super('filter');
    this.type = 'bandpass';
    this.frequency = {
      value: 0,
      setValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {}
    };
    this.Q = { value: 1 };
  }
}

class MockCompressorNode extends MockAudioNode {
  constructor() {
    super('compressor');
    this.threshold = { value: 0 };
    this.knee = { value: 0 };
    this.ratio = { value: 0 };
    this.attack = { value: 0 };
    this.release = { value: 0 };
  }
}

class MockBufferSourceNode extends MockAudioNode {
  constructor() {
    super('bufferSource');
    this.playbackRate = { value: 1 };
    this.started = false;
    this.stopped = false;
    this._listeners = {};
  }
  addEventListener(event, fn) {
    this._listeners[event] = this._listeners[event] || [];
    this._listeners[event].push(fn);
  }
  start() {
    this.started = true;
  }
  stop() {
    this.stopped = true;
    if (this._listeners['ended']) {
      this._listeners['ended'].forEach(cb => cb());
    }
  }
}

class MockAudioContext {
  static instancesCreated = 0;
  constructor() {
    MockAudioContext.instancesCreated++;
    this.state = 'suspended';
    this.currentTime = 0;
    this.sampleRate = 44100;
    this.destination = new MockAudioNode('destination');
    this.resumed = false;
  }
  async resume() {
    this.state = 'running';
    this.resumed = true;
  }
  async close() {
    this.state = 'closed';
  }
  createBuffer(channels, length, sampleRate) {
    return {
      channels,
      length,
      sampleRate,
      getChannelData: () => new Float32Array(length)
    };
  }
  createBufferSource() {
    return new MockBufferSourceNode();
  }
  createBiquadFilter() {
    return new MockBiquadFilterNode();
  }
  createGain() {
    return new MockGainNode();
  }
  createDynamicsCompressor() {
    return new MockCompressorNode();
  }
  createMediaElementSource(audioElement) {
    return new MockAudioNode('mediaElementSource:' + audioElement.id);
  }
}

// Global browser mocks
global.window = global;
global.window.AudioContext = MockAudioContext;
global.window.webkitAudioContext = MockAudioContext;

const docListeners = {};
const winListeners = {};
global.document = {
  hidden: false,
  getElementById: () => null,
  addEventListener: (event, fn) => {
    docListeners[event] = docListeners[event] || [];
    docListeners[event].push(fn);
  }
};
global.window.addEventListener = (event, fn) => {
  winListeners[event] = winListeners[event] || [];
  winListeners[event].push(fn);
};

global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};

const revokedUrls = [];
global.URL = {
  createObjectURL: (blob) => 'blob:mock-uuid-' + Math.random().toString(36).substring(2, 9),
  revokeObjectURL: (url) => { revokedUrls.push(url); }
};

// Mock SpeechSynthesis
const speechListeners = {};
global.window.speechSynthesis = {
  _voices: [{ name: 'Samantha', lang: 'en-US' }],
  paused: false,
  getVoices() { return this._voices; },
  addEventListener(event, fn) {
    speechListeners[event] = speechListeners[event] || [];
    speechListeners[event].push(fn);
  },
  speak(u) {
    if (u && typeof u.onend === 'function') setTimeout(u.onend, 10);
  },
  cancel() {},
  resume() {}
};
global.SpeechSynthesisUtterance = class {
  constructor(text) {
    this.text = text;
    this.lang = 'en-US';
  }
};

// Load modules under test
const SomFeedback = require('../js/audio.js');
const StoriesPaginator = require('../js/stories/paginator.js');
const AudioCache = require('../js/audio_cache.js');
const VoiceEngine = require('../js/voice_engine.js');
const AppTTS = require('../js/app/tts.js');

describe('🎧 Milestone 1: Audio & TTS Lifecycle Resiliency Suite', () => {

  beforeEach(() => {
    MockAudioContext.instancesCreated = 0;
    revokedUrls.length = 0;
    SomFeedback.__ctx = null;
    SomFeedback.ativo = true;
    StoriesPaginator._sharedAudioCtx = null;
  });

  describe('F2: AudioContext Limit Leak in StoriesPaginator', () => {
    it('1. Reutiliza o AudioContext compartilhado de SomFeedback em vez de criar novas instâncias em cada página', () => {
      // Initialize SomFeedback so that SomFeedback._ctx() returns a shared context
      const shared = SomFeedback._ctx();
      assert.ok(shared, 'Deve existir AudioContext em SomFeedback');
      const countBefore = MockAudioContext.instancesCreated;

      // Flip 10 pages in StoriesPaginator
      for (let i = 0; i < 10; i++) {
        StoriesPaginator._playPageTurnSound();
      }

      // No new AudioContext instances should have been created
      assert.strictEqual(
        MockAudioContext.instancesCreated,
        countBefore,
        'Não deve instanciar novo AudioContext a cada virada de página'
      );
    });

    it('2. Respeita SomFeedback.ativo = false evitando tocar som ou alocar nós quando mutado', () => {
      SomFeedback.ativo = false;
      const initialCount = MockAudioContext.instancesCreated;

      StoriesPaginator._playPageTurnSound();

      // Zero new audio contexts or operations when muted
      assert.strictEqual(MockAudioContext.instancesCreated, initialCount);
    });

    it('3. Reutiliza _sharedAudioCtx como singleton se SomFeedback e VoiceEngine não fornecerem contexto', () => {
      const origCtxFn = SomFeedback._ctx;
      const origVoiceCtxFn = VoiceEngine.getAudioContext;
      delete SomFeedback._ctx;
      delete VoiceEngine.getAudioContext;

      try {
        StoriesPaginator._playPageTurnSound();
        const firstCtx = StoriesPaginator._sharedAudioCtx;
        assert.ok(firstCtx, 'Deve criar singleton de contingência _sharedAudioCtx');

        const instancesAfterFirst = MockAudioContext.instancesCreated;

        StoriesPaginator._playPageTurnSound();
        StoriesPaginator._playPageTurnSound();

        assert.strictEqual(
          StoriesPaginator._sharedAudioCtx,
          firstCtx,
          'Deve manter a mesma referência de contexto singleton'
        );
        assert.strictEqual(
          MockAudioContext.instancesCreated,
          instancesAfterFirst,
          'Não deve vazar instâncias de hardware AudioContext'
        );
      } finally {
        SomFeedback._ctx = origCtxFn;
        VoiceEngine.getAudioContext = origVoiceCtxFn;
      }
    });
  });

  describe('F3: AudioContext Resumption in SomFeedback', () => {
    it('1. Executa ctx.resume() automaticamente quando o contexto estiver suspended', async () => {
      const ctx = SomFeedback._ctx();
      assert.strictEqual(ctx.state, 'running', 'Deve ter chamado resume() e transicionado para running');
      assert.strictEqual(ctx.resumed, true, 'Propriedade resumed deve ser true');
    });

    it('2. Reage ao evento document.visibilitychange quando a aba retorna ao primeiro plano', async () => {
      SomFeedback.init();
      const ctx = SomFeedback._ctx();
      ctx.state = 'suspended';
      ctx.resumed = false;

      // Simulate tab coming back to focus
      document.hidden = false;
      const handlers = docListeners['visibilitychange'] || [];
      assert.ok(handlers.length > 0, 'Deve ter registrado ouvinte de visibilitychange');

      for (const handler of handlers) {
        handler();
      }

      assert.strictEqual(ctx.state, 'running', 'Deve ter resumido o contexto ao focar a aba');
      assert.strictEqual(ctx.resumed, true);
    });

    it('3. Desbloqueia o AudioContext via gestos do usuário (click, touchstart, keydown)', () => {
      SomFeedback.init();
      const ctx = SomFeedback._ctx();
      ctx.state = 'suspended';
      ctx.resumed = false;

      const clickHandlers = winListeners['click'] || [];
      assert.ok(clickHandlers.length > 0, 'Deve ter registrado ouvinte de clique para desbloqueio');

      for (const h of clickHandlers) {
        h();
      }

      assert.strictEqual(ctx.state, 'running', 'Clique deve desbloquear contexto de áudio');
    });
  });

  describe('F4: SpeechSynthesis voiceschanged listener sem clobbering', () => {
    it('1. AppTTS.init() registra voiceschanged via addEventListener sem sobrescrever window.speechSynthesis.onvoiceschanged', () => {
      let customHandlerCalled = false;
      window.speechSynthesis.onvoiceschanged = () => {
        customHandlerCalled = true;
      };

      AppTTS.init();

      // Ensure window.speechSynthesis.onvoiceschanged was not nullified or replaced
      assert.ok(window.speechSynthesis.onvoiceschanged !== null, 'Não deve anular onvoiceschanged');
      window.speechSynthesis.onvoiceschanged();
      assert.strictEqual(customHandlerCalled, true, 'Ouvinte customizado pré-existente deve ser preservado');

      // Check addEventListener registrations
      const listeners = speechListeners['voiceschanged'] || [];
      assert.ok(listeners.length > 0, 'Deve registrar via addEventListener');
    });
  });

  describe('F5: AudioCache Compatibility Aliases', () => {
    it('1. AudioCache expõe obter(), estatisticas() e limpar() como aliases compatíveis', async () => {
      assert.strictEqual(typeof AudioCache.obter, 'function', 'obter deve ser uma função');
      assert.strictEqual(typeof AudioCache.estatisticas, 'function', 'estatisticas deve ser uma função');
      assert.strictEqual(typeof AudioCache.limpar, 'function', 'limpar deve ser uma função');

      // Test estatisticas delegation
      const stats = await AudioCache.estatisticas();
      assert.ok(stats !== null && typeof stats === 'object', 'estatisticas deve retornar objeto');
      assert.ok('count' in stats || 'itens' in stats, 'estatisticas deve conter itens/count');

      // Test limpar delegation
      const cleanResult = await AudioCache.limpar();
      assert.strictEqual(typeof cleanResult, 'boolean', 'limpar deve retornar booleano');
    });

    it('2. getAudio() e obter() retornam objeto com tamanho e arrayBuffer para VoiceEngine', async () => {
      // Mock IndexedDB inside AudioCache
      const mockBlob = {
        size: 8192,
        type: 'audio/wav',
        arrayBuffer: async () => new ArrayBuffer(8192)
      };

      AudioCache._openDB = async () => ({
        transaction: () => ({
          objectStore: () => ({
            get: () => ({
              set onsuccess(fn) {
                this.result = { audioBlob: mockBlob, timestamp: Date.now() };
                setTimeout(fn, 0);
              }
            })
          })
        })
      });

      const res = await AudioCache.obter('hello world', 'neural_en');
      assert.ok(res, 'Deve retornar resultado de cache');
      assert.strictEqual(res.size, 8192, 'Deve ter propriedade size');
      assert.strictEqual(typeof res.arrayBuffer, 'function', 'Deve ter método arrayBuffer');

      const buf = await res.arrayBuffer();
      assert.strictEqual(buf.byteLength, 8192, 'Deve decodificar buffer com sucesso');
    });
  });

  describe('F6: Audio Resource Cleanup & DSP Node Disconnection', () => {
    it('1. VoiceEngine.applyMasteringAudioElement conecta nós DSP e cleanupMasteringAudioElement os desconecta', () => {
      const mockElement = { id: 'test-audio-elem', addEventListener: (evt, cb) => { mockElement['_' + evt] = cb; } };

      const chain = VoiceEngine.applyMasteringAudioElement(mockElement);
      assert.ok(chain, 'Deve criar cadeia de masterização');
      assert.ok(chain.source, 'Deve conter source');
      assert.ok(chain.highpass, 'Deve conter highpass');
      assert.ok(chain.compressor, 'Deve conter compressor');

      // Trigger cleanup
      VoiceEngine.cleanupMasteringAudioElement(mockElement);

      assert.strictEqual(chain.source.disconnected, true, 'source deve ter sido desconectado');
      assert.strictEqual(chain.highpass.disconnected, true, 'highpass deve ter sido desconectado');
      assert.strictEqual(chain.compressor.disconnected, true, 'compressor deve ter sido desconectado');
      assert.strictEqual(mockElement._dspChainActive, null, 'Referência da cadeia deve ser limpa');
    });

    it('2. VoiceEngine.applyMasteringAudioElement desconecta automaticamente em ended e pause', () => {
      const mockElement = {
        id: 'test-audio-auto',
        _listeners: {},
        addEventListener(event, fn) {
          this._listeners[event] = this._listeners[event] || [];
          this._listeners[event].push(fn);
        }
      };

      const chain = VoiceEngine.applyMasteringAudioElement(mockElement);
      assert.ok(chain, 'Cadeia deve ser criada');

      // Dispatch 'ended' event
      const endedListeners = mockElement._listeners['ended'] || [];
      assert.ok(endedListeners.length > 0, 'Deve anexar ouvinte de ended');
      for (const fn of endedListeners) fn();

      assert.strictEqual(chain.source.disconnected, true, 'Deve desconectar em ended');
    });

    it('3. AppTTS.speak() e AppTTS.stop() invocam URL.revokeObjectURL prevenindo vazamento de RAM', async () => {
      const fakeUrl = 'blob:mock-uuid-test1234';
      AudioCache.getAudio = async () => ({
        url: fakeUrl,
        blob: { size: 5000 }
      });

      // Mock Audio constructor
      global.Audio = class {
        constructor(url) {
          this.src = url;
          this.paused = false;
          this._listeners = {};
        }
        addEventListener(event, fn) {
          this._listeners[event] = this._listeners[event] || [];
          this._listeners[event].push(fn);
        }
        play() {
          return Promise.resolve();
        }
        pause() {
          this.paused = true;
        }
      };

      await AppTTS.speak('Testing memory leak prevention');
      assert.ok(AppTTS._activeAudio, 'Deve existir áudio ativo tocando');

      // Stop speech
      AppTTS.stop();

      assert.strictEqual(AppTTS._activeAudio, null, 'Áudio ativo deve ter sido limpo');
      assert.ok(revokedUrls.includes(fakeUrl), 'URL do blob deve ter sido revogado com URL.revokeObjectURL');
    });
  });
});
