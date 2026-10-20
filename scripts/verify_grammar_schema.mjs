import fs from 'fs';

const data = JSON.parse(fs.readFileSync('data/grammar.json', 'utf8'));

const REQUIRED_LAYERS = [
  'id',
  'num',
  'titulo',
  'alerta',
  'cena',
  'fio',
  'definicao',
  'inventario',
  'tabela_visual',
  'observacao_cards',
  'tecnica',
  'teoria',
  'ponte',
  'exemplos_prc',
  'armadilhas',
  'coda',
  'exercicios'
];

console.log('=== VERIFICANDO ESQUEMA DAS LIÇÕES DE GRAMÁTICA ===\n');

let totalLessons = 0;
let layerStats = {};
REQUIRED_LAYERS.forEach(k => layerStats[k] = 0);

const issues = [];

for (const mod of data.moduli) {
  for (const lez of mod.lezioni) {
    totalLessons++;
    for (const key of REQUIRED_LAYERS) {
      const val = lez[key];
      const hasVal = val !== undefined && val !== null && (typeof val === 'string' ? val.trim().length > 0 : (Array.isArray(val) ? val.length > 0 : Object.keys(val).length > 0));
      if (hasVal) {
        layerStats[key]++;
      } else {
        issues.push({ mod: mod.id, id: lez.id, num: lez.num, missing: key });
      }
    }
  }
}

console.log(`Total de lições analisadas: ${totalLessons}`);
console.log('\nPresença de cada camada pedagógica:');
for (const [key, count] of Object.entries(layerStats)) {
  const pct = Math.round((count / totalLessons) * 100);
  const icon = pct === 100 ? '✅' : (pct === 0 ? '❌' : '⚠️');
  console.log(`  ${icon} ${key.padEnd(18)}: ${count}/${totalLessons} (${pct}%)`);
}

console.log(`\nTotal de lacunas a preencher: ${issues.length}`);
