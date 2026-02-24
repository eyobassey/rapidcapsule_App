# Rapid Capsule Mobile App — Agent Guide

**Purpose:**  
This document is for automated agents (and humans) working on the **Rapid Capsule** mobile app.  
It explains how the app is structured, how to run it, and how to approach tasks while following
project conventions and industry best practices.

---

## 1. High-Level Context

- **Platform:** React Native + Expo (SDK 54), TypeScript, Expo Router.
- **State:** React Query for server state, Zustand for client state.
- **Styling:** `react-native-unistyles` with theme + breakpoints.
- **Native deps:** Reanimated, MMKV, Skia, edge-to-edge, dev client.
- **Package manager:** `pnpm` with strict dependency controls.
- **Docs:** All architecture and usage docs live under `docs/`.

Always prefer **reading existing docs and code** before introducing new patterns.

Key docs:

- `README.md` — project overview & scripts.
- `docs/README.md` — documentation index.
- `docs/architecture/*` — service layer, state mgmt, component strategy.
- `docs/guides/native-dev-client.md` — native/dev-client, Babel, icons.
- `docs/guides/components.md`, `docs/guides/utilities.md`, etc. — implementation details.

---

## 2. Running the App

### 2.1 Install & prebuild

```bash
pnpm install
npx expo prebuild      # when native deps or app.json change
```

Run prebuild when:

- You change `app.json` (icons, name, bundle IDs, plugins, etc.).
- You add/remove/upgrade native modules (Reanimated, Unistyles, MMKV, Skia, Expo native libs).

### 2.2 Dev client workflow (preferred)

```bash
# Build & install native dev client
pnpm ios         # or: pnpm android

# Start Metro in dev-client mode
pnpm start:dev-client
```

Use this path for anything involving native modules (which is most work here).

### 2.3 Expo Go (only for simple JS-only changes)

```bash
pnpm start
```

Use **only** when you are sure no native code or config is impacted.

---

## 3. Key Configuration Files

- `app.json`
  - `expo.name`: user-facing name (**Rapid Capsule**).
  - `expo.icon`: `./assets/logomark.png`.
  - `android.adaptiveIcon.*`: uses `logomark.png` including `monochromeImage`.
  - `plugins`: keep in sync with installed native plugins (currently `expo-router`, `expo-tracking-transparency`).

- `babel.config.js`
  - Uses `babel-preset-expo`.
  - Plugins in this order:
    1. `expo-router/babel`
    2. `module-resolver` with `@` aliases (must match `tsconfig.json`).
    3. `react-native-unistyles/plugin`
    4. `react-native-worklets/plugin` (Reanimated; must be last).

- `tsconfig.json`
  - `baseUrl: "."` and path aliases:
    - `@/*`, `@/config/*`, `@/services/*`, `@/types/*`, `@/utils/*`, `@/components/*`, `@/store/*`.
  - Keep Babel aliases aligned when updating.

- `pnpm-workspace.yaml`
  - Ignores Skia built dependencies to keep installs manageable.

---

## 4. Project Structure Overview

- `app/` — Expo Router routes (`_layout.tsx`, `index.tsx`, other screens).
- `src/components/base` — locally defined base UI components (atomic/Reactix-aligned).
- `src/shared/ui` — shared UI primitives (atoms/molecules/micro-interactions).
- `src/config` — themes, Unistyles config, breakpoints, env.
- `src/services` — API client, repositories, network and storage services.
- `src/store` — Zustand stores (`app`, `auth`, `ui`, etc.).
- `src/utils` — cross-cutting utilities (date, validation, responsive, etc.).

Before adding a new module, check for existing patterns in these folders and reuse them.

---

## 5. How to Approach Tasks

When responding to a prompt (feature, bugfix, refactor), follow this sequence:

1. **Understand the goal**
   - Restate it briefly in your own words.
   - Identify which layers are affected (UI, store, services, config, native, docs).

2. **Discover existing patterns**
   - Search under `src/` and `docs/` for similar features.
   - Prefer extending existing patterns over adding new ones.
   - For API work, align with the service-layer + repository patterns.

3. **Plan minimal, coherent changes**
   - UI work: add/extend components in `src/components` or `src/shared/ui`.
   - State: introduce new Zustand slices or selectors consistently with `src/store/*`.
   - API: extend repositories instead of calling raw Axios from components.
   - Native/config changes: plan for `expo prebuild` + dev-client rebuild if needed.

4. **Implement with best practices**
   - Strong typing (no `any` unless absolutely necessary and justified).
   - Keep components small and focused.
   - Avoid duplicating logic; centralize in utils/services/stores.
   - Follow existing linting and formatting rules; do not bypass Husky/lint-staged unless explicitly instructed.

