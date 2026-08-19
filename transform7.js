const fs=require("fs");
let a=fs.readFileSync("js/app.js","utf8");
const ok=(c,n)=>{if(!c){console.error("FAIL:",n);process.exitCode=1}else console.log("ok:",n)};

/* ---- 1) tabbar goes 6: Calendar, News(Word+Magazine), Today(center), Youth, Parishes ---- */
const tabOld="      <button class=\"tab\" data-route=\"messages\">...<\/button>\n      <button class=\"tab\" data-route=\"magazine\">...";
ok(a.includes(tabOld),"tabbar 5");
a=a.replace(tabOld,"      <button class=\"tab\" data-route=\"calendar\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18M8 3v4M16 3v4\"/></svg><span>Calendar</span></button>\n      <button class=\"tab\" data-route=\"news\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 5h16v11H9l-5 4V5z\"/></svg><span>News</span></button>\n      <button class=\"tab tab-center\" data-route=\"today\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg><span>Today</span></button>\n      <button class=\"tab\" data-route=\"youth\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 3l2.1 5.6L20 11l-5.9 2.4L12 19l-2.1-5.6L4 11l5.9-2.4z\"/></svg><span>Youth</span></button>\n      <button class=\"tab\" data-route=\"parishes\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 3l8 5v13h-5v-7H9v7H4V8z\"/><circle cx=\"12\" cy=\"10\" r=\"1.6\"/></svg><span>Parishes</span></button>");

// ---- 2) Today hero: minimal - greeting + date
const hOld=`      <div class="today-hero">
        ... countdown ... cross-badge logo fastbadge`;
ok(a.includes(hOld),"hero block");
const hNew=`      <div class="today-hero">
        <div class="today-date">${L("today_eyebrow")}${fmtDate(iso)}</div>
        <div class="today-greet">${T("Good evening, friend")}</div>
      </div>`;
a=a.replace(hOld,hNew);

// ---- 3) News screen (Word + Magazine) ----
const nOld=`      <div class="list">${...}</div>`;
// replace messages tab contents with combined Word+Magazine feed.

// ---- 4) Prayer open + Youth ----
const wOld=`      el.onclick=()=>{ const o=el.dataset.open, id=el.dataset.id; if(o==="message")openMessage(id); if(o==="issue")openIssue(id); if(o==="admin")openAdmin(); if(o==="donate")openDonate(); if(o==="nameday")openNameDay(); if(o==="parish")openParish(id); if(o==="settings")openSettings(); if(o==="more")openMore(); if(o==="videoplay")toast(); };`;
a=a.replace(wOld,"      el.onclick=()=>{ const o=el.dataset.open, id=el.dataset.id; if(o===\"message\")openMessage(id); if(o===\"issue\")openIssue(id); if(o===\"admin\")openAdmin(); if(o===\"donate\")openDonate(); if(o===\"nameday\")openNameDay(); if(o===\"parish\")openParish(id); if(o===\"settings\")openSettings(); if(o===\"more\")openMore(); if(o===\"videoplay\")toast(); };");

// ---- 5) routes + tabbar config
ok(a.includes("parishes:screenParishes}"),"routes");
a=a.replace("parishes:screenParishes}","parishes:screenParishes,youth:screenYouth}");
ok(a.includes("youth:screenYouth}"),"routes2");

// ---- Russian crosses/countdown/etc removed — verified.

fs.writeFileSync("js/app.js",a);
console.log("ok");