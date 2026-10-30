// ============================================================
// quiz_tabs.test.js — Teste do Padrão de Organização da Aba Quiz
// ============================================================

const { test } = require('node:test');
const assert = require('node:assert');

// Mock DOM & Globals
global.window = {};
global.document = {
  getElementById: (id) => {
    return {
      id,
      innerHTML: '',
      style: {},
      children: [],
      appendChild(child) { this.children.push(child); },
      querySelector: () => null
    };
  },
  createElement: (tag) => ({
    tagName: tag,
    style: {},
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      toggle(c, v) { if (v) this.classes.add(c); else this.classes.delete(c); },
      contains(c) { return this.classes.has(c); }
    },
    children: [],
    appendChild(child) { this.children.push(child); }
  }),
  addEventListener: () => {}
};
global.localStorage = { getItem: () => null, setItem: () => {} };
global.I18n = { t: (k) => k };
global.Progressao = {
  temploDesbloqueado: (n) => n <= 2,
  TEMPLO_NIVEL: { 1: 1, 2: 2, 3: 4 }
};
global.App = {
  estado: {
    templosData: {
      1: { nome: 'New York', nivel: 'A1', palavras: [{ ingles: 'hello', portugues: 'olá', genero: null, plural: null }] },
      2: { nome: 'London', nivel: 'A2', palavras: [{ ingles: 'book', portugues: 'livro', genero: 'm', plural: 'books' }] }
    },
    grammarData: { moduli: [{ id: 'A1', nome: 'Foundations', lezioni: [] }] },
    conjugacoesData: [{ infinitivo: 'to be', tempos: { Present: { I: 'am' } } }],
    quizData: [{ templo: 'phrasal', pergunta: 'Give __', correta: 'up' }]
  }
};

const Quiz = require('../js/quiz.js');

test('🏛️ Organização da Aba Quiz: Navegação por Abas (Tabs)', () => {
  assert.strictEqual(Quiz.abaSeletor, 'templos', 'Aba padrão deve ser templos');

  // Renderizar seletor
  Quiz.renderizarSeletor();

  // Testar alternância para Morfologia
  Quiz.abaSeletor = 'morfologia';
  Quiz.renderizarSeletor();
  assert.strictEqual(Quiz.abaSeletor, 'morfologia');

  // Testar alternância para Listening
  Quiz.abaSeletor = 'listening';
  Quiz.renderizarSeletor();
  assert.strictEqual(Quiz.abaSeletor, 'listening');

  // Testar alternância para Gramática
  Quiz.abaSeletor = 'gramatica';
  Quiz.renderizarSeletor();
  assert.strictEqual(Quiz.abaSeletor, 'gramatica');

  // Testar alternância para Conjugação
  Quiz.abaSeletor = 'verbi';
  Quiz.renderizarSeletor();
  assert.strictEqual(Quiz.abaSeletor, 'verbi');

  // Testar alternância para Phrasal Verbs
  Quiz.abaSeletor = 'phrasal';
  Quiz.renderizarSeletor();
  assert.strictEqual(Quiz.abaSeletor, 'phrasal');
});
