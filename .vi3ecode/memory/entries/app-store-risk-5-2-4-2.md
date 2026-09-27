---
title: App Store risk: 5.2 + 4.2
type: warning
tags: [appstore, ios, review]
---
Main App Store rejection risks for the Capacitor iOS build:
- **5.2 (IP / official look):** all signs and Q&A are copied verbatim from the KKTC Sürücü Kursu Müfredatı booklet. No written permission; user treats it as public content. Mitigation: in-app About screen (`src/about.tsx`) says "resmî değildir", names the source; same note on the site pages. Apple may still ask for rights.
- **4.2 (minimum functionality / web wrapper):** app is a wrapped Vite web app. Argue: works offline, TTS audio, exam mode + retry wrong answers, progress. Web feel removed (no scroll bounce, no text select/callout, cream launch screen).
Privacy/support pages live in `site/` and must be hosted at https://ardakaraosmanoglu.github.io/ehliyetcik.com/ (GitHub Pages needs a public repo or a paid plan; repo was private on 2026-09-27).
