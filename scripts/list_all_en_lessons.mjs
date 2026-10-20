import fs from 'fs';

const enData = JSON.parse(fs.readFileSync('data/grammar.json', 'utf8'));

console.log('=== SUMMARY OF ALL 90 ENGLISH LESSONS ===\n');

for (const mod of enData.moduli) {
  console.log(`\n========================================`);
  console.log(`MODULO [${mod.id}] ${mod.nome} (${mod.lezioni.length} lições)`);
  console.log(`========================================`);
  
  for (const lez of mod.lezioni) {
    const nCards = lez.observacao_cards?.length || 0;
    const nPRC = lez.exemplos_prc?.length || 0;
    const nArm = lez.armadilhas?.length || 0;
    const nEx = lez.exercicios?.length || 0;
    const hasTeoria = !!(lez.teoria && lez.teoria.trim());
    const hasDefinicao = !!lez.definicao;
    const hasPonte = !!lez.ponte;
    const hasCena = !!lez.cena;
    const hasTecnica = !!lez.tecnica;

    console.log(`- ${lez.num || lez.id}: "${lez.titulo}" (${lez.subtitulo || 'Sem subtítulo'})`);
    console.log(`    Cards: ${nCards} | PRC: ${nPRC} | Armadilhas: ${nArm} | Ex: ${nEx} | Teoria: ${hasTeoria} | Def: ${hasDefinicao} | Ponte: ${hasPonte} | Cena: ${hasCena}`);
  }
}
