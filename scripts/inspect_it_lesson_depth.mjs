import fs from 'fs';

const itData = JSON.parse(fs.readFileSync('../apprendimento-italiano/data/grammar.json', 'utf8'));

const lez = itData.moduli[0].lezioni[0]; // a1-lez1

console.log('=== TITULO & SUBTITULO ===');
console.log(lez.num, '—', lez.titulo, ':', lez.subtitulo);

console.log('\n=== CENA VIVA ===');
console.log('Origem:', lez.cena?.origem);
console.log('Titulo:', lez.cena?.titulo);
console.log('Texto:\n', lez.cena?.texto);

console.log('\n=== FIO CONDUTOR ===');
console.log('Abertura:', lez.fio?.abertura);
console.log('Descoberta:', lez.fio?.descoberta);
console.log('Fecho:', lez.fio?.fecho);

console.log('\n=== ALERTA ===');
console.log(lez.alerta);

console.log('\n=== DEFINICAO ===');
console.log('Fenômeno (Veja):', lez.definicao?.fenomeno);
console.log('Causa (Pense):', lez.definicao?.causa);
console.log('Conceito (Entenda):', lez.definicao?.conceito);

console.log('\n=== INVENTARIO ===');
console.log(lez.inventario);

console.log('\n=== TECNICA PASSO A PASSO ===');
console.log(lez.tecnica);

console.log('\n=== TEORIA COMPLETA (EXCERTO) ===');
console.log(lez.teoria?.slice(0, 500) + '...');

console.log('\n=== PONTE CONTRASTIVA PT ↔ IT ===');
console.log(lez.ponte);

console.log('\n=== EXEMPLOS P/R/C (PRIMEIRO) ===');
console.log(lez.exemplos_prc?.[0]);

console.log('\n=== ARMADILHAS (PRIMEIRA) ===');
console.log(lez.armadilhas?.[0]);

console.log('\n=== EXERCICIOS (TIPOS E QUANTIDADE) ===');
console.log('Total exercícios:', lez.exercicios?.length);
const tipos = lez.exercicios?.map(e => e.tipo);
console.log('Tipos:', [...new Set(tipos)]);
console.log('Contagem por tipo:', tipos.reduce((acc, t) => { acc[t] = (acc[t]||0)+1; return acc; }, {}));
