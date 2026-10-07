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
