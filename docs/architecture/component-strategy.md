# Component Strategy: Custom Base vs Reactix

**Created**: February 18, 2026  
**Author**: Aarav Mishra

---

## Executive Summary

This document outlines the strategic decision on whether to maintain custom base components alongside Reactix components, and provides guidelines on when to use each.

**Recommendation**: **Hybrid Approach** - Maintain custom base components for core UI elements, use Reactix for complex animated components and new features.

---

## Current State

### Custom Base Components (`src/components/base/`)
- ✅ **10 components** already built and integrated
- ✅ Fully integrated with our design system (Unistyles, theme tokens)
- ✅ Accessibility features (WCAG 2.1 Level AA)
- ✅ Follow our naming convention (App prefix)
- ✅ Production-ready and tested
- ✅ Responsive design built-in

**Components:**
- AppButton
- AppText
- AppInput
- AppCard
- AppModal
- AppLoading
- AppBadge
- AppAvatar
- AppSeparator
- AppPressable

### Reactix Components (`src/shared/ui/`)
- ✅ **5 components** synced so far
- ✅ Rich animations and interactions
- ✅ Industry-standard implementations
- ⚠️ Need adaptation to our design system
- ⚠️ Different naming convention (no App prefix)

**Components Synced:**
- Button (atoms)
- Accordion (molecules)
- Card (molecules)
- GooeySwitch (micro-interactions)
- SpinButton (micro-interactions)

---

## Analysis: Keep Custom Base Components?

### ✅ Reasons to Keep Custom Base Components

#### 1. **Deep Design System Integration**
Our custom components are already fully integrated:
- Use `react-native-unistyles` with theme tokens
- Responsive breakpoints built-in
- Consistent spacing, typography, colors
- No adaptation needed

**Example:**
```typescript
// Our AppButton - already integrated
const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    padding: {
      xs: theme.spacing.md,
      md: theme.spacing.lg,
    },
  },
}));
```

#### 2. **Accessibility First**
Our components have accessibility built-in:
- WCAG 2.1 Level AA compliance
- Proper accessibility labels and hints
- Touch target sizes (min 44x44pt)
- Screen reader support
- Tested with VoiceOver/TalkBack

**Example:**
```typescript
<AppButton
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit"
  accessibilityRole="button"
/>
```

#### 3. **Consistent Naming Convention**
All our components use "App" prefix:
- `AppButton`, `AppText`, `AppInput`
- Consistent with project conventions
- Easy to identify custom vs third-party

#### 4. **Production-Ready & Tested**
- Already in use across the codebase
- Tested in production scenarios
- Known behavior and edge cases handled
- No migration risk

#### 5. **Full Control & Customization**
- Can modify to match exact requirements
- No external dependency for core UI
- Faster iteration for project-specific needs

### ❌ Reasons to Remove Custom Base Components

#### 1. **Code Duplication**
- Maintaining two component systems
- Similar functionality in both
- Increased maintenance burden

#### 2. **Reactix Has More Features**
- Rich animations out of the box
- More component variants
- Regular updates from Reactix team

#### 3. **Reduced Maintenance**
- One less codebase to maintain
- Focus on business logic instead

---

## Recommended Strategy: Hybrid Approach

### Keep Custom Base Components For:

#### 1. **Core UI Elements** (High Usage, Deep Integration)
These are used everywhere and benefit from our design system integration:

- ✅ **AppButton** - Used extensively, fully integrated
- ✅ **AppText** - Typography foundation, theme-integrated
- ✅ **AppInput** - Form foundation, validation integrated
- ✅ **AppCard** - Layout foundation, responsive
- ✅ **AppModal** - Overlay foundation, accessibility built-in

**Rationale:**
- Used in 80%+ of screens
- Deep integration with our design system
- Already production-ready
- Migration would be high-risk, low-reward

#### 2. **Components Requiring Deep Customization**
- **AppLoading** - Custom loading states for our app
- **AppBadge** - Health tech specific badge variants
- **AppAvatar** - Patient/doctor avatars with specific logic
- **AppSeparator** - Consistent spacing component
- **AppPressable** - Base pressable with our accessibility

