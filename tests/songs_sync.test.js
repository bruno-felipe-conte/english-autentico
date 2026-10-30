const { describe, it } = require('node:test');
const assert = require('node:assert');

// Mock Songs module minimal environment
global.window = global;
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.I18n = { t: (k) => k };

// Load songs.js in Node
require('../js/songs.js');

describe('🎵 Sincronização Acústica e Timestamps Palavra por Palavra em Músicas sem MP3', () => {
  it('1. Deve gerar timings acústicos proporcionais para cada palavra sem arquivo de áudio', () => {
    const rawVerses = [
      { text: "Imagine there's no heaven" },
      { text: "It's easy if you try" }
    ];

    const { clozeItems, wordBankWords } = Songs._processarVersosParaCloze(rawVerses, 'padrao');

    assert.strictEqual(clozeItems.length, 2, 'Deve ter 2 versos processados');
    assert.strictEqual(clozeItems[0].hasWordTimings, true, 'hasWordTimings deve ser true no verso 1');
    assert.strictEqual(clozeItems[1].hasWordTimings, true, 'hasWordTimings deve ser true no verso 2');

    // Verso 1
    const tokensV1 = clozeItems[0].tokens.filter(t => !t.isPunct);
    assert.ok(tokensV1.length >= 4, 'Verso 1 deve ter pelo menos 4 tokens de palavras');

    for (let i = 0; i < tokensV1.length; i++) {
      assert.ok(typeof tokensV1[i].time === 'number', `Palavra ${tokensV1[i].text} deve ter timestamp numérico`);
      assert.ok(tokensV1[i].duration > 0, `Palavra ${tokensV1[i].text} deve ter duração maior que zero`);
      if (i > 0) {
        assert.ok(tokensV1[i].time >= tokensV1[i - 1].time, `Timestamp de ${tokensV1[i].text} deve ser maior ou igual ao anterior`);
      }
    }

    // Continuidade entre versos
    assert.ok(clozeItems[1].startTime >= clozeItems[0].endTime, 'Verso 2 deve iniciar após o término do verso 1');
  });

  it('2. Deve pausar exatamente no timestamp da palavra oculta (blank.pauseTime)', () => {
    const rawVerses = [
      { text: "Yesterday all my troubles seemed so {{far}} away" }
    ];

    const { clozeItems, wordBankWords } = Songs._processarVersosParaCloze(rawVerses, 'padrao');
    const item = clozeItems[0];

    assert.ok(item.blank, 'Deve ter lacuna identificada');
    assert.strictEqual(item.blank.word.toLowerCase(), 'far', 'A palavra da lacuna deve ser "far"');
    
    // O pauseTime deve ser exatamente igual ao timestamp da palavra
    const blankToken = item.tokens.find(t => t.isBlank);
    assert.ok(blankToken, 'Deve existir token com isBlank: true');
    assert.strictEqual(item.blank.pauseTime, blankToken.time, 'pauseTime deve ser idêntico ao timing da palavra oculta');
    assert.ok(item.blank.pauseTime > item.startTime, 'pauseTime deve ser posterior ao início do verso');
  });

  it('3. Deve evitar stopwords em inglês na seleção automática de lacunas', () => {
    const rawVerses = [
      { text: "Living life in peace" }
    ];

    const { clozeItems } = Songs._processarVersosParaCloze(rawVerses, 'padrao');
    const blankWord = clozeItems[0].blank?.word?.toLowerCase();

    // "in" é stopword, deve escolher "living" ou "peace"
    assert.notStrictEqual(blankWord, 'in', 'Não deve escolher a stopword "in" como lacuna');
    assert.ok(blankWord === 'living' || blankWord === 'peace', 'Deve escolher palavra de conteúdo ("living" ou "peace")');
  });
});
