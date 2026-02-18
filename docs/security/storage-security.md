# Security & Storage Guide

## Storage Strategy for Rapid Capsule Mobile App

### ⚠️ Critical Security Considerations

For a **health tech application** handling sensitive patient data, storage security is paramount. This guide explains our hybrid storage approach.

---

## Storage Architecture

### 🔐 Secure Storage (`SecureStorageService`)

**Use for: Tokens, Sensitive Health Data, PII**

- **Technology**: `expo-secure-store`
- **Backend**:
  - iOS: Keychain (hardware-backed encryption)
  - Android: Keystore (hardware-backed encryption when available)
- **Security Level**: ⭐⭐⭐⭐⭐ (Highest)

**What to store:**

- ✅ Authentication tokens (access_token, refresh_token)
- ✅ User IDs
- ✅ Biometric authentication settings
- ✅ Any PHI (Protected Health Information)
- ✅ Sensitive health records

**Security Features:**

- Hardware-backed encryption (when available)
- Protected by device lock screen
- Encrypted at rest
- Isolated from app data
- Can require biometric authentication

### 💾 Regular Storage (`StorageService`)

**Use for: App Preferences, Non-Sensitive Data**

- **Technology**: `react-native-mmkv`
- **Backend**: File system with optional encryption
- **Security Level**: ⭐⭐⭐ (Moderate)

**What to store:**

- ✅ App preferences (theme, language)
- ✅ UI state
- ✅ Cached non-sensitive data
- ✅ Onboarding status
- ✅ Last sync timestamps

**What NOT to store:**

- ❌ Authentication tokens
- ❌ Health records
- ❌ Personal identifiable information
- ❌ Any data that could identify a patient

---

## MMKV Security Analysis

### ✅ MMKV is Good For:

1. **Performance**: Extremely fast (10-30x faster than AsyncStorage)
2. **Non-sensitive data**: Perfect for app preferences
3. **Offline caching**: Great for non-sensitive cached data
4. **Encryption support**: Optional encryption available

### ⚠️ MMKV Limitations:

1. **Encryption key management**:
   - Encryption key is stored in app code (can be extracted)
   - Not hardware-backed
   - Vulnerable to reverse engineering

2. **Not HIPAA-compliant** for PHI:
   - Doesn't use platform-native secure storage
   - Encryption key can be compromised
   - Not protected by device lock screen

3. **Data persistence**:
   - Data survives app uninstall (unless explicitly cleared)
   - Can be accessed if device is compromised

### 🔒 Why expo-secure-store is Better for Tokens:

| Feature                | MMKV          | expo-secure-store |
| ---------------------- | ------------- | ----------------- |
| Hardware encryption    | ❌            | ✅                |
| Keychain/Keystore      | ❌            | ✅                |
| Lock screen protection | ❌            | ✅                |
| Biometric auth support | ❌            | ✅                |
| HIPAA compliance       | ⚠️ Limited    | ✅ Better         |
| Performance            | ⚡ Very Fast  | ⚡ Fast           |
| Reverse engineering    | ⚠️ Vulnerable | ✅ More secure    |

---

## Implementation

### Installing expo-secure-store

```bash
pnpm add expo-secure-store
```

### Usage Examples

#### Storing Tokens (Secure Storage)

```typescript
import { secureStorageService, SecureStorageKey } from '@/services/storage';

// After login
await secureStorageService.set(SecureStorageKey.ACCESS_TOKEN, response.data.accessToken);

await secureStorageService.set(SecureStorageKey.REFRESH_TOKEN, response.data.refreshToken);

// Retrieve token
const token = await secureStorageService.get(SecureStorageKey.ACCESS_TOKEN);

// Remove token (on logout)
await secureStorageService.remove(SecureStorageKey.ACCESS_TOKEN);
```

#### Storing Preferences (Regular Storage)

```typescript
import { storageService, StorageKey } from '@/services/storage';

// Store theme preference
storageService.set(StorageKey.THEME_PREFERENCE, 'dark');

// Retrieve preference
const theme = storageService.get<string>(StorageKey.THEME_PREFERENCE);
```

---

## HIPAA Compliance Considerations

### ✅ Compliant Practices:

1. **Use SecureStorageService for PHI**: All protected health information must use platform-native secure storage
2. **Token expiration**: Implement short-lived access tokens
3. **Automatic logout**: Clear tokens after inactivity
4. **Encryption in transit**: All API calls use HTTPS
5. **Data minimization**: Only store necessary data locally
6. **Audit logging**: Log access to sensitive data

### ⚠️ Additional Security Measures Needed:

1. **Certificate Pinning**: Implement SSL certificate pinning
2. **Root Detection**: Detect and prevent usage on rooted/jailbroken devices
3. **App Tampering**: Implement app integrity checks
4. **Screen Recording Protection**: Prevent screenshots/recording of sensitive screens
5. **Background App Protection**: Clear sensitive data when app goes to background

---

## Best Practices

### ✅ DO:

- ✅ Use `SecureStorageService` for all tokens
- ✅ Use `SecureStorageService` for any health data
- ✅ Use `StorageService` only for non-sensitive preferences
- ✅ Clear tokens on logout
- ✅ Implement token refresh logic
- ✅ Use short token expiration times
- ✅ Require biometric auth for sensitive operations

### ❌ DON'T:

- ❌ Store tokens in MMKV
- ❌ Store health records in MMKV
- ❌ Store PII in MMKV
- ❌ Hardcode encryption keys
- ❌ Store sensitive data in AsyncStorage
- ❌ Log sensitive data to console in production
- ❌ Store tokens in Redux/Zustand state

---

## Migration Guide

If you're currently using MMKV for tokens, migrate to SecureStorageService:

```typescript
// OLD (Insecure)
storageService.set(StorageKey.ACCESS_TOKEN, token);

// NEW (Secure)
await secureStorageService.set(SecureStorageKey.ACCESS_TOKEN, token);
```

---

## Security Checklist

- [ ] All tokens use `SecureStorageService`
- [ ] All health data uses `SecureStorageService`
- [ ] MMKV only used for non-sensitive preferences
- [ ] Certificate pinning implemented
- [ ] Root/jailbreak detection implemented
- [ ] Automatic logout on inactivity
- [ ] Biometric auth for sensitive operations
- [ ] No sensitive data in logs
- [ ] HTTPS for all API calls
- [ ] Token refresh implemented
- [ ] Clear storage on logout

---

## References

- [expo-secure-store Documentation](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [MMKV Documentation](https://github.com/mrousavy/react-native-mmkv)
- [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)

---

## Summary

**For Rapid Capsule health tech app:**

1. **Tokens**: ✅ Use `SecureStorageService` (expo-secure-store)
2. **Health Data**: ✅ Use `SecureStorageService` (expo-secure-store)
3. **Preferences**: ✅ Use `StorageService` (MMKV)

**MMKV is okay for non-sensitive data, but NOT for tokens or health information.**
