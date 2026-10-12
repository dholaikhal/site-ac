// The fictional apps the site shows being built: their requests, changes and screens.
// Shared by the builder demo (demo.js) and the hero's quick build (hero-build.js).
// Copy rule: the product is "our agent" / "our store agent", never "AI" or a model.
import { icon, stars, heroArt } from "./app-art.js";
// Product photos (Unsplash License; credits on the Sources page)
import imgTote from "../assets/photos/bag-tote.jpg";
import imgPrinted from "../assets/photos/bag-printed.jpg";
import imgWoven from "../assets/photos/bag-woven.jpg";
import imgPouch from "../assets/photos/bag-pouch.jpg";
import imgKacchi from "../assets/photos/food-biryani-plate.jpg";
import imgChicken from "../assets/photos/food-biryani-bowl.jpg";
import imgCake from "../assets/photos/food-cake.jpg";
const src = (m) => (typeof m === "string" ? m : m.src);

export const tk = (n) => "Tk " + n.toLocaleString("en-IN");
export const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// ---------- Fictional apps ----------
export const PAY = ["bKash", "Nagad", "Card"];
export const APPS = {
  shop: {
    label: "Facebook store",
    match: /shop|sell|store|bag|cloth|saree|dress|product|boutique|jewel|deliver|dokan|bikri|becha/i,
    prompt: "A store for my handmade bags with bKash payment, delivery, and an SMS when the order ships",
    bn: "Amar handmade bag er jonno ekta online store chai, bKash e payment, delivery, ar order ship hole customer ke SMS",
    name: "Goldweave", slug: "goldweave", color: "#9a4a24",
    kind: "store with courier booking",
    plan: ["Pages: home, product, checkout", "Payments: bKash, Nagad, card", "Delivery: courier booked on dispatch", "SMS: order confirmed, order shipped"],
    model: "products, orders, customers, deliveries",
    tabs: [["home", "Home"], ["item", "Product"], ["pay", "Checkout"], ["sms", "SMS"]],
    adminTab: ["admin", "Orders"],
    special: { chip: "Offer cash on delivery inside Dhaka only", bn: "Shudhu Dhakar bhitore cash on delivery rakho", match: /cash|cod|dhaka/i, key: "cod", screen: "pay",
      reply: "Cash on delivery now shows only for Dhaka addresses.", bnReply: "Cash on delivery ekhon shudhu Dhakar address e dekhabe.", touched: "checkout, address rule" },
  },
  kitchen: {
    label: "Home kitchen",
    match: /kitchen|food|biryani|kacchi|cake|bakery|restaurant|meal|tiffin|khabar|ranna/i,
    prompt: "Orders for my home kitchen: kacchi biryani and cakes, with a delivery time and bKash payment",
    bn: "Amar home kitchen er order nite chai, kacchi ar cake, delivery time bechhe nibe, bKash e payment",
    name: "Shorshe Kitchen", slug: "shorshekitchen", color: "#b03a2e",
    kind: "food orders with delivery times",
    plan: ["Pages: menu, dish, checkout", "Payments: bKash, Nagad, card", "Delivery: customers pick a time", "SMS: order confirmed, on the way"],
    tabs: [["home", "Menu"], ["item", "Dish"], ["pay", "Checkout"], ["sms", "SMS"]],
    adminTab: ["admin", "Orders"],
    special: { chip: "Orders after 8 pm go to the next day", bn: "Raat 8 tar por order porer diner jonno nao", match: /8 ?pm|next.?day|porer din|cut.?off/i, key: "cutoff", screen: "pay",
      reply: "Orders after 8 pm now go to next-day delivery.", bnReply: "Raat 8 tar por order ekhon porer diner delivery te jabe.", touched: "delivery times" },
  },
  book: {
    label: "Salon",
    match: /book|appoint|salon|tutor|parlou?r|parlar|spa|gym|slot/i,
    prompt: "Online bookings for my salon with a deposit paid by bKash and a reminder SMS",
    bn: "Amar salon er online booking lagbe, bKash e advance nibo, ar booking hole SMS jabe",
    name: "Glow Room", slug: "glowroom", color: "#6a3d8f",
    kind: "bookings with a deposit",
    plan: ["Pages: services, pick a time, deposit", "Payments: deposit by bKash, Nagad or card", "Calendar: your opening hours", "SMS: booking confirmed"],
    model: "services, slots, bookings, customers",
    tabs: [["home", "Services"], ["item", "Pick a time"], ["pay", "Deposit"], ["sms", "SMS"]],
    adminTab: ["admin", "Bookings"],
    special: { chip: "Send a reminder SMS the day before", bn: "Appointment er ager din reminder SMS pathao", match: /remind|day before|ager din/i, key: "remind", screen: "sms",
      reply: "Reminders now go out at 6 pm the day before.", bnReply: "Ekhon ager din shondha 6 tay reminder jabe.", touched: "SMS schedule" },
  },
  doctor: {
    label: "Clinic",
    match: /clinic|doctor|chamber|serial|patient|daktar|hospital|dental|dent/i,
    prompt: "Serial booking for my clinic's evening chamber, with a booking fee by bKash and the serial number by SMS",
    bn: "Amar chamber er serial online e dite chai, bKash e booking fee, ar SMS e serial number jabe",
    name: "CarePoint Clinic", slug: "carepoint", color: "#0f7a6c",
    kind: "serial booking for a doctor's chamber",
    plan: ["Pages: doctors, pick a day, booking fee", "Payments: booking fee by bKash, Nagad or card", "Serials: numbered by expected time", "SMS: serial number and time"],
    tabs: [["home", "Doctors"], ["item", "Pick a serial"], ["pay", "Booking fee"], ["sms", "SMS"]],
    adminTab: ["admin", "Serials"],
    special: { chip: "Text patients when 3 serials are left before them", bn: "Ager 3 ta serial baki thakle patient ke SMS dao", match: /3 serials|serials? (are )?left|baki|before them/i, key: "near", screen: "sms",
      reply: "Patients now get an SMS when 3 serials are left before them.", bnReply: "Ekhon ager 3 ta serial baki thakle patient SMS pabe.", touched: "SMS schedule" },
  },
  pharmacy: {
    label: "Pharmacy",
    match: /pharmac|medicine|oshudh|prescription|drug ?store/i,
    prompt: "Medicine orders for my pharmacy: upload a prescription, pay by bKash, delivered within the hour",
    bn: "Amar pharmacy er jonno online order chai, prescription upload, bKash e payment, ek ghontay delivery",
    name: "Shefa Pharmacy", slug: "shefapharmacy", color: "#1d5fa8",
    kind: "medicine orders with prescriptions",
    plan: ["Pages: medicines, prescription upload, checkout", "Payments: bKash, Nagad, card", "Delivery: a rider within the hour", "SMS: order confirmed, rider on the way"],
    tabs: [["home", "Medicines"], ["item", "Prescription"], ["pay", "Checkout"], ["sms", "SMS"]],
    adminTab: ["admin", "Orders"],
    special: { chip: "Ask for a prescription on antibiotics", bn: "Antibiotic kinte prescription lagbe", match: /antibiotic|prescription/i, key: "rx", screen: "item",
      reply: "Antibiotics now need a prescription photo before checkout.", bnReply: "Antibiotic kinte ekhon prescription er chhobi lagbe.", touched: "checkout rule" },
  },
  event: {
    label: "Event tickets",
    match: /ticket|event|concert|workshop|seminar|onushthan|gaan/i,
    prompt: "Tickets for our Friday music night, with seat types, bKash payment and the ticket by SMS",
    bn: "Amader shukrobar er gaaner onushthaner ticket bikri korte chai, bKash e payment, SMS e ticket",
    name: "Shondha Live", slug: "shondhalive", color: "#a21caf",
    kind: "event tickets",
    plan: ["Pages: event, tickets, checkout", "Payments: bKash, Nagad, card", "Tickets: a QR code checked at the gate", "SMS: the ticket and a reminder"],
    tabs: [["home", "Event"], ["item", "Tickets"], ["pay", "Checkout"], ["sms", "Ticket"]],
    adminTab: ["admin", "Sales"],
    special: { chip: "Early-bird price until Wednesday", bn: "Budhbar porjonto early-bird dam rakho", match: /early|budhbar|wednesday/i, key: "early", screen: "item",
      reply: "Early-bird tickets are Tk 100 less until Wednesday.", bnReply: "Budhbar porjonto early-bird ticket Tk 100 kom.", touched: "ticket prices" },
  },
  service: {
    label: "AC servicing",
    match: /\bac\b|air ?con|servicing|repair|plumb|electrician|technician|mistri/i,
    prompt: "Bookings for my AC servicing team: pick a time, pay a visit fee by bKash, the technician's name by SMS",
    bn: "Amar AC servicing er booking chai, shomoy bechhe nibe, bKash e visit fee, SMS e technician er naam",
    name: "Thanda AC Care", slug: "thandaac", color: "#0369a1",
    kind: "home-service bookings",
    plan: ["Pages: services, pick a time, visit fee", "Payments: visit fee by bKash, Nagad or card", "Schedule: your team's free slots", "SMS: technician's name and time"],
    tabs: [["home", "Services"], ["item", "Pick a time"], ["pay", "Visit fee"], ["sms", "SMS"]],
    adminTab: ["admin", "Jobs"],
    special: { chip: "Add Tk 200 for visits outside Dhanmondi", bn: "Dhanmondi er baire visit e Tk 200 extra rakho", match: /outside|baire|dhanmondi/i, key: "zone", screen: "pay",
      reply: "Visits outside Dhanmondi now add Tk 200.", bnReply: "Dhanmondi er baire visit e ekhon Tk 200 extra.", touched: "visit fee rule" },
  },
  fees: {
    label: "Coaching centre",
    match: /fee|school|coach|club|member|tuition|madrasa|association|student|class|batch|beton|mashik|chhatro|chatro/i,
    prompt: "Monthly fee collection for my coaching centre, paid by bKash or Nagad, with an SMS receipt",
    bn: "Amar coaching center er mashik fee bKash ba Nagad e nite chai, guardian er kache SMS receipt jabe",
    name: "Bright Path Coaching", slug: "brightpath", color: "#1f5f8b",
    kind: "fee and membership collection",
    plan: ["Pages: find your student, pay fees, receipt", "Payments: bKash, Nagad, card", "Records: students and batches", "SMS: receipt to the guardian"],
    model: "students, batches, invoices, payments",
    tabs: [["home", "Home"], ["item", "Pay fees"], ["pay", "Payment"], ["sms", "Receipt"]],
    adminTab: ["admin", "Collected"],
    special: { chip: "Add a Tk 100 late fee after the 10th", bn: "10 tarikher pore Tk 100 late fee jog koro", match: /late|fine|penalt|after the|tarikh|jorimana/i, key: "late", screen: "pay",
      reply: "Fees paid after the 10th now add Tk 100.", bnReply: "10 tarikher pore fee dile Tk 100 jog hobe.", touched: "invoice rule, payment page" },
  },
};
export const COMMON = [
  { chip: "Add 10% off for bKash payments", bn: "bKash e payment korle 10% chhar dao", match: /10|%|off|discount|chhar/i, key: "off", screen: "pay",
    reply: "bKash payments now get 10% off.", bnReply: "bKash e payment korle ekhon 10% chhar.", touched: "checkout total, payment option" },
  { chip: "Make it green", bn: "Rong ta shobuj kore dao", match: /green|colou?r|theme|blue|red|shobuj|rong/i, key: "green", screen: "home",
    reply: "Done. It's green now.", bnReply: "Hoye geche. Ekhon shobuj.", touched: "theme" },
];
// What the customer pays, after the changes the owner asked for.
export const amount = (st) => ({
  shop: 1530 - (st.off ? 145 : 0),
  kitchen: 960 - (st.off ? 90 : 0),
  book: 300 - (st.off ? 30 : 0),
  doctor: 200 - (st.off ? 20 : 0),
  pharmacy: 580 - (st.off ? 54 : 0),
  event: (st.early ? 800 : 1000) - (st.off ? (st.early ? 80 : 100) : 0),
  service: 500 + (st.zone ? 200 : 0) - (st.off ? 50 : 0),
  fees: 2500 + (st.late ? 100 : 0) - (st.off ? 250 : 0),
})[st.app];


