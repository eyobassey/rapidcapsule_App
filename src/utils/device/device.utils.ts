/**
 * Device Utilities
 *
 * Device and platform detection utilities
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Check if running on iOS
 */
export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * Check if running on Android
 */
export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

/**
 * Check if running on web
 */
export const isWeb = (): boolean => {
  return Platform.OS === 'web';
};

/**
 * Get platform name
 */
export const getPlatform = (): 'ios' | 'android' | 'web' => {
  return Platform.OS as 'ios' | 'android' | 'web';
};

/**
 * Get device model (iOS only)
 */
export const getDeviceModel = (): string | null => {
  if (isIOS() && Constants.deviceName) {
    return Constants.deviceName;
  }
  return null;
};

/**
 * Get app version
 */
export const getAppVersion = (): string => {
  return Constants.expoConfig?.version || '1.0.0';
};

/**
 * Get build number
 */
export const getBuildNumber = (): string => {
  if (isIOS()) {
    return Constants.expoConfig?.ios?.buildNumber || '1';
  }
  if (isAndroid()) {
    return Constants.expoConfig?.android?.versionCode?.toString() || '1';
  }
  return '1';
};

/**
 * Check if device is a tablet
 */
export const isTablet = (): boolean => {
  // This is a simple check - you might want to use a library like react-native-device-info
  // for more accurate detection
  return false; // TODO: Implement proper tablet detection
};

/**
 * Get safe area insets (requires react-native-safe-area-context)
 */
export const getSafeAreaInsets = () => {
  // This would typically use useSafeAreaInsets hook
  // Returning default values here
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
};
