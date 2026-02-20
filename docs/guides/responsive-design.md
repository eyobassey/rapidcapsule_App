# Responsive Design Guide

**Created:** February 18, 2026  
**Author:** Aarav Mishra

## Overview

This guide covers production-grade responsive design implementation for the Rapid Capsule mobile application. We use **react-native-unistyles** for responsive design, which provides type-safe, breakpoint-based responsive values similar to CSS media queries.

---

## Why Not Use `react-native-responsive-screen` or `react-native-size-matters`?

### Problems with Dimension-Based Scaling Libraries

1. **Uniform Scaling Issues**
   - These libraries scale everything uniformly based on screen dimensions
   - Text becomes too large on tablets and too small on phones
   - Breaks design consistency across devices

2. **No Breakpoint Support**
   - Don't support design breakpoints (like web CSS media queries)
   - Can't have different layouts for different screen sizes
   - Forces one-size-fits-all approach

3. **Type Safety**
   - Not type-safe, leading to runtime errors
   - No IntelliSense support
   - Harder to maintain

4. **Performance**
   - Additional calculations on every render
   - Less performant than breakpoint-based approach

5. **Design Fidelity**
   - Can't match designs pixel-perfectly
   - Scaling ratios don't match design specifications
   - Breaks design system consistency

### Modern Approach: react-native-unistyles

We use **react-native-unistyles** because it provides:

✅ **Breakpoint-based responsive design** (like CSS media queries)  
✅ **Type-safe** responsive values  
✅ **Design system integration** with themes  
✅ **Better performance** (compile-time optimizations)  
✅ **Pixel-perfect designs** across devices  
✅ **Maintainable** and scalable  

---

## Current Setup

### Breakpoints Configuration

Our breakpoints are defined in `src/config/breakpoints.ts`:

```typescript
export const breakpoints = {
  xs: 0,      // Extra small devices (phones)
  sm: 576,    // Small devices (large phones)
  md: 768,    // Medium devices (tablets)
  lg: 1024,   // Large devices (large tablets)
  xl: 1280,   // Extra large devices
};
```

### Theme Integration

Breakpoints work seamlessly with our theme system, allowing responsive:
- Spacing
- Typography
- Colors
- Component sizes
- Layouts

---

## Responsive Design Patterns

### 1. Responsive Values with Breakpoints

Use `createStyleSheet` with responsive values:

```typescript
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const styles = createStyleSheet((theme) => ({
  container: {
    padding: {
      xs: theme.spacing.md,    // 16px on phones
      md: theme.spacing.xl,    // 24px on tablets
      lg: theme.spacing.xxl,   // 32px on large tablets
    },
    flexDirection: {
      xs: 'column',            // Stack vertically on phones
      md: 'row',               // Horizontal on tablets
    },
  },
  card: {
    width: {
      xs: '100%',              // Full width on phones
      md: '48%',               // Half width on tablets
      lg: '32%',               // Third width on large tablets
    },
  },
}));
```

### 2. Responsive Typography

```typescript
const styles = createStyleSheet((theme) => ({
  title: {
    fontSize: {
      xs: theme.typography.fontSize.lg,    // 18px on phones
      md: theme.typography.fontSize.xl,    // 20px on tablets
      lg: theme.typography.fontSize.xxl,   // 24px on large tablets
    },
    lineHeight: {
      xs: 24,
      md: 28,
      lg: 32,
    },
  },
}));
```

### 3. Responsive Spacing

```typescript
const styles = createStyleSheet((theme) => ({
  section: {
    marginBottom: {
      xs: theme.spacing.lg,    // 20px on phones
      md: theme.spacing.xl,     // 24px on tablets
      lg: theme.spacing.xxl,    // 32px on large tablets
    },
    paddingHorizontal: {
      xs: theme.spacing.md,     // 16px on phones
      md: theme.spacing.lg,     // 20px on tablets
      lg: theme.spacing.xl,     // 24px on large tablets
    },
  },
}));
```

### 4. Responsive Component Sizes

```typescript
const styles = createStyleSheet((theme) => ({
  button: {
    minHeight: {
      xs: 44,                  // Minimum touch target on phones
      md: 48,                  // Slightly larger on tablets
      lg: 52,                  // Even larger on large tablets
    },
    paddingHorizontal: {
      xs: theme.spacing.md,     // 16px on phones
      md: theme.spacing.lg,     // 20px on tablets
      lg: theme.spacing.xl,     // 24px on large tablets
    },
  },
}));
```

### 5. Responsive Grid Layouts

