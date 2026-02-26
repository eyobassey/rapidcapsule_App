import { StyleSheet, type UnistylesThemes } from 'react-native-unistyles';

import { breakpoints } from './breakpoints';
import { darkTheme, lightTheme } from './themes';

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

/** Theme type inferred from augmented UnistylesThemes (light | dark) */
export type UnistylesTheme = UnistylesThemes[keyof UnistylesThemes];

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  breakpoints,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    initialTheme: 'light',
  },
});
