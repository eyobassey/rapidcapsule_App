# Font Assets

This directory contains custom font files for the Rapid Capsule mobile app.

## Font Setup

### iOS: SF Pro
SF Pro is a system font on iOS and doesn't need to be downloaded. The app will use the system font automatically.

**Note**: If you need to use custom SF Pro font files (e.g., for specific weights not available in the system), you can download them from Apple's developer resources and place them here.

### Android: Open Runde

Open Runde fonts need to be downloaded and placed in this directory.

#### Download Instructions

1. Download the latest release from: https://github.com/lauridskern/open-runde/releases/latest
2. Extract the ZIP file
3. Copy the following font files to this directory:
   - `OpenRunde-Regular.ttf`
   - `OpenRunde-Medium.ttf`
   - `OpenRunde-SemiBold.ttf`
   - `OpenRunde-Bold.ttf`

#### Required Font Files

After downloading, this directory should contain:

```
assets/fonts/
├── OpenRunde-Regular.ttf
├── OpenRunde-Medium.ttf
├── OpenRunde-SemiBold.ttf
├── OpenRunde-Bold.ttf
└── README.md
```

## Font Usage

Fonts are automatically loaded when the app starts. Use the font families defined in `src/config/fonts.ts`:

```typescript
import { getFontFamily } from '@/config/fonts';

// In your styles
const styles = StyleSheet.create((theme) => ({
  text: {
    fontFamily: getFontFamily('regular'), // Platform-specific
    fontSize: theme.typography.fontSize.md,
  },
}));
```

Or use theme typography:

```typescript
const styles = StyleSheet.create((theme) => ({
  text: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
}));
```

## License

- **SF Pro**: Apple's proprietary font (system font on iOS)
- **Open Runde**: Same license as Inter (SIL Open Font License) - See https://github.com/lauridskern/open-runde/blob/main/LICENSE.txt