**Rationale:**
- Project-specific requirements
- Health tech domain logic
- Custom business rules

### Use Reactix Components For:

#### 1. **Complex Animated Components**
Reactix excels at animations:

- ✅ **GooeySwitch** - Complex animated toggle
- ✅ **SpinButton** - Animated button interactions
- ✅ **Accordion** - Animated collapsible sections
- ✅ Future animated components

**Rationale:**
- Complex animations are Reactix's strength
- Would require significant effort to build ourselves
- Low integration risk (used sparingly)

#### 2. **New Components We Haven't Built**
When we need a component we don't have:

- ✅ **Card** (if we need Reactix's animated version)
- ✅ **Toast/Notification** components
- ✅ **Bottom Sheet** variants
- ✅ **Date Picker** components
- ✅ Any new component requirements

**Rationale:**
- Faster to integrate Reactix than build from scratch
- Can adapt to our design system as needed
- Evaluate on case-by-case basis

#### 3. **One-Off or Specialized Components**
Components used in specific contexts:

- ✅ **Micro-interactions** - Special animated effects
- ✅ **Complex form components** - Advanced inputs
- ✅ **Data visualization** - Charts, graphs

**Rationale:**
- Not worth building custom for one-off use
- Reactix provides production-ready solutions

---

## Decision Matrix

| Component | Keep Custom? | Use Reactix? | Rationale |
|-----------|--------------|--------------|-----------|
| **Button** | ✅ Yes | ❌ No | Core component, fully integrated, used everywhere |
| **Text** | ✅ Yes | ❌ No | Typography foundation, theme-integrated |
| **Input** | ✅ Yes | ❌ No | Form foundation, validation integrated |
| **Card** | ✅ Yes | ⚠️ Maybe | Keep ours for standard cards, use Reactix for animated variants |
| **Modal** | ✅ Yes | ❌ No | Overlay foundation, accessibility built-in |
| **Loading** | ✅ Yes | ❌ No | Custom loading states for our app |
| **Badge** | ✅ Yes | ❌ No | Health tech specific variants |
| **Avatar** | ✅ Yes | ❌ No | Patient/doctor specific logic |
| **Separator** | ✅ Yes | ❌ No | Consistent spacing component |
| **Pressable** | ✅ Yes | ❌ No | Base component with accessibility |
| **Accordion** | ❌ No | ✅ Yes | Complex animation, use Reactix version |
| **GooeySwitch** | ❌ No | ✅ Yes | Complex animation, specialized component |
| **SpinButton** | ❌ No | ✅ Yes | Complex animation, specialized component |

---

## Migration Strategy (If Needed)

### Phase 1: Evaluation (Current)
- ✅ Document current components
- ✅ Identify overlap with Reactix
- ✅ Define usage patterns

### Phase 2: Gradual Migration (If Decided)
1. **Low-Risk Components First**
   - Start with components used in few places
   - Test thoroughly before full migration

2. **Adapt Reactix Components**
   - Wrap Reactix components with our design system
   - Add accessibility features
   - Add "App" prefix wrapper

3. **Deprecate Custom Versions**
   - Mark as deprecated
   - Provide migration guide
   - Remove after full migration

### Phase 3: Hybrid Maintenance
- Maintain custom for core components
- Use Reactix for new/specialized components
- Regular evaluation of component needs

---

## Guidelines for Component Selection

### Use Custom Base Components When:

1. ✅ **Component is used in 50%+ of screens**
2. ✅ **Requires deep design system integration**
3. ✅ **Has project-specific business logic**
4. ✅ **Already production-ready and tested**
5. ✅ **Accessibility is critical**

### Use Reactix Components When:

1. ✅ **Component has complex animations**
2. ✅ **Component is used sparingly (one-off)**
3. ✅ **We don't have a custom version yet**
4. ✅ **Reactix version has features we need**
5. ✅ **Building custom would take significant time**

### Adapt Reactix Components By:

1. **Wrapping with Design System**
   ```typescript
   // Wrap Reactix component
   export const AppAnimatedCard = ({ ...props }) => {
     const { theme } = useUnistyles();
     return (
       <Card
         {...props}
         style={adaptToTheme(theme, props.style)}
       />
     );
   };
   ```

2. **Adding Accessibility**
   ```typescript
   <ReactixComponent
     {...props}
     accessible
     accessibilityLabel={props.accessibilityLabel}
     accessibilityRole="button"
   />
   ```

3. **Adding App Prefix**
   ```typescript
   // Export with App prefix
   export { Card as AppCard } from './card';
   ```

---

## Recommended Action Plan

### Immediate Actions

1. ✅ **Keep all current custom base components**
   - They're production-ready and well-integrated
   - Migration risk outweighs benefits

2. ✅ **Use Reactix for new animated components**
   - GooeySwitch, SpinButton, Accordion
   - Any future animated components

3. ✅ **Create wrapper utilities**
   - Helper functions to adapt Reactix to our design system
   - Accessibility wrapper components

### Long-Term Strategy

1. **Evaluate Reactix components as we need them**
   - Don't migrate existing components unnecessarily
   - Use Reactix for gaps in our component library

2. **Maintain hybrid approach**
   - Custom for core, Reactix for specialized
   - Best of both worlds

3. **Regular review**
   - Quarterly evaluation of component needs
   - Consider migration only if clear benefits

---

## Component Usage Guidelines

### Import Patterns

```typescript
// Custom base components (core UI)
import { AppButton, AppText, AppInput } from '@/components/base';

// Reactix components (animated/specialized)
import { Accordion } from '@/shared/ui/molecules/accordion';
import { GooeySwitch } from '@/shared/ui/micro-interactions/gooey-switch';

// Wrapped Reactix components (if adapted)
import { AppAnimatedCard } from '@/components/reactix-wrappers';
```

### When to Create Wrapper

Create a wrapper component when:
- Reactix component needs design system integration
- Adding accessibility features
- Adding App prefix for consistency
- Used in multiple places

**Example:**
```typescript
// src/components/reactix-wrappers/AppAccordion.tsx
import { Accordion } from '@/shared/ui/molecules/accordion';
import { useUnistyles } from 'react-native-unistyles';

export const AppAccordion = ({ ...props }) => {
  const { theme } = useUnistyles();
  // Adapt to theme, add accessibility, etc.
  return <Accordion {...adaptedProps} />;
};
```

---

## Risk Assessment

### Keeping Custom Base Components

**Risks:**
- ⚠️ Maintenance burden (Low - already maintained)
- ⚠️ Code duplication (Low - different use cases)
- ⚠️ Inconsistency (Low - clear guidelines)

**Mitigation:**
- Clear documentation
- Usage guidelines
- Regular reviews

### Migrating to Reactix Only

**Risks:**
- 🔴 High migration effort
- 🔴 Breaking changes risk
- 🔴 Loss of design system integration
- 🔴 Accessibility regression
- 🔴 Testing overhead

**Mitigation:**
- Gradual migration
- Thorough testing
- Wrapper components

---

## Conclusion

**Recommendation: Keep Custom Base Components + Use Reactix Selectively**

### Why This Approach Works:

1. ✅ **Best of Both Worlds**
   - Custom components for core, reliable UI
   - Reactix for complex animations and new features

2. ✅ **Low Risk**
   - No migration needed for existing components
   - No breaking changes
   - Gradual adoption of Reactix

3. ✅ **Maintainable**
   - Clear guidelines on when to use what
   - No confusion about component choice
   - Focused maintenance effort

4. ✅ **Scalable**
   - Can add Reactix components as needed
   - Can migrate custom components later if needed
   - Flexible for future requirements

### Final Structure:

```
src/components/
├── base/              # Custom core components (KEEP)
│   ├── Button/
│   ├── Text/
│   ├── Input/
│   └── ...
└── reactix-wrappers/  # Wrapped Reactix components (CREATE)
    └── AppAccordion.tsx

src/shared/ui/         # Raw Reactix components (USE DIRECTLY)
├── atoms/
├── molecules/
└── micro-interactions/
```

---

**Last Updated**: February 18, 2026
