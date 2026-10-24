// ============================================================
// tests/backup_reminder.test.js — Testes unitários do Lembrete de Backup & Backup v4
// ============================================================
const assert = require('assert');
const test = require('node:test');

// Mock browser globals
global.window = global;
global.window.addEventListener = () => {};
global.window.location = { reload: () => {} };
global.location = global.window.location;
global.document = {
  getElementById: (id) => {
    if (global._mockDom[id]) return global._mockDom[id];
    return null;
  },
  createElement: (tag) => {
    const el = {
      tagName: tag.toUpperCase(),
      className: '',
      style: {},
      innerHTML: '',
      textContent: '',
      children: [],
      appendChild(child) {
        this.children.push(child);
        return child;
      },
      querySelector(sel) {
        return null;
      },
      setAttribute(k, v) { this[k] = v; },
      removeAttribute(k) { delete this[k]; },
      addEventListener(evt, fn) { this['on' + evt] = fn; },
      remove() {
        if (global.document.body.children) {
          const idx = global.document.body.children.indexOf(this);
          if (idx !== -1) global.document.body.children.splice(idx, 1);
        }
      }
    };
    return el;
  },
  body: {
    children: [],
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) this.children.splice(idx, 1);
    }
  },
  addEventListener: () => {}
};
global._mockDom = {};

global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] !== undefined ? this._store[k] : null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};

global.App = {
  estado: {
    progresso: { xp: 120, nivel: 2 },
    flashcardData: {},
    vocabCache: []
  },
  salvarProgresso() {},
  atualizarStats() {},
  notificar(msg, tipo) {}
};

global.confirm = () => true;
global.I18n = {
  t: (k) => k,
  language: 'pt',
  idioma: 'pt'
};

const BackupReminder = require('../js/backup_reminder.js');
const Profile = require('../js/profile.js');
const IAImport = require('../js/ia-import.js');

global.Profile = Profile;
global.Profilo = Profile;

test('⏰ BackupReminder.deveExibir respeita a cadência periódica de 3 dias', () => {
  localStorage.clear();

  // 1. Sem timestamp anterior -> deve exibir
  assert.strictEqual(BackupReminder.deveExibir(), true);

  // 2. Com timestamp recente (1 dia atrás) -> não deve exibir
  const umDiaAtras = Date.now() - (24 * 60 * 60 * 1000);
  localStorage.setItem('en_ultimo_aviso_backup', String(umDiaAtras));
  assert.strictEqual(BackupReminder.deveExibir(), false);

  // 3. Com timestamp vencido (3 dias e 1 hora atrás) -> deve exibir
  const tresDiasAtras = Date.now() - (3 * 24 * 60 * 60 * 1000 + 3600000);
  localStorage.setItem('en_ultimo_aviso_backup', String(tresDiasAtras));
  assert.strictEqual(BackupReminder.deveExibir(), true);

  // 4. Compatibilidade com chave legada it_ultimo_aviso_backup
  localStorage.removeItem('en_ultimo_aviso_backup');
  localStorage.setItem('it_ultimo_aviso_backup', String(umDiaAtras));
  assert.strictEqual(BackupReminder.deveExibir(), false);

  localStorage.setItem('it_ultimo_aviso_backup', String(tresDiasAtras));
  assert.strictEqual(BackupReminder.deveExibir(), true);
});

test('💾 BackupReminder.acionarBackup executa exportação, registra timestamp e fecha popup', () => {
  localStorage.clear();
  let backupDisparado = false;
  Profile.exportBackup = () => { backupDisparado = true; };

  BackupReminder.acionarBackup();
  assert.strictEqual(backupDisparado, true);

  const timestampSalvo = parseInt(localStorage.getItem('en_ultimo_aviso_backup'), 10);
  assert.ok(!isNaN(timestampSalvo));
  assert.ok(Date.now() - timestampSalvo < 2000);
  assert.strictEqual(BackupReminder.deveExibir(), false);
});

test('⏸️ BackupReminder.pausar e retomar controlam a barra regressiva sem quebrar', () => {
  BackupReminder.popupEl = {
    querySelector: (sel) => {
      if (sel === '.backup-popup-progress') {
        return { style: {} };
      }
      return null;
    }
  };
  BackupReminder._isPausado = false;
  BackupReminder._timerId = 12345;
  BackupReminder._tempoRestante = 15000;
  BackupReminder._inicioTimer = Date.now();

  BackupReminder.pausar();
  assert.strictEqual(BackupReminder._isPausado, true);

  BackupReminder.retomar();
  assert.strictEqual(BackupReminder._isPausado, false);
  BackupReminder.fechar();
});

