#!/usr/bin/env python3
"""Stamp shared fragments into marketing HTML, then render PDFs/PNGs with headless Chrome via playwright-core.

  python3 marketing/render.py                 print + social (needs: npm i --prefix marketing playwright-core)
  python3 marketing/render.py facebook/cards  only the given folders or files
"""
import pathlib, re, subprocess, json
M = pathlib.Path(__file__).resolve().parent
frags = {"mesh": (M / "print/_mesh.svgfrag").read_text().strip(), "mark": (M / "print/_mark.svgfrag").read_text().strip()}

# Static network overlays for any hero scene, from the same data the website uses (web/src/data/scenes.json, via tools/scenes.py).
import sys
sys.path.insert(0, str(M.parent / "tools"))
from scenes import SCENES


def static_mesh(scene, scale=1.0):
    n = scene["nodes"]; out = ['<g fill="none" stroke="#f29d1c" stroke-linecap="round">']
    for kind, pairs in (("solid", scene["links"]), ("dash", scene["radio"] + scene["far"])):
        for pr in pairs:
            a, b = pr.split("-"); (x1, y1), (x2, y2) = n[a][:2], n[b][:2]
            style = f'stroke-width="{4.5 * scale}" opacity=".92"' if kind == "solid" else f'stroke-width="{3.5 * scale}" stroke-dasharray="{12 * scale} {12 * scale}" opacity=".9"'
            out.append(f'<path d="M{x1} {y1} L{x2} {y2}" {style}/>')
    out.append("</g><g>")
    for x, y, *_ in n.values():
        out.append(f'<circle cx="{x}" cy="{y}" r="{26 * scale}" fill="rgba(242,157,28,.22)" stroke="#f29d1c" stroke-width="{2.5 * scale}"/><circle cx="{x}" cy="{y}" r="{10 * scale}" fill="#f29d1c"/>')
    out.append("</g>")
    return "\n".join(out)


# Facts (contact details, figures) from the website's facts file: <!--fact:contact.whatsapp-->…<!--/fact-->
FACTS = json.loads((M.parent / "web" / "src" / "data" / "facts.json").read_text())


def fact(path):
    v = FACTS
    for k in path.split("."):
        v = v[k]
    return str(v)


for sc in SCENES:
    frags[f"mesh:{sc['id']}"] = static_mesh(sc)
    frags[f"mesh:{sc['id']}@2"] = static_mesh(sc, 2)  # heavier lines for small renders
# Optional args limit the run to some sources, in order: `render.py facebook/cards facebook/contact-sheet.html`.
srcs = []
for arg in sys.argv[1:] or ["print", "social"]:
    p = M / arg
    srcs += sorted(p.glob("*.html")) if p.is_dir() else [p]
jobs = []
for f in srcs:
    s = f.read_text()
    for k, v in frags.items():
        s = re.sub(rf"<!--{re.escape(k)}-->.*?<!--/{re.escape(k)}-->", lambda _m: f"<!--{k}-->{v}<!--/{k}-->", s, flags=re.S)
    s = re.sub(r"<!--fact:([\w.]+)-->.*?<!--/fact-->", lambda m: f"<!--fact:{m.group(1)}-->{fact(m.group(1))}<!--/fact-->", s, flags=re.S)
    f.write_text(s)
    sub = "facebook" if "facebook" in f.relative_to(M).parts else ""
    fmt = re.search(r'<meta name="render" content="(\w+)">', s)
    out = M / "out" / sub / (f.stem + (".pdf" if f.parent.name == "print" else "." + (fmt[1] if fmt else "png")))
    out.parent.mkdir(parents=True, exist_ok=True)
    jobs.append({"src": f.as_uri(), "out": str(out)})
(M / "out").mkdir(exist_ok=True)
js = r"""
import { chromium } from "playwright-core";
const jobs = JSON.parse(process.argv[2]);
const b = await chromium.launch({ channel: "chrome" });
for (const j of jobs) {
  const p = await b.newPage();
  await p.goto(j.src, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  if (j.out.endsWith(".pdf")) await p.pdf({ path: j.out, preferCSSPageSize: true, printBackground: true });
  else { const s = await p.evaluate(() => [document.body.scrollWidth, document.body.scrollHeight]);
         await p.setViewportSize({ width: s[0], height: s[1] });
         await p.screenshot(j.out.endsWith(".jpg") ? { path: j.out, type: "jpeg", quality: 90 } : { path: j.out }); }
  console.log("rendered", j.out.split("/").pop());
}
await b.close();
"""
(M / "out/.render.mjs").write_text(js)
subprocess.run(["node", str(M / "out/.render.mjs"), json.dumps(jobs)], check=True, cwd=M)
