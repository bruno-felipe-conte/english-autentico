// ============================================================
// tests/ux_ergonomics.test.js
// Testes automatizados para M4: UX Ergonomics, Shortcuts, WCAG 2.1 AA,
// Empty States, Landmarks, Haptics & Resiliência
// ============================================================
const assert = require('assert');
const test = require('node:test');
const fs = require('fs');
const path = require('path');

// ── Helpers de Luminância e Contraste WCAG 2.1 ──
function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function srgbToLinear(c) {
  const norm = c / 255;
  return norm <= 0.04045 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── Testes ──

test('🃏 F14: Flashcard Summary TDZ & Timezone Streak Safety', () => {
  // Mock DOM
  const store = {};
  global.localStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  };

  const metaEl = { style: {} };
  const resumoEl = {
    style: {},
    setAttribute: () => {},
    innerHTML: ''
  };

  global.document = {
    getElementById: (id) => {
      if (id === 'meta-calibration') return metaEl;
      if (id === 'flashcard-resumo') return resumoEl;
      return null;
    },
    createElement: () => ({ style: {}, className: '', remove: () => {} }),
    body: { appendChild: () => {} },
    addEventListener: () => {}
  };

  global.window = global;
  global.I18n = {
    t: (k) => k
  };
  global.App = {
    estado: {
      progresso: {},
      templosData: {},
      flashcardData: {}
    },
    salvarProgresso: () => {},
    notificar: () => {}
  };

  // Carrega Flashcards
  delete require.cache[require.resolve('../js/flashcards.js')];
  const Flashcards = require('../js/flashcards.js');

  // Caso 1: sessaoStats válida com acertos — NÃO pode lançar ReferenceError
  Flashcards.sessaoStats = {
    again: 1,
    hard: 2,
    good: 5,
    easy: 2,
    novas: ['apple'],
    xp: 50,
    streak: 3
  };

  assert.doesNotThrow(() => {
    Flashcards.mostrarResumo();
  }, 'mostrarResumo() não deve lançar TDZ ReferenceError');

  assert.strictEqual(resumoEl.style.display, 'block');
  assert.ok(resumoEl.innerHTML.includes('resumo-card'));

  // Caso 2: Streak date com compensação de fuso horário local
  const offsetMs = new Date().getTimezoneOffset() * 60000;
  const hojeEsperado = new Date(Date.now() - offsetMs).toISOString().slice(0, 10);
  assert.strictEqual(store['en_fc_streak_date'], hojeEsperado, 'Streak date deve usar fuso horário local');

  // Caso 3: sessaoStats com total zero — divisão por zero prevenida
  Flashcards.sessaoStats = {
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
    novas: [],
    xp: 0,
    streak: 0
  };
  assert.doesNotThrow(() => {
    Flashcards.mostrarResumo();
  });
});

test('⌨️ F15: Shortcut Collision Prevention (Global numeric keys guarded)', async () => {
  let navTarget = null;
  const listeners = [];

  const mockDoc = {
    addEventListener: (type, fn) => {
      if (type === 'keydown') listeners.push(fn);
    },
    querySelector: (sel) => null,
    getElementById: () => null
  };

  global.document = mockDoc;
  global.window = {
    addEventListener: () => {},
    location: { hash: '' }
  };

  delete require.cache[require.resolve('../js/app/bootstrap.js')];
  const AppBootstrap = {
    ...require('../js/app/bootstrap.js'),
    estado: {
      progresso: {},
      vocabCache: [],
      templosData: {},
      quizData: []
    },
    carregarDados: async () => {},
    carregarProgresso: () => ({}),
    carregarFlashcards: () => ({}),
    carregarEnergia: () => {},
    salvarEnergia: () => {},
    atualizarStats: () => {},
    renderizarTemplos: () => {},
    navegar: (target) => { navTarget = target; }
  };

  await AppBootstrap.init();
  const keyHandler = listeners.find(fn => typeof fn === 'function');
  assert.ok(typeof keyHandler === 'function', 'Listener de keydown deve ter sido registrado');

  // Cenário 1: Fora de estudo (nenhuma seção ativa de estudo) -> tecla 1 navega para temples
  mockDoc.querySelector = () => null;
  navTarget = null;
  keyHandler({ key: '1', target: { tagName: 'DIV' }, preventDefault: () => {} });
  assert.strictEqual(navTarget, 'temples', 'Fora de estudo, tecla 1 navega para temples');

  // Cenário 2: Dentro de flashcards (#sec-flashcards.active existe) -> tecla 1 NÃO deve navegar
  mockDoc.querySelector = (sel) => {
    if (sel.includes('#sec-flashcards.active')) return { id: 'sec-flashcards' };
    return null;
  };
  navTarget = null;
  keyHandler({ key: '1', target: { tagName: 'DIV' }, preventDefault: () => {} });
  assert.strictEqual(navTarget, null, 'Dentro de flashcards, tecla 1 NÃO deve roubar a navegação');

  // Cenário 3: Dentro de flashcards, com Alt pressionado -> atalho global intencional Alt+1 navega
  keyHandler({ key: '1', altKey: true, target: { tagName: 'DIV' }, preventDefault: () => {} });
  assert.strictEqual(navTarget, 'temples', 'Alt+1 deve permitir navegação global mesmo em estudo');

  // Cenário 4: Dentro de Quiz (#sec-quiz.active existe) -> tecla 3 NÃO deve navegar
  mockDoc.querySelector = (sel) => {
    if (sel.includes('#sec-quiz.active')) return { id: 'sec-quiz' };
    return null;
  };
  navTarget = null;
  keyHandler({ key: '3', target: { tagName: 'DIV' }, preventDefault: () => {} });
  assert.strictEqual(navTarget, null, 'Dentro de quiz, tecla 3 NÃO deve roubar a navegação');
});

