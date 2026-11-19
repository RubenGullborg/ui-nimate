# U-001 · Burger

Three lines meet in the middle, then become a cross, arrow, minus, plus or a twisting cross. Closing plays the same steps in reverse, so it feels as deliberate as opening.

`[ 0 deps ]` `[ CSS + SVG ]` `[ ∆t 400ms ]` `[ 5 variants ]`

## Use

```html
<link rel="stylesheet" href="uinimate/components/burger/burger.css" />

<button class="u-burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu">
  <svg class="u-burger__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
    <g class="u-burger__slide u-burger__slide--top"><line class="u-burger__line u-burger__line--top" x1="4" y1="6" x2="20" y2="6" /></g>
    <line class="u-burger__line u-burger__line--mid" x1="4" y1="12" x2="20" y2="12" />
    <g class="u-burger__slide u-burger__slide--bot"><line class="u-burger__line u-burger__line--bot" x1="4" y1="18" x2="20" y2="18" /></g>
    <polyline class="u-burger__head" points="10.34 5.66 4 12 10.34 18.34" />
  </svg>
</button>
```

Your code already toggles `aria-expanded` when the menu opens; that is all the burger needs.

```js
button.addEventListener("click", () => {
  const open = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(open));
});
```

React: `<button className="u-burger" aria-expanded={open} onClick={() => setOpen(!open)}>…</button>`.
Where `aria-expanded` doesn't fit, use `data-state="open"` / `"closed"` instead.

## Variants

| `data-variant` | Open state |
|---|---|
| *(none)* or `cross` | ✕ |
| `arrow` | ← (great for "back" in nested menus) |
| `minus` | − |
| `plus` | + (add, expand) |
| `twist` | ✕ with a half-turn spin |

## Tune

| Property | Default | What it changes |
|---|---|---|
| `--u-burger-duration` | `400ms` | The whole change (slide ≈ 45 %, turn ≈ 55 %) |
| `--u-burger-ease` | spring | Easing of the turn |
| `--u-burger-size` | `24px` | Icon size; the hit area stays at least 40 px |
| `--u-icon-stroke` | `2` | Line weight |
| `--u-burger-color` | `currentColor` | Line colour; by default it follows your text colour |
| `--u-icon-cap` | `round` | Line ends: `round` or `square` (extends past the end) |
| `--u-icon-join` | `round` | Corners. Use `miter` with square ends for a sharp arrow tip |

## Manners

- Respects `prefers-reduced-motion`: the icon switches instantly.
- Animates `transform` and `opacity` only, so it never shifts layout.
- Visible keyboard focus and a 40 × 40 px minimum hit area.
