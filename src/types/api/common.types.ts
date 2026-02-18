/**
 * Common API Types
 *
 * Shared types for API responses
 */

/**
 * Base API Response
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error Response
 */
export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}
