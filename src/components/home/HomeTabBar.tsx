import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppText } from '@/components/base';

type TabId = 'home' | 'appointments' | 'prescriptions' | 'pharmacy';

interface TabConfig {
  id: TabId;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  labelKey: string;
}

const TABS: TabConfig[] = [
  { id: 'home', icon: 'home', labelKey: 'tabs.tab1' },
  { id: 'appointments', icon: 'calendar', labelKey: 'tabs.tab2' },
  { id: 'prescriptions', icon: 'medkit', labelKey: 'tabs.tab3' },
  { id: 'pharmacy', icon: 'bag-handle-outline', labelKey: 'tabs.tab4' },
];

export const HomeTabBar: React.FC = () => {
  const { t } = useTranslation('home');
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState<TabId>('home');

  const bottomPadding = Math.max(insets.bottom, theme.spacing.md);

  return (
    <View style={[styles.wrapper, { paddingBottom: bottomPadding }]}>
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              accessibilityLabel={t(tab.labelKey)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={isActive ? theme.colors.primary : theme.colors.text}
              />
              <AppText
                variant="bodySmall"
                color={isActive ? theme.colors.primary : theme.colors.text}
                style={styles.tabLabel}
              >
                {t(tab.labelKey)}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={({ pressed }) => [styles.searchButton, pressed && styles.searchButtonPressed]}
        accessibilityLabel={t('tabs.search')}
        accessibilityRole="button"
      >
        <Ionicons name="search" size={22} color={theme.colors.text} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  searchButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
    width: 44,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
      },
      android: { elevation: 2 },
    }),
  },
  searchButtonPressed: {
    opacity: 0.8,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.xs,
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  tabActive: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.full,
    marginHorizontal: theme.spacing.xs,
  },
  tabBar: {
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.xl,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  tabLabel: {
    fontSize: theme.typography.fontSize.xs,
  },
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
}));
