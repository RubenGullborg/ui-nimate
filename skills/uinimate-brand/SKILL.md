---
name: uinimate-brand
description: Uinimate's brand system — the "laboratory of motion" concept, voice, living-i logo, particle-u icon, paper/ink/blueprint colours with the 12-hue pastel ring, Newsreader + Space Mono + Inter type, six hard-edged primitives, scientific annotations, patterns and motion tokens. Use whenever you design, write, animate or review anything for Uinimate: website and docs pages, components and specimens, copy, social posts, slides, videos, icons or marketing.
---

# Uinimate brand

Uinimate is a framework-agnostic, dependency-free library of animated UI: CSS and SVG motion first, later components, primitives, sections, backgrounds and shaders for every framework. The brand presents it as **a laboratory of motion**: every animation is a *specimen* that is catalogued, measured and plotted. Science, nature, geometry and astronomy frame the brand as annotations and texture; they never become the product.

This file is self-contained and provider-agnostic (plain Markdown). Asset files live in the repo under `brand/` (paths below).

## 1. Core values and positioning

1. **Zero dependencies** — pure CSS and SVG. Nothing to install, no runtime.
2. **Works everywhere** — React, Vue, Svelte, Astro, plain HTML, Webflow, Shopify. If it renders HTML, it runs Uinimate.
3. **Make it yours** — every animation is tuned visually (speed, easing, colour, intensity) before it is copied.
4. **Motion with manners** — respects `prefers-reduced-motion`, avoids layout shift, stays small.
5. **Craft over quantity** — fewer, better specimens.

Taglines: **"Motion for any stack. No dependencies."** (primary) · "Copy. Tune. Ship. Anywhere." (secondary) · "A laboratory of animated UI components."

## 2. Voice

Friendly, confident, short. A senior developer who enjoys the craft; never hype.
- Active voice, plain words, short sentences. Say what a thing does: "Copy the CSS. It runs anywhere."
- Light wit is welcome, once: "This one wiggles. Gently. You can make it wiggle harder."
- Avoid: "revolutionary", "supercharge", "unleash", "seamless", "next-gen", exclamation marks, emoji.
- Use real numbers from the specimen: "240 ms", "1.2 kB", "0 deps".

## 3. Name

- Written **Uinimate** (capital U only). In code, packages and URLs: `uinimate` (repo: `ui-nimate`).
- Pronounced "you-eye-nimate". It can be a verb: "Uinimate your site."
- Never "UInimate", "UINIMATE", "Ui-nimate" in prose.

## 4. Logo — the living i

Wordmark in **Newsreader Medium (500), upright, opsz 72**, letter-spacing −0.015em. Both i's are dotless (ı); their dots are small shapes that take turns morphing **square → triangle → hexagon → circle** with a spring, the second dot half a cycle behind the first. A hairline **baseline with measuring ticks** under each i (borrowed from a technical drawing) is part of the mark.

- Source: `brand/logo/uinimate-logo.css` (HTML + CSS, no JS). Markup:
  ```html
  <span class="u-logo" role="img" aria-label="Uinimate">
    <span class="u-logo__word" aria-hidden="true">U<span class="u-logo__i">ı<i></i></span>n<span class="u-logo__i u-logo__i--2">ı<i></i></span>mate</span>
    <span class="u-logo__base" aria-hidden="true"></span>
  </span>
  ```
  Size with `font-size`. `.u-logo--blueprint` on dark; `.u-logo--still` for print/email/small sizes.
- Animated at ≥ 40 px font size; still logo below; under 24 px use the icon.
- Two treatments only: ink on paper, chalk on blueprint. Never on a pastel.
- Clear space: 0.5 em on every side.
- Don't: italic (dots collide with slanted stems), all-caps (the i's lose their dots), recolouring the word, dropping the baseline.

## 5. Icon — particle u

