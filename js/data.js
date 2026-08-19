/* ============ The Episcopate — Seed content ============ */

// ---- Bilingual UI strings ----
const I18N = {
  en: {
    app: "ROEA", caption: "Official App",
    full_name: "Romanian Orthodox Episcopate of America",
    t_today:"Today", t_cal:"Calendar", t_word:"Word", t_mag:"Magazine", t_par:"Parishes",
    today_eyebrow:"Today · ",
    nameDay:"Name-day lookup", parish:"Parishes", donate:"Donate", admin:"Admin", settings:"Settings", more:"More",
    moments:"Moments", fast:"Fast today", try_search:"Search name…",
    days_to_pascha:"Days to Pascha", week_of_workshop:"Week of the Sunday", next_great:"Next great feast",
    epistle_gospel:"Epistle · Gospel", quick:"Quick access", bishop_word:"From His Grace",
    featured_video:"Featured — homily of the day",
    word_sub:"Messages, letters & homilies of the hierarch",
    streak_label:"Streak", days_short:"days", streak_note:"keep it going!",
    nameday_sub_short:"find yours", donate_short:"give to mission", chancery_short:"chancery",
    view_all:"see all",
    selected_day:"Selected day", no_commemoration:"No major commemoration",
    magazine:"Solia Magazine", mag_sub:"The archive of the Episcopate",
    par_sub:"Find a parish of the Episcopate",
    close:"Close", no_results:"No results found",
    read_issue:"Read on device", download:"Download", search_issue:"Search inside this issue",
    directions:"Directions", contact:"Contact",
    donate_sub:"Gift to the Episcopate — missions, clergy care, youth ministries.",
    donate_note:"Note to the Chancery", donate_secure:"Your gift is secure and tax-deductible where applicable.",
    nameday_sub:"When is my feast day? Search a name.", nameday_hint:"Type a name to see its feast day",
    language:"Language", calendar_mode:"Calendar", notifications:"Notifications", notif_fast:"Fast reminders", save:"Save",
    panel:"Panel", admin_sub:"Restricted — Chancery staff only", email:"Email", password:"Password",
    sign_in:"Sign in", admin_demo:"Demo — any credentials open the panel",
    admin_dash:"Diocesan Chancery dashboard", stat_users:"Active users", stat_reads:"Messages read",
    stat_push:"Notif. opened", stat_msgs:"Messages sent", usage:"Weekly activity",
    publish:"Publish", msg_title:"Message title", occasion:"Occasion", lang:"Language", body:"Body",
    push_notify:"Send push notification to all users", publish_now:"Publish message",
    add_issue:"Upload magazine issue (PDF)", recent_pub:"Recently published",
  },
  ro: {
    app: "ROEA", caption: "Aplicația Oficială",
    full_name: "Episcopia Ortodoxă Română din America",
    t_today:"Azi", t_cal:"Calendar", t_word:"Cuvânt", t_mag:"Revistă", t_par:"Parohii",
    today_eyebrow:"Azi · ",
    nameDay:"Căutare nume", parish:"Parohii", donate:"Donații", admin:"Admin", settings:"Setări", more:"Mai mult",
    moments:"Momente", fast:"Post azi", try_search:"Caută nume…",
    days_to_pascha:"Zile până la Paști", week_of_workshop:"Săptămâna Duminică", next_great:"Următoarea sărbătoare",
    epistle_gospel:"Apostol · Evanghelia", quick:"Acces rapid", bishop_word:"Cuvântul Ierarhului",
    featured_video:"În prim-plan — predica zilei",
    word_sub:"Mesaje, scrisori și omilii ale ierarhului",
    streak_label:"Seria", days_short:"zile", streak_note:"tot așa!",
    nameday_sub_short:"găsește-ți ziua", donate_short:"sprijină misiunea", chancery_short:"cancelaria",
    view_all:"vezi toate",
    selected_day:"Ziua selectată", no_commemoration:"Fără pomenire majoră",
    magazine:"Revista Solia", mag_sub:"Arhiva Eparhiei",
    par_sub:"Găsește o parohie a Eparhiei",
    close:"Închide", no_results:"Niciun rezultat",
    read_issue:"Citește", download:"Descarcă", search_issue:"Caută în acest număr",
    directions:"Indicații", contact:"Contact",
    donate_sub:"Dăruiește Eparhiei — misiuni, formarea clerului, tineret.",
    donate_note:"Notă către Cancelaria", donate_secure:"Donația ta este securizată și deductibilă fiscal.",
    nameday_sub:"Când este ziua mea de nume? Caută un nume.", nameday_hint:"Scrie un nume pentru a vedea ziua lui de sărbătoare",
    language:"Limbă", calendar_mode:"Calendar", notifications:"Notificări", notif_fast:"Memento de post", save:"Salvează",
    panel:"Panou", admin_sub:"Restricționat — doar Cancelaria", email:"Email", password:"Parolă",
    sign_in:"Autentificare", admin_demo:"Demo — orice date deschid panoul",
    admin_dash:"Panou Cancelarie Eparhială", stat_users:"Utilizatori activi", stat_reads:"Mesaje citite",
    stat_push:"Notificări", stat_msgs:"Mesaje trimise", usage:"Activitate săptămânală",
    publish:"Publicare", msg_title:"Titlul mesajului", occasion:"Ocazie", lang:"Limbă", body:"Text",
    push_notify:"Trimite notificare push tuturor utilizatorilor", publish_now:"Publică mesaj",
    add_issue:"Încarcă revistă (PDF)", recent_pub:"Publicate recent",
  }
};

