---
name: create-feature
description: Scaffold or extend a feature in the PULSE storefront (src/features/<name>) following the repo's feature-based architecture — api / state / hooks / components + a barrel index.ts, styled-components with the typed theme, i18n, and the axios client. Use when adding a new domain capability, a new screen, or new behaviour to the storefront in src/.
---

# Create / extend a storefront feature

Storefront only (`src/`) — **not** `backend/` or `adminPanel/`. Rules come from
`CLAUDE.md`; **`src/features/catalog/` is the canonical example — read it and mirror
it.** Each rule below maps to a real file, cited inline.

## Quick steps

1. **Decide** — reuse/extend an existing feature, or create a new one? (§ Decide)
2. **Scaffold** `src/features/<feature>/`: `api/`, `state/` (only if it owns data),
   `hooks/` (only if there's data to derive), `components/<Comp>/`, and the
   `index.ts` barrel.
3. **Wire up** — i18n keys (ru+en), provider + route into `src/app/App.tsx`, thin
   page in `src/pages/`.
4. **Verify** — `yarn typecheck && yarn build`; then `write-tests` + `review-feature`.

## Decide first

- **Feature = capability** (catalog/booking/account); **page = route**. Different
  axes — many pages can share one feature.
- **Default to reusing** a feature; create a new one only if no existing feature
  owns the capability.
- Logic used by **>1 feature** → `src/shared/`, not inside whichever needed it first.
- New screen? Decide whether it's a new feature or just a new `src/pages/*` page
  composing existing ones.

## Folder layout

```
src/features/<feature>/
  api/<feature>.api.ts        # HTTP via @shared/api/client — effectively always present
  state/<Feature>Provider.tsx # only if it owns fetched/shared state
  hooks/use<Thing>.ts         # derived/localized data, view logic — only if needed
  components/<Comp>/           # <Comp>.tsx + <Comp>.styles.ts + index.ts (see Components)
  index.ts                     # barrel — the feature's ONLY public surface
```

## Boundaries

- The **barrel `index.ts` is the only public surface** — re-export the
  provider + hook, hooks, and components. Nothing outside the feature imports a path
  deeper than the barrel.
- **Never import another feature's internals** — only its `index.ts`. Need an
  internal? Expose it via that barrel, or move the code to `shared/`.
- Cross-boundary imports use aliases (`@app` / `@pages` / `@features` / `@shared`);
  imports **within** a feature are relative (`../api/x.api`, `../../state/XProvider`).

## API — `api/<feature>.api.ts` (see `catalog.api.ts`, `booking.api.ts`)

- **Never call `axios`/`fetch` directly** — use `request()` from
  `@shared/api/client` (baseURL `/api`, interceptor surfaces the server's `{ error }`;
  Vite proxies `/api` → Express :4000). E.g. `request<Foo[]>({ url: '/foos' })`,
  `request<Foo>({ method: 'post', url: '/foos', data })`.
- Domain types shared across features → `src/shared/types.ts`. Response shapes
  private to one feature → that feature's `api/` module (e.g. `booking.api.ts`'s
  `Quote` / `OrderResult`).

## Components — `components/<Comp>/` (see `GenreFilter/`)

- **Component-as-folder:** `<Comp>.tsx` + `<Comp>.styles.ts` + `index.ts` (which is
  just `export * from './<Comp>';`) so external `./<Comp>` resolves to the folder.
- `<Comp>.tsx` does `import * as S from './<Comp>.styles'` and renders `<S.Root>`;
  pull copy from `useI18n()`.
- **All styles live in `<Comp>.styles.ts`** — no `styled` calls in `.tsx`.
- **Use theme tokens, never hard-coded values,** for anything the theme defines:
  `color`, `line`, `grad`, `font`, `radius`, `shadow`, `ease`, `dur`, `layout`
  (source: `src/shared/theme/theme.ts`, typed via `styled.d.ts`).
- Style-only props are **transient** — prefix `$` (`$active`, `$variant`) so they
  don't leak to the DOM.

## State provider — `state/<Feature>Provider.tsx`, only if it owns data (mirror `CatalogProvider` / `BookingProvider`)

- **Boot-gated:** fetch on mount with a `cancelled` guard; return
  `<BootSplash error={…} />` on failure and `<BootSplash />` while loading.
- `createContext<Value | null>(null)`; `useMemo` the value; expose `use<Feature>()`
  that **throws** if used outside its provider; put
  `// eslint-disable-next-line react-refresh/only-export-components` above that hook.
- Derived/localized data → `hooks/` (see `useConcert.ts`): read provider + `useI18n()`,
  `useMemo` the result, localize via `@shared/i18n` (`localizeConcert` / `localizeTier`).

## i18n — RU-default / EN

- **Never hard-code user-facing text.** Add keys to `src/shared/i18n/strings.ts`
  (both `ru` **and** `en`), read via `const { t } = useI18n()`. Money → `formatRub`
  (₽). `useI18n()` also gives `{ lang, fmt, setLang, toggle }`.

## Wire up

- **Provider** → add to `src/app/App.tsx`, outermost-first (i18n → catalog →
  booking → …); boot-gating providers must wrap the routes that need them.
- **Page** → a thin `src/pages/*` component that composes features + arranges layout,
  with **no** domain logic or API calls; multi-file pages use component-as-folder
  (see `DiscoverPage/`, `ConcertPage/`). Register the route in `<Routes>` in `App.tsx`.

## Finish

`yarn typecheck` (clean) and `yarn build` (succeeds). Then run `review-feature` and
add tests via `write-tests` — a feature isn't done until it passes the Definition of
Done.
