// Scaffolds a new component that already follows the contract.
// Usage: pnpm new <slug> "<Name>" [--category icon] [--state aria-pressed|aria-expanded|data-state|none]
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [slug, name = "", ...rest] = process.argv.slice(2);
const opt = (k, d) => { const i = rest.indexOf(`--${k}`); return i >= 0 ? rest[i + 1] : d; };
const category = opt("category", "icon");
const stateAttr = opt("state", "aria-pressed");

if (!slug || !/^[a-z][a-z0-9-]*$/.test(slug) || !name) {
  console.error('Usage: pnpm new <slug> "<Name>" [--category icon] [--state aria-pressed|aria-expanded|data-state|none]');
  process.exit(1);
}
const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "packages/core/src/components");
const out = join(dir, slug);
if (existsSync(out)) { console.error(`components/${slug} already exists`); process.exit(1); }

// next free catalogue number
const used = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory())
  .map((d) => { try { return Number(JSON.parse(readFileSync(join(dir, d.name, "meta.json"), "utf8")).id.slice(2)); } catch { return 0; } });
const id = `U-${String(Math.max(0, ...used) + 1).padStart(3, "0")}`;

const states = {
  "aria-pressed": { values: ["false", "true"], fallbackValues: ["off", "on"], on: '[aria-pressed="true"]', twin: '[data-state="on"]' },
  "aria-expanded": { values: ["false", "true"], fallbackValues: ["closed", "open"], on: '[aria-expanded="true"]', twin: '[data-state="open"]' },
  "data-state": { values: ["idle", "active"], on: '[data-state="active"]' },
  none: null,
};
const st = states[stateAttr];
if (st === undefined) { console.error(`Unknown --state ${stateAttr}`); process.exit(1); }

const c = `u-${slug}`;
const hostAttr = st ? (stateAttr === "data-state" ? ` data-state="idle"` : ` ${stateAttr}="false"`) : "";
const html = `<button class="${c}" type="button"${hostAttr} aria-label="${name}">
  <svg class="${c}__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
    <rect class="${c}__part" x="6" y="6" width="12" height="12" />
  </svg>
</button>
`;
const onSel = st ? [`.${c}${st.on}`, st.twin && `.${c}${st.twin}`].filter(Boolean).join(",\n") : null;
const css = `/*
  ${id} · ${name}
  State:    ${st ? `${stateAttr} (twin: data-state)` : "none — runs on its own"}
  Tune:     --u-${slug}-duration  (default 320ms)
            --u-icon-stroke / --u-icon-cap / --u-icon-join
*/
.${c} {
  --_d: var(--u-${slug}-duration, 320ms);
  --_in: var(--u-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  --_out: var(--u-ease-out, cubic-bezier(0.16, 1, 0.3, 1));

  display: inline-grid;
  place-items: center;
  inline-size: max(40px, var(--u-${slug}-size, 24px));
  block-size: max(40px, var(--u-${slug}-size, 24px));
  padding: 0;
  border: 0;
  background: none;
  color: var(--u-${slug}-color, currentColor);
  cursor: pointer;
}
.${c}:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
.${c}__svg {
  inline-size: var(--u-${slug}-size, 24px);
  block-size: var(--u-${slug}-size, 24px);
  stroke-width: var(--u-icon-stroke, 2);
  stroke-linecap: var(--u-icon-cap, round);
  stroke-linejoin: var(--u-icon-join, round);
  overflow: visible;
}
.${c}__part {
  transform-box: view-box;
  transform-origin: 12px 12px;
  transition: transform var(--_d) var(--_out);
}
${onSel ? `${onSel.split("\n").map((s) => s.replace(/,$/, "") + ` .${c}__part`).join(",\n")} {
  transform: rotate(45deg);
  transition-timing-function: var(--_in);
}
` : ""}
@media (prefers-reduced-motion: reduce) {
  .${c} *, .${c} { transition: none !important; animation: none !important; }
}
`;
const meta = {
  $schema: "../../../meta.schema.json",
  id, slug, name, category,
  description: `${name}. Describe what changes and why it feels good, in one sentence.`,
  status: "experimental",
  support: { level: "baseline", notes: "" },
  state: st ? (stateAttr === "data-state" ? { attr: "data-state", values: st.values } : { attr: stateAttr, values: st.values, fallback: "data-state", fallbackValues: st.fallbackValues }) : null,
  variants: [{ name: "default", label: "Default" }],
  tunables: [
    { prop: `--u-${slug}-duration`, label: "Duration", default: "320ms", type: "time", min: 100, max: 1200, step: 20, unit: "ms" },
    { prop: `--u-${slug}-size`, label: "Size", default: "24px", type: "length", min: 16, max: 96, step: 2, unit: "px" },
    { prop: "--u-icon-stroke", label: "Stroke", default: "2", type: "number", min: 1, max: 3, step: 0.25 },
    { prop: "--u-icon-cap", label: "Line ends", default: "round", type: "keyword", options: [
      { value: "round", label: "Round" }, { value: "square", label: "Square — extends past the end" }, { value: "butt", label: "Flat — stops at the end" },
    ] },
    { prop: `--u-${slug}-color`, label: "Colour", default: "currentColor", type: "color" },
  ],
  a11y: "Use on a <button> with an aria-label.",
  tags: [],
};
const readme = `# ${id} · ${name}

${meta.description}

\`[ 0 deps ]\` \`[ CSS + SVG ]\`

## Use

\`\`\`html
${html.trim()}
\`\`\`

${st ? `Your code flips \`${stateAttr}\`; the CSS animates the change. Anywhere the ARIA attribute doesn't fit, use \`data-state\` instead.` : "It runs on its own."}

## Tune

| Property | Default | What it changes |
|---|---|---|
| \`--u-${slug}-duration\` | \`320ms\` | Length of the change |
| \`--u-${slug}-size\` | \`24px\` | Icon size (hit area stays at least 40 px) |
| \`--u-icon-stroke\` | \`2\` | Line weight |
| \`--u-${slug}-color\` | \`currentColor\` | Colour; follows your text colour by default |
| \`--u-icon-cap\` | \`round\` | \`round\`, \`square\` (extends past the end) or \`butt\` (flat) |

## Manners

- Respects \`prefers-reduced-motion\`: the state changes instantly.
- Animates transforms only, so it never shifts layout.
- Keyboard focus is visible.
`;

mkdirSync(out, { recursive: true });
writeFileSync(join(out, `${slug}.html`), html);
writeFileSync(join(out, `${slug}.css`), css);
writeFileSync(join(out, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
writeFileSync(join(out, "README.md"), readme);
console.log(`Created components/${slug} (${id}). Next: draw the SVG, write the states, fill meta.json, run pnpm check.`);
