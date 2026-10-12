// The moment an app goes live, shared by the hero and the demo. Every way of marking it radiates outward from
// the phone, on all sides: confetti flung from its outline, phone-shaped halos swelling out behind it, a
// sunburst of rays, fireworks all around it, and pieces of the business flying out. The phone itself always
// gives a small spring. Sign-paint colours. Nothing at all with reduced motion.
import confetti from "canvas-confetti";

const PAINT = ["#e2261b", "#ffcc00", "#0b5d3b", "#1739a8", "#ffffff", "#ff8a00"];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const base = { colors: PAINT, zIndex: 40, disableForReducedMotion: true };

// Points around the phone's outline, each with the angle pointing straight out from it (90 is up)
const OUTLINE = [
  [0.5, 0, 90], [0.15, 0.02, 112], [0.85, 0.02, 68], [0, 0.3, 175], [1, 0.3, 5], [0, 0.7, 190], [1, 0.7, -10],
  [0.15, 0.98, 248], [0.85, 0.98, 292], [0.5, 1, 270], [0.03, 0.03, 135], [0.97, 0.03, 45], [0.03, 0.97, 225], [0.97, 0.97, 315],
];

// The pieces for each kind of business (emoji as shapes)
let themed;
const shapes = () => {
  themed ??= Object.fromEntries(Object.entries({
    shop: ["🛍️", "🧺"], kitchen: ["🍛", "🍰"], book: ["💇", "💅"], doctor: ["🩺", "💙"], pharmacy: ["💊", "🩹"],
    event: ["🎟️", "🎶"], service: ["❄️", "🔧"], fees: ["📚", "✏️"], idea: ["✨", "💡"],
  }).map(([k, list]) => [k, [...list, "🪙"].map((text) => confetti.shapeFromText({ text, scalar: 2 }))]));
};

// A layer behind the phone, the phone's size and centred on it, for the halo and the sunburst
function behind(phone, cls, inner, ms) {
  const holder = phone.parentElement;
  if (getComputedStyle(holder).position === "static") holder.style.position = "relative";
  const p = phone.getBoundingClientRect(), h = holder.getBoundingClientRect();
  const fx = document.createElement("div");
  fx.className = `fx ${cls}`;
  fx.setAttribute("aria-hidden", "true");
  fx.style.cssText = `left:${p.left - h.left}px;top:${p.top - h.top}px;width:${p.width}px;height:${p.height}px`;
  fx.innerHTML = inner;
  holder.prepend(fx);
  setTimeout(() => fx.remove(), ms);
}

const STYLES = {
  // Confetti flung out from all round the phone's outline, then a soft second wave
  radiate(at) {
    OUTLINE.forEach(([x, y, angle]) => confetti({ ...base, origin: at(x, y), angle, spread: 34, particleCount: 9, startVelocity: 34, decay: 0.9, gravity: 0.45, ticks: 200, scalar: 0.9, shapes: ["square", "circle"] }));
    setTimeout(() => OUTLINE.filter((_, n) => n % 2).forEach(([x, y, angle]) => confetti({ ...base, origin: at(x, y), angle, spread: 50, particleCount: 6, startVelocity: 22, decay: 0.92, gravity: 0.35, ticks: 220, scalar: 0.7 })), 220);
  },
  // Phone-shaped halos swelling outward behind it, one after another, and sparks from its edges
  halo(at, kind, phone) {
    behind(phone, "fx-halo", "<i></i><i></i><i></i><i></i>", 1900);
    setTimeout(() => OUTLINE.forEach(([x, y, angle]) => confetti({ ...base, colors: ["#ffcc00", "#ffffff"], origin: at(x, y), angle, spread: 26, particleCount: 3, startVelocity: 26, gravity: 0.25, decay: 0.92, ticks: 160, scalar: 0.8, shapes: ["star"] })), 260);
  },
  // A sunburst of rays opening behind the phone, and stars flung out on every side
  sunburst(at, kind, phone) {
    behind(phone, "fx-sun", "<i></i>", 1800);
    confetti({ ...base, colors: ["#ffcc00", "#ffffff", "#ff8a00"], origin: at(0.5, 0.45), shapes: ["star"], particleCount: 40, spread: 360, startVelocity: 30, gravity: 0.3, decay: 0.92, ticks: 220, scalar: 1.2 });
  },
  // Fireworks all round the phone: above, below, at the sides and the corners
  fireworks(at) {
    const shells = [[0.5, -0.12, ["#ffcc00", "#e2261b"]], [-0.35, 0.3, ["#ffffff", "#1739a8"]], [1.35, 0.35, ["#ff8a00", "#ffcc00"]], [-0.3, 0.85, ["#0b5d3b", "#ffcc00"]], [1.3, 0.85, ["#e2261b", "#ffffff"]], [0.5, 1.12, ["#1739a8", "#ffcc00"]]];
    shells.forEach(([x, y, colors], n) => setTimeout(() =>
      confetti({ ...base, colors, origin: at(x, y), particleCount: 40, spread: 360, startVelocity: 22, gravity: 0.5, decay: 0.92, ticks: 160, scalar: 0.8, shapes: ["circle"] }), n * 170));
  },
  // Pieces of the business itself (bags, biryani, tickets…) and a few coins, flying out from its edges
  themed(at, kind) {
    const set = themed[kind] ?? themed.idea;
    OUTLINE.filter((_, n) => n % 2 === 0).forEach(([x, y, angle]) => confetti({ ...base, shapes: set, origin: at(x, y), angle, spread: 40, particleCount: 3, startVelocity: 30, gravity: 0.5, decay: 0.92, ticks: 220, scalar: 2, flat: true }));
  },
};
export const STYLE_NAMES = Object.keys(STYLES);

/** Celebrate a launch from the phone. `style` picks one; otherwise it's random. `kind` themes the "themed" style. */
export function celebrate(phone, { style, kind } = {}) {
  if (!phone || reduced()) return;
  shapes();
  const r = phone.getBoundingClientRect();
  const at = (fx, fy) => ({ x: (r.left + r.width * fx) / innerWidth, y: (r.top + r.height * fy) / innerHeight });
  (STYLES[style] ?? STYLES[STYLE_NAMES[Math.floor(Math.random() * STYLE_NAMES.length)]])(at, kind, phone);
  // The phone's spring and a glow from behind it
  phone.classList.remove("live-pop"); void phone.offsetWidth; phone.classList.add("live-pop");
}
