# One-off import of the KKTC booklet (KKTC_Kitapcik.zip -> html_kitapcik/index.html).
# Text is copied verbatim; only HTML tags are removed (<br> -> newline).
# Usage: python3 scripts/import-kktc.py /tmp/kktc/html_kitapcik
import html, json, re, shutil, sys
from pathlib import Path

src = Path(sys.argv[1])
page = (src / 'index.html').read_text()
signs = Path('public/signs')

def text(h, br='\n'):
    h = re.sub(r'<br\s*/?>', br, h)
    return html.unescape(re.sub(r'<[^>]+>', '', h)).strip()

items, cat = [], ''
for pid, body in re.findall(r'<section class="sheet signs" id="(s\d+)"[^>]*>(.*?)</section>', page, re.S):
    for m in re.finditer(r'<h2 class="ptitle[^"]*">(?!KKTC TRAFİK LEVHALARI)(.*?)</h2>|<h3[^>]*>(.*?)</h3>|<figure class="(cell|diag)[^"]*"[^>]*>(.*?)</figure>', body, re.S):
        if m.group(4) is None:
            cat = text(m.group(1) or m.group(2), ' ')
            continue
        imgs = re.findall(r'<img src="img/([^"]+)"', m.group(4))
        cap = re.search(r'<figcaption>(.*?)</figcaption>', m.group(4), re.S)
        for i in imgs:
            shutil.copy(src / 'img' / i, signs / i)
        # figcaption line breaks are print layout, joined with a space
        name = re.sub(r'\s*\n\s*', ' ', text(cap.group(1), ' ')) if cap else ''
        items.append({'type': 'image', 'category': cat, 'image': f'/signs/{imgs[0]}', 'name': name, 'q': '', 'a': ''})
        if len(imgs) > 1:
            items[-1]['images'] = [f'/signs/{i}' for i in imgs]

for q, a in re.findall(r'<div class="txt q">(.*?)</div><div class="lab a">.*?</div><div class="txt a">(.*?)</div></div>', page, re.S):
    items.append({'type': 'text', 'category': 'Kurallar', 'q': text(q), 'a': text(a)})

for n, it in enumerate(items, 1):
    it['id'] = n
out = [{'id': it.pop('id'), **it} for it in items]
Path('src/data/questions.json').write_text(
    '[\n' + ',\n'.join('  ' + json.dumps(o, ensure_ascii=False) for o in out) + '\n]\n')
print('image', sum(o['type'] == 'image' for o in out), 'text', sum(o['type'] == 'text' for o in out))
print('multi-image cards:', sum('images' in o for o in out))
print('images without caption:', [o['image'] for o in out if o['type'] == 'image' and not o['name']])
