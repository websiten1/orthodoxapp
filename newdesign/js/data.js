// Content seed for the ROEA "newdesign" preview — ported from the Claude Design
// canvas (ROEA App.dc.html). Structure mirrors ../../js/data.js conventions
// (RO/EN pairs, no build step).
"use strict";

const MONTHS_RO = ["IANUARIE","FEBRUARIE","MARTIE","APRILIE","MAI","IUNIE","IULIE","AUGUST","SEPTEMBRIE","OCTOMBRIE","NOIEMBRIE","DECEMBRIE"];
const MONTHS_EN = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
const DNAMES_RO = ["LUNI","MARȚI","MIERCURI","JOI","VINERI","SÂMBĂTĂ","DUMINICĂ"];
const DNAMES_EN = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];

// Day records are keyed for August 2026 (the month the design was authored for).
// Navigating to any other month reuses the generic isFast()-based fallback below —
// this mirrors the source canvas exactly (its script also hard-codes Date(2026,7,d)).
const DAYS = {
  6:  { ro:{s:"Schimbarea la Față a Domnului", f:"Schimbarea la Față", fast:"Dezlegare la pește", ap:"2 Petru 1, 10–19", ev:"Matei 17, 1–9", trop:"Schimbatu-Te-ai la Față în munte, Hristoase Dumnezeule, arătând ucenicilor Tăi slava Ta, pe cât li se putea."},
       en:{s:"Transfiguration of the Lord", f:"Transfiguration", fast:"Fish allowed", ap:"2 Peter 1:10–19", ev:"Matthew 17:1–9", trop:"Thou wast transfigured on the mount, O Christ God, revealing Thy glory to Thy disciples as far as they could bear it."} },
  13: { ro:{s:"Sfântul Cuvios Maxim Mărturisitorul", f:"Odovania Schimbării la Față", fast:"Postul Adormirii — dezlegare la untdelemn și vin", ap:"1 Cor. 14, 6–19", ev:"Matei 20, 17–28", trop:"Biserica pomenește astăzi aducerea moaștelor Sfântului Maxim, mărturisitorul celor două voințe ale lui Hristos, închis și schingiuit pentru dreapta credință."},
       en:{s:"St Maximus the Confessor", f:"Leavetaking of the Transfiguration", fast:"Dormition Fast — wine and oil allowed", ap:"1 Cor. 14:6–19", ev:"Matthew 20:17–28", trop:"The Church commemorates today the translation of the relics of St Maximus, confessor of the two wills of Christ, imprisoned and maimed for the true faith."} },
  15: { ro:{s:"Adormirea Maicii Domnului", f:"Adormirea Maicii Domnului", fast:"Dezlegare la toate", ap:"Filipeni 2, 5–11", ev:"Luca 10, 38–42", trop:"Întru naștere fecioria ai păzit, întru adormire lumea nu ai părăsit, de Dumnezeu Născătoare."},
       en:{s:"Dormition of the Theotokos", f:"Dormition of the Theotokos", fast:"No fast", ap:"Philippians 2:5–11", ev:"Luke 10:38–42", trop:"In giving birth thou didst preserve thy virginity; in thy dormition thou didst not forsake the world, O Theotokos."} },
  29: { ro:{s:"Tăierea capului Sfântului Ioan Botezătorul", f:"Tăierea capului Sfântului Ioan", fast:"Post aspru", ap:"Fapte 13, 25–33", ev:"Marcu 6, 14–30", trop:"Pomenirea dreptului se face cu laude, iar ție destul îți este mărturia Domnului, Înaintemergătorule."},
       en:{s:"Beheading of St John the Baptist", f:"Beheading of St John", fast:"Strict fast", ap:"Acts 13:25–33", ev:"Mark 6:14–30", trop:"The memory of the righteous is celebrated with hymns of praise, but the Lord's testimony is sufficient for thee, O Forerunner."} }
};
const FEASTS = [6, 15, 29];

const ISSUES = [
  { year:2026, pages:40, ro:["Solia — Paști 2026","Salutări pascale, pastorala Paștilor"], en:["Solia — Pascha 2026","Resurrection greetings, Paschal pastoral"] },
  { year:2026, pages:52, ro:["Solia — Iarna 2026","Număr de Crăciun, necrologuri, aniversări"], en:["Solia — Winter 2026","Nativity special, obituaries, anniversaries"] },
  { year:2025, pages:44, ro:["Solia — Toamna 2025","Adunarea eparhială, congresul tineretului"], en:["Solia — Autumn 2025","Diocesan assembly, youth congress"] },
  { year:2025, pages:64, ro:["Solia — Paști 2025","125 de ani de la înființarea Episcopiei"], en:["Solia — Pascha 2025","125th anniversary of the Episcopate"] },
  { year:2024, pages:38, ro:["Solia — Vara 2024","Reportaj foto din tabără, clerici noi"], en:["Solia — Summer 2024","Camp photo report, new clergy"] },
  { year:2023, pages:56, ro:["Solia — Iarna 2023","Numărul centenarului"], en:["Solia — Winter 2023","Centennial issue"] },
  { year:1987, pages:32, ro:["Solia — Primăvara 1987 (arhivă)","Digitizare istorică — jubilee parohiale"], en:["Solia — Spring 1987 (archival)","Historical digitization — parish jubilees"] }
];

