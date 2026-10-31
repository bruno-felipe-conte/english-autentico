// ============================================================
// tests/e2e/harness.js
// Opaque-Box E2E Resiliency Test Simulation Harness
// Zero runtime dependencies — native Node.js built-in utilities
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

/**
 * MockClassList simulates Element.classList
 */
class MockClassList {
  constructor(el) {
    this._el = el;
    this._classes = new Set();
  }
  add(...tokens) {
    tokens.forEach(t => this._classes.add(t));
    this._sync();
  }
  remove(...tokens) {
    tokens.forEach(t => this._classes.delete(t));
    this._sync();
  }
  contains(token) {
    return this._classes.has(token);
  }
  toggle(token, force) {
    if (typeof force === 'boolean') {
      if (force) this.add(token);
      else this.remove(token);
      return force;
    }
    if (this.contains(token)) {
      this.remove(token);
      return false;
    } else {
      this.add(token);
      return true;
    }
  }
  _sync() {
    if (this._el) {
      this._el.className = Array.from(this._classes).join(' ');
    }
  }
}

/**
 * MockElement simulates standard DOM HTML Element
 */
class MockElement {
  constructor(tagName = 'div', id = '') {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.className = '';
    this.classList = new MockClassList(this);
    this.style = {};
    this.children = [];
    this.parentNode = null;
    this._innerHTML = '';
    this._textContent = '';
    this._attrs = {};
    this._eventListeners = {};
  }

  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) {
    this._innerHTML = String(val);
    this._textContent = this._innerHTML.replace(/<[^>]*>/g, '');
  }

  get textContent() { return this._textContent; }
  set textContent(val) {
    this._textContent = String(val);
    this._innerHTML = String(val);
  }

  setAttribute(k, v) { this._attrs[k] = String(v); }
  getAttribute(k) { return this._attrs[k] !== undefined ? this._attrs[k] : null; }
  removeAttribute(k) { delete this._attrs[k]; }
  hasAttribute(k) { return this._attrs[k] !== undefined; }

  appendChild(child) {
    if (!child) return;
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentNode = null;
    }
    return child;
  }

  addEventListener(type, handler) {
    if (!this._eventListeners[type]) this._eventListeners[type] = [];
    this._eventListeners[type].push(handler);
  }

  removeEventListener(type, handler) {
    if (!this._eventListeners[type]) return;
    this._eventListeners[type] = this._eventListeners[type].filter(h => h !== handler);
  }

  dispatchEvent(evt) {
    evt.target = this;
    const handlers = this._eventListeners[evt.type] || [];
    handlers.forEach(h => {
      try { h(evt); } catch (err) { console.error('Handler error:', err); }
    });
    return !evt.defaultPrevented;
  }

  click() {
    this.dispatchEvent({ type: 'click', target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } });
  }

  querySelector(sel) {
    return this.querySelectorAll(sel)[0] || null;
  }

  querySelectorAll(sel) {
    const results = [];
    const check = (el) => {
      if (!el) return;
      if (sel.startsWith('#') && el.id === sel.slice(1)) results.push(el);
      else if (sel.startsWith('.') && el.classList && el.classList.contains(sel.slice(1))) results.push(el);
      else if (el.tagName && el.tagName.toLowerCase() === sel.toLowerCase()) results.push(el);
      else if (sel.includes('.')) {
        const [tag, cls] = sel.split('.');
        if ((!tag || el.tagName.toLowerCase() === tag.toLowerCase()) && el.classList && el.classList.contains(cls)) {
          results.push(el);
        }
      }
      (el.children || []).forEach(check);
    };
    (this.children || []).forEach(check);
    return results;
  }
}

/**
 * MockLocalStorage simulates Web Storage API with Quota support
 */
class MockLocalStorage {
  constructor(quotaBytes = 5 * 1024 * 1024) {
    this._store = new Map();
    this._quotaBytes = quotaBytes;
    this._quotaExceededForced = false;
    this._storageListeners = new Set();
  }

