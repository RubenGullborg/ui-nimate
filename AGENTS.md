# Uinimate — notes for AI agents

Uinimate is a framework-agnostic, dependency-free library of animated UI ("a laboratory of motion"). This file is for any AI coding assistant (Claude, Codex, Cursor, Copilot, Gemini…).

## Brand first

Before you design, write copy, animate or review anything user-facing, read **`skills/uinimate-brand/SKILL.md`**. It is the single, self-contained brand reference: concept, voice, logo, icon, colours, type, shapes, annotations, motion tokens and a checklist. Asset files live in `brand/`.

## Repo layout

```
packages/core/     the library (npm: uinimate) — plain CSS + SVG, no runtime dependencies
  src/tokens.css   design tokens (--u-*)
  src/specimens/   one folder per specimen: u-###-name/{name}.css + README.md
apps/site/         Astro site (docs, playground, hero film). Brand assets synced from brand/ at dev/build.
brand/             brand kit: tokens, logo, icon, patterns, brand guide, film (+ editable source)
skills/            agent skills (uinimate-brand). Claude Code loads it via .claude/skills/
```

## Rules for library code (`packages/core`)

- No runtime dependencies. CSS and SVG first; tiny vanilla TS only when CSS can't do it.
- Every specimen: catalogue number (`U-###`), tunable CSS custom properties prefixed `--u-<name>-`, a still state, `prefers-reduced-motion` support, no layout shift (animate transform, opacity, clip-path).
- Each specimen folder has a README with usage, a tuning table and a "Manners" section.

## Commands

```bash
pnpm install
pnpm dev      # site at http://localhost:4321
pnpm build
```
