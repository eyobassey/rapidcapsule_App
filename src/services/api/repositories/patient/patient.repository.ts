/**
 * Patient Repository
 *
 * Repository for Patient module API operations
 * Follows Repository Pattern and Single Responsibility Principle (SRP)
 */

import { apiClient } from '@/services/api/client/api-client';
import { BaseRepository } from '@/services/api/repositories/base.repository';
import { ApiResponse } from '@/types/api/common.types';
import {
  Appointment,
  AppointmentResponse,
  AppointmentsResponse,
  CreateAppointmentRequest,
  CreateHealthCheckupRequest,
  CreatePaymentRequest,
  CreateVitalRequest,
  HealthCheckup,
  HealthCheckupResponse,
  HealthCheckupsResponse,
  LoginRequest,
  LoginResponse,
  Patient,
  Payment,
  PaymentResponse,
  PaymentsResponse,
  Prescription,
  PrescriptionResponse,
  PrescriptionsResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateAppointmentRequest,
  UpdateHealthCheckupRequest,
  Vital,
  VitalResponse,
  VitalsResponse,
} from '@/types/api/patient.types';

/**
 * Patient Repository Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IPatientRepository {
  // Authentication
  login(credentials: LoginRequest): Promise<LoginResponse>;
  register(data: RegisterRequest): Promise<RegisterResponse>;
  logout(): Promise<void>;
  refreshToken(): Promise<ApiResponse<{ accessToken: string }>>;
  getCurrentUser(): Promise<ApiResponse<Patient>>;

  // Appointments
  getAppointments(params?: { page?: number; limit?: number }): Promise<AppointmentsResponse>;
  getAppointment(id: string): Promise<AppointmentResponse>;
  createAppointment(data: CreateAppointmentRequest): Promise<AppointmentResponse>;
  updateAppointment(id: string, data: UpdateAppointmentRequest): Promise<AppointmentResponse>;
  cancelAppointment(id: string): Promise<AppointmentResponse>;

  // Prescriptions
  getPrescriptions(params?: { page?: number; limit?: number }): Promise<PrescriptionsResponse>;
  getPrescription(id: string): Promise<PrescriptionResponse>;

  // Health Checkup
  getHealthCheckups(params?: { page?: number; limit?: number }): Promise<HealthCheckupsResponse>;
  getHealthCheckup(id: string): Promise<HealthCheckupResponse>;
  createHealthCheckup(data: CreateHealthCheckupRequest): Promise<HealthCheckupResponse>;
  updateHealthCheckup(id: string, data: UpdateHealthCheckupRequest): Promise<HealthCheckupResponse>;

  // Vitals
  getVitals(params?: { page?: number; limit?: number; type?: string }): Promise<VitalsResponse>;
  getVital(id: string): Promise<VitalResponse>;
  createVital(data: CreateVitalRequest): Promise<VitalResponse>;
  updateVital(id: string, data: Partial<CreateVitalRequest>): Promise<VitalResponse>;
  deleteVital(id: string): Promise<void>;

  // Payments
  getPayments(params?: { page?: number; limit?: number }): Promise<PaymentsResponse>;
  getPayment(id: string): Promise<PaymentResponse>;
  createPayment(data: CreatePaymentRequest): Promise<PaymentResponse>;
}

/**
 * Patient Repository Implementation
 */
export class PatientRepository extends BaseRepository implements IPatientRepository {
  readonly basePath = '/patient';

  constructor() {
    super(apiClient);
  }

