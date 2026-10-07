
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
