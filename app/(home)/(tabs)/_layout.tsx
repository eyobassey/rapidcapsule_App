import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';

/**
 * Tab layout for authenticated home (Tab 1–4).
 */
export default function HomeTabsLayout() {
  const { t } = useTranslation('home');

  return (
    <NativeTabs minimizeBehavior="onScrollDown">
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
      <NativeTabs.Trigger name="pharmacy">
        <Icon sf="cross.case.fill" />
        <Label>{t('tabs.tab4')}</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
