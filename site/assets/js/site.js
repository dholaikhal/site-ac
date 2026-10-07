// amader.cloud — progressive enhancement only; every page works without this file.

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

// Contact form: prefill topic from ?topic=, post to data-endpoint when configured, else open an email draft.
const form = document.getElementById("contact-form");
if (form) {
  const topic = new URLSearchParams(location.search).get("topic");
  if (topic) {
    const radio = form.querySelector(`input[name="topic"][value="${CSS.escape(topic)}"]`);
    if (radio) radio.checked = true;
  }
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const endpoint = form.dataset.endpoint;
    status.className = "form-status";
    if (endpoint) {
      status.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = "Sent. We'll reply on WhatsApp or email within one working day.";
        status.classList.add("ok");
      } catch {
        status.textContent = "Your message didn't send. Check your connection and try again, or email hello@amader.cloud.";
        status.classList.add("err");
      }
      return;
    }
    const lines = [
      `Name: ${data.name}`, `Phone / WhatsApp: ${data.phone}`, `Email: ${data.email || "-"}`,
      `Area: ${data.area}`, `About: ${data.topic}`, `Devices: ${data.devices || "-"}`, "", data.message || "",
    ];
    location.href = `mailto:hello@amader.cloud?subject=${encodeURIComponent(`[${data.topic}] ${data.name}, ${data.area}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    status.textContent = "Your email app should open with the message ready to send.";
    status.classList.add("ok");
  });
}