test('🔄 F16: Space / Enter Card Flip Logic', () => {
  const listeners = [];
  let cardViradoClass = false;

  const cardNode = {
    id: 'flashcard',
    classList: {
      contains: (cls) => (cls === 'virado' ? cardViradoClass : false),
      add: (cls) => { if (cls === 'virado') cardViradoClass = true; }
    }
  };
  const secFcNode = {
    id: 'sec-flashcards',
    classList: {
      contains: (cls) => cls === 'active'
    }
  };

  global.document = {
    getElementById: (id) => {
      if (id === 'flashcard') return cardNode;
      if (id === 'sec-flashcards') return secFcNode;
      return null;
    },
    querySelector: (sel) => null,
    addEventListener: (type, fn) => {
      if (type === 'keydown') listeners.push(fn);
    }
  };

  delete require.cache[require.resolve('../js/flashcards.js')];
  const Flashcards = require('../js/flashcards.js');

  Flashcards.cartaAtual = { id: 'card_test', ingles: 'hello', traducao: 'olá' };
  Flashcards.virada = false;
  cardViradoClass = false;

  const keyHandler = listeners.find(fn => typeof fn === 'function');
  assert.ok(typeof keyHandler === 'function', 'Listener de keydown deve existir');

  // Cenário 1: Carta não virada + seção flashcard ativa -> Space deve virar a carta
  let prevented = false;
  keyHandler({
    key: ' ',
    target: { tagName: 'DIV' },
    preventDefault: () => { prevented = true; }
  });
  assert.strictEqual(Flashcards.virada, true, 'Flashcards.virada deve ser true após Space');
  assert.strictEqual(cardViradoClass, true, 'cardNode deve receber classe virado');
  assert.strictEqual(prevented, true, 'Space deve invocar preventDefault');

  // Cenário 2: Carta virada -> Space NÃO deve re-executar virar
  let virouNovamente = false;
  const originalVirar = Flashcards.virar;
  Flashcards.virar = () => { virouNovamente = true; };
  keyHandler({
    key: ' ',
    target: { tagName: 'DIV' },
    preventDefault: () => {}
  });
  assert.strictEqual(virouNovamente, false, 'Space com carta já virada não deve chamar virar()');
  Flashcards.virar = originalVirar;

  // Cenário 3: Carta não virada + Enter -> Enter deve virar a carta
  Flashcards.virada = false;
  cardViradoClass = false;
  keyHandler({
    key: 'Enter',
    target: { tagName: 'DIV' },
    preventDefault: () => {}
  });
  assert.strictEqual(Flashcards.virada, true, 'Enter deve virar a carta');
});

test('🇮🇹 F17: Italian Empty State Copy Replaced with English Autêntico', () => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Não deve conter resíduo italiano "Bravissimo!"
  assert.strictEqual(html.includes('Bravissimo!'), false, 'Não deve conter "Bravissimo!" residual');
  // Deve conter texto do English Autêntico
  assert.ok(html.includes('Well Done!'), 'Deve conter "Well Done!" no empty state');
});

