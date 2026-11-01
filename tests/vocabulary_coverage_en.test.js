// ============================================================
// tests/vocabulary_coverage_en.test.js
// Unit tests for "O Espelho" (Vocabulary Diagnostic & Coverage Meter) in English
// ============================================================

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const TextNormalizer = require('../js/text_normalizer.js');
const VocabDiagnostic = require('../js/diagnostico.js');
const CoverageMeter = require('../js/coverage_meter.js');

describe('The Mirror: Vocabulary Diagnostic (Abbott CAT)', () => {
  test('Abbott formula calculates adjusted hit rate correctly', () => {
    // Zero false alarms -> Hit rate preserved
    assert.equal(VocabDiagnostic.calcularAbbott(0.8, 0.0), 0.8);

    // HitRate 0.8, FalseAlarm 0.2 -> (0.8 - 0.2) / (1 - 0.2) = 0.6 / 0.8 = 0.75
    assert.equal(VocabDiagnostic.calcularAbbott(0.8, 0.2), 0.75);

    // FalseAlarm >= 0.5 triggers fraud penalty (score = 0)
    assert.equal(VocabDiagnostic.calcularAbbott(0.9, 0.5), 0);
    assert.equal(VocabDiagnostic.calcularAbbott(0.9, 0.6), 0);
  });

  test('Psychometric scoring projects CEFR level and passive/active vocabulary', () => {
    // Simula 36 palavras reais conhecidas e 0 pseudopalavras
    const respostasPerfeitas = [];
    for (let b = 1; b <= 3; b++) {
      for (let i = 0; i < 12; i++) {
        respostasPerfeitas.push({ word: `word_${b}_${i}`, isPseudoword: false, known: true, band: b });
      }
    }
    // 12 pseudopalavras rejeitadas honestamente
    for (let i = 0; i < 12; i++) {
      respostasPerfeitas.push({ word: `pseudo_${i}`, isPseudoword: true, known: false });
    }

    const score = VocabDiagnostic.calcularScore(respostasPerfeitas);
    assert.equal(score.confiavel, true);
    assert.equal(score.false_alarm_rate, 0);
    assert.equal(score.estimativa_passiva, 3000);
    assert.equal(score.estimativa_ativa, 1950); // ~65%
    assert.equal(score.nivel_cefr, 'C1/C2');
  });

  test('Psychometric scoring flags unreliability when user bluffs on pseudowords', () => {
    const respostasBlefe = [];
    for (let i = 0; i < 12; i++) {
      respostasBlefe.push({ word: `real_${i}`, isPseudoword: false, known: true, band: 1 });
    }
    // Usuário diz que conhece todas as pseudopalavras fictícias
    for (let i = 0; i < 12; i++) {
      respostasBlefe.push({ word: `fake_${i}`, isPseudoword: true, known: true });
    }

    const score = VocabDiagnostic.calcularScore(respostasBlefe);
    assert.equal(score.confiavel, false);
    assert.equal(score.false_alarm_rate, 1.0);
    assert.equal(score.estimativa_passiva, 0); // Penalizado por fraude
    assert.equal(score.nivel_cefr, 'A1');
  });
});

describe('The Mirror: Authentic Text Lexical Coverage Meter (Laufer 95%)', () => {
  test('Calculates lexical coverage percentage and Laufer gap accurately', () => {
    const sampleText = "The quick brown fox jumps over the lazy dog";
    const tokens = TextNormalizer.tokenize(sampleText);
    
    // Suponha que o usuário conhece 'the', 'quick', 'brown', 'fox', 'dog'
    const known = new Set(['the', 'quick', 'brown', 'fox', 'dog']);

    const res = CoverageMeter.calculate(tokens, known);
    // Tokens: ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'] = 9 tokens
    // Conhecidos: the (2x), quick, brown, fox, dog = 6 tokens
    // Cobertura: 6 / 9 = 66.7%
    assert.equal(res.coveragePct, 66.7);
    assert.equal(res.lauferGap, 28.3); // 95.0 - 66.7
    assert.equal(res.badgeColor, 'red'); // < 80%
  });

  test('Identifies Top 5 Unlock Keys ranked by impact frequency', () => {
    // Texto com palavras repetidas desconhecidas
    const tokens = ['apple', 'banana', 'banana', 'orange', 'orange', 'orange', 'grape'];
    const known = new Set(['apple']); // apenas 'apple' conhecido

    const res = CoverageMeter.calculate(tokens, known);
    assert.equal(res.unlockKeys.length, 3);
    // Mais frequente primeiro: orange (3x), banana (2x), grape (1x)
    assert.equal(res.unlockKeys[0].lemma, 'orange');
    assert.equal(res.unlockKeys[0].count, 3);
    assert.equal(res.unlockKeys[1].lemma, 'banana');
    assert.equal(res.unlockKeys[1].count, 2);
    assert.equal(res.unlockKeys[2].lemma, 'grape');
    assert.equal(res.unlockKeys[2].count, 1);
  });

  test('Render helper generates valid HTML markup for badge and keys', () => {
    const mockCoverage = {
      coveragePct: 96.2,
      lauferGap: 0,
      badgeColor: 'green'
    };
    const badgeHtml = CoverageMeter.renderBadgeHTML(mockCoverage);
    assert.match(badgeHtml, /badge-cobertura-verde/);
    assert.match(badgeHtml, /96.2% de Cobertura/);

    const unlockHtml = CoverageMeter.renderUnlockKeysHTML([
      { lemma: 'whisper', count: 4, impactPct: 5.2 }
    ]);
    assert.match(unlockHtml, /whisper/);
    assert.match(unlockHtml, /\+5.2%/);
  });
});
