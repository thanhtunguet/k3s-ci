module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  globals: {
    nameof: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-shadow': 'off',
    'no-console': 'error',
    'no-debugger': 'error',
  },
};
