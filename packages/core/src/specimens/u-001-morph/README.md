# Specimen U-001 · Morph

One shape that morphs **square → triangle → hexagon → circle**, hopping on each change with a spring. It's the motion behind the dots on the Uinimate logo, and works as a loader, a status mark or a playful bullet.

`[ 0 deps ]` `[ CSS only ]` `[ ∆t 3.2s / cycle ]` `[ ease spring ]`

## Use

```html
<link rel="stylesheet" href="uinimate/specimens/u-001-morph/morph.css" />

<span class="u-morph" role="img" aria-label="Loading"></span>
```

Works anywhere HTML renders: React (`className`), Vue, Svelte, Astro, Webflow, Shopify themes.

## Tune

| Property | Default | What it changes |
|---|---|---|
| `--u-morph-size` | `48px` | Size of the shape |
| `--u-morph-duration` | `3.2s` | One full cycle through all four shapes |
| `--u-morph-ease` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Easing of each change |
| `--u-morph-lift` | `0.35` | How far it hops, as a fraction of its size |
| `--u-morph-c1` … `--u-morph-c4` | ring-deep sky, coral, mint, lilac | Colour of each shape |

```css
.my-loader { --u-morph-size: 24px; --u-morph-duration: 2s; }
```

## Manners

- Respects `prefers-reduced-motion`: it stops on the square.
- `.u-morph--still` stops it on purpose (print, email, static screenshots).
- Animates `clip-path`, `translate` and `rotate` only, so it never shifts layout.
