import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Screen } from '@/components/base';
import { HomeFAB } from '@/components/home/HomeFAB';
import { HomeHeader } from '@/components/home/HomeHeader';
import { ProfileCompletionBanner } from '@/components/home/ProfileCompletionBanner';

/**
 * Home tab (Tab 1): welcome header, main content, Eka FAB.
 */
export default function HomeTabScreen() {
  return (
    <Screen edges={['top']}>
      <HomeHeader />

      <View style={styles.mainContent}>
        <View style={styles.bannerWrapper}>
          <ProfileCompletionBanner />
        </View>
        <View style={styles.contentPlaceholder} />

        <HomeFAB />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  bannerWrapper: {
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  contentPlaceholder: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
}));
