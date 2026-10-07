# amader.cloud — brand guide

v0.2, 2026-10-07. Covers the redesign: real Dhaka photography, blueprint line-work, and sodium-amber connections.

## Positioning

**For customers:** your old phones, TV boxes, laptops and routers still work. We give them a second job, as your family's private cloud, your building's cameras and Wi‑Fi, or a school's computer lab, and we look after them.

**For investors:** reuse today ends at one transaction. We *operate* reused devices as a service and get paid at both ends. Companies pay to retire devices. Homes, buildings, shops and schools pay monthly to run them. We start with Dhaka's apartment buildings.

**The name:** *amader* (আমাদের) means "ours". The devices, the data and the network belong to the members.

**One idea:** idle devices still have value, and we get it back out, for people and for companies: give it a job, or rent out what it isn't using.

## Lines

| Use | English | Bengali | Meaning |
|---|---|---|---|
| Company line | Second jobs for old devices. | পুরনো যন্ত্র, নতুন কাজ | "Old devices, new work" |
| Data promise | Your data stays home. | আমাদের ডেটা, আমাদের ঘরে | "Our data, in our homes" |
| Earn | Rent out what your devices aren't using. | আমাদের মেঘ, আমাদের হাতে | "Our cloud, in our hands" |
| Hero headline | Dhaka's next data centre is sitting in its drawers. | — | — |
| Investor headline | Reuse that pays every month. | — | — |

A native speaker should review the Bengali lines before anything is printed. *Unverified:* that ডেটা is the spelling the audience expects (ডাটা is also common).

## Messaging pillars

| Pillar | Customer version | Investor version | Proof we can show |
|---|---|---|---|
| It already exists | The hardware is in your drawer, already paid for. | Hardware close to free: supply is donated or paid for by the company retiring it. | Device passports (from the pilot) |
| It's safer than the drawer | Old devices left plugged in get hijacked. We wipe and update them. | Security and data-protection rules (PDPA 2026) turn proper wiping into a purchase decision. | FBI BADBOX 2.0 PSA (June 2025); Vo1d (Doctor Web, 2024) |
| It's ours | Your files stay home. Copies elsewhere are locked with your key. Leave any time and keep everything. | Network effect: every member adds storage and backup locations. | Privacy policy; architecture in the product brief |
| It's looked after | Bangla support on WhatsApp; we message you before things fail. | Recurring revenue per installed device. | Pilot support minutes per device (to measure) |

## Voice

- Plain and specific. Name the device and the job: "old phone → stairwell camera", not "repurposed endpoints".
- Confident about what we've checked. Explicit about what's a pilot hypothesis.
- No eco-guilt and no tech-bro. Speak like a neighbour who fixes things.
- Sentence case everywhere. No exclamation marks.
- Bangladesh-standard and secular: Bangla as written in Bangladesh, Bangladeshi English usage, nothing West Bengal–coded. No religious greetings, phrases or festival posts; open with "Hi" or a name. Mosques, madrasas, temples and churches can appear as everyday places or customers, like any other fixture of Dhaka.

## Claims policy

Only use the facts below, with their source, in public material. Anything else needs a source first.

| Claim | Source |
|---|---|
| Bangladesh produced 367M kg of e‑waste in 2022 (2.2 kg per person) | Global E‑waste Monitor 2024 |
| Vo1d infected ~1.3M Android TV boxes in 197 countries | Doctor Web, Sept 2024 |
| BADBOX 2.0 infected 1M+ home devices and sold them as residential proxies | FBI PSA, June 2025 |
| Refurbished electronics US$94–103B (2024–25); IT asset disposition US$17–21B (2025) | Research firm estimates (they vary by firm, so always give a range) |
| Bangladesh 170M people; Dhaka city 10.3M | Census 2022 |
| BDIX ~1,975 Gbps, 139 networks (Feb 2026) | Internet Society Pulse |

Never claim "carbon neutral", "CO₂ saved", or measured wattage until we've metered pilot devices. Prices are always "pilot prices".

## Visual system

**Three layers, each with one job:**

1. **Photograph: the real city.** Dhaka rooftops, façades and skylines. Dusk or overcast, never postcard-sunny. Always credited in place: photographer name, plus "Unsplash" where it applies.
2. **Blueprint: how it works.** Chalk line drawings of devices on Prussian-blue grid paper, with dimension lines and mono annotations. It explains; it never decorates.
3. **Amber: something alive.** Amber is used only for connections, active devices, and the primary button. Don't use it as a general accent.

**Palette**

| Token | Hex | Use |
|---|---|---|
| night | `#0a1622` | Photo grading, header, footer |
| blueprint | `#0f3352` | Blueprint sections, page heads, panels |
| blueprint line | `#8fb8dc` | Grid and secondary line-work |
| chalk | `#e4edf5` | Text and primary lines on dark |
| amber | `#ffb547` | Connections, live nodes, primary button |
| amber ink | `#8a5a00` | Amber as text on light (passes AA) |
| tracing paper | `#eef1f3` | Light sections |
| ink | `#0e1b2a` | Text on light |

**Type**

- **Archivo** (variable width): headlines at width 112–118%, weight 500–560, tight tracking. Body at 100%.
- **Tiro Bangla**: every Bengali line. Its hand-made feel against the engineered Latin face is deliberate.
- **JetBrains Mono**: blueprint annotations, sources, photo credits and small labels only. Lowercase, never letter-spaced capitals.

**Logo:** a TV box with a lit LED and two signal arcs, then the wordmark "amader" with ".cloud" at reduced opacity. Files: `site/assets/img/logo-mark.svg`, `favicon.svg`.

**Don't:** use stock photos of foreign cities, glowing "cyber" globes, green-leaf eco icons, more than one amber accent per view, or photos of identifiable people without a release.

## Assets

| Asset | File |
|---|---|
| Photos (Unsplash and Pexels licences) | `site/assets/img/photos/`. Unsplash: rooftops (Ahmed Hasan), façades (Ahmed Reyasat), skyline (Al Amin Mir), sunset (Hasnan Monir). Pexels: street at night (MD Shaha Riaz Rimon), bazar and mosque (Ferdous Hasan), tea stall (Ahnaf Abror), monsoon lane (Faisal Ibne Kalam), Uttara towers (Robiul Islam Pailot) |
| A5 building flyer | `marketing/out/flyer-a5.pdf` |
| A4 investor one-pager | `marketing/out/one-pager-a4.pdf` |
| Social cards 1080×1080 | `marketing/out/card-*.png`: together (rooftops), backups held by neighbours (Uttara towers), screens instead of posters (blueprint), botnet warning |
| Open Graph image | `site/assets/img/og.jpg` |
| Investor deck | claude.ai artifact; source in `marketing/deck/` |
| Facebook page kit | `marketing/facebook/`: setup and playbook, dated posts, reply bank, and 34 generated images in `marketing/out/facebook/` |
| Render pipeline | `python3 marketing/render.py` (run `npm i --prefix marketing` first) |