  setQuotaExceededForced(val) {
    this._quotaExceededForced = Boolean(val);
  }

  setQuotaBytes(bytes) {
    this._quotaBytes = bytes;
  }

  addStorageListener(fn) {
    this._storageListeners.add(fn);
  }

  removeStorageListener(fn) {
    this._storageListeners.delete(fn);
  }

  _currentSizeBytes() {
    let size = 0;
    for (const [k, v] of this._store.entries()) {
      size += (k.length + v.length) * 2; // UTF-16 approximate bytes
    }
    return size;
  }

  getItem(key) {
    const val = this._store.get(String(key));
    return val !== undefined ? val : null;
  }

  setItem(key, value) {
    const k = String(key);
    const v = String(value);

    if (this._quotaExceededForced) {
      const err = new Error('The quota has been exceeded.');
      err.name = 'QuotaExceededError';
      err.code = 22;
      throw err;
    }

    const prevVal = this.getItem(k);
    const projectedSize = this._currentSizeBytes() + (v.length * 2);
    if (projectedSize > this._quotaBytes) {
      const err = new Error('The quota has been exceeded.');
      err.name = 'QuotaExceededError';
      err.code = 22;
      throw err;
    }

    this._store.set(k, v);

    // Fire storage events to registered listeners
    for (const listener of this._storageListeners) {
      try {
        listener({
          key: k,
          oldValue: prevVal,
          newValue: v,
          storageArea: this,
          url: 'https://english-autentico.local/'
        });
      } catch (_) {}
    }
  }

  removeItem(key) {
    const k = String(key);
    const prevVal = this.getItem(k);
    this._store.delete(k);
    for (const listener of this._storageListeners) {
      try {
        listener({
          key: k,
          oldValue: prevVal,
          newValue: null,
          storageArea: this,
          url: 'https://english-autentico.local/'
        });
      } catch (_) {}
    }
  }

  clear() {
    this._store.clear();
    for (const listener of this._storageListeners) {
      try {
        listener({
          key: null,
          oldValue: null,
          newValue: null,
          storageArea: this,
          url: 'https://english-autentico.local/'
        });
      } catch (_) {}
    }
  }

  get length() {
    return this._store.size;
  }

  key(index) {
    const keys = Array.from(this._store.keys());
    return keys[index] || null;
  }
}

/**
 * MockAudioNode simulates Web Audio node graph
 */
class MockAudioNode {
  constructor(context, type = 'generic') {
    this.context = context;
    this.type = type;
    this.connectedTo = new Set();
    this.gain = {
      value: 1,
      setValueAtTime: () => {},
      linearRampToValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {}
    };
    this.frequency = {
      value: 440,
      setValueAtTime: () => {}
    };
  }

  connect(dest) {
    this.connectedTo.add(dest);
    this.context._activeConnections.add({ from: this, to: dest });
    return dest;
  }

  disconnect(dest) {
    if (dest) {
      this.connectedTo.delete(dest);
      for (const conn of Array.from(this.context._activeConnections)) {
        if (conn.from === this && conn.to === dest) {
          this.context._activeConnections.delete(conn);
        }
      }
    } else {
      this.connectedTo.clear();
      for (const conn of Array.from(this.context._activeConnections)) {
        if (conn.from === this) {
          this.context._activeConnections.delete(conn);
        }
      }
    }
  }
}

/**
 * MockOscillatorNode simulates OscillatorNode
 */
class MockOscillatorNode extends MockAudioNode {
  constructor(ctx) {
    super(ctx, 'oscillator');
    this.onended = null;
    this._listeners = {};
    this.started = false;
    this.stopped = false;
  }

  addEventListener(type, cb) {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(cb);
  }

  removeEventListener(type, cb) {
    if (!this._listeners[type]) return;
    this._listeners[type] = this._listeners[type].filter(f => f !== cb);
  }

