# Font Configuration Guide

**Created**: February 20, 2026  
**Author**: Aarav Mishra

---

## Overview

The Rapid Capsule mobile app uses platform-specific fonts:
- **iOS**: SF Pro (system font)
- **Android**: Open Runde

Fonts are automatically loaded when the app starts using `expo-font`.

---

## Font Setup

### iOS: SF Pro

SF Pro is Apple's system font and is available on all iOS devices. No additional setup is required - the app will use the system font automatically.

**Font Weights Available:**
- Regular (400)
- Medium (500)
- Semibold (600)
- Bold (700)

### Android: Open Runde

Open Runde is a rounded variant of Inter, designed to be similar to SF Pro Rounded. Font files must be downloaded and placed in `assets/fonts/`.

#### Download Instructions

1. Visit: https://github.com/lauridskern/open-runde/releases/latest
2. Download `OpenRunde-1.0.1.zip`
3. Extract the ZIP file
4. Copy the following font files to `assets/fonts/`:
   - `OpenRunde-Regular.ttf`
   - `OpenRunde-Medium.ttf`
   - `OpenRunde-SemiBold.ttf`
   - `OpenRunde-Bold.ttf`

**Required Font Files:**
```
assets/fonts/
├── OpenRunde-Regular.ttf
├── OpenRunde-Medium.ttf
├── OpenRunde-SemiBold.ttf
├── OpenRunde-Bold.ttf
└── README.md
```

---

## Font Loading

Fonts are automatically loaded in `app/_layout.tsx` using the `useFonts` hook:

```typescript
import { useFonts } from '@/utils/font/font.utils';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts();
  
  // Show loading screen until fonts are loaded
  if (!fontsLoaded) {
    return <LoadingScreen />;
  }
  
  return <App />;
}
```

**Note**: On iOS, fonts load instantly (system fonts). On Android, fonts are loaded from assets.

---

## Using Fonts

### Method 1: Using Theme Typography (Recommended)

The theme includes platform-specific font families:

```typescript
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  text: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
}));
```

### Method 2: Using Font Helper Function

Use `getFontFamily()` for direct access:

```typescript
import { getFontFamily } from '@/config/fonts';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  text: {
    fontFamily: getFontFamily('regular'),
    fontSize: theme.typography.fontSize.md,
  },
  
  boldText: {
    fontFamily: getFontFamily('bold'),
    fontSize: theme.typography.fontSize.lg,
  },
}));
```

### Method 3: Direct Font Family Names

You can also use font family names directly:

```typescript
// iOS
fontFamily: 'SFProDisplay-Regular'

// Android
fontFamily: 'OpenRunde-Regular'
```

---

## Font Configuration

Font configuration is defined in `src/config/fonts.ts`:

```typescript
export const FONT_FAMILIES = {
  ios: {
    regular: 'SFProDisplay-Regular',
    medium: 'SFProDisplay-Medium',
    semibold: 'SFProDisplay-Semibold',
    bold: 'SFProDisplay-Bold',
  },
  android: {
    regular: 'OpenRunde-Regular',
    medium: 'OpenRunde-Medium',
    semibold: 'OpenRunde-SemiBold',
    bold: 'OpenRunde-Bold',
  },
};
```

---

## Font Weights

Font weights are standardized across platforms:

| Weight | Value | iOS Font | Android Font |
|--------|-------|----------|--------------|
| Regular | 400 | SFProDisplay-Regular | OpenRunde-Regular |
| Medium | 500 | SFProDisplay-Medium | OpenRunde-Medium |
| Semibold | 600 | SFProDisplay-Semibold | OpenRunde-SemiBold |
| Bold | 700 | SFProDisplay-Bold | OpenRunde-Bold |

---

## Troubleshooting

### Fonts Not Loading on Android

1. **Check font files exist**: Ensure all 4 Open Runde font files are in `assets/fonts/`
2. **Check file names**: Font file names must match exactly (case-sensitive)
3. **Rebuild app**: After adding fonts, rebuild the app (`pnpm run android`)
4. **Check font loading**: Check console for font loading errors

### Fonts Not Displaying Correctly

1. **Verify font names**: Ensure font family names match exactly
2. **Check platform**: Use `Platform.OS` to verify you're using the correct font
3. **Test on device**: Some fonts may not render correctly in simulators

### iOS Font Issues

SF Pro is a system font, so it should always work. If you're seeing fallback fonts:

1. **Check font name**: Ensure you're using `SFProDisplay-*` names
2. **Verify iOS version**: SF Pro is available on iOS 9.0+
3. **Use system font**: Consider using `System` as fallback

---

## Best Practices

1. **Always use theme typography**: Use `theme.typography.fontFamily` for consistency
2. **Platform-aware**: Let the system handle platform differences automatically
3. **Font loading**: Always wait for fonts to load before showing content
4. **Fallback fonts**: Consider adding fallback fonts for better compatibility
5. **Performance**: Fonts are loaded once at app startup, so there's minimal performance impact

---

## License

- **SF Pro**: Apple's proprietary font (system font on iOS)
- **Open Runde**: SIL Open Font License - See https://github.com/lauridskern/open-runde/blob/main/LICENSE.txt

Both fonts are free to use for this project.

---

## References

- [expo-font Documentation](https://docs.expo.dev/versions/latest/sdk/font/)
- [Open Runde GitHub](https://github.com/lauridskern/open-runde)
- [SF Pro Font Information](https://developer.apple.com/fonts/)
