# Ehliyetçik — Agent Guide

Driving-license exam study app (Turkish). Turns the driving school booklet (road signs, rules, questions) into flashcards/quizzes. Personal use first, public later.

## Priorities
1. Fast development — least code that works.
2. Clean code — but don't overdo it. Keep files short (< ~100 lines).

## Workflow
- **Auto-commit:** commit after every completed step without asking (this project only). Verify (`make build` + quick browser check) before committing.

## Design
- **Mobile-first**, feels like a native app: sticky header, bottom tab bar (Öğren/Sınav), segmented control (Görselli/Metinsel), primary actions at the bottom (thumb zone), safe-area insets, min 44px tap targets.
- Desktop is secondary: the same phone-width column (`max-w-md`), centered as a card.

## Audio (TTS)
- Every question needs `public/audio/<id>.mp3` (answer); text questions also `<id>-q.mp3` (question, read first). Piper, `make audio`. `src/audio.ts` plays clips in order and speeds them up (max 2.5x) to fit the auto-advance time. Missing files fall back to the browser voice.
- **Deferred:** bulk audio generation waits until the booklet content is fully entered. When adding questions, don't generate audio unless asked. Later TODO: make `dev`/`build` depend on `audio` so it never gets forgotten.

## Stack
- [Gea](https://geajs.com) (`@geajs/core`) + Vite + TypeScript. Class components with `template()` JSX, `Store` classes for state.
- UI: [`@geajs/ui`](https://www.npmjs.com/package/@geajs/ui) (shadcn-like, Tailwind v4 via `@tailwindcss/vite`). Prefer its components (Button, Card, Badge, Progress…).
- No backend, no DB. Static content lives in `src/data/*.json`. See [docs/decisions.md](docs/decisions.md).

## Commands (Makefile)
- `make dev` — dev server
- `make build` — production build to `dist/`
- `make preview` — build + serve
- `make audio` — generate Piper TTS mp3s into `public/audio/<id>.mp3` for new questions (run after editing questions; delete a file to regenerate)
- `make clean`

## Layout
- `src/main.ts` — mount
- `src/app.tsx` — root component
- `src/study-store.ts` — mode (learn/exam), kind (image/text), exam progress
- `src/learn-store.ts` — Öğren player: in-order, loops, auto-advance (3/5/8 sn), plays `public/audio/<id>.mp3` (Piper), falls back to `speechSynthesis`
- `src/start-screen.tsx` — shared start screen (pick Görselli/Metinsel + Başla) for both modes
- `src/audio.ts` — clip playback + speed-to-fit + browser-voice fallback
- `src/learn-view.tsx` — Öğren: start screen, then swipeable card (pointer events, fly-out/slide-in animation, no prev/next buttons) + one-time swipe onboarding (localStorage `ehliyetcik.swipeHintSeen`)
- `src/exam-view.tsx` — Sınav: one question, answer aloud, reveal, self-grade
- `src/data/questions.json` — all questions; images in `public/signs/`

## Docs (read when needed)
- [docs/gea.md](docs/gea.md) — Gea cheat sheet
- [docs/data.md](docs/data.md) — data format
- [docs/decisions.md](docs/decisions.md) — why things are the way they are
- [docs/roadmap.md](docs/roadmap.md) — planned features
