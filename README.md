<p align="center">
  <img src="brand/film/poster.jpg" alt="Uinimate — a laboratory of animated UI components" width="100%" />
</p>

# Uinimate

**A laboratory of animated UI components.** Pure CSS and SVG motion for any stack. No dependencies. Tune every animation before you copy it.

`[ 0 deps ]` `[ CSS · SVG ]` `[ any framework ]`

> Pronounced "you-eye-nimate". Early days: the first specimen is in, many more are on the bench.

## Specimens

| No. | Name | What it does |
|---|---|---|
| U-001 | [Morph](packages/core/src/specimens/u-001-morph) | One shape morphs square → triangle → hexagon → circle with a spring hop |

## Use

```html
<link rel="stylesheet" href="uinimate/specimens/u-001-morph/morph.css" />
<span class="u-morph" role="img" aria-label="Loading"></span>
```

Tune it with CSS custom properties:

```css
.my-loader { --u-morph-size: 24px; --u-morph-duration: 2s; }
```

Works in React, Vue, Svelte, Astro, plain HTML, Webflow and Shopify. If it renders HTML, it runs Uinimate.

## Principles

1. **Zero dependencies.** Pure CSS and SVG. Nothing to install, no runtime.
2. **Works everywhere.** One animation, every framework.
3. **Make it yours.** Speed, easing, colour and intensity are all tunable.
4. **Motion with manners.** Reduced-motion aware, no layout shift, small.
5. **Craft over quantity.** Fewer, better specimens.

## Repo

```
packages/core   the library (npm: uinimate)
apps/site       the website (Astro)
brand           brand kit and brand film
skills          agent skills (brand guidelines for AI tools)
```

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

## Brand

The brand guide lives in [`brand/brand-guide.html`](brand/brand-guide.html), and the full guidelines for people and AI tools in [`skills/uinimate-brand/SKILL.md`](skills/uinimate-brand/SKILL.md).
