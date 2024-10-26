module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-unused-vars': 'warn',  // 경고로 변경
    'react/prop-types': 'off',  // PropTypes 관련 규칙 비활성화
    'react/jsx-no-undef': 'off', // undefined JSX 경고 비활성화
  },
};
