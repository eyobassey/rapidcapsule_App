import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppIcon, AppText, EkaAvatar } from '@/components/base';
import FloatingActionButton from '@/components/home/FloatingActionButton';
import { appRoutes } from '@/config/routes';

interface HistoryItem {
  key: string;
}

const HISTORY_ITEMS: HistoryItem[] = [{ key: 'eka.history.item1' }, { key: 'eka.history.item2' }];

export const EkaCompanionScreen: React.FC = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation('home');
  const insets = useSafeAreaInsets();

  const [isFabCollapsed, setFabCollapsed] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setFabCollapsed(true)}
        onMomentumScrollEnd={() => setFabCollapsed(false)}
        onScrollEndDrag={() => setFabCollapsed(false)}
      >
        <View style={styles.headerRow}>
          <View style={styles.creditsPill}>
            <AppIcon name="CoinDiagonal" size={16} color={theme.colors.text} />
            <AppText variant="bodySmall" style={styles.creditsText} numberOfLines={1}>
              {t('eka.creditsLabel', { count: 12 })}
            </AppText>
          </View>
          <Pressable
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel={t('common.close', { defaultValue: 'Close' })}
            onPress={() => router.back()}
          >
            <AppIcon name="Delete1" size={16} color={theme.colors.text} />
          </Pressable>
        </View>

        <View style={styles.avatarSection}>
          <EkaAvatar size="xl" />
          <AppText variant="h2" align="center" style={styles.title}>
            {t('eka.titleLine1')}
          </AppText>
          <AppText variant="h3" align="center" style={styles.subtitle}>
            {t('eka.titleLine2')}
          </AppText>
        </View>

        <View style={styles.startSection}>
          <AppText variant="bodySmall" style={styles.sectionLabel}>
            {t('eka.startHeading')}
          </AppText>
          <View style={styles.chipGrid}>
            <StartChip
              icon="WaitingAppointmentsCalendar"
              label={t('eka.chips.healthCheck')}
              themeColor={theme.colors.palette.red[500]}
            />
            <StartChip
              icon="Medicines"
              label={t('eka.chips.drugInteraction')}
              themeColor={theme.colors.palette.blue[500]}
            />
            <StartChip
              icon="AiFileSpark"
              label={t('eka.chips.analyzePrescription')}
              themeColor={theme.colors.palette.violet[500]}
            />
            <StartChip
              icon="Home3"
              label={t('eka.chips.findSpecialist')}
              themeColor={theme.colors.palette.emerald[500]}
            />
            <StartChip
              icon="Cog2"
              label={t('eka.chips.reviewVitals')}
              themeColor={theme.colors.palette.gray[800]}
            />
            <StartChip
              icon="ChatBubbleSquareAdd"
              label={t('eka.chips.askQuestion')}
              themeColor={theme.colors.palette.indigo[500]}
            />
          </View>
        </View>

        <View style={styles.historyHeader}>
          <AppText variant="bodySmall" style={styles.sectionLabel}>
            {t('eka.historyHeading')}
          </AppText>
          <Pressable>
            <AppText variant="bodySmall" style={styles.seeAll}>
              {t('eka.seeAll')}
            </AppText>
          </Pressable>
        </View>

        <View style={styles.historyList}>
          {HISTORY_ITEMS.map((item) => (
            <View key={item.key} style={styles.historyCard}>
              <AppText variant="bodySmall" style={styles.historyTitle}>
                {t(`${item.key}.title`)}
              </AppText>
              <AppText variant="caption" style={styles.historyDate}>
                {t(`${item.key}.date`)}
              </AppText>
            </View>
          ))}
        </View>
      </ScrollView>

      <FloatingActionButton
        onPress={() => {
          router.push(appRoutes.ekaChat);
        }}
        isScrolling={isFabCollapsed}
        iconName="ChatTwoBubblesSquareText1"
        label={t('eka.newChat')}
        bottomOffset={insets.bottom + theme.spacing.lg}
      />
    </View>
  );
};

interface StartChipProps {
  icon: React.ComponentProps<typeof AppIcon>['name'];
  label: string;
  themeColor: string;
}

const StartChip: React.FC<StartChipProps> = ({ icon, label, themeColor }) => {
  return (
    <Pressable style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}>
      <View style={[styles.chipIconCircle, { backgroundColor: `${themeColor}22` }]}>
        <AppIcon name={icon} size={16} color={themeColor} />
      </View>
      <AppText variant="bodySmall" style={styles.chipLabel} numberOfLines={2}>
        {label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  avatarSection: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 999,
    elevation: 2,
    flexBasis: '48%',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  chipIconCircle: {
    alignItems: 'center',
    borderRadius: 999,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  chipLabel: {
    flex: 1,
  },
  chipPressed: {
    opacity: 0.9,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 999,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  container: {
    flex: 1,
  },
  creditsPill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 999,
    flexDirection: 'row',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  creditsText: {
    color: theme.colors.textSecondary,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  historyDate: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs / 2,
  },
  historyHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  historyList: {
    gap: theme.spacing.sm,
  },
  historyTitle: {
    color: theme.colors.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  sectionLabel: {
    color: theme.colors.textSecondary,
  },
  seeAll: {
    color: theme.colors.primary,
  },
  startSection: {
    marginTop: theme.spacing.lg,
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  title: {
    marginTop: theme.spacing.sm,
  },
}));