// Device checker
const checker = document.getElementById("checker");
if (checker) {
  const TVBOX = [
    // [pattern, chip label, tier]  tier: yes | maybe | no
    [/s905x3|x96\s*max\s*(\+|plus)|h96\s*max\s*x3|hk1\s*box|ugoos\s*x3|tx3\s*mini\s*plus/, "Amlogic S905X3", "yes"],
    [/s905x2|x96\s*max(?!\s*(\+|plus))|tx5\s*max/, "Amlogic S905X2", "yes"],
    [/s922x|gt[-\s]*king|am6/, "Amlogic S922X", "yes"],
    [/a311d/, "Amlogic A311D", "yes"],
    [/s912/, "Amlogic S912", "yes"],
    [/s905l3a|b860h|hg680p/, "Amlogic S905L3A / S905L", "yes"],
    [/s905w(?!2)|x96\s*mini|tx3\s*mini(?!\s*plus)/, "Amlogic S905W", "yes"],
    [/s905d|phicomm|n1\b/, "Amlogic S905D", "yes"],
    [/s905x(?![234])|s905\b/, "Amlogic S905 / S905X", "yes"],
    [/s905x4|s905w2|s905y[24]/, "a newer Amlogic chip", "maybe"],
    [/rk3318|rk3328|rk3228|rk3229|h96\s*max(?!\s*x3)/, "a Rockchip chip", "maybe"],
    [/h616|h313|h6\b|allwinner|tx6/, "an Allwinner chip", "maybe"],
    [/mi\s*box|xiaomi|fire\s*tv|firestick|chromecast|apple\s*tv|akash|set[-\s]*top|dth|nvidia\s*shield/, "a locked brand or operator box", "no"],
  ];
  const TYPES = {
    tvbox: {
      model: true,
      placeholder: "e.g. X96 Max+ or S905X3",
      jobs: ["Private cloud for photos, files and backups", "Notice screen on any TV", "Offline library server for a school"],
    },
    phone: {
      jobs: ["Security camera for a stairwell, gate or counter", "Small notice or price screen"],
      say: "Most Android phones from Android 8 onward can do this if the camera works and the battery isn't swollen. Older iPhones can work too. Send us the model and we'll confirm.",
      tier: "yes",
    },
    tablet: {
      jobs: ["Lobby notice board, shop menu or clinic queue screen", "Security camera", "Student device in a school lab"],
      say: "Almost any tablet that turns on and holds a charge can become a screen.",
      tier: "yes",
    },
    laptop: {
      jobs: ["School lab machine (4 GB memory or more)", "Building server or camera recorder, with its battery as backup power", "Spare computing power for research projects (from 2027)"],
      say: "Nearly every laptop from the last 12 years can be rebuilt. Swollen batteries are removed and the laptop runs on mains power.",
      tier: "yes",
    },
    desktop: {
      jobs: ["Camera recorder for a building or shop", "School lab machine", "Backup server for an office"],
      say: "Any desktop with a 64-bit processor can be rebuilt. Bring the monitor too if you can.",
      tier: "yes",
    },
    router: {
      model: true,
      placeholder: "e.g. TP-Link Archer C6",
      jobs: ["Extra Wi‑Fi for a roof, guard room or back office", "A separate guest network for a shop"],
      say: "It depends on the exact model and hardware version. We rebuild routers with OpenWrt, which needs at least 16 MB of storage and 128 MB of memory. ISP-supplied fibre boxes (ONUs) usually can't be rebuilt.",
      tier: "maybe",
      link: ["Look up your router in the OpenWrt hardware table", "https://openwrt.org/toh/start"],
    },
    screen: {
      jobs: ["Notice board or menu display, paired with a TV box", "Lab screen for a school"],
      say: "Any TV or monitor with an HDMI or VGA input works.",
      tier: "yes",
    },
  };
  const TITLES = { yes: "Yes, this can have a second job", maybe: "Probably. We need to test it", unknown: "We need to see this one", no: "Not as a server, but it can still work" };

  const out = checker.querySelector(".verdict");
  const modelWrap = checker.querySelector("#model-field");
  const modelInput = checker.querySelector("#model");

  function render() {
    const type = checker.querySelector('input[name="type"]:checked')?.value;
    if (!type) { out.hidden = true; return; }
    const t = TYPES[type];
    modelWrap.hidden = !t.model;
    if (t.model) modelInput.placeholder = t.placeholder;

    let tier = t.tier || "maybe", say = t.say || "", jobs = t.jobs;
    if (type === "tvbox") {
      const q = modelInput.value.trim().toLowerCase();
      const hit = q && TVBOX.find(([re]) => re.test(q));
      if (!q) { say = "Type the model printed on the label, or the chip name from Settings › About. Most Amlogic-based boxes work."; tier = "unknown"; }
      else if (!hit) { say = "We don't know this one yet. Send us a photo of the label and we'll check it. We test new models every week."; tier = "unknown"; }
      else {
        tier = hit[2];
        say = tier === "yes" ? `It looks like ${hit[1]}, which we support. We'll confirm the real memory when we test it.`
          : tier === "maybe" ? `It looks like ${hit[1]}. Those are in testing. Bring it in and we'll try.`
          : `It looks like ${hit[1]}. It can't be unlocked to run our server software, but brand boxes can still drive a notice screen using their own software. Operator boxes we recycle properly.`;
        if (tier === "no") jobs = ["Notice screen on any TV, using its own software"];
      }
    }
    out.className = `verdict ${tier === "unknown" ? "maybe" : tier}`;
    out.innerHTML = "";
    const h = document.createElement("h3"); h.textContent = TITLES[tier]; out.append(h);
    const p = document.createElement("p"); p.textContent = say; out.append(p);
    if (jobs.length) {
      const ul = document.createElement("ul");
      jobs.forEach((j) => { const li = document.createElement("li"); li.textContent = j; ul.append(li); });
      out.append(ul);
    }
    const next = document.createElement("p"); next.className = "next";
    if (t.link && tier !== "no") {
      const a = document.createElement("a"); a.href = t.link[1]; a.textContent = t.link[0]; a.rel = "noopener"; a.target = "_blank";
      next.append(a, document.createTextNode(". Or "));
    }
    const c = document.createElement("a"); c.href = `contact.html?topic=${tier === "no" ? "donate" : "home"}`;
    c.textContent = tier === "no" ? "arrange a collection" : "book a check";
    next.append(c, document.createTextNode(tier === "no" ? " with three or more devices." : " and we'll confirm in person."));
    if (!t.link || tier === "no") next.firstChild.textContent = next.firstChild.textContent[0].toUpperCase() + next.firstChild.textContent.slice(1);
    out.append(next);
    out.hidden = false;
  }
  checker.addEventListener("change", render);
  modelInput.addEventListener("input", render);
}

