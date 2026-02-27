import appleLogo from '@assets/apple.png';
import googleLogo from '@assets/google.png';
import registerHero from '@assets/register.png';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import {
  AppIcon,
  AppImage,
  AppInput,
  AppPressable,
  AppText,
  Checkbox,
  Screen,
} from '@/components/base';
import { appRoutes } from '@/config/routes';
import { Button } from '@/shared/ui/atoms/button';

export default function RegisterScreen() {
  const { theme } = useUnistyles();
  const { t } = useTranslation('auth');
  const router = useRouter();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  return (
    <Screen gradient="subtle" edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <AppImage source={registerHero} rounded style={styles.logoImage} />
            </View>
            <AppText variant="h2" align="center">
              {t('register.title')}
            </AppText>
          </View>

          <View style={styles.card}>
            <View style={styles.formSection}>
              <AppInput
                size="large"
                label={t('register.fields.emailLabel')}
                variant="pill"
                type="email"
                placeholder={t('register.fields.emailPlaceholder')}
              />

              <AppInput
                size="large"
                label={t('register.fields.passwordLabel')}
                type="password"
                variant="pill"
                placeholder={t('register.fields.passwordPlaceholder')}
                rightIcon={
                  <AppIcon name="Invisible1" size={20} color={theme.colors.palette.gray[500]} />
                }
                showPasswordToggle
              />

              <AppInput
                size="large"
                label={t('register.fields.confirmPasswordLabel')}
                type="password"
                variant="pill"
                placeholder={t('register.fields.confirmPasswordPlaceholder')}
                rightIcon={
                  <AppIcon name="Invisible1" size={20} color={theme.colors.palette.gray[500]} />
                }
                showPasswordToggle
              />

              <View style={styles.checkboxGroup}>
                <Checkbox
                  size={20}
                  isChecked={agreeTerms}
                  onPress={(checked: boolean) => setAgreeTerms(checked)}
                  label={t('register.checkbox.terms.label')}
                  emphasisText={t('register.checkbox.terms.emphasis')}
                />
                <Checkbox
                  size={20}
                  isChecked={marketingOptIn}
                  onPress={(checked: boolean) => setMarketingOptIn(checked)}
                  label={t('register.checkbox.marketing.label')}
                />
              </View>

              <View style={styles.primaryButtonWrapper}>
                <Button fullWidth height={52}>
                  <AppText variant="bodyMedium" align="center" style={styles.primaryButtonText}>
                    {t('register.primaryAction')}
                  </AppText>
                </Button>
              </View>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <AppText variant="bodySmall" color="#94A3B8">
                {t('register.dividerOr')}
              </AppText>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              <View style={[styles.socialButton, styles.googleButton]}>
                <View style={styles.socialContent}>
                  <AppImage source={googleLogo} style={styles.socialIcon} />
                  <AppText variant="bodyMedium" align="center">
                    {t('register.social.google')}
                  </AppText>
                </View>
              </View>
              <View style={[styles.socialButton, styles.appleButton]}>
                <View style={styles.socialContent}>
                  <AppImage source={appleLogo} style={styles.socialIcon} />
                  <AppText variant="bodyMedium" align="center" style={styles.appleText}>
                    {t('register.social.apple')}
                  </AppText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <AppText variant="bodySmall" color="#64748B">
                {t('register.footer.loginPrompt')}
              </AppText>
              <AppPressable variant="opacity" onPress={() => router.push(appRoutes.login)}>
                <AppText variant="bodySmall" color={theme.colors.palette.blue[500]}>
                  {t('register.footer.loginCta')}
                </AppText>
              </AppPressable>
            </View>
            <AppText variant="bodySmall" align="center" color="#64748B">
              {t('register.footer.specialistPrompt')}{' '}
              <AppText variant="bodySmall" color={theme.colors.palette.blue[500]}>
                {t('register.footer.specialistCta')}
              </AppText>
            </AppText>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  appleButton: {
    backgroundColor: theme.colors.text,
  },
  appleText: {
    color: theme.colors.background,
  },
  card: {
    gap: theme.spacing.md,
    width: '100%',
  },
  checkboxGroup: {
    gap: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  container: {
    flex: 1,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  divider: {
    backgroundColor: theme.colors.palette.sky[200],
    borderBottomColor: theme.colors.background,
    borderBottomWidth: 1,
    flex: 1,
    height: 2,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  footer: {
    gap: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs / 2,
    justifyContent: 'center',
  },
  formSection: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
    width: '100%',
  },
  googleButton: {
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  logoImage: {
    height: 80,
    width: 80,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: theme.colors.buttonText,
  },
  primaryButtonWrapper: {
    marginTop: theme.spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
  },
  socialButton: {
    alignItems: 'center',
    borderRadius: theme.borderRadius.full,
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  socialContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  socialIcon: {
    height: 20,
    width: 20,
  },
  socialRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
}));
