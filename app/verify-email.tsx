import emailVerifyHero from '@assets/email-verify.png';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppImage, AppText, Screen } from '@/components/base';
import { appRoutes } from '@/config/routes';
import { ApiError, NetworkError, patientRepository } from '@/services/api';
import { SecureStorageKey, secureStorageService } from '@/services/storage';
import { Button } from '@/shared/ui/atoms/button';
import { OtpInput } from '@/shared/ui/base/otp-input';
import { useAuthStore, useUIStore } from '@/store';

export default function VerifyEmailScreen() {
  const { theme } = useUnistyles();
  const { t } = useTranslation('auth');
  const router = useRouter();

  const params = useLocalSearchParams<{ email?: string }>();

  const [otp, setOtp] = useState('');
  const [hasError, setHasError] = useState(false);

  const { isLoading, setAuthenticated, setLoading } = useAuthStore();
  const { setGlobalLoading, showToast } = useUIStore();

  const email = useMemo(() => {
    const value = params.email;
    return typeof value === 'string' ? value : '';
  }, [params.email]);

  const isVerifyDisabled = !email || otp.length !== 6;

  const handleVerify = async () => {
    if (!email) {
      showToast(t('verifyEmail.errors.missingEmail'), 'error');
      return;
    }
    if (otp.length !== 6) {
      showToast(t('verifyEmail.errors.missingOtp'), 'error');
      return;
    }

    setHasError(false);
    Keyboard.dismiss();

    try {
      setLoading(true);
      setGlobalLoading(true);

      const response = await patientRepository.verifyEmailOtp({ email, otp });
      const { accessToken } = response.data;

      await secureStorageService.set(SecureStorageKey.ACCESS_TOKEN, accessToken);
      setAuthenticated(true);

      showToast(t('verifyEmail.success'), 'success');
      router.replace(appRoutes.home);
    } catch (error) {
      let message = t('verifyEmail.errors.generic');

      if (error instanceof NetworkError) {
        message = t('verifyEmail.errors.network');
      } else if (error instanceof ApiError) {
        if (error.isAuthError()) {
          message = t('verifyEmail.errors.invalidOtp');
        } else if (error.isClientError()) {
          message = error.message || message;
        }
      }

      setHasError(true);
      showToast(message, 'error');
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
            <AppImage source={emailVerifyHero} style={styles.heroImage} />

            <AppText variant="h2" align="center">
              {t('verifyEmail.title')}
            </AppText>
          </View>

          <View style={styles.otpSection}>
            <AppText variant="bodySmall" color={theme.colors.textSecondary} style={styles.otpLabel}>
              {t('verifyEmail.subtitle')}
            </AppText>
            <OtpInput
              otpCount={6}
              enableAutoFocus
              onInputChange={(value) => {
                setOtp(value);
                if (hasError) setHasError(false);
              }}
              error={hasError}
              errorMessage={t('verifyEmail.errors.invalidOtp')}
              inputWidth={48}
              inputHeight={52}
              inputBorderRadius={theme.borderRadius.lg}
              focusedBackgroundColor={theme.colors.background}
              unfocusedBackgroundColor={theme.colors.background}
              focusedBorderColor={theme.colors.primary}
              unfocusedBorderColor={theme.colors.border}
              errorBorderColor={theme.colors.error}
              errorBackgroundColor={theme.colors.background}
              textStyle={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            />

            <View style={styles.primaryButtonWrapper}>
              <Button
                fullWidth
                height={52}
                disabled={isVerifyDisabled}
                onPress={handleVerify}
                showLoadingIndicator
                isLoading={isLoading}
              >
                <AppText variant="bodyMedium" align="center" style={styles.primaryButtonText}>
                  {t('verifyEmail.primaryAction')}
                </AppText>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  heroImage: {
    height: 96,
    width: 96,
  },
  otpLabel: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  otpSection: {
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: theme.colors.buttonText,
  },
  primaryButtonWrapper: {
    marginTop: theme.spacing.lg,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
}));
