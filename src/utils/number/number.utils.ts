/**
 * Number Utilities
 *
 * Number formatting and manipulation utilities
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

/**
 * Format number with commas (thousands separator)
 */
export const formatNumber = (num: number | string, decimals: number = 0): string => {
  const number = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(number)) {
    return '0';
  }
  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format currency
 */
export const formatCurrency = (
  amount: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(0);
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(num);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number | string, decimals: number = 1): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) {
    return '0%';
  }
  return `${num.toFixed(decimals)}%`;
};

/**
 * Clamp number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Round to specified decimal places
 */
export const round = (value: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * Check if value is a valid number
 */
export const isValidNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Parse string to number with fallback
 */
export const parseNumber = (value: string | number, fallback: number = 0): number => {
  if (typeof value === 'number') {
    return isValidNumber(value) ? value : fallback;
  }
  const parsed = parseFloat(value);
  return isValidNumber(parsed) ? parsed : fallback;
};

/**
 * Format file size (bytes to human readable)
 */
export const formatFileSize = (bytes: number): string => {
  if (!isValidNumber(bytes) || bytes < 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${round(size, 2)} ${units[unitIndex]}`;
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (!isValidNumber(total) || total === 0) {
    return 0;
  }
  if (!isValidNumber(value)) {
    return 0;
  }
  return round((value / total) * 100, 2);
};
