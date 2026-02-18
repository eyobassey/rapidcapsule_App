/**
 * Storage Service
 *
 * Provides fast storage for non-sensitive data using MMKV
 * For sensitive data (tokens, health data), use SecureStorageService instead
 *
 * MMKV is suitable for:
 * - App preferences (theme, language)
 * - Cached non-sensitive data
 * - UI state
 *
 * MMKV is NOT suitable for:
 * - Authentication tokens (use SecureStorageService)
 * - Health records (use SecureStorageService)
 * - Personal identifiable information (use SecureStorageService)
 *
 * Follows Interface Segregation Principle (ISP)
 */

import { createMMKV, MMKV } from 'react-native-mmkv';

/**
 * Storage keys enum for type safety
 * Note: Tokens and sensitive data should use SecureStorageKey instead
 */
export enum StorageKey {
  USER_DATA = 'user_data', // Non-sensitive user preferences only
  THEME_PREFERENCE = 'theme_preference',
  LANGUAGE = 'language',
  ONBOARDING_COMPLETED = 'onboarding_completed',
  LAST_SYNC_TIME = 'last_sync_time',
}

/**
 * Storage Service Interface
 * Follows Dependency Inversion Principle (DIP)
 */
export interface IStorageService {
  set<T>(key: StorageKey, value: T): void;
  get<T>(key: StorageKey): T | undefined;
  remove(key: StorageKey): void;
  clear(): void;
  has(key: StorageKey): boolean;
}

/**
 * MMKV Storage Service Implementation
 * Production-grade secure storage
 */
class StorageService implements IStorageService {
  private storage: MMKV;

  constructor() {
    // Initialize MMKV for non-sensitive data
    // Note: MMKV encryption is optional and uses a simple key
    // For sensitive data, use SecureStorageService which uses platform-native encryption
    this.storage = createMMKV({
      id: 'rapidcapsule-storage',
      // Encryption key for MMKV (optional, for non-sensitive data)
      // In production, consider using a more secure key derivation method
      encryptionKey: 'rapidcapsule-prefs-key', // Only for non-sensitive preferences
    });
  }

  /**
   * Set a value in storage
   */
  set<T>(key: StorageKey, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      this.storage.set(key, serialized);
    } catch (error) {
      console.error(`[StorageService] Error setting key ${key}:`, error);
      throw new Error(`Failed to store ${key}`);
    }
  }

  /**
   * Get a value from storage
   */
  get<T>(key: StorageKey): T | undefined {
    try {
      const value = this.storage.getString(key);
      if (!value) {
        return undefined;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`[StorageService] Error getting key ${key}:`, error);
      return undefined;
    }
  }

  /**
   * Remove a value from storage
   */
  remove(key: StorageKey): void {
    try {
      // MMKV remove method
      this.storage.remove(key);
    } catch (error) {
      console.error(`[StorageService] Error removing key ${key}:`, error);
    }
  }

  /**
   * Clear all storage
   */
  clear(): void {
    try {
      this.storage.clearAll();
    } catch (error) {
      console.error('[StorageService] Error clearing storage:', error);
    }
  }

  /**
   * Check if a key exists
   */
  has(key: StorageKey): boolean {
    return this.storage.contains(key);
  }
}

// Singleton instance
export const storageService = new StorageService();
