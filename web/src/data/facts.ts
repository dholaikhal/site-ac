import facts from "./facts.json";

export default facts;
export type SourceId = keyof typeof facts.sources;

const tkFmt = new Intl.NumberFormat("en-IN");
/** Taka in Bangladeshi grouping: Tk 1,999. */
export const tk = (n: number) => `Tk ${tkFmt.format(n)}`;
/** USD equivalent at the site-wide rate, one decimal: ≈ $16.3. */
export const usdOf = (taka: number) => `$${(taka / facts.fx.tkPerUsd).toFixed(1)}`;
export const usd = (n: number, digits = 2) => `$${n.toFixed(digits)}`;
export const plan = (id: string) => facts.pricing.plans.find((p) => p.id === id)!;

export const company = facts.company;
/** An outbound link only once the company details are real; mock numbers and pages render as plain text. */
export const live = (href: string) => (company.mock ? undefined : href);
/** A WhatsApp chat with us, opened with a greeting: the number is real, so it's always a link. */
export const whatsapp = (text = "Hi Amader Cloud") => `https://wa.me/${company.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
