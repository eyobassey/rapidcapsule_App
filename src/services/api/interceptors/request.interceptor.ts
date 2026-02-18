/**
 * Request Interceptor
 *
 * Handles request transformation, authentication, and logging
 * Follows Single Responsibility Principle (SRP)
 */

import { InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import { SecureStorageKey, secureStorageService } from '@/services/storage';

/**
 * Request Interceptor Function
 */
export const requestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  // Add base URL if not present
  if (!config.baseURL) {
    config.baseURL = env.apiBaseUrl;
  }

  // Add timeout
  config.timeout = config.timeout || env.apiTimeout;

  // Add authentication token from secure storage
  const accessToken = await secureStorageService.get(SecureStorageKey.ACCESS_TOKEN);
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Add common headers
  if (config.headers) {
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['X-Platform'] = 'mobile';
    config.headers['X-App-Version'] = '1.0.0'; // TODO: Get from app.json or package.json
  }

  // Log request in development
  if (env.enableNetworkLogging) {
    // eslint-disable-next-line no-console
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      baseURL: config.baseURL,
      headers: config.headers,
      params: config.params,
      data: config.data,
    });
  }

  return config;
};
