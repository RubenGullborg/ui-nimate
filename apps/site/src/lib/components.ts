// Every component in packages/core is discovered from its folder: meta.json drives the site.
import { gzipSync } from "node:zlib";
export interface Option { value: string; label: string; note?: string; also?: Record<string, string> }
export interface Tunable {
  prop: string; label?: string; default: string; type: string;
  min?: number; max?: number; step?: number; unit?: string; options?: (string | Option)[];
}
export interface Meta {
  id: string; slug: string; name: string; category: string; description: string;
  status: "experimental" | "stable";
  support: { level: "baseline" | "experimental"; notes?: string };
  state: null | { attr: string; values: string[]; fallback?: string; fallbackValues?: string[]; selector?: string };
  preview?: { zoom?: number; width?: string };
  attributes?: { attr: string; label: string; choices: { value: string; label: string; note?: string }[] }[];
  tip?: { title: string; body: string; code?: string };
  variants: { name: string; label: string }[];
  tunables: Tunable[];
  a11y: string;
  tags?: string[];
}
export interface Component extends Meta { html: string; css: string; readme: string; size: Size }
export interface Size { bytes: number; kb: string; tier: "lightweight" | "moderate" | "heavy"; color: string }

const base = "../../../../packages/core/src/components";

// CSS weight after gzip (comments stripped, like scripts/check.mjs). Tiers: < 1 kB, < 2.5 kB, heavier.
function sizeOf(css: string): Size {
  const bytes = gzipSync(css.replace(/\/\*[\s\S]*?\*\//g, "")).length;
  const tier = bytes < 1024 ? "lightweight" : bytes < 2560 ? "moderate" : "heavy";
  const color = { lightweight: "--u-ring-mint", moderate: "--u-ring-butter", heavy: "--u-ring-coral" }[tier];
  return { bytes, kb: (bytes / 1024).toFixed(2), tier, color };
}
const metas = import.meta.glob<Meta>("../../../../packages/core/src/components/*/meta.json", { eager: true, import: "default" });
const htmls = import.meta.glob<string>("../../../../packages/core/src/components/*/*.html", { eager: true, query: "?raw", import: "default" });
const csss = import.meta.glob<string>("../../../../packages/core/src/components/*/*.css", { eager: true, query: "?raw", import: "default" });
const readmes = import.meta.glob<string>("../../../../packages/core/src/components/*/README.md", { eager: true, query: "?raw", import: "default" });

export const components: Component[] = Object.values(metas)
  .map((m) => ({
    ...m,
    html: htmls[`${base}/${m.slug}/${m.slug}.html`] ?? "",
    css: csss[`${base}/${m.slug}/${m.slug}.css`] ?? "",
    readme: readmes[`${base}/${m.slug}/README.md`] ?? "",
    size: sizeOf(csss[`${base}/${m.slug}/${m.slug}.css`] ?? ""),
  }))
  .sort((a, b) => a.id.localeCompare(b.id));

export const github = "https://github.com/RubenGullborg/ui-nimate";

export const optionList = (t: Tunable): Option[] =>
  (t.options ?? []).map((o) => (typeof o === "string" ? { value: o, label: o } : o));

// Preset swatches for colour tunables. currentColor = follows the text colour.
export const swatches = [
  { value: "currentColor", label: "Auto", hex: "" },
  { value: "#142030", label: "Ink", hex: "#142030" },
  { value: "#e3f1fb", label: "Chalk", hex: "#e3f1fb" },
  { value: "#89d0ff", label: "Sky", hex: "#89d0ff" },
  { value: "#ffafa1", label: "Coral", hex: "#ffafa1" },
  { value: "#bfd186", label: "Lime", hex: "#bfd186" },
  { value: "#d1b9ff", label: "Lilac", hex: "#d1b9ff" },
  { value: "#e0c579", label: "Butter", hex: "#e0c579" },
];
