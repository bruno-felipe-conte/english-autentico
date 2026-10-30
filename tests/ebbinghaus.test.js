// tests/ebbinghaus.test.js - Unit tests for Ebbinghaus Forgetting Curve & FSRS-4.5/5 Projection
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  EBBINGHAUS_I18N,
  predictNextStabilityGood,
  formatDaysLabel,
  computeEbbinghausCurve,
  renderEbbinghausCurve
} = require('../js/ebbinghaus.js');

test('📈 FSRS-4.5/5 Power-Law Retrievability & Mathematical Properties', async () => {
  // Test R(t, S) at t=0 and t=S
  const FSRS_DECAY = -0.5;
  const FSRS_FACTOR = 19 / 81;

  const R = (t, s) => Math.pow(1 + FSRS_FACTOR * (t / s), FSRS_DECAY);

  // At t = 0, R must be exactly 1.0 (100%)
  assert.strictEqual(R(0, 10), 1.0);

  // At t = S, R must be exactly 0.90 (90%)
  const rAtS = R(10, 10);
  assert.ok(Math.abs(rAtS - 0.90) < 1e-6, `R(S, S) should be ~0.90, got ${rAtS}`);

  // Test target retention time: at target = 0.90, time to target must equal S
  const target = 0.90;
  const timeToTarget = (s) => (s / FSRS_FACTOR) * (Math.pow(target, 1 / FSRS_DECAY) - 1);
  const sSample = 7.5;
  const tTarget = timeToTarget(sSample);
  assert.ok(Math.abs(tTarget - sSample) < 1e-6, `Target time should equal S at 90%, got ${tTarget}`);
});

test('🎯 Next Stability Prediction (predictNextStabilityGood)', async () => {
  // 1. With valid FSRS card (difficulty 5, stability 4)
  const cardFSRS = { difficulty: 5, stability: 4 };
  const sBom = predictNextStabilityGood(cardFSRS, 4);
  assert.ok(sBom > 4, `sBom (${sBom}) must be greater than currentS (4)`);
  assert.ok(sBom >= 5, `sBom must be at least S + 1`);

  // 2. With fallback card (no difficulty, has ease_factor 2.5)
  const cardLegacy = { ease_factor: 2.5 };
  const sBomLegacy = predictNextStabilityGood(cardLegacy, 3);
  assert.strictEqual(sBomLegacy, 7.5, 'sBom with EF 2.5 should be 3 * 2.5 = 7.5');

  // 3. Fallback when card is null
  const sBomNull = predictNextStabilityGood(null, 2);
  assert.strictEqual(sBomNull, 5, 'Fallback with null card should be 2 * 2.5 = 5');
});

test('🏷️ Format Days Label (formatDaysLabel)', async () => {
  assert.strictEqual(formatDaysLabel(1), '1d');
  assert.strictEqual(formatDaysLabel(4.0), '4d');
  assert.strictEqual(formatDaysLabel(3.5), '3.5d');
});

test('📊 computeEbbinghausCurve — Empty State', async () => {
  const result = computeEbbinghausCurve([], null);
  assert.strictEqual(result.hasData, false);
  assert.strictEqual(result.sourceKey, 'empty');
  assert.strictEqual(result.pathAtual, '');
  assert.strictEqual(result.pathBom, '');
  assert.strictEqual(result.pointAtual, null);
  assert.strictEqual(result.pointBom, null);
});

test('📊 computeEbbinghausCurve — Active Card Focus', async () => {
  const activeCard = { stability: 4, difficulty: 5 };
  const result = computeEbbinghausCurve([activeCard], activeCard, { desiredRetention: 0.90 });

  assert.strictEqual(result.hasData, true);
  assert.strictEqual(result.sourceKey, 'focused');
  assert.strictEqual(result.sAtual, 4);
  assert.ok(result.sBom > 4, 'sBom must be larger than sAtual');
  assert.strictEqual(result.targetPct, 90);

  // SVG paths must start with Move to initial coordinate
  assert.ok(result.pathAtual.startsWith('M 38 20'), 'Current path starts at (38, 20)');
  assert.ok(result.pathBom.startsWith('M 38 20'), 'Good path starts at (38, 20)');

  // Coordinates must be within SVG viewBox bounds (viewBox="0 0 380 175")
  assert.ok(result.pointAtual.x >= 38 && result.pointAtual.x <= 355, 'pointAtual.x in bounds');
  assert.ok(result.pointBom.x >= 38 && result.pointBom.x <= 355, 'pointBom.x in bounds');
  assert.ok(result.pointBom.x > result.pointAtual.x, 'pointBom.x must be further in time than pointAtual.x');
});

test('📊 computeEbbinghausCurve — Deck Average', async () => {
  const cards = [
    { stability: 2, difficulty: 4 },
    { stability: 6, difficulty: 6 }
  ];
  const result = computeEbbinghausCurve(cards, null, { desiredRetention: 0.90 });

  assert.strictEqual(result.hasData, true);
  assert.strictEqual(result.sourceKey, 'deck_average');
  assert.strictEqual(result.sAtual, 4); // (2 + 6) / 2 = 4
  assert.ok(result.sBom > 4);
});

