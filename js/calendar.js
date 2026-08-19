/* =====================================================================
   The Episcopate — Liturgical Calendar Engine
   Computes Orthodox Pascha, the movable feast cycle, fasting levels
   per the Typikon, and serves the daily commemorations.
   Both calendar systems: New (Revised Julian / Gregorian fixed feasts)
   and Old (Julian fixed feasts, +13 days in the 20th–21st centuries).
   Movable feasts are identical in both systems.
   ===================================================================== */

const Liturgical = (function () {

  const JULIAN_TO_GREGORIAN_OFFSET = 13; // 1900–2099

  // ---- Orthodox (Julian ecclesiastical) Pascha ---------------------
  // Returns the Julian-calendar date {m:3|4, d} of Pascha for `year`
  function julianPascha(year) {
    const a = year % 4, b = year % 7, c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const m = Math.floor((d + e + 114) / 31); // 3 = March, 4 = April
    const day = ((d + e + 114) % 31) + 1;
    return { m, d: day, greg: addJulianDays(year, m, day) };
  }

  // Julian calendar date -> Gregorian civil date (same-day instant)
  function addJulianDays(year, month, day) {
    const jul = Date.UTC(year, month - 1, day);
    const jd = jul / 86400000 + 2440587.5; // approximate
    // linear 13-day shift for our century (valid 1900–2099)
    const gregM = new Date(jul + JULIAN_TO_GREGORIAN_OFFSET * 86400000);
    return { y: gregM.getUTCFullYear(), m: gregM.getUTCMonth() + 1, d: gregM.getUTCDate() };
  }

  // ---- Movable feasts (offsets in days from Pascha, both systems) --
  // offset: + = after Pascha, - = before
  const MOVABLE = [
    { off: -70,  name_en: "Sunday of the Publican and Pharisee (Tone Sunday)",       name_ro: "Duminica Vameșului și a Fariseului", rank: "triodion" },
    { off: -56,  name_en: "Meat-fare Sunday (Last Judgment)",                        name_ro: "Duminica Înfricoșătoarei Judecăți (lăsatul secului de carne)", rank: "triodion" },
    { off: -49,  name_en: "Cheese-fare Sunday (Forgiveness Sunday)",                 name_ro: "Duminica Izgonirii lui Adam din Rai (lăsatul secului de brânză)", rank: "triodion" },
    { off: -42,  name_en: "Sunday of Orthodoxy",                                     name_ro: "Duminica Ortodoxiei", rank: "triodion" },
    { off: -7,   name_en: "Palm Sunday (Entry into Jerusalem)",                      name_ro: "Floriile (Intrarea Domnului în Ierusalim)", rank: "great", fish: true },
    { off: 0,    name_en: "PASCHA — The Resurrection of our Lord",                  name_ro: "PAȘTELE — Învierea Domnului", rank: "pascha" },
    { off: 7,    name_en: "Sunday of St Thomas (Antipascha)",                        name_ro: "Duminica Tomii", rank: "feast" },
    { off: 39,   name_en: "The Ascension of our Lord",                               name_ro: "Înălțarea Domnului", rank: "great" },
    { off: 49,   name_en: "PENTECOST — Descent of the Holy Spirit",                 name_ro: "RUSALIILE — Pogorârea Sfântului Duh", rank: "pascha" },
    { off: 56,   name_en: "Sunday of All Saints",                                    name_ro: "Duminica Tuturor Sfinților", rank: "feast" },
  ];

  // ---- Fixed great feasts & notable commemorations -----------------
  // Keyed by New-Calendar civil month/day (MM-DD). In Old-Calendar mode
  // every fixed feast shifts +13 days (e.g. Nativity Dec 25 -> Jan 7).
  const FIXED = [
    { d: "01-01", flags: "",  en: "Circumcision of our Lord; St Basil the Great",            ro: "Tăierea-împrejur cea după trup a Domnului; Sf. Vasile cel Mare", rank: "feast" },
    { d: "01-06", flags: "tr", en: "Theophany — Baptism of our Lord",                        ro: "Botezul Domnului (Boboteaza)", rank: "great", fish: true },
    { d: "01-07", flags: "",  en: "Synaxis of St John the Forerunner",                        ro: "Soborul Sf. Ioan Botezătorul", rank: "feast" },
    { d: "01-25", flags: "",  en: "St Gregory the Theologian",                                ro: "Sf. Grigorie Teologul", rank: "rank", nameday: ["Grigore", "Gregory", "Grigori"] },
    { d: "01-30", flags: "",  en: "The Three Hierarchs (Basil, Gregory, John Chrysostom)",    ro: "Sfinții Trei Ierarhi", rank: "polyeleos" },
    { d: "02-02", flags: "",  en: "The Meeting of our Lord in the Temple",                    ro: "Întâmpinarea Domnului", rank: "great" },
    { d: "02-10", flags: "",  en: "St Haralambos",                                            ro: "Sf. Haralambie", rank: "polyeleos", nameday: ["Haralambie"] },
    { d: "02-24", flags: "",  en: "First & Second Finding of the Head of St John the Baptist", ro: "Aflarea Capului Sf. Ioan Botezătorul", rank: "polyeleos" },
    { d: "03-09", flags: "",  en: "The Forty Martyrs of Sebaste",                             ro: "Sfinții 40 de Mucenici din Sevastia", rank: "polyeleos" },
    { d: "03-25", flags: "tr", en: "The Annunciation of the Theotokos",                       ro: "Buna Vestire", rank: "pascha", fish: true },
    { d: "04-23", flags: "",  en: "St George the Great Martyr",                               ro: "Sf. Mare Mucenic Gheorghe", rank: "polyeleos", nameday: ["Gheorghe", "George", "Georgeta"] },
    { d: "04-30", flags: "",  en: "St James, Apostle, Brother of the Lord",                   ro: "Sf. Apostol Iacob", rank: "feast" },
    { d: "05-08", flags: "",  en: "St John the Theologian, Apostle & Evangelist",             ro: "Sf. Apostol și Evanghelist Ioan", rank: "feast", nameday: ["Ioan", "Ion", "John", "Ionica"] },
    { d: "05-21", flags: "",  en: "Sts Constantine & Helen, Equal-to-the-Apostles",           ro: "Sfinții Împărați Constantin și Elena", rank: "polyeleos", nameday: ["Constantin", "Elena", "Costel"] },
    { d: "06-24", flags: "",  en: "Nativity of St John the Forerunner",                       ro: "Nașterea Sf. Ioan Botezătorul (Sânzienele)", rank: "great" },
    { d: "06-29", flags: "",  en: "Saints Peter & Paul, Chief Apostles",                      ro: "Sfinții Apostoli Petru și Pavel", rank: "great", feast_fast_end: true, nameday: ["Petru", "Petre", "Paul", "Petra"] },
    { d: "07-20", flags: "",  en: "St Elijah the Prophet (Sfântul Ilie)",                     ro: "Sf. Prooroc Ilie", rank: "polyeleos", nameday: ["Ilie", "Elijah"] },
    { d: "08-06", flags: "tr", en: "The Transfiguration of our Lord",                         ro: "Schimbarea la Față", rank: "great", fish: true },
    { d: "08-15", flags: "tr", en: "The Dormition of the Theotokos",                          ro: "Adormirea Maicii Domnului", rank: "pascha" },
    { d: "08-29", flags: "",  en: "Beheading of St John the Forerunner (strict fast)",        ro: "Tăierea Capului Sf. Ioan Botezătorul", rank: "great", strict: true },
    { d: "09-08", flags: "tr", en: "Nativity of the Theotokos",                               ro: "Nașterea Maicii Domnului", rank: "great", fish: true },
    { d: "09-14", flags: "",  en: "The Exaltation of the Holy Cross (fast)",                  ro: "Înălțarea Sfintei Cruci", rank: "pascha", strict: true },
    { d: "09-26", flags: "",  en: "St John the Theologian (repose)",                          ro: "Sf. Apostol Ioan (adormirea)", rank: "polyeleos" },
    { d: "10-14", flags: "",  en: "St Paraskeva (Friday) the New",                            ro: "Cuvioasa Parascheva", rank: "polyeleos", nameday: ["Paraschiva", "Paraskeva", "Vica"] },
    { d: "10-23", flags: "",  en: "St James the Lesser, Apostle & Brother of the Lord",       ro: "Sf. Apostol Iacob, fratele Domnului", rank: "feast" },
    { d: "11-08", flags: "",  en: "Synaxis of the Archangels Michael & Gabriel",              ro: "Soborul Sfinților Arhangheli Mihail și Gavriil", rank: "great", nameday: ["Mihai", "Mihail", "Michael", "Gabriel", "Gavril"] },
    { d: "11-21", flags: "tr", en: "The Entry of the Theotokos into the Temple",              ro: "Intrarea în Biserică a Maicii Domnului", rank: "great", fish: true },
    { d: "11-30", flags: "",  en: "St Andrew the First-Called, Apostle & Patron of Romania",  ro: "Sf. Apostol Andrei, Ocrotitorul României", rank: "great", nameday: ["Andrei", "Andrew"] },
    { d: "12-04", flags: "",  en: "St Barbara the Great Martyr",                               ro: "Sf. Mare Muceniță Varvara", rank: "polyeleos", nameday: ["Varvara", "Barbara"] },
    { d: "12-06", flags: "",  en: "St Nicholas the Wonderworker, Archbishop of Myra",         ro: "Sf. Ierarh Nicolae", rank: "great", nameday: ["Nicolae", "Nicholas", "Nicu"] },
    { d: "12-25", flags: "tr", en: "THE NATIVITY OF OUR LORD (Christmas)",                    ro: "NAȘTEREA DOMNULUI (Crăciunul)", rank: "pascha", fish: true },
    { d: "12-26", flags: "",  en: "Synaxis of the Theotokos",                                   ro: "Soborul Maicii Domnului", rank: "feast" },
    { d: "12-27", flags: "",  en: "St Stephen the First Martyr",                               ro: "Sf. Întâiul Mucenic Ștefan", rank: "feast" },
  ];

  // ---- Fasting season boundaries (ms timestamps, New-Calendar form) ---
  function fastSeasons(paschaY) {
    const P = julianPascha(paschaY).greg;
    const d = off => addDaysUTC(P, off).getTime();      // offset from Pascha (civil)
    const juneX = dd => mk(P.y, 6, dd), augX = dd => mk(P.y, 8, dd), novX = dd => mk(P.y, 11, dd), decX = dd => mk(P.y, 12, dd);
    return {
      greatLent:  { start: d(-48), end: d(-2) },                  // Clean Mon → Lazarus Sat
      holyWeek:   { start: d(-7),  end: d(-1) },                 // Palm Sun → Holy Saturday
      apostles:   { start: d(56) + 86400000, end: juneX(29) - 86400000 }, // Mon after All Saints → Jun 28
      dormition:  { start: augX(1),  end: augX(14) },
      nativity:   { start: novX(15), end: decX(24) },
    };
  }

  function addDaysUTC(iso, off) {
    return new Date(Date.UTC(iso.y, iso.m - 1, iso.d) + off * 86400000);
  }
  const mk = (y,m,d)=>Date.UTC(y,m-1,d);

  // Fast-free weeks (no fasting even Wed/Fri)
  function fastFreeWeeks(paschaY) {
    const p = julianPascha(paschaY);
    const P = p.greg;
    return [
      { name:"Bright Week",            start: mk(P.y,P.m,P.d),     end: mk(P.y,P.m,P.d)+6*86400000 },
      { name:"Week after Pentecost",   start: addDaysUTC(P,49+1).getTime(), end: addDaysUTC(P,49+7).getTime() },
      { name:"Christmastide",          start: mk(P.y,12,25),       end: mk(P.y,12,31)+4*86400000 }, // Dec 25–Jan 4 (next yr)
      { name:"Week of the Publican & Pharisee", start: addDaysUTC(P,-70).getTime(), end: addDaysUTC(P,-70+7).getTime() },
    ];
  }

  // ---- Fasting level for a civil date ------------------------------
  // levels: free | oil (wine+oil) | fish | strict
  function fasting(dateISO, mode) {
    const dt = new Date(dateISO);
    // Old Calendar: the Julian church's practice is a fixed feast that lives
    // +13 days (20th–21st c.) later than New Calendar. To answer "what does
    // the Old-Calendar church keep on civil date X", map X back 13 days into
    // our New-calendar-coordinate ruleset.
    const base = mode === "old" ? new Date(dt.getTime() - JULIAN_TO_GREGORIAN_OFFSET * 86400000) : dt;
    const y = base.getUTCFullYear(), m = base.getUTCMonth()+1, d = base.getUTCDate();
    const dow = base.getUTCDay(); // 0 Sun ... 6 Sat
    const ms = base.getTime();
    const paschaY = (m <= 7 && dt.getTime() < julianPascha(y).greg.time) ? y - 1 : y;
    const P = julianPascha(paschaY).greg;
    const Pms = P.Time || mk(P.y,P.m,P.d);

    // Fast-free weeks
    const ffw = fastFreeWeeks(paschaY);
    const inFF = ffw.some(w => ms >= w.start && ms <= w.end);
    if (inFF) return { level: "free", note_en: "Fast-free period", note_ro: "Săptămână fără post" };

    // Christmastide continues into January: Dec 25 → Jan 4
    if (m === 1 && d <= 4 && !inFF) {
      if (d === 1 || true) {
        const within = ms <= mk(y,1,4);
        if (within) return { level:"free", note_en:"Christmastide — no fasting", note_ro:"Sărbătorile Nașterii — fără post" };
      }
    }

    // Great feasts falling in fasts allow fish/wine-oil
    const feast = feastFor(dateISO, mode, Pms);
    if (feast && feast.fish) return { level:"fish", note_en:"Fish, wine & oil allowed", note_ro:"Se cuvine pește, vin și untdelemn" };
    if (feast && feast.strict) return { level:"strict", note_en:"Strict fast", note_ro:"Post aspru" };

    const fs = fastSeasons(paschaY);
    const inSeason = (s)=>{ const st=s?new Date(s.start):null, en=s?new Date(s.end):null; return s && (ms>=st.getTime() && ms<=en.getTime()); };
    const isSatSun = (dow===0||dow===6);
    const isWeekday = !isSatSun;

    // Holy Week: strict Mon–Sat (Sat = wine&oil)
    if (inSeason(fs.holyWeek)) return dow===6 ? { level:"oil", note_en:"Holy Saturday — wine & oil", note_ro:"Sâmbăta Mare — vin și untdelemn" } : { level:"strict", note_en:"Holy Week — strict fast", note_ro:"Săptămâna Patimilor — post aspru" };

    // Great Lent: weekdays strict, weekends wine&oil
    if (inSeason(fs.greatLent)) return isWeekday ? { level:"strict", note_en:"Great Lent — strict fast", note_ro:"Postul Mare — post aspru" } : { level:"oil", note_en:"Great Lent — wine & oil", note_ro:"Postul Mare — vin și untdelemn" };

    // Cheesefare week (before Lent): no meat, dairy allowed
    if (inSeason(fs.cheese)) { }
    // (approximate Cheesefare via movable offset)

    // Nativity Fast
    if (inSeason(fs.nativity)) {
      const late = ms > mk(P.y,12,19); // Dec 20–24 stricter
      if (isWeekday && late) return { level:"strict", note_en:"Nativity Fast — strict days", note_ro:"Postul Nașterii — zile aspre" };
      return isWeekday ? { level:"oil", note_en:"Nativity Fast — wine & oil", note_ro:"Postul Nașterii — vin și untdelemn" } : { level:"fish", note_en:"Nativity Fast — fish allowed", note_ro:"Postul Nașterii — cu dezas" };
    }
    // Apostles' Fast
    if (inSeason(fs.apostles)) return isWeekday ? { level:"oil", note_en:"Apostles' Fast — wine & oil", note_ro:"Postul Sfinților Apostoli — vin și untdelemn" } : { level:"fish", note_en:"Apostles' Fast — fish allowed", note_ro:"Postul Sfinților Apostoli — cu dezas" };
    // Dormition Fast
    if (inSeason(fs.dormition)) return isWeekday ? { level:"strict", note_en:"Dormition Fast — strict", note_ro:"Postul Adormirii — post aspru" } : { level:"oil", note_en:"Dormition Fast — wine & oil", note_ro:"Postul Adormirii — vin și untdelemn" };

    // Fixed strict-fast great feasts elsewhere (Exaltation, Beheading)
    if (feast && feast.strict) return { level:"strict", note_en:"Strict fast", note_ro:"Post aspru" };

    // Regular Wed/Fri
    if (isWeekday && (dow===3 || dow===5)) return { level:"oil", note_en:"Fast day — wine & oil", note_ro:"Zi de post — vin și untdelemn" };

    return { level:"free", note_en:"Fast-free day", note_ro:"Zi fără post" };
  }

  // ---- Feast(s) for a civil date -----------------------------------
  function feastFor(dateISO, mode, Pms) {
    const dt = new Date(dateISO);
    // Old Calendar: same −13 day back-mapping as fasting().
    const base = mode === "old" ? new Date(dt.getTime() - JULIAN_TO_GREGORIAN_OFFSET * 86400000) : dt;
    const y = base.getUTCFullYear(), mo = base.getUTCMonth()+1, d = base.getUTCDate();
    const key = pad(mo)+"-"+pad(d);
    const out = [];
    // fixed
    let fx = FIXED.find(f => f.d === key);
    // Pascha-based movable
    const P = julianPascha(y).greg;
    const Pms_ = P.Time || mk(P.y,P.m,P.d);
    const diff = Math.round((dt.getTime() - Pms_) / 86400000);
    const mv = MOVABLE.filter(f => f.off === diff).map(f => ({
      name_en:f.name_en, name_ro:f.name_ro, rank:f.rank, fish:!!f.fish, movable:true
    }));
    if (fx && (mode==="new" || true)) out.push({ ...fx, name_en:fx.en, name_ro:fx.ro, movable:false });
    out.push(...mv);
    if (!out.length) return null;
    const top = out.sort((a,b)=>rankWeight(b.rank)-rankWeight(a.rank))[0];
    top.secondary = out.filter(o=>o!==top).slice(0,2);
    return top;
  }

  function rankWeight(r){
    return {pascha:6, great:5, feast:4, polyeleos:3, rank:2, triodion:1}[r]||0;
  }
  const pad = n => (n<10?"0":"")+n;

  // Name-day lookup
  function nameday(name){
    const q = name.toLowerCase();
    const hits = FIXED.filter(f => (f.nameday||[]).some(n=>n.toLowerCase().includes(q) || q.includes(n.toLowerCase())));
    return hits.map(f=>({ date:f.d, name_en:f.en, name_ro:f.ro }));
  }

  // Month grid for civil month+year (New mode default; offset if Old)
  function monthGrid(y, mo, mode) {
    const off = mode==="old" ? 13 : 0;
    const first = new Date(Date.UTC(y, mo-1, 1));
    const startDow = first.getUTCDay();
    const daysInMonth = new Date(Date.UTC(y, mo, 0)).getUTCDate();
    const cells = [];
    for (let i=0;i<startDow;i++) cells.push(null);
    for (let d=1; d<=daysInMonth; d++) {
      const iso = mk(y,mo,d);
      const feast = feastFor(iso, mode);
      const f = fasting(iso, mode);
      cells.push({ iso, d, feast, level: f.level, today: iso===mk(new Date().getUTCFullYear(), new Date().getUTCMonth()+1, new Date().getUTCDate()) });
    }
    return { cells, month: mo, year: y, startDow };
  }

  return {
    julianPascha,
    fasting,
    feastFor,
    movableCycle: (year)=>{ const P=julianPascha(year).greg; return MOVABLE.map(f=>({...f, when: addDaysUTC(P,f.off)})); },
    nameday,
    monthGrid,
    pad
  };
})();