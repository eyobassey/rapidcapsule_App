/**
 * API Services Barrel Export
 *
 * Central export point for all API services
 */

export type { IApiClient } from './client/api-client';
export { apiClient } from './client/api-client';
export * from './errors/api-error';
export * from './repositories/base.repository';
export type { IPatientRepository } from './repositories/patient/patient.repository';
export { patientRepository } from './repositories/patient/patient.repository';
