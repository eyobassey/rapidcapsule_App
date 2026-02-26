/**
 * AppModal Component
 *
 * Accessible modal component with backdrop and animations
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import React, { useEffect } from 'react';
import {
  AccessibilityRole,
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  Pressable,
  View,
  ViewStyle,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base/Text/Text';
import { BaseComponentProps } from '@/components/base/types';
import { Button } from '@/shared/ui/atoms/button';
import { combineStyles, getExtendedThemeColors } from '@/utils';

export interface AppModalProps extends BaseComponentProps {
  /**
   * Whether modal is visible
   */
  visible: boolean;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Close handler
   */
  onClose: () => void;
  /**
   * Primary action button text
   */
  primaryActionLabel?: string;
  /**
   * Primary action handler
   */
  onPrimaryAction?: () => void;
  /**
   * Secondary action button text
   */
  secondaryActionLabel?: string;
  /**
   * Secondary action handler
   */
  onSecondaryAction?: () => void;
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether modal is dismissible by backdrop press
   * @default true
   */
  dismissible?: boolean;
  /**
   * Modal size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  title,
  children,
  onClose,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  showCloseButton = true,
  dismissible = true,
  size = 'medium',
  accessibilityLabel,
  accessibilityRole = 'dialog',
  testID,
  style,
}) => {
  const { theme } = useUnistyles();
  const sizeStyle = styles[`${size}Modal`] as ViewStyle;

  const defaultAccessibilityLabel = accessibilityLabel || title || 'Modal dialog';

  // Prevent body scroll when modal is open (web)
  useEffect(() => {
    if (Platform.OS === 'web') {
      if (visible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
    return () => {
      if (Platform.OS === 'web') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [visible]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal
      accessibilityLabel={defaultAccessibilityLabel}
      accessibilityRole={accessibilityRole as AccessibilityRole}
      testID={testID}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.backdrop}
      >
        <Pressable
          style={styles.backdropPressable}
          onPress={dismissible ? onClose : undefined}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
          testID={testID ? `${testID}-backdrop` : undefined}
        >
          <Pressable
            style={combineStyles(styles.content, sizeStyle, style as ViewStyle)}
            onPress={(e) => e.stopPropagation()}
            accessibilityLabel={defaultAccessibilityLabel}
            accessibilityRole={accessibilityRole as AccessibilityRole}
            testID={testID ? `${testID}-content` : undefined}
          >
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && (
                  <AppText
                    variant="h3"
                    style={styles.title}
                    testID={testID ? `${testID}-title` : undefined}
                  >
                    {title}
                  </AppText>
                )}
                {showCloseButton && (
                  <Pressable
                    onPress={onClose}
                    style={styles.closeButton}
                    accessibilityLabel="Close"
                    accessibilityRole="button"
                    accessibilityHint="Closes the modal dialog"
                    testID={testID ? `${testID}-close` : undefined}
                  >
                    <AppText variant="h4" style={styles.closeButtonText}>
                      ×
                    </AppText>
                  </Pressable>
                )}
              </View>
            )}
            <View style={styles.body}>{children}</View>
            {(primaryActionLabel || secondaryActionLabel) && (
              <View style={styles.footer}>
                {secondaryActionLabel && (
                  <Button
                    onPress={onSecondaryAction || onClose}
                    width={100}
                    height={44}
                    backgroundColor={theme.colors.backgroundSecondary}
                  >
                    <AppText>{secondaryActionLabel}</AppText>
                  </Button>
                )}
                {primaryActionLabel && (
                  <Button
                    onPress={onPrimaryAction}
                    width={100}
                    height={44}
                    backgroundColor={theme.colors.primary}
                  >
                    <AppText style={styles.primaryActionText}>{primaryActionLabel}</AppText>
                  </Button>
                )}
              </View>
            )}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create((theme) => {
  const extendedColors = getExtendedThemeColors(theme.colors);

  return {
    backdrop: {
      alignItems: 'center',
      backgroundColor: extendedColors.overlay,
      flex: 1,
      justifyContent: 'center',
    },
    backdropPressable: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
    body: {
      padding: theme.spacing.lg,
    },
    closeButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      width: 32,
    },
    closeButtonText: {
      color: theme.colors.text,
      lineHeight: 24,
    },
    content: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      elevation: 8,
      maxHeight: '90%',
      maxWidth: '90%',
      shadowColor: extendedColors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8, // Android
    },
    footer: {
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: theme.spacing.md,
      justifyContent: 'flex-end',
      padding: theme.spacing.lg,
    },
    footerButton: {
      minWidth: 100,
    },
    fullscreenModal: {
      borderRadius: 0,
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      width: '100%',
    },
    header: {
      alignItems: 'center',
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing.lg,
    },
    largeModal: {
      maxWidth: 800,
      width: '90%',
    },
    mediumModal: {
      maxWidth: 600,
      width: '85%',
    },
    primaryActionText: {
      color: theme.colors.buttonText,
    },
    // Sizes
    smallModal: {
      maxWidth: 400,
      width: '80%',
    },
    title: {
      flex: 1,
    },
  };
});
