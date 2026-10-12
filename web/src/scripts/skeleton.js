// A placeholder app for an empty screen: grey blocks with a shimmer, in the shape of a store. It fills in as the
// app takes shape: `level` 1 paints the top bar in the brand colour with the app's name, 2 the front banner,
// 3 the products, 4 tags each part with what the plan put there. The parts new at this level arrive with a pop.
// Used by the hero's phone and the demo; the brand colour comes from the screen's --brand.
export function skeleton({ level = 0, name = "", labels = [], caption = "" } = {}) {
  const lv = [1, 2, 3, 4].filter((n) => n <= level).map((n) => `l${n}`).join(" ");
  const tag = (i) => (labels[i] ? `<span class="sk-tag z4">${labels[i]}</span>` : "");
  const card = `<div class="sk-card"><i class="sk-img"></i><i class="ln"></i><i class="ln w50"></i></div>`;
  return `<div class="sk ${lv} n${level}" aria-hidden="true">
  <div class="sk-bar z1"><i class="sk-logo"></i><b class="sk-name">${name}</b><i class="ln w20"></i></div>
  <div class="sk-hero z2">${tag(0)}<i class="ln h w70"></i><i class="ln w45"></i><i class="sk-btn"></i></div>
  <div class="sk-chips z3">${tag(1)}<i></i><i></i><i></i></div>
  <div class="sk-grid z3">${tag(2)}${card.repeat(4)}</div>
  <div class="sk-foot z2">${tag(3)}<i class="ln w60"></i></div>
  ${caption ? `<p class="sk-cap">${caption}</p>` : ""}
</div>`;
}
