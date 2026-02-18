/**
 * API Error Classes
 *
 * Custom error classes for API error handling
 * Follows Open/Closed Principle (OCP)
 */

export enum ApiErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Base API Error Class
 */
export class ApiError extends Error {
  constructor(
    public code: ApiErrorCode,
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Check if error is a network error
   */
  isNetworkError(): boolean {
    return this.code === ApiErrorCode.NETWORK_ERROR;
  }

  /**
   * Check if error is a timeout error
   */
  isTimeoutError(): boolean {
    return this.code === ApiErrorCode.TIMEOUT_ERROR;
  }

  /**
   * Check if error is an authentication error
   */
  isAuthError(): boolean {
    return this.code === ApiErrorCode.UNAUTHORIZED || this.code === ApiErrorCode.FORBIDDEN;
  }

  /**
   * Check if error is a client error (4xx)
   */
  isClientError(): boolean {
    return this.statusCode !== undefined && this.statusCode >= 400 && this.statusCode < 500;
  }

  /**
   * Check if error is a server error (5xx)
   */
  isServerError(): boolean {
    return this.statusCode !== undefined && this.statusCode >= 500;
  }
}

/**
 * Network Error
 */
export class NetworkError extends ApiError {
  constructor(message: string = 'Network connection failed', originalError?: unknown) {
    super(ApiErrorCode.NETWORK_ERROR, message, undefined, originalError);
    this.name = 'NetworkError';
  }
}

/**
 * Timeout Error
 */
export class TimeoutError extends ApiError {
  constructor(message: string = 'Request timeout') {
    super(ApiErrorCode.TIMEOUT_ERROR, message);
    this.name = 'TimeoutError';
  }
}

/**
 * Unauthorized Error
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized', data?: unknown) {
    super(ApiErrorCode.UNAUTHORIZED, message, 401, undefined, data);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Validation Error
 */
export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed', data?: unknown) {
    super(ApiErrorCode.VALIDATION_ERROR, message, 400, undefined, data);
    this.name = 'ValidationError';
  }
}
