---
name: SVG gradient IDs must be instance-safe
description: Why inline-SVG visual components in obsidian-abyss must use useId() for gradient/filter ids
---

# SVG gradient/filter IDs need useId() in responsive-duplicated components

Any component that defines `<linearGradient>`/`<radialGradient>`/`<filter>` with a hard-coded `id` and references it via `fill="url(#id)"` will produce **duplicate document IDs** if the component is rendered more than once on the same page.

**Why:** This codebase renders the same visual twice for responsive layouts — e.g. the section visual appears once in a `lg:hidden` mobile block and once in a `hidden lg:block` desktop block. Both instances emit identical `<defs>` ids. Duplicate IDs are invalid HTML and can cause the browser to resolve `url(#id)` against the wrong (first) instance, leading to gradients that silently break or detach.

**How to apply:** In any inline-SVG component, generate a unique prefix with React's `useId()` and template every def id + reference: `const gid = useId();` then `id={`${gid}-cone`}` and `fill={`url(#${gid}-cone)`}`. Components that take a caller-supplied unique id prop (e.g. a per-item `gradId`) or that are guaranteed to render exactly once are already safe, but `useId()` is the no-think default.
