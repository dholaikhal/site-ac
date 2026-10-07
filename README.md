# amader.cloud

Second jobs for old devices. This repo holds the product brief, the website (Astro, static output) and the marketing material.

| Path | What |
|---|---|
| `docs/product-brief.md` | Product definition: device × job model, customers, pricing hypotheses, architecture, unit economics, risks, roadmap, sources |
| `web/` | The website, an [Astro](https://astro.build) project that builds to plain static HTML in `web/dist/` |
| `web/src/data/facts.json` | **Every fact the site states:** prices, rates, plans, timeline, statistics with sources, contact details, legal entity. Pages and marketing (print, social, Facebook) read it; change it here, not in page text |
| `web/src/data/scenes.json` | Hero slideshow and page-head scenes: photo, crop, and every node's position and label |
| `web/src/pages/` | One file per page (same URLs as before: `devices.html`, `companies.html`…). Terms, privacy and acceptable use are Markdown (`.mdx`): edit the text directly |
| `web/src/components/` | Header, Footer, Scene/HeroScenes/SceneHead, Plans, Roadmap, EarnCalc, Photo |
| `web/src/assets/photos/` | Photo masters. The build makes AVIF/WebP/JPEG at several widths |
| `web/public/` | Files served as-is (favicon, OG image, robots.txt) |
| `marketing/` | Brand guide, copy deck, print and social sources, rendered outputs in `marketing/out/`, deck source in `marketing/deck/` |
| `marketing/facebook/` | Facebook page kit: setup, post calendar with copy, replies, and the image generator (`build.py`) |
| `tools/scenes.py` | Lets the Python marketing scripts read `scenes.json` |

Needs Node 20 or newer (`~/.local/bin/node` is v26 on this machine).

## Work on the site

```bash
npm install --prefix web
```

```bash
npm run dev --prefix web
```

Opens on http://localhost:4321 (the preview pane in Claude Code uses port 8417 via `.claude/launch.json`).

## Build and deploy

```bash
npm run build --prefix web
```

Deploy `web/dist/` to any static host. To build on every push instead, point Cloudflare Pages, Netlify or GitHub Pages at the repo with build command `npm run build --prefix web` and output directory `web/dist`.

## Render marketing files

```bash
npm i --prefix marketing && python3 marketing/render.py
```

```bash
python3 marketing/render.py facebook/cards facebook/contact-sheet.html
```

After re-rendering the OG image, copy `marketing/out/og.png` to `web/public/assets/img/og.jpg` (as JPEG).

## Before launch

- [ ] Real WhatsApp number: `contact.whatsapp` in `web/src/data/facts.json` (the site, flyer and Facebook kit all read it)
- [ ] Set up mailboxes: hello@, privacy@, security@, abuse@, invest@ amader.cloud
- [ ] Contact form backend: set `data-endpoint` on `#contact-form` in `web/src/pages/contact.astro`. Without it, the form opens an email draft
- [ ] Legal entity name, address and trade licence are `entity` in `web/src/data/facts.json` (terms and privacy read it), as is the control-plane hosting location
- [ ] Lawyer review of terms, privacy and acceptable use. Remove the "draft" notes after review
- [ ] Native-speaker review of every Bengali line
- [ ] Deck placeholders: team, raise amount, Dhaka building count
- [ ] Check the BERC tariff table before quoting electricity costs
