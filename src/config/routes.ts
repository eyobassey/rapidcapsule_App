import type { Href } from 'expo-router';

/**
 * Central, type-safe route definitions for Expo Router.
 *
 * Use these instead of hard-coded string paths so that navigation
 * stays consistent and refactor-friendly.
 */
export const appRoutes = {
  home: '/' as const,
  landing: '/landing' as const,
  login: '/login' as const,
  register: '/register' as const,
  verifyEmail: '/verify-email' as const,
  eka: '/eka' as const,
  profile: '/profile' as const,
} satisfies Record<string, Href>;

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes];
