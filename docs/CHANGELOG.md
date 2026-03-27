# Documentation Changelog

All notable changes to the documentation will be documented in this file.

---

## [1.2.0] - March 27, 2026

### Added

- **Interactive Commits** (`docs/guides/linting-and-commits.md`)
  - Added `commitizen` + `cz-git` for guided commit message authoring via `pnpm commit`.
  - Created `commitlint.config.js` (replaces missing `.commitlintrc.js`) — serves as both commitlint and cz-git adapter config.

### Changed

- **Expo SDK upgrade** — upgraded from SDK 54 to SDK 55 (React Native 0.81 → 0.83, React 19.1 → 19.2).
  - All Expo packages updated to their SDK 55 equivalents.
  - `newArchEnabled` removed from `app.json` (New Architecture is now the default).
  - `edgeToEdgeEnabled` removed from `app.json` (mandatory on Android 16+, no longer a config option).
  - Added `expo-system-ui` for `userInterfaceStyle` support on Android.
- **Native Dev Client Guide** (`docs/guides/native-dev-client.md`)
  - Corrected Babel plugin name: `react-native-reanimated/plugin` → `react-native-worklets/plugin`.
  - Added `--clean` guidance for SDK upgrade prebuilds.
  - Added Skia postinstall step required after fresh installs.
- **Root README** (`README.md`)
  - Added `pnpm commit` to Available Scripts.
  - Updated New Architecture note to reflect it is now enabled by default.

---

## [1.1.0] - March 3, 2026

### Added

- **Components Guide** (`docs/guides/components.md`)
  - Documented home/Eka-related UI building blocks (`ProfileCompletionBanner`, `EkaFAB`, `EkaCompanionScreen`, `EkaChatScreen`).
  - Added guidance on using the shared `FloatingActionButton` and `CircularProgress` instead of one-off implementations.

### Changed

- **Root README** (`README.md`)
  - Updated project structure and routing sections to reflect the new auth + `(home)` stack, native tabs, and typed `appRoutes` map.

- **Agent Guide** (`AGENT.md`)
  - Clarified that all navigation (including Eka and profile flows) must use the central `appRoutes` map and avoid magic route strings.

---

## [1.0.0] - February 13, 2026

### Added

- **Service Layer Architecture** (`docs/architecture/service-layer.md`)
  - Complete documentation of production-grade service layer
  - SOLID principles and design patterns
  - Patient module implementation details
  - Usage examples and best practices

- **State Management Architecture** (`docs/architecture/state-management.md`)
  - Hybrid approach documentation (React Query + Zustand)
  - Store structure and examples
  - When to use which solution
  - Performance considerations

- **Storage Security Guide** (`docs/security/storage-security.md`)
  - Secure storage strategy
  - MMKV security analysis
  - HIPAA compliance considerations
  - Migration guide

- **API Service Layer Guide** (`docs/guides/api-service-layer.md`)
  - Quick reference guide
  - Common patterns
  - Error handling examples
  - TypeScript types reference

- **Documentation Index** (`docs/README.md`)
  - Central documentation hub
  - Quick links and navigation
  - Documentation standards

---

## Format

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Categories

- **Added** - New documentation
- **Changed** - Changes to existing documentation
- **Deprecated** - Documentation that will be removed
- **Removed** - Removed documentation
- **Fixed** - Documentation corrections
- **Security** - Security-related documentation updates