Fourteen small shapes (circle, square, triangle, hexagon, pentagon) in a 5 × 5 grid form a lowercase **u**; empty cells keep faint dots like graph paper. Animated version: shapes scatter and regroup.
- Files: `brand/icon/uinimate-icon.svg` (paper), `…-blueprint.svg`, `…-animated.svg`, `…-animated-blueprint.svg`, `uinimate-app-icon.svg` (512 px, blueprint), `uinimate-app-icon-paper.svg`.
- Lockup: icon height 0.95 × wordmark font size, gap 0.35 em, shared baseline.
- Still at 32 px and below. Favicon = the still icon.

## 6. Colour

OKLCH is the source of truth; hex is the sRGB fallback. Light screens are **paper**, dark screens are **blueprint — never black**.

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--u-paper` | `#f5f8ef` | `oklch(0.975 0.012 120)` | Light background |
| `--u-paper-2` | `#ecf0e4` | `oklch(0.948 0.016 120)` | Surfaces on paper |
| `--u-ink` | `#142030` | `oklch(0.24 0.035 255)` | Text and lines on paper |
| `--u-muted` | `#515f6e` | `oklch(0.48 0.03 250)` | Secondary text |
| `--u-rule` | `#c3d5d6` | `oklch(0.86 0.02 200)` | Hairlines |
| `--u-blueprint` | `#143463` | `oklch(0.33 0.09 258)` | Dark background |
| `--u-blueprint-2` | `#0a254d` | `oklch(0.27 0.08 258)` | Surfaces on blueprint |
| `--u-chalk` | `#e3f1fb` | `oklch(0.95 0.02 240)` | Text and lines on blueprint |
| `--u-chalk-muted` | `#a3bbd0` | `oklch(0.78 0.04 245)` | Secondary text on blueprint |

**The ring** — 12 equal-tone pastels, `oklch(0.83 0.10 h)`, h = 0°…330° in 30° steps. For shapes, fills, highlights, chips and anything on blueprint. Text on the ring is always ink.

rose `#feacc5` · coral `#ffafa1` · apricot `#f8b884` · butter `#e0c579` · lime `#bfd186` · mint `#98daa5` · jade `#77ddca` · aqua `#71d9eb` · sky `#89d0ff` · iris `#aec5ff` · lilac `#d1b9ff` · orchid `#edb0e6`

**Ring deep** — `oklch(0.64 0.11 h)`, for small marks on paper (logo dots, icon, chart lines). Not for text.

rose `#c26e89` · coral `#c67164` · apricot `#bd7b41` · butter `#a68931` · lime `#849644` · mint `#579f68` · jade `#1ea28f` · aqua `#059eb1` · sky `#4494c8` · iris `#7288cf` · lilac `#977cc5` · orchid `#b273ac`

Tokens: `brand/tokens/tokens.css` (`--u-*` custom properties, includes Google Fonts import) and `brand/tokens/tokens.json`.

## 7. Typography

| Role | Face | Notes |
|---|---|---|
| Display (big words, headings, wordmark) | **Newsreader** 500, upright, `opsz` 72 at large sizes | Variable 200–800; italic only sparingly in prose, never in the logo |
| Specs, labels, annotations, code | **Space Mono** 400/700 | Labels 11 px caps +0.08em tracking |
| Body, docs, UI | **Inter** 400/500/600 | |

Scale: display-xl 96/1.0 (−0.015em) · display-l 64/1.05 · display-m 40/1.1 · heading 28/1.2 · body 16/1.6 · small 14/1.5 · spec 12 mono · label 11 mono caps. The big gap between a large serif word and tiny mono labels is the signature look — keep it.

## 8. Shapes — six primitives

Hard edges, flat fills, **no rounded corners, no shadows, no glass, no gradients** on shapes. Circles are circles; nothing else is rounded (`--u-radius: 0`). Proposed wayfinding map: circle = Animations · square = Primitives · rectangle = Components · hexagon = Sections · pentagon = Backgrounds · triangle = Shaders.

## 9. Annotations (the lab notebook)

