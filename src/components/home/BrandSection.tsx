import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppIcon, type AppIconName, AppLogo, AppText } from '@/components/base';
import { foundationColors } from '@/config/foundation-colors';

const ICON_SIZE = 18;

interface FeatureItem {
  readonly icon: AppIconName;
  readonly key: string;
  readonly color: string;
}

const FEATURES: readonly FeatureItem[] = [
  { icon: 'CalendarEvent', key: 'features.appointments', color: foundationColors.orange[500] },
  { icon: 'Stethoscope', key: 'features.healthChecks', color: foundationColors.emerald[400] },
  { icon: 'Medicines', key: 'features.pharmacy', color: foundationColors.blue[500] },
  { icon: 'EntEarNoseThroat', key: 'features.symptomChecks', color: foundationColors.teal[400] },
  { icon: 'AiFileSpark', key: 'features.prescriptions', color: foundationColors.blue[600] },
];

export const BrandSection: React.FC = () => {
  const { t } = useTranslation('home');
  const { theme } = useUnistyles();
  const textColor = theme.colors.textSecondary;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AppLogo size="lg" />
      </View>

      <View style={styles.heading}>
        <AppText variant="h2" align="center">
          {t('brand.name')}
        </AppText>

        <View style={styles.featureFlow}>
          <AppText variant="bodyMedium" color={textColor} style={styles.tagline}>
            {t('brand.tagline')}
          </AppText>
          {FEATURES.map((feature, index) => {
            const isLast = index === FEATURES.length - 1;
            const needsComma = index < FEATURES.length - 2;

            return (
              <React.Fragment key={feature.key}>
                {isLast && (
                  <AppText variant="bodyMedium" color={textColor}>
                    {' and '}
                  </AppText>
                )}
                <View style={styles.featureItem}>
                  <AppIcon name={feature.icon} size={ICON_SIZE} color={feature.color} />
                  <AppText variant="bodyMedium" color={textColor}>
                    {' '}
                    {t(feature.key)}
                    {needsComma ? ',' : ' '}
                    {isLast ? '.' : ''}
                  </AppText>
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  featureFlow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.xs,
  },
  featureItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  tagline: {
    marginBottom: theme.spacing.xs / 2,
    textAlign: 'center',
    width: '100%',
  },
}));