// ---------- Screens (fictional content) ----------
// Each screen is a stack of sections ("blocks") so the build can paint them in one at a time;
// finished, they read as one app: app bar, hero, content, bottom bar.
const b = (label, html, cls = "") => `<div class="b ${cls}" data-l="${label}">${html}</div>`;
const ch = (on) => (on ? " changed" : "");
const initial = (name) => name.split(/\s|&/)[0][0];
const appBar = (st, right = ["search", "bag"], badge = 0) => {
  const a = APPS[st.app];
  return `<div class="ah"><span class="mark">${initial(a.name)}</span><strong>${esc(a.name)}</strong><nav class="ah-nav">${a.tabs.slice(0, 3).map(([, l]) => `<span>${l}</span>`).join("")}<span>Contact</span></nav><span class="ah-ic">${right.map((r) => `<span class="ib">${icon(r)}${r === "bag" && badge ? `<i>${badge}</i>` : ""}</span>`).join("")}</span></div>`;
};
const subBar = (title, right = "") => `<div class="ah sub"><span class="ib">${icon("back")}</span><strong>${title}</strong><span class="ah-ic">${right}</span></div>`;
const tabbar = (items, on = 0) => `<nav class="tabbar">${items.map(([ic, l], i) => `<span class="${i === on ? "on" : ""}">${icon(ic)}${l}</span>`).join("")}</nav>`;
const hero = (st, title, sub, cta) => `<div class="hero-b"><div><span>${title}</span><small>${sub}</small><em>${cta}</em></div>${heroArt[st.app]()}</div>`;
const methods = (st, amount) => {
  const opts = PAY.map((p, i) => {
    const off = st.off && p === "bKash";
    return `<label class="pm${i === 0 ? " sel" : ""}"><span class="radio"></span><span class="pm-name">${p}</span>${off ? '<span class="badge">10% off</span>' : `<span class="pm-note">${p === "Card" ? "Visa, Mastercard" : "Wallet"}</span>`}</label>`;
  }).join("");
  const cod = st.cod && st.app === "shop" ? `<label class="pm"><span class="radio"></span><span class="pm-name">Cash on delivery</span><span class="pm-note">Dhaka only</span></label>` : "";
  return `<div class="sec"><h5>Pay with</h5>${opts}${cod}</div><div class="paybar"><div class="paybtn">Pay ${tk(amount)}</div></div>`;
};
const steps3 = (at) => `<ol class="stepper">${["Bag", "Address", "Pay"].map((l, i) => `<li class="${i < at ? "done" : i === at ? "on" : ""}"><span>${i < at ? icon("check") : i + 1}</span>${l}</li>`).join("")}</ol>`;

