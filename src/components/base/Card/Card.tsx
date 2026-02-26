/**
 * AppCard Component
 *
 * Flexible card container component with variants
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { BaseComponentProps } from '@/components/base/types';
import { combineStyles, getExtendedThemeColors } from '@/utils';

export interface AppCardProps extends BaseComponentProps {
  /**
   * Card variant
   * @default 'default'
   */
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  /**
   * Whether card is pressable
   */
  pressable?: boolean;
  /**
   * On press handler (makes card pressable)
   */
  onPress?: () => void;
  /**
   * Padding size
   * @default 'medium'
   */
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  variant = 'default',
  pressable = false,
  onPress,
  padding = 'medium',
  accessibilityLabel,
  accessibilityRole,
  accessibilityHint,
  testID,
  style,
}) => {
  const variantStyle = styles[`${variant}Card`] as ViewStyle;
  const paddingStyle = styles[`${padding}Padding`] as ViewStyle;

  const defaultAccessibilityRole = accessibilityRole || (pressable ? 'button' : undefined);

  const content = (
    <View
      style={combineStyles(styles.base, variantStyle, paddingStyle, style as ViewStyle)}
      testID={testID}
      accessibilityLabel={!pressable ? accessibilityLabel : undefined}
      accessibilityRole={!pressable ? defaultAccessibilityRole : undefined}
    >
      {children}
    </View>
  );

  if (pressable || onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={defaultAccessibilityRole || 'button'}
        accessibilityHint={accessibilityHint}
        testID={testID}
        style={({ pressed }) => combineStyles(pressed ? styles.pressed : null)}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create((theme) => {
  const extendedColors = getExtendedThemeColors(theme.colors);

  return {
    base: {
      backgroundColor: extendedColors.cardBackground,
      borderRadius: theme.borderRadius.md,
    },
    // Variants
    defaultCard: {
      backgroundColor: extendedColors.cardBackground,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    elevatedCard: {
      backgroundColor: extendedColors.cardBackground,
      elevation: 3,
      shadowColor: extendedColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4, // Android
    },
    flatCard: {
      backgroundColor: extendedColors.cardBackground,
    },
    largePadding: {
      padding: theme.spacing.lg,
    },
    mediumPadding: {
      padding: theme.spacing.md,
    },
    // Padding
    nonePadding: {
      padding: 0,
    },
    outlinedCard: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    // Pressed state
    pressed: {
      opacity: 0.8,
    },
    smallPadding: {
      padding: theme.spacing.sm,
    },
  };
});
