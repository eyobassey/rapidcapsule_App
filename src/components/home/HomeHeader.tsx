import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppAvatar, AppText } from '@/components/base';
import { appRoutes } from '@/config/routes';
import { useAuthStore } from '@/store';

export const HomeHeader: React.FC = () => {
  const { t } = useTranslation('home');
  const { theme } = useUnistyles();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const firstName = user?.firstName ?? t('header.guest');
  const displayName = firstName.trim() || t('header.guest');

  return (
    <View style={styles.container}>
      <AppText variant="h2" style={styles.welcome}>
        {t('header.welcome', { name: displayName })}
      </AppText>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
          accessibilityLabel={t('header.notifications')}
          accessibilityRole="button"
        >
          <Ionicons name="notifications-outline" size={22} color={theme.colors.text} />
        </Pressable>

        <Pressable
          style={styles.avatarWrapper}
          onPress={() => router.push(appRoutes.profile)}
          accessibilityLabel={t('header.profile')}
          accessibilityRole="button"
        >
          <AppAvatar
            source={user?.profilePicture ? { uri: user.profilePicture } : undefined}
            name={user ? `${user.firstName} ${user.lastName}`.trim() : undefined}
            size="small"
            style={styles.avatar}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  avatar: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    height: 40,
    width: 40,
  },
  avatarWrapper: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    elevation: 2,
    height: 40,
    justifyContent: 'center',
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    width: 40,
  },
  iconButtonPressed: {
    opacity: 0.8,
  },
  welcome: {
    flex: 1,
  },
}));
