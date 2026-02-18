/**
 * Storage Services Barrel Export
 *
 * Exports both secure storage (for tokens/sensitive data) and
 * regular storage (for preferences/non-sensitive data)
 */

// Secure storage for tokens and sensitive health data
export {
  type ISecureStorageService,
  SecureStorageKey,
  secureStorageService,
} from './secure-storage.service';

// Regular storage for preferences and non-sensitive data
export { type IStorageService, StorageKey, storageService } from './storage.service';
