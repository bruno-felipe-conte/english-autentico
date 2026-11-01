// ============================================================
// tests/cognitive_friction_en.test.js
// Unit & Integration tests for Cognitive Friction (M2) in English
// ============================================================

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Carrega os módulos
const TextNormalizer = require('../js/text_normalizer.js');
const ProductionValidator = require('../js/production.js');
const Quiz = require('../js/quiz.js');
const Flashcards = require('../js/flashcards.js');

describe('Cognitive Friction & Active Production (English App)', () => {
  test('ProductionValidator accurately validates direct answers and fuzzy typos', () => {
    // Exact match
    const exact = ProductionValidator.validate('apple', 'apple');
    assert.equal(exact.isCorrect, true);
    assert.equal(exact.isFuzzy, false);
    assert.equal(exact.distance, 0);

    // Fuzzy typo (Levenshtein 1)
    const typo = ProductionValidator.validate('aple', 'apple');
    assert.equal(typo.isCorrect, true);
    assert.equal(typo.isFuzzy, true);
    assert.equal(typo.distance, 1);

    // Wrong answer (Levenshtein > 1)
    const wrong = ProductionValidator.validate('orange', 'apple');
    assert.equal(wrong.isCorrect, false);
  });

  test('ProductionValidator rejects missing apostrophes in English contractions', () => {
    const res = ProductionValidator.validate("dont", "don't");
    assert.equal(res.isCorrect, false);
    assert.match(res.diagnostic, /apóstrofo/i);

    const validApostrophe = ProductionValidator.validate("don't", "don't");
    assert.equal(validApostrophe.isCorrect, true);
  });

  test('ProductionValidator strictly protects grammatical particles (a vs an, in vs on)', () => {
    const resA = ProductionValidator.validate('a', 'an');
    assert.equal(resA.isCorrect, false);

    const resIn = ProductionValidator.validate('in', 'on');
    assert.equal(resIn.isCorrect, false);
  });

  test('Quiz toggles Direct Typing mode correctly', () => {
    assert.equal(typeof Quiz.alternarModo, 'function');
    Quiz.alternarModo(true);
    assert.equal(Quiz.modoDireto, true);
    Quiz.alternarModo(false);
    assert.equal(Quiz.modoDireto, false);
  });

  test('Flashcards Survival Mode correctly initializes and cleans up', () => {
    assert.equal(typeof Flashcards.iniciarSobrevivencia, 'function');
    assert.equal(typeof Flashcards.encerrarSobrevivencia, 'function');
    assert.equal(typeof Flashcards.limparTimersSobrevivencia, 'function');

    // Inicializa simulação
    Flashcards.modoSobrevivencia = true;
    Flashcards.sobrevivencia = {
      ativo: true,
      vidas: 3,
      tempoLimiteMs: 5000,
      tempoRestanteMs: 5000,
      timerInterval: null,
      cartas: [{ id: 'c1', ingles: 'dog', portugues: 'cachorro' }],
      indiceAtual: 0,
      cartaAtual: { id: 'c1', ingles: 'dog', portugues: 'cachorro' },
      pontos: 0,
      combo: 0,
      maiorCombo: 0,
      cartasSobrevividas: 0,
      inicioPerguntaTimestamp: Date.now(),
      lapsosPressao: []
    };

    // Testa resposta correta
    Flashcards.responderSobrevivencia('cachorro');
    assert.equal(Flashcards.sobrevivencia.cartasSobrevividas, 1);
    assert.equal(Flashcards.sobrevivencia.combo, 1);
    assert.ok(Flashcards.sobrevivencia.pontos >= 10);

    // Encerra e limpa
    Flashcards.encerrarSobrevivencia();
    assert.equal(Flashcards.modoSobrevivencia, false);
    assert.equal(Flashcards.sobrevivencia.ativo, false);
  });
});
