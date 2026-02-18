/**
 * String Utilities
 *
 * Common string manipulation and formatting utilities
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Truncate string with ellipsis
 */
export const truncate = (str: string, maxLength: number, suffix: string = '...'): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Remove whitespace from string
 */
export const removeWhitespace = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.replace(/\s+/g, '');
};

/**
 * Sanitize string (remove special characters, keep alphanumeric and spaces)
 */
export const sanitize = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.replace(/[^a-zA-Z0-9\s]/g, '');
};

/**
 * Generate initials from name
 */
export const getInitials = (name: string, maxInitials: number = 2): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
  return initials;
};

/**
 * Mask sensitive string (e.g., email, phone)
 */
export const maskString = (
  str: string,
  visibleStart: number = 2,
  visibleEnd: number = 2,
  maskChar: string = '*'
): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  if (str.length <= visibleStart + visibleEnd) {
    return maskChar.repeat(str.length);
  }
  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const masked = maskChar.repeat(str.length - visibleStart - visibleEnd);
  return `${start}${masked}${end}`;
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Format based on length
  if (digits.length === 10) {
    // US format: (123) 456-7890
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    // US with country code: +1 (123) 456-7890
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // Return as-is for international numbers
  return phone;
};

/**
 * Format email for display (mask middle part)
 */
export const formatEmail = (email: string): string => {
  if (!email || typeof email !== 'string') {
    return '';
  }
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) {
    return email;
  }
  const maskedLocal = maskString(localPart, 2, 0);
  return `${maskedLocal}@${domain}`;
};

/**
 * Extract domain from email
 */
export const getEmailDomain = (email: string): string => {
  if (!email || typeof email !== 'string') {
    return '';
  }
  const parts = email.split('@');
  return parts.length === 2 ? parts[1] : '';
};

/**
 * Slugify string (for URLs, IDs)
 */
export const slugify = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Check if string is empty or whitespace only
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  if (!str) {
    return true;
  }
  return typeof str === 'string' && str.trim().length === 0;
};
