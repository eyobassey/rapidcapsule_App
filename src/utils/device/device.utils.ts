/**
 * Device Utilities
 *
 * Device and platform detection utilities
 *
 * Created: February 13, 2026
 * Updated: February 18, 2026
 * Author: Aarav Mishra
 */

import Constants from 'expo-constants';
import { Dimensions, Platform, ScaledSize } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Device orientation type
 */
export type DeviceOrientation = 'portrait' | 'landscape';

/**
 * Screen dimensions type
 */
export interface ScreenDimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

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
 * Get current screen dimensions
 */
export const getScreenDimensions = (): ScreenDimensions => {
  const { width, height, scale, fontScale } = Dimensions.get('window');
  return { width, height, scale, fontScale };
};

/**
 * Get current device orientation
 * @returns 'portrait' | 'landscape'
 */
export const getDeviceOrientation = (): DeviceOrientation => {
  const { width, height } = Dimensions.get('window');
  return width > height ? 'landscape' : 'portrait';
};

/**
 * Check if device is in landscape orientation
 */
export const isLandscape = (): boolean => {
  return getDeviceOrientation() === 'landscape';
};

/**
 * Check if device is in portrait orientation
 */
export const isPortrait = (): boolean => {
  return getDeviceOrientation() === 'portrait';
};

/**
 * Check if device is a tablet based on screen dimensions
 * Uses breakpoint-based detection (md breakpoint = 768px)
 */
export const isTablet = (): boolean => {
  const { width, height } = Dimensions.get('window');
  const minDimension = Math.min(width, height);
  // Consider device a tablet if smallest dimension is >= 768px (md breakpoint)
  return minDimension >= 768;
};

/**
 * Check if device is a phone based on screen dimensions
 */
export const isPhone = (): boolean => {
  return !isTablet();
};

/**
 * Hook to get safe area insets
 * Uses react-native-safe-area-context
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const insets = useSafeAreaInsets();
 *   return <View style={{ paddingTop: insets.top }} />;
 * }
 * ```
 */
export { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Get device type category
 * @returns 'phone' | 'tablet'
 */
export const getDeviceType = (): 'phone' | 'tablet' => {
  return isTablet() ? 'tablet' : 'phone';
};

/**
 * Get pixel ratio
 */
export const getPixelRatio = (): number => {
  return Dimensions.get('window').scale;
};

/**
 * Get font scale
 */
export const getFontScale = (): number => {
  return Dimensions.get('window').fontScale;
};

/**
 * Check if device has notch (iOS only, approximate)
 */
export const hasNotch = (): boolean => {
  if (!isIOS()) {
    return false;
  }
  const { height } = Dimensions.get('window');
  // iPhone X and later have notch (height >= 812)
  return height >= 812;
};
