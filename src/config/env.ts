/**
 * Environment Configuration
 *
 * Type-safe environment variables with validation
 * Follows Single Responsibility Principle (SRP)
 */

import Constants from 'expo-constants';

interface EnvConfig {
  apiBaseUrl: string;
  wsUrl: string;
  apiTimeout: number;
  enableLogging: boolean;
  enableNetworkLogging: boolean;
}

/**
 * Get environment variable with fallback
 * React Native/Expo compatible - uses expo-constants
 */
const getEnvVar = (key: string, fallback: string): string => {
  // In React Native/Expo, environment variables are accessed via Constants.expoConfig.extra
  const value = Constants.expoConfig?.extra?.[key];
  return value || fallback;
};

/**
 * Environment configuration
 * Uses expo-constants for accessing environment variables
 */
export const env: EnvConfig = {
  apiBaseUrl: getEnvVar('API_BASE_URL', 'https://api.rapidcapsule.com'),
  wsUrl: getEnvVar('WS_URL', 'wss://api.rapidcapsule.com'),
  apiTimeout: parseInt(getEnvVar('API_TIMEOUT', '30000'), 10),
  enableLogging: getEnvVar('ENABLE_LOGGING', 'true') === 'true',
  enableNetworkLogging: getEnvVar('ENABLE_NETWORK_LOGGING', 'false') === 'true',
};

/**
 * Validate environment configuration
 */
export const validateEnv = (): void => {
  if (!env.apiBaseUrl) {
    throw new Error('API_BASE_URL is required');
  }

  if (!env.apiBaseUrl.startsWith('http')) {
    throw new Error('API_BASE_URL must start with http:// or https://');
  }
};

// Validate on import
validateEnv();
