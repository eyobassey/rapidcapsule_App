# Rapid Capsule Mobile App

<p align="center">
  <strong>Mobile Application for Rapid Capsule - AI-Powered Telemedicine Platform</strong>
</p>

<p align="center">
  <a href="https://rapidcapsule.com">Live Platform</a> •
  <a href="https://rapidcapsule.com/rc-architecture">Architecture Documentation</a> •
  <a href="https://api.rapidcapsule.com">API Documentation</a> •
  <a href="https://github.com/eyobassey/rapidcapsule">Main Repository</a>
</p>

---

## Overview

This is the **mobile application** for **Rapid Capsule**, a comprehensive AI-powered telemedicine platform. The mobile app provides native iOS and Android experiences, bringing all platform features to mobile devices.

**Rapid Capsule** connects patients with medical specialists through multiple channels while providing AI-powered health assessments, prescription management, and integrated pharmacy services.

### Platform Components

- **Main Repository**: [rapidcapsule](https://github.com/eyobassey/rapidcapsule) - Contains backend services, web frontend, and admin portal
- **Mobile App** (This Repository) - Cross-platform iOS and Android mobile application
- **Backend API**: https://api.rapidcapsule.com - RESTful APIs and WebSocket servers
- **Web Platform**: https://rapidcapsule.com - Patient web portal

---

## Mobile App Features

- **Cross-Platform Support** - iOS, Android, and Web
- **Native Performance** - Built with React Native and Expo
- **Offline Capabilities** - Local storage with MMKV for offline access
- **Real-time Updates** - WebSocket integration for live consultations
- **Health Monitoring** - Track vitals and health metrics
- **Appointment Management** - Schedule and manage consultations
- **Prescription Management** - View and manage prescriptions
- **AI-Powered Diagnostics** - Access to Infermedica's medical AI for symptom analysis
- **Multi-Channel Telehealth** - Video, Voice, Chat, In-Person, Home Visit, and Emergency consultations
- **Secure Authentication** - JWT with refresh tokens, OAuth support (Google, Apple)

---

## 🚀 Tech Stack

### Core Technologies
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing system
- **PNPM** - Fast, disk-efficient package manager

### State Management & Data
- **React Query** (`@tanstack/react-query`) - Server state management and API caching
- **Zustand** - Lightweight client state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Networking & Storage
- **Axios** - HTTP client for API communication
- **MMKV** (`react-native-mmkv`) - Fast key-value storage for offline data
- **@react-native-community/netinfo** - Network connectivity monitoring

### UI & Styling
- **Unistyles** (`react-native-unistyles`) - Styling system with theme support
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch gestures
- **@gorhom/bottom-sheet** - Bottom sheet components
- **@shopify/flash-list** - High-performance list component

### Internationalization
- **i18next** & **react-i18next** - Multi-language support

---

## 📦 Package Manager: PNPM

This project uses **PNPM** for the following reasons:

- ⚡ **Fast**: Faster installs and builds compared to npm/yarn
- 💾 **Disk Efficient**: Uses hard links to save disk space
- 🔒 **Strict Dependencies**: Prevents phantom dependencies (critical for health tech security)
- 🌐 **Wide Support**: Excellent compatibility with React Native and Expo packages
- 🏗️ **Production Ready**: Better for production-grade applications

---

## 🛠️ Prerequisites

- **Node.js** (v18 or higher recommended)
- **PNPM** (will be installed automatically if not present)
- **Expo CLI** (installed globally or via npx)
- **iOS Simulator** (for macOS) or **Android Studio** (for Android development)
- **Backend API** - Ensure the Rapid Capsule backend is running (see [Main Repository](https://github.com/eyobassey/rapidcapsule))

---

## 📥 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/eyobassey/rapidcapusle.git
cd rapidcapusle
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory
   - Set the API endpoint: `API_BASE_URL=https://api.rapidcapsule.com`
   - Add other required environment variables (see `.env.example` if available)

4. **Start the development server:**
```bash
pnpm start
```

---

## 🎯 Available Scripts

- `pnpm start` - Start Expo development server
- `pnpm android` - Run on Android device/emulator
- `pnpm ios` - Run on iOS simulator
- `pnpm web` - Run on web browser

---

## 📁 Project Structure

```
rapidcapusle/
├── app/                      # Expo Router file-based routes
│   ├── _layout.tsx           # Root layout component
│   ├── index.tsx             # Home screen (/)
│   └── ...                   # Other screens
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   ├── config/               # Configuration files
│   │   ├── themes.ts         # Theme configuration
│   │   └── unistyles.ts      # Unistyles setup
│   ├── services/             # API services and utilities
│   ├── store/                # State management (Zustand)
│   └── types/                # TypeScript type definitions
├── assets/                   # Images, fonts, and other assets
├── app.json                  # Expo configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── .npmrc                    # PNPM configuration
```

---

## 🗺️ Routing

This app uses **Expo Router** for file-based routing:

- `app/index.tsx` → `/` (Home screen)
- `app/_layout.tsx` → Root layout (wraps all screens)

Create new routes by adding files to the `app/` directory. See [Expo Router documentation](https://docs.expo.dev/router/introduction/) for more details.

---

## 🔧 Configuration

### PNPM Configuration (`.npmrc`)

The project includes optimized PNPM settings:
- Strict peer dependencies for security
- Frozen lockfile for consistent builds
- Auto-install peers enabled

### TypeScript

Full TypeScript support with strict mode enabled. Path aliases configured:
- `@/*` → Root directory

### Environment Variables

Create a `.env` file with the following variables:
```
API_BASE_URL=https://api.rapidcapsule.com
WS_URL=wss://api.rapidcapsule.com
```

---

## 🔌 API Integration

The mobile app connects to the Rapid Capsule backend API:

- **Base URL**: `https://api.rapidcapsule.com`
- **Authentication**: JWT tokens with refresh token support
- **WebSocket**: Real-time updates for consultations and notifications
- **API Documentation**: See [Main Repository](https://github.com/eyobassey/rapidcapsule) for API details

### Key API Endpoints

- Authentication: `/auth/login`, `/auth/register`, `/auth/refresh`
- Appointments: `/appointments`
- Prescriptions: `/prescriptions`
- Health Checkup: `/health-checkup`
- Vitals: `/vitals`
- Payments: `/payments`

---

## 🏥 Health Tech Considerations

This is a production-grade health tech application. The setup includes:

- ✅ Strict dependency management (PNPM)
- ✅ Type safety (TypeScript strict mode)
- ✅ Modern React Native architecture (New Architecture enabled)
- ✅ Secure configuration practices
- ✅ Production-ready package manager
- ✅ Secure storage for sensitive health data
- ✅ HIPAA-compliant data handling practices
- ✅ Network security and certificate pinning

---

## 📱 Platform Support

- ✅ **iOS** - Native iOS app with App Store distribution
- ✅ **Android** - Native Android app with Play Store distribution
- ✅ **Web** - Progressive Web App capabilities

---

## 🚦 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `pnpm install`
3. **Configure environment variables** (create `.env` file)
4. **Start the dev server**: `pnpm start`
5. **Press `i` for iOS simulator or `a` for Android emulator**

---

## 🏗️ Architecture

The mobile app follows a modern React Native architecture:

- **File-based Routing** - Expo Router for navigation
- **Component-based UI** - Reusable, composable components
- **State Management** - Zustand for client state, React Query for server state
- **Type Safety** - Full TypeScript coverage
- **Theming** - Unistyles for responsive, themeable styles
- **Offline Support** - MMKV for local data persistence

---

## 🔐 Security

- **Secure Storage** - MMKV for sensitive data encryption
- **JWT Authentication** - Token-based auth with refresh tokens
- **OAuth Integration** - Google and Apple Sign-In support
- **Certificate Pinning** - SSL certificate validation
- **Biometric Auth** - Face ID / Touch ID support
- **Network Security** - HTTPS-only communication

---

## 📚 Related Resources

- **Main Repository**: [rapidcapsule](https://github.com/eyobassey/rapidcapsule) - Backend, web frontend, and admin portal
- **Live Platform**: https://rapidcapsule.com
- **API Documentation**: https://api.rapidcapsule.com
- **Architecture Docs**: https://rapidcapsule.com/rc-architecture

### Documentation Links

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [PNPM Documentation](https://pnpm.io/)
- [React Query Documentation](https://tanstack.com/query/latest)

---

## 👤 Author

**Aarav Mishra**
*Software Engineer (Mobile)*

- Email: aarav@rapidcapsule.com
- GitHub: [@aarav-rapidcapsule](https://github.com/aarav-rapidcapsule)

---

## 📄 License

This project is proprietary software. All rights reserved.

© 2024-2026 Rapid Capsule
