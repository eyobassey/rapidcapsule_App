import { Image, type ImageProps } from 'expo-image';
import React from 'react';
import type { ImageStyle, StyleProp } from 'react-native';

export interface AppImageProps extends Omit<ImageProps, 'style'> {
  style?: StyleProp<ImageStyle>;
  /**
   * Convenience flag to make the image circular.
   */
  rounded?: boolean;
}

export const AppImage: React.FC<AppImageProps> = ({
  rounded = false,
  style,
  contentFit = 'contain',
  ...props
}) => {
  return (
    <Image
      {...props}
      contentFit={contentFit}
      style={[rounded ? { borderRadius: 9999, overflow: 'hidden' } : null, style]}
    />
  );
};
