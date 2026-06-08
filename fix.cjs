const fs = require('fs')
let content = fs.readFileSync('src/pages/DetailPage.jsx', 'utf8')
const bad = 'return (`n    <a`n      href={link}'
const good = 'return (\n    <a\n      href={link}'
content = content.replace(bad, good)
fs.writeFileSync('src/pages/DetailPage.jsx', content)
console.log('Done:', content.includes('<a') ? 'tag found' : 'tag missing')