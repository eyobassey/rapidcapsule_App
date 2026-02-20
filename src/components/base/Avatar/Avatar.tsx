/**
 * AppAvatar Component
 *
 * Avatar component with image, initials, and fallback support
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';
import { BaseComponentProps, ComponentSize } from '@/components/base/types';
import { combineStyles } from '@/utils';
import { getInitials } from '@/utils';

export interface AppAvatarProps extends BaseComponentProps {
  /**
   * Image source URI
   */
  source?: ImageSourcePropType;
  /**
   * User name for initials fallback
   */
  name?: string;
  /**
   * Avatar size
   * @default 'medium'
   */
  size?: ComponentSize | 'xlarge';
  /**
   * Custom fallback component
   */
  fallback?: React.ReactNode;
}

interface AvatarStyles {
  base: ViewStyle;
  image: ViewStyle;
  initials: TextStyle;
  smallAvatar: ViewStyle;
  mediumAvatar: ViewStyle;
  largeAvatar: ViewStyle;
  xlargeAvatar: ViewStyle;
  smallText: TextStyle;
  mediumText: TextStyle;
  largeText: TextStyle;
  xlargeText: TextStyle;
}

export const AppAvatar: React.FC<AppAvatarProps> = ({
  source,
  name,
  size = 'medium',
  fallback,
  accessibilityLabel,
  accessibilityRole = 'image',
  testID,
  style,
}) => {
  const { theme } = useUnistyles();
  const avatarStyles = (
    styles as unknown as (theme: ReturnType<typeof useUnistyles>['theme']) => AvatarStyles
  )(theme);
  const sizeStyle = avatarStyles[`${size}Avatar` as keyof AvatarStyles] as ViewStyle;
  const textSizeStyle = avatarStyles[`${size}Text` as keyof AvatarStyles] as TextStyle;

  const defaultAccessibilityLabel = accessibilityLabel || (name ? `Avatar for ${name}` : 'Avatar');

  const renderContent = (): React.ReactNode => {
    if (source) {
      return (
        <Image
          source={source}
          style={avatarStyles.image as ImageStyle}
          accessibilityLabel={defaultAccessibilityLabel}
          accessibilityRole="image"
          testID={testID ? `${testID}-image` : undefined}
        />
      );
    }

    if (fallback) {
      return fallback;
    }

    if (name) {
      return (
        <AppText
          variant="bodyMedium"
          style={combineStyles(avatarStyles.initials, textSizeStyle)}
          testID={testID ? `${testID}-initials` : undefined}
        >
          {getInitials(name, 2)}
        </AppText>
      );
    }

    return null;
  };

  return (
    <View
      style={combineStyles(avatarStyles.base, sizeStyle, style as ViewStyle)}
      accessibilityLabel={defaultAccessibilityLabel}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  base: {
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  initials: {
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  largeAvatar: {
    height: 64,
    width: 64,
  },
  largeText: {
    fontSize: theme.typography.fontSize.md,
  },
  mediumAvatar: {
    height: 48,
    width: 48,
  },
  mediumText: {
    fontSize: theme.typography.fontSize.sm,
  },
  // Sizes
  smallAvatar: {
    height: 32,
    width: 32,
  },
  // Text sizes
  smallText: {
    fontSize: theme.typography.fontSize.xs,
  },
  xlargeAvatar: {
    height: 96,
    width: 96,
  },
  xlargeText: {
    fontSize: theme.typography.fontSize.lg,
  },
}));
