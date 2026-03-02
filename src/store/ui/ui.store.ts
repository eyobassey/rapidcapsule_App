/**
 * UI Store
 *
 * Manages UI state, theme, language, and UI preferences
 * Uses Zustand for client-side state management
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { StorageKey, storageService } from '@/services/storage';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'es' | 'fr'; // Add more as needed

interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Language
  language: Language;
  setLanguage: (language: Language) => void;

  // UI State
  isBottomSheetOpen: boolean;
  bottomSheetContent: React.ReactNode | null;
  openBottomSheet: (content: React.ReactNode) => void;
  closeBottomSheet: () => void;

  // Modals
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;

  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

/**
 * UI Store
 *
 * Manages:
 * - Theme preferences
 * - Language preferences
 * - UI component states (modals, bottom sheets)
 * - Global loading states
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        storageService.set(StorageKey.THEME_PREFERENCE, theme);
      },

      // Language
      language: 'en',
      setLanguage: (language) => {
        set({ language });
        storageService.set(StorageKey.LANGUAGE, language);
      },

      // Bottom Sheet
      isBottomSheetOpen: false,
      bottomSheetContent: null,
      openBottomSheet: (content) => {
        set({ isBottomSheetOpen: true, bottomSheetContent: content });
      },
      closeBottomSheet: () => {
        set({ isBottomSheetOpen: false, bottomSheetContent: null });
      },

      // Modal
      isModalOpen: false,
      modalContent: null,
      openModal: (content) => {
        set({ isModalOpen: true, modalContent: content });
      },
      closeModal: () => {
        set({ isModalOpen: false, modalContent: null });
      },

      // Global Loading
      globalLoading: false,
      setGlobalLoading: (loading) => {
        set({ globalLoading: loading });
      },
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => ({
        getItem: (_name) => {
          const theme = storageService.get<Theme>(StorageKey.THEME_PREFERENCE);
          const language = storageService.get<Language>(StorageKey.LANGUAGE);
          return JSON.stringify({
            state: {
              theme: theme || 'system',
              language: language || 'en',
            },
          });
        },
        setItem: (_name, _value) => {
          // Persistence handled by individual setters
        },
        removeItem: (_name) => {
          storageService.remove(StorageKey.THEME_PREFERENCE);
          storageService.remove(StorageKey.LANGUAGE);
        },
      })),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
