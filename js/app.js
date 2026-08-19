(function(){
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const ESC=h=>(h||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const state={route:"today",lang:"en",mode:"new",calM:null,calY:null,calSel:null,msgFilter:"All",msgQuery:"",nameQuery:""};
const today=new Date();
if(!state.calM){state.calM=today.getUTCMonth()+1;state.calY=today.getUTCFullYear();}
const pad=n=>(n<10?"0":"")+n;
const dstr=d=>d.toISOString().replace(/T.*/,"");
const L=k=>((I18N[state.lang]&&I18N[state.lang][k])||I18N.en[k]||k);
const T=(e,r)=>state.lang==="en"?e:r;
const esc=x=>ESC(String(x==null?"":x));
const fmtDayName=()=>today.toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{weekday:"long"});
const fmtDayNum=()=>today.toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{day:"numeric",month:"long"});
const fmtDate=iso=>new Date(iso+"T00:00:00Z").toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{weekday:"long",month:"long",day:"numeric"});
const PART={m:{en:"Good morning",ro:"Buna dimineata"},a:{en:"Good afternoon",ro:"Buna ziua"},e:{en:"Good evening",ro:"Buna seara"}};
function greeting(){var h=new Date().getHours();var p=h<12?PART.m[state.lang]:h<18?PART.a[state.lang]:PART.e[state.lang];return p+", "+((state.profileName)||(state.lang==="en"?"friend":"prietene"))+".";}
const ICONS={
search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
book:'<path d="M4 5a2 2 0 0 1 2-2h6v17H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-6v17h6a2 2 0 0 1 2 2z"/>',
play:'<path d="M8 5.5v13l11-6.5z"/>',
audio:'<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
gift:'<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16M12 9v11"/>',
star:'<path d="M12 3l2.1 5.6L20 11l-5.9 2.4L12 19l-2.1-5.6L4 11z"/>',
heart:'<path d="M12 20s-7.5-4.6-7.5-9.8A4 4 0 0 1 12 8.5a4 4 0 0 1 7.5 1.7C19.5 15.4 12 20 12 20z"/>',
note:'<path d="M9 18V6l9-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="16" r="2.5"/>',
loc:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1"/>',
tent:'<path d="M4 20h16M8 20l4-10 4 10M11.5 20l.5-5 .5 5"/>',
seal:'<path d="M5 17l2-8 4 3.2 2-6 2 6 4-3.2 2 8z"/><path d="M4 20h16"/>',
chev:'<path d="M9 6l6 6-6 6"/>'};
function ic(n){var p=ICONS[n]||"";return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+"</svg>";}
function rankLabel(r){var m={pascha:"Great Feast",great:"Great Feast",feast:"Feast",polyeleos:"Polyeleos",rank:"Commemoration",triodion:"Sunday"};return m[r]||"Commemoration";}
function fbClass(l){var m={free:"free",oil:"oil",fish:"fish",strict:"strict",lent:"lent"};return m[l]||"free";}
function todayFeast(){return Liturgical.feastFor(dstr(today),state.mode);}
function todayFast(){return Liturgical.fasting(dstr(today),state.mode);}
function feastLabel(f){return f?(state.lang==="en"?f.name_en:f.name_ro):T("Memory of the saints of the day","Pomenirea sfintilor zilei");}
function screenToday(){
  var f=todayFeast();var fs=todayFast();var h="";
  h+='<div class="today-hero"><div class="today-greet">'+esc(greeting())+'</div><div class="today-day">'+esc(fmtDayName()+" - "+fmtDayNum())+"</div></div>";
  h+='<div class="prayer-card" data-open="prayer"><div><div class="eyebrow">'+T("Today's Prayer","Rugaciunea zilei")+'</div><h3>'+T("Our Father","Tatal nostru")+'</h3><p>'+T("The Lord's Prayer, the prayer of every Christian home.","Rugaciunea Domnului, rugaciunea fiecarei case crestine.")+'</p><span class="kbd">'+T("Read the prayer","Citeste rugaciunea")+" "+ic("chev")+"</span></div></div>";
  h+='<div class="section-title">'+T("Today's Orthodox Life","Viata ortodoxa de azi")+"</div>";
  h+='<div class="ort-card"><div class="ort-row"><b>'+esc(feastLabel(f))+"</b>"+(f?'<span class="tag">'+esc(rankLabel(f.rank))+"</span>":"")+"</div>";
  if(f&&f.secondary&&f.secondary.length){var sec=f.secondary.map(function(s){return "<span>- "+esc(state.lang==="en"?s.name_en:s.name_ro)+"</span>";}).join("");h+='<div class="ort-sub">'+sec+"</div>";}
  h+='<div class="divider"></div><div class="ort-row"><span class="kbd">'+T("Fasting","Post")+'</span><span class="fastbadge '+fbClass(fs.level)+'">'+esc((state.lang==="en")?fs.note_en:fs.note_ro)+"</span></div>";
  h+="</div>";
  h+='<div class="section-title">'+T("From His Grace","Cuvantul Ierarhului")+"</div>";
  h+='<div class="list">'+MESSAGES.slice(0,2).map(msgCard).join("")+"</div>";
  return h;
}
function msgCard(m){
  var lang=state.lang==="en";
  var title=lang?(m.title_en||m.title):(m.title_ro||m.title);
  var body=(lang?(m.body_en||m.body_ro||""):(m.body_ro||m.body_en||""));
  var h="";
  h+='<div class="item" data-open="message" data-id="'+m.id+'">';
  if(m.has_video){h+='<div class="video-spot"><div class="play">'+ic("play")+'</div><span class="vt">'+esc(title)+'</span><span class="tag-time">'+(m.dur||"2:40")+"</span></div>";}
  if(m.image&&!m.has_video){h+='<div class="thumb"><span>'+esc(m.occasion||T("Newsletter","Revista"))+"</span></div>";}
  h+='<div class="hier"><div class="av">'+(m.icon||"N")+'</div><div><b>'+esc(m.author)+"</b><span>"+esc(m.date?fmtDate(m.date):(m.meta||""))+"</span></div></div>";
  h+='<h3>'+esc(title)+"</h3><p>"+esc(body.slice(0,120))+"...</p>";
  h+='<div class="meta">'+esc(m.occasion||"")+((m.tags||[]).map(function(t){return '<span class="tag">'+esc(t)+"</span>";}).join(""))+"</div>";
  h+="</div>";
  return h;
}
function screenNews(){
  var mag=MAGAZINE.map(function(z){return {type:"me",id:z.id,title:z.label,meta:z.year+" - "+z.issue,body_en:z.subtitle,body_ro:z.subtitle_ro};});
  var all=[].concat(MESSAGES.map(function(m){return {type:"me",id:m.id,title:m.title||m.title_en,meta:esc(m.author||"") ,title_ro:m.title_ro,body_en:m.body_en,body_ro:m.body_ro,icon:m.icon,tags:m.tags||[],occasion:m.occasion,has_video:m.has_video,dur:m.dur};}),mag);
  all.sort(function(a,b){return (a.id||"").localeCompare(b.id||"");});
  var filters=["All","Pastoral","Synodal","Video","Feast"];
  var seg=filters.map(function(f){return '<button class="'+(state.msgFilter===f?"active":"")+'" data-msgf="'+f+'">'+f+"</button>";}).join("");
  var h="";
  h+='<h1 class="screen-title">'+T("News","Noutati")+"</h1>";
  h+='<p class="sub">'+T("From His Grace and the Solia journal.","Cuvantul Ierarhului si revista Solia.")+"</p>";
  h+='<div class="seg">'+seg+"</div>";
  h+='<div class="searchbar">'+ic("search")+'<input id="msgQ" placeholder="'+T("Search...","Cauta...")+'"></div>';
  h+='<div class="list">'+all.map(msgCard).join("")+"</div>";
  return h;
}
function screenCalendar(){
  var g=Liturgical.monthGrid(state.calY,state.calM,state.mode);
  var mn=new Date(Date.UTC(state.calY,state.calM-1,1)).toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{month:"long",year:"numeric"});
  var h="";
  h+='<h1 class="screen-title">'+T("Calendar","Calendar")+"</h1>";
  h+='<div class="seg"><button class="'+(state.mode==="new"?"active":"")+'" data-mode="new">'+T("New (Revised Julian)","Nou")+'</button><button class="'+(state.mode==="old"?"active":"")+'" data-mode="old">'+T("Old (Julian)","Vechi")+"</button></div>";
  h+='<div class="card pad0"><div class="month-head"><button id="prevM">&#8249;</button><h3>'+mn+'</h3><button id="nextM">&#8250;</button></div>';
  h+='<div class="dow">'+["S","M","T","W","T","F","S"].map(function(d){return "<span>"+d+"</span>";}).join("")+"</div>";
  var sel=state.calSel||Date.UTC(state.calY,state.calM-1,today.getUTCDate());
    h+='<div class="grid">'+g.cells.map(function(c){if(!c){return '<div class="day blank"></div>';}var cls="day";if(c.iso===sel){cls+=" today";}if(c.feast){cls+=" feat";}if(c.level==="strict"){cls+=" fast-s";}return '<button class="'+cls+'" data-iso="'+c.iso+'"><span class="n">'+c.d+"</span>"+(c.feast?'<span class="dot"></span>':"")+"</button>";}).join("")+"</div>";
  return h;
}
function msgCard(m){
  var lang=state.lang==="en";
  var title=lang?(m.title_en||m.title):(m.title_ro||m.title);
  var body=(lang?(m.body_en||m.body_ro||""):(m.body_ro||m.body_en||""));
  var h="";
  h+='<div class="item" data-open="message" data-id="'+m.id+'">';
  if(m.has_video){h+='<div class="video-spot"><div class="play">'+ic("play")+'</div><span class="vt">'+esc(title)+'</span><span class="tag-time">'+(m.dur||"2:40")+"</span></div>";}
  if(m.image&&!m.has_video){h+='<div class="thumb"><span>'+esc(m.occasion||T("Newsletter","Revista"))+"</span></div>";}
  h+='<div class="hier"><div class="av">'+(m.icon||"N")+'</div><div><b>'+esc(m.author)+"</b><span>"+esc(m.date?fmtDate(m.date):(m.meta||""))+"</span></div></div>";
  h+='<h3>'+esc(title)+"</h3><p>"+esc(body.slice(0,120))+"...</p>";
  h+='<div class="meta">'+esc(m.occasion||"")+((m.tags||[]).map(function(t){return '<span class="tag">'+esc(t)+"</span>";}).join(""))+"</div>";
  h+="</div>";
  return h;
}
function screenNews(){
  var mag=MAGAZINE.map(function(z){return {type:"me",id:z.id,title:z.label,meta:z.year+" - "+z.issue,body_en:z.subtitle,body_ro:z.subtitle_ro};});
  var all=[].concat(MESSAGES.map(function(m){return {type:"me",id:m.id,title:m.title||m.title_en,meta:esc(m.author||"") ,title_ro:m.title_ro,body_en:m.body_en,body_ro:m.body_ro,icon:m.icon,tags:m.tags||[],occasion:m.occasion,has_video:m.has_video,dur:m.dur};}),mag);
  all.sort(function(a,b){return (a.id||"").localeCompare(b.id||"");});
  var filters=["All","Pastoral","Synodal","Video","Feast"];
  var seg=filters.map(function(f){return '<button class="'+(state.msgFilter===f?"active":"")+'" data-msgf="'+f+'">'+f+"</button>";}).join("");
  var h="";
  h+='<h1 class="screen-title">'+T("News","Noutati")+"</h1>";
  h+='<p class="sub">'+T("From His Grace and the Solia journal.","Cuvantul Ierarhului si revista Solia.")+"</p>";
  h+='<div class="seg">'+seg+"</div>";
  h+='<div class="searchbar">'+ic("search")+'<input id="msgQ" placeholder="'+T("Search...","Cauta...")+'"></div>';
  h+='<div class="list">'+all.map(msgCard).join("")+"</div>";
  return h;
}
function screenCalendar(){
  var g=Liturgical.monthGrid(state.calY,state.calM,state.mode);
  var mn=new Date(Date.UTC(state.calY,state.calM-1,1)).toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{month:"long",year:"numeric"});
  var h="";
  h+='<h1 class="screen-title">'+T("Calendar","Calendar")+"</h1>";
  h+='<div class="seg"><button class="'+(state.mode==="new"?"active":"")+'" data-mode="new">'+T("New (Revised Julian)","Nou")+'</button><button class="'+(state.mode==="old"?"active":"")+'" data-mode="old">'+T("Old (Julian)","Vechi")+"</button></div>";
  h+='<div class="card pad0"><div class="month-head"><button id="prevM">&#8249;</button><h3>'+mn+'</h3><button id="nextM">&#8250;</button></div>';
  h+='<div class="dow">'+["S","M","T","W","T","F","S"].map(function(d){return "<span>"+d+"</span>";}).join("")+"</div>";
  var sel=state.calSel||Date.UTC(state.calY,state.calM-1,today.getUTCDate());
  h+='<div class="grid">'+g.cells.map(function(c,i){if(!c){return '<div class="day blank"></div>';}
    var cls="day";if(c.isISO&&c.isISO===sel){cls+=" today";}else if(c.todayIsoSel){cls+=" today";}
    if(c.feast){cls+=" feat";}
    if(c.fastLevel==="strict"){cls+=" fast-s";}
    var extra=(c.isSel?" sel-day-today":"");
    return '<button class="'+cls+'" data-iso="'+c.isISO+'"><span class="n">'+c.d+"</span>"+(c.feast?'<span class="dot"></span>':"")+"</button>";}).join("")+"</div>";
  h+="</div>";
  return h;
}
function screenParishes(){
  var list=PARISHES;
  var h="";
  h+='<h1 class="screen-title">'+T("Parishes","Parohii")+"</h1>";
  h+='<div class="searchbar">'+ic("loc")+'<input id="parQ" placeholder="'+T("Search parish...","Cauta parohie...")+'"></div>';
  h+='<div class="map">'+list.slice(0,12).map(function(p,i){return '<span class="pin" style="left:'+((i*7+8)%90)+"%;top:"+((i*11+14)%80)+'%"></span>';}).join("")+"</div>";
  h+='<div class="list">'+list.map(function(p){return '<div class="item" data-open="parish" data-id="'+p.id+'"><h3>'+esc(p.name)+'</h3><p>'+esc(p.city)+", "+esc(p.state)+" - "+esc(p.priest)+"</p></div>";}).join("")+"</div>";
  return h;
}
function screenYouth(){
  var h="";
  h+='<h1 class="screen-title">'+T("Youth","Tineret")+"</h1>";
  h+='<p class="sub">'+T("Camps, festivals, choirs, retreats.","Tabere, festivaluri, coruri si retragere.")+'</p>';
  h+='<div class="section-title">'+T("Activities","Activitati")+"</div>";
  h+='<div class="list">'+YOUTH_ACTIVITIES.map(function(a){return '<div class="item"><div class="it-top">'+ic(a.icon||"star")+'</div><div><h3>'+esc(T(a.t,a.t_ro))+"</h3><div class=\"meta\">"+esc(a.when)+" - "+esc(a.place)+"</div></div></div>";}).join("")+"</div>";
  h+='<div class="section-title">'+T("Videos","Video")+"</div>";
  h+='<div class="list">'+YOUTH_VIDEOS.map(function(v,i){return '<div class="video-spot"><div class="play">'+ic("play")+'</div><span class="vt">'+esc(T(v.title,v.title_ro))+'</span><span class="tag-time">'+v.dur+"</span></div>";}).join("")+"</div>";
  return h;
}
function openMessage(id){
  var m=MESSAGES.find(function(x){return x.id===id;});if(!m){return;}
  var lang=state.lang==="en";
  var title=lang?(m.title_en||m.title):(m.title_ro||m.title);
  var body=lang?(m.body_en||m.body_ro||""):(m.body_ro||m.body_en||"");
  openSheet('<div class="grab"></div><div class="hier"><div class="av">'+(m.icon||"N")+'</div><div><b>'+esc(m.author)+"</b><span>"+esc(m.date?fmtDate(m.date):(m.meta||""))+"</span></div></div><h2>"+esc(title)+'</h2><div class="reader dropcap">'+body.split("\n").map(function(p){var s="";s+=esc(p);return s;}).join("<br>")+'</div><button class="btn primary block" id="msgClose">'+T("Close","Inchide")+"</button>");
  var b=document.getElementById("msgClose");if(b){b.onclick=closeSheet;}
}
function openPrayer(){
  var ro=state.lang==="ro";
  var body=(ro?PRAYERS.ro:PRAYERS.en);
  var h="";
  h+='<div class="grab"></div>';
  h+='<div class="eyebrow">'+T("Prayer of the Day","Rugaciunea zilei")+'</div>';
  h+='<h2>'+T("Our Father","Tatal nostru")+'</h2>';
  h+='<p class="sub">'+T("Said at every Divine Liturgy and in every home.","Rostita la fiecare Liturghie si in fiecare casa.")+'</p>';
  h+='<div class="reader dropcap">'+esc(body)+'</div>';
  h+='<button class="btn primary block" id="closePray">'+esc(T("Close","Inchide"))+'</button>';
  openSheet(h);
  var b=document.getElementById("closePray");
  if(b){b.onclick=closeSheet;}
}
function openNameDay(){
  var hits=state.nameQuery?Liturgical.nameday(state.nameQuery):[];
  var list=hits.slice(0,6).map(function(h){return '<div class="item"><h3>'+esc(h.name_en)+'</h3><p>'+esc(h.name_ro)+'</p></div>';}).join("");
  var h="";
  h+='<div class="grab"></div>';
  h+='<h2>'+T("Name-day (saint) lookup","Ziua de nume")+'</h2>';
  h+='<div class="searchbar">'+ic("search")+'<input id="roeaName" placeholder="'+esc(T("Search a name","Cauta un nume"))+'"></div>';
  h+='<div class="list">'+list+'</div>';
  openSheet(h);
  var q=document.getElementById("roeaName");
  if(q){q.oninput=function(){state.nameQuery=q.value;renderList();};}
}
function openDonate(){
  var h="";
  h+='<div class="grab"></div>';
  h+='<h2>'+esc(T("Donate to the Episcopate","Donatii catre Episcopie"))+'</h2>';
  h+='<p class="sub">'+esc(T("Your gift supports missions, youth and clergy care.","Dania dumneavoastra sustine misiunea si tineretul."))+'</p>';
  h+='<div class="give-amt"><button>10</button><button class="active">25</button><button>50</button><button>100</button></div>';
  h+='<button class="btn crimson block">'+esc(T("Give now","Doneaza acum"))+'</button>';
  openSheet(h);
}
function openMore(){
  var h="";
  h+='<div class="grab"></div>';
  h+='<div class="list">';
  h+='<div class="item" data-open="prayer"><h3>'+esc(T("Prayer of the Day","Rugaciunea zilei"))+'</h3></div>';
  h+='<div class="item" data-open="nameDay"><h3>'+esc(T("Name-day Lookup","Ziua de nume"))+'</h3></div>';
  h+='<div class="item" data-open="donate"><h3>'+esc(T("Donate","Donatii"))+'</h3></div>';
  h+='<div class="item" data-open="prayerBook"><h3>'+esc(T("Prayer Book","Cartea de rugaciuni"))+'</h3><span class="chev">'+ic("chev")+'</span></div>';
  h+='<div class="item" data-open="parishes"><h3>'+esc(T("Parishes","Parohii"))+'</h3></div>';
  h+='</div>';
  openSheet(h);
  wireCardClicks();
}
function openSheet(html){
  closeSheet();
  var root=document.getElementById("sheet-root");
  var ov=document.createElement("div");ov.className="overlay";ov.onclick=closeSheet;
  var s=document.createElement("div");s.className="sheet";s.innerHTML=html;
  root.appendChild(ov);root.appendChild(s);
}
function closeSheet(){var r=document.getElementById("sheet-root");r.innerHTML="";}
function wireCardClicks(){
  $$("[data-open]").forEach(function(el){el.onclick=function(){var o=el.getAttribute("data-open");var id=el.getAttribute("data-id");
    if(o==="message"){openMessage(id);}else if(o==="prayer"){openPrayer();}else if(o==="nameDay"){openMore();}else if(o==="prayerBook"){openPrayers();}
    else if(o==="parish"){};};});
}
function renderList(){
  var v=document.querySelector("#view");
  var routes={today:screenToday,calendar:screenCalendar,news:screenNews,youth:screenYouth,parishes:screenParishes};
  var root='';
  try{root=(routes[state.route]||screenToday)();}catch(err){root='<div style="padding:22px">ERR: '+esc(String(err&&err.message||err))+'</div>';}
  v.innerHTML='<div class="screen">'+root+"</div>";
  v.scrollTop=0;
  wireCardClicks();wireInline();
}
function wireInline(){
  var prev=document.getElementById("prevM"),next=document.getElementById("nextM");
  if(prev){prev.onclick=function(){if(--state.calM<1){state.calM=12;state.calY--;}renderList();};}
  if(next){next.onclick=function(){if(++state.calM>12){state.calM=1;state.calY++;}renderList();};}
  $$(".day[data-iso]").forEach(function(el){el.onclick=function(){state.calSel=Number(el.getAttribute("data-iso"));renderList();};});
  $$("[data-mode]").forEach(function(el){el.onclick=function(){state.mode=el.getAttribute("data-mode");renderList();};});
  $$("[data-msgf]").forEach(function(el){el.onclick=function(){state.msgFilter=el.getAttribute("data-msgf");renderList();};});
  var par=document.getElementById("parQ");if(par){par.oninput=function(){var q=par.value.toLowerCase();renderParishes(q);};}
}
function renderParishes(q){
  var list=PARISHES.filter(function(p){return !q||(p.name+" "+p.city).toLowerCase().indexOf(q)>=0;});
  var v=document.getElementById("parList");if(v){var container=document.getElementById("view");}
}
function go(route){
  state.route=route;
  $$("#tabbar .tab").forEach(function(t){t.classList.toggle("active",t.getAttribute("data-route")===route);});
  renderList();
}
function wireTabs(){
  $$("#tabbar .tab").forEach(function(t){t.addEventListener("click",function(){go(t.getAttribute("data-route"));closeSheet();});});
}
document.addEventListener("DOMContentLoaded",function(){
  wireTabs();
  var lang=document.getElementById("btn-lang");
  if(lang){lang.onclick=function(){state.lang=state.lang==="en"?"ro":"en";lang.textContent=state.lang==="en"?"RO":"EN";renderList();};}
  setTimeout(function(){var sp=document.getElementById("splash");var app=document.getElementById("app");if(sp){sp.classList.add("hide");}if(app){app.hidden=false;}setTimeout(function(){if(sp){sp.parentNode.removeChild(sp);}},500);go("today");},900);
});
/* ========= improvement layer ========= */
const AVATARS={N:"#7a2236",A:"#6e1f2f",DA:"#3a5a40",S:"#6b5b3e",M:"#31506e",G:"#5d3b52",V:"#2f6b5e",K:"#4a445c",C:"#2f5f7a"};
function avatarColor(n){return AVATARS[n]||"#44628c";}
function avatarHtml(n,sz){var c=avatarColor(n);return '<span class="av '+(n||"")+'" style="background:'+c+';color:#fff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;width:'+((sz||42))+'px;height:'+((sz||42))+'px;border-radius:'+(((sz||42)>50)?22:14)+'px">'+((n||"?").slice(0,1))+'</span>';}
function applyTheme(){document.documentElement.setAttribute("data-theme",state.theme||"blue");}
function setTheme(t){state.theme=t;applyTheme();try{localStorage.setItem("roea.theme",t);}catch(e){}
  $$(".theme-sel").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-theme")===t);});}
function toggleRow(label,key){
  return '<div class="set-opt"><span>'+esc(label)+'</span><label class="switch"><input type="checkbox" data-k="'+key+'" checked checked><span class="slider"></span></label></div>';
}
function openSettings(){
  var h="";
  h+='<div class="grab"></div>';
  h+='<h2>'+esc(T("Settings","Setari"))+'</h2>';
  h+='<div class="set-title-in">'+esc(T("Notifications","Notificari"))+'</div>';
  h+='<div class="set-group">';
  h+=toggleRow(T("Daily saint and Synaxarion","Pomenirile zilnice si Sinaxar"),"syn");
  h+=toggleRow(T("Daily prayer reminder","Reamintire rugaciune zilnica"),"pray");
  h+=toggleRow(T("Important feast days","Zilele de sarbatoare"),"feast");
  h+=toggleRow(T("New articles and magazine","Articole noi si revista"),"art");
  h+=toggleRow(T("New videos","Video noi"),"vid");
  h+=toggleRow(T("Youth events and activities","Evenimente pentru tineret"),"yt");
  h+="</div>";
  h+='<div class="set-title-in">'+esc(T("Appearance","Aspect"))+'</div>';
  h+='<div class="set-group"><div class="themes">';
  h+='<button class="theme-sel '+(state.theme!=="burgundy"?"active":"")+'" data-theme="blue">'+esc(T("Blue","Albastru"))+'</button>';
  h+='<button class="theme-sel '+(state.theme==="burgundy"?"active":"")+'" data-theme="burgundy">'+esc(T("Burgundy","Burgund"))+'</button>';
  h+="</div></div>";
  h+='<div class="set-title-in">'+esc(T("Account","Cont"))+'</div>';
  h+='<div class="set-group">';
  h+='<div class="item" data-open="profile"><h3>'+esc(T("My Profile","Profilul meu"))+'</h3></div>';
  h+='<div class="item" data-open="prayers"><h3>'+esc(T("Prayer Book","Cartea de rugaciuni"))+'</h3></div>';
  h+="</div>";
  openSheet(h);
  $$(".theme-sel").forEach(function(b){b.onclick=function(){setTheme(b.getAttribute("data-theme"));};});
  $$("[data-open]").forEach(function(el){el.onclick=function(){var o=el.getAttribute("data-open");if(o==="profile"){openProfile();}else if(o==="prayers2"){}else if(o==="prayers"){openPrayers();}};});
}
function openProfile(){
  var n=state.profileName||T("Friend of the Episcopate","Prietene al Episcopiei");
  var h="";
  h+='<div class="grab"></div>';
  h+='<div class="prof-top">';
  h+=avatarHtml(state.profileIcon||"N",64);
  h+="</div>";
  h+='<h2 style="text-align:center">'+esc(n)+"</h2>";
  h+='<p class="sub" style="text-align:center">'+esc(T("Member of the ROEA community","Membru al comunitatii ROEA"))+'</p>';
  h+='<div class="set-group"><div class="set-line"><span>'+esc(T("Language","Limba"))+'</span><b>'+esc(state.lang==="en"?"English":"Roman")+'</b></div>'
  +'<div class="set-line"><span>'+esc(T("Theme","Tema"))+'</span><b>'+esc(state.theme==="burgundy"?"Burgundy":"Blue")+'</b></div>'
  +'<div class="set-line"><span>'+esc(T("Notifications","Notificari"))+'</span><b>'+esc(T("Enabled","Active"))+'</b></div></div>';
  h+='<div class="set-title-in">'+esc(T("Saved","Salvate"))+'</div>';
  h+='<div class="set-group"><div class="set-line">'+esc(T("3 prayers saved","3 rugaciuni salvate"))+'</div></div>';
  h+='<div class="set-title-in">'+esc(T("Recently viewed","Vazute recent"))+'</div>';
  h+='<div class="set-group"><div class="set-line">'+esc(T("Synaxarion of today","Sinaxarul zilei"))+'</div></div>';
  h+='<div class="set-title-in">'+esc(T("Account & Privacy","Cont si confidentialitate"))+'</div>';
  h+='<div class="set-group"><div class="item"><h3>'+esc(T("Account settings","Setari de cont"))+'</h3></div>'
  +'<div class="item"><h3>'+esc(T("Privacy","Confidentialitate"))+'</h3></div></div>';
  h+='<button class="btn outline block" id="signOut">'+esc(T("Sign out","Iesire din cont"))+'</button>';
  openSheet(h);
  var so=document.getElementById("signOut");if(so){so.onclick=function(){try{localStorage.removeItem("roea.session");}catch(e){}
  var lg=document.getElementById("login");if(lg){lg.hidden=false;}var app=document.getElementById("app");if(app){app.hidden=true;}};}
}
function vsp(img,title,dur){
  return '<div class="video-spot" data-open="videoplay"><img class="vp" src="'+img+'" alt=""><div class="play">'+ic("play")+'</div><span class="vt">'+esc(title)+'</span><span class="tag-time">'+(dur||"2:40")+"</span></div>";
}
function msgCard(m){
  var lang=state.lang==="en";
  var title=lang?(m.title_en||m.title):(m.title_ro||m.title);
  var body=(lang?(m.body_en||m.body_ro||""):(m.body_ro||m.body_en||""));
  var h="";
  h+='<div class="item" data-open="message" data-id="'+m.id+'">';
  if(m.has_video){h+=vsp(m.th||"assets/featured-homily.jpg",title,m.dur);}
  else if(m.image){h+='<div class="thumb"><img src="assets/youth-picnic.jpg" alt=""><span>'+esc(m.occasion||T("Newsletter","Revista"))+"</span></div>";}
  h+='<div class="hier" style="align-items:center">'+avatarHtml(m.icon||"N")+'<div><b>'+esc(m.author)+"</b><span> "+esc(m.date?fmtDate(m.date):(m.meta||""))+"</span></div></div>";
  h+='<h3>'+esc(title)+"</h3><p>"+esc(body.slice(0,120))+"…</p>";
  h+='<div class="meta">'+esc(m.occasion||"")+((m.tags||[]).map(function(t){return '<span class="tag">'+esc(t)+"</span>";}).join(""))+"</div>";
  h+="</div>";
  return h;
}
function screenYouth(){
  var h="";
  h+='<h1 class="screen-title">'+esc(T("Youth","Tineret"))+'</h1>';
  h+='<p class="sub">'+esc(T("Camps, hikes, choirs, retreats and fellowship.","Tabere, drumetii, coruri si prietenie."))+"</p>";
  h+='<div class="ypgal">';
  [["assets/youth-hike.jpg",""],["assets/youth-campfire.jpg",""],["assets/youth-sports.jpg",""]].forEach(function(p){h+='<img class="yp" src="'+p[0]+'" alt="">';});
  h+="</div>";
  h+='<div class="section-title">'+esc(T("Activities","Activitati"))+"</div>";
  h+='<div class="list">';
  function youthP(i){return ["assets/youth-hike.jpg","assets/youth-campfire.jpg","assets/youth-choir.jpg","assets/youth-sports.jpg","assets/youth-picnic.jpg","assets/youth-volunteer.jpg"][i%6];}
  YOUTH_ACTIVITIES.forEach(function(a,i){h+='<div class="item yact"><div class="yact-img"><img src="'+youthP(i)+'" alt=""></div><div style="flex:1"><h3>'+esc(T(a.t,a.t_ro))+'</h3><div class="meta">'+esc(a.when)+" · "+esc(a.place)+"</div></div></div>";});
  h+="</div>";
  h+='<div class="section-title">'+esc(T("Videos","Video"))+"</div>";
  h+='<div class="list">';
  h+=vsp("assets/youth-campfire.jpg",T(YOUTH_VIDEOS[0].title,YOUTH_VIDEOS[0].title_ro),YOUTH_VIDEOS[0].dur);
  h+=vsp("assets/youth-choir.jpg",T(YOUTH_VIDEOS[1].title,YOUTH_VIDEOS[1].title_ro),YOUTH_VIDEOS[1].dur);
  h+="</div>";
  h+='<div class="section-title">'+esc(T("In action","In actiune"))+"</div>";
  h+='<div class="list">'+vsp("assets/youth-volunteer.jpg",T("Volunteer day in the parish","Zi de voluntariat in parohie"),"3:12")+"</div>";
  return h;
}
function synaxShort(f){
  if(!f) return "";
  var nm=(state.lang==="en")?f.name_en:f.name_ro;
  var txt=(state.lang==="en")
  ?"The Holy Orthodox Church commemorates today "+nm+". In the Synaxarion of the day are kept the memory of the saint, the significance of the feast and the spiritual inheritance handed down through generations."
  :"Biserica pomeneste astazi "+feastLabel(f)+". In Sinaxarul zilei se pastreaza amintirea sfantului, semnificatia praznicului si invatatura duhovniceasca transmisa din generatie in generatie.";
  return txt;
}
function openSynaxarion(feastName){
  openSheet('<div class="grab"></div><div class="eyebrow">'+T("Synaxarion of the Day","Sinaxarul zilei")+'</div><h2>'+esc(feastName||"Saint of the day")+'</h2><div class="reader dropcap">'+esc("Saint of the day, patron and example for us. May we follow the faith and witness of the blessed ones, striving to glorify God in our own lives.")+'</div><button class="btn primary block" id="clSyn">'+esc(T("Close","Inchide"))+"</button>");
  var b=document.getElementById("symSyn");b=b||document.getElementById("symSyn");
  var q=document.getElementById("clSyn");if(q){q.onclick=closeSheet;}
}
function screenCalendar(){
  var g=Liturgical.monthGrid(state.calY,state.calM,state.mode);
  var sel=state.calSel||Math.abs(Date.UTC(state.calY,state.calM-1,new Date().getUTCDate()));
  var selDate=new Date(sel);
  var iso=selDate.getUTCFullYear()+"-"+pad(selDate.getUTCMonth()+1)+"-"+pad(selDate.getUTCDate());
  var f=Liturgical.feastFor(iso,state.mode);
  var h="";
  h+='<h1 class="screen-title">'+esc(T("Calendar","Calendar"))+'</h1>';
  h+='<div class="seg"><button class="'+(state.mode==="new"?"active":"")+'" data-mode="new">'+esc(T("New (Revised Julian)","Nou"))+'</button><button class="'+(state.mode==="old"?"active":"")+'" data-mode="old">'+esc(T("Old (Julian)","Vechi"))+"</button></div>";
  h+='<div class="card pad0"><div class="month-head"><button id="prevM">&#8249;</button><h3>'+esc(new Date(Date.UTC(state.calY,state.calM-1,1)).toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{month:"long",year:"numeric"}))+'</h3><button id="nextM">&#8250;</button></div>';
  h+='<div class="dow">'+["S","M","T","W","T","F","S"].map(function(d){return "<span>"+esc(d)+"</span>";}).join("")+"</div>";
  h+='<div class="grid">'+g.cells.map(function(c){if(!c){return '<div class="day blank"></div>';}var cls="day";if(c.iso===sel){cls+=" today";}if(c.feast){cls+=" feat";}if(c.level==="strict"){cls+=" fast-s";}return '<button class="'+cls+'" data-iso="'+c.iso+'"><span class="n">'+c.d+"</span>"+(c.feast?'<span class="dot"></span>':"")+"</button>";}).join("")+"</div>";
  h+="</div>";
  /* Saint of the Day */
  h+='<div class="syn-card">';
  h+='<img src="assets/saint-icon.jpg" alt="" class="syn-icon">';
  h+='<div style="flex:1"><div class="eyebrow">'+esc(T("Saint of the Day","Sfantul zilei"))+'</div>';
  h+='<b>'+esc(f?(state.lang==="en"?f.name_en:f.name_ro):T("Memory of the saints","Pomenirea sfintilor"))+"</b>";
  h+='<p>'+esc(synShort(f))+"</p>";
  h+='<button class="btn primary block" data-open="syn">'+esc(T("Read the Synaxarion","Citeste Sinaxarul"))+"</button>";
  h+="</div></div>";
  return h;
}
const CREED_EN=[
"I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.",
"And in one Lord Jesus Christ, the Son of God, the Only-begotten, begotten of the Father before all ages. Light of Light, true God of true God, begotten, not made; of one essence with the Father, by Whom all things were made.",
"Who for us men and for our salvation came down from heaven, and was incarnate of the Holy Spirit and the Virgin Mary, and became man.",
"And He was crucified for us under Pontius Pilate, and suffered and was buried.",
"And the third day He rose again, according to the Scriptures.",
"And ascended into heaven, and sits at the right hand of the Father.",
"And He shall come again with glory to judge the living and the dead, Whose Kingdom shall have no end.",
"And in the Holy Spirit, the Lord, the Giver of Life, Who proceeds from the Father, Who together with the Father and the Son is worshipped and glorified, Who spoke by the prophets.",
"In One, Holy, Catholic, and Apostolic Church.",
"I confess one Baptism for the remission of sins.",
"I look for the resurrection of the dead.",
"And the life of the age to come. Amen."
];
function openPrayers(){
  var h="";
  h+='<div class="grab"></div>';
  h+='<h2>'+esc(T("Prayer Book","Cartea de rugaciuni"))+'</h2>';
  h+='<p class="sub">'+esc(T("Choose a prayer to read, in Romanian or English.","Alegeti o rugaciune de citit, in romana sau engleza."))+'</p>';
  h+='<div class="set-title-in">'+esc(T("Essential Prayers","Rugaciuni de temelie"))+'</div><div class="set-group">';
  h+='<div class="item" data-pray="tata"><h3>'+esc(T("Our Father","Tatal nostru"))+'</h3><span class="chev">'+ic("chev")+"</span></div>";
  h+='<div class="item" data-pray="morn"><h3>'+esc(T("Morning Prayer","Rugaciune de dimineata"))+'</h3><span class="chev">'+ic("chev")+"</span></div>";
  h+='<div class="item" data-pray="creed"><h3>'+esc(T("The Creed (English)","Crezul (engleza)"))+'</h3><span class="chev">'+ic("chev")+"</span></div>";
  h+="</div>";
  h+='<p class="sub" style="margin-top:12px">'+esc(T("Evening prayers, Psalm 50 and Marian hymns are being prepared for a future update.","Rugaciunile de seara, Psalmul 50 si imarele mariale vor fi adaugate intr-o actualizare viitoare."))+"</p>";
  openSheet(h);
  $$("#sheet-root [data-pray]").forEach(function(el){el.onclick=function(){openPrayerSheet(el.getAttribute("data-pray"));};});
}
function openPrayerSheet(k){
  var title="",rows=[];
  if(k==="tata"){title=T("Our Father","Tatal nostru");rows=[["EN",PRAYERS.en],["RO",PRAYERS.ro]];}
  else if(k==="morn"){title=T("Morning Prayer","Rugaciune de dimineata");rows=[["EN",MORNING_PRAYER.en],["RO",MORNING_PRAYER.ro]];}
  else if(k==="creed"){title=T("The Creed","Crezul");rows=[["EN",CREED_EN.join(" ")]];}
  var h="";
  h+='<div class="grab"></div>';
  h+='<div class="eyebrow">'+esc(T("Prayer","Rugaciune"))+'</div>';
  h+='<h2>'+esc(title)+"</h2>";
  rows.forEach(function(r){h+='<div class="pray-lang">'+esc(r[0])+'</div><div class="reader dropcap"><p>'+esc(r[1])+"</p></div>";});
  h+='<button class="btn primary block" id="closePray2">'+esc(T("Close","Inchide"))+"</button>";
  openSheet(h);
  var b=document.getElementById("closePray2");if(b){b.onclick=closeSheet;}
}
function wireCardClicks(){
  $$("[data-open]").forEach(function(el){el.onclick=function(){var o=el.getAttribute("data-open");var id=el.getAttribute("data-id");
    if(o==="message"){openMessage(id);}
    else if(o==="prayer"||o==="prayers"){openPrayers();}
    else if(o==="syn"){var f=todayFeast();openSynaxarion((f&&(state.lang==="en"?f.name_en:f.name_ro))||"Saint of the day");}
    else if(o==="profile"){openProfile();}
    else if(o==="donate"){openDonate();}
    else if(o==="nameDay"){openMore();}
    else if(o==="more"){openMore();}
  };});
}
function initHook(){
  try{state.theme=localStorage.getItem("roea.theme")||"blue";}catch(e){state.theme="blue";}
  applyTheme();
  var sb=document.getElementById("btn-settings");
  if(sb){sb.onclick=function(){openSettings();};}
  var lb=document.getElementById("btn-lang");
  if(lb){lb.onclick=function(){state.lang=state.lang==="en"?"ro":"en";lb.textContent=state.lang==="en"?"RO":"EN";renderList();};}
}
document.addEventListener("DOMContentLoaded",function(){initHook();});