const CURRENT_ISSUE = {
  pages: 48,
  ro: ["Solia — Număr special de vară 2026", "Raport sinodal, hirotoniri, viața parohiilor"],
  en: ["Solia — Special Summer 2026", "Synodal report, ordinations, parish life"]
};

const YOUTH = [
  { img:"../assets/youth-hike.jpg", when:"22 VII – 1 VIII", ro:["Tabăra de vară — Cheile Bicazului","Cheile Bicazului"], en:["Summer Camp — Bicaz Gorges","Bicaz Gorges"] },
  { img:"../assets/youth-choir.jpg", when:"29 VIII", ro:["Festivalul tineretului — Vecernia cu corul","Sf. Gheorghe, Madison"], en:["Youth Festival & Choir Vespers","St George, Madison"] },
  { img:"../assets/youth-picnic.jpg", when:"17–18 X", ro:["Ritirul de toamnă pentru tineri","Sfânta Cruce, Boston"], en:["Fall Retreat for Young Adults","Holy Cross, Boston"] },
  { img:"../assets/youth-sports.jpg", when:"SĂPTĂMÂNAL", ro:["Școala duminicală — toate parohiile","În fiecare parohie"], en:["Sunday School — all parishes","Every parish"] },
  { img:"../assets/youth-volunteer.jpg", when:"8 XI", ro:["Întâlnirea tinerilor cu ierarhii","Centrul Eparhial"], en:["Youth Assembly with the Hierarchs","Diocesan Centre"] }
];

const PARISHES = [
  { ro:"Sfântul Mare Mucenic Gheorghe", en:"St George the Great Martyr", priest:"Pr. Ion Popescu", city:"Madison, WI", deanery:"MIDWEST" },
  { ro:"Pogorârea Sfântului Duh", en:"Descent of the Holy Spirit", priest:"Pr. Vasile Ionescu", city:"Cleveland, OH", deanery:"MIDWEST" },
  { ro:"Sfântul Apostol Andrei", en:"St Andrew the First-Called", priest:"Pr. Mihai Georgescu", city:"Chicago, IL", deanery:"MIDWEST" },
  { ro:"Intrarea în Biserică a Maicii Domnului", en:"Presentation of the Theotokos", priest:"Pr. Gheorghe Dumitrescu", city:"Detroit, MI", deanery:"MIDWEST" },
  { ro:"Sfânta Cuvioasă Parascheva", en:"St Paraskevi", priest:"Pr. Ștefan Constantinescu", city:"Cambridge, ON", deanery:"ONTARIO" },
  { ro:"Sfântul Ioan Botezătorul", en:"St John the Baptist", priest:"Pr. Nicolae Munteanu", city:"Los Angeles, CA", deanery:"WEST" },
  { ro:"Sfinții Arhangheli", en:"The Holy Archangels", priest:"Pr. Adrian Petrescu", city:"Seattle, WA", deanery:"WEST" },
  { ro:"Sfântul Ierarh Nicolae", en:"St Nicholas", priest:"Pr. Corneliu Radu", city:"New York, NY", deanery:"EAST" },
  { ro:"Sfânta Cruce", en:"Holy Cross", priest:"Pr. Silviu Lupașcu", city:"Boston, MA", deanery:"EAST" },
  { ro:"Sfinții Constantin și Elena", en:"Sts Constantine & Helen", priest:"Pr. Dan Ardelean", city:"Calgary, AB", deanery:"CANADA" }
];

const WEEKLY = [12,15,14,18,22,26,31,29,34,38,41,37];

