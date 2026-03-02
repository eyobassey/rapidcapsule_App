import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Screen } from '@/components/base';
import { ActionButtons } from '@/components/home/ActionButtons';
import { BrandSection } from '@/components/home/BrandSection';
import { ChatPreview } from '@/components/home/ChatPreview';

/**
 * Landing screen for unauthenticated users.
 * Accessible only when not logged in (via Stack.Protected).
 */
export default function LandingScreen() {
  return (
    <Screen gradient="heroBlue">
      <View style={styles.content}>
        <ChatPreview />
        <View>
          <BrandSection />
          <ActionButtons />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
  },
}));