// ---- Bishop's Word (bilingual) ----
const MESSAGES = [
  {
    id:"m1", date:"2026-08-14", lang:"ro", tags:["pastoral","en","ro"], image:true,
    title:"Cuvânt pastoral la Adormirea Maicii Domnului",
    title_en:"Pastoral Letter on the Dormition of the Theotokos",
    author:"His Grace Bishop Nathaniel",
    body_ro:"Preacuvios Părinte, iubiți fii duhovnicești,\n\nÎn postul care se deschide astăzi, Biserica ne cheamă să urmăm pe Maica Domnului pe calea cumpătării, a rugăciunii și a nădejdii. Adormirea nu este sfârșit, ci trecere la biruința cea fără de seară. „Ferice de cei ce plâng, că aceia se vor mângâia” — chiar și întristarea are rod, când o aducem înaintea lui Dumnezeu.\n\nVă îmbrățișez pe toți cu dragoste în Hristos.",
    body_en:"Beloved in the Lord,\n\nAs this fast opens today, the Church calls us to follow the Mother of God on the path of temperance, prayer and hope. The Dormition is not an end but a passage to the unwaning victory. \u201cBlessed are those who mourn, for they shall be comforted\u201d — even sorrow bears fruit when we bring it before God.\n\nEmbracing you all with love in Christ.",
    occasion:"Adormirea / Dormition", icon:"N",
  },
  {
    id:"m2", date:"2026-08-02", lang:"en", tags:["synodal","en"],
    title:"Synodal Decision on Clergy Continuing Education",
    author:"The Diocesan Assembly",
    body_en:"At its summer session the Diocesan Assembly, presided over by His Grace, approved a continuing-education requirement for clergy of the Episcopate, to take effect next September...",
    body_ro:"În sesiunea de vară, Adunarea Eparhială a aprobat un program de formare continuă pentru clerul Eparhiei...",
    occasion:"Synodal Announcement", icon:"DA",
  },
  {
    id:"m3", date:"2026-07-28", lang:"ro", tags:["pastoral","ro"], image:true,
    title:"Gând la Sfântul Ilie — ocrotitorul ploilor și al roadelor",
    body_ro:"Astăzi Biserica-l sărbătorește pe proorocul Ilie, care prin rugăciune a oprit și a readus ploaia peste pământ. Într-o lume secătuită de apă și de sens, să cerem stăruitor darul lacrimilor și al rugăciunii calde.",
    author:"His Grace Bishop Nathaniel", occasion:"Sfântul Ilie", icon:"N",
  },
  {
    id:"m4", date:"2026-07-15", lang:"ro", tags:["video","en","ro"],
    title:"Mesaj video de la tabăra de tineret",
    has_video:true,
    body_ro:"(Mesaj video) Tinerii Eparhiei sunt adunați în tabăra de vară de la Cheile Bicazului...",
    body_en:"(Video message) The youth of the Episcopate are gathered at the summer camp at Cheile Bicazului...",
    author:"His Grace Bishop Nathaniel", occasion:"Tineret / Youth", icon:"N",
  },
  {
    id:"m5", date:"2026-06-29", lang:"en", tags:["pastoral","en","ro"],
    title:"Feast of the Holy Apostles Peter and Paul",
    title_ro:"Sărbătoarea Sfinților Apostoli Petru și Pavel",
    body_en:"The Holy Apostles Peter and Paul stand as the two wings of the Church: the Rock of faith and the Light of the nations...",
    body_ro:"Sfinții Apostoli Petru și Pavel sunt cele două aripi ale Bisericii: Stânca credinței și Lumina neamurilor...",
    author:"His Grace Bishop Nathaniel", occasion:"Sfinții Apostoli", icon:"N",
  },
  {
    id:"m6", date:"2026-07-20", lang:"en", tags:["youth","en","ro"], image:true,
    title:"Summer Camp 2026 — opening day",
    title_ro:"Tabăra de vară 2026 — ziua de deschidere",
    body_en:"The camp season has begun! Young people from across the Episcopate are gathering at Cheile Bicazului for two weeks of prayer, games, hikes and new friends. We entrust them all to the Mother of God.",
    body_ro:"Sezonul de tabără a început! Tinerii din toată Eparhia se adună la Cheile Bicazului pentru două săptămâni de rugăciune, jocuri, drumeții și prietenii noi. Îi încredințăm pe toți Maicii Domnului.",
    author:"His Grace Bishop Andrei, Vicar Bishop", occasion:"Youth · Tineret", icon:"A",
  },
];

