import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Screen } from '@/components/base';
import { HomeFAB } from '@/components/home/HomeFAB';
import { HomeHeader } from '@/components/home/HomeHeader';

/**
 * Home tab (Tab 1): welcome header, main content, Eka FAB.
 */
export default function HomeTabScreen() {
  return (
    <Screen edges={['top']}>
      <HomeHeader />

      <View style={styles.mainContent}>
        <View style={styles.contentPlaceholder} />

        <HomeFAB />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create(() => ({
  contentPlaceholder: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
}));
