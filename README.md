# amader.cloud: AI app builder for local business (branch `idea/banao`)

One of five AI-first directions for amader.cloud, each on its own branch. On this branch the product is **Amader Cloud**: describe a business app in Bangla or English and AI builds it. It is hosted at `name.amader.cloud`, with bKash, Nagad and card payments, couriers and SMS wired in. "banao" is an internal codename only.

| Path | What |
|---|---|
| [`docs/product-brief.md`](docs/product-brief.md) | Minimum-viable plan: problem, product, where the AI is, customers, 12-week MVP, pricing and unit economics (hypotheses), moat, risks, roadmap, kill criteria, sources |
| [`docs/site-brief.md`](docs/site-brief.md) | Brief for the website: pages, interactive demo, content rules, design options, port |

None of the original device-reuse project's content is on this branch. For design reference only, the earlier site and brand guide are still on `main` (`git show main:marketing/brand.md`, `main:web/`).

The site is served locally on port **8425** once it exists.

## Before the mock details go live

Pushing `idea/banao` deploys https://amader.cloud. These are placeholders on the site today:

- [ ] `company` in `web/src/data/facts.json` is `"mock": true`: legal name, Banani address, WhatsApp (not shown on any page), social profiles, RJSC number, trade licence, BIN. Replace them and set `mock` to false (social links only become links then; the phone is already real and a link).
- [ ] The "Come by" map on the About page is drawn around the mock Banani address: redraw it for the real office with `python3 tools/static_map.py LAT LON web/src/assets/maps/office.svg`.
- [ ] The example apps (`web/examples/`, on `<slug>.amader.cloud`) are hand-built samples of what the agent builds: once it can, rebuild them with the agent from the request each one shows.
- [ ] Customer logos and owner stories (`web/src/data/proof.ts`) are invented placeholders for agreeing the design, shown only in the dev preview. Replace them with real businesses that agreed to be shown (logos, approved quotes), then set `live = true` to publish.
- [ ] `funding` in the same file is mock.
- [ ] Privacy policy and terms (`web/src/pages/privacy.mdx`, `terms.mdx`) are drafts for lawyer review, written against the Personal Data Protection Act, 2026 (from a law firm's summary; check the gazetted text). The refund rule in the terms (first month back if the first app isn't live in 7 days) and the 7-day grace on failed payments are proposals.
- [ ] Native-speaker check of the Bangla written in English letters in the demo (`web/src/scripts/demo.js`: `bn` prompts and replies).
- [ ] Brand logos (bKash, Nagad, cards, banks, couriers, `web/public/assets/logos/`, listed in `web/src/data/brands.json`) are used without agreements: clear each brand's logo use, or switch back to names, before pushing. The connectors still say which are not yet integrated.
