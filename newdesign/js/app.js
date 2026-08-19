// ROEA — new design preview. Hand-rolled router (no framework, no build step),
// ported from the Claude Design canvas "ROEA App.dc.html" — its `{{ }}` bindings,
// `sc-for`/`sc-if` and onClick="{{ }}" template syntax are replaced with plain
// DOM rendering + addEventListener, matching how ../../js/app.js is built.
"use strict";

const state = {
  lang: localStorage.getItem("roea.newdesign.lang") || "ro",
  screen: "today",   // today | calendar | news | homily | solia | youth | parishes
  sel: 13,            // selected calendar day
  month: 7,           // 0-indexed; 7 = August (the month the design content covers)
  newsFilter: "all"   // all | pastoral | synodal
};

function T(ro, en) { return state.lang === "ro" ? ro : en; }
function pick(v) { return typeof v === "object" && v !== null && ("ro" in v || "en" in v) ? T(v.ro, v.en) : v; }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

function isFast(d) {
  if (d <= 14) return true;
  const dow = new Date(2026, 7, d).getDay();
  return dow === 3 || dow === 5;
}

function dayInfo(d) {
  const rec = DAYS[d];
  if (rec) return rec[state.lang];
  return state.lang === "ro"
    ? { s:"Pomenirea sfinților zilei", f:"", fast: isFast(d) ? "Zi de post" : "Fără post", ap:"—", ev:"—", trop:"Sinaxarul zilei se află în Mineiul lunii august." }
    : { s:"Memory of the saints of the day", f:"", fast: isFast(d) ? "Fast day" : "No fast", ap:"—", ev:"—", trop:"The synaxarion for this day is found in the August Menaion." };
}