  start(time) {
    this.started = true;
    this.context._activeNodes.add(this);
  }

  stop(time) {
    this.stopped = true;
    setTimeout(() => {
      this.context._activeNodes.delete(this);
      if (typeof this.onended === 'function') this.onended();
      (this._listeners['ended'] || []).forEach(f => f());
    }, 1);
  }
}

/**
 * MockAudioContext simulates Web Audio API AudioContext
 */
class MockAudioContext {
  static instances = [];
  static hardwareLimit = 32;

  constructor() {
    MockAudioContext.instances.push(this);
    if (MockAudioContext.instances.length > MockAudioContext.hardwareLimit) {
      const err = new Error(`The number of hardware contexts provided (${MockAudioContext.instances.length}) has reached the maximum!`);
      err.name = 'InvalidStateError';
      throw err;
    }

    this.sampleRate = 44100;
    this.currentTime = 0;
    this.state = 'running';
    this.destination = new MockAudioNode(this, 'destination');
    this._activeNodes = new Set();
    this._activeConnections = new Set();
  }

  createOscillator() { return new MockOscillatorNode(this); }
  createGain() { return new MockAudioNode(this, 'gain'); }
  createBiquadFilter() { return new MockAudioNode(this, 'biquad'); }
  createDynamicsCompressor() { return new MockAudioNode(this, 'compressor'); }
  createBuffer(channels, length, rate) {
    return { numberOfChannels: channels, length, sampleRate: rate, getChannelData: () => new Float32Array(length) };
  }
  createBufferSource() {
    const src = new MockOscillatorNode(this);
    src.buffer = null;
    return src;
  }
  createMediaElementSource(el) {
    if (el._connectedMediaElement) {
      const err = new Error('HTMLMediaElement already connected');
      err.name = 'InvalidStateError';
      throw err;
    }
    el._connectedMediaElement = true;
    return new MockAudioNode(this, 'mediaElementSource');
  }

  async resume() {
    this.state = 'running';
    return Promise.resolve();
  }

  async suspend() {
    this.state = 'suspended';
    return Promise.resolve();
  }

  async close() {
    this.state = 'closed';
    const idx = MockAudioContext.instances.indexOf(this);
    if (idx !== -1) MockAudioContext.instances.splice(idx, 1);
    return Promise.resolve();
  }
}

/**
 * MockSpeechSynthesis simulates window.speechSynthesis
 */
class MockSpeechSynthesis {
  constructor() {
    this._voices = [
      { name: 'Samantha', lang: 'en-US', default: true },
      { name: 'Alex', lang: 'en-US', default: false },
      { name: 'Luciana', lang: 'pt-BR', default: false }
    ];
    this.speaking = false;
    this.pending = false;
    this.paused = false;
    this._listeners = {};
    this.onvoiceschanged = null;
    this.utteranceHistory = [];
  }

  getVoices() {
    return this._voices;
  }

  setVoices(voices) {
    this._voices = voices;
    this.dispatchVoicesChanged();
  }

  addEventListener(type, cb) {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(cb);
  }

  removeEventListener(type, cb) {
    if (!this._listeners[type]) return;
    this._listeners[type] = this._listeners[type].filter(f => f !== cb);
  }

  dispatchVoicesChanged() {
    if (typeof this.onvoiceschanged === 'function') {
      try { this.onvoiceschanged(); } catch (_) {}
    }
    const handlers = this._listeners['voiceschanged'] || [];
    handlers.forEach(h => {
      try { h(); } catch (_) {}
    });
  }

  speak(utterance) {
    this.speaking = true;
    this.utteranceHistory.push(utterance);
    setTimeout(() => {
      this.speaking = false;
      if (typeof utterance.onend === 'function') utterance.onend({ type: 'end' });
    }, 10);
  }

