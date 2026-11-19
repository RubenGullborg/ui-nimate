# U-003 · Disclosure

Collapsible sections for FAQs, optional form steps and "more details". Each panel opens to its natural height and the content slides in just after it; the icon turns from plus to minus, plus to cross, or flips a chevron. Stack as many as you like.

`[ 0 deps ]` `[ CSS + SVG ]` `[ ∆t 360ms ]` `[ 3 variants ]` `[ 2 options ]`

## Use

Copy the markup from `disclosure.html` (a stack of two) and the styles from `disclosure.css`. Use one `.u-disclosure` on its own, or several inside a `.u-disclosure-group`. Put anything inside `.u-disclosure__inner`: text, a list, form fields.

Your code flips `aria-expanded` **on each trigger button**:

```js
document.querySelectorAll(".u-disclosure__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") !== "true";
    trigger.setAttribute("aria-expanded", String(open));
  });
});
```

Give every panel a unique `id` and point its trigger's `aria-controls` at it.
Where `aria-expanded` doesn't fit, put `data-state="open"` / `"closed"` on the trigger instead.

**Accordion (one open at a time):** close the other triggers when one opens. The CSS doesn't change.

## Variants and options

Put these on a single `.u-disclosure`, or on the `.u-disclosure-group` to style the whole stack.

| Attribute | Values | What it does |
|---|---|---|
| `data-variant` | *(none)* / `plus`, `cross`, `chevron` | Icon: + becomes −, + turns into ×, ⌄ flips to ⌃ |
| `data-icon` | *(none)*, `start` | Icon on the right (default) or the left |
| `data-title` | *(none)*, `lift`, `slide` | The open title stays, shrinks up into a label, or steps in |

## Tune

| Property | Default | What it changes |
|---|---|---|
| `--u-disclosure-duration` | `360ms` | Opening and closing |
| `--u-disclosure-padding` | `14px` | Space above and below each title |
| `--u-disclosure-divider` | `1px` | Divider thickness; `0` hides the dividers |
| `--u-disclosure-divider-opacity` | `0.28` | Divider strength, mixed from the text colour |
| `--u-disclosure-size` | `20px` | Icon size |
| `--u-disclosure-color` | `currentColor` | Text, icon and dividers |
| `--u-icon-stroke` | `2` | Icon line weight (dividers have their own setting) |
| `--u-icon-cap` | `round` | Icon line ends: `round` or `square` |

## Manners

- Opens with the `grid-template-rows: 0fr → 1fr` technique: true natural height, no JavaScript measuring.
- Closed content is `visibility: hidden`, so keyboard users never tab into it.
- Respects `prefers-reduced-motion`: it opens and closes instantly.
- Visible keyboard focus; the whole row is the hit area.

## Why there's no "center the title" option

Moving the title to the exact centre needs its width, which CSS can't read from a transition. It would take a few lines of JavaScript, so it's left out to keep the component dependency-free.