// ---------- icons (inline SVG strokes; no emojis — matches ../../AGENTS.md rule) ----------
const ICONS = {
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1"></rect><path d="M3.5 9.6h17M8 3.2v3.4M16 3.2v3.4"></path>',
  news: '<path d="M4 5h16v11H9l-5 4V5z"></path>',
  today: '<circle cx="12" cy="12" r="7"></circle><circle cx="12" cy="12" r="2"></circle>',
  youth: '<path d="M12 3l2.1 5.6L20 11l-6 2.4L12 19l-2-5.6L4 11l6-2.4z"></path>',
  parishes: '<path d="M12 3l8 5v13h-5v-7H9v7H4V8z"></path>',
  search: '<circle cx="11" cy="11" r="7"></circle><path d="M16.5 16.5L21 21"></path>',
  play: '<path d="M8 5l11 7-11 7z" fill="#A41313"></path>',
  gear: '<circle cx="12" cy="12" r="3.2"></circle><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"></path>'
};
function ic(name, opts) {
  opts = opts || {};
  const stroke = opts.stroke || "rgba(0,0,0,.42)";
  const sw = opts.sw || "1.4";
  const fill = opts.fill || "none";
  const size = opts.size || 20;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="${sw}">${ICONS[name]}</svg>`;
}

const NAV_TABS = [
  { id: "calendar", icon: "calendar", label: { ro:"CALENDAR", en:"CALENDAR" } },
  { id: "news", icon: "news", label: { ro:"ȘTIRI", en:"NEWS" } },
  { id: "today", icon: "today", label: { ro:"ASTĂZI", en:"TODAY" } },
  { id: "youth", icon: "youth", label: { ro:"TINERET", en:"YOUTH" } },
  { id: "parishes", icon: "parishes", label: { ro:"PAROHII", en:"PARISHES" } }
];
// Screens reachable only by tapping into content (not top-level tabs), but that
// should still highlight their parent tab in the bottom nav.
const NAV_PARENT = { homily: "news", solia: "news" };

function navBar() {
  const active = NAV_PARENT[state.screen] || state.screen;
  return `<nav id="tabbar">${NAV_TABS.map(t => {
    const on = t.id === active;
    return `<button class="tab${on ? " active" : ""}" data-nav="${t.id}">
      ${ic(t.icon, on ? { stroke:"#65834D", sw:"1.6" } : {})}
      <span${on ? ' class="on"' : ""}>${esc(pick(t.label))}</span>
    </button>`;
  }).join("")}</nav>`;
}

function topbar(titleHtml, opts) {
  opts = opts || {};
  const back = opts.back
    ? `<button class="back" data-back="1">‹ <span>${esc(pick(opts.back))}</span></button>`
    : `<div class="brand"><img src="/assets/emblem.png" alt="ROEA"><div class="brand-title">${titleHtml}</div></div>`;
  return `<header id="topbar">
    ${back}
    <button class="lang-btn" data-toggle-lang="1">${state.lang === "ro" ? "EN" : "RO"}</button>
  </header>`;
}

// ---------- screens ----------

function screenToday() {
  const info = dayInfo(state.sel);
  return `
  ${topbar('ROEA<span class="brand-sub">' + T("Aplicația Oficială","The Official App") + '</span>')}
  <main id="view">
    <section class="block">
      <div class="eyebrow green">${T("JOI · 13 AUGUST 2026","THURSDAY · 13 AUGUST 2026")}</div>
      <h1 class="display">${T("Bună dimineața","Good morning")}</h1>
      <p class="italic muted">${T("Ziua a treia a Postului Adormirii","The third day of the Dormition Fast")}</p>
    </section>
    <hr>
    <section class="block row">
      <img class="thumb-tall" src="${TODAY_SAINT_IMG}" alt="">
      <div class="col">
        <div class="eyebrow green">${T("SFÂNTUL ZILEI","SAINT OF THE DAY")}</div>
        <h2 class="h-serif">${esc(info.s)}</h2>
        <p class="muted italic small">${esc(info.trop)}</p>
        <div class="link-cta">${T("CITEȘTE SINAXARUL","READ THE SYNAXARION")} →</div>
      </div>
    </section>
    <hr class="faint">
    <section class="block split">
      <div>
        <div class="eyebrow blue">${T("POSTUL DE AZI","FAST TODAY")}</div>
        <div class="h-serif small-h">${T("Postul Adormirii Maicii Domnului","The Dormition Fast")}</div>
        <div class="italic green-txt">${T("Dezlegare la untdelemn și vin","Wine and oil allowed")}</div>
      </div>
      <div class="right">
        <div class="eyebrow faint-lbl">${T("PÂNĂ LA HRAM","TO THE FEAST")}</div>
        <div class="countdown">2</div>
        <div class="eyebrow faint-lbl">${T("ZILE","DAYS")}</div>
      </div>
    </section>
    <hr>
    <section class="block">
      <div class="eyebrow green">${T("VIAȚA ORTODOXĂ DE AZI","TODAY'S ORTHODOX LIFE")}</div>
      <div class="kv"><span class="italic muted">${T("Apostol","Epistle")}</span><span class="v">1 Cor. 14, 6–19</span></div>
      <div class="kv"><span class="italic muted">${T("Evanghelie","Gospel")}</span><span class="v">Matei 20, 17–28</span></div>
      <div class="kv"><span class="italic muted">${T("Ziua de nume","Name-day")}</span><span class="v">Maxim</span></div>
    </section>
    <hr class="faint">
    <section class="block row">
      <img class="thumb-mid" src="${TODAY_PRAYER_IMG}" alt="">
      <div class="col">
        <div class="eyebrow blue">${T("RUGĂCIUNEA ZILEI","PRAYER OF THE DAY")}</div>
        <div class="h-serif small-h">${T("Tatăl nostru","Our Father")}</div>
        <p class="muted small">${T("Tatăl nostru, Care ești în ceruri, sfințească-se numele Tău, vie împărăția Ta…","Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come…")}</p>
        <div class="link-cta">${T("CARTEA DE RUGĂCIUNI","PRAYER BOOK")} →</div>
      </div>
    </section>
    <hr>
    <section class="block" style="padding-bottom:30px">
      <div class="eyebrow green">${T("CUVÂNTUL IERARHULUI","FROM HIS GRACE")}</div>
      <img class="feature-img" src="${TODAY_HOMILY_IMG}" alt="" data-open-homily="1">
      <h2 class="display small" data-open-homily="1">${esc(pick(HOMILY.title))}</h2>
      <div class="byline"><span class="rule"></span><span class="eyebrow">${esc(HOMILY.by)} · 14 VIII 2026</span></div>
      <p class="muted body">${T("În postul care se deschide astăzi, Biserica ne cheamă să urmăm pe Maica Domnului pe calea cumpătării, a rugăciunii și a nădejdii.","As this fast opens today, the Church calls us to follow the Mother of God on the path of temperance, prayer and hope.")}</p>
    </section>
  </main>
  ${navBar()}`;
}

function calendarCells() {
  const lead = 5, dim = 31;
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const n = i - lead + 1;
    const cur = n >= 1 && n <= dim;
    const isSel = cur && n === state.sel;
    const feast = cur && FEASTS.indexOf(n) >= 0;
    const fast = cur && isFast(n);
    cells.push({
      n: cur ? String(n) : (n < 1 ? String(30 + n) : String(n - dim)),
      d: n, cur, isSel, feast, fast
    });
  }
  return cells;
}

function screenCalendar() {
  const cells = calendarCells();
  const info = dayInfo(state.sel);
  const di = (new Date(2026, 7, state.sel).getDay() + 6) % 7;
  const dn = state.lang === "ro" ? DNAMES_RO : DNAMES_EN;
  const mo = state.lang === "ro" ? MONTHS_RO : MONTHS_EN;
  const headLetters = state.lang === "ro" ? ["L","Ma","Mi","J","V","S","D"] : ["M","Tu","W","Th","F","Sa","Su"];
  return `
  ${topbar(`<span class="brand-title-solo">CALENDAR</span>`)}
  <main id="view">
    <div class="seg">
      <div class="seg-item on">${T("NOU · IULIAN ÎNDREPTAT","NEW · REVISED JULIAN")}</div>
      <div class="seg-item">${T("VECHI · IULIAN","OLD · JULIAN")}</div>
    </div>
    <div class="month-nav">
      <button class="chev" data-month="-1">‹</button>
      <div class="month-label">
        <div class="month-name">${mo[state.month]}</div>
        <div class="year italic muted">2026</div>
      </div>
      <button class="chev" data-month="1">›</button>
    </div>
    <hr class="faint">
    <div class="week-head">${headLetters.map((h,i) => `<div class="${i>=5?'red':''}">${h}</div>`).join("")}</div>
    <div class="grid">
      ${cells.map(c => `
        <div class="cell${c.isSel ? " sel" : ""}" ${c.cur ? `data-day="${c.d}"` : ""}>
          <div class="cross" style="opacity:${c.feast ? 1 : 0}">✝</div>
          <div class="num${c.feast ? " feast" : ""}${!c.cur ? " out" : ""}">${c.n}</div>
          <div class="dot" style="opacity:${c.fast && !c.feast ? 1 : 0}"></div>
        </div>`).join("")}
    </div>
    <hr class="faint" style="margin-top:12px">
    <div class="legend">
      <div class="legend-item"><span class="red">✝</span> ${T("Sărbătoare mare","Great feast")}</div>
      <div class="legend-item"><span class="leg-dot"></span> ${T("Zi de post","Fast day")}</div>
    </div>
    <hr>
    <section class="block row" style="padding-top:16px">
      <img class="thumb-mid" src="${TODAY_SAINT_IMG}" alt="">
      <div class="col">
        <div class="eyebrow blue">${esc(dn[di])} · ${state.sel} ${esc(mo[7])}</div>
        <h2 class="h-serif">${esc(info.s)}</h2>
        ${info.f ? `<div class="feast-line"><span class="red">✝</span><span>${esc(info.f)}</span></div>` : ""}
        <div class="italic green-txt">${esc(info.fast)}</div>
      </div>
    </section>
    <hr class="faint">
    <section class="block">
      <div class="eyebrow green">${T("CITIRILE ZILEI","DAILY READINGS")}</div>
      <div class="kv"><span class="italic muted">${T("Apostol","Epistle")}</span><span class="v">${esc(info.ap)}</span></div>
      <div class="kv"><span class="italic muted">${T("Evanghelie","Gospel")}</span><span class="v">${esc(info.ev)}</span></div>
    </section>
    <hr class="faint">
    <section class="block" style="padding-bottom:30px">
      <div class="eyebrow blue">${T("SINAXARUL ZILEI","SYNAXARION")}</div>
      <p class="body">${esc(info.trop)}</p>
      <div class="link-cta">${T("CITEȘTE TOT SINAXARUL","READ THE FULL SYNAXARION")} →</div>
    </section>
  </main>
  ${navBar()}`;
}

function newsItemHtml(n) {
  const openAttr = n.homily ? ' data-open-homily="1"' : "";
  return `<article class="news-item"${openAttr}>
    ${n.img ? `<div class="media">
      <img src="${n.img}" alt="">
      ${n.video ? `<div class="play-overlay">${ic("play",{size:15,fill:"#A41313"})}</div><div class="dur">${n.duration}</div>` : ""}
    </div>` : ""}
    <div class="eyebrow ${n.img ? 'green' : 'blue'}" style="margin-top:${n.img?10:0}px">${esc(pick(n.kicker))}</div>
    <h2 class="${n.img ? 'display small' : 'h-serif'}">${esc(pick(n.title))}</h2>
    ${n.excerpt ? `<p class="muted body">${esc(pick(n.excerpt))}</p>` : ""}
    ${n.by ? `<div class="italic muted small byline-plain">${esc(pick(n.by))}</div>` : ""}
  </article><hr class="faint">`;
}

function screenNews() {
  const cats = [
    { id: "all", label: { ro:"TOATE", en:"ALL" } },
    { id: "pastoral", label: { ro:"PASTORALE", en:"PASTORAL" } },
    { id: "synodal", label: { ro:"SINODALE", en:"SYNODAL" } }
  ];
  const items = NEWS.filter(n => state.newsFilter === "all" || n.cat === state.newsFilter);
  return `
  ${topbar(`<span class="brand-title-solo">${T("ȘTIRI","NEWS")}</span>`)}
  <main id="view">
    <div class="cat-row">
      ${cats.map(c => `<span class="cat${state.newsFilter===c.id?" on":""}" data-filter="${c.id}">${esc(pick(c.label))}</span>`).join("")}
      <span class="cat" data-open-solia="1">SOLIA</span>
    </div>
    <hr class="faint">
    <div style="padding-bottom:14px">
      ${items.map(newsItemHtml).join("")}
    </div>
  </main>
  ${navBar()}`;
}

function screenHomily() {
  return `
  ${topbar("", { back: { ro:"ȘTIRI", en:"NEWS" } })}
  <main id="view">
    <img class="feature-img" style="margin-top:16px;height:186px" src="${HOMILY.img}" alt="">
    <div class="eyebrow green" style="margin-top:14px">${esc(pick(HOMILY.kicker))}</div>
    <h1 class="display" style="margin-top:10px">${esc(pick(HOMILY.title))}</h1>
    <div class="byline"><span class="rule"></span><span class="eyebrow blue-txt">${esc(HOMILY.by)}</span></div>
    <div class="italic muted small">${esc(HOMILY.date)}</div>
    <hr style="margin-top:16px">
    ${HOMILY.paragraphs.map(p => `<p class="body reader">${p.dropcap ? `<span class="dropcap">${p.dropcap}</span>` : ""}${esc(pick(p))}</p>`).join("")}
    <div class="pullquote">
      <div class="display small">${esc(pick(HOMILY.pullquote))}</div>
      <div class="eyebrow">${esc(HOMILY.pullquote.ref)}</div>
    </div>
    <p class="body">${esc(pick(HOMILY.closing))}</p>
    <hr class="faint" style="margin-top:18px">
    <div style="padding:14px 0 30px">
      <div class="eyebrow green">${T("ALTE CUVINTE ALE IERARHULUI","MORE FROM HIS GRACE")}</div>
      ${HOMILY.more.map(m => `<div class="kv border-item"><span class="h-serif-sm">${esc(pick(m.title))}</span><span class="eyebrow faint-lbl">${m.date}</span></div>`).join("")}
    </div>
  </main>
  ${navBar()}`;
}

function screenSolia() {
  return `
  ${topbar("", { back: { ro:"ȘTIRI", en:"NEWS" } })}
  <main id="view">
    <div class="solia-head">
      <div class="solia-word">SOLIA</div>
      <div class="italic blue-txt small">${T("Arhiva Eparhiei · publicația oficială","The archive of the Episcopate · official publication")}</div>
    </div>
    <hr>
    <div class="search-box">${ic("search",{stroke:"rgba(0,0,0,.45)",sw:"1.6",size:15})}<span class="italic muted small">${T("Caută în arhivă…","Search the archive…")}</span></div>
    <div class="cat-row"><span class="cat on">2026</span><span class="cat">2025</span><span class="cat">2024</span><span class="cat">2023</span><span class="cat">${T("ARHIVĂ","ARCHIVE")}</span></div>
    <hr>
    <section class="block row" style="padding-top:16px">
      <div class="issue-cover">
        <div class="issue-word">SOLIA</div>
        <div class="issue-rule"></div>
        <div class="italic green-txt small">${T("Vara","Summer")} 2026</div>
      </div>
      <div class="col">
        <div class="eyebrow green">${T("NUMĂRUL CURENT","CURRENT ISSUE")} · ${CURRENT_ISSUE.pages} ${T("PAGINI","PAGES")}</div>
        <h2 class="h-serif">${esc(pick({ro:CURRENT_ISSUE.ro[0],en:CURRENT_ISSUE.en[0]}))}</h2>
        <p class="muted italic small">${esc(pick({ro:CURRENT_ISSUE.ro[1],en:CURRENT_ISSUE.en[1]}))}</p>
        <div class="btn-row">
          <div class="btn-solid">${T("CITEȘTE","READ")}</div>
          <div class="btn-outline">${T("DESCARCĂ","DOWNLOAD")}</div>
        </div>
      </div>
    </section>
    <hr>
    <div class="eyebrow blue" style="padding:14px 0 4px">${T("NUMERE ANTERIOARE","PREVIOUS ISSUES")}</div>
    ${ISSUES.map(z => `<div class="kv border-item">
      <div><div class="h-serif-sm">${esc(pick({ro:z.ro[0],en:z.en[0]}))}</div><div class="italic muted small">${esc(pick({ro:z.ro[1],en:z.en[1]}))}</div></div>
      <div class="right"><div class="eyebrow green">${z.year}</div><div class="italic muted small">${z.pages} p.</div></div>
    </div>`).join("")}
    <div style="height:26px"></div>
  </main>
  ${navBar()}`;
}

function screenYouth() {
  return `
  ${topbar(`<span class="brand-title-solo">${T("TINERET","YOUTH")}</span>`)}
  <main id="view">
    <p class="italic muted body" style="padding:14px 0 12px">${T("Tabere, drumeții, coruri, ritiruri și prietenie în Hristos.","Camps, hikes, choirs, retreats and fellowship in Christ.")}</p>
    <img class="feature-img" src="/assets/youth-hero.jpg" alt="">
    <div class="triptych">
      <img src="/assets/youth-hike.jpg" alt="">
      <img src="/assets/youth-campfire.jpg" alt="">
      <img src="/assets/youth-sports.jpg" alt="">
    </div>
    <hr style="margin-top:16px">
    <div class="eyebrow green" style="padding:14px 0 2px">${T("ACTIVITĂȚI","ACTIVITIES")}</div>
    ${YOUTH.map(a => `<div class="youth-row border-item">
      <img src="${a.img}" alt="">
      <div class="col">
        <div class="h-serif-sm">${esc(pick({ro:a.ro[0],en:a.en[0]}))}</div>
        <div class="eyebrow blue" style="margin-top:4px">${a.when}</div>
        <div class="italic muted small">${esc(pick({ro:a.ro[1],en:a.en[1]}))}</div>
      </div>
    </div>`).join("")}
    <div class="eyebrow blue" style="padding:16px 0 10px">VIDEO</div>
    <div class="media"><img src="/assets/youth-campfire.jpg" alt=""><div class="play-overlay">${ic("play",{size:15,fill:"#A41313"})}</div><div class="dur">3:24</div></div>
    <div class="h-serif-sm" style="margin-top:8px">${T("Tabăra 2026 — rezumat","Camp 2026 — highlights")}</div>
    <div class="media" style="margin-top:16px"><img src="/assets/youth-choir.jpg" alt=""><div class="play-overlay">${ic("play",{size:15,fill:"#A41313"})}</div><div class="dur">5:02</div></div>
    <div class="h-serif-sm" style="margin:8px 0 30px">${T("Corul cântă în catedrală","The choir sings in the cathedral")}</div>
  </main>
  ${navBar()}`;
}

function screenParishes() {
  const deaneries = ["ALL","MIDWEST","EAST","WEST","CANADA","ONTARIO"];
  return `
  ${topbar(`<span class="brand-title-solo">${T("PAROHII","PARISHES")}</span>`)}
  <main id="view">
    <div class="search-box" style="margin-top:14px">${ic("search",{stroke:"rgba(0,0,0,.45)",sw:"1.6",size:15})}<span class="italic muted small">${T("Caută o parohie sau un oraș…","Search a parish or a city…")}</span></div>
    <div class="cat-row wrap">
      <span class="cat on">${T("TOATE","ALL")}</span>
      ${deaneries.slice(1).map(d => `<span class="cat">${d}</span>`).join("")}
    </div>
    <hr>
    <img class="feature-img" style="margin-top:14px;height:132px" src="${PARISHES_HERO_IMG}" alt="">
    <div class="italic muted small" style="margin-top:6px">${esc(pick(CATHEDRAL_CAPTION))}</div>
    <hr class="faint" style="margin-top:14px">
    <div class="eyebrow green" style="padding:14px 0 2px">10 ${T("PAROHII","PARISHES")} · 5 ${T("PROTOPOPIATE","DEANERIES")}</div>
    ${PARISHES.map(p => `<div class="kv border-item">
      <div><div class="h-serif-sm">${esc(pick({ro:p.ro,en:p.en}))}</div><div class="italic muted small">${p.priest}</div></div>
      <div class="right"><div class="h-serif-sm" style="font-weight:400">${p.city}</div><div class="eyebrow green" style="margin-top:2px">${p.deanery}</div></div>
    </div>`).join("")}
    <div style="height:26px"></div>
  </main>
  ${navBar()}`;
}

const SCREENS = {
  today: screenToday, calendar: screenCalendar, news: screenNews,
  homily: screenHomily, solia: screenSolia, youth: screenYouth, parishes: screenParishes
};

function render() {
  document.getElementById("app").innerHTML = SCREENS[state.screen]();
  document.getElementById("view").scrollTop = 0;
  bind();
}

function bind() {
  const root = document.getElementById("app");
  root.querySelectorAll("[data-nav]").forEach(el => el.addEventListener("click", () => {
    state.screen = el.getAttribute("data-nav");
    render();
  }));
  const backBtn = root.querySelector("[data-back]");
  if (backBtn) backBtn.addEventListener("click", () => { state.screen = "news"; render(); });
  const langBtn = root.querySelector("[data-toggle-lang]");
  if (langBtn) langBtn.addEventListener("click", () => {
    state.lang = state.lang === "ro" ? "en" : "ro";
    localStorage.setItem("roea.newdesign.lang", state.lang);
    render();
  });
  root.querySelectorAll("[data-open-homily]").forEach(el => el.addEventListener("click", () => {
    state.screen = "homily"; render();
  }));
  const soliaEl = root.querySelector("[data-open-solia]");
  if (soliaEl) soliaEl.addEventListener("click", () => { state.screen = "solia"; render(); });
  root.querySelectorAll("[data-filter]").forEach(el => el.addEventListener("click", () => {
    state.newsFilter = el.getAttribute("data-filter"); render();
  }));
  root.querySelectorAll("[data-month]").forEach(el => el.addEventListener("click", () => {
    const delta = parseInt(el.getAttribute("data-month"), 10);
    state.month = (state.month + delta + 12) % 12;
    render();
  }));
  root.querySelectorAll("[data-day]").forEach(el => el.addEventListener("click", () => {
    state.sel = parseInt(el.getAttribute("data-day"), 10);
    render();
  }));
}

render();
