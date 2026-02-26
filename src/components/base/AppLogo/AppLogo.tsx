import logomark from '@assets/logomark.png';
import React from 'react';
import { Image, type ImageStyle, type StyleProp } from 'react-native';

const ASPECT_RATIO = 256 / 260;

const PRESET_SIZES = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
} as const;

export type AppLogoSize = keyof typeof PRESET_SIZES;

export interface AppLogoProps {
  size?: AppLogoSize | number;
  style?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  style,
  accessibilityLabel = 'Rapid Capsule',
}) => {
  const dimension = typeof size === 'number' ? size : PRESET_SIZES[size];

  return (
    <Image
      source={logomark}
      resizeMode="contain"
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      style={[
        {
          width: dimension,
          height: dimension / ASPECT_RATIO,
        },
        style,
      ]}
    />
  );
};
