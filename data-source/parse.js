const fs = require('fs');

const MONTHS_RO = ['IANUARIE','FEBRUARIE','MARTIE','APRILIE','MAI','IUNIE','IULIE','AUGUST','SEPTEMBRIE','OCTOMBRIE','NOIEMBRIE','DECEMBRIE'];
const MONTHS_EN = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

function parse(file, monthNames) {
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split('\n');
  const days = {}; // "MM-DD" -> text
  const sundays = {}; // "MM-DD" -> reading text, keyed by the Sunday it precedes
  let curKey = null;
  let curBuf = [];
  let pendingParaBuf = [];
  let inParaMode = false;

  function flushDay() {
    if (curKey && curBuf.length) {
      days[curKey] = (days[curKey] ? days[curKey] + ' ' : '') + curBuf.join(' ').replace(/\s+/g, ' ').trim();
    }
    curBuf = [];
  }

  let monthNum = 0;
  for (let raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const mi = monthNames.indexOf(line);
    if (mi !== -1) {
      flushDay();
      monthNum = mi + 1;
      curKey = null; inParaMode = false;
      continue;
    }
    if (monthNum === 0) continue;
    if (/^(Church Regulations|R\S+duieli)/i.test(line)) break;

    const m = line.match(/^(\d{1,2})\s+[A-Za-z]{1,2}\s+(.*)$/);
    if (m && Number(m[1]) >= 1 && Number(m[1]) <= 31) {
      flushDay();
      const dd = String(Number(m[1])).padStart(2, '0');
      const mm = String(monthNum).padStart(2, '0');
      curKey = mm + '-' + dd;
      curBuf = [m[2]];
      if (pendingParaBuf.length) {
        sundays[curKey] = pendingParaBuf.join(' ').replace(/\s+/g, ' ').trim();
        pendingParaBuf = [];
      }
      inParaMode = false;
      continue;
    }
    const looksLikeSundayHeading = /^(Duminica|Sunday|\d+(st|nd|rd|th)\s+Sunday)/.test(line);
    if (looksLikeSundayHeading && !inParaMode) {
      flushDay();
      inParaMode = true;
      pendingParaBuf = [line];
      continue;
    }
    if (inParaMode) {
      pendingParaBuf.push(line);
    } else if (curKey) {
      curBuf.push(line);
    }
  }
  flushDay();

  return { days, sundays };
}

const ro = parse('calendar-2026-ro-pass1.txt', MONTHS_RO);
const en = parse('calendar-2026-en-pass1.txt', MONTHS_EN);

console.log('RO days:', Object.keys(ro.days).length, 'RO sundays:', Object.keys(ro.sundays).length);
console.log('EN days:', Object.keys(en.days).length, 'EN sundays:', Object.keys(en.sundays).length);

fs.writeFileSync('parsed-ro.json', JSON.stringify(ro, null, 2));
fs.writeFileSync('parsed-en.json', JSON.stringify(en, null, 2));
