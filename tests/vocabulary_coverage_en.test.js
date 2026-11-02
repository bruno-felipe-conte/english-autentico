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

  test('Expanded bank includes exactly 25 advanced words and 25 authentic contextual sentences', () => {
    assert.equal(Array.isArray(VocabDiagnostic.PALAVRAS_AVANCADAS), true);
    assert.equal(VocabDiagnostic.PALAVRAS_AVANCADAS.length, 25, 'Must contain exactly 25 advanced words');

    assert.equal(Array.isArray(VocabDiagnostic.FRASES_DIAGNOSTICO), true);
    assert.equal(VocabDiagnostic.FRASES_DIAGNOSTICO.length, 25, 'Must contain exactly 25 contextual sentences');

    // All sentences must have en, pt, foco, and cefr
    VocabDiagnostic.FRASES_DIAGNOSTICO.forEach((f, idx) => {
      assert.ok(f.en && f.en.length > 10, `Sentence ${idx} must have authentic English content`);
      assert.ok(f.pt && f.pt.length > 5, `Sentence ${idx} must have Portuguese explanation`);
      assert.ok(f.foco, `Sentence ${idx} must have grammatical focus`);
      assert.ok(f.cefr, `Sentence ${idx} must define target CEFR level`);
    });

    const generated = VocabDiagnostic.gerarItensTeste();
    assert.equal(generated.length, 62, 'Total generated items must be 25 words + 25 sentences + 12 pseudowords = 62');
    const frases = generated.filter(i => i.tipo === 'frase');
    const palavras = generated.filter(i => i.tipo === 'palavra' && !i.isPseudoword);
    const pseudo = generated.filter(i => i.isPseudoword);
    assert.equal(frases.length, 25);
    assert.equal(palavras.length, 25);
    assert.equal(pseudo.length, 12);
  });

  test('Psychometric scoring integrates sentence comprehension with vocabulary for holistic CEFR diagnosis', () => {
    // 25 palavras reais conhecidas
    const respostas = VocabDiagnostic.PALAVRAS_AVANCADAS.map(p => ({
      tipo: 'palavra',
      word: p.word,
      isPseudoword: false,
      known: true,
      band: p.band
    }));

    // 12 pseudopalavras rejeitadas honestamente
    VocabDiagnostic.PSEUDOPALAVRAS.forEach(w => {
      respostas.push({
        tipo: 'palavra',
        word: w,
        isPseudoword: true,
        known: false
      });
    });

    // Cenário 1: Compreensão plena de frases (25 de 25)
    const respostasAltaSintaxe = [
      ...respostas,
      ...VocabDiagnostic.FRASES_DIAGNOSTICO.map(f => ({
        tipo: 'frase',
        word: f.en,
        isPseudoword: false,
        known: true,
        cefr: f.cefr
      }))
    ];

    const scoreAlto = VocabDiagnostic.calcularScore(respostasAltaSintaxe);
    assert.equal(scoreAlto.confiavel, true);
    assert.equal(scoreAlto.total_frases, 25);
    assert.equal(scoreAlto.frases_acertos, 25);
    assert.equal(scoreAlto.taxa_frases, 1.0);
    assert.equal(scoreAlto.nivel_cefr, 'C1/C2');

    // Cenário 2: Vocabulário conhecido, mas baixa compreensão sintática de frases (apenas 5 de 25)
    const respostasBaixaSintaxe = [
      ...respostas,
      ...VocabDiagnostic.FRASES_DIAGNOSTICO.map((f, i) => ({
        tipo: 'frase',
        word: f.en,
        isPseudoword: false,
        known: i < 5, // apenas 5 acertos (20%)
        cefr: f.cefr
      }))
    ];

    const scoreModerado = VocabDiagnostic.calcularScore(respostasBaixaSintaxe);
    assert.equal(scoreModerado.confiavel, true);
    assert.equal(scoreModerado.frases_acertos, 5);
    assert.equal(scoreModerado.taxa_frases, 0.2);
    // Não pode atingir C1/C2 sem compreensão de frases!
    assert.notEqual(scoreModerado.nivel_cefr, 'C1/C2');
    assert.ok(['A1', 'A2', 'B1'].includes(scoreModerado.nivel_cefr));
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