const ph = (img, cls = "") => `<img class="ph ${cls}" src="${src(img)}" alt="" loading="lazy">`;
const heroPhoto = (title, sub, cta, img) => `<div class="hero-b photo">${ph(img, "bg")}<div><span>${title}</span><small>${sub}</small><em>${cta}</em></div></div>`;
const PRODUCTS = [["Market tote", 1450, imgTote], ["Printed tote", 1250, imgPrinted], ["Woven handbag", 1850, imgWoven], ["Jute pouch", 350, imgPouch]];
const MENU = [["Kacchi biryani", 450, imgKacchi, "Mutton, aloo, borhani on the side"], ["Chicken biryani", 320, imgChicken, "With egg and salad"], ["Chocolate cake", 850, imgCake, "1 lb, order a day ahead"]];
const DOCTORS = [["AR", "Dr. A. Rahman", "Medicine", 800, 6], ["SA", "Dr. S. Akter", "Paediatrics", 700, 3], ["MH", "Dr. M. Hossain", "Gynaecology", 1000, 9]];
const MEDS = [["Paracetamol 500 mg", "10 tablets", 20], ["Oral saline", "10 sachets", 60], ["Digital thermometer", "Fast reading", 350], ["Antacid syrup", "200 ml", 110]];
const TICKETS = [["General", 500, 64], ["Front rows", 900, 12], ["Student", 300, 30]];
const JOBS = [["AC servicing", 1500, "1–2 hr", "snow"], ["Gas refill", 3500, "1 hr", "wrench"], ["New AC installation", 2500, "2–3 hr", "wrench"]];
const SERVICES = [["Haircut", 600, "45 min", "scissors"], ["Hair colour", 2200, "2 hr", "drop"], ["Facial", 1500, "1 hr", "sparkle"], ["Manicure", 700, "40 min", "hand"]];

