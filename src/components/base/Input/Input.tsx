/**
 * AppInput Component
 *
 * Production-grade text input with validation, labels, error states, and accessibility
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React, { useState } from 'react';
import { Pressable, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';
import { BaseComponentProps } from '@/components/base/types';
import { combineStyles } from '@/components/base/utils/style-helpers';

export interface AppInputProps
  extends
    Omit<
      React.ComponentProps<typeof TextInput>,
      'style' | 'accessibilityLabel' | 'accessibilityHint' | 'accessibilityRole' | 'testID'
    >,
    BaseComponentProps {
  /**
   * Input label
   */
  label?: string;
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below input
   */
  helperText?: string;
  /**
   * Whether input is required
   */
  required?: boolean;
  /**
   * Whether input is disabled
   */
  disabled?: boolean;
  /**
   * Input size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Left icon component
   */
  leftIcon?: React.ReactNode;
  /**
   * Right icon component (e.g., password visibility toggle)
   */
  rightIcon?: React.ReactNode;
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'phone' | 'search';
  /**
   * Whether to show password visibility toggle (for password type)
   */
  showPasswordToggle?: boolean;
}

interface InputStyles {
  container: ViewStyle;
  label: TextStyle;
  labelError: TextStyle;
  labelDisabled: TextStyle;
  required: TextStyle;
  inputContainer: ViewStyle;
  inputContainerError: ViewStyle;
  inputContainerDisabled: ViewStyle;
  input: TextStyle;
  inputWithLeftIcon: TextStyle;
  inputWithRightIcon: TextStyle;
  leftIcon: ViewStyle;
  rightIcon: ViewStyle;
  smallInput: ViewStyle;
  mediumInput: ViewStyle;
  largeInput: ViewStyle;
  error: TextStyle;
  helper: TextStyle;
}

type TextInputStyle = TextStyle | TextStyle[] | null | undefined;

export const AppInput: React.FC<AppInputProps> = ({
  label,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'medium',
  leftIcon,
  rightIcon,
  type = 'text',
  showPasswordToggle = false,
  value,
  onChangeText,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
  ...textInputProps
}) => {
  const { theme } = useUnistyles();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputStyles = (
    styles as unknown as (theme: ReturnType<typeof useUnistyles>['theme']) => InputStyles
  )(theme);
  const sizeStyle = inputStyles[`${size}Input` as keyof InputStyles] as ViewStyle;
  const hasError = !!error;
  const isPassword = type === 'password';

  // Determine keyboard type and auto complete
  const keyboardType: 'default' | 'email-address' | 'phone-pad' | 'numeric' =
    type === 'email'
      ? 'email-address'
      : type === 'phone'
        ? 'phone-pad'
        : type === 'number'
          ? 'numeric'
          : 'default';

  const autoComplete: 'email' | 'password' | 'tel' | 'off' =
    type === 'email'
      ? 'email'
      : type === 'password'
        ? 'password'
        : type === 'phone'
          ? 'tel'
          : 'off';

  const secureTextEntry = isPassword && !isPasswordVisible;

  const defaultAccessibilityLabel = accessibilityLabel || label || placeholder;
  const defaultAccessibilityHint = accessibilityHint || (required ? 'Required field' : undefined);

  const labelId = testID ? `${testID}-label` : undefined;
  const errorId = testID ? `${testID}-error` : undefined;
  const helperId = testID ? `${testID}-helper` : undefined;

  return (
    <View
      style={combineStyles(inputStyles.container, style as ViewStyle)}
      testID={testID ? `${testID}-container` : undefined}
    >
      {label && (
        <AppText
          variant="bodySmall"
          style={combineStyles(
            inputStyles.label,
            hasError ? inputStyles.labelError : null,
            disabled ? inputStyles.labelDisabled : null
          )}
          testID={labelId}
          accessibilityRole="text"
        >
          {label}
          {required && (
            <AppText variant="bodySmall" style={inputStyles.required}>
              {' '}
              *
            </AppText>
          )}
        </AppText>
      )}
      <View
        style={combineStyles(
          inputStyles.inputContainer,
          sizeStyle,
          hasError ? inputStyles.inputContainerError : null,
          disabled ? inputStyles.inputContainerDisabled : null
        )}
      >
        {leftIcon && <View style={inputStyles.leftIcon}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          accessibilityLabel={defaultAccessibilityLabel}
          accessibilityHint={defaultAccessibilityHint}
          accessibilityRole="none"
          accessibilityState={{ disabled }}
          testID={testID}
          style={
            [
              inputStyles.input,
              leftIcon ? inputStyles.inputWithLeftIcon : null,
              rightIcon ? inputStyles.inputWithRightIcon : null,
            ] as TextInputStyle
          }
          {...(textInputProps as unknown as Partial<
            Omit<
              React.ComponentProps<typeof TextInput>,
              | 'style'
              | 'value'
              | 'onChangeText'
              | 'placeholder'
              | 'placeholderTextColor'
              | 'keyboardType'
              | 'autoComplete'
              | 'secureTextEntry'
              | 'editable'
              | 'accessibilityLabel'
              | 'accessibilityHint'
              | 'accessibilityRole'
              | 'accessibilityState'
              | 'accessibilityRequired'
              | 'accessibilityLabelledBy'
              | 'accessibilityDescribedBy'
              | 'testID'
            >
          >)}
        />
        {isPassword && showPasswordToggle && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
            style={inputStyles.rightIcon}
          >
            {rightIcon}
          </Pressable>
        )}
        {!isPassword && rightIcon && <View style={inputStyles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && (
        <AppText
          variant="caption"
          style={inputStyles.error}
          testID={errorId}
          accessibilityRole="text"
        >
          {error}
        </AppText>
      )}
      {helperText && !error && (
        <AppText variant="caption" style={inputStyles.helper} testID={helperId}>
          {helperText}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
  },
  error: {
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  helper: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  input: {
    color: theme.colors.text,
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    minHeight: 44,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 44, // Minimum touch target size
  },
  inputContainerDisabled: {
    backgroundColor: theme.colors.backgroundSecondary,
    opacity: 0.5,
  },
  inputContainerError: {
    borderColor: theme.colors.error,
  },
  inputWithLeftIcon: {
    paddingLeft: theme.spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: theme.spacing.xs,
  },
  label: {
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  labelError: {
    color: theme.colors.error,
  },
  largeInput: {
    minHeight: 52,
  },
  leftIcon: {
    paddingLeft: theme.spacing.md,
  },
  mediumInput: {
    minHeight: 44,
  },
  required: {
    color: theme.colors.error,
  },
  rightIcon: {
    paddingRight: theme.spacing.md,
  },
  // Sizes
  smallInput: {
    minHeight: 36,
  },
}));
