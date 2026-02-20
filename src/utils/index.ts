/**
 * Utilities Barrel Export
 *
 * Central export point for all utility functions
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

// Date utilities
export * from './date/date.utils';

// Validation utilities
export * from './validation/validation.utils';

// String utilities
export {
  capitalize,
  capitalizeWords,
  formatEmail,
  formatPhoneNumber,
  getEmailDomain,
  getInitials,
  maskString,
  removeWhitespace,
  sanitize,
  slugify,
  truncate,
} from './string/string.utils';
export { isEmpty as isEmptyString } from './string/string.utils';

// Number utilities
export * from './number/number.utils';

// Array utilities
export {
  chunk,
  findById,
  flatten,
  groupBy,
  isEmpty as isEmptyArray,
  randomItem,
  removeById,
  shuffle,
  sortBy,
  unique,
  uniqueBy,
} from './array/array.utils';

// Object utilities
export * from './object/object.utils';

// Error utilities
export * from './error/error.utils';

// Device utilities
export * from './device/device.utils';

// Async utilities
export * from './async/async.utils';

// Responsive utilities
export * from './responsive';

// Style utilities
export * from './style/style-helpers';
