/**
 * Style Helpers
 *
 * Type-safe helpers for StyleSheet and theme access
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { ExtendedThemeColors, getExtendedThemeColors } from '@/types/theme.types';

// Re-export for convenience
export { getExtendedThemeColors };

/**
 * Type helper for StyleSheet.create with theme
 */
export type StyleSheetCreator<T> = (theme: ReturnType<typeof useUnistyles>['theme']) => T;

/**
 * Get extended theme colors safely
 */
export const useExtendedThemeColors = (): ExtendedThemeColors => {
  const { theme } = useUnistyles();
  return getExtendedThemeColors(theme.colors);
};

/**
 * Type-safe style array helper
 */
export const combineStyles = (
  ...styles: (ViewStyle | TextStyle | false | undefined | null)[]
): StyleProp<ViewStyle | TextStyle> => {
  const filtered = styles.filter((style): style is ViewStyle | TextStyle => Boolean(style));
  if (filtered.length === 0) return undefined;
  if (filtered.length === 1) return filtered[0];
  return filtered;
};