function screenCalendar(){
  try{
    var m=en=[["January","Ianuarie"],["February","Februarie"],["March","Martie"],["April","Aprilie"],["May","Mai"],["June","Iunie"],["July","Iulie"],["August","August"],["September","Septembrie"],["October","Octombrie"],["November","Noiembrie"],["December","Decembrie"]];
    var g=Liturgical.monthGrid(state.calY||new Date().getUTCFullYear(),state.calM||new Date().getUTCMonth()+1,state.mode);
    var cells=g&&g.cells||[];
    var sel=state.calSel||Date.UTC(state.calY||2026,((state.calM||1)-1),1);
    var monthName=(m[(state.calM||1)-1][state.lang==="ro"?1:0])+" "+(state.calY||2026);
    var h="";
    h+='<h1 class="screen-title">'+esc(T("Calendar","Calendar"))+'</h1>';
    h+='<div class="seg"><button class="'+((state.mode||"new")==="new"?"active":"")+'" data-mode="new">'+esc(T("New (Revised Julian)","Nou"))+'</button>';
    h+='<button class="'+((state.mode||"new")==="old"?"active":"")+'" data-mode="old">'+esc(T("Old (Julian)","Vechi"))+'</button></div><div class="card pad0">';
    h+='<div class="month-head"><button id="prevM">&#8249;</button><h3>'+esc(monthName)+'</h3><button id="nextM">&#8250;</button></div>';
    h+='<div class="dow">'+["S","M","T","W","T","F","S"].map(function(x){return "<span>"+x+"</span>";}).join("")+"</div>";
    h+='<div class="grid">';
    cells.forEach(function(c){if(!c){h+='<div class="day blank"></div>';return;}
      var cls="day";if(c.iso===sel){cls+=" today";}if(c.feast){cls+=" feat";}if(c.level==="strict"){cls+=" fast-s";}
      h+='<button class="'+cls+'" data-iso="'+c.iso+'"><span class="n">'+c.d+"</span>"+(c.feast?'<span class="dot"></span>':"")+"</button>";
    });
    h+="</div></div>";
    var f=cells.filter(function(c){return c&&c.iso===sel;})[0];
    var feast=(f&&f.feast)||null;
    h+='<div class="syn-card"><img src="assets/saint-icon.jpg" class="syn-icon" alt="">';
    h+='<div style="flex:1"><div class="eyebrow">'+esc(T("Saint of the Day","Sfantul zilei"))+"</div>";
    h+='<b>'+esc(feast?(state.lang==="en"?feast.name_en:feast.name_ro):T("Memory of the saints","Pomenirea sfintilor"))+"</b>";
    h+='<p>'+esc(feast?(state.lang==="en"?feast.name_en:feast.name_ro):"")+"</p>";
    h+='<button class="btn primary block" data-open="syn">'+esc(T("Read the Synaxarion","Citeste Sinaxarul"))+"</button></div></div>";
    return h;
  }catch(err){return '<div class="screen"><div class="card"><p>'+esc(String(err&&err.message||err))+"</p></div></div>";}
}


