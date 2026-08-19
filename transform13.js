const fs = require("fs");
let a = fs.readFileSync("js/app.js","utf8");
const ok=(c,n)=>{if(!c){console.error("FAIL:",n);process.exitCode=1}else console.log("ok:",n)};

/* 1 routes */
const r0="const routes={today:screenToday,calendar:screenCalendar,messages:screenMessages,magazine:screenMagazine,parishes:screenParishes,youth:screenYouth};";
ok(a.includes("screenYouth}),"routes0");
a=a.replace(r0,"const routes={today:screenToday,calendar:screenCalendar,news:screenNews,parishes:screenParishes,youth:screenYouth};");

/* 2 news screen from template file */
const news = '\n' + fs.readFileSync("/home/user/9d83ade2-6fbb-4c02-aba3-658e3a614869/episcopate-prototype/news-screen.txt","utf8");
const newsAnchor="  function screenMagazine(){";
ok(a.includes(newsAnchor),"news-anchor");
a=a.replace(newsAnchor, news);

/* 3 nav 5 */
const nav0=`      <button class="tab" data-route="messages">...`;   // word/magazine markers anchor
ok(a.includes("data-route=\"magazine\""),"nav-old");
const navNew=`      <button class="tab" data-route="calendar"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg><span>Calendar</span></button>
      <button class="tab" data-route="news"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5z"/></svg><span>News</span></button>
      <button class="tab tab-center" data-route="today"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg><span>Today</span></button>
      <button class="tab" data-route="youth"><svg viewBox="0 0 24 24"><path d="M12 3l2.1 5.6L20 11l-5.9 2.4L12 19l-2.1-5.6L4 11l5.9-2.4z"/></svg><span>Youth</span></button>
      <button class="tab" data-route="parishes"><svg viewBox="0 0 24 24"><path d="M12 3l8 5v13h-5v-7H9v7H4V8z"/><circle cx="12" cy="10" r="1.6"/></svg><span>Parishes</span></button>
    </nav>`;
a=a.replace(navOld,navNew);

/* 4 today */
const st="  function screenToday(){";
const si=a.indexOf(st);
const next="  function nextFeast(){";
const ei=a.indexOf(next);
ok(si>=0&&ei>si,"today bounds");
const block=fs.readFileSync("today-screen.txt","utf8").replace(/\$/g,"$$");
a=a.slice(0,si)+"\n"+block+"\n"+a.slice(ei);

/* 5 css */
fs.appendFileSync("css/app.css", fs.readFileSync("css-institutional.txt","utf8")+"\n");

fs.writeFileSync("js/app.js",a);
console.log("transformed");