const fs = require('fs');

const d = JSON.parse(fs.readFileSync('data/canzoni.json', 'utf8'));
const p1 = JSON.parse(fs.readFileSync('C:/Users/bruno/.gemini/antigravity/brain/2f0f85d2-af4d-481d-950f-5f147c36b94b/new_songs.json', 'utf8'));

d.canzoni.push(...p1);

fs.writeFileSync('data/canzoni.json', JSON.stringify(d, null, 2), 'utf8');
console.log('Songs merged successfully! Total songs:', d.canzoni.length);
