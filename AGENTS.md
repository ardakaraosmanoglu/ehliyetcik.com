# Ehliyetçik — Agent Guide

Driving-license exam study app (Turkish). Turns the driving school booklet (road signs, rules, questions) into flashcards/quizzes. Personal use first, public later.

## Priorities
1. Fast development — least code that works.
2. Clean code — but don't overdo it. Keep files short (< ~100 lines).

## Workflow
- **Auto-commit:** commit after every completed step without asking (this project only). Verify (`make build` + quick browser check) before committing.

## Design
- Source of truth: [docs/design/Ehliyetcik.dc.html](docs/design/Ehliyetcik.dc.html) (Claude Design handoff, "Organic" system; tokens in [docs/design/tokens.css](docs/design/tokens.css)). Match it pixel-for-pixel.
- Tokens are Tailwind theme vars in `src/styles.css`: `cream`, `surface`, `ink`, `sand-*` (neutral), `brand-*` (accent #c67139), `sage-*` (accent-2 #7a8a5e). Fonts: Baloo 2 (`font-heading`) + Figtree.
- Mobile-first: full screen on phones; desktop shows the same 390×820 phone frame. Primary actions in the thumb zone, safe-area insets.
- Icons: Lucide paths as CSS masks (`.icon .icon-*` in `src/styles.css`), no emojis in UI chrome.

## Audio (TTS)
- Every question needs `public/audio/<id>.mp3` (answer); text questions also `<id>-q.mp3` (question, read first). Piper, `make audio`. `src/audio.ts` plays clips in order and speeds them up (max 2.5x) to fit the auto-advance time. Missing files fall back to the browser voice.
- **Deferred:** bulk audio generation waits until the booklet content is fully entered. When adding questions, don't generate audio unless asked. Later TODO: make `dev`/`build` depend on `audio` so it never gets forgotten.

## Stack
- [Gea](https://geajs.com) (`@geajs/core`) + Vite + TypeScript. Class components with `template()` JSX, `Store` classes for state.
- UI: plain elements + Tailwind v4 (`@tailwindcss/vite`). `@geajs/ui` was removed — the handoff design uses its own components.
- No backend, no DB. Static content lives in `src/data/*.json`. See [docs/decisions.md](docs/decisions.md).

## Commands (Makefile)
- `make dev` — dev server
- `make build` — production build to `dist/`
- `make preview` — build + serve
- `make audio` — generate Piper TTS mp3s into `public/audio/<id>.mp3` for new questions (run after editing questions; delete a file to regenerate)
- `make ios` — build + `cap sync ios` + open Xcode (Capacitor shell in `ios/`, `capacitor.config.ts`; icon source `resources/icon.svg`)
- `make clean`

## Layout
- `src/main.ts` — mount + bundled fonts (@fontsource, offline)
- `src/app.tsx` — root component
- `src/study-store.ts` — mode (learn/exam), kind (image/text), exam run + results + retry wrong answers
- `src/storage.ts` — safe localStorage `load`/`store`
- `src/learn-store.ts` — Öğren player: in-order, loops, auto-advance (3/5/8 sn), plays `public/audio/<id>.mp3` (Piper), falls back to `speechSynthesis`
- `src/start-screen.tsx` — shared home screen (pick İşaretler/Kurallar + start) for both modes
- Header progress = cards seen in Öğren (localStorage `ehliyetcik.seen`)
- Header speaker button opens a sound menu: mute toggle + volume slider; saved in localStorage `ehliyetcik.muted` / `ehliyetcik.volume`. Volume uses a Web Audio GainNode (iOS ignores `audio.volume`)
- `src/audio.ts` — clip playback + speed-to-fit + browser-voice fallback
- `src/learn-view.tsx` — Öğren: start screen, then swipeable card (pointer events + Web Animations API on `[data-card]`, fly-out/slide-in, no prev/next buttons) + one-time swipe onboarding (localStorage `ehliyetcik.swipeHintSeen`)
- `src/exam-view.tsx` — Sınav: one question, answer aloud, reveal, self-grade
- `src/data/questions.json` — all questions; images in `public/signs/`

## Docs (read when needed)
- [docs/gea.md](docs/gea.md) — Gea cheat sheet
- [docs/data.md](docs/data.md) — data format
- [docs/decisions.md](docs/decisions.md) — why things are the way they are
- [docs/roadmap.md](docs/roadmap.md) — planned features
