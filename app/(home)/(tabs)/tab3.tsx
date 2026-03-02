import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppText, Screen } from '@/components/base';

export default function Tab3Screen() {
  return (
    <Screen edges={['top']}>
      <View style={styles.placeholder}>
        <AppText variant="bodyMedium">Tab 3</AppText>
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