Space Mono, 11–13 px, real values where possible.
- `[ key = value ]` — a measured property: `[ ∆t = 240ms ]`, `[ ø 48px ]`, `[ φ 1.618 ]`, `[ 1.2 kB ]`
- `Specimen U-###` — permanent catalogue number of a component: `Specimen U-017 · Wave`
- `Fig. ## — Name` — diagram or demo caption · `Plate III` — section of a page (roman numerals)
- Symbols (`∫ ∆ λ φ π ∞ ≈ ☉ ☽ ♄ H₂O`) are texture only, never required to understand content.

## 10. Visuals and patterns

- **Shape field** — ring-coloured primitives popping in and out around one big word (centre kept empty). `brand/patterns/shape-field-paper.svg`, `shape-field-blueprint.svg`.
- **Grids** — `blueprint-grid.svg` (80 px tile, 16 px minor), `paper-grid.svg`, `dot-grid.svg`.
- **Blueprint drawings** — dimension lines, construction circles, golden spiral, orbit diagrams, crystal lattice, Muybridge dot frames, flasks. Line art at ~25–30 % opacity behind content; never the subject. Public-domain engravings (Haeckel, botany, star charts) allowed at ~15 % contrast.
- **Easing as a graph** — every easing is plotted with axes `t` and `ƒ(t)` and its cubic-bezier values.
- **Specimen panels** — real UI components (button, toggle, progress, loader, slider) animating in a hard-edged panel, labelled like lab samples.

## 11. Motion

- Shapes **snap in with hard edges and settle with a spring**. Big words cut; small labels keep moving around them (typewriter stagger).
- No blur, no glassmorphism, no fades longer than 240 ms.
- Group stagger 40 ms. Every animation has a designed still state and respects `prefers-reduced-motion`.

| Token | Value | Use |
|---|---|---|
| `--u-dur-instant` | 120ms | hover, press |
| `--u-dur-quick` | 240ms | shapes in/out, small UI |
| `--u-dur-base` | 400ms | morphs, panels |
| `--u-dur-slow` | 700ms | big words, section reveals |
| `--u-dur-ambient` | 4800ms | background loops, logo cycle |
| `--u-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | entrances, morphs, logo |
| `--u-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | UI responses, hovers |
| `--u-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | loops, position changes |

## 12. Film and sound

- Brand film: `brand/film/uinimate-film-loop.mp4` — 23.8 s, 1920×1080, 60 fps, seamless loop (last frame = first frame). Website hero: autoplay, muted, loop, `playsinline`, poster frame, unmute control.
- Editable source: `brand/film/source/` (HyperFrames/OpenMotion HTML compositions).
- Sound: quiet, slow, ambient lo-fi (warm pads, soft electric piano, vinyl crackle, ~80 BPM, Fmaj9–Em7–Dm9–Cmaj9) plus soft motion sounds (ticks, pops, mallets, swells). `brand/film/uinimate-music-loop.m4a`.

## 13. Applying the brand — checklist

1. Background: paper (light) or blueprint (dark). Never pure black or pure white.
2. One big Newsreader word or line per screen/section; tiny Space Mono annotations around it.
3. Colour comes from the ring; small marks on paper use ring-deep; text is ink or chalk.
4. Shapes are the six primitives with hard edges.
5. Add one measured annotation (`[ … ]`, `Specimen U-…`, `Fig.`) where it carries real information.
6. Motion uses the tokens: spring entrances, 40 ms stagger, reduced-motion fallback.
7. Copy is short, active and specific; no hype words.
8. Logo: living i, upright, ink on paper or chalk on blueprint, baseline kept.

## 14. Files

```
brand/
├── brand-guide.html          visual brand guide
├── tokens/tokens.css|json    design tokens (--u-*)
├── logo/uinimate-logo.css    living-i logo (HTML + CSS)
├── icon/*.svg                particle-u icon (still, animated, app icons)
├── patterns/*.svg            shape fields, grids
└── film/                     brand film loop, music, editable source
```
