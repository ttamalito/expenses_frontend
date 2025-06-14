import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(

  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'src/models/clients.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },],
      'prettier/prettier': 'error',
      "arrow-body-style": ["error", "always"],
      "camelcase": ["error",
        { "properties": "always", "ignoreDestructuring": true }],
      "default-case": "error",
      "default-case-last": "error",
      "max-depth": ["error", 4],
      "no-empty-function": "error",
      "no-return-assign": "error",
      "prefer-const": "error",
      "require-await": "error",
      "@typescript-eslint/no-explicit-any": 'warn',
    },
  },
)
