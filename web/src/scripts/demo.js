import { APPS, COMMON, PAY, amount, SCREENS, tk, esc, logo, ASK } from "./apps.js";
import { skeleton } from "./skeleton.js";
import { celebrate as burst } from "./celebrate.js";
// Amader Cloud builder demo. Scripted entirely in the browser: no agent is called, nothing is published.
// Copy rule: the product is "our agent" / "our store agent", never "AI" or a model.
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
  const devBox = $("#demo-device");
  const deviceEl = devBox.querySelector("[data-device]");
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

  const wait = (ms) => new Promise((r) => setTimeout(r, ms * pace));

  // ---------- Language: replies follow how the visitor writes (English, or Bangla in English letters) ----------
  let lang = "en";
  const ROMAN_BN = /\b(amar|ami|chai|lagbe|dokan|kore|koro|korle|korbo|dao|jonno|nibo|nite|hobe|jabe|ekta|rong|shobuj|chhar|tarikh\w*|mashik|ager|pathao|rakho|shudhu|bhitore|hishebe|kori|notun|ferot)\b/i;
  const T = {
    en: { ask: "What should we build?", plan: (a) => `Got it. Plan: a <strong>${a.kind}</strong> called ${esc(a.name)}.`, ready: (u) => `Your store is ready at <span class="url">${u}</span>. Ask for any change, or open it to customers.`,
      live: "Live. Payments go to your own merchant account.", undone: "Undone.", unknown: "Try one of the changes below.",
      undo: "Undo last change", publish: "Publish", over: "Start over", customer: "Try it as a customer", publishSay: "Publish it",
      after: "That's your customer's side. The money went straight to your merchant account." },
    bn: { ask: "Ki toiri korbo?", plan: (a) => `Thik ache. ${esc(a.name)} er jonno ei plan:`, ready: (u) => `Preview toiri: <span class="url">${u}</span>. Ja bodlate chan bolun, ba publish korun.`,
      live: "Live! Taka shoja apnar merchant account e jabe.", undone: "Ager obosthay ferot gelam.", unknown: "Nicher kono ekta change try korun.",
      undo: "Ager ta ferot ano", publish: "Publish kore dao", over: "Notun kore shuru", customer: "Customer hishebe try kori", publishSay: "Publish kore dao",
      after: "Customer eta dekhe. Taka shoja apnar merchant account e geche." },
  };
  const t = () => T[lang];

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

  // ---------- Device: the same app on a phone, a tablet or a laptop ----------
  const MODELS = { phone: "device-iphone-14-pro", tablet: "device-ipad-pro", laptop: "device-macbook-pro" };
  root.querySelectorAll("[data-dev]").forEach((b) => b.addEventListener("click", () => {
    const k = b.dataset.dev;
    devBox.dataset.kind = k;
    deviceEl.className = `device ${MODELS[k]} device-spacegray`;
    root.querySelectorAll("[data-dev]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  }));

  // ---------- The till: today's sales after the store opens ----------
  const PEOPLE = { shop: [["Printed tote", 1250, "bKash"], ["Jute pouch", 350, "Nagad"], ["Woven handbag", 1850, "Card"]],
    kitchen: [["Chicken biryani", 320, "bKash"], ["Chocolate cake", 850, "Nagad"], ["Kacchi biryani", 450, "bKash"]],
    doctor: [["Serial 9 · Dr. S. Akter", 200, "bKash"], ["Serial 14 · Dr. A. Rahman", 200, "Nagad"], ["Serial 4 · Dr. M. Hossain", 200, "bKash"]],
    pharmacy: [["Oral saline", 60, "bKash"], ["Digital thermometer", 350, "Nagad"], ["Paracetamol 500 mg", 20, "bKash"]],
    event: [["Front rows × 2", 1800, "bKash"], ["Student", 300, "Nagad"], ["General × 3", 1500, "Card"]],
    service: [["Gas refill visit", 500, "bKash"], ["AC servicing visit", 500, "Nagad"], ["Installation visit", 500, "bKash"]],
    book: [["Facial", 300, "bKash"], ["Haircut", 300, "Nagad"], ["Manicure", 300, "bKash"]],
    fees: [["BP-2044 · October", 2500, "Nagad"], ["BP-2102 · October", 2500, "bKash"], ["BP-2010 · October", 2500, "bKash"]] };
  function sale(what, amt, method) {
    st.sales += amt; st.orders++;
    till.hidden = false;
    tillAmt.textContent = tk(st.sales);
    tillN.textContent = `${st.orders} ${{ fees: "payment", book: "booking", doctor: "serial", event: "ticket", service: "visit" }[st.app] || "order"}${st.orders === 1 ? "" : "s"}`;
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
  const AGENT = (what) => `<span class="spark" aria-hidden="true">✦</span> Store agent · ${what}`;
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
  // The camera leans in: the phone zooms onto the part that just changed (or the notification that just
  // arrived), holds, and eases back out. The stage clips it, so it reads as a close-up, not a pop-out.
  let zoomTimer = 0;
  function focusZoom(el, hold = 1700) {
    const wrap = devBox.closest(".dev-wrap");
    if (!el || !wrap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = wrap.getBoundingClientRect(), r = el.getBoundingClientRect();
    wrap.style.transformOrigin = `${r.left - w.left + r.width / 2}px ${r.top - w.top + r.height / 2}px`;
    wrap.classList.add("zoom");
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(() => wrap.classList.remove("zoom"), hold);
  }
  function celebrate() {
    openSign.hidden = false;
    openSign.classList.remove("swing"); void openSign.offsetWidth; openSign.classList.add("swing");
    burst(devBox, { kind: st?.app });
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
    // Short labels for the kinds of business; picking one types its full request.
    setChips([...Object.entries(APPS).map(([k, a]) => ({ label: a.label, go: () => build(k, a.prompt) })), { label: "Salon, asked in Bangla words", alt: true, go: () => build("book", APPS.book.bn) }]);
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
    screen.style.removeProperty("--brand"); screen.innerHTML = skeleton(); tabs.innerHTML = ""; url.textContent = "…";
    busy(true);
    setStatus("Reading your request", true);
    if (!(await typeUser(text, token))) return;
    await wait(450); if (token !== run) return;
    // The screen takes shape with the conversation: the name and colours once the request is read, more with each
    // answer, the plan's parts once there is a plan; then the build paints the real pages over it.
    const shape = (level, labels) => { screen.style.setProperty("--brand", app.color); screen.innerHTML = skeleton({ level, name: app.name, labels }); };
    shape(1);

    // A short back and forth before building: the agent asks, the owner answers.
    let answered = 0;
    for (const [q, a, bq, ba] of ASK[key]) {
      setStatus("Our agent has a question", true, true);
      if (!(await stream(`<p>${lang === "bn" ? bq : q}</p>`, AGENT("question"), token))) return;
      await wait(500); if (token !== run) return;
      if (!(await typeUser(lang === "bn" ? ba : a, token))) return;
      shape(Math.min(3, ++answered + 1));
      await wait(350); if (token !== run) return;
    }

    setStatus("Our agent is planning", true, true);
    if (!(await stream(`<p>${t().plan(app)}</p><ul>${app.plan.map((p) => `<li>${p}</li>`).join("")}</ul>`, AGENT("plan"), token))) return;
    shape(4, app.plan.map((p) => p.split(":")[0]));
    await wait(500); if (token !== run) return;

    setStatus("Our agent is building", true, true);
    const list = logList(AGENT("build"));
    paint("home", { draft: true }); ink(token);
    if (!(await step(list, "Designing your front page", token, 1500))) return;
    paint("item", { draft: true }); ink(token);
    if (!(await step(list, `Adding your ${{ shop: "products", kitchen: "menu and delivery times", book: "services and opening hours", doctor: "doctors and chamber hours", pharmacy: "medicines and delivery area", event: "event and ticket types", service: "services and team hours", fees: "students and batches" }[key]}`, token, 1300))) return;
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
    setStatus("Our agent is changing it", true, true);
    const list = logList(AGENT("change"));
    if (!(await step(list, `Updating ${e.touched}`, token, 900))) return;
    st.undo.push({ ...st, undo: undefined });
    st[e.key] = true;
    st.flash = e.key;
    paint(e.screen);
    screen.querySelectorAll(".b.changed").forEach((el) => el.classList.add("paint"));
    focusZoom(screen.querySelector(".b.changed"));
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
      notify("✓", `<b>New ${{ fees: "payment", book: "booking", doctor: "serial", event: "ticket", service: "visit" }[st.app] || "order"}</b> ${tk(amt)} · ${method}`, "ok");
      focusZoom(notifEl, 1500);
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
    sheet.innerHTML = `<b class="ps-head">${logo("bkash", 26)} Payment</b><span class="row"><span>Merchant</span><span>${esc(app.name)}</span></span><span class="row"><span>Amount</span><strong>${tk(amt)}</strong></span><span class="fld">Wallet number · 01•••••••••</span><span class="fld">PIN · ••••</span><span class="paybtn">Confirm</span>`;
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
    sale({ shop: "Market tote", kitchen: "Kacchi × 2", book: "Hair colour", doctor: "Serial 13 · Dr. A. Rahman", pharmacy: "3 items", event: "General × 2", service: "AC servicing visit", fees: "BP-2071 · October" }[st.app], amt, "bKash");
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
    screen.style.removeProperty("--brand"); screen.innerHTML = skeleton({ caption: "Your app appears here." });
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
    // the kind of business named first wins: "my home kitchen, with delivery" is a kitchen, not a shop that delivers
    const key = Object.keys(APPS).map((k) => [k, text.search(APPS[k].match)]).filter(([, at]) => at >= 0).sort((x, y) => x[1] - y[1])[0]?.[0] || "shop";
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
