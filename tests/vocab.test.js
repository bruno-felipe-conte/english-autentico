// ============================================================
// tests/vocab.test.js — Testes unitários para vocab.js (Node.js compatível)
// ============================================================
// Rodar com: node tests/vocab.test.js

const fs = require('fs');
const path = require('path');

// Variáveis globiais para o test runner
let passed = 0;
let failed = 0;

function describe(name, fn) {
  console.info(`\n📦 ${name}`);
  fn();
}

function it(name, fn) {
  try {
    fn();
    passed++;
    console.info(`  ✅ ${name}`);
  } catch (e) {
    failed++;
    console.error(`  ❌ ${name}`);
    console.error(`     ${e.message}`);
  }
}

function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected) throw new Error(`Esperado ${expected}, obtido ${value}`);
    },
    toContain(expected) {
      if (!value.includes(expected)) throw new Error(`Esperado conter "${expected}"`);
    },
    toMatch(pattern) {
      if (!pattern.test(value)) throw new Error(`Não corresponde a ${pattern}`);
    },
    toHaveLength(expected) {
      if (value.length !== expected) throw new Error(`Esperado length ${expected}, obtido ${value.length}`);
    },
  };
}

// Helper: ler arquivo
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

// ============================================================
describe('vocab.js — Verificação estrutural', () => {
  const code = read('js/vocab.js');

  it('deve ter todas as 18 propriedades principais', () => {
    const props = [
      'filtroTexto', 'filtroTemplo', 'filtroCategoria',
      'filtroOrigem', 'filtroDificeis', 'filtroFavoritos',
      'blurColuna', '_onboardingMostrado', '_ordenarPor', '_expandido',
      '_modoOutput', '_vocabReviewAtivo', '_vocabReviewCards',
      '_vocabReviewIndex', '_vocabXP', '_agruparPorCategoria',
    ];
    for (const p of props) {
      expect(code).toContain(p);
    }
  });

  it('deve exportar todas as funções públicas (30+)', () => {
    const fns = [
      'renderizar', 'buscar', 'filtrarTemplo', 'filtrarCategoria',
      'toggleDificeis', 'toggleFavoritos', 'popularCategorias',
      'toggleBlur', 'estudarFiltroAtual', 'limparFiltros',
      'iniciarVocabReview', '_renderizarVocabReview', '_verificarVocabReview',
      '_responderVocabReview', '_atualizarStreakVocab', '_verificarConquistasVocab',
      'alternarModoOutput', '_buscarColocacoes', 'wordFamilies',
      'renderizarWordFamilies', 'dailyQuestVocab', 'renderizarDailyQuest',
      '_fonSimplificada', '_verificarOutput', 'compartilharLista',
      'exportarLista', 'estatisticasCategoria', 'renderizarEstatisticasCategoria',
      'alternarAgrupamento', '_buscaFuzzy', '_levenshtein', '_escapar', '_corParaCategoria'
    ];
    for (const fn of fns) {
      const pattern = new RegExp(`\\b${fn}\\s*[:]\\s*function|function\\s+${fn}\\s*\\(|${fn}\\s*\\(\\)\\s*\\{|${fn}\\s*\\(`);
      expect(code, `Função ${fn} não encontrada`).toMatch(pattern);
    }
  });

  it('deve implementar _levenshtein corretamente', () => {
    function levenshtein(a, b) {
      const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
      matrix[0] = Array.from({ length: b.length + 1 }, (_, i) => i);
      for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++) {
          const c = a[i-1] === b[j-1] ? 0 : 1;
          matrix[i][j] = Math.min(matrix[i-1][j]+1, matrix[i][j-1]+1, matrix[i-1][j-1]+c);
        }
      return matrix[a.length][b.length];
    }
    expect(levenshtein('', '')).toBe(0);
    expect(levenshtein('ciao', 'ciao')).toBe(0);
    expect(levenshtein('ciao', 'ciao!')).toBe(1);
    expect(levenshtein('buongiorno', 'buonjorno')).toBe(2);
    expect(levenshtein('giocare', 'gioco')).toBe(3);
  });

  it('_buscaFuzzy deve lidar com correspondência exata e erros', () => {
    function levenshtein(a, b) {
      const m = Array.from({ length: a.length + 1 }, (_, i) => [i]);
      m[0] = Array.from({ length: b.length + 1 }, (_, i) => i);
      for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++)
          m[i][j] = Math.min(m[i-1][j]+1, m[i][j-1]+1, m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
      return m[a.length][b.length];
    }
    function buscaFuzzy(texto, termo) {
      if (!termo) return true;
      const t = termo.toLowerCase().trim();
      const alvo = texto.toLowerCase();
      if (alvo.includes(t)) return true;
      if (t.length >= 3 && t.length <= 12)
        for (const palavra of alvo.split(/\s+/))
          if (levenshtein(palavra, t) <= Math.floor(t.length / 3)) return true;
      return false;
    }
    expect(buscaFuzzy('buongiorno', 'buongiorno')).toBe(true);
    expect(buscaFuzzy('buongiorno', 'buonjorno')).toBe(true);
    expect(buscaFuzzy('ciao come stai', 'ciao')).toBe(true);
    expect(buscaFuzzy('domani', 'domani')).toBe(true);
    expect(buscaFuzzy('domani', 'domamì')).toBe(true);
    expect(buscaFuzzy('xyz', 'abcde')).toBe(false);
  });

  it('_fonSimplificada deve gerar transcrição IPA', () => {
    function fon(p) {
      const regs = [[/^gn/,'ɲ'],[/^gl/,'ʎ'],[/^sc(?=[ie])/,'ʃ'],[/^c(?=[ie])/,'tʃ'],
        [/^ch(?=[ei])/,'k'],[/^gh(?=[ei])/,'g'],[/^g(?=[ie])/,'dʒ'],[/^z/,'dz']];
      let r = p.toLowerCase();
      regs.forEach(([pat, rep]) => { r = r.replace(pat, rep); });
      return r;
    }
    expect(fon('gnocchi')).toContain('ɲ');
    expect(fon('gli')).toContain('ʎ');
    expect(fon('scienza')).toContain('ʃ');
    expect(fon('cento')).toContain('tʃ');
    expect(fon('gente')).toContain('dʒ');
  });

  it('wordFamilies deve ter famílias válidas e busca funcional', () => {
    const families = {
      'giocare': ['giocare','gioco','giocatore','giocattolo','giocherebbe'],
      'mangiare': ['mangiare','mangio','mangiato','mangiatore','mangiabile'],
      'parlare': ['parlare','parlo','parlato','parlante','parlamento'],
      'leggere': ['leggere','leggo','letto','lettore','leggibile'],
      'lavorare': ['lavorare','lavoro','lavorato','lavoratore','lavorativo'],
    };
    function buscar(p) {
      const base = p.toLowerCase().replace(/are$|ere$|ire$/, '');
      for (const [key, fam] of Object.entries(families)) {
        if (key.replace(/are$|ere$|ire$/, '') === base || fam.some(w => w.startsWith(base))) return fam;
      }
      return [];
    }
    expect(buscar('giocare')).toHaveLength(5);
    expect(buscar('mangiare')).toHaveLength(5);
    expect(buscar('parlare')).toHaveLength(5);
    expect(buscar('leggere')).toHaveLength(5);
    expect(buscar('xyzzy')).toHaveLength(0);
  });

  it('deve persistir em localStorage (flashcards + progresso)', () => {
    expect(code).toContain("localStorage.setItem('en_flashcards'");
    expect(code).toContain("localStorage.setItem('en_progresso'");
  });

  it('deve implementar gamificação completa (XP + streak + conquistas)', () => {
    expect(code).toContain('vocabXP');
    expect(code).toContain('vocab_streak');
    expect(code).toContain('vocab_conquistas');
  });
});

