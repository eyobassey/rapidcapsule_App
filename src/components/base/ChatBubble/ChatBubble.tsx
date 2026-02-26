import React from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type ChatBubbleVariant = 'incoming' | 'outgoing';

export interface ChatBubbleProps {
  variant?: ChatBubbleVariant;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BUBBLE_SHADOW = '0px 0px 0px 1px #0000000A, 0px 6px 32px -2px #00000020';
const DOT_LG = 14;
const DOT_SM = 5;
const TRAIL_SPACE = 18;

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  variant = 'incoming',
  children,
  style,
}) => {
  const isIncoming = variant === 'incoming';

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.dotLg, isIncoming ? styles.dotLgLeft : styles.dotLgRight]} />
      <View style={[styles.dotSm, isIncoming ? styles.dotSmLeft : styles.dotSmRight]} />
      <View style={styles.bubble}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  bubble: {
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    boxShadow: BUBBLE_SHADOW,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    position: 'relative',
    zIndex: 1,
  },
  dotLg: {
    backgroundColor: theme.colors.background,
    borderRadius: DOT_LG / 2,
    bottom: -4,
    height: DOT_LG,
    position: 'absolute',
    width: DOT_LG,
    zIndex: 2,
  },
  dotLgLeft: { left: 1 },
  dotLgRight: { right: 1 },
  dotSm: {
    backgroundColor: theme.colors.background,
    borderRadius: DOT_SM / 2,
    bottom: -TRAIL_SPACE + 9,
    height: DOT_SM,
    position: 'absolute',
    width: DOT_SM,
  },
  dotSmLeft: { left: -3 },
  dotSmRight: { right: -3 },
  wrapper: {
    marginBottom: TRAIL_SPACE,
    maxWidth: '90%',
    position: 'relative',
  },
}));
