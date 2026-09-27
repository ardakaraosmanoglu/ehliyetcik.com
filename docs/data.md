# Data format

`src/data/questions.json` — array of:

| field | type | note |
|---|---|---|
| id | number | unique |
| type | `"image"` \| `"text"` | image = picture question (sign, road); text = plain question |
| category | string | booklet section (Levhalar, Yol çizgileri, Kurallar…) |
| image | string? | only for `image`, path under `public/signs/` (SVG/PNG/WebP) |
| name | string? | only for `image`: sign name (shown as title, read aloud) |
| q | string | question |
| a | string | image: sign description; text: answer |

Current images are placeholder SVGs — replace with real ones from the booklet.
