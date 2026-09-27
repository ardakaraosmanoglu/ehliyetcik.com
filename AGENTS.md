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
- `make dev`/`make build` run `make audio` first, so new questions get clips automatically (existing files are skipped).

## Stack
- [Gea](https://geajs.com) (`@geajs/core`) + Vite + TypeScript. Class components with `template()` JSX, `Store` classes for state.
- UI: plain elements + Tailwind v4 (`@tailwindcss/vite`). `@geajs/ui` was removed — the handoff design uses its own components.
- No backend, no DB. Static content lives in `src/data/*.json`. See [docs/decisions.md](docs/decisions.md).

## Commands (Makefile)
- `make dev` — dev server
- `make build` — production build to `dist/`
- `make preview` — build + serve
- `make audio` — generate Piper TTS mp3s into `public/audio/<id>.mp3` for new questions (runs automatically before `dev`/`build`; delete a file to regenerate)
- `make ios` — build + `cap sync ios` + open Xcode (Capacitor shell in `ios/`, `capacitor.config.ts`; icon source `resources/icon.svg`)
- `make clean`

## Layout
- `src/main.ts` — mount + bundled fonts (@fontsource, offline)
- `src/app.tsx` — root component
- `src/study-store.ts` — mode (learn/exam), kind (image/text), exam run + results + retry wrong answers
- `src/storage.ts` — safe localStorage `load`/`store`
- `src/learn-store.ts` — Öğren player: in-order, loops, auto-advance (fixed 5 sn, play/pause icon button next to the counter), plays `public/audio/<id>.mp3` (Piper), falls back to `speechSynthesis`
- `src/start-screen.tsx` — shared home screen (pick İşaretler/Kurallar + start) for both modes
- Header progress = cards seen in Öğren (localStorage `ehliyetcik.seen`)
- Header speaker button opens a sound menu: mute toggle + volume slider; saved in localStorage `ehliyetcik.muted` / `ehliyetcik.volume`. Volume uses a Web Audio GainNode (iOS ignores `audio.volume`)
- `src/audio.ts` — clip playback + speed-to-fit + browser-voice fallback
- `src/learn-view.tsx` — Öğren: start screen, then swipeable card (pointer events + Web Animations API on `[data-card]`, fly-out/slide-in, no prev/next buttons, `touch-pan-y` so the answer box scrolls vertically) + one-time swipe onboarding (localStorage `ehliyetcik.swipeHintSeen`)
- `src/exam-view.tsx` — Sınav: one question, answer aloud, reveal, self-grade
- `src/data/questions.json` — all questions; images in `public/signs/`

## Docs (read when needed)
- [docs/gea.md](docs/gea.md) — Gea cheat sheet
- [docs/data.md](docs/data.md) — data format
- [docs/decisions.md](docs/decisions.md) — why things are the way they are
- [docs/roadmap.md](docs/roadmap.md) — planned features

<!-- vi3ecode:memory:begin -->
## Project Memory (Vi3ecode)

This project keeps a persistent memory vault at `.vi3ecode/memory/` (index: `.vi3ecode/memory/MEMORY.md`, notes: `.vi3ecode/memory/entries/*.md`). The vault is the CANONICAL long-term memory for this project — read it and write to it. Do not keep durable project insights only in engine-private memory (e.g. Claude auto-memory); other agents and tools cannot see them there.

Before starting any task that may depend on past decisions, known pitfalls, or project facts not already in your context, you MUST scan the memory index and open the relevant notes from `.vi3ecode/memory/entries/<id>.md`.

When you learn something durable (a decision, root cause, gotcha, or reusable pattern), save it by printing a single line:
`MEMORY_WRITE {"title":"…","content":"…","type":"fact|decision|pattern|warning|todo|reference","tags":["…"]}`
(the whole JSON must stay on ONE line — keep content brief) or by creating a markdown note in `.vi3ecode/memory/entries/` (kebab-case filename). In an interactive session prefer the file — a line wrapped by the terminal is lost. Keep notes short and deduplicated; update an existing note instead of duplicating it. Link related notes with `[[slug]]`.
<!-- vi3ecode:memory:end -->
