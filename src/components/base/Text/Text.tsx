/**
 * AppText Component
 *
 * Typography component with variants and accessibility support
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { BaseComponentProps } from '@/components/base/types';
import { combineStyles } from '@/utils';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'caption'
  | 'overline';

export interface AppTextProps extends BaseComponentProps {
  /**
   * Text variant
   * @default 'bodyMedium'
   */
  variant?: TextVariant;
  /**
   * Text color override
   */
  color?: string;
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Number of lines before truncating
   */
  numberOfLines?: number;
  /**
   * Whether text is bold
   */
  bold?: boolean;
  /**
   * Whether text is italic
   */
  italic?: boolean;
  /**
   * Whether text is underlined
   */
  underline?: boolean;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'bodyMedium',
  color,
  align = 'left',
  numberOfLines,
  bold = false,
  italic = false,
  underline = false,
  accessibilityLabel,
  accessibilityRole = 'text',
  testID,
  style,
}) => {
  const variantStyle = styles[variant];
  const defaultAccessibilityLabel =
    accessibilityLabel || (typeof children === 'string' ? children : undefined);

  return (
    <RNText
      accessibilityLabel={defaultAccessibilityLabel}
      accessibilityRole={accessibilityRole}
      testID={testID}
      numberOfLines={numberOfLines}
      style={combineStyles(
        styles.base,
        variantStyle,
        color ? { color } : null,
        { textAlign: align },
        bold ? styles.bold : null,
        italic ? styles.italic : null,
        underline ? styles.underline : null,
        style as TextStyle
      )}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create((theme) => ({
  base: {
    color: theme.colors.text,
  },
  // Body text
  bodyLarge: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.fontSize.lg * 1.5,
  },
  bodyMedium: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.fontSize.md * 1.5,
  },
  bodySmall: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.fontSize.sm * 1.5,
  },
  // Modifiers
  bold: {
    fontWeight: theme.typography.fontWeight.bold,
  },
  // Caption
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.fontSize.xs * 1.4,
  },
  // Headings
  h1: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.xxl * 1.2,
  },
  h2: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.xl * 1.2,
  },
  h3: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.fontSize.lg * 1.2,
  },
  h4: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.fontSize.md * 1.3,
  },
  h5: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.fontSize.sm * 1.3,
  },
  h6: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.fontSize.xs * 1.3,
  },
  italic: {
    fontStyle: 'italic',
  },
  // Overline
  overline: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    letterSpacing: 1,
    lineHeight: theme.typography.fontSize.xs * 1.4,
    textTransform: 'uppercase',
  },
  underline: {
    textDecorationLine: 'underline',
  },
}));
