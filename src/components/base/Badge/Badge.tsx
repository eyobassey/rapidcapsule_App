/**
 * AppBadge Component
 *
 * Badge component for labels, counts, and status indicators
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';
import { BaseComponentProps, ComponentSize, ComponentVariant } from '@/components/base/types';
import { combineStyles, getExtendedThemeColors } from '@/utils';

export interface AppBadgeProps extends BaseComponentProps {
  /**
   * Badge text or number
   */
  label: string | number;
  /**
   * Badge variant
   * @default 'primary'
   */
  variant?: ComponentVariant | 'info' | 'warning';
  /**
   * Badge size
   * @default 'medium'
   */
  size?: ComponentSize;
  /**
   * Whether badge is dot-only (no text)
   * @default false
   */
  dot?: boolean;
}

export const AppBadge: React.FC<AppBadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  dot = false,
  accessibilityLabel,
  accessibilityRole = 'text',
  testID,
  style,
}) => {
  const variantStyle = styles[`${variant}Badge`] as ViewStyle;
  const sizeStyle = styles[`${size}Badge`] as ViewStyle;
  const textSizeStyle = styles[`${size}Text`] as TextStyle;

  const displayLabel = dot ? '' : String(label);
  const defaultAccessibilityLabel =
    accessibilityLabel || (dot ? 'Badge indicator' : `Badge: ${label}`);

  return (
    <View
      style={combineStyles(
        styles.base,
        variantStyle,
        sizeStyle,
        dot ? styles.dot : null,
        style as ViewStyle
      )}
      accessibilityLabel={defaultAccessibilityLabel}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      {!dot && (
        <AppText
          variant="caption"
          style={combineStyles(styles.text, textSizeStyle)}
          testID={testID ? `${testID}-text` : undefined}
        >
          {displayLabel}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create((theme) => {
  const extendedColors = getExtendedThemeColors(theme.colors);

  return {
    base: {
      alignItems: 'center',
      borderRadius: theme.borderRadius.full,
      justifyContent: 'center',
      minWidth: 20,
    },
    dangerBadge: {
      backgroundColor: theme.colors.error,
    },
    dot: {
      minHeight: 8,
      minWidth: 8,
      padding: 0,
    },
    ghostBadge: {
      backgroundColor: theme.colors.backgroundSecondary,
    },
    infoBadge: {
      backgroundColor: extendedColors.info,
    },
    largeBadge: {
      minHeight: 26,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 6,
    },
    largeText: {
      fontSize: theme.typography.fontSize.sm,
    },
    mediumBadge: {
      minHeight: 22,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 4,
    },
    mediumText: {
      fontSize: theme.typography.fontSize.xs,
    },
    outlineBadge: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    // Variants
    primaryBadge: {
      backgroundColor: theme.colors.primary,
    },
    secondaryBadge: {
      backgroundColor: extendedColors.secondary,
    },
    // Sizes
    smallBadge: {
      minHeight: 18,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
    },
    // Text sizes
    smallText: {
      fontSize: theme.typography.fontSize.xs - 2,
    },
    successBadge: {
      backgroundColor: theme.colors.success,
    },
    text: {
      color: extendedColors.badgeText,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    warningBadge: {
      backgroundColor: extendedColors.warning,
    },
  };
});
