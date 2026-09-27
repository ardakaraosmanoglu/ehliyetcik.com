# Ehliyetçik — Agent Guide

Driving-license exam study app (Turkish). Turns the driving school booklet (road signs, rules, questions) into flashcards/quizzes. Personal use first, public later.

## Priorities
1. Fast development — least code that works.
2. Clean code — but don't overdo it. Keep files short (< ~100 lines).

## Workflow
- **Auto-commit:** commit after every completed step without asking (this project only). Verify (`make build` + quick browser check) before committing.

## Stack
- [Gea](https://geajs.com) (`@geajs/core`) + Vite + TypeScript. Class components with `template()` JSX, `Store` classes for state.
- UI: [`@geajs/ui`](https://www.npmjs.com/package/@geajs/ui) (shadcn-like, Tailwind v4 via `@tailwindcss/vite`). Prefer its components (Button, Card, Badge, Progress…).
- No backend, no DB. Static content lives in `src/data/*.json`. See [docs/decisions.md](docs/decisions.md).

## Commands (Makefile)
- `make dev` — dev server
- `make build` — production build to `dist/`
- `make preview` — build + serve
- `make clean`

## Layout
- `src/main.ts` — mount
- `src/app.tsx` — root component
- `src/study-store.ts` — mode (learn/exam), kind (image/text), exam progress
- `src/learn-view.tsx` — Öğren: all questions with answers open
- `src/exam-view.tsx` — Sınav: one question, answer aloud, reveal, self-grade
- `src/data/questions.json` — all questions; images in `public/signs/`

## Docs (read when needed)
- [docs/gea.md](docs/gea.md) — Gea cheat sheet
- [docs/data.md](docs/data.md) — data format
- [docs/decisions.md](docs/decisions.md) — why things are the way they are
- [docs/roadmap.md](docs/roadmap.md) — planned features
