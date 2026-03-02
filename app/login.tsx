import appleLogo from '@assets/apple.png';
import googleLogo from '@assets/google.png';
import loginHero from '@assets/login.png';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, View } from 'react-native';
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
import { ApiError, NetworkError, patientRepository } from '@/services/api';
import { Button } from '@/shared/ui/atoms/button';
import { Toast } from '@/shared/ui/molecules/Toast';
import { SegmentedControl } from '@/shared/ui/organisms';
import { useAuthStore, useUIStore } from '@/store';

export default function LoginScreen() {
  const { theme } = useUnistyles();
  const { t } = useTranslation('auth');
  const router = useRouter();

  const [segmentIndex, setSegmentIndex] = useState(0);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, setLoading } = useAuthStore();
  const { setGlobalLoading } = useUIStore();

  const handleForgotPassword = () => {
    // Placeholder – wire to real route or deep link later
    void Linking.openURL('mailto:support@example.com');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show(t('login.errors.missingCredentials'), { type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setGlobalLoading(true);

      const response = await patientRepository.login({
        email,
        password,
        rememberMe: keepSignedIn,
        user_type: 'Patient',
      });

      if (response.data.defaults.twoFA_auth) {
        Toast.show(response.message ?? t('login.success'), { type: 'success' });
        router.push({
          pathname: appRoutes.verifyEmail,
          params: { email },
        });
      } else {
        Toast.show(response.message ?? t('login.success'), { type: 'success' });
      }
    } catch (error) {
      let message = t('login.errors.generic');

      if (error instanceof NetworkError) {
        message = t('login.errors.network');
      } else if (error instanceof ApiError) {
        if (error.isAuthError()) {
          message = t('login.errors.invalidCredentials');
        } else if (error.isClientError()) {
          message = error.message || message;
        }
      }

      Toast.show(message, { type: 'error' });
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

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
              <AppImage source={loginHero} rounded style={styles.logoImage} />
            </View>
            <AppText variant="h2" align="center">
              {t('login.title')}
            </AppText>
          </View>

          <View style={styles.card}>
            <View style={styles.segmentWrapper}>
              <SegmentedControl
                currentIndex={segmentIndex}
                onChange={setSegmentIndex}
                borderRadius={theme.borderRadius.full}
                paddingVertical={theme.spacing.sm}
              >
                <AppText align="center">{t('login.segments.patient')}</AppText>
                <AppText align="center">{t('login.segments.specialist')}</AppText>
              </SegmentedControl>
            </View>

            <View style={styles.formSection}>
              <AppInput
                size="large"
                label={t('login.fields.emailLabel')}
                variant="pill"
                type="email"
                keyboardType="email-address"
                inputMode="email"
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder={t('login.fields.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
              />

              <AppInput
                size="large"
                label={t('login.fields.passwordLabel')}
                type="password"
                variant="pill"
                keyboardType="visible-password"
                inputMode="text"
                placeholder={t('login.fields.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                  <AppIcon name="Invisible1" size={20} color={theme.colors.palette.gray[500]} />
                }
                showPasswordToggle
              />

              <View style={styles.rowBetween}>
                <Checkbox
                  size={20}
                  isChecked={keepSignedIn}
                  onPress={(isChecked: boolean) => setKeepSignedIn(isChecked)}
                  label={t('login.checkbox.keepSignedIn')}
                />
                <AppPressable
                  variant="opacity"
                  style={styles.linkPressable}
                  onPress={handleForgotPassword}
                >
                  <AppText variant="bodySmall" color={theme.colors.palette.blue[500]}>
                    {t('login.forgotPassword')}
                  </AppText>
                </AppPressable>
              </View>

              <View style={styles.primaryButtonWrapper}>
                <Button
                  fullWidth
                  height={52}
                  disabled={!email || !password || isLoading}
                  onPress={handleLogin}
                  showLoadingIndicator
                  isLoading={isLoading}
                >
                  <AppText variant="bodyMedium" align="center" style={styles.primaryButtonText}>
                    {t('login.primaryAction')}
                  </AppText>
                </Button>
              </View>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <AppText variant="bodySmall" color="#94A3B8">
                {t('login.dividerOr')}
              </AppText>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              <View style={[styles.socialButton, styles.googleButton]}>
                <View style={styles.socialContent}>
                  <AppImage source={googleLogo} style={styles.socialIcon} />
                  <AppText variant="bodyMedium" align="center">
                    {t('login.social.google')}
                  </AppText>
                </View>
              </View>
              <View style={[styles.socialButton, styles.appleButton]}>
                <View style={styles.socialContent}>
                  <AppImage source={appleLogo} style={styles.socialIcon} />
                  <AppText variant="bodyMedium" align="center" style={styles.appleText}>
                    {t('login.social.apple')}
                  </AppText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <AppText variant="bodySmall" color="#64748B">
                {t('login.footer.prompt')}
              </AppText>
              <AppPressable variant="opacity" onPress={() => router.push(appRoutes.register)}>
                <AppText variant="bodySmall" color={theme.colors.palette.blue[500]}>
                  {t('login.footer.signupCta')}
                </AppText>
              </AppPressable>
            </View>
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
  fieldLabel: {
    color: theme.colors.textSecondary,
  },
  footer: {
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
    width: '100%',
  },
  googleButton: {
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  inputPlaceholder: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
    boxShadow: '0px 0px 0px 0.8px #00000005, 0px 8px 24px -4px rgba(15, 23, 42, 0.32)',
    height: 52,
  },
  linkPressable: {
    paddingVertical: theme.spacing.xs / 2,
  },
  logoImage: {
    height: 80,
    width: 80,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordLabel: {
    marginTop: theme.spacing.sm,
  },
  primaryButtonText: {
    color: theme.colors.buttonText,
  },
  primaryButtonWrapper: {
    marginTop: theme.spacing.md,
  },
  rowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
  },
  segmentWrapper: {
    alignItems: 'center',
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
