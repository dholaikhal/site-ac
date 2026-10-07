# Facebook page: setup and playbook

v0.1, 2026-10-07. Everything needed to create the amader.cloud Facebook page, fill it before anyone is invited, and run it until the pilot starts. Ready-to-post copy is in [posts.md](posts.md). Inbox and comment replies are in [replies.md](replies.md). The images are in `marketing/out/facebook/`; see [contact-sheet.jpg](../out/facebook/contact-sheet.jpg) for all of them at once.

Follows [brand.md](../brand.md) (voice, claims policy, visual system) and reuses lines from [copy-deck.md](../copy-deck.md).

## 1. What the page is for

The page's job between now and the pilot is to collect the four things the [roadmap](../../docs/product-brief.md#roadmap) needs, not followers for their own sake:

| Need (roadmap) | When it's needed | Page ask | Proposed target by 31 Jan 2027 |
|---|---|---|---|
| ~40 donated devices for the bench | Jan–Feb 2027 | "Lend us your drawer" (d03) | 60 pledged, 40 collected |
| 2 pilot buildings | Chosen by early February 2027 | "Nominate your building" (d02) | 15 nominations, 6 visits |
| 1 corporate retirement → 1 school lab | Pilot, Mar–May 2027 | "Retiring office laptops?" (d04) | 3 company conversations |
| Proof that people care, for investors | Continuous | Drawer census (d01) and safety posts | 300 census replies; message volume |

The targets are proposals. Change them before launch and track them weekly (§6).