```typescript
const styles = createStyleSheet((theme) => ({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: {
      xs: theme.spacing.md,    // 16px gap on phones
      md: theme.spacing.lg,     // 20px gap on tablets
    },
  },
  gridItem: {
    width: {
      xs: '100%',              // Full width on phones (1 column)
      sm: '48%',               // Half width on small devices (2 columns)
      md: '32%',               // Third width on tablets (3 columns)
      lg: '24%',               // Quarter width on large tablets (4 columns)
    },
  },
}));
```

---

## Advanced Responsive Patterns

### 1. Conditional Rendering Based on Breakpoints

```typescript
import { useBreakpointValue } from 'react-native-unistyles';

function ResponsiveComponent() {
  const isTablet = useBreakpointValue({
    xs: false,
    md: true,
  });

  return (
    <View>
      {isTablet ? (
        <TabletLayout />
      ) : (
        <PhoneLayout />
      )}
    </View>
  );
}
```

### 2. Responsive Hook Values

```typescript
import { useBreakpointValue } from 'react-native-unistyles';

function MyComponent() {
  const columns = useBreakpointValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  const itemWidth = `${100 / columns}%`;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map((item) => (
        <View key={item.id} style={{ width: itemWidth }}>
          {/* Item content */}
        </View>
      ))}
    </View>
  );
}
```

### 3. Responsive Image Sizes

```typescript
const styles = createStyleSheet((theme) => ({
  image: {
    width: {
      xs: '100%',              // Full width on phones
      md: 400,                 // Fixed width on tablets
      lg: 500,                 // Larger on large tablets
    },
    height: {
      xs: 200,                 // Fixed height on phones
      md: 300,                 // Taller on tablets
      lg: 400,                 // Even taller on large tablets
    },
    borderRadius: {
      xs: theme.borderRadius.md,
      md: theme.borderRadius.lg,
      lg: theme.borderRadius.xl,
    },
  },
}));
```

### 4. Responsive Modal/Dialog Sizes

```typescript
const styles = createStyleSheet((theme) => ({
  modal: {
    width: {
      xs: '100%',              // Full width on phones
      md: '80%',               // 80% width on tablets
      lg: 600,                 // Fixed width on large tablets
    },
    maxWidth: {
      xs: '100%',
      md: 600,
      lg: 800,
    },
  },
}));
```

---

## Best Practices

### 1. Use Breakpoints, Not Screen Dimensions

❌ **Don't:**
```typescript
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const isTablet = width > 768;
```

✅ **Do:**
```typescript
import { useBreakpointValue } from 'react-native-unistyles';
const isTablet = useBreakpointValue({ xs: false, md: true });
```

### 2. Design Mobile-First

Start with the smallest breakpoint (`xs`) and progressively enhance:

```typescript
const styles = createStyleSheet((theme) => ({
  container: {
    // Base styles for phones (xs)
    padding: theme.spacing.md,
    flexDirection: 'column',
    
    // Enhance for tablets (md)
    padding: {
      xs: theme.spacing.md,
      md: theme.spacing.xl,
    },
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
  },
}));
```

### 3. Use Consistent Spacing Scale

Always use theme spacing values, not arbitrary numbers:

❌ **Don't:**
```typescript
padding: {
  xs: 16,
  md: 24,
}
```

✅ **Do:**
```typescript
padding: {
  xs: theme.spacing.md,  // 16px
  md: theme.spacing.xl,  // 24px
}
```

### 4. Maintain Touch Target Sizes

Ensure minimum touch targets (44x44pt) across all devices:

```typescript
const styles = createStyleSheet((theme) => ({
  button: {
    minHeight: {
      xs: 44,    // Minimum touch target
      md: 48,    // Slightly larger on tablets
    },
    minWidth: {
      xs: 44,
      md: 48,
    },
  },
}));
```

### 5. Test on Multiple Devices

Always test responsive designs on:
- Small phones (iPhone SE, small Android)
- Standard phones (iPhone 14, Pixel)
- Large phones (iPhone Pro Max, large Android)
- Tablets (iPad, Android tablets)
- Different orientations (portrait/landscape)

---

## Component Examples

### Responsive Card Component

Complete example demonstrating multiple responsive patterns:

