import '@/config/i18n';
import '@/config/reactotron';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProviderWithViewport } from '@/shared/ui/molecules/Toast';
import { useAuthStore } from '@/store';
import { useFonts } from '@/utils/font/font.utils';

const queryClient = new QueryClient();

function AuthInitializer() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
}

const styles = {
  fullscreen: { flex: 1 },
  centeredFullscreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
} as const;

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts();
  const appReady = fontsLoaded || Boolean(fontError);

  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!appReady) {
    return (
      <GestureHandlerRootView style={styles.fullscreen}>
        <View style={styles.centeredFullscreen}>
          <ActivityIndicator size="large" />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <ToastProviderWithViewport>
      <GestureHandlerRootView style={styles.fullscreen}>
        <QueryClientProvider client={queryClient}>
          <AuthInitializer />
          {!isInitialized ? (
            <View style={styles.centeredFullscreen}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="landing" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="verify-email" />
              </Stack.Protected>

              <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(home)" />
              </Stack.Protected>
            </Stack>
          )}
          <StatusBar style="auto" />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ToastProviderWithViewport>
  );
}
