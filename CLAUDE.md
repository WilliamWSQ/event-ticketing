## Folder structure: feature-based

Organize `src/` by feature, not by file type.

- `src/features/<feature>/` owns everything for a domain capability:
  `components/`, `hooks/`, `api/`, state slice, and an `index.ts` that is the
  feature's ONLY public surface.
- `src/pages/` is thin. A page composes features and arranges layout. It owns
  no domain logic or API calls.
- `src/shared/` is for things with no domain owner: UI primitives, the
  configured API client + interceptors, generic utils, the Xsolla SDK wrapper.
- `src/app/` holds router, providers, store setup.

Rules:
- A page is a route; a feature is a capability. They are different axes.
  Multiple pages may share one feature (e.g. Login + Signup -> `auth`).
- Never import another feature's internals. Import only from its `index.ts`.
  If you need a feature's internal, either expose it via the barrel or the
  code belongs in `shared/`.
- If logic is used by more than one feature, it goes in `shared/`, not inside
  whichever feature happened to need it first.
- When adding a screen, decide first whether it's a new feature or composes
  existing ones. Default to reusing a feature before creating one.

## Dev servers & ports: clean up after yourself

When you start a dev server or backend to test something (storefront `:5173`,
admin `:5174`, backend `:4000`, or any port like `:3000`), stop it and free the
port when you're done. Don't leave processes running for the user to kill by hand.

- Only kill processes **you started** in this session. Never kill an unrelated
  server you didn't launch — surface it to the user instead and let them decide.
- Typical cleanup: `lsof -nP -iTCP:<port> -sTCP:LISTEN` to find the PID you
  started, then `kill <pid>`. Prefer stopping the background task you launched.