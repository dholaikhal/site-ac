// The hero's quick build: a one-sentence request types itself, the store's sections fly from it into
// the phone, confetti when it goes live, then the next business. Scripted; uses the demo's apps.
// Copy rule: "our agent", never "AI".
import { APPS, SCREENS, tk } from "./apps.js";
import { celebrate, STYLE_NAMES } from "./celebrate.js";
import { ideaLayout, randomIdea } from "./idea-apps.js";
import { APPS as EXAMPLES, LIVE as EXAMPLES_LIVE } from "../../examples/data";

const box = document.querySelector("[data-qb]");
if (box && !box.dataset.ready) { box.dataset.ready = "1"; init(box); }

function init(box) {
  const $ = (s) => box.querySelector(s);
  const text = $("[data-qb-text]");
  // The caption over the request tells the stage, in one place so nothing shifts: typing, building, done
  const cap = $(".qb-cap");
  const stage = (st) => {
    cap.dataset.st = st;
    cap.innerHTML = { type: "You type", busy: '<span class="spark" aria-hidden="true">✦</span> Our agent is building', done: "✓ Done!" }[st];
  };
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
    ["idea", "Your idea, in one sentence", "", 0, ""],
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
    // in line with the board's other lines: the track's line starts inside the board's padding, by --hp
    const start = parseFloat(getComputedStyle(track.parentElement).paddingLeft) - parseFloat(getComputedStyle(track.parentElement).marginLeft);
    const x = el.getBoundingClientRect().left - track.getBoundingClientRect().left; // its place along the track
    track.style.transform = `translateX(${start - x}px)`;
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

  // Each launch in the hero gets the next way of celebrating, themed to the business
  let launches = 0;
  const launch = (kind) => celebrate(box.querySelector(".qb .dev"), { style: STYLE_NAMES[launches++ % STYLE_NAMES.length], kind });
  let visible = true, run = 0;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.2 }).observe(box);
  const wait = (ms) => new Promise((r) => {
    const t0 = performance.now();
    const tick = () => (visible && !document.hidden ? (performance.now() - t0 >= ms ? r() : requestAnimationFrame(tick)) : setTimeout(tick, 200));
    tick();
  });

  // The catch-all has no app of its own: the phone composes a different placeholder app each step, each one
  // fading in over the last (fast, but never a flash), at yourname.amader.cloud.
  const showLayout = () => {
    const holder = document.createElement("div");
    holder.innerHTML = ideaLayout();
    const layer = holder.firstElementChild;
    const old = [...screen.querySelectorAll(".gx")];
    screen.append(layer); void layer.offsetWidth; layer.classList.add("in");
    setTimeout(() => old.forEach((o) => o.remove()), 340);
  };
  function paint(k) {
    if (k === "idea") { screen.style.removeProperty("--brand"); screen.innerHTML = ""; showLayout(); url.textContent = url2.textContent = "yourname.amader.cloud"; live.removeAttribute("href"); return; }
    const a = APPS[k];
    screen.style.setProperty("--brand", a.color);
    screen.innerHTML = SCREENS[k].home(state(k));
    screen.querySelectorAll(".b").forEach((el) => el.classList.add("ink"));
    url.textContent = url2.textContent = `${a.slug}.amader.cloud`;
    // Live at links to the app itself where it really answers on its subdomain (the example apps)
    if (EXAMPLES_LIVE && EXAMPLES[a.slug]) live.href = `https://${a.slug}.amader.cloud`; else live.removeAttribute("href");
  }

  if (still) {
    paint("shop"); text.textContent = SHOW[0][1]; stage("done"); live.classList.add("on");
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
      await wait(170); if (token !== run) return false;
    }
    return true;
  }


  // One business: type the request, build the store, go live, first order. False if a chip cut it short.
  // The catch-all stays once it's chosen. Like a slot machine: the request flicks through ideas while the phone's
  // design changes with it, both slowing, then they land together on one idea and one app, which goes live.
  // A pause, and it spins again, until someone picks another kind of business.
  async function playIdea(token) {
    const ok = () => token === run;
    const bar = text.closest(".qb-bar");
    for (let round = 0; ; round++) {
      live.classList.remove("on"); text.classList.remove("caret");
      stage("busy"); box.classList.add("building"); url.textContent = "…";
      bar.classList.add("spinning");
      // 12 flicks, from fast to slower (about 1.6 s); a new design every few flicks
      for (let f = 0; f < 12; f++) {
        text.textContent = randomIdea();
        text.classList.remove("flick"); void text.offsetWidth; text.classList.add("flick");
        if (f % 3 === 0) showLayout();
        await wait(65 + f * f * 1.1); if (!ok()) return false;
      }
      // land, both at once
      text.textContent = randomIdea();
      text.classList.remove("flick"); void text.offsetWidth; text.classList.add("flick", "landed");
      showLayout();
      bar.classList.remove("spinning");
      box.classList.remove("building"); stage("done");
      url.textContent = url2.textContent = "yourname.amader.cloud"; live.removeAttribute("href");
      await wait(350); if (!ok()) return false;
      live.classList.add("on"); launch("idea");
      await wait(3200); if (!ok()) return false;
      text.classList.remove("landed");
    }
  }

  async function play(i, token) {
    const [k, prompt, first, amt, noun] = SHOW[i];
    const ok = () => token === run;
    if (k === "idea") {
      pick(i);
      live.classList.remove("on"); notif.classList.remove("show");
      screen.innerHTML = ""; url.textContent = "…"; text.textContent = ""; text.classList.add("caret");
      stage("type"); box.classList.remove("building");
      await wait(450); if (!ok()) return false;
      return playIdea(token);
    }
    pick(i);
    live.classList.remove("on"); notif.classList.remove("show");
    screen.innerHTML = ""; url.textContent = "…"; text.textContent = ""; text.classList.add("caret");
    stage("type"); box.classList.remove("building");
    // Quick to build, slow to leave: the request and the build take about two seconds, then the finished
    // app stays a good three seconds so it can be taken in.
    await wait(250); if (!ok()) return false;
    for (let n = 1; n <= prompt.length; n += 3) { text.textContent = prompt.slice(0, n); await wait(18); if (!ok()) return false; }
    text.textContent = prompt; text.classList.remove("caret");
    await wait(200); if (!ok()) return false;
    stage("busy"); box.classList.add("building");
    paint(k);
    if (!(await fly(token))) return false;
    await wait(250); if (!ok()) return false;
    box.classList.remove("building"); stage("done");
    live.classList.add("on"); launch(k);
    await wait(700); if (!ok()) return false;
    notif.innerHTML = `<span class="ni">✓</span><span><b>New ${noun}</b>${first} · ${tk(amt)} · bKash</span>`;
    notif.classList.add("show");
    await wait(2700);
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
