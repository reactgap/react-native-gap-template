module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['@typescript-eslint', 'react-hooks'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // '@typescript-eslint/no-shadow': ['error'],
        // 'no-shadow': 'off',
        // 'no-undef': 'off',
        // 'prettier/prettier': 'off',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
      },
    },
  ],
};
