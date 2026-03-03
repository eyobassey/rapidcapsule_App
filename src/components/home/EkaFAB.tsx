import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { EkaAvatar } from '@/components/base';
import { appRoutes } from '@/config/routes';

/** Theme shape used by this component (avoids augmented theme inference issues) */
interface FabTheme {
  colors: {
    background: string;
    backgroundSecondary: string;
    borderLight?: string;
    border: string;
    palette?: { slate?: Record<number, string> };
  };
  spacing: { lg: number };
}

const FAB_SIZE = 64;

/** Avatar size to fit inside the FAB with comfortable padding */
const FAB_AVATAR_SIZE = 50;

/**
 * FAB bottom offset so it sits clearly above the native tab bar.
 * Keeps the FAB floating above the liquid glass tab bar.
 */
const FAB_BOTTOM_OFFSET = 88;

export const EkaFAB: React.FC = () => {
  const { t } = useTranslation('home');
  const { theme } = useUnistyles();
  const _theme = theme as unknown as FabTheme;
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      accessibilityLabel={t('fab.assistant')}
      accessibilityRole="button"
      onPress={() => router.push(appRoutes.eka)}
    >
      <View style={styles.iconWrap}>
        <EkaAvatar size={FAB_AVATAR_SIZE} disableShadow />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => {
  const t = theme as unknown as FabTheme;
  return {
    fab: {
      borderRadius: FAB_SIZE / 2,
      bottom: FAB_BOTTOM_OFFSET,
      height: FAB_SIZE,
      overflow: 'hidden',
      position: 'absolute',
      right: t.spacing.lg,
      width: FAB_SIZE,
      ...Platform.select({
        ios: {
          shadowColor: '#024A70',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
        },
        android: {
          elevation: 12,
        },
      }),
    },
    fabPressed: {
      opacity: 0.92,
    },
    iconWrap: {
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: FAB_SIZE / 2,
      borderWidth: 0,
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
  };
});
