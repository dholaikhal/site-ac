// Amader Cloud builder demo. Scripted entirely in the browser: no AI is called, nothing is published.
// Businesses, products and prices below are fictional demonstration content, not facts.

const root = document.querySelector("[data-demo]");
if (root) initDemo(root);

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
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pace = reduced ? 0.15 : 1;

  const tk = (n) => "Tk " + n.toLocaleString("en-IN");
  const wait = (ms) => new Promise((r) => setTimeout(r, ms * pace));
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // ---------- Fictional apps ----------
  const PAY = ["bKash", "Nagad", "Card"];
  const APPS = {
    shop: {
      match: /shop|sell|store|bag|cloth|saree|dress|product|boutique|cake|food|jewel|deliver/i,
      prompt: "A store for my handmade bags with bKash payment, delivery, and an SMS when the order ships",
      name: "Jute & Thread", slug: "jutethread", color: "#9a4a24",
      kind: "store with courier booking",
      plan: ["Pages: home, product, checkout", "Payments: bKash, Nagad, card", "Delivery: courier booked on dispatch", "SMS: order confirmed, order shipped"],
      model: "products, orders, customers, deliveries",
      tabs: [["home", "Home"], ["item", "Product"], ["pay", "Checkout"], ["sms", "SMS"]],
      adminTab: ["admin", "Orders"],
      special: { chip: "Offer cash on delivery inside Dhaka only", match: /cash|cod|delivery|dhaka/i, key: "cod", screen: "pay",
        reply: "Cash on delivery now appears only when the address is inside Dhaka. Prepaid stays the default.", touched: "checkout, address rule" },
    },
    book: {
      match: /book|appoint|salon|clinic|doctor|tutor|parlou?r|spa|gym|slot|dent/i,
      prompt: "Online bookings for my salon with a deposit paid by bKash and a reminder SMS",
      name: "Glow Room", slug: "glowroom", color: "#6a3d8f",
      kind: "bookings with a deposit",
      plan: ["Pages: services, pick a time, deposit", "Payments: deposit by bKash, Nagad or card", "Calendar: your opening hours", "SMS: booking confirmed"],
      model: "services, slots, bookings, customers",
      tabs: [["home", "Services"], ["item", "Pick a time"], ["pay", "Deposit"], ["sms", "SMS"]],
      adminTab: ["admin", "Bookings"],
      special: { chip: "Send a reminder SMS the day before", match: /remind|day before|sms/i, key: "remind", screen: "sms",
        reply: "Customers now get a reminder at 6 pm the day before, with a link to reschedule.", touched: "SMS schedule" },
    },
    fees: {
      match: /fee|school|coach|club|member|tuition|madrasa|association|student|class|batch/i,
      prompt: "Monthly fee collection for my coaching centre, paid by bKash or Nagad, with an SMS receipt",
      name: "Bright Path Coaching", slug: "brightpath", color: "#1f5f8b",
      kind: "fee and membership collection",
      plan: ["Pages: find your student, pay fees, receipt", "Payments: bKash, Nagad, card", "Records: students and batches", "SMS: receipt to the guardian"],
      model: "students, batches, invoices, payments",
      tabs: [["home", "Home"], ["item", "Pay fees"], ["pay", "Payment"], ["sms", "Receipt"]],
      adminTab: ["admin", "Collected"],
      special: { chip: "Add a Tk 100 late fee after the 10th", match: /late|fine|penalt|after the/i, key: "late", screen: "pay",
        reply: "Invoices paid after the 10th now add a Tk 100 late fee, shown on the payment page and the receipt.", touched: "invoice rule, payment page" },
    },
  };
  const COMMON = [
    { chip: "Add 10% off for bKash payments", match: /10|%|off|discount/i, key: "off", screen: "pay",
      reply: "Paying by bKash now takes 10% off the item total. The discount shows at checkout and on the SMS.", touched: "checkout total, payment option" },
    { chip: "Make it green", match: /green|colou?r|theme|blue|red/i, key: "green", screen: "home",
      reply: "Switched the brand colour to green on every page.", touched: "theme" },
  ];

  // ---------- Screens (fictional content) ----------
  const b = (label, html, cls = "") => `<div class="b ${cls}" data-l="${label}">${html}</div>`;
  const ch = (on) => (on ? " changed" : "");
  const payRows = (st, amount) => PAY.map((p, i) => {
    const off = st.off && p === "bKash";
    return `<label class="pm${i === 0 ? " sel" : ""}"><span class="radio"></span><span>${p}</span>${off ? '<span class="badge">10% off</span>' : ""}</label>`;
  }).join("") + (st.cod && st.app === "shop" ? `<label class="pm"><span class="radio"></span><span>Cash on delivery</span><span class="muted">Dhaka only</span></label>` : "") +
    `<div class="paybtn">Pay ${tk(amount)}</div>`;

  const SCREENS = {
    shop: {
      home: (st) =>
        b("header · 56", `<div class="ah"><strong>${APPS.shop.name}</strong><span class="cart">Bag · 0</span></div>`, ch(st.flash === "green")) +
        b("hero · banner", `<div class="hero-b"><span>Handmade jute bags</span><small>Delivery across Bangladesh</small></div>`, ch(st.flash === "green")) +
        b("grid · 2 col", `<div class="pgrid">${[["Market tote", 1450, "w1"], ["Sling bag", 980, "w2"], ["Laptop sleeve", 1650, "w3"], ["Coin pouch", 350, "w4"]]
          .map(([n, p, w]) => `<div class="pc"><div class="sw ${w}"></div><span>${n}</span><b>${tk(p)}</b></div>`).join("")}</div>`) +
        b("note", `<p class="muted">Pay by bKash, Nagad or card${st.cod ? ", or cash on delivery in Dhaka" : ""}.</p>`, ch(st.flash === "cod")),
      item: (st) =>
        b("header · 56", `<div class="ah"><span>‹ Back</span><span class="cart">Bag · 1</span></div>`) +
        b("image · 1:1", `<div class="sw w1 big"></div>`) +
        b("title + price", `<h4>Market tote</h4><div class="price">${tk(1450)}</div>${st.off ? '<div class="badge inline">10% off with bKash</div>' : ""}`, ch(st.flash === "off")) +
        b("details", `<p class="muted">Woven jute, cotton lining, inside pocket. Courier booked when it ships.</p>`) +
        b("button", `<div class="paybtn">Add to bag</div>`),
      pay: (st) => {
        const items = 1450, del = 80, off = st.off ? Math.round(items * 0.1) : 0;
        return b("header · 56", `<div class="ah"><span>‹ Bag</span><strong>Checkout</strong><span></span></div>`) +
          b("summary", `<div class="row"><span>Market tote</span><span>${tk(items)}</span></div><div class="row"><span>Delivery</span><span>${tk(del)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(items + del - off)}</span></div>`, ch(st.flash === "off")) +
          b("address", `<div class="fld">Name</div><div class="fld">Phone</div><div class="fld">Area: Mirpur, Dhaka</div>`, ch(st.flash === "cod")) +
          b("payment · connector", payRows(st, items + del - off), ch(st.flash === "off" || st.flash === "cod"));
      },
      sms: (st) => smsScreen(st, [
        `${APPS.shop.name}: order #1042 confirmed. ${tk(1530 - (st.off ? 145 : 0))} paid by bKash${st.off ? " (10% off applied)" : ""}.`,
        `${APPS.shop.name}: your order has shipped. Track it at ${APPS.shop.slug}.amader.cloud/t/1042`,
      ], st.flash === "off"),
      admin: (st) => adminScreen(st, "Orders", [["#1042 · Market tote", tk(1530 - (st.off ? 145 : 0)), "Paid by bKash · courier booked"]]),
    },
    book: {
      home: (st) =>
        b("header · 56", `<div class="ah"><strong>${APPS.book.name}</strong><span class="cart">Book</span></div>`, ch(st.flash === "green")) +
        b("hero · banner", `<div class="hero-b"><span>Hair, skin and nails</span><small>Book online, pay a small deposit</small></div>`, ch(st.flash === "green")) +
        b("list · services", [["Haircut", 600], ["Hair colour", 2200], ["Facial", 1500], ["Manicure", 700]]
          .map(([n, p]) => `<div class="row svc"><span>${n}</span><span>${tk(p)}</span></div>`).join("")),
      item: (st) =>
        b("header · 56", `<div class="ah"><span>‹ Services</span><strong>Hair colour</strong><span></span></div>`) +
        b("calendar · week", `<div class="days">${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => `<span class="${i === 3 ? "sel" : ""}">${d}</span>`).join("")}</div>`) +
        b("slots", `<div class="slots">${["11:00 am", "1:30 pm", "4:30 pm", "6:00 pm"].map((t, i) => `<span class="${i === 2 ? "sel" : ""}">${t}</span>`).join("")}</div>`) +
        b("button", `<div class="paybtn">Continue</div>`),
      pay: (st) => {
        const dep = 300, off = st.off ? 30 : 0;
        return b("header · 56", `<div class="ah"><span>‹ Time</span><strong>Deposit</strong><span></span></div>`) +
          b("summary", `<div class="row"><span>Hair colour, Thu 4:30 pm</span><span>${tk(2200)}</span></div><div class="row"><span>Deposit now</span><span>${tk(dep)}</span></div>${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Pay now</span><span>${tk(dep - off)}</span></div>`, ch(st.flash === "off")) +
          b("payment · connector", payRows(st, dep - off), ch(st.flash === "off"));
      },
      sms: (st) => smsScreen(st, [
        `${APPS.book.name}: booking confirmed for Thu 4:30 pm, hair colour. Deposit ${tk(300 - (st.off ? 30 : 0))} received.`,
        ...(st.remind ? [`${APPS.book.name}: reminder, see you tomorrow at 4:30 pm. Need to change it? ${APPS.book.slug}.amader.cloud/r/88`] : []),
      ], st.flash === "remind" || st.flash === "off"),
      admin: (st) => adminScreen(st, "Bookings", [["Thu 4:30 pm · Hair colour", tk(300 - (st.off ? 30 : 0)), "Deposit paid by bKash"]]),
    },
    fees: {
      home: (st) =>
        b("header · 56", `<div class="ah"><strong>${APPS.fees.name}</strong><span class="cart">Help</span></div>`, ch(st.flash === "green")) +
        b("hero · banner", `<div class="hero-b"><span>Pay monthly fees</span><small>Receipt by SMS to the guardian</small></div>`, ch(st.flash === "green")) +
        b("lookup", `<div class="fld">Student ID: BP-2071</div><div class="paybtn">Find student</div>`) +
        b("list · batches", [["Class 9 science", "Sat, Mon, Wed"], ["Class 10 science", "Sun, Tue, Thu"]]
          .map(([n, d]) => `<div class="row svc"><span>${n}</span><span class="muted">${d}</span></div>`).join("")),
      item: (st) =>
        b("header · 56", `<div class="ah"><span>‹ Back</span><strong>Fees due</strong><span></span></div>`) +
        b("student", `<div class="row"><span>BP-2071 · Class 9 science</span></div>`) +
        b("invoices", `<div class="row"><span>October fee</span><span>${tk(2500)}</span></div><div class="row muted"><span>September fee</span><span>Paid</span></div>${st.late ? `<div class="row warn"><span>Late fee after the 10th</span><span>${tk(100)}</span></div>` : ""}`, ch(st.flash === "late")) +
        b("button", `<div class="paybtn">Pay October fee</div>`),
      pay: (st) => {
        const fee = 2500, late = st.late ? 100 : 0, off = st.off ? Math.round(fee * 0.1) : 0;
        return b("header · 56", `<div class="ah"><span>‹ Fees</span><strong>Payment</strong><span></span></div>`) +
          b("summary", `<div class="row"><span>October fee</span><span>${tk(fee)}</span></div>${late ? `<div class="row warn"><span>Late fee</span><span>${tk(late)}</span></div>` : ""}${off ? `<div class="row ok"><span>bKash discount</span><span>−${tk(off)}</span></div>` : ""}<div class="row tot"><span>Total</span><span>${tk(fee + late - off)}</span></div>`, ch(st.flash === "off" || st.flash === "late")) +
          b("payment · connector", payRows(st, fee + late - off), ch(st.flash === "off"));
      },
      sms: (st) => smsScreen(st, [
        `${APPS.fees.name}: received ${tk(2500 + (st.late ? 100 : 0) - (st.off ? 250 : 0))} for BP-2071, October fee. Receipt: ${APPS.fees.slug}.amader.cloud/rc/5521`,
      ], st.flash === "off" || st.flash === "late"),
      admin: (st) => adminScreen(st, "Collected this month", [["BP-2071 · October", tk(2500 + (st.late ? 100 : 0) - (st.off ? 250 : 0)), "Paid by bKash · receipt sent"]]),
    },
  };

  function smsScreen(st, texts, changed) {
    return b("sms · thread", `<div class="sms-head">${esc(APPS[st.app].name)}</div>` +
      texts.map((t, i) => `<div class="sms${changed && i === texts.length - 1 ? " changed" : ""}">${esc(t)}</div>`).join(""));
  }
  function adminScreen(st, title, rows) {
    return b("header · 56", `<div class="ah"><strong>${title}</strong><span class="live-dot">Live</span></div>`) +
      b("toast", `<div class="toast">New payment received</div>`, " changed") +
      b("list", rows.map(([a, amt, s]) => `<div class="order"><div class="row"><strong>${a}</strong><span>${amt}</span></div><div class="muted">${s}</div></div>`).join("")) +
      b("note", `<p class="muted">Money goes to your own merchant account, not to Amader Cloud.</p>`);
  }

  // ---------- State and rendering ----------
  let st = null;      // { app, off, green, cod, remind, late, flash, built, published, tab, undo: [] }
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
  async function ink(token) {
    const blocks = [...screen.querySelectorAll(".b.draft")];
    for (const el of blocks) { await wait(70); if (token !== run) return; el.classList.add("drawn"); }
    await wait(260);
    for (const el of blocks) { await wait(90); if (token !== run) return; el.classList.remove("draft"); el.classList.add("ink"); }
  }
  tabs.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]");
    if (t && !t.disabled) { st.flash = null; paint(t.dataset.tab); }
  });

  function setStatus(text, live) { status.textContent = text; status.classList.toggle("live", !!live); }
  function scrollMsgs() { msgs.scrollTop = msgs.scrollHeight; }
  function say(role, html, model) {
    const li = document.createElement("li");
    li.className = `m ${role}`;
    li.innerHTML = (model ? `<span class="who">${model}</span>` : "") + html;
    msgs.append(li); scrollMsgs();
    return li;
  }
  async function typeUser(text, token) {
    const li = say("user", "");
    for (let i = 1; i <= text.length; i += 3) { li.textContent = text.slice(0, i); scrollMsgs(); await wait(14); if (token !== run) return false; }
    li.textContent = text;
    return true;
  }
  function logList(model) {
    const li = say("ai log", `<ol class="steps"></ol>`, model);
    return li.querySelector(".steps");
  }
  async function step(list, text, token, ms = 520) {
    const s = document.createElement("li");
    s.innerHTML = `<span class="st"></span>${text}`;
    list.append(s); scrollMsgs();
    await wait(ms);
    if (token !== run) return false;
    s.classList.add("done");
    return true;
  }
  function setChips(items) {
    chips.innerHTML = items.map((c, i) => `<button type="button" class="chip${c.primary ? " primary" : ""}" data-chip="${i}">${esc(c.label)}</button>`).join("");
    chips._items = items;
    requestAnimationFrame(scrollMsgs); // the chip row resizes the message list
  }
  chips.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-chip]");
    if (!btn) return;
    chips._items[+btn.dataset.chip].go();
  });

  function startChips() {
    setChips(Object.entries(APPS).map(([k, a]) => ({ label: a.prompt, go: () => build(k, a.prompt) })));
  }
  function editChips() {
    const app = APPS[st.app];
    const items = [...COMMON, app.special].filter((e) => !st[e.key]).map((e) => ({ label: e.chip, go: () => edit(e, e.chip) }));
    if (st.undo.length) items.push({ label: "Undo last change", go: undo });
    if (!st.published) items.push({ label: "Publish", primary: true, go: publish });
    items.push({ label: "Start over", go: reset });
    setChips(items);
  }

  // ---------- Scripts ----------
  async function build(key, text) {
    const token = ++run;
    const app = APPS[key];
    msgs.innerHTML = ""; setChips([]);
    st = { app: key, off: false, green: false, cod: false, remind: false, late: false, flash: null, built: false, published: false, tab: "home", undo: [] };
    screen.innerHTML = ""; tabs.innerHTML = ""; url.textContent = "…";
    root.classList.add("running");
    setStatus("Reading your request", true);
    if (!(await typeUser(text, token))) return;
    await wait(450); if (token !== run) return;

    setStatus("Claude Opus 5.5 · planning", true);
    say("ai", `<p>Here is the plan for a <strong>${app.kind}</strong> called ${esc(app.name)}:</p><ul>${app.plan.map((p) => `<li>${p}</li>`).join("")}</ul>`, "Claude Opus 5.5 · plan");
    await wait(900); if (token !== run) return;

    setStatus("Claude Opus 5.5 · building", true);
    const list = logList("Claude Opus 5.5 · build");
    if (!(await step(list, `Data model: ${app.model}`, token))) return;
    paint("home", { draft: true }); ink(token);
    if (!(await step(list, "Pages from the tested component library", token, 1500))) return;
    paint("item", { draft: true }); ink(token);
    if (!(await step(list, `${app.tabs[1][1]} page`, token, 1300))) return;
    paint("pay", { draft: true }); ink(token);
    if (!(await step(list, "Payment connector: bKash, Nagad, card (sandbox)", token, 1500))) return;
    if (key === "shop" && !(await step(list, "Courier connector: booking on dispatch", token, 500))) return;
    paint("sms", { draft: true }); ink(token);
    if (!(await step(list, "SMS gateway: message templates", token, 1100))) return;
    setStatus("Running tests", true);
    if (!(await step(list, "Tests: pages, payment callback, SMS · passed", token, 900))) return;

    setStatus("Claude Haiku 4.5 · safety review", true);
    const rev = logList("Claude Haiku 4.5 + rules · review");
    if (!(await step(rev, "No impersonation of banks or payment brands", token, 600))) return;
    if (!(await step(rev, "No prohibited goods; payment pages are genuine", token, 600))) return;

    st.built = true;
    paint("home");
    say("ai", `<p>Your preview is ready at <span class="mono">${app.slug}.amader.cloud</span>. Tap the tabs under the phone to look around, or ask for a change.</p>`, "Amader Cloud");
    setStatus("Preview ready · tests passed");
    root.classList.remove("running");
    editChips();
  }

  async function edit(e, text) {
    if (!st?.built) return;
    const token = ++run;
    setChips([]);
    root.classList.add("running");
    if (!(await typeUser(text, token))) return;
    await wait(350); if (token !== run) return;
    setStatus("Claude Sonnet 5.5 · editing", true);
    const list = logList("Claude Sonnet 5.5 · edit");
    if (!(await step(list, `Changing: ${e.touched}`, token, 800))) return;
    st.undo.push({ ...st, undo: undefined });
    st[e.key] = true;
    st.flash = e.key;
    paint(e.screen);
    if (!(await step(list, "Tests passed · preview updated", token, 600))) return;
    say("ai", `<p>${e.reply}</p><p class="muted">The changed parts are outlined on the phone. Every change can be undone.</p>`, "Amader Cloud");
    setStatus("Preview updated · tests passed");
    root.classList.remove("running");
    editChips();
  }

  function undo() {
    const prev = st.undo.pop();
    if (!prev) return;
    const stack = st.undo;
    st = { ...prev, undo: stack, flash: null };
    say("ai", `<p>Rolled back the last change.</p>`, "Amader Cloud");
    paint(st.tab);
    editChips();
  }

  async function publish() {
    const token = ++run;
    const app = APPS[st.app];
    setChips([]);
    root.classList.add("running");
    if (!(await typeUser("Publish it", token))) return;
    setStatus("Publishing", true);
    const list = logList("Amader Cloud · publish");
    if (!(await step(list, "Final review against scams and impersonation · passed", token, 700))) return;
    if (!(await step(list, `Live at ${app.slug}.amader.cloud`, token, 600))) return;
    st.published = true;
    paint("admin");
    say("ai", `<p>You're live (in this demonstration). Payments go straight to your own merchant accounts through our licensed payment partner; Amader Cloud never holds your money.</p>`, "Amader Cloud");
    setStatus("Live · demonstration");
    root.classList.remove("running");
    editChips();
  }

  function reset() {
    run++;
    st = null;
    msgs.innerHTML = "";
    screen.innerHTML = `<div class="empty"><span>Pick a business on the left, or describe your own. Your app appears here.</span></div>`;
    tabs.innerHTML = ""; url.textContent = "yourname.amader.cloud";
    setStatus("Waiting for your request");
    root.classList.remove("running");
    say("ai", `<p>Describe the app your business needs, or pick one below.</p>`, "Amader Cloud");
    startChips();
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    if (st?.built && !root.classList.contains("running")) {
      const app = APPS[st.app];
      if (/publish|go live|launch/i.test(text) && !st.published) return publish();
      const e = [...COMMON, app.special].find((x) => x.match.test(text) && !st[x.key]);
      if (e) return edit(e, text);
      if (/start over|new app|reset/i.test(text)) return reset();
      say("user", esc(text));
      say("ai", `<p>This demonstration can only make the changes suggested below. The real builder takes any request.</p>`, "Amader Cloud");
      return;
    }
    const key = Object.keys(APPS).find((k) => APPS[k].match.test(text)) || "shop";
    build(key, text);
  });

  reset();
}
