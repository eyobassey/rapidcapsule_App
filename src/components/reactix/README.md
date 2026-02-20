# Reactix Components

This directory contains components adapted from [Reactix](https://www.reacticx.com/).

## Overview

Reactix is a copy-paste component library providing **50+ production-ready React Native components** with smooth animations, organized using **Atomic Design Pattern**.

## Architecture

Reactix uses atomic design principles:

- **Atoms** - Basic building blocks (button, input, text)
- **Molecules** - Simple component combinations (accordion, card, modal)
- **Micro-interactions** - Animated interactive components (gooey-switch, spin-button)

## Directory Structure

```
reactix/
├── README.md              # This file
├── atoms/                 # Basic UI elements
│   ├── button/
│   │   ├── index.tsx
│   │   └── types.ts
│   ├── input/
│   └── text/
├── molecules/             # Component combinations
│   ├── accordion/
│   ├── card/
│   └── modal/
├── micro-interactions/    # Animated components
│   ├── gooey-switch/
│   └── spin-button/
└── index.ts              # Main barrel export
```

## Integration Guidelines

See [Reactix Integration Guide](../../../docs/guides/reactix-integration.md) for:
- How to integrate Reactix components (CLI or manual)
- Atomic design architecture
- Adapting components to our design system
- Best practices and conventions
- Testing guidelines

## Using Reactix CLI

Reactix provides a CLI for easy component integration:

```bash
# Initialize config (optional)
npx reacticx init

# List all components
npx reacticx list

# List by category
npx reacticx list -c atoms
npx reacticx list -c molecules
npx reacticx list -c micro-interactions

# Add a component
npx reacticx add button
npx reacticx add card --dir src/components/reactix/molecules
```

**Note**: After adding components via CLI, you'll need to:
1. Adapt them to use our design system (Unistyles, theme tokens)
2. Rename to follow "App" prefix convention
3. Add accessibility props
4. Update exports in barrel files

## Component Naming

All Reactix components should be prefixed with "App" to match our naming convention:
- `Button` → `AppButton` (atom)
- `Card` → `AppCard` (molecule)
- `Input` → `AppInput` (atom)
- `GooeySwitch` → `AppGooeySwitch` (micro-interaction)

## Design System Integration

All Reactix components must be adapted to:
- Use `react-native-unistyles` for styling
- Use theme tokens from `@/config/themes`
- Follow responsive design patterns
- Include accessibility props
- Be fully type-safe (no `any` types)
