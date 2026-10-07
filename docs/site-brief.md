# Site brief: Amader Cloud (AI app builder for local business)

A one-shot website for the product in [product-brief.md](product-brief.md). It should read as an AI-first platform company to investors, and as "my own shop, live today" to business owners.

## Name and lines

- Brand: **Amader Cloud**, at amader.cloud. Every app built lives at `name.amader.cloud`. Never use the internal codename "banao" on the site.
- Hero line options:
  - "Say what your business needs. It's live by tonight."
  - "Your shop, your bookings, your fees: built by AI, paid by bKash."
  - "Describe it. We build it. You get paid."

## Audiences and pages

| Page | For | Must show |
|---|---|---|
| Home | Business owners first, investors second | Prompt → live app, in one visual; payments, courier and SMS included; pilot pricing; call to start building |
| Templates | Owners | Shop, bookings, fee collection: what each does out of the box |
| How it works | Owners and agencies | Describe → build → preview → change by asking → publish → get paid; what we run for you |
| Pricing | Owners and agencies | Pilot plans in taka with USD equivalents, marked as pilot pricing |
| Trust and safety | Everyone | We never hold your money; app review against scams; data and backups |
| Investors | Investors | Problem with sourced numbers, where the AI is, unit economics marked as hypotheses, moat, expansion to other mobile-money markets, roadmap, kill criteria |
| Contact | Both | Beta sign-up, agency enquiry and investor contact |

## The demo (AI-first, interactive)

A split screen. On the left is a chat where the visitor picks or types a request ("a shop for handmade bags with bKash and delivery"). On the right a phone-frame preview assembles step by step: plan, pages, checkout with payment options, order SMS. A second message ("add 10% off for bKash") updates the preview.

It is scripted in the browser, so it needs no API key, and it is labelled as a demonstration. Show payment-brand names as plain text only, never their logos, until we have permission.

## Content rules

- English only, no Bangla script on the pages. Use plain secular language. Example businesses are generic and fictional.
- Every number comes from one data file (for example `src/data/facts.json`) with its source. No invented statistics, customer counts, testimonials or showcase apps presented as real.
- Label pricing "pilot pricing". Label unit economics "hypothesis".
- Use placeholders for unknown contact details and the legal entity.

## Design

Choose one direction and commit to it:
1. **Carry over the main branch's look**: photographic shop-front and street scenes with blueprint-style overlays, where the overlay is the app being drawn onto the scene. See `git show main:marketing/brand.md` and `main:web/src/components/`. Bring in only the patterns; no device-reuse copy, photos or data.
2. **A product-led direction**: bright and fast, with the builder UI and phone previews as the hero, in the style of modern developer tools.

The owner prefers photographic, interactive and blueprint-like over flat or cartoon illustration. Pages must work at phone width with no horizontal scroll and support dark and light themes.

## Build and serve

A static site is enough. Astro is used on main and is a good default. Serve locally on **port 8425**, and add a `.claude/launch.json` entry with that port when the site exists.
