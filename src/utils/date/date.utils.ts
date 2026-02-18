/**
 * Date Utilities
 *
 * Production-grade date and time manipulation utilities
 * Uses date-fns for reliable date operations
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

import {
  format,
  formatDistanceToNow,
  isToday,
  isTomorrow,
  isValid,
  isYesterday,
  parseISO,
} from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('[DateUtils] Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format date and time
 */
export const formatDateTime = (
  date: string | Date,
  dateFormat: string = 'MMM dd, yyyy',
  timeFormat: string = 'hh:mm a'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    return `${format(dateObj, dateFormat)} at ${format(dateObj, timeFormat)}`;
  } catch (error) {
    console.error('[DateUtils] Error formatting datetime:', error);
    return 'Invalid date';
  }
};

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('[DateUtils] Error formatting relative time:', error);
    return 'Invalid date';
  }
};

/**
 * Format date with smart formatting (today, yesterday, etc.)
 */
export const formatSmartDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }

    if (isToday(dateObj)) {
      return 'Today';
    }
    if (isYesterday(dateObj)) {
      return 'Yesterday';
    }
    if (isTomorrow(dateObj)) {
      return 'Tomorrow';
    }

    return formatDate(dateObj);
  } catch (error) {
    console.error('[DateUtils] Error formatting smart date:', error);
    return 'Invalid date';
  }
};

/**
 * Format time only
 */
export const formatTime = (date: string | Date, formatStr: string = 'hh:mm a'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid time';
    }
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('[DateUtils] Error formatting time:', error);
    return 'Invalid time';
  }
};

/**
 * Check if date is in the past
 */
export const isPastDate = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return false;
    }
    return dateObj < new Date();
  } catch {
    return false;
  }
};

/**
 * Check if date is in the future
 */
export const isFutureDate = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return false;
    }
    return dateObj > new Date();
  } catch {
    return false;
  }
};

/**
 * Get age from date of birth
 */
export const getAge = (dateOfBirth: string | Date): number | null => {
  try {
    const dob = typeof dateOfBirth === 'string' ? parseISO(dateOfBirth) : dateOfBirth;
    if (!isValid(dob)) {
      return null;
    }
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  } catch {
    return null;
  }
};
