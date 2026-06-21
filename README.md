# PULSE — Concert Booking

A dark, neon, bilingual (RU / EN) concert-ticketing front-end for the Russian
market, built in React from the `design_handoff_pulse_concert_booking` design
reference. Prices are in rubles (₽); Russian is the default language and the
entire UI — chrome _and_ concert content — re-localizes live.

## Stack

- **Vite** + **React 18** + **TypeScript** (strict)
- **React Router** for the booking-flow routes
- **CSS Modules** + a global design-token stylesheet (no CSS framework)
- **lucide-react** for icons
- Fonts via Google Fonts: **Unbounded** (display), **Inter** (body),
  **JetBrains Mono** (mono)

## Getting started

```bash
yarn            # install dependencies
yarn dev        # http://localhost:5173
yarn build      # type-check (tsc -b) + production build
yarn preview    # serve the production build
```

## Routes / screens

| Route                  | Screen                                  |
| ---------------------- | --------------------------------------- |
| `/`                    | Discover (home) — hero, filters, grid   |
| `/concert/:id`         | Concert details                         |
| `/concert/:id/seats`   | Pick zone & quantity                    |
| `/checkout`            | Checkout (card / wallet / crypto)       |
| `/ticket`              | Ticket / confirmation                   |
| `/account`             | Account                                 |

Shared booking state (language, selected concert, tier, quantity, payment
method, order id, search) lives in [`BookingContext`](src/context/BookingContext.tsx)
so it persists across the flow. Navigation resets scroll to the top and each
screen plays a subtle rise-in.

## Project structure

```
src/
  data/          concerts (8) + tiers (4) — language-neutral fields + ru/en content
  i18n/          strings table (ru/en), typed
  context/       BookingContext — state, derived totals, navigation actions
  hooks/         useOnClickOutside, useScrolled, useReducedMotion, useConcertParam
  lib/           currency formatting, localization merge, cn helper
  components/
    ui/          Button, Logo, Equalizer, QRCode, Toggle, BackButton
    layout/      Nav, SearchBar, LanguageToggle, AmbientBackground, Layout
    ConcertCard
  screens/       Home, Details, Seats, Checkout, Ticket, Account (+ CSS modules)
  styles/        tokens.css (design system) + global.css (reset, keyframes)
```

## Notable decisions

- **Headline font is Unbounded, not Space Grotesk.** The Xsolla display face
  (Sharp Grotesk) and its free substitute (Space Grotesk) lack Cyrillic glyphs.
  Since Russian is the default language, headlines use Unbounded (Cyrillic ✓),
  as the design handoff requires.
- **i18n is a small typed context**, not a library — the prototype ships a flat
  `ru`/`en` string table, so a dependency-free context keeps it simple. Keys are
  the catalogue ids if this moves to a translation service later.
- **Currency** is `Intl.NumberFormat` via `toLocaleString` — ₽ in both
  languages, only digit grouping changes (`3 500` vs `3,500`).
- **Ambient motion** (particle canvas, breathing glows, equalizers, shimmer)
  respects `prefers-reduced-motion`: the canvas is skipped and looping CSS
  animations are neutralized.
- **The QR code is decorative** — a deterministic glyph seeded by the order id,
  matching the prototype. Swap for a real encoder (e.g. `qrcode.react`) once
  tickets carry a real token.
- **No backend.** Concerts, tiers, the card/wallet/crypto forms and the order id
  are mocked client-side. `API.md` from the handoff was intentionally not wired
  up yet.
