const fs = require("fs");
let a = fs.readFileSync("js/app.js", "utf8");
const ok=(c,n)=>{if(!c){console.error("FAIL:",n);process.exitCode=1}else console.log("ok:",n)};

/* 1 — routes */
const routes0="const routes={today:screenToday,calendar:screenCalendar,messages:screenMessages,magazine:screenMagazine,parishes:screenParishes,youth:screenYouth};";
ok(a.includes("screenYouth}),\"routes0\");
a=a.replace(routes0,"const routes={today:screenToday,calendar:screenCalendar,news:screenNews,parishes:screenParishes,youth:screenYouth};");

/* 2 — merge Word+Magazine into screenNews(native template at end) */
const mag="  function screenMagazine(){";
ok(a.includes(mag)&&a.includes("function screenMessages"),"screens");
a=a.replace("  function screenMagazine(){", `  function screenNews(){
    const list = [...MESSAGES, ...MAGAZINE.map(z=>({type:'berg',id:z.id,label:z.label,meta:z.year+' · '+z.issue,title_en:z.subtitle,title_ro:z.subtitle_ro}))].sort((x,y)=>x.id.localeCompare(y.id));
    return \`
      <h1 class="screen-title">\${T('News','Noutate')}</h1>
      <p class="sub">\${T('From His Grace and the Solia journal.','Cuvântul Ierarhului și revista Solia a Eparhiei.')}</p>
      <div class="seg">
        <button class="\${state.msgFilter==='All'?'active':''}\" data-msgf=\"All\">All</button>
        <button class="\${state.msgFilter==='Pastoral'?'active':''}\" data-msgf="Pastoral">\${T('Pastoral')}</button>
        <button class="\${state.msgFilter==='Synodal'?'active':''}\" data-msgf="Synodal">\${T('Synodal')}</button>
        <button class="\${state.msgFilter==='Video'?'active':''}\" data-msgf="Video">\${T('Video')}</button>
        <button class="\${state.msgFilter==='Feast'?'active':''}\" data-msgf="Feast">\${T('Feast')}</button>
      </div>
      <div class="searchbar"><svg viewBox="0 0 24 24"><path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm6 6l4 4"/></svg><input id="msgQ" placeholder="\${T('Search…','Caută…')}"></div>
      <div class="list">\${list.map(m=>msgCard(m)).join("")}</div>
    \`;
  }`);

/* 3. nav: 5 tabs — Calendar | News | TODAY | Youth | Parishes */
const nav0="      <button class=\"tab\" data-route=\"messages\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 5h16v11H9l-5 4V5z\"/></svg><span>Word</span></button>\n      <button class=\"tab\" data-route=\"magazine\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 4h7v16H4zM13 4h7v16h-7zM4 9h7M13 9h7M4 14h7M13 14h7\"/></svg><span>Magazine</span></button>";
ok(a.includes(nav0),"nav6");
const navNew = `      <button class="tab" data-route="calendar"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg><span>Calendar</span></button>
      <button class="tab" data-route="news"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5z"/></svg><span>News</span></button>
      <button class="tab tab-center" data-route="today"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg><span>Today</span></button>
      <button class="tab" data-route="youth"><svg viewBox="0 0 24 24"><path d="M12 3l2.1 5.6L20 11l-5.9 2.4L12 19l-2.1-5.6L4 11l5.9-2.4z"/></svg><span>Youth</span></button>
      <button class="tab" data-route="parishes"><svg viewBox="0 0 24 24"><path d="M12 3l8 5v13h-5v-7H9v7H4V8z"/><circle cx="12" cy="10" r="1.6"/></svg><span>Parishes</span></button>
    </nav>"; /* note: this is a single string; backticks appear literally as intended in app.js */
a=a.replace(nav0, navNew);

/* 4. Today screen */
const start = "  function screenToday(){";
const startIdx=a.indexOf(start);
const end = "  function nextFeast(){";
const endIdx=a.indexOf(end);
ok(startIdx>=0 && endIdx>startIdx,"today-bounds");
const block=fs.readFileSync("today-block.html","utf8");
a=a.slice(0,startIdx)+block+"\n"+a.slice(endIdx);

/* 5. style token layer */
fs.appendFileSync("css/app.css", fs.readFileSync("css-institutional.txt","utf8")+"\n");

fs.writeFileSync("js/app.js",a);
console.log("all layered");