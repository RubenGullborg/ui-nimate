# Uinimate — notes for AI agents

Uinimate is a framework-agnostic, dependency-free library of animated UI ("a laboratory of motion"). This file is for any AI coding assistant (Claude, Codex, Cursor, Copilot, Gemini…).

## Brand first

Before you design, write copy, animate or review anything user-facing, read **`skills/uinimate-brand/SKILL.md`**. It is the single, self-contained brand reference: concept, voice, logo, icon, colours, type, shapes, annotations, motion tokens and a checklist. Asset files live in `brand/`.

## Repo layout

```
packages/core/     the library (npm: uinimate) — plain CSS + SVG, no runtime dependencies
  src/tokens.css   design tokens (--u-*)
  src/components/  one folder per component: <slug>.html, <slug>.css, meta.json, README.md
  meta.schema.json the meta.json contract
apps/site/         Astro site (docs, playground, hero film). Brand assets synced from brand/ at dev/build.
brand/             brand kit: tokens, logo, icon, patterns, brand guide, film (+ editable source)
skills/            agent skills. Claude Code loads them via .claude/skills/
  uinimate/             for anyone adding Uinimate components to their own project
  uinimate-components/  the contract for building components in this repo
  uinimate-brand/       Uinimate's own brand
```

## Rules for library code (`packages/core`)

Read **`skills/uinimate-components/SKILL.md`** before creating or changing a component. In short: no runtime dependencies; state comes from an ARIA attribute with a `data-state` twin; variants via `data-variant`; tunables `--u-<slug>-*` read with fallbacks, never declared; reduced motion, visible focus, no layout shift. Scaffold with `pnpm new`, validate with `pnpm check`. When you add a component, also add it to the table in `skills/uinimate/SKILL.md` (`pnpm check` enforces this).

## Commands

```bash
pnpm install
pnpm dev      # site at http://localhost:4321
pnpm build
pnpm new <slug> "<Name>"   # scaffold a component
pnpm check                 # validate components against the contract
```
