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

Needs Node 22.12 or newer (Astro 7's floor; `~/.local/bin/node` is v26 on this machine, CI uses 24).

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

`.github/workflows/pages.yml` builds every push and pull request, and deploys `main` to GitHub Pages. One-time setup on GitHub:

1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Pages → Custom domain: `amader.cloud`, then tick Enforce HTTPS. DNS: apex `A` records to GitHub's Pages IPs, `www` `CNAME` to `<owner>.github.io`. Links are relative except the favicon, so the site only works at a domain root, not at `<owner>.github.io/<repo>/`.
3. Settings → Secrets and variables → Actions → Variables: `CONTACT_ENDPOINT` (see below).

### Forms on a static host

The device checker, network model and earnings calculator run entirely in the browser; Pages serves them as-is. Only the contact form sends anything. It posts JSON to `PUBLIC_CONTACT_ENDPOINT` (set from the `CONTACT_ENDPOINT` repo variable at build time) and shows the reply inline. With no endpoint, or without JavaScript, it opens an email draft to `contact.email`.

The endpoint must accept a cross-origin JSON `POST` and return 2xx: a form service such as Formspree (`https://formspree.io/f/<id>`, works with the current script as-is), or a small Cloudflare Worker or Google Apps Script that forwards to email, a sheet or WhatsApp. It is a public URL, so it is a variable, not a secret. Changing it needs a rebuild: re-run the workflow.

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
- [ ] Contact form backend: set the `CONTACT_ENDPOINT` repo variable (see Forms on a static host). Without it, the form opens an email draft
- [ ] Legal entity name, address and trade licence are `entity` in `web/src/data/facts.json` (terms and privacy read it), as is the control-plane hosting location
- [ ] Lawyer review of terms, privacy and acceptable use. Remove the "draft" notes after review
- [ ] Native-speaker review of every Bengali line
- [ ] Deck placeholders: team, raise amount, Dhaka building count
- [ ] Check the BERC tariff table before quoting electricity costs
