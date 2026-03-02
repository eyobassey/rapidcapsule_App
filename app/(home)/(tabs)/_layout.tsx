import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';

/**
 * Tab layout for authenticated home (Tab 1–4).
 */
export default function HomeTabsLayout() {
  const { t } = useTranslation('home');

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" />
        <Label>{t('tabs.tab1')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tab2">
        <Icon sf="calendar" />
        <Label>{t('tabs.tab2')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tab3">
        <Icon sf="pills.fill" />
        <Label>{t('tabs.tab3')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tab4">
        <Icon sf="gearshape.fill" />
        <Label>{t('tabs.tab4')}</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
