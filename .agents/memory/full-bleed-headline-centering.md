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
`w-screen max-w-none text-center`. Size with `vw`. Calibration: a ~12-char uppercase
Montserrat-ExtraBold line at ~9.3vw / 0.15em tracking lands ~86vw (reads visibly *inset*,
not full-bleed — the earlier "near 100vw" claim was optimistic). To actually touch both
edges, bump size and/or tracking (e.g. mobile ~9.6vw / 0.2em ≈ ~95vw) and lock the desktop
value behind `md:` so each breakpoint is tuned independently.

**Scramble caveat:** a `DecodeText` headline's scramble frames are ~the same width as the
final text (the random charset's average glyph advance ≈ the final text's), so widening for
full-bleed widens the scramble too — there's no free lunch. Leave ~3vw of side buffer
(final ≈ 94-95vw, not 100) or the widest scramble frames clip at the edges under
`overflow-hidden`. Keep `pl-[Xem]` in sync with `tracking-[Xem]` to keep it centered.
