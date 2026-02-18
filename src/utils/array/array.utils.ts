/**
 * Array Utilities
 *
 * Common array manipulation utilities
 *
 * Created: February 13, 2026
 * Author: Aarav Mishra
 */

/**
 * Remove duplicates from array
 */
export const unique = <T>(array: T[]): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  return Array.from(new Set(array));
};

/**
 * Remove duplicates by key
 */
export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

/**
 * Group array by key
 */
export const groupBy = <T>(
  array: T[],
  key: keyof T | ((item: T) => string)
): Record<string, T[]> => {
  if (!Array.isArray(array)) {
    return {};
  }

  return array.reduce(
    (groups, item) => {
      const groupKey = typeof key === 'function' ? key(item) : String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
};

/**
 * Sort array by key
 */
export const sortBy = <T>(
  array: T[],
  key: keyof T | ((item: T) => number | string),
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }

  const sorted = [...array].sort((a, b) => {
    const aValue = typeof key === 'function' ? key(a) : a[key];
    const bValue = typeof key === 'function' ? key(b) : b[key];

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return sorted;
};

/**
 * Chunk array into smaller arrays
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  if (!Array.isArray(array) || size <= 0) {
    return [];
  }

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Flatten nested array
 */
export const flatten = <T>(array: (T | T[])[]): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.flat() as T[];
};

/**
 * Get random item from array
 */
export const randomItem = <T>(array: T[]): T | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export const shuffle = <T>(array: T[]): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Find item by key-value pair
 */
export const findById = <T extends Record<string, unknown>>(
  array: T[],
  id: unknown,
  idKey: keyof T = 'id' as keyof T
): T | undefined => {
  if (!Array.isArray(array)) {
    return undefined;
  }
  return array.find((item) => item[idKey] === id);
};

/**
 * Remove item by id
 */
export const removeById = <T extends Record<string, unknown>>(
  array: T[],
  id: unknown,
  idKey: keyof T = 'id' as keyof T
): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.filter((item) => item[idKey] !== id);
};

/**
 * Check if array is empty
 */
export const isEmpty = <T>(array: T[] | null | undefined): boolean => {
  return !Array.isArray(array) || array.length === 0;
};
