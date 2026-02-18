/**
 * Patient API Types
 *
 * Type definitions for Patient module API responses
 */

import { ApiResponse, PaginatedResponse } from './common.types';

/**
 * User/Patient Entity
 */
export interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication Types
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Patient;
}

export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;

/**
 * Appointment Types
 */
export interface Appointment {
  id: string;
  patientId: string;
  specialistId: string;
  specialistName: string;
  specialistSpecialty: string;
  type: 'video' | 'voice' | 'chat' | 'in-person' | 'home-visit' | 'emergency';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  scheduledAt: string;
  duration: number; // in minutes
  reason?: string;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentRequest {
  specialistId: string;
  type: Appointment['type'];
  scheduledAt: string;
  reason?: string;
}

export interface UpdateAppointmentRequest {
  scheduledAt?: string;
  reason?: string;
  status?: Appointment['status'];
}

export type AppointmentResponse = ApiResponse<Appointment>;
export type AppointmentsResponse = PaginatedResponse<Appointment>;

/**
 * Prescription Types
 */
export interface Prescription {
  id: string;
  patientId: string;
  appointmentId?: string;
  doctorName: string;
  doctorSpecialty: string;
  medications: Medication[];
  instructions?: string;
  issuedAt: string;
  expiresAt?: string;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export type PrescriptionResponse = ApiResponse<Prescription>;
export type PrescriptionsResponse = PaginatedResponse<Prescription>;

/**
 * Health Checkup Types
 */
export interface HealthCheckup {
  id: string;
  patientId: string;
  symptoms: string[];
  aiAnalysis?: AIAnalysis;
  recommendations?: string[];
  status: 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface AIAnalysis {
  conditions: Condition[];
  triage: TriageLevel;
  interview: InterviewQuestion[];
}

export interface Condition {
  id: string;
  name: string;
  probability: number;
  evidence: string[];
}

export type TriageLevel = 'emergency' | 'urgent' | 'standard' | 'self-care';

export interface InterviewQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
}

export interface CreateHealthCheckupRequest {
  symptoms: string[];
  description?: string;
}

export interface UpdateHealthCheckupRequest {
  answers?: Record<string, string | string[]>;
}

export type HealthCheckupResponse = ApiResponse<HealthCheckup>;
export type HealthCheckupsResponse = PaginatedResponse<HealthCheckup>;

/**
 * Vitals Types
 */
export interface Vital {
  id: string;
  patientId: string;
  type: VitalType;
  value: number;
  unit: string;
  recordedAt: string;
  notes?: string;
  createdAt: string;
}

export type VitalType =
  | 'blood-pressure'
  | 'heart-rate'
  | 'temperature'
  | 'weight'
  | 'height'
  | 'blood-sugar'
  | 'oxygen-saturation';

export interface CreateVitalRequest {
  type: VitalType;
  value: number;
  unit: string;
  recordedAt?: string;
  notes?: string;
}

export type VitalResponse = ApiResponse<Vital>;
export type VitalsResponse = PaginatedResponse<Vital>;

/**
 * Payment Types
 */
export interface Payment {
  id: string;
  patientId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'appointment' | 'prescription' | 'consultation';
  referenceId?: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  amount: number;
  type: Payment['type'];
  referenceId?: string;
  paymentMethod?: string;
}

export type PaymentResponse = ApiResponse<Payment>;
export type PaymentsResponse = PaginatedResponse<Payment>;
