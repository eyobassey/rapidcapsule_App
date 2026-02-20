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
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button } from '@/shared/ui/atoms/button';
import { AppText } from '@/components/base/Text/Text';
import { BaseComponentProps } from '@/components/base/types';
import { combineStyles, getExtendedThemeColors } from '@/components/base/utils/style-helpers';

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

interface ModalStyles {
  backdrop: ViewStyle;
  backdropPressable: ViewStyle;
  content: ViewStyle;
  smallModal: ViewStyle;
  mediumModal: ViewStyle;
  largeModal: ViewStyle;
  fullscreenModal: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  closeButton: ViewStyle;
  closeButtonText: TextStyle;
  body: ViewStyle;
  footer: ViewStyle;
  footerButton: ViewStyle;
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
  const modalStyles = (
    styles as unknown as (theme: ReturnType<typeof useUnistyles>['theme']) => ModalStyles
  )(theme);
  const sizeStyle = modalStyles[`${size}Modal` as keyof ModalStyles] as ViewStyle;

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
        style={modalStyles.backdrop}
      >
        <Pressable
          style={modalStyles.backdropPressable}
          onPress={dismissible ? onClose : undefined}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
          testID={testID ? `${testID}-backdrop` : undefined}
        >
          <Pressable
            style={combineStyles(modalStyles.content, sizeStyle, style as ViewStyle)}
            onPress={(e) => e.stopPropagation()}
            accessibilityLabel={defaultAccessibilityLabel}
            accessibilityRole={accessibilityRole as AccessibilityRole}
            testID={testID ? `${testID}-content` : undefined}
          >
            {(title || showCloseButton) && (
              <View style={modalStyles.header}>
                {title && (
                  <AppText
                    variant="h3"
                    style={modalStyles.title}
                    testID={testID ? `${testID}-title` : undefined}
                  >
                    {title}
                  </AppText>
                )}
                {showCloseButton && (
                  <Pressable
                    onPress={onClose}
                    style={modalStyles.closeButton}
                    accessibilityLabel="Close"
                    accessibilityRole="button"
                    accessibilityHint="Closes the modal dialog"
                    testID={testID ? `${testID}-close` : undefined}
                  >
                    <AppText variant="h4" style={modalStyles.closeButtonText}>
                      ×
                    </AppText>
                  </Pressable>
                )}
              </View>
            )}
            <View style={modalStyles.body}>{children}</View>
            {(primaryActionLabel || secondaryActionLabel) && (
              <View style={modalStyles.footer}>
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
                    <AppText style={{ color: '#FFFFFF' }}>{primaryActionLabel}</AppText>
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
