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
- - Auth flows: `app/login.tsx` and `app/register.tsx` use shared base components and the `auth` i18n namespace.
- `src/components/base` — locally defined base UI components (atomic/Reactix-aligned).
- `src/shared/ui` — shared UI primitives (atoms/molecules/micro-interactions).
- `src/config` — themes, Unistyles config, breakpoints, env, i18n init.
- `src/locales` — translation JSON files, organized by `{lang}/{namespace}.json` (e.g. `en/home.json`, `en/auth.json`).
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
  - Use `StyleSheet.create(theme => ({ ... }))` and access styles directly (e.g. `styles.container`). Do not call styles as a function or cast.
  - Use `useUnistyles()` only when theme values are needed for logic (e.g. dynamic heights, `placeholderTextColor`, `ActivityIndicator` color).
  - If adding themes or tokens, update `src/config/unistyles.ts` and related theme files.
  - If you update breakpoints or responsive behavior, also review `docs/guides/responsive-design.md`.

- **Reanimated / Worklets**
  - Keep the Reanimated plugin last in `babel.config.js`.
  - Use worklets consistently (`'worklet';` where required).

- **MMKV / Storage**
  - Use existing storage services (`src/services/storage`) instead of direct MMKV calls.
  - Follow security considerations from `docs/security/storage-security.md`.

- **Icons (Streamline)**
  - Icons are SVGs from [StreamlineHQ](https://www.streamlinehq.com/), stored in `assets/icons/`.
  - To add an icon: download the SVG, drop it into `assets/icons/`, run `pnpm icons`.
  - The script auto-generates `assets/icons/index.ts` (PascalCase barrel) — never edit this file manually.
  - Use `<AppIcon name="ArrowRight" size={24} />` in components. The `name` prop is type-safe.
  - `AppIcon` defaults color to `theme.colors.text`; override with the `color` prop.

- **Auth UI + Inputs**
  - Login and register screens live in `app/login.tsx` and `app/register.tsx` and both:
    - Use `Screen gradient="subtle"` with `edges={['top']}` and wrap scrollable content in a `ScrollView`.
    - Use `AppInput` with `variant="pill"` for email/password fields and `Checkbox` for agreements.
    - Use the shared `Button` atom; when no `backgroundColor` is passed it defaults to `theme.colors.primary`.
  - All auth copy is localized via the `auth` namespace (`src/locales/en/auth.json` with `login.*` and `register.*` keys).  
    Always add new login/register strings there instead of hardcoding.
  - Navigation between auth screens (and from home) should use the central `appRoutes` map in `src/config/routes.ts`
    instead of hard-coded route strings. This keeps Expo Router navigation type-safe via `Href`.
  - The same `appRoutes` map must be used for all other navigation (home tabs, profile, Eka companion, Eka chat, etc.);
    do not introduce new magic route strings such as `'/eka'` or `'/eka-chat'`.

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

---

## 10. Internationalization (i18n)

- i18n is configured via **i18next + react-i18next** in `src/config/i18n.ts` and loaded in `app/_layout.tsx`.
- All **user-facing text** must use translation keys (via `useTranslation` hook), never hardcoded strings.

### Locale file structure

```
src/locales/
  en/
    common.json     ← shared keys (Cancel, OK, Error, etc.)
    home.json       ← home screen keys
    <screen>.json   ← one file per screen / feature namespace
```

To add a new language, create a matching folder (e.g. `es/`) with the same filenames and keys, then register it in `src/config/i18n.ts`.

### Key conventions

- Keys use **nested camelCase objects** (i18next standard), not natural language or hyphens.
- Group keys by section inside each namespace file:
  ```json
  {
    "actions": { "signIn": "Sign In", "getStarted": "Get Started →" },
    "brand": { "name": "Rapid Capsule" }
  }
  ```
- In code, use **dot-notation** within the namespace: `t('actions.signIn')`.
- Pass the namespace to the hook: `const { t } = useTranslation('home')`.

### Adding new screen copy

1. Create or update `src/locales/en/<namespace>.json` with nested camelCase keys.
2. Import it in `src/config/i18n.ts` and add to `resources` + `ns` array.
3. Use `useTranslation('<namespace>')` in the component.

### Editor support

The project includes `.vscode/settings.json` with **i18n-ally** configuration. The extension provides inline previews, missing-key warnings, and auto-complete for translation keys.

Always end work with:

- A brief summary of what was changed and **any follow-up steps** the user must run
  (`expo prebuild`, dev-client rebuild, etc.).