// ---------- Redesign: photo mesh, blueprint scroll story, façade hotspots, network scale ----------
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header turns solid once the hero is scrolled past its top.
const header = document.querySelector(".site-header");
if (header && document.body.classList.contains("has-hero")) {
  const onScroll = () => header.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
}

// Shared tooltip for points drawn over photographs.
function tipper(container, selector) {
  const tip = container.querySelector(".node-tip");
  if (!tip) return () => {};
  const show = (el) => {
    const c = container.getBoundingClientRect();
    const r = el.querySelector("circle:last-child").getBoundingClientRect();
    tip.innerHTML = "";
    const b = document.createElement("b"); b.textContent = el.dataset.from.toLowerCase();
    tip.append(b, document.createTextNode(el.dataset.to));
    tip.hidden = false;
    let x = r.left + r.width / 2 - c.left;
    const half = tip.offsetWidth / 2 + 8;
    x = Math.min(Math.max(x, half), c.width - half);
    tip.style.left = `${x}px`;
    tip.style.top = `${r.top - c.top}px`;
  };
  const hide = () => { tip.hidden = true; };
  container.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("pointerenter", () => show(el));
    el.addEventListener("pointerleave", hide);
    el.addEventListener("focus", () => show(el));
    el.addEventListener("blur", hide);
    el.addEventListener("click", () => show(el));
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(el); } });
  });
  return show;
}
const hero = document.querySelector(".hero");
if (hero) tipper(hero, ".node");
if (reduceMotion) document.querySelectorAll(".packets").forEach((g) => g.remove());

// Façade: device list and window hotspots highlight each other.
const facade = document.querySelector(".facade");
if (facade) {
  const fig = facade.querySelector(".facade-photo");
  const show = tipper(fig, ".spot");
  const buttons = facade.querySelectorAll(".jobs button");
  const spots = facade.querySelectorAll(".spot");
  const select = (id) => {
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.spot === id));
    spots.forEach((s) => s.classList.toggle("active", s.dataset.spot === id));
    const s = facade.querySelector(`.spot[data-spot="${id}"]`);
    if (s) show(s);
  };
  buttons.forEach((b) => {
    b.addEventListener("click", () => select(b.dataset.spot));
    b.addEventListener("pointerenter", () => select(b.dataset.spot));
  });
  spots.forEach((s) => s.addEventListener("click", () => select(s.dataset.spot)));
  // Start with the first device selected once the section is visible.
  new IntersectionObserver((entries, io) => {
    if (entries[0].isIntersecting) { select("a"); io.disconnect(); }
  }, { threshold: 0.4 }).observe(fig);
}

// Blueprint: scroll position draws each device, then wires it to the hub.
const bp = document.querySelector(".bp-scroll");
if (bp) {
  const devs = [...bp.querySelectorAll(".dev")];
  const steps = [...bp.querySelectorAll(".bp-steps li")];
  const hub = bp.querySelector(".hub");
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const render = (p) => {
    const t = clamp(p / 0.88) * devs.length;
    devs.forEach((g, i) => {
      const local = clamp(t - i);
      g.style.setProperty("--d", clamp(local / 0.6).toFixed(3));
      g.style.setProperty("--c", clamp((local - 0.6) / 0.4).toFixed(3));
    });
    hub.style.setProperty("--c", clamp((p - 0.88) / 0.1).toFixed(3));
    const active = Math.min(devs.length - 1, Math.floor(t));
    steps.forEach((li, i) => { li.classList.toggle("on", i === active); li.classList.toggle("done", i < active); });
  };
  if (reduceMotion) render(1);
  else {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = bp.getBoundingClientRect();
        render(clamp(-r.top / (r.height - innerHeight)));
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();
  }
}

