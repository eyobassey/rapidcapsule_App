# State Management Architecture

## Overview

Rapid Capsule mobile app uses a **hybrid state management approach** combining React Query and Zustand, following industry best practices for React Native applications.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                          │
│  (React Components, Screens, UI)                           │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌───────────────┐  ┌───────────────┐
│  React Query  │  │    Zustand     │
│ (Server State)│  │ (Client State) │
└───────┬───────┘  └───────┬───────┘
        │                  │
        ▼                  ▼
┌───────────────┐  ┌───────────────┐
│  API Service  │  │  Local Storage│
│    Layer      │  │   (MMKV)      │
└───────────────┘  └───────────────┘
```

---

## State Management Strategy

### 🔵 React Query (Server State)

**Purpose**: Manage all data that comes from the API

**What it handles:**

- ✅ API data caching
- ✅ Background synchronization
- ✅ Optimistic updates
- ✅ Request deduplication
- ✅ Automatic refetching
- ✅ Pagination
- ✅ Infinite queries

**Examples:**

- Appointments list
- Prescriptions
- Health checkups
- Vitals
- Payments
- User profile (from API)

**Why React Query?**

- Built for server state
- Automatic caching and synchronization
- Reduces boilerplate
- Handles loading/error states
- Optimistic updates support

### 🟢 Zustand (Client State)

**Purpose**: Manage all client-side application state

**What it handles:**

- ✅ Authentication state (derived from tokens)
- ✅ UI state (modals, bottom sheets, theme)
- ✅ App preferences (language, theme)
- ✅ Navigation state
- ✅ Network connectivity state
- ✅ Onboarding status
- ✅ Global loading states
- ✅ Toast notifications

**Why Zustand?**

- Lightweight and simple
- No boilerplate
- Great TypeScript support
- Persistence middleware
- Can be used outside React components
- Perfect for client-side state

---

## Store Structure

```
src/store/
├── auth/
│   └── auth.store.ts        # Authentication state
├── ui/
│   └── ui.store.ts          # UI state (theme, language, modals)
├── app/
│   └── app.store.ts         # App state (network, onboarding)
└── index.ts                  # Barrel exports
```

---

## Usage Examples

### React Query (Server State)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientRepository } from '@/services/api';

// Fetch appointments
function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => patientRepository.getAppointments(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create appointment mutation
function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentRequest) => patientRepository.createAppointment(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}
```

### Zustand (Client State)

```typescript
import { useAuthStore, useUIStore } from '@/store';

// Authentication
function LoginScreen() {
  const { setUser, setAuthenticated } = useAuthStore();

  const handleLogin = async () => {
    const response = await patientRepository.login(credentials);
    await secureStorageService.set(SecureStorageKey.ACCESS_TOKEN, response.data.accessToken);
    setUser(response.data.user);
    setAuthenticated(true);
  };
}

// UI State
function SettingsScreen() {
  const { theme, setTheme, language, setLanguage } = useUIStore();

  return (
    <View>
      <Button onPress={() => setTheme('dark')}>Dark Mode</Button>
      <Button onPress={() => setLanguage('es')}>Spanish</Button>
    </View>
  );
}

// Toast Notifications
function SomeComponent() {
  const { showToast } = useUIStore();

  const handleSuccess = () => {
    showToast('Operation successful!', 'success');
  };
}
```

---

## When to Use What?

### Use React Query When:

- ✅ Data comes from API
- ✅ Need caching
- ✅ Need background sync
- ✅ Need optimistic updates
- ✅ Need pagination/infinite scroll
- ✅ Data should be refetched automatically

### Use Zustand When:

- ✅ Client-side only state
- ✅ UI state (modals, bottom sheets)
- ✅ App preferences (theme, language)
- ✅ Authentication state (derived from tokens)
- ✅ Navigation state
- ✅ Global loading states
- ✅ Toast notifications
- ✅ State that doesn't come from server

### Use React Hook Form When:

- ✅ Form state
- ✅ Form validation
- ✅ Form submission

---

## Data Flow

### Server Data Flow (React Query)

```
Component → React Query Hook → API Service → Backend API
                ↓
         Cache & State
                ↓
         Component Re-renders
```

### Client State Flow (Zustand)

```
Component → Zustand Store → Local Storage (optional)
                ↓
         State Update
                ↓
         Component Re-renders
```

---

## Best Practices

### ✅ DO:

- ✅ Use React Query for all API data
- ✅ Use Zustand for client-side state only
- ✅ Keep stores focused (Single Responsibility)
- ✅ Use TypeScript for type safety
- ✅ Persist only non-sensitive data
- ✅ Use selectors to prevent unnecessary re-renders
- ✅ Keep stores small and focused

### ❌ DON'T:

- ❌ Store server data in Zustand
- ❌ Store tokens in Zustand (use secure storage)
- ❌ Duplicate server state in Zustand
- ❌ Create too many stores
- ❌ Store sensitive data in persisted state
- ❌ Mix concerns in a single store

---

## Integration with Service Layer

```typescript
// Service Layer (API calls)
import { patientRepository } from '@/services/api';

// React Query (Server state management)
import { useQuery } from '@tanstack/react-query';

// Zustand (Client state management)
import { useAuthStore } from '@/store';

// Component
function AppointmentsScreen() {
  // Server state (React Query)
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => patientRepository.getAppointments(),
  });

  // Client state (Zustand)
  const { user, isAuthenticated } = useAuthStore();
  const { showToast } = useUIStore();

  // Component logic...
}
```

---

## Performance Considerations

### React Query Optimizations:

- ✅ Automatic request deduplication
- ✅ Background refetching
- ✅ Stale-while-revalidate pattern
- ✅ Query invalidation strategies

### Zustand Optimizations:

- ✅ Selective subscriptions (use selectors)
- ✅ Shallow equality checks
- ✅ Persistence only for necessary state
- ✅ Keep stores small

---

## Summary

**React Query** = Server State (API data)
**Zustand** = Client State (UI, preferences, auth state)

This separation provides:

- ✅ Clear separation of concerns
- ✅ Optimal performance
- ✅ Easy to test
- ✅ Maintainable codebase
- ✅ Type-safe state management
