// Amader Cloud — progressive enhancement; every page reads without this file.

const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Theme: saved choice wins, else the system setting (applied before paint in Base.astro).
document.querySelectorAll(".theme-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const d = document.documentElement;
    const next = d.getAttribute("data-theme") === "dark" ? "light" : "dark";
    d.setAttribute("data-theme", next);
    try { localStorage.setItem("ac-theme", next); } catch {}
  });
});

document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });

// Contact form: preselect the topic from ?topic=; the sheet's title and the beta-only fields follow the topic.
const contact = document.getElementById("form");
if (contact) {
  const title = contact.querySelector("[data-form-title]");
  const sync = () => {
    const on = contact.querySelector('input[name="topic"]:checked');
    if (!on) return;
    if (title) title.textContent = on.dataset.title;
    contact.querySelectorAll("[data-for]").forEach((el) => {
      const show = el.dataset.for === on.value;
      el.hidden = !show;
      el.querySelectorAll("input, select, textarea").forEach((f) => { f.disabled = !show; });
    });
  };
  const topic = new URLSearchParams(location.search).get("topic");
  const radio = topic && contact.querySelector(`input[name="topic"][value="${CSS.escape(topic)}"]`);
  if (radio) radio.checked = true;
  contact.addEventListener("change", (e) => { if (e.target.name === "topic") sync(); });
  contact.addEventListener("reset", () => setTimeout(sync));
  sync();
}

// Forms with data-endpoint post JSON to Formboost (202 on success; _honey is the spam trap).
document.querySelectorAll("form[data-endpoint]").forEach((form) => {
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    button.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";
    try {
      const res = await fetch(form.dataset.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.textContent = form.dataset.sent || "Sent. We'll be in touch.";
      status.classList.add("ok");
    } catch {
      status.textContent = `Not sent. Try again, or email ${form.dataset.fallback}.`;
      status.classList.add("err");
    } finally {
      button.disabled = false;
    }
  });
});

// ---------- Motion: reveal on arrival, count-ups, scenes ----------
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const seen = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("in");
    if (e.target.hasAttribute("data-count")) countUp(e.target);
    seen.unobserve(e.target);
  }
}, { rootMargin: "0px 0px -12% 0px" });
document.querySelectorAll("[data-reveal], [data-count], [data-scene]").forEach((el) => seen.observe(el));

// Ticks every number in the element's text up from zero, keeping the rest of the text: "80–90%" → 0–0% … 80–90%.
function countUp(el) {
  const text = el.textContent;
  const nums = [...text.matchAll(/\d[\d,]*/g)];
  if (still || !nums.length) return;
  const t0 = performance.now(), dur = 1300;
  const frame = (now) => {
    const k = Math.min(1, (now - t0) / dur), ease = 1 - (1 - k) ** 3;
    let out = "", last = 0;
    for (const m of nums) {
      const n = +m[0].replace(/,/g, "");
      out += text.slice(last, m.index) + Math.round(n * ease).toLocaleString("en-IN");
      last = m.index + m[0].length;
    }
    el.textContent = out + text.slice(last);
    if (k < 1) requestAnimationFrame(frame); else el.textContent = text;
  };
  requestAnimationFrame(frame);
}

// ---------- Tabs (role=tablist inside [data-tabs]) ----------
document.querySelectorAll("[data-tabs]").forEach((box) => {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const pick = (tab, focus) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    }
    if (focus) tab.focus();
  };
  // data-auto: walk through the tabs on its own while in view, until the visitor picks one.
  if (box.hasAttribute("data-auto") && !still) {
    let timer = null, i = 0;
    const tick = () => { i = (tabs.findIndex((t) => t.getAttribute("aria-selected") === "true") + 1) % tabs.length; pick(tabs[i]); };
    const stop = () => { clearInterval(timer); timer = null; };
    new IntersectionObserver(([e]) => { if (e.isIntersecting && !box.dataset.touched) timer ??= setInterval(tick, 3600); else stop(); }, { threshold: 0.15 }).observe(box);
    box.addEventListener("pointerdown", () => { box.dataset.touched = "1"; stop(); });
    box.addEventListener("keydown", () => { box.dataset.touched = "1"; stop(); });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => pick(t));
    t.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); pick(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });
});

// ---------- Before/after switch ----------
document.querySelectorAll("[data-vs]").forEach((box) => {
  const sw = box.querySelector('[role="switch"]');
  const set = (on) => { box.classList.toggle("on", on); sw.setAttribute("aria-checked", String(on)); };
  sw.addEventListener("click", () => set(sw.getAttribute("aria-checked") !== "true"));
  box.querySelectorAll(".side").forEach((s) => s.addEventListener("click", () => set(s.classList.contains("b"))));
});
