# Base Components Guide

**Created**: February 13, 2026  
**Last Updated**: February 18, 2026  
**Author**: Aarav Mishra  
**Version**: 1.0.0

---

## Overview

This guide provides comprehensive documentation for all base components in the Rapid Capsule mobile app. All components follow accessibility standards (WCAG 2.1), industry best practices, and clean code principles.

**Purpose**: Provides developers with production-ready, accessible, and consistent UI components that can be used throughout the application.

---

## Component Sources

This project uses components from two sources:

1. **Custom Base Components** (`src/components/base/`)
   - Foundation components built specifically for this project
   - Follow our design system and architecture
   - See sections below for documentation

2. **Reactix Components** (`src/shared/ui/`)
   - Components synced from [Reactix](https://www.reacticx.com/) using CLI
   - Copy-paste component library with 50+ components
   - Organized using atomic design pattern (`base/`, `molecules/`, `micro-interactions/`)
   - Synced via `npx reacticx add <component>` commands
   - See [Reactix Integration Guide](./reactix-integration.md) for details

**Note**: When choosing between custom and Reactix components, prefer Reactix components when available, as they provide more features and animations out of the box.

---

## Table of Contents

1. [AppButton](#button)
2. [AppText](#text)
3. [AppInput](#input)
4. [AppCard](#card)
5. [AppLoading](#loading)
6. [AppModal](#modal)
7. [AppBadge](#badge)
8. [AppAvatar](#avatar)
9. [AppSeparator](#separator)
10. [AppPressable](#pressable)
11. [Accessibility Guidelines](#accessibility-guidelines)
12. [Best Practices](#best-practices)

---

## AppButton

### Import

```typescript
import { AppButton } from '@/components/base';
```

### Props

- `title: string` - AppButton text (required)
- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'` - AppButton style
- `size?: 'small' | 'medium' | 'large'` - AppButton size
- `fullWidth?: boolean` - Full width button
- `leftIcon?: ReactNode` - Left icon component
- `rightIcon?: ReactNode` - Right icon component
- `loading?: boolean` - AppLoading state
- `disabled?: boolean` - Disabled state
- `onPress?: () => void` - Press handler
- `accessibilityLabel?: string` - Screen reader label
- `accessibilityHint?: string` - Screen reader hint
- `testID?: string` - Test identifier

### Examples

```typescript
// Basic button
<AppAppButton title="Submit" onPress={handleSubmit} />

// AppButton with variant
<AppButton
  title="Delete"
  variant="danger"
  onPress={handleDelete}
/>

// AppLoading button
<AppButton
  title="Save"
  loading={isSaving}
  onPress={handleSave}
/>

// AppButton with icons
<AppButton
  title="Share"
  leftIcon={<ShareIcon />}
  rightIcon={<ArrowIcon />}
  onPress={handleShare}
/>

// Full width button
<AppButton
  title="Continue"
  fullWidth
  variant="primary"
  onPress={handleContinue}
/>
```

### Accessibility

- ✅ Minimum touch target size: 44x44pt (WCAG 2.5.5)
- ✅ Proper accessibility labels and hints
- ✅ Disabled and loading states announced
- ✅ Keyboard navigation support

---

## AppText

### Import

```typescript
import { AppText } from '@/components/base';
```

### Props

- `variant?: AppTextVariant` - AppText style variant
- `color?: string` - AppText color override
- `align?: 'left' | 'center' | 'right' | 'justify'` - AppText alignment
- `numberOfLines?: number` - Max lines before truncation
- `bold?: boolean` - Bold text
- `italic?: boolean` - Italic text
- `underline?: boolean` - Underlined text
- `accessibilityLabel?: string` - Screen reader label

### Variants

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6` - Headings
- `bodyLarge`, `bodyMedium`, `bodySmall` - Body text
- `caption` - Small caption text
- `overline` - Uppercase label text

### Examples

```typescript
// Heading
<AppText variant="h1">Welcome</AppText>

// Body text
<AppText variant="bodyMedium">This is regular text</AppText>

// Styled text
<AppText variant="bodyLarge" bold color="#FF0000">
  Important message
</AppText>

// Truncated text
<AppText variant="bodyMedium" numberOfLines={2}>
  Long text that will be truncated...
</AppText>
```

### Accessibility

- ✅ Semantic heading roles
- ✅ Proper text scaling support
- ✅ Screen reader announcements

---

## AppInput

### Import

```typescript
import { AppInput } from '@/components/base';
```

### Props

- `label?: string` - AppInput label
- `placeholder?: string` - Placeholder text
- `error?: string` - Error message
- `helperAppText?: string` - Helper text
- `required?: boolean` - Required field indicator
- `disabled?: boolean` - Disabled state
- `size?: 'small' | 'medium' | 'large'` - AppInput size
- `leftIcon?: ReactNode` - Left icon
- `rightIcon?: ReactNode` - Right icon
- `type?: 'text' | 'email' | 'password' | 'number' | 'phone' | 'search'` - AppInput type
- `showPasswordToggle?: boolean` - Show password visibility toggle
- `value?: string` - AppInput value
- `onChangeAppText?: (text: string) => void` - Change handler

### Examples

```typescript
// Basic input
<AppInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeAppText={setEmail}
/>

// AppInput with validation
<AppInput
  label="Password"
  type="password"
  showPasswordToggle
  required
  error={passwordError}
  value={password}
  onChangeAppText={setPassword}
/>

// AppInput with icons
<AppInput
  label="Search"
  type="search"
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

// Disabled input
<AppInput
  label="Username"
  disabled
  value={username}
/>
```

### Accessibility

- ✅ Proper label associations
- ✅ Error announcements (live region)
- ✅ Required field indicators
- ✅ Keyboard type optimization
- ✅ Auto-complete hints

---

## AppCard

### Import

```typescript
import { AppCard } from '@/components/base';
```

### Props

- `variant?: 'default' | 'outlined' | 'elevated' | 'flat'` - AppCard style
- `pressable?: boolean` - Make card pressable
- `onPress?: () => void` - Press handler
- `padding?: 'none' | 'small' | 'medium' | 'large'` - Padding size
- `children: ReactNode` - AppCard content

### Examples

```typescript
// Basic card
<AppCard>
  <AppText variant="h3">AppCard Title</AppText>
  <AppText variant="bodyMedium">AppCard content</AppText>
</AppCard>

// AppPressable card
<AppCard pressable onPress={handleAppCardPress}>
  <AppText variant="h4">Tap me</AppText>
</AppCard>

// Outlined card
<AppCard variant="outlined" padding="large">
  <AppText>Content with large padding</AppText>
</AppCard>
```

### Accessibility

- ✅ Proper semantic roles
- ✅ AppPressable state announcements
- ✅ Focus management

---

## AppLoading

### Import

```typescript
import { AppLoading } from '@/components/base';
```

### Props

- `size?: 'small' | 'medium' | 'large'` - AppLoading size
- `message?: string` - AppLoading message
- `color?: string` - AppLoading color
- `fullScreen?: boolean` - Full screen overlay

### Examples

```typescript
// Basic loading
<AppLoading />

// AppLoading with message
<AppLoading message="AppLoading data..." />

// Full screen loading
<AppLoading fullScreen message="Please wait..." />

// Custom size
<AppLoading size="large" color="#FF0000" />
```

### Accessibility

- ✅ Busy state announcements
- ✅ Progress role for screen readers
- ✅ AppLoading message announcements

---

## AppModal

### Import

```typescript
import { AppModal } from '@/components/base';
```

### Props

- `visible: boolean` - AppModal visibility
- `title?: string` - AppModal title
- `children: ReactNode` - AppModal content
- `onClose: () => void` - Close handler
- `primaryActionLabel?: string` - Primary button text
- `onPrimaryAction?: () => void` - Primary action handler
- `secondaryActionLabel?: string` - Secondary button text
- `onSecondaryAction?: () => void` - Secondary action handler
- `showCloseAppButton?: boolean` - Show close button
- `dismissible?: boolean` - Dismissible by backdrop
- `size?: 'small' | 'medium' | 'large' | 'fullscreen'` - AppModal size

### Examples

```typescript
// Basic modal
<AppModal
  visible={isVisible}
  title="Confirm Action"
  onClose={() => setIsVisible(false)}
>
  <AppText>Are you sure?</AppText>
</AppModal>

// AppModal with actions
<AppModal
  visible={isVisible}
  title="Delete Item"
  onClose={() => setIsVisible(false)}
  primaryActionLabel="Delete"
  onPrimaryAction={handleDelete}
  secondaryActionLabel="Cancel"
  onSecondaryAction={() => setIsVisible(false)}
>
  <AppText>This action cannot be undone.</AppText>
</AppModal>

// Fullscreen modal
<AppModal
  visible={isVisible}
  size="fullscreen"
  onClose={() => setIsVisible(false)}
>
  <AppText>Full screen content</AppText>
</AppModal>
```

### Accessibility

- ✅ AppModal role and announcements
- ✅ Focus trap
- ✅ Keyboard escape handling
- ✅ Backdrop dismissal
- ✅ Screen reader focus management

---

## AppBadge

### Import

```typescript
import { AppBadge } from '@/components/base';
```

### Props

- `label: string | number` - AppBadge text/number
- `variant?: ComponentVariant | 'info' | 'warning'` - AppBadge style
- `size?: 'small' | 'medium' | 'large'` - AppBadge size
- `dot?: boolean` - Dot-only badge

### Examples

```typescript
// Basic badge
<AppBadge label="New" />

// AppBadge with number
<AppBadge label={5} variant="danger" />

// Dot badge
<AppBadge dot variant="success" />

// Status badge
<AppBadge label="Active" variant="success" size="small" />
```

### Accessibility

- ✅ Proper label announcements
- ✅ Color-independent indicators

---

## AppAvatar

### Import

```typescript
import { AppAvatar } from '@/components/base';
```

### Props

- `source?: { uri: string } | number` - Image source
- `name?: string` - Name for initials fallback
- `size?: 'small' | 'medium' | 'large' | 'xlarge'` - AppAvatar size
- `fallback?: ReactNode` - Custom fallback component

### Examples

```typescript
// AppAvatar with image
<AppAvatar
  source={{ uri: 'https://example.com/avatar.jpg' }}
  name="John Doe"
/>

// AppAvatar with initials
<AppAvatar name="John Doe" />

// Custom size
<AppAvatar name="Jane Smith" size="xlarge" />

// Custom fallback
<AppAvatar
  fallback={<CustomIcon />}
  name="User"
/>
```

### Accessibility

- ✅ Proper image roles
- ✅ Name announcements
- ✅ Fallback handling

---

## AppSeparator

### Import

```typescript
import { AppSeparator } from '@/components/base';
```

### Props

- `orientation?: 'horizontal' | 'vertical'` - AppSeparator direction
- `thickness?: number` - Line thickness
- `variant?: 'default' | 'dashed' | 'dotted'` - Line style
- `spacing?: number` - Spacing around separator

### Examples

```typescript
// Horizontal separator
<AppSeparator />

// Vertical separator
<AppSeparator orientation="vertical" />

// Dashed separator
<AppSeparator variant="dashed" spacing={16} />

// Thick separator
<AppSeparator thickness={2} />
```

### Accessibility

- ✅ Proper separator role
- ✅ Visual-only decoration

---

## AppPressable

### Import

```typescript
import { AppPressable } from '@/components/base';
```

### Props

- `variant?: 'default' | 'opacity' | 'scale'` - Press effect
- `minTouchTarget?: boolean` - Enforce minimum touch target
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - AppLoading state
- `onPress?: () => void` - Press handler
- `children: ReactNode` - AppPressable content

### Examples

```typescript
// Basic pressable
<AppPressable onPress={handlePress}>
  <AppText>Press me</AppText>
</AppPressable>

// Custom pressable
<AppPressable
  variant="opacity"
  minTouchTarget
  onPress={handlePress}
>
  <CustomContent />
</AppPressable>
```

### Accessibility

- ✅ Minimum touch target enforcement
- ✅ Proper state announcements
- ✅ Keyboard navigation

---

## Accessibility Guidelines

All components follow WCAG 2.1 Level AA standards:

### ✅ Minimum Requirements

- **Touch Targets**: Minimum 44x44pt (WCAG 2.5.5)
- **Color Contrast**: 4.5:1 for text, 3:1 for UI components
- **Labels**: All interactive elements have labels
- **States**: Disabled, loading, and error states are announced
- **Focus**: Proper focus management and indicators

### ✅ Screen Reader Support

- Proper `accessibilityRole` attributes
- Descriptive `accessibilityLabel` and `accessibilityHint`
- Live regions for dynamic content (errors, loading)
- Proper heading hierarchy

### ✅ Keyboard Navigation

- All interactive elements are keyboard accessible
- Proper tab order
- Escape key handling for modals

---

## Best Practices

### ✅ DO:

- ✅ Always provide `accessibilityLabel` for interactive elements
- ✅ Use semantic variants (e.g., `h1` for main headings)
- ✅ Provide error messages for form inputs
- ✅ Use loading states for async operations
- ✅ Test with screen readers
- ✅ Maintain consistent spacing and sizing

### ❌ DON'T:

- ❌ Don't skip accessibility props
- ❌ Don't use color alone to convey information
- ❌ Don't create custom components when base components suffice
- ❌ Don't override accessibility props unnecessarily
- ❌ Don't use small touch targets (< 44x44pt)

---

## Component Composition

Components are designed to be composable:

```typescript
// Example: Form with AppInput and AppButton
<AppCard variant="elevated" padding="large">
  <AppText variant="h2">Login</AppText>

  <AppInput
    label="Email"
    type="email"
    required
    value={email}
    onChangeAppText={setEmail}
    error={emailError}
  />

  <AppInput
    label="Password"
    type="password"
    showPasswordToggle
    required
    value={password}
    onChangeAppText={setPassword}
    error={passwordError}
  />

  <AppButton
    title="Sign In"
    fullWidth
    loading={isAppLoading}
    onPress={handleLogin}
  />
</AppCard>
```

---

## Related Documentation

- [Utilities Guide](./utilities.md) - Utility functions
- [Service Layer Architecture](../architecture/service-layer.md) - API integration
- [State Management Architecture](../architecture/state-management.md) - State management

---

## Summary

The base components library provides:

- ✅ 10 production-ready components
- ✅ Full accessibility support (WCAG 2.1 AA)
- ✅ TypeScript type safety
- ✅ Consistent styling with theme system
- ✅ Clean, maintainable code
- ✅ Comprehensive documentation

All components follow industry standards and are ready for production use.
