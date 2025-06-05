import importPlugin from 'eslint-plugin-import'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  { ignores: ['.next/**/*', 'node_modules/**/*', 'dist/**/*', 'build/**/*', '*.config.js', '*.config.mjs'] },

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: { import: importPlugin },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },
])
