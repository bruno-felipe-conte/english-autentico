const test = require('node:test');
const assert = require('node:assert');
const TextNormalizer = require('../js/text_normalizer.js');

test('🔤 English Text Normalizer: Tokenização e descompactação de contrações', async (t) => {
  await t.test('deve descompactar contrações canônicas', () => {
    assert.deepStrictEqual(TextNormalizer.tokenize("I don't know"), ["i", "do", "not", "know"]);
    assert.deepStrictEqual(TextNormalizer.tokenize("She won't go"), ["she", "will", "not", "go"]);
    assert.deepStrictEqual(TextNormalizer.tokenize("They're here"), ["they", "are", "here"]);
    assert.deepStrictEqual(TextNormalizer.tokenize("I'm ready"), ["i", "am", "ready"]);
    assert.deepStrictEqual(TextNormalizer.tokenize("We've seen it"), ["we", "have", "seen", "it"]);
    assert.deepStrictEqual(TextNormalizer.tokenize("He'll arrive"), ["he", "will", "arrive"]);
  });

  await t.test('deve tratar possessivos com apóstrofo', () => {
    const tokens = TextNormalizer.tokenize("John's car is blue");
    assert.deepStrictEqual(tokens, ["john", "car", "is", "blue"]);
  });

  await t.test('deve ignorar pontuação e normalizar caixa', () => {
    const tokens = TextNormalizer.tokenize("Hello, World! How are you doing today???");
    assert.deepStrictEqual(tokens, ["hello", "world", "how", "are", "you", "doing", "today"]);
  });

  await t.test('deve retornar array vazio para texto vazio ou nulo', () => {
    assert.deepStrictEqual(TextNormalizer.tokenize(""), []);
    assert.deepStrictEqual(TextNormalizer.tokenize("   "), []);
    assert.deepStrictEqual(TextNormalizer.tokenize(null), []);
    assert.deepStrictEqual(TextNormalizer.tokenize(undefined), []);
  });
});

test('📚 English Text Normalizer: Lematização morfológica', async (t) => {
  await t.test('deve mapear formas verbais irregulares para seus lemas', () => {
    assert.strictEqual(TextNormalizer.lemmatize("went"), "go");
    assert.strictEqual(TextNormalizer.lemmatize("gone"), "go");
    assert.strictEqual(TextNormalizer.lemmatize("was"), "be");
    assert.strictEqual(TextNormalizer.lemmatize("were"), "be");
    assert.strictEqual(TextNormalizer.lemmatize("been"), "be");
    assert.strictEqual(TextNormalizer.lemmatize("had"), "have");
    assert.strictEqual(TextNormalizer.lemmatize("did"), "do");
    assert.strictEqual(TextNormalizer.lemmatize("saw"), "see");
    assert.strictEqual(TextNormalizer.lemmatize("wrote"), "write");
    assert.strictEqual(TextNormalizer.lemmatize("bought"), "buy");
  });

  await t.test('deve mapear plurais irregulares para a forma singular', () => {
    assert.strictEqual(TextNormalizer.lemmatize("children"), "child");
    assert.strictEqual(TextNormalizer.lemmatize("men"), "man");
    assert.strictEqual(TextNormalizer.lemmatize("women"), "woman");
    assert.strictEqual(TextNormalizer.lemmatize("people"), "person");
    assert.strictEqual(TextNormalizer.lemmatize("feet"), "foot");
    assert.strictEqual(TextNormalizer.lemmatize("teeth"), "tooth");
    assert.strictEqual(TextNormalizer.lemmatize("mice"), "mouse");
  });

  await t.test('deve lematizar advérbios em -ly para adjetivo base', () => {
    assert.strictEqual(TextNormalizer.lemmatize("quickly"), "quick");
    assert.strictEqual(TextNormalizer.lemmatize("easily"), "easy");
    assert.strictEqual(TextNormalizer.lemmatize("happily"), "happy");
  });

  await t.test('deve lematizar plurais regulares em -ies, -es, -s', () => {
    assert.strictEqual(TextNormalizer.lemmatize("cities"), "city");
    assert.strictEqual(TextNormalizer.lemmatize("boxes"), "box");
    assert.strictEqual(TextNormalizer.lemmatize("books"), "book");
  });

  await t.test('deve lematizar verbos regulares em -ing e -ed', () => {
    assert.strictEqual(TextNormalizer.lemmatize("walking"), "walk");
    assert.strictEqual(TextNormalizer.lemmatize("walked"), "walk");
    assert.strictEqual(TextNormalizer.lemmatize("running"), "run");
    assert.strictEqual(TextNormalizer.lemmatize("stopped"), "stop");
  });
});

test('📊 English Text Normalizer: Índice de legibilidade Flesch', async (t) => {
  await t.test('deve calcular índice Flesch para texto simples (alto score)', () => {
    const text = "The cat sat on the mat. It was a good cat. The sun was hot.";
    const res = TextNormalizer.calculateFleschIndex(text);
    assert.ok(res.score >= 80, `Score esperado >= 80, obtido: ${res.score}`);
    assert.ok(typeof res.gradeLevel === 'number');
    assert.ok(res.interpretacao.includes('Fácil'));
  });

  await t.test('deve retornar score padrão para texto vazio', () => {
    const res = TextNormalizer.calculateFleschIndex("");
    assert.strictEqual(res.score, 100);
  });
});
