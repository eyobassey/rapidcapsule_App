import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base';
import { Button } from '@/shared/ui/atoms/button';
import { getExtendedThemeColors } from '@/types/theme.types';

export const ActionButtons: React.FC = () => {
  const { t } = useTranslation('home');
  const { theme } = useUnistyles();
  const colors = getExtendedThemeColors(theme.colors);
  const router = useRouter();

  const signInHeight = theme.spacing.lg * 2;
  const ctaHeight = theme.spacing.lg * 2 + theme.spacing.xs;

  return (
    <View style={styles.container}>
      <Button
        fullWidth
        height={signInHeight}
        backgroundColor={colors.backgroundSecondary}
        onPress={() => router.push('/login')}
      >
        <AppText variant="bodyMedium" align="center" bold>
          {t('actions.signIn')}
        </AppText>
      </Button>

      <Button fullWidth height={ctaHeight} backgroundColor={colors.primary}>
        <AppText variant="bodyMedium" align="center" color={colors.buttonText} bold>
          {t('actions.getStarted')}
        </AppText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    alignSelf: 'center',
    gap: theme.spacing.md,
    width: '100%',
  },
}));
