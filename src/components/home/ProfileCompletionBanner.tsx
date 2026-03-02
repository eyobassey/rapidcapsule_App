import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppIcon, AppText } from '@/components/base';
import { CircularProgress } from '@/shared/ui/organisms';

export const ProfileCompletionBanner: React.FC = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation('home');
  const { t: tProfile } = useTranslation('profile');

  const progress = useSharedValue(29);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <AppIcon name="LightbulbOn" size={20} color={theme.colors.primary} />
        </View>
        <AppText variant="bodySmall" style={styles.message} numberOfLines={3}>
          {t('completionBanner.body')}
        </AppText>
      </View>

      <View style={styles.completionRow}>
        <View style={styles.completionLeft}>
          <CircularProgress
            progress={progress}
            size={20}
            strokeWidth={3}
            outerCircleColor={theme.colors.palette.base.white}
            progressCircleColor={theme.colors.primary}
            backgroundColor="transparent"
            gap={10}
          />
          <AppText variant="caption" style={styles.completionText} numberOfLines={1}>
            {tProfile('progress.percentageLabel', { value: 29 })}
          </AppText>
          <View style={styles.stepsPill}>
            <AppText variant="caption" style={styles.stepsPillText} numberOfLines={1}>
              {tProfile('progress.stepsRemaining', { count: 7 })}
            </AppText>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [styles.finishButton, pressed && styles.finishButtonPressed]}
        >
          <View style={styles.finishButtonInner}>
            <AppText variant="bodySmall" style={styles.finishButtonText}>
              {tProfile('progress.finishSetup')}
            </AppText>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: 24,
    elevation: 8,
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  completionLeft: {
    alignItems: 'center',
    backgroundColor: theme.colors.palette.blue[100],
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    flexShrink: 1,
    gap: theme.spacing.sm,
    maxWidth: '70%',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  completionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  completionText: {
    color: theme.colors.palette.blue[600],
    fontSize: theme.typography.fontSize.caption,
  },
  finishButton: {
    borderRadius: theme.borderRadius.full,
    flexShrink: 0,
    marginLeft: 'auto',
  },
  finishButtonInner: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  finishButtonPressed: {
    opacity: 0.9,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: theme.typography.fontSize.xs,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: theme.colors.palette.blue[100],
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  message: {
    color: theme.colors.textSecondary,
    flex: 1,
  },
  stepsPill: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: theme.colors.palette.blue[200],
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    flexShrink: 1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs / 2,
  },
  stepsPillText: {
    color: theme.colors.palette.blue[600],
    fontSize: theme.typography.fontSize.caption,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
}));
