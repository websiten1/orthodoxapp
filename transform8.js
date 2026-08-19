const fs = require("fs");
let a = fs.readFileSync("js/app.js", "utf8");
const ok = (c,n)=>{ if(!c){ console.error("FAIL:",n); process.exitCode=1; } else console.log("ok:",n); };

/* ---------- 1) ROUTES ---------- */
const routesOld = "const routes={today:screenToday,calendar:screenCalendar,messages:screenMessages,magazine:screenMagazine,parishes:screenParishes,youth:screenYouth};";
ok(a.includes("screenYouth}"), "routes0");
a = a.replace(routesOld, "const routes={today:screenToday,calendar:screenCalendar,news:screenNews,parishes:screenParishes,youth:screenYouth};");
ok(a.includes("news:screenNews"), "routes1");

/* ---------- 2) add screenNews (combined Word+Magazine) ---------- */
const magFlag = "  function screenMagazine(){";
ok(a.includes(magFlag), "magFlag");
a = a.replace(magFlag, "  function screenNews(){\n"+
"    const list = [...MESSAGES, ...MAGAZINE.map(z=>z.label?{type:'issue',id:z.id,label:z.label,meta:z.year+' · '+z.issue,body_en:z.subtitle,body_ro:z.subtitle_ro}:\")].sort((x,y)=>x.id.localeCompare(y.id));\n"+
"    return `\n"+
"      <h1 class=\"screen-title\">${T('News','Noutate')}</h1>\n"+
"      <p class=\"sub\">${T('Word from His Grace and the Solia journal of the Episcopate.','Cuvântul Ierarhului și revista Solia a Eparhiei.')}</p>\n"+
"      <div class=\"seg\">\n"+
"        <button class=\"${state.msgFilter==='All'?'active':''}\" data-msgf=\"All\">All</button>\n"+
"        <button class=\"${state.msgFilter==='Pastoral'?'active':''}\" data-msgf=\"Pastoral\">${T('Pastoral')}</button>\n"+
"        <button class=\"${state.msgFilter==='Synodal'?'active':''}\" data-msgf=\"Synodal\">${T('Synodal')}</button>\n"+
"        <button class=\"${state.msgFilter==='Video'?'active':''}\" data-msgf=\"Video\">${T('Video')}</button>\n"+
"        <button class=\"${state.msgFilter==='Feast'?'active':''}\" data-msgf=\"Feast\">${T('Feast')}</button>\n"+
"      </div>\n"+
"      <div class=\"searchbar\"><svg viewBox=\"0 0 24 24\"><path d=\"M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm6 6l4 4\"/></svg><input id=\"msgQ\" placeholder=\"${T('Search…','Caută…')}\"></div>\n"+
"      <div class=\"list\">${list.map(m=>msgCard(m)).join(\"\")}</div>\n"+
"    `;\n"+
"  }\n");

/* ---------- 3) NAV: 5 tabs, Today center ---------- */
const navOld = "      <button class=\"tab\" data-route=\"messages\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 5h16v11H9l-5 4V5z\"/></svg><span>Word</span></button>\n      <button class=\"tab\" data-route=\"magazine\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 4h7v16H4zM13 4h7v16h-7zM4 9h7M13 9h7M4 14h7M13 14h7\"/></svg><span>Magazine</span></button>";
ok(a.includes(navOld), "nav 6-tab");
const navNew = "      <button class=\"tab\" data-route=\"calendar\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18M8 3v4M16 3v4\"/></svg><span>${'Calendar'}</span></button>\n"+
"      <button class=\"tab\" data-route=\"news\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 5h16v11H9l-5 4V5z\"/></svg><span>News</span></button>\n"+
"      <button class=\"tab tab-center\" data-route=\"today\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></svg><span>Today</span></button>\n"+
"      <button class=\"tab\" data-route=\"youth\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 3l2.1 5.6L20 11l-5.9 2.4L12 19l-2.1-5.6L4 11l5.9-2.4z\"/></svg><span>Youth</span></button>\n"+
"      <button class=\"tab\" data-route=\"parishes\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 3l8 5v13h-5v-7H9v7H4V8z\"/><circle cx=\"12\" cy=\"10\" r=\"1.6\"/></svg><span>Parishes</span></button>";
a = a.replace(navOld, navNew);

