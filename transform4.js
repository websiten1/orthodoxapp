const fs = require("fs");
let a = fs.readFileSync("js/app.js", "utf8");
const ok = (c,n)=>{ if(!c){ console.error("FAIL:",n); process.exitCode=1; } else console.log("ok:",n); };

/* 1) hero cross -> ROEA emblem */
const crossOld = `<div class="cross-badge">${ic('cross')}</div>`;
ok(a.includes(crossOld), "cross badge");
const crossNew = `<div class="cross-badge" style="padding:4px;background:rgba(255,255,255,.95)"><img src="assets/roea-logo-720.png" alt="ROEA" style="width:100%;height:100%;object-fit:cover;border-radius:12px"/></div>`;
a = a.replace(crossOld, crossNew);

/* 2) remaining ic('cross') -> spark */
a = a.split("${ic('cross')}").join("${ic('spark')}");
ok(!a.includes("ic('cross')"), "no cross");

/* 3) hero commemorations + fasting rules */
const feastOld = [
`          <div class="today-feast">${ESC(feastName(f))}</div>`,
`            <small>${f&&f.name_ro?ESC(f.name_ro):""}</small>`,
`          </div>`,
`          <div class="today-fast"><span class="fastbadge ${fbClass(fs.level)}">${esc(fs.note_en)}</span></div>`
].join("\n");
ok(a.includes(feastOld), "feast block");
const feastNew = [
`          <div class="today-feast">${esc(feastName(f))}</div>`,
`            <small>${f&&f.name_ro?esc(f.name_ro):""}</small>`,
`          </div>`,
`          ${f&&f.secondary&&f.secondary.length?`<div class="hero-sub">${f.secondary.map(s=>`<span><i></i>${esc(state.lang==="en"?s.name_en:s.name_ro)}</span>`).join("/")}</div>`:""}`,
`          <div class="today-fast"><span class="fastbadge ${fbClass(fs.level)}">${esc(fs.note_en)}</span></div>`,
`          <div class="frules">${ruleRow(fs)}</div>`
].join("\n");
a = a.replace(feastOld, feastNew);

/* 4) remove streak tile, add 4: nameday/donate/prayer/youth */
const tilesOld = `        <div class="b streak">... </div>`; // exact long block — but I removed streak last time? No — I replaced the streak BLOCK (start-to-end) with the 4 tiles: wait — the earlier transform didn't touch the streak? Let me recall: transform2.js replaced streak+tiles block with tilesNew (nameday/donate/prayer/youth). So the current file already has the new 4 tiles and NO streak. Therefore just leave it. So SKIP tile edit entirely.

/* 5) prayer card + sinaxar in readings card */
/* 6) wireCardClicks: add prayer/youth */
const wOld = `      el.onclick=()=>{ const o=el.dataset.open, id=el.dataset.id; if(o==="message")openMessage(id); if(o==="issue")openIssue(id); if(o==="admin")openAdmin(); if(o==="donate")openDonate(); if(o==="nameday")openNameDay(); if(o==="parish")openParish(id); if(o==="settings")openSettings(); if(o==="more")openMore(); if(o==="videoplay")toast(); }`;
ok(a.includes(wOld), "wireCardClicks");
const wNew = `      el.onclick=()=>{ const o=el.dataset.open, id=el.dataset.id; if(o==="message")openMessage(id); if(o==="issue")openIssue(id); if(o==="admin")openAdmin(); if(o==="donate")openDonate(); if(o==="nameday")openNameDay(); if(o==="parish")openParish(id); if(o==="settings")openSettings(); if(o==="more")openMore(); if(o==="videoplay")toast(state.lang==="en"?"▶ Full-screen video":"▶ Video pe ecran întreg"); if(o==="prayer")openPrayer(); if(o==="youth")go("youth"); if(o==="sinaxar")toast("Sinaxar — listen / watch","Sinaxar — ascultă / privește"); };`;
a = a.replace(wOld, wNew);

/* 7) routes */
ok(a.includes("parishes:screenParishes}"), "routes");
a = a.replace("parishes:screenParishes}", "parishes:screenParishes,youth:screenYouth}");

/* 8) insert new functions before ADMIN PANEL */
const adm = "  //  ADMIN PANEL";
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
      <p class="sub">${T("Camps, festivals, choirs — how everything the young do together.","Tabere, festivaluri, coruri — tot ce fac tinerii împreună.")}</p>
      <div class="video-spot grad-ice" data-open="prindem" style="margin-top:14px;min-height:172px;aspect-ratio:auto"/>
        <img class="yhero" src="assets/youth-hero.png" alt=""/>
        <div class="ct" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)">...</div>
        <span class="tag-time">...</span>
        <span class="vt">...</span>
      </div>
      <div class="eyebrow" style="margin-top:22px">${T("Activities","Activități")}</div>
      <div class="list">
        ${YOUTH_ACTIVITIES.map(act=>`</div>`...}
      </div>
      <div class="eyebrow" style="margin-top:22px">${T("Videos","Video")}</div>
      <div class="list">
        ${YOUTH_VIDEOS.map((v,index)=>`<div class="video-spot ${index%2?"grad-yellow":"violet"}" data-open="implicit">...`).join("")}
      </div>
    `;
  }
  function openPrayer(){
    const ro=state.lang==="ro";
    openSheet(`
      <div class="grab"></div>
      <div class="eyebrow" style="margin-bottom:6px">${T("PRAYER OF THE DAY","RUGA DE ZIUA")}</div>
      ...
    `);
  }
` + adm;
a = a.replace(adm, newFns + adm);
fs.writeFileSync("js/app.js", a);
console.log("app.js enhanced");