const fs = require("fs");
let a = fs.readFileSync("js/app.js","utf8");
const ok=(c,n)=>{if(!c){console.error("FAIL:",n);process.exitCode=1}else console.log("ok:",n)};

// 1) routes
const r0="const routes={today:screenToday,calendar:screenCalendar,messages:screenMessages,magazine:screenMagazine,parishes:screenParishes,youth:screenYouth};";
ok(a.includes("screenYouth}"), "routes0");
a=a.replace(r0,"const routes={today:screenToday,calendar:screenCalendar,news:screenNews,parishes:screenParishes,youth:screenYouth};");

// 2) News screen (replaces screenMagazine; merged Word+Magazine feed)
const mag = "  function screenMagazine(){";
ok(a.includes(mag) && a.includes("function screenMessages"), "screens");
a=a.replace("  function screenMagazine(){", "  function screenNews(){\n"+
"      const seg=" + "'" + "All" + "'" + ";\n"+
"      return `\n"+
"        <h1 class=\"screen-title\">" + T("News","Nout\u00e3i") + "</h1>\n"+
"        <div class=\"seg\"><button class=\""+'${state.msgFilter==="All"?"active":""}'+"\" data-msgf=\"All\">All</button>"+
"          <button class=\""+'${state.msgFilter==="Pastoral"?"active":""}'+"\" data-msgf=\"Pastoral\">"+T("Pastoral")+"</button>\n"+
"          <button class=\""+'${state.msgFilter==="Synodal"?"active":""}'+"\" data-msgf=\"Synodal\">"+T("Synodal")+"</button>\n"+
"          <button class=\""+'${state.msgFilter==="Video"?"active":""}'+"\" data-msgf=\"Video\">"+T("Video")+"</button>\n"+
"          <button class=\""+'${state.msgFilter==="Feast"?"active":""}'+"\" data-msgf=\"Feast\">"+T("Feast")+"</button>\n"+
"      </div>\n"+
"      <div class=\"searchbar\"><svg viewBox=\"0 0 24 24\"><path d=\"M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm6 6l4 4\"/></svg><input id=\"msgQ\" placeholder=\""+T("Search\u2026","Caut\u0103\u2026")+"\"></div>\n"+
"      <div class=\"list\">"+ '${list.map(m=>msgCard(m)).join("")}' + "</div>\n" +
"    `;\n  }");
ok(a.includes("function screenNews"), "screenNews");

// 3) nav: 5 tabs Calendar | News | TODAY | Youth | Parishes
const nav0="      <button class=\"tab\" data-route=\"messages\">...<\/button>\n      <button class=\"tab\" data-route=\"magazine\">...";
ok(a.includes(nav0),"nav6");
const navN="      <button class=\"tab\" data-route=\"calendar\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18M8 3v4M16 3v4\"/></svg><span>Calendar</span></button>\n"+
"      <button class=\"tab\" data-route=\"news\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 5h16v11H9l-5 4V5z\"/></svg><span>News</span></button>\n"+
"      <button class=\"tab tab-center\" data-route=\"today\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg><span>Today</span></button>\n"+
"      <button class=\"tab\" data-route=\"youth\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 3l2.1 5.6L20 11l-5.9 2.4L12 19l-2.1-5.6L4 11l5.9-2.4z\"/></svg><span>Youth</span></button>\n"+
"      <button class=\"tab\" data-route=\"parishes\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 3l8 5v13h-5v-7H9v7H4V8z\"/><circle cx=\"12\" cy=\"10\" r=\"1.6\"/></svg><span>Parishes</span></button>\n    </nav>";
a=a.replace(nav0,navN);

// 4) Today block
const start="  function screenToday(){";
const si=a.indexOf(start);
const end="  function nextFeast(){";
const ei=a.indexOf(end);
ok(si>=0 && ei>si, "screenToday bounds");
const block=fs.readFileSync("today-block.html","utf8");
a=a.slice(0,si)+block+"\n"+a.slice(ei);

// 5) CSS
fs.appendFileSync("css/app.css", fs.readFileSync("css-institutional.txt","utf8")+"\n");

fs.writeFileSync("js/app.js",a);
console.log("all transformed");