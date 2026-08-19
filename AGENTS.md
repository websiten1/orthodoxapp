# AGENTS.md — ROEA App (Claude Code)

You are maintaining the **ROEA official app**: a premium, institutional Orthodox
platform (Solia magazine aesthetic). Mobile-first, static, vanilla JS. Preserve
the existing design; make incremental improvements; never redesign from scratch.

## Hard rules
1. **No emojis.** Use the inline-SVG icon set in `js/app.js` (`ic(name)`).
2. **No Russian-style crosses** anywhere (no slanted/supp ceremony bars). If a
   cross is needed, keep it subtle and Romanian-Byzantine in taste.
3. **Names:** the ruling bishop is **His Grace Bishop Nathaniel**; the Vicar Bishop
   is **Bishop Andrei**. Never use "Nicolae".
4. **Identity:** white/ivory backgrounds, deep navy + light blue accents (default
   theme) OR rich **burgundy** (Burgundy theme). Red only for first-letter accents.
   No gold/cream-brown, no neon, no pill-shaped generic template badges.
5. **Institutional, not playful:** serif editorial headings, restrained
   ornamentation, high-quality photography, no gamification (no streaks etc.).
6. **Navigation is fixed:** Calendar · News · **Today** (center) · Youth · Parishes.
   Today = greeting + date, Prayer card (Our Father), "Today's Orthodox Life" card,
   From His Grace.
7. **Bilingual** RO/EN through the `T(en,ro)` helper; keep diacritics exactly.

## Where things live
- Screens (Today, News, Calendar, Youth, Parishes, Settings, Profile, Prayer Book):
  `js/app.js` — one function per screen; only the LAST definition of a function
  takes effect. Add new screens there.
- Liturgical engine (Pascha, movable feasts, fasting, name-days): `js/calendar.js`.
- Content seed + translations: `js/data.js`.
- Design system + themes: `css/app.css` (Burgundy = `:root[data-theme="burgundy"]`).
- Shell/layout/splash: `index.html`.

## Workflow
- After every change: `node --check js/app.js js/calendar.js js/data.js`.
- Keep everything **offline-static**: no build step, no external CDN, no network.
- Test by opening `index.html` (or `python3 -m http.server 8099`).
- If you add images, keep them small (<200 KB), centered via
  `object-fit: cover; object-position: center`.

## Current backlog (approved direction)
- Import the long Romanian liturgical texts (Creed RO, Psalm 50, Axion Estin,
  evening prayers) with exact diacritics; group under Prayer Book categories
  (Essential, Evening, Psalms, Marian).
- Synaxarion: richer per-saint biographical content; keep the daily card on Calendar.
- Youth: more real photos, event dates; keep no-emoji rule.
- Video grid: one thumbnail→play overlay per video (assets already exist).