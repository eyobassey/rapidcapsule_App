/**
 * Secure Storage Service
 *
 * Production-grade secure storage using platform-native Keychain/Keystore
 * For tokens and sensitive health data (HIPAA-compliant)
 *
 * Uses expo-secure-store which leverages:
 * - iOS Keychain (hardware-backed encryption)
 * - Android Keystore (hardware-backed encryption when available)
 */

import * as SecureStore from 'expo-secure-store';

/**
 * Secure Storage Keys
 * These are stored in platform-native secure storage
 */
export enum SecureStorageKey {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  USER_ID = 'user_id',
  BIOMETRIC_ENABLED = 'biometric_enabled',
}

/**
 * Secure Storage Service Interface
 */
export interface ISecureStorageService {
  set(key: SecureStorageKey, value: string): Promise<void>;
  get(key: SecureStorageKey): Promise<string | null>;
  remove(key: SecureStorageKey): Promise<void>;
  removeAll(): Promise<void>;
  has(key: SecureStorageKey): Promise<boolean>;
}

/**
 * Secure Storage Service Implementation
 * Uses platform-native secure storage (Keychain/Keystore)
 *
 * Security Features:
 * - Hardware-backed encryption (when available)
 * - Protected by device lock screen
 * - Encrypted at rest
 * - Isolated from app data
 * - Survives app uninstall (configurable)
 */
class SecureStorageService implements ISecureStorageService {
  /**
   * Set a value in secure storage
   * @param key - Storage key
   * @param value - Value to store (must be a string)
   * @param options - Storage options
   */
  async set(
    key: SecureStorageKey,
    value: string,
    options?: {
      requireAuthentication?: boolean;
      authenticationPrompt?: string;
    }
  ): Promise<void> {
    try {
      const secureStoreOptions: SecureStore.SecureStoreOptions = {
        // Require authentication for sensitive operations
        requireAuthentication: options?.requireAuthentication ?? false,
        authenticationPrompt: options?.authenticationPrompt ?? 'Authenticate to access secure data',
        // Keychain accessibility (iOS)
        // .WHEN_UNLOCKED - Only accessible when device is unlocked
        // .AFTER_FIRST_UNLOCK - Accessible after first unlock (survives reboot)
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      };

      await SecureStore.setItemAsync(key, value, secureStoreOptions);
    } catch (error) {
      console.error(`[SecureStorageService] Error setting key ${key}:`, error);
      throw new Error(`Failed to securely store ${key}`);
    }
  }

  /**
   * Get a value from secure storage
   */
  async get(key: SecureStorageKey): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`[SecureStorageService] Error getting key ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove a value from secure storage
   */
  async remove(key: SecureStorageKey): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`[SecureStorageService] Error removing key ${key}:`, error);
    }
  }

  /**
   * Remove all values from secure storage
   */
  async removeAll(): Promise<void> {
    try {
      const keys = Object.values(SecureStorageKey);
      await Promise.all(keys.map((key) => this.remove(key)));
    } catch (error) {
      console.error('[SecureStorageService] Error clearing secure storage:', error);
    }
  }

  /**
   * Check if a key exists in secure storage
   */
  async has(key: SecureStorageKey): Promise<boolean> {
    try {
      const value = await this.get(key);
      return value !== null;
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const secureStorageService = new SecureStorageService();
