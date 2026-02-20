/**
 * Responsive Hooks
 *
 * Custom hooks for responsive design using react-native-unistyles
 *
 * Created: February 18, 2026
 * Author: Aarav Mishra
 */

import { Dimensions } from 'react-native';

import { breakpoints } from '@/config/breakpoints';

/**
 * Responsive value configuration
 */
export type ResponsiveValue<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

/**
 * Get current breakpoint based on screen width
 */
function getCurrentBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
  const { width } = Dimensions.get('window');
  
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * Get responsive value based on current breakpoint
 * Note: For style values, use breakpoint objects directly in StyleSheet.create()
 * This utility is for non-style values (e.g., conditional logic, calculations)
 *
 * @param values - Object with breakpoint keys and values
 * @returns The value for the current breakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const columns = getResponsiveValue({
 *     xs: 1,
 *     md: 3,
 *     lg: 4,
 *   });
 *   return <Grid numColumns={columns} />;
 * }
 * ```
 */
export function getResponsiveValue<T>(values: ResponsiveValue<T>): T {
  const currentBreakpoint = getCurrentBreakpoint();
  
  // Return value for current breakpoint, or fallback to nearest smaller breakpoint
  if (values[currentBreakpoint] !== undefined) {
    return values[currentBreakpoint] as T;
  }

  // Fallback logic: find nearest smaller breakpoint
  const breakpointOrder: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp] as T;
    }
  }

  // Fallback to first available value
  const firstValue = Object.values(values)[0];
  if (firstValue !== undefined) {
    return firstValue as T;
  }

  throw new Error('No responsive value found');
}

/**
 * Hook to get responsive value based on current breakpoint
 * Note: This hook subscribes to dimension changes
 *
 * @param values - Object with breakpoint keys and values
 * @returns The value for the current breakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const columns = useResponsiveValue({
 *     xs: 1,
 *     md: 3,
 *     lg: 4,
 *   });
 *   return <Grid numColumns={columns} />;
 * }
 * ```
 */
export function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
  // Note: This is a simple implementation. For production, consider using
  // a library like react-native-use-dimensions or Dimensions.addEventListener
  // to properly subscribe to dimension changes
  return getResponsiveValue(values);
}

/**
 * Hook to check if current breakpoint matches a condition
 *
 * @param breakpoint - Breakpoint to check ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 * @returns Boolean indicating if current breakpoint matches
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isTablet = useIsBreakpoint('md');
 *   return isTablet ? <TabletLayout /> : <PhoneLayout />;
 * }
 * ```
 */
export function useIsBreakpoint(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): boolean {
  const currentBreakpoint = getCurrentBreakpoint();
  return currentBreakpoint === breakpoint;
}

/**
 * Hook to check if current breakpoint is at least a certain size
 *
 * @param minBreakpoint - Minimum breakpoint ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 * @returns Boolean indicating if current breakpoint is >= minBreakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isTabletOrLarger = useIsBreakpointAtLeast('md');
 *   return isTabletOrLarger ? <WideLayout /> : <NarrowLayout />;
 * }
 * ```
 */
export function useIsBreakpointAtLeast(
  minBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
): boolean {
  const breakpointOrder: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  const currentBreakpoint = getCurrentBreakpoint();

  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  const minIndex = breakpointOrder.indexOf(minBreakpoint);

  return currentIndex >= minIndex;
}

/**
 * Hook to check if current breakpoint is at most a certain size
 *
 * @param maxBreakpoint - Maximum breakpoint ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 * @returns Boolean indicating if current breakpoint is <= maxBreakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isPhone = useIsBreakpointAtMost('sm');
 *   return isPhone ? <PhoneLayout /> : <TabletLayout />;
 * }
 * ```
 */
export function useIsBreakpointAtMost(
  maxBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
): boolean {
  const breakpointOrder: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  const currentBreakpoint = getCurrentBreakpoint();

  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  const maxIndex = breakpointOrder.indexOf(maxBreakpoint);

  return currentIndex <= maxIndex;
}

/**
 * Hook to check if device is tablet-sized (md breakpoint or larger)
 *
 * @returns Boolean indicating if device is tablet-sized
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isTablet = useIsTablet();
 *   return isTablet ? <TabletLayout /> : <PhoneLayout />;
 * }
 * ```
 */
export function useIsTablet(): boolean {
  return useIsBreakpointAtLeast('md');
}

/**
 * Hook to check if device is phone-sized (smaller than md breakpoint)
 *
 * @returns Boolean indicating if device is phone-sized
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isPhone = useIsPhone();
 *   return isPhone ? <PhoneLayout /> : <TabletLayout />;
 * }
 * ```
 */
export function useIsPhone(): boolean {
  return useIsBreakpointAtMost('sm');
}

/**
 * Hook to get number of columns for grid layout based on breakpoint
 *
 * @param columns - Object with breakpoint keys and column counts
 * @returns Number of columns for current breakpoint
 *
 * @example
 * ```tsx
 * function GridComponent() {
 *   const columns = useResponsiveColumns({
 *     xs: 1,
 *     sm: 2,
 *     md: 3,
 *     lg: 4,
 *   });
 *   return <Grid numColumns={columns} />;
 * }
 * ```
 */
export function useResponsiveColumns(
  columns: ResponsiveValue<number>,
): number {
  return useResponsiveValue(columns);
}

/**
 * Hook to get responsive spacing value
 *
 * @param spacing - Object with breakpoint keys and spacing values
 * @returns Spacing value for current breakpoint
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const padding = useResponsiveSpacing({
 *     xs: 16,
 *     md: 24,
 *     lg: 32,
 *   });
 *   return <View style={{ padding }} />;
 * }
 * ```
 */
export function useResponsiveSpacing(
  spacing: ResponsiveValue<number>,
): number {
  return useResponsiveValue(spacing);
}
