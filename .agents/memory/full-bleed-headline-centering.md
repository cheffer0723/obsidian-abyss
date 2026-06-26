---
name: Full-bleed (w-screen) element centering inside a centered container
description: Why a 100vw child inside a centered max-width container needs no left-1/2 / -translate-x-1/2
---

# Full-bleed child inside a centered container

When a child is `w-screen` (100vw) and sits inside a horizontally-centered parent
(e.g. Tailwind `container mx-auto` with `flex flex-col items-center`), the flex
`items-center` already centers the 100vw child on the viewport — its center lands on the
parent's center, which equals the viewport center. It overflows both sides equally.

**Do NOT also add `relative left-1/2 -translate-x-1/2`.** That break-out technique is for a
*block-level* child in a constrained parent. On a flex-centered child it applies a SECOND
offset: `left:50%` resolves to 50% of the (capped) container content width, while
`translateX(-50%)` is 50% of 100vw. These only cancel when container width == viewport
width (≈ at the exact breakpoint, e.g. 1280px). On any wider viewport the child shifts left
by ~half the container inset and clips asymmetrically despite `overflow-hidden`.

**Why:** caught after a hero headline looked centered at 1280px but was visibly mis-centered
at 1600px; the architect flagged the redundant transform.

**How to apply:** for a full-bleed line in a flex-centered column, use just
`w-screen max-w-none text-center`. Size with `vw` (≈9.3vw for a ~12-char uppercase line) and
keep the final text a little under 100vw so on-load decode/scramble frames with
variable-width glyphs don't clip at the edges.
