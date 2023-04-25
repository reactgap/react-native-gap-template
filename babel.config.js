module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          components: './app/components',
          containers: './app/containers',
        },
      },
    ],
  ],
};
