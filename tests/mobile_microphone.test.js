// tests/mobile_microphone.test.js — Tests for mobile microphone reliability & speech recognition
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

test('📱 Mobile Microphone & Audio — Pronunciation Dojo Platform Compatibility', async (t) => {
  // Load pronunciation.js in mocked environment
  const pronunCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'pronunciation.js'), 'utf8');

  // Setup DOM / Window mocks
  global.window = {
    isSecureContext: true,
    location: { hostname: 'localhost', protocol: 'http:' }
  };
  global.navigator = {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15',
    maxTouchPoints: 5
  };
  global.document = {
    getElementById: (id) => ({
      classList: { add: () => {}, remove: () => {} },
      innerHTML: '',
      innerText: '',
      style: {}
    }),
    querySelector: () => null,
    createElement: () => ({ style: {}, classList: { add: () => {}, remove: () => {} } })
  };
  global.I18n = {
    t: (k) => k
  };
  global.App = {
    notificar: (msg, tipo) => {}
  };

  const setUA = (ua, touch = 0) => {
    Object.defineProperty(global.navigator, 'userAgent', { value: ua, configurable: true, writable: true });
    Object.defineProperty(global.navigator, 'maxTouchPoints', { value: touch, configurable: true, writable: true });
  };

  setUA('Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15', 5);

  // Evaluate script in sandbox
  const fn = new Function('window', 'navigator', 'document', 'I18n', 'App', `${pronunCode}; return Pronunciation;`);
  const Pronunciation = fn(global.window, global.navigator, global.document, global.I18n, global.App);

  // 1. Mobile Detection
  assert.strictEqual(Pronunciation._isMobile(), true, 'Deve identificar iPhone como ambiente mobile');

  setUA('Mozilla/5.0 (Linux; Android 13; SM-S918B)', 5);
  assert.strictEqual(Pronunciation._isMobile(), true, 'Deve identificar Android como ambiente mobile');

  setUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0', 0);
  assert.strictEqual(Pronunciation._isMobile(), false, 'Deve identificar Windows Desktop como não-mobile');

  // 2. Insecure Context Detection
  global.window.isSecureContext = false;
  global.window.location = { hostname: '192.168.1.10', protocol: 'http:' };
  assert.strictEqual(Pronunciation._verificarContextoSeguro(), false, 'Deve rejeitar HTTP em IP de rede local');

  global.window.isSecureContext = true;
  global.window.location = { hostname: 'english.github.io', protocol: 'https:' };
  assert.strictEqual(Pronunciation._verificarContextoSeguro(), true, 'Deve aceitar HTTPS em domínio remoto');

  // 3. MIME type detection for MediaRecorder (iOS Safari vs Chrome)
  global.MediaRecorder = {
    isTypeSupported: (type) => type === 'audio/mp4' || type === 'audio/aac'
  };
  const mimeIos = Pronunciation._obterMimeTypeGravador();
  assert.strictEqual(mimeIos, 'audio/mp4', 'Deve priorizar audio/mp4 no iOS quando webm não for suportado');

  global.MediaRecorder.isTypeSupported = (type) => type.includes('webm');
  const mimeChrome = Pronunciation._obterMimeTypeGravador();
  assert.ok(mimeChrome.includes('webm'), 'Deve utilizar audio/webm no Chrome/Android');

  // 4. Synchronous SpeechRecognition Execution without Hardware Lock
  let startCalled = false;
  let recognitionMock = {
    lang: '',
    continuous: true,
    interimResults: true,
    maxAlternatives: 0,
    start() { startCalled = true; },
    stop() {},
    abort() {}
  };
  global.window.SpeechRecognition = function() { return recognitionMock; };
  global.window.webkitSpeechRecognition = global.window.SpeechRecognition;

  Pronunciation.recognition = null;
  Pronunciation.isRecording = false;
  Pronunciation.toggleRecording();

  assert.strictEqual(startCalled, true, 'recognition.start() deve ser disparado síncronamente no clique');
  assert.strictEqual(Pronunciation.isRecording, true, 'isRecording deve ser true após ativação');

  // 5. Error Handler Resets State Cleanly
  recognitionMock.onerror({ error: 'not-allowed' });
  assert.strictEqual(Pronunciation.isRecording, false, 'isRecording deve resetar para false após not-allowed');

  recognitionMock.onerror({ error: 'audio-capture' });
  assert.strictEqual(Pronunciation.isRecording, false, 'isRecording deve resetar para false após audio-capture');
});

test('🃏 Mobile Microphone & Audio — Flashcards Imitation Mode Resilience', async (t) => {
  const fcCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'flashcards.js'), 'utf8');

  global.window = {
    isSecureContext: true,
    location: { hostname: 'localhost', protocol: 'http:' }
  };
  global.document = {
    getElementById: (id) => ({
      classList: { add: () => {}, remove: () => {} },
      innerHTML: '',
      innerText: '',
      style: {},
      querySelector: () => null
    }),
    addEventListener: () => {}
  };

  let notifChamada = null;
  global.App = {
    notificar: (msg, tipo) => { notifChamada = { msg, tipo }; }
  };
  global.I18n = {
    t: (k) => k
  };

  const fn = new Function('window', 'document', 'I18n', 'App', `${fcCode}; return Flashcards;`);
  const Flashcards = fn(global.window, global.document, global.I18n, global.App);

  Flashcards.cartaAtual = { ingles: 'take off', portugues: 'decolar' };

  let startInvoked = false;
  let recInstance = null;
  global.window.SpeechRecognition = function() {
    this.start = () => { startInvoked = true; };
    this.stop = () => {};
    this.abort = () => {};
    recInstance = this;
  };

  // Start recording
  Flashcards.toggleGravar();
  assert.strictEqual(startInvoked, true, 'Flashcards.toggleGravar() deve iniciar reconhecimento síncrono');
  assert.strictEqual(Flashcards.gravando, true, 'Flashcards.gravando deve ser true');

  // Simulate mobile mic denial
  recInstance.onerror({ error: 'not-allowed' });
  assert.strictEqual(Flashcards.gravando, false, 'gravando deve voltar a false em caso de erro');
  assert.ok(notifChamada && notifChamada.msg.includes('negada'), 'Deve alertar o usuário com mensagem informativa de permissão');
});
