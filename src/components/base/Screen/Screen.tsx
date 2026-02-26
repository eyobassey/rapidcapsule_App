import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { GRADIENT_PRESETS, type GradientVariant } from '@/config/gradients';
import { combineStyles } from '@/utils';

export interface ScreenProps extends Omit<SafeAreaViewProps, 'style' | 'children'> {
  /**
   * Edges to apply safe area insets to
   * @default ['top', 'bottom']
   */
  edges?: Edge[];
  /**
   * Optional gradient background variant.
   * When set, renders a LinearGradient behind the content.
   */
  gradient?: GradientVariant;
  /**
   * Additional container styles
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Screen content
   */
  children?: ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  edges = ['top', 'bottom'],
  gradient,
  style,
  ...safeAreaProps
}) => {
  const preset = gradient ? GRADIENT_PRESETS[gradient] : null;

  if (preset) {
    return (
      <LinearGradient
        colors={[...preset.colors]}
        locations={[...preset.locations]}
        start={preset.start}
        end={preset.end}
        style={styles.fill}
      >
        <SafeAreaView
          {...safeAreaProps}
          edges={edges}
          style={combineStyles(styles.transparent, style as ViewStyle)}
        >
          {children}
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView
      {...safeAreaProps}
      edges={edges}
      style={combineStyles(styles.container, style as ViewStyle)}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
    flex: 1,
  },
}));
