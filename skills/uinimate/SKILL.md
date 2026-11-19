---
name: uinimate
description: Add Uinimate's animated UI components (burger menu, theme toggle, disclosure/accordion and more) to any website or app. Covers choosing a component, getting its HTML and CSS, wiring its state in plain HTML, React, Next.js, Vue, Svelte or Astro, tuning it with CSS variables to match the site's design, and checking accessibility. Use when someone asks for an animated hamburger/menu button, dark-mode toggle, collapsible section, FAQ accordion or similar, or mentions Uinimate.
---

# Using Uinimate in a project

Uinimate components are plain **HTML + CSS (+ inline SVG)**. They have no runtime and no dependencies, and work in any framework. Each one animates when **one attribute** changes on it, an attribute the page should set anyway for accessibility (`aria-expanded`, `aria-pressed`, or `data-state`).

Your job when adding one: copy its markup and CSS into the project, wire that attribute to the project's own state, and tune it with CSS variables. Don't rewrite the animation.

## 1. Pick the component

| Slug | What it is | State attribute (on) | Variants (`data-variant`) | Other options |
|---|---|---|---|---|
| `burger` | Menu button: three lines become another icon | `aria-expanded="true"` on the `<button>` | `cross` (default), `arrow`, `minus`, `plus`, `twist` | — |
| `theme-toggle` | Dark-mode button: sun ↔ moon | `aria-pressed="true"` (= dark) on the `<button>` | `draw` (default), `spin`, `rise`, `flip`, `orbit`, `swap` | — |
| `disclosure` | Collapsible sections / accordion / FAQ | `aria-expanded="true"` on each `.u-disclosure__trigger` | `plus` (default), `cross`, `chevron` | `data-icon="start"`, `data-title="lift\|slide"` |

The catalogue grows. For the current list, read the component folders in the repository: `packages/core/src/components/<slug>/meta.json` describes each one (state, variants, options, every tunable with its default). Prefer `meta.json` over this table when they differ.

## 2. Get the files

Every component is one folder with `<slug>.html` (markup), `<slug>.css` (all styles and motion), `meta.json` and `README.md`.

- **From GitHub** (works today):
  `https://raw.githubusercontent.com/RubenGullborg/ui-nimate/main/packages/core/src/components/<slug>/<slug>.css`
  and the same path with `.html` and `meta.json`.
- **From npm** (coming soon): `npm i uinimate`, then `import "uinimate/components/<slug>/<slug>.css";`

Copy the CSS **unchanged** into the project, for example as `src/styles/uinimate/<slug>.css`, and load it globally.

- **Plain HTML / Astro:** a `<link>` or `import` in the layout.
- **Next.js (App Router):** import it in `app/layout.tsx`, or `@import` it from `globals.css`.
- **Vite / CRA / Vue / Svelte:** import it once in the entry file or root component.
- **CSS Modules:** don't import it as a module. The class names (`u-burger`, …) must stay global. Import it from a global stylesheet.
- **Tailwind:** `@import` it in the main CSS file after `@tailwind base` / `@import "tailwindcss"`. Tailwind classes can sit alongside the component's classes.
- **Shadow DOM / web components:** include the CSS inside the shadow root.

## 3. Paste the markup and wire the state

Paste `<slug>.html`, then convert it to the framework's syntax (`class` → `className` in JSX; keep every class name and attribute). Bind the state attribute to the project's state, and the CSS does the rest.

**Plain HTML**
```html
<script>
  document.querySelectorAll(".u-burger").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", String(btn.getAttribute("aria-expanded") !== "true"));
    });
  });
</script>
```

**React / Next.js** (mark the component `"use client"` in the App Router)
```jsx
const [open, setOpen] = useState(false);
<button className="u-burger" aria-expanded={open} aria-controls="site-menu" aria-label="Menu" onClick={() => setOpen(!open)}>
  {/* svg from burger.html, with className instead of class */}
</button>
```

**Vue:** `<button class="u-burger" :aria-expanded="open" @click="open = !open">…</button>`
**Svelte 5:** `<button class="u-burger" aria-expanded={open} onclick={() => (open = !open)}>…</button>`

**Theme toggle:** bind `aria-pressed` to "dark mode is on". Keep the `aria-label` the same in both states (e.g. "Dark mode"). Set the initial value before first paint, from saved preference or `prefers-color-scheme`, so it doesn't animate on load.

**Disclosure stack:** each trigger owns its own `aria-expanded`. For "one open at a time" (an accordion), store the open index: `aria-expanded={openIndex === i}`. Each panel needs a **unique `id`** referenced by its trigger's `aria-controls`. The panel must stay the **next sibling** of its trigger (the CSS uses `trigger + panel`).

**When an ARIA attribute doesn't fit**, use the twin instead: `data-state="open"`/`"closed"` (burger, disclosure) or `data-state="on"`/`"off"` (theme toggle).

## 4. Make it match the site

Customise only through what each `meta.json` exposes. Never edit the animation rules.

- **Variant:** `data-variant="…"` on the component (on `.u-disclosure-group` to style a whole stack).
- **Options:** e.g. `data-icon="start"` on a disclosure.
- **CSS variables:** set them on the element or any parent. They inherit, so one rule can theme every instance:
  ```css
  .site-header {
    --u-burger-duration: 450ms;
    --u-burger-color: var(--brand-ink);
    --u-icon-stroke: 1.75;
    --u-icon-cap: square;        /* sharp ends… */
    --u-icon-join: miter;        /* …need sharp corners too */
  }
  ```
- **Colour:** components use `currentColor` by default, so they follow the surrounding text colour. Prefer setting `color` on the parent, or use `--u-<slug>-color`.
- **Size:** use `--u-<slug>-size`. The hit area never drops below 40 × 40 px.
- **Match the project's scale:** reuse the project's existing design tokens as the values, e.g. `--u-disclosure-duration: var(--motion-medium)`.

## 5. Check before you finish

- [ ] The CSS loads globally, and the class names are not hashed by CSS Modules.
- [ ] Clicking changes the state attribute in the DOM (inspect it). If the attribute changes but nothing moves, the CSS isn't loaded.
- [ ] Buttons have an accessible name (`aria-label` or visible text). `aria-controls` points at a real `id`.
- [ ] Disclosure panels have unique ids. Closed panels can't be tabbed into (built in).
- [ ] With reduced motion turned on in the OS, the state still changes, just instantly (built in). Don't remove that rule.
- [ ] No extra animation library was added. Uinimate needs none.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Nothing animates | The state attribute isn't changing, or the CSS isn't loaded globally |
| Animates in dev, not in production | CSS Modules or tree-shaking dropped the global CSS. Import it from a global stylesheet |
| Disclosure opens without animation or won't open | The panel isn't the trigger's next sibling, or the attribute was set on the wrapper instead of the trigger |
| Theme toggle animates on page load | The initial `aria-pressed` was set after first paint. Set it before render or server-side |
| Icon looks too heavy or light | Tune `--u-icon-stroke` (theme toggle defaults to 1.5, others to 2) |

More: each component's `README.md` (usage, variants, tuning table) and the playground at the Uinimate site, where every setting can be tried and copied.
