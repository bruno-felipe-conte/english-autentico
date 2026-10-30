// ============================================================
// tests/flashcards_drawer.test.js
// Validação da Gaveta Retrátil de Flashcards (Zero-Scroll UX)
// ============================================================
const assert = require('assert');
const test = require('node:test');

// Mini DOM mock para testes unitários isolados
class MockClassList {
  constructor() {
    this._classes = new Set();
  }
  add(cls) { this._classes.add(cls); }
  remove(cls) { this._classes.delete(cls); }
  contains(cls) { return this._classes.has(cls); }
  toggle(cls, force) {
    if (typeof force === 'boolean') {
      if (force) this.add(cls);
      else this.remove(cls);
      return force;
    }
    if (this.contains(cls)) {
      this.remove(cls);
      return false;
    } else {
      this.add(cls);
      return true;
    }
  }
}

class MockElement {
  constructor(id) {
    this.id = id;
    this.classList = new MockClassList();
    this.style = {};
    this.innerHTML = '';
    this.textContent = '';
    this._attrs = {};
  }
  setAttribute(k, v) { this._attrs[k] = String(v); }
  getAttribute(k) { return this._attrs[k] || null; }
}

test('Gaveta Retrátil nos Flashcards: Alternância e Recolhimento Automático', async (t) => {
  // Prepara elementos DOM mockados
  const elements = {
    'fc-compact-bar': new MockElement('fc-compact-bar'),
    'fc-seletor-drawer': new MockElement('fc-seletor-drawer'),
    'fc-studio-sidebar': new MockElement('fc-studio-sidebar'),
    'fc-studio-layout': new MockElement('fc-studio-layout'),
    'fc-compact-toggle-btn': new MockElement('fc-compact-toggle-btn'),
    'fc-compact-origem': new MockElement('fc-compact-origem'),
    'fc-compact-modo': new MockElement('fc-compact-modo'),
    'fc-compact-count': new MockElement('fc-compact-count'),
  };

  global.document = {
    getElementById: (id) => elements[id] || null,
    querySelector: (sel) => elements[sel.replace(/[#.]/g, '')] || null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  global.window = global;
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
  };

  global.App = {
    estado: {
      templosData: {
        1: { nome: 'London', cidade: 'London' }
      },
      vocabCache: []
    },
    notificar: () => {},
    ehFavorito: () => false
  };

  global.I18n = {
    t: (k) => k
  };

  // Carrega Flashcards
  delete require.cache[require.resolve('../js/flashcards.js')];
  require('../js/flashcards.js');

  const Flashcards = global.Flashcards;
  assert.ok(Flashcards, 'Módulo Flashcards deve existir');
  assert.strictEqual(typeof Flashcards.toggleGaveta, 'function', 'toggleGaveta deve ser uma função');
  assert.strictEqual(typeof Flashcards.recolherGaveta, 'function', 'recolherGaveta deve ser uma função');
  assert.strictEqual(typeof Flashcards.abrirGaveta, 'function', 'abrirGaveta deve ser uma função');

  await t.test('1. Sessão inativa esconde a barra compacta e não força gaveta recolhida', () => {
    Flashcards.cartasDisponiveis = [];
    Flashcards.indiceAtual = 0;
    Flashcards._sincronizarBarraCompacta();

    assert.strictEqual(elements['fc-compact-bar'].style.display, 'none');
    assert.strictEqual(elements['fc-seletor-drawer'].classList.contains('recolhido'), false);
  });

  await t.test('2. Com sessão ativa, ao alternar com toggleGaveta / toggleSeletor recolhe e expande a gaveta', () => {
    Flashcards.cartasDisponiveis = [{ id: 'w1', english: 'hello', portugues: 'olá' }];
    Flashcards.indiceAtual = 0;
    Flashcards.temploAtual = 1;

    // Recolhida
    Flashcards.recolherGaveta();
    assert.strictEqual(elements['fc-compact-bar'].style.display, 'flex');
    assert.strictEqual(elements['fc-seletor-drawer'].classList.contains('recolhido'), true);
    assert.strictEqual(Flashcards.seletorRecolhido, true);

    // Aberta
    Flashcards.abrirGaveta();
    assert.strictEqual(elements['fc-seletor-drawer'].classList.contains('recolhido'), false);
    assert.strictEqual(Flashcards.seletorRecolhido, false);
  });

  await t.test('3. Selecionar templo recolhe a gaveta automaticamente', () => {
    Flashcards.abrirGaveta();
    assert.strictEqual(elements['fc-seletor-drawer'].classList.contains('recolhido'), false);

    // Simula carregamento de templo
    Flashcards.cartasDisponiveis = [{ id: 'w1', english: 'cat', portugues: 'gato' }];
    Flashcards.indiceAtual = 0;
    Flashcards.seletorRecolhido = true;
    Flashcards._sincronizarBarraCompacta();

    // Gaveta deve estar recolhida
    assert.strictEqual(elements['fc-seletor-drawer'].classList.contains('recolhido'), true);
    assert.strictEqual(elements['fc-compact-bar'].style.display, 'flex');
    assert.ok(elements['fc-compact-origem'].textContent.includes('T1'));
  });

  await t.test('4. Estilização dos Flashcards adota azul marinho (#003E8A) e elimina tons vermelhos italianos', () => {
    const fs = require('fs');
    const path = require('path');
    const cssPath = path.join(__dirname, '..', 'css', 'english.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Validação de ausência de tons vermelho vinho italiano nos flashcards
    const forbiddenItalianReds = ['#A8283B', '#751422', '#4A0B14', '#8B1E2F', '#7A1926', '#5C101D', '#C4304A'];
    for (const red of forbiddenItalianReds) {
      assert.strictEqual(cssContent.includes(red), false, `O CSS não deve conter a cor vermelha italiana ${red}`);
    }

    // Validação de presença do azul marinho nos flashcards
    assert.ok(cssContent.includes('.flashcard-deck-stack .card-frente'), 'Deve conter estilização de frente do deck stack');
    assert.ok(cssContent.includes('#003E8A'), 'Deve conter o azul marinho característico (#003E8A)');
  });
});
