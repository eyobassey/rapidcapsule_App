/**
 * AppSeparator Component
 *
 * Divider/separator component for visual separation
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BaseComponentProps } from '@/components/base/types';

export interface AppSeparatorProps extends BaseComponentProps {
  /**
   * Separator orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Separator thickness
   * @default 1
   */
  thickness?: number;
  /**
   * Separator variant
   * @default 'default'
   */
  variant?: 'default' | 'dashed' | 'dotted';
  /**
   * Spacing around separator
   */
  spacing?: number;
}

interface SeparatorStyles {
  base: ViewStyle;
  horizontalSeparator: ViewStyle;
  verticalSeparator: ViewStyle;
  defaultSeparator: ViewStyle;
  dashedSeparator: ViewStyle;
  dottedSeparator: ViewStyle;
}

export const AppSeparator: React.FC<AppSeparatorProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  variant = 'default',
  spacing,
  accessibilityRole = 'separator',
  testID,
  style,
}) => {
  const { theme } = useUnistyles();
  const separatorStyles = (
    styles as unknown as (theme: ReturnType<typeof useUnistyles>['theme']) => SeparatorStyles
  )(theme);
  const orientationStyle = separatorStyles[
    `${orientation}Separator` as keyof SeparatorStyles
  ] as ViewStyle;
  const variantStyle = separatorStyles[`${variant}Separator` as keyof SeparatorStyles] as ViewStyle;

  const dynamicStyles: ViewStyle = {
    borderWidth: thickness,
    ...(spacing !== undefined && { marginVertical: spacing }),
  };

  const combinedStyle: StyleProp<ViewStyle> = [
    separatorStyles.base,
    orientationStyle,
    variantStyle,
    dynamicStyles,
    style,
  ];

  return (
    <View style={combinedStyle} accessibilityRole={accessibilityRole as 'none'} testID={testID} />
  );
};

const styles = StyleSheet.create((theme) => ({
  base: {
    borderColor: theme.colors.border,
  },
  dashedSeparator: {
    borderStyle: 'dashed',
  },
  // Variants
  defaultSeparator: {
    borderStyle: 'solid',
  },
  dottedSeparator: {
    borderStyle: 'dotted',
  },
  // Orientations
  horizontalSeparator: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,
    width: '100%',
  },
  verticalSeparator: {
    borderBottomWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    height: '100%',
  },
}));
