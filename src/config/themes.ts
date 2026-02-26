import { Platform } from 'react-native';

import { FONT_FAMILIES } from './fonts';
import { foundationColors } from './foundation-colors';

const { base, slate, blue, green, red, amber, sky, emerald, gray: _gray } = foundationColors;

// Light theme
export const lightTheme = {
  colors: {
    // Primary colors
    primary: blue[600],
    primaryDark: blue[700],
    primaryLight: blue[400],

    // Background colors
    background: base.white,
    backgroundSecondary: slate[50],
    backgroundTertiary: slate[100],

    // Text colors
    text: slate[900],
    textSecondary: slate[600],
    textTertiary: slate[500],

    // Border colors
    border: slate[200],
    borderLight: slate[100],

    // Status colors
    success: green[500],
    error: red[500],
    warning: amber[400],
    info: sky[500],

    // Health tech specific
    healthPrimary: blue[600],
    healthSecondary: sky[400],
    healthAccent: emerald[400],

    // Common UI text helpers
    buttonText: base.white,

    // Full Figma foundation palette
    palette: foundationColors,
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
    primary: blue[400],
    primaryDark: blue[500],
    primaryLight: sky[300],

    // Background colors
    background: slate[950],
    backgroundSecondary: slate[900],
    backgroundTertiary: slate[800],

    // Text colors
    text: base.white,
    textSecondary: slate[300],
    textTertiary: slate[400],

    // Border colors
    border: slate[700],
    borderLight: slate[600],

    // Status colors
    success: green[400],
    error: red[400],
    warning: amber[300],
    info: sky[400],

    // Health tech specific
    healthPrimary: blue[400],
    healthSecondary: sky[400],
    healthAccent: emerald[400],

    // Common UI text helpers
    buttonText: base.white,

    // Full Figma foundation palette
    palette: foundationColors,
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
