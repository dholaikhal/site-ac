#!/usr/bin/env python3
"""Stamp shared fragments into marketing HTML, then render PDFs/PNGs with headless Chrome via playwright-core.

  python3 marketing/render.py      (needs: npm i --prefix marketing playwright-core)
"""
import pathlib, re, subprocess, json
M = pathlib.Path(__file__).resolve().parent
frags = {"mesh": (M / "print/_mesh.svgfrag").read_text().strip(), "mark": (M / "print/_mark.svgfrag").read_text().strip()}
jobs = []
for f in list((M / "print").glob("*.html")) + list((M / "social").glob("*.html")):
    s = f.read_text()
    for k, v in frags.items():
        s = re.sub(rf"<!--{k}-->.*?<!--/{k}-->", f"<!--{k}-->{v}<!--/{k}-->", s, flags=re.S)
    f.write_text(s)
    out = M / "out" / (f.stem + (".pdf" if f.parent.name == "print" else ".png"))
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
         await p.setViewportSize({ width: s[0], height: s[1] }); await p.screenshot({ path: j.out }); }
  console.log("rendered", j.out.split("/").pop());
}
await b.close();
"""
(M / "out/.render.mjs").write_text(js)
subprocess.run(["node", str(M / "out/.render.mjs"), json.dumps(jobs)], check=True, cwd=M)
