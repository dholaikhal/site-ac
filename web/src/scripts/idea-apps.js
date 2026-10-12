// The hero's catch-all, "an app for your ✦ idea ✦": requests a Bangladeshi owner might type, and a kit of app
// parts the phone composes into a different layout each time, in a different palette. No real app behind these.

export const IDEAS = [
  "A booking app for my rooftop futsal turf",
  "Pre-orders for our mango orchard in Rajshahi",
  "Tiffin subscriptions for office workers in Motijheel",
  "Rentals for wedding sherwanis and lehengas",
  "Bookings for my bridal mehendi team",
  "A shop for nakshi kantha stitched by village women",
  "Tutors matched with students around Mirpur",
  "Seat booking for my coaching centre's model tests",
  "A members' app for our Dhanmondi gym",
  "Fresh hilsa from the Padma, ordered the night before",
  "A plant shop for my rooftop nursery",
  "Eid photo sessions at my studio, booked by the hour",
  "Team sign-ups for our neighbourhood cricket tournament",
  "Repair bookings for my mobile phone shop",
  "Stall sign-ups for our Pohela Boishakh fair",
  "Monthly rice, dal and oil packs for families",
  "Lessons at my driving school, paid by bKash",
  "Birthday cake orders for my home bakery",
  "Rent collection for the flats in my building",
  "Donations for our mosque's new roof",
  "Laundry pickups across Uttara",
  "Appointments at my physiotherapy chamber",
  "A shop for handloom Tangail sarees",
  "Office lunch group orders, split by bKash",
  "Room booking for my Cox's Bazar guesthouse",
  "Sundarbans honey, sold by the jar",
  "Coding classes for kids, with monthly fees",
  "Servicing slots at my motorbike garage",
  "Spare parts for my CNG workshop",
  "Green tea from our Sylhet garden",
  "Fittings at my tailoring shop, booked online",
  "Daily milk from our dairy farm, by subscription",
  "Tickets for our university's cultural night",
  "Second-hand textbooks, sold by students",
  "Home cleaning crews, booked by the visit",
  "Frozen parathas and samosas, ordered by the dozen",
  "Morning yoga classes on our rooftop",
  "Fridge and AC repairs, with the visit fee by bKash",
  "A catalogue for my furniture workshop in Kushtia",
  "Achar and pickles from my kitchen, sent across the country",
];

const PALETTES = [
  ["#fff8f0", "#9a4a24", "#e2a157", "#f3e3d3"], ["#f2f7f4", "#0f7a6c", "#7cc6b5", "#d9ece6"],
  ["#f6f2fb", "#6a3d8f", "#c39be0", "#e7dcf2"], ["#fff6f4", "#b03a2e", "#f2a65a", "#f6dcd6"],
  ["#f2f6fb", "#1739a8", "#7aa2f7", "#dde6f7"], ["#fbf7ea", "#0b5d3b", "#e5b400", "#e9efd9"],
  ["#fdf3fb", "#a21caf", "#f0abfc", "#f5dcf3"], ["#f1f7fb", "#0369a1", "#38bdf8", "#dbeefa"],
  ["#14213d", "#ffcc00", "#e2261b", "#25345a"], ["#fffaf2", "#e2261b", "#ffcc00", "#fde7cf"],
];

const any = (a) => a[Math.floor(Math.random() * a.length)];
const w = (lo, hi) => `${Math.round(lo + Math.random() * (hi - lo))}%`;
const times = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");

// Each part is a few shapes: text is a bar, a photo is a tinted block, buttons are pills.
const BAR = [
  () => `<div class="gp g-bar"><i class="g-logo"></i><i class="g-t" style="width:${w(30, 45)}"></i><i class="g-ic"></i><i class="g-ic"></i></div>`,
  () => `<div class="gp g-bar centre"><i class="g-ic"></i><i class="g-t" style="width:${w(28, 40)}"></i><i class="g-ic"></i></div>`,
  () => `<div class="gp g-bar"><i class="g-logo"></i><i class="g-search"></i></div>`,
];
const HERO = [
  () => `<div class="gp g-hero photo"><i class="g-t inv" style="width:${w(45, 70)}"></i><i class="g-t inv thin" style="width:${w(30, 50)}"></i><i class="g-pill"></i></div>`,
  () => `<div class="gp g-hero split"><div><i class="g-t" style="width:${w(70, 90)}"></i><i class="g-t" style="width:${w(50, 70)}"></i><i class="g-pill"></i></div><i class="g-circle"></i></div>`,
  () => `<div class="gp g-hero banner"><i class="g-t inv" style="width:${w(40, 60)}"></i><i class="g-pill light"></i></div>`,
];
const PARTS = [
  () => `<div class="gp g-chips">${times(4, (i) => `<i class="${i === 0 ? "on" : ""}" style="flex:${1 + (i % 2) * 0.4}"></i>`)}</div>`,
  () => `<div class="gp g-grid">${times(4, () => `<div class="g-card"><i class="g-img"></i><i class="g-t" style="width:${w(55, 85)}"></i><i class="g-t price" style="width:${w(30, 45)}"></i></div>`)}</div>`,
  () => `<div class="gp g-list">${times(3, () => `<div class="g-row"><i class="g-av"></i><span><i class="g-t" style="width:${w(55, 85)}"></i><i class="g-t thin" style="width:${w(35, 60)}"></i></span><i class="g-tag"></i></div>`)}</div>`,
  () => `<div class="gp g-cal"><div class="g-days">${times(6, (i) => `<i class="${i === 2 ? "on" : ""}"></i>`)}</div><div class="g-slots">${times(4, (i) => `<i class="${i === 1 ? "on" : ""}"></i>`)}</div></div>`,
  () => `<div class="gp g-stats">${times(3, () => `<div><i class="g-t big" style="width:${w(45, 70)}"></i><i class="g-t thin" style="width:${w(55, 80)}"></i></div>`)}</div>`,
  () => `<div class="gp g-map"><i class="g-pin"></i></div>`,
  () => `<div class="gp g-form"><i class="g-field"></i><i class="g-field"></i><i class="g-btn"></i></div>`,
  () => `<div class="gp g-thumbs">${times(3, () => `<i></i>`)}</div>`,
];
const FOOT = [
  () => `<div class="gp g-tabs">${times(4, (i) => `<i class="${i === 0 ? "on" : ""}"></i>`)}</div>`,
  () => `<div class="gp g-cta"><i class="g-t inv" style="width:${w(30, 45)}"></i></div>`,
];

/** A different app each call: an app bar, a hero, three of the parts in a random order, and a footer. */
export function ideaLayout() {
  const [bg, brand, accent, soft] = any(PALETTES);
  const parts = [...PARTS].sort(() => Math.random() - 0.5).slice(0, 3).map((f) => f()).join("");
  return `<div class="gx" style="--bg:${bg};--b:${brand};--a:${accent};--s:${soft}">${any(BAR)()}${any(HERO)()}${parts}${any(FOOT)()}</div>`;
}

/** The ideas in a fresh order for this visit. */
export const shuffledIdeas = () => [...IDEAS].sort(() => Math.random() - 0.5);