// News feed (Știri). `cat` powers the category filter tabs (all/pastoral/synodal).
// Tapping the "homily" item opens the full reading screen (Cuvântul Ierarhului).
const NEWS = [
  {
    id: "homily-dormition", cat: "pastoral", homily: true,
    img: "../assets/youth-picnic.jpg",
    kicker: { ro:"ADORMIREA · 14 VIII 2026", en:"DORMITION · 14 AUG 2026" },
    title: { ro:"Cuvânt pastoral la Adormirea Maicii Domnului", en:"Pastoral Letter on the Dormition of the Theotokos" },
    excerpt: { ro:"Preacuvios Părinte, iubiți fii duhovnicești, în postul care se deschide astăzi Biserica ne cheamă să urmăm pe Maica Domnului…", en:"Beloved in the Lord, as this fast opens today the Church calls us to follow the Mother of God…" },
    by: "Preasfințitul Părinte Nathaniel"
  },
  {
    id: "synod-clergy", cat: "synodal",
    kicker: { ro:"ANUNȚ SINODAL · 2 VIII 2026", en:"SYNODAL ANNOUNCEMENT · 2 AUG 2026" },
    title: { ro:"Hotărâre sinodală privind formarea continuă a clerului", en:"Synodal Decision on Clergy Continuing Education" },
    excerpt: { ro:"În sesiunea de vară, Adunarea Eparhială a aprobat un program de formare continuă pentru clerul Eparhiei, cu aplicare din septembrie.", en:"At its summer session the Diocesan Assembly approved a continuing-education requirement for clergy, to take effect next September." },
    by: { ro:"Adunarea Eparhială", en:"The Diocesan Assembly" }
  },
  {
    id: "st-elijah", cat: "pastoral",
    kicker: { ro:"SFÂNTUL ILIE · 28 VII 2026", en:"ST ELIJAH · 28 JUL 2026" },
    title: { ro:"Gând la Sfântul Ilie — ocrotitorul ploilor și al roadelor", en:"A word on St Elijah — protector of rains and harvests" },
    excerpt: { ro:"Într-o lume secătuită de apă și de sens, să cerem stăruitor darul lacrimilor și al rugăciunii calde.", en:"In a world drained of water and of meaning, let us ask persistently for the gift of tears and of warm prayer." },
    by: "Preasfințitul Părinte Nathaniel"
  },
  {
    id: "youth-video", cat: "general", video: true, duration: "12:40",
    img: "../assets/featured-homily.jpg",
    kicker: { ro:"TINERET · 15 VII 2026", en:"YOUTH · 15 JUL 2026" },
    title: { ro:"Mesaj video de la tabăra de tineret", en:"Video message from the youth camp" }
  },
  {
    id: "sts-peter-paul", cat: "pastoral",
    kicker: { ro:"SFINȚII APOSTOLI · 29 VI 2026", en:"HOLY APOSTLES · 29 JUN 2026" },
    title: { ro:"Sărbătoarea Sfinților Apostoli Petru și Pavel", en:"Feast of the Holy Apostles Peter and Paul" },
    excerpt: { ro:"Sfinții Apostoli Petru și Pavel sunt cele două aripi ale Bisericii: Stânca credinței și Lumina neamurilor.", en:"The Holy Apostles Peter and Paul stand as the two wings of the Church: the Rock of faith and the Light of the nations." }
  }
];

const HOMILY = {
  img: "../assets/featured-homily.jpg",
  kicker: { ro:"CUVÂNT PASTORAL · ADORMIREA MAICII DOMNULUI", en:"PASTORAL LETTER · THE DORMITION" },
  title: { ro:"Cuvânt pastoral la Adormirea Maicii Domnului", en:"Pastoral Letter on the Dormition of the Theotokos" },
  by: "PREASFINȚITUL PĂRINTE NATHANIEL",
  date: "14 august 2026 · Cancelaria Eparhială",
  paragraphs: [
    { ro:"reacuvios Părinte, iubiți fii duhovnicești, în postul care se deschide astăzi, Biserica ne cheamă să urmăm pe Maica Domnului pe calea cumpătării, a rugăciunii și a nădejdii.", en:"reacuvios Părinte — Beloved in the Lord, as this fast opens today, the Church calls us to follow the Mother of God on the path of temperance, prayer and hope.", dropcap:"P" },
    { ro:"Adormirea nu este sfârșit, ci trecere la biruința cea fără de seară. „Ferice de cei ce plâng, că aceia se vor mângâia” — chiar și întristarea are rod, când o aducem înaintea lui Dumnezeu.", en:"The Dormition is not an end but a passage to the unwaning victory. “Blessed are those who mourn, for they shall be comforted” — even sorrow bears fruit when we bring it before God." }
  ],
  pullquote: { ro:"Ferice de cei ce plâng, că aceia se vor mângâia.", en:"Blessed are those who mourn, for they shall be comforted.", ref:"MATEI 5, 4" },
  closing: { ro:"Vă îmbrățișez pe toți cu dragoste în Hristos.", en:"Embracing you all with love in Christ." },
  more: [
    { title: { ro:"Gând la Sfântul Ilie", en:"A word on St Elijah" }, date:"28 VII" },
    { title: { ro:"Sfinții Apostoli Petru și Pavel", en:"The Holy Apostles Peter and Paul" }, date:"29 VI" }
  ]
};

const TODAY_SAINT_IMG = "../assets/saint-icon.jpg";
const TODAY_PRAYER_IMG = "../assets/prayer-icon.jpg";
const TODAY_HOMILY_IMG = "../assets/featured-homily.jpg";
const PARISHES_HERO_IMG = "../assets/hero-cathedral.jpg";
const CATHEDRAL_CAPTION = { ro:"Catedrala Eparhială — Vatra Românească, Grass Lake, Michigan", en:"The Diocesan Cathedral — Vatra Românească, Grass Lake, Michigan" };
