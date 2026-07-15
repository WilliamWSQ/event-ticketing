# Definition of Done — PULSE storefront feature

A feature in `src/features/<name>/` (and the page/route that consumes it) is "done"
only when **every** applicable item below holds. Items map to the conventions in
`CLAUDE.md` and the `create-feature` / `write-tests` skills.

## 1. Architecture & boundaries
- [ ] Lives in the right axis: a **feature** = a capability; a **page** = a route.
      New screens reuse an existing feature unless the capability is genuinely new.
- [ ] The feature owns its slice end-to-end (`api/`, and as needed `state/`,
      `hooks/`, `components/`) — nothing domain-specific leaks into `src/pages/`.
- [ ] Pages are thin: compose features + arrange layout, **no** domain logic or API
      calls.
- [ ] Logic used by more than one feature lives in `src/shared/`, not inside one
      feature.

## 2. Public surface
- [ ] Everything consumed from outside is exported from the feature's `index.ts`.
- [ ] No import reaches into another feature's internals — **only** its `index.ts`.
- [ ] Cross-boundary imports use aliases (`@app` / `@pages` / `@features` /
      `@shared`); intra-feature imports are relative.

## 3. Styling (styled-components + theme)
- [ ] All styles are in the sibling `<Comp>.styles.ts`, imported as
      `import * as S from './<Comp>.styles'`. No `styled` calls in `.tsx`.
- [ ] Components follow component-as-folder: `<Comp>/{<Comp>.tsx, <Comp>.styles.ts,
      index.ts}` with `index.ts` = `export * from './<Comp>'`.
- [ ] Theme tokens are used for every value the theme defines (`color`, `line`,
      `grad`, `font`, `radius`, `shadow`, `ease`, `dur`, `layout`) — no magic values.
- [ ] Style-only props are transient (`$`-prefixed) and don't leak to the DOM.

## 4. Internationalisation
- [ ] No hard-coded user-facing copy — all text comes from `strings.ts` via
      `useI18n()`.
- [ ] Every new key exists in **both** `ru` and `en`.
- [ ] Money is formatted with `formatRub` (₽); localized data uses
      `localizeConcert` / `localizeTier`.

## 5. Data layer (axios)
- [ ] HTTP goes through `request()` from `@shared/api/client` — no direct
      `axios`/`fetch`. Paths are relative to `/api`.
- [ ] Feature API lives in `api/<feature>.api.ts`; shared domain types in
      `src/shared/types.ts`.
- [ ] Providers that fetch are boot-gated: handle **loading** (`<BootSplash />`) and
      **error** (`<BootSplash error=… />`) states; fetch effects guard against
      setting state after unmount (`cancelled` flag).
- [ ] `use<Feature>()` throws a clear error when used outside its provider.

## 6. Types
- [ ] Compiles under `tsc -b` with no errors and no `any` / `@ts-ignore` /
      unchecked casts introduced.
- [ ] Exported functions/components have explicit, honest types.

## 7. Accessibility & UX
- [ ] Interactive elements are real controls (`button`/`a`/labelled inputs) with
      accessible names; keyboard-usable.
- [ ] Respects existing patterns (e.g. `useReducedMotion`) where relevant.
- [ ] Loading and error states are visible to the user, not silent.

## 8. Tests (see `write-tests` skill)
- [ ] Component and hook tests (Vitest + Testing Library) cover the feature's
      behaviour with the API mocked.
- [ ] Anything on a user journey has a Playwright e2e spec.
- [ ] A fixed bug ships with a regression test that failed before the fix.

## 9. Health & hygiene
- [ ] `yarn typecheck` and `yarn build` pass.
- [ ] `yarn test:run` / `yarn e2e` pass (once configured).
- [ ] No dead code, commented-out blocks, stray `console.log`, or leftover
      scaffolding/temp files.
- [ ] Wiring complete: provider added to `App.tsx` in the correct order, route
      registered, page composed.
