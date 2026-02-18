/**
 * Theme Type Extensions
 *
 * Extended theme types for components that use optional theme properties
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import { useUnistyles } from 'react-native-unistyles';

/**
 * Extended theme colors with optional properties
 */
export interface ExtendedThemeColors {
  // Base colors (required)
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  healthAccent: string;

  // Optional extended colors
  secondary?: string;
  buttonText?: string;
  badgeText?: string;
  cardBackground?: string;
  shadow?: string;
  overlay?: string;
  info?: string;
  warning?: string;
}

/**
 * Get extended theme colors with fallbacks
 */
export const getExtendedThemeColors = (
  colors: ReturnType<typeof useUnistyles>['theme']['colors']
): ExtendedThemeColors => {
  return {
    ...colors,
    secondary: (colors as Partial<ExtendedThemeColors>).secondary || colors.primary,
    buttonText: (colors as Partial<ExtendedThemeColors>).buttonText || colors.background,
    badgeText: (colors as Partial<ExtendedThemeColors>).badgeText || colors.background,
    cardBackground: (colors as Partial<ExtendedThemeColors>).cardBackground || colors.background,
    shadow: (colors as Partial<ExtendedThemeColors>).shadow || '#000',
    overlay: (colors as Partial<ExtendedThemeColors>).overlay || 'rgba(0, 0, 0, 0.5)',
    info: (colors as Partial<ExtendedThemeColors>).info || colors.primary,
    warning: (colors as Partial<ExtendedThemeColors>).warning || colors.error,
  };
};
