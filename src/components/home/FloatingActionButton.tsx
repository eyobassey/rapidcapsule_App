import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleProp,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing as ReanimatedEasing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppIcon, AppText } from '@/components/base';
import type { AppIconName } from '@/components/base/AppIcon/AppIcon';

export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface FloatingActionButtonProps {
  onPress: () => void;
  isScrolling?: boolean;
  iconName?: AppIconName;
  iconSize?: number;
  iconColor?: string;
  label?: string;
  labelTranslationKey?: string;
  position?: FABPosition;
  backgroundColor?: string;
  bottomOffset?: number;
  horizontalMargin?: number;
  expandedWidth?: number;
  collapsedWidth?: number;
  height?: number;
  animationDuration?: number;
  enableScrollAnimation?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  disabled?: boolean;
  testID?: string;
}

/**
 * FloatingActionButton (FAB)
 *
 * Extended pill that collapses to an icon-only circle when `isScrolling` is true.
 * This is a simplified, theme-aware adaptation of the Lybertine FAB.
 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  isScrolling = false,
  iconName = 'ChatTwoBubblesSquareText1',
  iconSize = 18,
  iconColor,
  label,
  labelTranslationKey = 'eka.newChat',
  position = 'bottom-center',
  backgroundColor,
  bottomOffset,
  horizontalMargin,
  expandedWidth = 140,
  collapsedWidth = 56,
  height = 56,
  animationDuration = 250,
  enableScrollAnimation = true,
  containerStyle,
  buttonStyle,
  accessibilityLabel,
  disabled = false,
  testID,
}) => {
  const { theme } = useUnistyles();
  const { t } = useTranslation('home');
  const layout = useWindowDimensions();

  const expandedWidthValue = useMemo(() => expandedWidth, [expandedWidth]);
  const collapsedWidthValue = useMemo(() => collapsedWidth, [collapsedWidth]);
  const buttonHeightValue = useMemo(() => height, [height]);
  const buttonBorderRadius = useMemo(() => height / 2, [height]);
  const expandedTextWidth = useMemo(() => expandedWidth * 0.5, [expandedWidth]);

  const slideDistance = useMemo(() => {
    const margin = horizontalMargin ?? theme.spacing.lg;
    const radius = collapsedWidth / 2;

    // Slide from the starting position toward the screen edge,
    // respecting horizontal margin and safe area. For center, this
    // moves the FAB to the extreme right.
    const edgeOffset = layout.width / 2 - radius - margin;

    switch (position) {
      case 'bottom-left':
        return -edgeOffset;
      case 'bottom-center':
        return edgeOffset;
      case 'bottom-right':
      default:
        return edgeOffset;
    }
  }, [collapsedWidth, horizontalMargin, layout.width, position, theme.spacing.lg]);

  // Animation progress: 0 = expanded, 1 = collapsed
  const progress = useSharedValue(enableScrollAnimation && isScrolling ? 1 : 0);

  useEffect(() => {
    if (!enableScrollAnimation) {
      progress.value = 0;
      return;
    }

    progress.value = withTiming(isScrolling ? 1 : 0, {
      duration: animationDuration,
      easing: ReanimatedEasing.out(ReanimatedEasing.ease),
    });
  }, [animationDuration, enableScrollAnimation, isScrolling, progress]);

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    if (!enableScrollAnimation) {
      return {};
    }

    return {
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [0, slideDistance]),
        },
      ],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [expandedWidthValue, collapsedWidthValue]),
    height: buttonHeightValue,
    borderRadius: buttonBorderRadius,
    columnGap: interpolate(progress.value, [0, 1], [theme.spacing.sm, 0]),
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [1, 1.05]),
      },
    ],
  }));

  const textContainerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
    width: interpolate(progress.value, [0, 1], [expandedTextWidth, 0]),
  }));

  const labelText = useMemo(() => label ?? t(labelTranslationKey), [label, labelTranslationKey, t]);

  const resolvedIconColor = useMemo(() => iconColor ?? '#ffffff', [iconColor]);

  const resolvedBackgroundColor = useMemo(
    () => backgroundColor ?? theme.colors.primary,
    [backgroundColor, theme.colors.primary]
  );

  const resolvedBottomOffset = useMemo(
    () => bottomOffset ?? theme.spacing.lg,
    [bottomOffset, theme.spacing.lg]
  );

  const resolvedHorizontalMargin = useMemo(
    () => horizontalMargin ?? theme.spacing.lg,
    [horizontalMargin, theme.spacing.lg]
  );

  const containerPositionStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const base: ViewStyle = {
      bottom: resolvedBottomOffset,
      zIndex: 1000,
    };

    switch (position) {
      case 'bottom-left':
        return { ...base, left: resolvedHorizontalMargin };
      case 'bottom-center':
        return { ...base, alignSelf: 'center' as const };
      case 'bottom-right':
      default:
        return { ...base, right: resolvedHorizontalMargin };
    }
  }, [position, resolvedBottomOffset, resolvedHorizontalMargin]);

  const resolvedAccessibilityLabel = useMemo(
    () => accessibilityLabel ?? labelText,
    [accessibilityLabel, labelText]
  );

  return (
    <View style={[styles.container, containerPositionStyle, containerStyle]} testID={testID}>
      <Animated.View style={[styles.wrapper, wrapperAnimatedStyle]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          disabled={disabled}
          style={styles.touchable}
          accessibilityRole="button"
          accessibilityLabel={resolvedAccessibilityLabel}
          accessibilityState={{ disabled }}
        >
          <Animated.View
            style={[
              styles.button,
              { backgroundColor: resolvedBackgroundColor },
              buttonAnimatedStyle,
              buttonStyle,
            ]}
          >
            <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
              <AppIcon name={iconName} size={iconSize} color={resolvedIconColor} />
            </Animated.View>
            <Animated.View
              style={[styles.textContainer, textContainerAnimatedStyle]}
              pointerEvents="none"
            >
              <AppText variant="bodyMedium" style={styles.text}>
                {labelText}
              </AppText>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  button: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default React.memo(FloatingActionButton);
