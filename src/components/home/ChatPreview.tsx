import userAvatar from '@assets/avatar.jpg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppAvatar, AppText, ChatBubble, EkaAvatar } from '@/components/base';

export const ChatPreview: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <View style={styles.container}>
      <View style={styles.rowUser}>
        <ChatBubble variant="outgoing">
          <AppText variant="h4" align="left">
            {t('chat.userMessage')}
          </AppText>
        </ChatBubble>
        <AppAvatar source={userAvatar} size="small" />
      </View>

      <View style={styles.rowBot}>
        <EkaAvatar size={40} />
        <ChatBubble variant="incoming">
          <AppText variant="h4" align="left">
            {t('chat.botResponse')}
          </AppText>
        </ChatBubble>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.md,
    paddingTop: theme.spacing.xxl,
  },
  rowBot: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  rowUser: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'flex-end',
  },
}));
