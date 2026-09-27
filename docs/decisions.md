# Decisions

- **JSON instead of SQLite.** Content is static and read-only, no users/stats. JSON imports are bundled by Vite: zero runtime, zero server, deploys as static files. Revisit only if we need server-side writes.
- **No router yet.** Modes are store state, not routes. Add when a second screen exists.
- **Progress (later)** goes to `localStorage`, not a DB.
- **@geajs/ui + Tailwind v4** instead of shadcn: shadcn is React-only; @geajs/ui is the Gea equivalent (same tokens/look).
- **Mobile-first PWA-style shell.** Installable via `manifest.json` (standalone). No service worker yet — add if offline is needed.
- **Swipe via native pointer events**, not `@geajs/mobile`: ~15 lines, gives Tinder-style drag feedback, no extra dependency. **TTS via Web Speech API** (`speechSynthesis`), free and offline on phones.
