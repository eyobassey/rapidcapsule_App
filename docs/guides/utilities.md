# Utilities Guide

**Created**: February 13, 2026  
**Last Updated**: February 13, 2026  
**Author**: Aarav Mishra  
**Version**: 1.0.0

---

## Overview

This guide provides a quick reference for all utility functions available in the Rapid Capsule mobile app. Utilities are organized by category and follow clean code principles.

**Purpose**: Provides developers with ready-to-use utility functions for common operations, reducing boilerplate and ensuring consistency across the application.

---

## Table of Contents

1. [Date Utilities](#date-utilities)
2. [Validation Utilities](#validation-utilities)
3. [String Utilities](#string-utilities)
4. [Number Utilities](#number-utilities)
5. [Array Utilities](#array-utilities)
6. [Object Utilities](#object-utilities)
7. [Error Utilities](#error-utilities)
8. [Device Utilities](#device-utilities)
9. [Async Utilities](#async-utilities)

---

## Date Utilities

### Import

```typescript
import { formatDate, formatDateTime, formatRelativeTime, formatSmartDate, getAge } from '@/utils';
```

### Examples

```typescript
// Format date
formatDate('2024-02-13', 'MMM dd, yyyy'); // "Feb 13, 2024"

// Format date and time
formatDateTime('2024-02-13T10:30:00Z'); // "Feb 13, 2024 at 10:30 AM"

// Relative time
formatRelativeTime('2024-02-13T10:30:00Z'); // "2 hours ago"

// Smart date formatting
formatSmartDate('2024-02-13'); // "Today" or "Yesterday" or formatted date

// Calculate age
getAge('1990-01-15'); // 34
```

---

## Validation Utilities

### Import

```typescript
import { isValidEmail, isValidPhone, isValidPassword, isRequired, isValidLength } from '@/utils';
```

### Examples

```typescript
// Email validation
isValidEmail('user@example.com'); // true
isValidEmail('invalid-email'); // false

// Phone validation
isValidPhone('+1234567890'); // true
isValidPhone('123-456-7890'); // true (cleaned automatically)

// Password strength
const result = isValidPassword('MyP@ssw0rd');
// { isValid: true, errors: [] }

// Required field
isRequired(''); // false
isRequired('value'); // true

// Length validation
isValidLength('hello', 3, 10); // true
```

---

## String Utilities

### Import

```typescript
import {
  capitalize,
  capitalizeWords,
  truncate,
  getInitials,
  maskString,
  formatPhoneNumber,
  formatEmail,
  slugify,
} from '@/utils';
```

### Examples

```typescript
// Capitalize
capitalize('hello'); // "Hello"
capitalizeWords('hello world'); // "Hello World"

// Truncate
truncate('Long text here', 10); // "Long te..."

// Initials
getInitials('John Doe'); // "JD"
getInitials('John Michael Doe', 3); // "JMD"

// Mask sensitive data
maskString('user@example.com', 2, 0); // "us***********"

// Format phone
formatPhoneNumber('1234567890'); // "(123) 456-7890"

// Format email (masked)
formatEmail('user@example.com'); // "us***@example.com"

// Slugify
slugify('Hello World!'); // "hello-world"
```

---

## Number Utilities

### Import

```typescript
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatFileSize,
  clamp,
  round,
} from '@/utils';
```

### Examples

```typescript
// Format number
formatNumber(1234567); // "1,234,567"
formatNumber(1234.567, 2); // "1,234.57"

// Format currency
formatCurrency(1234.56, 'USD'); // "$1,234.56"

// Format percentage
formatPercentage(85.5); // "85.5%"

// Format file size
formatFileSize(1024 * 1024); // "1 MB"

// Clamp
clamp(150, 0, 100); // 100

// Round
round(3.14159, 2); // 3.14
```

---

## Array Utilities

### Import

```typescript
import { unique, uniqueBy, groupBy, sortBy, chunk, findById, removeById } from '@/utils';
```

### Examples

```typescript
// Remove duplicates
unique([1, 2, 2, 3]); // [1, 2, 3]

// Remove duplicates by key
uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id'); // [{id: 1}, {id: 2}]

// Group by key
groupBy([{ type: 'A' }, { type: 'B' }, { type: 'A' }], 'type');
// { A: [{type: 'A'}, {type: 'A'}], B: [{type: 'B'}] }

// Sort by key
sortBy([{ age: 30 }, { age: 20 }], 'age', 'asc');

// Chunk array
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Find by id
findById([{ id: 1, name: 'A' }], 1); // {id: 1, name: 'A'}
```

---

## Object Utilities

### Import

```typescript
import { deepClone, omit, pick, isEmpty, deepMerge, getNestedValue } from '@/utils';
```

### Examples

```typescript
// Deep clone
const cloned = deepClone({ nested: { value: 1 } });

// Omit keys
omit({ a: 1, b: 2, c: 3 }, ['b']); // {a: 1, c: 3}

// Pick keys
pick({ a: 1, b: 2, c: 3 }, ['a', 'b']); // {a: 1, b: 2}

// Check if empty
isEmpty({}); // true

// Deep merge
deepMerge({ a: 1 }, { b: 2 }); // {a: 1, b: 2}

// Get nested value
getNestedValue({ user: { name: 'John' } }, 'user.name'); // "John"
```

---

## Error Utilities

### Import

```typescript
import {
  getErrorMessage,
  getErrorCode,
  isNetworkError,
  isAuthError,
  formatErrorForLogging,
} from '@/utils';
```

### Examples

```typescript
try {
  await someOperation();
} catch (error) {
  // Get user-friendly message
  const message = getErrorMessage(error);

  // Check error type
  if (isNetworkError(error)) {
    // Handle network error
  }
  if (isAuthError(error)) {
    // Handle auth error
  }

  // Log error
  console.error(formatErrorForLogging(error));
}
```

---

## Device Utilities

### Import

```typescript
import { isIOS, isAndroid, isWeb, getPlatform, getAppVersion, getBuildNumber } from '@/utils';
```

### Examples

```typescript
// Platform checks
if (isIOS()) {
  // iOS-specific code
}

// Get platform
const platform = getPlatform(); // 'ios' | 'android' | 'web'

// Get app version
const version = getAppVersion(); // "1.0.0"
```

---

## Async Utilities

### Import

```typescript
import { sleep, withTimeout, retry, debounce, throttle, batchAsync } from '@/utils';
```

### Examples

```typescript
// Sleep/delay
await sleep(1000); // Wait 1 second

// Timeout wrapper
const result = await withTimeout(fetchData(), 5000, 'Request timed out');

// Retry with exponential backoff
const data = await retry(() => fetchData(), { maxRetries: 3, initialDelay: 1000 });

// Debounce
const debouncedSearch = debounce((query: string) => {
  search(query);
}, 300);

// Throttle
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);

// Batch async operations
await batchAsync(items, 10, async (item) => {
  await processItem(item);
});
```

---

## Usage in Components

```typescript
import {
  formatDate,
  formatCurrency,
  isValidEmail,
  getErrorMessage,
  isIOS,
} from '@/utils';

function AppointmentCard({ appointment }) {
  const formattedDate = formatDate(appointment.scheduledAt);
  const formattedPrice = formatCurrency(appointment.price);

  return (
    <View>
      <Text>{formattedDate}</Text>
      <Text>{formattedPrice}</Text>
    </View>
  );
}
```

---

## Best Practices

### ✅ DO:

- ✅ Use utilities instead of writing custom functions
- ✅ Import only what you need
- ✅ Use TypeScript types for type safety
- ✅ Handle errors appropriately

### ❌ DON'T:

- ❌ Re-implement utility functions
- ❌ Import entire utils module if you only need one function
- ❌ Modify utility functions directly

---

## Related Documentation

- [Service Layer Architecture](../architecture/service-layer.md) - API integration
- [State Management Architecture](../architecture/state-management.md) - State management

---

## Summary

The utilities layer provides:

- ✅ Date/time formatting and manipulation
- ✅ Validation functions
- ✅ String formatting and manipulation
- ✅ Number/currency formatting
- ✅ Array/object operations
- ✅ Error handling helpers
- ✅ Device/platform detection
- ✅ Async operation helpers

All utilities are production-ready, type-safe, and follow clean code principles.
