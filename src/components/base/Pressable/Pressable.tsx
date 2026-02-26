/**
 * AppPressable Component
 *
 * Enhanced Pressable wrapper with accessibility and consistent styling
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  ViewStyle,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AccessiblePressableProps } from '@/components/base/types';
import { combineStyles } from '@/utils';

export interface AppPressableProps
  extends
    Omit<
      RNPressableProps,
      | 'accessibilityLabel'
      | 'accessibilityHint'
      | 'accessibilityRole'
      | 'testID'
      | 'disabled'
      | 'onPress'
      | 'accessibilityState'
      | 'style'
      | 'children'
    >,
    Omit<AccessiblePressableProps, 'style'> {
  /**
   * Style prop
   */
  style?: RNPressableProps['style'];
  /**
   * Pressable variant
   */
  variant?: 'default' | 'opacity' | 'scale';
  /**
   * Minimum touch target size (WCAG 2.5.5)
   * @default true
   */
  minTouchTarget?: boolean;
}

export const AppPressable: React.FC<AppPressableProps> = ({
  children,
  variant = 'default',
  minTouchTarget = true,
  disabled = false,
  loading = false,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  testID,
  style,
  ...pressableProps
}) => {
  const variantStyle = styles[`${variant}Pressable`] as ViewStyle;
  const isDisabled = disabled || loading;

  const defaultAccessibilityHint =
    accessibilityHint || (isDisabled ? 'Button is disabled' : 'Double tap to activate');

  return (
    <RNPressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={defaultAccessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      testID={testID}
      style={({ pressed }) =>
        combineStyles(
          minTouchTarget ? styles.minTouchTarget : null,
          variantStyle,
          pressed && !isDisabled ? styles.pressed : null,
          isDisabled ? styles.disabled : null,
          style as ViewStyle
        )
      }
      {...pressableProps}
    >
      {children}
    </RNPressable>
  );
};

const styles = StyleSheet.create(() => ({
  // Variants
  defaultPressable: {},
  disabled: {
    opacity: 0.5,
  },
  minTouchTarget: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  opacityPressable: {},
  // States
  pressed: {
    opacity: 0.7,
  },
  scalePressable: {},
}));
