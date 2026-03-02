/* eslint-disable no-console */

import Constants from 'expo-constants';
import Reactotron from 'reactotron-react-native';

// Dev-only Reactotron configuration.
// This is imported for side-effects from the app root when __DEV__ is true.

const reactotron = Reactotron.configure({
  name: Constants.expoConfig?.name,
  // For physical devices on the same network, replace with your machine IP.
  host: 'localhost',
})
  .useReactNative({
    devTools: true,
    log: true,
    networking: {
      // Ignore Expo symbolication and internal calls.
      ignoreUrls: /symbolicate|logs/,
    },
  })
  .connect();

// Expose a convenient console helper.
// Usage: console.tron?.log('something');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(console as any).tron = reactotron;

export { reactotron };
