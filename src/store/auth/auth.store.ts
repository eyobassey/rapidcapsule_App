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

/** Shape we persist under USER_DATA */
type PersistedAuthState = {
  user: Patient | null;
  isAuthenticated: boolean;
};

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

          if (accessToken) {
            // Restore user from persisted storage (in case rehydration hasn't run or order differs)
            const persisted = storageService.get<PersistedAuthState>(StorageKey.USER_DATA);
            const user = persisted?.user ?? null;
            set({ isAuthenticated: true, user, isInitialized: true });
          } else {
            // No token, user is not authenticated
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
          // storageService.get() already returns the parsed object, not a string
          const raw = storageService.get<PersistedAuthState | null>(StorageKey.USER_DATA);
          if (raw == null) return null;
          return JSON.stringify({ state: raw });
        },
        setItem: (_name, value) => {
          try {
            const parsed = JSON.parse(value) as {
              state?: PersistedAuthState;
              user?: Patient | null;
              isAuthenticated?: boolean;
            };
            // Zustand passes { state, version }; fallback if raw state was stored
            const toStore =
              parsed.state ??
              (parsed.user !== undefined || parsed.isAuthenticated !== undefined ? parsed : null);
            if (toStore != null) {
              storageService.set(StorageKey.USER_DATA, toStore);
            }
          } catch (e) {
            console.error('[AuthStore] persist setItem failed:', e);
          }
        },
        removeItem: (_name) => {
          storageService.remove(StorageKey.USER_DATA);
        },
      })),
      // Only persist non-sensitive data (include required Patient fields for rehydration)
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              firstName: state.user.firstName,
              lastName: state.user.lastName,
              profilePicture: state.user.profilePicture,
              isEmailVerified: state.user.isEmailVerified,
              isPhoneVerified: state.user.isPhoneVerified,
              createdAt: state.user.createdAt,
              updatedAt: state.user.updatedAt,
            }
          : null,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