5. **Update docs when behavior or workflow changes**
   - User-facing flows or architecture → `docs/architecture/*` or appropriate guide.
   - Tooling / scripts / native behavior → `docs/guides/native-dev-client.md` + `README.md`.
   - Always bump "Last Updated" dates when touching doc headers.

6. **Commit strategy**
   - Use **Conventional Commits**:
     - Examples: `feat(config): ...`, `fix(api): ...`, `docs(guides): ...`, `refactor(store): ...`.
   - Group logically related changes:
     - Config/tooling vs. docs vs. feature implementation can be separate commits.
   - **Do not add co-author trailers** (e.g., no `Co-authored-by` lines).

---

## 6. When Working With Native / Styling Libraries

- **Unistyles**
  - All style changes should use the existing Unistyles theme/breakpoints.
  - If adding themes or tokens, update `src/config/unistyles.ts` and related theme files.
  - If you update breakpoints or responsive behavior, also review `docs/guides/responsive-design.md`.

- **Reanimated / Worklets**
  - Keep the Reanimated plugin last in `babel.config.js`.
  - Use worklets consistently (`'worklet';` where required).

- **MMKV / Storage**
  - Use existing storage services (`src/services/storage`) instead of direct MMKV calls.
  - Follow security considerations from `docs/security/storage-security.md`.

- **Skia**
  - If Skia errors mention missing binaries, run the postinstall script (documented in native-dev-client guide).

---

## 7. Quality, Safety, and Standards

- Prefer **small, well-scoped changes** and clear, typed interfaces.
- Avoid introducing tech or dependencies that are inconsistent with current stack
  without explicit direction in the prompt.
- Keep performance in mind for mobile constraints (lists, animations, network).
- Respect health-tech/security implications:
  - No logging of sensitive data.
  - Use secure storage and existing error-handling utilities.

Additional industry-standard expectations:

- Follow **TypeScript best practices**:
  - No untyped/`any`-heavy code paths.
  - Use discriminated unions and enums over magic strings.
- Maintain **accessibility** where applicable:
  - Use semantic components and accessible labels where React Native supports them.
  - Avoid relying on color alone to convey state.
- Keep **performance** in mind:
  - Use FlashList for large lists (already in stack).
  - Avoid unnecessary re-renders (memoization, stable callbacks where needed).
  - Use Reanimated/Skia appropriately for heavy animations/drawing.
- Ensure **observability and debuggability**:
  - Use existing error utilities and logging patterns; avoid ad-hoc `console.log` noise.
- Prefer **backwards-compatible changes** and clear migration paths:
  - When breaking behavior, document it and update relevant guides.

---

## 8. Design Patterns & Clean Code Expectations

Agents should apply standard design principles consistently:

- **SOLID & layering**
  - Keep concerns separated: UI ↔ store ↔ services ↔ API.
  - Don’t put business logic directly in React components when it belongs in stores/services.
  - Depend on abstractions (interfaces/types) at boundaries, not concrete implementations.

- **Reusable, composable components**
  - Prefer extending base/shared components over creating ad-hoc UI.
  - Keep components focused and small; extract child components when they grow complex.

- **DRY but pragmatic**
  - Factor out duplicated logic into `src/utils`, `src/services`, or shared hooks.
  - Avoid premature abstraction; only extract when a pattern is clearly repeated.

- **Clean functions and modules**
  - Use explicit types, narrow function signatures, and clear names.
  - Avoid deep parameter lists; prefer objects for complex inputs.
  - Keep files and modules cohesive around a single responsibility.

- **Error handling and resilience**
  - Centralize error handling via existing utilities and service-layer patterns.
  - Surface meaningful errors to the UI layer instead of silently failing.

When in doubt, agents should:

1. Look for an existing pattern in the relevant folder.
2. Match that pattern instead of inventing a new one.
3. Only introduce new abstractions when clearly justified by repeated use.

---

## 9. Prompt-Specific Guidance for Agents

When a prompt asks for:

- **New feature**
  - Identify screen/route impact (`app/`).
  - Model data & flows: store + service layer first, UI last.
  - Add/update docs if it changes user behavior or architecture.

- **Bug fix**
  - Reproduce via code inspection and, where possible, by reasoning through existing logic.
  - Fix at the appropriate layer (store vs. service vs. UI) rather than patching symptoms.
  - Add or adjust types/guards instead of silent failures.

- **Config/tooling changes**
  - Keep them isolated from feature code.
  - Validate through `pnpm lint`, `pnpm format:check`, and (if applicable) `npx expo prebuild`.

- **Docs-only updates**
  - Keep in sync with actual behavior and scripts.
  - Use existing tone and structure (overview, purpose, contents).

Always end work with:

- A brief summary of what was changed and **any follow-up steps** the user must run
  (`expo prebuild`, dev-client rebuild, etc.).
