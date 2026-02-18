/**
 * Error Utilities
 *
 * Error handling and formatting utilities
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import { ApiError } from '@/services/api/errors/api-error';

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return 'An unexpected error occurred';
  }

  // Handle ApiError instances
  if (error instanceof ApiError) {
    return error.message || 'An error occurred';
  }

  // Handle Error instances
  if (error instanceof Error) {
    return error.message || 'An error occurred';
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle objects with message property
  if (typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred';
};

/**
 * Get error code from error
 */
export const getErrorCode = (error: unknown): string | undefined => {
  if (error instanceof ApiError) {
    return error.code;
  }
  if (typeof error === 'object' && error !== null && 'code' in error) {
    return String(error.code);
  }
  return undefined;
};

/**
 * Get error status code
 */
export const getErrorStatusCode = (error: unknown): number | undefined => {
  if (error instanceof ApiError) {
    return error.statusCode;
  }
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    return Number(error.statusCode);
  }
  return undefined;
};

/**
 * Check if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return error.isNetworkError();
  }
  return false;
};

/**
 * Check if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    return error.isAuthError();
  }
  return false;
};

/**
 * Format error for logging
 */
export const formatErrorForLogging = (error: unknown): string => {
  const message = getErrorMessage(error);
  const code = getErrorCode(error);
  const statusCode = getErrorStatusCode(error);

  let logMessage = `Error: ${message}`;
  if (code) {
    logMessage += ` [Code: ${code}]`;
  }
  if (statusCode) {
    logMessage += ` [Status: ${statusCode}]`;
  }

  return logMessage;
};