test('🌐 Multilingual Dictionary (EBBINGHAUS_I18N)', async () => {
  ['pt', 'en', 'it'].forEach((lang) => {
    const dict = EBBINGHAUS_I18N[lang];
    assert.ok(dict, `Dictionary for ${lang} must exist`);
    assert.ok(dict.title, `Title for ${lang} must exist`);
    assert.ok(dict.subtitle, `Subtitle for ${lang} must exist`);
    assert.ok(typeof dict.legendNoReview === 'function');
    assert.ok(typeof dict.legendAfterGood === 'function');
    assert.ok(typeof dict.ariaSummary === 'function');
  });
});

test('🖼️ renderEbbinghausCurve — DOM and Accessibility Compliance', async () => {
  // Mock DOM container
  const container = {
    innerHTML: ''
  };

  const activeCard = { stability: 5, difficulty: 4 };
  const data = renderEbbinghausCurve(container, [activeCard], activeCard, {
    locale: 'en',
    desiredRetention: 0.90
  });

  assert.ok(data.hasData);
  assert.ok(container.innerHTML.includes('role="img"'), 'Must have role="img"');
  assert.ok(container.innerHTML.includes('aria-labelledby='), 'Must have aria-labelledby');
  assert.ok(container.innerHTML.includes('<desc id='), 'Must have accessible SVG desc');
  assert.ok(container.innerHTML.includes('it-ebbinghaus-card'), 'Has wrapper CSS class');
  assert.ok(container.innerHTML.includes('Active card'), 'Includes English badge text');
});

test('🏹 Gráfico em Cascata Multi-Ciclos (Ebbinghaus / FSRS-5)', async () => {
  // 1. Simulação de histórico de revisões com Good e Lapso (Again)
  const cardComHistorico = {
    id: 'test-card-1',
    stability: 22.0,
    difficulty: 4.5,
    history: [
      {
        timestamp: Date.now() - 86400000 * 20,
        rating: 3, // Good -> sobe a 100%
        stabilityBefore: 1.0,
        stabilityAfter: 3.5,
        retrievabilityBefore: 0.72,
        targetPeak: 1.0,
        intervalDays: 4
      },
      {
        timestamp: Date.now() - 86400000 * 10,
        rating: 1, // Again (Lapse) -> sobe apenas a 85%
        stabilityBefore: 3.5,
        stabilityAfter: 1.2,
        retrievabilityBefore: 0.65,
        targetPeak: 0.85,
        intervalDays: 1
      },
      {
        timestamp: Date.now() - 86400000 * 3,
        rating: 3, // Good -> sobe a 100%
        stabilityBefore: 1.2,
        stabilityAfter: 5.0,
        retrievabilityBefore: 0.88,
        targetPeak: 1.0,
        intervalDays: 6
      },
      {
        timestamp: Date.now(),
        rating: 4, // Easy -> sobe a 100%
        stabilityBefore: 5.0,
        stabilityAfter: 22.0,
        retrievabilityBefore: 0.94,
        targetPeak: 1.0,
        intervalDays: 24
      }
    ]
  };

  // 2. Modo Padrão: 3 Recentes
  const dataRecente = computeEbbinghausCurve([cardComHistorico], cardComHistorico, { cascadeMode: 'recent' });
  assert.strictEqual(dataRecente.isCascade, true);
  assert.strictEqual(dataRecente.viewMode, 'recent');
  assert.strictEqual(dataRecente.cascadeArrows.length, 3, 'Deve exibir os últimos 3 ciclos de setas');
  assert.strictEqual(dataRecente.cascadeSegments.length, 4, '3 ciclos passados + 1 futuro = 4 segmentos');

  // Verifica que o lapso atinge o teto de 85% (y ≈ 66.9) e nota normal atinge 100% (y = 20)
  const lapseArrow = dataRecente.cascadeArrows.find(a => a.isLapse);
  assert.ok(lapseArrow, 'Deve conter seta de lapso');
  assert.strictEqual(lapseArrow.targetPeakPct, 85);
  assert.strictEqual(lapseArrow.yTo, 66.9);
  assert.strictEqual(lapseArrow.marker, 'crimson');

  const successArrow = dataRecente.cascadeArrows.find(a => !a.isLapse);
  assert.ok(successArrow, 'Deve conter seta de sucesso');
  assert.strictEqual(successArrow.targetPeakPct, 100);
  assert.strictEqual(successArrow.yTo, 20);
  assert.strictEqual(successArrow.marker, 'cypress');

  // 3. Modo Todos os Ciclos
  const dataTodos = computeEbbinghausCurve([cardComHistorico], cardComHistorico, { cascadeMode: 'all' });
  assert.strictEqual(dataTodos.viewMode, 'all');
  assert.strictEqual(dataTodos.cascadeArrows.length, 4, 'Deve exibir todos os 4 ciclos de setas');
  assert.strictEqual(dataTodos.cascadeSegments.length, 5, '4 ciclos passados + 1 futuro = 5 segmentos');

  // 4. Renderização no DOM
  const container = { innerHTML: '' };
  renderEbbinghausCurve(container, [cardComHistorico], cardComHistorico, { locale: 'pt' });
  assert.ok(container.innerHTML.includes('eb-arrow-animated'), 'Deve conter setas animadas verticais');
  assert.ok(container.innerHTML.includes('marker-end="url(#eb-arrowhead-cypress)"'), 'Deve conter ponta de seta verde');
  assert.ok(container.innerHTML.includes('marker-end="url(#eb-arrowhead-crimson)"'), 'Deve conter ponta de seta vermelha (lapso)');
  assert.ok(container.innerHTML.includes('it-eb-mode-pill'), 'Deve conter botão de alternância entre 3 Recentes e Todos');
});

