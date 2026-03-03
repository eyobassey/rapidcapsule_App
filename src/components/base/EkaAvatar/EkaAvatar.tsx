import ekaImage from '@assets/eka.png';
import React from 'react';
import { Image, type ImageStyle, type StyleProp, View, type ViewStyle } from 'react-native';

const PRESET_SIZES = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
} as const;

// Special multi-layer shadow used for Eka avatar in hero layouts.
const EKA_AVATAR_BOX_SHADOW = [
  '0px 8px 16px 0px #00000005',
  '0px 4px 8px 0px #00000008',
  '-3px -5px 11px 0px #00A6F440 inset',
  '0px 4px 32px -2px #0000000D',
  '0px 0px 0px 1px #4413060A',
  '0px 1px 1px 0px #024A700A',
  '0px 3px 3px 0px #024A7008',
  '0px 6px 4px 0px #024A7005',
  '0px 11px 4px 0px #024A7003',
].join(', ');

export type EkaAvatarSize = keyof typeof PRESET_SIZES;

export interface EkaAvatarProps {
  size?: EkaAvatarSize | number;
  style?: StyleProp<ViewStyle>;
  /** When true, omits container shadow (e.g. when used inside a FAB that has its own shadow) */
  disableShadow?: boolean;
}

export const EkaAvatar: React.FC<EkaAvatarProps> = ({ size = 'md', style, disableShadow }) => {
  const dimension = typeof size === 'number' ? size : PRESET_SIZES[size];
  const borderRadius = dimension / 2;

  const containerStyle: ViewStyle = {
    width: dimension,
    height: dimension,
    borderRadius,
    ...(!disableShadow && {
      boxShadow: EKA_AVATAR_BOX_SHADOW,
    }),
  };

  const imageStyle: ImageStyle = {
    width: dimension,
    height: dimension,
    borderRadius,
  };

  return (
    <View
      style={[containerStyle, style]}
      accessibilityLabel="Eka AI assistant"
      accessibilityRole="image"
    >
      <Image source={ekaImage} style={imageStyle} resizeMode="cover" />
    </View>
  );
};