export const SCREENS = {
  shop: {
    home: (st) =>
      b("app bar", appBar(st), ch(st.flash === "green")) +
      b("hero", heroPhoto("The golden fibre, woven by hand", "Jute bags · delivery across Bangladesh", "Shop now", imgPrinted), ch(st.flash === "green")) +
      b("categories", `<div class="cats"><span class="on">All</span><span>Totes</span><span>Handbags</span><span>Pouches</span><span>Gifts</span></div>`) +
      b("products", `<div class="row-h"><h5>New this week</h5><span>See all</span></div><div class="pgrid">${PRODUCTS.map(([n, p, img], i) =>
        `<div class="pc"><div class="pimg">${ph(img)}<span class="fav">${icon("heart")}</span>${i === 0 ? '<span class="new">New</span>' : ""}</div><span class="pn">${n}</span><b>${tk(p)}</b></div>`).join("")}</div>`) +
      b("payment note", `<p class="strip">${icon("truck")} Pay by bKash, Nagad or card${st.cod ? ", or cash in Dhaka" : ""}</p>`, ch(st.flash === "cod")) +
      b("tab bar", tabbar([["home", "Home"], ["search", "Search"], ["bag", "Bag"], ["user", "Account"]])),
    item: (st) =>
      b("app bar", subBar("Market tote", `<span class="ib">${icon("bag")}<i>1</i></span>`)) +
      b("gallery", `<div class="gallery">${ph(imgTote)}<span class="dots"><i class="on"></i><i></i><i></i></span></div>`) +
      b("title", `<div class="sec"><h4>Market tote</h4><div class="rate">${stars(5)}<span>Handmade · 38 × 42 cm</span></div><div class="price">${tk(1450)}${st.off ? '<span class="badge">10% off with bKash</span>' : ""}</div></div>`, ch(st.flash === "off")) +
      b("options", `<div class="sec"><h5>Colour</h5><div class="swatches"><span class="on" style="--c:#cdb48a"></span><span style="--c:#6b5440"></span><span style="--c:#2f3b55"></span></div><p class="muted">Woven jute, cotton lining, inside pocket. Courier booked when it ships.</p></div>`) +
      b("add to bag", `<div class="paybar"><div class="qty"><span>−</span>1<span>+</span></div><div class="paybtn">Add to bag</div></div>`),
    pay: (st) => {
      const items = 1450, del = 80, off = st.off ? Math.round(items * 0.1) : 0;
      return b("app bar", subBar("Checkout")) + b("steps", steps3(2)) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="thumb">${ph(imgTote)}</span><span>Market tote<small>Qty 1</small></span><b>${tk(items)}</b></div><div class="row"><span>Delivery</span><span>${tk(del)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(items + del - off)}</span></div></div>`, ch(st.flash === "off")) +
        b("address", `<div class="sec card addr">${icon("home")}<span><b>Deliver to</b>House 12, Road 5, Mirpur 10, Dhaka</span></div>`, ch(st.flash === "cod")) +
        b("payment", methods(st, items + del - off), ch(st.flash === "off" || st.flash === "cod"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.shop.name}: order #1042 confirmed. ${tk(1530 - (st.off ? 145 : 0))} paid by bKash${st.off ? " (10% off applied)" : ""}.`,
      `${APPS.shop.name}: your order has shipped. Track it at ${APPS.shop.slug}.amader.cloud/t/1042`,
    ], st.flash === "off"),
    admin: (st) => adminScreen(st, "Orders", [["#1042 · Market tote", tk(1530 - (st.off ? 145 : 0)), "Paid by bKash", "Courier booked"]]),
  },
  kitchen: {
    home: (st) =>
      b("app bar", appBar(st), ch(st.flash === "green")) +
      b("hero", heroPhoto("Kacchi every Friday", "Home-cooked in Mohammadpur · delivered hot", "Order now", imgKacchi), ch(st.flash === "green")) +
      b("categories", `<div class="cats"><span class="on">All</span><span>Biryani</span><span>Cakes</span><span>Snacks</span></div>`) +
      b("menu", `<div class="row-h"><h5>Today's menu</h5><span>Delivery 12–9 pm</span></div><div class="menu">${MENU.map(([n, p, img, d]) =>
        `<div class="dish">${ph(img)}<span class="dish-t">${n}<small>${d}</small><b>${tk(p)}</b></span><span class="add">+</span></div>`).join("")}</div>`) +
      b("tab bar", tabbar([["home", "Menu"], ["receipt", "Orders"], ["user", "Account"]])),
    item: (st) =>
      b("app bar", subBar("Kacchi biryani", `<span class="ib">${icon("bag")}<i>2</i></span>`)) +
      b("gallery", `<div class="gallery wide">${ph(imgKacchi)}</div>`) +
      b("title", `<div class="sec"><h4>Kacchi biryani</h4><div class="rate">${stars(5)}<span>Mutton, aloo, borhani on the side</span></div><div class="price">${tk(450)}${st.off ? '<span class="badge">10% off with bKash</span>' : ""}</div></div>`, ch(st.flash === "off")) +
      b("options", `<div class="sec"><h5>Delivery time</h5><div class="slots">${["12–1 pm", "1–2 pm", "7–8 pm", "8–9 pm"].map((t, i) => `<span class="${i === 1 ? "sel" : ""}">${t}</span>`).join("")}</div></div>`) +
      b("add", `<div class="paybar"><div class="qty"><span>−</span>2<span>+</span></div><div class="paybtn">Add ${tk(900)}</div></div>`),
    pay: (st) => {
      const items = 900, del = 60, off = st.off ? 90 : 0;
      return b("app bar", subBar("Checkout")) + b("steps", steps3(2)) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="thumb">${ph(imgKacchi)}</span><span>Kacchi biryani<small>Qty 2</small></span><b>${tk(items)}</b></div><div class="row"><span>Delivery</span><span>${tk(del)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(items + del - off)}</span></div></div>`, ch(st.flash === "off")) +
        b("when", `<div class="sec card addr">${icon("clock")}<span><b>${st.cutoff ? "Tomorrow, 1–2 pm" : "Today, 1–2 pm"}</b>${st.cutoff ? "Ordered after 8 pm: next-day delivery" : "House 7, Road 3, Mohammadpur"}</span></div>`, ch(st.flash === "cutoff")) +
        b("payment", methods(st, items + del - off), ch(st.flash === "off"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.kitchen.name}: order #207 confirmed. ${tk(960 - (st.off ? 90 : 0))} paid by bKash. Delivery ${st.cutoff ? "tomorrow" : "today"} 1–2 pm.`,
      `${APPS.kitchen.name}: your food is on the way. Track it at ${APPS.kitchen.slug}.amader.cloud/t/207`,
    ], st.flash === "off" || st.flash === "cutoff"),
    admin: (st) => adminScreen(st, "Orders", [["#207 · Kacchi × 2", tk(960 - (st.off ? 90 : 0)), "Paid by bKash", "Out for delivery"]]),
  },
  book: {
    home: (st) =>
      b("app bar", appBar(st, ["search", "user"]), ch(st.flash === "green")) +
      b("hero", hero(st, "Hair, skin and nails", "Banani · open 11 am to 8 pm", "Book a time"), ch(st.flash === "green")) +
      b("services", `<div class="row-h"><h5>Services</h5><span>Prices</span></div><div class="svc-list">${SERVICES.map(([n, p, d, ic]) =>
        `<div class="svc"><span class="svc-ic">${icon(ic)}</span><span class="svc-t">${n}<small>${icon("clock")}${d}</small></span><b>${tk(p)}</b><span class="add">+</span></div>`).join("")}</div>`) +
      b("tab bar", tabbar([["home", "Home"], ["cal", "Bookings"], ["user", "Account"]])),
    item: (st) =>
      b("app bar", subBar("Hair colour")) +
      b("service", `<div class="sec card svc-card"><span class="svc-ic big">${icon("drop")}</span><span><b>Hair colour</b><small>2 hr · ${tk(2200)}</small></span></div>`) +
      b("date", `<div class="sec"><h5>October</h5><div class="days">${[["Mon", 6], ["Tue", 7], ["Wed", 8], ["Thu", 9], ["Fri", 10], ["Sat", 11]].map(([d, n], i) => `<span class="${i === 3 ? "sel" : ""}"><small>${d}</small>${n}</span>`).join("")}</div></div>`) +
      b("times", `<div class="sec"><h5>Thursday</h5><div class="slots">${["11:00 am", "1:30 pm", "4:30 pm", "6:00 pm", "7:15 pm"].map((t, i) => `<span class="${i === 2 ? "sel" : i === 1 ? "gone" : ""}">${t}</span>`).join("")}</div></div>`) +
      b("continue", `<div class="paybar"><span class="pb-note">Thu 9 Oct, 4:30 pm</span><div class="paybtn">Continue</div></div>`),
    pay: (st) => {
      const dep = 300, off = st.off ? 30 : 0;
      return b("app bar", subBar("Deposit")) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="thumb glyph">${icon("drop")}</span><span>Hair colour<small>${icon("cal")} Thu 9 Oct, 4:30 pm</small></span><b>${tk(2200)}</b></div><div class="row"><span>Deposit now</span><span>${tk(dep)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Pay now</span><span>${tk(dep - off)}</span></div><p class="muted">The rest is paid at the salon.</p></div>`, ch(st.flash === "off")) +
        b("payment", methods(st, dep - off), ch(st.flash === "off"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.book.name}: booking confirmed for Thu 4:30 pm, hair colour. Deposit ${tk(300 - (st.off ? 30 : 0))} received.`,
      ...(st.remind ? [`${APPS.book.name}: reminder, see you tomorrow at 4:30 pm. Need to change it? ${APPS.book.slug}.amader.cloud/r/88`] : []),
    ], st.flash === "remind" || st.flash === "off"),
    admin: (st) => adminScreen(st, "Bookings", [["Thu 4:30 pm · Hair colour", tk(300 - (st.off ? 30 : 0)), "Deposit by bKash", "Confirmed"]]),
  },
  doctor: {
    home: (st) =>
      b("app bar", appBar(st, ["search", "user"]), ch(st.flash === "green")) +
      b("hero", hero(st, "Evening chamber", "Saturday to Thursday, 5 to 9 pm", "Get a serial"), ch(st.flash === "green")) +
      b("doctors", `<div class="row-h"><h5>Doctors today</h5><span>Thu 9 Oct</span></div><div class="svc-list">${DOCTORS.map(([ini, n, sp, fee, left]) =>
        `<div class="svc"><span class="doc-av">${ini}</span><span class="svc-t">${n}<small>${sp} · ${tk(fee)}</small></span><em class="pill">${left} left</em></div>`).join("")}</div>`) +
      b("tab bar", tabbar([["home", "Doctors"], ["cal", "My serials"], ["user", "Account"]])),
    item: (st) =>
      b("app bar", subBar("Dr. A. Rahman")) +
      b("doctor", `<div class="sec card svc-card"><span class="doc-av big">AR</span><span><b>Dr. A. Rahman</b><small>Medicine · consultation ${tk(800)} at the chamber</small></span></div>`) +
      b("date", `<div class="sec"><h5>October</h5><div class="days">${[["Mon", 6], ["Tue", 7], ["Wed", 8], ["Thu", 9], ["Sat", 11], ["Sun", 12]].map(([d, n], i) => `<span class="${i === 3 ? "sel" : ""}"><small>${d}</small>${n}</span>`).join("")}</div></div>`) +
      b("serials", `<div class="sec"><h5>Serials · Thursday</h5><div class="serials">${Array.from({ length: 20 }, (_, i) => `<span class="${i < 12 ? "gone" : i === 12 ? "sel" : ""}">${i + 1}</span>`).join("")}</div><p class="muted">Serial 13: expected around 7:40 pm</p></div>`) +
      b("continue", `<div class="paybar"><span class="pb-note">Serial 13</span><div class="paybtn">Continue</div></div>`),
    pay: (st) => {
      const fee = 200, off = st.off ? 20 : 0;
      return b("app bar", subBar("Booking fee")) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="doc-av">AR</span><span>Serial 13 · Dr. A. Rahman<small>${icon("cal")} Thu 9 Oct, around 7:40 pm</small></span></div><div class="row"><span>Booking fee</span><span>${tk(fee)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Pay now</span><span>${tk(fee - off)}</span></div><p class="muted">Consultation is paid at the chamber.</p></div>`, ch(st.flash === "off")) +
        b("payment", methods(st, fee - off), ch(st.flash === "off"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.doctor.name}: serial 13 with Dr. A. Rahman, Thu 9 Oct, around 7:40 pm. Booking fee ${tk(200 - (st.off ? 20 : 0))} paid.`,
      ...(st.near ? [`${APPS.doctor.name}: 3 serials before yours. Please come to the chamber now.`] : []),
    ], st.flash === "near" || st.flash === "off"),
    admin: (st) => adminScreen(st, "Serials", [["Serial 13 · Dr. A. Rahman", tk(200 - (st.off ? 20 : 0)), "Booking fee by bKash", "Confirmed"]]),
  },
  pharmacy: {
    home: (st) =>
      b("app bar", appBar(st, ["search", "bag"]), ch(st.flash === "green")) +
      b("hero", hero(st, "Medicines at your door", "Dhanmondi · delivered within the hour", "Upload prescription"), ch(st.flash === "green")) +
      b("search", `<div class="sec"><div class="fld">${icon("search")}<span class="muted">Search medicines</span></div></div>`) +
      b("medicines", `<div class="row-h"><h5>Popular</h5><span>See all</span></div><div class="svc-list">${MEDS.map(([n, d, p]) =>
        `<div class="svc"><span class="svc-ic">${icon("pill")}</span><span class="svc-t">${n}<small>${d}</small></span><b>${tk(p)}</b><span class="add">+</span></div>`).join("")}</div>`) +
      b("tab bar", tabbar([["home", "Home"], ["camera", "Prescription"], ["bag", "Cart"], ["user", "Account"]])),
    item: (st) =>
      b("app bar", subBar("Prescription")) +
      b("upload", `<div class="sec card upload">${icon("camera")}<span><b>Prescription photo added</b><small>Our pharmacist checks it before your order is packed</small></span>${icon("check", "ok")}</div>`) +
      b("items", `<div class="sec"><h5>From your prescription</h5><div class="inv"><span>Paracetamol 500 mg<small>10 tablets</small></span><b>${tk(20)}</b></div><div class="inv"><span>Antacid syrup<small>200 ml</small></span><b>${tk(110)}</b></div><div class="inv${st.rx ? " late" : ""}"><span>Antibiotic course<small>${st.rx ? "Prescription needed · added" : "7 days"}</small></span><b>${tk(410)}</b>${st.rx ? '<em class="due">Rx</em>' : ""}</div></div>`, ch(st.flash === "rx")) +
      b("continue", `<div class="paybar"><span class="pb-note">${tk(540)}</span><div class="paybtn">Checkout</div></div>`),
    pay: (st) => {
      const items = 540, del = 40, off = st.off ? 54 : 0;
      return b("app bar", subBar("Checkout")) + b("steps", steps3(2)) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="thumb glyph">${icon("pill")}</span><span>3 items<small>Prescription checked</small></span><b>${tk(items)}</b></div><div class="row"><span>Delivery within the hour</span><span>${tk(del)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(items + del - off)}</span></div></div>`, ch(st.flash === "off")) +
        b("address", `<div class="sec card addr">${icon("pin")}<span><b>Deliver to</b>Road 27, Dhanmondi, Dhaka</span></div>`) +
        b("payment", methods(st, items + del - off), ch(st.flash === "off"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.pharmacy.name}: order #318 confirmed. ${tk(amount(st))} paid by bKash. A rider will reach you within the hour.`,
      `${APPS.pharmacy.name}: your rider is on the way. Track it at ${APPS.pharmacy.slug}.amader.cloud/t/318`,
    ], st.flash === "off"),
    admin: (st) => adminScreen(st, "Orders", [["#318 · 3 items", tk(amount(st)), "Paid by bKash", "Rider assigned"]]),
  },
  event: {
    home: (st) =>
      b("app bar", appBar(st, ["search", "user"]), ch(st.flash === "green")) +
      b("hero", hero(st, "Friday Music Night", "Dhanmondi · Fri 17 Oct · 7 pm", "Get tickets"), ch(st.flash === "green")) +
      b("details", `<div class="sec card info">${[["cal", "Friday 17 October, doors 6:30 pm"], ["pin", "Rooftop stage, Road 8, Dhanmondi"], ["ticket", "Ticket by SMS, QR checked at the gate"]].map(([i, t]) => `<span>${icon(i)}${t}</span>`).join("")}</div>`) +
      b("tickets", `<div class="row-h"><h5>Tickets</h5><span>${st.early ? "Early-bird on" : "Selling fast"}</span></div><div class="svc-list">${TICKETS.map(([n, p, left]) =>
        `<div class="svc"><span class="svc-ic">${icon("ticket")}</span><span class="svc-t">${n}<small>${left} left</small></span><b>${tk(st.early && n === "General" ? p - 100 : p)}</b></div>`).join("")}</div>`, ch(st.flash === "early")) +
      b("tab bar", tabbar([["home", "Event"], ["ticket", "My tickets"], ["user", "Account"]])),
    item: (st) =>
      b("app bar", subBar("Tickets")) +
      b("types", `<div class="sec">${TICKETS.map(([n, p, left], i) => `<div class="inv${i === 0 ? " pick" : ""}"><span>${n}<small>${left} left</small></span><b>${tk(st.early && i === 0 ? p - 100 : p)}</b><div class="qty mini"><span>−</span>${i === 0 ? 2 : 0}<span>+</span></div></div>`).join("")}${st.early ? '<p class="muted">Early-bird price until Wednesday.</p>' : ""}</div>`, ch(st.flash === "early")) +
      b("continue", `<div class="paybar"><span class="pb-note">2 tickets</span><div class="paybtn">Checkout ${tk(st.early ? 800 : 1000)}</div></div>`),
    pay: (st) => {
      const items = st.early ? 800 : 1000, off = st.off ? items / 10 : 0;
      return b("app bar", subBar("Checkout")) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="thumb glyph">${icon("ticket")}</span><span>2 × General<small>Fri 17 Oct, 7 pm</small></span><b>${tk(items)}</b></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(items - off)}</span></div></div>`, ch(st.flash === "off")) +
        b("payment", methods(st, items - off), ch(st.flash === "off"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.event.name}: 2 tickets for Friday Music Night, 17 Oct, 7 pm. ${tk(amount(st))} paid by bKash. Show this at the gate: ${APPS.event.slug}.amader.cloud/t/5521`,
    ], st.flash === "off"),
    admin: (st) => adminScreen(st, "Sales", [["2 × General", tk(amount(st)), "Paid by bKash", "QR sent"]]),
  },
  service: {
    home: (st) =>
      b("app bar", appBar(st, ["search", "user"]), ch(st.flash === "green")) +
      b("hero", hero(st, "AC servicing at home", "Same-day visits in Dhaka", "Book a visit"), ch(st.flash === "green")) +
      b("services", `<div class="row-h"><h5>Services</h5><span>Prices</span></div><div class="svc-list">${JOBS.map(([n, p, d, ic]) =>
        `<div class="svc"><span class="svc-ic">${icon(ic)}</span><span class="svc-t">${n}<small>${icon("clock")}${d}</small></span><b>${tk(p)}</b><span class="add">+</span></div>`).join("")}</div>`) +
      b("tab bar", tabbar([["home", "Home"], ["cal", "Visits"], ["user", "Account"]])),
    item: (st) =>
      b("app bar", subBar("AC servicing")) +
      b("service", `<div class="sec card svc-card"><span class="svc-ic big">${icon("snow")}</span><span><b>AC servicing</b><small>1 to 2 hours · from ${tk(1500)}</small></span></div>`) +
      b("date", `<div class="sec"><h5>October</h5><div class="days">${[["Mon", 6], ["Tue", 7], ["Wed", 8], ["Thu", 9], ["Fri", 10], ["Sat", 11]].map(([d, n], i) => `<span class="${i === 3 ? "sel" : ""}"><small>${d}</small>${n}</span>`).join("")}</div></div>`) +
      b("times", `<div class="sec"><h5>Thursday</h5><div class="slots">${["10–12", "12–2 pm", "4–6 pm", "6–8 pm"].map((t, i) => `<span class="${i === 2 ? "sel" : i === 0 ? "gone" : ""}">${t}</span>`).join("")}</div></div>`) +
      b("continue", `<div class="paybar"><span class="pb-note">Thu, 4–6 pm</span><div class="paybtn">Continue</div></div>`),
    pay: (st) => {
      const fee = 500, zone = st.zone ? 200 : 0, off = st.off ? 50 : 0;
      return b("app bar", subBar("Visit fee")) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="thumb glyph">${icon("snow")}</span><span>AC servicing<small>${icon("cal")} Thu 9 Oct, 4–6 pm</small></span></div><div class="row"><span>Visit fee, taken off the bill</span><span>${tk(fee)}</span></div>${zone ? `<div class="row warn"><span>Outside Dhanmondi</span><span>${tk(zone)}</span></div>` : ""}${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Pay now</span><span>${tk(fee + zone - off)}</span></div></div>`, ch(st.flash === "off" || st.flash === "zone")) +
        b("address", `<div class="sec card addr">${icon("pin")}<span><b>Visit at</b>House 9, Road 4, Mohammadpur</span></div>`, ch(st.flash === "zone")) +
        b("payment", methods(st, fee + zone - off), ch(st.flash === "off"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.service.name}: visit confirmed for Thu 9 Oct, 4–6 pm. Technician: Rafiq. Visit fee ${tk(amount(st))} paid.`,
      `${APPS.service.name}: Rafiq is on the way and will call when he reaches the gate.`,
    ], st.flash === "off" || st.flash === "zone"),
    admin: (st) => adminScreen(st, "Jobs", [["Thu 4–6 pm · AC servicing", tk(amount(st)), "Visit fee by bKash", "Technician assigned"]]),
  },
  fees: {
    home: (st) =>
      b("app bar", appBar(st, ["bell", "user"]), ch(st.flash === "green")) +
      b("hero", hero(st, "Pay monthly fees", "Receipt by SMS to the guardian", "Pay now"), ch(st.flash === "green")) +
      b("lookup", `<div class="sec card lookup"><h5>Find your student</h5><div class="fld">${icon("search")}BP-2071</div><div class="paybtn">Find</div></div>`) +
      b("batches", `<div class="row-h"><h5>Batches</h5><span>2026</span></div><div class="svc-list">${[["Class 9 science", "Sat, Mon, Wed · 4 pm"], ["Class 10 science", "Sun, Tue, Thu · 5 pm"]].map(([n, d]) =>
        `<div class="svc"><span class="svc-ic">${icon("book")}</span><span class="svc-t">${n}<small>${d}</small></span></div>`).join("")}</div>`) +
      b("tab bar", tabbar([["home", "Home"], ["receipt", "Receipts"], ["user", "Help"]])),
    item: (st) =>
      b("app bar", subBar("Fees due")) +
      b("student", `<div class="sec idcard"><span class="avatar">BP</span><span><b>Student BP-2071</b><small>Class 9 science · Roll 14</small></span>${icon("cap")}</div>`) +
      b("invoices", `<div class="sec"><h5>Invoices</h5><div class="inv"><span>October fee<small>Due 10 Oct</small></span><b>${tk(2500)}</b><em class="due">Due</em></div><div class="inv paid"><span>September fee<small>Paid 4 Sep</small></span><b>${tk(2500)}</b><em>Paid</em></div>${st.late ? `<div class="inv late"><span>Late fee<small>After the 10th</small></span><b>${tk(100)}</b><em class="due">Due</em></div>` : ""}</div>`, ch(st.flash === "late")) +
      b("pay", `<div class="paybar"><span class="pb-note">${tk(2500 + (st.late ? 100 : 0))}</span><div class="paybtn">Pay October fee</div></div>`),
    pay: (st) => {
      const fee = 2500, late = st.late ? 100 : 0, off = st.off ? Math.round(fee * 0.1) : 0;
      return b("app bar", subBar("Payment")) +
        b("summary", `<div class="sec card"><div class="line-item"><span class="thumb glyph">${icon("receipt")}</span><span>October fee<small>BP-2071 · Class 9 science</small></span><b>${tk(fee)}</b></div>${late ? `<div class="row warn"><span>Late fee</span><span>${tk(late)}</span></div>` : ""}${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(fee + late - off)}</span></div></div>`, ch(st.flash === "off" || st.flash === "late")) +
        b("payment", methods(st, fee + late - off), ch(st.flash === "off"));
    },
    sms: (st) => smsScreen(st, [
      `${APPS.fees.name}: received ${tk(2500 + (st.late ? 100 : 0) - (st.off ? 250 : 0))} for BP-2071, October fee. Receipt: ${APPS.fees.slug}.amader.cloud/rc/5521`,
    ], st.flash === "off" || st.flash === "late"),
    admin: (st) => adminScreen(st, "Collected", [["BP-2071 · October", tk(2500 + (st.late ? 100 : 0) - (st.off ? 250 : 0)), "Paid by bKash", "Receipt sent"]]),
  },
};

