/**
 * Font Configuration
 *
 * Platform-specific font configuration for iOS and Android
 *
 * Created: February 20, 2026
 * Author: Aarav Mishra
 */

import { Platform } from 'react-native';

/**
 * Font families
 * - iOS: ui-rounded (alias for SF Pro Rounded on iOS)
 * - Android: Open Runde
 */
export const FONT_FAMILIES = {
  ios: {
    // iOS uses the ui-rounded alias family; weight is controlled via fontWeight.
    regular: 'ui-rounded',
    medium: 'ui-rounded',
    semibold: 'ui-rounded',
    bold: 'ui-rounded',
  },
  android: {
    regular: 'OpenRunde-Regular',
    medium: 'OpenRunde-Medium',
    semibold: 'OpenRunde-SemiBold',
    bold: 'OpenRunde-Bold',
  },
} as const;

/**
 * Get platform-specific font family
 */
export const getFontFamily = (
  weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular'
): string => {
  if (Platform.OS === 'ios') {
    return FONT_FAMILIES.ios[weight];
  }
  return FONT_FAMILIES.android[weight];
};

/**
 * Font weights mapping
 */
export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;
