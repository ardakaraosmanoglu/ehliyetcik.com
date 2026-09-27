# Data format

`src/data/signs.json` — array of:

| field | type | note |
|---|---|---|
| id | number | unique |
| category | string | booklet section (Tehlike Uyarı, Trafik Tanzim, Bilgi…) |
| name | string | sign name |
| desc | string | meaning / what driver must do |

Planned: `image` (path under `public/signs/`), `questions.json` for multiple-choice.
