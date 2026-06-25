---
name: Screenshot tool vs. time-delayed animations
description: Why animated/decoded text can look blank in app_preview screenshots, and how to verify it
---

# Screenshot tool spawns a fresh browser session each call

The `screenshot` (app_preview) tool opens a brand-new browser session every time, so any
time-delayed or progress-based animation (text decode/scramble, staggered fade-ins, counters)
**restarts from frame zero** and is usually captured mid-flight.

**Symptom seen here:** an on-load decode headline ("BEAR WITNESS") appeared completely blank in
every screenshot because the decode component had a pre-reveal `delay` window during which it
rendered empty spaces.

**Lesson / how to apply:**
- Don't conclude an animated element is broken just because a screenshot shows it blank/partial —
  it may simply be caught before it resolves.
- Initialize animated text to a non-blank state (e.g. render scrambled glyphs during the delay
  window, not empty strings) so the first paint and every screenshot show *something*.
- To confirm final state, reason from the animation code (does progress reach 1 and lock the final
  value?) rather than relying on a single screenshot. Add `prefers-reduced-motion` handling that
  jumps straight to the resolved text for accessibility + deterministic capture.
