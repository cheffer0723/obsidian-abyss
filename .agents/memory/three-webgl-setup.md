---
name: three.js / R3F setup in obsidian-abyss
description: Non-obvious dependency + integration facts for the WebGL hero so future 3D work doesn't re-discover them.
---

# three.js + React Three Fiber in obsidian-abyss

- `three` (r185) does **NOT** bundle its own TypeScript types. You must add `@types/three` as a devDependency or `tsc` fails with `TS7016: Could not find a declaration file for module 'three'`.
  - **Why:** earlier assumption was that modern three ships types; it doesn't here.
  - **How to apply:** any time three is (re)installed in a workspace package, also `pnpm --filter <pkg> add -D @types/three`.
- Install into the specific workspace, not root: `pnpm --filter @workspace/obsidian-abyss add three @react-three/fiber`. Package installs/removes reboot ALL workflows, so restart `artifacts/obsidian-abyss: web` afterward and expect a Vite "Re-optimizing dependencies" pass.
- `@react-three/fiber@9` pairs with React 19 (the repo's catalog react). No `@types/three`-style issue for fiber; it ships types.
- The WebGL hero is progressive enhancement, not a replacement: PNG `heroBg` stays as the base layer; the lazy `hero-abyss-scene.tsx` only mounts when not reduced-motion, pointer is fine, width >=768, and WebGL is supported, then fades in over the PNG. A `SceneErrorBoundary` reverts to PNG if the Canvas throws.
- `CanvasTexture` created in the scene must be disposed manually (done via a `useDotTexture` hook returning a cleanup); R3F auto-disposes geometries/materials it created, but not textures you `new`.
