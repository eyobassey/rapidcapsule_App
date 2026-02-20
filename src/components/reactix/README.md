# Reactix Components

This directory contains components adapted from [Reactix](https://www.reacticx.com/).

## Overview

Reactix is a copy-paste component library providing 60+ production-ready React Native components with smooth animations.

## Directory Structure

```
reactix/
├── README.md           # This file
├── layout/            # Layout components (Container, Stack, Grid, Flex)
├── form/              # Form components (Input, TextArea, Select, etc.)
├── navigation/        # Navigation components (Tabs, BottomSheet, Drawer)
├── feedback/          # Feedback components (Toast, Alert, Loading)
├── data-display/      # Data display components (Card, List, Table)
├── overlay/          # Overlay components (Modal, Dialog, Popover)
├── media/            # Media components (Image, Avatar, Icon)
└── index.ts          # Barrel export
```

## Integration Guidelines

See [Reactix Integration Guide](../../../docs/guides/reactix-integration.md) for:
- How to integrate Reactix components
- Adapting components to our design system
- Best practices and conventions
- Testing guidelines

## Component Naming

All Reactix components should be prefixed with "App" to match our naming convention:
- `Button` → `AppButton`
- `Card` → `AppCard`
- `Input` → `AppInput`

## Design System Integration

All Reactix components must be adapted to:
- Use `react-native-unistyles` for styling
- Use theme tokens from `@/config/themes`
- Follow responsive design patterns
- Include accessibility props
- Be fully type-safe (no `any` types)