  cancel() {
    this.speaking = false;
    this.pending = false;
    this.paused = false;
    this.utteranceHistory.forEach(u => {
      if (typeof u.onerror === 'function') u.onerror({ type: 'error', error: 'canceled' });
    });
  }

  pause() { this.paused = true; }
  resume() { this.paused = false; }
}

/**
 * Setup complete simulated browser environment for E2E tests
 */
function createTestEnvironment(options = {}) {
  const env = {};

  MockAudioContext.instances = [];
  env.localStorage = new MockLocalStorage(options.storageQuotaBytes || 5 * 1024 * 1024);

  const elementsMap = new Map();
  const getOrCreateEl = (id, tag = 'div') => {
    if (!elementsMap.has(id)) {
      const el = new MockElement(tag, id);
      elementsMap.set(id, el);
    }
    return elementsMap.get(id);
  };

  // Seed default DOM structure according to English Autêntico index.html
  const body = new MockElement('body', 'app-body');
  const mainApp = new MockElement('main', 'app-main');
  mainApp.className = 'app-container';
  body.appendChild(mainApp);

  // Sections
  const secTemples = getOrCreateEl('sec-temples', 'section');
  secTemples.classList.add('section', 'active');
  const secFlashcards = getOrCreateEl('sec-flashcards', 'section');
  secFlashcards.classList.add('section');
  const secQuiz = getOrCreateEl('sec-quiz', 'section');
  secQuiz.classList.add('section');
  const secVocab = getOrCreateEl('sec-vocab', 'section');
  secVocab.classList.add('section');
  const secGrammar = getOrCreateEl('sec-grammar', 'section');
  secGrammar.classList.add('section');

  mainApp.appendChild(secTemples);
  mainApp.appendChild(secFlashcards);
  mainApp.appendChild(secQuiz);
  mainApp.appendChild(secVocab);
  mainApp.appendChild(secGrammar);

  // Flashcards DOM
  const flashcardStage = getOrCreateEl('fc-stage', 'div');
  flashcardStage.className = 'fc-studio-stage';
  flashcardStage.setAttribute('role', 'region');
  flashcardStage.setAttribute('aria-label', 'Flashcard Studio');

  const flashcard = getOrCreateEl('flashcard', 'div');
  const fcFrente = getOrCreateEl('flashcard-frente', 'div');
  const fcVerso = getOrCreateEl('flashcard-verso', 'div');
  const fcVazio = getOrCreateEl('flashcard-vazio', 'div');
  fcVazio.style.display = 'none';
  const fcResumo = getOrCreateEl('flashcard-resumo', 'div');
  fcResumo.style.display = 'none';

  secFlashcards.appendChild(flashcardStage);
  flashcardStage.appendChild(flashcard);
  flashcard.appendChild(fcFrente);
  flashcard.appendChild(fcVerso);
  secFlashcards.appendChild(fcVazio);
  secFlashcards.appendChild(fcResumo);

  // Document mock
  const docEventListeners = {};
  env.document = {
    body,
    hidden: false,
    readyState: 'complete',
    getElementById: (id) => elementsMap.get(id) || null,
    querySelector: (sel) => {
      if (sel.startsWith('#')) return elementsMap.get(sel.slice(1)) || null;
      if (sel === 'section.active') {
        for (const el of elementsMap.values()) {
          if (el.tagName === 'SECTION' && el.classList.contains('active')) return el;
        }
        return null;
      }
      return body.querySelector(sel);
    },
    querySelectorAll: (sel) => {
      const res = [];
      for (const el of elementsMap.values()) {
        if (sel.startsWith('.') && el.classList.contains(sel.slice(1))) res.push(el);
        if (sel === 'main') if (el.tagName === 'MAIN') res.push(el);
      }
      return res;
    },
    createElement: (tag) => new MockElement(tag),
    addEventListener: (type, handler) => {
      if (!docEventListeners[type]) docEventListeners[type] = [];
      docEventListeners[type].push(handler);
    },
    removeEventListener: (type, handler) => {
      if (!docEventListeners[type]) return;
      docEventListeners[type] = docEventListeners[type].filter(h => h !== handler);
    },
    dispatchEvent: (evt) => {
      const handlers = docEventListeners[evt.type] || [];
      handlers.forEach(h => {
        try { h(evt); } catch (_) {}
      });
      return !evt.defaultPrevented;
    }
  };

  // Window mock
  const winEventListeners = {};
  env.createdBlobUrls = new Set();
  env.revokedBlobUrls = new Set();
  env.hapticEvents = [];

  env.window = {
    document: env.document,
    localStorage: env.localStorage,
    AudioContext: MockAudioContext,
    webkitAudioContext: MockAudioContext,
    speechSynthesis: new MockSpeechSynthesis(),
    SpeechSynthesisUtterance: function(text) {
      this.text = text;
      this.lang = 'en-US';
      this.rate = 1;
      this.pitch = 1;
      this.onend = null;
      this.onerror = null;
    },
    navigator: {
      userAgent: 'Mozilla/5.0 (Linux; Android 14) Chrome/120.0 Mobile Safari/537.36',
      vibrate: (pattern) => {
        env.hapticEvents.push({ pattern, time: Date.now() });
        return true;
      },
      clipboard: {
        writeText: async (t) => { env._clipboard = t; return true; },
        readText: async () => env._clipboard || ''
      }
    },
    URL: {
      createObjectURL: (blob) => {
        const id = 'blob:mock-uuid-' + Math.random().toString(36).slice(2, 9);
        env.createdBlobUrls.add(id);
        return id;
      },
      revokeObjectURL: (url) => {
        env.revokedBlobUrls.add(url);
        env.createdBlobUrls.delete(url);
      }
    },
    Audio: function(src) {
      const el = new MockElement('audio');
      el.src = src;
      el.play = async () => {
        setTimeout(() => el.dispatchEvent({ type: 'ended' }), 5);
        return Promise.resolve();
      };
      el.pause = () => {};
      return el;
    },
    addEventListener: (type, handler) => {
      if (!winEventListeners[type]) winEventListeners[type] = [];
      winEventListeners[type].push(handler);
      if (type === 'storage') {
        env.localStorage.addStorageListener(handler);
      }
    },
    removeEventListener: (type, handler) => {
      if (!winEventListeners[type]) return;
      winEventListeners[type] = winEventListeners[type].filter(h => h !== handler);
      if (type === 'storage') {
        env.localStorage.removeStorageListener(handler);
      }
    },
    dispatchEvent: (evt) => {
      const handlers = winEventListeners[evt.type] || [];
      handlers.forEach(h => {
        try { h(evt); } catch (_) {}
      });
      return !evt.defaultPrevented;
    },
    location: { hash: '#temples' }
  };

  // Wire global bridges
  global.window = env.window;
  global.document = env.document;
  global.localStorage = env.localStorage;
  try {
    Object.defineProperty(global, 'navigator', {
      value: env.window.navigator,
      configurable: true,
      writable: true,
      enumerable: true
    });
  } catch (_) {
    global.navigator = env.window.navigator;
  }
  global.URL = env.window.URL;
  global.Audio = env.window.Audio;
  global.AudioContext = MockAudioContext;
  global.speechSynthesis = env.window.speechSynthesis;
  global.SpeechSynthesisUtterance = env.window.SpeechSynthesisUtterance;

  return env;
}

/**
 * Calculates WCAG 2.1 relative luminance and contrast ratio
 */
function calculateContrastRatio(hex1, hex2) {
  const getRGB = (hex) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const getLuminance = ([r, g, b]) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const l1 = getLuminance(getRGB(hex1));
  const l2 = getLuminance(getRGB(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

module.exports = {
  createTestEnvironment,
  calculateContrastRatio,
  MockAudioContext,
  MockLocalStorage,
  MockElement
};
