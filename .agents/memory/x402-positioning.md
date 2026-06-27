---
name: x402 / agent-payable positioning
description: How the obsidian-abyss landing page may talk about x402 while the front-end is not yet wired to the live backend.
---

# x402 positioning vs. live wiring

The obsidian-abyss front-end is NOT wired to the live Railway backend. The
"PAY PER SIGNAL" Agents section (`src/components/sections/agents.tsx`) must stay
framed as **capability / illustrative**, not a present-tense live claim. The
endpoint path, price, and pay-to address shown in the handshake terminal are
invented examples and are explicitly captioned "illustrative — example endpoint,
price & address".

**Why:** Architect flagged copy that implied x402 was already live as a publish
blocker. The user confirmed a real backend IS live on Railway, but only the
*original* site consumes it "until we finish" — this new SPA is separate and not
connected yet. Overclaiming a live integration on an unconnected page is
misleading.

**How to apply:** Keep "built to speak x402 … can be priced/paid", "Request API
Access", "private beta" framing until the page is actually wired. For stage-2
live wiring, get from the user first: Railway base URL, real endpoint specs,
auth (store via Replit secrets / environment-secrets skill), and a CORS/proxy
plan (the `artifacts/api-server` artifact could proxy). Only then shift copy to
present tense and swap the illustrative example values for real ones.
