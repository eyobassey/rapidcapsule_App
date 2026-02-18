/**
 * AppButton Component
 *
 * Production-grade button component with variants, loading states, and full accessibility support
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import { ActivityIndicator, Pressable, TextStyle, View, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';
import { AccessiblePressableProps, ComponentSize, ComponentVariant } from '@/components/base/types';
import {
  combineStyles,
  getExtendedThemeColors,
  useExtendedThemeColors,
} from '@/components/base/utils/style-helpers';

export interface AppButtonProps extends AccessiblePressableProps {
  /**
   * Button text
   */
  title: string;
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: ComponentVariant;
  /**
   * Button size
   * @default 'medium'
   */
  size?: ComponentSize;
  /**
   * Whether button is full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Left icon component
   */
  leftIcon?: React.ReactNode;
  /**
   * Right icon component
   */
  rightIcon?: React.ReactNode;
  /**
   * Loading state - shows spinner and disables button
   */
  loading?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * On press handler
   */
  onPress?: () => void;
}

interface ButtonStyles {
  base: ViewStyle;
  fullWidth: ViewStyle;
  content: ViewStyle;
  leftIcon: ViewStyle;
  rightIcon: ViewStyle;
  disabled: ViewStyle;
  pressed: ViewStyle;
  primaryButton: ViewStyle;
  secondaryButton: ViewStyle;
  outlineButton: ViewStyle;
  ghostButton: ViewStyle;
  dangerButton: ViewStyle;
  successButton: ViewStyle;
  primaryText: TextStyle;
  secondaryText: TextStyle;
  outlineText: TextStyle;
  ghostText: TextStyle;
  dangerText: TextStyle;
  successText: TextStyle;
  smallButton: ViewStyle;
  mediumButton: ViewStyle;
  largeButton: ViewStyle;
  smallText: TextStyle;
  mediumText: TextStyle;
  largeText: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  testID,
  style,
}) => {
  const { theme } = useUnistyles();
  const extendedColors = useExtendedThemeColors();
  const isDisabled = disabled || loading;

  const buttonStyles = (
    styles as unknown as (theme: ReturnType<typeof useUnistyles>['theme']) => ButtonStyles
  )(theme);
  const variantStyle = buttonStyles[`${variant}Button` as keyof ButtonStyles] as ViewStyle;
  const sizeStyle = buttonStyles[`${size}Button` as keyof ButtonStyles] as ViewStyle;
  const textVariantStyle = buttonStyles[`${variant}Text` as keyof ButtonStyles] as TextStyle;
  const textSizeStyle = buttonStyles[`${size}Text` as keyof ButtonStyles] as TextStyle;

  const defaultAccessibilityLabel = accessibilityLabel || title;
  const defaultAccessibilityHint =
    accessibilityHint || (isDisabled ? 'Button is disabled' : 'Double tap to activate');

  const buttonTextColor =
    variant === 'outline' || variant === 'ghost' ? theme.colors.primary : extendedColors.buttonText;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={defaultAccessibilityLabel}
      accessibilityHint={defaultAccessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      testID={testID}
      style={({ pressed }) =>
        combineStyles(
          buttonStyles.base,
          variantStyle,
          sizeStyle,
          fullWidth && buttonStyles.fullWidth,
          isDisabled && buttonStyles.disabled,
          pressed && !isDisabled && buttonStyles.pressed,
          style as ViewStyle
        )
      }
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'small' ? 'small' : 'small'}
          color={buttonTextColor}
          testID={testID ? `${testID}-loader` : undefined}
        />
      ) : (
        <View style={buttonStyles.content}>
          {leftIcon && <View style={buttonStyles.leftIcon}>{leftIcon}</View>}
          <AppText
            variant={size === 'small' ? 'bodySmall' : size === 'large' ? 'bodyLarge' : 'bodyMedium'}
            style={combineStyles(textVariantStyle, textSizeStyle)}
          >
            {title}
          </AppText>
          {rightIcon && <View style={buttonStyles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => {
  const extendedColors = getExtendedThemeColors(theme.colors);

  return {
    base: {
      alignItems: 'center',
      borderRadius: theme.borderRadius.md,
      flexDirection: 'row',
      justifyContent: 'center',
      minHeight: 44, // Minimum touch target size (WCAG 2.5.5)
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    dangerButton: {
      backgroundColor: theme.colors.error,
    },
    dangerText: {
      color: extendedColors.buttonText,
    },
    disabled: {
      opacity: 0.5,
    },
    fullWidth: {
      width: '100%',
    },
    ghostButton: {
      backgroundColor: 'transparent',
    },
    ghostText: {
      color: theme.colors.primary,
    },
    largeButton: {
      minHeight: 52,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
    },
    largeText: {
      fontSize: theme.typography.fontSize.lg,
    },
    leftIcon: {
      marginRight: theme.spacing.xs,
    },
    mediumButton: {
      minHeight: 44,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    mediumText: {
      fontSize: theme.typography.fontSize.md,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    outlineText: {
      color: theme.colors.primary,
    },
    pressed: {
      opacity: 0.8,
    },
    // Variants
    primaryButton: {
      backgroundColor: theme.colors.primary,
    },
    // Text variants
    primaryText: {
      color: extendedColors.buttonText,
    },
    rightIcon: {
      marginLeft: theme.spacing.xs,
    },
    secondaryButton: {
      backgroundColor: extendedColors.secondary,
    },
    secondaryText: {
      color: extendedColors.buttonText,
    },
    // Sizes
    smallButton: {
      minHeight: 36,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    // Text sizes
    smallText: {
      fontSize: theme.typography.fontSize.sm,
    },
    successButton: {
      backgroundColor: theme.colors.success,
    },
    successText: {
      color: extendedColors.buttonText,
    },
  };
});
