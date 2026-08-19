const fs = require('fs');
const ro = require('./parsed-ro.json');
const en = require('./parsed-en.json');

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

let out = '';
out += 'const DAY_SAINTS = {\n';
const dayKeys = Object.keys(ro.days).sort();
for (const k of dayKeys) {
  out += `  "${k}": { ro: '${esc(ro.days[k])}', en: '${esc(en.days[k] || '')}' },\n`;
}
out += '};\n\n';

out += 'const SUNDAY_READINGS = {\n';
const sunKeys = Object.keys(ro.sundays).sort();
for (const k of sunKeys) {
  out += `  "${k}": { ro: '${esc(ro.sundays[k])}', en: '${esc(en.sundays[k] || '')}' },\n`;
}
out += '};\n';

fs.writeFileSync('day-saints-generated.js', out);
console.log('wrote day-saints-generated.js,', dayKeys.length, 'days,', sunKeys.length, 'sundays');
console.log('file size:', fs.statSync('day-saints-generated.js').size, 'bytes');
