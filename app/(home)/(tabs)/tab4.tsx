import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Screen } from '@/components/base';

export default function Tab4Screen() {
  const { t } = useTranslation('home');
  return (
    <Screen edges={['top']}>
      <View style={styles.placeholder}>
        <AppText variant="bodyMedium">{t('tabs.tab4')}</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  placeholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
}));
