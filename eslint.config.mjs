import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import cssPlugin from 'eslint-plugin-css';

export default defineConfig([
  // JavaScript and TypeScript configuration
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js, import: importPlugin },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },

  {
    files: ['**/*.{css,scss}'],
    plugins: { css: cssPlugin },
    rules: {
      'css/no-unused-selector': 'error',
      'css/property-no-unknown': 'error',
      'css/no-dupe-properties': 'error',
      'css/media-query-no-invalid': 'error',
    },
  },

  tseslint.configs.recommended,
]);
