import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { AppIcon, AppText, EkaAvatar } from '@/components/base';

export const EkaChatScreen: React.FC = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation('home');
  const insets = useSafeAreaInsets();

  const messages = [t('ekaChat.message1'), t('ekaChat.message2'), t('ekaChat.message3')];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar}>
            <EkaAvatar size={32} disableShadow />
          </View>
          <AppText variant="bodyMedium" style={styles.headerTitle}>
            {t('ekaChat.title')}
          </AppText>
        </View>
      </View>

      <ScrollView
        style={styles.messagesScroll}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View key={msg} style={styles.messageRow}>
            <View style={styles.messageBubble}>
              <AppText variant="bodyMedium" style={styles.messageText}>
                {msg}
              </AppText>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.bottomArea, { paddingBottom: insets.bottom + theme.spacing.md }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          <BottomChip label={t('eka.chips.healthCheck')} icon="WaitingAppointmentsCalendar" />
          <BottomChip label={t('eka.chips.drugInteraction')} icon="Medicines" />
          <BottomChip label={t('eka.chips.analyzePrescription')} icon="AiFileSpark" />
        </ScrollView>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <AppIcon name="AttachFileAdd" size={18} color={theme.colors.palette.gray[500]} />
            <TextInput
              style={styles.input}
              placeholder={t('ekaChat.inputPlaceholder')}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
          <View style={styles.sendButton}>
            <AppIcon name="NavigationArrowNorth" size={18} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
};

interface BottomChipProps {
  label: string;
  icon: React.ComponentProps<typeof AppIcon>['name'];
}

const BottomChip: React.FC<BottomChipProps> = ({ label, icon }) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.chip}>
      <View style={[styles.chipIconCircle, { backgroundColor: theme.colors.background }]}>
        <AppIcon name={icon} size={16} color={theme.colors.text} />
      </View>
      <AppText variant="bodySmall" style={styles.chipLabel} numberOfLines={2}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  bottomArea: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 999,
    flexDirection: 'row',
    marginRight: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  chipIconCircle: {
    alignItems: 'center',
    borderRadius: 999,
    height: 24,
    justifyContent: 'center',
    marginRight: theme.spacing.xs,
    width: 24,
  },
  chipLabel: {
    maxWidth: 140,
  },
  chipRow: {
    paddingBottom: theme.spacing.sm,
  },
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  header: {
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  headerAvatar: {
    borderRadius: 999,
    marginRight: theme.spacing.sm,
    overflow: 'hidden',
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: '600',
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 999,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.sm,
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
  },
  messageBubble: {
    backgroundColor: theme.colors.palette.blue[100],
    borderRadius: 24,
    maxWidth: '80%',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  messageRow: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.sm,
  },
  messageText: {
    color: theme.colors.palette.blue[700],
  },
  messagesContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  messagesScroll: {
    flex: 1,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
    width: 44,
  },
}));
