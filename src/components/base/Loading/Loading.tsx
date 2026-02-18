/**
 * AppLoading Component
 *
 * Loading spinner component with variants
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React from 'react';
import { AccessibilityState, ActivityIndicator, View, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';
import { BaseComponentProps, ComponentSize } from '@/components/base/types';
import { combineStyles, getExtendedThemeColors } from '@/components/base/utils/style-helpers';

export interface AppLoadingProps extends BaseComponentProps {
  /**
   * Loading size
   * @default 'medium'
   */
  size?: ComponentSize | 'large';
  /**
   * Loading message
   */
  message?: string;
  /**
   * Loading color override
   */
  color?: string;
  /**
   * Whether to show full screen overlay
   * @default false
   */
  fullScreen?: boolean;
}

interface LoadingStyles {
  container: ViewStyle;
  fullScreen: ViewStyle;
  message: ViewStyle;
}

export const AppLoading: React.FC<AppLoadingProps> = ({
  size = 'medium',
  message,
  color,
  fullScreen = false,
  accessibilityLabel = 'Loading',
  accessibilityRole = 'progressbar',
  testID,
  style,
}) => {
  const { theme } = useUnistyles();
  const loadingStyles = (
    styles as unknown as (theme: ReturnType<typeof useUnistyles>['theme']) => LoadingStyles
  )(theme);

  const sizeMap: Record<ComponentSize | 'large', 'small' | 'large'> = {
    small: 'small',
    medium: 'small',
    large: 'large',
  };

  const accessibilityState: AccessibilityState = { busy: true };

  return (
    <View
      style={combineStyles(
        loadingStyles.container,
        fullScreen ? loadingStyles.fullScreen : null,
        style as ViewStyle
      )}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole as 'progressbar'}
      accessibilityState={accessibilityState}
    >
      <ActivityIndicator
        size={sizeMap[size]}
        color={color || theme.colors.primary}
        testID={testID ? `${testID}-spinner` : undefined}
      />
      {message && (
        <AppText
          variant="bodyMedium"
          style={loadingStyles.message}
          testID={testID ? `${testID}-message` : undefined}
        >
          {message}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create((theme) => {
  const extendedColors = getExtendedThemeColors(theme.colors);

  return {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.md,
    },
    fullScreen: {
      backgroundColor: extendedColors.overlay,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 9999,
    },
    message: {
      color: theme.colors.text,
      marginTop: theme.spacing.md,
      textAlign: 'center',
    },
  };
});
