import { icon, bag, stars, heroArt } from "./app-art.js";
// Amader Cloud builder demo. Scripted entirely in the browser: no AI is called, nothing is published.
// Businesses, products, prices and orders below are fictional demonstration content, not facts.
// Requests can be typed or picked, in English or in Bangla written in English letters; replies follow the visitor's words.

const root = document.querySelector("[data-demo]");
// Once per page: dev hot-reload can run this module again over the same markup.
if (root && !root.dataset.ready) { root.dataset.ready = "1"; initDemo(root); }

function initDemo(root) {
  const $ = (s) => root.querySelector(s);
  const msgs = $("[data-msgs]");
  const chips = $("[data-chips]");
  const form = $("[data-composer]");
  const input = form.querySelector("input");
  const screen = $("[data-screen]");
  const tabs = $("[data-tabs]");
  const url = $("[data-url]");
  const status = $("[data-status]");
  const notifEl = $("[data-notif]");
  const openSign = $("[data-open]");
  const stage = $(".demo-stage");
  const who = $("[data-who]");
  const project = $("[data-project]");
  const addr = $("[data-addr]");
  const pubBtn = $("[data-publish]");
  const till = $("[data-till]");
  const tillAmt = $("[data-till-amt]");
  const tillN = $("[data-till-n]");
  const tillLog = $("[data-till-log]");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pace = reduced ? 0.15 : 1;

  const tk = (n) => "Tk " + n.toLocaleString("en-IN");
  const wait = (ms) => new Promise((r) => setTimeout(r, ms * pace));
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // ---------- Language: replies follow how the visitor writes (English, or Bangla in English letters) ----------
  let lang = "en";
  const ROMAN_BN = /\b(amar|ami|chai|lagbe|dokan|kore|koro|korle|korbo|dao|jonno|nibo|nite|hobe|jabe|ekta|rong|shobuj|chhar|tarikh\w*|mashik|ager|pathao|rakho|shudhu|bhitore|hishebe|kori|notun|ferot)\b/i;
  const T = {
    en: { ask: "What should we build?", plan: (a) => `Plan: a <strong>${a.kind}</strong> called ${esc(a.name)}.`, ready: (u) => `Your store is ready at <span class="url">${u}</span>. Ask for any change, or open it to customers.`,
      live: "Live. Payments go to your own merchant account.", undone: "Undone.", unknown: "Try one of the changes below.",
      undo: "Undo last change", publish: "Publish", over: "Start over", customer: "Try it as a customer", publishSay: "Publish it",
      after: "That's your customer's side. The money went straight to your merchant account." },
    bn: { ask: "Ki toiri korbo?", plan: (a) => `Bujhechi. ${esc(a.name)} er jonno ei plan:`, ready: (u) => `Preview toiri: <span class="url">${u}</span>. Ja bodlate chan bolun, ba publish korun.`,
      live: "Live! Taka shoja apnar merchant account e jabe.", undone: "Ager obosthay ferot gelam.", unknown: "Nicher kono ekta change try korun.",
      undo: "Ager ta ferot ano", publish: "Publish kore dao", over: "Notun kore shuru", customer: "Customer hishebe try kori", publishSay: "Publish kore dao",
      after: "Customer eta dekhe. Taka shoja apnar merchant account e geche." },
  };
  const t = () => T[lang];

  // ---------- Fictional apps ----------
  const PAY = ["bKash", "Nagad", "Card"];
  const APPS = {
    shop: {
      match: /shop|sell|store|bag|cloth|saree|dress|product|boutique|cake|food|jewel|deliver|dokan|bikri|becha/i,
      prompt: "A store for my handmade bags with bKash payment, delivery, and an SMS when the order ships",
      bn: "Amar handmade bag er jonno ekta online store chai, bKash e payment, delivery, ar order ship hole customer ke SMS",
      name: "Jute & Thread", slug: "jutethread", color: "#9a4a24",
      kind: "store with courier booking",
      plan: ["Pages: home, product, checkout", "Payments: bKash, Nagad, card", "Delivery: courier booked on dispatch", "SMS: order confirmed, order shipped"],
      model: "products, orders, customers, deliveries",
      tabs: [["home", "Home"], ["item", "Product"], ["pay", "Checkout"], ["sms", "SMS"]],
      adminTab: ["admin", "Orders"],
      special: { chip: "Offer cash on delivery inside Dhaka only", bn: "Shudhu Dhakar bhitore cash on delivery rakho", match: /cash|cod|dhaka/i, key: "cod", screen: "pay",
        reply: "Cash on delivery now shows only for Dhaka addresses.", bnReply: "Cash on delivery ekhon shudhu Dhakar address e dekhabe.", touched: "checkout, address rule" },
    },
    book: {
      match: /book|appoint|salon|clinic|doctor|tutor|parlou?r|parlar|spa|gym|slot|dent/i,
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
    fees: {
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
  const COMMON = [
    { chip: "Add 10% off for bKash payments", bn: "bKash e payment korle 10% chhar dao", match: /10|%|off|discount|chhar/i, key: "off", screen: "pay",
      reply: "bKash payments now get 10% off.", bnReply: "bKash e payment korle ekhon 10% chhar.", touched: "checkout total, payment option" },
    { chip: "Make it green", bn: "Rong ta shobuj kore dao", match: /green|colou?r|theme|blue|red|shobuj|rong/i, key: "green", screen: "home",
      reply: "Done. It's green now.", bnReply: "Hoye geche. Ekhon shobuj.", touched: "theme" },
  ];
  // What the customer pays, after the changes the owner asked for.
  const amount = (st) => ({
    shop: 1530 - (st.off ? 145 : 0),
    book: 300 - (st.off ? 30 : 0),
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
    return `<div class="ah"><span class="mark">${initial(a.name)}</span><strong>${esc(a.name)}</strong><span class="ah-ic">${right.map((r) => `<span class="ib">${icon(r)}${r === "bag" && badge ? `<i>${badge}</i>` : ""}</span>`).join("")}</span></div>`;
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

  const PRODUCTS = [["Market tote", 1450, "tote", "#d9b27a", "#8a4a22"], ["Sling bag", 980, "sling", "#a7b58e", "#4f5f3a"], ["Laptop sleeve", 1650, "sleeve", "#8b97ab", "#2f3b55"], ["Coin pouch", 350, "pouch", "#d4876a", "#7a2f17"]];
  const SERVICES = [["Haircut", 600, "45 min", "scissors"], ["Hair colour", 2200, "2 hr", "drop"], ["Facial", 1500, "1 hr", "sparkle"], ["Manicure", 700, "40 min", "hand"]];

  const SCREENS = {
    shop: {
      home: (st) =>
        b("app bar", appBar(st), ch(st.flash === "green")) +
        b("hero", hero(st, "Handmade jute bags", "Woven by hand · delivery across Bangladesh", "Shop now"), ch(st.flash === "green")) +
        b("categories", `<div class="cats"><span class="on">All</span><span>Totes</span><span>Slings</span><span>Sleeves</span><span>Pouches</span></div>`) +
        b("products", `<div class="row-h"><h5>New this week</h5><span>See all</span></div><div class="pgrid">${PRODUCTS.map(([n, p, k, c, a], i) =>
          `<div class="pc"><div class="pimg" style="--tint:${c}22">${bag(k, c, a)}<span class="fav">${icon("heart")}</span>${i === 0 ? '<span class="new">New</span>' : ""}</div><span class="pn">${n}</span><b>${tk(p)}</b></div>`).join("")}</div>`) +
        b("payment note", `<p class="strip">${icon("truck")} Pay by bKash, Nagad or card${st.cod ? ", or cash in Dhaka" : ""}</p>`, ch(st.flash === "cod")) +
        b("tab bar", tabbar([["home", "Home"], ["search", "Search"], ["bag", "Bag"], ["user", "Account"]])),
      item: (st) =>
        b("app bar", subBar("Market tote", `<span class="ib">${icon("bag")}<i>1</i></span>`)) +
        b("gallery", `<div class="gallery" style="--tint:#d9b27a2e">${bag("tote", "#d9b27a", "#8a4a22")}<span class="dots"><i class="on"></i><i></i><i></i></span></div>`) +
        b("title", `<div class="sec"><h4>Market tote</h4><div class="rate">${stars(5)}<span>Handmade · 38 × 42 cm</span></div><div class="price">${tk(1450)}${st.off ? '<span class="badge">10% off with bKash</span>' : ""}</div></div>`, ch(st.flash === "off")) +
        b("options", `<div class="sec"><h5>Colour</h5><div class="swatches"><span class="on" style="--c:#d9b27a"></span><span style="--c:#a7b58e"></span><span style="--c:#d4876a"></span></div><p class="muted">Woven jute, cotton lining, inside pocket. Courier booked when it ships.</p></div>`) +
        b("add to bag", `<div class="paybar"><div class="qty"><span>−</span>1<span>+</span></div><div class="paybtn">Add to bag</div></div>`),
      pay: (st) => {
        const items = 1450, del = 80, off = st.off ? Math.round(items * 0.1) : 0;
        return b("app bar", subBar("Checkout")) + b("steps", steps3(2)) +
          b("summary", `<div class="sec card"><div class="line-item"><span class="thumb" style="--tint:#d9b27a33">${bag("tote", "#d9b27a", "#8a4a22")}</span><span>Market tote<small>Qty 1</small></span><b>${tk(items)}</b></div><div class="row"><span>Delivery</span><span>${tk(del)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(items + del - off)}</span></div></div>`, ch(st.flash === "off")) +
          b("address", `<div class="sec card addr">${icon("home")}<span><b>Deliver to</b>House 12, Road 5, Mirpur 10, Dhaka</span></div>`, ch(st.flash === "cod")) +
          b("payment", methods(st, items + del - off), ch(st.flash === "off" || st.flash === "cod"));
      },
      sms: (st) => smsScreen(st, [
        `${APPS.shop.name}: order #1042 confirmed. ${tk(1530 - (st.off ? 145 : 0))} paid by bKash${st.off ? " (10% off applied)" : ""}.`,
        `${APPS.shop.name}: your order has shipped. Track it at ${APPS.shop.slug}.amader.cloud/t/1042`,
      ], st.flash === "off"),
      admin: (st) => adminScreen(st, "Orders", [["#1042 · Market tote", tk(1530 - (st.off ? 145 : 0)), "Paid by bKash", "Courier booked"]]),
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

  // ---------- State and rendering ----------
  let st = null;      // { app, off, green, cod, remind, late, flash, built, published, tab, undo: [], sales, orders }
  let run = 0;        // bumps to cancel an in-flight script

  function paint(tabId, opts = {}) {
    if (!st) return;
    st.tab = tabId;
    const app = APPS[st.app];
    screen.style.setProperty("--brand", st.green ? "#2c7a55" : app.color);
    screen.innerHTML = SCREENS[st.app][tabId](st);
    if (opts.draft) screen.querySelectorAll(".b").forEach((el) => el.classList.add("draft"));
    else screen.querySelectorAll(".b").forEach((el) => el.classList.add("ink"));
    const list = [...app.tabs, ...(st.published ? [app.adminTab] : [])];
    tabs.innerHTML = list.map(([id, label]) =>
      `<button type="button" role="tab" aria-selected="${id === tabId}" data-tab="${id}" ${st.built || id === tabId ? "" : "disabled"}>${label}</button>`).join("");
    url.textContent = `${app.slug}.amader.cloud${tabId === "home" ? "" : "/" + ({ item: app.tabs[1][1], pay: app.tabs[2][1], sms: "sms", admin: "admin" }[tabId]).toLowerCase().replace(/\s+/g, "-")}`;
  }
  // Blocks fill in grey, then get painted: a brush of yellow crosses each one as it inks.
  async function ink(token) {
    const blocks = [...screen.querySelectorAll(".b.draft")];
    for (const el of blocks) { await wait(70); if (token !== run) return; el.classList.add("drawn"); }
    await wait(260);
    for (const el of blocks) { await wait(110); if (token !== run) return; el.classList.remove("draft"); el.classList.add("ink", "paint"); }
  }
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (b && !b.disabled) { st.flash = null; paint(b.dataset.tab); }
  });

  // ---------- The till: today's sales after the store opens ----------
  const PEOPLE = { shop: [["Market tote", 1450, "bKash"], ["Sling bag", 980, "Nagad"], ["Coin pouch", 350, "Card"]],
    book: [["Facial", 300, "bKash"], ["Haircut", 300, "Nagad"], ["Manicure", 300, "bKash"]],
    fees: [["BP-2044 · October", 2500, "Nagad"], ["BP-2102 · October", 2500, "bKash"], ["BP-2010 · October", 2500, "bKash"]] };
  function sale(what, amt, method) {
    st.sales += amt; st.orders++;
    till.hidden = false;
    tillAmt.textContent = tk(st.sales);
    tillN.textContent = `${st.orders} ${st.app === "fees" ? "payment" : st.app === "book" ? "booking" : "order"}${st.orders === 1 ? "" : "s"}`;
    tillLog.insertAdjacentHTML("afterbegin", `<li><span>${esc(what)} · ${method}</span><b>${tk(amt)}</b></li>`);
    while (tillLog.children.length > 4) tillLog.lastElementChild.remove();
    till.classList.remove("bump"); void till.offsetWidth; till.classList.add("bump");
  }
  function clearTill() { till.hidden = true; tillLog.innerHTML = ""; }

  // ---------- Chat ----------
  function setStatus(text, live, ai) {
    status.textContent = text;
    status.classList.toggle("live", !!live);
    status.parentElement.classList.toggle("ai", !!ai);
  }
  function setWho(text) { who.textContent = text || ""; who.hidden = !text; }
  function scrollMsgs() { msgs.scrollTop = msgs.scrollHeight; }
  function say(role, html, label) {
    const li = document.createElement("li");
    li.className = `m ${role}`;
    li.innerHTML = (label ? `<span class="who">${label}</span>` : "") + html;
    msgs.append(li); scrollMsgs();
    return li;
  }
  // Replies arrive a few words at a time.
  async function stream(html, label, token) {
    const li = say("ai", `<div class="body caret"></div>`, label);
    const body = li.querySelector(".body");
    const tmp = document.createElement("div"); tmp.innerHTML = html;
    const words = tmp.textContent.split(/(\s+)/);
    let out = "";
    for (let i = 0; i < words.length; i += 2) { out += words[i] + (words[i + 1] || ""); body.textContent = out; scrollMsgs(); await wait(28); if (token !== run) return false; }
    body.classList.remove("caret"); body.innerHTML = html; scrollMsgs();
    return true;
  }
  const AI = (what) => `<span class="spark" aria-hidden="true">✦</span> AI · ${what}`;
  async function typeUser(text, token) {
    const li = say("user", "");
    for (let i = 1; i <= text.length; i += 3) { li.textContent = text.slice(0, i); scrollMsgs(); await wait(14); if (token !== run) return false; }
    li.textContent = text;
    return true;
  }
  function logList(label, ai = true) {
    const li = say(`ai log${ai ? " thinking" : ""}`, `<ol class="steps"></ol>`, label);
    return li.querySelector(".steps");
  }
  const doneLog = (list) => list.closest("li").classList.remove("thinking");
  async function step(list, text, token, ms = 520) {
    const s = document.createElement("li");
    s.innerHTML = `<span class="st"></span>${text}`;
    list.append(s); scrollMsgs();
    await wait(ms);
    if (token !== run) return false;
    s.classList.add("done");
    return true;
  }
  function notify(icon, html, cls = "") {
    notifEl.innerHTML = `<span class="ni ${cls}">${icon}</span><span>${html}</span>`;
    notifEl.classList.remove("show"); void notifEl.offsetWidth; notifEl.classList.add("show");
  }
  function hideNotif() { notifEl.classList.remove("show"); }
  function celebrate() {
    openSign.hidden = false;
    openSign.classList.remove("swing"); void openSign.offsetWidth; openSign.classList.add("swing");
    if (reduced) return;
    const colors = ["#e2261b", "#ffcc00", "#0b5d3b", "#1739a8", "#ffffff"];
    for (let i = 0; i < 18; i++) {
      const f = document.createElement("span");
      f.className = "confetti";
      f.style.cssText = `--x:${Math.random() * 100}%;--r:${Math.random() * 360}deg;--dx:${(Math.random() - .5) * 80}px;--t:${1.6 + Math.random()}s;background:${colors[i % colors.length]};animation-delay:${Math.random() * .4}s`;
      stage.append(f);
      setTimeout(() => f.remove(), 3200);
    }
  }

  function setChips(items) {
    chips.innerHTML = items.map((c, i) => `<button type="button" class="chip${c.primary ? " primary" : ""}${c.alt ? " alt" : ""}" data-chip="${i}">${esc(c.label)}</button>`).join("");
    chips._items = items;
    requestAnimationFrame(scrollMsgs); // the chip row resizes the message list
  }
  chips.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-chip]");
    if (!btn) return;
    chips._items[+btn.dataset.chip].go();
  });
  const label_ = (e) => (lang === "bn" ? e.bn : e.chip);

  function startChips() {
    setChips([...Object.entries(APPS).map(([k, a]) => ({ label: a.prompt, go: () => build(k, a.prompt) })), { label: APPS.book.bn, go: () => build("book", APPS.book.bn) }]);
  }
  function editChips() {
    const app = APPS[st.app];
    const items = [...COMMON, app.special].filter((e) => !st[e.key]).map((e) => ({ label: label_(e), go: () => edit(e, label_(e)) }));
    if (st.undo.length) items.push({ label: t().undo, go: undo });
    if (!st.published) items.push({ label: t().publish, primary: true, go: publish });
    else items.push({ label: t().customer, primary: true, go: customer });
    items.push({ label: t().over, alt: true, go: reset });
    setChips(items);
  }
  // The conversation's language follows the visitor's last request.
  function setLang(l) {
    lang = l;
    input.placeholder = l === "bn" ? "Ki chai likhun, jemon iccha" : "Write what you want, how you want";
  }
  const detect = (text) => setLang(ROMAN_BN.test(text) ? "bn" : "en");
  pubBtn.addEventListener("click", () => { if (st?.built && !st.published && !root.classList.contains("running")) publish(); });
  function setPub() {
    pubBtn.disabled = !st?.built || st.published || root.classList.contains("running");
    pubBtn.classList.toggle("ready", !!st?.built && !st.published && !root.classList.contains("running"));
    pubBtn.classList.toggle("live", !!st?.published);
    pubBtn.textContent = st?.published ? "Live ✓" : "Publish";
  }
  function busy(on) { root.classList.toggle("running", on); setPub(); }

  // ---------- Scripts ----------
  async function build(key, text) {
    const token = ++run;
    const app = APPS[key];
    detect(text);
    msgs.innerHTML = ""; setChips([]); hideNotif(); openSign.hidden = true; setWho(""); clearTill();
    st = { app: key, off: false, green: false, cod: false, remind: false, late: false, flash: null, built: false, published: false, tab: "home", undo: [], sales: 0, orders: 0 };
    project.textContent = app.name; addr.textContent = "";
    screen.innerHTML = ""; tabs.innerHTML = ""; url.textContent = "…";
    busy(true);
    setStatus("Reading your request", true);
    if (!(await typeUser(text, token))) return;
    await wait(450); if (token !== run) return;

    setStatus("AI is planning", true, true);
    if (!(await stream(`<p>${t().plan(app)}</p><ul>${app.plan.map((p) => `<li>${p}</li>`).join("")}</ul>`, AI("plan"), token))) return;
    await wait(500); if (token !== run) return;

    setStatus("AI is building", true, true);
    const list = logList(AI("build"));
    paint("home", { draft: true }); ink(token);
    if (!(await step(list, "Designing your front page", token, 1500))) return;
    paint("item", { draft: true }); ink(token);
    if (!(await step(list, `Adding your ${{ shop: "products", book: "services and opening hours", fees: "students and batches" }[key]}`, token, 1300))) return;
    paint("pay", { draft: true }); ink(token);
    if (!(await step(list, "Setting up bKash, Nagad and card payments", token, 1500))) return;
    if (key === "shop" && !(await step(list, "Connecting your courier", token, 600))) return;
    paint("sms", { draft: true }); ink(token);
    if (!(await step(list, `Writing the ${key === "fees" ? "receipt" : "confirmation"} SMS`, token, 1100))) return;
    if (!(await step(list, "Checking every page works", token, 800))) return;
    if (!(await step(list, "Checking it's safe: no fake bank or wallet pages", token, 800))) return;
    doneLog(list);

    st.built = true;
    paint("home");
    if (!(await stream(`<p>${t().ready(`${app.slug}.amader.cloud`)}</p>`, "Amader Cloud", token))) return;
    setStatus("Preview ready");
    busy(false);
    editChips();
  }

  async function edit(e, text) {
    if (!st?.built) return;
    const token = ++run;
    detect(text);
    setChips([]); hideNotif(); setWho("");
    busy(true);
    if (!(await typeUser(text, token))) return;
    await wait(350); if (token !== run) return;
    setStatus("AI is changing it", true, true);
    const list = logList(AI("change"));
    if (!(await step(list, `Updating ${e.touched}`, token, 900))) return;
    st.undo.push({ ...st, undo: undefined });
    st[e.key] = true;
    st.flash = e.key;
    paint(e.screen);
    screen.querySelectorAll(".b.changed").forEach((el) => el.classList.add("paint"));
    doneLog(list);
    if (!(await stream(`<p>${lang === "bn" ? e.bnReply : e.reply}</p>`, "Amader Cloud", token))) return;
    setStatus(st.published ? "Live · updated" : "Preview updated");
    busy(false);
    editChips();
  }

  function undo() {
    const prev = st.undo.pop();
    if (!prev) return;
    st = { ...prev, undo: st.undo, flash: null, published: st.published, sales: st.sales, orders: st.orders };
    say("ai", `<p>${t().undone}</p>`, "Amader Cloud");
    paint(st.tab);
    editChips();
  }

  // Publish: the OPEN sign swings out, then the first orders come in.
  async function publish() {
    const token = ++run;
    const app = APPS[st.app];
    setChips([]); setWho("");
    busy(true);
    if (!(await typeUser(t().publishSay, token))) return;
    setStatus("Opening your store", true);
    await wait(900); if (token !== run) return;
    st.published = true;
    addr.textContent = `${app.slug}.amader.cloud`;
    paint("home");
    celebrate();
    if (!(await stream(`<p>${t().live}</p>`, "Amader Cloud", token))) return;
    setStatus("Live");
    busy(false);
    editChips();
    for (const [what, price, method] of PEOPLE[st.app].slice(0, 2)) {
      await wait(1800); if (token !== run || !st?.published) return;
      const amt = method === "bKash" && st.off ? price - Math.round(price * 0.1) : price;
      notify("✓", `<b>New ${st.app === "fees" ? "payment" : st.app === "book" ? "booking" : "order"}</b> ${tk(amt)} · ${method}`, "ok");
      sale(what, amt, method);
    }
  }

  // The buyer's side: order, pay in the wallet's own page, get the SMS; then the owner's phone lights up.
  async function customer() {
    const token = ++run;
    const app = APPS[st.app];
    const amt = amount(st);
    setChips([]); hideNotif();
    busy(true);
    if (!(await typeUser(t().customer, token))) return;
    setWho("Customer's phone");
    setStatus("You are the customer", true);
    paint("item"); await wait(1100); if (token !== run) return;
    paint("pay"); await wait(900); if (token !== run) return;
    const sheet = document.createElement("div");
    sheet.className = "paysheet";
    sheet.innerHTML = `<b>bKash payment</b><span class="row"><span>Merchant</span><span>${esc(app.name)}</span></span><span class="row"><span>Amount</span><strong>${tk(amt)}</strong></span><span class="fld">Wallet number · 01•••••••••</span><span class="fld">PIN · ••••</span><span class="paybtn">Confirm</span>`;
    screen.append(sheet);
    await wait(1500); if (token !== run) return;
    sheet.classList.add("paid");
    sheet.insertAdjacentHTML("beforeend", `<span class="paid-ok">✓ Payment successful</span>`);
    await wait(900); if (token !== run) return;
    paint("sms");
    notify("SMS", `<b>${esc(app.name)}</b> ${st.app === "fees" ? "Receipt for" : "Confirmed:"} ${tk(amt)} paid by bKash`, "sms");
    await wait(1800); if (token !== run) return;

    setWho("Your phone");
    setStatus("Your view", true);
    paint("admin");
    notify("✓", `<b>New payment</b> ${tk(amt)} · bKash`, "ok");
    sale(st.app === "shop" ? "Market tote" : st.app === "book" ? "Hair colour" : "BP-2071 · October", amt, "bKash");
    if (st.app === "shop") { const list = logList("Amader Cloud", false); if (!(await step(list, "Courier booked: pickup today 4:30 pm", token, 700))) return; }
    if (!(await stream(`<p>${t().after}</p>`, "Amader Cloud", token))) return;
    setStatus("Live");
    busy(false);
    editChips();
  }

  function reset() {
    run++;
    st = null;
    msgs.innerHTML = "";
    screen.innerHTML = `<div class="empty"><span>Your app appears here.</span></div>`;
    tabs.innerHTML = ""; url.textContent = "yourname.amader.cloud";
    project.textContent = "New app"; addr.textContent = "";
    hideNotif(); openSign.hidden = true; setWho(""); clearTill();
    setStatus("Waiting for your request");
    busy(false);
    say("ai", `<p>${t().ask}</p>`, "Amader Cloud");
    startChips();
  }

  // Free text: replies follow the visitor's words; then match an app or a change.
  function handle(text) {
    if (root.classList.contains("running")) return;
    if (st?.built) {
      const app = APPS[st.app];
      if (/publish|go live|launch|open|chalu/i.test(text) && !st.published) return publish();
      if (/customer|buyer|kinbo|kini|hishebe/i.test(text) && st.published) return customer();
      const e = [...COMMON, app.special].find((x) => x.match.test(text) && !st[x.key]);
      if (e) return edit(e, text);
      if (/start over|new app|reset|notun/i.test(text)) return reset();
      detect(text);
      say("user", esc(text));
      say("ai", `<p>${t().unknown}</p>`, "Amader Cloud");
      return;
    }
    const key = Object.keys(APPS).find((k) => APPS[k].match.test(text)) || "shop";
    build(key, text);
  }
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    handle(text);
  });

  reset();
  // Dev only (stripped from builds): render any screen directly, e.g. __demo.show("book", "item", { off: true }).
  if (import.meta.env.DEV) window.__demo = { show(app, tab, flags = {}) { run++; st = { app, off: false, green: false, cod: false, remind: false, late: false, flash: null, built: true, published: true, tab, undo: [], sales: 0, orders: 0, ...flags }; paint(tab); } };
}
