module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Expo Router codegen and routing support
      'expo-router/babel',

      // Match TS path aliases at runtime
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@': './src',
            '@/config': './src/config',
            '@/services': './src/services',
            '@/types': './src/types',
            '@/utils': './src/utils',
            '@/components': './src/components',
            '@/store': './src/store',
          },
        },
      ],

      // React Native Unistyles plugin (must run before Reanimated)
      [
        'react-native-unistyles/plugin',
        {
          // pass root folder of your application
          // all files under this folder will be processed by the Babel plugin
          // if you need to include more folders, or customize discovery process
          // check available babel options
          root: 'src',
        },
      ],

      // Reanimated plugin MUST be last
      'react-native-worklets/plugin',
    ],
  };
};