// Scale: a slider grows the network across the skyline. Figures are illustrative.
const consoleForm = document.getElementById("scale-console");
if (consoleForm) {
  const svg = document.querySelector(".scale-mesh");
  const NS = "http://www.w3.org/2000/svg";
  // Deterministic points in the band of the photo that is all buildings, grown outward from one building.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pts = Array.from({ length: 120 }, () => [80 + rand() * 2240, 1190 + rand() * 370]);
  const origin = [1250, 1450];
  pts.sort((a, b) => Math.hypot(a[0] - origin[0], a[1] - origin[1]) - Math.hypot(b[0] - origin[0], b[1] - origin[1]));
  const edges = pts.map((p, i) => {
    if (i === 0) return [];
    const near = pts.slice(0, i).map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])]).sort((a, b) => a[1] - b[1]);
    return near.slice(0, i % 3 === 0 && i > 1 ? 2 : 1).map(([j]) => j);
  });
  const gE = svg.querySelector(".edges"), gD = svg.querySelector(".dots");
  pts.forEach((p, i) => {
    edges[i].forEach((j) => {
      const l = document.createElementNS(NS, "line");
      l.setAttribute("x1", p[0]); l.setAttribute("y1", p[1]); l.setAttribute("x2", pts[j][0]); l.setAttribute("y2", pts[j][1]);
      l.dataset.i = i; gE.append(l);
    });
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]); c.setAttribute("r", i === 0 ? 11 : 7); c.dataset.i = i; gD.append(c);
  });
  const range = consoleForm.querySelector("#buildings");
  const fmt = new Intl.NumberFormat("en-IN");
  const out = (id, v) => { consoleForm.querySelector(id).textContent = v; };
  const update = () => {
    const k = +range.value;
    svg.querySelectorAll("[data-i]").forEach((el) => { el.style.display = +el.dataset.i < k ? "" : "none"; });
    out("#b-out", k);
    out("#o-devices", fmt.format(k * 14));
    out("#o-homes", fmt.format(k * 10));
    out("#o-rev", `Tk ${fmt.format(k * 4490)}`);
  };
  range.addEventListener("input", update);
  update();
}

// Hero scenes: crossfade between photographs, each replaying its network; pause on interaction.
(() => {
  const hero = document.querySelector(".hero");
  const scenes = hero ? [...hero.querySelectorAll(".scene")] : [];
  if (scenes.length < 2) return;
  const tabsWrap = hero.querySelector(".scene-tabs");
  const tabs = [...tabsWrap.querySelectorAll("button")];
  const pauseBtn = hero.querySelector(".scene-pause");
  const tip = hero.querySelector(".node-tip");
  const DWELL = 9000;
  let i = 0, timer = 0, paused = reduceMotion, holding = false;
  tabsWrap.style.setProperty("--dwell", `${DWELL}ms`);

  const schedule = () => {
    clearTimeout(timer);
    const run = !paused && !holding;
    tabsWrap.classList.toggle("playing", run);
    const bar = tabs[i];
    bar.classList.remove("run"); void bar.offsetWidth; bar.classList.add("run");
    if (run) timer = setTimeout(() => show((i + 1) % scenes.length), DWELL);
  };
  const show = (k) => {
    if (k === i) return schedule();
    const old = scenes[i];
    old.classList.remove("live"); old.classList.add("leaving"); old.inert = true;
    setTimeout(() => old.classList.remove("leaving"), 1200);
    const next = scenes[k];
    next.inert = false; void next.offsetWidth; next.classList.add("live");
    tabs.forEach((t, j) => t.setAttribute("aria-selected", String(j === k)));
    if (tip) tip.hidden = true;
    i = k; schedule();
  };
  tabs.forEach((t, k) => t.addEventListener("click", () => show(k)));
  tabsWrap.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const k = (i + (e.key === "ArrowRight" ? 1 : scenes.length - 1)) % scenes.length;
    show(k); tabs[k].focus();
  });
  if (pauseBtn) {
    if (paused) { pauseBtn.textContent = "Play"; pauseBtn.setAttribute("aria-pressed", "true"); }
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.textContent = paused ? "Play" : "Pause";
      pauseBtn.setAttribute("aria-pressed", String(paused));
      schedule();
    });
  }
  // Hold the current scene while someone is reading a node.
  hero.querySelectorAll(".node").forEach((n) => {
    const hold = (v) => () => { holding = v; schedule(); };
    n.addEventListener("pointerenter", hold(true)); n.addEventListener("pointerleave", hold(false));
    n.addEventListener("focus", hold(true)); n.addEventListener("blur", hold(false));
  });
  // Only advance while the hero is on screen.
  new IntersectionObserver(([e]) => { holding = !e.isIntersecting; schedule(); }).observe(hero);
  schedule();
})();

