---
name: uinimate-components
description: The contract for building Uinimate components — folder layout, meta.json, how state drives animation (ARIA attributes, data-state fallback), variants, tunable CSS properties with fallbacks, SVG icon rules, browser-support levels, accessibility and the definition of done. Use whenever you create, change, review or document a component in packages/core/src/components.
---

# Building Uinimate components

A Uinimate component is plain HTML + CSS (+ SVG) that animates between states. It ships **no required JavaScript**, works in any framework, and can be copy-pasted on its own. For look and feel, also follow the `uinimate-brand` skill.

## 1. Folder

```
packages/core/src/components/<slug>/
  <slug>.html     canonical markup (the SVG lives here)
  <slug>.css      every style, state and variant
  meta.json       the component's data (validated by scripts/check.mjs)
  README.md       usage, tuning table, "Manners"
```

- Create new components with `pnpm new <slug> "<Name>"`. Never hand-copy another component.
- `slug` is kebab-case and public (`theme-toggle`). The catalogue number (`U-003`) is brand metadata in `meta.json`, not part of paths.
- Everything a component needs lives in its folder. No shared runtime, no cross-component imports. Tokens are optional (see §4).

## 2. State: what makes it animate

The user's own code changes **one attribute** on the root element; the CSS animates the change.

| Kind of state | Attribute | Examples |
|---|---|---|
| Something opens/expands | `aria-expanded="true|false"` | burger menu, disclosure, dropdown |
| A two-way switch | `aria-pressed="true|false"` | theme toggle, mute, favourite |
| Anything else (results, phases) | `data-state="…"` | copy → `copied`, submit → `loading` / `success` / `error` |
| Native controls | the native pseudo-class | `:checked`, `:open` (details/dialog), `:disabled` |

Rules:
- **Prefer the ARIA attribute** when one fits: it is what assistive tech reads, so animation and accessibility can't drift apart.
- **Always support `data-state` too.** Every ARIA-driven selector gets a `data-state` twin, so a component also works where the ARIA attribute doesn't apply (non-button hosts, custom elements, frameworks that manage ARIA elsewhere):
  ```css
  .u-burger[aria-expanded="true"], .u-burger[data-state="open"] { … }
  ```
- Components with no state (loaders, ambient motion) run on their own and declare `"state": null`.
- Hover/focus flourishes are allowed as extras, never as the only way to reach a state.
- A one-shot state (e.g. `copied` that should revert) is reverted by the user's code. Document the suggested timing in the README.

## 3. Variants

- Choose a variant with `data-variant="<name>"` on the root. The first variant in `meta.json` is the default and needs no attribute.
- Variants share markup. If a variant needs different markup, it is a different component.
- Aim for 2–4 variants per component.

## 4. Tunable CSS properties

- Public tunables are named `--u-<slug>-<prop>` (e.g. `--u-burger-duration`). Shared icon tunables: `--u-icon-stroke`, `--u-icon-cap`, `--u-icon-join`.
- Icons expose a colour tunable `--u-<slug>-color`, read as `color: var(--u-<slug>-color, currentColor)` so it follows the text colour by default.
- **Never declare public tunables on the component's own selector** — that would override values the user sets on an ancestor. Read them with fallbacks at the point of use, through private `--_` properties:
  ```css
  .u-burger {
    --_d: var(--u-burger-duration, var(--u-dur-base, 400ms));   /* user value → brand token → hard default */
  }
  ```
- Every tunable is listed in `meta.json` (`prop`, `default`, `type`, and `min`/`max`/`step` for numbers). Keyword tunables list `options` as `{ "value", "label" }` so the site can explain each one (e.g. `butt` → "Flat — stops at the end"). The site builds the playground controls from this list.

## 5. SVG icon rules