```typescript
import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppCard } from '@/components/base/Card/Card';
import { AppText } from '@/components/base/Text/Text';
import { useIsTablet } from '@/utils/responsive';

interface ResponsiveCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

/**
 * Example responsive card component
 * Demonstrates:
 * - Responsive padding and spacing
 * - Responsive typography
 * - Responsive width (grid layout)
 * - Conditional rendering based on breakpoint
 */
export function ResponsiveCard({ title, description, children }: ResponsiveCardProps) {
  const { theme } = useUnistyles();
  const buttonStyles = (
    stylesheet as unknown as (theme: ReturnType<typeof useUnistyles>['theme']) => typeof stylesheet
  )(theme);
  const isTablet = useIsTablet();

  return (
    <AppCard style={buttonStyles.card}>
      <View style={buttonStyles.header}>
        <AppText variant="h3" style={buttonStyles.title}>
          {title}
        </AppText>
        {isTablet && (
          <AppText variant="caption" style={buttonStyles.badge}>
            Tablet View
          </AppText>
        )}
      </View>
      <AppText variant="bodyMedium" style={buttonStyles.description}>
        {description}
      </AppText>
      {children && <View style={buttonStyles.content}>{children}</View>}
    </AppCard>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  card: {
    width: {
      xs: '100%',        // Full width on phones
      sm: '48%',        // Half width on small devices (2 columns)
      md: '32%',       // Third width on tablets (3 columns)
      lg: '24%',       // Quarter width on large tablets (4 columns)
    },
    padding: {
      xs: theme.spacing.md,    // 16px on phones
      md: theme.spacing.lg,    // 24px on tablets
      lg: theme.spacing.xl,    // 32px on large tablets
    },
    marginBottom: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
  },
  header: {
    flexDirection: {
      xs: 'column',     // Stack vertically on phones
      md: 'row',        // Horizontal on tablets
    },
    justifyContent: 'space-between',
    alignItems: {
      xs: 'flex-start',
      md: 'center',
    },
    marginBottom: {
      xs: theme.spacing.sm,
      md: theme.spacing.md,
    },
  },
  title: {
    fontSize: {
      xs: theme.typography.fontSize.lg,    // 20px on phones
      md: theme.typography.fontSize.xl,      // 24px on tablets
      lg: theme.typography.fontSize.xxl,    // 32px on large tablets
    },
    marginBottom: {
      xs: theme.spacing.xs,
      md: 0,
    },
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.borderRadius.sm,
  },
  description: {
    fontSize: {
      xs: theme.typography.fontSize.md,     // 16px on phones
      md: theme.typography.fontSize.lg,     // 20px on tablets
    },
    lineHeight: {
      xs: 22,
      md: 26,
    },
    marginBottom: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
  },
  content: {
    marginTop: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
  },
}));
```

### Responsive List Component

```typescript
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FlashList } from '@shopify/flash-list';

export function ResponsiveList({ data, renderItem }) {
  const { styles } = useStyles(stylesheet);
  const numColumns = useBreakpointValue({ xs: 1, md: 2, lg: 3 });

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      numColumns={numColumns}
      contentContainerStyle={styles.list}
      estimatedItemSize={200}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  list: {
    padding: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
    gap: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
  },
}));
```

### Responsive Form Layout

```typescript
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View } from 'react-native';

export function ResponsiveForm({ children }) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.form}>
      {children}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  form: {
    width: {
      xs: '100%',
      md: '80%',
      lg: 600,
    },
    maxWidth: {
      xs: '100%',
      md: 600,
      lg: 800,
    },
    alignSelf: 'center',
    padding: {
      xs: theme.spacing.md,
      md: theme.spacing.xl,
      lg: theme.spacing.xxl,
    },
  },
}));
```

---

## Handling Orientation Changes

### Responsive to Orientation

```typescript
import { useBreakpointValue } from 'react-native-unistyles';
import { useDeviceOrientation } from '@/utils/device/device.utils';

function OrientationAwareComponent() {
  const orientation = useDeviceOrientation();
  const isLandscape = orientation === 'landscape';

  const columns = useBreakpointValue({
    xs: isLandscape ? 2 : 1,    // 2 columns in landscape on phones
    md: isLandscape ? 4 : 3,    // 4 columns in landscape on tablets
    lg: isLandscape ? 6 : 4,    // 6 columns in landscape on large tablets
  });

  // Use columns for layout
}
```

---

## Testing Responsive Designs

### 1. Visual Testing Checklist

- [ ] Test on smallest phone (iPhone SE)
- [ ] Test on standard phone (iPhone 14)
- [ ] Test on large phone (iPhone Pro Max)
- [ ] Test on tablet (iPad)
- [ ] Test in portrait orientation
- [ ] Test in landscape orientation
- [ ] Verify touch targets are adequate (min 44x44pt)
- [ ] Verify text is readable (not too small/large)
- [ ] Verify spacing is consistent
- [ ] Verify layouts don't break

### 2. Automated Testing