**Ramadan.** 1 Ramadan 1448 is expected around 8–9 Feb 2027 and Eid al-Fitr around 10–11 Mar 2027 (moon sighting decides; [Wego](https://blog.wego.com/ramadan-2027/), [Bangla Date Today](https://www.bangladatetoday.com/blog/eid-ul-fitr-2027-date-bangladesh)). The roadmap's pilot starts in March, so installs would fall in Ramadan or the Eid holidays. This plan therefore chooses the pilot buildings before Ramadan and assumes installs start after Eid. **Decide this** (§8).

## 2. Page setup kit

Type these in as written. Fields marked *unverified* depend on what Facebook's form accepts on the day.

| Field | Value |
|---|---|
| Page name | `amader.cloud`. If rejected for looking like a web address, `amader cloud` (*unverified*) |
| Username | `amadercloud`. Facebook ignores periods when comparing usernames, so `amader.cloud` is the same name; usernames can't include domain extensions, so `.cloud` may be refused ([Uberall guide](https://uberall.helpjuice.com/guides/1737737-set-a-facebook-page-username)) |
| Categories (up to 3) | Information Technology Company; Community Service; Computer Repair Service. Pick the closest names the form offers (*unverified* exact labels) |
| Bio (101 characters max) | Second jobs for old devices: cameras, Wi‑Fi, photo clouds and school labs from Dhaka's drawers. *(95)* |
| Website | `https://amader.cloud/?utm_source=facebook&utm_medium=profile` |
| Email | hello@amader.cloud *(mailbox not set up yet, see repo README)* |
| Phone / WhatsApp | Leave empty until the real WhatsApp Business number exists. Then add it and link WhatsApp to the page |
| Location | Service area: Dhaka. No street address until the legal entity and office exist |
| Hours | "Always open" off. Leave hours empty; say "We reply within a day" in the instant reply instead |
| Action button | **Send message** (Messenger). Switch to **Send WhatsApp message** once the number is live |
| Profile picture | `fb-profile.png` (800×800, the mark centred inside the circle crop) |
| Cover photo | `fb-cover.jpg` (1640×624). Check against `fb-cover-guide.jpg`, never upload the guide |

**Details / About** (longer text):

> amader (আমাদের) means "ours".
>
> Every home in Dhaka has a drawer of old phones, TV boxes, laptops and routers that still work. We collect them, wipe your old data properly, and rebuild each one for one new job: a stairwell camera, Wi‑Fi on the roof, a family photo cloud, a lobby notice screen, a computer in a school lab. Then we look after them, with support in Bangla.
>
> Your data stays home. Copies kept elsewhere are locked with your key. Leave any time and keep everything.
>
> We're a small Dhaka team. Our pilot starts in 2027 with two apartment buildings, and we're choosing them now.
>
> Website: amader.cloud · Privacy: amader.cloud/privacy.html

**Messenger** (Meta Business Suite → Inbox → Automations):

| Automation | Text |
|---|---|
| Instant reply | Hi, thanks for writing to amader.cloud. A person (not a bot) will reply within a day. If it's about your building, tell us your area and roughly how many flats. |
| Away message | We're away right now and will reply in the morning. |
| Frequently asked questions (*unverified* how many the form allows; four is safe) | "Can my building join the pilot?" · "I want to donate an old device" · "Is my old TV box safe?" · "How much does it cost?" Answers: [replies.md](replies.md) §1 |

**Settings**

- Two admins minimum, both with two-factor authentication. No shared passwords.
- Moderation: turn on the profanity filter (medium). Block these words in comments: `IPTV`, `unlimited channels`, `crack`, `jailbreak`, `bitcoin`, `investment plan`, `job offer`. Review the hidden list weekly: real questions get caught too. Hidden comments stay visible to the writer and their friends, so this is quiet.
- Turn off "Others can post on Page" until there's someone to moderate daily. Leave reviews on.
- Turn on Messenger and keep "response time" visible only once the team really replies within a day.

## 3. Media packet

All images are generated. Edit the data in [build.py](build.py), never the HTML in `cards/`:

```bash
python3 marketing/facebook/build.py
```

```bash
python3 marketing/render.py facebook/cards facebook/contact-sheet.html
```

| Group | Files (`marketing/out/facebook/`) | Size | Use |
|---|---|---|---|
| Identity | `fb-profile`, `fb-cover`, `fb-cover-guide` | 800×800, 1640×624 | Profile and cover. The guide marks the area mobile keeps and where the profile picture overlaps |
| Events | `fb-event-drawer-day`, `fb-event-live-qa` | 1920×1005 | Event covers. Text sits in the top two-thirds, where the event title bar doesn't cover it |
| Recipes (series A) | `r01`…`r10` | 1080×1350 | One device, one job each. Phone ×3, desktop ×2, TV box, laptop, tablet, router, monitors; home, building, shop, school, para |
| Safer than the drawer (B) | `b01-vo1d`, `b02-badbox`, `b03-checklist-tvbox`, `b04-checklist-passon`, `b05-ewaste` | 1080×1350 | Sourced facts and checklists people save and share |
| Stronger together (C) | `c01`…`c07` | 1080×1350 | The site's seven photo scenes, each with its amber mesh and credit |
| Take part (D) | `d01-drawer`, `d02-nominate`, `d03-donate`, `d04-companies` | 1080×1350 | The four asks in §1 |
| Stories and reels | `s01-reel-drawer`, `s02-story-nominate`, `s03-story-tvbox` | 1080×1920 | Reel cover and stories. Text stays out of the top 250 px and bottom 340 px, where Facebook's buttons sit |

Sizes follow third-party 2026 guides, since Meta's help pages don't publish one table: cover shown at 820×312 on desktop and 640×360 on mobile; profile picture shown at 176–196 px in a circle; feed posts best at 4:5 (1080×1350); event covers 1920×1005 ([ContentStudio](https://contentstudio.io/blog/facebook-cover-photo-size), [Linearity](https://www.linearity.io/templates/facebook-size-guide), [postfa.st](https://postfa.st/sizes/facebook/cover)). After uploading, check the cover on a phone and a laptop. If Facebook crops differently, move `.cover .txt` in [fb.css](fb.css).

**Still to make (needs real material):**

- Founder photo for the "who we are" post (P08). A real face does more for trust than any card here.
- The 30-second drawer reel (script: copy deck §4). `s01-reel-drawer` is its cover.
- Bench diary photos, Jan–Feb 2027: real devices on the bench, the wipe screen, a device passport. Shoot on a phone in daylight, no faces without consent.
- Census results cards (P12, P34): built from the replies. Add a `kind="fact"` entry to `build.py` with the real counts.

## 4. Content system

**Mix per fortnight (about 6–7 posts):** 2 recipes, 1 safety post, 1–2 community scenes, 1 ask, 1 behind-the-scenes or reply-to-comments post. Every ask is followed by at least two posts that give something.

**Cadence:** 3 feed posts a week (Sun, Tue, Thu) plus 1–2 stories. The best hour is unknown: start at 20:30–22:00 Dhaka time, then use Insights after four weeks (*hypothesis*: late evening, after work and dinner, is when building committees read Facebook).

**Rules**

1. **Claims policy holds.** Only the facts in brand.md, with their source on the card or in the post. No wattage, no CO₂, prices only as "pilot prices".
2. **Generalise.** No two posts in a row about the same device class or the same place. Check the balance over each fortnight (recipe series above is already balanced).
3. **Ask real questions, not for clicks.** Meta demotes posts that ask for reactions, specific comments ("comment YES"), tags or shares ([Search Engine Journal](https://searchenginejournal.com/facebook-demoting-engagement-bait/228071)). Never write "like if", "tag a friend", "type 1 for". Asking for information or advice is allowed: "What's in your drawer, and which area are you in?"
4. **Bengali.** Every Bengali line goes through a native speaker before posting. New lines this packet introduces: আপনার ড্রয়ারে কী আছে? (d01). The plan is English-first with Bengali touches, as the site is. See §8 on going Bangla-first.
5. **People and places.** No identifiable people, flat numbers or building names without written consent. Never post a camera's live view or a screenshot of anyone's files.
6. **Security questions get a straight answer within a day**, in public where possible ([replies.md](replies.md) §2). Being the people who answer them is the brand.
7. **Credit photos** in the image (cards already do: small and quiet, never competing with the headline) and in the post if it's cropped out.
8. **Bangladesh-standard and secular.** Bangla as written in Bangladesh (Bangla Academy, Dhaka spelling) and Bangladeshi English usage: Bangla not Bengali, Tk, flat, lift, current, load-shedding, para, bhangari, bKash/Nagad. Nothing West Bengal–coded. No religious greetings, phrases or festival posts from the page (no "Assalamu alaikum", "Nomoshkar", "Ramadan Mubarak", "Shubho …"). Open with "Hi" or the person's name. The native reviewer checks both, including পুরনো vs the Bangla Academy spelling পুরোনো, and ডেটা vs ডাটা.

## 5. Getting the first people in

In order. Don't invite anyone until the six seed posts are up (P01–P06), so the page looks lived-in.

1. **Team and friends (launch day, Sun 18 Oct).** Each team member invites their own Facebook friends in Dhaka and shares the launch post with a personal line: why they're doing this. Personal shares reach further than page posts (*hypothesis*: true for most new pages).
2. **Building and area groups (from 20 Oct).** Use copy deck §2. Read each group's rules first; ask the admin when promotion isn't allowed. One post per group, never the same day in neighbouring areas, always answer every comment. Keep a list: group, date, admin OK, replies, messages.
3. **The drawer census (from 18 Oct).** The low-effort entry point. Every reply is a lead with an area. Reply to every one with what their devices could become.
4. **Live Q&A (Sat 7 Nov) and drawer day (Sat 5 Dec).** Facebook events give the page a reason to notify people. Drawer day needs a venue (a building's community room, a school or a para club), and a host: ask the first building that nominates itself.
5. **Partners.** Ask building committees, para clubs, coaching centres and mobile repair shops to share d02 and d03. Repair shops are natural allies: devices they can't sell are devices we can use.
6. **Paid (from mid-Nov, small).** Boost only posts that already did well organically. Start with d02 (nominate) to Dhaka, ages 25–60, interests in apartment living / home improvement. Budget `[Tk ___ / week]`. Ads use copy deck §5 variants. Click-to-Messenger objective, so every result is a conversation.

## 6. Weekly numbers

One row per week in a shared sheet. Decide at four weeks; don't react to single days.

| Number | From | Why it matters |
|---|---|---|
| Nominations (buildings) | Messenger + contact form, topic "My building" | The pilot |
| Devices pledged / collected | Messenger, drawer day | The bench |
| Census replies, with area | Comments on d01 and stories | Demand map; future buildings |
| Conversations started | Business Suite → Inbox | Better signal than likes |
| Saves and shares per post | Insights | Which pillar people value |
| Reach, follows | Insights | Context only |
| Site visits from Facebook | Site analytics, `utm_source=facebook` | Whether the page sends people on |

**Decision rules (proposed):** a pillar whose posts get no saves or shares over four weeks gets half the slots. A post that gets twice the median shares gets a boost and a sequel.

**Links:** use `https://amader.cloud/?utm_source=facebook&utm_medium=organic&utm_campaign=<phase>&utm_content=<post id>` on the website button and in link comments, with `<phase>` one of `seed`, `launch`, `drawer`, `pilot`. Keep visible links in posts short: `amader.cloud`.

## 7. Launch checklist

| When | Task | Owner |
|---|---|---|
| By Sun 11 Oct | Create the page with §2. Two admins, 2FA on. Messenger automations on | |
| By Sun 11 Oct | Native speaker reviews every Bengali line in posts.md and the cards | |
| By Sun 11 Oct | hello@ mailbox working (the page lists it) | |
| Mon 12 – Sat 17 Oct | Publish seed posts P01–P06; pin P01 | |
| By Sat 17 Oct | List 15 building and area groups with their promotion rules | |
| Sun 18 Oct | Launch: invite wave and personal shares (P07) | |
| By Sun 1 Nov | Pilot nomination route works end to end: Messenger → sheet → reply within a day | |
| By Sun 15 Nov | Donation logistics: where devices are dropped, how they're logged, who issues wipe records | |
| By Thu 19 Nov | Drawer day venue and date confirmed (P22) | |
| By Thu 3 Dec | WhatsApp Business number live; switch the page button | |
| Sun 31 Jan 2027 | Nominations close | |
| Before ≈ 8 Feb 2027 | Announce the two pilot buildings | |

## 8. Decisions for the founder

1. **Pilot timing and Ramadan.** Choose buildings before Ramadan (≈ 8 Feb) and install after Eid (≈ mid-March), as this plan assumes? Or install in early Feb and pause? The roadmap says Mar–May.
2. **Bangla-first?** Building committees in Dhaka may engage more with posts written in Bangla first. That needs a native writer, not translation. This plan is English-first like the site.
3. **Donors' wipe record.** Cards d03 and r10 promise donors a wipe record and say which job their device got. Confirm the bench can produce that in Phase 0 (the passport is a spreadsheet then).
4. **Free device check.** The TV box checklist (b03) and drawer day offer a free check. Confirm capacity, or limit it to drawer day.
5. **Paid budget** for §5.6, and whether to run ads before the pilot at all.
6. **Who answers the inbox**, and the hours. "A person will reply within a day" is a promise.
