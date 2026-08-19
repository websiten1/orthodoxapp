const fs = require("fs");
const navA = fs.readFileSync("nav-a.txt", "utf8");
const navB = fs.readFileSync("nav-b.txt", "utf8");

let a = fs.readFileSync("js/app.js", "utf8");

/* routes */
const r0 = "const routes={today:screenToday,calendar:screenCalendar,messages:screenMessages,magazine:screenMagazine,parishes:screenParishes,youth:screenYouth};";
a = a.replace(r0, "const routes={today:screenToday,calendar:screenCalendar,news:screenNews,parishes:screenParishes,youth:screenYouth};");

a = a.replace("  function screenMagazine(){", fs.readFileSync("news-screen-safe.txt", "utf8"));

const navOld='      <button class="tab" data-route="messages"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5z"/></svg><span>Word</span></button>\n      <button class="tab" data-route="magazine"><svg viewBox="0 0 24 24"><path d="M4 4h7v16H4zM13 4h7v16h-7zM4 9h7M13 9h7M4 14h7M13 14h7"/></svg><span>Magazine</span></button>';
a = a.replace(navOld, navA + navB);

const start = "  function screenToday(){";
const si = a.indexOf(start);
const end = "  function nextFeast(){";
const ei = a.indexOf(end);
si>=0&&ei>si||console.error("bounds");
const block = "\n" + fs.readFileSync("today-screen.txt", "utf8").replace(/\$/g, "$$$$");
a = a.slice(0,si) + block + "\n" + a.slice(ei);

fs.appendFileSync("css/app.css", fs.readFileSync("css-institutional.txt","utf8")+"\n");

fs.writeFileSync("js/app.js", a);
console.log("assembled");