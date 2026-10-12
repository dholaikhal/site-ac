// Behaviour for the example apps: a bag and checkout for the shop and the kitchen, a booking flow
// for the salon and the clinic. Nothing typed here is sent anywhere; every flow ends on a screen
// that says this is an example and no order was placed.
const app = JSON.parse(document.querySelector("[data-app]").textContent);
const sheet = document.querySelector("[data-sheet]");
const body = document.querySelector("[data-sheet-body]");
const tk = (n) => "Tk " + n.toLocaleString("en-IN");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const item = (id) => app.items.find((i) => i.id === id);
const KEY = `example-bag:${app.slug}`;
const store = {
  get() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } },
  set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} },
};
let bag = store.get();
const count = () => Object.values(bag).reduce((a, b) => a + b, 0);
const subtotal = () => Object.entries(bag).reduce((a, [id, q]) => a + (item(id)?.price ?? 0) * q, 0);
const paint = () => document.querySelectorAll("[data-count]").forEach((el) => { el.textContent = count(); el.hidden = !count(); });

// ---------- Dates ----------
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d) => `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
const openDays = (n) => { const out = []; const d = new Date(); d.setHours(0, 0, 0, 0); while (out.length < n) { if (d.getDay() !== app.closed) out.push(new Date(d)); d.setDate(d.getDate() + 1); } return out; };
const seeded = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return () => ((h = (h * 1103515245 + 12345) >>> 0) % 1000) / 1000; };

// ---------- Sheet ----------
let view = null, st = {};
// Re-rendering on a choice (a day, a slot) keeps whatever was typed into the form so far.
const show = (v) => {
  const typed = v === view ? [...body.querySelectorAll("input[name]:not([type=radio]), textarea[name]")].map((f) => [f.name, f.value]) : [];
  const pay = body.querySelector("input[name=pay]:checked")?.value;
  view = v; body.innerHTML = VIEWS[v]();
  typed.forEach(([n, val]) => { const f = body.querySelector(`[name="${n}"]`); if (f) f.value = val; });
  if (pay) body.querySelector(`input[name=pay][value="${pay}"]`)?.click();
  if (!sheet.open) sheet.showModal();
};
const close = () => sheet.close();
sheet.addEventListener("click", (e) => { if (e.target === sheet) close(); });
const head = (title, back) => `<div class="sh-head">${back ? `<button type="button" class="sh-back" data-go="${back}" aria-label="Back">←</button>` : ""}<h2>${title}</h2><button type="button" class="sh-x" data-act="close" aria-label="Close">×</button></div>`;
const PAY = [["bkash", '<img src="/assets/logos/bkash.svg" alt="bKash" height="22">'], ["nagad", '<img src="/assets/logos/nagad.png" alt="Nagad" height="20">'], ["card", '<span class="cards"><img src="/assets/logos/visa.svg" alt="Visa" height="11"><img src="/assets/logos/mastercard.svg" alt="Mastercard" height="16"><img src="/assets/logos/amex.svg" alt="American Express" height="16"></span> Card']];
const payWith = () => `<fieldset class="pay"><legend>Pay with</legend>${PAY.map(([v, l], i) => `<label><input type="radio" name="pay" value="${v}"${i === 0 ? " checked" : ""}><span>${l}</span></label>`).join("")}</fieldset>`;
const contact = (addr) => `<div class="fields"><label>Your name<input name="name" autocomplete="name" required></label><label>Mobile number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="01XXX-XXXXXX" required></label>${addr ? `<label class="full">Delivery address<textarea name="addr" rows="2" autocomplete="street-address" required></textarea></label>` : ""}</div>`;
const lines = () => Object.entries(bag).map(([id, q]) => { const it = item(id); return it ? `<li><span>${esc(it.name)}<small>${tk(it.price)} each</small></span><span class="qty"><button type="button" data-dec="${id}" aria-label="One less">−</button><output>${q}</output><button type="button" data-inc="${id}" aria-label="One more">+</button></span><b>${tk(it.price * q)}</b></li>` : ""; }).join("");
const noun = { shop: "order", kitchen: "order", salon: "booking", clinic: "serial" }[app.kind];
const aNoun = (noun === "order" ? "an " : "a ") + noun;

const VIEWS = {
  bag: () => count()
    ? `${head("Your bag")}<ul class="lines">${lines()}</ul><div class="sum"><span>Subtotal</span><b>${tk(subtotal())}</b></div><button type="button" class="btn big wide" data-go="checkout">Checkout</button>`
    : `${head("Your bag")}<p class="empty">Your bag is empty.</p><button type="button" class="btn wide" data-act="close">Keep browsing</button>`,

  checkout: () => {
    const kitchen = app.kind === "kitchen";
    const days = kitchen ? openDays(4) : [];
    const late = new Date().getHours() >= 20;
    if (kitchen && st.day == null) st.day = late && days[0].toDateString() === new Date().toDateString() ? 1 : 0;
    const del = kitchen ? app.delivery[0].price : app.delivery[st.zone ?? 0].price;
    return `${head("Checkout", "bag")}<form data-pay>
      <div class="sum mini"><span>${count()} item${count() > 1 ? "s" : ""}</span><b>${tk(subtotal())}</b></div>
      ${contact(true)}
      ${kitchen
        ? `<fieldset><legend>Delivery day</legend><div class="days">${days.map((d, i) => { const off = i === 0 && late && d.toDateString() === new Date().toDateString(); return `<button type="button" data-day="${i}" aria-pressed="${st.day === i}"${off ? " disabled" : ""}><small>${DAYS[d.getDay()]}</small>${d.getDate()}</button>`; }).join("")}</div>
           <legend class="sub">Time</legend><div class="slots">${app.slots.map((s, i) => `<button type="button" data-slot="${i}" aria-pressed="${(st.slot ?? 1) === i}">${s}</button>`).join("")}</div>${late ? '<p class="hint">Orders after 8 pm go to the next day.</p>' : ""}</fieldset>`
        : `<fieldset><legend>Delivery</legend>${app.delivery.map((d, i) => `<label class="opt"><input type="radio" name="zone" value="${i}"${(st.zone ?? 0) === i ? " checked" : ""} data-zone="${i}"><span>${d.label}</span><b>${tk(d.price)}</b></label>`).join("")}</fieldset>`}
      ${payWith()}
      <div class="sum"><span>Delivery</span><span>${tk(del)}</span></div>
      <div class="sum tot"><span>Total</span><b>${tk(subtotal() + del)}</b></div>
      <button class="btn big wide">Pay ${tk(subtotal() + del)}</button></form>`;
  },

  book: () => {
    const clinic = app.kind === "clinic";
    const days = openDays(7);
    st.day ??= 0;
    const pick = st.pick && item(st.pick);
    const d = days[st.day];
    const rnd = seeded(app.slug + d.toDateString() + (st.pick || ""));
    let picker = "";
    if (pick && clinic) {
      // Evening serials run 5 to 9 pm; after 8 pm today's are all taken.
      const late = d.toDateString() === new Date().toDateString() && new Date().getHours() >= 20;
      const taken = late ? 20 : Math.floor(rnd() * 12) + 3;
      if (st.serial == null || st.serial <= taken) st.serial = taken < 20 ? taken + 1 : null;
      picker = `<legend class="sub">Serial</legend><div class="serials">${Array.from({ length: 20 }, (_, i) => `<button type="button" data-serial="${i + 1}" aria-pressed="${st.serial === i + 1}"${i < taken ? " disabled" : ""}>${i + 1}</button>`).join("")}</div>
        <p class="hint">${st.serial ? `Serial ${st.serial}: expected around ${expected(st.serial)}. We text you when three patients are left before you.` : "Today's serials are full. Pick another day."}</p>`;
    } else if (pick) {
      // Some times are already booked; on today, the ones within the next hour are gone too.
      const mins = (t) => { const [, h, m, ap] = t.match(/(\d+):(\d+) (am|pm)/); return ((+h % 12) + (ap === "pm" ? 12 : 0)) * 60 + +m; };
      const now = new Date(), today = d.toDateString() === now.toDateString();
      const gone = app.slots.map((t) => rnd() < 0.3 || (today && mins(t) < now.getHours() * 60 + now.getMinutes() + 60));
      if (st.slot == null || gone[st.slot]) st.slot = gone.findIndex((g) => !g);
      picker = `<legend class="sub">Time</legend><div class="slots">${app.slots.map((s, i) => `<button type="button" data-slot="${i}" aria-pressed="${st.slot === i}"${gone[i] ? " disabled" : ""}>${s}</button>`).join("")}</div>`;
    }
    return `${head(clinic ? "Get a serial" : "Book a time")}
      <fieldset><legend>${clinic ? "Doctor" : "Service"}</legend><div class="choose">${app.items.map((it) => `<label class="opt"><input type="radio" name="pick" value="${it.id}"${st.pick === it.id ? " checked" : ""} data-pick="${it.id}"><span>${esc(it.name)}<small>${esc(it.meta)}</small></span><b>${tk(it.price)}</b></label>`).join("")}</div></fieldset>
      ${pick ? `<fieldset><legend>Day</legend><div class="days">${days.map((x, i) => `<button type="button" data-day="${i}" aria-pressed="${st.day === i}"><small>${DAYS[x.getDay()]}</small>${x.getDate()}</button>`).join("")}</div>${picker}</fieldset>
        <button type="button" class="btn big wide" data-go="pay"${(clinic ? st.serial : st.slot >= 0) ? "" : " disabled"}>Continue</button>` : `<p class="hint">Choose a ${clinic ? "doctor" : "service"} to see the free times.</p>`}`;
  },

  pay: () => {
    const it = item(st.pick), d = openDays(7)[st.day];
    const when = app.kind === "clinic" ? `Serial ${st.serial} · ${fmt(d)}, around ${expected(st.serial)}` : `${fmt(d)}, ${app.slots[st.slot]}`;
    return `${head(app.fee.label, "book")}<form data-pay>
      <div class="card-sum"><b>${esc(it.name)}</b><span>${when}</span></div>
      ${contact(false)}${payWith()}
      <div class="sum"><span>${app.kind === "clinic" ? "Consultation, at the chamber" : "Service, at the salon"}</span><span>${tk(it.price)}</span></div>
      <div class="sum tot"><span>${app.fee.label} now</span><b>${tk(app.fee.amount)}</b></div>
      <p class="hint">${app.fee.note}</p>
      <button class="btn big wide">Pay ${tk(app.fee.amount)}</button></form>`;
  },

  done: () => `${head("Example only")}<div class="done">
      <span class="done-ic" aria-hidden="true">✓</span>
      <h3>That's how ${aNoun} works here.</h3>
      <p>This is an example app, so <b>no ${noun} was made and nothing was charged</b>. In a real Amader Cloud app the payment goes straight to the owner's own bKash, Nagad or card account, and the customer gets an SMS.</p>
      <blockquote>“${esc(app.prompt)}”</blockquote>
      <p class="hint">The request this example answers. Describe yours and our agent builds it.</p>
      <a class="btn big wide" href="https://amader.cloud/contact.html?topic=beta#form">Build one like it</a>
      <button type="button" class="btn ghost wide" data-act="close">Back to ${esc(app.name)}</button></div>`,
};
const expected = (n) => { const m = 17 * 60 + (n - 1) * 12; const h = Math.floor(m / 60), mm = m % 60; return `${h - 12}:${String(mm).padStart(2, "0")} pm`; };

// ---------- Events ----------
body.addEventListener("click", (e) => {
  const t = e.target.closest("button, input");
  if (!t) return;
  if (t.dataset.act === "close") return close();
  if (t.dataset.go) return show(t.dataset.go);
  if (t.dataset.inc || t.dataset.dec) {
    const id = t.dataset.inc || t.dataset.dec;
    bag[id] = (bag[id] || 0) + (t.dataset.inc ? 1 : -1);
    if (bag[id] <= 0) delete bag[id];
    store.set(bag); paint(); return show("bag");
  }
  if (t.dataset.day) { st.day = +t.dataset.day; return show(view); }
  if (t.dataset.slot) { st.slot = +t.dataset.slot; return show(view); }
  if (t.dataset.serial) { st.serial = +t.dataset.serial; return show(view); }
  if (t.dataset.zone) { st.zone = +t.dataset.zone; return show(view); }
  if (t.dataset.pick) { st.pick = t.dataset.pick; st.slot = st.serial = null; return show(view); }
});
body.addEventListener("submit", (e) => {
  e.preventDefault(); // nothing is sent: this is an example
  if (app.kind === "shop" || app.kind === "kitchen") { bag = {}; store.set(bag); paint(); }
  st = {}; show("done");
});

document.addEventListener("click", (e) => {
  const open = e.target.closest("[data-open]");
  if (open) { if (open.dataset.pick) { st = { pick: open.dataset.pick }; } return show(open.dataset.open); }
  const add = e.target.closest("[data-add]");
  if (add) {
    const q = +(document.querySelector("[data-qty] output")?.textContent || 1);
    bag[add.dataset.add] = (bag[add.dataset.add] || 0) + (add.closest(".product") ? q : 1);
    store.set(bag); paint();
    add.classList.add("added"); const was = add.textContent; add.textContent = "Added ✓";
    setTimeout(() => { add.classList.remove("added"); add.textContent = was; }, 1200);
    return;
  }
  const qb = e.target.closest("[data-qty] button");
  if (qb) { const o = qb.parentElement.querySelector("output"); o.textContent = Math.max(1, +o.textContent + (qb.textContent === "+" ? 1 : -1)); return; }
  const cat = e.target.closest("[data-cat]");
  if (cat) {
    cat.parentElement.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b === cat)));
    document.querySelectorAll("[data-c]").forEach((c) => { c.hidden = cat.dataset.cat !== "All" && c.dataset.c !== cat.dataset.cat; });
  }
});
paint();
