import { Platform } from 'react-native';

import { FONT_FAMILIES } from './fonts';

// Light theme
export const lightTheme = {
  colors: {
    // Primary colors
    primary: '#007AFF',
    primaryDark: '#0051D5',
    primaryLight: '#5AC8FA',
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F7',
    backgroundTertiary: '#E5E5EA',
    
    // Text colors
    text: '#000000',
    textSecondary: '#6E6E73',
    textTertiary: '#8E8E93',
    
    // Border colors
    border: '#C6C6C8',
    borderLight: '#E5E5EA',
    
    // Status colors
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#007AFF',
    
    // Health tech specific
    healthPrimary: '#007AFF',
    healthSecondary: '#5AC8FA',
    healthAccent: '#34C759',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    fontFamily: Platform.OS === 'ios' ? FONT_FAMILIES.ios : FONT_FAMILIES.android,
  },
} as const;

// Dark theme
export const darkTheme = {
  colors: {
    // Primary colors
    primary: '#0A84FF',
    primaryDark: '#0051D5',
    primaryLight: '#5AC8FA',
    
    // Background colors
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    backgroundTertiary: '#2C2C2E',
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: '#98989D',
    textTertiary: '#636366',
    
    // Border colors
    border: '#38383A',
    borderLight: '#2C2C2E',
    
    // Status colors
    success: '#30D158',
    error: '#FF453A',
    warning: '#FF9F0A',
    info: '#0A84FF',
    
    // Health tech specific
    healthPrimary: '#0A84FF',
    healthSecondary: '#5AC8FA',
    healthAccent: '#30D158',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    fontFamily: Platform.OS === 'ios' ? FONT_FAMILIES.ios : FONT_FAMILIES.android,
  },
} as const;
