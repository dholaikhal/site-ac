// How it works: each part lights up and its section flies into the phone, assembling a checkout. Loops while visible.
import { SCREENS } from "./apps.js";

const box = document.querySelector("[data-asm]");
if (box && !box.dataset.ready) { box.dataset.ready = "1"; init(box); }

function init(box) {
  const screen = box.querySelector("[data-asm-screen]");
  const parts = [...box.querySelectorAll("[data-part]")];
  const ok = box.querySelector("[data-asm-ok]");
  const st = { app: "shop", off: false, green: false, cod: false, flash: null, built: true, published: false, tab: "pay", undo: [] };
  const paint = () => { screen.style.setProperty("--brand", "#9a4a24"); screen.innerHTML = SCREENS.shop.pay(st); screen.querySelectorAll(".b").forEach((el) => el.classList.add("ink")); };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { paint(); parts.forEach((p) => p.classList.add("done")); ok.classList.add("on"); return; }

  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.25 }).observe(box);
  const wait = (ms) => new Promise((r) => { const t0 = performance.now(); const tick = () => (visible && !document.hidden ? (performance.now() - t0 >= ms ? r() : requestAnimationFrame(tick)) : setTimeout(tick, 200)); tick(); });

  async function loop() {
    for (;;) {
      paint(); ok.classList.remove("on");
      parts.forEach((p) => p.classList.remove("go", "done"));
      const blocks = [...screen.querySelectorAll(".b")];
      blocks.forEach((b) => b.classList.add("asm-wait"));
      await wait(600);
      const scale = parseFloat(getComputedStyle(box.querySelector(".dev")).getPropertyValue("--s")) || 1;
      for (let i = 0; i < blocks.length; i++) {
        const part = parts[Math.min(i, parts.length - 1)];
        part.classList.add("go");
        await wait(500);
        const from = part.getBoundingClientRect(), to = blocks[i].getBoundingClientRect();
        blocks[i].style.setProperty("--dx", `${(from.left + from.width / 2 - (to.left + to.width / 2)) / scale}px`);
        blocks[i].style.setProperty("--dy", `${(from.top + from.height / 2 - (to.top + to.height / 2)) / scale}px`);
        blocks[i].classList.remove("asm-wait"); blocks[i].classList.add("asm-fly", "paint");
        await wait(550);
        part.classList.remove("go"); part.classList.add("done");
      }
      ok.classList.add("on");
      await wait(3200);
    }
  }
  loop();
}
