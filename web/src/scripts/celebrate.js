// The moment an app goes live, shared by the hero and the demo. Four ways to mark it, so launches don't all look
// alike: confetti, fireworks, pieces themed to the business, and rings. The phone itself always
// gives a small spring. Sign-paint colours. Nothing at all with reduced motion.
import confetti from "canvas-confetti";

const PAINT = ["#e2261b", "#ffcc00", "#0b5d3b", "#1739a8", "#ffffff", "#ff8a00"];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const base = { colors: PAINT, zIndex: 40, disableForReducedMotion: true };

// The pieces for each kind of business (emoji as shapes)
let themed;
const shapes = () => {
  themed ??= Object.fromEntries(Object.entries({
    shop: ["🛍️", "🧺"], kitchen: ["🍛", "🍰"], book: ["💇", "💅"], doctor: ["🩺", "💙"], pharmacy: ["💊", "🩹"],
    event: ["🎟️", "🎶"], service: ["❄️", "🔧"], fees: ["📚", "✏️"], idea: ["✨", "💡"],
  }).map(([k, list]) => [k, [...list, "🪙"].map((text) => confetti.shapeFromText({ text, scalar: 2 }))]));
};

const STYLES = {
  // A tight burst from the top of the screen, side cannons a beat later, then falling stars
  confetti(at) {
    confetti({ ...base, origin: at(0.5, 0.22), particleCount: 70, spread: 62, startVelocity: 46, decay: 0.91, gravity: 1.05, ticks: 210, scalar: 0.95, shapes: ["square", "circle"] });
    setTimeout(() => {
      confetti({ ...base, origin: at(0.02, 0.5), angle: 62, particleCount: 34, spread: 48, startVelocity: 52, decay: 0.9, ticks: 220, drift: 0.4 });
      confetti({ ...base, origin: at(0.98, 0.5), angle: 118, particleCount: 34, spread: 48, startVelocity: 52, decay: 0.9, ticks: 220, drift: -0.4 });
    }, 160);
    setTimeout(() => confetti({ ...base, colors: ["#ffcc00", "#ffffff", "#ffe27a"], origin: at(0.5, 0.1), shapes: ["star"], particleCount: 16, spread: 120, startVelocity: 24, gravity: 0.45, decay: 0.94, ticks: 300, scalar: 1.35 }), 340);
  },
  // Three round bursts in the air around the phone, each in two paints
  fireworks(at) {
    const shells = [[0.15, 0.08, ["#ffcc00", "#e2261b"]], [0.85, 0.02, ["#ffffff", "#1739a8"]], [0.5, -0.06, ["#ff8a00", "#ffcc00"]]];
    shells.forEach(([x, y, colors], n) => setTimeout(() =>
      confetti({ ...base, colors, origin: at(x, y), particleCount: 48, spread: 360, startVelocity: 24, gravity: 0.55, decay: 0.92, ticks: 170, scalar: 0.8, shapes: ["circle"] }), n * 260));
  },
  // Pieces of the business itself (bags, biryani, tickets…) and a few coins
  themed(at, kind) {
    const set = themed[kind] ?? themed.idea;
    confetti({ ...base, shapes: set, origin: at(0.5, 0.3), particleCount: 22, spread: 80, startVelocity: 34, gravity: 0.9, decay: 0.92, ticks: 220, scalar: 2, flat: true });
    setTimeout(() => confetti({ ...base, shapes: set, origin: at(0.5, 0.3), particleCount: 12, spread: 140, startVelocity: 22, gravity: 0.7, ticks: 240, scalar: 1.6, flat: true }), 220);
  },
  // Soft rings out from the phone, and a sprinkle of stars
  rings(at, kind, phone) {
    const r = phone.getBoundingClientRect();
    const fx = document.createElement("div");
    fx.className = "ring-fx";
    fx.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height * 0.42}px;--d:${Math.max(r.width, r.height) * 1.1}px`;
    fx.innerHTML = "<i></i><i></i><i></i>";
    document.body.append(fx);
    setTimeout(() => fx.remove(), 1600);
    setTimeout(() => confetti({ ...base, colors: ["#ffcc00", "#ffffff"], shapes: ["star"], origin: at(0.5, 0.42), particleCount: 26, spread: 360, startVelocity: 18, gravity: 0.35, decay: 0.93, ticks: 200, scalar: 1.1 }), 180);
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
