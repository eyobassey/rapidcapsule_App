/**
 * Response Interceptor
 *
 * Handles response transformation, error handling, and token refresh
 * Follows Single Responsibility Principle (SRP)
 */

import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import {
  ApiError,
  ApiErrorCode,
  NetworkError,
  TimeoutError,
  UnauthorizedError,
  ValidationError,
} from '@/services/api/errors/api-error';
import { networkService } from '@/services/network/network.service';
import { SecureStorageKey, secureStorageService } from '@/services/storage';

/**
 * Response Interceptor Success Handler
 */
export const responseInterceptorSuccess = (response: AxiosResponse): AxiosResponse => {
  // Log response in development
  if (env.enableNetworkLogging) {
    // eslint-disable-next-line no-console
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });
  }

  return response;
};

/**
 * Response Interceptor Error Handler
 * @param axiosInstance - Axios instance for making refresh token request
 */
export const createResponseInterceptorError = (axiosInstance: AxiosInstance) => {
  return async (error: AxiosError): Promise<never> => {
    // Log error in development
    if (env.enableNetworkLogging) {
      console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }

    // Handle network errors
    if (!error.response) {
      const isConnected = await networkService.isConnected();
      if (!isConnected) {
        throw new NetworkError('No internet connection. Please check your network settings.');
      }
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        throw new TimeoutError('Request timeout. Please try again.');
      }
      throw new NetworkError('Network error occurred. Please try again.', error);
    }

    const { status, data } = error.response;
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle specific status codes
    switch (status) {
      case 401:
        // Try to refresh token if this is not a refresh request and hasn't been retried
        if (
          !originalRequest._retry &&
          !originalRequest.url?.includes('/auth/refresh') &&
          !originalRequest.url?.includes('/auth/login')
        ) {
          originalRequest._retry = true;

          try {
            const refreshToken = await secureStorageService.get(SecureStorageKey.REFRESH_TOKEN);
            if (refreshToken) {
              // Attempt token refresh
              const response = await axiosInstance.post<{ accessToken: string }>('/auth/refresh', {
                refreshToken,
              });

              if (response.data.accessToken) {
                // Store new access token in secure storage
                await secureStorageService.set(
                  SecureStorageKey.ACCESS_TOKEN,
                  response.data.accessToken
                );

                // Retry original request with new token
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                }

                return axiosInstance.request(originalRequest);
              }
            }
          } catch (_refreshError) {
            // Refresh failed, clear tokens and throw unauthorized
            await secureStorageService.remove(SecureStorageKey.ACCESS_TOKEN);
            await secureStorageService.remove(SecureStorageKey.REFRESH_TOKEN);
          }
        }

        // Clear tokens on unauthorized
        await secureStorageService.remove(SecureStorageKey.ACCESS_TOKEN);
        await secureStorageService.remove(SecureStorageKey.REFRESH_TOKEN);
        throw new UnauthorizedError(
          (data as { message?: string })?.message || 'Unauthorized. Please login again.',
          data
        );

      case 403:
        throw new ApiError(
          ApiErrorCode.FORBIDDEN,
          (data as { message?: string })?.message || 'Access forbidden',
          403,
          error,
          data
        );

      case 404:
        throw new ApiError(
          ApiErrorCode.NOT_FOUND,
          (data as { message?: string })?.message || 'Resource not found',
          404,
          error,
          data
        );

      case 400:
      case 422:
        throw new ValidationError(
          (data as { message?: string })?.message || 'Validation failed',
          data
        );

      case 500:
      case 502:
      case 503:
      case 504:
        throw new ApiError(
          ApiErrorCode.SERVER_ERROR,
          (data as { message?: string })?.message || 'Server error. Please try again later.',
          status,
          error,
          data
        );

      default:
        throw new ApiError(
          ApiErrorCode.UNKNOWN_ERROR,
          (data as { message?: string })?.message || 'An unexpected error occurred',
          status,
          error,
          data
        );
    }
  };
};

/**
 * Default response interceptor error handler (without token refresh)
 * Use createResponseInterceptorError for token refresh support
 */
export const responseInterceptorError = async (error: AxiosError): Promise<never> => {
  // Log error in development
  if (env.enableNetworkLogging) {
    console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
  }

  // Handle network errors
  if (!error.response) {
    const isConnected = await networkService.isConnected();
    if (!isConnected) {
      throw new NetworkError('No internet connection. Please check your network settings.');
    }
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new TimeoutError('Request timeout. Please try again.');
    }
    throw new NetworkError('Network error occurred. Please try again.', error);
  }

  const { status, data } = error.response;

  // Handle specific status codes
  switch (status) {
    case 401:
      // Clear tokens on unauthorized
      await secureStorageService.remove(SecureStorageKey.ACCESS_TOKEN);
      await secureStorageService.remove(SecureStorageKey.REFRESH_TOKEN);
      throw new UnauthorizedError(
        (data as { message?: string })?.message || 'Unauthorized. Please login again.',
        data
      );

    case 403:
      throw new ApiError(
        ApiErrorCode.FORBIDDEN,
        (data as { message?: string })?.message || 'Access forbidden',
        403,
        error,
        data
      );

    case 404:
      throw new ApiError(
        ApiErrorCode.NOT_FOUND,
        (data as { message?: string })?.message || 'Resource not found',
        404,
        error,
        data
      );

    case 400:
    case 422:
      throw new ValidationError(
        (data as { message?: string })?.message || 'Validation failed',
        data
      );

    case 500:
    case 502:
    case 503:
    case 504:
      throw new ApiError(
        ApiErrorCode.SERVER_ERROR,
        (data as { message?: string })?.message || 'Server error. Please try again later.',
        status,
        error,
        data
      );

    default:
      throw new ApiError(
        ApiErrorCode.UNKNOWN_ERROR,
        (data as { message?: string })?.message || 'An unexpected error occurred',
        status,
        error,
        data
      );
  }
};
