module.exports = {
  root: true,
  extends: ['@tencent/eslint-config-tencent', '@react-native-community', '@tencent/eslint-config-tencent/prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: 'error',
  },
};
