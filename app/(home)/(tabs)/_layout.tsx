import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';

import { getFontFamily } from '@/config/fonts';

/**
 * Tab layout for authenticated home (Tab 1–4).
 */
export default function HomeTabsLayout() {
  const { t } = useTranslation('home');
  const { theme } = useUnistyles();

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      iconColor={theme.colors.primary}
      labelStyle={{
        selected: {
          color: theme.colors.primary,
        },
        default: {
          color: theme.colors.text,
        },
        fontFamily: getFontFamily('medium'),
        fontSize: theme.typography.fontSize.xs,
      }}
    >
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" />
        <Label>{t('tabs.tab1')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="appointments">
        <Icon sf="stethoscope" />
        <Label>{t('tabs.tab2')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="prescriptions">
        <Icon sf="pills.fill" />
        <Label>{t('tabs.tab3')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Icon sf="magnifyingglass" />
        <Label>{t('tabs.search')}</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
