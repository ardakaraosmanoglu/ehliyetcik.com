# Decisions

- **JSON instead of SQLite.** Content is static and read-only, no users/stats. JSON imports are bundled by Vite: zero runtime, zero server, deploys as static files. Revisit only if we need server-side writes.
- **No router yet.** Single screen. Add when a second screen exists.
- **Progress (later)** goes to `localStorage`, not a DB.