test('📦 Profile exportBackup v4 e importBackup v4 salvam e restauram preferências completas', () => {
  localStorage.clear();

  // Define preferências ativas
  localStorage.setItem('en_som', 'false');
  localStorage.setItem('en_sidebar_pinned', 'true');
  localStorage.setItem('en_usar_voz_neural', 'true');
  localStorage.setItem('en_voz_neural_instalada', 'true');
  localStorage.setItem('en_immersion_used', 'true');
  localStorage.setItem('en_word_of_the_day', 'test_word');
  localStorage.setItem('en_tour_done', 'true');
  localStorage.setItem('en_ultimo_aviso_backup', '1700000000000');
  localStorage.setItem('en_streak', '5');
  localStorage.setItem('en_fsrs_cards', JSON.stringify({ 'w_1': { stability: 12.5, difficulty: 4.2 } }));

  // Exportar v4
  let backupJsonString = null;
  global.URL = {
    createObjectURL: (blob) => 'blob:mock',
    revokeObjectURL: () => {}
  };
  // Mock element click & download
  let downloadedData = null;
  const origCreateElement = global.document.createElement;
  global.document.createElement = (tag) => {
    const el = origCreateElement(tag);
    if (tag.toLowerCase() === 'a') {
      return {
        ...el,
        click() {},
        set href(val) {},
        set download(val) {}
      };
    }
    return el;
  };

  const backupObj = {
    versao: 4,
    app: 'english-autentico',
    data_exportacao: new Date().toISOString(),
    progresso: { xp: 500, nivel: 3 },
    flashcard_data: { 'w_1': { stability: 12.5 } },
    conquistas: ['first_step'],
    historico_quiz: [],
    streak: { streak: 5, ultimo_dia: '2026-10-24' },
    preferencias: {
      som: false,
      sidebar_pinned: true,
      usar_voz_neural: true,
      voz_neural_instalada: true,
      immersion_used: true,
      word_of_the_day: 'test_word',
      tour_done: true,
      ultimo_aviso_backup: 1700000000000,
      tema: 'dark'
    }
  };

  // Simula importação
  Profile.importBackup(backupObj);

  assert.strictEqual(localStorage.getItem('en_som'), 'false');
  assert.strictEqual(localStorage.getItem('en_sidebar_pinned'), 'true');
  assert.strictEqual(localStorage.getItem('en_usar_voz_neural'), 'true');
  assert.strictEqual(localStorage.getItem('en_ultimo_aviso_backup'), '1700000000000');
  assert.strictEqual(localStorage.getItem('en_word_of_the_day'), 'test_word');

  // Teste de resetProgress
  Profile.resetProgress();
  assert.strictEqual(localStorage.getItem('en_som'), null);
  assert.strictEqual(localStorage.getItem('en_sidebar_pinned'), null);
  assert.strictEqual(localStorage.getItem('en_ultimo_aviso_backup'), null);
  assert.strictEqual(localStorage.getItem('en_word_of_the_day'), null);

  global.document.createElement = origCreateElement;
});

test('🤖 IAImport schema flexível aceita turns/turni/turnos, testo/paragraphs e pronúncia', () => {
  // 1. Diálogo com "turnos"
  const dialTurnos = {
    title: 'Checking in',
    level: 'A2',
    turnos: [
      { speaker: 'Receptionist', line: 'Welcome to the hotel.' },
      { speaker: 'You', line: 'Thank you, I have a reservation.' }
    ]
  };
  assert.strictEqual(IAImport._validateSchema(dialTurnos, 'dialogo'), null);

  // 2. Diálogo com "turns"
  const dialTurns = {
    title: 'Ordering Food',
    level: 'B1',
    turns: [
      { speaker: 'Waiter', line: 'Are you ready to order?' }
    ]
  };
  assert.strictEqual(IAImport._validateSchema(dialTurns, 'dialogo'), null);

  // 3. História com "paragraphs"
  const histParag = {
    title: 'A Rainy Afternoon',
    paragraphs: [
      { english: 'It was raining heavily in Seattle.', portugues: 'Estava chovendo forte em Seattle.' }
    ]
  };
  assert.strictEqual(IAImport._validateSchema(histParag, 'storia'), null);

  // 4. Pronúncia array direto de frases
  const imiArray = [
    {
      frase_ingles: 'Where is the library?',
      frase_portugues: 'Onde fica a biblioteca?'
    }
  ];
  assert.strictEqual(IAImport._validateSchema(imiArray, 'imitazione'), null);

  // 5. Pronúncia com chave frases
  const imiObjeto = {
    frases: [
      { phrase_english: 'How much does this cost?', phrase_portuguese: 'Quanto custa isso?' }
    ]
  };
  assert.strictEqual(IAImport._validateSchema(imiObjeto, 'imitazione'), null);
});
