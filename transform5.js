const fs = require("fs");
let a = fs.readFileSync("js/app.js", "utf8");
const ok = (c,n) => { if(!c){ console.error("FAIL:",n); process.exitCode=1; } else console.log("ok:",n); };

/* 1 — hero cross −> ROEA emblem */
const crossOld = `<div class="cross-badge">${ic('cross')}</div>`;
ok(a.includes(crossOld), "cross-badge");
a = a.replace(crossOld, `<div class="cross-badge" style="padding:4px;background:rgba(255,255,255,.95)"><img src="assets/roea-logo-720.png" alt="ROEA" style="width:100%;height:100%;object-fit:cover;border-radius:12px"/></div>`);

/* 2 — leftover cross → spark */
a = a.split("${ic('cross')}").join("${ic('spark')}");
ok(!a.includes("ic('cross')"), "cross removed");

/* 3 — hero commemorations + fasting rules */
const feastOld = [
  `          <div class="today-feast">${esc(feastName(f))}</div>`,
  `            <small>${f&&f.name_ro?esc(f.name_ro):""}</small>`,
  `          </div>`,
  `          <div class="today-fast"><span class="fastbadge ${fbClass(fs.level)}">${esc(fs.note_en)}</span></div>`
].join("\n");
ok(a.includes(feastOld), "feast癫痢");
const feastNew = [
  `          <div class="today-feast">${esc(feastName(f))}</div>`,
  `            <small>${f&&f.name_ro?esc(f.name_ro):""}</small>`,
  `          </div>`,
  `          ${f&&f.secondary&&f.secondary.length?`<div class="hero-sub">${f.secondary.map(s=>`<span><i></i>${esc(state.lang==="en"?s.name_en:s.name_ro)}</span>`).join("")}</div>`:""}`,
  `          <div class="today-fast"><span class="fastbadge ${fbClass(fs.level)}">${esc(fs.note_en)}</span></div>`,
  `          <div class="frules">${ruleRow(fs)}</div>`
].join("\n");
a = a.replace(feastOld, feastNew);

/* 5 — prayer card + sinaxar (readings card amended elsewhere, but add prayer card!) */
/* 6 — data-open: prayer, youth */
const wireOld = `      el.onclick=()=>{ const o=el.dataset.open, id=el.dataset.id; if(o==="message")openMessage(id); if(o==="issue")openIssue(id); if(o==="admin")openAdmin(); if(o==="donate")openDonate(); if(o==="nameday")openNameDay(); if(o==="parish")openParish(id); if(o==="settings")openSettings(); if(o==="more")openMore(); if(o==="videoplay")toast(state.lang==="en"?"▶ Full-screen video":"▶ Video pe ecran întreg"); };`;
ok(a.includes(wireOld), "wireClicks");
const wireNew = `      el.onclick=()=>{ const o=el.dataset.open, id=el.dataset.id; if(o==="message")openMessage(id); if(o==="issue")openIssue(id); if(o==="admin")openAdmin(); if(o==="donate")openDonate(); if(o==="nameday")openNameDay(); if(o==="parish")openParish(id); if(o==="settings")openSettings(); if(o==="more")openMore(); if(o==="videoplay")toast(state.lang==="en"?"▶ Full-screen video":"▶ Video pe ecran întreg"); if(o==="prayer")openPrayer(); if(o==="youth")go("youth"); if(o==="sinaxar")toast("Sinaxar — listen / watch","Sinaxar — ascultă / privește"); };`;
a = a.replace(wireOld, wireNext);

/* 7 — routes */
ok(a.includes("parishes:screenParishes}"), "routes");
a = a.replace("parishes:screenParishes}", "parishes:screenParishes,youth:screenYouth}");

/* 8 — new functions before ADMIN */
const adm = `  //  ADMIN PANEL`;
ok(a.includes(adm), "admin anchor");
const newFns = `  // ================================================================
  //  YOUTH + PRAYER OF THE DAY
  // ================================================================
  function ruleRow(fs){
    const lvl=fs.level||"free";
    const fish=lvl==="fish"||lvl==="free";
    const oil=lvl==="oil"||lvl==="fish"||lvl==="free";
    const egg=lvl==="free";
    const mk=(icn,lab,on)=>`<div class="frule ${on?"":"off"}"><span class="r-ic">${ic(icn)}</span><b>${lab}</b></div>`;
    return mk("egg",T("Meat & dairy","Carne & lactate"),egg)+mk("fish",T("Fish","Pește"),fish)+mk("drop",T("Wine & oil","Vin & untdelemn"),oil);
  }
  function screenYouth(){
    return `
      <h1 class="screen-title">${T("Youth Ministry","Tineretul Eparhiei")}</h1>
      <p class="sub">${T("Camps, festivals, choirs — everything the young do together.","Tabere, festivaluri, coruri — tot ce fac tinerii împreună.")}</p>
      <div class="video-spot grad-ice" data-open="prinde">...
      </div>
      <div class="eyebrow" style="margin-top:22px">${T("Activities","Activități")}</div>
      <div class="list">
        ${YOUTH_ACTIVITIES.map(act=>`
        <div class="item" style="flex-direction:row;align-items:center;gap:14px">
          <span class="qicon" style="background:var(--pastel-${act.tile});color:var(--navy)">${ic(act.icon)}</span>
          <div style="flex:1"><h3 style="font-size:15px">${esc(T(act.t,act.t_ro))}</h3><div class="meta">${esc(act.when)} · ${esc(act.place)}</div></div>
        </div>`).join("")}
      </div>
      <div class="eyebrow" style="margin-top:22px">${T("Videos","Video")}</div>
      <div class="list">
        ${YOUTH_VIDEOS.map((v,index)=>`<div class="video-spot ${index%2?"grad-butter":"violet"}" data-open="prindem">...</div>`).join("")}
      </div>
    `;
  }
  function openPrayer(){
    const ro=state.lang==="ro";
    openSheet(`
      <div class="grab"></div>
      ...
    `);
  }
` + adm;
a = a.replace(adm, newFns + adm);
fs.writeFileSync("js/app.js", a);
console.log("app logged");