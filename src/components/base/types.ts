/**
 * Base Component Types
 *
 * Shared types and interfaces for base components
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Component size variants
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Component variant/theme
 */
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

/**
 * Base component props with accessibility
 */
export interface BaseComponentProps {
  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for screen readers
   */
  accessibilityHint?: string;
  /**
   * Accessibility role
   */
  accessibilityRole?: 'button' | 'text' | 'header' | 'link' | 'image' | 'none';
  /**
   * Test ID for testing
   */
  testID?: string;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle | TextStyle>;
  /**
   * Children
   */
  children?: ReactNode;
}

/**
 * Pressable component props with accessibility
 */
export interface AccessiblePressableProps extends BaseComponentProps {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * On press handler
   */
  onPress?: () => void;
}
