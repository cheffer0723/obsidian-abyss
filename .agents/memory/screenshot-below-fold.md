---
name: Screenshotting below-the-fold sections (obsidian-abyss)
description: Why the screenshot tool can't reach lower sections of the landing page, and the reliable workaround.
---

# Capturing below-the-fold sections in obsidian-abyss

The app-preview screenshot tool captures from the **top of the page only**, takes no
scroll input, and runs in a **fresh browser session each call**.

Two things make lower sections unreachable by default:
- The Hero is `min-h-screen`, so it always fills exactly one viewport height. A taller
  `viewport_size` just scales the hero to fill — the next section still starts right at
  the bottom edge, out of frame.
- Hash navigation (`/#engine`) does **not** auto-scroll on initial SPA load (the anchor
  isn't laid out yet when the browser tries to jump). Tried it; it stayed on the hero.
- A full-screen intro overlay (`intro-reveal.tsx`) shows on every fresh session and
  locks body scroll.

**Reliable workaround to verify a lower section:**
1. Temporarily reorder `src/pages/home.tsx` so the target section is rendered first
   (e.g. `<LiveEngine/>` before `<Hero/>`), Vite HMR picks it up on fresh load.
2. Screenshot `/?nointro` at a normal-to-tall viewport.
3. Restore the original section order afterward.

**Intro skip hatch:** `intro-reveal.tsx` honors `?nointro` but only when
`import.meta.env.DEV` is true (parsed via `URLSearchParams`), so it never affects
production users. Always need `?nointro` for screenshots or the intro overlay blocks
the view.

**Why:** repeated tall-viewport and hash-nav screenshots wasted calls before landing on
the reorder approach.