- `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"` — icons take the text colour.
- Stroke width `var(--u-icon-stroke, 2)`, caps `var(--u-icon-cap, round)`, joins `var(--u-icon-join, round)`. Round is the default; users can switch to `square` (extends past the end) or `butt` (flat, stops at the end).
- Check every variant with **all three** line ends. Separate lines can't share a join, so where two lines meet in a corner (an arrow tip, a check mark) the end state must be **one joined element** (`<polyline>`/`<path>`) that takes over from the moving parts when the motion ends (swap with `opacity 0s` at the full duration; swap back instantly when reversing). Offset a part by half a stroke (`calc(var(--u-icon-stroke, 2) * 0.5px)`) when its end must hide under another line.
- Keyword options in `meta.json` can carry `note` (shown under the control) and `also` (related props to set together, e.g. square/flat ends → `"--u-icon-join": "miter"` for sharp corners).
- Put `aria-hidden="true"` and `focusable="false"` on the `<svg>`; the accessible name belongs on the host element (`aria-label`).
- Animate with `transform` (use `transform-box: view-box` and explicit `transform-origin` in viewBox units), `opacity`, `stroke-dasharray` / `stroke-dashoffset` and `clip-path`.
- Morphs are built from moving parts (nested `<g>` for two-step moves). **Do not** animate the `d` property in a `baseline` component.
- Never scale a stroked line to 0 while it is visible: it collapses into a sliver of stroke width. Fade it out before it gets thin (scale to ~0.4 while opacity reaches 0).

## 6. Motion

- Durations and easings come from the brand tokens: spring `cubic-bezier(0.34, 1.56, 0.64, 1)` for entering, out `cubic-bezier(0.16, 1, 0.3, 1)` for leaving/responding, 240–400 ms for icons.
- Choreograph: sequence parts (e.g. lines meet first, then rotate) and reverse the order when closing. CSS transitions take their timing from the state being entered, so define opening timing on the open selector and closing timing on the base selector.
- `@media (prefers-reduced-motion: reduce)` → no transitions/animations; the state change still happens instantly.
- Never animate layout properties (`width`, `height`, `top`, `left`, `margin`). For height, use the `grid-template-rows: 0fr → 1fr` technique.

## 7. Browser support levels (`meta.json` → `support`)

- **`baseline`** (default): only features in Baseline "widely available" (all major browsers for ~2.5 years). Tested in Chrome, Safari and Firefox.
- **`experimental`**: may use newer CSS (path `d` morphing, `interpolate-size`, view transitions, `@starting-style`…). Must list the required browsers in `support.notes` and degrade to a usable, instant state elsewhere. The site marks these clearly.

## 8. Accessibility

- Interactive components are `<button>` (or native controls). Keyboard focus is visible: `:focus-visible` outline using `currentColor`.
- The host has an accessible name (`aria-label` or visible text). Disclosure-style components use `aria-controls`.
- Minimum hit area 40 × 40 px, even when the icon is smaller.

## 9. `meta.json`

```json
{
  "id": "U-002",
  "slug": "burger",
  "name": "Burger",
  "category": "icon",                      // icon | control | loader | layout | text | background
  "description": "Three lines that become a cross, an arrow or a minus.",
  "status": "experimental",                // experimental | stable
  "support": { "level": "baseline", "notes": "" },
  "state": { "attr": "aria-expanded", "values": ["false", "true"], "fallback": "data-state", "fallbackValues": ["closed", "open"] },
  "variants": [{ "name": "cross", "label": "Cross" }, { "name": "arrow", "label": "Arrow" }],
  "tunables": [
    { "prop": "--u-burger-duration", "label": "Duration", "default": "400ms", "type": "time", "min": 120, "max": 1400, "step": 20, "unit": "ms" },
    { "prop": "--u-icon-cap", "label": "Line ends", "default": "round", "type": "keyword", "options": [{ "value": "round", "label": "Round" }, { "value": "butt", "label": "Flat — stops at the end" }] },
    { "prop": "--u-burger-color", "label": "Colour", "default": "currentColor", "type": "color" }
  ],
  "a11y": "Use on a <button> with aria-label and aria-controls.",
  "tags": ["menu", "navigation"]
}
```
`status` is maturity (API may still change); `support.level` is browser reach. They are independent.

## 10. Definition of done

- [ ] Created with `pnpm new`, all four files present, `meta.json` complete.
- [ ] State via ARIA attribute **and** `data-state` (or `"state": null`).
- [ ] Every variant works in both directions (open → close looks intentional too).
- [ ] Tunables read with fallbacks; works copy-pasted without `tokens.css`.
- [ ] Reduced motion handled; no layout shift; visible focus; 40 px hit area.
- [ ] `pnpm check` passes (schema, files, reduced-motion rule, CSS ≤ 1.5 kB gzipped for icons).
- [ ] Looked at in Chrome, Safari and Firefox (or `support.level: experimental` with notes).
- [ ] README has usage, tuning table and a "Manners" section; component page renders on the site.
