/* ROEA app — frame */
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
const fmtDayName=()=>today.toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{weekday:"long"});
const fmtDayNum=()=>today.toLocaleDateString(state.lang==="en"?"en-US":"ro-RO",{day:"numeric",month:"long"});
const PART={m:{en:"Good morning",ro:"Bună dimineața"},a:{en:"Good afternoon",ro:"Bună ziua"},e:{en:"Good evening",ro:"Bună seara"}};
function greeting(){const h=new Date().getHours();const p=h<12?PART.m[state.lang]:h<18?PART.a[state.lang]:PART.e[state.lang];return p+", "+state.profileName+".";}
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
function ic(n){const p=ICONS[n]||"";return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+"</svg>";}
function rankLabel(r){const m={pascha:"Great Feast",great:"Great Feast",feast:"Feast",polyeleos:"Polyeleos",rank:"Commemoration",triodion:"Sunday"};return m[r]||"Commemoration";}