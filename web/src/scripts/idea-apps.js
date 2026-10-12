// The hero's catch-all, "an app for your ✦ idea ✦": requests a Bangladeshi owner might type, and a kit of app
// parts the phone composes into a different app each time (layout, corners, spacing, card style and colours
// all drawn at random). No real app behind these.

export const IDEAS = [
  // food
  "Fresh hilsa from the Padma, ordered the night before", "Tiffin subscriptions for office workers in Motijheel",
  "Birthday cake orders for my home bakery", "Frozen parathas and samosas, ordered by the dozen",
  "Achar and pickles from my kitchen, sent across the country", "Iftar boxes, pre-ordered for every evening of Ramadan",
  "Fuchka and chotpoti for parties, delivered with the stall", "Mezban beef for weddings, booked by the pot",
  "Pitha from my mother's kitchen every winter", "Sundarbans honey, sold by the jar", "Green tea from our Sylhet garden",
  "Daily milk from our dairy farm, by subscription", "Monthly rice, dal and oil packs for families",
  "Fresh vegetables from our village farm to Dhaka flats", "Dates and sweets for Eid, gift-boxed",
  "Coffee from my roastery, delivered on Fridays", "A meal-prep plan for gym-goers in Gulshan",
  "Haleem orders for Ramadan, by the bowl", "Organic mustard oil from our ghani mill", "Mango pre-orders from Chapainawabganj",
  // fashion & crafts
  "A shop for handloom Tangail sarees", "A shop for nakshi kantha stitched by village women",
  "Rentals for wedding sherwanis and lehengas", "Custom panjabis, measured at your door",
  "Jamdani from Rupganj, straight from the weavers", "Leather sandals made to order in Hazaribagh",
  "Hijabs and scarves, new prints every Friday", "Kids' Eid outfits, sized by age", "Terracotta pots from my studio in Dhamrai",
  "Bamboo and cane furniture from Sylhet", "Silver jewellery, made to order", "Block-printed bedsheets from my workshop",
  "A catalogue for my furniture workshop in Kushtia", "Second-hand designer bags, checked and graded",
  // services
  "Laundry pickups across Uttara", "Home cleaning crews, booked by the visit", "Fridge and AC repairs, with the visit fee by bKash",
  "Repair bookings for my mobile phone shop", "Servicing slots at my motorbike garage", "Spare parts for my CNG workshop",
  "Plumbers and electricians on call in Mohammadpur", "Pest control visits for flats and offices",
  "House shifting with trucks and packers", "Car washes at your parking spot", "Interior design consultations, booked online",
  "Tailoring shop fittings, booked online", "A courier pickup service for small sellers",
  // health & beauty
  "Appointments at my physiotherapy chamber", "Bookings for my bridal mehendi team", "Home sample collection for my diagnostic lab",
  "Dental check-ups at my chamber, by serial", "Eye tests and glasses fitting at my optician shop", "Homeopathy consultations by appointment",
  "A women's gym with monthly memberships", "Morning yoga classes on our rooftop", "Bridal makeup bookings for wedding season",
  "Barbershop slots, no more waiting on Fridays", "Nutrition plans with weekly check-ins", "Counselling sessions, booked in private",
  // learning
  "Tutors matched with students around Mirpur", "Seat booking for my coaching centre's model tests",
  "Coding classes for kids, with monthly fees", "Spoken English courses with weekend batches", "Quran classes for children, fees by month",
  "Art classes for kids on Saturdays", "Music lessons: guitar, tabla and harmonium", "Admission test prep for medical colleges",
  "IELTS mock tests, booked by the slot", "Driving lessons, paid by bKash", "Swimming lessons at our club pool",
  "Second-hand textbooks, sold by students", "A library for our neighbourhood, with late fees",
  // events & community
  "Team sign-ups for our neighbourhood cricket tournament", "Stall sign-ups for our Pohela Boishakh fair",
  "Tickets for our university's cultural night", "Donations for our mosque's new roof", "Blood donor sign-ups for our club",
  "Puja committee donations and prasad orders", "Wedding RSVPs with a gift registry", "Alumni reunion tickets and T-shirts",
  "Football turf slots, booked by the hour", "A booking app for my rooftop futsal turf", "Picnic spot bookings near Gazipur",
  "Eid photo sessions at my studio, booked by the hour", "Seats for our weekend theatre show",
  // property & travel
  "Rent collection for the flats in my building", "Room booking for my Cox's Bazar guesthouse",
  "Boat trips on the haor, booked by the day", "Tea garden stays in Sreemangal", "Office desks to rent by the month",
  "Parking spots to rent in Banani", "Hostel seats for students in Dhaka", "Tour packages to the Sundarbans",
  // farm & trade
  "Cattle for Qurbani, booked with a deposit", "Fish fry from my hatchery, sold to farmers", "Seeds and fertiliser orders for farmers",
  "Wholesale orders for my garments factory's surplus", "Bulk rice orders for restaurants", "Saplings from my nursery, delivered",
  "A plant shop for my rooftop nursery", "Office lunch group orders, split by bKash",
];