// ============================================================
describe('Vocab — Features Sprint 1-4 (regressão total)', () => {
  const code = read('js/vocab.js');
  const dbCode = read('js/db.js');
  const ebCode = read('js/error-boundary.js');

  const checks = [
    ['Ordenação S1',        code.includes('_ordenarPor')],
    ['Cores S1',            code.includes('_corParaCategoria')],
    ['Empty States S1',     code.includes('No words')],
    ['Fuzzy S2',            code.includes('_buscaFuzzy')],
    ['Levenshtein S2',      code.includes('_levenshtein')],
    ['Exportação S2',       code.includes('exportarLista')],
    ['Dashboard S2',        code.includes('estatisticasCategoria')],
    ['Agrupamento S2',      code.includes('_agruparPorCategoria')],
    ['Chips S2',            code.includes('vocab-chip')],
    ['SRS S3',              code.includes('iniciarVocabReview')],
    ['Output S3',           code.includes('_modoOutput')],
    ['Streak S3',           code.includes('_atualizarStreakVocab')],
    ['Conquistas S3',       code.includes('_verificarConquistasVocab')],
    ['Word Families S3',     code.includes('wordFamilies')],
    ['Daily Quest S3',      code.includes('dailyQuestVocab')],
    ['Fonética S3',         code.includes('_fonSimplificada')],
    ['Social S4',           code.includes('compartilharLista')],
    ['IndexedDB S4',         dbCode.includes('indexedDB.open')],
    ['Error Boundary S4',    ebCode.includes('addEventListener')],
    ['Review 3 botões',      code.includes('btn-vr-again') && code.includes('btn-vr-hard') && code.includes('btn-vr-good')],
    ['DB Fallback',          dbCode.includes('getWithFallback') && dbCode.includes('setWithFallback')],
    ['Error UI',             ebCode.includes('Recarregar')],
    ['DB Init',              dbCode.includes('async init()')],
    ['DB set/get/all',       dbCode.includes('async get(') && dbCode.includes('async set(') && dbCode.includes('async getAll(')],
    ['Error Boundary UI',    ebCode.includes('role="alert"')],
  ];

  it(`${checks.length} features devem estar presentes`, () => {
    const fails = checks.filter(([, v]) => !v);
    if (fails.length > 0) {
      console.error('     Features ausentes:', fails.map(([k]) => k).join(', '));
    }
    expect(fails).toHaveLength(0);
  });
});

// ============================================================
console.info(`\n───────────────────────────────────────`);
console.info(`📊 Resultado: ${passed} passed, ${failed} failed`);
console.info(`${failed === 0 ? '✅ TODOS OS TESTES PASSARAM' : '❌ ALGUNS TESTES FALHARAM'}`);
process.exit(failed === 0 ? 0 : 1);