// ---- Solia magazine archive ----
const MAGAZINE = [
  { id:"z1", year:2026, issue:"Summer", label:"Solia — Special Summer 2026", subtitle:"Synodal report, ordinations, parish life", pages:48, tags:["synodal","youth","parish"] },
  { id:"z2", year:2026, issue:"Pascha", label:"Solia — Pascha 2026", subtitle:"Resurrection greetings, Paschal pastoral", pages:40, tags:["paschal","pastoral"] },
  { id:"z3", year:2026, issue:"Winter", label:"Solia — Winter 2026", subtitle:"Nativity special, obituaries, anniversaries", pages:52, tags:["nativity","obituaries"] },
  { id:"z4", year:2025, issue:"Autumn", label:"Solia — Autumn 2025", subtitle:"Diocesan assembly, youth congress", pages:44, tags:["synodal","youth"] },
  { id:"z5", year:2025, issue:"Pascha", label:"Solia — Pascha 2025", subtitle:"125th anniversary of the Episcopate", pages:64, tags:["anniversary","paschal"] },
  { id:"z6", year:2024, issue:"Summer", label:"Solia — Summer 2024", subtitle:"Camp photo report, new clergy", pages:38, tags:["youth","parish"] },
  { id:"z7", year:2023, issue:"Winter", label:"Solia — Winter 2023", subtitle:"Centennial foundary issue", pages:56, tags:["obituaries","history"] },
  { id:"z8", year:1987, issue:"Spring", label:"Solia — Spring 1987 (Archival)", subtitle:"Historical digitization — parish jubilees", pages:32, tags:["archive","history"] },
];

// ---- Parishes (ROEA-flavoured sample) ----
const PARISHES = [
  { id:"p1", name:"St George the Great Martyr", patron:"St George", city:"Madison", state:"WI", deanery:"Midwest", priest:"Rev. Fr. Ion Popescu", x:21, y:34, site:"facebook.com/stgeorge" },
  { id:"p2", name:"Descent of the Holy Spirit", patron:"Pentecost", city:"Cleveland", state:"OH", deanery:"Midwest", priest:"Rev. Fr. Vasile Ionescu", x:24, y:31, site:"pogorareapogorarea.org" },
  { id:"p3", name:"St Andrew the First-Called", patron:"St Andrew", city:"Chicago", state:"IL", deanery:"Midwest", priest:"Rev. Fr. Mihai Georgescu", x:20, y:28, site:"sfandrei-chicago.org" },
  { id:"p4", name:"Presentation of the Theotokos", patron:"Entry into Temple", city:"Detroit", state:"MI", deanery:"Midwest", priest:"Rev. Fr. Gheorghe Dumitrescu", x:26, y:30, site:"intrarea-detroit.org" },
  { id:"p5", name:"St Paraskevi", patron:"St Paraskeva", city:"Cambridge", state:"ON", deanery:"Ontario", priest:"Rev. Fr. Stefan Constantinescu", x:28, y:38, site:"stparaskevi.ca" },
  { id:"p6", name:"St John the Baptist", patron:"St John", city:"Los Angeles", state:"CA", deanery:"West", priest:"Rev. Fr. Nicolae Munteanu", x:8, y:46, site:"sfioan-la.org" },
  { id:"p7", name:"The Holy Archangels", patron:"Michael & Gabriel", city:"Seattle", state:"WA", deanery:"West", priest:"Rev. Fr. Adrian Petrescu", x:4, y:30, site:"arhanghelii-seattle.org" },
  { id:"p8", name:"St Nicholas", patron:"St Nicholas", city:"New York", state:"NY", deanery:"East", priest:"Rev. Fr. Corneliu Radu", x:40, y:27, site:"stnicolas-nyc.org" },
  { id:"p9", name:"Holy Cross", patron:"Exaltation", city:"Boston", state:"MA", deanery:"East", priest:"Rev. Fr. Silviu Lupașcu", x:42, y:25, site:"sfacruce-boston.org" },
  { id:"p10", name:"Sts Constantine & Helen", patron:"Constantine & Helen", city:"Calgary", state:"AB", deanery:"Canada", priest:"Rev. Fr. Dan Ardelean", x:18, y:14, site:"sfconstantin-calgary.ca" },
];
const DEANERIES = [...new Set(PARISHES.map(p=>p.deanery))].sort();