// Curated palettes [background, brand, accent, soft, ink]
const CURATED = [
  ["#fff8f0", "#9a4a24", "#e2a157", "#f3e3d3"], ["#f2f7f4", "#0f7a6c", "#7cc6b5", "#d9ece6"], ["#f6f2fb", "#6a3d8f", "#c39be0", "#e7dcf2"],
  ["#fff6f4", "#b03a2e", "#f2a65a", "#f6dcd6"], ["#f2f6fb", "#1739a8", "#7aa2f7", "#dde6f7"], ["#fbf7ea", "#0b5d3b", "#e5b400", "#e9efd9"],
  ["#fdf3fb", "#a21caf", "#f0abfc", "#f5dcf3"], ["#f1f7fb", "#0369a1", "#38bdf8", "#dbeefa"], ["#14213d", "#ffcc00", "#e2261b", "#25345a"],
  ["#fffaf2", "#e2261b", "#ffcc00", "#fde7cf"],
];
const rnd = (lo, hi) => lo + Math.random() * (hi - lo);
const any = (a) => a[Math.floor(Math.random() * a.length)];
// A palette from a random hue: light, dark or pastel; the accent sits beside or opposite the brand
function generated() {
  const h = Math.round(rnd(0, 360)), off = any([30, 150, 180, 200, -40]), a = (h + off + 360) % 360;
  switch (any(["light", "light", "dark", "pastel"])) {
    case "dark": return [`hsl(${h} 28% 11%)`, `hsl(${h} 85% 64%)`, `hsl(${a} 80% 62%)`, `hsl(${h} 22% 21%)`];
    case "pastel": return [`hsl(${h} 60% 96%)`, `hsl(${h} 45% 52%)`, `hsl(${a} 70% 78%)`, `hsl(${h} 50% 88%)`];
    default: return [`hsl(${h} 40% 97%)`, `hsl(${h} 68% ${Math.round(rnd(32, 44))}%)`, `hsl(${a} 75% 58%)`, `hsl(${h} 45% 90%)`];
  }
}

const w = (lo, hi) => `${Math.round(rnd(lo, hi))}%`;
const times = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const t = (lo, hi, cls = "") => `<i class="g-t ${cls}" style="width:${w(lo, hi)}"></i>`;

