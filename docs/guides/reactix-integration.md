# Reactix Component Integration Guide

**Created**: February 18, 2026  
**Author**: Aarav Mishra

---

## Overview

This project uses **Reactix** (https://www.reacticx.com/) as a primary source for UI components. Reactix is a copy-paste component library that provides 60+ production-ready React Native components with smooth animations.

**Key Features:**
- ✅ Copy & paste (no npm package installation)
- ✅ Expo compatible
- ✅ Built with React Native Reanimated 4
- ✅ Uses React Native Skia for graphics
- ✅ TypeScript first
- ✅ Fully customizable
- ✅ 60+ components available

---

## Prerequisites

All required dependencies are already installed in this project:

- ✅ `react-native-reanimated` (^4.1.6)
- ✅ `@shopify/react-native-skia` (^2.4.21)
- ✅ `react-native-gesture-handler` (^2.28.0)
- ✅ `react-native-safe-area-context` (^5.6.0)
- ✅ `expo` (~54.0.33)

---

## Component Integration Workflow

### Step 1: Browse Components

Visit [Reactix Components](https://www.reacticx.com/docs) to browse available components.

### Step 2: Copy Component Code

Copy the component code from Reactix website. Components are provided as complete, self-contained code blocks.

### Step 3: Create Component File

Create a new file in `src/components/reactix/` directory:

```
src/components/reactix/
├── Button/
│   └── Button.tsx
├── Card/
│   └── Card.tsx
└── ...
```

### Step 4: Adapt to Our Design System

**Important**: Reactix components need to be adapted to match our design system:

1. **Replace styling with Unistyles**
   - Convert StyleSheet to `StyleSheet.create()` from `react-native-unistyles`
   - Use theme tokens from `@/config/themes`
   - Apply responsive breakpoints where appropriate

2. **Update imports**
   - Use `@` path aliases instead of relative paths
   - Import from our base components when applicable
   - Use our utility functions

3. **Add accessibility**
   - Ensure WCAG 2.1 Level AA compliance
   - Add proper accessibility labels and hints
   - Test with screen readers

4. **Prefix with "App"**
   - Rename components to follow our naming convention (e.g., `Button` → `AppButton`)
   - Update all references

5. **Type safety**
   - Ensure all types are properly defined
   - Remove any `any` types
   - Add proper TypeScript interfaces

### Step 5: Export from Barrel File

Add the component to `src/components/reactix/index.ts`:

```typescript
export { AppButton } from './Button/Button';
export type { AppButtonProps } from './Button/Button';
```

---

## Integration Example

### Before (Reactix Component)

```typescript
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

export function Button({ title, onPress }) {
  const scale = useSharedValue(1);
  
  return (
    <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
      {/* Component code */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
});
```

### After (Adapted for Our Project)

```typescript
import React from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';
import { BaseComponentProps } from '@/components/base/types';

export interface AppButtonProps extends BaseComponentProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
}) => {
  const { theme } = useUnistyles();
  const styles = stylesheet(theme);
  const scale = useSharedValue(1);

  return (
    <Animated.View
      style={[styles.button, styles[variant], style]}
      accessible
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint || 'Double tap to activate'}
      accessibilityRole="button"
      testID={testID}
    >
      <AppText variant="bodyMedium" style={styles.text}>
        {title}
      </AppText>
    </Animated.View>
  );
};

const stylesheet = StyleSheet.create((theme) => ({
  button: {
    padding: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // WCAG touch target
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  text: {
    color: theme.colors.text,
  },
}));
```

---

## Design System Integration Checklist

When integrating a Reactix component, ensure:

- [ ] Component uses `StyleSheet.create()` from `react-native-unistyles`
- [ ] Theme tokens are used (colors, spacing, typography, borderRadius)
- [ ] Responsive breakpoints are applied where appropriate
- [ ] Component follows "App" prefix naming convention
- [ ] All imports use `@` path aliases
- [ ] Accessibility props are added (accessibilityLabel, accessibilityHint, accessibilityRole)
- [ ] TypeScript types are properly defined (no `any` types)
- [ ] Component extends `BaseComponentProps` when applicable
- [ ] Component is exported from barrel file
- [ ] Component is documented in `docs/guides/components.md`
- [ ] Component follows our code style (ESLint, Prettier)

---

## Component Categories

Reactix provides components in these categories:

### Layout Components
- Container, Stack, Grid, Flex
- **Location**: `src/components/reactix/layout/`

### Form Components
- Input, TextArea, Select, Checkbox, Radio, Switch
- **Location**: `src/components/reactix/form/`

### Navigation Components
- Tabs, BottomSheet, Drawer, Menu
- **Location**: `src/components/reactix/navigation/`

### Feedback Components
- Toast, Alert, Snackbar, Loading, Skeleton
- **Location**: `src/components/reactix/feedback/`

### Data Display Components
- Card, List, Table, Accordion, Timeline
- **Location**: `src/components/reactix/data-display/`

### Overlay Components
- Modal, Dialog, Popover, Tooltip
- **Location**: `src/components/reactix/overlay/`

### Media Components
- Image, Avatar, Icon, Badge
- **Location**: `src/components/reactix/media/`

---

## Best Practices

### 1. Preserve Animations

Reactix components use React Native Reanimated for smooth animations. Preserve these animations when adapting components:

```typescript
// ✅ Keep Reanimated animations
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

// ❌ Don't remove animations for "simplicity"
```

### 2. Use Theme Tokens

Always replace hardcoded values with theme tokens:

```typescript
// ❌ Don't
backgroundColor: '#007AFF',
padding: 16,

// ✅ Do
backgroundColor: theme.colors.primary,
padding: theme.spacing.md,
```

### 3. Maintain Component Structure

Keep the component's internal structure and logic, only adapt styling and props:

```typescript
// ✅ Keep component logic
const scale = useSharedValue(1);
const handlePress = () => {
  scale.value = withSpring(0.95);
  onPress?.();
};

// ✅ Only adapt styling
style={[styles.button, { transform: [{ scale }] }]}
```

### 4. Add Error Boundaries

Wrap complex Reactix components in error boundaries when appropriate:

```typescript
import { ErrorBoundary } from '@/components/base/ErrorBoundary/ErrorBoundary';

<ErrorBoundary>
  <ReactixComponent />
</ErrorBoundary>
```

### 5. Test Responsiveness

Ensure components work across all breakpoints:

```typescript
// ✅ Test on all devices
const styles = StyleSheet.create((theme) => ({
  container: {
    padding: {
      xs: theme.spacing.md,  // Phones
      md: theme.spacing.lg,  // Tablets
      lg: theme.spacing.xl,  // Large tablets
    },
  },
}));
```

---

## Common Adaptations

### Converting Colors

```typescript
// Reactix
backgroundColor: '#007AFF',

// Our project
backgroundColor: theme.colors.primary,
```

### Converting Spacing

```typescript
// Reactix
padding: 16,
margin: 24,

// Our project
padding: theme.spacing.md,  // 16px
margin: theme.spacing.lg,   // 24px
```

### Converting Border Radius

```typescript
// Reactix
borderRadius: 8,

// Our project
borderRadius: theme.borderRadius.md,  // 8px
```

### Converting Typography

```typescript
// Reactix
fontSize: 16,
fontWeight: '600',

// Our project
fontSize: theme.typography.fontSize.md,      // 16px
fontWeight: theme.typography.fontWeight.semibold,  // '600'
```

---

## Testing Reactix Components

### 1. Visual Testing

- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on physical devices
- [ ] Test in different screen sizes
- [ ] Test in light and dark themes

### 2. Accessibility Testing

- [ ] Test with VoiceOver (iOS)
- [ ] Test with TalkBack (Android)
- [ ] Verify touch targets (min 44x44pt)
- [ ] Verify color contrast ratios
- [ ] Test keyboard navigation

### 3. Performance Testing

- [ ] Verify animations run at 60fps
- [ ] Check for memory leaks
- [ ] Test with large datasets
- [ ] Profile component render times

---

## Component Documentation

After integrating a Reactix component:

1. **Add to Components Guide**
   - Document in `docs/guides/components.md`
   - Include props, usage examples, and best practices

2. **Add JSDoc Comments**
   - Document all props
   - Include usage examples
   - Add accessibility notes

3. **Create Story/Example**
   - Add example usage in component file
   - Create example screen if needed

---

## Troubleshooting

### Issue: Animations not working

**Solution**: Ensure `react-native-reanimated` is properly configured:
- Check `babel.config.js` includes Reanimated plugin
- Verify `react-native-reanimated` version matches Reactix requirements

### Issue: Skia components not rendering

**Solution**: Ensure Skia is properly set up:
- Verify `@shopify/react-native-skia` is installed
- Check Skia components are wrapped correctly

### Issue: Styles not applying

**Solution**: Check Unistyles configuration:
- Verify `StyleSheet.create()` is used correctly
- Check theme is properly imported
- Ensure breakpoints are configured

### Issue: Type errors

**Solution**: Ensure proper TypeScript setup:
- Check all types are defined
- Remove `any` types
- Verify imports are correct

---

## Resources

- **Reactix Website**: https://www.reacticx.com/
- **Reactix Components**: https://www.reacticx.com/docs
- **React Native Reanimated**: https://docs.swmansion.com/react-native-reanimated/
- **React Native Skia**: https://shopify.github.io/react-native-skia/
- **Our Design System**: See `docs/guides/components.md`

---

## Component Inventory

Track which Reactix components have been integrated:

| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| Button | ⏳ Pending | - | - |
| Card | ⏳ Pending | - | - |
| Input | ⏳ Pending | - | - |
| Modal | ⏳ Pending | - | - |

**Legend:**
- ✅ Integrated
- ⏳ Pending
- 🔄 In Progress
- ❌ Not Needed

---

**Last Updated**: February 18, 2026
