const test = require('node:test');
const assert = require('node:assert');
const FrequencyClient = require('../js/frequency.js');

test('📈 FrequencyClient: Operações fundamentais e lookup O(1)', async (t) => {
  await t.test('deve inicializar com o arquivo data/frequency_3000.json', async () => {
    const ok = await FrequencyClient.init();
    assert.strictEqual(ok, true);
    assert.strictEqual(FrequencyClient.isLoaded(), true);
    assert.strictEqual(FrequencyClient.getTotalCount(), 3000);
  });

  await t.test('deve encontrar lemas fundamentais na Banda 1', () => {
    const infoThe = FrequencyClient.lookup('the');
    assert.ok(infoThe);
    assert.strictEqual(infoThe.rank, 1);
    assert.strictEqual(infoThe.banda, 1);
    assert.strictEqual(FrequencyClient.isInBand('the', 1), true);

    const infoYou = FrequencyClient.lookup('you');
    assert.ok(infoYou);
    assert.strictEqual(infoYou.banda, 1);
  });

  await t.test('deve encontrar palavras em outras bandas ou retornar null se fora', () => {
    assert.strictEqual(FrequencyClient.lookup('xyznonexistentword'), null);
    assert.strictEqual(FrequencyClient.lookup(''), null);
    assert.strictEqual(FrequencyClient.lookup(null), null);
  });

  await t.test('deve fornecer metadados corretos das bandas', () => {
    const b1 = FrequencyClient.getBandInfo(1);
    assert.strictEqual(b1.dimensione, 1000);
    assert.deepStrictEqual(b1.range, [1, 1000]);

    const b2 = FrequencyClient.getBandInfo(2);
    assert.strictEqual(b2.dimensione, 1000);
    assert.deepStrictEqual(b2.range, [1001, 2000]);

    const b3 = FrequencyClient.getBandInfo(3);
    assert.strictEqual(b3.dimensione, 1000);
    assert.deepStrictEqual(b3.range, [2001, 3000]);
  });

  await t.test('deve amostrar deterministamente de uma banda', () => {
    let seed = 42;
    const rng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const amostra = FrequencyClient.sampleBand(1, 12, rng);
    assert.strictEqual(amostra.length, 12);
    amostra.forEach(item => {
      assert.strictEqual(item.banda, 1);
      assert.ok(item.rank >= 1 && item.rank <= 1000);
    });

    // Amostragem com contagem zero ou negativa retorna array vazio
    assert.deepStrictEqual(FrequencyClient.sampleBand(1, 0), []);
    assert.deepStrictEqual(FrequencyClient.sampleBand(1, -5), []);
  });
});
