import { Stack } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { getFontFamily } from '@/config/fonts';

/**
 * Authenticated home layout: Stack so we can push Profile and other screens.
 * (tabs) renders the native tab bar; profile is a stacked screen.
 */
export default function HomeLayout() {
  const { theme } = useUnistyles();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: 'My Profile',
          headerBackTitle: '',
          headerBackButtonDisplayMode: 'generic',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#f1f5f9' },
          headerTintColor: '#0f172a',
          headerTitleStyle: {
            fontSize: theme.typography.fontSize.xl,
            fontFamily: getFontFamily('semibold'),
          },
        }}
      />
    </Stack>
  );
}
