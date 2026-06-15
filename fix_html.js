const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add charset to standard script tags
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, '<script src="$1" charset="UTF-8"></script>');

// Add charset to script tags with defer
html = html.replace(/<script src="(js\/[^"]+)" defer><\/script>/g, '<script src="$1" charset="UTF-8" defer></script>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html script tags');
