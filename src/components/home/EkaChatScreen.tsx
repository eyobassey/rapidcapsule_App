import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
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
        <Pressable
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel={t('common.close', { defaultValue: 'Close' })}
          onPress={() => router.back()}
        >
          <AppIcon name="Delete1" size={16} color={theme.colors.text} />
        </Pressable>
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
          <BottomChip
            label={t('eka.chips.healthCheck')}
            icon="Stethoscope"
            iconColor={theme.colors.palette.red[500]}
          />
          <BottomChip
            label={t('eka.chips.drugInteraction')}
            icon="Medicines"
            iconColor={theme.colors.palette.blue[500]}
          />
          <BottomChip
            label={t('eka.chips.analyzePrescription')}
            icon="AiFileSpark"
            iconColor={theme.colors.palette.violet[500]}
          />
          <BottomChip
            label={t('eka.chips.findSpecialist')}
            icon="NurseHat"
            iconColor={theme.colors.palette.cyan[500]}
          />
          <BottomChip
            label={t('eka.chips.reviewVitals')}
            icon="HealthCheckStatsTroubleshoot"
            iconColor={theme.colors.palette.green[500]}
          />
          <BottomChip
            label={t('eka.chips.askQuestion')}
            icon="HelpIntermediateQuestionBoxPlaceholder"
            iconColor={theme.colors.palette.indigo[500]}
          />
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
  iconColor: string;
}

const BottomChip: React.FC<BottomChipProps> = ({ label, icon, iconColor }) => {
  return (
    <View style={styles.chip}>
      <View style={styles.chipIconCircle}>
        <AppIcon name={icon} size={16} color={iconColor} />
      </View>
      <AppText variant="bodySmall" style={styles.chipLabel} numberOfLines={2}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  bottomArea: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: theme.spacing.md,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: theme.colors.palette.gray[200],
    borderRadius: theme.borderRadius.xxl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  chipIconCircle: {
    alignItems: 'center',
    borderRadius: 999,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  chipLabel: {
    fontWeight: '500',
    width: 100,
  },
  chipRow: {
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
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
    backgroundColor: theme.colors.palette.gray[100],
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  headerAvatar: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
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
    backgroundColor: theme.colors.background,
    borderRadius: 999,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
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
