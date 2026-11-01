const test = require('node:test');
const assert = require('node:assert');
const ProductionValidator = require('../js/production.js');

test('⌨️ ProductionValidator (EN): Correspondência e tolerância a typos', async (t) => {
  await t.test('deve aceitar resposta perfeitamente idêntica', () => {
    const res = ProductionValidator.validate('beautiful', 'beautiful');
    assert.strictEqual(res.isCorrect, true);
    assert.strictEqual(res.isTypo, false);
    assert.strictEqual(res.diagnostic, null);
  });

  await t.test('deve ignorar diferenças de maiúsculas e pontuação terminal', () => {
    const res = ProductionValidator.validate('  Hello, World!  ', 'hello world');
    assert.strictEqual(res.isCorrect, true);
    assert.strictEqual(res.isTypo, false);
  });

  await t.test('deve tolerar typos leves de distância 1 em palavras longas', () => {
    const res = ProductionValidator.validate('beautifil', 'beautiful');
    assert.strictEqual(res.isCorrect, true);
    assert.strictEqual(res.isTypo, true);
    assert.ok(res.diagnostic.includes('Pequeno erro'));
  });

  await t.test('não deve tolerar typos em palavras curtas (distância 1 com <4 letras)', () => {
    const res = ProductionValidator.validate('cat', 'car');
    assert.strictEqual(res.isCorrect, false);
  });
});

test('🚨 ProductionValidator (EN): Diagnósticos morfológicos estritos', async (t) => {
  await t.test('deve rejeitar e diagnosticar contrações sem apóstrofo', () => {
    const res = ProductionValidator.validate("dont", "don't");
    assert.strictEqual(res.isCorrect, false);
    assert.ok(res.diagnostic.includes('apóstrofo'));

    const resCant = ProductionValidator.validate("cant", "can't");
    assert.strictEqual(resCant.isCorrect, false);
  });

  await t.test('deve rejeitar e diagnosticar confusão de artigos a vs an', () => {
    const resA = ProductionValidator.validate('a', 'an');
    assert.strictEqual(resA.isCorrect, false);
    assert.ok(resA.diagnostic.includes('vocálicos'));

    const resAn = ProductionValidator.validate('an', 'a');
    assert.strictEqual(resAn.isCorrect, false);
    assert.ok(resAn.diagnostic.includes('consonantais'));
  });

  await t.test('deve rejeitar confusão entre preposições críticas (in, on, at)', () => {
    const resInOn = ProductionValidator.validate('in', 'on');
    assert.strictEqual(resInOn.isCorrect, false);
    assert.ok(resInOn.diagnostic.includes('Preposição incorreta'));

    const resAtIn = ProductionValidator.validate('at', 'in');
    assert.strictEqual(resAtIn.isCorrect, false);
  });

  await t.test('deve rejeitar e diagnosticar plurais irregulares', () => {
    const res = ProductionValidator.validate('child', 'children');
    assert.strictEqual(res.isCorrect, false);
    assert.ok(res.diagnostic.includes('irregular'));
  });

  await t.test('deve lidar defensivamente com entradas vazias e nulas', () => {
    const resEmpty = ProductionValidator.validate('', 'apple');
    assert.strictEqual(resEmpty.isCorrect, false);
    assert.ok(resEmpty.diagnostic.includes('Digite'));

    const resNull = ProductionValidator.validate(null, 'apple');
    assert.strictEqual(resNull.isCorrect, false);
  });
});
