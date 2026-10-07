// amader.cloud — progressive enhancement only; every page works without this file.

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

// Contact form: prefill topic from ?topic=, post to data-endpoint when configured, else open an email draft.
const form = document.getElementById("contact-form");
if (form) {
  const topic = new URLSearchParams(location.search).get("topic");
  if (topic) {
    const radio = form.querySelector(`input[name="topic"][value="${CSS.escape(topic)}"]`);
    if (radio) radio.checked = true;
  }
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const endpoint = form.dataset.endpoint;
    status.className = "form-status";
    if (endpoint) {
      status.textContent = "Sending…";
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = "Sent. We'll reply on WhatsApp or email within one working day.";
        status.classList.add("ok");
      } catch {
        status.textContent = "Your message didn't send. Check your connection and try again, or email hello@amader.cloud.";
        status.classList.add("err");
      }
      return;
    }
    const lines = [
      `Name: ${data.name}`, `Phone / WhatsApp: ${data.phone}`, `Email: ${data.email || "-"}`,
      `Area: ${data.area}`, `About: ${data.topic}`, `Devices: ${data.devices || "-"}`, "", data.message || "",
    ];
    location.href = `mailto:hello@amader.cloud?subject=${encodeURIComponent(`[${data.topic}] ${data.name}, ${data.area}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    status.textContent = "Your email app should open with the message ready to send.";
    status.classList.add("ok");
  });
}

