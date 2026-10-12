// The hero's quick build: a one-sentence request types itself, the store's sections fly from it into
// the phone, confetti when it goes live, then the next business. Scripted; uses the demo's apps.
// Copy rule: "our agent", never "AI".
import { APPS, SCREENS, tk } from "./apps.js";
import confettiLib from "canvas-confetti";

const box = document.querySelector("[data-qb]");
if (box && !box.dataset.ready) { box.dataset.ready = "1"; init(box); }

function init(box) {
  const $ = (s) => box.querySelector(s);
  const text = $("[data-qb-text]");
  const status = $("[data-qb-status]");
  const screen = $("[data-qb-screen]");
  const url = $("[data-qb-url]");
  const url2 = $("[data-qb-url-2]");
  const live = $("[data-qb-live]");
  const notif = $("[data-qb-notif]");
  const app = box.querySelector(".app");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SHOW = [
    ["shop", "A store for my jute bags, with bKash payment and delivery", "Market tote", 1450, "order"],
    ["kitchen", "Orders for my home kitchen, with a delivery time", "Kacchi × 2", 960, "order"],
    ["book", "Bookings for my salon, with a deposit by bKash", "Hair colour", 300, "booking"],
    ["doctor", "Evening serials for my clinic, booking fee by bKash", "Serial 13", 200, "serial"],
    ["pharmacy", "Medicine orders for my pharmacy, prescription upload and bKash", "3 items", 580, "order"],
    ["event", "Tickets for our Friday music night, paid by bKash", "General × 2", 1000, "ticket"],
    ["service", "Bookings for my AC servicing team, visit fee by bKash", "AC servicing", 500, "visit"],
    ["fees", "Monthly fees for my coaching centre, receipt by SMS", "BP-2071 · October", 2500, "payment"],
  ];
  // The kinds of business on the board: a track drawn three times over. The chosen one is slid to the middle of
  // the board and lit; after each glide the track quietly resets to the middle copy, so it never runs out.
  const track = $("[data-qb-reel]");
  const chips = [...track.querySelectorAll("[data-qb-pick]")];
  const N = chips.length / 3;
  let at = N; // position in the three copies
  let jump = null;
  const place = (glide) => {
    const el = chips[at];
    track.classList.toggle("glide", glide && !still);
    track.style.transform = `translateX(${track.parentElement.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2)}px)`;
    chips.forEach((c, n) => { c.classList.toggle("on", n === at); c.setAttribute("aria-pressed", String(n === at)); });
  };
  const settle = () => { if (at < N || at >= 2 * N) { at = (at % N) + N; place(false); } };
  track.addEventListener("transitionend", settle);
  const pick = (i) => {
    // the copy of i nearest to where the track is now, so it turns the short way round
    at = [i, i + N, i + 2 * N].reduce((a, b) => (Math.abs(b - at) < Math.abs(a - at) ? b : a));
    place(true);
  };
  // A tap answers at once; the build for it starts as soon as the current step stops.
  chips.forEach((c) => c.addEventListener("click", () => { jump = +c.dataset.qbPick; run++; pick(jump); }));
  place(false);
  document.fonts?.ready.then(() => place(false));
  addEventListener("resize", () => place(false));
  const state = (k) => ({ app: k, off: false, green: false, cod: false, remind: false, late: false, cutoff: false, near: false, flash: null, built: true, published: true, tab: "home", undo: [] });

  let visible = true, run = 0;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.2 }).observe(box);
  const wait = (ms) => new Promise((r) => {
    const t0 = performance.now();
    const tick = () => (visible && !document.hidden ? (performance.now() - t0 >= ms ? r() : requestAnimationFrame(tick)) : setTimeout(tick, 200));
    tick();
  });

  function paint(k) {
    const a = APPS[k];
    screen.style.setProperty("--brand", a.color);
    screen.innerHTML = SCREENS[k].home(state(k));
    screen.querySelectorAll(".b").forEach((el) => el.classList.add("ink"));
    url.textContent = url2.textContent = `${a.slug}.amader.cloud`;
  }

  if (still) {
    paint("shop"); text.textContent = SHOW[0][1]; status.hidden = true; live.classList.add("on");
    chips.forEach((c) => c.addEventListener("click", () => { const i = +c.dataset.qbPick; pick(i); paint(SHOW[i][0]); text.textContent = SHOW[i][1]; }));
    return;
  }

  // Each section starts at the request bubble and flies to its place in the phone.
  async function fly(token) {
    const from = text.getBoundingClientRect();
    const scale = parseFloat(getComputedStyle(box.querySelector(".dev")).getPropertyValue("--s")) || 1;
    const blocks = [...screen.querySelectorAll(".b")];
    blocks.forEach((el) => el.classList.add("qb-wait"));
    for (const el of blocks) {
      const r = el.getBoundingClientRect();
      const dx = (from.left + from.width / 2 - (r.left + r.width / 2)) / scale;
      const dy = (from.top + from.height / 2 - (r.top + r.height / 2)) / scale;
      el.style.setProperty("--dx", `${dx}px`); el.style.setProperty("--dy", `${dy}px`);
      el.classList.remove("qb-wait"); el.classList.add("qb-fly", "paint");
      await wait(330); if (token !== run) return false;
    }
    return true;
  }

  // A burst from the phone when the app opens, in the sign paints.
  function confetti() {
    const r = box.querySelector(".dev").getBoundingClientRect();
    const origin = { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height * 0.3) / innerHeight };
    const opts = { origin, colors: ["#e2261b", "#ffcc00", "#0b5d3b", "#1739a8", "#ffffff"], disableForReducedMotion: true, zIndex: 40, ticks: 160 };
    confettiLib({ ...opts, particleCount: 70, spread: 75, startVelocity: 38, scalar: 0.9 });
    setTimeout(() => confettiLib({ ...opts, particleCount: 40, spread: 110, startVelocity: 26, scalar: 0.7 }), 180);
  }

  // One business: type the request, build the store, go live, first order. False if a chip cut it short.
  async function play(i, token) {
    const [k, prompt, first, amt, noun] = SHOW[i];
    const ok = () => token === run;
    pick(i);
    live.classList.remove("on"); notif.classList.remove("show");
    screen.innerHTML = ""; url.textContent = "…"; text.textContent = ""; text.classList.add("caret");
    status.hidden = true; box.classList.remove("building");
    await wait(450); if (!ok()) return false;
    for (let n = 1; n <= prompt.length; n += 2) { text.textContent = prompt.slice(0, n); await wait(26); if (!ok()) return false; }
    text.textContent = prompt; text.classList.remove("caret");
    await wait(300); if (!ok()) return false;
    status.hidden = false; box.classList.add("building");
    paint(k);
    if (!(await fly(token))) return false;
    await wait(450); if (!ok()) return false;
    box.classList.remove("building"); status.hidden = true;
    live.classList.add("on"); confetti();
    await wait(900); if (!ok()) return false;
    notif.innerHTML = `<span class="ni">✓</span><span><b>New ${noun}</b>${first} · ${tk(amt)} · bKash</span>`;
    notif.classList.add("show");
    await wait(3600);
    return ok();
  }
  async function loop() {
    let i = 0;
    for (;;) {
      const token = ++run;
      const done = await play(i, token);
      if (jump !== null) { i = jump; jump = null; continue; }
      if (done) i = (i + 1) % SHOW.length;
    }
  }
  loop();
}
