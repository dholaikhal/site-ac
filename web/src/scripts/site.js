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

// Contact form: preselect topic from ?topic=, then open an email draft (no backend yet).
const form = document.getElementById("contact-form");
if (form) {
  const topic = new URLSearchParams(location.search).get("topic");
  if (topic) {
    const radio = form.querySelector(`input[name="topic"][value="${CSS.escape(topic)}"]`);
    if (radio) radio.checked = true;
  }
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const to = form.dataset.to;
    const lines = [
      `Name: ${data.name}`, `Phone / WhatsApp: ${data.phone || "-"}`, `Email: ${data.email}`,
      `About: ${data.topic}`, `Business or organisation: ${data.org || "-"}`, "", data.message || "",
    ];
    location.href = `mailto:${to}?subject=${encodeURIComponent(`[${data.topic}] ${data.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    status.textContent = "Your email app should open with the message ready to send.";
    status.className = "form-status ok";
  });
}