// Device checker
const checker = document.getElementById("checker");
if (checker) {
  const TVBOX = [
    // [pattern, chip label, tier]  tier: yes | maybe | no
    [/s905x3|x96\s*max\s*(\+|plus)|h96\s*max\s*x3|hk1\s*box|ugoos\s*x3|tx3\s*mini\s*plus/, "Amlogic S905X3", "yes"],
    [/s905x2|x96\s*max(?!\s*(\+|plus))|tx5\s*max/, "Amlogic S905X2", "yes"],
    [/s922x|gt[-\s]*king|am6/, "Amlogic S922X", "yes"],
    [/a311d/, "Amlogic A311D", "yes"],
    [/s912/, "Amlogic S912", "yes"],
    [/s905l3a|b860h|hg680p/, "Amlogic S905L3A / S905L", "yes"],
    [/s905w(?!2)|x96\s*mini|tx3\s*mini(?!\s*plus)/, "Amlogic S905W", "yes"],
    [/s905d|phicomm|n1\b/, "Amlogic S905D", "yes"],
    [/s905x(?![234])|s905\b/, "Amlogic S905 / S905X", "yes"],
    [/s905x4|s905w2|s905y[24]/, "a newer Amlogic chip", "maybe"],
    [/rk3318|rk3328|rk3228|rk3229|h96\s*max(?!\s*x3)/, "a Rockchip chip", "maybe"],
    [/h616|h313|h6\b|allwinner|tx6/, "an Allwinner chip", "maybe"],
    [/mi\s*box|xiaomi|fire\s*tv|firestick|chromecast|apple\s*tv|akash|set[-\s]*top|dth|nvidia\s*shield/, "a locked brand or operator box", "no"],
  ];
  const TYPES = {
    tvbox: {
      model: true,
      placeholder: "e.g. X96 Max+ or S905X3",
      jobs: ["Private cloud for photos, files and backups", "Notice screen on any TV", "Offline library server for a school"],
    },
    phone: {
      jobs: ["Security camera for a stairwell, gate or counter", "Small notice or price screen"],
      say: "Most Android phones from Android 8 onward can do this if the camera works and the battery isn't swollen. Older iPhones can work too. Send us the model and we'll confirm.",
      tier: "yes",
    },
    tablet: {
      jobs: ["Lobby notice board, shop menu or clinic queue screen", "Security camera", "Student device in a school lab"],
      say: "Almost any tablet that turns on and holds a charge can become a screen.",
      tier: "yes",
    },
    laptop: {
      jobs: ["School lab machine (4 GB memory or more)", "Building server or camera recorder, with its battery as backup power", "Spare computing power for research projects (from 2027)"],
      say: "Nearly every laptop from the last 12 years can be rebuilt. Swollen batteries are removed and the laptop runs on mains power.",
      tier: "yes",
    },
    desktop: {
      jobs: ["Camera recorder for a building or shop", "School lab machine", "Backup server for an office"],
      say: "Any desktop with a 64-bit processor can be rebuilt. Bring the monitor too if you can.",
      tier: "yes",
    },
    router: {
      model: true,
      placeholder: "e.g. TP-Link Archer C6",
      jobs: ["Extra Wi‑Fi for a roof, guard room or back office", "A separate guest network for a shop"],
      say: "It depends on the exact model and hardware version. We rebuild routers with OpenWrt, which needs at least 16 MB of storage and 128 MB of memory. ISP-supplied fibre boxes (ONUs) usually can't be rebuilt.",
      tier: "maybe",
      link: ["Look up your router in the OpenWrt hardware table", "https://openwrt.org/toh/start"],
    },
    screen: {
      jobs: ["Notice board or menu display, paired with a TV box", "Lab screen for a school"],
      say: "Any TV or monitor with an HDMI or VGA input works.",
      tier: "yes",
    },
  };
  const TITLES = { yes: "Yes, this can have a second job", maybe: "Probably. We need to test it", unknown: "We need to see this one", no: "Not as a server, but it can still work" };

  const out = checker.querySelector(".verdict");
  const modelWrap = checker.querySelector("#model-field");
  const modelInput = checker.querySelector("#model");

  function render() {
    const type = checker.querySelector('input[name="type"]:checked')?.value;
    if (!type) { out.hidden = true; return; }
    const t = TYPES[type];
    modelWrap.hidden = !t.model;
    if (t.model) modelInput.placeholder = t.placeholder;

    let tier = t.tier || "maybe", say = t.say || "", jobs = t.jobs;
    if (type === "tvbox") {
      const q = modelInput.value.trim().toLowerCase();
      const hit = q && TVBOX.find(([re]) => re.test(q));
      if (!q) { say = "Type the model printed on the label, or the chip name from Settings › About. Most Amlogic-based boxes work."; tier = "unknown"; }
      else if (!hit) { say = "We don't know this one yet. Send us a photo of the label and we'll check it. We test new models every week."; tier = "unknown"; }
      else {
        tier = hit[2];
        say = tier === "yes" ? `It looks like ${hit[1]}, which we support. We'll confirm the real memory when we test it.`
          : tier === "maybe" ? `It looks like ${hit[1]}. Those are in testing. Bring it in and we'll try.`
          : `It looks like ${hit[1]}. It can't be unlocked to run our server software, but brand boxes can still drive a notice screen using their own software. Operator boxes we recycle properly.`;
        if (tier === "no") jobs = ["Notice screen on any TV, using its own software"];
      }
    }
    out.className = `verdict ${tier === "unknown" ? "maybe" : tier}`;
    out.innerHTML = "";
    const h = document.createElement("h3"); h.textContent = TITLES[tier]; out.append(h);
    const p = document.createElement("p"); p.textContent = say; out.append(p);
    if (jobs.length) {
      const ul = document.createElement("ul");
      jobs.forEach((j) => { const li = document.createElement("li"); li.textContent = j; ul.append(li); });
      out.append(ul);
    }
    const next = document.createElement("p"); next.className = "next";
    if (t.link && tier !== "no") {
      const a = document.createElement("a"); a.href = t.link[1]; a.textContent = t.link[0]; a.rel = "noopener"; a.target = "_blank";
      next.append(a, document.createTextNode(". Or "));
    }
    const c = document.createElement("a"); c.href = `contact.html?topic=${tier === "no" ? "donate" : "home"}`;
    c.textContent = tier === "no" ? "arrange a collection" : "book a check";
    next.append(c, document.createTextNode(tier === "no" ? " with three or more devices." : " and we'll confirm in person."));
    if (!t.link || tier === "no") next.firstChild.textContent = next.firstChild.textContent[0].toUpperCase() + next.firstChild.textContent.slice(1);
    out.append(next);
    out.hidden = false;
  }
  checker.addEventListener("change", render);
  modelInput.addEventListener("input", render);
}
