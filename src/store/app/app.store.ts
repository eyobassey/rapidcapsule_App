/**
 * App Store
 *
 * Manages global app state, network status, and app lifecycle
 */

import { NetInfoStateType } from '@react-native-community/netinfo';
import { create } from 'zustand';

import { NetworkState } from '@/services/network/network.service';
import { StorageKey, storageService } from '@/services/storage';

interface AppState {
  // Network
  networkState: NetworkState;
  setNetworkState: (state: NetworkState) => void;
  isOnline: boolean;

  // App Lifecycle
  isAppReady: boolean;
  setAppReady: (ready: boolean) => void;

  // App Version
  appVersion: string;
  setAppVersion: (version: string) => void;

  // Onboarding
  isOnboardingCompleted: boolean;
  completeOnboarding: () => void;

  // Deep Linking
  pendingDeepLink: string | null;
  setPendingDeepLink: (link: string | null) => void;
}

/**
 * App Store
 *
 * Manages:
 * - Network connectivity state
 * - App initialization state
 * - Onboarding status
 * - Deep linking
 */
export const useAppStore = create<AppState>((set) => ({
  // Network
  networkState: {
    isConnected: false,
    isInternetReachable: null,
    type: NetInfoStateType.unknown,
  },
  setNetworkState: (state) => {
    set({
      networkState: state,
      isOnline: state.isConnected && (state.isInternetReachable ?? false),
    });
  },
  isOnline: false,

  // App Lifecycle
  isAppReady: false,
  setAppReady: (ready) => {
    set({ isAppReady: ready });
  },

  // App Version
  appVersion: '1.0.0',
  setAppVersion: (version) => {
    set({ appVersion: version });
  },

  // Onboarding
  isOnboardingCompleted: false,
  completeOnboarding: () => {
    set({ isOnboardingCompleted: true });
    // Persist to storage
    storageService.set(StorageKey.ONBOARDING_COMPLETED, true);
  },

  // Deep Linking
  pendingDeepLink: null,
  setPendingDeepLink: (link) => {
    set({ pendingDeepLink: link });
  },
}));
