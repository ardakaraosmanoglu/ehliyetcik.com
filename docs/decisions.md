# Decisions

- **JSON instead of SQLite.** Content is static and read-only, no users/stats. JSON imports are bundled by Vite: zero runtime, zero server, deploys as static files. Revisit only if we need server-side writes.
- **No router yet.** Modes are store state, not routes. Add when a second screen exists.
- **Progress (later)** goes to `localStorage`, not a DB.
- **@geajs/ui + Tailwind v4** instead of shadcn: shadcn is React-only; @geajs/ui is the Gea equivalent (same tokens/look).
- **Mobile-first PWA-style shell.** Installable via `manifest.json` (standalone). No service worker yet — add if offline is needed.
- **Swipe via native pointer events**, not `@geajs/mobile`: ~15 lines, gives Tinder-style drag feedback, no extra dependency. **TTS via Web Speech API** (`speechSynthesis`), free and offline on phones.
- **Piper TTS, pre-generated at build time** (`make audio`, runs before `dev`/`build`, all clips committed in `public/audio`), not in the browser: natural voice, zero runtime cost, ~25 KB mp3 per answer. Only Turkish voice is `tr_TR-dfki-medium`, **CC BY-NC-SA 4.0** — fine for a free app with attribution; commercial use needs another voice.
- **Handoff redesign (Claude Design)** replaced the shadcn-like look: warm Organic palette, Baloo 2 + Figtree. `@geajs/ui` dropped. Kept app behaviour the design didn't cover: Piper audio, speed-to-fit, volume menu, loop, one-time onboarding.
- **Öğren controls trimmed:** no prev/next arrows (swipe is taught on first run), no speed picker (auto-advance 1 s after the card is read, audio at a fixed 1.1x, no speed-to-fit), auto-play is a small icon button next to the counter. Frees room so long answers fit, answer boxes scroll inside the card (Öğren and Sınav).
