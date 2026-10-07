# amader.cloud

Second jobs for old devices. This repo holds the product brief, the website (static HTML, no build step) and the marketing material.

| Path | What |
|---|---|
| `docs/product-brief.md` | Product definition: device × job model, customers, pricing hypotheses, architecture, unit economics, risks, roadmap, sources |
| `site/` | The website. Deploy this folder as-is to any static host |
| `partials/` + `tools/sync_chrome.py` | Shared header and footer. Edit a partial, then run `python3 tools/sync_chrome.py` |
| `marketing/` | Brand guide, copy deck, print and social sources, rendered outputs in `marketing/out/`, deck source in `marketing/deck/` |

## Preview

```bash
python3 -m http.server 8417 --directory site
```

## Render marketing files

```bash
npm i --prefix marketing && python3 marketing/render.py
```

## Before launch

- [ ] Real WhatsApp number: replace `+880 1XXX‑XXXXXX` in `site/contact.html` and `marketing/print/flyer-a5.html`
- [ ] Set up mailboxes: hello@, privacy@, security@, abuse@, invest@ amader.cloud
- [ ] Contact form backend: set `data-endpoint` on `#contact-form` in `site/contact.html`. Without it, the form opens an email draft
- [ ] Legal entity name, address and trade licence in `site/terms.html` and `site/privacy.html`, plus the control-plane hosting location in privacy §6
- [ ] Lawyer review of terms, privacy and acceptable use. Remove the "draft" notes after review
- [ ] Native-speaker review of every Bengali line
- [ ] Deck placeholders: team, raise amount, Dhaka building count
- [ ] Check the BERC tariff table before quoting electricity costs
