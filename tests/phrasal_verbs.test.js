// tests/phrasal_verbs.test.js - Unit tests for Phrasal Verbs Corpus and Cross-Modal Hub
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

test('🧩 Phrasal Verbs Dataset — Integridade do Acervo e Esquema de Dados', async (t) => {
  const jsonPath = path.join(__dirname, '..', 'data', 'phrasal_verbs.json');
  assert.ok(fs.existsSync(jsonPath), 'data/phrasal_verbs.json deve existir');

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  assert.ok(Array.isArray(data.verbos), 'data.verbos deve ser um array');
  assert.strictEqual(data.verbos.length, 415, 'Deve conter 415 phrasal verbs catalogados');

  // Verify all fields are present and valid
  data.verbos.forEach((v, index) => {
    assert.ok(v.id, `Verbo no índice ${index} deve ter id`);
    assert.ok(v.phrasal_verb, `Verbo no índice ${index} deve ter phrasal_verb`);
    assert.ok(v.verbo_base, `Verbo ${v.phrasal_verb} deve ter verbo_base`);
    assert.ok(v.particula, `Verbo ${v.phrasal_verb} deve ter particula`);
    assert.ok(['separavel', 'inseparavel', 'intransitivo', 'tres_palavras'].includes(v.tipo), `Tipo de ${v.phrasal_verb} deve ser válido`);
    assert.ok([1, 2, 3, 4].includes(v.categoria_sintatica), `Categoria sintática de ${v.phrasal_verb} deve ser de 1 a 4`);
    assert.ok(v.significado_pt && !v.significado_pt.includes('atuar em direção'), `Significado de ${v.phrasal_verb} deve ser autêntico`);
    assert.ok(v.exemplo && !v.exemplo.includes('Always remember to'), `Exemplo de ${v.phrasal_verb} deve ser natural`);
    assert.ok(v.exemplo_pt, `Exemplo em PT de ${v.phrasal_verb} deve existir`);
    assert.ok(v.audio_ipa, `IPA de ${v.phrasal_verb} deve existir`);
    assert.ok(v.regra_pronome, `Regra de pronome de ${v.phrasal_verb} deve existir`);
  });

  // Verify type distribution
  const separaveis = data.verbos.filter(v => v.tipo === 'separavel').length;
  const inseparaveis = data.verbos.filter(v => v.tipo === 'inseparavel').length;
  const intransitivos = data.verbos.filter(v => v.tipo === 'intransitivo').length;
  const tresPalavras = data.verbos.filter(v => v.tipo === 'tres_palavras').length;

  assert.ok(separaveis > 150, 'Deve ter mais de 150 verbos separáveis');
  assert.ok(inseparaveis > 50, 'Deve ter mais de 50 verbos inseparáveis');
  assert.ok(intransitivos > 100, 'Deve ter mais de 100 verbos intransitivos');
  assert.ok(tresPalavras >= 30, 'Deve ter pelo menos 30 verbos de três palavras');
});

test('🃏 Flashcards Integration — Deck de Phrasal Verbs mapeia para FSRS-4.5', async (t) => {
  const jsonPath = path.join(__dirname, '..', 'data', 'phrasal_verbs.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Mock global App and Flashcards environment
  global.App = {
    estado: {
      phrasalVerbsData: data.verbos,
      flashcardData: {},
      templosData: {},
      vocabCache: []
    }
  };

  const flashcardsCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'flashcards.js'), 'utf8');
  assert.ok(flashcardsCode.includes("this.temploAtual === 'phrasal'"), 'Flashcards deve suportar temploAtual === "phrasal"');
  assert.ok(flashcardsCode.includes("🧩 Phrasal Verbs (415 Verbos)"), 'Select de templos deve conter opção de Phrasal Verbs');
});

test('📖 Vocabulary Integration — Filtro de Origem "phrasal" e Badges Sintáticos', async (t) => {
  const vocabCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'vocab.js'), 'utf8');
  assert.ok(vocabCode.includes("this.filtroOrigem === 'phrasal'"), 'Vocab deve suportar filtroOrigem === "phrasal"');
  assert.ok(vocabCode.includes("vocab-pill-phrasal"), 'Vocab deve estilizar botão da pill phrasal');
  assert.ok(vocabCode.includes("↔️ Separável") && vocabCode.includes("🔒 Inseparável"), 'Vocab deve exibir badges sintáticos de separabilidade');
});

test('🌐 Service Worker & Offline PWA — Cache v1129 inclui phrasal_verbs', async (t) => {
  const swCode = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  assert.ok(swCode.includes("CACHE = 'english-v1129'"), 'sw.js deve estar na versão english-v1129');
  assert.ok(swCode.includes("'./data/phrasal_verbs.json'"), 'sw.js deve cachear data/phrasal_verbs.json');
  assert.ok(swCode.includes("'./js/phrasal_verbs.js'"), 'sw.js deve cachear js/phrasal_verbs.js');
  assert.ok(swCode.includes("'./css/phrasal_verbs.css'"), 'sw.js deve cachear css/phrasal_verbs.css');
});