// Each part is a few shapes: text is a bar, a photo is a tinted block, buttons are pills.
const BAR = [
  () => `<div class="gp g-bar"><i class="g-logo"></i>${t(30, 45)}<i class="g-ic"></i><i class="g-ic"></i></div>`,
  () => `<div class="gp g-bar centre"><i class="g-ic"></i>${t(28, 40)}<i class="g-ic"></i></div>`,
  () => `<div class="gp g-bar"><i class="g-logo"></i><i class="g-search"></i></div>`,
  () => `<div class="gp g-bar"><i class="g-ic"></i><i class="g-search"></i><i class="g-ic"></i></div>`,
  () => `<div class="gp g-profile"><i class="g-av big"></i><span>${t(50, 70, "big")}${t(35, 55, "thin")}</span></div>`,
];
const HERO = [
  () => `<div class="gp g-hero photo">${t(45, 70, "inv")}${t(30, 50, "inv thin")}<i class="g-pill"></i></div>`,
  () => `<div class="gp g-hero split"><div>${t(70, 90)}${t(50, 70)}<i class="g-pill"></i></div><i class="g-circle"></i></div>`,
  () => `<div class="gp g-hero banner">${t(40, 60, "inv")}<i class="g-pill light"></i></div>`,
  () => `<div class="gp g-hero radial">${t(50, 70, "inv big")}${t(35, 55, "inv thin")}<div class="g-dots"><i class="on"></i><i></i><i></i></div></div>`,
  () => `<div class="gp g-hero video"><i class="g-play"></i></div>`,
  () => `<div class="gp g-hero type">${t(80, 95, "huge")}${t(55, 75, "huge")}${t(40, 60, "thin")}</div>`,
];
const PARTS = [
  () => `<div class="gp g-chips">${times(4, (i) => `<i class="${i === 0 ? "on" : ""}" style="flex:${1 + (i % 2) * 0.4}"></i>`)}</div>`,
  () => `<div class="gp g-grid">${times(4, () => `<div class="g-card"><i class="g-img"></i>${t(55, 85)}${t(30, 45, "price")}</div>`)}</div>`,
  () => `<div class="gp g-grid three">${times(3, () => `<div class="g-card"><i class="g-img sq"></i>${t(55, 85)}</div>`)}</div>`,
  () => `<div class="gp g-list">${times(3, () => `<div class="g-row"><i class="g-av"></i><span>${t(55, 85)}${t(35, 60, "thin")}</span><i class="g-tag"></i></div>`)}</div>`,
  () => `<div class="gp g-cal"><div class="g-days">${times(6, (i) => `<i class="${i === 2 ? "on" : ""}"></i>`)}</div><div class="g-slots">${times(4, (i) => `<i class="${i === 1 ? "on" : ""}"></i>`)}</div></div>`,
  () => `<div class="gp g-stats">${times(3, () => `<div>${t(45, 70, "big")}${t(55, 80, "thin")}</div>`)}</div>`,
  () => `<div class="gp g-map"><i class="g-pin"></i></div>`,
  () => `<div class="gp g-form"><i class="g-field"></i><i class="g-field"></i><i class="g-btn"></i></div>`,
  () => `<div class="gp g-thumbs">${times(3, () => `<i></i>`)}</div>`,
  () => `<div class="gp g-menu">${times(4, () => `<div class="g-mrow">${t(40, 65)}<i class="g-lead"></i>${t(12, 18, "price")}</div>`)}</div>`,
  () => `<div class="gp g-ticket"><div>${t(55, 80, "big")}${t(40, 60, "thin")}</div><i class="g-qr"></i></div>`,
  () => `<div class="gp g-chat"><i class="g-bub l" style="width:${w(55, 75)}"></i><i class="g-bub r" style="width:${w(45, 65)}"></i><i class="g-bub l" style="width:${w(35, 55)}"></i></div>`,
  () => `<div class="gp g-steps">${times(4, (i) => `<i class="${i < 2 ? "on" : ""}"></i>`)}</div>`,
  () => `<div class="gp g-plans">${times(2, (i) => `<div class="${i === 1 ? "on" : ""}">${t(40, 60)}${t(50, 70, "big")}<i class="g-pill"></i></div>`)}</div>`,
  () => `<div class="gp g-progress">${t(40, 60)}<div class="g-track"><i style="width:${w(35, 85)}"></i></div></div>`,
  () => `<div class="gp g-count">${times(4, () => `<i></i>`)}</div>`,
  () => `<div class="gp g-toggles">${times(3, (i) => `<div class="g-tg">${t(40, 65)}<i class="g-sw ${i !== 1 ? "on" : ""}"></i></div>`)}</div>`,
  () => `<div class="gp g-receipt">${times(3, () => `<div class="g-mrow">${t(35, 55)}<i class="g-lead"></i>${t(12, 18)}</div>`)}<div class="g-mrow tot">${t(25, 35, "big")}<i class="g-lead"></i>${t(18, 24, "big")}</div></div>`,
];
const FOOT = [
  () => `<div class="gp g-tabs">${times(4, (i) => `<i class="${i === 0 ? "on" : ""}"></i>`)}</div>`,
  () => `<div class="gp g-cta">${t(30, 45, "inv")}</div>`,
  () => `<div class="gp g-cta split"><i class="g-qty"></i><span>${t(40, 60, "inv")}</span></div>`,
  () => "",
];

/** A different app each call: colours, corners, spacing and card style drawn at random, then an app bar, a hero,
 *  two to four parts in a random order, and a footer. */
export function ideaLayout() {
  const [bg, brand, accent, soft] = Math.random() < 0.45 ? any(CURATED) : generated();
  const radius = any(["3px", "8px", "14px", "20px"]);
  const gap = any(["7px", "9px", "12px"]);
  const card = any(["flat", "outline", "shadow"]);
  const dark = /^hsl\(\d+ 28% 11%\)$/.test(bg) || bg === "#14213d";
  const parts = [...PARTS].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 3)).map((f) => f()).join("");
  return `<div class="gx c-${card}${dark ? " dark" : ""}" style="--bg:${bg};--b:${brand};--a:${accent};--s:${soft};--gr:${radius};--gg:${gap}">${any(BAR)()}${any(HERO)()}${parts}${any(FOOT)()}</div>`;
}

/** A random idea, never the same one twice running. */
let last = -1;
export function randomIdea() {
  let n;
  do n = Math.floor(Math.random() * IDEAS.length); while (n === last && IDEAS.length > 1);
  last = n;
  return IDEAS[n];
}
