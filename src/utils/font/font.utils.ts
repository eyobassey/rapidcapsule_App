/**
 * Font Utilities
 *
 * Utilities for loading and managing custom fonts
 *
 * Created: February 20, 2026
 * Author: Aarav Mishra
 */

import { useFonts as useExpoFonts } from 'expo-font';
import { Platform } from 'react-native';

import { FONT_FAMILIES } from '@/config/fonts';

/**
 * Font loading configuration
 * Maps font names to their asset paths
 * 
 * Note: Font files must be downloaded and placed in assets/fonts/
 * See assets/fonts/README.md for download instructions
 */
const FONT_ASSETS = {
  // iOS: SF Pro (system font, no loading needed)
  // Android: Open Runde fonts (OTF format)
  'OpenRunde-Regular': require('../../../assets/fonts/OpenRunde-Regular.otf'),
  'OpenRunde-Medium': require('../../../assets/fonts/OpenRunde-Medium.otf'),
  'OpenRunde-SemiBold': require('../../../assets/fonts/OpenRunde-SemiBold.otf'),
  'OpenRunde-Bold': require('../../../assets/fonts/OpenRunde-Bold.otf'),
} as const;

/**
 * Get fonts to load based on platform
 */
const getFontsToLoad = (): Record<string, number> => {
  if (Platform.OS === 'ios') {
    // iOS uses SF Pro system font, no loading needed
    return {};
  }
  // Android: Load Open Runde fonts
  return FONT_ASSETS;
};

/**
 * Hook to load custom fonts
 * Returns loading state and error state
 *
 * @returns {[boolean, Error | null]} [fontsLoaded, fontError]
 */
export const useFonts = (): [boolean, Error | null] => {
  const fontsToLoad = getFontsToLoad();
  const [fontsLoaded, fontError] = useExpoFonts(fontsToLoad);

  return [fontsLoaded, fontError];
};

/**
 * Load all fonts synchronously (for use outside React components)
 * Note: This should be called during app initialization
 */
export const loadFonts = async (): Promise<void> => {
  if (Platform.OS === 'ios') {
    // iOS uses system fonts, no loading needed
    return;
  }

  // For Android, fonts are loaded via useFonts hook
  // This function is provided for future use cases
  const { loadAsync } = await import('expo-font');
  const fontsToLoad = getFontsToLoad();
  await loadAsync(fontsToLoad);
};
