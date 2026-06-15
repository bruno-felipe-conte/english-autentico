const fs = require('fs');

function loadUnits(prefix, count) {
    let allUnits = [];
    for (let i = 1; i <= count; i++) {
        let path = `data/grammar_${prefix}_${i}.json`;
        let content = fs.readFileSync(path, 'utf8').trim();
        if (content.startsWith('```json')) content = content.substring(7);
        if (content.startsWith('```')) content = content.substring(3);
        if (content.endsWith('```')) content = content.substring(0, content.length - 3);
        let data = JSON.parse(content.trim());
        allUnits.push(...data);
    }
    
    allUnits.forEach((unit, idx) => {
        unit.id = `${prefix.replace('_', '')}-lez${idx + 1}`;
        unit.num = `Lesson ${idx + 1}`;
    });
    return allUnits;
}

const unitsA1 = loadUnits('a1', 6);
const unitsA2 = loadUnits('a2', 4);
const unitsB1 = loadUnits('b1', 3);
const unitsB2 = loadUnits('b2', 3);
const unitsC1 = loadUnits('c1', 2);

const masterJson = {
    versao: "4.0",
    moduli: [
        {
            id: "A1",
            nome: "A1 — Foundations",
            nivel_minimo: 1,
            cor: "linear-gradient(135deg, #27AE60, #145A32)",
            lezioni: unitsA1
        },
        {
            id: "A2",
            nome: "A2 — Expansion",
            nivel_minimo: 3,
            cor: "linear-gradient(135deg, #2980B9, #1A5276)",
            lezioni: unitsA2
        },
        {
            id: "B1",
            nome: "B1 — Intermediate",
            nivel_minimo: 6,
            cor: "linear-gradient(135deg, #F39C12, #D35400)",
            lezioni: unitsB1
        },
        {
            id: "B2",
            nome: "B2 — Upper Intermediate",
            nivel_minimo: 10,
            cor: "linear-gradient(135deg, #8E44AD, #4A235A)",
            lezioni: unitsB2
        },
        {
            id: "C1",
            nome: "C1/C2 — Advanced Mastery",
            nivel_minimo: 15,
            cor: "linear-gradient(135deg, #2C3E50, #17202A)",
            lezioni: unitsC1
        }
    ]
};

fs.writeFileSync('data/grammar.json', JSON.stringify(masterJson, null, 2), 'utf8');
console.log('Done!');
