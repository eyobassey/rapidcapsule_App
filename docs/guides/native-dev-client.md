# Native Setup & Custom Dev Client

**Created:** March 3, 2026  
**Author:** Aarav Mishra

---

## Overview

The Rapid Capsule mobile app uses native dependencies (e.g., Unistyles, Reanimated, Skia, MMKV). For a reliable development experience, we use **Expo prebuild** plus a **custom dev client** instead of relying on Expo Go.

This guide describes how to work with native code, dev clients, and app configuration.

---

## Native Projects & Prebuild

- Native projects live in `ios/` and `android/`.
- We use **Expo prebuild** to sync `app.json` and dependencies into the native projects:

```bash
npx expo prebuild
```

Run prebuild when:

- Native-related dependencies change (e.g., Reanimated, Unistyles, MMKV, Skia, Expo native modules)
- `app.json` native config changes (icons, name, bundle IDs, adaptive icons, plugins)
- You update `expo` to a new SDK version

---

## Custom Dev Client Workflow

### 1. Install dependencies

```bash
pnpm install
```

### 2. Build the dev client

```bash
# iOS
pnpm ios    # or: npx expo run:ios

# Android
pnpm android    # or: npx expo run:android
```

This builds and installs a native app that includes all native modules and the Expo dev client runtime.

### 3. Start Metro in dev-client mode

```bash
pnpm start:dev-client
```

Then open the already‑installed dev client on your simulator or device. It will automatically connect to the Metro bundler.

---

## Babel Configuration

We use a custom Babel config to support:

- **Expo Router**
- **Module aliases** (matching `tsconfig.json`)
- **React Native Unistyles**
- **React Native Reanimated**

The config lives in `babel.config.js` and includes:

- `babel-preset-expo`
- `expo-router/babel`
- `module-resolver` with the `@` aliases
- `react-native-unistyles/plugin`
- `react-native-reanimated/plugin` (must be last)

If you add new aliases to `tsconfig.json`, mirror them in `babel.config.js`.

---

## App Icons & Name

- Base icon: `assets/logomark.png`
- Expo config: `app.json`

Key fields:

- `expo.name`: **Rapid Capsule** (label under the icon)
- `expo.icon`: `./assets/logomark.png`
- `android.adaptiveIcon.foregroundImage`: `./assets/logomark.png`
- `android.adaptiveIcon.monochromeImage`: `./assets/logomark.png`

Changing icons or the app name requires:

1. `npx expo prebuild`
2. Rebuilding the dev client (`pnpm ios` / `pnpm android`)

---

## When to Update This Guide

Update this document when:

- Adding/removing native dependencies
- Changing `babel.config.js`
- Changing native configuration in `app.json`
- Updating the dev client workflow or scripts in `package.json`