```typescript
import { render } from '@testing-library/react-native';
import { UnistylesRegistry } from 'react-native-unistyles';

// Mock different breakpoints in tests
describe('ResponsiveComponent', () => {
  it('renders correctly on phone', () => {
    UnistylesRegistry.setBreakpoint('xs');
    const { getByTestId } = render(<ResponsiveComponent />);
    // Assert phone-specific behavior
  });

  it('renders correctly on tablet', () => {
    UnistylesRegistry.setBreakpoint('md');
    const { getByTestId } = render(<ResponsiveComponent />);
    // Assert tablet-specific behavior
  });
});
```

---

## Common Patterns

### 1. Responsive Text Sizes

```typescript
const styles = createStyleSheet((theme) => ({
  heading: {
    fontSize: {
      xs: theme.typography.fontSize.xl,     // 20px
      md: theme.typography.fontSize.xxl,    // 24px
      lg: theme.typography.fontSize.xxxl,    // 28px
    },
  },
  body: {
    fontSize: {
      xs: theme.typography.fontSize.md,      // 16px
      md: theme.typography.fontSize.lg,      // 18px
    },
  },
}));
```

### 2. Responsive Margins/Padding

```typescript
const styles = createStyleSheet((theme) => ({
  container: {
    marginHorizontal: {
      xs: theme.spacing.md,     // 16px
      md: theme.spacing.xl,     // 24px
      lg: 'auto',               // Center on large screens
    },
    maxWidth: {
      xs: '100%',
      md: 600,
      lg: 800,
    },
  },
}));
```

### 3. Responsive Grid Columns

```typescript
const styles = createStyleSheet((theme) => ({
  gridItem: {
    width: {
      xs: '100%',    // 1 column
      sm: '50%',     // 2 columns
      md: '33.33%',  // 3 columns
      lg: '25%',     // 4 columns
    },
  },
}));
```

---

## Migration from Dimension-Based Libraries

If you have existing code using `react-native-responsive-screen` or `react-native-size-matters`:

### Step 1: Remove Old Libraries

```bash
pnpm remove react-native-responsive-screen react-native-size-matters
```

### Step 2: Replace Dimension-Based Code

**Before:**
```typescript
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP('90%'),
    padding: heightPercentageToDP('2%'),
  },
});
```

**After:**
```typescript
import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet((theme) => ({
  container: {
    width: {
      xs: '100%',
      md: '90%',
      lg: 800,
    },
    padding: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
  },
}));
```

---

## Performance Considerations

### 1. Unistyles Optimizations

- ✅ Breakpoints are resolved at compile-time when possible
- ✅ Styles are memoized automatically
- ✅ No runtime calculations for static breakpoints
- ✅ Better performance than dimension-based libraries

### 2. Best Practices

- Use breakpoint values instead of calculating from dimensions
- Avoid frequent breakpoint checks in render
- Use `useBreakpointValue` hook sparingly (only when needed)
- Prefer style-based responsive design over conditional rendering

---

## Design System Integration

Responsive design integrates seamlessly with our design system:

```typescript
const styles = createStyleSheet((theme) => ({
  button: {
    // Responsive sizing
    minHeight: {
      xs: 44,
      md: 48,
    },
    // Theme colors
    backgroundColor: theme.colors.primary,
    // Theme spacing
    paddingHorizontal: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
    // Theme typography
    fontSize: {
      xs: theme.typography.fontSize.md,
      md: theme.typography.fontSize.lg,
    },
    // Theme border radius
    borderRadius: theme.borderRadius.md,
  },
}));
```

---

## Troubleshooting

### Issue: Styles Not Updating on Breakpoint Change

**Solution:** Ensure you're using `useStyles` hook:

```typescript
// ✅ Correct
const { styles } = useStyles(stylesheet);

// ❌ Incorrect
const styles = stylesheet;
```

### Issue: Breakpoint Values Not Working

**Solution:** Check breakpoint configuration in `src/config/breakpoints.ts` and ensure it's imported in `src/config/unistyles.ts`.

### Issue: Styles Look Different on Different Devices

**Solution:**
1. Verify breakpoint values are correct
2. Check that theme values are consistent
3. Test on actual devices, not just simulators
4. Ensure design system tokens are used consistently

---

## Resources

- [react-native-unistyles Documentation](https://reactnativeunistyles.vercel.app/)
- [React Native Dimensions API](https://reactnative.dev/docs/dimensions)
- [WCAG Touch Target Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Material Design Responsive Layout](https://material.io/design/layout/responsive-layout-grid.html)

---

**Last Updated:** February 18, 2026
