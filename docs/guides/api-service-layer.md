# API Service Layer

Production-grade service layer for Rapid Capsule mobile app following clean architecture, SOLID principles, and industry best practices.

## Architecture

```
src/services/api/
├── client/
│   └── api-client.ts          # Axios instance with interceptors
├── interceptors/
│   ├── request.interceptor.ts # Request transformation & auth
│   └── response.interceptor.ts # Response handling & error management
├── repositories/
│   ├── base.repository.ts     # Base repository class
│   └── patient/
│       └── patient.repository.ts # Patient module repository
├── errors/
│   └── api-error.ts          # Custom error classes
└── index.ts                   # Barrel exports
```

## Features

### ✅ Production-Grade Axios Interceptor

- Request/response transformation
- Automatic token injection
- Token refresh on 401 errors
- Network error handling
- Request/response logging (dev mode)
- Timeout handling

### ✅ Secure Storage

- MMKV-based secure storage
- Encrypted token storage
- Type-safe storage keys

### ✅ Network Monitoring

- Real-time connectivity monitoring
- Network state hooks
- Offline detection

### ✅ Error Handling

- Custom error classes
- Type-safe error handling
- Detailed error information
- Network vs server error distinction

### ✅ Repository Pattern

- Clean separation of concerns
- SOLID principles compliance
- Type-safe API calls
- Easy to test and maintain

## Usage

### Basic Example

```typescript
import { patientRepository } from '@/services/api';

// Login
const response = await patientRepository.login({
  email: 'user@example.com',
  password: 'password123',
});

// Store tokens
storageService.set(StorageKey.ACCESS_TOKEN, response.data.accessToken);
storageService.set(StorageKey.REFRESH_TOKEN, response.data.refreshToken);

// Get appointments
const appointments = await patientRepository.getAppointments({ page: 1, limit: 10 });

// Create appointment
const newAppointment = await patientRepository.createAppointment({
  specialistId: 'specialist-123',
  type: 'video',
  scheduledAt: '2024-02-20T10:00:00Z',
  reason: 'Regular checkup',
});
```

### Error Handling

```typescript
import { patientRepository, ApiError, NetworkError } from '@/services/api';

try {
  const appointments = await patientRepository.getAppointments();
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network error
    console.error('Network error:', error.message);
  } else if (error instanceof ApiError) {
    // Handle API error
    console.error('API error:', error.message, error.statusCode);
  }
}
```

### Using with React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { patientRepository } from '@/services/api';

// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['appointments'],
  queryFn: () => patientRepository.getAppointments(),
});

// Mutation
const createAppointmentMutation = useMutation({
  mutationFn: (data: CreateAppointmentRequest) => patientRepository.createAppointment(data),
  onSuccess: () => {
    // Invalidate queries
    queryClient.invalidateQueries({ queryKey: ['appointments'] });
  },
});
```

## Design Patterns Used

1. **Repository Pattern** - Abstracts data access logic
2. **Singleton Pattern** - Single instances of services
3. **Strategy Pattern** - Different error handling strategies
4. **Observer Pattern** - Network state subscriptions

## SOLID Principles

- **Single Responsibility** - Each class has one responsibility
- **Open/Closed** - Open for extension, closed for modification
- **Liskov Substitution** - Derived classes are substitutable
- **Interface Segregation** - Small, focused interfaces
- **Dependency Inversion** - Depend on abstractions

## Environment Configuration

Set up environment variables in `app.json` (React Native/Expo):

```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "https://api.rapidcapsule.com",
      "WS_URL": "wss://api.rapidcapsule.com",
      "API_TIMEOUT": "30000",
      "ENABLE_LOGGING": "true",
      "ENABLE_NETWORK_LOGGING": "false"
    }
  }
}
```

**Note**: This is a React Native app using Expo, so environment variables are accessed via `Constants.expoConfig.extra` rather than `process.env`.

## Testing

The service layer is designed to be easily testable:

```typescript
// Mock the API client
const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  // ...
};

const repository = new PatientRepository(mockApiClient);
```

## Security Considerations

- ✅ Secure token storage (MMKV encryption)
- ✅ Automatic token refresh
- ✅ HTTPS-only communication
- ✅ Request timeout protection
- ✅ Network error handling
- ✅ Input validation (via Zod schemas)

## Next Steps

1. Add request/response caching
2. Implement retry logic for failed requests
3. Add request cancellation support
4. Implement offline queue for failed requests
5. Add request/response interceptors for analytics
