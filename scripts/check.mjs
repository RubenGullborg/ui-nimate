// Validates every component in packages/core/src/components against the contract
// (skills/uinimate-components/SKILL.md). No dependencies. Exit code 1 on any error.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "packages/core/src/components");
const BUDGET = { icon: 1500, control: 2500, loader: 2000, layout: 3000, text: 2500, background: 4000 }; // bytes, gzipped CSS
const ENUMS = {
  category: Object.keys(BUDGET),
  status: ["experimental", "stable"],
  level: ["baseline", "experimental"],
  type: ["time", "length", "number", "color", "easing", "keyword"],
};

let errors = 0, warnings = 0;
const err = (c, m) => { errors++; console.log(`  ✗ ${c}: ${m}`); };
const warn = (c, m) => { warnings++; console.log(`  ! ${c}: ${m}`); };

const slugs = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
const ids = new Map();

for (const slug of slugs) {
  const base = join(dir, slug);
  console.log(`• ${slug}`);
  for (const f of [`${slug}.html`, `${slug}.css`, "meta.json", "README.md"]) {
    if (!existsSync(join(base, f))) err(slug, `missing ${f}`);
  }
  if (!existsSync(join(base, "meta.json")) || !existsSync(join(base, `${slug}.css`))) continue;

  let meta;
  try { meta = JSON.parse(readFileSync(join(base, "meta.json"), "utf8")); }
  catch (e) { err(slug, `meta.json is not valid JSON (${e.message})`); continue; }
  const css = readFileSync(join(base, `${slug}.css`), "utf8");
  const html = existsSync(join(base, `${slug}.html`)) ? readFileSync(join(base, `${slug}.html`), "utf8") : "";

  for (const k of ["id", "slug", "name", "category", "description", "status", "support", "state", "variants", "tunables", "a11y"]) {
    if (!(k in meta)) err(slug, `meta.${k} is required`);
  }
  if (meta.slug !== slug) err(slug, `meta.slug "${meta.slug}" must match the folder name`);
  if (!/^U-\d{3}$/.test(meta.id ?? "")) err(slug, `meta.id must look like U-002`);
  else if (ids.has(meta.id)) err(slug, `meta.id ${meta.id} is already used by ${ids.get(meta.id)}`);
  else ids.set(meta.id, slug);
  if (!ENUMS.category.includes(meta.category)) err(slug, `meta.category must be one of ${ENUMS.category.join(", ")}`);
  if (!ENUMS.status.includes(meta.status)) err(slug, `meta.status must be experimental or stable`);
  if (!ENUMS.level.includes(meta.support?.level)) err(slug, `meta.support.level must be baseline or experimental`);
  if (meta.support?.level === "experimental" && !meta.support.notes) err(slug, `experimental support needs support.notes (which browsers, how it degrades)`);
  if ((meta.description ?? "").length > 160) warn(slug, `description is longer than 160 characters`);

  // root class
  if (!html.includes(`u-${slug}`)) err(slug, `${slug}.html must use the root class "u-${slug}"`);

  // state: ARIA selector plus a data-state twin
  if (meta.state) {
    const { attr, values = [], fallback, fallbackValues = [] } = meta.state;
    if (attr?.startsWith("aria-")) {
      if (!css.includes(`[${attr}=`)) err(slug, `CSS never selects [${attr}=…]`);
      if (fallback !== "data-state") err(slug, `ARIA state needs "fallback": "data-state"`);
      for (const v of fallbackValues.slice(1)) if (!css.includes(`[data-state="${v}"]`)) err(slug, `CSS is missing the [data-state="${v}"] twin`);
    }
    if (values.length < 2) err(slug, `state.values needs at least two values`);
  }

  // variants
  if (!Array.isArray(meta.variants) || !meta.variants.length) err(slug, `meta.variants needs at least one entry`);
  else for (const v of meta.variants.slice(1)) if (!css.includes(`[data-variant="${v.name}"]`)) err(slug, `CSS never selects [data-variant="${v.name}"]`);

  // tunables: used with a fallback, never declared on the component
  for (const t of meta.tunables ?? []) {
    if (!/^--u-[a-z0-9-]+$/.test(t.prop)) err(slug, `tunable ${t.prop} must be named --u-…`);
    if (!ENUMS.type.includes(t.type)) err(slug, `tunable ${t.prop} has unknown type ${t.type}`);
    if (!css.includes(`var(${t.prop},`)) err(slug, `tunable ${t.prop} must be read as var(${t.prop}, fallback)`);
    if (new RegExp(`^\\s*${t.prop}\\s*:`, "m").test(css)) err(slug, `tunable ${t.prop} is declared in the CSS; read it with a fallback instead`);
  }

  // manners
  if (!css.includes("prefers-reduced-motion")) err(slug, `CSS needs a prefers-reduced-motion rule`);
  if (/\b(transition|animation)[^;{]*\b(width|height|top|left|margin)\b/.test(css)) warn(slug, `looks like a layout property is animated`);
  if (meta.category === "icon" || meta.category === "control") {
    if (!css.includes(":focus-visible")) err(slug, `interactive components need a :focus-visible style`);
  }
  if (meta.support?.level === "baseline" && /transition[^;]*\bd\b|@property|interpolate-size|@starting-style/.test(css)) {
    warn(slug, `uses features outside Baseline widely available; mark support.level "experimental"?`);
  }

  // size budget
  const gz = gzipSync(css.replace(/\/\*[\s\S]*?\*\//g, "")).length;
  const budget = BUDGET[meta.category] ?? 2500;
  const line = `${gz} B gzipped CSS (budget ${budget} B)`;
  if (gz > budget) err(slug, line); else console.log(`  ✓ ${line}`);
}

// the all-in-one bundle must include every component
const bundle = readFileSync(join(root, "packages/core/src/index.css"), "utf8");
for (const slug of slugs) {
  if (!bundle.includes(`./components/${slug}/${slug}.css`)) err("index.css", `does not import components/${slug}/${slug}.css`);
}

console.log(`\n${slugs.length} component(s), ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
