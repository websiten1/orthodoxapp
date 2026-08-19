# ROEA — Official App

Mobile-first web app (HTML + CSS + Vanilla JS) for the **Romanian Orthodox Episcopate of America**.
Runs from static files — no build step, no server logic.

## Run
- Open `index.html` in a browser (any static server works; e.g. `python3 -m http.server 8099`).
- All assets are local (`assets/`); the app works offline.

## Structure
- `index.html` — shell: splash (full name only here), top bar, bottom nav, script loading.
- `css/app.css` — design system + themes (Blue default, Burgundy via `:root[data-theme="burgundy"]`).
- `js/app.js` — entire app: screens (Today, News, Calendar, Youth, Parishes), Settings, Profile,
  Prayer Book, themes, auth-less admin; hand-rolled router via tabs; sheets; toasts.
- `js/calendar.js` — liturgical calendar engine: Orthodox Pascha (Julian), movable feasts,
  fasting rules (Typikon), New/Old calendar modes, name-days modulo a small vocab.
- `js/data.js` — content seed: Bishop messages, Solia issues, parishes, prayers (RO/EN),
  youth activities/videos; I18N dictionary.
- `assets/` — imagery (photos, icons, ROEA emblem, generated stills).

## Conventions
- No emojis anywhere. Icons are inline SVG strokes (icons map in `js/app.js`).
- Bilingual UI via `T(en, ro)` helper; labels use `esc()`; never raw DOM aside from small
  sheet helpers (`$`, `$$`).
- Theme switch = `state.theme` ("blue"|"burgundy") + `applyTheme()`; persists localStorage.
- Settings gear next to the EN toggle (topbar `.top-actions`).
- Calendar grid is compact and guarded: any failure falls back to a visible message, never a blank screen.
- Navigation order is fixed: Calendar · News · Today (center) · Youth · Parishes.

## Notes for Claude Code
- Keep `js/app.js` as the single screen-definition file; prefer adding screens there
  (function declarations last-in-file win — keep one definition per screen).
- When editing, run `node --check js/app.js js/calendar.js js/data.js` before finishing.
- Do not introduce external framework/rn deps; keep the app fully offline-static.
## Login
- A static gate: `#login` overlay shows before the app; email + password (>=6).
- Session kept in `localStorage("roea.session")`; Sign out (Profile) clears it and returns to login.
- Swap `handleLogin()` for a real auth call when a backend exists.
