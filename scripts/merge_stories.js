const fs = require('fs');

const d = JSON.parse(fs.readFileSync('data/storie.json', 'utf8'));
const p1 = JSON.parse(fs.readFileSync('C:/Users/bruno/.gemini/antigravity/brain/2f0f85d2-af4d-481d-950f-5f147c36b94b/stor_part1.json', 'utf8'));
const p2 = JSON.parse(fs.readFileSync('C:/Users/bruno/.gemini/antigravity/brain/2f0f85d2-af4d-481d-950f-5f147c36b94b/stor_part2.json', 'utf8'));
const p3 = JSON.parse(fs.readFileSync('C:/Users/bruno/.gemini/antigravity/brain/2f0f85d2-af4d-481d-950f-5f147c36b94b/stor_part3.json', 'utf8'));
const p4 = JSON.parse(fs.readFileSync('C:/Users/bruno/.gemini/antigravity/brain/2f0f85d2-af4d-481d-950f-5f147c36b94b/stor_part4.json', 'utf8'));

d.storie.push(...p1, ...p2, ...p3, ...p4);

fs.writeFileSync('data/storie.json', JSON.stringify(d, null, 2), 'utf8');
console.log('Stories merged successfully! Total stories:', d.storie.length);
