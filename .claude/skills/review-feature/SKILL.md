---
name: review-feature
description: Review a storefront feature (new or changed) against the PULSE Definition of Done — architecture boundaries, styled-components/theme usage, i18n, axios data layer, types, accessibility, tests, and build health. Use before merging a feature, after building one with the create-feature skill, or when asked to audit or QA a feature in src/.
---

# Review a feature against the Definition of Done

Adversarial review: your job is to find what's wrong or missing, not to rubber-stamp.
The full checklist is in [definition-of-done.md](./definition-of-done.md) — read it
first; it is the source of truth for what "done" means.

## Procedure

1. **Scope the change.** Identify the feature folder(s) and files under review
   (e.g. `git diff --stat`, or the `src/features/<name>/` tree). Read the feature's
   `index.ts` barrel, its `api/`, `state/`, `hooks/`, and every component + its
   `.styles.ts`.

2. **Walk the Definition of Done top to bottom.** For each item, verify against the
   actual code — don't assume. Common violations to hunt for:
   - Imports reaching **into another feature's internals** (any `@features/x/...`
     path deeper than the barrel, or a relative `../../<other-feature>/...`).
   - Cross-feature logic that was dropped inside one feature instead of `shared/`.
   - `styled` calls left in a `.tsx` instead of the sibling `.styles.ts`.
   - Hard-coded colours/spacing/radii/durations where a **theme token** exists.
   - Non-transient style props leaking to the DOM (should be `$`-prefixed).
   - **Hard-coded user-facing strings** (missing from `strings.ts`, or only added in
     one of `ru`/`en`); money not formatted with `formatRub`.
   - Direct `axios`/`fetch` calls instead of `request()` from `@shared/api/client`.
   - Providers that don't boot-gate / handle the error + loading states.
   - `any`, unchecked casts, or `@ts-ignore`; missing/❌ types.
   - Missing tests (component/hook and, for user journeys, e2e).
   - Dead code, stray `console.log`, leftover scaffolding or temp files.

3. **Verify build health yourself:**
   ```bash
   yarn typecheck   # must be clean
   yarn build       # must succeed
   yarn test:run    # if configured
   ```

4. **Report.** Produce a checklist verdict grouped by DoD section. For each finding:
   - `PASS` / `FAIL` / `N/A`
   - a `file:line` reference
   - the concrete problem and a suggested fix
   Lead with the blocking issues (architecture-boundary breaks, build failures,
   missing i18n) before nits. End with a one-line **overall: ready / not ready**.

Be specific and cite lines — a review that says "looks good" without evidence is a
failed review. If asked, apply the fixes after reporting; otherwise stop at the
report and let the user decide.
