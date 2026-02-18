/**
 * Authentication Store
 *
 * Manages authentication state and user session
 * Uses Zustand for client-side state management
 *
 * Follows Single Responsibility Principle (SRP)
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  SecureStorageKey,
  secureStorageService,
  StorageKey,
  storageService,
} from '@/services/storage';
import { Patient } from '@/types/api/patient.types';

interface AuthState {
  // State
  isAuthenticated: boolean;
  user: Patient | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  setUser: (user: Patient | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  initialize: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<Patient>) => void;
}

/**
 * Authentication Store
 *
 * Manages:
 * - Authentication state
 * - Current user data
 * - Session initialization
 * - Logout flow
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      isLoading: false,
      isInitialized: false,

      /**
       * Set user data
       */
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      /**
       * Set authentication state
       */
      setAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
      },

      /**
       * Set loading state
       */
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      /**
       * Initialize auth state from secure storage
       * Called on app startup
       */
      initialize: async () => {
        try {
          set({ isLoading: true });

          // Check if tokens exist
          const accessToken = await secureStorageService.get(SecureStorageKey.ACCESS_TOKEN);
          const refreshToken = await secureStorageService.get(SecureStorageKey.REFRESH_TOKEN);

          if (accessToken && refreshToken) {
            // Tokens exist, mark as authenticated
            // User data will be fetched by React Query hooks
            set({ isAuthenticated: true, isInitialized: true });
          } else {
            // No tokens, user is not authenticated
            set({ isAuthenticated: false, isInitialized: true });
          }
        } catch (error) {
          console.error('[AuthStore] Error initializing:', error);
          set({ isAuthenticated: false, isInitialized: true });
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Logout user
       * Clears all auth-related data
       */
      logout: async () => {
        try {
          set({ isLoading: true });

          // Clear tokens from secure storage
          await secureStorageService.remove(SecureStorageKey.ACCESS_TOKEN);
          await secureStorageService.remove(SecureStorageKey.REFRESH_TOKEN);
          await secureStorageService.remove(SecureStorageKey.USER_ID);

          // Clear user data from regular storage
          storageService.remove(StorageKey.USER_DATA);

          // Reset state
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        } catch (error) {
          console.error('[AuthStore] Error during logout:', error);
        }
      },

      /**
       * Update user data
       */
      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (_name) => {
          const value = storageService.get<string>(StorageKey.USER_DATA);
          return value ? JSON.stringify({ state: JSON.parse(value) }) : null;
        },
        setItem: (_name, value) => {
          const parsed = JSON.parse(value);
          storageService.set(StorageKey.USER_DATA, parsed.state);
        },
        removeItem: (_name) => {
          storageService.remove(StorageKey.USER_DATA);
        },
      })),
      // Only persist non-sensitive data
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              firstName: state.user.firstName,
              lastName: state.user.lastName,
              profilePicture: state.user.profilePicture,
            }
          : null,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
