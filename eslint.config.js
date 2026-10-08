import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  {
    ignores: ['node_modules/**', 'legacy/**', 'reports/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'prefer-template': 'error',
      'max-depth': ['warn', 3],
      'arrow-body-style': ['warn', 'as-needed'],
      camelcase: 'error',
      eqeqeq: ['error', 'always'],
      'no-negated-condition': 'warn',
    },
  },
  eslintConfigPrettier,
];