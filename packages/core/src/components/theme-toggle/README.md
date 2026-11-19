# U-002 · Theme toggle

Sun to moon. The detached rays pull in one by one, the sun winds up and undraws, and only then does the moon draw itself in with a spring. Going back to light plays it in reverse.

`[ 0 deps ]` `[ CSS + SVG ]` `[ ∆t 800ms ]` `[ 6 variants ]`

## Use

Copy the markup from `theme-toggle.html` and the styles from `theme-toggle.css`.

`aria-pressed="true"` means dark mode is on. Flip it when your theme changes:

```js
toggle.addEventListener("click", () => {
  const dark = toggle.getAttribute("aria-pressed") !== "true";
  toggle.setAttribute("aria-pressed", String(dark));
  document.documentElement.dataset.theme = dark ? "dark" : "light";
});
```

React: `<button className="u-theme-toggle" aria-pressed={dark} onClick={() => setDark(!dark)}>…</button>`.
Where `aria-pressed` doesn't fit, use `data-state="on"` / `"off"`.

Keep the `aria-label` the same in both states ("Dark mode"); `aria-pressed` tells screen readers whether it's on.

## Variants

| `data-variant` | Into dark |
|---|---|
| *(none)* or `draw` | Rays pull in, the sun undraws, the moon draws in |
| `spin` | The same change inside one full turn |
| `rise` | The sun sets below the edge, the moon drops in from above |
| `flip` | A coin flip: sun on the front, moon on the back |
| `orbit` | The sun swings away along an arc, the moon swings in behind it |
| `swap` | The sun shrinks and turns away, the moon pops in with a spring |

## Tune

| Property | Default | What it changes |
|---|---|---|
| `--u-theme-toggle-duration` | `800ms` | The whole change |
| `--u-theme-toggle-size` | `24px` | Icon size; the hit area stays at least 40 px |
| `--u-theme-toggle-color` | `currentColor` | Line colour; follows your text colour by default |
| `--u-icon-stroke` | `1.5` | Line weight (lighter than other icons, so the rays stay airy) |
| `--u-icon-cap` | `round` | Line ends: `round` or `square` |

## Manners

- Respects `prefers-reduced-motion`: the icon switches instantly.
- Animates `transform`, `opacity` and stroke dashes only, so it never shifts layout.
- Visible keyboard focus and a 40 × 40 px minimum hit area.