// Earn estimator. Rates are pilot figures and targets, stated on the page.
(() => {
  const f = document.getElementById("earn-calc");
  if (!f) return;
  const KIND = { // cores, relative speed per core, extra watts while working
    laptop: { cores: 4, speed: 1, watts: 20 },
    desktop: { cores: 4, speed: 1.2, watts: 60 },
    tvbox: { cores: 4, speed: 0.25, watts: 4 },
  };
  const RATE_CORE_HOUR = 0.30, STORAGE_PER_GB = 50 / 250, TK_PER_KWH = 9, DAYS = 30;
  const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
  const counts = { laptop: 1, desktop: 0, tvbox: 1 };
  const $ = (id) => f.querySelector(id);
  const update = () => {
    const h = +$("#idle-hours").value, gb = +$("#disk-gb").value;
    $("#idle-out").textContent = `${h} h`;
    $("#disk-out").textContent = `${fmt.format(gb)} GB`;
    let coreHours = 0, kwh = 0;
    for (const [k, n] of Object.entries(counts)) {
      coreHours += n * KIND[k].cores * KIND[k].speed * h * DAYS;
      kwh += n * KIND[k].watts * h * DAYS / 1000;
    }
    const storage = gb * STORAGE_PER_GB, compute = coreHours * RATE_CORE_HOUR, power = kwh * TK_PER_KWH;
    $("#e-storage").textContent = `Tk ${fmt.format(storage)}`;
    $("#e-corehours").textContent = fmt.format(coreHours);
    $("#e-compute").textContent = `Tk ${fmt.format(compute)}`;
    $("#e-power").textContent = `− Tk ${fmt.format(power)}`;
    $("#e-net").textContent = `Tk ${fmt.format(Math.max(0, storage + compute - power))}`;
    f.querySelectorAll(".count").forEach((c) => { c.querySelector("output").textContent = counts[c.dataset.kind]; });
  };
  f.querySelectorAll(".count button").forEach((b) => b.addEventListener("click", () => {
    const k = b.closest(".count").dataset.kind;
    counts[k] = Math.min(9, Math.max(0, counts[k] + +b.dataset.d));
    update();
  }));
  f.addEventListener("input", update);
  update();
})();

