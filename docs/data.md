# Data format

`src/data/questions.json` — array of:

| field | type | note |
|---|---|---|
| id | number | unique |
| type | `"image"` \| `"text"` | image = picture question (sign, road); text = plain question |
| category | string | booklet section (Levhalar, Yol çizgileri, Kurallar…) |
| image | string? | only for `image`, path under `public/signs/` (SVG/PNG/WebP) |
| images | string[]? | only for `image` with several pictures: all paths (first = `image`) |
| name | string? | only for `image`: sign name (shown as title, read aloud) |
| q | string | question |
| a | string | image: sign description; text: answer |
| top | number? | 1–34 = place in the user's "En çok sorulanlar" list (start-screen filter, deck is ordered by it) |
| hint | string? | short memory hint, read after the answer in Yeni Öğren (`<id>-h.mp3`) |

Content is imported verbatim from the KKTC booklet (`KKTC_Kitapcik.zip`) by `scripts/import-kktc.py` — don't edit texts by hand. Image items have empty `q`/`a` (the booklet only gives the sign name); cells with several images also get `images` (all paths, shown side by side).

The 34 `top` questions are hand-written to match the user's most-asked list exactly (question, answer, order). Lists: intro line, then `1. …` lines.

`src/speech-text.ts` `speech(q)` builds the spoken clips (numbers spelled out): `<id>-q.mp3`, `<id>-a.mp3` ("Cevap: …"), `<id>-aN.mp3` ("Bir: …"), `<id>-h.mp3`. `make audio` renders them via `scripts/clips.ts` (needs Node 22.6+). `<id>.mp3` stays for the old Öğren mode.
