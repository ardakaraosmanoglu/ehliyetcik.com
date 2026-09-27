# Ehliyetçik — Agent Guide

Driving-license exam study app (Turkish). Turns the driving school booklet (road signs, rules, questions) into flashcards/quizzes. Personal use first, public later.

## Priorities
1. Fast development — least code that works.
2. Clean code — but don't overdo it. Keep files short (< ~100 lines).

## Stack
- [Gea](https://geajs.com) (`@geajs/core`) + Vite + TypeScript. Class components with `template()` JSX, `Store` classes for state.
- No backend, no DB. Static content lives in `src/data/*.json`. See [docs/decisions.md](docs/decisions.md).

## Commands (Makefile)
- `make dev` — dev server
- `make build` — production build to `dist/`
- `make preview` — build + serve
- `make clean`

## Layout
- `src/main.ts` — mount
- `src/app.tsx` — root component
- `src/*-store.ts` — stores
- `src/data/` — static content (signs, questions)

## Docs (read when needed)
- [docs/gea.md](docs/gea.md) — Gea cheat sheet
- [docs/data.md](docs/data.md) — data format
- [docs/decisions.md](docs/decisions.md) — why things are the way they are
- [docs/roadmap.md](docs/roadmap.md) — planned features