// Community: distributed backup demo. Your backup is split across four neighbours' flats; break your disk to restore it.
(() => {
  const svg = document.getElementById("restore-svg");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const el = (n, a = {}, parent = svg) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); parent.append(e); return e; };
  const FLOORS = 6, COLS = 3, W = 128, H = 66, X0 = 50, Y0 = 70, GX = 14, GY = 14;
  const flats = [];
  el("path", { class: "roofline", d: `M30 ${Y0 - 14} H490 M60 ${Y0 - 14} V${Y0 - 40} H120 V${Y0 - 14} M400 ${Y0 - 14} V${Y0 - 34} H440 V${Y0 - 14}` });
  el("text", { class: "note", x: 128, y: Y0 - 46 }).textContent = "water tank";
  el("rect", { class: "shell", x: 30, y: Y0 - 14, width: 460, height: FLOORS * (H + GY) + 96 });
  const gFlats = el("g"), gThreads = el("g"), gMove = el("g");
  for (let f = FLOORS; f >= 1; f--) {
    for (let c = 0; c < COLS; c++) {
      const id = `${f}${"ABC"[c]}`, x = X0 + c * (W + GX), y = Y0 + (FLOORS - f) * (H + GY);
      const g = el("g", { class: "flat", tabindex: 0, role: "button", "aria-label": `Flat ${id}. Make this your flat.` }, gFlats);
      el("rect", { x, y, width: W, height: H, rx: 3 }, g);
      el("text", { x: x + 10, y: y + 20 }, g).textContent = id;
      flats.push({ id, g, cx: x + W / 2, cy: y + H / 2 + 6, x, y });
    }
  }
  // Ground floor: lobby with a screen made from old monitors, and the gate.
  const ly = Y0 + FLOORS * (H + GY);
  const lobby = el("g", { class: "lobby" });
  el("rect", { x: X0, y: ly, width: 3 * W + 2 * GX, height: 70, rx: 3 }, lobby);
  el("rect", { class: "screen", x: X0 + 150, y: ly + 14, width: 110, height: 40, rx: 2 }, lobby);
  el("rect", { class: "screen-glow", x: X0 + 158, y: ly + 22, width: 40, height: 6 }, lobby);
  el("rect", { class: "screen-glow", x: X0 + 158, y: ly + 34, width: 70, height: 4, opacity: .6 }, lobby);
  el("text", { x: X0 + 12, y: ly + 24 }, lobby).textContent = "lobby";
  el("text", { x: X0 + 12, y: ly + 58 }, lobby).textContent = "gate";
  el("text", { x: X0 + 272, y: ly + 30 }, lobby).textContent = "notices + ads";
  el("text", { x: X0 + 272, y: ly + 46 }, lobby).textContent = "on old monitors";

  const status = document.getElementById("restore-status");
  let you = flats.findIndex((f) => f.id === "4B"), busy = false;
  const holdersOf = (i) => [4, 8, 12, 17].map((d) => (i + d) % flats.length);

  const draw = () => {
    gThreads.innerHTML = ""; gMove.innerHTML = "";
    const hs = holdersOf(you);
    flats.forEach((f, i) => {
      f.g.classList.toggle("you", i === you); f.g.classList.toggle("holder", hs.includes(i));
      f.g.classList.remove("failed", "restored");
      f.g.querySelectorAll(".piece").forEach((p) => p.remove());
      f.g.querySelector("text").textContent = i === you ? `${f.id}  you` : f.id;
    });
    hs.forEach((h, k) => {
      const a = flats[you], b = flats[h];
      el("path", { class: "thread", d: `M${a.cx} ${a.cy} C ${a.cx} ${(a.cy + b.cy) / 2 - 20}, ${b.cx} ${(a.cy + b.cy) / 2 + 20}, ${b.cx} ${b.cy}` }, gThreads);
      el("rect", { class: "piece", x: b.x + W - 30, y: b.y + 12, width: 16, height: 16, rx: 2 }, b.g);
    });
    status.textContent = `Flat ${flats[you].id}'s backup is encrypted and split into four pieces, kept by ${hs.map((h) => flats[h].id).join(", ")}. None of them can read it.`;
  };

  const kill = () => {
    if (busy) return;
    busy = true;
    const me = flats[you], hs = holdersOf(you);
    me.g.classList.add("failed");
    me.g.querySelector("text").textContent = `${me.id}  disk failed`;
    status.textContent = `Flat ${me.id}'s disk has failed. Fetching its pieces back from the neighbours…`;
    const finish = () => {
      me.g.classList.remove("failed"); me.g.classList.add("restored");
      me.g.querySelector("text").textContent = `${me.id}  restored`;
      status.textContent = `Restored on a new disk from ${hs.map((h) => flats[h].id).join(", ")}. Nothing was lost, and nobody could read it along the way.`;
      busy = false;
    };
    if (reduceMotion) return setTimeout(finish, 400);
    const dots = hs.map((h) => ({ from: flats[h], dot: el("circle", { class: "moving", r: 7, cx: flats[h].cx, cy: flats[h].cy }, gMove) }));
    const t0 = performance.now() + 500, dur = 1100;
    const step = (now) => {
      let done = true;
      dots.forEach(({ from, dot }, k) => {
        const t = Math.min(1, Math.max(0, (now - t0 - k * 180) / dur));
        if (t < 1) done = false;
        const e = t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        dot.setAttribute("cx", from.cx + (me.cx - from.cx) * e);
        dot.setAttribute("cy", from.cy + (me.cy - from.cy) * e);
        dot.setAttribute("opacity", t >= 1 ? 0 : 1);
      });
      if (done) finish(); else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  flats.forEach((f, i) => {
    const pick = () => { if (!busy) { you = i; draw(); } };
    f.g.addEventListener("click", pick);
    f.g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
  });
  document.getElementById("kill-disk").addEventListener("click", kill);
  document.getElementById("reset-disk").addEventListener("click", () => { if (!busy) draw(); });
  draw();
})();
