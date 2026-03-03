import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Screen } from '@/components/base';
import { EkaFAB } from '@/components/home/EkaFAB';
import { HomeHeader } from '@/components/home/HomeHeader';
import { ProfileCompletionBanner } from '@/components/home/ProfileCompletionBanner';

/**
 * Home tab (Tab 1): welcome header, main content, Eka FAB.
 */
export default function HomeTabScreen() {
  return (
    <Screen edges={['top']} style={styles.container}>
      <HomeHeader />

      <View style={styles.mainContent}>
        <View style={styles.bannerWrapper}>
          <ProfileCompletionBanner />
        </View>
        <View style={styles.contentPlaceholder} />

        <EkaFAB />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  bannerWrapper: {
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  contentPlaceholder: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
}));
