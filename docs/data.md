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
| top | boolean? | `true` = in the "En çok sorulanlar" list (start-screen filter) |

Content is imported verbatim from the KKTC booklet (`KKTC_Kitapcik.zip`) by `scripts/import-kktc.py` — don't edit texts by hand. Image items have empty `q`/`a` (the booklet only gives the sign name); cells with several images also get `images` (all paths, shown side by side).

IDs 245+ (`top: true`) were added by hand from the user's most-asked list (typos fixed, values kept).