test('🎨 F18: WCAG 2.1 AA Mathematical Color Contrast (>= 4.5:1)', () => {
  const cssPath = path.join(__dirname, '..', 'css', 'variables.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Extrai tokens
  assert.ok(css.includes('--cor-pietra:           #5C4D3E'), '--cor-pietra deve ser #5C4D3E');

  // 1. Modo claro: Pietra sobre Pergaminho (#F5EDD8) e Mármore (#FAF7F2)
  const ratioPietraPergaminho = contrastRatio('#5C4D3E', '#F5EDD8');
  const ratioPietraMarmore = contrastRatio('#5C4D3E', '#FAF7F2');
  assert.ok(ratioPietraPergaminho >= 4.5, `Pietra sobre Pergaminho deve ser >= 4.5:1 (atual: ${ratioPietraPergaminho.toFixed(2)}:1)`);
  assert.ok(ratioPietraMarmore >= 4.5, `Pietra sobre Mármore deve ser >= 4.5:1 (atual: ${ratioPietraMarmore.toFixed(2)}:1)`);

  // 2. Modo escuro: Pietra dark (#A8988B) sobre Mármore escuro (#24201D) e Fundo escuro (#161311)
  const ratioPietraDarkMarmore = contrastRatio('#A8988B', '#24201D');
  const ratioPietraDarkBg = contrastRatio('#A8988B', '#161311');
  assert.ok(ratioPietraDarkMarmore >= 4.5, `Pietra dark sobre Mármore escuro deve ser >= 4.5:1 (atual: ${ratioPietraDarkMarmore.toFixed(2)}:1)`);
  assert.ok(ratioPietraDarkBg >= 4.5, `Pietra dark sobre Fundo escuro deve ser >= 4.5:1 (atual: ${ratioPietraDarkBg.toFixed(2)}:1)`);

  // 3. Modo escuro: Botão primário (#FFFFFF sobre #2870C4)
  const ratioBtnPrimarioDark = contrastRatio('#FFFFFF', '#2870C4');
  assert.ok(ratioBtnPrimarioDark >= 4.5, `Botão primário modo escuro deve ter contraste >= 4.5:1 (atual: ${ratioBtnPrimarioDark.toFixed(2)}:1)`);
});

test('🏛️ F19: HTML5 Landmark Duplication Resolved & A11y Attributes Present', () => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // 1. Apenas um único <main> no documento
  const mainMatches = html.match(/<main[\s>]/gi) || [];
  assert.strictEqual(mainMatches.length, 1, 'Deve existir estritamente 1 único elemento <main> no DOM');
  assert.ok(html.includes('<main class="app-container">'), 'O landmark único deve ser o <main class="app-container">');

  // 2. Flashcards Stage utiliza div com role="region" e aria-label
  assert.ok(html.includes('role="region" aria-label="Flashcards Stage" class="fc-studio-stage"'), 'fc-studio-stage deve ser div role="region"');

  // 3. Quiz explanation possui aria-live="polite"
  assert.ok(html.includes('id="quiz-explicacao" aria-live="polite"'), 'quiz-explicacao deve conter aria-live="polite"');

  // 4. Landmarks de navegação possuem rótulos descritivos (aria-label)
  assert.ok(html.includes('<nav class="nav-tabs" aria-label="Navegação Principal">'), 'Top nav deve possuir aria-label');
  assert.ok(html.includes('<nav class="bottom-nav" id="bottom-nav" aria-label="Navegação Rápida Inferior">'), 'Bottom nav deve possuir aria-label');
});

test('📳 F20: Subtle Haptic Feedback Integration', () => {
  let vibratePattern = null;
  global.navigator.vibrate = (pattern) => {
    vibratePattern = pattern;
    return true;
  };

  // Mock DOM
  global.document = {
    getElementById: (id) => {
      if (id === 'flashcard') return { classList: { add: () => {}, contains: () => false } };
      return null;
    },
    addEventListener: () => {}
  };

  delete require.cache[require.resolve('../js/flashcards.js')];
  const Flashcards = require('../js/flashcards.js');

  // 1. Card flip aciona navigator.vibrate
  vibratePattern = null;
  Flashcards.virar();
  assert.strictEqual(vibratePattern, 15, 'Flashcards.virar() deve acionar haptic feedback de 15ms');

  // 2. Rating aciona navigator.vibrate
  vibratePattern = null;
  Flashcards.avaliar(1);
  assert.strictEqual(vibratePattern, 15, 'Flashcards.avaliar(1) deve acionar haptic feedback de 15ms');
});