/* ---------- 4) screenToday minimal + sections ---------- */
const tOldStart = "  function screenToday(){";
const tOldEnd = "  function nextFeast(){";
const oldIdx = a.indexOf(tOldStart);
const endIdx = a.indexOf(tOldEnd);
ok(oldIdx > 0 && endIdx > oldIdx, "screenToday loc");
const heroNew = [
'    return `',
'      <div class="today-hero">',
'        <div class="today-greet">${T("Good evening","Bună seara")}, <b>${ESC(T(state.lang==="en"?"friend":"prietene"))}</b></div>.join("\\n")'
].join("\n")   // placeholder to avoid interpolation—we use single-quote concat below, so no ${} executes here in the script? NO: in the script the strings above are inside a template literal!! This is the bug again.
];
a = a.slice(0, oldIdx) + heroNew + "\n" + a.slice(endIdx + ("\n  function" ? 1 : 0));

Hmm — I'm doing the same bug. Inside this SCRIPT, if I use template literals with ${}, they interpolate. I must NOT use backticks-with-interpolation in the script. Build the inserted text as single-quoted strings with '\n' joins and NO ${} — but the inserted text itself must contain ${} literals? Since the resulting app.js code needs `${...}` literally, in a single-quoted string in the script, `"${...}"` is just text? In a single-quoted JS string, "${...}" is literal (no interpolation). YES — single quotes preserve everything literally. So I'll build huge single-quoted strings for inserted code with real backticks? But inserted app.js contains template literals using backticks, e.g. `...${...}...`. To write that inside a single-quoted script string, backticks are fine, ${} is fine, ONLY problem is single/double quotes inside: The inserted code will contain double-quote attributes (") — I'll use double quotes inside inserted code so in the script string I'd need to escape them \"? or use single quotes inside inserted. Using template literals inside the INSERTED code uses backticks + ${}, so as APP code those are fine. It contains backticks and double-quote attr strings. To write THAT as a JS single-quoted string is painful. Better: write the inserted new code into a separate data snippet file via write_file (no interpolation — no template in my file? write_file content = the script source too... ugh.

Cleaner: instead of one big transform script, I can WRITE the new app.js WHOLE FILE? It's 715 lines; rewriting entire file is risky.

Compromise approach: The inserted new code can be written to disk as a separate template text file (not .js) via write_file (which in MY turn executes node -e from a bash? No—simplest: I use Node readFileSync to read a template from disk — write a NEW FILE new-today.html containing the new HTML for the Today screen (built as an HTML template with ${} in it), then use it in transform (read into memory as STRING and put into app.js), while write_file reads literal bytes. The template file is a pure text file containing the code with ${}. No interpolation issue at all! I'll write new-today-template.txt (via write_file — but write_file's content is a JS string in which ${} interpolates if inside a template literal. In write_file JSON content, I pass as regular JSON-quoted string: "${...}" inside write_file's content parameter — there's no interpolation because write_file content is a regular JSON string (not a template literal). YES. So write_file is safe for `${...}` bytes as long as not inside a template literal in the JS script itself.

Plan: 
1. write_file `institutional-layer.json` containing a JSON string of the CSS to append + new-today template text + nav snippet + news screen snippet? Simplify: 
   - `css-append.txt` = CSS string (JSON string → template interpolation safe).
   - `today-block.txt` = new HTML block with `${}` etc (safe: content param is a normal string).
2. run a transform that reads those text files and injects them into app.js + appends CSS. All via `fs.readFileSync("in-today.txt")` then `a.replace(...)` — the transform file uses template literals to build? It's a JS file with normal strings: `const block = fs.readFileSync('in-today.txt','utf8')` — no interpolation. Good.

Let me write the text files + the small transform. This is manageable.</think>I see a cleaner path: I'll keep the new Today block and CSS layer in text files (where `${}` stays literal), then inject them with a tiny transform — eliminating the escaping trap. Writing the three component files:

<｜DSML｜tool_calls>
<｜DSML｜invoke name="write_file">
<｜DSML｜parameter name="path" string="true">/home/user/9d83ade2-6fbb-4c02-aba3-658e3a614869/episcopate-prototype/in-today-new