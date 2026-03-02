import type Reactotron from 'reactotron-react-native';

declare global {
  // Allow console.tron usage throughout the app in dev.
  interface Console {
    tron?: typeof Reactotron;
  }
}

export {};