// ---- Featured video (homily of the day) ----
const FEATURED_VIDEO = {
  title_en:"Homily of the Day — the Dormition Fast",
  title_ro:"Predica zilei — Postul Adormirii",
  by:"His Grace Bishop Nathaniel",
  dur:"12:40", grad:"grad-ice",
};

// ---- Community photo strip (person photos / moments) ----
const COMMUNITY = [
  { label:"Camps", tile:"mint", icon:"tent" },
  { label:"Festivals", tile:"peach", icon:"sparkle" },
  { label:"Youth", tile:"aqua", icon:"star" },
  { label:"Choir", tile:"lilac", icon:"note" },
  { label:"Mission", tile:"butter", icon:"heart" },
  { label:"Feasts", tile:"rose", icon:"sun" },
];

// ---- Prayer of the day ----
const PRAYERS = {
  title: "Our Father", title_ro: "Tatăl nostru",
  en: "Our Father, Who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. For Thine is the kingdom, and the power, and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever and unto ages of ages. Amen.",
  ro: "Tatăl nostru, Care ești în ceruri, sfințească-se numele Tău, vie împărăția Ta, facă-se voia Ta, precum în cer, așa și pe pământ. Pâinea noastră cea spre ființă dă-ne-o nouă astăzi; și ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri; și nu ne duce pe noi în ispită, ci ne izbăvește de cel rău. Că a Ta este împărăția și puterea și slava, a Tatălui și a Fiului și a Sfântului Duh, acum și pururea și în vecii vecilor. Amin."
};
const MORNING_PRAYER = {
  en: "Lord, direct my heart and my steps this day; strengthen me to walk in Your commandments, and keep me in Your holy will. Amen.",
  ro: "Doamne, îndreptează inima și pașii mei în ziua aceasta; întărește-mă să umblu întru poruncile Tale și mă păzește întru voia Ta cea sfântă. Amin."
};

// ---- Youth ministry ----
const YOUTH_ACTIVITIES = [
  { t: "Summer Camp — Cheile Bicazului", t_ro: "Tabăra de vară — Cheile Bicazului", when: "Jul 22 – Aug 1", place: "Bicaz Gorges", icon: "tent", tile: "mint", label: true },
  { t: "Youth Festival & Choir Vespers", t_ro: "Festivalul tineretului — Vecernia cu corul", when: "Aug 29", place: "St George, Madison", icon: "note", tile: "lilac", label: true },
  { t: "Fall Retreat for Young Adults", t_ro: "Ritirul de toamnă pentru tineri", when: "Oct 17–18", place: "Holy Cross, Boston", icon: "heart", tile: "rose", label: true },
  { t: "Sunday School — all parishes", t_ro: "Școala duminicală — toate parohiile", when: "Weekly", place: "Every parish", icon: "star", tile: "aqua", label: true },
  { t: "Youth Assembly with the Hierarchs", t_ro: "Întâlnirea tinerilor cu ierarhii", when: "Nov 8", place: "Diocesan Centre", icon: "seal", tile: "butter", label: true },
];
const YOUTH_VIDEOS = [
  { title: "Camp 2026 — highlights", title_ro: "Tabăra 2026 — rezumat", dur: "3:24" },
  { title: "The choir sings in the cathedral", title_ro: "Corul cântă în catedrală", dur: "5:02" },
];

// ---- Admin analytics (mock) ----
const ANALYTICS = {
  users: 12840, messagesRead: 6120, notificationsOpened: 3408,
  messages: { pastoral: 42, synodal: 18, video: 9, feast: 27 },
  weeklyActive:[12,15,14,18,22,26,31,29,34,38,41,37],
};