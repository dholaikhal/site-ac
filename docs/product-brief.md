# amader.cloud — product brief

Status: v0.2 draft, 2026-10-07. v0.1 treated the TV-box cloud as the whole company. v0.2 makes it one recipe in a general reuse platform. Every number marked *hypothesis* needs a pilot to confirm, and every sourced fact is listed in [Sources](#sources).

## One line

amader.cloud gives idle consumer devices a second job. We collect old TV boxes, phones, tablets, laptops, desktops and routers. We wipe them to a recorded standard, rebuild them on open software, and install them as managed infrastructure for Dhaka homes, buildings, shops and schools: a private cloud, cameras, Wi‑Fi, screens, learning labs. Whatever can't be reused goes to a formal recycler, with a receipt.

Bengali lines:
- **পুরনো যন্ত্র, নতুন কাজ** — "old devices, new jobs" (company line)
- **আমাদের ডেটা, আমাদের ঘরে** — "our data, in our homes" (cloud line)

## The model: devices × jobs, on one pipeline

The company is the **pipeline**, not any single device. Every device, whatever its type, goes through the same seven steps. A *recipe* is the device-specific part: which OS, which checks, which job.

```
 intake ─► triage ─► wipe ─► rebuild ─► install ─► manage ─► retire
 receipt   real specs  certificate  recipe    on site   one fleet   recycler receipt
           battery     per device   per job             updates,
           health                                       monitoring
                    └──────────── device passport (one record per device) ────────────┘
```

The **device passport** is the record each device carries through the pipeline: model, measured specs, wipe certificate, owner and site, current job, uptime, energy, and repairs. It is also the evidence for every sustainability number we publish.

### Which device can do which job

| Device ↓ / Job → | **Cloud** (files, photos, backups) | **Camera** (CCTV, doorbell) | **Wi‑Fi** (coverage, guest network) | **Screen** (notice board, menu, prayer times) | **Lab** (school machines, offline library) | **Compute share** |
|---|---|---|---|---|---|---|
| Android TV box | **Primary.** Armbian on supported Amlogic chips | Recorder for 1–2 cameras (4 GB boxes, *hypothesis*) | — | Yes, drives any TV over HDMI | Offline library server (Kiwix, Kolibri) | Weak (4 small ARM cores) |
| Android phone | — | **Primary.** Camera app streaming RTSP to a recorder | — | Small display | — | — |
| Tablet | — | Yes | — | **Primary** | Student device | — |
| Laptop | **Yes**, and the battery rides out load-shedding (with a charge limit, see Risks) | Recorder for several cameras | — | — | **Primary.** Linux lab machine | **Primary.** x86 cores have real value |
| Desktop PC | Building server, recorder | Recorder (NVR) | — | — | Yes | Yes |
| Wi‑Fi router | — | — | **Primary.** OpenWrt, on routers with ≥16 MB flash / 128 MB RAM | — | — | — |
| Old TV or monitor | — | — | — | Display, paired with a TV box | Lab screen | — |

What follows from the table:

- **Most homes and buildings already own a full kit.** A building of 30 flats probably has old phones for its stairwell cameras, a router for the rooftop, a TV box for its server and a tablet for the lobby notice board. *Hypothesis:* the 2-week device audit in the pilot will check this. So generality is the selling point: we can furnish a building's whole digital setup from its own drawers.
- **Compute sharing becomes plausible once laptops and desktops are in the pool.** A TV box's four ARM cores are worth almost nothing to a buyer. An i5 laptop's are worth something. Compute sharing stays Phase 3, but it now has a real supply.

## Why Dhaka, why now

| Fact | Why it matters | Source |
|---|---|---|
| Bangladesh produced 367 million kg of e‑waste in 2022 (2.2 kg per person) and formally recycles little of it. | Reuse before recycling is a real gap, not a slogan. | Global E‑waste Monitor 2024 via Dhaka Tribune |
| Cheap connected devices left on old firmware become botnets. Vo1d infected ~1.3 M Android TV boxes in 197 countries. The FBI warned BADBOX 2.0 had >1 M devices and sold home connections as residential proxies. | Leaving a device plugged in and unpatched is not harmless. Wiping it and putting it under management removes the risk. This argument covers routers and phones as well as TV boxes. | Doctor Web 2024; FBI PSA June 2025 |
| NIST SP 800‑88 Rev. 2 (Sept 2025) is the current reference for media sanitisation and recommends a certificate per device. | Companies can only release old laptops to us if we wipe to a standard they recognise. Certified wiping is what we sell to companies. | NIST CSRC; Blancco summary |
| BDIX: ~1,975 Gbps, 139 member networks (Feb 2026). | Device-to-device traffic between local ISPs can be fast. Unverified: does WireGuard between two homes route over BDIX? Test in the pilot. | Internet Society Pulse |
| Load-shedding is routine. Mini DC UPS for routers cost Tk 1,800–2,400 and run 7–15 h. | Low-power devices (TV boxes, phones, routers) share that UPS. Laptops bring their own battery. | Star Tech BD |
| Residential electricity: Tk 5.26–17.35/kWh by slab. | A 5 W device uses ~3.6 kWh/month, about Tk 20–65. Measure actual draw per device type in the pilot. | BERC reporting (check rate table before quoting) |
| Personal Data Protection Act 2026 is in force. | Consent-first data handling is required. This matters most for **Camera** jobs, which film people. | Securiti / DataGuidance |
| Kolibri (offline learning platform, has Bangla content) and Kiwix (offline Wikipedia and more) run on low-power hardware. | The Lab job doesn't need us to build content, only to deploy and maintain it. | Kolibri / Kiwix project pages |

## Customers

| Segment | Job to be done | Jobs we install | Who pays |
|---|---|---|---|
| **Ghor (ঘর)**: one home | "Back up the family's phones; stop the ads; use the stuff in the drawer." | Cloud, Wi‑Fi, Camera (doorbell) | Household |
| **Bari (বাড়ি)**: an apartment building's owners' association | "Stairwell cameras, Wi‑Fi on the roof and in the guard room, one place for notices and records, backups for every flat." | All of: Cloud (building server + flats), Camera, Wi‑Fi, Screen | Association fund + flats that opt in |
| **Dokan (দোকান)**: shop, clinic, small office | "Don't lose our files or CCTV if a PC dies or gets stolen; show our menu or prices on a screen." | Cloud (PC backups), Camera, Screen | Business |
| **Pathshala (পাঠশালা)**: school, madrasa, coaching centre | "A computer lab and a library that work without reliable internet." | Lab, Screen, Cloud | School, or sponsored by a company (below) |
| **Companies retiring devices** | "Get rid of 200 old laptops safely, with proof, and ideally with a CSR story." | Certified wipe + passport, then devices go to Pathshala labs | Company pays per device for wiping and reporting (*hypothesis* Tk 300–800/device), optionally sponsors a lab |
| **Hosts** | "Earn from a device and disk I already have running." | Compute share, community storage | We pay credits |
| **Donors** | "Get rid of this responsibly." | — | Free pickup at 3+ devices |

**Two engines.** Homes and buildings pay for *service*. Companies pay for *disposal* and supply the devices that schools receive. This is the conventional ITAD (IT asset disposition) business, with one difference: instead of reselling wiped devices, we deploy and maintain them in schools. ITAD firms only resell, and pure-refurb sellers don't manage devices afterward. Doing both is the defensible part.

## Beachhead (recommendation)

Start with **Bari (buildings) in one Dhaka neighbourhood**, and close **one corporate retirement deal** in parallel.

- A building shows the general offer best: one committee decision, many device types, many jobs, one visit.
- One company retirement supplies laptops for the first Pathshala lab. That gives us the impact story and a second revenue line without depending on household devices.
- Ghor (single homes) comes through building members, not as its own launch. Dokan and Pathshala follow once recipes are stable.

## The offer

### Recipes at launch (priority order)

| Recipe | Device | Software | Checks before install |
|---|---|---|---|
| Cloud node | TV box (Amlogic S9xxx), laptop, desktop | Armbian (ophub builds) / Debian; Docker Compose bundles | Real RAM/eMMC; USB disk SMART; 24 h burn-in |
| Camera | Android phone (Android 8+, *hypothesis*), tablet | Camera app streaming RTSP → recorder (Frigate on a 4 GB+ node, *to test*) | Battery health; no swelling; fixed mount; mains power with charge limiting |
| Wi‑Fi | Router with ≥16 MB flash / 128 MB RAM | OpenWrt | Model listed as supported in OpenWrt Table of Hardware |
| Screen | Tablet, TV box + old TV/monitor | Kiosk mode browser showing a page we host per site | Screen burn-in; mount |
| Lab | Laptop, desktop | Linux desktop for schools + Kolibri + Kiwix on a local server | Battery, keyboard, storage health; Bangla input works |

Each recipe also has an **eligibility list** published on the site, updated as we test. The website's "Check your device" tool reads from it.

### Plans (pilot pricing, all *hypothesis*)

| Plan | Includes | Setup | Monthly |
|---|---|---|---|
| **Ghor** | Up to 3 managed devices (any recipes); 200 GB encrypted copy on other members' nodes; WhatsApp support in Bangla | Tk 500–1,500 per device by recipe | Tk 299; Tk 79 per extra device |
| **Bari** | Building server (mirrored), cameras for common areas with 14-day retention, rooftop/guard-room Wi‑Fi, lobby screen; flats join at a discount; quarterly visit | From Tk 10,000 | From Tk 2,500 for the building + Tk 199 per flat |
| **Dokan** | Up to 5 devices; nightly backup for up to 3 Windows PCs; 500 GB off-site; 4 h business-day response | Tk 3,000 | Tk 990 |
| **Pathshala** | Lab of up to 20 machines + local library server; teacher training session; term-time visits | Quoted (often sponsored) | From Tk 1,500 per lab |
| **Retire** (companies) | Collection, NIST 800‑88-aligned wipe, certificate per device, impact report showing where each device went | Per device | — |
| **Host** (add-on) | Offer disk space (≥250 GB) and/or CPU time with ≥95% uptime | Free | Credit: Tk 50 per 250 GB-month during pilot; compute rate set in Phase 3 |

Payments: bKash, Nagad, bank transfer.

## Platform architecture (proposed)

Conventional tools first. Hand-rolling needs a reason that survives a check.

| Layer | Choice | Notes |
|---|---|---|
| Device OSes | Armbian (ophub builds for Amlogic S9xxx: S905/W/X/X2/X3/D/L3A, S912, S922X, A311D), Debian for x86, OpenWrt for routers, stock Android + camera/kiosk apps for phones and tablets (postmarketOS/LineageOS only where a device is supported) | Rockchip RK3318/RK3328 and Allwinner H6/H616 TV boxes are "testing" tier until a build is verified |
| Overlay network | WireGuard via self-hosted **Headscale** (NetBird as fallback) | Gets through CGNAT. Only member devices can join. No internet traffic is routed through members' connections. |
| Community storage | **Garage** S3 store (ARMv8, 1 GB RAM, 3-zone replication; a zone ≈ a building), clients write with restic/Kopia using client-side encryption | Needs ≥50 Mbps and <200 ms between nodes (test). 3× overhead, which the host credit rate is based on. |
| Fleet management | Ansible (pull mode) for Linux nodes; OpenWrt config via UCI templates; Android devices via a lightweight MDM *(to evaluate: Headwind MDM, open source)* | Staged rollouts: staff devices → 10% → all |
| Monitoring | node_exporter + SMART → VictoriaMetrics + Grafana; alerts via WhatsApp Business API | One dashboard per site for the building committee |
| Device passport | Small internal web app + database (Phase 0: a spreadsheet) | Builds on the same IDs as fleet management. Publishes aggregate counts to the website. |
| Wiping | NIST SP 800‑88 Rev. 2 / IEEE 2883 methods per media type: crypto-erase for encrypted phones, secure-erase for SSD/eMMC where supported, overwrite + verify for HDD | Two-person sign-off on certificates for corporate jobs |
| Compute share (Phase 3) | Start with BOINC (volunteer science) to measure reliability; paid batch jobs only after that | Sandboxed. Never runs on a device that also stores customer data. |

### Privacy model

- **Off-site copies**: encrypted on the customer's device with a passphrase only they hold. Hosts and amader store encrypted blocks only.
- **Managed devices**: technicians can log in to maintain them. Every session is logged, and we never open files without a written request. **Private mode**: the customer holds the only admin key, and we see health metrics only.
- **Cameras**: the recorder stays on site. Default retention 14 days. Signs at camera locations are required. Committee members get access by role. No cloud upload of footage unless the customer opts in.
- **Telemetry**: health only (temperature, disk health, free space, uptime, versions). No file names, no browsing data.

## Unit economics (all *hypothesis*)

**Bari, 30-flat building, 10 flats opt in, monthly:** revenue Tk 2,500 + 10 × 199 = Tk 4,490. Costs: quarterly visit amortised (≈ Tk 600), remote support (≈ 2 h = Tk 600), replica credits (≈ Tk 400), platform share (≈ Tk 300). **Contribution ≈ Tk 2,600/building/month.** Setup fee covers bench time and the install day.

**Ghor alone:** Tk 299 against ≈ Tk 225 of support, credits and platform cost, so ≈ Tk 74. This is thin, which is why homes come in through buildings.

**Retire (companies), per laptop:** fee Tk 500 vs wipe + test labour ≈ Tk 150 and logistics ≈ Tk 100. Then the device either goes to a sponsored Pathshala lab or is sold refurbished.

What to measure in the pilot: support minutes per device per month by recipe; 90-day failure rate by recipe; watts by device type; share of collected devices that pass triage; how many building committees buy after a demo; how many companies sign after a pitch.

## Sustainability claims policy

Count first, claim second. The website's counters start at zero and come from device passports:

- Devices given a second job (by type), devices sent to a formal recycler (with receipts).
- Measured energy per device type.

Never claim "carbon neutral" or emissions avoided until we have a method we can defend.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Swollen lithium batteries in always-on phones/laptops | High | Fire risk in someone's home | Battery health check at triage; reject swollen units; charge limiting (TLP on laptops, smart plugs or bypass for phones); remove batteries where possible |
| Camera job breaches privacy law or neighbour trust | Medium | Legal + reputational | Common areas only for Bari; signage; 14-day retention; written committee resolution before install |
| Device bricks during rebuild | Medium | Customer loses a cheap device | Written consent; Tk 1,000 credit or refurbished swap |
| Counterfeit specs (TV boxes) / dead flash (routers) | High | Can't run the recipe | Measure at triage; recipe chosen by measured specs |
| ISP terms or BTRC rules on servers / shared Wi‑Fi | Medium | Service blocked | Overlay only, no public inbound; the Wi‑Fi recipe extends a connection the customer already pays for, never resells one; get a written BTRC opinion |
| Wipe failure on a corporate device | Low | Serious: client data leak | Standard methods, verification step, two-person sign-off, insurance before first corporate deal |
| Too many recipes, too little depth | High | Quality suffers everywhere | Launch with 5 recipes; a new recipe ships only after 10 devices pass 30 days in the field |
| Legal compliance misread | Medium | Fines up to Tk 25–50 lakh (PDPA 2026) | Paid legal review before launch |

## Legal and compliance checklist

- [ ] Trade licence; TIN/BIN.
- [ ] Lawyer review of Terms, Privacy, Acceptable Use, host agreement, corporate wipe contract (PDPA 2026; Cyber Security Act 2026).
- [ ] Camera recipe: confirm rules on CCTV in residential common areas and notice requirements.
- [ ] Written BTRC opinion that the overlay network and Wi‑Fi recipe need no licence.
- [ ] E‑waste: formal recycler partnership, checked against current Bangladesh e‑waste rules.
- [ ] bKash and Nagad merchant accounts.

## Roadmap

| Phase | When | Scope | Exit criteria |
|---|---|---|---|
| 0. Bench | Oct–Nov 2026 | 5 recipes on ~40 donated devices; Headscale, Garage, monitoring; passport v0 | Each recipe: 10 devices pass a 7-day burn-in |
| 1. Pilot | Dec 2026–Feb 2027 | 2 buildings (Bari) + 1 corporate retirement → 1 school lab | ≥1 building paying by day 60; lab used weekly; support ≤20 min/device/month |
| 2. Launch | Mar–Jun 2027 | Bari, Ghor, Dokan public; Retire offer to 10 companies; host credits | 500 managed devices; positive contribution per building |
| 3. Expand | H2 2027 | Pathshala programme; compute share via BOINC; more recipes (e.g. sensors, kiosks); second city | Decide using pilot data |

## Open questions for the founder

1. Is there a building where the team knows the committee, and a company contact with devices to retire?
2. Who does field work at launch: founders, or a contracted technician?
3. Do we sell refurbished devices (inventory, warranty), or only rebuild and deploy?
4. Legal entity and registered address, for the legal pages.
5. Plan names: keep the Bengali names (Ghor/Bari/Dokan/Pathshala) as plan names, or use English with Bengali as decoration?

## Sources

- ophub/amlogic-s9xxx-armbian, supported SoCs and models, last push May 2026: <https://github.com/ophub/amlogic-s9xxx-armbian>
- Vo1d, 1.3 M TV boxes, 197 countries: <https://news.drweb.com/show/?i=14900>, <https://www.securityweek.com/1-3-million-android-tv-boxes-infected-by-vo1d-malware/>
- BADBOX 2.0, FBI PSA June 2025: <https://www.bleepingcomputer.com/news/security/fbi-badbox-20-android-malware-infects-millions-of-consumer-devices/>
- Bangladesh e‑waste 367 M kg (2022): <https://www.dhakatribune.com/business/351072/bangladesh-incurring-high-losses-due-to-inadequate>
- NIST SP 800‑88 Rev. 2 (Sept 2025): <https://csrc.nist.gov/pubs/sp/800/88/r2/final>, <https://blancco.com/resources/blog-nist-800-88-rev-2-updated-standard/>
- OpenWrt 8/64 warning and 16/128 recommendation: <https://openwrt.org/supported_devices/864_warning>
- Kolibri: <https://www.digitalpublicgoods.net/r/kolibri>; Kiwix: <https://en.wikipedia.org/wiki/Kiwix>
- Garage requirements and replication: <https://garagehq.deuxfleurs.fr/>
- BDIX: <https://pulse.internetsociety.org/en/ixp-tracker/ixp/697>
- X96 Max+ price: <https://www.startech.com.bd/x96-max-plus-android-smart-tv-box>
- Mini DC UPS: <https://www.startech.com.bd/wgp-8000mah-mini-ups-for-wifi-router>, <https://unb.com.bd/category/Tech/mini-dc-ups-for-wi-fi-router-buyers-guide-and-price-ranges-in-bangladesh/116204>
- Tariff slabs: search summaries of BERC reporting, June 2026. They conflict on before and after the 16.7% rise, so check the BERC order before quoting.
- Personal Data Protection Act 2026: <https://securiti.ai/bangladesh-personal-data-protection-act-overview/>, <https://www.dataguidance.com/opinion/bangladesh-unpacking-personal-data-protection-act>. Sources disagree on mandatory breach notification and the regulator's name, so our policy commits to 72-hour notice regardless.
- Cyber Security Act 2026: <https://thehonourable.org/same-cage-new-name-bangladeshs-cyber-laws-and-the-limits-of-online-speech/>
