// Drawings for the fictional apps on the site's phones: line icons and service glyphs. Products are photos.
// Pure string helpers, so the Astro pages (at build) and the demo script (in the browser) draw the same apps.

const P = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  bag: '<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  cal: '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  truck: '<path d="M3 6h11v10H3zM14 9.5h4l3 3.5V16h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  receipt: '<path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z"/><path d="M9 8.5h6M9 12h6M9 15.5h3.5"/>',
  book: '<path d="M4 5.5c3-1 5.5-1 8 .8 2.5-1.8 5-1.8 8-.8V19c-3-1-5.5-1-8 .8-2.5-1.8-5-1.8-8-.8z"/><path d="M12 6.3v13.5"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  scissors: '<circle cx="6.5" cy="17" r="2.6"/><circle cx="6.5" cy="7" r="2.6"/><path d="M8.6 8.6L20 18M8.6 15.4L20 6"/>',
  drop: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',
  sparkle: '<path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V5a1.5 1.5 0 0 1 3 0v6M14 11V6.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 6.5-6 6.5-2.6 0-4-1.3-5.5-3.5L4 14.5a1.5 1.5 0 0 1 2.4-1.8L8 14"/>',
  cap: '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c3 2.2 8 2.2 11 0v-4.5M21.5 9.5V15"/>',
  steth: '<path d="M6 3.5v6a4 4 0 0 0 8 0v-6"/><path d="M10 13.5v2a4.5 4.5 0 0 0 9 0V13"/><circle cx="19" cy="11" r="2"/>',
  pill: '<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.5 8.5l5 7"/>',
  ticket: '<path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10" stroke-dasharray="1.5 2"/>',
  snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M9.5 4.5L12 6l2.5-1.5M9.5 19.5L12 18l2.5 1.5"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  pin: '<path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
};
export const icon = (name, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ""}</svg>`;
export const stars = (n = 5) => `<span class="stars">${Array.from({ length: 5 }, (_, i) => icon("star", i < n ? "on" : "")).join("")}</span>`;

// A hero illustration for each kind of app.
export const heroArt = {
  book: () => `<span class="hero-art glyph">${icon("scissors")}</span>`,
  fees: () => `<span class="hero-art glyph">${icon("cap")}</span>`,
  pharmacy: () => `<span class="hero-art glyph">${icon("pill")}</span>`,
  event: () => `<span class="hero-art glyph">${icon("ticket")}</span>`,
  service: () => `<span class="hero-art glyph">${icon("snow")}</span>`,
  doctor: () => `<span class="hero-art glyph">${icon("steth")}</span>`,
};
