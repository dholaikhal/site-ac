# Amader Cloud: product brief

Status: v0.1 draft, 2026-10-07. This is a minimum-viable plan for one of five AI-first directions for amader.cloud, with internal codename "banao" (make). The codename never appears in public material; the product is called **Amader Cloud**. Numbers marked *hypothesis* need a pilot to confirm. Every sourced fact is listed in [Sources](#sources).

## One line

Describe the app your business needs, in Bangla or English, and Amader Cloud builds it. It runs at `yourname.amader.cloud` with bKash, Nagad and card payments, courier booking and SMS already wired in. AI builds it, you change it by asking, and we keep it running.

## The problem

- **Bangladeshi commerce runs in Facebook inboxes.** The e-commerce association estimates 2–2.5 lakh Facebook pages are run by sellers, and about 60,000 of them make consistent revenue. Most have no website or app of their own: orders are taken by message, tracked by hand and paid on delivery.
- **Cash on delivery is expensive.** It is still 80–90% of e-commerce transactions. Sellers report 20–30% of cash-on-delivery orders coming back undelivered, against near zero for orders prepaid by bKash (vendor-reported figures).
- **Online payments are underused.** SSLCommerz, the largest payment aggregator, powers about 17,000 businesses. That is a fraction of the active sellers above (an inference from two different sources).
- **Building software is slow and costly.** Agencies and freelancers charge per project, take weeks, and leave the owner unable to change anything.
- **Global AI app builders don't fit.** They are priced in dollars, run into card limits ($300 per transaction, allowed purposes only), and don't know bKash, Nagad, local couriers, SMS gateways, Bangladeshi addresses or VAT invoices.

## The product

1. **Describe it.** "A shop for my handmade bags with bKash payment, Pathao delivery and an SMS when the order ships." Typed or spoken, in Bangla, Banglish or English.
2. **AI builds it.** Coding agents assemble the app from a tested component library and the local connectors, generate the data model and pages, run tests, and show a live preview.
3. **Change it by asking.** "Add a 10% discount for bKash payments." "Make the menu green." Every change is previewed, tested and can be rolled back.
4. **Go live.** One click publishes to `yourname.amader.cloud`, or to the owner's own domain. Hosting, database, backups and security updates are ours to run.
5. **Get paid.** Payments go to the merchant's own accounts through a licensed payment partner. Amader Cloud helps with the gateway paperwork but never holds merchants' money.

**Launch templates** (*hypothesis*, discovery picks the final three):
- shop with courier booking
- bookings with a deposit (clinic, salon, tutor, coaching centre)
- fee and membership collection (school, club, association)

Later: event tickets, restaurant menu and orders, freelancer portfolio.

**Local connectors:**
- payments through an aggregator or the merchant's bKash and Nagad gateways
- couriers (partners to confirm)
- SMS gateway
- export to Google Sheets
- Facebook catalogue sync
- VAT invoices (format to confirm)

### Where the AI is

| Job | Model (Anthropic API) | Why |
|---|---|---|
| First build: plan, data model, pages, wiring connectors, tests | Claude Opus 5.5 | Multi-file generation with judgement; reliability matters most here |
| Edits and small features | Claude Sonnet 5.5 | Fast, cheap, good enough on a constrained stack |
| Review of every published app for phishing, impersonation and prohibited goods | Claude Haiku 4.5, plus rules | Safety on shared hosting |
| Support agent for owners | Claude Sonnet 5.5 | "Why didn't my bKash payment show?" answered from the app's own logs |

The agents generate code on **one fixed stack** (a TypeScript web app with a managed database) and assemble pre-built connectors rather than writing payment code from scratch. Constraining what they build is how generation stays reliable.

## Why now

- AI app builders are the fastest-growing software category: Lovable is valued at $13.3B, with about $600M in annual revenue less than two years after launch.
- Generated code is now good enough for small business apps when built on a tested component library.
- Local payment rails have developer APIs (bKash has a developer portal; aggregators cover all methods), but merchants can't use them without a developer.

## Customers

| Segment | Who | Why they pay |
|---|---|---|
| **Beachhead: Facebook sellers with steady revenue** | The ~60,000 pages with consistent revenue | Their own shop, prepaid orders, fewer returns, less manual order-taking |
| **Service businesses** | Clinics, salons, tutors, coaching centres | Bookings, deposits, reminders |
| **Institutions** | Schools, clubs, associations | Fee and membership collection with receipts |
| **Agencies and freelancers (channel)** | Developers who build for clients | Deliver client apps in a day; agency plan |

## MVP scope (12 weeks)

**In:** three templates, payment connector (sandbox first, then live through one aggregator), one courier, SMS, chat builder with preview and rollback, subdomain hosting, review of published apps, billing by bKash.

**Out:** native mobile apps, a template marketplace, custom domains (after the MVP), multiple stacks.

| Weeks | Work | Output |
|---|---|---|
| 0–3 | Interview 30 sellers and 10 service businesses; build the component library and connectors in sandbox | Three templates working end to end with test payments |
| 3–8 | Chat builder on top of the templates; preview, tests, rollback; app review | Closed beta: 30 businesses build and go live |
| 8–12 | Open beta with paid plans | 100 live businesses; measured go-live rate, orders, prepaid share, retention |

## Pricing (pilot, all *hypothesis*)

| Plan | Price | Includes |
|---|---|---|
| Free | Tk 0 | Build and preview one app; watermark; 5 edits; no live payments |
| Starter | Tk 799/month (≈ $6.5) | 1 live app, subdomain, payments, 10 AI edits a month |
| Business | Tk 1,999/month (≈ $16.3) | 3 apps, custom domain, 30 edits, 200 SMS |
| Agency | Tk 4,999/month (≈ $40.6) | 10 client apps, 80 edits |

Extra edits are Tk 50 each. A payment-volume revenue share with the payment partner is a later option (*hypothesis*).

## Unit economics (all *hypothesis*)

| Item | Tokens | Cost |
|---|---|---|
| First build (Opus 5.5) | 1.2M cached + 300k fresh input, 100k output | $0.24 + $1.20 + $2.00 = **$3.44** |
| First build on the free tier (Sonnet 5.5) | same | $0.24 + $0.60 + $1.00 = **$1.84** |
| One edit (Sonnet 5.5) | 100k cached + 20k fresh input, 15k output | $0.02 + $0.04 + $0.15 = **$0.21** |
| Hosting per small app | | **~$0.50/month** |
| SMS | Tk 0.30 each (to confirm) | ~$0.0024 each |

| Plan | Revenue | Cost at full use | Gross margin |
|---|---|---|---|
| Free signup (one-off) | $0 | $1.84 + 5 × $0.21 = $2.89 | Acquisition cost |
| Starter | $6.50 | 10 × $0.21 + $0.50 = $2.60 | 60% |
| Business | $16.25 | 30 × $0.21 + $1.50 + $0.49 = $8.29 | 49% |
| Agency | $40.64 | 80 × $0.21 + $5.00 = $21.80 | 46% |

The paid first build (about $3.44) is recovered within the first one or two months of a Starter plan. Most owners won't use all their edits, so blended margin should beat these full-use figures. The pilot measures it.

## Moat

- **Local connectors and templates** tuned on real Bangladeshi businesses: payments, couriers, SMS, invoices, addresses.
- **Hosted apps are sticky.** Once orders, customers and payments live on `amader.cloud`, owners stay.
- **Relationships with payment partners** and, later, revenue share on payment volume.
- **Every build and fix** becomes evaluation data that makes the agents more reliable on this stack.

## Why AI investors care

- It's the fastest-growing AI category (Lovable: about $600M in annual revenue, $13.3B valuation) applied to a market the global players don't serve: local payment rails, local language, local prices.
- Revenue grows with businesses' success: subscriptions now, payment volume later.
- The same playbook transfers to other mobile-money markets (M-Pesa, UPI, GCash) once the connector model is proven.

## Competition

| Who | What | Our difference |
|---|---|---|
| Global AI app builders | Excellent generation, USD pricing, no local rails | Local payments, couriers, SMS, taka pricing, Bangla |
| Facebook and Instagram shops | Where buyers already are | We complement with prepaid checkout and order management; links from posts |
| Local website builders and agencies (unverified list) | Templates or custom projects | Built by asking, changed by asking, live the same day; agencies become a channel |

## Risks

| Risk | Mitigation |
|---|---|
| Phishing or scam sites on our subdomains (for example fake bank or mobile-money pages) | AI and rule-based review before publishing and continuously; no use of payment brands in app names; takedown in hours; a verified-business badge |
| Payment licensing | We never hold funds; merchants use their own gateway accounts through a licensed partner |
| Generated code breaks a live shop | Fixed stack, tests on every change, preview before publish, one-click rollback |
| Build costs exceed plan price | Template-first generation, Sonnet for edits, credit limits |
| Global builders add local payments | Speed, depth of connectors, local support and distribution through agencies |
| Customer data on hosted apps | PDPO-compliant processing terms for merchants; backups; option to host in Bangladesh later |

## Legal and compliance checklist

- [ ] Payment aggregator partnership agreement; merchant onboarding flow
- [ ] Acceptable-use policy (no impersonation, prohibited goods, scams), lawyer-reviewed
- [ ] Personal Data Protection Ordinance 2025: we process data for merchants; data-processing terms; cross-border transfer basis for AI calls and hosting
- [ ] Trademark rules for payment-brand logos on checkout pages
- [ ] Company registration, trade licence, VAT; billing by bKash
- [ ] Anthropic usage policies passed through

## Roadmap

| When | Milestone |
|---|---|
| Months 0–3 | Three templates; 100 live businesses; first prepaid orders |
| Months 3–9 | 1,000 live apps; custom domains; agency plan; template marketplace |
| Months 9–18 | 5,000 live apps; payment-volume revenue share; second country pilot |

**Seed-round targets (*hypothesis*):** 2,000 live apps, 40% of orders prepaid, monthly churn under 5%, and blended gross margin above 60%.

## Kill criteria

- Fewer than 30% of businesses that build an app take it live.
- Live apps process no payments within 30 days.
- Build success rate is too low without human help (more than 1 in 5 builds need staff to fix).

## Open questions for the founder

1. Which payment aggregator or bank can we partner with first?
2. Which seller communities can bring the first 30 beta businesses?
3. Do we let agencies resell under their own brand?

## Sources

- [Financial Express: f-commerce entrepreneurs rising, says Palak (e-CAB figures)](https://old.thefinancialexpress.com.bd/trade/f-commerce-entrepreneurs-rising-significantly-says-palak-1618149539): page counts. The figures are older; recheck
- [EasySell: Bangladesh e-commerce, bKash, COD (vendor blog)](https://easysellapp.com/blogs/wiki/bangladesh-ecommerce-bkash-mobile-money-cod-shopify-market-entry-2026): COD 80–90%, return rates
- [SSLCommerz WooCommerce gateway listing (Ecosire)](https://ecosire.com/apps/woocommerce/woo-sslcommerz-gateway): 17,000+ businesses (secondary source)
- [bKash developer portal](https://developer.bka.sh/reference)
- [TBS: Bangladesh Bank on online payments through international cards](https://www.tbsnews.net/node/135475): $300 single-transaction limit
- [VKTR: Lovable raises $400M at $13.3B](https://www.vktr.com/ai-platforms/lovable-raises-400-million-at-133-billion-valuation/); [Ecosistema Startup: Lovable crosses $600M ARR](https://ecosistemastartup.com/lovable-cruza-us600m-arr-y-consolida-el-vibe-coding/)
- [Personal Data Protection Ordinance 2025: key takeaways](https://asianews.network/?p=234602)
- [Anthropic API pricing](https://www.anthropic.com/pricing): Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 4.5 $1/$5 per million tokens; cache reads $0.20
- [USD/BDT 122.91 on 2 Oct 2026 (exchange-rates.org)](https://www.exchange-rates.org/converter/usd-bdt): Tk 123 = $1 used throughout