// The customer's phone: a messages app with the store's texts.
function smsScreen(st, texts, changed) {
  const a = APPS[st.app];
  return b("messages", `<div class="sms-app"><div class="sms-head"><span class="ib">${icon("back")}</span><span class="mark">${initial(a.name)}</span><span><b>${esc(a.name)}</b><small>Text message</small></span></div>` +
    `<p class="sms-day">Today 4:12 pm</p>` +
    texts.map((t, i) => `<div class="sms${changed && i === texts.length - 1 ? " changed" : ""}">${esc(t).replace(/(\S+\.amader\.cloud\S*)/, '<u>$1</u>')}</div>`).join("") + `</div>`);
}
// The owner's phone: today's takings and the newest record.
function adminScreen(st, title, rows) {
  const bars = [30, 52, 41, 64, 48, 70, 88];
  return b("app bar", `<div class="ah"><span class="mark">${initial(APPS[st.app].name)}</span><strong>${title}</strong><span class="live-dot">Live</span></div>`) +
    b("today", `<div class="sec dash"><small>Today</small><b>${rows[0][1]}</b><div class="bars">${bars.map((h, i) => `<i style="height:${h}%"${i === bars.length - 1 ? ' class="on"' : ""}></i>`).join("")}</div></div>`) +
    b("toast", `<div class="toast">${icon("check")} New payment received</div>`, " changed") +
    b("list", `<div class="sec">${rows.map(([a, amt, s, tag]) => `<div class="order"><div class="row"><strong>${a}</strong><span>${amt}</span></div><div class="row muted"><span>${s}</span><em class="pill">${tag}</em></div></div>`).join("")}<p class="muted">Money goes to your own merchant account, not to Amader Cloud.</p></div>`) +
    b("tab bar", tabbar([["chart", "Today"], ["receipt", title], ["grid", "Store"], ["user", "Account"]]));
}

