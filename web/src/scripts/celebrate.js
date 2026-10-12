// The moment an app goes live, shared by the hero and the demo: a crisp burst from the top of the phone's
// screen, two side cannons from its edges a beat later, then a slow fall of stars; and the phone itself
// gives a small spring. Sign-paint colours. Nothing at all with reduced motion.
import confetti from "canvas-confetti";

const PAINT = ["#e2261b", "#ffcc00", "#0b5d3b", "#1739a8", "#ffffff", "#ff8a00"];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function celebrate(phone) {
  if (!phone || reduced()) return;
  const r = phone.getBoundingClientRect();
  const at = (fx, fy) => ({ x: (r.left + r.width * fx) / innerWidth, y: (r.top + r.height * fy) / innerHeight });
  const base = { colors: PAINT, zIndex: 40, disableForReducedMotion: true };

  // 1. The burst: tight and fast, square and round pieces
  confetti({ ...base, origin: at(0.5, 0.22), particleCount: 70, spread: 62, startVelocity: 46, decay: 0.91, gravity: 1.05, ticks: 210, scalar: 0.95, shapes: ["square", "circle"] });
  // 2. Side cannons, angled up and in, from the phone's edges
  setTimeout(() => {
    confetti({ ...base, origin: at(0.02, 0.5), angle: 62, particleCount: 34, spread: 48, startVelocity: 52, decay: 0.9, ticks: 220, drift: 0.4 });
    confetti({ ...base, origin: at(0.98, 0.5), angle: 118, particleCount: 34, spread: 48, startVelocity: 52, decay: 0.9, ticks: 220, drift: -0.4 });
  }, 160);
  // 3. Stars that drift down slowly
  setTimeout(() => confetti({ ...base, colors: ["#ffcc00", "#ffffff", "#ffe27a"], origin: at(0.5, 0.1), shapes: ["star"], particleCount: 16, spread: 120, startVelocity: 24, gravity: 0.45, decay: 0.94, ticks: 300, scalar: 1.35 }), 340);

  // The phone's spring and a glow from behind it
  phone.classList.remove("live-pop"); void phone.offsetWidth; phone.classList.add("live-pop");
}
