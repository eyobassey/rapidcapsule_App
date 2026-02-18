/**
 * Base Repository
 *
 * Abstract base class for repositories
 * Follows Repository Pattern and Open/Closed Principle (OCP)
 */

import { IApiClient } from '@/services/api/client/api-client';
import { ApiError, ApiErrorCode } from '@/services/api/errors/api-error';

/**
 * Base Repository Interface
 */
export interface IBaseRepository {
  readonly basePath: string;
}

/**
 * Base Repository Class
 * Provides common CRUD operations
 */
export abstract class BaseRepository implements IBaseRepository {
  abstract readonly basePath: string;

  constructor(protected readonly apiClient: IApiClient) {}

  /**
   * GET request helper
   */
  protected async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    try {
      return await this.apiClient.get<T>(`${this.basePath}${path}`, { params });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST request helper
   */
  protected async post<T>(
    path: string,
    data?: unknown,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      return await this.apiClient.post<T>(`${this.basePath}${path}`, data, { params });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT request helper
   */
  protected async put<T>(
    path: string,
    data?: unknown,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      return await this.apiClient.put<T>(`${this.basePath}${path}`, data, { params });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH request helper
   */
  protected async patch<T>(
    path: string,
    data?: unknown,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      return await this.apiClient.patch<T>(`${this.basePath}${path}`, data, { params });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE request helper
   */
  protected async delete<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    try {
      return await this.apiClient.delete<T>(`${this.basePath}${path}`, { params });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle errors
   * Can be overridden by child classes for custom error handling
   */
  protected handleError(error: unknown): never {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      ApiErrorCode.UNKNOWN_ERROR,
      'An unexpected error occurred',
      undefined,
      error
    );
  }
}
