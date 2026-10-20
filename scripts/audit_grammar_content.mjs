import fs from 'fs';

const itData = JSON.parse(fs.readFileSync('../apprendimento-italiano/data/grammar.json', 'utf8'));
const enData = JSON.parse(fs.readFileSync('data/grammar.json', 'utf8'));

console.log('=== 1. MODULI & LEZIONI OVERVIEW ===');
console.log('ITALIAN:');
for (const m of itData.moduli) {
  const nLez = m.lezioni ? m.lezioni.length : 0;
  console.log(`  [${m.id}] ${m.nome}: ${nLez} lezioni`);
}

console.log('\nENGLISH:');
for (const m of enData.moduli) {
  const nLez = m.lezioni ? m.lezioni.length : 0;
  console.log(`  [${m.id}] ${m.nome}: ${nLez} lezioni`);
}

// Inspect Italian schema keys across all lessons
const itFields = new Set();
const itFieldCounts = {};
let itTotalLessons = 0;
for (const m of itData.moduli) {
  for (const l of m.lezioni || []) {
    itTotalLessons++;
    for (const k of Object.keys(l)) {
      itFields.add(k);
      itFieldCounts[k] = (itFieldCounts[k] || 0) + 1;
    }
  }
}

console.log(`\n=== 2. ITALIAN LESSON FIELDS (Total: ${itTotalLessons} lessons) ===`);
for (const [k, count] of Object.entries(itFieldCounts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${k}: ${count}/${itTotalLessons} (${Math.round(count/itTotalLessons*100)}%)`);
}

// Inspect English schema keys across all lessons
const enFields = new Set();
const enFieldCounts = {};
let enTotalLessons = 0;
for (const m of enData.moduli) {
  for (const l of m.lezioni || []) {
    enTotalLessons++;
    for (const k of Object.keys(l)) {
      enFields.add(k);
      enFieldCounts[k] = (enFieldCounts[k] || 0) + 1;
    }
  }
}

console.log(`\n=== 3. ENGLISH LESSON FIELDS (Total: ${enTotalLessons} lessons) ===`);
for (const [k, count] of Object.entries(enFieldCounts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${k}: ${count}/${enTotalLessons} (${Math.round(count/enTotalLessons*100)}%)`);
}

// Sample a rich Italian lesson vs sample an English lesson
console.log('\n=== 4. SAMPLE ITALIAN LESSON KEYS (a1-lez1) ===');
const itSample = itData.moduli[0].lezioni[0];
console.log('Keys in IT a1-lez1:', Object.keys(itSample));
console.log('Sample IT observacao_cards length:', itSample.observacao_cards?.length);
console.log('Sample IT observacao_cards[0]:', itSample.observacao_cards?.[0]);
console.log('Sample IT cena:', itSample.cena ? 'Present' : 'Absent');
console.log('Sample IT fio:', itSample.fio ? Object.keys(itSample.fio) : 'Absent');
console.log('Sample IT definicao:', itSample.definicao ? Object.keys(itSample.definicao) : 'Absent');
console.log('Sample IT inventario length:', itSample.inventario?.length);
console.log('Sample IT tecnica length:', itSample.tecnica ? itSample.tecnica.length : 0);
console.log('Sample IT teoria length:', itSample.teoria ? itSample.teoria.length : 0);
console.log('Sample IT ponte length:', itSample.ponte ? itSample.ponte.length : 0);
console.log('Sample IT exemplos_prc length:', itSample.exemplos_prc?.length);
console.log('Sample IT armadilhas length:', itSample.armadilhas?.length);
console.log('Sample IT coda length:', itSample.coda ? itSample.coda.length : 0);
console.log('Sample IT exercicios length:', itSample.exercicios?.length);

console.log('\n=== 5. SAMPLE ENGLISH LESSON KEYS (a1-lez1) ===');
const enSample = enData.moduli[0].lezioni[0];
console.log('Keys in EN a1-lez1:', Object.keys(enSample));
console.log('Sample EN observacao_cards length:', enSample.observacao_cards?.length);
console.log('Sample EN observacao_cards[0]:', enSample.observacao_cards?.[0]);
console.log('Sample EN cena:', enSample.cena ? 'Present' : 'Absent');
console.log('Sample EN fio:', enSample.fio ? Object.keys(enSample.fio) : 'Absent');
console.log('Sample EN definicao:', enSample.definicao ? Object.keys(enSample.definicao) : 'Absent');
console.log('Sample EN inventario length:', enSample.inventario?.length);
console.log('Sample EN tecnica length:', enSample.tecnica ? enSample.tecnica.length : 0);
console.log('Sample EN teoria length:', enSample.teoria ? enSample.teoria.length : 0);
console.log('Sample EN ponte length:', enSample.ponte ? enSample.ponte.length : 0);
console.log('Sample EN exemplos_prc length:', enSample.exemplos_prc?.length);
console.log('Sample EN armadilhas length:', enSample.armadilhas?.length);
console.log('Sample EN coda length:', enSample.coda ? enSample.coda.length : 0);
console.log('Sample EN exercicios length:', enSample.exercicios?.length);
