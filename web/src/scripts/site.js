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

// Contact form: preselect the topic from ?topic=.
const contact = document.getElementById("contact-form");
if (contact) {
  const topic = new URLSearchParams(location.search).get("topic");
  const radio = topic && contact.querySelector(`input[name="topic"][value="${CSS.escape(topic)}"]`);
  if (radio) radio.checked = true;
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