  // ==================== Authentication ====================

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse['data']>('/auth/login', credentials).then(
      (data) => ({ success: true, data }) as LoginResponse
    );
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.post<RegisterResponse['data']>('/auth/register', data).then(
      (data) => ({ success: true, data }) as RegisterResponse
    );
  }

  async logout(): Promise<void> {
    await this.post('/auth/logout');
  }

  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    return this.post<{ accessToken: string }>('/auth/refresh').then(
      (data) => ({ success: true, data }) as ApiResponse<{ accessToken: string }>
    );
  }

  async getCurrentUser(): Promise<ApiResponse<Patient>> {
    return this.get<Patient>('/auth/me').then(
      (data) => ({ success: true, data }) as ApiResponse<Patient>
    );
  }

  // ==================== Appointments ====================

  async getAppointments(params?: { page?: number; limit?: number }): Promise<AppointmentsResponse> {
    return this.get<AppointmentsResponse>('/appointments', params);
  }

  async getAppointment(id: string): Promise<AppointmentResponse> {
    return this.get<Appointment>(`/appointments/${id}`).then(
      (data) => ({ success: true, data }) as AppointmentResponse
    );
  }

  async createAppointment(data: CreateAppointmentRequest): Promise<AppointmentResponse> {
    return this.post<Appointment>('/appointments', data).then(
      (data) => ({ success: true, data }) as AppointmentResponse
    );
  }

  async updateAppointment(
    id: string,
    data: UpdateAppointmentRequest
  ): Promise<AppointmentResponse> {
    return this.patch<Appointment>(`/appointments/${id}`, data).then(
      (data) => ({ success: true, data }) as AppointmentResponse
    );
  }

  async cancelAppointment(id: string): Promise<AppointmentResponse> {
    return this.patch<Appointment>(`/appointments/${id}/cancel`, {
      status: 'cancelled',
    }).then((data) => ({ success: true, data }) as AppointmentResponse);
  }

  // ==================== Prescriptions ====================

  async getPrescriptions(params?: {
    page?: number;
    limit?: number;
  }): Promise<PrescriptionsResponse> {
    return this.get<PrescriptionsResponse>('/prescriptions', params);
  }

  async getPrescription(id: string): Promise<PrescriptionResponse> {
    return this.get<Prescription>(`/prescriptions/${id}`).then(
      (data) => ({ success: true, data }) as PrescriptionResponse
    );
  }

  // ==================== Health Checkup ====================

  async getHealthCheckups(params?: {
    page?: number;
    limit?: number;
  }): Promise<HealthCheckupsResponse> {
    return this.get<HealthCheckupsResponse>('/health-checkup', params);
  }

  async getHealthCheckup(id: string): Promise<HealthCheckupResponse> {
    return this.get<HealthCheckup>(`/health-checkup/${id}`).then(
      (data) => ({ success: true, data }) as HealthCheckupResponse
    );
  }

  async createHealthCheckup(data: CreateHealthCheckupRequest): Promise<HealthCheckupResponse> {
    return this.post<HealthCheckup>('/health-checkup', data).then(
      (data) => ({ success: true, data }) as HealthCheckupResponse
    );
  }

  async updateHealthCheckup(
    id: string,
    data: UpdateHealthCheckupRequest
  ): Promise<HealthCheckupResponse> {
    return this.patch<HealthCheckup>(`/health-checkup/${id}`, data).then(
      (data) => ({ success: true, data }) as HealthCheckupResponse
    );
  }

  // ==================== Vitals ====================

  async getVitals(params?: {
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<VitalsResponse> {
    return this.get<VitalsResponse>('/vitals', params);
  }

  async getVital(id: string): Promise<VitalResponse> {
    return this.get<Vital>(`/vitals/${id}`).then(
      (data) => ({ success: true, data }) as VitalResponse
    );
  }

  async createVital(data: CreateVitalRequest): Promise<VitalResponse> {
    return this.post<Vital>('/vitals', data).then(
      (data) => ({ success: true, data }) as VitalResponse
    );
  }

  async updateVital(id: string, data: Partial<CreateVitalRequest>): Promise<VitalResponse> {
    return this.patch<Vital>(`/vitals/${id}`, data).then(
      (data) => ({ success: true, data }) as VitalResponse
    );
  }

  async deleteVital(id: string): Promise<void> {
    await this.delete(`/vitals/${id}`);
  }

  // ==================== Payments ====================

  async getPayments(params?: { page?: number; limit?: number }): Promise<PaymentsResponse> {
    return this.get<PaymentsResponse>('/payments', params);
  }

  async getPayment(id: string): Promise<PaymentResponse> {
    return this.get<Payment>(`/payments/${id}`).then(
      (data) => ({ success: true, data }) as PaymentResponse
    );
  }

  async createPayment(data: CreatePaymentRequest): Promise<PaymentResponse> {
    return this.post<Payment>('/payments', data).then(
      (data) => ({ success: true, data }) as PaymentResponse
    );
  }
}

// Singleton instance
export const patientRepository = new PatientRepository();
