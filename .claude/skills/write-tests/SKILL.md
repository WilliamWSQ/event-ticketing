---
name: write-tests
description: Write tests for the PULSE storefront — Vitest + Testing Library for unit/component/hook tests (co-located X.test.tsx), and Playwright for end-to-end flows in e2e/. Use when adding tests for a feature, covering a bug with a regression test, or setting up the test tooling for the first time.
---

# Write tests (PULSE storefront)

| Layer | Tooling | Scope | Location |
|-------|---------|-------|----------|
| Unit / component / hook | **Vitest** + `@testing-library/react` | one component / hook / util in isolation, **API mocked** | `X.test.tsx` co-located with the source |
| End-to-end | **Playwright** | real user flows through the running app, **real backend** | `e2e/*.spec.ts` |

**Principles:** test behaviour through the public surface (a feature's barrel, rendered
output), not internals. Fixing a bug → write the failing test first. Every new/changed
feature ships unit/component tests for its components + hooks, plus an e2e spec for
anything on a user journey — part of the Definition of Done (`review-feature`).

## Quick steps

1. Tooling set up? (`test` / `e2e` scripts in `package.json`) If not → **First-time setup**.
2. Unit/component/hook → co-located `X.test.tsx`, render via `renderWithProviders`,
   mock the feature's `api/*.api.ts`.
3. User journey → `e2e/*.spec.ts` (needs backend on :4000).
4. Run `yarn test:run` / `yarn e2e`.

## First-time setup (once; skip if `test`/`e2e` scripts already exist)

**Vitest + Testing Library**
```bash
yarn add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```
Add to `vite.config.ts` (reuses the `@`-aliases already defined there):
```ts
/// <reference types="vitest" />
  test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts', css: true },
```
`src/test/setup.ts` → `import '@testing-library/jest-dom/vitest';`
Scripts → `"test": "vitest"`, `"test:run": "vitest run"`.

**Playwright**
```bash
yarn add -D @playwright/test && npx playwright install chromium
```
`playwright.config.ts` (repo root) — starts the storefront; **the backend must be
running on :4000** because e2e hits real data:
```ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:5173', trace: 'on-first-retry' },
  webServer: { command: 'yarn dev', url: 'http://localhost:5173', reuseExistingServer: true },
});
```
Scripts → `"e2e": "playwright test"`, `"e2e:ui": "playwright test --ui"`. Artifacts
(`/test-results`, `/playwright-report`, …) are already git-ignored; shared data →
`e2e/fixtures/`.

## Component / hook tests (Vitest)

The app renders inside `ThemeProvider` + `I18nProvider` + router, and most components
read the theme and `useI18n()` — wrap the unit under test in the same context. Add
`src/test/render.tsx` (import it via a `@test` alias added alongside the others, or
relatively):
```tsx
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nProvider } from '@shared/i18n';
import { theme } from '@shared/theme/theme';
import type { ReactElement } from 'react';

export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <I18nProvider><MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter></I18nProvider>
    </ThemeProvider>,
  );
}
```
**Mock the API layer, not axios** — mock the feature's `api/*.api.ts` (or
`@shared/api/client`) so tests never hit the network:
```tsx
import { describe, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@test/render';

vi.mock('@features/catalog/api/catalog.api', () => ({
  catalogApi: { listConcerts: vi.fn().mockResolvedValue([/* fixtures */]) },
}));

describe('GenreFilter', () => {
  it('activates the clicked chip', async () => {
    renderWithProviders(<GenreFilter />); // wrap in <CatalogProvider> if it needs provider data
    await userEvent.click(screen.getByRole('button', { name: 'Techno' }));
    // assert the active state via rendered output
  });
});
```
Rules:
- Query by **role / accessible name / visible text**, not class or test-id (add a
  meaningful handle if none exists).
- Assert **behaviour and rendered output**, not styled-components internals.
- Copy is bilingual — assert against `strings.ts` keys or set the language explicitly;
  don't hard-code a Russian string that breaks when copy changes.
- Test hooks (`useConcert`, `useQuote`) with `renderHook`, wrapped in the same providers.

## End-to-end tests (Playwright)

Cover **whole flows**; the booking funnel is highest-value:
```ts
// e2e/booking.spec.ts
import { test, expect } from '@playwright/test';
test('browse → concert → checkout → ticket', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /PULSE FESTIVAL/i })).toBeVisible();
  await page.getByRole('link', { name: /Нина Кравиц/ }).first().click();
  await expect(page).toHaveURL(/\/concert\//);
  // …select tier → checkout → confirm → assert /ticket shows the order…
});
```
Rules:
- Prefer role/text locators + web-first assertions (`await expect(...).toBeVisible()`)
  over manual waits.
- e2e reads **real seeded Postgres data** — assert on stable facts (a concert exists,
  pricing = subtotal + 12% fees), not brittle exact counts.
- Keep specs independent; reset any state they create.

## Run

```bash
yarn test        # Vitest watch
yarn test:run    # Vitest once (CI)
yarn e2e         # Playwright (needs backend on :4000)
```