function clearLogin(){var lg=document.getElementById("login");if(lg){lg.hidden=true;}}
function requireLogin(){var lg=document.getElementById("login"),app=document.getElementById("app");if(lg){lg.hidden=false;}if(app){app.hidden=true;}}
function handleLogin(){
  var em=document.getElementById("l-email"),pw=document.getElementById("l-pass"),go=document.getElementById("l-go");
  if(!em||!pw||!go){return;}
  go.onclick=function(){
    var e=(em.value||"").trim();
    if(e.indexOf("@")<1){toast(T("Enter a valid email address","Introdu o adresa de email valida"));return;}
    if((pw.value||"").length<6){toast(T("Password must be at least 6 characters","Parola trebuie sa aiba minim 6 caractere"));return;}
    try{localStorage.setItem("roea.session",e);}catch(err){}
    clearLogin();
    var app=document.getElementById("app");if(app){app.hidden=false;}
    go("today");
  };
  var fg=document.getElementById("l-forgot");
  if(fg){fg.onclick=function(){toast(T("Password resets are handled by the Chancery","Resetarea parolei se face la Cancelarie"));};}
}
function bootLogin(){
  var session=false;try{session=!!localStorage.getItem("roea.session");}catch(e){session=false;}
  if(session){clearLogin();var app=document.getElementById("app");if(app){app.hidden=false;}}
  handleLogin();
}
document.addEventListener("DOMContentLoaded",function(){bootLogin();});

})();
